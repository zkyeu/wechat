define(function(require, exports, module) {

    ;
    (function() {
        var grade = $("#grade").val(),
            school_id = $("#school_id").val(),
            category = $("body").data("role"),
            searchStr=$(".search-result").html(),
            timer = null;

        /*//页面底部的提交表单
        $(".search-fixed-but").on('click', function() {
            var saveInput = $(".search-fixed-text").val();
            saveInput = $.trim(saveInput);
            if (saveInput == "") return false;
        })*/

        //页面顶部的搜索框
        $(".search-title input").on("input", function() {
            var self = $(this),
                val = $.trim(self.val()),
                urlStr = null;
            clearTimeout(timer);
            if (val == "") {
                $(".search-result").html(searchStr);
                return;
            }
            timer = setTimeout(function() {
                if (category == "agent") {
                    urlStr = "/wapagent/ajaxGetMaterialList";
                } else {
                    urlStr = "/wap/ajaxGetMaterialList";
                }

                $.ajax({
                    type: "GET",
                    url: urlStr, //"test.json"
                    data: {
                        grade: grade,
                        teaching_materials: val
                    },
                    dataType: "json",
                    success: function(data) {
                        if (data.status == 1) {
                            var dataData = data.data;
                            $(".search-result").html("");
                            for (var i = 0, len = dataData.length; i < len; i++) {
                                var item = dataData[i],
                                    str = '',
                                    url = '',
                                    url_wap = '',
                                    url_school_id = '',
                                    relate_id = item.relate_id;

                                if(category == "agent"){
                                    url_wap = "/wapagent";
                                    url_school_id = "&school_id="+school_id;
                                }else{
                                    url_wap = "/wap";
                                }

                                if(relate_id > 0){
                                    url = url_wap+"/relateMaterials";
                                }else{
                                    url = url_wap+"/saveMaterials";
                                }
                                str += '<li>';
                                str += '    <a href="'+url+'?grade=' + grade + '&teaching_materials=' + item.name + '&teaching_materials_id=' + item.id + url_school_id +'"></a>';
                                str += '    <div class="search-result-pic"></div>';
                                str += '    <dl>';
                                str += '        <dt>' + item.name + '</dt>';
                                str += '        <dd></dd>';
                                str += '    </dl>';
                                str += '</li>';
                                $(".search-result").append(str);
                            }
                        }
                    }
                });
            }, 300);

        });





        /*var topScroll = null;

        $(".textbook-version-select,.textbook-version-change").on("click", "a", function() {

            $(".search").removeClass("translateHide");
             // topScroll = fun.getScrollTop();
        });

        $(".search-back").on("click", "", function() {
            // fun.setScrollTop(topScroll);
            fun.back();
        });*/

        /*var fun = {
            //返回操作
            back: function() {
                $(".search").addClass("translateHide");
            },
            //获取当前滚动条距离顶部的距离。
            getScrollTop: function() {
                return $(window).scrollTop();
            },
            //返回时恢复此距离。暂停。
            setScrollTop: function(t) {
                $(window).scrollTop(t);
                console.log(":::" + t);
            }
        };*/

    })();



});
