/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-12-16 16:10:30
 * @version 1.0.0
 */

define(function(require,exports,module){
/*    var acVoicePics = [{
            pic:'http://172.16.3.66:3000/images/html/ac_voice_share/img01.jpg',
            msg:'Hi ! Friends ! I went to the woods before.',
            mp3:'http://172.16.3.66:3000/images/html/ac_voice_share/test.mp3'
        },
        {
            pic:'http://172.16.3.66:3000/images/html/ac_voice_share/img01.jpg',
            msg:'Hi ! Friends ! I went to the woods before.1111',
            mp3:'http://s.51talk.com/upload/b2s_mp3/01/08/yes.mp3'
        },
        {
            pic:'http://172.16.3.66:3000/images/html/ac_voice_share/img01.jpg',
            msg:'Hi ! Friends ! I went to the woods before.222',
            mp3:'http://172.16.3.66:3000/images/html/ac_voice_share/horse.mp3'
        }
    ];*/

    var acVoiceFn = function(options){
        this.options = options;
        this.picNum = options.length;
        this._init();
        this._event();
        this.playSwfFn();
    };
    acVoiceFn.prototype = {
        _init:function(){
            this.imgBox = $('#imgBox'); 
            this.imgFlagId = $('#imgFlagId');
            this.acInfoTitle = $('#acInfoTitle');

            //关闭
            this.closeBtn = $('#closeBtn');
            this.acVoiceBox = $('#acVoiceBox');

            this.imgBoxWidth = 660*this.picNum;
            this.imgBox.css('width',this.imgBoxWidth+'px');
            for(var i=0; i<this.picNum; i++){
                this.imgBox.append('<li><img src="'+ this.options[i].pic +'"></li>');
                if( i == 0){
                    this.imgFlagId.append('<li class="current-li current-img"></li>');
                }else{
                    this.imgFlagId.append('<li></li>');
                }
            }
            this.acInfoTitle.text(this.options[0].msg);
        },
        _event:function(){
            var that = this;
            this.imgFlagId.find('li').on('click',function(){  
                that.currentIndex = $(this).index(); 
                if(!$(this).hasClass('current-img')){
                    $(this).parent().find('li').removeClass('current-li');
                    $(this).addClass('current-li');

                    $(this).parent().find('li').removeClass('current-img');
                    $(this).addClass('current-img');

                    that.imgBox.animate({marginLeft:'-'+that.currentIndex*660+'px'});
                    that.acInfoTitle.text(that.options[that.currentIndex].msg);
                }
            });
            this.imgFlagId.find('li').on('mouseover',function(){  
                that.currentIndex = $(this).index(); 
                if(!$(this).hasClass('current-li')){
                    $(this).addClass('current-li');
                }
            });
            this.imgFlagId.find('li').on('mouseout',function(){  
                that.currentIndex = $(this).index(); 
                $(this).removeClass('current-li');
            });

            $('#startVoice').on('click',function(){
                openM();startM();
            });
            $('#playVoice').on('click',function(){
                backM();
            });

            this.closeBtn.on('click',function(){
                stopSound();
                that.closeFn();
            });

        },
        closeFn:function(){
           this.acVoiceBox.hide();
        },
        playSwfFn:function(){
            var that = this;
            //播放  配音
            $('#startPlay').click(function(){
                that.imgFlagId.find('li').each(function(index){
                    if($(this).hasClass('current-img')){
                        that.currentMp3 = index;
                    }
                });
                playSound(that.options[that.currentMp3].mp3);
                
            });
            
            
        }
    };
    new acVoiceFn(acVoicePics);
    
});


var playCurrentTime = 0;
function onSoundPaused(currentTime){    //通知JS，声音已经暂停
    playCurrentTime = currentTime;
}
function onSoundPlayEnd(argv){  //通知JS声音播放完毕
    playCurrentTime = 0;

}
/*  swf音频播放  Start  */
function playSound(mp3_addr){
    document.getElementById('b2splay').playSound(mp3_addr,playCurrentTime);
}
function stopSound(){
    document.getElementById('b2splay').stopSound();
}
/*  swf音频播放  End  */

 var randomPlay = Math.random();
$("#mp3Box").append(
        '<object type="application/x-shockwave-flash" id="b2splay" name="mp3main" align="middle" data="/static/js/html/project/ac_voice_share/b2splay.swf?rnd='+randomPlay+ '" width="1px" height="1px">'+
        '<param name="disState" value="0">'+
        '<param name="movie" value="/static/js/html/project/ac_voice_share/b2splay.swf?rnd='+randomPlay+ '"/>'+
        '<param name="quality" value="high">'+
        '<param name="bgcolor" value="#ffffff">'+
        '<param name="allowscriptaccess" value="sameDomain">'+
        '<param name="allowfullscreen" value="false">'+
        '<param name="wmode" value="transparent">'+
        '</object>'
);



 seajs.use('/static/js/html/project/ac_voice_share/swfobject');




//配音，重播

   


function uploadEnd(argv){   //通知JS，音频上传的结果状态   right=成功  error=上传过程中失败  MP3EncodeError=MP3编码时失败
        alert(argv);
    }
    function recodeComplete(argv){  //通知JS，录制完毕  complete=完成
        alert('录制成功');
        playVoiceFn()
    }
    function showTips(argv){    //给JS发一个字符串提示信息，JS需要直接打印这条信息
        alert(argv);
      playVoiceFn();
    }   
    function playBackComplete(argv){    //通知js回放完毕   complete=完成
        alert('回放成功');
    }
    function initComplete(){
        document.getElementById('FlashID_1').setUploadInfo('http://www.t.com/upload.php' , 'luyin.mp3' , 5);
    }
    


    
    function openM(){
        document.getElementById('FlashID_1').openMic();
    }
    function startM(){
        document.getElementById('FlashID_1').startRecode();
    }
    function backM(){
        document.getElementById('FlashID_1').startPlayBack();
    }
    
    function uploadM(){
        document.getElementById('FlashID_1').startUpload();
    }

    //显示回放按钮
    function playVoiceFn(){
        $('#playVoice').show();
        $('#voiceBtn').show();
    }

var random = Math.random();

$("#flashswf").html(
    '<object type="application/x-shockwave-flash" id="FlashID_1" name="mp3main" align="middle" data="/static/js/html/project/ac_voice_share/b2srecod.swf?rnd='+random+ '" width="324px" height="224px">'+
    '<param name="disState" value="0">'+
    '<param name="movie" value="/static/js/html/project/ac_voice_share/b2srecod.swf?rnd='+random+ '"/>'+
    '<param name="quality" value="high">'+
    '<param name="bgcolor" value="#ffffff">'+
    '<param name="allowscriptaccess" value="sameDomain">'+
    '<param name="allowfullscreen" value="true">'+
    '<param name="wmode" value="transparent">'+
    '</object>'
);



