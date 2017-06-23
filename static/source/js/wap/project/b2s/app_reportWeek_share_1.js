define("app_reportWeek_share_1", ["fastclick", "echarts.min.radar"], function(require, exports, module) {
    require("echarts.min.radar");
    require("fastclick");
    FastClick.attach(document.body);

    (function() {
        window.chartInit = function() {
            // alert($("#main").width())
            // alert($("#main").height())
            // setTimeout(function() {

            // }, 1000)
            // console.log(echarts);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            console.log(myChart);
            var js_percentage_1 = $(".js_percentage_1").data('percentage'),
                js_percentage_2 = $(".js_percentage_2").data('percentage'),
                js_percentage_3 = $(".js_percentage_3").data('percentage');

            // 指定图表的配置项和数据
            option = {
                /*title: {
                    text: '多雷达图'
                },*/
                tooltip: {
                    show: '',
                    // showContent:'false',
                    // trigger: 'axis',
                    // triggerOn: 'click',
                    // alwaysShowContent: 'false',
                    // backgroundColor: 'rgba(255,0,0,0.7)',
                    // axisPointer:{
                    //     type:'cross'
                    // }
                },
                legend: {
                    show: '',
                    x: 'center',
                    data: ['周报', '某主食手机', '某水果手机', '降水量', '蒸发量']
                },
                radar: [{
                    indicator: [
                        { text: '', max: 100 },
                        // { text: '内容', max: 100 },
                        { text: '', max: 100 },
                        { text: '', max: 100 }
                    ],
                    center: ['50%', '65%'],
                    radius: '125%',
                    name: {
                        // formatter: '【{value}】',
                        textStyle: {
                            color: '#333333'
                        }
                    },
                    nameGap: 10,
                    // shape:'circle',
                    axisLine: {
                        lineStyle: {
                            color: '#dadada',
                            type: 'dashed',
                        }
                    },
                    // axisTick:{
                    //     show:'true'
                    // },
                    splitArea: {
                        show: 'true',
                        areaStyle: {
                            color: ['rgba(235,235,235,0.3)', 'rgba(235,235,235,0.3)'],
                            opacity: 1,
                        }
                    },
                    splitLine: {
                        show: 'false',
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0,
                        },
                    }
                }],
                series: [{
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default',
                                // borderColor:'#000',
                            }
                        }
                    },
                    data: [{
                        value: [js_percentage_1, js_percentage_2, js_percentage_3],
                        name: '周报'
                    }]
                }],
                color: ['#fd7d7d', '#c1bfbf', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                // backgroundColor:'rgba(255, 0, 255, 0.5)',
            };


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        //点击更多
        $(".js_more").on("click","",function(){
            $(this).hide();
            $(".js_clickMore").show();
        })

        //分享
        var js_share_btn = $(".js_share_btn");
        $(".js_share_btn").on("click","li",function(){
            var _this = $(this),
                _href = _this.data('href'),
                h = js_share_btn.height(),
                hWebview = window.screen.height;
            // console.log(_href);
            // console.log(h);
            // alert(hWebview);
            window.location.href = _href + "&proportion="+(h/hWebview);
        })

    })()
});
