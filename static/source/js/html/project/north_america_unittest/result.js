define(function(require, exports, module) {
	//require();
    var resultFn = function(){
        this.starId = $('#starId');

        this.jigsawId = $('#jigsawId');
        this.resultFailId = $('#resultFailId');
        this.completId = $('#completId')
        this.completShow = $('#completShow');
        this.failShow = $('#failShow');
        this.resultSureBtn = $('.sure-btn')
        this.jigsawHtml = '';
        this.starHtml = ''


      //  this.playerFn2();
      //  this.playerFn3();
        this.request = this.getRequest();
        this.star = this.request['star']; 
        this._event();
    };
    resultFn.prototype = {
        _event:function(){
            var that = this; 
           //  alert(this.hadGetPuzzle+'=====');
           // this.hadGetPuzzle = this.request['hadGetPuzzle'];
           // this.newGetPuzzle = this.request['newGetPuzzle'];

           //  this.sNewPuzzle = Number(this.hadGetPuzzle)+1;
           //  this.eNewPuzzle = Number(this.hadGetPuzzle)+Number(this.newGetPuzzle);
            
           //  this.jigsawHtmlFn();
           //  this.starId.on('webkitAnimationStart animationstart','.star',function(){
           //      that.setMediaFn2('http://static.51talk.com/upload/efl_audio/prepar/4801cb3d33b40a4188eb88d0e22b00d7_160907f14.mp3');
           // });

           // this.resultSureBtn.on('click',function(){
           //      that.setMediaFn3('http://static.51talk.com/upload/efl_audio/prepar/d8a37797e525673f793e4ecab4f74c80_160907deb.mp3');
           // });

           // if(this.star == 0){
           //      this.playerFailFn();
           //      this.resultFailId.removeClass('hide').addClass('show');
           // }else{
           //      this.playerSuccessFn();
           //      this.starHtmlFn();
           //      this.completId.removeClass('hide').addClass('show');
           // }
        },

        // //渲染拼图
        // jigsawHtmlFn:function(){
        //     for(var i=1; i<=this.hadGetPuzzle; i++){
        //         this.jigsawHtml += '<div class="jigsaw jigsaw-e'+ i +'">\
        //             <span class="exist"></span>\
        //         </div>'
        //     }
            
        //     for(var i=this.sNewPuzzle; i<=this.eNewPuzzle; i++){
        //         this.jigsawHtml += '<div class="jigsaw-hide jigsaw-p'+ i +' jigsaw jigsaw1"></div>'
        //     }
        //     this.jigsawId.html(this.jigsawHtml);
        // },
        // //渲染星星
        // starHtmlFn:function(){
        //     for(var i=1;i<=this.star;i++){
        //         this.starHtml += '<div class="star star'+ i +'">\
        //              <div class="b-star"></div>\
        //              <div class="l-star"></div>\
        //              </div>';
        //     }
        //     this.starId.html(this.starHtml);
        // },
        getRequest:function() { 
            var url = location.search; 
            var theRequest = new Object(); 
            if (url.indexOf("?") != -1) { 
                var str = url.substr(1); 
                strs = str.split("&"); 
                for(var i = 0; i < strs.length; i ++) { 
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
                } 
            } 
            return theRequest; 
        },
        // playerSuccessFn:function(){
        //     $("#starFailPlay").jPlayer({
        //         ready: function (event) {
        //             $(this).jPlayer("setMedia", {
        //                 title: "Bubble",
        //                 mp3: "http://static.51talk.com/upload/efl_audio/prepar/084d147a6d5a06a908c20df848dabb94_16090717f.mp3",
        //                 oga: ""
        //             }).jPlayer("play");
        //         },
        //         ended: function() { 
        //         },
        //         swfPath: "../dist/jplayer",
        //         supplied: "m4a, oga, mp3",
        //         wmode: "window",
        //         useStateClassSkin: true,
        //         autoBlur: false,
        //         smoothPlayBar: true,
        //         keyEnabled: true,
        //         remainingDuration: true,
        //         toggleDuration: true
        //     });
        // },
        
        // playerFailFn:function(){
        //     $("#starPlay").jPlayer({
        //         ready: function (event) {
        //             $(this).jPlayer("setMedia", {
        //                 title: "Bubble",
        //                 mp3: "http://static.51talk.com/upload/efl_audio/prepar/500f1595b19674194d83633504156318_160907e5e.mp3",
        //                 oga: ""
        //             }).jPlayer("play");
        //         },
        //         ended: function() { 
        //         },
        //         swfPath: "../dist/jplayer",
        //         supplied: "m4a, oga, mp3",
        //         wmode: "window",
        //         useStateClassSkin: true,
        //         autoBlur: false,
        //         smoothPlayBar: true,
        //         keyEnabled: true,
        //         remainingDuration: true,
        //         toggleDuration: true
        //     });
        // },
       

        playerFn2:function(){
            var dtd = $.Deferred();
            $("#resultPlay").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        mp3: ""
                    });
                    dtd.resolve();
                },
                ended: function() { 
                },
                swfPath: "../dist/jplayer",
                supplied: "m4a, oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });
            return dtd;
        },
        //设置音频
        setMediaFn2:function(value){

            $("#resultPlay").jPlayer("setMedia", {
                mp3: value
            }).jPlayer("play");
        },
        playerFn3:function(){
            $("#resultClickPlay").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        mp3: ""
                    });
                },
                ended: function() { 
                },
                swfPath: "../dist/jplayer",
                supplied: "m4a, oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });
        },
        //设置音频
        setMediaFn3:function(value){

            $("#resultClickPlay").jPlayer("setMedia", {
                mp3: value
            }).jPlayer("play");
        }
	};
	new resultFn();

});
console.log(333);



