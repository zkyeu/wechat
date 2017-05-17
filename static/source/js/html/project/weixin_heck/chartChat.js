/**
 * Created by liliang on 2017/02/09.
 */
define("chartChat",["echarts.min","layui"],function(require,exports,module){
    require("echarts.min");
    require("layui");

    //业务类型列表渲染
    $.getJSON('/WechatStats/userGroupList',function(data){
        var html ='';
        for(val in data){
            html += '<option value="'+ val +'">'+ data[val] +'</option>'
        }
        $('#typeList').append(html);
    })

    //按钮点击效果
    var elmSel = $(".by-time span");
    elmSel.on("click",function () {
        $(this).addClass("cut-sel").siblings().removeClass("cut-sel")
    });

    //默认显示数据
    //设置时间
    // function GetDateStr(AddDayCount) {
    //     var dd = new Date();
    //     dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    //     var y = dd.getFullYear();
    //     var m = dd.getMonth()+1;//获取当前月份的日期
    //     var d = dd.getDate();
    //     return y+"-"+m+"-"+d;
    // }

    $('#stime').val();
    $('#etime').val();
    // console.log($('#stime').val(GetDateStr(-8)),$('#etime').val(GetDateStr(-1)));
     getData('1','1',$('#stime').val(),$('#etime').val());
    //
    //点击查询
    $('#confirmBtn').on('click',function () {
        var sTime = $('#stime').val();
        var eTime = $('#etime').val();
        var typeList = $('#typeList').val();
        var timeType = $('.cut-sel').attr('data-time');
        var st = new Date(sTime);
        var et = new Date(eTime);
        if(st >et)alert("截止时间不能早于开始时间！");
        // var s = sTime.replace(/-/g,'');
        // var t = eTime.replace(/-/g,'');

        if(sTime == '' || sTime == '') return alert('请选择时间！');
        //if(s > t) return alert("截止时间不能早于开始时间！");
        if(typeList =='') return alert('请选择类型');

        getData(typeList,timeType,sTime,eTime);

    });

    function getData(typeList,timeType,sTime,eTime) {
        $.ajax({
            url:'/WechatStats/statistics',
            data:{
                userGroup:typeList,
                type:timeType,
                beginTime:sTime,
                endTime:eTime
            },
            async: false,
            dataType:'json',
            type:'POST',
            success:function (data) {
                if(data.length==0) {
                    $('#chartLable').hide();
                    $('.table-list h5').show();
                    $('.show-detail').hide();
                    return false;
                }else{
                    $('.table-list h5').hide();
                    $('.show-detail').show();
                }
                showCharts(data);
            }
        });
    }
    
    function showCharts(data) {
        // console.log(data.length);

        //======chart data set=======//
        var dataRquest = {
            xData:[],
            yData:{
                receive_num:[],
                send_num:[],
                web_send_num:[],
                phone_send_num:[],
                sys_send_num:[],
                mid_send_num:[]
            }
        };
        var html = '';
        for(var i=0; i< data.length;i++){
            //X轴数据
            var lable = data[i].label;
            dataRquest.xData.push(lable);

            //Y轴数据
            var yTemData =[];
            var receive_num = (data[i].receive_num == undefined) ? 0 : data[i].receive_num;
            var send_num = (data[i].send_num == undefined) ? 0 : data[i].send_num;
            var web_send_num = (data[i].web_send_num == undefined) ? 0 : data[i].web_send_num;
            var phone_send_num = (data[i].phone_send_num == undefined) ? 0 : data[i].phone_send_num;
            var sys_send_num = (data[i].sys_send_num == undefined) ? 0 : data[i].sys_send_num;
            var mid_send_num = (data[i].mid_send_num == undefined) ? 0 : data[i].mid_send_num;

            html += '<tr>';
            html += '<td>' + lable + '</td>';
            html += '<td>' + receive_num + '</td>';
            html += '<td>' + send_num + '</td>';
            html += '<td>' + web_send_num + '</td>';
            html += '<td>' + mid_send_num + '</td>';
            html += '<td>' + phone_send_num + '</td>';
            html += '<td>' + sys_send_num + '</td>';
            html += '</tr>';

            dataRquest.yData.receive_num.push(receive_num);
            dataRquest.yData.send_num.push(send_num);
            dataRquest.yData.web_send_num.push(web_send_num);
            dataRquest.yData.mid_send_num.push(mid_send_num);
            dataRquest.yData.phone_send_num.push(phone_send_num);
            dataRquest.yData.sys_send_num.push(sys_send_num);

        }
        // console.log(dataRquest.yData);
        $('#tableList').html(html);
        //=======BASE DATA======//
        var dataBase ={
            //标题
            text: '数据报表',
            //介绍
            subtext: '数据来自黑鸟团队',
            //x轴显示
            // xAxis:['成人CC','成人SS','青少CC','青少SS','美小CC','美小CST','达拉斯','B2S'],
            xAxis:dataRquest.xData,
            // 图例显示
            legend:['收到消息数','发送消息汇总','通过网页发送数','中转发送数','手机发送数','自动发送数'],
            barData:{
                receive_num:dataRquest.yData.receive_num,
                send_num:dataRquest.yData.send_num,
                web_send_num:dataRquest.yData.web_send_num,
                mid_send_num:dataRquest.yData.mid_send_num,
                phone_send_num:dataRquest.yData.phone_send_num,
                sys_send_num:dataRquest.yData.sys_send_num

            },
            //图标相关
            normal:{
                colorList:['#ff6565','#ffc800','#37b0ff','#1ecfb0','#96d23a','#bebebe'],
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
                            color: dataBase.normal.colorList[0],
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
                },
                {
                    name: dataBase.legend[2],
                    type: 'bar',
                    data: dataBase.barData.web_send_num,
                    itemStyle: {
                        normal : {
                            barBorderRadius:[10, 10, 0, 0],
                            color: dataBase.normal.colorList[2]
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
                    name: dataBase.legend[3],
                    type: 'bar',
                    data: dataBase.barData.mid_send_num,
                    itemStyle: {
                        normal : {
                            barBorderRadius:[10, 10, 0, 0],
                            color: dataBase.normal.colorList[3]
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
                    name: dataBase.legend[4],
                    type: 'bar',
                    data: dataBase.barData.phone_send_num,
                    itemStyle: {
                        normal : {
                            barBorderRadius:[10, 10, 0, 0],
                            color: dataBase.normal.colorList[4]
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
                    name: dataBase.legend[5],
                    type: 'bar',
                    data: dataBase.barData.sys_send_num,
                    itemStyle: {
                        normal : {
                            barBorderRadius:[10, 10, 0, 0],
                            color: dataBase.normal.colorList[5]
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
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //====================================CHARTS END=======================================//
    }

});
