/**
 *
 * @authors vincent (wuyan@51talk.com)
 * @date    2017-04-18 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
    
    var lessons = {
        init: function(){
            $(".chose_detail").on("click", ".arrow", this.choseTime);//选择日期获取数据
        },
        choseTime: function(){
            var current_date = $("#current_date").val();
            var day;
            var opeday;
            if($(this).hasClass("arrow_left")){
                day = moment(current_date).subtract(1, 'days').format('YYYYMMDD');
                opeday = moment(current_date).subtract(1, 'days').format('YYYY-MM-DD');
            }else{
                day = moment(current_date).add(1, 'days').format('YYYYMMDD');
                opeday = moment(current_date).add(1, 'days').format('YYYY-MM-DD');
            }
            
            
            $.ajaxRequest("dayajax",{day: day},function(response){
                var str = "";
                var template = $(".mode").clone().removeClass("mode");
                
                
                $(".chose_detail span").html(response.current_date);
                $("#current_date").val(opeday);
                for(var item in response.result){
                    $(template).attr("id",response.result[item].lesson_id)
                            .find("img")
                            .attr("src",response.result[item].cover)
                            .end()
                            .find(".time")
                            .html(item)
                            .end()
                            .find(".titledesc a")
                            .html(response.result[item].course_name)
                            .end()
                            .find(".desc")
                            .html(response.result[item].title)
                            .end()
                            .find(".ids")
                            .html(response.result[item].class_id)
                            .end()
                            .find(".calss_name")
                            .html(response.result[item].calss_name)
                            .end()
                            .find(".class_status")
                            .html(response.result[item].course_state)
                            .end()
                            .find(".class_link")
                            .attr("href",response.result[item].classUrl);
                    if(response.result[item].course_type != 20){
                        $(template).find(".tag").remove();
                    }
                    if(response.result[item].hideClass == 1){
                        $(template).find(".class_link").eq(0).remove();
                    }
                    if(response.result[item].bookUrl){
                        $(template).find(".titledesc")
                            .addClass("haslink")
                            .find("a")
                            .attr({"href":response.result[item].bookUrl,"target":"_blank"})
                    }else{
                        $(template).find(".titledesc")
                            .removeClass("haslink")
                            .find("a")
                            .attr("href","javascript:;")
                    }
                    str+=$(template).prop("outerHTML")
                }
                $(".dayinfos").html(str);
            })
        }
        
        

    };
    $.extend(true,$,{
        ajaxRequest: function(url, params, callback, settings){
            var ajaxRequest = $.ajax({
                url: url,
                type: (settings && settings.method) || "GET",
                dataType: (settings && settings.dataType) || "json",
                data: params
            })
            ajaxRequest.done(function(response){
                if(response.status == 0){
                    !!callback && callback(response);
                }else{
                    console.log(response.msg);
                }
            }).fail(function(){
                console.log("fail")
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
        var hash = window.location.hash;
        var id = hash.substring(hash.indexOf("#") + 1);
        if(id){
            var element = $(".dayinfo[id='"+id+"']");
            var position = $(element).position().top;
            $(window).scrollTop(position);
        }
        lessons.init();
    });
});



