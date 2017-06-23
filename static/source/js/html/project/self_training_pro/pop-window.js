var popWin=function(options){
			this.options={
				par:"body",//添加至父级
				wrap:"",//说明文字
				title:"",//文字标题
				size:{"width":380,"height":252},//弹框宽高
				layout:"",//多久消失 
				iconImg:"",//弹框图片
				closeBtnText:"",//关闭按钮文字
				confirBtnText:"",//确定按钮
				colorStyle:"#3380ff",//色系
				callback:"",
				callConfir:"",
				datastatus:"2"
			}
			$.extend(this.options,options);
			this.unit();
		};

		popWin.prototype.createDom=function(){
			var screen={w:$(window).width(),h:$(window).height()};
			var opt=this.options,
			domStr="";
			opt.strDom='<div>'
							+'<div style="font-family:Microsoft Yahei;position:absolute;left:0;top:0;width:'+screen.w+'px;height:'+screen.h+'px;background-color:#7a7979;opacity:0.7;filter:alpha(opacity=70);z-index:1">'
							+'</div>'
							+'<div style="background:#fff;position:fixed;box-shadow:0 0 5px #ccc;width:'+opt.size.width+'px;height:'+opt.size.height+'px; font-size:18px;color:#333333;z-index:99999;text-align:center;border-radius:4px" class="app_form">'
								if(opt.iconImg){
									opt.strDom+='<img style="margin-top:20px;width:80px;height:80px;border-radius:50% 50%" src='+opt.iconImg+'>'
								}
							opt.strDom+='<span style="position:absolute;right:20px;top:20px;cursor:pointer;width:16px;height:16px;background:url(http://img.m.duoku.com/cimages/img/19544/19544.png) no-repeat 0 0" class="form_close"></span>'
								if(opt.title){
									opt.strDom+='<h4 style="color:'+opt.colorStyle+';text-align:left;width:440px;margin:0 auto;padding-top:20px;font-weight:bold">'+opt.title+'</h4>'	
								}
							opt.strDom+='<p style="width:440px;margin:0 auto;margin-top:20px;text-align:left;font-size:14px;color:#333333;line-height: 22px;" class="form_wrap">'+opt.wrap+'</p>'
							if(opt.datastatus==1){
								opt.strDom+='<span style="display:block;margin:0 auto;margin-top:20px;width:100px;height:40px;line-height:40px;border-radius:5px;cursor:pointer;background:'+opt.colorStyle+';color:#fff;font-size:14px;text-align:center;" class="form_close">'+opt.closeBtnText+'</span>'
							}else if(opt.datastatus==2){
								opt.strDom+='<span style="float:left;display:block;margin-top:20px;margin-left:25%;width:100px;height:40px;line-height:40px;border-radius:5px;cursor:pointer;background:'+opt.colorStyle+';color:#fff;font-size:14px;text-align:center;" class="form_confir">'+opt.confirBtnText+'</span>'
								+'<span style="float:left;display:block;margin-top:20px;margin-left:10%;width:100px;height:40px;line-height:40px;border-radius:5px;cursor:pointer;background:'+opt.colorStyle+';color:#fff;font-size:14px;text-align:center;" class="form_close">'+opt.closeBtnText+'</span>'
								}
							+'</div>'
						+'</div>';
			$(opt.par).append(opt.strDom);
		};
		popWin.prototype.makeCenter=function(){
			var opt=this.options;
			opt.pos={l:($(window).width()-opt.size.width)/2,t:($(window).height()-opt.size.height)/3};
			$("div.app_form").css({"left":opt.pos.l,"top":opt.pos.t});
		};
		popWin.prototype.clo=function(){
			var opt=this.options;
			$("span.form_close").click(function(){
				$("div.app_form").parent().remove();
				if(opt.callback&&!opt.layout)opt.callback();
			})
			$("span.form_confir").click(function(){
				$("div.app_form").parent().remove();
				if(opt.callConfir&&!opt.layout)opt.callConfir();
			})
			if(!!opt.layout){
				setTimeout(function(){
					$("div.app_form").parent().remove();
					if(opt.callback)opt.callback();
				},opt.layout)	
			}
			
		};
		popWin.prototype.unit=function(){
			this.createDom();
			this.makeCenter();
			this.clo();
		};