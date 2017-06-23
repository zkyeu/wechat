
   //判断浏览器是否支持 placeholder属性  
    function isPlaceholder(){  
      var input = document.createElement('input');  
      return 'placeholder' in input;  
    }
    (function($){
      $(document).ready(function(){
        $(".others").mCustomScrollbar({
          theme:"light-3"
        });
        playall();
      });
      if(!isPlaceholder()){  
        $("li input").not("input[type='password']").each(//把input绑定事件 排除password框  
          function(){  
            if($(this).val()=="" && $(this).attr("placeholder")!=""){  
              $(this).val($(this).attr("placeholder"));  
              $(this).focus(function(){  
                if($(this).val()==$(this).attr("placeholder")) $(this).val("");  
              });  
              $(this).blur(function(){  
                if($(this).val()=="") $(this).val($(this).attr("placeholder"));  
              });  
            }  
        });  
      }  
    })(jQuery);

    var count = 0;
    var slidint;
    function setfoc(count) {
      if (count != 0) {
        $(".nav li").eq(count-1).removeClass("red");
      }
      switch(count) {
        case 0:
          $(".nav li").eq(4).removeClass("red");
          $(".nav li a").eq(4).removeClass("bds_tsinaR").addClass("bds_tsina");
          $(".nav li a").eq(0).removeClass("smsP").addClass("smsPR");
          $(".nav li").eq(0).addClass("red");
          break;
        case 1:
          $(".nav li").eq(0).removeClass("red");
          $(".nav li a").eq(0).removeClass("smsPR").addClass("smsP");
          $(".nav li a").eq(1).removeClass("linkP").addClass("linkPR");
          $(".nav li").eq(1).addClass("red");
          break;
        case 2:
          $(".nav li").eq(1).removeClass("red");
          $(".nav li a").eq(1).removeClass("linkPR").addClass("linkP");
          $(".nav li a").eq(2).removeClass("bds_tqq").addClass("bds_tqqR");
          $(".nav li").eq(2).addClass("red");
          break;
        case 3:
          $(".nav li").eq(2).removeClass("red");
          $(".nav li a").eq(2).removeClass("bds_tqqR").addClass("bds_tqq");
          $(".nav li a").eq(3).removeClass("bds_weixinF").addClass("bds_weixinFR");
          $(".nav li").eq(3).addClass("red");
          break;
        case 4:
          $(".nav li").eq(3).removeClass("red");
          $(".nav li a").eq(3).removeClass("bds_weixinFR").addClass("bds_weixinF");
          $(".nav li a").eq(4).removeClass("bds_tsina").addClass("bds_tsinaR");
          $(".nav li").eq(4).addClass("red");
          break;
        default:
          $(".nav li").eq(count).addClass("red");
      }
    }

    function handle () {
      stopall();
      switch(count) {
        case 0:
          $(".nav li a").eq(4).removeClass("bds_tsinaR").addClass("bds_tsina");
          break;
        case 1:
          $(".nav li a").eq(0).removeClass("smsPR").addClass("smsP");
          break;
        case 2:
          $(".nav li a").eq(1).removeClass("linkPR").addClass("linkP");
          break;
        case 3:
           $(".nav li a").eq(2).removeClass("bds_tqqR").addClass("bds_tqq");
          break;
        case 4:
          $(".nav li a").eq(3).removeClass("bds_weixinFR").addClass("bds_weixinF");
          break;
        default:
          $(".nav li").eq(count).addClass("red");
      }
    }

    function playall() {
      slidint = setInterval(function() {
        setfoc(count);
        count++;
        if (count == 5) {
          count = 0;
        }
      }, 1000);
    }
    function stopall(){
      $(".nav li").removeClass("red");
      clearTimeout(slidint);
    }
    function dialog(className, flag){
      // behavior
      if (flag != 'no') {
        var data={};
        data.type=className;
        $.post('/ajax/clilckInviteTongji', data, function(res){}); 
      }
      // display
      if (className == "sms" || className == "link") {
        $(".smsf1 .tips").html('');
        $(".smsf1").show();
        $(".smsf2").hide();
        var win = WinSize();
        $(".bg").css("width", win.W+"px");
        $(".bg").css("height", win.H+"px");
        if($(".bg").css("display")=="block") {
          $(".bg").css("display", "none");
          $("."+className).css("display", "none");
        }else{
          $(".bg").css("display", "block");
          $("."+className).css("display", "block");
        }        
      }
    }
    function WinSize() {
      var winWidth = 0;
      var winHeight = 0;
      if (window.innerWidth) {
        winWidth = window.innerWidth;
      } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
      }

      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
      }

      if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
      }
      return{"W":winWidth,"H":winHeight}
    }

    $(".smsf1 .inviteBtn").click(function(){
      // $(".alert").attr('type', 'sms');
      var name=$(".smsForm .smsf1 li input[name='name']").val();
      var recommen_name=$(".smsForm .smsf1 li input[name='recommen_name']").val();
      var recommen_mobile=$(".smsForm .smsf1 li input[name='recommen_mobile']").val();
      var namer = /^\s*[\u4e00-\u9fa5]{2,15}\s*$/;
      var phoner = /^1[0-9]{10}$/;

      if (!name || name=="" || name=="我的中文名") {
        $(".smsf1 .tips").html('您的中文名不能为空');
        $(".smsf1 .tips").show();
      } else if (!namer.test(name)) {
        $(".smsf1 .tips").html('您的中文名格式错误');
        $(".smsf1 .tips").show();
      } else if (!recommen_name || recommen_name=="" || recommen_name=="好友的中文名") {
        $(".smsf1 .tips").html('好友中文名不能为空');
        $(".smsf1 .tips").show();
      } else if (!namer.test(recommen_name)) {
        $(".smsf1 .tips").html('好友中文名格式错误');
        $(".smsf1 .tips").show();
      } else if (!recommen_mobile || recommen_mobile=="" || recommen_mobile=="好友的手机号") {
        $(".smsf1 .tips").html('手机号不能为空');
        $(".smsf1 .tips").show();
      } else if (!phoner.test(recommen_mobile)) {
        $(".smsf1 .tips").html('手机号格式错误');
        $(".smsf1 .tips").show();
      } else {
        var data={};
        data.name=name;
        data.recommen_name=recommen_name;
        data.recommen_mobile=recommen_mobile;
        // $(".smsf1").hide();
        // $(".smsf2").show();
        $.post('/ajax/sendRecommend', data, function(res){
          $(".smsf1").hide();
          $(".smsf2").show();
        });
      }
    });

    $(".smsf2 .sureBtn").click(function() {
      $(".bg").hide();
      $(".sms").hide();
      $(".smsf2").hide();
      random();
    });

    $(".linkForm .inviteBtn").click(function(){
      $(".alert").attr('type', 'link');
      if($.browser.msie){
          var text=$("#shareUrl").val();
          clipboardData.setData('Text',text);
          $(".alert .info").html('复制成功，可以直接粘贴在相应位置');
          $(".link").hide();
          $(".alert").show();
      }else{
          $(".alert .info").html('您使用的浏览器不支持直接复制，请选中链接并按下ctrl+c复制代码到剪贴板');
          $(".link").hide();
          $(".alert").show();   
      }
    });
    $(".alert .btn").click(function(){
      var type=$(".alert").attr("type");
      $(".alert").hide();
      if (type=='link') {
        $(".link").show();
      }
    });
    $(".alert #img_slt").click(function(){
      var type=$(".alert").attr("type");
      $(".alert").hide();
      if (type=='link') {
        $(".link").show();
      }
    })
    var shareContent = "火遍全球的在线美国小学课程终于来中国啦！";
    var shareLink = $(".container").attr("data-url");
    window._bd_share_config={
      "common":{
        "bdSnsKey":{},
        "bdText":shareContent,
        "bdMini":"2",
        "bdMiniList":false,
        "bdPic":"http://static.51talk.com/static/images/html/pull_wool24301/000.jpg;http://static.51talk.com/static/images/html/pull_wool24301/001.jpg;http://static.51talk.com/static/images/html/pull_wool24301/002.jpg;http://static.51talk.com/static/images/html/pull_wool24301/003.jpg;",
        "bdUrl": shareLink,
        "bdStyle":"0",
        "bdSize":"16"
      },
      "share":{}
    };
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
