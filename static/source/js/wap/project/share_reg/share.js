/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-09-23 15:30:00
 * @version 1.0.0
 */
define(function(require,exports,module){
  // 登陆验证
    $("a[name='register']").click(function(){
        var user_name = $("#user_name").val();
        var password = $("#password").val();
        var regMobile=/^1[0-9]{10}$/;
        var regPass=/^([a-z0-9]{6,20})$/;
        var emailre = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
        if (user_name == "") {
            alert('请填写手机号码');
            return false;   
        } else if (!regMobile.test(user_name) && !emailre.test(user_name)) {
            alert('请填写正确的手机号码');
            return false;   
        } else if(password=="") {
            alert('请填写密码');
            return false;   
        } else if(!regPass.test(password)) {
            alert('密码为6-20位字母数字组合');
            return false;   
        } else {
          document.getElementById("regForm").submit();
        }
    });
    $("a[name='registerBig']").click(function(){
        var user_name = $(".user_name").val();
        var password = $(".password").val();
        var regMobile=/^1[0-9]{10}$/;
        var regPass=/^([a-z0-9]{6,20})$/;
        var emailre = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
        if (user_name == "") {
            alert('请填写手机号码');
            return false;   
        } else if (!regMobile.test(user_name) && !emailre.test(user_name)) {
            alert('请填写正确的手机号码');
            return false;   
        } else if(password=="") {
            alert('请填写密码');
            return false;   
        } else if(!regPass.test(password)) {
            alert('密码为6-20位字母数字组合');
            return false;   
        } else {
          document.getElementById("regFormfot").submit();
        }
    });
    $(".sha-hover").click(function(){
        var href = $(".sha-cer").offset();
        $("html,body").animate({
            scrollTop: href.top
        }, 1000);
        $(this).hide();
        return false;

    });
    $("form[name='form-action']").click(function(){

    });
});