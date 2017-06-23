define("payPage",[""],function(require,exports,module){
    var payPageFn = function(){
    	this.tableId = $('#tableId');
        this.priceId = $('#priceId');
        this.discountPrice = $('#discountPrice');
        this.moneyValue = $('#moneyValue');
        this.preferentialId = $('#preferentialId');
        this.optionId = $('#optionId');
        this.boutiqueClass = $('#boutiqueClass');
        this.payValueId = $('#payValueId');
        this.packageId = $('#packageId');
        this.payId = $('#payId');
        this.b2spackage = $('#b2spackage');
        this.preferentialBox = $(".preferential-box");
        this.isChosen = false;
        this.isZS = false;
        this._init();
    	this._event();

    };
    payPageFn.prototype = {
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
                if($(this).hasClass('n-chose')){
                    $(this).removeClass('n-chose');
                    that.isChosen = true;
                    that.preferentialBox.removeClass('preferential-box-chosen');
                    // $(this).closest(".pre-text-box").next().find(".pre-value").show();
                }else{
                    if(!that.isZS){
                        $(this).addClass('n-chose');
                        that.isChosen = false;
                        that.preferentialBox.addClass('preferential-box-chosen');
                        // $(this).closest(".pre-text-box").next().find(".pre-value").hide();                         
                    }
                }
                that.resultFn();
            });
    		this.tableId.find('.option-i').closest('td').on('click',function(){
                var $optionSpan = $(this).find('.option-i');
	    		if(!$optionSpan.hasClass('current')){
	    			that.tableId.find('.option-i').removeClass('current');
	    			$optionSpan.addClass('current');
                    that.priceId.val($optionSpan.attr('data-price'));
                    that.discountPrice.val($optionSpan.attr('discount-price'));
                    that.moneyValue.text($optionSpan.attr('data-price')+'元');
                    that.preferentialId.text('-'+that.discountPrice.val()+'元');
	    		    that.packageId.val($optionSpan.attr('package-id'));
                    if(that.optionId.size()>0){
                        // 特殊处理
                        if($optionSpan.attr("zs") == 1){
                            that.isZS = true;
                            that.optionId.removeClass('n-chose');
                            that.preferentialBox.removeClass('preferential-box-chosen');
                            that.preferentialBox.addClass("preferential-box-t");
                            that.discountPrice.val(that.boutiqueClass.attr('data-price'));
                        }else{
                            that.isZS = false;
                            that.preferentialBox[(that.isChosen ? "remove" : "add") + "Class"]('preferential-box-chosen');
                            that.optionId[(that.isChosen ? "remove" : "add") + "Class"]("n-chose");
                            that.preferentialBox.removeClass("preferential-box-t");
                        }
                        that.resultFn();
                    }else{
                        that.resultFn1();
                    }
                }
	    	});
            this.payId.on('click',function(){
                if(that.optionId.size()>0){
                    if(that.optionId.hasClass('n-chose')){
                        that.b2sPpackageValue = 0;
                    }else{
                        that.b2sPpackageValue = that.b2spackage.val();
                    }
                }else{
                    that.b2sPpackageValue = that.b2spackage.val();
                }
                window.location.href="/pay/pay?package_id="+that.packageId.val()+"&b2s_package_id="+that.b2sPpackageValue+"&has_1v1=1";
            });
    	},
        resultFn:function(){
            if(this.optionId.hasClass('n-chose')){
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
    new payPageFn();
});