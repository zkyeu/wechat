 
define(function(require,exports,module){
    require("placeholder");
    var activeLi = $(".c_top_l li");
    activeLi.on("click",function(){
      activeLi.removeClass("active_l");
      $(this).addClass("active_l");
      if($(this).index()==0){
        $(".o_done").hide();
        $(".o_c_c").show();
      }else{
        $(".o_done").show();
        $(".o_c_c").hide();
      }
    })
}); 
