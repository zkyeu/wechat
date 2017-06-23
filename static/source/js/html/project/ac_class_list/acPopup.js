define("acPopup",[],function(require,exports,module){
    var acPopupFn = function(){
        this.optionId = $('#optionId');
        this.tableId = $('#tableId');
        this.closeBtn = $('#closeBtn');
        this.acBox = $('#acBox');
        this.preferentialId = $('#preferentialId');
        this.priceId = $('#priceId')
        this.discountPrice = $('#discountPrice');
        this.payValue = $('#payValue');
        this.boutiqueClass = $('#boutiqueClass');
        this.payValueId = $('#payValueId');
        this.moneyValue = $('#moneyValue');
        this.packageId = $('#packageId');
        this.buyB2s = $("#buyB2s");
        this.payMoney = $(".pay-money");
        this.isChosen = false;
        this.isZS = false;
        this._event();
        this._init();
    };
    acPopupFn.prototype = {
        _init:function(){
            //初始化数据
            if(this.optionId.size() > 0){
                this.resultFn();
            }else{
                this.resultFn1();
            }
            this.moneyValue.text(this.priceId.val()+'元');
            this.preferentialId.text('-'+this.discountPrice.val()+'元');
        },
        _event:function(){
            var that = this;
            this.optionId.on('click',function(){
                if($(this).hasClass('option-i')){
                    $(this).removeClass('option-i');
                    that.buyB2s.val('1');
                    that.isChosen = true;
                    that.payMoney.removeClass('pay-money-chosen');
                    // $(this).parent().next().find("span").css({"display":"inline"});
                }else{
                    if(!that.isZS){
                        $(this).addClass('option-i');
                        that.buyB2s.val('0');
                        that.isChosen = false;
                        that.payMoney.addClass('pay-money-chosen');
                        // $(this).parent().next().find("span").css({"display":"none"});
                    }
                }
                that.resultFn();
            });
            

            this.tableId.find('.chose-i').on('click',function(){
                var $span = $(this).find("span");
                if(!$span.hasClass('current')){
                    that.tableId.find('span').removeClass('current')
                    $span.addClass('current');
                    that.priceId.val($span.attr('data-price'));
                    that.discountPrice.val($span.attr('discount-price'));
                    that.moneyValue.text($span.attr('data-price')+'元');
                    that.preferentialId.text('-'+that.discountPrice.val()+'元');
                    that.packageId.val($span.attr('package-id'));
                    if(that.optionId.size()>0){
                        // 特殊处理
                        if($span.attr("zs") == 1){
                            that.isZS = true;
                            that.optionId.removeClass('option-i');
                            that.payMoney.removeClass('pay-money-chosen');
                            that.payMoney.addClass("pay-money-t");
                            that.discountPrice.val(that.boutiqueClass.attr('data-price'));
                        }else{
                            that.isZS = false;
                            that.payMoney[(that.isChosen ? "remove" : "add") + "Class"]('pay-money-chosen');
                            that.optionId[(that.isChosen ? "remove" : "add") + "Class"]("option-i");
                            that.payMoney.removeClass("pay-money-t");
                        }
                        that.resultFn();
                    }else{
                        that.resultFn1();
                    }
                }
            });
            this.closeBtn.on('click',function(){
                that.acBox.hide();
            });
        },
        resultFn:function(){
            if(this.optionId.hasClass('option-i')){
                this.payValue = this.priceId.val();
            }else{
                this.priceValue = Number(this.priceId.val());
                this.boutClassValue = Number(this.boutiqueClass.attr('data-price'));
                this.discountPriceV = Number(this.discountPrice.val());
                this.payValue = this.priceValue + this.boutClassValue - this.discountPriceV;
            }
            this.payValueId.text(this.payValue+'元');
        },
        resultFn1:function(){
            this.priceValue = Number(this.priceId.val());
            this.discountPriceV = Number(this.discountPrice.val());
            this.payValue = this.priceValue - this.discountPriceV;
            this.payValueId.text(this.payValue+'元');
        } 
    };
    new acPopupFn();
});