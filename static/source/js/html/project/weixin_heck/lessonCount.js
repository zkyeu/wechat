/**
 * @author:  liliang（liliang05@51talk.com）
 * @update:  2017年 05月02日 星期六 17时25分59秒 CST
 * @note:    黑鸟项目后台课程教材对应链接后台报表
 */
define("lessonCount",[],function(require,exports,module){
    //封装ajax
    var  _$ ={
        request: function (type, url, data, success, error) {
            $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: "JSON",
                // cache: false,
                success: function (data) {
                    success(data);
                },
                error: error
            });
        }
    }


    getLesson();

    //获取所有教材版本
    function getLesson(){
        _$.request("get","/CourseTextbook/getAllTextbook",{},function (data){
            if(data.status !==10000) return alert(data.message);
            var itemList = data.message;
            var html = '';
            for(var i = 0; i < itemList.length; i++){
                var book_type = itemList[i].book_type;
                var version = itemList[i].version;
                var title = itemList[i].title;
                html += '<li>';
                html += '<label><input type="radio" name="banben" data-version="'+ version +'" value="'+ book_type +'"><span>'+ title +'</span>';
                html += '</label></li>';
            }
            $('#lesson-banben').html(html);
            getBanben();
        });
    }

    //获取级别
    function getBanben(){
        $('#lesson-banben li label').on('click', function(e){
            $(this).addClass('cut-sel').parent('li').siblings().find('label').removeClass('cut-sel');
            var getElm = $(this).find('input');
            var book_type = getElm.val();
            var version = getElm.attr('data-version');

            _$.request("post","/CourseTextbook/getAllLevelByBookType",{
                book_type:book_type,
                version:version
                },function (data){
                if(data.status !==10000) return alert(data.message);
                var itemList = data.message;
                if(itemList.length > 0){
                    var html = '';
                    for(var i = 0; i < itemList.length; i++){
                        var level = itemList[i].level;
                        var title = itemList[i].title;
                        html += '<li><label>';
                        html += '<input type="radio" name="jibie" ';
                        html += 'data-book_type="'+ book_type +'"  data-version="'+ version +'" data-level="'+ level +'"';
                        html += ' value="'+ level +'"><span>'+ title +'</span>';
                        html += '</label></li>';
                    }
                    $('#lesson-jibie').html(html);
                    $('.jibie').show();
                }else{
                    $('.jibie').hide();
                }

                getDanyuan();
            });
            return false;
        });
    }

    
    function getDanyuan(){
        $('#lesson-jibie li label').on('click', function(){
            $(this).addClass('cut-sel').parent('li').siblings().find('label').removeClass('cut-sel');            var getElm = $(this).find('input');
            var book_type = getElm.attr('data-book_type');
            var version = getElm.attr('data-version');
            var level = getElm.attr('data-level');
            _$.request("post","/CourseTextbook/getAllUnitByLevel",{
                book_type:book_type,
                version:version,
                level:level
                },function (data){
                if(data.status !==10000)  return alert(data.message);
                var itemList = data.message;
                if(itemList.length > 0){
                    var html = '';
                    for(var i = 0; i < itemList.length; i++){
                        var unit_id = itemList[i].unit_id;
                        var unit_name = itemList[i].unit_name;
                        html += '<li>';
                        html += '<label><input type="radio" name="danyuan"';
                        html += 'data-book_type="'+ book_type +'"  data-version="'+ version +'" data-level="'+ level +'" data-unit_id="'+ unit_id +'"';
                        html += ' value="'+ level +'"><span>'+ unit_name +'</span>';
                        html += '</label></li>';
                    }
                    $('#lesson-danyuan').html(html);
                    $('.danyuan').show();
                    getTable();
                }else{
                    $('.danyuan').hide();
                }

            });
            return false;
        });
    }
    
    
    function getTable(){
        $('#lesson-danyuan li').on('click', function(){
            $(this).find('label').addClass('cut-sel').parent('li').siblings().find('label').removeClass('cut-sel');
            var getElm = $(this).find('input');
            var book_type = getElm.attr('data-book_type');
            var version = getElm.attr('data-version');
            var level = getElm.attr('data-level');
            var unit_id = getElm.attr('data-unit_id');

            _$.request("post","/CourseTextbook/getCourseList",{
                book_type:book_type,
                version:version,
                level:level,
                unit_id:unit_id
            },function (data){
                if(data.status !==10000) return alert(data.message);
                var itemList = data.message;
                if(itemList.length > 0){
                    var html = '';
                    for(var i = 0; i < itemList.length; i++){
                        var id = itemList[i].id;
                        var course_name = itemList[i].course_name;
                        var file_name = itemList[i].file_name;
                        var file_date = itemList[i].file_date;
                        var file_size = itemList[i].file_size;
                        var oss_link = itemList[i].oss_link;
                        var title = '<a href="'+ oss_link +'" target="_blank">链接</a>';
                        if(!oss_link){
                            title='暂无链接';
                        }
                        html += '<tr><td>';
                        html += course_name;
                        html += '</td><td>';
                        html += file_name;
                        html += '</td><td>';
                        html += file_date;
                        html += '</td><td>';
                        html += file_size;
                        html += '</td><td>';
                        html += title;
                        html += '</td></tr>';
                    }
                    $('#lesson-table').html(html);
                    $('.table').show();
                }else{
                    $('.table').hide();
                }

            });
            return false;
        });
    }
});