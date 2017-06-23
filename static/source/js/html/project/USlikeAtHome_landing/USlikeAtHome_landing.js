
define(function(require,exports,module){
 /*弹出层*/
$('.btn_freeExperience').click(function(){
  $('.mask,.openWidnow').show();
});
$(".mask").on("click",function(){
  $('.mask,.openWidnow').hide();
  $(this).hide();
});
  require('placeholder');
  require('formCheck');
  $("#RegForm1,#RegForm3").formCheck();
});
