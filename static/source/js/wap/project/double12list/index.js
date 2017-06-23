
define(function(require,exports){
    $(function(){
        function Engine(){
            this.config = {
                screenW: screen.width,
                screenH: screen.height,
                winW:    $('body').width(),
                winH:    $('body').height(),
                tipH:    $('#tipBox').height()
            }
            this.el = {
                $close:  $('#close'),
                $mask:   $('#mask'),
                $tipBox: $('#tipBox'),
                $rule:   $('#rule'),
                $coupon: $('#applyCoupon'),
                $apply:  $('#applyBox'),
                $get:    $('#getBox')
            }
            this.init();
        }

        $.extend(Engine.prototype, {
            init: function(){
                this.bindEvents();

            },
            bindEvents: function(){
                this.el.$mask.on('tap',$.proxy(this.hideTip,this));
                this.el.$close.on('tap',$.proxy(this.hideTip,this));
                this.el.$rule.on('tap',$.proxy(this.showTip,this));
                this.el.$coupon.on('tap',$.proxy(this.applyCoupon,this));
                
            },
            hideTip: function(){
                this.el.$mask.hide();
                this.el.$tipBox.hide();
            },
            showTip: function(){
                this.el.$mask.show();
                this.el.$tipBox.show();
            },
            applyCoupon: function(){
                var self = this;
                $.ajax({
                    url: '/landing/getcash',
                    data: {id:20},
                    type: 'POST',
                    dataType:'json',
                    success: function(rs){
                        self.showCoupon(rs);
                    }
                })
            },
            showCoupon: function(rs){
                if(rs.status==1){
                    this.el.$apply.remove();
                    if(rs.data.money){
                        this.el.$get.show().find('.money').each(function(){
                            $(this).html(rs.data.money);
                        })
                    }
                }else{
                    alert(rs.info);
                }
            }

        })

        new Engine();
    })
})
