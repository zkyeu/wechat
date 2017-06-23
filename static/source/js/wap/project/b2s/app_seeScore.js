define("app_seeScore",["fastclick"],function(require, exports, module) {
    require("fastclick");//去除click延迟

    FastClick.attach(document.body);


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
    $(".js_seeScore_pay").on("click","",function(){
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

