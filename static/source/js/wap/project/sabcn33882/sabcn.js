define(function(require){
  /*验证*/
  var reTel = /^1[0-9]{10}$/;
  // var sltList=/^[124567]$/;
  $(".sabcn .sumbit").click(function(){
    var tel=$(".iphone").val();
    var passwd=$(".passsword").val();
    var slt=$("#tea_experience").val();
    var register_from=$(".register_from").val();
    var formType=$(".form-type").val();
    if(tel==""){
      alert("请填写手机号码");
      return false;
    }
    if(!reTel.test(tel)){
      alert("请填写正确格式手机号码"); 
      return false; 
    }
    if(passwd==""){
      alert("请填写密码");
      return false;
    }
    if(slt== -1){
      alert("年级组不能为空");
      return false;
    }
    // if(!sltList.test(slt)){
    //   alert("年级组格式不正确");
    //   return false;
    // }
    var dataUrl=$(".sac-input").attr("data-url");
    $.ajax({
      url:dataUrl,
      type:'post',
      data:{mobile:tel, password:passwd, race_group:slt, registerName:register_from, type:formType},
      dataType:'json',
      success:function(msg){
        // msg = JSON.parse(msg);
        if(msg.status==0){
          alert(msg.info);
          return false;
        }else{
          location.href=msg.data;    
        }
      }
    });
  });
  /*select*/
  $(".sabcn .select").click(function(){
    $(".slt-list").show();
  });
  $(".slt-list li").click(function(){
    var str=$(this).text();
    var num=$(this).attr("num");
    $("#tea_experience").val(num);
    $(".select .text").text(str);
    $(".slt-list").hide();
  });
});