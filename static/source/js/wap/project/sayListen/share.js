
// define(function(require,exports,module){ 

   MusicBox=function (){   
 
      var _this=this;
      var  media= document.getElementById("musicBox"); 
      var  musicFiles=[
                     // {name:"犯错",url:"http://www.yandui.com/upload/sound/2009-9-20/20_34_25_953_.mp3"} ,
                     // {name:"天使的翅膀",url:"http://www.masradio.com.cn/uploadfile/program/uploadfile/200805/20080522090800196.mp3"},
                     // {name:"无名轻音乐",url:"http://audio.ngfiles.com/88000/88260_Zanarkan_Mastered_Piano_Ve.mp3"},
                     // {name:"草泥马之歌",url:"http://www.cnblogs.com"},//错误的资源
                     {name:"相思风雨中",url:"http://www.czopen.com/club/forum/files/247.mp3"}
                     ];
      //当前正在播放的歌曲的索引               
      var index=-1;
      //当前正在播放的歌曲
      var playingFile=null;
      //播放模式
      var playMode=1;
      //下一首
      this.nextMusic=function(){
         if(playMode=="1"){
              index+=1;
          }
          if(index==musicFiles.length){
              index=0;
          }
          playingFile=musicFiles[index];
          media.setAttribute("src",playingFile.url); 
          media.play();
          $("#ul_musicList").children().css({"background-color":"#FFF","border":"solid 1px #EEEEEE","color":"#000"});
          $( $("#ul_musicList").children()[index]).css({"background-color":"#2C7DE2","border":"solid 1px #206DDF","color":"#FFF"});
       
      }
      //加载
      this. loadStart=function(){
          $("#sn_status").text("加载中....");
      }
      //播放
      this. playing=function(){
           $("#sn_status").text("当前正在播放："+playingFile.name);
      } 
      //暂停
      this. pausePaly=function(){
           $("#sn_status").text("暂停："+playingFile.name);
      }
      //加载出错
      this. loadError=function(){
          $("#sn_status").text("加载“"+playingFile.name+"”失败，可能资源不存在~");
      }
      //初始化
      this.init=function(){
          for(var a in musicFiles){
          $("#ul_musicList").append("<li>"+musicFiles[a].name+"</li>");
          }
          _this.nextMusic();
          $("#slt_playMode").change(function(){
          playMode=$("#slt_playMode").val();
          });
      }
  }		
      // var mb=null;
      // $().ready(function(){
      //     mb=new MusicBox();
      //     mb.init();
      // });
// });
