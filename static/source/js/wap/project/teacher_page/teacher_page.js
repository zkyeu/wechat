/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2016-01-12 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
  $(function(){
    var aBtn=document.querySelectorAll(".jsPlayer"),
        aBuffer=document.querySelectorAll(".cont-buff"),
        aProgess=document.querySelectorAll(".cont-prog"),
        aTimer=document.querySelectorAll(".time");
    for(var i=0;i<aBtn.length;i++){
        (function(index){
            var oBtn=aBtn[index],
                oBuffer=aBuffer[index],
                oProgess=aProgess[index],
                // oTimer=aTimer[index],
                src=oBtn.getAttribute("data-audioSrc"),
                oAudio=document.createElement("audio");
                //直接获取后台给的时长---针对ios的bug
                //duration=str2Second(oTimer.innerHTML);
                //duration=100;
            document.body.appendChild(oAudio);

            oBtn.onclick=function(){
                if(oAudio.src==""){
                    //第一次播放
                    oAudio.src=src;
                    pauseOther(oAudio);
                    oAudio.play();
                }else{
                    if(oAudio.paused){
                        //再次播放
                        if(oAudio.ended){
                            oAudio.src=src;
                        }
                        WXbug(oAudio);
                        pauseOther(oAudio);
                        oAudio.play();
                    }else{
                        //暂停
                        WXbug(oAudio);
                        oAudio.pause();
                    }
                }
            };
            
            //暂停
            oAudio.addEventListener('pause',function(){
                oBtn.className=oBtn.className.replace("off","on");
            },false);
             //播放
            oAudio.addEventListener('play',function(){
               oBtn.className=oBtn.className.replace("on","off");
            },false);
             //播放进度条
            oAudio.bDuration=false;
            oAudio.addEventListener('timeupdate',function(){
                if(oAudio.bDuration){
                    if(!isNaN(oAudio.duration)){
                        if(oAudio.currentTime/oAudio.duration*100<=100){
                            oProgess.style.width=oAudio.currentTime/oAudio.duration*100+'%';
                        }
                        var m=parseInt(oAudio.duration/60);
                        var s=parseInt(oAudio.duration%60);
                        // var str="";
                        // if(m>0){
                        //     str+=m+"'";
                        // }
                        // str+=s+"''";
                        // oTimer.innerHTML=str;
                    }
                }else{
                    oAudio.bDuration=true;
                }
            },false);
            //播放结束
            oAudio.addEventListener('ended',function(){
                oProgess.style.width="0px";
            },false);
            //缓存进度
            //oAudio.addEventListener('progress',fnProgress,false);
            function fnProgress(){
                if(!isNaN(oAudio.duration)){
                    oBuffer.style.width=oAudio.buffered.end(0)/oAudio.duration*100+'%';
                }
                if(oAudio.buffered.end(0)==oAudio.duration){
                    oAudio.removeEventListener('progress',fnProgress,false);
                }
            }
        })(i);
    }
    
    /**
    * 该方法用于绑定点击事件，比一般的click事件反应速度快2倍。
    * @param {对象字面量} obj 要绑定的dom对象
    * @param {对象字面量} fun 事件触发的函数
    */
    function tap(obj,fun) {
        var start_x = 0,
            start_y = 0;
        obj.addEventListener('touchstart',function(e){
            start_x = e.touches[0].clientX;
            start_y = e.touches[0].clientY;
            document.addEventListener('touchend', touEnd, false);
        });
        function touEnd(e){
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if(Math.abs(endX - start_x) < 5 && Math.abs(endY - start_y) < 5) {
                fun.call(obj,e);
            }
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
        var aAudio=document.querySelectorAll("audio");
        for(var j=0;j<aAudio.length;j++){
            if(aAudio[j]!=oAudio){
                aAudio[j].pause();
            }
        }
    }
    //是否是IOS端
    function isIOSClient(){
        var ua=window.navigator.userAgent;
        if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            return true;
        }else{
            return false;
        }
    }
    //是否是微信浏览器
    function isWeiXin(){
        var ua=window.navigator.userAgent;
        if(ua.indexOf("MicroMessenger")!=-1){
            return true;
        }else{
            return false;
        }
    }
    //字符串转化为秒数
    function str2Second(str){
        var arr=str.match(/\d+/g);
        if(arr.length>1){
            return arr[0]*60+arr[1]*1;
        }else{
            return arr[0]*1;
        }
    }
  });
/*验证*/
  var reTel = /^1[0-9]{10}$/;
  $("#sha-reg").click(function(){
    var email=$("#dl-email").val();
    var tel=$("#dl-tel").val();
    var pwd=$("#dl_password").val();
    if(tel==""){
      alert("请填写手机号码");
      return false;
    }
    if(!reTel.test(tel)){
      alert("请填写正确格式手机号码"); 
      return false; 
    }
    if(pwd==""){
      alert("请输入密码");
      return false;
    }
    $("#RegForm").submit();
  });
/*查看全部*/
  $(".cr-btn").on("click",function(){
    $(this).hide();
    $(this).siblings("p").removeClass("wdlink");
  });
});