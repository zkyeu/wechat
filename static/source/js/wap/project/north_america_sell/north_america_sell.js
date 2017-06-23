define(function(require, exports, module){
	var slider = Swipe(document.querySelector('.swipe'), {
	    auto: 2500,
	    continuous: true,
	    callback: function(pos) {
	      $('.sell-banner__dot a').eq(pos).addClass('current').siblings().removeClass('current');
	    }
	});
	 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 30
    });
	var timeEnd = false;
	function tools(startime, endtime, countFunc, endFunc){
		  this.time = Math.floor((endtime - startime) / 1000); //时间
		  this.countFunc = countFunc; //计时函数
		  this.endFunc = endFunc; //结束函数
		  this.flag = 't' + Date.parse(new Date());
	}
	tools.prototype.start = function(type, time){
		var self = this;
	    if (type === 'first') {
	        self.flag = setTimeout(function(){
	            if(self.time < 0){
	                clearTimeout(self.flag);
	                self.endFunc();
	                timeEnd = true;
	            }else{
	                var day, hour, minute, second;
	                day = Math.floor(self.time / 60 / 60 / 24);
	                hour = Math.floor(self.time / 60 / 60 % 24);
	                minute = Math.floor(self.time / 60 % 60);
	                second = Math.floor(self.time % 60);
	                day = day < 10 ? '0' + day : day;
	                hour = hour < 10 ? '0' + hour : hour;
	                minute = minute < 10 ? '0' + minute : minute;
	                second = second < 10 ? '0' + second : second;
	                //倒计时执行函数
	                self.countFunc(second, minute, hour, day);
	                self.time--;
	            }
	        }, time);
	    } else {
	        self.flag = setInterval(function(){
	            if(self.time < 0){
	                clearInterval(self.flag);
	                self.endFunc();
	                timeEnd = true;
	            }else{
	                var day, hour, minute, second;
	                day = Math.floor(self.time / 60 / 60 / 24);
	                hour = Math.floor(self.time / 60 / 60 % 24);
	                minute = Math.floor(self.time / 60 % 60);
	                second = Math.floor(self.time % 60);
	                day = day < 10 ? '0' + day : day;
	                hour = hour < 10 ? '0' + hour : hour;
	                minute = minute < 10 ? '0' + minute : minute;
	                second = second < 10 ? '0' + second : second;
	                //倒计时执行函数
	                self.countFunc(second, minute, hour, day);
	                self.time--;
	            }
	        }, time);
	    }
	}
	var startTime = new Date().getTime(),
		getDataTime = $('.sell-discount__time__count').length ? $('.sell-discount__time__count').attr('data-end-time') : '',
		getDataTime = getDataTime.indexOf('-') != -1 ? getDataTime.replace(/-/g, '/') : getDataTime,
		endTime = new Date(getDataTime).getTime();
	CountDown = new tools(startTime, endTime, function(second, minute, hour, day){
		$('.sell-discount__time__count').html('<em class="day">'+ day +'</em><span>天</span><em class="hour">'+ hour +'</em><span>:</span><em class="minute">'+ minute +'</em><span>:</span><em class="second">'+ second +'</em>');
	}, function() {
		$('.sell-fixedbar__end').show();
		$('.sell-fixedbar__buy').hide();
		$('.sell-discount__time__count').html('<em class="day">00</em><span>天</span><em class="hour">00</em><span>:</span><em class="minute">00</em><span>:</span><em class="second">00</em>')
	});
	CountDown.start('first', 0);
	CountDown.start('other', 1000);
	var payDataTime = $('.pay-countdown__time').length ? $('.pay-countdown__time').attr('data-end-time') :'',
		payDataTime = payDataTime.indexOf('-') != -1 ? payDataTime.replace(/-/g, '/') : payDataTime,
		payEndTime = new Date(payDataTime).getTime();
	payCountDown = new tools(startTime, payEndTime, function(second, minute, hour, day){
		$('.pay-countdown__time').html('<em class="day">'+ day +'</em><span>天</span><em class="hour">'+ hour +'</em><span>:</span><em class="minute">'+ minute +'</em><span>:</span><em class="second">'+ second +'</em>');
	}, function() {
		$('.pay-countdown__time').addClass('end')
		$('.pay-countdown__time').html('<em class="day">00</em><span>天</span><em class="hour">00</em><span>:</span><em class="minute">00</em><span>:</span><em class="second">00</em>')
	});
	payCountDown.start('first', 0);
	payCountDown.start('other', 1000);
	$('.pay-ment .payment').on('click', function() {
		var _self = $(this);
		_self.addClass('current').siblings().removeClass('current');
	});
	// 弹层显示逻辑
	var dialog = {
		show: function(elem) {
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			$('.mask').css({'height': clientHeight, 'display':'block'});
			elem.css({'display':'block'});
		},
		hide: function() {
			$('.mask').hide();
			$('.dialog').hide();
		}
	};
	if($('.sell-discount__time__count').hasClass('.end')) {
		$('.sell-fixedbar__end').show();
		$('.sell-fixedbar__buy').hide();
	};
	var count = $('.sell-discount__info .count').text();
	if(count <= 0) {
		$('.sell-fixedbar__end').show();
		$('.sell-fixedbar__buy').hide();
	}
	$('.sell-fixedbar__end').on('click', function() {
		if (count <= 0) {
			$('.mask .tel').hide();
			$('.mask .understock').show();
			dialog.show();
		} else {
			$('.mask .tel').hide();
			$('.mask .end').show();
			dialog.show();
		}
	});
	$('.sell-fixedbar__tel').on('click', function() {
		dialog.show($('.tel'));
	});
	$('.dialog .cancel').on('click', function() {
		dialog.hide();
	});
	//支付宝支付跳转
	$('.pay-btn').on('click', function() {
		var url = $('.pay-ment .current').attr('data-url');
		var isAliPay = $('.pay-ment .current').hasClass('pay-ment__alipay');
		if(isAliPay) {
			location.href = url;
		}
	});
	// 图片加载
	var imgLst = $('.sell-detail img');
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
});