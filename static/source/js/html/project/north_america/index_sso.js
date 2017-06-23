/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	//sso
	window.ssoController = {
		preLogin:function(){
			$.ajax({
	            url: 'http://login.51talk.com/sso/prelogin',
	            dataType: 'jsonp',
	            jsonpCallback: 'preLoginCallBack',
	            data: $('#LoginForm').serialize(),
	            type: 'get',
	            success: function(ret) {
	                $('#login_la').val(ret.res.la);
	                //收起错误信息
					$("#LoginForm").attr("submited",true).submit().find('li.error-show').removeClass('error-show').end().find('.btn').val("登录...");
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
				$('.login-from-lst .password').blur().closest('li').addClass('error-show').find('.error').html(data.msg);
				//$("#password2").attr('name',"password2");
				$("#LoginForm").removeAttr("submited").find('.btn').val("登录");
			}
		},
		getPublicKey:function(){
			var client_id = $('input[name=client]').val() || 1;
			if($("#public_key").val()){
				return;
			}
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
	//动态插入iframe为sso跨域做准备
	(function(){
		var loginForm=$("#LoginForm");
		$("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
	    var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
	                '<input type="hidden" name="la" id="login_la" />'+
	                '<input type="hidden" name="group" id="group" value="4" />';
	    loginForm.attr({
	        "target" : "ssoLoginFrame",
	        "action" : "http://login.51talk.com/sso/login"
	    }).append(hidden3);
	    //$("#autologin").attr( "checked", true );
	    // prelogin
	    ssoController.getPublicKey();
	    $('#username').blur(function(){
	        $.ajax({
	            url: 'http://login.51talk.com/sso/prelogin',
	            dataType: 'jsonp',
	            jsonpCallback: 'preLoginCallBack',
	            data: loginForm.serialize(),
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
	})();
});
