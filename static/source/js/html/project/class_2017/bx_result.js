/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-01-16 11:10:00
 * @version 1.0.0
 */
define('bx_result', [], function(require, exports, module) {
   
    var bx_result = {
        init: function() {
            
            this.bindPage();
        },
        bindPage: function() {
            var that = this;
            
            //声音播放
            $("#j_audio_word").bind('click', function(){
                that.initPlayer('audio_word', '#j_audio_word');
            });
        },

        initPlayer: function(id, obj) {
            var that = this;
            var player = new chivox.AiPlayer({
                id: id,
                appKey: "14350468870000e0",
                secretKey: "55d7229b6ae9332e89596cff1f9ce042",
                onFlashLoad: function(code, message) { //Flash加载成功的回调，code值有："50000"
                    console.log("====code========" + code);
                    that.playAudio(player, obj);
                },
                onError: function(code, message) { //出错时的回调，code值有："50408", "50409", "50410"
                }
            });
        },

        playAudio: function(player, obj) {
            player.load({
                url: $(obj).attr("media-audio"),
                success: function() {
                    console.log("加载音频成功");
                    player.play({
                        onStart: function() {

                        },
                        onStop: function() { //播放完成的回调

                        }
                    });
                },
                error: function() {
                    console.log("加载音频失败，请检查音频地址是否正确，网络连接是否正常。");
                }
            });
        }
    }

    module.exports = bx_result;
});