define(function(require, exports, module) {
    var utility = require("utility");
    // regs = $.formVerify.utility.regs,
    // confirm = utility.confirm,
    // promptDialog = utility.promptDialog,
    // formTempData = {};

    // select
    ;
    (function() {
        var search_school = $("#search_school"),
            agentSearch = $(".agent-search"),
            agentSearchCancel = $(".agent-search-cancel"),
            searchDom = $(".agent-school-list ul"),
            searchStr = searchDom.html(),
            timer = null;

        //先将文本框清空，防止用户回退是文本框里有值。
        search_school.val("");

        search_school.on({
            change: function(e) {

            },
            blur: function() {

            },
            focus: function() {
                agentSearch.addClass("cancel-btn");
            },
            input: function() {
                var self = $(this),
                    val = $.trim(self.val());
                if (val == "") {
                    searchDom.html(searchStr);
                    return;
                }
                clearTimeout(timer);
                timer = setTimeout(function() {
                    $.ajax({
                        type: "GET",
                        url: "/wapagent/ajaxGetSchoolList", //"test.json"
                        data: {
                            school_name: val
                        },
                        dataType: "json",
                        success: function(data) {
                            if (data.status == 1) {
                                var dataData = data.data;
                                searchDom.html("");
                                for (var i = 0, len = dataData.length; i < len; i++) {
                                    var item = dataData[i],
                                        str = '';
                                    str += '<li class="school-list-li">';
                                    str += '    <a href="' + item.url + '"></a>';
                                    str += '    <h6>' + item.school_name + '</h6>';
                                    str += '    <ul class="school-info">';
                                    str += '        <li>';
                                    str += '            <p>班级：' + item.class_total + '</p>';
                                    str += '            <p>未激活数：' + item.not_active_student_total + '</p>';
                                    str += '        </li>';
                                    str += '        <li>';
                                    str += '            <p>总学生数：' + item.student_total + '</p>';
                                    str += '            <p>已付费数：' + item.buy_student_total + '</p>';
                                    str += '        </li>';
                                    str += '    </ul>';
                                    str += '    <span class="r-arr"></span>';
                                    str += '</li>';
                                    searchDom.append(str);
                                }
                            }
                        }
                    });
                }, 300);

            }
        });


        //取消按钮
        agentSearchCancel.on('click', function() {
            agentSearch.removeClass("cancel-btn");
            searchDom.html(searchStr);
            search_school.val("");
        });

    })();



});
