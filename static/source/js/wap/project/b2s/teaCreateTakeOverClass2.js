define(function(require, exports, module) {
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;

    //
    ;
    (function() {
        var tabGrade = $(".tea-class-con-grade"),
            classItems = $(".tea-class-con-items"),
            selectItem = $(".tea-class-select-items .tea-class-select-item"),
            selectNum = $(".tea-class-select-tit .num"),
            dialogWrap = $(".tea-dialog-wrap2"),
            teaBtn = $(".tea-btn"),
            windowHeight = $(window).height();


        // 年级切换
        tabGrade.on("click", "li", function() {
            var _this = $(this),
                _index = _this.index();
            _this.addClass('active').siblings().removeClass('active');
            classItems.find('ul').eq(_index).addClass('active').siblings().removeClass('active');
        })

        // 选择年级下的班级会放入已选班级列表
        classItems.on("click", "li", function() {
            var _this = $(this);


            selected(_this);
        })

        // 选择完毕点击提交按钮
        teaBtn.on("click", "", function() {
            submitBtn();
        })

        //点击选中后的操作。
        function selected(dom) {
            var _dom = dom,
                _classid = _dom.data("classid"),
                _gradeClass = _dom.data("gradeclass"),
                _grade = _gradeClass.split("_")[0],
                _class = _gradeClass.split("_")[1],
                _gradeStr = changeNum(_grade),
                _status = _dom.data("status"), //状态：1为默认就有，0为新选中。
                _whether = _dom.hasClass('selected');
            // console.log(_grade + "^" + _class);

            if (_whether) {
                //以前选中，需要取消，默认初始选中的需要弹框提示，新选中直接取消。
                if (_status == 1) {
                    //弹窗框
                    prompt1(_classid);
                } else {
                    _dom.removeClass('selected');
                    selectItem.find('li[data-gradeclass="' + _gradeClass + '"]').remove();
                }
                //更改选中的个数。
                selectNum.html(selectItem.find('li').length);
            } else {
                //以前没有选中，需要选中,*判断这个班级是否被其他老师绑定。
                $.ajax({
                    type: "GET",
                    url: "/wapNew/Teacher/checkClass",
                    data: { "grade_id": _grade, "class_id": _class },
                    dataType: "json",
                    success: function(data) {
                        var _error = data.error,
                            _msg = "",
                            _data = null;
                        if (_error == 0) {
                            _dom.addClass('selected');
                            selectItem.append('<li data-gradeclass="' + _grade + '_' + _class + '" data-status="0">' + _gradeStr + '年级' + _class + '班</li>');
                        } else if (_error == 1) {
                            _msg = data.msg;
                            prompt2({ "msg": _msg, "btnText": "我知道了" })
                        } else if (_error == 2) {
                            _msg = data.msg;
                            prompt2({ "msg": _msg, "btnText": "我知道了", "href": "/" })
                        } else if (_error == 3) {
                            _msg = data.msg;
                            _data = data.data;
                            prompt3({ "grade": _grade, "class": _class, "data": _data })
                        }

                        //更改选中的个数。
                        selectNum.html(selectItem.find('li').length);
                        
                        /*a={
                            error:0
                        }
                        a={
                            error:1,
                            msg:"参数错误"
                        }
                        a={
                            error:2,
                            msg:"用户未登录"
                        }
                        a={
                            error:3,
                            msg:"当前班级有老师接管"，
                            class_id:"09090",
                            teacher_id:"8899889988899",
                            data:{
                                "teacher_name":"XXX",
                                "total_count":"5（学生个数）",
                                "student_list":["张三","李四","王五"]
                            }
                        }*/
                    }
                });

            }
            
        }

        // params = { "value": ["1_1", "1_5", "2_3"] }
        //点击完成按钮，提交。
        function submitBtn() {
            var _selected = selectItem.find('li[data-status="0"]'),
                arr = new Array(),
                params = null,
                paramsStr = "";
            for (var i = 0, len = _selected.length; i < len; i++) {
                // console.log(_selected[i])
                // console.log($(_selected[i]))
                var _this = $(_selected[i]),
                    _gradeclass = _this.attr("data-gradeclass");
                // arr[0]= _gradeclass;
                arr.push(_gradeclass);
            }
            params = { "value": arr };
            paramsStr = JSON.stringify(params);
            // console.log(arr);
            // console.log(params);
            // console.log(paramsStr);

            //发送ajax请求。
            $.ajax({
                type: "GET",
                url: "/wapNew/Teacher/createClass",
                data: {"params":paramsStr},
                dataType: "json",
                success: function(data) {
                    var _error = data.error,
                        _invitecode = data.invite_code,
                        _msg = data.msg;
                    if (_error == 0) {
                        prompt4({ "invite_code": _invitecode, "href": "/wapNew/Teacher/transferIndex" })
                    } else {
                        prompt2({ "msg": _msg, "btnText": "我知道了" })
                    }
                    /*data = {
                        "error":"0",
                        "invite_code":"378628",
                        "msg":"XXXXXXX",
                    }*/
                }
            });
        }

        //弹出框：弹框提交成功
        function prompt4(data) {
            var _invitecode = data.invite_code,
                _href = data.href,
                dialogSuccess = $(".dialog-success");
            dialogWrap.css({ "display": 'block' });
            dialogSuccess.css({ "display": 'block' });
            dialogSuccess.find("#invite_code").html(_invitecode);
            dialogSuccess.find(".btn-confirm").off("click").on("click", function() {
                window.location.href = _href;
            })
        }

        //弹出框：此班级有老师的情况。
        function prompt3(data) {
            var _grade = data.grade,
                _gradeStr = changeNum(_grade),
                _class = data.class,
                _data = data.data,
                _classId = _data.class_id,
                _teacherId = _data.teacher_id,
                _teacherName = _data.teacher_name,
                _totalCount = _data.total_count,
                _studentList = _data.student_list,
                _stuShowNum = 12, //弹出框中只显示12个名字
                dialogList = $(".dialog-list");
            dialogWrap.css({ "display": 'block' });
            dialogList.css({ "display": 'block' });
            dialogList.find("#gradeClass").html(_gradeStr + "年级" + _class + "班");
            dialogList.find("#teaName").html(_teacherName);
            dialogList.find("#stuName").html(stuNum(_studentList, _stuShowNum));
            dialogList.find(".btn-cancel").off("click").on("click", function() {
                dialogWrap.hide();
                dialogList.hide();
            })
            dialogList.find(".btn-confirm").off("click").on("click", function() {
                // 
                $.ajax({
                    type: "GET",
                    url: "/wapNew/Teacher/applyTransferConfirn",
                    data: { "teacher_id": _teacherId, "class_id": _classId, "ajax": "1" },
                    dataType: "json",
                    success: function(data) {
                        var _data = data.data,
                            _info = data.info;
                        //学生列表弹出框消失，弹出申请提示框
                        dialogList.hide();
                        if (_info == 1) {
                            prompt2({ "msg": "申请成功！", "btnText": "我知道了" })
                        } else {
                            prompt2({ "msg": _info, "btnText": "我知道了" })
                        }
                    }
                });
            })

            function stuNum(nameList, showNum) {
                var nameStr = "",
                    len = nameList.length > showNum ? showNum : nameList.length;
                for (var i = 0; i < len; i++) {
                    nameStr += nameList[i] + "　";
                }
                return nameStr;
            }
        }

        //弹出框：弹框下面只有一个按钮
        function prompt2(data) {
            var _msg = data.msg,
                _btnText = data.btnText,
                _href = data.href || null,
                dialogAlert = $(".dialog-login");
            dialogWrap.css({ "display": 'block' });
            dialogAlert.css({ "display": 'block' });
            dialogAlert.find(".tea-dialog-tit").html(_msg);
            dialogAlert.find(".btn-confirm").html(_btnText);
            dialogAlert.find(".btn-confirm").off("click").on("click", function() {
                if (_href != null) {
                    window.location.href = _href;
                }
                dialogWrap.hide();
                dialogAlert.hide();
            })
        }

        //弹出框：不再任教此班级
        function prompt1(classid) {
            var dialogConfirm = $(".dialog-confirm");
            dialogWrap.css({ "display": 'block' });
            dialogConfirm.css({ "display": 'block' });
            dialogConfirm.find(".btn-cancel").off("click").on("click", function() {
                dialogWrap.hide();
                dialogConfirm.hide();
            })
            dialogConfirm.find(".btn-confirm").off("click").on("click", function() {
                var _this = $(this),
                    _href = _this.data("href");
                window.location.href = _href + classid;
            })
        }

        //转换阿拉伯数字和文字数字,主要是转换年级，一共7个年级，如果超过10需要重写方法。
        function changeNum(num) {
            var numStr = null;
            switch (num) {
                case "0":
                    numStr = "零";
                    break;
                case "1":
                    numStr = "一";
                    break;
                case "2":
                    numStr = "二";
                    break;
                case "3":
                    numStr = "三";
                    break;
                case "4":
                    numStr = "四";
                    break;
                case "5":
                    numStr = "五";
                    break;
                case "6":
                    numStr = "六";
                    break;
                case "7":
                    numStr = "七";
                    break;
                case "8":
                    numStr = "八";
                    break;
                case "9":
                    numStr = "九";
                    break;
                case "10":
                    numStr = "十";
                    break;
                default:
                    numStr = "";
            }
            return numStr;
        }

    })();

});
