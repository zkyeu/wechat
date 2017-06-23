define("acstuReadTips",["utility"],function(require,exports,module){
	var utility = require("utility"),
 	    cookie = utility.cookieFn;
 	    /*acsoundPlay = require("acsoundPlay"),
 	    playEnd = null,
		playReady = function(callback){
	    	var	timmer = window.setInterval(function(){
 	    		if(typeof ($("#acplay")[0].playSound) != "undefined" ){
 	    			clearInterval(timmer);
 	    			typeof(callback) == "function" && callback();
 	    		}
 	    	},500);
 	    }
 	    acsoundPlay.getGlobal(function(){
 	    	typeof(playEnd) == "function" && playEnd();
 	    });*/
	// 老师发题说明

	;(function(){
		var tips = $(".ac-tem-tips-inner");
		if(!tips[0]) return;
		tips.showScroll();
	})();
		
	var lisen = $(".lisen"),
		load = $(".load"),
		read = $(".read"),
		excellent = $(".excellent"),
		time1 = $(".time1"),
		time2 = $(".time2"),
		cb = function(callback,t){
			window.setTimeout(function(){
				(typeof(callback) == "function") && callback();
			},t||3000);
		},
		istea = $(".ac-tea-read-demo").length > 0;

	lisen.fadeIn(function(){
		cb(function(){
			lisen.fadeOut(function(){
				load.fadeIn(function(){
					time1.fadeIn(function(){
						cb(function(){
							time1.fadeOut(function(){
								cb(function(){
									time2.fadeIn(function(){
										utility.deftime({
											start : 3,
											startFn : function(r){
												time2.text(r);
											},
											targetFn : function(r){
												time2.fadeOut(function(){
													startDemo();
												});
											}
										});
									});
								},300);
							});							
						},300);
					});
				});
			});
		});
	});

	function startDemo(){
		cb(function(){
			load.fadeOut(function(){
				read.fadeIn(function(){
					cb(function(){
						read.fadeOut(function(){
							excellent.fadeIn(function(){
								cb(function(){
									if(istea) return;

									var skip = $(".skip");
									utility.deftime({
										start : 5,
										startFn : function(r){
											skip.html('<em style="color:#ee4e1e;font-style:normal;">'+r+'</em>秒后跳过');
										},
										targetFn : function(){
											window.location.assign(skip.attr("href"));
										}
									});
								});
							});
						});
					});
				});
			});			
		},300);
	}

/*	lisen.fadeIn("normal",function(){
		playReady(function(){
			playEnd = function(){
				lisen.fadeOut("normal",function(){
					load.fadeIn("normal",function(){
						window.setTimeout(function(){
							time1.fadeIn(function(){
								window.setTimeout(function(){
									time1.fadeOut(function(){
										time2.fadeIn(function(){

											utility.deftime({
												start : 3,
												startFn : function(r){
													time2.text(r);
												},
												targetFn : function(r){
													time2.fadeOut(function(){
														startDemo();
													});
												}
											});

										});
									});
								},600);
							});
						},300);							
						
					});
				});
			}
			acsoundPlay.playSound(lisen.attr("data-audio"));
		});
	});

	function startDemo(){
		playEnd = function(){
			playEnd = function(){
				load.fadeOut("normal",function(){
					read.fadeIn("normal",function(){
						playEnd = function(){
							read.fadeOut("normal",function(){
								excellent.fadeIn("normal",function(){

									setTimeout(function(){
										// excellent.fadeOut("normal");
										var skip = $(".skip");
										utility.deftime({
											start : 5,
											startFn : function(r){
												skip.html('<em style="color:#ee4e1e;font-style:normal;">'+r+'</em>秒后跳过');
											},
											targetFn : function(){
												window.location.assign(skip.attr("href"));
											}
										});
									},1000);

								});
							});
						}
						acsoundPlay.playSound(read.attr("data-audio"));
					});
				});
			}
			acsoundPlay.playSound(time2.attr("data-audio"));
		}
		acsoundPlay.playSound(time1.attr("data-audio"));
	}*/

	$(".notip").on("click",function(){
		cookie.set($("[name=cookieName]").val(),1,1000);
		window.location.assign($(".skip").attr("href"));
	});

	
})