define("class_info",[""],function(require,exports,module){
    var classInfo = function(){
        this.tabId = $('#tabId');
        this.classArr = ['c-matter','c-notice','c-record'];
        this._event();
    };
    classInfo.prototype = {
        _event:function(){
            var that = this;
            this.tabId.find('a').on('click',function(){
                if(!$(this).hasClass('current')){
                    that.cClass = that.classArr[$(this).index()];
                    $.each(that.tabId.find('a'),function(i){
                        that.rClass = that.classArr[i];
                        $(this).removeClass('current').removeClass(that.rClass);
                    });
                    $(this).addClass('current '+ that.cClass);
                }
            });
        }
    };
    new classInfo();
});