define('openclass/discuslist',['common'],function(require,exports,module){
  var common=require("common");
  //移入显示下拉菜单
    (function(){
        $(".jsMore").hover(function(){
            clearTimeout(this.timer2);
            var _this=this;
            this.timer1=setTimeout(function(){
                $(_this).find(".jsUl").show();
            },300);
        },function(){
            clearTimeout(this.timer1);
            var _this=this;
            this.timer2=setTimeout(function(){
                $(_this).find(".jsUl").hide();
            },300);
        })
    })();

    $.fn.extend({
        alert: function (msg, fnCb,btnMsg) {
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
                    '<div class="bd">' +
                    msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<span class="close u-btn hover">'+btnMsg+'</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                var oAlert = $(sAlert);
                $("body").append(oAlert);
                oAlert.find(".close").unbind("click").bind("click", function () {
                    oAlert.hide();
                    fnCb && 　fnCb.call(this);
                });
                var timer = null;
                oAlert.on("click", function (event) {
                    if ($(event.target).hasClass("m-alert")) {
                    var i = 0;
                    clearInterval(timer);
                    timer = setInterval(function () {
                        oAlert.find(".sibmit .close").toggleClass("active");
                        i++;
                        if (i == 4)
                        clearInterval(timer);
                    }, 120);
                    }
                });

            }
        },
        confirm: function (msg, fnSure, fnCancel, sSure, sCancel) {
            sSure = sSure || "确定";
            sCancel = sCancel || "取消";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert" id="m-confirm" style="display:block;">' +
                        '<div class="in" style="width:260px;margin-left:-130px;">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭">x</a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        msg +
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
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel();
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
        mask:function(){
            if($("#j-mask").length){
                $("#j-mask").show();
            }else{
                $("body").append("<div id='j-mask'>");
            }
        },
        unMask:function(){
            $("#j-mask").hide();
        }
    });
    $.fn.extend({
        showDialog:function(){
            var h=this.height();
            var w=this.width();
            var oWin=$(window);
            this.css({
                "top":oWin.height()/2+oWin.scrollTop(),
                "left":"50%",
                "margin-left":-w/2,
                "margin-top":-h/2,
                "position":"absolute",
                "z-index":$("#mask").css("z-index")*1+1
            });
            $.mask();
            this.show();
        },
        hideDialog:function(){
            this.hide();
            $.unMask();
        }
    }); 
    /*点击轮播*/
      var oUl=$(".focus"); 
      var aLi=oUl.find("li");
      var aPoit=$(".focus-yd li");
      var oNext=$(".focus-jt .f-next");
      var oPrev=$(".focus-jt .f-last");
      var count=aLi.length;
      var iNow=0;
      var speed=300;// 渐变效果
      var slideSpeed=6000;//切换时间
      var timer=null;
      oNext.on("click",function(){
        slide("next");
      });
      oPrev.on("click",function(){
        slide("prev");
      });
      aPoit.on("click",function(){
        var index=$(this).index();
        if(iNow==index)return;
        slide(index);
      }).hover(function(){
        clearInterval(timer);
      },function(){
        begin();  
      });
      begin();
      function slide(type){
        if(aLi.eq(iNow).is(":animated")) return;
        aLi.eq(iNow).css({"z-index":0}).animate({"opacity":0},speed);
        if(type==="next"){
          iNow++;
        }else if(type==="prev"){
          iNow--;
        }else{
          iNow=type;
        }
        if(iNow<0){
          iNow=count-1;
        }else if(iNow===count){
          iNow=0;
        }
        aLi.eq(iNow).css({"z-index":1,"opacity":0.7}).animate({"opacity":1},speed); 
        pointer();
        begin();
      }
      function begin(){
        if(count<=1) return; 
        clearInterval(timer);
        timer=setInterval(function(){
          slide("next");
        },slideSpeed);
      }
      function pointer(){
        aPoit.removeClass("crt").eq(iNow).addClass("crt");
      } 




  $(".pra-tit").on("click", function () {
    var great_icon = $(this).find(".icon-praise");
    var forum_id = $(this).attr("data-forum_id");
    var great_num = parseInt($(this).find(".pra-em").html());
    var great_val = $(this).find(".pra-em");
    if (great_icon.hasClass("icon-get")) {
        //取消点赞
        var ajaxurl = "/ajax/cancelPraise";
        var num = great_num - 1;
    } else {
        var ajaxurl = "/ajax/praiseLog";
        var num = great_num + 1;
    }
    $.ajax({
        type: "POST",
        url: ajaxurl,
        dataType: "json",
        data: {forum_id: forum_id, type: 1},
        success: function (data) {
            if (data.status==1) {
                if (great_icon.hasClass("icon-get")) {
                    great_icon.removeClass("icon-get");
                }else{
                    great_icon.addClass("icon-get");
                }
                great_val.html(num);
            }else if(data.status==2){
                $.fn.alert(data.info, function () {
                    location.href = "/Forum/";
                });
            } else {
                $.fn.alert(data.info, function () {
                    if (data.data) {
                        location.href = data.data;
                    }
                });
            }
        }
    });
  });
});