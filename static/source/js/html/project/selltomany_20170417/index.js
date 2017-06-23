/**
 *
 * @authors vincent (wuyan@51talk.com)
 * @date    2017-04-18 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	
	var sellToMany = {
		init: function(){
			$(".ac-sect").on("click", ".lt", this.ifshowLessons);//点击下拉展示内容
			$(".ac-sect").on("click", "li", this.getLessons);//获取要展示的下一级内容
			$(".lesson_con").on("click", "li", this.showDetail);//获取要展示的下一级内容
		},
		showDetail: function(){
			$(".lesson_con li").removeClass("on");
			$(this).addClass("on");
			var index = $(this).index();
			$(".pic_detail").removeClass("on");
			$(".pic_detail").eq(index).addClass("on");
		},
		ifshowLessons: function(){
			var ele = $(this).parent(".ac-sect").find("ul");
			var css_display = $(ele).css("display");
			if(css_display == "none"){
				ele.css({display: "block"});
			}else{
				ele.css({display: "none"});
			}
		},
		getLessons: function(){
			var type = $(this).parent("ul").attr("lesson_type");
			if(type == "own"){
				// this.ajaxRequest()
				if($(this).attr("data-course-id")){
					var list = '<li data-course-id=""><a href="javascript:;">请选择</a></li>';
					var array = ["周六10:00-10:50（中教1对11）","周六10:00-10:50（中教1对12）","周六10:00-10:50（中教1对13）","周六10:00-10:50（中教1对14）"];
					array.forEach(function(item){
						
						list = list + '<li data-course-id=""><a href="javascript:;">'+item+'</a></li>';
					})
					$("ul[lesson_type='foreign']").html(list)
				}
			}else{
				if($(this).attr("data-course-id")){
					
				}
			}
		}
		

	};
	$.extend(true,$,{
		ajaxRequest: function(url, params, callback, settings){
			var ajaxRequest = $.ajax({
				url: url,
				type: settings.method || "GET",
				dataType: settings.dataType || "json",
				data: params
			})
			ajaxRequest.done(function(){

			}).fail(function(){

			});
		},
		pop: function(obj){
            var pop = {
                wrap: null,
                mask: null,
                text: "",
                complete: null,
                determine: null,
                ok: null,
                cancel: null,
                determine_name: "",
                ok_name: "",
                cancel_name: "",
                speed: 0,
                type: "",
                popup: function(obj){
                    if(!obj.text){
                        return false;
                    }
                    var that = this;
                    that.wrap = obj.wrap ? $(obj.wrap) : $(".popup");
                    that.mask = obj.mask ? $(obj.mask) : $(".mask");
                    that.title = obj.title ? obj.title : "温馨提示";
                    that.title_show = obj.title_show;
                    that.text = obj.text;
                    that.complete = typeof obj.complete === "function" ? obj.complete : null;
                    that.determine = typeof obj.determine === "function" ? obj.determine : null;
                    that.ok = typeof obj.ok === "function" ? obj.ok : null;
                    that.cancel = typeof obj.cancel === "function" ? obj.cancel : null;
                    that.determine_name = obj.determine_name ? obj.determine_name : "确定";
                    that.ok_name = obj.ok_name ? obj.ok_name : "确定";
                    that.cancel_name = obj.cancel_name ? obj.cancel_name : "取消";
                    that.speed = typeof obj.speed === "number" && typeof obj.speed > 0 ? obj.speed : 2000;
                    if(obj.type){
                        switch (obj.type.toLowerCase()){
                            case "pop":
                                that.type = "Pop";
                                break;
                            case "confirm":
                                that.type = "Confirm";
                                break;
                            default:
                                that.type = "Alert";
                        }
                    }else{
                        that.type = "Alert";
                    }
                    that.mask.css("display", "none");
                    that.wrap.css("display", "none");
                    that.wrap.removeClass("Pop Alert Confirm");
                    that.wrap.find(".title").html(that.title).css("display", "none");
                    that.wrap.addClass(that.type).find(".info").html(that.text);
                    that.wrap.find(".determine").off("click").css("display", "none");
                    that.wrap.find(".ok").off("click").css("display", "none");
                    that.wrap.find(".cancel").off("click").css("display", "none");
                    if(that.type === "Pop"){
                        that.openPop();
                    }else if(that.type === "Confirm"){
                        that.openConfirm();
                    }else{
                        that.openAlert();
                    }
                    that.wrap.css({
                        display: "block"
                    });
                },
                openPop: function(){
                    //pop弹窗
                    var that = this;
                    setTimeout(function(){
                        that.wrap.css("display", "none");
                        if(that.complete){
                            that.complete();
                        }
                    }, that.speed);
                },
                openConfirm: function(){
                    //confirm弹窗
                    var that = this;
                    that.mask.css("display", "block");
                    that.mask.css("display", "block");
                    that.wrap.find(".ok").css("display", "block");
                    that.wrap.find(".cancel").css("display", "block");
                    that.wrap.find(".ok").on("click", function(){
                        that.mask.css("display", "none");
                        that.wrap.css("display", "none");
                        if(that.ok){
                            that.ok();
                        }
                        if(that.complete){
                            that.complete();
                        }
                    });
                    that.wrap.find(".cancel").on("click", function(){
                        that.mask.css("display", "none");
                        that.wrap.css("display", "none");
                        if(that.cancel){
                            that.cancel();
                        }
                        if(that.complete){
                            that.complete();
                        }
                    });
                },
                openAlert: function(){
                    //alert弹窗
                    var that = this;
                    that.mask.css("display", "block");
                    that.wrap.find(".title").css("display", "block");
                    that.wrap.find(".determine").css("display", "block");
                    that.wrap.find(".determine em").html(that.determine_name);
                    that.wrap.find(".determine").on("click", function(){
                        that.mask.css("display", "none");
                        that.wrap.css("display", "none");
                        if(that.determine){
                            that.determine();
                        }
                        if(that.complete){
                            that.complete();
                        }
                    });
                }
            };
            pop.popup(obj);
        }
	});
	$(function(){
		sellToMany.init();
	});
});



