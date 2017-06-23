define("north_america", ['common'], function(require, exports, module) {
	require("common/common");
	//图片轮播
	var LightBox =  function(options){
		 $.extend(this,{
			id:"#linghtbox",
			interval:2000,//时间间隔
		},options);
		 this.father = $(this.id);
		 this.numLi = this.father.find(".list-li li");
		 this.father.find(".lunbo img").clone().addClass("clone").appendTo(this.father.find(".box-card"));
		 this.total = this.father.find(".lunbo img").length;
		 this.page = 1 ;
		 this.stop = null;
		 this.box = this.father.find(".box-card");
		 this.prevBtn = this.father.find(".btn-l");
		 this.nextBtn = this.father.find(".btn-r")


	}
	LightBox.prototype ={
		init:function(){
			this.scrollPic();
			this.box.css({width:(this.total)*800+"px"})
			this.bindEvents();

		},
		scrollPic:function(){
			var self =this;
			this.stop=setInterval(function(){
				self.next();
			},3500)
		},
		next:function(){
				if(this.page == this.total-1){
					if(!this.box.is(":animated")){
						var self =  this;
						self.numLi.removeClass('selected').eq((self.total/2)-1).addClass('selected');
						this.box.animate({marginLeft: -(this.total-1)*800},2000, function() {
							self.box.css("marginLeft",-(self.total/2-1)*800);
							self.page = self.total/2;
							
						});
					}	
				}else{
					if(!this.box.is(":animated")){
						this.page++;
						var self = this;
						self.numLi.removeClass('selected').eq(self.page%(self.total/2)-1).addClass('selected');
						self.box.animate({marginLeft: -(self.page-1)*800},2000, function() {	
							
						});
					}	
				}
		},
		prev:function(){
			var self = this;
			if(this.page == 1){

				if(!this.box.is(":animated")){
					this.box.css("marginLeft",-(this.total/2)*800);
					this.box.animate({marginLeft: -(this.total/2-1)*800},2000, function() {	
						self.page = self.total/2;
						self.numLi.removeClass('selected').eq(self.page-1).addClass('selected');
					});
				}	
			}else{
				if(!this.box.is(":animated")){
					this.page--;
					this.box.animate({marginLeft: -(self.page-1)*800},2000, function() {
						self.numLi.removeClass('selected').eq(self.page%(self.total/2)-1).addClass('selected');
					});
				}		
			}
		},
		stopPlay:function(){
			this.box.stop(true,true);
			clearInterval(this.stop);
		},
		setCur:function(cur){
			this.page = cur;
			var self = this;
			self.numLi.removeClass('selected').eq(self.page%(self.total/2)-1).addClass('selected');
						self.box.css({marginLeft: 0});
		},
		bindEvents:function(){
			var self =this;
			this.prevBtn.click(function(){
				clearInterval(this.stop);
				self.prev();
				self.stop = setInterval(function(){
					self.next();
				},3500)
			});
			this.nextBtn.click(function(){
				clearInterval(this.stop);
				self.next();
				self.stop =  setInterval(function(){
					self.next();
				},3500)
			});

			this.numLi.hover(function(){
				clearInterval(this.stop);
			},function(){
				this.stop = setInterval(function(){
					self.next();
				},3500)
			}).click(function(event) {
				var num = self.page%self.total;
				var _thisIndex = $(this).index()+1;
				if(!self.box.is(":animated")){
					self.box.css("marginLeft",-(num%self.total-1)*800);
					self.box.animate({marginLeft: -(_thisIndex-1)*800},1000, function() {	
						self.numLi.removeClass('selected').eq(_thisIndex-1).addClass('selected');
						return self.page = _thisIndex;
					});
				}	
			});
		
		}
	}
	var lightBoxes = {};
	var lightBox1 = new  LightBox({
		id:"#light-box1"
	});
	lightBox1.init();
	lightBoxes['light-box1'] = lightBox1;

	$(".tabs li").click(function(){
		var prevEle = $(".tabs li").filter(".selected");
		var preLight = lightBoxes[prevEle.data("tag")];
		preLight.stopPlay();
		preLight.setCur(1);
		$(this).addClass("selected").siblings().removeClass("selected");
		var id = $(this).data("tag");
		if(!lightBoxes[id]){
			var lightBox = new  LightBox({
				id:"#"+id
			});
			lightBox.init();
			lightBoxes[id] = lightBox;
		}else{
			lightBoxes[id].init();
		}
		
		var index = $(".tabs li").index($(this));
		$(".tabs .slide").css({"left":index*141+"px"})
		$(".content-item").hide().eq(index).show();

	});

	$(".content-item .more").click(function(){
		$(this).prev().hide().end().next().show().end().hide();
	});
		/*tab切换*/
		$(".f_btn li").hover(function(){
		 		var index=$(this).index();
		 		$(".f_content li").eq(index).show().siblings().hide(); 
		 		$(this).addClass("hover").siblings().removeClass("hover");
		 });
	  /*视频播放*/
    if($(".cls-top").attr("data-vedio")){
      $(".cls-top .video_play").attr({
        "data-vedioSrc":$(".cls-top").attr("data-vedio"),
        "data-width":$(".cls-top").attr("data-width"),
        "data-height":$(".cls-top").attr("data-height"),
        //视频来源地址
        "data-source":$(".cls-top").attr("data-source")
      }).show();
    }else{
      $(".cls-top .video_play").hide();
    }
    $("[data-vedioSrc]").on("click",function(){
        var oBtn=$(this);
        var src=oBtn.attr("data-vedioSrc");
        console.log(src);
        var width=oBtn.attr("data-width") || 800;
        var height=oBtn.attr("data-height") || 450;
        //视频来源地址
        var source=oBtn.attr("data-source") || "";
        $("#j-mask").show();
        if(!src)return;
        if($("#ckplayerDialog").length==0){
            $("body").append(
                  '<div id="ckplayerDialog">'+
                        '<a class="close" href="javascript:;"></a>'+
                        '<a class="source"></a>'+
                        '<div id="playerContent"></div>'+
                      '</div>'+
                  '<div id="j-mask"></div>'
            );
            $("#ckplayerDialog").find('.close').add('#j-mask').on("click",function(){
              $("#ckplayerDialog").hide();
              $("#j-mask").hide();
            });
          }
          CKobject.embed(
              src,
              'playerContent',
              'ckplayer_playerContent',
              width,
              height,
              false,
              {f: src, c: 0, b: 1, p: 1},
              [src],
              {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
          );
          $("#ckplayerDialog").css({
            "display":"block",
            "width":width,
            "height":height,
          }).find(".source").html(source); 
          return false;
      });
 /*教师*/
 			$(".teachers").find("li").hover(function(){
 					 $(this).find(".mask").stop(true).animate({
 					 	"bottom":"0",
 					 },600);
 			},function(){
 					$(this).find(".mask").stop(true).animate({
 					 	"bottom":"-278px",
 					 },600);

 			});


})