/**
 * Created by chenggang on 15/10/27.
 */
var ssoController = {
	preLogin:function(){
		$.ajax({
            url: 'http://login.51talk.com/sso/prelogin',
            dataType: 'jsonp',
            jsonpCallback: 'preLoginCallBack',
            data: $('#LoginForm').serialize(),
            type: 'get',
            success: function(ret) {
                $('#login_la').val(ret.res.la);
                $("#LoginForm").submit();
            }
        });
	},
	feedBack: function(dataObj){
		var data = eval(dataObj);
		if(data.code == 10000){
			if(data.from_url){
				window.location.href= data.from_url;
			}else{
				window.location.reload();
			}
		}else{
			alert(data.msg);
//		$("#login_submit").removeAttr("disabled");
		}
	},
	getPublicKey:function(){
		var client_id = $('input[name=client]').val();
		$.ajax({
            url: 'http://login.51talk.com/sso/publickey',
            dataType: 'jsonp',
            jsonpCallback: 'pubkeyCallBack',
            data: {'client':client_id},
            type: 'get',
            success: function(ret) {
                $("#public_key").val(ret.res.rsa_pub);
            }
        });
	}
};


$(function(){
	var sso_switch = $("input[name=sso_switch]").val();
	var ori_login_url = $("input[name=ori_login_url]").val();
	$("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
	if(sso_switch == 1){
		$("#LoginForm").attr("target", "ssoLoginFrame");
		$("#LoginForm").attr("action", "http://login.51talk.com/sso/login");
		$("#LoginForm").append("<input type=\"hidden\" name=\"public_key\" id=\"public_key\" /><input type=\"hidden\" name=\"la\" id=\"login_la\" /><input type=\"hidden\" name=\"group\" id=\"group\" value=\"4\" />");
	    $("#password").removeAttr("name");
	    $("#LoginForm").append("<input type=\"hidden\" name=\"password\" id=\"password_rsa\" />");
	}else{
		$("#LoginForm").attr("action", ori_login_url);
	}

    // prelogin
    $('#username').blur(function() {
        $.ajax({
            url: 'http://login.51talk.com/sso/prelogin',
            dataType: 'jsonp',
            jsonpCallback: 'preLoginCallBack',
            data: $('#LoginForm').serialize(),
            type: 'get',
            success: function(ret) {
                $('#login_la').val(ret.res.la);
            }
        });

        return false;
    }).focus(function(){
    	ssoController.getPublicKey();
    });

    $('#password').focus(function(){
    	ssoController.getPublicKey();
    });

    //提交登录
    $("#login_submit").click(function(){
    	if(sso_switch != 1){
    		$("#LoginForm").submit();
    		return false;
    	}
        var password = $("#password").val(),
            username = $("#username").val(),
            login_la = $('#login_la').val(),
            public_key = $('#public_key').val();
        if( username == '' || username == '已验证手机号/邮箱' ){
            alert('请输入用户名');
            return false;
        }
        if( password == '' || password == '请输入您的密码' ){
            alert('请输入密码');
            return false;
        }

        if(public_key == ''){
        	alert('您的用户名或密码错误');
        	ssoController.getPublicKey();
        	return false;
        }

        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(public_key);
        var encrypted = encrypt.encrypt(password);
        $("#password_rsa").val(encrypted);

				if(!encrypted || encrypted=="false"){
					$("#password_rsa").val(hex_md5(password));
				}
        if(login_la == ''){
        	ssoController.preLogin();
        }else{
            //根据普伟的需求多请求一个接口
            $.ajax({
                url: '/ajax/mobileCodeRegister',
                dataType: 'json',
                data: {reward:1,type:1},
                type: 'get',
                success: function(ret) {
                }
            });

        	$("#LoginForm").submit();
        }

    });
});
