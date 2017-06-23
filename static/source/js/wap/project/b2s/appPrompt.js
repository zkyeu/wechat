define(function(require, exports, module) {

    ;
    (function() {
        
        window.appPrompt = function(obj){
            var defaults = {
                    "class" : "",
                    "id" : "",
                    "setTimeout" : 2000,
                    "text" : "请重试",
                    "cb" : null
                };
            var _obj = $.extend({},defaults,obj);
            var _dom = null;
            if(!_dom){
                _dom = $('<div class="appPrompt '+_obj.class+'" id="'+_obj.id+'"><span>'+_obj.text+'</span></div>');
                _dom.appendTo('body');
            }
            _dom.css('display', 'blcok');
            setTimeout(function(){
                _dom.css('display', 'none');
                if(_obj.cb){
                    _obj.cb();
                }
            },_obj.setTimeout)
        }
        // appPrompt({"text":"啊啊啊啊啊","class":"aaa","cb":function(){alert(123)}});

        

    })();

});
