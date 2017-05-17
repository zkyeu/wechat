/**
 * 默认逻辑处理
 * @author:  liliang（liliang05@51talk.com）
 * @update:  2017年 3月 8日 星期三 15时28分50秒 CST
 * @note:    黑鸟项目后台权限管理
 */
define("baobiao",["layui"],function(require,exports,module){
    require("layui");
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        var start = {
            min: laydate.now()
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        };

        var end = {
            min: laydate.now()
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };
    });

        $('#stime').val(start_time);
        $('#etime').val(end_time);
        $('body').on('click','#countBtn',function () {
            var uri = location.hostname;
            var ul = url_info;
            var st = $('#stime').val();
            var et = $('#etime').val();

            var s =new Date(st);
            var e =new Date(et);
            console.log(s,e);
            if(s > e){
                return alert('开始时间不能晚于结束时间！');
            }
            window.location.href ='http://'+ uri + ul + '&start_time='+ st + '&end_time=' + et;
        });


});