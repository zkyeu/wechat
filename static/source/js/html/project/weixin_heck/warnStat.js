define("warnStat",[],function(require,exports,module){

    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+"-"+m+"-"+d;
    }
    //封装ajax
    var _$ ={
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

    setTime();
    defaultData();
    reqData();

    //设置时间
    function setTime(){
        var timeList = '';
        for(var i = -6; i <= 0; i++){
            if(i==0){
                timeList += '<a href="javascript:;" class="cut-style">'+ GetDateStr(i) +'</a>';
            }else{
                timeList += '<a href="javascript:;">'+ GetDateStr(i) +'</a>';
            }
        }
        $('.add-btn-float-left').html(timeList);
    }

    //默认时间
    function defaultData(){
        _$.request('post','/WechatStats/WarnStat',{beginTime:GetDateStr(0)},function(data){
            ajaxData(data);
        });
    }

    //换时间
    function reqData(){
        var getDate = $('.add-btn-float-left a');
        getDate.on('click',function(){
            $(this).addClass('cut-style').siblings('a').removeClass('cut-style');
            _$.request('post','/WechatStats/WarnStat',{beginTime:$(this).text()},function(data){
                ajaxData(data);
            });
        });

    }

    function ajaxData(data){
        var html = '';
        if(data.data.length == 0){
            $('.table-box h5').show();
            $('.table-detail').hide();
        }else{
            $('.table-box h5').hide();
            $('.table-detail').show();
            var total = data.total;
            var text = '总计:'+ total;
            for(var i = 0; i < data.data.length; i++){
                var user_name = data.data[i].user_name;
                var terminal_id = data.data[i].terminal_id;
                var wechat_id = data.data[i].wechat_id;
                var send_type = data.data[i].send_type == 2 ? '用户' : '系统';
                var content = data.data[i].content;
                var send_time = data.data[i].send_time;
                if(data.data[i].user_id){
                    var user_id = '['+ data.data[i].user_id +']';
                }else{
                    var user_id = '';
                }
                html += '<tr><td>' + user_name;
                html += '</td><td>' + terminal_id;
                html += '</td><td>' + wechat_id + user_id;
                // html += '</td><td>' + send_type;
                html += '</td><td>' + content;
                html += '</td><td>' + send_time;
                html += '</td></tr>';
            }
            $('.status-data').html(text);
            $('.sel-dom').html(html);
        }
    }

});