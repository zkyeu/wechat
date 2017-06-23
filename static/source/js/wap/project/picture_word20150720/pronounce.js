/**
 * 
 * @authors Saturday (zhouling@51talk.com)
 * @date    2015-02-12 13:49:21
 * @version 1.0.0
 */
define(function(require,exports,module){     
    var sound = document.getElementById("p-sound");
    var audio = document.getElementById("p-audio");
    var vol = document.getElementById("vol");
    sound.onclick = function() {
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
    }
    vol.onclick = function() {
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
    }
    audio.addEventListener('pause',function() {
        vol.className = vol.className.replace("off","on");
    }, false);

     //播放
    audio.addEventListener('play',function() {
        vol.className = vol.className.replace("on","off");
    }, false);

    //audio.play();

});
function submit(obj, result){
    document.getElementById("c_result").value = result;
    document.getElementById("c_col").submit();
}