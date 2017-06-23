define(function(require,exports,module){
  $(".eggs-lottery").click(function(){
    var dataUrl=$(".lottery").attr("data-url");
    var vouchersTit=$(".vouchers").find("i").text();
    var vouchers_id=$(".eggs-drawn").attr("data-vouchers");
    // $(".eggs-drawn").show();
    // $(this).hide();
    $.ajax({
      type:'post',
      dataType:'json',
      url:dataUrl,
      data:{vouchersTit:vouchersTit},
      success:function(res){
        if(res.status==1){
          $(".eggs-drawn").show(); 
          $(".eggs-lottery").hide();
          $(".vouchers").find("i").text(res.vouchersTit);
        }
      }
    }); 
  });
});