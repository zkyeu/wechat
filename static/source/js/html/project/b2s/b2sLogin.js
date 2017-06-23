define("b2sLogin",["b2sApp","utility"],function(require,exports,module){
    
    var
    b2sApp = require("b2sApp"),
    utility = require("utility"),
    regs = $.formVerify.utility.regs;
    
    // tab切换
    var $b2sLoginHead = $(".b2s-form-head"),
        $b2sFormTab = $(".b2s-form-tab");
    $b2sLoginHead.on("click",".b2s-form-head-swtich li",function(){
        var $self = $(this);
        if($self.hasClass("cur")) return;
        $self.addClass("cur").siblings().removeClass("cur");
        $b2sLoginHead.toggleClass("cur");
        $b2sFormTab.toggleClass("cur");
    });

    // 自动登录
    var $b2sFormAuto = $(".b2s-form-auto");
    $b2sFormAuto.on("click","label",function(){
        var $self = $(this);
        window.setTimeout(function(){
            var isCheck = $self.siblings("input[type=checkbox]").prop("checked");
            $self.closest(".b2s-form-auto")[(isCheck ? "add" : "remove") + "Class"]("cur");
        },0);        
    });

    //登录校验
    ;(function(){
        var forms = $("form[rel]");
        forms.each(function(i,v){
            $(v).formVerify({
                rules:{
                    phone:{
                        required:[true,"请输入手机号"],
                        reg:[regs.phone,"请输入正确的手机号"]
                    },
                    stu:{
                        required:[true,"请输入手机号"],
                        reg:[regs.stu,"请输入正确的手机号"]
                    },
                    password:{
                        required:[true,"请输入密码"],
                        reg:[regs.password,"请输入正确的密码"]
                    }
                },
                errorHandler:function(flag,text){
                    var $self = $(this),
                        $err = $self.siblings(".b2s-form-error");
                    !flag && $err.text(text);
                    $err.closest("dl")[(flag ? "remove" : "add") + "Class"]("b2s-form-iserror");

                    return;
                    var type = flag ? "hide" : "fadeIn";
                    $(this).closest("ul").find("em").text(text).parent(".error-tips")[type]();
                }
            }).on("focus","input[rel]",function(){
                $(this).closest("dl").removeClass("b2s-form-iserror");
            }).on("click",".b2s-form-error",function(){
                $(this).siblings("input").trigger("focus");
            });
        });
    })();

    // placeholder修复
    utility.placeHolderFix.init(58);
});