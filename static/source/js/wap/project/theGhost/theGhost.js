define(function(require){
    $(function(){
        //计算1rem的值，并保存.
        var _html = $('html')[0];
        var view_width = _html.getBoundingClientRect().width;

        if (view_width > 640) {
            _html.style.fontSize = 640 / 16 + 'px';
        } else {
            _html.style.fontSize = view_width / 16 + 'px';
        }
        //点击文本域，切换
        showHide('phone', 'phoneText');
        showHide('pwd', 'passwordText');
        //保存页面高度，点击input赋值
        var _boxHeight = $('.box').height();
        function showHide(id,className){
            $('#' + id).focus(function(){
                $(this).removeClass(className);
                $('.box').height(_boxHeight);
            }).blur(function(){
                if($.trim($(this).val()) == ''){
                    $(this).addClass(className);
                }
            })
        }

        var $form = $('#formText'),
            $phone = $('#phone'),
            $pwd = $('#pwd'),
            $submit = $('#submit');

            $submit.click(function(){
                var phoneNum = $.trim($phone.val());
                var pwdCode = $.trim($pwd.val());
                var regMobile=/^1[0-9]{10}$/;
                var regPass=/^([a-z0-9]{6,20})$/;

                if (phoneNum == "") {
                    alert('请填写手机号码');
                    return false;   
                } else if (!regMobile.test(phoneNum)) {
                    alert('请填写正确的手机号码');
                    return false;   
                } else if(pwdCode=="") {
                    alert('请填写密码');
                    return false;   
                } else if(!regPass.test(pwdCode)) {
                    alert('密码为6-20位字母数字组合');
                    return false;   
                } else {
                  document.getElementById("formText").submit();
                }
            })


    })
});