/**
 * @authors wanghuihui@51talk.com
 */
define("myGroup",[""],function(require,exports,module){
    var myGroupFn = function(){
      this.tabId = $('#tabId');
      this.listId = $('#listId');
      this.listBox = $('._list-box');
      this._event();
    };
    myGroupFn.prototype = {
      _event : function(){
        var that = this;
        this.tabId.find('li').on('touchend',function(){
          if(!$(this).hasClass('current')){
            that.tabId.find('li').removeClass('current');
            $(this).addClass('current');
            that.listBox.addClass('hide')
            that.listBox.eq($(this).index()).removeClass('hide');
          }
        });
      }
    };
    new myGroupFn();
    
});
