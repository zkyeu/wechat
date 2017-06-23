/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-01-16 11:10:00
 * @version 1.0.0
 */
define('bx_common', [], function(require, exports, module) {
    
    module.exports = {
        initPlayer: function(id, obj, startCallBack, stopCallBack) {
            var that = this;
            var player = new chivox.AiPlayer({
                id: id,
                appKey: "14350468870000e0",
                secretKey: "55d7229b6ae9332e89596cff1f9ce042",
                onFlashLoad: function(code, message) {
                    that.playAudio(player, obj, startCallBack, stopCallBack);
                },
                onError: function(code, message) {}
            });
        },

        playAudio: function(player, obj, startCallBack, stopCallBack) {
            player.load({
                url: $(obj).attr("media-audio"),
                success: function() {
                    player.play({
                        onStart: function() {
                            startCallBack ? startCallBack() : '';
                        },
                        onStop: function() {
                            stopCallBack ? stopCallBack() : '';
                        }
                    });
                },
                error: function() {
                    console.log("加载音频失败，请检查音频地址是否正确，网络连接是否正常。");
                }
            });
        },

        playAudio2: function(player, url, startCallBack, stopCallBack) {
            player.load({
                url: url,
                success: function() {
                    player.play({
                        onStart: function() {
                            startCallBack ? startCallBack() : '';
                        },
                        onStop: function() {
                            stopCallBack ? stopCallBack() : '';
                        }
                    });
                },
                error: function() {
                    console.log("加载音频失败，请检查音频地址是否正确，网络连接是否正常。");
                }
            });
        }

    }
});