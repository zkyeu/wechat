define("class_management3", ["", ""], function(require, exports, module) {
    var delBtn = $("#del-class"),
        pop = $(".pop"),
        js_dialog = $("#js_dialog"), //dialog灰色层
        js_dialog_close = $(".js_dialog_close"), //关闭dialog按钮
        js_dialog_con = $(".js_dialog_con"), //
        js_dialog_text = $(".js_dialog_text"),//弹框中的提示文字
        js_dialog1 = $(".js_dialog1"), //弹框1
        js_dialog2 = $(".js_dialog2"), //弹框2
        js_cancel = $(".js_cancel"), //隐藏弹框
        js_confirm = $(".js_confirm"), //
        ajaxUrl = null,
        successUrl = null;

    $(".class_title").on("tap", "span", function(e) {
        e.stopPropagation();
        dialog_show("3");
    });
    js_dialog.on("tap", function() {
        // $(".pop").hide();
        dialog_close();
    });
    pop.on("tap", ".pop_content", function(e) {
        e.stopPropagation();
        // $(".pop").show();
    })
    js_dialog_con.on("tap", "", function(e) {
        e.stopPropagation();
    })


    //点击删除按钮显示弹出框
    delBtn.on("click", "", function() {
        var _this = $(this);
        ajaxUrl = _this.attr('del-class-url');
        successUrl = _this.attr('del-success-url');
        dialog_show("1");
    })

    //点击按钮关闭弹出框
    js_dialog_close.on("click", "", function() {
        dialog_close();
    })

    //弹框里的确认
    js_confirm.on("click", "", function() {
        dialog_close();
        $.ajax({
            type: "GET",
            url: ajaxUrl,
            data: {},
            dataType: "json",
            success: function(data) {
                /*0失败1成功，info就是提示话术  
                {
                    status： 0，
                    info：“ 错误提示”,
                    data: ""
                }*/
                var status = data.status,
                    info = data.info;
                if(status == 0){
                    dialog_show("2");
                    js_dialog_text.html(info);
                }else if(status == 1){
                    window.location.href = successUrl;
                }
            }
        });
    })

    //弹框1里的取消按钮
    js_cancel.on("click", "", function() {
        dialog_close();
    })

    //显示dialog，str为区别显示哪个弹出框。
    var dialog_show = function(str) {
        if (str == 3) {
            pop.removeClass('disnone');
            js_dialog_con.addClass('disnone');
        } else if (str == 1) {
            pop.addClass('disnone');
            js_dialog_con.removeClass('disnone');
            js_dialog1.removeClass('disnone');
            js_dialog2.addClass('disnone');
            js_dialog_text.html("确认删除？");
        } else if (str == 2) {
            pop.addClass('disnone');
            js_dialog_con.removeClass('disnone');
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
            "marginLeft": 0 - _w / 2,
            "marginTop": 0 - _h / 2
        });
    }

    //关闭dialog。
    var dialog_close = function(str) {
        js_dialog.addClass('disnone');
    }


});
