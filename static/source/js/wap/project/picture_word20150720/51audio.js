/**
 * 
 * @authors Saturday (zhouling@51talk.com)
 * @date    2015-02-12 13:49:21
 * @version 1.0.0
 */
 define(function(require,exports,module){
    
    var cookie   = require("cookie");
    try{
        cookie.clearCookie("restime_start");
        cookie.setCookie("restime_start", Math.round(new Date().getTime()/1000));
    } catch(e) {
    }

    var aBtn     = document.querySelectorAll(".jsPlayer"),
        sBtn     = document.querySelectorAll(".switch"),
        bigImg   = document.querySelectorAll(".bigImg"),
        title    = document.querySelectorAll(".title"),
        smallImg = document.querySelectorAll(".smallImg"),  
        count    = 0, //自动播放计时器
        ua       = window.navigator.userAgent, //浏览器类型判断标识
        i, slidint;
    for(i=0; i<aBtn.length; i++){
        (function(index){
            var oBtn   = aBtn[index],
                tBtn   = sBtn[index],
                src    = oBtn.getAttribute("data-audioSrc"),
                oAudio = document.createElement("audio");
            oAudio.setAttribute("class", "word");
            if (oBtn.getAttribute("id")=="realword") {
                oAudio.setAttribute("id", "realaudio");
            }

            //直接获取后台给的时长---针对ios的bug
            //duration=str2Second(oTimer.innerHTML);
            //duration=100;
            oAudio.src = src;
            document.body.appendChild(oAudio);
            oBtn.onclick = function(){
                clearTimeout(slidint);
                if(oAudio.paused){
                    WXbug(oAudio);
                    pauseOther(oAudio);
                    oAudio.play();
                }else{
                    WXbug(oAudio);
                    oAudio.pause();
                }
            };
            tBtn.onclick = function(){
                clearTimeout(slidint);
                if(oAudio.paused){
                    WXbug(oAudio);
                    pauseOther(oAudio);
                    oAudio.play();
                }else{
                    WXbug(oAudio);
                    oAudio.pause();
                }
            };
            //暂停
            oAudio.addEventListener('pause',function() {
                tBtn.className = tBtn.className.replace("off","on");
            }, false);

             //播放
            oAudio.addEventListener('play',function() {
               tBtn.className = tBtn.className.replace("on","off");
            }, false);
            //播放结束
        })(i);
    }

    //自动播放定时器
    function playall(audioIndex) {
        slidint = setInterval(function() {
            if ( count == 0 && !audioIndex[count].ended) {
                audioIndex[count].play();
            }
            if (audioIndex[count].ended) {
                count++;
                audioIndex[count].play();
            }
            if (count == audioIndex.length-1) {
                count == 0;
                clearTimeout(slidint);
            }
        }, 1000);
    }
    playall(document.querySelectorAll(".word"));//定时播放启动

    /**
    * 该方法用于绑定点击事件，比一般的click事件反应速度快2倍。
    * @param {对象字面量} obj 要绑定的dom对象
    * @param {对象字面量} fun 事件触发的函数
    */

    function tap(obj,fun) {
        var start_x = 0, start_y = 0;
        obj.addEventListener('touchstart',function(e){
            start_x = e.touches[0].clientX;
            start_y = e.touches[0].clientY;
            document.addEventListener('touchend', touEnd, false);
        });
        function touEnd(e){
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if(Math.abs(endX - start_x) < 5 && Math.abs(endY - start_y) < 5) fun.call(obj,e);
            document.removeEventListener('touchend', touEnd, false);
        }
    }
    //ios微信中home键切换页面bug
    function WXbug(oAudio){
        if(isIOSClient() && isWeiXin()){
            oAudio.pause();
            oAudio.play();
        }
    }
    function pauseOther(oAudio){
        var aAudio = document.querySelectorAll("audio");
        for(var j=0; j<aAudio.length; j++){
            if(aAudio[j]!=oAudio) aAudio[j].pause();
        }
    }
    //是否是IOS端
    function isIOSClient(){
        if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) return true;
        return false;
    }
    //是否是微信浏览器
    function isWeiXin(){
        if(ua.indexOf("MicroMessenger")!=-1) return true;
        return false;
    }
    //字符串转化为秒数
    function str2Second(str){
        var arr = str.match(/\d+/g);
        if(arr.length>1) return arr[0]*60+arr[1]*1;
        return arr[0]*1;
    }

    //二张图片，三张图片显示样式
    if (bigImg.length == 2) {
        for (i = 0; i < title.length; i++) {
            title[i].style.display = "none";
        }
        for (i = 0; i < bigImg.length; i++) {
            bigImg[i].className = "bigImg pwlist";

        }
    }
    if (smallImg.length == 3) {
        for (i = 0; i < smallImg.length; i++) {
            smallImg[i].className = "smallImg pwlist";
        }
    }
});

    
//添加正确或错误状态
var clickLi     = document.querySelectorAll(".smallImg");
var spanFail    = document.querySelectorAll(".fail");
var spanCorrect = document.querySelectorAll(".correct");
var mask        = document.querySelectorAll(".smallImg .mask");
var clickCount  = 0;
var flag        = false;

