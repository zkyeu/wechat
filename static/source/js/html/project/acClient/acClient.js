
var orderId="";
function setid(_id){
    orderId =_id;
};

define(function(require,exports,module){
  require("formCheck");
  require("silder");

 //选择问题
  $(".ac_qList").find("a").on("click",function(){
    $(this).addClass("ac_aActive").siblings().removeClass("ac_aActive");
    $("input[name='trouble_type']").val($(this).attr("data"));
    $(".ac_tips").hide();
    $(".ac_submit").css("margin","20px auto 0");
  });

  //回电时间
  
  function callbackTime(){
      $(".ac_time").find("p").find("i").on("click",function(){
       $(this).addClass("ac_iActive").parent().siblings().find("i").removeClass("ac_iActive"); 
       $("input[name='callback_type']").val($(this).attr("data"));
       $(".ac_tips").hide();
       $(".ac_submit").css("margin","20px auto 0");
        if($(".type1").hasClass("ac_iActive")){
           
            $(".ac_time_day").attr("disabled","disabled");
            $(".ac_time_hour").attr("disabled","disabled");
            $(".ac_phonePart").show();
            $(".ac_phonePart").find("p").text("这部电话在身边吗？");
            $(".ac_time").find("p:first").find("span").text('立即回电').css("color","#333");
             
        }else if($(".type2").hasClass("ac_iActive")){
            $(".ac_time").find("p:first").find("span").text('立即回电');
            $(".ac_time_day").removeAttr("disabled");
            $(".ac_time_hour").removeAttr("disabled");
            $(".ac_phonePart").show();
            $(".ac_phonePart").find("p").text("回这部电话吗？");
            callbackTime();
        }
    });
  }

//判断立即回电选项是否处于可用状态
var myDate = new Date();
var nowHour=myDate.getHours();
var startTime=$("input[name='ac_startTime']").val();
var endTime=$("input[name='ac_endTime']").val();
if(nowHour<startTime||nowHour>endTime){
   $(".ac_time").find("p:first").find("i").unbind("click");
   $(".ac_time").find("p:first").find("span").text('立即回电（工作时间'+startTime+':00-'+endTime+':00）').css("color","#ccc");
   $(".type2").addClass("ac_iActive");
   $(".ac_phonePart").show();
  
}else{
   callbackTime();
   
};

 //填写问题
 $(".ac_txt").bind("focus",function(){
    $(".ac_tips").hide();
    $(".ac_submit").css("margin","20px auto 0");

 });
 
 //控制字数
    function get_length(s){
        var char_length = 0;
        for (var i = 0; i < s.length; i++){
            var son_char = s.charAt(i);
            encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
        }
        return char_length;
    }
    function cut_str(str, len){
        var char_length = 0;
        for (var i = 0; i < str.length; i++){
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len){
                var sub_len = char_length == len ? i+1 : i;
                 $(".ac_tips").show().html("问题描述最多200字！");
                 $(".ac_submit").css("margin","0 auto");
                return str.substr(0, sub_len);
                break;
            }else{
               $(".ac_tips").hide();
               $(".ac_submit").css("margin","20px auto 0");
            }
        }
    }
   $(".ac_txt").bind('keyup', function () {
        var  strNow=$(".ac_txt").val();
        cut_str(strNow,201);
    })

  //form验证
  $(".ac_submit").on("click",function(){
        var $ac_list_val=$("input[name='trouble_type']").val();
        var $ac_time_day=$(".ac_time_day").val();
        var $ac_time_hour=$(".ac_time_hour").val();
        var $phoneVal=$("input[name='phone']").val();
        var phoneReg=/^1[0-9]{10}$/;
        var callback_type_data=$(".ac_iActive").attr("data");
        var $ac_time_val=$("input[name='callback_type']").val(callback_type_data);
        var  ac_time_val=$("input[name='callback_type']").val();
 
        if( $ac_list_val==""){
              $(".ac_tips").show().html("请选择遇到的问题！");
              $(".ac_submit").css("margin","0 auto");
              return false;
        }
         if( $(".ac_txt").val()==""){
              $(".ac_tips").show().html("请简单描述一下您的问题！");
              $(".ac_submit").css("margin","0 auto");
              return false;
        }

        if(ac_time_val==""){
          $(".ac_tips").show().html("请选择回电时间！");
          $(".ac_submit").css("margin","0 auto");
              return false;
        }
        //验证时间
        if($("input[name='callback_type']").val()=="2"){
           if($(".ac_time_day").val()=="今天"){
              var today=new Date();
              var h=today.getHours(); 
              var hourIndex = document.getElementById("ac_time_hour").selectedIndex;
              var num=parseInt($(".ac_time_hour").find("option:first").attr("data"));
              $("input[name='ac_time_hour']").val(num+hourIndex);
           
              if($("input[name='ac_time_hour']").val()<=h){
                    
                    $(".ac_tips").show().html("请选择合适的时间！");
                    $(".ac_submit").css("margin","0 auto");
                     return false;
              }else{
                    $(".ac_tips").hide();
                    $(".ac_submit").css("margin","20px auto 0");
              }
          }
        }  
        //验证时间结束
        if($(".ac_phone").val()==""){
            $(".ac_tips").show().html("请填写回电手机号码！");
            $(".ac_submit").css("margin","0 auto");
            return false;
        }
        if(!phoneReg.test($phoneVal)){
            $(".ac_tips").show().html("请填写正确的手机号码！");
            $(".ac_submit").css("margin","0 auto");
            return false;
        }else{
            //提交数据
          $(".ac_submit").unbind("click"); 
          var dayIndex = document.getElementById("ac_time_day").selectedIndex;
          var hourIndex = document.getElementById("ac_time_hour").selectedIndex;
          $("input[name='ac_time_day']").val(dayIndex);
          $("input[name='ac_time_hour']").val(hourIndex);
         $.ajax({
            type:'post',
            dataType:'text',
            cache:false,
            url:"/Ac/AcTechnicalSupport/addSheet",
            data:{
              "uid":$("input[name='ac_uid']").val(),
              "trouble_type":$ac_list_val,
              "desc":$(".ac_txt").val(),
              "phone":$(".ac_phone").val(),
              "callback_type":$("input[name='callback_type']").val(),
              "callback_day":$("input[name='ac_time_day']").val(),
              "callback_hour":$(".ac_time_hour").val(),
              "img":$("input[name='img']").val()
            },
            success: function (data) {
                    
                    window.AcJs_get("cpp_ShowResult",data);
                },
             error: function() { 

                   var data={"code":1,"status":5,"desc_cn":"网络繁忙，请稍后重试","desc_en":"网络繁忙，请稍后重试" };
                   var string=JSON.stringify(data);
                   window.AcJs_get("cpp_ShowResult",string);
            } 

        });

      }


  });
//form验证结束

//重新预约验证
$(".ac_popup_btn").on("click",function(){  
      var dayPopupIndex = document.getElementById("ac_popup_day").selectedIndex;
      var hourPopupIndex = document.getElementById("ac_popup_hour").selectedIndex;
      $("input[name='ac_popup_day']").val(dayPopupIndex);
      $("input[name='ac_popup_hour']").val(hourPopupIndex);
      //验证时间
        if($(".ac_popup_day").val()=="今天"){
              var today=new Date();
              var h=today.getHours(); 
              var hourPopupIndex = document.getElementById("ac_popup_hour").selectedIndex;
              var num=parseInt($(".ac_popup_hour").find("option:first").attr("data"));
              $("input[name='ac_popup_hour']").val(num+hourPopupIndex);
              if($("input[name='ac_popup_hour']").val()<=h){
                    
                    $(".ac_tips").show().html("请选择合适的时间！");
                    $(".ac_popup_btn").css("margin","0 auto");
                     return false;
              }else{
                    $(".ac_tips").hide();
                    $(".ac_popup_btn").css("margin","20px auto 0");
              }
          }
      $.ajax({
            type:'post',
            dataType:'text',
            cache:false,
            url:'/Ac/AcTechnicalSupport/upCallbackTime',
            data:{
              "_id":orderId,
              "day":$("input[name='ac_popup_day']").val(),
              "hour":$("input[name='ac_popup_hour']").val()
            },
            success:function(data){
               window.AcJs_get("cpp_ShowResult",data);
            },
            error: function() { 
                
                var data={"code":1,"status":5,"desc_cn":"网络繁忙，请稍后重试","desc_en":"网络繁忙，请稍后重试" };
                var string=JSON.stringify(data);
                window.AcJs_get("cpp_ShowResult",string);
            } 

      })


})
//重新预约验证结束

}); 