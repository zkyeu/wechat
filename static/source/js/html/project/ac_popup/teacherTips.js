$(document).ready(function(){ 
    debugger;
    ;(function(){
        var type = $("body").attr("AC-type");
        if(!type) return;
        var $body = $("body");
        var href = $("link[type$=css]").attr("href").split("com")[0]+"com/";
        if($(".actimmer,.ans-remind").length>0){
            var top = $(".actimmer,.ans-remind").offset().top +"px";
            var left = $(".actimmer,.ans-remind").offset().left +"px";
        }
         var tipsFn = new function(){
            var me = this;
            me.initCss = function(){
                $("head").append('<style>.ac_confim{\
                    width:100%;\
                    height:100%;\
                    background: black;\
                    opacity: 0.7;\
                    filter: Alpha(opacity=7);\
                    -moz-opacity:0.7;\
                    position: fixed;\
                    top:0;\
                    left:0;\
                    display: none;\
                    z-index: 60;\
                }\
                .confim_box{\
                        z-index: 65;\
                        display: none;\
                        width:830px;\
                        height:450px;\
                        position: absolute;\
                        left:50%;\
                        top:50px;\
                        margin-left:-415px;\
                }\
                .confim_box .confirm{\
                        display: none;\
                        text-align: center;\
                        color: #fff;\
                        position: absolute;\
                    }\
                .confim_box .confirm p{\
                            text-align: center;\
                        }\
                 .confim_box .confirm a{\
                            font-size: 20px;\
                            text-decoration: underline;\
                            color:#dace1a;\
                        }\
                .confim_box .confirm .last_text{\
                            margin-bottom:10px;\
                    }\
                .confim_box .confirm_1{\
                    width: 215px;\
                    height:202px;\
                    background: url("'+href+'/images/html/ac_popup/confirm_1.png") no-repeat;\
                    right:0;\
                    top:0;\
                    padding-top: 60px;\
                }\
                .confim_box .confirm_2{\
                    background: url("'+href+'/images/html/ac_popup/confirm_2.png") no-repeat;\
                    right:240px;\
                    top:50px;\
                    width:293px;\
                    height:247px;\
                }\
                .confim_box .confirm_2 .text-box{\
                    padding-top:130px;\
                    padding-left:50px;\
                }\
                .confim_box .confirm_2 .text-box p{\
                    text-align:left;\
                }\
                .confim_box .confirm_2 .text-box a{\
                    text-align:left;\
                    display: block;
                    margin-left: 55px;
                }\
                .confim_box .confirm_3{\
                    background: url("'+href+'/images/html/ac_popup/confirm_3.png") no-repeat;\
                    left:60px;\
                    top:162px;\
                    width:239px;\
                    height:155px;\
                    padding-top: 48px;\
                    padding-left: 19px;\
                }\
                .confim_box .confirm_4{\
                    background: url("'+href+'/images/html/ac_popup/confirm_4.png") no-repeat;\
                    right:240px;\
                    bottom:20px;\
                    width:202px;\
                    height:146px;\
                    padding-top: 50px;\
                }\
                .relative-confirm{\
                    position:relative;\
                    z-index:300;\
                    background:#fff;\
                    padding:5px;\
                }\
                </style>');
            }

            me.domHtml = {
                mask : '<div class="ac_confim"></div>',
                confim_box : '<div class="confim_box"></div>',
                confim_1: '<div class="confirm confirm_1">\
                                <P>Click here to </P>\
                                <p>go back to the classroom if </p>\
                                <p>the student finishes</p>\
                                <p class="last_text">answering.</p>\
                                <a href="javascript:;">ok</a>\
                            </div>',
                confim_2: '<div class="confirm confirm_2">\
                                <div class="text-box">\
                                    <P>Suggested time for</P>\
                                    <p class="last_text"> answering.</p>\
                                    <a href="javascript:;">ok</a>\
                                </div>\
                            </div>' ,
                confim_3:  '<div class="confirm confirm_3">\
                                <P>Click here to move to </P>\
                                <p class="last_text">the next question.</p>\
                                <a href="javascript:;">ok</a>\
                            </div>',
                confim_4: '<div class="confirm confirm_4">\
                                <P>Click here to send the </P>\
                                <p class="last_text">question to the student.</p>\
                                <a href="javascript:;">ok</a>\
                            </div>'      
            }

            me.cookieFn = {
                set:function(name,value,days,path,domain,secure){
                    document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)
                    +(days?"; expires="+this.setDays(days):"")
                    +(path?"; path="+path:"; path=/")
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
            }

            me.getHTML = function(){
                for(var x in me.domHtml){
                    me.domHtml[x] = $(me.domHtml[x]);
                }
            }

            me.bindEvent = function(){//结果页
                var domHtml = me.domHtml;

                domHtml.confim_2.on("click","a",function(){
                    $(".a-close,.u-ac-close").addClass("relative-confirm");
                    // $(".actimmer,.ans-remind").removeClass("relative-confirm");
                    domHtml.confim_2.fadeOut(function(){
                        domHtml.confim_1.fadeIn();
                    });
                });

                domHtml.confim_1.on("click","a",function(){
                    domHtml.confim_box.fadeOut();
                    domHtml.mask.fadeOut();
                    $(".a-close,.u-ac-close").removeClass("relative-confirm");
                });
                domHtml.confim_3.on("click","a",function(){
                      domHtml.confim_3.fadeOut(function(){
                        $(".ac-dialog-switch").css('z-index','5');
                        domHtml.confim_4.fadeIn();
                      });
                });
               domHtml.confim_4.on("click","a",function(){
                    domHtml.confim_box.fadeOut();
                    domHtml.mask.fadeOut();
                    $(".btn-teasend,.s-t-s").removeClass("relative-confirm");
                });
            }

            me.creatHTMLResult = function(){
                //$(".a-close,.u-ac-close").addClass("relative-confirm");
                // $(".actimmer,.ans-remind").addClass("relative-confirm");

                var domHtml = me.domHtml;
                if($(".actimmer,.ans-remind").length == 0 && $(".a-close,.u-ac-close") == 0) return;
                domHtml.confim_box.show().append(domHtml.confim_2.show());
                domHtml.confim_box.append(domHtml.confim_1);
                domHtml.tips = domHtml.confim_box.add(domHtml.mask.show());
                domHtml.tips.appendTo("body");
            }

            me.creatHTMLSendMore = function(){//一页多道题情况
                $(".btn-teasend,.s-t-s").addClass("relative-confirm");
                // $(".a-close").addClass("relative-confirm");
                $(".ac-dialog-switch").css('z-index','300');
                var domHtml = me.domHtml;
                domHtml.confim_box.show().append(domHtml.confim_3.show());
                domHtml.confim_box.append(domHtml.confim_4);
                domHtml.tips = domHtml.confim_box.add(domHtml.mask.show());
                domHtml.tips.appendTo("body");
            }

            me.creatHTMLSend = function(){//简单发送
                $(".btn-teasend,.s-t-s").addClass("relative-confirm");
                var domHtml = me.domHtml;
                domHtml.confim_box.show().append(domHtml.confim_4.show());
                domHtml.tips = domHtml.confim_box.add(domHtml.mask.show());
                domHtml.tips.appendTo("body");
            }

            me.initResult = function(){
                me.initCss();
                me.getHTML();
                me.bindEvent();
                me.creatHTMLResult();
            }

            me.initSendMore = function(){
                me.initCss();
                me.getHTML();
                me.bindEvent();
                me.creatHTMLSendMore();
            }

            me.initSend = function(){
                me.initCss();
                me.getHTML();
                me.bindEvent();
                me.creatHTMLSend();
            }


        }

        window.tipsFn = tipsFn;

        //结果页

        if(type == "result"){
            if($(".ac-dialog-switch").length){
              $(".ac-dialog-switch").css('z-index','5'); 
            }
            if(tipsFn.cookieFn.get("result")){
                return;
            }else{
                tipsFn.initResult();
                tipsFn.cookieFn.set("result",365);
            }
           
           
        }
        //发送页
        if(type == "send"){
            var ac_more = $(".ac-dialog-switch").length;
            if(ac_more){
                //一页多道题的情况
                if(tipsFn.cookieFn.get("sendMore")){
                return;
                }else{
                    tipsFn.cookieFn.set("sendMore",365)
                    tipsFn.initSendMore();
                }  
            }else{//
                if(tipsFn.cookieFn.get("send")){
                return;
                }else{
                    tipsFn.cookieFn.set("send",365)
                    tipsFn.initSend();
                }    
            }
        }
        
    })();
});
    
    
