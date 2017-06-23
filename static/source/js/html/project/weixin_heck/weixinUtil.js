define("weixinUtil",[],function(require,exports,module){

	var util = {};

	// 表情 连接过滤
	;(function(){
		var qqfaceConfig = "[微笑][撇嘴][色][发呆][得意][流泪][害羞][闭嘴][睡][大哭][尴尬][发怒][调皮][呲牙][惊讶][难过][酷][冷汗][抓狂][吐][偷笑][愉快][白眼][傲慢][饥饿][困][惊恐][流汗][憨笑][悠闲][奋斗][咒骂][疑问][嘘][晕][疯了][衰][骷髅][敲打][再见][擦汗][抠鼻][鼓掌][糗大了][坏笑][左哼哼][右哼哼][哈欠][鄙视][委屈][快哭了][阴险][亲亲][吓][可怜][菜刀][西瓜][啤酒][篮球][乒乓][咖啡][饭][猪头][玫瑰][凋谢][嘴唇][爱心][心碎][蛋糕][闪电][炸弹][刀][足球][瓢虫][便便][月亮][太阳][礼物][拥抱][强][弱][握手][胜利][抱拳][勾引][拳头][差劲][爱你][NO][OK][爱情][飞吻][跳跳][发抖][怄火][转圈][磕头][回头][跳绳][投降][激动][乱舞][献吻][左太极][右太极]";
		var qqfaceConfigArr = qqfaceConfig.split("]").join("]|").split("|").slice(0,-1);
		var filterRegArr = [];
		var faceConfig = {};
		// 连接
		var linkReg = "(((https?|ftp|mms):\\/\\/)?([A-z0-9]+[_\\-]?[A-z0-9]+\\.)*[A-z0-9]+\\-?[A-z0-9]+\\.[A-z]{2,}(\\/.*)*\\/?)";
		
		filterRegArr.push(linkReg);

		for(var i=0,l=qqfaceConfigArr.length;i<l;i++){
			var e = qqfaceConfigArr[i];
			filterRegArr.push("\\"+e.slice(0,-1)+"\\"+e.slice(-1));
			faceConfig[e] = String(i);
		}
		// qq表情
		var filterReg = new RegExp(filterRegArr.join("|"), "g");
		util.qqfaceConfigArr = qqfaceConfigArr;		
		util.msgFilter = function(str, nolink){
			return str.replace(filterReg,function(e){
				if(e in faceConfig){
					return '<i class="qqemoji qqemoji'+ faceConfig[e] +'"></i>';
				}else{
					if(nolink) return e;
					var u = e.search(/https?|ftp|mms/) > -1 ? e : "http://" + e;
					return '<a href="'+ u +'" target="_blank">'+ e +'</a>';
				}
			});
		}
	})();

	// 自定义标签过滤
	;(function(){
		var conRegArr = ["#nickname#","#relationship#","#studentname#"],
			conReg = new RegExp("#[^#]+#","gi");

		util.conRegArr = conRegArr;
		util.conReg = conReg;

		util.conFilter = function(str,replaceRule){
			return str.replace(conReg,function(e){
				var replaceData = replaceRule[e.toLowerCase()];
				if(replaceData != void 0) return replaceData;
				return e;
			})
		}
	})();

	// 粘贴上传
	;(function(){
		var imgReader, pasteFn;

	    imgReader = function(item,cb){
	        var blob = item.getAsFile(),
	            reader = new FileReader();

	        reader.onload = function(e){
	            typeof(cb) == "function" && cb(e.target.result);
	        }

	        reader.readAsDataURL(blob);
	    }

		pasteFn = function(e, cb){
		    var clipboardData = e.clipboardData,
		        i = 0,
		        items, item, types;
		    if(!clipboardData) return;
	        items = clipboardData.items;
	        if(!items) return;
	        item = items[0];
	        types = clipboardData.types || [];
	        for(;i < types.length;i++){
	            if(types[i] === 'Files'){
	                item = items[i];
	                break;
	            }
	        }
	        if(item && item.kind === 'file' && item.type.match(/^image\//i)){
	            imgReader(item,function(result){
	            	(typeof cb == "function") && cb(result);
	            });
	        }
		}

		util.pasteFn = pasteFn;
	})();

	// 标签
	;(function(){
	    return;
		var labelConfig = (function(){
		    var result = [];
		    var labelList = window.localInfo.labelList;
            if(!!labelList){
                for(var x in labelList){
                    result.push(labelList[x]);
                }
            }
            return result;
        })();
		labelFilterReg = (function(){
			var regStr = [];
			for(var i=0,l=labelConfig.length;i<l;i++){
				regStr.push("^(" + labelConfig[i].join("|") + ")$");
			}
			return new RegExp(regStr.join("|"));
		})(),
		inArrayFn = function(str,arr){
			for(var i=0,l=arr.length;i<l;i++){
				var ele = arr[i];
				var index = $.inArray(String(str),ele);
				if(index > -1){
					return i;
					break;
				}
			}
			return -1;
		}
		util.labelConfig = labelConfig;
		util.labelFilter = function(str){
			if(!str) return "";
			var arr = str.split(","),
				result = [];
			for(var i=0,l=arr.length;i<l;i++){
				var ele = arr[i];
				var flag = labelFilterReg.test(ele);
				if(flag) result.push(ele);
			}
			return result.join(",");
		}

		util.labelReplace = function(label,labelAll){
			if(!labelAll) return label;
			var labelAllArr = labelAll.split(","),
				result = [],
				isReplace = false;
			for(var i=0,l=labelAllArr.length;i<l;i++){
				var ele = labelAllArr[i];
				var flag = labelFilterReg.test(ele) && (inArrayFn(ele,labelConfig) == inArrayFn(label,labelConfig));

				if(flag){
					result.push(label);
					isReplace = true;
				}else{
					result.push(ele);
				}
			}
			if(!isReplace) result.push(label);
			return result.join(",");
		}
	})();


	//滚动标题
    util.flashText = function (text,cb) {
    	/*var _text = text + "";
		if(!_text) return;
        var _textlen = _text.length;
		var __text = _text + _text +_text;
		var start = 0;

        var interval = setInterval(function () {
			var ___text = __text.slice(start);
			typeof(cb) == "function" && cb(___text);
			if(start == _textlen){
				start = 0;
			}else{
				start++;
			}
        }, 380);*/

		var interval;

        return {
        	set : function(text, cb){
        		clearInterval(interval);
        		var _text = text + "";
				if(!_text) return;
		        var _textlen = _text.length;
				var __text = _text + _text +_text;
				var start = 0;

		        interval = setInterval(function () {
					var ___text = __text.slice(start);
					typeof(cb) == "function" && cb(___text);
					if(start == _textlen){
						start = 0;
					}else{
						start++;
					}
		        }, 380);
        	},
        	reset : function (cb) {
				clearInterval(interval);
				typeof(cb) == "function" && cb();
            }
		}
    }

    //检测浏览器
    util.checkBrowser = function (){
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }; //判断是否IE浏览器
    }

    util.wxPop = function () {

        var getDOM, bindEvent, $body = $("body"), dom, start, config;

        dom = {};

        start = -1;

        config = {
            "alert" : '<dd><span class="wx_pop_sure" rel="fnHide">确定</span></dd>',
            "confirm" : '<dd><span class="wx_pop_sure" rel="fnSure">确定</span><span class="wx_pop_cancel" rel="fnCancel">取消</span></dd>'
        }

        getDOM = function(type, content){
            var html = [];
            html.push('<div class="wx_pop">');
            html.push('<dl class="wx_pop_in wx_pop_'+ type +'">');
            html.push('<dt>'+ content +'</dt>');
            html.push(config[type]);
            html.push('</dl>');
            html.push('</div>');
            return html.join("");
        }

        bindEvent = function(dom, cb){
            dom.on("click","span[rel*=fn]",function(){
                var $self = $(this),
                    rel = $self.attr("rel");

                switch(rel){
                    case "fnCancel":
                        dom.remove();
                        break;
                    case "fnHide":
                    case "fnSure":
                        typeof(cb) == "function" && cb();
                        dom.remove();
                        break;
                }
            });
        }

        getPop = function(type, content, cb){
            var domHash = "dom" + (++start);
            dom[domHash] = $(getDOM(type, content));
            $body.append(dom[domHash]);
            dom[domHash].show();
            bindEvent(dom[domHash], cb);
        }

        for(var x in config){
            window["_" + x] = (function(xx){
                return function(content, cb){
                    getPop(xx, content, cb);
                }
            })(x);
        }
    }
    
    //退出确认提示
	util.closeTab = function () {
        if(navigator.userAgent.indexOf("MSIE") > 0){
            if(navigator.userAgent.indexOf("MSIE 6.0") > 0){
				window.opener=null;
                window.close();
            }else{
                window.open('', '_top');
                window.top.close();
            }
        }else if(navigator.userAgent.indexOf("Firefox") > 0){
            window.location.href = 'about:blank';
        }else{
            window.opener = null;
            window.open('', '_self', '');
            window.close();
            window.open("http://www.51talk.com/", '_self').close();
        }
    }

    //设置指定时间
    util.setDate = function(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);
        var y = dd.getFullYear();
        var m = dd.getMonth()+1 > 9 ? dd.getMonth()+1 : '0' + (dd.getMonth()+1);
        var d = dd.getDate() > 9 ? dd.getDate() : '0'+ dd.getDate();
        return y+"-"+m+"-"+d;
    }

	module.exports = util;
});
