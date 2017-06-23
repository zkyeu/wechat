/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-01-16 11:10:00
 * @version 1.0.0
 */
define('bx_cover', ['tmpl'], function(require, exports, module) {
   
    var tmpl = require('tmpl');
    var j_monster_pic = $("#j_monster_pic");
    var j_cover_audio = $("#j_cover_audio")[0];
    var playTimer = null;
    var domain3 = "http://one.frontend.com/";

    var player = new chivox.AiPlayer({
        id: "player", //这里的id对应于HTML节点的id
        appKey: "14350468870000e0",
        secretKey: "55d7229b6ae9332e89596cff1f9ce042",
        onFlashLoad:function(code, message){//Flash加载成功的回调，code值有："50000"
            console.log("====code========" + code);
            playCover($("#j_cover"));
        },
        onError:function(code, message){//出错时的回调，code值有："50408", "50409", "50410"
        }
    });


    function createAudioPlayer() {

    }

    //播放音频动画
    function playCover(obj) {

        player.load({
            url: obj.attr("media-audio"),//这里支持http协议的mp3音频，rtmp协议的flv音频
            success: function(){
                //加载音频成功，接下来才可以播放音频
                console.log("加载音频成功");
                

                player.play({//可以设置播放参数，例如从什么位置开始播放，播放多长时间 
                    onStart: function(){//开始播放的回调
                        var duration = player.getDuration();
                        var currentTime = 0;
                        playTimer = setInterval(function() {
                            currentTime = player.getPosition();
                            console.log("currentTime:%s====duration:%s",currentTime,duration);
                            j_monster_pic.css({
                                left: (currentTime / duration) * 837 + "px"
                            });
                        }, 60);
                        
                    },
                    onStop: function(){//播放完成的回调
                        //if (currentTime === duration) {
                            clearInterval(playTimer);
                            j_monster_pic.addClass("animated fadeOut").removeClass("bounce infinite");
                        //}
                        window.location.href = "guess.html";

                    }
                });
            },
            error: function(){
                console.log("加载音频失败，请检查音频地址是否正确，网络连接是否正常。");
            }
        });
        
    }

    var cover = {
        init: function () {
            console.log("===cover init=============");
        }
    }

    /*-----------------------------驰声插件---------------------------------*/
    $(function() {
        
        
    });

    //==========
    module.exports = cover;

});
