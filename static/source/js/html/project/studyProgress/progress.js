define("progress",["highcharts"],function(require,exports,module){
    !function(){ 
    /*进度变化*/
     var redWidth=$(".redBar").attr("data");
     var greenWidth=$(".greenBar").attr("data");
     var blueWidth=$(".blueBar").attr("data");  
     $(".redBar").animate({width:redWidth},2000);
     $(".greenBar").animate({width:greenWidth},2000);
     $(".blueBar").animate({width:blueWidth},2000);
        
    }();
 
    /*饼状图*/
     $(function () {
        var oneToOneClass=parseFloat($("#oneToOneClass").val());
        var MiniClass=parseFloat($("#MiniClass").val());
        var openClass=parseFloat($("#openClass").val());
        var efl=parseFloat($("#efl").val());
        var iTalk=parseFloat($("#iTalk").val());
        $('#pie-container').highcharts({
            chart: {
                plotBackgroundColor:null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: ''
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<span style="font-size:14px;font-weight:normal;">{point.name}</span>: <span style="font-size:14px;font-weight:normal;">{point.percentage:.1f} %</span>',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '',
                data: [
                    ['EFL练习次数', efl],
                    ['精品公开课',  openClass],
                    ['精品小班课',  MiniClass],
                    ['1对1外教课',  oneToOneClass],
                    ['iTalk练习次数',  iTalk]
                ]
            }],
            colors: ['#00d633', '#0060f0','#0090ff','#ff8505','#81aa69']
        });
    });

}); 
               