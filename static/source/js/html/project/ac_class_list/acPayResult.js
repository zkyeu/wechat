define("acPayResult",[],function(require,exports,module){
    var acPayResultFn = function(){
        this.closeBtn = $('#closeBtn');
        this.payResult = $('#payResult');
        this._event();
    };
    acPayResultFn.prototype = {
        _event:function(){
            var that = this;
            this.closeBtn.on('click',function(){
                that.payResult.hide();
            });
        }
        
        
    };
    new acPayResultFn();
});