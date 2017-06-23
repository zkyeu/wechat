define(function(require, exports, module) {
    var utility = require("utility"),
        promptDialog = utility.promptDialog;;
    (function() {
        $('html').css("height", "auto");
        var _w = $(window),
            _winHei = _w.height(),
            _docHei = $(document).height(),
            cur_page = "1",
            page_size = "20";
        _w.on("load scroll", function() {
            var scrollTop = $(this).scrollTop();
            console.log("滚动高度" + scrollTop);
            console.log("屏幕高度" + _winHei);
            console.log("文档高度" + _docHei);
            console.log("当前页数" + cur_page);
            if (scrollTop >= _docHei - _winHei) {
                $.ajax({
                    type: "GET",
                    url: "/wap/ajaxGetUserCreditRecord", //"test.json"
                    data: {
                        "cur_page": cur_page,
                        "page_size": page_size
                    },
                    dataType: "json",
                    success: function(data) {
                        var status = data.status,
                            info = data.info,
                            list = data.data.list,
                            page = data.data.page;
                        if (status == 1) {
                            cur_page = page.cur_page / 1 + 1;
                            for (var i = 0, len = list.length; i < len; i++) {
                                var item = list[i],
                                    str = "";
                                str += '<li>';
                                str += '    <dl class="cfix">';
                                str += '        <dt>+' + item.credit + '</dt>';
                                str += '        <dd>' + item.type + '</dd>';
                                str += '        <dd><span>' + item.format_date + '</span></dd>';
                                str += '    </dl>';
                                str += '</li>';
                                $(".tea-integral-item").append(str);
                            }
                        } else if (status == -1) {
                            cur_page = page.cur_page;
                            promptDialog({
                                content: info
                            });
                        } else if (status == -2) {
                            cur_page = page.cur_page;
                            _w.off("load scroll");
                            promptDialog({
                                content: info
                            });
                        }
                        //渲染完数据后重新获取document的高度
                        _docHei = $(document).height();
                    }
                });

            }

        })


    })();



});
