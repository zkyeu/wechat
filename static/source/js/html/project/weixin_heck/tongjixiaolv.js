/**
 * 2017年 5月11日 星期四 14时14分59秒 CST
 */
define("tongjixiaolv",["echarts.min","layui"],function(require,exports,module){
    require("echarts.min");
    require("layui");
    var allData ={}
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
    //设置时间
    function getDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth()+1)<10 ? '0'+(dd.getMonth()+1) : dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate() <10 ? '0'+dd.getDate() :dd.getDate();
        return y+"-"+m+"-"+d;
    }

    //设置时间段
    // $('#stime').val(getDateStr(0));
    // $('#etime').val(getDateStr(0));

    //时间按钮点击效果
    var elmSel = $(".by-time span");
    elmSel.on("click",function () {
        $(this).addClass("cut-sel").siblings().removeClass("cut-sel")
        $('#getTimeType').val($(this).attr("data-time"));
    });

    //用户类型渲染
    // getUserType();
    // function getUserType(){
    //     _$.request('get','/OperationLog/getUserGroupInfo',{},function(data){
    //         if(data.status != 10000) return data.message;
    //         var html='', _data = data.message.user_group_info;
    //         allData.operation_info = data.message.operation_info;
    //         for(var i=0; i< _data.length; i++){
    //             var id = _data[i].id;
    //             var name = _data[i].name;
    //             html += '<option value="' + id + '">' + name + '</option>';
    //         }
    //         $('#typeList').append(html);
    //
    //     });
    // }



    //点击查询
    // $('#confirmBtn').on('click',function () {
    //     var s_time = $('#stime').val();
    //     var e_time = $('#etime').val();
    //     //获取用户类型
    //     var typeList = $('#typeList').val();
    //     if(!typeList){
    //         typeList = 0
    //     }
    //
    //
    //     var s = parseInt(s_time.replace(/-/g,''));
    //     var e = parseInt(e_time.replace(/-/g,''));
    //     if(s_time == ''){
    //         return alert("请选择开始日期！");
    //     }else if(e_time == ''){
    //         return alert("请选择结束日期！");
    //     }
    //
    //     // else if(typeList == 0){
    //     //     return alert("请选择类型！");
    //     // }
    //
    //     else if(s>e){
    //         return alert("开始时间不能晚于结束时间！");
    //     }
    //
    //     getData(typeList,s_time,e_time);
    // });


    // function getData(typeList,s_time,e_time) {
    //     //当前选择的时间类型
    //     var timeType = $('.cut-sel').attr('data-time');
    //
    //     //如果时间没有变化
    //
    //     //时间变化
    //     _$.request('post','/OperationLog/getOperationLogByParam',{
    //             start_time:s_time,
    //             end_time:e_time,
    //             user_group:typeList
    //         },
    //         function(data){
    //             if(data.status != 10000) return alert(data.message);
    //             if(data.length == 0){
    //                 $('#chartLable').hide();
    //                 $('.show-detail-user').hide();
    //                 $('.nodata').show();
    //
    //             }else{
    //                 allData.day_data = data.message.day_data;
    //                 allData.week_data = data.message.week_data;
    //                 allData.month_data = data.message.month_data;
    //
    //             for(x in data.message.day_data){
    //                 console.log(x);
    //             }
    //
    //
    //
    //
    //
    //                 //showCharts(data);
    //             }
    //         });
    // }




    // defaultData();
    // function defaultData(){
    //     _$.request('post','/WorkCorrect/dalasTeacherList',{typeList:typeList},function(data){
    //         var html = '';
    //         for(x in data){
    //             html += '<option value="' + x + '">' + data[x] + '</option>';
    //         }
    //         $('#typeList').html(html);
    //         var teacherList = $('#teacherList').val();
    //         _$.request('post','/WorkCorrect/workCorrectStat',{
    //             beginTime:getDateStr(0),
    //             endTime:getDateStr(0),
    //             typeList:typeList,
    //             adminId:teacherList,
    //             timeflag:timeType
    //         },function(data){
    //             // if(data.status != 10000) return alert(data.message);
    //             showCharts(data);
    //         });
    //     });
    // }


