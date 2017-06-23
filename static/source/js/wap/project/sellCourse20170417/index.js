 define(function(require, exports, module) {
  //默认
  $(".foreigner").first().find(".datalist").first().addClass("active");
  $(".classname").find("span").html($(".foreigner").first().find(".datalist").first().attr("data-class_name"));

  //选择班级
  $(".foreigner").find(".datalist").on("click",function(){
      var  class_name=$(this).attr("data-class_name");
      $(".foreigner").find(".datalist").removeClass("active");
      $(this).addClass("active");
      $(".classname").find("span").html(class_name);
  });
    
  //form 提交
  $(".subBtn").on("click",".subForm",function(){
      $(this).removeClass("subForm");
      var oChecked=$(".foreigner").find(".datalist.active")
      var good_id=oChecked.attr("data-goods_id");
      var class_id=oChecked.attr("data-class_id");
      var room_id=oChecked.attr("data-room_id");
      $.ajax({
        url:"/b2s/chooseDo",
        dataType:"json",
        type :"post",
        data:{good_id:good_id,class_id:class_id,room_id:room_id},
        success: function(res){
            if(res.status==1){
                window.location.href="/b2s/chooseDone?class_id="+class_id+"&room_id="+room_id;
            }else{
               $(".selectFail").show().html(res.info);
               $(".subBtn").removeClass("subForm");
              setTimeout(function(){
                  window.location.reload();
              },3000);
            }
        },
        error:function(){
          alert("网络异常，请重试！");
          $(".subBtn").find("a").addClass("subForm");
        }
      });
    });
  });
  