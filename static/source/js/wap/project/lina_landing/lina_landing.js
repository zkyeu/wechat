define(function(require){
/*验证*/
  var reTel = /^1[0-9]{10}$/;
  var tit=/[^\s]{1,}/;
  var regEmail=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
  $("#submit1").click(function(){
    var regWork=$("#regWork").val();
    var regPc=$("#regPc").val();
    var regName=$("#regName").val();
    var regPos=$("#regPos").val();
    var tel=$("#reg_tel").val();
    var email=$("#email").val();
    var reg_passwd=$("#reg_passwd").val();
    if(regWork==""){
      alert("请填写工作地区");
      return false;
    }
    if(regPc==""){
      alert("请填写公司名称");
      return false;
    }
    if(regName==""){
      alert("请填写姓名");
      return false;
    }
    if(regPos==""){
      alert("请填写职位");
      return false;
    }
    if(tel==""){
      alert("请填写手机号码");
      return false;
    }
    if(!reTel.test(tel)){
      alert("请填写正确格式手机号码"); 
      return false; 
    }
    if(email==""){
      alert("请填写邮箱地址");
      return false;
    }
    if(!regEmail.test(email)){
      alert("邮箱格式不正确");
      return false;
    }
    if(reg_passwd==""){
      alert("请填写密码");
      return false;
    }
    $("#regFrom").submit();
  });
});