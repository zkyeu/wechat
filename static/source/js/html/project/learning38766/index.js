define('index',['cart'],function(require,exports){
        $.fn.extend({
        addSelect: function () {
            return this.each(function (index, ele) {
                var oSelect = $(ele);
                var aOption = oSelect.children();
                var sDiv = '<div class="u-sec">';
                var sH5 = '<h5 class="seced">' + aOption.eq(ele.selectedIndex).html() + '</h5><ul class="secls">';
                sDiv += sH5;
                aOption.each(function (index, ele) {
                    var sLi = '<li>' + $(ele).html() + '</li>';
                    sDiv += sLi;
                });
                sDiv += '</ul></div>';

                var oDiv = $(sDiv);
                oSelect.after(oDiv);

                var oUl = oDiv.find("ul");
                var oH5 = oDiv.find("h5");
                var oSelect = oDiv.prev();
                var aLi = oUl.children();

                var liCount=oSelect.attr("data-count") || 6;
                var divWidth=oSelect.attr("data-width");
                if(divWidth){
                    oDiv.css("width",divWidth);
                }
                if (aLi.length < liCount) {
                    oUl.height(24 * aLi.length);
                } else {
                    oUl.height(24 * liCount);
                }

                aLi.each(function () {
                    $(this).on("click", function () {
                        var oLi = $(this);
                        var oldIndex=oSelect[0].selectedIndex;
                        if(oSelect[0].selectedIndex!=oLi.index()){
                            oSelect[0].selectedIndex=oLi.index();
                            oH5.html(oLi.html());
                            oSelect.change();
                        }
                        //js改变selectedIndex时不会触发change事件，要用js触发下
                        oDiv.removeClass("open");
                        oUl.removeClass("open");
                        oH5.removeClass("open");
                    });
                });
                oH5.on("click", function () {
                    oH5.toggleClass("open").next().toggleClass("open");
                    oDiv.toggleClass("open");
                    $(".u-sec ul").not(oH5.next()).removeClass("open");
                    $(".u-sec").not(oDiv).removeClass("open");
                    $(".u-sec h5").not(oH5).removeClass("open");
                    
                    //return false;
                });
                //li hover样式切换
                if($.browser.version == "6.0" || $.browser.version == "7.0"){
                    aLi.mouseover(function(){
                        aLi.removeClass("hover");
                        $(this).addClass("hover");
                    });
                }
            });
        },
        addRadio: function () {
            return this.each(function (index, ele) {
                var inputRadio = $(ele);
                var oRadio = $('<span class="u-rad"></span>');
                inputRadio.after(oRadio);
                if (inputRadio.prop("checked")) {
                    oRadio.addClass("check");
                }
                if (inputRadio.prop("disabled")) {
                    return true;
                }
                oRadio.parent().on("click", function () {
                    var oLabel = $(this);
                    var oRadio2 = oLabel.find("input[type='radio']");
                    var sName = oRadio2.attr("name");

                    $("input[name=" + sName + "]").not(oRadio2).each(function (index, ele) {
                        var oLabel2 = $(ele).attr("checked", false).parent();
                        oLabel2.find(".u-rad").removeClass("check");
                    });
                    if(!oRadio2.prop("checked")){
                        oRadio2.attr("checked", true);
                        oRadio.addClass("check");
                        if(oRadio.next().html()=="选用QQ上课"){
                            $('.add-z-ac').show();
                        }else{
                            $('.add-z-ac').hide();
                        }
                        oRadio2.change();
                    }else if(oRadio2.attr("data-extend")){
                        oRadio2.attr("checked", false);
                        oRadio.removeClass("check");
                        oRadio2.change();
                    }
                    return false;
                });
            });
        },
        unChecked: function () {
            return this.each(function (index, ele) {
                if(ele.type.toLowerCase()=="radio"){
                    $(ele).attr("checked",false).next().removeClass("check");
                }else{
                    $(ele).attr("checked",false).next().removeClass("checked");
                }
            });
        },
        checked: function () {
            return this.each(function (index, ele) {
                if(ele.type.toLowerCase()=="radio"){
                    $(ele).attr("checked",true).next().addClass("check");
                }else{
                    $(ele).attr("checked",true).next().addClass("checked");
                }
                
            });
        },
        addCheckbox: function () {
            return this.each(function (index, ele) {
                var inputCheckbox = $(ele);
                var oCheckbox = $('<span class="u-ckb"></span>');
                inputCheckbox.after(oCheckbox);
                if (inputCheckbox.prop("checked")) {
                    oCheckbox.addClass("checked");
                }
                if (inputCheckbox.prop("disabled")) {
                    return true;
                }
                oCheckbox.parent().on("click", function () {
                    var oLabel = $(this);
                    inputCheckbox.attr("checked",!inputCheckbox.prop("checked"));
                    oCheckbox.toggleClass("checked");
                    inputCheckbox.change();
                    return false;
                });
            });
        },
        dialogCenter:function(){
            return this.each(function (index, ele) {
                var oDialog = $(ele);
                var oContent = oDialog.find(".in");
                var oBd = oContent.find('.bd');
                var maxHeight = 505;
                if(oBd.height()>maxHeight){
                    oBd.height(maxHeight);
                }
                var y ;
                var offsetTop = ($(window).height()-oContent.outerHeight()) / 2,
                    offsetLeft = oContent.outerWidth() / 2;
                if( offsetTop > 0) {
                    y = offsetTop
                }else {
                    y = '20px';
                }
                oContent.css({
                    top : y,
                    marginLeft : -offsetLeft
                });
            });
        },
        alertCkplayer:function(){
            var _this=this;
            require.async("ckplayer",function(ckplayer){
                _this.each(function (index, ele) {
                    $(ele).live('click', function () {
                        var src=$(this).attr("data-src");
                        if(!src)return;
                        var title=$(this).attr("data-title");
                        if($("#ckplayerDialog").length==0){
                            $("body").append(
                                '<div class="m-dialog" id="ckplayerDialog">'+
                                    '<div class="in">'+
                                        '<div class="hd">'+
                                          '<a class="close" href="javascript:void(0)" title="关闭">x</a>'+
                                          '<h4 class="u-tt-md">如何上课及上课常见问题</h4>'+
                                        '</div>'+
                                        '<div class="j-bd" id="playerContent"></div>'+
                                    '</div>'+
                                '</div>'
                            );
                        }
                        //http://www.ckplayer.com/tool/flashvars.htm
                        ckplayer.embed(
                            '/static/js/lib/ckplayer/ckplayer.swf',
                            'playerContent',
                            'ckplayer_playerContent',
                            '800',
                            '450',
                            false,
                            {f: src, c: 0, b: 1, p: 1},
                            [src],
                            {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
                        );

                        $("#ckplayerDialog").show().dialogCenter().find("h4").html(title);
                    });
                });
            });
            return this;
        }
    }); 
    $.extend({
        alert: function (msg, fnCb,btnMsg,bCheckbox) {
            btnMsg=btnMsg || "确&nbsp;定";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<label class="u-lab" style="display:none;" for="jsFor">'+
                      '<input class="f-dn" id="jsFor" type="checkbox" value="不再提示">'+
                      '<span class="u-txt">不再提示</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</label>'+
                    '<span class="close u-btn hover">'+btnMsg+'</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                    $("body").append(sAlert);
                    var timer = null;
                    $("#m-alert").on("click", function (event) {
                        if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $("#m-alert").find(".sibmit .close").toggleClass("active");
                            i++;
                            if (i == 4)
                            clearInterval(timer);
                        }, 120);
                        }
                    });
                }
                var oCheckbox=$("#jsFor");
                oCheckbox.parent().hide();
                if(bCheckbox){
                    if(oCheckbox.next(".u-ckb").length==0){
                        $("#jsFor").addCheckbox();
                    }
                    oCheckbox.parent().show();
                }
                $("#m-alert").find(".close").unbind("click").bind("click", function () {
                    $("#m-alert").hide();
                    fnCb && fnCb();
                });            
        },
        tips: function (msg, fnCb,btnMsg,bCheckbox) {
            btnMsg=btnMsg || "确&nbsp;定";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<label class="u-lab" style="display:none;" for="jsFor">'+
                      '<input class="f-dn" id="jsFor" type="checkbox" value="不再提示">'+
                      '<span class="u-txt">不再提示</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</label>'+
                    '<span class="close u-btn hover">'+btnMsg+'</span>' +
                    '<span class="goto u-btn hover">马上测试</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                    $("body").append(sAlert);
                    var timer = null;
                    $("#m-alert").on("click", function (event) {
                        if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $("#m-alert").find(".sibmit .close").toggleClass("active");
                            i++;
                            if (i == 4)
                            clearInterval(timer);
                        }, 120);
                        }
                    });
                }
                var oCheckbox=$("#jsFor");
                oCheckbox.parent().hide();
                if(bCheckbox){
                    if(oCheckbox.next(".u-ckb").length==0){
                        $("#jsFor").addCheckbox();
                    }
                    oCheckbox.parent().show();
                }
                $("#m-alert").find(".close").unbind("click").bind("click", function () {
                    $("#m-alert").hide();
                    fnCb && fnCb();
                });            
        },
        confirm: function (msg, fnSure, fnCancel, sSure, sCancel,bCheckbox,reverse) {
            sSure = sSure || "确定";
            sCancel = sCancel || "取消";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd p:first").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert" id="m-confirm" style="display:block;">' +
                        '<div class="in" style="width:260px;margin-left:-130px;">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭">x</a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        '<p>'+msg+'</p>' +
                        '<p class="f-tal" style="display:none;">'+
                        '<label class="u-lab" for="jsFor2">'+
                          '<input class="f-dn" id="jsFor2" type="checkbox" value="以后不再提示">'+
                          '<span class="u-txt">以后不再提示</span>'+
                        '</label>'+
                        '</p>'+
                        '</div>' +
                        '<div class="ft">' +
                        '<div class="sibmit f-tac">' +
                        '<span class="u-btn active jsSure">' + sSure + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn hover jsCancel">' + sCancel + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                var oConfirm = $(sConfirm);
                $("body").append(oConfirm);
                var timer = null;
                oConfirm.on("click", function (event) {
                    if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            oConfirm.find(".jsSure").toggleClass("active");
                            i++;
                            if (i == 4)
                                clearInterval(timer);
                        }, 120);
                    }
                });

            }
            var oCheckbox=$("#jsFor2");
            var oI=$("#m-confirm").find(".sibmit i");
            oCheckbox.parent().parent().hide();
            if(bCheckbox){
                if(oCheckbox.next(".u-ckb").length==0){
                    $("#jsFor2").addCheckbox();
                }
                oCheckbox.parent().parent().show();
            }
            if(reverse){
                oI.after($("#m-confirm").find(".jsSure"));
                oI.before($("#m-confirm").find(".jsCancel"));
            }else{
                oI.after($("#m-confirm").find(".jsCancel"));
                oI.before($("#m-confirm").find(".jsSure"));
            }
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel.call(this);
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        },

        loading: function () {
            if ($("#m-load").length) {
            $("#m-load").show();
            } else {
            var sLoading = '<div class="m-load" id="m-load" style="display:block;">正在努力加载中</div>';
            $("body").append(sLoading);
            }
        },
        unloading: function () {
            $("#m-load").hide();
        },
        tips2: function (msg, fnCb,btnMsg,bCheckbox) {
            btnMsg=btnMsg || "下次再说";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<label class="u-lab add-u-lab" for="jsFor">'+
                      '<input class="add-check-b" type="checkbox" value="不再提示">'+
                      '<span class="u-txt">不再提示</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '</label>'+
                    '<span class=" u-btn hover nextGo">'+btnMsg+'</span>' +
                    '<span class="goto u-btn hover">马上测试</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                    $("body").append(sAlert);
                    var timer = null;
                    $("#m-alert").on("click", function (event) {
                        if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $("#m-alert").find(".sibmit .close").toggleClass("active");
                            i++;
                            if (i == 4)
                            clearInterval(timer);
                        }, 120);
                        }
                    });
                    
                    
                }
                $("#m-alert").find(".close").unbind("click").bind("click", function () {
                    $("#m-alert").hide();
                    $("#m-alert").remove();
                    fnCb && fnCb();

                });            
        }

    });
    //js动态添加模拟checkbox
    $("input[type='checkbox'].f-dn").each(function (index, ele) {
       $(ele).addCheckbox();
    });
    require("cart").cart();

    $(function (){
        var prizeArr = [0,1,2,5,8,7,6,3];
        var prizeLi = $('#prizeList li');
        var isRotate = false;

        /*获奖名单播放*/
        function scroll_news(){
            var firstNode = $('.nameList li'); 
            firstNode.eq(0).fadeOut('slow',function(){ //获取li的第一个,执行fadeOut
             $(this).clone().appendTo($(this).parent()).show('slow'); //把每次的li的第一个克隆，然后添加到父节点 对象。
             $(this).remove();//去掉每次的第一个li。
            });
        }
        setInterval(scroll_news,2000);
        
        //点击抽奖按钮
        $('#pointer').mousedown(function(){
            $(this).addClass("prizeActive");
        })
        $('#pointer').mouseup(function(){
            $(this).removeClass("prizeActive");
            if(isRotate){
                return false;
            }
            isRotate = true;
            getPrize();
        });
        //抽奖ajax
        function getPrize(){
            var dataLotteryUrl=$(".lottery").attr("data-lottery-url");
            var LoginVal=$("#isLogin").val();
            var loginUrl=$("#login_url").attr("href");
            if(LoginVal==0){
              $(".systemLayer").show();
              $(".systemLayer .know").click(function(){
                $(".addLayer").hide();
                location.href=loginUrl; 
              });
            }else if(LoginVal==1){
              $.ajax({
                  url:dataLotteryUrl,
                  data:{id:24},
                  type: "post",
                  dataType: "json",
                  success: function(rs){
                      if(rs.status == 1){
                          var data = rs.data;
                          rollUp(data.angle,data.prize)
                      }else{
                          //错误提示
                          $('#prizeLog .log').hide().eq(1).html(rs.info).show();
                          showLog();
                      }
                  },
                  complete: function(){
                      isRotate = false;
                  }
              });
            }
        }

        //转盘运动
        function rollUp(num,info){
            var iNow = 0;
            var repeat = 1;
            var timer = setInterval(function(){
                prizeLi.removeClass("active");
                iNow++;
                if(iNow==prizeArr.length){
                    iNow=0;
                    repeat+=1;
                }
                
                prizeLi.eq(prizeArr[iNow]).addClass("active");
                if(repeat>=4 && (iNow==num-1)){
                    clearInterval(timer);
                    $('#myPrize').html(info);
                    $('#prize img').hide().eq(iNow).show();
                    showDialog();
                }
            },300)
        }
        //微博 微信 下拉
        $(".jsMore").hover(function(){
            $(this).find('.jsUl').show();
        },function(){
            $(this).find('.jsUl').hide();
        });

        //抽奖记录
        $('#logBtn').click(function(){
          var dataLogUrl=$("#logBtn").attr("data-log-url");
          var LoginVal=$("#isLogin").val();
          var loginUrl=$("#login_url").attr("href");
          if(LoginVal==0){
            $(".systemLayer").show();
            $(".systemLayer .know").click(function(){
              $(".addLayer").hide();
              location.href=loginUrl; 
            });
          }else if(LoginVal==1){
            $.ajax({
                url: dataLogUrl,
                dataType: 'json',
                type: 'POST',
                data:{id:24},
                success: function(rs){
                    if(rs.status == 1){
                        showLog();
                        $('#prizeLog .log').hide().eq(0).show().find('p').html(rs.data.prize);
                    }else{
                        showLog();
                        $('#prizeLog .log').hide().eq(1).show().html(rs.info);
                    }
                }
            });
          }
        })

        $('#closeDialog').click(closeDialog);
        $('#closeLog').click(closeLog);
        function showDialog(){
            $('#dialog,#mask').show();
        }
        function closeDialog(){
            $('#dialog,#mask').hide();
        }
        function showLog(){
            $('#prizeLog,#mask').show();
        }
        function closeLog(){
            $('#prizeLog,#mask').hide();
        }
    });
})


