define(function(require,exports,module){
  $(".d-rev,.cont").click(function(){
    $(this).hide();
    $(".cont").show();
    $(".fail").hide();
    var $dataUrl=$(this).attr("data-url");
    var $tagid = $(this).attr('data-tagid');
    var $appointid = $(this).attr('data-appointid');
    $.ajax({
      type:"post",
      dataType:"json",
      url:$dataUrl,
      data:{tag_id: $tagid,appoint_id: $appointid,user_tag:'na'},
      success:function(res){
        /*0失败 1成功*/
        if(res.status==1){
          $(".cont").hide();
          $(".succ").show();  
          $(".d-rev").hide();
          $(".succ .succ-t").text(res.data.result);
        }else{
          $(".cont").hide();
          $(".succ").hide(); 
          $(".fail").show();
          $(".d-rev").show();
          $(".fail").text(res.data.info);
        }
      }
    });
  });
});