/**
 * Created by liliang on 2017/01/04.
 */
// define("defaultAm",["weixinUtil","echarts.min","countup"],function(require,exports,module){
define("defaultAm",["weixinUtil","echarts.min"],function(require,exports,module){
    require("echarts.min");
    // require("countup");
    var checkBrowser = require("weixinUtil");
    ;(function () {
        var height = window.innerHeight*0.8;
        $('.big-bg').attr("style","height:"+height+"px");
    })();

    if(checkBrowser.checkBrowser()!='Chrome'){
        $(".enter a").attr({class:"disBtn",disabled:"disabled"});
        alert("当前浏览器不支持微信聊天，请使用谷歌浏览器操作！");
    }else{
        var btn = $("#enter");
        btn.attr({class:'ablBtn'});
        //方式1
        $.ajax({
            url:'/AdminContact/checkIsBind',
            type:'post',
            dataType:'json',
            success:function(r){
                if(r.status != 10001) {
                    // btn.removeAttr("onclick");
                    btn.attr({href:'/AdminContact/wxMain',target:'_blank'});
                }else{
                    btn.attr({'onclick':'alert("请联系你的上级开通黑鸟！")'});
                    // window.open('/AdminContact/wxMain');
                }
            }
        });

        $.ajax({
            url:'/AdminContact/trustUserList',
            type:'post',
            dataType:'json',
            success:function(r){
               var html= '';
               var data = r.message;
               if(data){
                   $('.trust-user-list').show();
                   for(var i = 0; i < data.length; i++){
                       var admin_id,admin_name;
                       for(x in data[i]){
                           admin_id = data[i]["admin_id"];
                           admin_name = data[i]["admin_name"];
                       }
                       html += '<li  data-admin-id="'+ admin_id +'">' + admin_name +'</li>';
                   }
                   $('#trustList').html(html);
                   checkUri();
               }
            }
        });
        //托管
        function checkUri(){
            var elm = $('#trustList li');
            elm.on("click",function(e){
                var adminId = e.target.dataset.adminId;
                if(!adminId) return ;
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/AdminContact/checkTruct',
                    data:{
                        admin_id:adminId
                    },
                    success: function (data) {
                        if (data.status == 10000) {
                            var newWindow = data.message.url;
                            window.open(newWindow);
                        } else if (data.status > 10000) {
                            var messageshow = data.message.message;
                            alert(messageshow);
                        }else {
                            alert("请联系黑鸟技术支持！");
                        }
                    },
                    error:function () {
                        alert("系统罢工！");
                    }

                });
                $(this).unbind("click");
            });
        }

        //方式2
        // btn.on('click',function(){
        //     $.ajax({
        //         url:'/AdminContact/checkIsBind',
        //         type:'post',
        //         dataType:'json',
        //         success:function(r){
        //             if(r.status == 10001) {
        //                 return alert(r.message);
        //             }else{
        //                 window.open('/AdminContact/wxMain');
        //             }
        //         }
        //     });
        // });


    }

    // 基于准备好的dom，初始化echarts实例
    var chartElm = document.getElementById('chartLable');
    chartElm.setAttribute("style","~cacl(width:100%-20px);height:50vh;");
    var myChart = echarts.init(chartElm);

    // 指定图表的配置项和数据
    var option = {
        // backgroundColor: '#fff',
        title: {
            // text: dataBase.text,
            // subtext: dataBase.subtext
        },
        tooltip: {
            //整体显示
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            // data: function () {
            //     return dataBase.legend;
            // }()
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
            }(),
            splitLine:{
                show: false
            },
            lineStyle: {
                // 使用深浅的间隔色
                color: ['#c00', '#c00']
            },
            axisLine:{
                lineStyle:{
                    // x轴颜色宽度
                    color:'#707070',
                    width:2
                }
            },
            axisLabel: {
                show: true,
                //文字颜色大小
                textStyle: {
                    color: '#b0b0b0',
                    fontSize:'12',
                    nameGap:30
                }
            },
            axisTick:{
                show:true,//显示刻度
                alignWithLabel:true
            },
            nameGap:20
        },
        yAxis: {
            type: 'value',
            name:function () {
                var yesterdsay = new Date(new Date().getTime() - 86400000)
                var time = new Date(yesterdsay);
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                return y+'-'+m+'-'+d
            }(),
            nameLocation:'end',//'start','middle'
            nameTextStyle:{
                fontSize:'12',
                color:'#b0b0b0'
            },
            splitLine:{
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色 Y轴网格
                    color: '#707070'
                }
            },
            boundaryGap: [0, 0.01],
            axisLine:{
                lineStyle:{
                    color:'#707070',
                    width:2
                },
                textStyle: {
                    color: '#707070',
                    fontsize:0,
                    show:false
                }
            },
            //隐藏刻度
            axisTick:{
                show:false
            },
            //刻度标题隐藏
            axisLabel:{
                show:false
            },
            nameGap:20
        },
        series:[
            {
                name: dataBase.legend[0],
                type: 'bar',
                barWidth:20,//固定柱子宽度
                data: dataBase.barData.a,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 4
                    },
                    normal : {
                        barBorderRadius:[4, 4, 4, 4],
                        // color: dataBase.normal.colorList[3]
                        color: function (params){
                            var colorList = ['#18aeff','#45fff2','#ff4b6d'];
                            return colorList[params.dataIndex];
                        }
                    }
                },
                label: {
                    //柱子上字体控制
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
    // var persent = 0;
    // $.get('/WechatStats/loginStat').done(function (data) {
    //     var getData = JSON.parse(data);
    //     var hand= parseInt(getData.hand_send);
    //     var auto = parseInt(getData.auto_send);
    //     persent = (auto/hand*100).toFixed(2);
    //     var options = {
    //         useEasing : true,
    //         useGrouping : true,
    //         separator : ',',
    //         decimal : '.',
    //         prefix : '',
    //         suffix : ''
    //     };
    //     var demo = new CountUp("myTargetElement", 1, persent, 2, 4, options);
    //     $(function(){
    //         demo.start();
    //     })
    // });
});