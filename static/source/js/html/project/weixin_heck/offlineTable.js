define("offlineTable",[],function(require,exports,module){

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
        _$.request('post','/AdminMonitor/adminMonitorStat',{beginTime:GetDateStr(0)},function(data){
            console.log(data);
            ajaxData(data);
        });
    }

    //换时间
    function reqData(){
        var getDate = $('.add-btn-float-left a');
        getDate.on('click',function(){
            $(this).addClass('cut-style').siblings('a').removeClass('cut-style');
            _$.request('post','/AdminMonitor/adminMonitorStat',{beginTime:$(this).text()},function(data){
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
            var permanent = data.permanent;
            var temporary = data.temporary;
            var bjcc = data.BJCC.temporary;
            var _bjcc = data.BJCC.permanent;
            var bjis = data.BJIS.temporary;
            var _bjis = data.BJIS.permanent;
            var ct = data.CT.temporary;
            var _ct = data.CT.permanent;


            var text = '总计：临时掉线:'+ temporary + ' 永久掉线:'+ permanent + '</br>BJCC[临时]:' + bjcc + '&nbsp;BJCC[永久]:' + _bjcc + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BJIS[临时]:' + bjis + ' BJIS[永久]:' + _bjis + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CT[临时]:' + ct + ' CT[永久]:' + _ct ;
            for(var i =0; i < data.data.length; i++){
                var user_name = data.data[i].user_name;
                var admin_group = data.data[i].admin_group;
                var wechat_id = data.data[i].wechat_id;
                var device_id = data.data[i].device_id;
                var add_time = data.data[i].add_time;
                var status = data.data[i].status =='2' ? '临时':'永久';

                html += '<tr><td>' + user_name;
                html += '</td><td>' + admin_group;
                html += '</td><td>' + wechat_id;
                html += '</td><td>' + device_id;
                html += '</td><td>' + add_time;
                html += '</td><td>' + status;
                html += '</td></tr>';
            }
            $('.status-data').html(text);
            $('.sel-dom').html(html);
        }
    }

});