/**
 * Created by zhangnan on 2016/12/19.
 */
define(function(require,exports,module){
    var inviteBtn = $("#invite-btn");//邀请按钮
    var cancelBtn = $('#cancle-share'); //取消

    inviteBtn.click(function(){
        var type = $('#is_show').val();
        if( type == '1'){
            $('.weixin-share-cont').removeClass('hide');
            $('.share-cont').addClass('hide');
        }else{
            $('.share-cont').removeClass('hide');
            $('.weixin-share-cont').addClass('hide');
        }
    });
    cancelBtn.click(function(){
        $('.share-cont').addClass('hide');
        $('.weixin-share-cont').addClass('hide');
    });

    var wx_tit=$('#wx-title').val();
    var wx_des=$('#wx-description').val();
    var wx_img=$('#wx-imgUrl').val();
    var wx_link=$('#wx-url').val();

    $.ajax({
        url:"/Ajax/smallBeauty",
        type:"post",
        dataType: "json",
        success:function(res){
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp:res.data.timestamp ,
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
                    'openCard']
            });

            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: wx_tit,
                    desc: wx_des,
                    link: wx_link,
                    imgUrl: wx_img
                });
                wx.onMenuShareQQ({
                    title: wx_tit,
                    desc: wx_des,
                    link: wx_link,
                    imgUrl: wx_img
                });
                wx.onMenuShareTimeline({
                    title: wx_tit,
                    desc: wx_des,
                    link: wx_link,
                    imgUrl: wx_img
                });
            });
        }
    })

});
