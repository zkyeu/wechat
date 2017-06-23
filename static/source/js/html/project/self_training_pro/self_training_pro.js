$(function(){
var l_sideBar_data=[{
		title:"For Admins",
		child:[{
			title:"Self-pace Module",
			child:null
		},{
			title:"Training Masters’ Page"
		}]
	},{
		title:"teachers's Mypage",
		child:[{
			title:"Training Guide",
			child:[{
				title:"Training Videos",
				child:[{
					title:"Training Videos",
					child:null
				}]
			},{
				title:"Reading Materials",
				child:null
			},{
				title:"Booking Trainings",
				child:[{
					title:"Completed",
					child:null
				}]
			}]
		},{
			title:"Book my training",
			child:null
		}]
	},{
		title:"My Training Schedule",
		child:null
	}];

	$(".content_title>ul>li").on("click",function(){
		var idx=$(this).index();
		$(".content_title>ul>li").removeClass("current");
		$(this).addClass("current");
		$(".content_detail>div").removeClass("show");
		$(".content_detail>div").eq(idx).addClass("show");
	});
	//当前的选项介绍
	$(".sm_qs").on("click",function(){
		new popWin({
			wrap:"1.Only actic videos will be viable in teacher”s mypage<br/>2.The sequence of the videos and quizes mypage will be<br/>anged with the way you set here",
			title:"Notice",
			closeBtnText:"cancel",
			confirBtnText:"Submit",
			colorStyle:"#ff8200",
			size:{
				width:520,
				height:240
			},
			datastatus:"2",
			callback:function(){alert(1)},
			callConfir:function(){alert(2)}
		})
	});
	//添加教材
	$("[action-type='addMaterials']").on("click",function(){
		$(".add_Mate").removeClass("hide");
	});	
	$("[action-type='close_popUp_1,.cancel']").on("click",function(){
		$(".add_Mate").addClass("hide");
	});	
	//添加教材
	$("[action-type='addVideos']").on("click",function(){
		$(".add_Vid").removeClass("hide");
	});
	$("[action-type='close_popUp_2'],.cancel").on("click",function(){
		$(".add_Vid").addClass("hide");
	});		
	//edit_quiz屏幕100%

	$('.addedit').height($(window).height()-10);
})