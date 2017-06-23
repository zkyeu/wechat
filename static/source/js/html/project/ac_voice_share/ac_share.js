/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-12-16 16:10:30
 * @version 1.0.0
 */


/*var acSharePics = [{
            pic:'http://172.16.3.66:3000/images/html/ac_voice_share/img02.jpg',
            msg:'Hi ! Friends ! I went to the woods before.00',
            mp3:'http://172.16.3.66:3000/images/html/ac_voice_share/horse.mp3'
        },
        {
            pic:'http://172.16.3.66:3000/images/html/ac_voice_share/img02.jpg',
            msg:'Hi ! Friends ! I went to the woods before.1111',
            mp3:'http://172.16.3.66:3000/images/html/ac_voice_share/test.mp3'
        },
        {
            pic:'http://172.16.3.66:3000/images/html/ac_voice_share/img02.jpg',
            msg:'Hi ! Friends ! I went to the woods before.222',
            mp3:'http://172.16.3.66:3000/images/html/ac_voice_share/horse.mp3'
        }
    ];*/
define(function(require,exports,module){
    

    var acShareFn = function(options){
        this.options = options;
        this.picNum = options.length;
        this._init();
        this._event();
        this.playSwfFn();
    };
    acShareFn.prototype = {
        _init:function(){
             this.acShareList = $('#acShareList'); 
             this.acShareTitle = $('#acShareTitle');

            this.acShareVideo = $('#acShareVideo');
            this.acSharePlay = $('#acSharePlay');
            this.acShareMask = $('#acShareMask');

            //关闭
            this.closeBtn = $('#closeBtn');
            this.acShareBox = $('#acShareBox');

            this.imgBoxWidth = 550*this.picNum;
            this.acShareList.css('width',this.imgBoxWidth+'px');
            for(var i=0; i<this.picNum; i++){
                this.acShareList.append('<li style="float:left;"><img src="'+ this.options[i].pic +'"></li>');
            }
            this.acShareTitle.text(this.options[0].msg);
        },
        _event:function(){
        	var that = this;
        	this.closeBtn.on('click',function(){
                stopSound();
                that.closeFn();
            });
        },
        closeFn:function(){
        	this.acShareBox.hide();
        },
        playSwfFn:function(){
            var that = this;
           
            
            //分享播放           
            this.acSharePlay.on('click',function(){
            	playFlag = 0;
            	
                    that.acShareMask.addClass('ac-share-mask-hide');
               
                    $(this).removeClass('ac-share-start');
                    if($('#acSharePlay').hasClass('ac-share-replay')){
                         $('#acSharePlay').removeClass('ac-share-replay');
                    }
                	playSound(that.options[0].mp3); 	
            	
            });
           
         

            
        }
    };
    new acShareFn(acSharePics);
    
});


var playCurrentTime = 0;
function onSoundPaused(currentTime){    //通知JS，声音已经暂停
    playCurrentTime = currentTime;
}
var playFlag = 0;
var sharePicsNum = acSharePics.length;
function onSoundPlayEnd(argv){  //通知JS声音播放完毕
	
    playCurrentTime = 0;
    playFlag++;
    
    if(playFlag < sharePicsNum){
    	$('#acShareList').animate({marginLeft:'-'+playFlag*550+'px'});
		playSound(acSharePics[playFlag].mp3);
        $('#acShareTitle').text(acSharePics[playFlag].msg);

    }else{
    	$('#acSharePlay').removeClass('ac-share-start');
	    $('#acSharePlay').addClass('ac-share-replay');
	    $('#acShareMask').removeClass('ac-share-mask-hide');
	    $('#acShareList').css('marginLeft','0px');
		$('#acShareTitle').text(acSharePics[0].msg);
    }
    
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








