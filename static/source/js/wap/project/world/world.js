/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	$("#reg1").click(function(){
		var tel = $("#reg1_tel").val();
		var passwd = $("#reg1_passwd").val();
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
		document.getElementById("reg1_form").submit();
	});
	$("#reg2").click(function(){
		var tel = $("#reg2_tel").val();
		var passwd = $("#reg2_passwd").val();
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
		document.getElementById("reg2_form").submit();
	});

	//滑动
	// init();

	// function init(){
	// 	var n = 0;
	// 	var aSection = $("#move").children();
	// 	var len = aSection.length;


	// 	$("#move").swipeLeft(function(){
	// 		n++;
	// 		// alert(n);
	// 		aSection.removeClass();
	// 		aSection.eq(n-1).addClass('n3');
	// 		aSection.eq(n).addClass('n1');
	// 		if(n+1==3){
	// 			n=-1;
	// 		};
	// 		aSection.eq(n+1).addClass('n2');
			

	// 	}).swipeRight(function(){
	// 		n--;
	// 		// alert(n);
	// 		aSection.removeClass();
			
	// 		aSection.eq(n).addClass('n2');
			
	// 		aSection.eq(n+1).addClass('n3');
	// 		if(n-1==-3){
	// 			n=1;
	// 		};
	// 		aSection.eq(n-1).addClass('n1');
	// 	});

	// }
	var oUl = document.getElementById('move');
		var aSection = oUl.children;
		var len = aSection.length;
		var aClass = [];
		for(var i = 0; i < len; i++){
			aClass[i]=aSection[i].className;
		}

		// var bReady=true;

		$("#move").swipeLeft(function(){

			// if(bReady==false)return;
			// bReady=false;
			aClass.push(aClass.shift()); //前面摘一个扔到后面
			tab();
			

		}).swipeRight(function(){

			// if(bReady==false)return;
			// bReady=false;
			aClass.unshift(aClass.pop()); 
			tab();

		});

		function tab(){
			for(var i=0; i<len; i++){
				aSection[i].className=aClass[i];
				
				// aSection[i].addEventListener('transitionend',function(){
				// 	bReady=true;
				// },false);
			}	
		}

});
