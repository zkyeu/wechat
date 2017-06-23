define(function(require){
/*change*/
    $(".list-nav .newList").click(function(){
      var index=$(this).index();
      if(index=="0" || index=="1"){
        $(this).addClass("on").siblings().removeClass("on");
        if($(this).hasClass("on")){
          $(".more-list").hide();
          $(".more-list li").removeClass("on");
        }
      }else if(index=="2"){
        $(this).addClass("on");
      }
    });
    $(".nav-icon").click(function(){
      var moreList=$(this).find(".more-list");
      moreList.toggle();
      if(moreList.is(":visible")){
        $(this).addClass("on");
      }else if(moreList.find("li").hasClass("on")){
        $(this).addClass("on");  
      }else{
        $(this).removeClass("on");
      }
    });
    $(".more-list li").click(function(){
      $(this).addClass("on").siblings().removeClass("on");
      if($(this).hasClass("on")){
        $(".list-nav li").eq("0").removeClass("on");
        $(".list-nav li").eq("1").removeClass("on");
      }
    });
/*list 渲染*/
  // res={
  //   data:[
  //     {
  //       cover:'../../../images/wap/openclass/cls_img01.jpg',
  //       course_name:'2016SPBCN拼字大赛赛前培训 [初中1-3年级]',
  //       appoint_num:'115', 
  //       class_label:[
  //         {
  //           title:'词汇',
  //         }
  //       ],
  //       tea_pic:'../../../images/wap/openclass/cls_img01.jpg',
  //       tea_name:'jack',
  //       start_time:'2018/05/21 13:54:00',
  //     },
  //     {
  //       cover:"../../../images/wap/openclass/cls_img02.jpg",
  //       course_name:"2016SPBCN拼字大赛赛前培训 [初中1-3年级]",
  //       appoint_num:"100",
  //       class_label:[
          
  //       ],
  //       tea_pic:'../../../images/wap/openclass/cls_img02.jpg',
  //       tea_name:'Cassie',
  //       start_time:'2017/02/22 22:00:00',
  //     },
  //     {
  //       cover:"../../../images/wap/openclass/cls_img03.jpg",
  //       course_name:"2016SPBCN拼字大赛赛前培训 [初中1-3年级]",
  //       appoint_num:"90",
  //       class_label:[
  //         {
  //           title:'活动',
  //         },
  //         {
  //           title:'词汇',
  //         }
  //       ],
  //       tea_pic:'../../../images/wap/openclass/cls_img02.jpg',
  //       tea_name:'Cassie',
  //       start_time:'2017/05/23 12:32:00',
  //     },
  //     {
  //       cover:"../../../images/wap/openclass/cls_img03.jpg",
  //       course_name:"2016信息内容",
  //       appoint_num:"125",
  //       class_label:[
  //         {
  //           title:'活动',
  //         },
  //         {
  //           title:'词汇',
  //         },
  //         {
  //           title:'信息',
  //         }
  //       ],
  //       tea_pic:'../../../images/wap/openclass/cls_img03.jpg',
  //       tea_name:'Cassie',
  //       start_time:'2017/02/23 20:00:00',
  //     },
  //   ]
  // }
  function regList(data){
    var str='';
    for(var i=0; i<data.length;i++){ 
      var class_label = data[i]['class_label'] || [];
      var titStr = "";
      for(var j=0;j<class_label.length;j++){
        titStr+='<span class="tit">' + class_label[j].title + '</span>'
      }
      str+='<section class="detail-content"><a href="'+data[i].url+'">'
        +'<dl>'
        +'<dt><img src=" '+data[i].cover+' " class="defaultImg"></dt>'
        +'<dd class="d-list">'+ data[i].course_name +'</dd>'
        +'<dd class="d-title">'
        + titStr
        +'</dd>'
        +'<dd><span class="num-t">' +data[i].appoint_num+ '人已预约</span></dd>'
        +'</dl>'
        +'<section class="see"><section class="see-lt">'
        +'<img src="' +data[i].tea_pic+ '" class="lt-img">'
        +'<span class="tit">' + data[i].tea_name + '</span>'
        +'</section>'
        +'<section class="see-lt see-rt">'
        +'<span class="class just">'
        +'<i class="timeId" data-end-time="'+ data[i].start_time +'"></i>'
        +'</span>'
        +'<span class="see-btn">查看</span>'
        +'</section>'
        +'</section>'
        +'</a></section>'
    }
    $(".list-detail").html(str);
  }
  // regList(res.data);
  $("#newData,#hostData").click(function(){
    var dataUrl=$("#list-nav").attr("data-url");
    var dataCode = $(this).attr('data-code');
    $.ajax({
      url:dataUrl,
      type:'post',
      dataType:'json',
      data:{dataCode:dataCode},
      success:function(res){
        if(res.status=="0"){
          $(".list-empty").show(); 
        }else if(res.status=="1"){
          regList(res.data);
          $(".list-empty").hide();  
        }
        regList(res.data);
        framTime();
      }
    });   
  });
  $("#listData li").click(function(){
    var dataUrl=$("#list-nav").attr("data-url");
    var dataCode = $(this).parents("#listData").attr('data-code');
    var dataId = $(this).attr('data-id');
    $.ajax({
      url:dataUrl,
      type:'post',
      dataType:'json',
      data:{dataCode:dataCode,dataId:dataId},
      success:function(res){
        // $(".list-detail .detail-content").empty();
        if(res.status=="0"){
          $(".list-empty").show();  
        }else if(res.status=="1"){
          regList(res.data);
          $(".list-empty").hide();  
        } 
        regList(res.data);
        framTime();
      }
    });   
  });

/*网页多个倒计时*/
var framTime=function(){
  var Alarm = function (startime, endtime, countFunc, endFunc) {
      this.time = Math.floor((endtime - startime) / 1000); //时间
      this.countFunc = countFunc; //计时函数
      this.endFunc = endFunc; //结束函数
      this.flag = 't' + Date.parse(new Date()); //
  };
  Alarm.prototype.start = function () {
      var self = this;
      self.flag = setInterval(function () {
          if (self.time <=0) {
              clearInterval(self.flag);
              self.endFunc();
              // console.log('计时结束');
          } else {
              var minute, hour, day, second;
              day = Math.floor(self.time / 60 / 60 / 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 / 24) : Math.floor(self.time / 60 / 60 / 24);
              hour = Math.floor(self.time / 60 / 60 % 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 % 24) : Math.floor(self.time / 60 / 60 % 24);
              minute = Math.floor(self.time / 60 % 60) < 10 ? '0' + Math.floor(self.time / 60 % 60) : Math.floor(self.time / 60 % 60);
              second = Math.floor(self.time % 60) < 10 ? '0' + Math.floor(self.time % 60) : Math.floor(self.time % 60);
              //倒计时执行函数
              self.countFunc(second, minute, hour, day);
              self.time--;
          }
      },1000);
  }

  /*服务器时间*/
  var serverTime=$(".join-cls .detaT,.cls-list").attr("data-server-time");
  var tYear=serverTime.substr(0,4);
  var tMonth=serverTime.substr(5,2);
  var tDate=serverTime.substr(8,2);
  var todayTime=tYear+'-'+tMonth+"-"+tDate;
  //调用 
  var countTime = function () {
      var eles = $('.timeId'),  //eles是放置里面会有自定义data，end-time
          len = eles.length;
      for (; len > 0; len--) {
          var ele = eles.eq(len - 1);
          (function (ele) {
              startTime = new Date(serverTime).getTime();
              endTime = new Date(ele.attr('data-end-time')).getTime(),
              alarm = new Alarm(startTime, endTime, function (second, minute, hour, day) { //计时钟
                var dayInt=parseInt(day);
                var dataStr=ele.attr('data-end-time'); 
                var yearTime=dataStr.substr(0,4);
                var monthTime=dataStr.substr(5,2);
                var dataTime=dataStr.substr(8,2);
                var dayTime=yearTime+'-'+monthTime+"-"+dataTime;
                var differ=dataTime-tDate;
                //添加类
                var addClsLater=function(){
                  ele.parent().addClass("laterImg");   
                }
                var addClsJust=function(){
                  ele.parent().removeClass("just");  
                }
                //判断年月日是否属于当天
                if(dayTime==todayTime){//年月日属于当天
                  if(dayInt == 0 && hour==00 && minute==00){//1分钟内
                    addClsLater();
                    ele.text(second+'秒后开课');
                  }else if(dayInt == 0 && hour==00){//1小时内
                    addClsLater();
                    ele.text(minute+'分钟后开课');
                  }else if(dayInt == 0 && hour>00){//1天内
                    addClsJust();
                    var dataEndTime=dataStr.substr(11,5);
                    ele.text('今天'+dataEndTime);
                  }
                }else{
                  //是否是当年或当月
                  if(yearTime==tYear && monthTime==tMonth){
                    if(differ<2){
                      addClsJust();
                      var dataEndTime=dataStr.substr(11,5);
                      ele.text('明天'+dataEndTime);  
                    }else if(differ>1){
                      addClsJust();
                      var dataEndTime=dataStr.substr(5,11);
                      ele.text(dataEndTime);  
                    }
                  }else if(yearTime==tYear && monthTime!=tMonth){
                    addClsJust(); 
                    var dataEndTime=dataStr.substr(5,11);
                    ele.text(dataEndTime);  
                  }else if(yearTime!=tYear){
                    addClsJust();
                    var dataEndTime=dataStr.substr(0,11);
                    ele.text(dataEndTime);
                  }
                }
              }, function () { //倒计时结束
                  ele.html("正在上课");
                  ele.parent().addClass("jstImg");
              });
              alarm.start();
          })(ele);
      }
  };
  countTime();

  var detaTime = function () {
      var eles = $('.detaT'), //eles是放置里面会有自定义data，end-time
          len = eles.length;
      for (; len > 0; len--) {
          var ele = eles.eq(len - 1);
          (function (ele) {
              startTime = new Date(serverTime).getTime();
              endTime = new Date(ele.attr('data-end-time')).getTime();
              dataDiffer = new Date(ele.attr('data-differ-time')).getTime();
              alarm = new Alarm(startTime, endTime, function (second, minute, hour, day) { //计时钟
                var dayInt=parseInt(day);
                var hourInt=parseInt(hour);
                var dataStr=ele.attr('data-end-time');
                var yearTime=dataStr.substr(0,4);
                var monthTime=dataStr.substr(5,2);
                var dataTime=dataStr.substr(8,2);
                var dayTime=yearTime+'-'+monthTime+"-"+dataTime;
                var differ=dataTime-tDate;
                //添加类
                var joinCls =function(){
                  ele.parent().addClass("nowCls");
                }
                //判断是否有小助手
                function dataTypeNum(ns){
                  var dataTypeNum=$(".join-cls").find(".cls-rt").attr("data-type-num");
                  if(dataTypeNum==0){//没有小助手
                    $("#nowOrder").hide();
                    $("#clsEnter").show();
                    $("#clsEnter").click(function(){
                      $(".classtips").show(); 
                    });     
                  }else if(dataTypeNum==1){//有小助手
                    $("#nowOrder").show();
                    $("#clsEnter").hide();
                    $("#nowOrder").click(function(){
                      $(".successLayer").show(); 
                    });     
                  }else if(dataTypeNum==2){//有QQ
                    $("#nowOrder").show();
                    $("#clsEnter").hide();
                    $("#nowOrder").click(function(){
                      $(".qqLayer").show(); 
                    }); 
                  } 
                }
                //判断年月日是否属于当天
                if(dayTime==todayTime){//年月日属于当天
                  //1小时内和1小时外
                  if(hourInt<1){//1小时内
                    if(dayInt == 0 && hourInt==0 && minute==00){//1分钟内
                      ele.text(second+'秒后开课');
                    }else if(dayInt == 0 && hourInt==0){//1小时内
                      ele.text(minute+'分钟后开课');
                    }
                    $("#clsEnter").show();
                    $("#clsEnter").click(function(){
                      $(".enterLayer").show();
                    });
                  }else{//1小时外
                    if(dayInt == 0 && hourInt>0){//1天内
                      joinCls();
                      var dataEndTime=dataStr.substr(11,5);
                      ele.text('今天'+dataEndTime);
                    }
                    //判断是否有小助手
                    dataTypeNum();
                  }
                }else{
                  //是否是当年或当月
                  if(yearTime==tYear && monthTime==tMonth){
                    //1天之外
                    if(differ<2){//明天
                      joinCls();
                      var dataEndTime=dataStr.substr(11,5);
                      ele.text('明天'+dataEndTime);  
                    }else if(differ>1){//超过明天
                      joinCls();
                      var dataEndTime=dataStr.substr(5,11);
                      ele.text(dataEndTime);  
                    } 
                  }else if(yearTime==tYear && monthTime!=tMonth){
                    joinCls();
                    var dataEndTime=dataStr.substr(5,11);
                    ele.text(dataEndTime);  
                  }else if(yearTime!=tYear){
                    joinCls();
                    var dataEndTime=dataStr.substr(0,11);
                    ele.text(dataEndTime);
                  }
                  //判断是否有小助手
                  dataTypeNum();
                }
              }, function () { //倒计时结束
                  if(dataDiffer<startTime){
                    $(".dataDiffer").show();
                  }else{
                    $("#clsEnter").show();
                    ele.html("正在上课");
                    ele.parent().addClass("justImg");
                    $("#clsEnter").click(function(){
                      $(".enterLayer").show();
                    });
                  }
              });
              alarm.start();
          })(ele);
      }
  };
  detaTime();
}
framTime();
/*详情页*/
  $(".deta-img .share").click(function(){
    $(".shareLayer").show();  
  });
  $(".deta-img .collection").click(function(){
    $(".shareLayer").find(".detaShare").removeClass("detaKeep");
    $(".shareLayer").show(); 
  });
  $(".shareLayer").click(function(){
    $(this).hide();
  });
  $(".successLayer .delete").click(function(){
    $(".successLayer").hide(); 
  });
  $(".classtips .delete").click(function(){
    $(".classtips").hide(); 
  });
  $(".qqLayer .delete").click(function(){
    $(".qqLayer").hide(); 
  });
  $(".enterLayer .enterBtn").click(function(){
    var dataUrl=$(".enterLayer").attr("data-url-enter");
    var nick_name=$(".inputTest").val();
    var token=$(".token").val();
    $.ajax({
      url:dataUrl,
      type:'post',
      dataType:'json',
      data:{nick_name:nick_name,token:token},
      success:function(res){
        if(res.code=="20001"){
          alert("英文名长度只能是2-20位字符");
        }else if(res.code=="20002"){
          alert("英文名只能包含英文字母和空格");
        }else if(res.code=="10000"){
          $("#nickName").val(nick_name);
          $("#toKen").val(token); 
          $("#formAction").submit();
          // var enterHref=$(".enterLayer").find(".enterBtn").attr("href");
          // window.location.href=enterHref+"?nick_name="+nick_name+"&token="+token;
          $(".enterLayer").hide();    
        }
      }
    });
  });
  var dataStatus=$(".cls-details").attr("data-status");
  if(dataStatus=="1"){
    $(".join-bom").show();
    $(".app-bom").hide();      
  }else if(dataStatus=="0"){
    $(".join-bom").hide();
    $(".app-bom").show();  
  }

/*图片加载失败显示*/
  // $(".detail-content img,.teaching img").each(function(){
  //   var error = false;
  //   if (!this.complete){
  //     error = true;
  //   }
  //   if (typeof this.naturalWidth != "undefined" && this.naturalWidth == 0) {
  //     error = true;
  //   }
  //   if(error){
  //     if($(this).hasClass("defaultImg")){
  //       $(this).attr("src","/static/images/wap/openclass/default02.png")
  //     }else{
  //       $(this).attr("src","/static/images/wap/openclass/default01.png")  
  //     }
  //   }
  // });

/*微信分享*/
  var fixurl = window.location.host;
  var imgUrl = "http://www.51talk.com/static/acweb/release/images/shareIco.png";
  var lineLink = document.URL;
  var descContent = "想要全球Walk，请来51Talk！名师公开课就要开始啦，上课戳这里哦~";
  var shareTitle = $("#courseTitle").val();
  var appid = $("#appIdHid").val();

  //点击微信自带的分享的操作
  var shareweixin= function () {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appid, // 必填，公众号的唯一标识
      timestamp: $("#timestampHid").val(), // 必填，生成签名的时间戳
      nonceStr: $("#nonceStrHid").val(), // 必填，生成签名的随机串
      signature: $("#signatureHid").val(),// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      //分享到朋友圈
      wx.onMenuShareTimeline({
          title: shareTitle, // 分享标题
          link: lineLink, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });
      //分享给好友
      wx.onMenuShareAppMessage({
          title: shareTitle, // 分享标题
          desc: descContent, // 分享描述
          link: lineLink, // 分享链接
          imgUrl: imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });
      //判断网络类型
      wx.getNetworkType({
        success: function (res) {
          var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
          console.log(networkType);
        }
      });
    })
  }
  shareweixin();

  // 在分享成功后，增加个回调函数
  function recordShare() {
    var courseId = $("#courseIDHid").val();
    var submitUrl = "http://www.51talk.com/Thirdparty/Wxsub/record_share";
    $.ajax({
        url: submitUrl,
        type: "POST",
        data: {
            course_id: courseId,
            page_type: "Class"
        },
        success: function (info) {

            var result = info;

            if (result == "1") {

            } else {

                return ""
            }

        }
    });
  }
  recordShare();
});