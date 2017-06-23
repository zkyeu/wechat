define(function(require, exports, module) {
    require("appPrompt");;
    (function() {
        //设置高度
        var _w = $(window).width(),
            _h = $(window).height();
        $("body").css({ "height": "auto", "min-height": _h });
        $(".consult-wrap,.consult-wrap2").css({ "min-height": _h - 50 });

        //限制文本域中输入的个数
        var js_textarea = $(".js_textarea"),
            maxLength = js_textarea.data("maxlength");

        js_textarea.on("input", "", function() {
            var _this = $(this);
            checkLength(_this, maxLength);
        })

        var checkLength = function(dom, num) {
            var val = dom.val(),
                len = val.length;
            val = len > num ? val.substring(0, num) : val;
            js_textarea.val(val);
            $(".js_textareaRemaining").html(val.length + "/" + num);
        }

        /*下拉列表 start*/
        window.onload = function() {
                var js_select = $(".js_select"),
                    initdata = js_select.data('initdata') || "",
                    // data = initdata.data || "",
                    time_list = initdata.time_list || "",
                    // str = '<option value="请选择上课时间">请选择上课时间</option>';
                    str = '';
                // console.log(initdata);
                // console.log(time_list);
                if (initdata == "" || time_list == "") {
                    js_select.css({"width":"0","height":"0"});
                } else {
                    for (var i = 0, len = time_list.length; i < len; i++) {
                        // console.log(time_list[i]);
                        str += '<option value="' + time_list[i] + '">' + time_list[i] + '</option>';
                    }
                    js_select.html(str);

                    var selectStr = js_select.val(),
                        selectStrNow = "";
                    // alert(selectStr);
                    js_select.on("blur", "", function() {
                        // selectStrNow = js_select.val();
                        selectStrNow = js_select.find('option:selected').val();
                        js_select.prev().html(selectStrNow);
                        // alert();
                    })
                    // js_select.on("blur", "", function() {
                    //     if(selectStr == selectStrNow){
                    //         js_select.prev().html(selectStr);
                    //     }else{
                    //         js_select.prev().html(selectStrNow);
                    //     }
                    // })
                }

                $(".js_selectWrap").on("click", "", function(e) {
                    // alert("123");
                    if (initdata == "" || time_list == "") {
                        appPrompt({
                            "text": "暂无可选的时间段，请稍后再试",
                            "class": "",
                            "cb": function() {}
                        });
                    }
                })
            }
            /*下拉列表 end*/

        //点击弹窗
        $(".js_dialog_close").on("click", "", function() {
            $(".js_consult_dialog_wrap").addClass("disnone");
        })
        window.dialog_href = function(cb){
            $(".js_consult_dialog_wrap").addClass("disnone");
            if(cb){
                cb();
            }
        }
        window.dialog_show = function(){
            $(".js_consult_dialog_wrap").removeClass("disnone");
        }


        /*
          添加时间控件 start
        */
        /*var datetime = $("#datetime");
        var inputWidth = $(".consult-select").width();
        datetime.css({ "width": inputWidth - 2 + "px" });

        function toWeek(val) {
            var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
            var date = new Date(val),
                year = date.getUTCFullYear(),
                month = date.getUTCMonth(),
                dateT = date.getUTCDate(),
                day = date.getUTCDay(),
                hours = date.getUTCHours(),
                minutes = date.getUTCMinutes();
            //alert(date)
            $(".js_hidden").val(date.getTime());
            var week = show_day[day];
            // console.log(date);
            // console.log(date.getTime());
            // console.log(new Date(parseInt(date.getTime()) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "));
            // console.log(year);
            // alert(111)
            month = month + 1;
            month < 10 ? month = "0" + month : month;
            hours < 10 ? hours = '0' + hours : hours;
            minutes < 10 ? minutes = '0' + minutes : minutes;
            return year + "年" + month + "月" + dateT + "日" + "(" + week + ")" + hours + ":" + minutes;
        }
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            //alert("iphone");
            datetime.on("blur", function() {
                var val = $(this).val();
                var str = toWeek(val);
                $(this).siblings("span").html(str);
            })
        } else if (/android/.test(ua)) {
            //alert("android"); 
            datetime.on("change", function() {
                var val = $(this).val();
                var str = toWeek(val);
                $(this).siblings("span").html(str);

            })
        }

        $(".js_submit").on("click", "", function() {
            $(".datetime").remove();
            $(".js_form").submit();
        })*/

        /*
          添加时间控件 end
        */

        ///////////////////////////////////////////////////////////////////
        /*var js_dialog = $("#js_dialog"), //dialog灰色层
            js_dialog_close = $(".js_dialog_close"); //关闭dialog按钮*/


        //点击按钮显示弹出框
        /*$(".js_textareaRemaining").on("click", "", function() {
            dialog_show("aaa");
        })*/

        /*//点击按钮关闭弹出框
        js_dialog_close.on("click", "", function() {
            dialog_close();
        })

        //显示dialog，str为区别显示哪个弹出框。
        window.dialog_show = function(str) {
            $(".js_prompt").html(str);
            js_dialog.removeClass('disnone');
        }

        //关闭dialog。
        window.dialog_close = function(str) {
            js_dialog.addClass('disnone');
        }*/

        ///////////////////////////////////////////////////////////

        //////
        /*$("#js_file").on("change","",function(e){
            
        })*/
        /*$("#js_file").on("change","",function(e){
            var _this = this,
                files = this.files,
                img = new Image();
                //File API
                // console.log(e)
                // console.log(_this)
                // console.log(files)
                // alert(files.length)
                // alert(files[0].name + "," + files[0].size + " bytes");
                img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
                // img.width = 200;
                img.onload = function(e) {
                    window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                }
                // $(".consult-picList").appendChild(img);
                $(".consult-picList").append(img);
        })*/

    })();

});
