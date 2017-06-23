define(function(require, exports, module) {
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 30
    });
    //选择框操作
    $('.grade-select').change(function() {
		var val = $(this).find('option:selected').val(),
			text = $(this).find('option:selected').text();
		$('.grade').attr('data-grade', val).text(text);
		$('.grade').addClass('current');
	});
    //注册
    var rule = {
    	mobileReg: /(^1[3|4|5|7|8][0-9]{9}$)/,
    	isEmpty: function(val) {
    		if(!val) {
    			return true;
    		} else {
    			return false;
    		}
    	},
    	isMobile: function(val) {
    		if(this.mobileReg.test(val)) {
    			return true;
    		} else {
    			return false;
    		}
    	},
    	dialogShow: function(errorText) {
    		$('.error-box .error-text').html(errorText);
    		$('.mask').show();
    	},
    	dialogHide: function() {
    		$('.mask').hide();
    	}
    };
    $('.introduce-information .submit').on('click', function() {
    	var name = $('#name').val(),
    		grade = $('.grade').attr('data-grade'),
    		mobile = $('#mobile').val(),
    		referrer = $('#referrer').val(),
    		api = $(this).attr('data-url');
    	var data = {
    		"name": name,
    		"grade": grade,
    		"mobile": mobile,
    		"referrer": referrer
    	}
    	if(rule.isEmpty(name)) {
    		rule.dialogShow('请填写宝贝的姓名');
    		return false;
    	}
    	if(!grade) {
    		rule.dialogShow('请选择宝贝年级');
    		return false;
    	}
    	if(rule.isEmpty(mobile)) {
    		rule.dialogShow('手机号码不能为空！');
    		return false;
    	}
    	if(!rule.isMobile(mobile)) {
    		rule.dialogShow('请填写正确的手机号码');
    		return false;
    	};
    	$.ajax({
    		url: api,
    		type: 'POST',
    		dataType: 'json',
    		data: data,
    		success: function(res) {
    			if(res.status && res.status == 0) {
    				rule.dialogShow(res.info);
    			} else {
    				rule.dialogShow(res.info);
    			}
    		}
    	})
    });
    $('.error-sure').on('click', function() {
    	rule.dialogHide();
    });
    // 返回注册信息
    $('.introduce-fixbar').on('click', function() {
    	var informationOffsetTop = $('.introduce-information').offset().top;
    	document.documentElement.scrollTop = document.body.scrollTop = 0;
    	$(this).hide();
    });
    var listOffsetTop = $('.introduce-detail__list').offset().top;
    $(window).on('scroll', function() {
    	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    	if(scrollTop >= listOffsetTop) {
    		$('.introduce-fixbar').show();
    	} else {
    		$('.introduce-fixbar').hide();
    	}
    });
	// 图片加载
	var imgLst = $('.introduce-detail img');
	loadImg(imgLst);
	window.onscroll = function(){
	  loadImg(imgLst);
	};
	var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
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
})