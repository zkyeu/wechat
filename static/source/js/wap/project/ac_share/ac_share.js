
// var acWapSharePics = [{
//             pic:'http://172.16.3.97:3000/images/wap/ac_share/img_02.png',
//             msg:'Hi ! Friends ! I went to the woods before.',
//             mp3:'http://172.16.3.65:3000/images/html/ac_voice_share/horse.mp3'
//         },
//         {
//             pic:'http://172.16.3.97:3000/images/wap/ac_share/img_02.png',
//             msg:'Hi ! Friends ! I went to the woods before.1111',
//             mp3:'http://172.16.3.97:3000/images/html/ac_voice_share/horse.mp3'
//         },
//         {
//             pic:'http://172.16.3.97:3000/images/wap/ac_share/img_02.png',
//             msg:'Hi ! Friends ! I went to the woods before.222',
//             mp3:'http://172.16.3.97:3000/images/html/ac_voice_share/horse.mp3'
//         }
//     ];
(function(){
    var AcShareFn = function(){
        this.shareList = $('#shareList');
        this.acVideoMask = $('#acVideoMask');
        this.acVideoBtn = $('#acVideoBtn');
        this.audioNum = 0;
        this._init();
        this._event();
    };

    AcShareFn.prototype = {
        _init:function(){
            this.picsNum = acWapSharePics.length;
            this.windowWidth = $(window).width();
            //初始化图片list
           
            this.shareList.css('width',this.windowWidth*this.picsNum+'px');
          
            for(var i=0; i< this.picsNum; i++){
                this.shareList.append('<li><img src="'+ acWapSharePics[i].pic+'"><span>'+ acWapSharePics[i].msg +'</span></li>'); 
            }
            this.shareList.find('li').css('width',this.windowWidth);
            this.acVideoMask.css('width',this.windowWidth);
            this.acVideoMask.css('height',(this.windowWidth*422)/750);
           

            for(var i=0; i<this.picsNum; i++){
                var audio = document.createElement("audio");
                audio.setAttribute("id", "audioId"+i);
                audio.src = acWapSharePics[i].mp3;
                document.body.appendChild(audio);
            };
        },
        _event:function(){
            var that = this;
            this.acVideoBtn.on('touchend',function(){
                that.acVideoMask.hide();
                if(!$(this).hasClass('ac-voide-replay')){
                    $(this).addClass('ac-voide-replay');
                }
                that.playFn(0);
            });

           

        },
        playFn:function(n){
            var that = this;
            if (n >= this.picsNum) {
                this.acVideoMask.show();
                return;
            }
            if (document.getElementById('audioId'+n)) {
                if (n != 0) {
                    document.getElementById('audioId'+n).play();
                    document.getElementById('audioId'+n).addEventListener('ended', function(){
                        that.playFn(n+1);
                        that.moveFn(n+1);
                    });
                    
                } else {
                    document.getElementById('audioId0').play();
                    document.getElementById('audioId0').addEventListener('ended', function(){
                        that.playFn(1);
                        that.moveFn(1);
                    });
                    
                }
            }
        },
        moveFn:function(n){
            if(n<this.picsNum){
                this.shareList.animate({'-webkit-transform':"translate(-"+ this.windowWidth*n +"px)"},300);
            }else{
                this.shareList.css('-webkit-transform','translate(0,0)');
               
            }        
        }
    };
    new AcShareFn();
})();