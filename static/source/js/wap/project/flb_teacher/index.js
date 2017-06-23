/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-04-27 15:43:30
 */
define(function(require,exports,module){
	//正则验证
	var reMobile = /^[0-9]*$/;
	var Name = /^[A-Za-z]+$/;
	var E_mail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
	//判断是否符合都是英文
	function isEnglish(){
		var value = $(this).val();
		if(!value){
			$(this).parents(".group").find(".u-err-1").show();
			$(this).parents(".group").find(".u-err-2").hide();
			return false;
		}else if(!Name.test(value)){
			$(this).parents(".group").find(".u-err-2").show();
			$(this).parents(".group").find(".u-err-1").hide();
			return false;
		}else{
			$(this).parents(".group").find(".u-err-1,.u-err-2").hide();
		}
	}
	//判断是否符合手机号
	function isMobile(){
		var value = $(this).val();
		if(!value){
			$(this).parents(".group").find(".u-err-1").show();
			$(this).parents(".group").find(".u-err-2").hide();
			return false;
		}else if(!reMobile.test(value)){
			$(this).parents(".group").find(".u-err-2").show();
			$(this).parents(".group").find(".u-err-1").hide();
			return false;
		}else{
			$(this).parents(".group").find(".u-err-1,.u-err-2").hide();
		}
	}
	//判断是否符合邮箱格式
	function isE_mail(){
		var value = $(this).val();
		if(!value){
			$(this).parents(".group").find(".u-err-1").show();
			$(this).parents(".group").find(".u-err-2").hide();
			return false;
		}else if(!E_mail.test(value)){
			$(this).parents(".group").find(".u-err-2").show();
			$(this).parents(".group").find(".u-err-1").hide();
			return false;
		}else{
			$(this).parents(".group").find(".u-err-1,.u-err-2").hide();
		}
	}
	// 判断是否为空
	function isNull(){
		var value = $(this).val();
		if(!value){
			$(this).parents(".group").find(".u-err-1").show();
		}else{
			$(this).parents(".group").find(".u-err-1").hide();
		}
	}
	//	英文名字做验证
	$('#first_name,#last_name').blur(function(){
		isEnglish.call(this);
	});
	//手机号做验证
	$('#mobile').blur(function(){
		isMobile.call(this);
	});
	// 邮箱做验证
	$('#e_mail').blur(function(){
		isE_mail.call(this);
	});
	//教学经验验证
	$("#tea_experience").blur(function(){
		if($(this).val() == "" || $(this).val() == "Select"){
			$(this).parents(".group").find(".u-err-1").show();
			return false;
		}else{
			$(this).parents(".group").find(".u-err-1").hide();
		}
	})
	//推荐人名字
	$("#rename").blur(function(){
		isNull.call(this);
	})
	//提交按钮
	$(".send_now").click(function(){
		var reMobile =  /^[0-9]*$/;
		var Name = /^[A-Za-z]+$/;
		var E_mail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
		var fname = $("#first_name").val();
		var lname = $("#last_name").val();
		var mobile = $("#mobile").val();
		var e_mail = $("#e_mail").val();
		var skype = $("#skype").val();
		var t_exp = $("#tea_experience").val();
		var internet = $("#internet").val();
		var rename = $("#rename").val();
		if(!fname){
			$(".group-1").find(".u-err-1").show();
			return false;
		}
		if(!Name.test(fname)){
			$(".group-1").find(".u-err-2").show();
			return false;
		}
		if(!lname){
			$(".group-2").find(".u-err-1").show();
			return false;
		}
		if(!Name.test(lname)){
			$(".group-2").find(".u-err-2").show();
			return false;
		}
		if(!mobile){
			$(".group-3").find(".u-err-1").show();
			return false;
		}
		if(!reMobile.test(mobile)){
			$(".group-3").find(".u-err-2").show();
			return false;
		}
		if(!e_mail){
			$(".group-4").find(".u-err-1").show();
			return false;
		}
		if(!E_mail.test(e_mail)){
			$(".group-4").find(".u-err-2").show();
			return false;
		}
		if(!t_exp || t_exp == "Select"){
			$(".group-6").find(".u-err-1").show();
			return false;
		}
		if(!rename){
			$(".group-8").find(".u-err-1").show();
			return false;
		}
		document.getElementById("reg1_form").submit();
	});
});
