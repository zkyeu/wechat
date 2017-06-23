define(function(require,exports,module){
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 20
    });
	$(".error_sure").on('click', '.error_sure', function(){
		$(".mask").hide();
	})
	$('.grade-select').change(function() {
		var val = $(this).find('option:selected').val(),
			text = $(this).find('option:selected').text();
		$('#grade').attr('data-grade', val).text(text);
		$('#grade').addClass('current');
	})
	var reTel = /^1[0-9]{10}$/;
	$("#submit").click(function() {
		var tel = $("#mobile").val(),
			name = $('#name').val(),
			gradeVal = $('#grade').attr('data-grade'),
			gradeText = $('#grade').text(),
			from = $("#from_url").val(),
			urlGet = $(this).attr("data-url");
		var clientHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
		if(!name) {
			$(".error_box").find(".error_text").html("请填写宝贝的姓名")
			$(".mask").show();
			return;
		}
		if(gradeText === '请选择宝贝年级') {
			$(".error_box").find(".error_text").html("请选择宝贝的年级")
			$(".mask").show();
			return;
		}
		if (tel == "" || tel == null) {
			$(".error_box").find(".error_text").html("手机号码不能为空！")
			$(".mask").show();
			return;
		}
		if (!reTel.test(tel)) {
			$(".error_box").find(".error_text").html("请输入正确手机号码！")
			$(".mask").show();
			return;
		}
		$.ajax({
			url: urlGet,
			type: "post",
			data: {
				"name": name,
				"grade": gradeVal,
				"mobile": tel,
				"from_url": from
			},
			dataType:"json",
			success: function(res) {
				if(res.status === 1) {
					$(".main").hide();
					$(".bottom-btn").remove();
					$(".receive_success").show();
				}else {
					$(".error_box").find(".error_text").html(res.info);
					$(".mask").show();
				}
			}
		})
	});
	
    $(".bottom-btn").on('click', function() {
    	document.body.scrollTop = '100';
    })
    // 图片加载
	var imgLst = $('.sell-detail img');
	loadImg(imgLst);
	window.onscroll = function(){
	  var top = $("body").scrollTop();
	  if(top > 600) {
	  	$(".bottom-btn").show();
	  } else {
	  	$(".bottom-btn").hide();
	  }
	  loadImg(imgLst);
	};
	var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
	function loadImg(arr){
		for(var i = 0, len = arr.length; i < len; i++) {
			if(arr[i].getBoundingClientRect().top < clientHeight && !arr[i].isLoad) {
				arr[i].isLoad = true;
				arr[i].style.cssText = "transition: ''; opacity: 0;"
				aftLoadImg(arr[i], arr[i].getAttribute('data-img'));
				(function(i){
			        setTimeout(function(){
			          arr[i].style.cssText = "transition: 1s; opacity: 1;"
			        },16)
			    })(i);
			}
		}
	}
	function aftLoadImg(obj,url){
	  var oImg = new Image();
	  oImg.onload = function(){
	    obj.src = oImg.src;
	  }
	  oImg.src = url;
	}

	/*关闭微信分享*/
	function onBridgeReady(){
	 WeixinJSBridge.call('hideOptionMenu');
	}

	if (typeof WeixinJSBridge == "undefined"){
	    if( document.addEventListener ){
	        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	    }else if (document.attachEvent){
	        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	    }
	}else{
	    onBridgeReady();
	}
});
