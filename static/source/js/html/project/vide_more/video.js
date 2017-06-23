 
define(function(require,exports,module){

  var playOrder = 0,videoArray = "";
      function app() {
        this.videoUrl = $('#videourl');//播放地址
        this.appiontId = $('#appoint_id');
        this.chatWrap = $('.chat-wrap');
        this.videoWrap = $('.video-wrap');
        this.videoWrapCon = $('.video-wrap__container');
        this.videoContainer = $('.video-container');
      }
      $.extend(app.prototype, {
        init: function() {
          this.VideosPlayHandler();
          var that = this;
          this.resizeElemHandler();
          $(window).on('resize', function() {
            that.resizeElemHandler();
          })
        },
        resizeElemHandler: function() {//自适应属性
          var scalingWidth = $(window).width() / 1920,
              chatScaleWidth = 420 * scalingWidth,
              chatScaleHeight = 880 * scalingWidth,
              videoWidth = this.videoWrapCon.width(),
              videoHeight = this.videoWrapCon.height(),
              videoScaleWidth = videoWidth * scalingWidth,
              videoScaleHeight = videoHeight * scalingWidth,
              chatOffsetTop = (chatScaleHeight - 880) / 2,
              chatOffsetRight = (chatScaleWidth - 420) / 2,
              videoOffsetTop = (videoScaleHeight - videoHeight) / 2;
          this.extendTransform(this.videoWrapCon, 'scale('+ scalingWidth +')');
          this.videoWrapCon.css({'margin-top': 25 + videoOffsetTop});
          this.videoContainer.css({'height': chatScaleHeight})
        },
        extendTransform: function(dom, style) {
          var tArr = ['transform', 'msTransform', 'webkitTransform', 'MozTransform'];
          $.each(tArr, function(index, item) {
            dom.css(item, style);
          });
        },
        VideosPlayHandler: function(e){
          var VideoSrc = this.videoUrl.val(),
              appoint_id = this.appiontId.val();
          if(!VideoSrc) return;
          videoArray = "";
          playOrder = 0;
          videoArray = VideoSrc.split(",");
          this.ckplayerPlay(videoArray[playOrder], 0);
        },
        ckplayerPlay: function(src, videoStatus) {
          var ckplayerSwfUrl = $("#ckplayer_swf").val();
          var that = this;
          var flashvars = {
            f: src,
            c: 0,
            b: 0,
            p: videoStatus,
            loaded: 'loadedHandler'   
          };
          CKobject.embed(ckplayerSwfUrl,
             'playerContainer',
             'ckplayer_playerContent',
             1024,
             576,
             true,
             flashvars,
             [src],
             {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
          );
          CKobject.getObjectById('ckplayer_playerContent').addListener('ended', function() {
            var videoLength = videoArray.length;
            if((videoLength - 1) == playOrder) {
              playOrder = 0;
              that.ckplayerPlay(videoArray[playOrder], 1);
            } else if((videoLength - 1) > playOrder) {
              playOrder += 1;
              that.ckplayerPlay(videoArray[playOrder], 1);
            }
          });
        }
      });
      var App = new app();
      App.init();
      
});