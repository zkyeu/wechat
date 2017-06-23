define(function(require,exports){
    $(function(){
       /*评价页面绑定事件*/
       var evaEv = require('m_s_evaluate');
       evaEv('my-s-evaluate');

       $('#my-h-r').click(function(){
           $('#my-s-tips,#my-s-mask').show();
       })

       $('#my-s-tips .close').click(function(){
           $('#my-s-tips,#my-s-mask').hide();
       }) 
    })
});