//OperationLog/getOperationLogByParam


    // 默认数据
    //defaultData();
    //changeType();
   // teacherOption(typeList);





    //点击查询
    // $('#confirmBtn').on('click',function () {
    //     var typeList = $('#typeList').val();
    //     var timeType = $('.cut-sel').attr('data-time');
    //     var teacherList = $('#teacherList').val();
    //     var s_time = $('#stime').val();
    //     var e_time = $('#etime').val();
    //
    //     var s = parseInt(s_time.replace(/-/g,''));
    //     var e = parseInt(e_time.replace(/-/g,''));
    //     if(s_time == ''){
    //         return alert("请选择开始日期！");
    //     }else if(e_time == ''){
    //         return alert("请选择结束日期！");
    //     }
    //     // else if(teacherList == 0){
    //     //     return alert("请选择老师姓名！");
    //     // }
    //     else if(s>e){
    //         return alert("开始时间不能晚于结束时间！");
    //     }
    //
    //     getData(typeList,timeType,teacherList,s_time,e_time);
    // });

    // function teacherOption(typeList){
    //
    //     _$.request('post','/WorkCorrect/dalasTeacherList',{typeList:typeList},function(data){
    //         var html = '';
    //         // var html = '<option value="0">请选择老师</option>';
    //         for(x in data){
    //             html += '<option value="' + x + '">' + data[x] + '</option>';
    //         }
    //         $('#teacherList').html(html);
    //         // var teacherList = $('#teacherList').val();
    //         // getData(typeList,timeType,teacherList);
    //     });
    // }
    // function getData(typeList,timeType,teacherList,s_time,e_time) {
    //
    //     _$.request('post','/WorkCorrect/workCorrectStat',{
    //         beginTime:s_time,
    //         endTime:e_time,
    //         typeList:typeList,
    //         adminId:teacherList,
    //         timeflag:timeType
    //         },
    //         function(data){
    //             // if(data.status != 10000) return alert(data.message);
    //             if(data.length == 0){
    //                 $('#chartLable').hide();
    //                 $('.show-detail-user').hide();
    //                 $('.nodata').show();
    //
    //             }else{
    //                 showCharts(data);
    //             }
    //         });
    // }

    //类型切换
    // function changeType(){
    //     $('#typeList').change(function(){
    //         var typeList = $('#typeList').val();
    //         _$.request('post','/WorkCorrect/dalasTeacherList',{typeList:typeList},function(data){
    //             // var html = '<option value="0">请选择老师</option>';
    //             var html = '';
    //             for(x in data){
    //                 html += '<option value="' + x + '">' + data[x] + '</option>';
    //             }
    //             $('#teacherList').html(html);
    //         });
    //     });
    // }


    //数据表
    function showCharts(data) {
        //======chart data set=======//
        var dataRquest = {
            xData:[],
            yData:{
                receive_num:[],
                send_num:[],
                web_send_num:[],
                phone_send_num:[],
                sys_send_num:[],
                mid_send_num:[],
                mid_send_num2:[],
                mid_send_num3:[]
            }
        };
        if(data.length != 0){
            var html = '';
            var typeList = $('#typeList').val();
            for(var i = 0; i < data.length; i++){
                html += '<tr><td>';
                html += data[i].label;
                html += '</td><td>';
                html += data[i].correct_num;
                html += '</td><td>';
                html += data[i].label;
                html += '</td><td>';
                html += data[i].correct_num;
                html += '</td><td>';
                html += data[i].group_num;
                html += '</td><td>';
                html += data[i].group_num;
                html += '</td><td>';
                html += data[i].group_num;
                html += '</td><td>';
                html += data[i].group_num;
                html += '</td></tr>';
                //X轴数据
                var lable = data[i].label;
                dataRquest.xData.push(lable);

                //Y轴数据
                var yTemData =[];
                var correct_num = (data[i].correct_num == undefined) ? 0 : data[i].correct_num;
                var group_num = (data[i].group_num == undefined) ? 0 : data[i].group_num;
                dataRquest.yData.receive_num.push(correct_num);
                dataRquest.yData.send_num.push(group_num);
            }
            $('#tongji').html(html);
            $('.show-detail-user').show();
            $('.nodata').hide();
        }else{
            $('.show-detail-user').hide();
            $('.nodata').show();
        }


        //=======BASE DATA======//
        var dataBase ={
            //标题
            text: '黑鸟附属功能使用数据',
            //介绍
            subtext: '数据来自黑鸟团队',
            //x轴显示
            // xAxis:['成人CC','成人SS','青少CC','青少SS','美小CC','美小CST','达拉斯','B2S'],
            xAxis:dataRquest.xData,
            // 图例显示
            legend:['黑鸟入口电话','批量添加好友','群发','文章库文章发送','推荐学员','系统自动提醒','学员个人中心'],
            barData:{
                receive_num:dataRquest.yData.receive_num,
                send_num:dataRquest.yData.send_num
            },
            //图标相关
            normal:{
                colorList:['#ff6565','#ffc900','#37b0ff','#1dcfb1','#96d23a','#bebebe','#9592FF'],
                show: true,//显示
                position: 'top'//bottom top inside

            },
            //数据表位置
            grid:{
                left: '1%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            }
        }
        //====================================CHARTS BEGAIN=======================================//
        // 基于准备好的dom，初始化echarts实例
        var chartElm = document.getElementById('chartLable');
        var xWidth = '100%-20';
        chartElm.setAttribute("style","~cacl(width:"+xWidth+"px);height:500px;margin-left:20px;overflow-x:auto;");
        var myChart = echarts.init(chartElm);

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: dataBase.text,
                subtext: dataBase.subtext
            },
            tooltip: {
                //整体显示
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: function () {
                    return dataBase.legend;
                }()
            },
            grid: {
                left: dataBase.grid.left,
                right: dataBase.grid.right,
                bottom: dataBase.grid.bottom,
                containLabel: dataBase.grid.containLabel
            },
            xAxis: {
                type: 'category',
                data :  function (){
                    return dataBase.xAxis;
                }()
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            series:[
                {
                    name: dataBase.legend[0],
                    type: 'bar',
                    data: dataBase.barData.receive_num,
                    itemStyle: {
                        normal : {
                            barBorderRadius:[10, 10, 0, 0],
                            color: dataBase.normal.colorList[0]
                        }
                    },
                    label: {
                        normal : {
                            show: dataBase.normal.show,
                            position: dataBase.normal.position,
                            textStyle: {
                                fontWeight:'bolder',
                                fontSize : '14',
                                fontFamily : '微软雅黑',
                                fontStyle:'normal'
                            }
                        }
                    }
                },
                {
                    name: dataBase.legend[1],
                    type: 'bar',
                    data: dataBase.barData.send_num,
                    itemStyle: {
                        normal : {
                            barBorderRadius:[10, 10, 0, 0],
                            color: dataBase.normal.colorList[1]
                        }
                    },
                    label: {
                        normal : {
                            show: dataBase.normal.show,
                            position:dataBase.normal.position,
                            textStyle: {
                                fontWeight:'bolder',
                                fontSize : '14',
                                fontFamily : '微软雅黑',
                                fontStyle:'normal'
                            }
                        }
                    }
                }

            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //====================================CHARTS END=======================================//
    }
});



