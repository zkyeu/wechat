/**
 * @authors wanghuihui@51talk.com
 */
define("aboutClassSuccess",[""],function(require,exports,module){
    var sureBtn = $('#sure_btn');
    sureBtn.on('touchend',function(){
        wx.closeWindow();
    });
});
