define('prize',['cart','rotate'],function(require,exports,module){

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
  
 
//js动态添加模拟checkbox
    $("input[type='checkbox'].f-dn").each(function (index, ele) {
       $(ele).addCheckbox();
    });
    require("cart").cart();
     require('rotate');
  $(function (){
    var bRotate = false;
    /* 转动超时 */
    var rotateTimeOut = function (){
      $('#rotate').rotate({
        angle:0,
        animateTo:2160,
        duration:8000,
        callback:function (){
          /* 转动超时后的操作放这里 */
        }
      });
    };
    /* 
      @转动结束
      @awards: 第几种奖品
      @angles: 奖盘转动角度
      @txt: 奖品信息
    */
    var rotateFn = function (id, angle, prize, nick_name){
      console.log(angle);
      bRotate = !bRotate;
      $(".show-prize").find(".p-show-img").hide();
      $('#rotate').stopRotate();
      $('#rotate').rotate({
        angle:0,
        animateTo:angle+1800,
        duration:8000,
        callback:function (){
          /* 转动结束后的操作放这里 */
          bRotate = !bRotate;
          $(".dialog").hide();
          function yearsShow(){
            //获奖记录插入
            var showPrize=$(".show-prize").find(".p-show-img").eq(id-1);//图片显示
            var $li = $('<li class="chick"><span>'+nick_name+'</span>学员抽中<b>'+prize+'</b></li>');
            $(".name li").eq(3).after($li);
            //我的奖品展示
            var str='恭喜您获得:<span id="layer-prize"></span>';
            $(".won-center").find("p").html(str);
            $(".won-center").addClass("add-active-p");
            $(".years-prize").show();
            $(".years-prize").find("#dialog-prize").text(prize);
            $("#layer-prize").text(prize);
            showPrize.show();
            $(".showArea").find(".p-show-img").attr("src",showPrize.attr("src"));
          }
          switch(id){
            case 1://2次课时
              yearsShow();
              break;
            case 2://3次课时
              yearsShow();
              break;
            case 3://行车记录仪
              yearsShow();
              break;
            case 4://5次课时
              yearsShow();
              break;
            case 5://玫瑰
              yearsShow();
              break;
            case 6://乐高
              yearsShow();
              break;
            // case 10://谢谢参与
            //   $(".notWin").show();
            //   if($(".won-center").find("p").hasClass("add-active-p")){//中奖了
            //     return;
            //   }else{//未中奖
            //     $(".won-center").find("p").text("您未中奖，请再接再厉！");
            //     $(".showArea").find(".p-show-img").attr("src",$(".show-prize").find(".p-show-img").eq(id-1).attr("src"));
            //   }
            //   break;
            default:
          }
        }
      });
    };

    $('.pointer').click(function (){
      var dataUrl=$(this).attr("data-url");
      if(bRotate)return;
      n=$('.lottery-times').html();
      /* 数据接口 */
        $.ajax({
           type: "post",
           dataType: "json",
           url:dataUrl,
           data:{},
           success:function(res) {
           /* 得到数据后 */
           if(res.status==1){//成功状态
              if(n==0){
                $(".dialog").hide();
                $(".numAwards").show();
              }else{
                rotateFn(res.data.id, res.data.angle, res.data.prize, res.data.nick_name);
                var num=parseInt(n)-1;
                $('.lottery-times').text(num);
              }
              // if(num==0){return;};
            }else if(res.status==-1){//失败
              $(".dialog").hide();
              alert(res.info);
            }else{
              if(res.data){//未登陆
                $(".dialog").hide();
                $("#mask").show();
                $("#openWidnow").show();
              }else{//已抽过
                $(".dialog").hide();
                $(".numAwards").show();
              }
            }
          }
        });
      /*数据模拟*/
      // var item = rnd(0,7);

      // switch (item) {
      //  case 0:
      //    var angle = [26, 88, 137, 185, 235, 287, 337];
      //    rotateFn(0, 337, '未中奖');
      //    break;
      //  case 1:
      //    var angle = [88, 137, 185, 235, 287];
      //    rotateFn(1, 26, '免单4999元');
      //    break;
      //  case 2:
      //    var angle = [137, 185, 235, 287];
      //    rotateFn(2, 88, '免单50元');
      //    break;
      //  case 3:
      //    var angle = [137, 185, 235, 287];
      //    rotateFn(3, 137, '免单10元');
      //    break;
      //  case 4:
      //    var angle = [185, 235, 287];
      //    rotateFn(4, 185, '免单5元');
      //    break;
      //  case 5:
      //    var angle = [185, 235, 287];
      //    rotateFn(5, 185, '免单5元');
      //    break;
      //  case 6:
      //    var angle = [235, 287];
      //    rotateFn(6, 235, '免分期服务费');
      //    break;
      //  case 7:
      //    var angle = [287];
      //    rotateFn(7, 287, '提高白条额度');
      //    break;
      // }
      // console.log(item);
    });
  });
  // function rnd(n, m){
  //   return Math.floor(Math.random()*(m-n+1)+n)
  // }

/*回到顶部*/
  (function(){
    $("body").append('<div id="u-gotop"><a href="javascript:;" title="回到顶部">回到顶部</a></div>');
      $(window).on("load scroll",function(){
          if($(window).scrollTop()>1000){
              $("#u-gotop").fadeIn();
          }else{
              $("#u-gotop").fadeOut();
          }
      });
      $("#u-gotop").on("click",function(){
          $("body,html").animate({scrollTop: 0}, "fast");
      });
  })();
/*获奖名单播放*/
function scroll_news(){
  var firstNode = $('.name li'); 
  firstNode.eq(0).fadeOut('slow',function(){ //获取li的第一个,执行fadeOut
   $(this).clone().appendTo($(this).parent()).show('slow'); //把每次的li的第一个克隆，然后添加到父节点 对象。
   $(this).remove();//去掉每次的第一个li。
  });
}
setInterval(scroll_news,2000);//每隔0.5秒，执行scroll_news()

/*弹层隐藏*/
$(".del").on("click",function(){
  $(".dialog").hide();
});

//微博 微信 下拉
  $(".jsMore").hover(function(){
      $(this).find('.jsUl').show();
  },function(){
      $(this).find('.jsUl').hide();
  });

// 立即领取
$(".receive li").click(function(){
  var dataRece=$(".receive").attr("data-receive-url");
  var card_money=$(this).attr("data-rece-name");
  var $this=$(this);
  if($this.find("span").hasClass("on")){
    $this.unbind("click");
  }
  $.ajax({
    type: "post",
     dataType: "json",
     url:dataRece,
     data:{card_money:card_money},
     success:function(res) {
      if(res.status==1){
        $this.find("span").addClass("on");
        var index=$this.index();
        $(".recWin").show();
        $(".recWin").find(".money").text();
        if(index==0){
          $(".recWin").find(".money").text(300);
        }else if(index==1){
          $(".recWin").find(".money").text(500);  
        }else if(index==2){
          $(".recWin").find(".money").text(800);  
        }
      }else if(res.status==0){//未登陆状态
        $("#mask").show();
        $("#openWidnow").show();
      }else if(res.status==-1){//领取限制
        alert(res.info);
      }
     }
  });
});

// 信息提交
$(".years-submit").click(function(){
  var reTel = /^1[0-9]{10}$/;
  var nameR = /^[\u4E00-\u9FA5A-Za-z]+$/;
  var real_name=$(".username").val();
  var user_mobile=$(".iphone").val();
  var user_addr=$(".adress").val();
  if(real_name==""){
    alert("请填写姓名");
    return false;
  }
  if(!nameR.test(real_name)){
    alert("只能输入中文和英文");
    return false; 
  }
  if(user_mobile==""){
    alert("请填写电话号码");
    return false;
  }
  if (!reTel.test(user_mobile)){
    alert("请填写正确格式手机号码");
    return false;
  }
  if(user_addr==""){
    alert("请填写联系地址");
    return false;
  }   
  $.ajax({
    type: "post",
     dataType: "json",
     url:"/ajax/saveUserAddr",
     data:{real_name:real_name,user_addr:user_addr,user_mobile:user_mobile},
     success:function(res) {
      if(res.status==-1){
        alert(res.info); 
      }else{
        $(".years-prize").hide(); 
      }
     }
  });
});

// 分享抽奖机会
$(".years-img-btn").click(function(){
  $(".wechat").addClass("wechat-hover");
});

$(".mask").on("click",function(){
  $('.mask,.openWidnow').hide();
  $(this).hide();
});

/*获取验证码*/
$(".tel_btns").click(function(){
  if (this.bAjax) {
    return;
  }
  var _this=this;
  var reTel = /^1[0-9]{10}$/;
  var mobile=$("#mobile3").val();
  var imgCode = $('#authCode').val();
  if(!reTel.test(mobile)){
      alert("请填写正确的手机号码！");
      return false;
  }else if(!imgCode||(imgCode.length && imgCode.length<1)){
    alert("请填写图形验证码！");
    return false;

  }else{
    this.bAjax=true;
    $(this).html("请稍等...");
    var dataUrl = $(".mobileCode").attr("data-url");
    $.ajax({
          type:"GET",
          dataType:"jsonp",
          url: "http://www.51talk.com/passport/getMobileCode",
          data:{
            "mobile":mobile,
            authCode:imgCode
          },
          success:function(data){
            if(data.status==1){
                 timer(_this,120);
            }else{
               _this.innerHTML="重新获取";
                _this.bAjax=false;
                alert(data.info)
                if(data.status==2){
                  $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
                }
            }
          }
    }); 
  }
});

//倒计时
  function timer(obj,count){
      obj.innerHTML="请稍等...";
      obj.timer=setInterval(function(){
          count--;
          if(count==0){
              obj.innerHTML= "重新获取";
              obj.bAjax=false;
              clearInterval(obj.timer);
          }else{
              var str=count+"秒";
              obj.innerHTML=str;
          }
      },1000);
  };

//底部注册验证
  $("#submit1").on("click",function(){
    var mobile=$("#mobile3").val();
    var mobileReg=/^1[0-9]{10}$/;
    var password=$("#password3").val();
    var passwordReg=/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
    var mobileCode=$("#mobileCode").val();
    var mobileCodeReg=/^[0-9]{5}$/;
    if(mobile==""){
          alert("手机号码不能为空");
          return false;
    };
    if(!mobileReg.test(mobile)){
          alert("请填写正确的手机号码");
          return false;
    };
    if(mobileCode==""){
          alert("验证码不能为空");
          return false;
    };
    if(!mobileCodeReg.test(mobileCode)){
          alert("验证码错误");
          return false;
    };
    if(password==""){
          alert("密码不能为空");
          return false;
    };
    if(!passwordReg.test(password)){
          alert("密码格式错误");
          return false;
    }else{
        document.getElementById("RegForm1").submit();
    }
  });
var shareContent = $(".sFied").attr("shareContent") || "@51talk 无忧英语-51Talk外教和服务挺不错，我向我的好友推荐了51Talk！你也来试试吧！";
var shareLink = $(".sFied").attr("shareLink")||"http://www.51talk.com?66";
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":shareContent,"bdMini":"2","bdMiniList":false,"bdPic":"http://static.51talk.com/images/web_new/home/banner/student1.jpg;http://static.51talk.com/images/web_new/home/banner/index.jpg;http://static.51talk.com/images/web_new/home/show/4.png;http://static.51talk.com/images/web_new/home/show/11_07.png","bdUrl": shareLink,"bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

});