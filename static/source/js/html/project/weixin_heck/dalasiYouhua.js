/**
 * Created by liliang on 2017/03/25.
 */
define("dalasiYouhua",[],function(require,exports,module){
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


    function getQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    getData();


    function getData(){
        var type = getQueryString('type'),
            time = getQueryString('time');
        var beginTime = '';
        var endTime = '';
        if(time.indexOf('~') > -1){
            beginTime = time.split('~')[0];
            endTime = time.split('~')[1];
        }else{
            beginTime = time;
            endTime = time
        }
        console.log(beginTime,endTime);
        _$.request("get","/WorkCorrect/workCorrectStatFromCount",{
            beginTime:beginTime,
            endTime:endTime,
            typeList:type
        },function(data){
            var html = '';
            for(var i = 0; i < data.length; i++){
                var name = data[i].name;
                var zuoye = data[i].correct_num;
                var group = data[i].group_num;
                html +='<tr>';
                html += '<td>'+ time + '</td>';
                html += '<td>'+ name + '</td>';
                html += '<td>'+ zuoye + '</td>';
                html += '<td>'+ group + '</td>';
                html += '</tr>';
            }

            $('#dalasiYouhua').html(html);
        })
    }
});