var restime     = 0;
var res_start   = Math.round(new Date().getTime()/1000);
var ua          = window.navigator.userAgent;

var errFirst        = "";//第一个错误
var errSecond       = "";//第二个错误
var errFirstCount   = 0;
var errSecondCount  = 0;

function WXbug(oAudio){
    if(isIOSClient() && isWeiXin()){
        oAudio.pause();
        oAudio.play();
    }
}
function pauseOther(oAudio){
    var aAudio = document.querySelectorAll("audio");
    for(var j=0; j<aAudio.length; j++){
        if(aAudio[j]!=oAudio) aAudio[j].pause();
    }
}
//是否是IOS端
function isIOSClient(){
    if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) return true;
    return false;
}
//是否是微信浏览器
function isWeiXin(){
    if(ua.indexOf("MicroMessenger")!=-1) return true;
    return false;
}

function isRight(obj, res) {
    if (!flag) {
        flag = true;
        restime = (Math.round(new Date().getTime()/1000) - res_start);
    }
    for (var i=0; i<clickLi.length; i++) {
        if (document.querySelectorAll(".smallImg").length == 2) {
            clickLi[i].className = 'smallImg';
        } else {
            clickLi[i].className = 'smallImg pwlist';
        }
    }
    for (var i=0; i<spanFail.length; i++) {
        spanFail[i].style.display="none"
    }
    for (var i=0; i<spanCorrect.length; i++) {
        spanCorrect[i].style.display="none"
    }
    if (res == 1) {
        document.getElementById("success").play();
        if (obj.className.indexOf('hover') < 0) {
            if (document.querySelectorAll(".smallImg").length == 2) {
                obj.className = obj.className.replace(' pwlist', ' ') + " hover";
            } else {
                obj.className = obj.className.replace(' pwlist', ' ') + " pwlist hover";
            }
        }
        if (obj.querySelectorAll('.fail').length > 0) {
            obj.querySelectorAll('.fail')[0].style.display = "block";
            obj.querySelectorAll('.correct')[0].style.display = "none";
        }
        for (var i=0; i<clickLi.length; i++) {
            clickLi[i].onclick = function () {};
        }
        document.getElementById("realone").onclick = function() {
            var oAudio = document.getElementById("realaudio");
            if(oAudio.paused){
                WXbug(oAudio);
                pauseOther(oAudio);
                oAudio.play();
            }else{
                WXbug(oAudio);
                oAudio.pause();
            }
        };
        for (var i=0; i<mask.length; i++) {
            mask[i].style.display="block";
        }
        document.getElementById("next").style.display = "block";
    } else {
        if (errFirstCount == 0 && errSecondCount == 0) {
            errFirst = obj.getAttribute("data-err-index");
            errFirstCount++;
        } else if (obj.getAttribute("data-err-index") != errFirst && errSecondCount == 0) {
            errSecond = obj.getAttribute("data-err-index");
            errSecondCount++;
        }
        document.getElementById("fault").play();
        if(obj.querySelectorAll('.fail').length > 0) {
            obj.querySelectorAll('.correct')[0].style.display = "block";
            obj.querySelectorAll('.fail')[0].style.display = "none";
        }
    }
    setTimeout(function() {
        obj.querySelector(".fail").style.display="none";
        obj.querySelector(".correct").style.display="none";
    },1000);
}

// function submit(obj) {
//     event.preventDefault();
//     var data = {};
//     data.count = errFirstCount + errSecondCount;
//     data.restime = restime;
//     console.log(event.preventDefault);
//     window.location.href(obj.getAttribute("href"));
//     // $.post("", data, function(){
//     //     window.location.href(this.getAttribute("href"));
//     // });
// }
// $("#next").click {
//     var data = {};
//     data.count = errFirstCount + errSecondCount;
//     data.restime = restime;
//     $.post("", data, function(){});
// }

function submit(obj) {
    event.preventDefault();
    document.getElementById('c_count').value = errFirstCount + errSecondCount;
    document.getElementById('c_restime').value = restime;
    document.getElementById('c_dia').submit();
}