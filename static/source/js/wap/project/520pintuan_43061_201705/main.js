/**
 * Created by zhangnan on 2017.05.
 */
define(function(require,exports,module){
    // require('weixin');
    var themeColor = '#ff74b8';
    var disabledColor = 'grey'
    var descTxt= $('#desc-txt'); //套餐说明
    var pintuanBtn = $('#pintuan'); //和好友一起拼团按钮

    //显示描述信息
    descTxt.click(function(){
        $('.introduce').removeClass('hide');
        $('html').css('overflow-y','hidden');
        $('body').css('overflow-y','hidden');
        $('body').css('position','fixed');
    });
    //关闭描述信息
    $('#introduceCloseBtn').click(function(){
        $('.introduce').addClass('hide');
        $('html').css('overflow-y','auto');
        $('body').css('overflow-y','auto');
        $('body').css('position', null);
    });

    //倒计时
    var curTime = $('#cur-time').val();
    // var curTime = new Date().getTime();
    var endTime = 1495382400000;
    updateTime();
    setInterval(updateTime,30*1000);
    function updateTime(){
        var rst = [];
        var days = '00',hours = '00',minutes = '00';
        if(curTime<endTime){
            var d = Math.floor((endTime-curTime)/(3600*1000*24));
            days = '' + d<10?('0'+d):d;

            var h = Math.floor((endTime-curTime)/(3600*1000))-d*24;
            hours = '' + h<10?('0'+h):h;

            var m = Math.floor((endTime-curTime)/(60*1000)-d*24*60-h*60);
            minutes = '' + m<10?('0'+m):m;
        }
        $('#days').text(days),$('#hours').text(hours),$('#minutes').text(minutes);
    }

    var selectedCourseIdx = -1;
    // 点击课程，状态变化
    $('.courses img').click(function(){
        $('#cancle-share').click();
        var activateImg = $(this);
        $('.courses img').forEach(function(item,index){
            var curItem = $(item);
            if(activateImg[0]){
                if(item == activateImg[0]){
                    curItem.addClass('active');
                    selectedCourseIdx = index;
                }else{
                    curItem.removeClass('active');
                }
            }
         });
    });


    //点击拼团分享
    pintuanBtn.click(function(){
        if(selectedCourseIdx<0){
            $(".showtips_layer").show();
            $(".showtips span").text("请选择一个套餐，之后再分享");
            return;
        }
        var appType = $('#app-type').val();  //1微信、0 app

        var projectId = selectedCourseIdx==0?30331:30330;
        $.ajax({
            url:'/ajax/searchProject',
            // url:'/templates/b.json',//0都发   ！0 没注册发送
            type:"post",
            // type:"get",
            dataType:"json",
            async:false,
            data:{
                page_name :$('#page_name').val(),
                // pid :$('#pid').val(),
                // from_type :$('#from_type').val(),
                project_id:projectId,
                page_id:$('#page_id').val()
                // is_weixin:appType
            },
            success : function(data){
                if(data.status == 1) {
                    if (appType == '1') {
                        updateWeixinShare(data);
                    }
                    appType == '1' && $('.weixin-share-tip').removeClass('hide');
                    appType == '0' && $('.share-cont').removeClass('hide');
                    return false;
                }else if(data.status == 2){
                    window.location = data.data;
                    return;
                }
                if(data.status == 0){
                    $(".showtips_layer").show();
                    $(".showtips span").text(data.info);
                    return false;
                }
            },
            error:function (data) {
                $(".showtips_layer").show();
                $(".showtips span").text("系统罢工，请重试");
            }
        });


    });

    $('#getIt').click(function(){
        $('.weixin-share-tip').addClass('hide');
    });
    $('#cancle-share').click(function(){
        $('.share-cont ').addClass('hide');
    });

    var shareTypes = ['weixin','weixin','weibo','qq'];
    $('.share-list a').forEach(function(item,idx){
        var curAlink = $(item);
        var link =  curAlink.attr('href');
        curAlink.attr('href',link + encodeURIComponent("&from_type="+ shareTypes[idx]));
    });

    //配置微信分享
    function updateWeixinShare(res){
        var wx_tit=$('#wx-title').val();
        var wx_des=$('#wx-description').val();
        // var link = 'asdfasd';
        var wx_img = $('#wx_img').val();
        wx.config({
            debug: false,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: ['checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'openCard'
            ]
        });
        var shareUrl = $('#share_url').val();

        wx.ready(function() {
            wx.onMenuShareAppMessage({  //分享给朋友
                title: wx_tit,
                desc: wx_des,
                // link: res.data.url
                link: shareUrl + '&from_type=weixin',
                imgUrl: wx_img
            });
            wx.onMenuShareQQ({ //qq
                title: wx_tit,
                desc: wx_des,
                link: shareUrl + '&from_type=qq',
                imgUrl: wx_img
            });
            wx.onMenuShareTimeline({  //朋友圈
                title: wx_tit,
                desc: wx_des,
                link: shareUrl + '&from_type=weixin',
                imgUrl: wx_img
            });
            wx.onMenuShareQZone({  //qq空间
                title: wx_tit,
                desc: wx_des,
                link: shareUrl + '&from_type=qq',
                imgUrl: wx_img
            });
            wx.onMenuShareWeibo({  //微博
                title: wx_tit,
                desc: wx_des,
                link: shareUrl + '&from_type=weibo',
                imgUrl: wx_img
            });

        });
    }

    //返回信息弹层
    $("#closeLayer").click(function () {
        $(".captchaId").click();
        $(".showtips_layer").hide();
    });

    $(".showtips_layer").click(function () {
        $(".showtips_layer").hide();
        $(".captchaId").click();
    });



    initShare();
    //初始化，给一个默认的分享参数
    function initShare(){
        var appType = $('#app-type').val();  //1微信、0 app
        $.ajax({
            url:'/ajax/searchProject',
            type:"post",
            dataType:"json",
            async:false,
            data:{
                page_name :$('#page_name').val(),
                project_id:30331,
                page_id:$('#page_id').val()
            },
            success : function(data){
                if(data.status == 1) {
                    if (appType == '1') {
                        updateWeixinShare(data);
                    }
                    return false;
                }
            }
        });
    }
});
