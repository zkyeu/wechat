define(function(require,exports,module){ 
	  /*获取用户id*/
	   var oSign=$("#signOne").attr("data");	
	  /*登录*/
	  $(".login").on("click",function(){
	  	var oPhone=$(".l_phone").val();
	  	var oPwd=$(".l_pwd").val();
	  	var oPhoneReg=/^1[0-9]{10}$/;
	  	var oPwdReg=/^([\w\+\!\@\#\$\%\^\&\*\(\)]{6,20})$/;
	  	var oNickName=$(".nickname").attr("data");
	  	var oHeadimgurl=$(".headimgurl").attr("src");
	  	var openid=$("#signOne").attr("data");
	  	if( !oPhone.trim() ) {
	  			alert("请填写手机号码！");
	  			return false;
	  	}
	  	if( !oPhoneReg.test(oPhone) ) {
	  			alert("请填写正确的手机号码！");
	  			return false ;
	  	}
	  	if( !oPwd.trim() ) {
	  			alert("请填写密码！");
	  			return false ;
	  	}
	  	if( !oPwdReg.test(oPwd) ) {
	  			alert("密码为6-20位字母数字组合");
	  			return false ;
	  	}else {
	  	$.ajax({
	  				url:'/Ajax/landingLogin',
	  				type:"post",
	  				async: false,
			 			dataType:"json",
			 			data:{
			 				mobile:oPhone,
			 				password:oPwd,
			 				type:$("#type1").val(),
			 				nickname:oNickName,
			 				headimgurl:oHeadimgurl,
			 				openid:openid
			 			},
			 			success : function(res){ 
			 					if(res.status==1){
			 						$(".bform,.bmask").animate({display:'none'});
	 							  $(".videoPart").show();
	 							   window.location=res.data+'?v='+(new Date().getTime());
	 							   return false;
	 							}
	 							if(res.status==0){
	 									alert(res.info);
	 									window.location=res.data+'?v='+(new Date().getTime());
	 									return false;
	 							}
			 			}
	  		});
	  	}
	  });
    /*分享砍价*/
		 $(".shareMask").on("click",function(){ 
		 		$(".b_share").css("display","block");
		 });

	  /*分享浮层*/ 
		 $(".b_share").on("click",function(){ 
		 		$(".b_share").css("display","none");
		 });

	 /*活动规则*/
	 $(".gameRule").on("click",function(){
	 		$(".barginDetail,.bmask").animate({display:"block"});
	 		$(".videoPart").hide();
	 });
	 $(".b_close,.bmask").on("click",function(){
	 		$(".bmask").hide();
	 		$(".barginDetail").hide();
	 		$(".videoPart").show();
	 });
	  /*继续砍价灰*/
		var bs=$(".barginGoBuy").attr("data");
		if( bs=="barginGoBuy" ){
				$(".pause").removeClass().addClass("pause");
				return false;
		}
	 /*开始砍价*/ 
	 $(".formLogin").on("click",function(){ 
	 		var oSign=$("#signOne").attr("data");
	 		$.ajax({
	 			url:"/Ajax/isLoginBargain",
	 			type:"post",
	 			async: false,
	 			dataType:"json",
	 			data:{
	 				openid:oSign
	 			},
	 			success : function(res){
	 					if(res.status==1){ 
	 							 $(".b_share").css("display","block");
							   $(".bmask").css("display","none");
	 					}
	 					if(res.status==0){
	 							$(".bform,.bmask").animate({display:'block'});
	 							$(".videoPart").hide();
	 					}
	 			} 
	 		});
	 });
	 $(".bmask,.b_close").on("click",function(){
	 		$(".bform,.bmask").animate({display:'none'});
	 		$(".videoPart").show();
	 });

	 
	 /*不砍了直接买*/
	 $(".goBuy").on("click",function(){
	 		$(".barginOver,.bmask").animate({display:'block'});
	 		$(".videoPart").hide();
	 });
	 $(".bmask,.b_close").on("click",function(){
	 		$(".barginOver,.bmask").animate({display:'none'});
	 		$(".videoPart").show();
	 });
	 
	  /*成功帮砍*/
	 $(".barginHelp_mask").on("click",function(){
	 		$(".barginHelp_mask,.barginHelp").animate({display:"none"});
	 		$(".videoPart").show();
	 		location.reload(); 
	 });
	 $(".barginHelp .b_close").on("click",function(){
 			$(".barginHelp_mask,.barginHelp").animate({display:"none"});
 		  $(".videoPart").show();
 		  location.reload();
	 });
  
	var EndTime;
	 /*距离开砍时间*/
	 $.ajax({
	 		url:"/Ajax/getTime",
		  	type:"post",
		  	async: false,
		  	dataType: "json",
	  	  success: function(res){
              if(res.status==1){ 
              		var NowTime = res.data; 
              		var arr = NowTime.split(' ');
							    var year = arr[0].replace(/-/g,'/');
							    NowTime = year + ' '+arr[1];
                 	var EndTime11= new Date('2016/12/24 23:59:59'); //报名结束时间 
									var EndTime12= new Date('2016/12/25 23:59:59'); //活动截止时间
									var NowTime = new Date(NowTime); 

              	var oTimer=setInterval(function(){

											NowTime =NowTime.getTime();
											NowTime+=1000;
											NowTime=new Date(NowTime);
											
										var NowTimeDate=NowTime.getDate(); 
										var EndTime11Date=EndTime11.getDate(); 
										var EndTime12Date=EndTime12.getDate(); 
							 
										if(NowTimeDate<=EndTime11Date){  
											EndTime = EndTime11;
										}else if(NowTimeDate>=EndTime12Date){  
											EndTime = EndTime12;
										} else {
											EndTime = EndTime12;
										}
 								
   
										var t = EndTime.getTime() - NowTime.getTime(); 
										var d=Math.floor(t/1000/60/60/24); 
										var h=Math.floor(t/1000/60/60%24); 
										var m=Math.floor(t/1000/60%60); 
										var s=Math.floor(t/1000%60);

										if(d<10 && d>=0) {
												d="0"+d;
										}
										if(h<10 && d>=0) {
												h="0"+h;
										}
										if(m<10 && d>=0) {
												m="0"+m;
										}
										if(s<10 && d>=0) {
												s="0"+s;
										}
										$(".t_d").html(d); 
										$(".t_h").html(h); 
										$(".t_m").html(m); 
										$(".t_s").html(s);
										var oTd=parseInt($(".t_d").html());
										var oTh=parseInt($(".t_h").html());
										var oTm=parseInt($(".t_m").html());
										var oTs=parseInt($(".t_s").html()); 
										
										if(oTd<=0 && oTh<=0 && oTm<=0 && oTs<=0){ 
											    $(".t_d").html("00"); 
													$(".t_h").html("00"); 
													$(".t_m").html("00"); 
													$(".t_s").html("00");  
													if(NowTimeDate>=EndTime12Date) { 
															clearInterval(oTimer);
													} 
												
										} 

              	},1000);
              			  
              }  //结束

        }
	 });


		/*帮砍列表*/
		// setInterval(function(){
		// 		var oLast=$(".lists").find(".list").last().removeClass("last");
		// 		$(".lists").find(".list").first().before(oLast);
		// 		$(".lists").find(".list").last().addClass("last");
		// },1000);

		var oListHeight=$(".listBar").height()*6;
		var oListsHeight=$(".lists").height();
		if(oListsHeight>=oListHeight){
				$(".lists").addClass("listsOver").css("height", oListHeight );
		} 

		/*砍价人员列表*/
		$(".lists").find(".list").last().addClass("last");
		
		/*砍价进度*/
		var oWidth=parseInt($(".b_goal").attr("data-width"));
		var oNewWidth= Math.ceil(((15399-oWidth)/15399)*100)+"%";
		 $(".b_btnPrice").find(".s2").html("已砍至：¥"+oWidth);
		 $(".b_goal").animate({width:oNewWidth},1500);

	!function(){
	 	/*分享*/
		var wx_tit="51Talk 美国小学在家上，半年课程等你拿!";
		var	wx_des="呼朋唤友来51，一起砍价学美小，双十二，半年课程巨大优惠等你拿！";
		var	wx_img="http://static.51talk.com/static/images/wap/bargain/barginShare.jpg";
		var	wx_link=$("#share_url").attr("data");
		  $.ajax({
		  	url:"/Ajax/smallBeauty",
		  	type:"post",
		  	async: false,
		  	dataType: "json",
		  	success:function(res){ 
		  				  wx.config({
							    debug: false, 
							    appId: res.data.appId, 
							    timestamp:res.data.timestamp , 
							    nonceStr: res.data.nonceStr, 
							    signature: res.data.signature,
							    jsApiList: ['checkJsApi',
							                'onMenuShareTimeline',
							                'onMenuShareAppMessage',
							                'onMenuShareQQ',
							                'onMenuShareWeibo',
							                'hideMenuItems',
							                'showMenuItems',
							                'hideAllNonBaseMenuItem',
							                'showAllNonBaseMenuItem',
							                'openCard'] 
							    });

	  				  	  wx.ready(function () {
	                    wx.onMenuShareAppMessage({
	                      title: wx_tit,
	                      desc: wx_des,
	                      link: wx_link,
	                      imgUrl: wx_img
	                    });
	                   	wx.onMenuShareQQ({
	                       title: wx_tit,
		                      desc: wx_des,
		                      link: wx_link,
		                      imgUrl: wx_img
	                    });
	                    wx.onMenuShareTimeline({
	                       title: wx_tit,
	                       desc: wx_des,
	                       link: wx_link,
	                       imgUrl: wx_img
	                   }); 
	                });
		  	}

		  }); 

	 }();
		
   /*我要参与*/   
   $(".goIndex").on("click",function(){
   		 window.location.href="/SmallBeautyBargain/bargainIndex";
   });
   /*活动结束*/
	  var bgo=$(".bgOver").attr("data");
		if( bgo=="bgOver" ){
				$(".pause,.continue").remove();
				return false;
		}
	/*帮TA砍一刀*/
			 $(".noBargin").on("click",function(){ 
			 	 var openid=$("#open_id").attr("data");
			 	 var friendId=$("#friend_id").attr("data");
			 		$.ajax({
			 				url:"/Ajax/bargainFriend",
				 			type:"post",
				 			async: false,
				 			dataType:"json",
				 			data:{
				 				open_id:openid,
				 				friend_id:friendId
				 			},
				 			success : function(res){
				 					if(res.status==1){  
			 								$(".barginHelp_mask,.barginHelp").animate({display:"block"});
		 									$(".videoPart").hide();
		 									return false;
				 					}
				 					if(res.status==0){
				 							alert(res.info);
				 							return false;
				 					}
				 			}

			 		});
			 		return false;
			 });
   
});