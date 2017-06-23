define("progress",["echarts"],function(require,exports,module){
    !function(){
       /*进度变化*/
       var redWidth=$(".redBar").attr("data");
       var greenWidth=$(".greenBar").attr("data");
       var blueWidth=$(".blueBar").attr("data");
       document.getElementById("dynamic").innerHTML='@keyframes redbar{from {width:0%}to{width:'+redWidth+'}}\n'+
       '@-moz-keyframes redbar{from {width:0%}to{width:'+redWidth+'}}\n'+
       '@-webkit-keyframes redbar{from {width:0%}to{width:'+redWidth+'}}\n'+
       '@-o-keyframes redbar{from {width:0%}to{width:'+redWidth+'}}\n'+
       '@keyframes greenbar{from {width:0%}to{width:'+greenWidth+'}}\n'+
       '@-moz-keyframes greenbar{from {width:0%}to{width:'+greenWidth+'}}\n'+
       '@-webkit-keyframes greenbar{from {width:0%}to{width:'+greenWidth+'}}\n'+
       '@-o-keyframes greenbar{from {width:0%}to{width:'+greenWidth+'}}\n'+
       '@keyframes bluebar{from {width:0%}to{width:'+blueWidth+'}}\n'+
       '@-moz-keyframes bluebar{from {width:0%}to{width:'+blueWidth+'}}\n'+
       '@-webkit-keyframes bluebar{from {width:0%}to{width:'+blueWidth+'}}\n'+
       '@-o-keyframes bluebar{from {width:0%}to{width:'+blueWidth+'}}\n'+ 
       '#redBar{width:'+redWidth+'}\n'+
       '#greenBar{width:'+blueWidth+'}\n'+
       '#blueBar{width:'+blueWidth+'}'; 
    }();
    
    /*饼状图*/
  !function(){
      var myChart = echarts.init(document.getElementById('main'));
      var oneToOneClass=parseFloat($("#oneToOneClass").val());
      var MiniClass=parseFloat($("#MiniClass").val());
      var openClass=parseFloat($("#openClass").val());
      var efl=parseFloat($("#efl").val());
      var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {d}%"
                },
                series : [
                    {
                        name: '课程学习统计数据',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                             {value:efl, name:'EFL练习次数'},
                             {value:openClass, name:'精品公开课'},
                             {value:MiniClass, name:'精品小班课'},
                             {value:oneToOneClass, name:'1对1外教课'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    }
                ],
                color: ['#ffdda7', '#ffbc76','#ff8f8f','#ff9f82']
            };

      myChart.setOption(option);
      }();
    /*页面切换*/
    !function(){
        $(".btn-switch li").on("click",function(){
              var index=$(this).index();
              $(this).find("a").addClass("ac-switch").parents().siblings().find("a").removeClass("ac-switch");
              $(".esContainer").eq(index).show().siblings(".esContainer").hide(); 
        });
    }();
   /*分享*/
    !function(){ 
        $(".btn-switch li a").on("click",function(){
            var thisUrl=$(this).attr("data-url");
            var oWinxinHref=$("#onMenuShareTimeline").attr("data-urlfirst")+thisUrl;
            var oWinxinfHref=$("#onMenuShareAppMessage").attr("data-urlfirst")+thisUrl;
            var oWeiboHref=$("#onMenuShareWeibo").attr("data-urlfirst")+thisUrl;
            var oQQHref=$("#onMenuShareQQ").attr("data-urlfirst")+thisUrl;
            $("#onMenuShareTimeline").attr("href",oWinxinHref);
            $("#onMenuShareAppMessage").attr("href",oWinxinfHref);
            $("#onMenuShareWeibo").attr("href",oWeiboHref);
            $("#onMenuShareQQ").attr("href",oQQHref);
        });
    }();
}); 
               