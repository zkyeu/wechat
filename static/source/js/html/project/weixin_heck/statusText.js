/**
 * Created by liliang on 2017年 6月13日 星期二 13时56分20秒 CST
 */
define("statusText",[],function(require,exports,module){
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

    //点击修改
    var status = $('.status');
    status.on('click', function () {
       var statusId = $(this).data("status");
       console.log('当前状态ID：'+statusId);
        _$.request('post','/LessonRemind/ajaxGetLessonRemind',{id:statusId},function (data) {
            if(data.status != 10000) return alert(data.message);
            var selDom = $('.flex-layer');
            selDom.find('dt').html(data.message.title);
            selDom.find('textarea').val(data.message.content);
            selDom.attr('data-id',statusId);
            selDom.show();
        });
    });

    //隐藏修改
    $(".greey").on('click', function () {
        var selDom = $('.flex-layer');
        selDom.find('textarea').val('');
        selDom.hide();
    });

    //确认修改


    $('.default').on('click', function () {
        var selDom = $('.flex-layer');
        var newContent = $('.status-con textarea').val();
        var id = selDom.data('id');
        console.log(id,newContent);
        _$.request('post','/LessonRemind/ajaxUpdateLessonRemind',{id:id,content:newContent},function (data) {
            if(data.status != 10000) return alert(data.message);
            selDom.find('textarea').val('');
            selDom.attr('data-id','');
            selDom.hide();
            location.reload();
            alert(data.message);
        });
    });

});