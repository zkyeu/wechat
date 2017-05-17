define("editImgCut", [], function(require,exports,module){

	var Sys = (function(ua){ 
	    var s = {}; 
	    s.IE = ua.match(/msie ([\d.]+)/)?true:false; 
	    s.Firefox = ua.match(/firefox\/([\d.]+)/)?true:false; 
	    s.Chrome = ua.match(/chrome\/([\d.]+)/)?true:false; 
	    s.IE6 = (s.IE&&([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6))?true:false; 
	    s.IE7 = (s.IE&&([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 7))?true:false; 
	    s.IE8 = (s.IE&&([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 8))?true:false; 
	    return s; 
	})(navigator.userAgent.toLowerCase());

	var $ = function (id) { 
	    return document.getElementById(id); 
	};

	var Css = function(e,o){ 
	    for(var i in o) 
	    e.style[i] = o[i]; 
	};

	var Extend = function(destination, source) { 
	    for (var property in source) { 
	        destination[property] = source[property]; 
	    } 
	};

	var Bind = function(object, fun) { 
	    var args = Array.prototype.slice.call(arguments).slice(2); 
	    return function() { 
	        return fun.apply(object, args); 
	    } 
	};

	var BindAsEventListener = function(object, fun) { 
	    var args = Array.prototype.slice.call(arguments).slice(2); 
	    return function(event) { 
	        return fun.apply(object, [event || window.event].concat(args)); 
	    } 
	};

	var CurrentStyle = function(element){ 
	    return element.currentStyle || document.defaultView.getComputedStyle(element, null); 
	};

	function addListener(element,e,fn){ 
	    element.addEventListener?element.addEventListener(e,fn,false):element.attachEvent("on" + e,fn); 
	}; 
	function removeListener(element,e,fn){ 
	    element.removeEventListener?element.removeEventListener(e,fn,false):element.detachEvent("on" + e,fn) 
	};

	var Class = function(properties){ 
	    var _class = function(){return (arguments[0] !== null && this.initialize && typeof(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;}; 
	    _class.prototype = properties; 
	    return _class; 
	};
// style="height:100px; width:100px; border:1px solid #000000; position:absolute; left:200px; top:200px;" 
	var getDom = function(id){
		return '<div id="'+ id +'">\
					<div id="rRightDown"></div>\
					<div id="rLeftDown"></div>\
					<div id="rRightUp"></div>\
					<div id="rLeftUp"></div>\
					<div id="rRight"></div>\
					<div id="rLeft"></div>\
					<div id="rUp"></div>\
					<div id="rDown"></div>\
				</div>'
	}

	var isLimit = function(){
		var paintCon = jQuery("#paintCon");
		var resizeWrap = jQuery("#resizeWrap");
	}

	var Resize =new Class({ 
	    initialize : function(obj){ 
	        this.obj = obj; 
	        this.resizeelm = null; 
	        this.fun = null; //记录触发什么事件的索引 
	        this.original = []; //记录开始状态的数组 
	        this.width = null; 
	        this.height = null; 
	        this.fR = BindAsEventListener(this,this.resize); 
	        this.fS = Bind(this,this.stop);     
	    }, 
	    set : function(elm,direction){ 
	        if(!elm)return; 
	        this.resizeelm = elm; 
	        addListener(this.resizeelm,'mousedown',BindAsEventListener(this, this.start, this[direction])); 
	        return this; 
	    }, 
	    start : function(e,fun){ 
	        this.fun = fun; 
	        this.original = [parseInt(CurrentStyle(this.obj).width),parseInt(CurrentStyle(this.obj).height),parseInt(CurrentStyle(this.obj).left),parseInt(CurrentStyle(this.obj).top)];
	        this.width = (this.original[2]||0) + this.original[0]; 
	        this.height = (this.original[3]||0) + this.original[1]; 
	        addListener(document,"mousemove",this.fR); 
	        addListener(document,'mouseup',this.fS); 
	    }, 
	    resize : function(e){ 
	        this.fun(e); 
	        Sys.IE?(this.resizeelm.onlosecapture=function(){this.fS()}):(this.resizeelm.onblur=function(){this.fS()}) 
	    }, 
	    stop : function(){ 
	        removeListener(document, "mousemove", this.fR); 
	        removeListener(document, "mousemove", this.fS);
	        //window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();     
	    }, 
	    up : function(e){
	    	if(e.clientY + parseInt(jQuery("#resizeWrap").css("borderWidth")) < jQuery("#paintCon").offset().top) return;
	    	if(this.height>e.clientY){
	    		Css(this.obj, {
	    			top:e.clientY + "px",
	    			height:this.height-e.clientY + "px"
	    		});
	    	}
	        // this.height>e.clientY?Css(this.obj,{top:e.clientY + "px",height:this.height-e.clientY + "px"}):this.turnDown(e); 
	    }, 
	    down : function(e){
	    	if(e.clientY > jQuery("#paintCon").offset().top + jQuery("#paintCon").height() - parseInt(jQuery("#resizeWrap").css("borderWidth"))) return;
	    	if(e.clientY>this.original[3]){
	    		Css(this.obj, {
	    			top:this.original[3]+'px',
	    			height:e.clientY-this.original[3]+'px'
	    		});
	    	}
	        // e.clientY>this.original[3]?Css(this.obj,{top:this.original[3]+'px',height:e.clientY-this.original[3]+'px'}):this.turnUp(e);     
	    }, 
	    left : function(e){
	    	if(e.clientX < jQuery("#paintCon").offset().left - parseInt(jQuery("#resizeWrap").css("borderWidth"))) return;
	    	if(e.clientX<this.width){
	    		Css(this.obj, {
	    			left:e.clientX +'px',
	    			width:this.width-e.clientX + "px"
	    		});
	    	}
	        // e.clientX<this.width?Css(this.obj,{left:e.clientX +'px',width:this.width-e.clientX + "px"}):this.turnRight(e);         
	    }, 
	    right : function(e){
	    	if(e.clientX > jQuery("#paintCon").offset().left + jQuery("#paintCon").width() - parseInt(jQuery("#resizeWrap").css("borderWidth"))) return;
	    	if(e.clientX>this.original[2]){
	    		Css(this.obj, {
	    			left:this.original[2]+'px',
	    			width:e.clientX-this.original[2]+"px"
	    		});
	    	}
	        // e.clientX>this.original[2]?Css(this.obj,{left:this.original[2]+'px',width:e.clientX-this.original[2]+"px"}):this.turnLeft(e)    ; 
	    }, 
	    leftUp:function(e){ 
	        this.up(e);this.left(e); 
	    }, 
	    leftDown:function(e){ 
	        this.left(e);this.down(e); 
	    }, 
	    rightUp:function(e){ 
	        this.up(e);this.right(e); 
	    }, 
	    rightDown:function(e){ 
	        this.right(e);this.down(e); 
	    },                 
	    turnDown : function(e){ 
	        Css(this.obj,{top:this.height+'px',height:e.clientY - this.height + 'px'}); 
	    }, 
	    turnUp : function(e){ 
	        Css(this.obj,{top : e.clientY +'px',height : this.original[3] - e.clientY +'px'}); 
	    }, 
	    turnRight : function(e){ 
	        Css(this.obj,{left:this.width+'px',width:e.clientX- this.width +'px'}); 
	    }, 
	    turnLeft : function(e){ 
	        Css(this.obj,{left:e.clientX +'px',width:this.original[2]-e.clientX+'px'});          
	    }         
	});

	return {
		init : function(obj){
			var id = obj.id;
			var resizeWrap = $(id);
			if(resizeWrap){
				obj.beforeInit && obj.beforeInit(resizeWrap);
				return;
			}
			var dom = getDom(id);
			obj.container.innerHTML = dom;
			resizeWrap = $(id);
			obj.beforeInit && obj.beforeInit(resizeWrap);
			new Resize(resizeWrap)
				.set($('rUp'),'up')
				.set($('rDown'),'down')
				.set($('rLeft'),'left')
				.set($('rRight'),'right')
				.set($('rLeftUp'),'leftUp')
				.set($('rLeftDown'),'leftDown')
				.set($('rRightDown'),'rightDown')
				.set($('rRightUp'),'rightUp');
		}
	}
});