define(function(require,exports,module){

/*
通用表单验证控件
空/长度/正则/ajax即时验证
next
对比/自定义/所有flag改为数字 
2016.1.22
by panqi
*/
/*--------------------------------------------------------*/
;(function($){
    // 扩展fn
    $.extend($.fn,
        {
            formVerify:function(opts){
                var self = this,
                    formVerify = $.formVerify,
                    defaults = formVerify.defaults,
                    utility = formVerify.utility,
                    config = $.extend({},defaults,opts),
                    rules = config.rules,
                    errorHandler = config.errorHandler,
                    submitHandler = config.submitHandler,
                    checkAll = config.checkAll,
                    list = {};
                if(!rules){
                    throw("no rules");
                    return;
                }

                for(var x in rules){
                    // 需要验证的元素
                    var formEle = self.find("[rel="+ x +"]");
                    // 如果没有这个元素 跳过 方便组合表单
                    if(!formEle.get(0)) continue;
                    list[x] = formEle.setDefault().setCheck(rules[x],errorHandler);
                }

                // 将验证元素集合给到自身
                self["formList"] = list;
                // 将验证元素集合给到$.formVerify.formlist
                $.formVerify.formlist[self.attr("rel")] = list;
                // 表单提交处理
                self.on("submit",function(e){
                    utility.stopHandler(e).stopDef();
                    self.checkFlag = true;
                    for(var x in list) {
                        // checkType 为setDefault 方法中给与的验证事件type 属性
                        if(!list[x].trigger(list[x].checkType).checkFlag){
                            self.checkFlag = false;
                            if(!checkAll) break;
                        }
                    }
                    submitHandler.call(self);
                });

                return self;
            },
            setDefault:function(){
                var self = this,
                    nodeName = self.get(0).tagName.toLocaleLowerCase(),
                    type = self.attr("type");

                switch(nodeName){
                    case "input":
                    self.checkFlag = type === "checkbox" ? self.prop("checked") : false;
                    break;

                    case "select":
                    self.checkFlag = self.val() !== "";
                    break;

                    default:
                    self.checkFlag = false;
                    break;
                }

                return self;
            },
            setCheck:function(rules,commonerrorHandler){
                var self = this,
                    nodeName = self.get(0).tagName.toLocaleLowerCase(),
                    // 自己的验证处理
                    errorHandler = rules.errorHandler;
                    // 跟传入的通用错误处理 弱有自己的 则保留自己的 若无 使用通用处理
                    if(typeof(errorHandler) !== "function")  errorHandler = commonerrorHandler;
                    // 将最终决定的错误处理 给自己
                    self.errorHandler = errorHandler;
                    var
                    // 验证流程方法
                    selfCheckfn = function(){
                        for(var x in rules){
                            // 如果有自己的验证处理 则跳过
                            if(x === "errorHandler") continue;
                            // 获取值并去除空格
                            var val = $.formVerify.utility.trim(self[0].value),
                            // 使用验证函数进行验证 并得到返回值
                                flag = $.formVerify.utility.rules[x].call(self,rules[x][0],val);
                            // 如果是breaktag 直接跳出循环
                            if(flag == "breakTag") break;
                            //如果出错 则执行出错处理
                            if((typeof(flag)=="boolean" && !flag) || (typeof(flag)=="number" && flag<0)) return self.setState(flag,rules[x][1],errorHandler);
                        }
                        self.setState(flag,"",errorHandler);
                    },
                    // 针对不同元素获取绑定事件type
                    getType = function(){
                        // 自定义校验事件type 暂时记在元素本身
                        var selfType = this.attr("check-type");
                        if(!!selfType){
                            this.checkType = selfType;
                            return this;
                        }

                        // 根据元素属性决定校验事件type
                        var checkType,
                            type = this.attr("type") || this[0].nodeName.toLowerCase();
                            
                        switch(true){
                            case type === "checkbox":
                            checkType = "click";
                            break;

                            case type.indexOf("select")>-1:
                            checkType = "change";
                            break;

                            default:
                            checkType = "blur";
                            break;
                        }

                        this.checkType = checkType;
                        return this;
                    }

                // 绑定事件
                self.on(getType.call(self).checkType,function(){
                    selfCheckfn.call(self);
                });

                return self; 
            },
            setState:function(flag,text){
                var self = this,
                    ff = typeof(flag)=="number" ? flag>=0 : flag;  
                self.checkFlag = ff;
                // 执行自己的错误处理
                self.errorHandler.call(self,flag,text);
                return self;
            },
            teachingScroll : function(options){
                var defaults = {
                    cursorcolor : "#cdcdcd",
                    autohidemode: false,
                    cursorwidth:10,
                    cursorborderradius:0
                },
                o = $.extend({},defaults,options),
                self = $(this);
                seajs.use("niceScroll",function(){
                    self.niceScroll(o);
                });
                return self;
            }
        }
        
    );

    $.formVerify = {
        // 表单集合
        formlist:{

        },
        // 默认配置表
        defaults:{
            // 提交时是否全部验证
            checkAll : true,
            // 默认校验处理函数
            errorHandler:function(flag,text){
                // for wap b2s reg
                var tip = this.closest("dl").next(".error-tips");
                flag ? tip.html("").hide() : tip.html(text).fadeIn();
            },
            // 默认提交函数
            submitHandler:function(){
                if(this.checkFlag) this[0].submit();
            },
            // 默认ajax处理
            ajaxHandler:{
                success:function(r){
                    var status=r.status;
                    if(status==1) return 0;
                    return status;
                },
                error:function(){
                    return -1;
                }
            }
        },
        // 功能集合
        utility:{
            // 更改ajax全局处理
            updateAjaxHandler:function(o){
                $.extend($.formVerify.defaults.ajaxHandler,o);
            },
            // 去除空格
            trim:function(g){
                return g.replace(/(^\s*)|(\s*$)/g,"");
            },
            // 阻止默认/冒泡
            stopHandler:function(e){
                var e = e || event;
                return {
                    // 阻止默认事件
                    stopDef:function(){
                        if(e.preventDefault) e.preventDefault();
                            else e.returnValue=!1;
                    },
                    // 阻止冒泡
                    stopBub:function(){
                        if(e.stopPropagation) e.stopPropagation()
                            else e.cancelBubble=!0;
                    }
                }
            },
            // 各类处理逻辑
            rules:{
                // 为空
                required:function(rule,value){
                    if(!rule && value=="") return "breakTag";
                    if(this.attr("type") === "checkbox") return this.checkFlag = this.prop("checked");
                    if(value == "") return false;
                    return true;
                },
                // 长度
                length:function(rule,value){
                    if(!rule instanceof Array) return;
                    var L=value.replace(/[^\x00-\xf]/g,"xx").length;
                    if(L<rule[0] || L>rule[1]) return false;
                    return true;
                },
                // 正则
                reg:function(rule,value){
                    var reg=new RegExp(rule,"gi");
                    if(!reg.test(value)) return false;
                    return true; 
                },
                // 对比
                equalto:function(rule,value){
                    var targetVal = $.formVerify.utility.trim($(rule).val());
                    return value == targetVal;
                },
                // 及时校验
                remote:function(rule,value){
                    var set = rule,
                        url = set.url,
                        key = set.key,
                        type = set.type||"get",
                        async = set.async==!0,
                        timeout = ((set.timeout>0)&&set.timeout)||3000,
                        ajaxHandler = $.formVerify.defaults.ajaxHandler,
                        success = (set.success||ajaxHandler.success)||new Function,
                        error = (set.error||ajaxHandler.error)||new Function,
                        returnFlag = null;
                        sendData = {};
                        sendData[key] = value;
                        // 额外数据
                        var addData = {};
                        if(typeof(set.addData) === "function"){
                            var _data = set.addData();
                            (typeof(_data) === "object") && (addData = _data);
                        }

                    $.ajax({
                        url:url,
                        type:type,
                        data:$.extend({},sendData,addData),
                        dataType:"json",
                        async:async,
                        cache:false,
                        success:function(){
                            returnFlag=success.apply(null,arguments)
                        },
                        error:function(){
                            returnFlag=error.apply(null,arguments);
                        },
                        timeout:timeout
                    });
                    return returnFlag;
                }
            },
            // 公用正则
            regs:{
                // 手机号
                phone:"(^1[0-9]{10}$)",
                // 手机验证码
                verifycode:"(^[0-9]{6}$)",
                // 密码
                password:"(^.{6,20}$)",
                // 中文名
                cnname:"(^[\\u4e00-\\u9fa5]{2,10}$)",
                // 英文名
                enname:"(^[a-zA-Z]{2,50}$)",
                // 学生账号
                stu:"(^[a-zA-Z_0-9]{1,}$)",
                // 邀请码或者手机号
                activeorphone : "(^1[0-9]{10}$)|(^[0-9]{6}$)",
                //输入教材
                teachingtext:"(^.{1,20}$)",
                //学习进度
                learntext:"(^.{1,20}$)",
                //教学进度
                teachingprogress:"(^.{1,20}$)",
                //老师名字
                teaname:"(^[\\u4e00-\\u9fa5]{2,10}$)|(^[a-zA-Z]{3,}$)"
            } 
        }
    }

    // 输出功能
    var exports = {

        //倒计时 
        deftime:function(o){
            if(typeof(o) !== "object") return;
            var
            tar = $(o.tar),
            url = o.url,
            key = o.key,
            time = o.time || 60,
            text = o.text || "获取验证码",
            error = ((typeof(o.error)==="function") && o.error)||function(){alert("获取验证码失败，请重试！")},
            before = ((typeof(o.before)==="function") && o.before)||null,
            success = ((typeof(o.success)==="function") && o.success)||null,
            deftime = 0,
            sendBefore = o.sendBefore,
            nodeName = tar.get(0).nodeName.toLowerCase(),
            edit = nodeName == "input" ? "val" : "text";

            ;(function (obj) {

                var arg = arguments;
                if(deftime == 0){
                    obj.bind("click",function(){
                        if(obj.hasClass("isajax")) return;
                        //发送之前进行判断
                        if ((typeof (sendBefore) === "function") && (!sendBefore.apply(null, arguments))) return;
                        var data = sendBefore.apply(null, arguments);
                        //获取接口后对调失败/成功处理函数
                        if(before!==null) before.call(null);                  
                        $.ajax({
                            url:url,
                            type:"get",
                            data:data,
                            beforeSend:function(){
                                obj.addClass("isajax");
                            },
                            success:function (r,s,xhr) {
                                if(success.apply(null,arguments)) arg.callee(obj);
                            },
                            error:function () {
                                error.call(null);
                            },
                            complete:function(){
                                obj.removeClass("isajax");
                            },
                            dataType:"json",
                            cache:false
                        });
                    }).removeClass("is-sending")[edit](text);
                    deftime=time;
                }else{
                    obj.unbind("click").addClass("is-sending")[edit](deftime+"秒重新获取");
                    deftime--;
                    setTimeout(function(){
                        arg.callee(obj);
                    },1000);
                }
            })(tar);
        },
        cookieFn:{
            set:function(name,value,days,path,domain,secure){
                document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)
                +(days?"; expires="+this.setDays(days):"")
                +(path?"; path="+path:"")
                +(domain?"; domain="+domain:"")
                +(secure?"; secure":"");
            },
            get:function(name){
                var cookie=document.cookie.split("; ");
                for(var i=0;i<cookie.length;i++){
                    var arr2=cookie[i].split("=");
                    if(decodeURIComponent(arr2[0])===name){
                        return decodeURIComponent(arr2[1]);
                    }
                }
                return "";
            },
            del:function(name){
                this.set(name,"",-1);
            },
            setDays:function(days){
                var date=new Date();
                date.setDate(date.getDate()+days);
                return date.toGMTString();
            }
        },
        placeHolderFix : {
            _check : function(){
                return 'placeholder' in document.createElement('input');
            },
            init : function(t){
                if(!this._check()){
                    this.fix(t);
                }
            },
            fix : function(t){
                var me = this;
                jQuery(':input[placeholder]').each(function(index, element) {
                    var self = $(this), txt = self.attr('placeholder'), dataHeight = self.attr("dataHeight");
                    // self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
                    var pos = self.position(), h = dataHeight ? dataHeight :  t ? self.outerHeight() : t,  paddingleft = self.css('padding-left');
                    
                    var holder = $('<span class="placeholder-span"></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lineHeight:h+'px', paddingLeft:paddingleft, color:'#aaa',cursor:'text'}).appendTo(self.parent());
                    self.on("input propertychange",function(e) {
                        if(!!me.busy) return;
                        me.busy=true;
                        if(self.val()==''){
                            holder.show();
                        }else{
                            holder.hide();
                        }
                        me.busy=false;

                    });
                    holder.click(function(e) {
                        setTimeout(function(){self.focus()}, 0) 
                    });
                });
            }
        }
    }
    
    module.exports = exports;

})(jQuery);
/*--------------------------------------------------------*/

});



