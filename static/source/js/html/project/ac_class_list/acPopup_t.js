define("acPopup_t",[],function(require,exports,module){
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
        this.nVipBox = $('#nVipBox');
        this.vipId = $('#vipId');
        this.moneyValueVip = $('#moneyValueVip');
        this.preferentialIdVip = $('#preferentialIdVip');
        this.vipUser = $('#vipUser');
        this.vipPackage = $('#vipPackage');
        this._event();
        this._init();
    };
    acPopupFn.prototype = {
        _init:function(){
            //初始化数据
            if(this.vipPackage.val() == '0'){
                this.vipId.hide();
                this.nVipBox.show();
                this.resultFn2();
           }else{
                this.vipId.show();
                this.nVipBox.hide();
                this.resultFn1();
           }
           $('.ac-main-r').show();
           
            this.moneyValue.text(this.priceId.val()+'元');
            this.preferentialId.text('-'+this.discountPrice.val()+'元');
        },
        _event:function(){
            var that = this;
            this.acBox.on('click','#optionId',function(){
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
                if(that.vipUser.val() == '1'){
                    that.resultFn1();
                }else{
                    that.resultFn2();
                }
                
            });
            

            this.tableId.find('.chose-i').on('click',function(){
                var $span = $(this).find("span");
                if(!$span.hasClass('current')){
                    that.tableId.find('span').removeClass('current')
                    $span.addClass('current');
                    
                    
                    if($span.attr('isVip') == 1){
                        that.nVipBox.hide();
                        that.vipId.show();
                    }else{
                        that.nVipBox.show();
                        that.vipId.hide();
                    }
                    if($span.attr('isVip') == 1){
                        that.priceId.val($span.attr('data-price'));
                        that.discountPrice.val($span.attr('discount-price'));
                        that.moneyValueVip.text($span.attr('data-price')+'元');
                        that.preferentialIdVip.text('-'+that.discountPrice.val()+'元');
                        that.packageId.val($span.attr('package-id'));
                        that.resultFn();
                    }else{
                        that.priceId.val($span.attr('data-price'));
                        that.discountPrice.val($span.attr('discount-price'));
                        that.moneyValue.text($span.attr('data-price')+'元');
                        that.preferentialId.text('-'+that.discountPrice.val()+'元');
                        that.packageId.val($span.attr('package-id'));

                        that.resultFn1();
                    }
                    
                }
            });
            this.closeBtn.on('click',function(){
                that.acBox.hide();
            });
        },
        resultFn:function(){
            if(this.vipUser.val() == '1'){
                this.payValue = this.priceId.val();
            }else{
                this.priceValue = Number(this.priceId.val());
                this.boutClassValue = Number(this.boutiqueClass.attr('data-price'));
                this.discountPriceV = Number(this.discountPrice.val());
              
                this.payValue = this.priceValue - this.discountPriceV;
            }
            this.payValueId.text(this.payValue+'元');
        },
        resultFn1:function(){
            this.priceValue = Number(this.priceId.val());
            // if(this.optionId.hasClass('option-i') == true){
            //     this.payValueId.text(this.priceValue+'元');
            // }else{
                this.discountPriceV = Number(this.discountPrice.val());
               // this.boutClassValue = Number(this.boutiqueClass.attr('data-price'));
                this.payValue = this.priceValue - this.discountPriceV;
                this.payValueId.text(this.payValue+'元');
           // } 
        },
        resultFn2:function(){
            this.priceValue = Number(this.priceId.val());
             if(this.optionId.hasClass('option-i') == true){
                 this.payValueId.text(this.priceValue+'元');
             }else{
                this.discountPriceV = Number(this.discountPrice.val());
                this.boutClassValue = Number(this.boutiqueClass.attr('data-price'));
                this.payValue = this.priceValue - this.discountPriceV;
                this.payValueId.text(this.payValue+'元');
            } 
        }  

    };
    new acPopupFn();
});