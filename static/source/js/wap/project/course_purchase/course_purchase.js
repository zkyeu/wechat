define(function(require,exports,module){
	var observer = {
		
		target: $(document),

		subscribe: function() {
			this.target.on.apply(this.target, arguments);
		},

		unsubscribe: function() {
			this.target.off.apply(this.target, arguments);
		},

		publish: function() {
			this.target.trigger.apply(this.target, arguments);
		},
	};
	//pms:38775  reedit by sxc 2017.1.25
	var toast = {//弹层
		
		create: function() {
			this.model = $('<div class="toast hide"></div>');
			this.modelContent = $('<span class="content"></span>');
			this.model.append(this.modelContent);
			$('body').append(this.model);
		},

		show: function() {
			this.model.removeClass('hide');
		 	this.iTimer = setTimeout($.proxy(this.hide, this) , 1000);
		},

		render: function(message) {
			this.modelContent.html(message);
		},

		hide: function() {
			this.model.addClass('hide');
			clearTimeout(this.iTimer);
		},

		bindEvents: function() {
			observer.subscribe('toast', $.proxy(this.handleToast, this));
		},

		handleToast: function(e) {
			var message = arguments[1];
			this.render(message.message);
			this.show();
		},
		init: function() {
			this.create();
			this.bindEvents();
		}
	};

	var packageDialog = {

		dialog: $('.package-dialog'),//代金券弹层

		coupons: $('.coupons'),//代金券列表

		couponInput: $('.coupon-dialog').find('input'),//添加代金券

		addButton: $('.coupon-dialog').find('.add'),//添加按钮

		closeButton: $('.coupon-dialog').find('.close'),//关闭按钮

		addurl: $('#addurl').data('url'),//代金券校验api

		totalPrice: $('#totalprice'),//总价

		show: function() {
			this.dialog.removeClass('hide');
		},

		hide: function() {
			this.dialog.addClass('hide');
		},

		init: function() {

			this.setDialogHeight();
			this.bindEvents();
		},

		setDialogHeight: function() {
			var documentHeight = $(document).height();
			var windowHeight = $(window).height();
			var maxHeight = Math.max(documentHeight, windowHeight);
			this.dialog.height(maxHeight);
		},

		bindEvents: function  (argument) {
			this.addButton.on('click', $.proxy(this.handleAddButtonClick, this));
			this.closeButton.on('click', $.proxy(this.handleCloseButtonClick, this));
			this.coupons.on('click', '.valid', $.proxy(this.handleValidCouponClick, this));
		},

		handleAddButtonClick: function() {
			var couponVal = $.trim(this.couponInput.val());
			var price = this.totalPrice.val();
			var reqData = {
				price: price, 
				card_id: couponVal
			};
			if (!couponVal) {
				observer.publish('toast', {message: "请输入代金券号码"});
				return;
			}
			this.sendRequest(this.addurl, 'post', reqData, this.handleResponseSuccess, this.handleResponseError);
		},

		sendRequest: function(url, method, data, success, error) {
			$.ajax({
				url: url,
				type: method,
				dataType: 'json',
				data: data,
				context: this,
				success: success,
				error: error,
			});
		},

		handleResponseSuccess: function(res) {
			var data = res.data;
			var status = data.status
			if (status === 0) {
				observer.publish('toast', {message: data.msg});
			} else if (status === 1){
				this.addCouponItem(data);
			}
		},

		addCouponItem: function(data) {
			var expire = data.expire;
			var money = data.money;
			var card_id = data.real_card_id;

			var couponHtml = '<li class="valid" data-id="'+ card_id +'" data-money="'+ money+'">\
							<span class="lefticon"></span>\
							<span class="divider"></span>\
							<span class="checkbutton"></span>\
							<div class="type">&yen;<span class="money">'+ money +'</span>元代金券</div>\
							<div class="validity">有效期至：'+ expire +'</div>\
						</li>';
			this.coupons.prepend(couponHtml);
		},

		handleResponseError: function(res) {
			alert('服务器出问题了，请稍后再试');	
		},

		handleCloseButtonClick: function() {
			this.hide();
		},

		handleValidCouponClick: function(e) {
			var target = e.currentTarget;
			this.coupons.find('.checkbutton').removeClass('validcheckbuttonactive');
			$(target).find('.checkbutton').addClass('validcheckbuttonactive');
			var couponId = $(target).data('id');
			var couponMoney = $(target).data('money');
			this.hide();
			observer.publish('updatePrice', {couponId: couponId, couponMoney: couponMoney});
			page.baitiaoShow();
		}
	};

	var page = {

		choose: $('.package-price-ticket'),

		chooseButton: $('.package-price-ticket').find('.choose'),

		packageForm: $('#package-form'),

		purchaseButton: $('.package-fixbar-purchase'),

		purchasePay:$('.package-payfixbar__buy'),

		pactButton: $('.package-pact-agree'),

		pactInput: $('#pact-input'),

		teleinput: $('.teleinput'),
		
		dateInput: $('.dateinput'),

		dateSpan: $('.datespan'),

		couponIdInput: $('#cash_card'),//代金券状态记录

		merchantsInput: $('#merchants-input'),

		currentPrice: $('.package-price-current').find('.price'),

		disbursements: $('.disbursements').find('.money'),

		merchants: $('.merchants').find('li'),

		totalPrice: $('#totalprice'),

		IOUs:$(".baitiao"),

		installmentChoose:$(".package-price-ticket"),

		installmentList:$(".coupons li.valid span.checkbutton"),

		allowUseType:$(".merchants li"),

		init: function() {
			var isAndroid = this.checkIsAndroid();
			if (isAndroid && window.nativeCalendar) {
				this.dateInput.addClass('hide');
				this.dateSpan.removeClass('hide');
			}
			packageDialog.init();			
			toast.init();
			this.bindEvents();
		},

		bindEvents: function() {
			this.purchaseButton.on('click', $.proxy(this.handlePurchaseButtonClick, this));
			this.purchasePay.on('click', $.proxy(this.handlePurchaseButtonClick, this));
			this.pactButton.on('click', $.proxy(this.handlePactButtonClick, this));
			this.merchants.on('click', $.proxy(this.handleMerchantsClick, this));
			this.choose.on('click', $.proxy(this.handleChooseClick, this));
			this.dateSpan.on('click', $.proxy(this.handleDatespanClick, this));
			observer.subscribe('updatePrice', $.proxy(this.handleUpdatePrice, this));  
			this.baitiaoShow();
			this.IOUs.on("click",$.proxy(this.installmentNoSale, this));
			this.allowUseType.on("click",$.proxy(this.allowUseInstallment, this))
		},

		checkIsAndroid: function() {
			var uA = navigator.userAgent;
			var isAndroid = uA.indexOf('Android') > -1 || uA.indexOf('Adr') > -1;
			return isAndroid;
		},

		handleDatespanClick: function() {
			var nativeCalendar;
			if (window.nativeCalendar) {
				nativeCalendar = window.nativeCalendar;
				nativeCalendar.getDate();
			}
		},

		handleUpdatePrice: function(e) {
			var coupon = arguments[1];
			this.couponIdInput.val(coupon.couponId);

			var currentMoney = +this.totalPrice.val();
			var couponMoney = +coupon.couponMoney;
			currentMoney = currentMoney - couponMoney;
			this.currentPrice.html(currentMoney);
			this.disbursements.html(currentMoney);
			this.chooseButton.html('-&yen;' + couponMoney);
		},
		installmentNoSale:function(e){//2017.1.25 add by sxc
			var coupon = arguments[1];
			this.couponIdInput.val("");
			var currentMoney = +this.totalPrice.val();
			this.currentPrice.html(currentMoney);
			this.disbursements.html(currentMoney);
			this.chooseButton.html("选择代金券").addClass("hide");
			this.installmentChoose.hide();
		},
		allowUseInstallment:function(e){
			var _target=e.currentTarget,
			sale_check=$(_target).hasClass("baitiao");

			if(!sale_check){
				this.chooseButton.removeClass("hide");
				this.installmentChoose.show();
				this.installmentList.removeClass("validcheckbuttonactive");
			}
		},
		baitiaoShow:function() {
			var subPrice=this.disbursements.html();
			if(subPrice<1200){ 
					$(".logos").find("li.DJbaitiao").css("display","none");
					$(".merchants").find("li.baitiao").css("display","none");
			}else{ 
				  $(".logos").find("li.DJbaitiao").css("display","block");
					$(".merchants").find("li.baitiao").css("display","block");

			}
		},

		handleChooseClick: function() {
			packageDialog.show();
		},

		handleMerchantsClick: function(e) {
			var target = e.currentTarget;
			var merchantsName = $(target).data("name");
			this.merchants.find('.button').removeClass('check');
			$(target).find('.button').addClass('check');	
			this.merchantsInput.val(merchantsName);
		},
		handlePurchaseButtonClick: function() {
			var formStatus = this.checkForm();
			if (!formStatus) {
				return;
			}
			this.packageForm.submit();
		},

		checkForm: function() {
			var pactValue = this.pactInput.val();
			if (!pactValue) {
				observer.publish('toast', {message: "请选择同意协议"});					
				return false;
			}
			var tele = this.teleinput.val();
			var re = /^[1-9]\d{10}$/;
			if (tele) {
				if (re.test(tele)) {
				} else {
					observer.publish('toast', {message: "请输入正确的手机号"});					
					return false;
				}
			}
			return true;
		},

		handlePactButtonClick: function(e) {
			var target = e.currentTarget;
			if ($(target).hasClass('agree')) {
				$(target).removeClass('agree');
				this.pactInput.val('');
			} else {
				$(target).addClass('agree');
				this.pactInput.val('agree');
			}

		}
	};

	page.init();

	// 安卓日历控件赋值
	window.setCalendar = function(str) {
		$('.datespan').html(str);
		$('.dateinput').val(str);
	}
});
