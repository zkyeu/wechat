define("code_manage",[""],function(require, exports, module) {
    var codeManage = function(){
    	this.codeManageId = $('#codeManageId');
    	this.todayContent = $('#todayContent');
    	this.historyContent = $('#historyContent');
    	this.searchId = $('#searchId');
    	this.number = 2;
    	this.flag = true;
    	this._event();
    };
    codeManage.prototype = {
    	_event:function(){
    		var that = this;
    		this.searchId.val('');
    		this.bodyHeight = $('body').height();
    		this.clientHeight = this.codeManageId.get(0).clientHeight;
    		if(this.bodyHeight > this.clientHeight){
    			this.ajaxFn();
    		}
    		$(window).scroll(function() {
    			that.clientHeight = that.codeManageId.get(0).clientHeight;
	    		that.scrollTopHeight = $(window).scrollTop();
	    		that.scrollHeight = that.bodyHeight + that.scrollTopHeight;
	    		if(that.clientHeight <= that.scrollHeight){
	    			that.ajaxFn();
	    		}
	  		});
	  		this.searchId.on('input',function(){
	  			var self =  $(this);
	  			clearTimeout(timer);
	  			var timer = setTimeout(function(){
	  				that.searchFn(self);
	  			},300);

	  		});
    		
    	},
    	searchFn:function(self){
    		var that = this;
    		this.isSearChFlag = false;
			if(self.val() != ''){
				this.isSearChFlag = true;
				$.ajax({
					url:"/wapagent/ajaxGetQrcode",
					type:"get",
					data:{
						name: encodeURI(self.val())
					},
					dataType:"json",
					success:function(data){
						if(data.data.pager.pageCount == 1){
							that.flag = false;
						}
						if(data.status == 1){
							if(data.data.today != ''){
								var res = data.data.today;
								var html = that.appendHtmlFn(res);
								that.todayContent.html('').append(html);
							}else{
								that.todayContent.html('<p style="text-align:center;color:red;">未查询到相关群</p>');
							}
							if(data.data.history != ''){
								var res = data.data.history;
								var html = that.appendHtmlFn(res);
								if($('#historyContent').size() > 0){
									$('#historyContent').html('').append(html);
								}else{
									$('.history-box').html('<h2><span class="history-icon"></span>历史</h2>\
        							<ul class="list-ul" id="historyContent">'+ html +'</ul>');
								}
							}else{
								$('#historyContent').html('<p style="text-align:center;color:red;">未查询到相关群</p>');
							}
						}
					}
	  			});
			}else{
				window.location.reload();
			}
    	},
    	ajaxFn:function(){
    		var that = this;
    		if(this.isSearChFlag == true){
    			this.dataObj = {
    				p:this.number,
    				name: encodeURI(this.searchId.val())
    			};
    		}else{
    			this.dataObj = {
    				p:this.number,
    			};
    		}

    		if(this.flag == true){
	    		$.ajax({
					url:"/wapagent/ajaxGetQrcode",
					type:"get",
					data:that.dataObj,
					dataType:"json",
					success:function(data){
						if(data.status == 1){
							if(that.number-1 > data.data.pager.pageCount){
								that.flag = false;
								return false;
							}else{
								that.number++;
							}
							that.flag = false;
							if(data.data.today != ''){
								var res = data.data.today;
								var html = that.appendHtmlFn(res);
								that.todayContent.append(html);
								that.flag = true;
							}
							if(data.data.history != ''){
								var res = data.data.history;
								var html = that.appendHtmlFn(res);
								if($('#historyContent').size() > 0){
									$('#historyContent').append(html);
								}else{
									$('.history-box').html('<h2><span class="history-icon"></span>历史</h2>\
        <ul class="list-ul" id="historyContent">'+ html +'</ul>');
								}
								that.flag = true;
							}
						}
					}
				});
			}
    	},
    	appendHtmlFn:function(res){
    		var that = this;
    		that.html = '';
    		$.each(res,function(i){
				that.html += '<li class="clearfix" data-href="/wapagent/qrcodeDetail?id='+ res[i].id +'" data-not="暂未上传二维码，请稍后再试！" data-overdue="二维码已过期，扫码无法加群！" data-state="'+ res[i].qrcodeStatus +'">\
			                <a href="javascript:;">\
			                    <span class="li-icon"></span>\
			                    <div class="li-text">\
			                        <p>'+ res[i].name +'</p>\
			                        <div>'+ res[i].classes +'</div>\
			                    </div>\
			                    <div class="time-box">'+ res[i].created +'<span></span>\
			                    </div>\
			                </a>\
			            </li>';
			});
			return that.html;
    	}
    };
    new codeManage();
	;(function() {
        $('#codeManageId').on("click", "li", function() {
            var _self = $(this),
                _state = _self.data("state"),
                _href = _self.data("href"),
                _not = _self.data("not"),
                _overdue = _self.data("overdue");
            if(_state==1){
                window.location.href=_href;
            }else if(_state==0){
                $(".dialog-tit").html(_not);
                dialogShow();
            }else if(_state==2){
                $(".dialog-tit").html(_overdue);
                dialogShow();
            }
        });

        $(".dialog-btn").on("click", "", function() {
            dialogClose();
        });

        function dialogShow(){
            $(".dialog-wrap").show();
        }
        function dialogClose(){
            $(".dialog-wrap").hide();
        }

        
    })();
    
});
