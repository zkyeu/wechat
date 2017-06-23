
 define(function(require,exports,module){ 
  //带进度条的语音播放
   $(".u-paly").tap(function(){
       var oBtn=$(this);
       var oP=oBtn.parent();
       var src=oBtn.attr("data-src");
       var oProgress=oP.find(".m-progress");
       var oTimer=oP.find(".u-time");
       if(!oP.attr('data-appended')){
           //动态添加audio
           var oAudio=document.createElement("audio");
           oAudio.src=src;
           oP.append(oAudio).attr("data-appended",true);
           //暂停
           oAudio.addEventListener('pause',function(){
               oBtn.removeClass('on');
           },false);
            //播放
           oAudio.addEventListener('play',function(){
              oBtn.addClass('on');
           },false);

           //播放进度
           oAudio.addEventListener('timeupdate',function(){

               var pct=oAudio.currentTime/oAudio.duration*100;

               if(pct<=100){
                   oProgress.css("width",pct+'%');
               }
               var time=oAudio.duration-oAudio.currentTime;
               // var time=oAudio.currentTime;
               var m=parseInt(time/60);
               var s=parseInt(time%60);
               var str="";
               m=m>0 ? m : 0;
               s=s>=10 ? s : "0"+s;
               // str="-"+m+":"+s;
               str=m+"'"+s+"''";
               oTimer.html(str);
           },false);
           //播放结束
           oAudio.addEventListener('ended',function(){
               $(".u-paly").removeClass('on');
               oProgress.css("width",0);
           },false);
       }

       var _oAudio=oP.find('audio')[0];
       var oPlaying=$("audio.j-playing");
       if(oBtn.hasClass('on')){
           _oAudio.pause();
       }else{
           if(oPlaying.length){
               oPlaying[0].pause();
               oPlaying.removeClass('j-playing');
           }
           $(_oAudio).addClass('j-playing');
           _oAudio.play();
       }
   });
 

 
});
