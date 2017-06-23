define("progress",["echarts"],function(require,exports,module){
/*表单验证*/
    // $(".subBtn").on("click",function() {
    //     var phoneReg=/^1[0-9]{10}$/;
    //     var phone=$(".phone").val();
    //     var pwd=$(".pwd").val();
    //     if(phone=="" || !phoneReg.test(phone)){
    //         alert("请填写正确手机号码！");
    //         return false;
    //     } 
    //     if(pwd==""){
    //         alert("请填写密码!");
    //         return false;
    //     }
    //      document.getElementById("reg1_form").submit();
    // });
    // $(window).scroll(function(){
    //     var oTop=$(window).scrollTop();
    //     var oDoc=$(document).height();
    //     var oWinHeight=$(window).height();
    //     var oHight=$(".footerFix").height();
    //     if(oTop+oHight>=oDoc-oWinHeight){
    //          $(".footerFix").removeClass("footerCopy");
    //          $(".footerMask").hide();
    //     }else{
    //          $(".footerFix").addClass("footerCopy");
    //          $(".footerMask").show();
             
    //     }
    // });
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
                            {value:oneToOneClass, name:'1对1外教课'},
                            {value:oneToOneClass, name:'iTalk练习次数'}
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
                color: ['#00d633', '#0060f0','#0090ff','#ff8505','#81aa69']
            };

      myChart.setOption(option);
      }();
}); 
               