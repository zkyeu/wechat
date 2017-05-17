/**
 * @author:  liliang（liliang05@51talk.com）
 * @update:  2017年 5月 9日 星期二 14时02分57秒 CST
 * @note:    黑鸟小助手后台页面
 */
define("smallHelper",["niceScroll"],function(require,exports,module){
    require("niceScroll");
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

    getType();
    subSelUer();

    //获取所有类型
    function getType(){
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
            getGroup();
        });
    }

    //选择组
    function getGroup(){
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

                getList();
            });
            return false;
        });
    }

    function getList(){
        $('#lesson-jibie li label').on('click', function(){
            $(this).addClass('cut-sel').parent('li').siblings().find('label').removeClass('cut-sel');
            var getElm = $(this).find('input');
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
                    $('#selUser').html(html);
                    $('#selUser').niceScroll({
                        cursorcolor: "#c0c0c0",
                        autohidemode: true,
                        railpadding: { top: 10, right: 5, left: 0, bottom: 10 }
                    });
                    $('.danyuan').show();
                    getUser();
                }else{
                    $('.danyuan').hide();
                }

            });
            return false;
        });
    }

    function getUser(){

        $('#selUser li').on('click', function(){
            $('#subUserData').show();
            if($(this).find('label').hasClass('cut-sels')){
                $(this).find('label').removeClass('cut-sels');
            }else{
                $(this).find('label').addClass('cut-sels');
            }
            return false;
        });
    }

    //提交按钮
    function subSelUer(){
        var btn = $('#subUserData');
        btn.on('click', function(){
            var selUser = $('.cut-sels input');
            if(selUser.length){
                var aaa,userList=[];
                for(var i = 0; i < selUser.length; i++){
                   aaa = selUser[i].dataset.unit_id;
                    userList.push(aaa);
                }
                console.log("选择的用户是："+userList)
            }else{
                alert("请选择用户");
            }
        });
    }
});