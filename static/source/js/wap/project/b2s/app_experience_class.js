define("app_experience_class",["fastclick","swiper-3.3.1.jquery.min"],function(require, exports, module) {
    require("swiper-3.3.1.jquery.min");
    require("fastclick");//去除click延迟

    FastClick.attach(document.body);
//swiper
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        autoplayDisableOnInteraction : false,
        loop: true,
        pagination: '.swiper-pagination',// 如果需要分页器
    });


    //有弹框后禁止滑动
    var controlScroll = (function(){
        var dis = function(event){
            event.preventDefault();
        },
        body = document.body || document.documentElement;

        return {
            lock : function(){
                body.addEventListener('touchmove', dis, false);
            },
            unLock : function(){
                body.removeEventListener('touchmove', dis, false);
            }
        }
    })()
    // APP弹层支付
    $(".to_pay_on").on("click","",function(){
    	var _this = $(this),
    		_href = _this.data("href");
    	if(_href && _href != ""){
    		//有值的时候直接跳转到对应的链接，不显示弹层。
    		window.location.href = _href;
    		return false;
    	}
    	$(".js_dialog_wrap").removeClass("disnone");
    	controlScroll.lock();
    });
    $(".js_pay_dialog_hide").on("click","",function(){
    	$(".js_dialog_wrap").addClass("disnone");
    	controlScroll.unLock();
    });
    $(".js_dialog_wrap").on("click","",function(e){
    	$(".js_dialog_wrap").addClass("disnone");
    	controlScroll.unLock();
    });
    $(".js_pay_dialog").on("click","",function(){
    	return false;
    });
    //选择微信或支付宝 支付提交
    $(".js_paySelect").on("click","span",function(){
        var _this = $(this),
            paytype = _this.data('paytype');
        $(".js_paytype").val(paytype);
        $(".js_timestamp").val(new Date().getTime());
        //然后js触发form提交。
        $(".js_payform").submit();
    })

});

