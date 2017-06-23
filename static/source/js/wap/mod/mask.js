define('mask', [], function(require, exports, module) {
	/*
	 * 蒙层，覆盖住的元素，给当前元素添加position:relative;dom子元素添加position:absolute;
	 * @author:liya
	 * @constructor mask
	 * @param obj {object} 配置选项
	 * @param obj.el {object} 要遮盖的元素
	 * @param obj.className {string} 蒙层的类名 
	 * @param obj.css {object} 为蒙层添加css
	 * @param obj.unqiue {boolean} 多次实例化返回一个对象
	 */
	function mask(obj) {
		if(!obj.el) {return;}
		this.options = {
			css: {},
			className: 'js_mask',
			unqiue: false 		//一个元素下面只有一个mask
		};
		$.extend(this.options, obj);
		this.options.el = this.el = $(this.options.el);
		if(this.options.unique) {
			if(this.el[0].libMask) {
				return this.el[0].libMask;
			}else{
				this.el[0].libMask = this;
			}
		}
		this.init();
	}
	mask.prototype = {
		init: function() {
			this.orgPosition = this.el.css('position');
			this.create();
			this.bind();
		},
		create: function() {
			var mask = this.options.el.children('.' + this.options.className);
			if(this.options.unique) {
				this.mask = mask.length ? mask : null;
			}
			if(!this.mask) {
				this.mask = $('<div class='+this.options.className+'>').css({
					position:"absolute",
					top:0,
					right:0,
					bottom:0,
					left:0,
					height: document.body.clientHeight || document.documentElement.clientHeight,
					background:"rgba(0,0,0,0.75)"
				}).appendTo(this.options.el);
			};
			this.mask.css(this.options.css);
		},
		show: function() {
			this.el.css({
				position:"relative"
			});
			if(this.mask) {
				this.mask.show();
			}
			return this;
		},
		hide: function() {
			this.el.css({
				position: this.orgPosition
			});
			if(this.mask) {
				this.mask.hide();
			}
			return this;
		},
		remove: function() {
			this.hide();
			if(this.mask) {
				this.mask.remove();
			}
			this.mask = null;
			this.el[0].libMask = null;
			return this;
		},
		bind: function() {
			var self = this;
			if(this.options.click) {
				this.el.find('.' + self.options.className).click(function() {
					self.options.click.call($(this));
				})
			}
		}
	}
	return mask;
})