define(function(require, exports, module) {
    require("appPrompt");
    ;
    (function() {

        var domId = null,//用来存储点击按钮的父级id
            js_solve = $(".js_solve"), //第一种状态，问题解决了吗？
            js_solveYes = $(".js_solveYes"), //第二种状态，问题已解决
            js_solveNo = $(".js_solveNo"), //第三种状态，问题未解决
            js_solve_show = $(".js_solve_show"), //共有三个状态
            js_dialog = $("#js_dialog"), //dialog灰色层
            js_dialog_close = $(".js_dialog_close"), //关闭dialog按钮
            js_dialog1 = $(".js_dialog1"), //弹框1
            js_dialog2 = $(".js_dialog2"), //弹框2
            js_unsolved = $(".js_unsolved"), //弹框1未解决按钮
            js_resolved = $(".js_resolved"), //弹框1已解决按钮
            js_textarea = $(".js_textarea"), //弹框2文本域
            js_submit = $(".js_submit"); //弹框2的提交按钮

        //点击按钮显示弹出框
        js_solve.on("click", "", function() {
            domId = $(this).parents("p").attr("id");
            console.log(domId);
            dialog_show("1");
        })

        //点击按钮关闭弹出框
        js_dialog_close.on("click", "", function() {
            dialog_close();
        })

        //弹框1里的问题已解决按钮
        js_resolved.on("click", "", function() {
            dialog_close();
            state_btn("1");
        })

        //弹框1里的问题未解决按钮
        js_unsolved.on("click", "", function() {
            js_dialog1.addClass('disnone');
            js_dialog2.removeClass('disnone');
            // js_textarea.val("");
        })

        //弹框2里的提交按钮
        js_submit.on("click", "", function() {
            var str = $.trim(js_textarea.val());
            console.log(str);
            //发送ajax请求，发送成功后关闭弹窗框，并更改状态为-问题未解决
            /*$.ajax({
                type: "GET",
                url: "",
                data: {"str":str },
                dataType: "json",
                success: function(data) {
                    dialog_close();
                    state_btn(2);
                }
            });*/
            if(str != ""){
                dialog_close();
                state_btn(2);
            }
            
        })

        //问题已解决状态里的 修改 按钮
        js_solveYes.on("click", "a", function() {
            domId = $(this).parents("p").attr("id");
            dialog_show(2);
            // js_textarea.val("");
        })

        //问题未解决状态里的 修改 按钮
        js_solveNo.on("click", "a", function() {
            domId = $(this).parents("p").attr("id");
            state_btn(1);
        })

        //显示dialog，str为区别显示哪个弹出框。
        var dialog_show = function(str) {
            if (str == 1) {
                js_dialog1.removeClass('disnone');
                js_dialog2.addClass('disnone');
            } else if (str == 2) {
                js_dialog1.addClass('disnone');
                js_dialog2.removeClass('disnone');
            }
            js_dialog.removeClass('disnone');
            var _dom = $(".serviceRecord-dialog-con"),
                _w = _dom.width(),
                _h = _dom.height();
            // alert(_w)
            // alert(_h)
            _dom.css({
                "marginLeft": 0-_w/2,
                "marginTop": 0-_h/2
            });
        }

        //关闭dialog。
        var dialog_close = function(str) {
            js_dialog.addClass('disnone');
        }

        //切换三种状态的按钮,
        var state_btn = function(str) {
            // var stateArr = [js_solve, js_solveYes, js_solveNo]; //[0,1,2]
            var stateArr = ["js_solve", "js_solveYes", "js_solveNo"]; //[0,1,2]
            // js_solve_show.addClass('disnone');
            $("#"+domId).find(".js_solve_show").addClass('disnone');
            console.log($("#"+domId).find(".js_solve_show"))
            // stateArr[str].removeClass('disnone');
            $("#"+domId).find("."+stateArr[str]).removeClass('disnone');
            console.log($("#"+domId).find("."+stateArr[str]))
        }

        ///////////////////////////////////////
        //限制文本域中输入的个数
        var js_textarea = $(".js_textarea"),
            maxLength = js_textarea.data("maxlength");

        js_textarea.on("input","",function(){
            var _this = $(this);
            checkLength(_this,maxLength);
        })

        var checkLength = function(dom,num){
            var val = dom.val(),
                len = val.length;
            val = len > num ? val.substring(0,num) : val;
            js_textarea.val(val);
            $(".js_textareaRemaining").html(val.length+"/"+num);
        }


    })();

});
