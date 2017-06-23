define(function(require,exports,module){
	/*倒计时*/
    function getRTime(){
        var EndTime= new Date(t_time);  
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();
        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
 				if(h<10){
 						h="0"+h;
 				}
 				if(m<10){
						m="0"+m;
 				}
 				if(d<10){
 						d="0"+d;
 				}
 				 
        $("#hour").html(h);
        $("#minute").html(m);
        $("#day").html(d);
 
    }
    getRTime();
 	
	  /*进入教室*/
		  /*显示倒计时*/
		  function showCount(){
		  		$(".last").addClass("lastVisted");
		  		$(".firstone").hide();
		  		$(".middle").show();
		  }

		  $(".last").on("click",function(){
		  	  var EndTime= new Date(t_time);  
		      var NowTime = new Date();
		      var t = NowTime.getTime()-EndTime.getTime();
		  	  if(t+60*60*1000<0){
		  	  		//灰
  	  				var gayTip='<div class="w_gay">'+
															'<a href="javscript:;" class="w_gay_tip">开课前1个小时进入教室哦~</a>'+
													'</div>';
							var footer=$("footer");
							var gayTip=$(gayTip);
							gayTip.insertAfter(footer);

					    //灰色提示弹窗
						   function hideGay(){
						   		 $(".w_gay").fadeIn();
						   		 $(".w_gay").remove();
						   }
							 function search(){
							 	 
							 		 var oLen=$(".w_gay_tip").length;
							 		 if(oLen>=1){
						 		 			clearInterval(oTimer);
						 		 		  var clearTimer=setTimeout(hideGay(),1000);	
							 		 }	 
							 }
							 var oTimer=setInterval(search,2500);					
		  	  		return false;
		  	  } else {    //亮
		  	  	  var JumpSrc=$(this).attr("data-href");
		  	  		window.location.href=JumpSrc;
		  	  		return false;
		  	  }
		  });
	

	  /*分享*/
	  $(".w_share").on("click",function(){
	  			$(".w_mask").removeClass("hide").addClass("w_maskShow");
	  });
	  $(".w_mask").on("click",function(){
	  			$(".w_mask").removeClass("w_maskShow").addClass("hide");
	  });
	  /*收藏*/
	   $(".w_collect").on("click",function(){
	  			$(".w_mask_collect").removeClass("hide").addClass("w_mask_collectShow");
	  });
	  $(".w_mask_collect").on("click",function(){
	  			$(".w_mask_collect").removeClass("w_mask_collectShow").addClass("hide");
	  });

	  /*滑动去浮层*/
	  $(window).scroll(function () {
  			$(".w_mask").removeClass("w_maskShow").addClass("hide");
  			$(".w_mask_collect").removeClass("w_mask_collectShow").addClass("hide");
	  });

	  /*昵称*/
	 $(".n_btn").on("click",function(){
		 		var nickVal=$(".n_txt").val();
		 		if (nickVal.replace(/(^\s*)|(\s*$)/g,"")==""){
		 				$(".n_tip").css("display","block");
		 				return false;
	 			}else{
		 				$.ajax({
		      		url:'/Thirdparty/WeixinUser/checkNickname',
		      		type:'post',
		      		dataType:'json',
		      		data:{
		      			nickname:nickVal
		      		},
		      		success : function (data) {
		      				if(data.code==20001) {
		      						$(".n_tip").css("display","inline-block").html("昵称长度为2-20个字符!");
		      						return false;
		      				}else if(data.code==20002){
		      					 	$(".n_tip").css("display","inline-block").html("昵称中含有特殊字符!");
		      					 	return false;
		      				}else if(data.code==20003){
		      						$(".n_tip").css("display","inline-block").html("昵称存在非法字符!");
		      				}else{
		      					  $(".n_tip").hide();
		      					  $("#enterForm").submit();
		      					  return false;
		      				}
		      		}
		      		
		      });
		 			return false;
	 			}

	 });
	 $(".n_txt").focus(function(){
	 		$(".n_tip").css("display","none");
	 });
 
	 /*状态显示*/
	 !function(){ 
		 	var oStatusTimer=setInterval(function(){ 
		 			var EndTime= new Date(t_time);  
		      var NowTime = new Date();
		      var t = NowTime.getTime()-EndTime.getTime();
		      if(t>=-60*1000) {
				  		$(".firstone").show();
				  		$(".middle").hide();
				  		$(".last").addClass("lastVisted");
				  		if(t=-60*1000){
				  				clearInterval(oStatusTimer);
				  		}
				  		return false;
		      }
		      if(t+60*60*1000<0) { 
		      		$(".firstone").hide();
				  		$(".middle").show();
				  		$(".last").removeClass("lastVisted");
				  		return false;
		      }
		      if(t+60*60*1000>0 && t<0 ) { 
		      		$(".firstone").hide();
				  		$(".middle").show();
				  		$(".last").addClass("lastVisted");
				  		return false;
		      }
		 	},1000);	 
	 }();
});