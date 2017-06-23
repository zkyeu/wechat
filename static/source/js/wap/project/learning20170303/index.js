
define(function(require,exports,module){
  //领取奖学金
  $(".scholar_list").find("a").on("click",function(){  
      var scholarUrl=$(".scholarModule").attr("data-vouchers-url");
      var vouchers_id=$(this).attr("vouchers_id");
      var _this=$(this);
      var _thisClass=_this.attr("class");
      $.ajax({
          url:scholarUrl,
          type:"post",
          dataType:"json",
          data:{vouchers_id:vouchers_id},
          success: function(res){
              if(res.status==1){ 
                  _this.addClass(_thisClass+"_2");
                  $(".mask,.scholarship").show(); 
                  $(".scholarship").find(".price").html(res.data.money+"元");
                  _this.unbind("click"); 
                 return false;
              }
              if(res.status==0){
                  window.location.href=res.data;
                  return false;
              }
          }
      });
  });
  $(".scholarship").find(".close").on("click",function(){
      $(".mask,.scholarship").hide();
  });
});