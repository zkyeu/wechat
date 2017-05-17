define("editImgFn", ["whiteBoard_1.0","editImgSeal","editImgCut"], function(require,exports,module){
    require("whiteBoard_1.0");
    require("editImgSeal");
    var editImgCut = require("editImgCut");

    var root = window;
    var sdk = root.WBSdk;

    var editImg = new function(){

        var me = this;

        me.init = function(options){
            var defaults = {
                // 处理的图片
                source : "",
                timeDelay : 300,
                tools : ["pencil", "highPencil", "rect", "rubberOld", "rubberNew", "draft", "seal", "zoom", "text", "back", "clear", "rotate", "cut", "save"],
                toolsConfig : {
                    whiteBoard : {
                        pencil : "批改",
                        highPencil : "荧光笔",
                        rect : "矩形",
                        rubberOld : "旧橡皮",
                        rubberNew : "橡皮",
                        draft : "拖动",
                        text : "评语",
                        back : "撤销",
                        clear : "清除"
                    },
                    editImg : {
                        seal : "图章",
                        rotate : "旋转",
                        save : "发表",
                        zoom : "缩放",
                        cut : "裁剪"
                    }
                },
                quickDownCb : function(e, webtool){
                    if(!e.ctrlKey) return;
                    var _target = $(".go-seal").eq(e.which == 1 ? 0 : 1);
                    var _targetImg = _target.find("img");

                    _target.addClass("cur").siblings().removeClass("cur");
                    // 更新图章数据
                    $.extend(confInfo.seal, _targetImg.data(), {
                        source : _targetImg.attr("src")
                    });
                    confInfo.seal.originWidth = _targetImg.data().width;
                    confInfo.seal.originHeight = _targetImg.data().height;
                    // 更新图章缩放比例
                    me.updateSealScale(me.imgSource.scale);
                    //调用更新 钩子
                    sdk.changeSealSource(function(){
                        webtool._curDrawType = webtool.curDrawType;
                        sdk.draw("seal");
                    });

                },
                quickUpCb : function(e, webtool){
                    if(webtool._curDrawType){
                        webtool.draw(webtool._curDrawType);
                        webtool._curDrawType = "";
                    }
                }
            };
            me.configs = $.extend({}, defaults, options);
            me.creatDom();
            me.initDom(function(){
                sdk.initBoard({
                    quickDownCb : me.configs.quickDownCb,
                    quickUpCb : me.configs.quickUpCb
                });
            });
        }

        // 状态
        me.imgSource = {
        	// 真实大小
            width : 0,
            height : 0,
            // 当前缩放后的大小 无视旋转
            curWidth : 0,
            curHeight : 0,
            // 当前真实大小 旋转后的
            _width : 0,
            _height : 0,
            rotate : 0,
            src : "",
            scale : 1,
            resizeLock : false,
            isRotate : function(){
            	return this.rotate / 90 % 2 == 1;
            },
            updateCur : function(obj){
                // 有问题 明天看
            	if(obj.curWidth && obj.curHeight){
	            	this.curWidth = obj.curWidth;
	            	this.curHeight = obj.curHeight;

                    var isRotate = this.isRotate();
	            	this.scale = (isRotate ? this.curHeight : this.curWidth) / this.width;
            	}

            	if(obj.isRotate){
            		var __width = this._width;
            		var __height = this._height;
            		this._width = __height;
	            	this._height = __width;
            	}
            }
        };

        me.dom = {
            domData : {
                container : '<div id="editImgContainer"></div>',
                paintConLR : '<span class="paintConPage paintConPageLeft" id="paintConPageLeft"></span>\
                              <span class="paintConPage paintConPageRight" id="paintConPageRight"></span>',
                isEdit : '<div class="wx_pop hw_edit">\
                            <dl class="wx_pop_in wx_pop_alert">\
                                <dt>该学生作业已被批改，是否重新批改？</dt>\
                                <dd>\
                                    <span class="wx_pop_sure" rel="fnHide">确定</span>\
                                </dd>\
                            </dl>\
                          </div>',
                paintConPar : '<div id="paintConPar"></div>',
                paintConInfo : '<span id="paintConInfo"></span>',
                paintCon : '<div id="paintCon">\
								<canvas id="canvasRes"></canvas>\
		        				<canvas id="canvasBak" oncontextmenu="return false"></canvas>\
		        				<canvas id="canvasImg"></canvas>\
		        			</div>',
                paintConTool : '<ul id="paintConTool"></ul>',
                paintCut : '<div id="paintCut">\
                                <div class="paintCutContainer"></div>\
                                <div class="paintCutBtns">\
                                    <span class="cut-sure" data-type="sure">确认</span>\
                                    <span class="cut-cancel" data-type="cancel">取消</span>\
                                </div>\
                            </div>',
                canvasBakImg : '<div id="canvasBakImg"></div>',
                paintConClose : '<span id="paintConClose"></span>',
                paintLoading : '<div class="paintLoading"></div>'
            }
        }

        me.domTools = {
            /*rotate : '<div class="tools-rotate-in tools-in">\
             <div class="tools-rotate-inner">\
             <p class="go-btn go-left">向左旋转90度</p>\
             <p class="go-btn go-right">向右旋转90度</p>\
             </div>\
             </div>',*/
            seal : '<div class="tools-seal-in tools-in">\
						<div class="tools-seal-inner">\
						</div>\
					</div>',
            zoom : '<div class="tools-zoom-in tools-in">\
						<div class="tools-zoom-inner">\
							<span class="zoom-left">0%</span>\
							<div class="zoom-tool">\
								<span class="zoom-drag"></span>\
							</div>\
							<span class="zoom-right">100%</span>\
						</div>\
					</div>'
        }

        me.updateSource = function(config){
            $.extend(true , confInfo, config);
        }

        me.initDom = function(callback){
            var source = me.configs.source;
            me.dom.paintConInfo.html(me.configs.nickName + "的作业");
            if(me.configs.isEdit) me.dom.isEdit.show();
            me.getImgInfo(source, function(img, newSrc){
                me.imgSource.src = newSrc;
                me.imgSource.width = img.width;
                me.imgSource.height = img.height;
                me.imgSource._width = img.width;
                me.imgSource._height = img.height;
                // 更新whiteBoard配置
                me.updateSource({
                    background : {
                        source : me.configs.source
                    }
                });
            
                me.loading.close();
                me.setPaintConPar(callback);
            }, function(){
                alert("加载失败请重试！")
                me.loading.close();
            });
        }

        me.loading = {
            open : function(){
                me.dom.paintLoading.show();
            },
            close : function(){
                me.dom.paintLoading.hide();
            }
        }

        me.setPaintConPar = function(callback, scale){
            var
            s = scale || 0.9,
            isRotate = me.imgSource.isRotate(),
            w = me.imgSource._width,
            h = me.imgSource._height,
            paintConPar = me.dom.paintConPar,
            paintCon = me.dom.paintCon,
            canvasBakImg = me.dom.canvasBakImg,
            _w = paintConPar.width() * s,
            _h = paintConPar.height() * s,
            x = w / h,
            y = _w / _h,
            $w,
            $h;

            if(w < _w && h < _h){
                $w = w, $h = h;
            }else if(x > y){
                $w = _w, $h = _w / x;
            }else{
                $h = _h, $w = _h * x;
            }

            var cssText = {
            	width : $w,
            	height : $h
            }

            // 更新新的宽高 缩放比例
            me.imgSource.updateCur({
            	curWidth : cssText.width,
            	curHeight : cssText.height
            });
            // 更新图章缩放比例
            me.updateSealScale(me.imgSource.scale);
            // 重置canvas宽高
            paintCon.css(cssText);
            
            // 重置背景图宽高
            // 由于背景图的旋转为css3旋转 如果有旋转 这里调换宽高
            if(me.imgSource.isRotate()){
            	cssText.width = $h;
            	cssText.height = $w;
            }
            canvasBakImg.animate(cssText, callback);
        }

        me.setRotate = function(deg){
        	// 计算出新的旋转总角度
        	var _deg = me.imgSource.rotate + deg;
        	// 先把背景图旋转过去
        	me.dom.canvasBakImg.css({
                transform : "translate(-50%, -50%) rotateZ("+ _deg +"deg)"
            });
        	// 更新新的旋转总角度
            me.imgSource.rotate = _deg;
            // 画布调换宽高
            me.dom.paintCon.css({
                transform : "translate(-50%, -50%) rotateZ(0deg)",
                width : me.imgSource.curHeight,
                height : me.imgSource.curWidth
            });
            // 更新旋转后的原图宽高
            me.imgSource.updateCur({
            	isRotate : true
            });
            // 重置大小跟画布
            me.resetSize();
        }

        me.creatDom = function(){
            // 如果已经存在dom
            if(me.dom.container){
                me.dom.container.show();
                return;
            }

            for(var x in me.dom.domData){
                var dom = me.dom.domData[x];
                me.dom[x] = $(dom);
            }

            me.dom.paintConPar.append(me.dom.canvasBakImg);
            me.dom.paintConPar.append(me.dom.paintCon);
            me.dom.container.append(me.dom.isEdit);
            me.dom.container.append(me.dom.paintConInfo);
            me.dom.container.append(me.dom.paintLoading);
            me.dom.container.append(me.dom.paintConLR);
            me.dom.container.append(me.dom.paintCut);
            me.dom.container.append(me.dom.paintConClose);
            me.dom.container.append(me.dom.paintConPar);

            $.each(me.configs.tools, function(index, ele){
                $.each(me.configs.toolsConfig, function(key, value){
                    if(ele in value) me.appendTools(ele, key, value[ele]);
                });
            });

            me.dom.container.append(me.dom.paintConTool);
            me.dom.container.appendTo("body").show();
            me.bindEvent();
        }

        me.appendTools = function(ele, type, eleZh){
            var toolsDom = $('<li atype='+ type +' ctype='+ ele +' class=tools-'+ ele +'>'+ eleZh.split("").join(" ") +'</li>');
            if(ele != "save") toolsDom.addClass("tools-tools");
            if(ele in me.domTools){
                me.domTools["$" + ele] = $(me.domTools[ele]);
                toolsDom.append(me.domTools["$" + ele]);
            }

            // 图章
            if(ele == "seal"){
                var sealInner = me.domTools.$seal.find(".tools-seal-inner");
                $.each(sealConfig, function(index, ele){
                    sealInner.append("<p class=go-seal><img src="+ ele.source +" data-type=type"+ index +" data-width="+ ele.width +" data-height="+ ele.height +" /></p>")
                });
            }

            me.dom.paintConTool.append(toolsDom);
        }

        me.resetSize = function(){
            clearTimeout(me.mt);
            me.mt = setTimeout(function(){
                me.setPaintConPar(sdk.canvasResize);
            }, me.configs.timeDelay);
        }

        me.bindEvent = function(){
            $(root).on("resize", function(){
                if(me.imgSource.resizeLock) return;
                me.resetSize();
            });

            me.dom.isEdit.on("click", "[rel=fnHide]",function(){
                me.dom.isEdit.hide();
            });

            me.dom.paintConClose.on("click", me.close);
            me.tools = me.dom.paintConTool.find(".tools-tools");
            // 第一个工具 以后再改
            me.firstTool = me.tools.eq(0);
            me.firstTool.addClass("tools-select");

            me.dom.paintConTool.on("click", "li", function(e){
                var
                self = $(this),
                atype = self.attr("atype"),
                ctype = self.attr("ctype");

                if(self.hasClass("tools-tools") && !self.hasClass("tools-rotate") && !self.hasClass("tools-cut")){
                    self.addClass("tools-select").siblings().removeClass("tools-select");
                }

                switch(atype){
                    case "whiteBoard":
                        sdk.draw(ctype);
                        break;

                    case "editImg":
                        me.eventHandler[ctype] && me.eventHandler[ctype](self, e);
                        break;

                    default:
                    break;
                }
            });

            if($.inArray("zoom", me.configs.tools) > -1) me.initZoom();
            if($.inArray("seal", me.configs.tools) > -1) me.initSeal();

            me.lrInit();
        }

        me.lrInit = function(){
            var paintConLR = me.dom.paintConLR,
                l = paintConLR.filter("#paintConPageLeft"),
                r = paintConLR.filter("#paintConPageRight");
            l.on("click", function(){
                me.switchFn("l");
            });
            r.on("click", function(){
                me.switchFn("r");
            });
        }

        me.switchFn = function(type){
            var todo = $(".home-work-list-in>ul>li .todo");
            var length = todo.length;
            var curIndex;
            todo.each(function(index, ele){
                var $ele = $(ele);
                if($ele.hasClass("cur-edit")){
                    curIndex = index + 1;
                    return false;
                }
            });

            // 先关闭工具
            me.close();
            switch(type){
                case "l":
                if(curIndex == 1){
                    curIndex = length;
                }else{
                    curIndex--;
                }
                break;

                case "r":
                if(curIndex == length){
                    curIndex = 1;
                }else{
                   curIndex++; 
                }
                break;
            }
            todo.eq(curIndex - 1).click();
        }

        me.initZoom = function(){
            // 打开拖拽遮罩 ？
            var
            zoomTool = me.tools.filter(".tools-zoom"),
            zoomToolInner = zoomTool.find(".tools-zoom-inner"),
            zoomToolWrap = zoomToolInner.find(".zoom-tool"),
            zoomDrag = zoomToolWrap.find(".zoom-drag"),
            flag = false,
            offsetLeft,
            maxWidth,
            getLimit = function(x){
            	if(x < 0) return 0;
            	var max = zoomToolWrap.width() - zoomDrag.width();
            	if(x > max) return max;
            	return x;
            }

            zoomTool.on("mouseleave", function(){
            	flag = false;
            });

            zoomToolWrap.on("click", function(event){
            	var
            	self = $(this),
            	left = event.pageX - self.offset().left;

        	    zoomDrag.css({
                	left : getLimit(left)
                });
            });

            zoomToolInner.on({
                mousedown : function(event){
                    var target = $(event.target);
                    if(!target.hasClass("zoom-drag")) return;
                    offsetLeft = event.pageX - zoomDrag.offset().left;
                    flag = true;
                },
                mousemove : function(event){
                    if(!flag) return;
                    var left = event.pageX - zoomToolWrap.offset().left - offsetLeft;
                    zoomDrag.css({
                    	left : getLimit(left)
                    });
                },
                mouseup : function(){
                    flag = false;
                }
            });
        }

        me.initSeal = function(){
        	var
            sealTool = me.tools.filter(".tools-seal");

            sealTool.on("click", ".go-seal", function(){
            	var self = $(this);
            	self.addClass("cur").siblings().removeClass("cur");

            	var _targetImg = self.find("img");
            	// 更新图章数据
                $.extend(confInfo.seal, _targetImg.data(), {
                    source : _targetImg.attr("src")
                });
                confInfo.seal.originWidth = _targetImg.data().width;
                confInfo.seal.originHeight = _targetImg.data().height;
                // 更新图章缩放比例
                me.updateSealScale(me.imgSource.scale);
                //调用更新 钩子
                sdk.changeSealSource(function(){
                    sdk.draw("seal");
                });
            });

            me.sealTool = sealTool;
        }

        // 更新图章缩放
        me.updateSealScale = function(scale){
            return;
        	if(!confInfo.seal.originWidth) return;
        	confInfo.seal.width = confInfo.seal.originWidth * scale;
        	confInfo.seal.height = confInfo.seal.originHeight * scale;
        }

        me.eventHandler = {
            save : function(){
                var imgSource = me.imgSource;
                me.loading.open();
                WBSdk.buildCurrentImg(imgSource._width, imgSource._height, imgSource.rotate % 360, function(data, isError){
                    me.loading.close();
                    me.configs.save(data, isError);
                });
            },
            rotate : function(self, event){
                me.setRotate(90);
            },
            cut : function(){
                me.cut.init();
            }
        }

        me.cut = {
            isInit : false,
            id : "resizeWrap",
            init : function(){
                var that = this;
                this.bindEvent();
                editImgCut.init({
                    id : that.id,
                    container : me.dom.paintCut.children(".paintCutContainer")[0],
                    limit : $(window).width(),
                    beforeInit : function(ele){
                        var
                        $ele = $(ele),
                        target = me.dom.paintCon,
                        left = target.offset().left - 4,
                        top = target.offset().top - 4,
                        width = target.width(),
                        height = target.height();

                        $ele.css({
                            left : left,
                            top : top,
                            width : width,
                            height : height
                        });

                        me.imgSource.resizeLock = true;
                    }
                });
                me.dom.paintCut.show();
            },
            bindEvent : function(){
                var that = this;
                if(that.isInit) return;
                var btns = me.dom.paintCut.find(".paintCutBtns");
                btns.on("click", "span", function(){
                    var self = $(this),
                        type = self.attr("data-type");
                    that[type] && that[type]();
                });
                that.isInit = true;
            },
            sure : function(){
                me.loading.open();
                var that = this;
                var resizeWrap = $("#" + this.id);
                var paintCon = me.dom.paintCon;
                var width = resizeWrap.width();
                var height = resizeWrap.height();
                var borderWidth = parseInt(resizeWrap.css("borderWidth"));

                var w, h, x, y, newUrl;

                // 裁剪图片
                ;(function(){
                    var imgSource = me.imgSource;
                    var rotate = imgSource.rotate % 360;
                    var imgCanvas = document.createElement("canvas");
                    var imgCanvasContent = imgCanvas.getContext("2d");
                    // 旋转状况 裁剪
                    switch(String(rotate)){
                        case "0":
                        w = width;
                        h = height;
                        x = resizeWrap.offset().left + borderWidth - paintCon.offset().left;
                        y = resizeWrap.offset().top + borderWidth - paintCon.offset().top;
                        break;

                        case "90":
                        w = height;
                        h = width;
                        x = resizeWrap.offset().top - paintCon.offset().top + borderWidth;
                        y = paintCon.offset().left + paintCon.width() - resizeWrap.offset().left - resizeWrap.outerWidth() + borderWidth;
                        break;

                        case "180":
                        w = width;
                        h = height;
                        x = paintCon.offset().left + paintCon.width() - resizeWrap.offset().left - resizeWrap.outerWidth() + borderWidth;
                        y = paintCon.offset().top + paintCon.height() - resizeWrap.offset().top - resizeWrap.outerHeight() + borderWidth;
                        break;

                        case "270":
                        w = height;
                        h = width;
                        x = paintCon.offset().top + paintCon.height() - resizeWrap.offset().top - resizeWrap.outerHeight() + borderWidth;
                        y = resizeWrap.offset().left - paintCon.offset().left + borderWidth;
                        break;
                    }



                    // 算出画布大小
                    var cWidth = Math.floor(w / imgSource.scale);
                    var cHeight = Math.floor(h / imgSource.scale);
                    // 算出裁剪位移
                    var cx = x / imgSource.scale;
                    var cy = y / imgSource.scale;
                    // 超出处理
                    if(cx < 0) cx = 0;
                    if(cy < 0) cy = 0;
                    if(cWidth > imgSource.width) cWidth = imgSource.width;
                    if(cHeight > imgSource.height) cHeight = imgSource.height;
                    // 画布大小赋值
                    imgCanvas.width = cWidth;
                    imgCanvas.height = cHeight;

                    var image = new Image();
                    image.onload = function(){
                        // 打印
                        imgCanvasContent.drawImage(image, -cx, -cy);
                        // 剪裁完毕
                        // 新图片地址
                        newUrl = imgCanvas.toDataURL('img/png');
                        // 隐藏裁剪框
                        var cssText = {
                            width : width,
                            height : height
                        }
                        var isRotate = editImgFn.imgSource.isRotate();
                        var cssTextBakImg = isRotate ? { width : height, height : width} : cssText;
                        paintCon.css(cssText);
                        me.dom.canvasBakImg.css(cssTextBakImg);
                        me.dom.canvasBakImg.css("background-image", "url(" + newUrl + ")");
                        // 更新参数
                        // 更新whiteBoard配置
                        me.updateSource({
                            background : {
                                source : newUrl
                            }
                        });

                        $.extend(me.imgSource, {
                            src : newUrl,
                            width : cWidth,
                            height : cHeight,
                            _width : isRotate ? cHeight : cWidth,
                            _height : isRotate ? cWidth : cHeight
                        });

                        that.cancel();
                        me.loading.close();
                    }
                    image.src = me.imgSource.src;
                })();
            },
            cancel : function(){
                me.dom.paintCut.hide();
                me.imgSource.resizeLock = false;
                me.resetSize();
            }
        }

        me.close = function(){
            me.dom.container.hide();
            me.clear();
            me.resetTool();
        }

        me.resetTool = function(){
            sdk.draw(me.firstTool.attr("ctype"));
            me.firstTool.addClass("tools-select").siblings().removeClass("tools-select");
        }

        me.clear = function(){
            sdk.draw("clear");
            sdk.mouseup();
            me.dom.isEdit.hide();
            me.sealTool.find(".go-seal").removeClass("cur");
            me.dom.canvasBakImg.css({
                background : "none",
                transform : "translate(-50%, -50%)"
            });
            me.cut.cancel();
            me.imgSource.rotate = 0;
            me.imgSource.src = "";
            me.imgSource.width = "";
            me.imgSource.height = "";
            $("#inputBak, #input").remove();
            me.firstTool.trigger("click");
            me.loading.open();
        }

        me.getImgInfo = function(source, callback, error){
            var img = new Image();
            img.crossOrigin = "";
            img.onload = function(){
                var canvas = document.createElement("canvas");
                var canvasContent = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                canvasContent.drawImage(img, 0, 0);
                var newSrc = canvas.toDataURL("img/png");
                callback && callback(img, newSrc);
            }
            img.onerror = function(){
                error && error();
            }
            img.src = source;
        }

    }

    module.exports = editImg;



});