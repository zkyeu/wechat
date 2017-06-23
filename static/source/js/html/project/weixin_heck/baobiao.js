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
    // function setDateStr(AddDayCount) {
    //     var dd = new Date();
    //     dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    //     var y = dd.getFullYear();
    //     var m = dd.getMonth() + 1// > 9 ? dd.getMonth() + 1 : '0'+ (dd.getMonth() + 1);
    //     var d = dd.getDate()// > 9 ? dd.getDate() :'0'+ dd.getDate();
    //     // return y+"-"+m+"-"+d;
    //     return{
    //         year: y,
    //         month: m,
    //         day: d
    //     }
    // }
    //获取周
    // function theWeek() {
    //     var totalDays = 0;
    //     now = new Date();
    //     years = now.getYear()
    //     if (years < 1000)
    //         years += 1900
    //     var days = new Array(12);
    //     days[0] = 31;
    //     days[2] = 31;
    //     days[3] = 30;
    //     days[4] = 31;
    //     days[5] = 30;
    //     days[6] = 31;
    //     days[7] = 31;
    //     days[8] = 30;
    //     days[9] = 31;
    //     days[10] = 30;
    //     days[11] = 31;
    //
    //     //判断是否为闰年，针对2月的天数进行计算
    //     if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
    //         days[1] = 29
    //     } else {
    //         days[1] = 28
    //     }
    //
    //     if (now.getMonth() == 0) {
    //         totalDays = totalDays + now.getDate();
    //     } else {
    //         var curMonth = now.getMonth();
    //         for (var count = 1; count <= curMonth; count++) {
    //             totalDays = totalDays + days[count - 1];
    //         }
    //         totalDays = totalDays + now.getDate();
    //     }
    //     //得到第几周
    //     var week = Math.round(totalDays / 7);
    //     return week;
    // }
    //默认
    // defaultType();
    // function defaultType() {
    //     $("#timetype").val("1");
    //     $("#setTime").val(setDateStr(0).day+'日');
    // }
    var timeSelType = $(".cut-sel").attr("data-time");//类型
    var timeContext = parseInt($("#setTime").val());//当前内容
    //时间类型切换
    $('.by-time-btn').on('click', function () {
        $(this).addClass('cut-sel').siblings().removeClass('cut-sel');
        timeSelType = $(".cut-sel").attr("data-time");
        switch (timeSelType){
            case '1':
                $('#setTime').attr("class","time-day");
                break;
            case '2':
                $('#setTime').attr("class","time-week");
                break;
            case '3':
                $('#setTime').attr("class","time-month");
                break;
            default:
        }
        // timeContext = parseInt($("#setTime").val());
        //
        // console.log(timeSelType,timeContext);
        // $(".cut-sel").attr("href",setUrl(timeSelType,timeContext));
    });

    // function setUrl(timeSelType,timeContext) {
    //     var  baseUrl = '/AuthGroupStats/index?timeType=';
    //     // var  baseUrl = 'baobiao.html?timeType=';
    //     return baseUrl + timeSelType +'&time=' + timeContext;
    // }

    //
    // $('.pre-time').on('click', function () {
    //     console.log(timeSelType,timeContext);
    //     timeContext--;
    //     switch (timeSelType){
    //         case '1':
    //
    //             var val = parseInt($("#unixTime").val())
    //             console.log(val-86400)
    //
    //             // //昨天
    //             // var val = $("#hideTime").val();
    //             // var _times =  Math.floor(new Date().getTime()/1000) - 1*24*60*60;
    //             // var dates = new Date(_times).getDate();
    //             // console.log(_times);
    //             // // if(timeContext < 1){
    //             // //     timeContext = 31;
    //             // // }
    //             // //$("#setTime").val(timeContext+"日");
    //             // //$("#setTime").val(dates+"日");
    //             $("#hideTime").val(val-86400);
    //             break;
    //         case '2':
    //             if(timeContext < 1){
    //                 timeContext = 52;
    //             }
    //             $("#setTime").val(timeContext  +"周");
    //             break;
    //         case '3':
    //             if(timeContext < 1){
    //                 timeContext = 12;
    //             }
    //             $("#setTime").val(timeContext+"月");
    //             break;
    //         default:
    //     }
    // });

        // $('.next-time').on('click', function () {
        //     console.log(timeSelType,timeContext);
        //     ++timeContext;
        //     switch (timeSelType){
        //         case '1':
        //             var val = parseInt($("#unixTime").val());
        //             console.log(val+86400)
        //             $("#hideTime").val(val+86400);
        //             break;
        //         case '2':
        //             if(timeContext > 52){
        //                 timeContext = 1;
        //             }
        //             $("#setTime").val(timeContext  +"周");
        //             break;
        //         case '3':
        //             if(timeContext > 12){
        //                 timeContext = 1;
        //             }
        //             $("#setTime").val(timeContext+"月");
        //             break;
        //         default:
        //     }
        //
        // });


});