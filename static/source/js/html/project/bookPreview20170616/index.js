define(function(){
   var iNow=0;
    var aLi=$(".book").find(".product");
    var count=$(".book").find(".product").length;
    $(".prev").on("click",function(){
        slider("prev");
    });
    $(".next").on("click",function(){
        slider("next");
    });
    function slider(direction){
      if(aLi.eq(iNow).is(":animated")) return;
      if(direction=="prev"){
          iNow--;  
      }
      if(direction=="next"){
          iNow++; 
      }
      if(iNow<0){
          iNow=count-1
      }
      if(iNow==count){
          iNow=0;
      }
       //$(".book").find(".product").eq(iNow).show().siblings().hide();
      $(".book").find(".product").eq(iNow).animate({opacity:"1"}).siblings().animate({opacity:"0"});
    }

    //hover效果
    $(".arrow").hover(function(){
       $(this).toggleClass("active");
    });

  

});