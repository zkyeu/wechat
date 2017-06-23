define(function(require,exports,module){
    var autoFn = require("autoadaptation");
    
    new autoFn(function(){
        $(".bottomBox").css("visibility","visible");
    });

    ;(function(){
    	var VerifyFn = function(){
            this.formId = $('[rel="addStudent"],[rel=addTeacher]');
    		this.textareaBox = $('#textareaBox');
            this.hiddeninput = $("[name=textarea]");
            this.config = {
                addStudent : ["请输入学生姓名","请输入正确的学生姓名","^[\\u4e00-\\u9fa5]{2,10}$"],
                addTeacher : ["请输入老师手机号码","请输入正确的老师手机号码","^1[0-9]{10}$"]
            }
    		this._event();
    	};
    	VerifyFn.prototype = {
    		_event:function(){
    			var that = this;
    			that.formId.on('submit',function(e){
                    e.preventDefault();
                    var rel = $(this).attr("rel"),
                        config = that.config[rel],
                        self = this,
                        flag = true,
                        textareaVal = $.trim(that.textareaBox.find('textarea').val());
    				if(textareaVal == ''){
    					$('.error-tips').text(config[0]);
    					$('.error-tips').fadeIn();
    					return false;
    				}
                    
                    
                    var result = [],
    				    textareaArr = textareaVal.split('\n');
                       

                    $.each(textareaArr,function(i,v){
                        var _v = $.trim(v);
                        if(rel == "addStudent") _v = _v.replace(/\s+/g,"");
                        if(new RegExp(config[2],"ig").test(_v)){
                            result.push(_v);
                        }else{
                            flag = false;
                            return false;
                        }
                    });

    				if(flag == true){
                        that.hiddeninput.val(encodeURIComponent(result.join(",")));
                        $('.error-tips').fadeOut();
    					$(self)[0].submit();
    				}else{
    					$('.error-tips').text(config[1]);
    					$('.error-tips').fadeIn();
    				}
    				return false;
    			
    			});

    			
    		}
    	};
    	new VerifyFn();
    })();
});