define(function(require, exports, module) {
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    //
    ;
    (function() {
        var grade = null,
            classIndex = null,
            //numberArr = ["一","二","三","四","五","六","七","八","九","十"],
            gradeText = null,
            classIndexText = null;
        $(".tea-grade-item , .tea-class-item").on("click", "li", function() {
            var self = $(this),
                parent = self.parent();
            self.siblings().removeClass("item-select");
            self.addClass("item-select");
            if (parent.hasClass("tea-grade-item")) {
                grade = self.data("grade");
                gradeText = self.text();
            }
            if (parent.hasClass("tea-class-item")) {
                classIndex = self.data("index");
                classIndexText = self.text();
            }
        })

        //弹框1显示
        function showDialog1() {
            $(".tea-dialog-wrap , .dialog-list").css("display", "block");
        }
        //弹框2显示
        function showDialog2() {
            $(".tea-dialog-wrap , .dialog-confirm").css("display", "block");
        }
        //弹框消失
        function hideDialog() {
            $(".tea-dialog-wrap , .dialog-list , .dialog-confirm").css("display", "none");
        }

        //点确定时关闭弹出框或者跳转首页
        $(".tea-dialog-wrap").on("click", ".btn-cancel", function() {
            var self = $(this),
                href = self.data("href");
            if (href == "1") {
                window.location = self.data("link");
            }
            hideDialog();
        })



        $(".tea-btn").on("click", "", function() {
            //年级或班级没有选中时不发请求
            if (grade == null && classIndex == null) {
                $(".tea-dialog1 .tea-dialog-tit").html("请选择班级和年级！");
                showDialog2();
                return false;
            }else if (grade == null) {
                $(".tea-dialog1 .tea-dialog-tit").html("请选择年级！");
                showDialog2();
                return false;
            }else if (classIndex == null) {
                $(".tea-dialog1 .tea-dialog-tit").html("请选择班级！");
                showDialog2();
                return false;
            }

            var self = $(this),
                link = self.data("link");
            //window.location = link + "?grade=" + grade + "&class=" + classIndex;
            $.ajax({
                type: "GET",
                url: link, //"test.json"
                data: {
                    "grade": grade,
                    "class": classIndex
                },
                dataType: "json",
                success: function(data) {
                    if (data.status == 0) {
                        $(".tea-dialog1 .tea-dialog-tit").html(data.info);
                        showDialog2();
                    } else if (data.status == 1 && data.info == "") {
                        $(".tea-dialog1 .btn-cancel").data("href", 1);
                        $(".tea-dialog1 .tea-dialog-tit").html(data.data);
                        showDialog2();
                    } else if (data.status == 1 && data.info == "1") {
                        var dataData = data.data,
                            class_id = dataData.class_id,
                            teacher_id = dataData.teacher_id,
                            teacher_real_name = dataData.teacher_real_name,
                            student_names = dataData.student_names,
                            str = "";

                        for (var i = 0, len = student_names.length; i < len; i++) {
                            var item = student_names[i];
                            str += item + '　';
                        }
                        $("#stuName").html(str);
                        $("#teaName").html(teacher_real_name);
                        $("#gradeClass").html(gradeText + classIndexText);
                        showDialog1();
                        //点击接管就会跳转
                        $(".tea-dialog-wrap").on("click", ".btn-confirm", function() {
                            var self = $(this),
                                link = self.data("link");
                            window.location = link + "?class_id=" + class_id + "&teacher_id=" + teacher_id;
                        })
                    }
                }
            });
        })
    })();

});
