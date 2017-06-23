define(function(require,exports){
    $(function(){
        var validate = {
            isEmpty: function(value) {
                if(!value) {
                    return false;
                }else{
                    return true;
                }
            },
            isMobile: function(value) {
                //var reg = /(^1[3|5|8][0-9]{9}$)/;
                var reg = /^1[0-9]{10}$/;
                if(!reg.test(value)) {
                    return false;
                }else{
                    return true;
                }
            },
            isPassword: function(value) {
                var reg = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
                if(!reg.test(value)) {
                    return false;
                }else{
                    return true;
                }
            }
        };

        //验证码倒计时
        function recordTime(time){
            var time = time;
            var sendBtn = $("#send_code");
            var timer = setInterval(function(){
                time--;
                sendBtn.text(time+"s");
                if(time<0){
                    sendBtn.text("重获验证码");
                    sendBtn.removeClass("sending");
                    clearInterval(timer);
                }
            },1000);
        }
        //发送验证码
        $('#send_code').tap(function(){
            var tel = $('#reg1_tel').val();
            if($(this).hasClass('sending')){
                return;
            }
            if(!validate.isEmpty(tel)) {
                alert('请输入您的手机号码');
                return false;
            }else if(!validate.isMobile(tel)) {
                alert('请输入正确的手机号');
                return false;
            }
            
            $.ajax({
                url:"/Ajax/sendSms",
                type:"POST",
                datatype: 'json',
                data: {
                    mobile: tel
                },
                success:function(res){
                    var res = JSON.parse(res);
                    if(res.status == 0) {
                        alert(res.info);
                    }else if(res.status == 1) {
                        $("#send_code").addClass("sending");
                        recordTime(60);
                    }
                }
            })
        });

        //注册
        var regBtn = $('#regBtn');
        var regForm = $('#regForm');
        regBtn.on('tap', function() {
            var tel = $('#reg1_tel').val(),
                password = $('#reg1_passwd').val(),
                mobileCode = $("#reg1_code").val(),
                type = $('#type').val(),
                registerName = $("#registerName").val();
            if(!validate.isEmpty(tel)) {
                alert('请输入您的手机号码');
                return false;
            }else if(!validate.isMobile(tel)) {
                alert('请输入正确的手机号');
                return false;
            }
            if(!mobileCode){
                alert('请输入验证码');
                return;
            }
            if(!validate.isEmpty(password)) {
                alert('请设置您的密码');
                return false;
            }else if(!validate.isPassword(password)) {
                alert('密码长度为6~20');
                return false;
            }

            var sendData = {
                mobile: tel,
                mobile_code: mobileCode,
                password: password,
                registerName: registerName,
                type: type
            }

            $.ajax({
                url: '/ajax/landingRegister',
                type: 'POST',
                data: sendData,
                dataType: 'json',
                success: function(rs){
                    if(rs.status==1){
                        $('#mask,#tipBox').show();
                    }else{
                        alert(rs.info);
                    }
                }
            })
        });
    })
})