/**
 * @authors liyang (liyang@51talk.com)
 * @date    2016-10-19 17:53:30
 * @liyang 1.0.0
 */
define(function(require, exports, module) {
	$(function(){
		function RenderData() {
			this.sceneContainer = $(".g-main").find(".scene-list");
			this.sceneData = sceneData.scene;
			this.levelData = sceneData.level.level_list;
			this.animalImageArray = [];
		}
		$.extend(RenderData.prototype, {
			init: function() {
				this.appendSceneDataBg();
				this.appendUnitData();
			},

			appendSceneDataBg: function() {
				var sceneLength = this.sceneData.length;
				for(var i = 0; i < sceneLength; i++){
					var sceneBgUrl = this.sceneData[i].bg_src,
						sceneChildLength = this.sceneData[i].level.length;
					this.sceneContainer.append('<li>'+'</li>');
					this.sceneContainer.children("li").eq(i).css({background:'url('+sceneBgUrl+') no-repeat'});
					this.sceneContainer.children("li").eq(i).css("backgroundSize","100% auto");
					this.appendSceneChildData(i,sceneChildLength);
				}
			},

			appendSceneChildData: function(index,num) {
				for(var k = 0; k < num; k++){
					var left = this.sceneData[index].level[k].coordinate.x,
						top = this.sceneData[index].level[k].coordinate.y,
						animalImages = this.sceneData[index].level[k].animal.images;			
					this.animalImageArray.push(animalImages);
					this.sceneContainer.children("li").eq(index).append('<div class="unit" data-top = "'+top+'"  data-left = "'+left+'"></div>');
				}
			},

			appendUnitData: function() {
				var levelLength = this.levelData.length;
				for(var j = 0; j < levelLength; j++) {
					var levelStatus = this.levelData[j].status,
						starNum = this.levelData[j].star,
						unit = this.sceneContainer.find(".unit"),
						status = this.adapterLevelStatus(levelStatus);

					this.handleUnitStatus[status](unit,starNum,j,this);
				}
			},

			adapterLevelStatus: function(status) {
				var adapter = {
					'0' : 'lock',
					'1' : 'open',
					'2' : 'on',
					'3' : 'over'
				};

				return adapter[status];
			},

			handleUnitStatus: {
				"lock": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].lock + '" />',
						unitNum = '<h3 class="unitNum">Unit ' + unitNum + '</h3>',
						fence = '<span class="u-fence"></span>';
					unitDom.eq(index).append(unitNum + animalImg + fence);
				},
				"open": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].open + '" />',
						unitNum = '<h3 class="unitNum">Unit ' + unitNum + '</h3>',
						fence = '<span class="u-fence"></span>';
					unitDom.eq(index).append(unitNum + animalImg + fence);
				},
				"on": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].on + '" />',
						unitNum = '<h3 class="unitNum">Unit ' + unitNum + '</h3>',
						fence = '<span class="u-fence"></span>',
						getStars = {
							'0' : '<span class="u-star0"></span>',
							'1' : '<span class="u-star1"></span>',
							'2' : '<span class="u-star2"></span>'
						},
						showStar = getStars[star];
					unitDom.eq(index).append(showStar + unitNum + animalImg + fence);
				},
				"over": function(unitDom,star,index,parentsThis) {
					var unitNum = (index + 1) < 10? ("0"+ (index + 1)): (index + 1),
						animalImg = '<img class="u-animal" src="' + parentsThis.animalImageArray[index].over + '" />',
						unitNum = '<h3 class="unitNum">Unit ' + unitNum + '</h3>',
						showStar = '<span class="u-star3"></span>';
					unitDom.eq(index).append(showStar + unitNum + animalImg);
				}
			}
		})

		function DealStyle() {
			this.container = $(".g-main");
			this.sceneContainer = $(".g-main").find(".scene-list");
			this.scene = $(".g-main").find(".scene-list>li");
			this.units = this.scene.find(".unit");
			this.nextBtn = $(".f-next");
			this.prevBtn = $(".f-prev");
			this.screenWidth = $(window).width();
		}
		$.extend(DealStyle.prototype, {
			init: function() {
				this.sceneStyle();
				this.unitStyle();
				this.buttonStyle();
				$(window).resize($.proxy(this.windowResize, this));
			},

			sceneStyle: function() {
				this.sceneContainer.css({width:20000});
				this.scene.css({width: this.screenWidth, height: "100%", "float": "left"});
			},

			buttonStyle: function() {
				var nextBtnH = 80,
					nextBtnW = 80,
					nextBtnT = 470;
				this.nextBtn.height(nextBtnH* this.screenWidth /1920);
				this.nextBtn.width(nextBtnH* this.screenWidth /1920);
				this.nextBtn.css("top", nextBtnT* this.screenWidth /1920 + "px");
				this.prevBtn.height(nextBtnH* this.screenWidth /1920);
				this.prevBtn.width(nextBtnH* this.screenWidth /1920);
				this.prevBtn.css("top", nextBtnT* this.screenWidth /1920 + "px");
			},

			unitStyle: function() {
				var oThis = this,
					h = 192,
					w = 168;
				this.units.each(function(index,elem){
					var top = $(elem).attr("data-top"),
						left = $(elem).attr("data-left"),
						imgSrc = $(elem).attr("data-src");
					$(elem).css("top" , top* oThis.screenWidth/ 1920+ "px");
					$(elem).css("left" , left+ "%");
					$(elem).height(h* oThis.screenWidth/ 1920);
					$(elem).width(w* oThis.screenWidth/ 1920);
				});
			},

			windowResize: function() {
				this.screenWidth = $(window).width();
				this.sceneStyle();
				this.unitStyle();
				this.buttonStyle();
			}
		})

		function DealOperate() {
			this.sceneNum = 0;
			DealStyle.apply(this, arguments);
		}
		$.extend(DealOperate.prototype, {
			init: function() {
				this.bindEvents();
			},

			bindEvents: function() {
				this.nextBtn.on('click', $.proxy(this.handleChangeScene, "next"));
				this.prevBtn.on('click', $.proxy(this.handleChangeScene, "prev"));
			},

			handleChangeScene: {
				"next" : function() {
					DealStyle.apply(this, arguments);
					this.sceneNum = this.sceneNum + 1;
					this.sceneContainer.animate({marginLeft : -this.sceneNum*this.screenWidth},1000);
					return this.sceneNum;
				},
				"prev" : function() {
					DealStyle.apply(this, arguments);
					this.sceneNum = this.sceneNum - 1;
					this.sceneContainer.animate({marginLeft : -this.sceneNum*this.screenWidth},1000);
					return this.sceneNum;
				} 
			}
		})	

		function Page() {

		}
		$.extend(Page.prototype, {
			init: function() {
				var renderData = new RenderData();
				renderData.init();

				var dealStyle = new DealStyle();
				dealStyle.init();

				var dealOperate = new DealOperate();
				dealOperate.init();
			}
		})
		var page = new Page();
		page.init();
	})
});

