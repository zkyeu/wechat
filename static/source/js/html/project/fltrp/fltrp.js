define(function(require,exports,module){
	var ShareId = "";
  var shareContent = "@51talk 无忧英语-51Talk外教和服务挺不错，我向我的好友推荐了51Talk！你也来试试吧！";
  $(".share a").mouseover(function () {ShareId = $(this).parent().attr("data-id");});
  window._bd_share_config = {
      "common": {
          onBeforeClick:function(cmd, config){
            if (ShareId)
              config.bdUrl = "http://shiyousan.com/post/" + ShareId;    
            return config;
          },
          "bdSnsKey":{},
          "bdText":shareContent,
          "bdMini":"2",
          "bdMiniList":false,
          "bdPic":"",
          "bdStyle":"0",
          "bdSize":"24"
      },
      "share": {}
  };
  with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+ ~(-new Date() / 36e5)];
})