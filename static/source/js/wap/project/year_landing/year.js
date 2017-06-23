 $(function() {
      $("#ido").fullpage({
        scrollingSpeed:300,
        drag: true,
        start: 2,
        duration: 100,
        page: '.section',
        der: 0.5,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
      });
  });

 var actit=$(".section").hasClass("active");
 // alert(actit);
 if(actit){
  $(".yr-text").addClass("text_now");
 }
/*邮箱验证*/
var reTel = /^1[0-9]{10}$/;
$("#sha-reg01").click(function(){
  var tel = $("#sha-tel01").val();
  var passwd = $("#sha-psd01").val();
  if (tel == "") {
    alert("请填写手机号码");
    return false;
  }
  if (!reTel.test(tel)) {
    alert("请填写正确格式手机号码");
    return false;
  }
  if (passwd == "") {
    alert("请填写密码");
    return false;
  }
  document.getElementById("RegForm01").submit();
});
$("#sha-reg02").click(function(){
  var tel = $("#sha-tel02").val();
  var passwd = $("#sha-psd02").val();
  if (tel == "") {
    alert("请填写手机号码");
    return false;
  }
  if (!reTel.test(tel)) {
    alert("请填写正确格式手机号码");
    return false;
  }
  if (passwd == "") {
    alert("请填写密码");
    return false;
  }
  document.getElementById("RegForm02").submit();
});
// alert(window.innerWidth);