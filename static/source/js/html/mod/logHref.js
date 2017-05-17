define("logHref",[],function(require,exports,module){
    var cookie = require('cookie');
    $(function(){
        var $div = $('<div style="display:none;"></div>');
        $('body').append($div);
      
        $('body').on('mousedown','.__dim__o',function(){
              sendImg(this);
        })

        $('body').on('mouseover','.__dim__v',function(){
              sendImg(this);
        })

        function sendImg(obj){
            var arr = [];
            arr[0] = 'b=' + $(obj).attr('setdata');
            arr[1] = 't=' + (new Date().getTime());
            arr[2] = 'pt=' + $(document).attr('title');
            arr[3] = 'l=' + $(obj).attr('href');
            arr[4] = 'uuid=' + (cookie.getCookie('uuid') || ''); //cookie uuid
            arr[5] = 'visit=' + (cookie.getCookie('visitid') || '');//visitid
            arr[6]='s=' + 1;
            arr[7] = 'tt=' + rnd5();
            var oImg = new Image();
            oImg.src = 'http://behavior.51talk.com/talk.gif?'+ arr.join('&');
            $div.html(oImg);
        }

        // 5Ϊ������
        function rnd5(){
            var str = '';
            for(var i=0;i<5;i++){
                str += parseInt(Math.random()*10);
            }
            return str;
        }
    })
})
