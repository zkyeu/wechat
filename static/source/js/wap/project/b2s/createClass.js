define(function(require, exports, module) {
    var utility = require("utility"),
        // regs = $.formVerify.utility.regs,
        confirm = utility.confirm,
        promptDialog = utility.promptDialog,
        formTempData = {};

    // select
    ;
    (function() {
        var select = $("select"),
            uiselect = $(".ui-select"),
            isIOS = utility.checkPlat.isIOS();
            tempData = {},
            school_id = $("#school_id"),
            teacher_id = $("#teacher_id"),
            is_change = $("#is_change"),
            rel_selgrade = $("select[rel=selgrade]"),
            rel_selclass = $("select[rel=selclass]"),
            role=$("body").data("role");

        select.on({
            change: function(e) {
                var self = $(this),
                    val = self.val(),
                    text = self.find("option:selected").text(),
                    e = e || event,
                    rel = $(e.target).attr("rel");
                if (!!window.isTrigger) return;

                self.siblings("p")[(val == "" ? "add" : "remove") + "Class"]("def-sel").text(text);

                //需要判断是年级还是班级，年级就发请求进行渲染，班级不发请求。请求的数据进行临时保存，下次直接读取本地的。
                if (rel == "selgrade") {
                    isChangeRepeat();

                    /*if (!tempData[val]) {
                        $.ajax({
                            url: "/ajax/getGradeClassInfo",
                            data: {
                                grade: val,
                                school_id: school_id.val()
                            },
                            type: "get",
                            cache: false,
                            dataType: "json",
                            success: function(data) {
                                var status = data.status;
                                if (status == 1) {
                                    bindData(data.data);
                                    tempData[val] = data.data;
                                }
                            }
                        });
                    } else {
                        bindData(tempData[val]);
                    }*/

                } else if (rel == "selclass") {
                    isChangeRepeat();
                }
            },
            blur: function() {
                if (!isIOS) return;
                $(this).closest(".ui-select").removeClass("is-selecting");
            },
            focus: function() {
                if (!isIOS) return;
                $(this).closest(".ui-select").addClass("is-selecting");
            }
        });

        /*var bindData = function(data) {
            for (var item in data) {
                $(".form-wrap input[rel='" + item + "']").val(data[item]);
            }
            console.log(tempData);
        }*/

        //判断年级和班级都有参数时发送请求判断此年级和班级是否被其他老师绑定
        var isChangeRepeat = function() {
            if(role!="agent"){
                formTempData.isChange = 2;//状态为2，直接提交。
                return;//如果不是代理商就跳出。
            }

            formTempData.selgrade = rel_selgrade.val(); //年级编号
            formTempData.selclass = rel_selclass.val(); //班级编号
            if (formTempData.selgrade != "" && formTempData.selclass != "") {

                $.ajax({
                    url: "/wapagent/getClassBindStatus",
                    data: {
                        grade_index: formTempData.selgrade,
                        class_index: formTempData.selclass,
                        school_id: school_id.val(),
                        teacher_id: teacher_id.val()
                    },
                    type: "get",
                    cache: false,
                    dataType: "json",
                    success: function(data) {
                        //status 1:已存在该班级 , 2:班级不存在 , -1:参数或异常错误
                        var status = data.status;
                        if (status == 1) {
                            is_change.val(1);
                            formTempData.isChange = 1;
                            formTempData.returnPrompt=data.info;
                        } else if (status == 2) {
                            is_change.val("");
                            formTempData.isChange = 2;
                            formTempData.returnPrompt=null;
                        } else if (status == -1) {
                            is_change.val("");
                            formTempData.isChange = -1;
                            formTempData.returnPrompt=data.info;
                        }
                    }
                });
            }
        }

    })();

    // 表单验证
    ;
    (function() {
        $("[rel=creatClass]").formVerify({
            rules: {
                selgrade: {
                    required: [true, "请选择年级"]
                },
                selclass: {
                    required: [true, "请选择班级"]
                }/*,
                teaching_materials: {
                    required: [true, "请输入使用教材"],
                    reg: [regs.teachingtext, "请输入正确的使用教材"]
                },
                learn_schedule: {
                    required: [true, "请输入学习进度"],
                    reg: [regs.learntext, "请输入正确的学习进度"]
                },
                teaching_schedule: {
                    required: [true, "请输入教学进度"],
                    reg: [regs.teachingprogress, "请输入正确的教学进度"]
                }*/
            },
            submitHandler: function() {
                var self=this;
                if (!self.checkFlag) return;

                if (formTempData.isChange==1) {
                    confirm({
                        content: formTempData.returnPrompt.replace(/\r\n/gi,"<br />"),
                        btns: {
                            confirm: '<a href="javascript:void(0)" cb="cancel" class="btn-cancel">取消</a><a href="javascript:void(0)" cb="sure" class="btn-sure">继续</a>'
                        },
                        sureCb: function() {
                            self[0].submit();
                        }
                    });
                } else if (formTempData.isChange==2){
                    self[0].submit();
                } else if (formTempData.isChange==-1){
                    utility.promptDialog({
                        content: formTempData.returnPrompt,
                        myClass:"width-height-auto",
                        width:"auto",
                        height:"auto",
                    });
                }

            }
        });
    })();

});
