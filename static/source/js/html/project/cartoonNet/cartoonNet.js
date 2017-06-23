
define(function(require,exports,module){
   require("formCheck");
   require("placeholder");
   $("#formBottom").formCheck();
  $(".cn_navIn").find("a").on("click",function(){
      var index=$(this).index();
       $(".cn_navIn").find("a").removeClass("cn_active");
       $(this).addClass("cn_active");
       $(".cn_main").find(".cn_page").hide();
      $(".cn_main").find(".cn_page").eq(index).show();
      return false;
  });


});
