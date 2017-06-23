define(function(require, exports, module) {
  $(".systemLayer .close").click(function(){
    $(this).parents(".systemLayer").hide(); 
  }); 
  $(".classLayer .close").click(function(){
    $(this).parents(".classLayer").hide(); 
  }); 
  $("#update").click(function(){
    var dataUrl=$(this).attr("data-url");
    var hasCk=$(".checkbox").is(":checked");
    if(hasCk){
      $(".checkbox").attr("value",1);
    }else{
      $(".checkbox").attr("value",2);
    }
    var dataVal=$(".checkbox").val();
    location.href=dataUrl+dataVal;
  });
  $(".notUpdate").click(function(){
    var dataHref=$(this).attr("data-href");
    location.href=dataHref;
  });
  $(".classLayer .know").click(function(){
    var dataHref=$(this).attr("data-know-url");
    location.href=dataHref;
  });
  if($(".classLayer").is(":visible")){
    var dataHref=$(".classLayer .know").attr("data-know-url");
    setTimeout(function(){
      window.location=dataHref;
    },3000); 
  }
});