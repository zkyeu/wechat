$(function(){
	var event_page=1,
	press_page=1,
	func={};
	var first_banner_num=0;
	var first_banner_lens=$(".banner>ol>li").length;
	//events列表
	func.event_list=function (){
		/*var testData={
			"code": 0, //状态码，0-成功，10103-缺少参数或参数无效，20001-请求成功但无数据
			"message": "ok", //对就code的描述
			"res": { //返回结果，非0时为空
				"list": [{//文章列表
					"post_id": 1, //文章id
					"channel": "news_event", //文章分类
					"thumb": "/images/html/www_ph/news/d_topImg.jpg", //缩略图
					"headline": "The Daily Tribune: 51Talk takes online teaching to a whole new level", //标题
					"subheading": "", //副标题
					"description": "The Daily Tribune has posted an article online, The article puts on how beneficial the", //描述
					"video_path": "", //视频地址
					"city": "Laguna,Luzon", //城市
					"create_at": "today", //时间
					"author": "Amanda", //作者
					"experience": "<span>2,500</span>minutes of teaching,<span>1,000</span>lessons" //教学经验
				},{
					"post_id": 2,
					"channel": "news_event",
					"thumb": "/images/html/www_ph/testimonials/teacher_s_1.jpg",
					"headline": "The Daily Tribune: 51Talk takes online teaching to a whole new level",
					"subheading": "",
					"description": "The Daily Tribune has posted an article online, The article puts on how beneficial the",
					"video_path": "",
					"city": "Laguna,Luzon",
					"create_at": "today",
					"author": "Amanda",
					"experience": "<span>2,500</span>minutes of teaching,<span>1,000</span>lessons"
				}],
				"next_page": 2 //下一页页码
			}
		};*/
		var event_Data=null,//数据集
		init_num=0,//等分每一条dom的数字
		list_wrap_1=$("div.events>ul").eq(0),
		list_wrap_2=$("div.events>ul").eq(1);
		this.create_one=function(idx){
			var data=event_Data.res.list;
			var d=data[idx];
			var imgPath=d.thumb,
			title=d.headline,
			dec=d.description,
			author=d.author,
			date=d.create_at,
			v_src=d.video_path,
			p_id=d.post_id;
			var one='<li>';
			if(imgPath){
				one+='<div class="t"><img src='+imgPath+'></div>';
			}
		    	one+='<div class="b">'+
		              '<p class="f"><a href="/mypage/phweb/page/detail?channel=news_event&pid='+p_id+'">'+title+'</a></p>'+
		              '<p class="s">'+dec+'</p>'+
		              '<div class="bb clearfix"><a  class="read_more" href=/mypage/phweb/page/detail?channel=news_event&pid='+p_id+'>Read More</a><span>by '+author+' · '+date+'</span></div>'+
		            '</div>'+
		         '</li>';
	         return one;
		};
		
		this.append=function(parent_ele){
			var _this=this;
			parent_ele.append(_this.create_one(init_num));
			init_num++;
		};
		this.falls_list=function(){
			var list_lens=event_Data.res.list.length
			if(init_num>list_lens-1)return;//添加完了，跳出

			if(list_wrap_1.height()>list_wrap_2.height()){//添加一个
				this.append(list_wrap_2);
			}else if(list_wrap_2.height()>list_wrap_1.height()){
				this.append(list_wrap_1);
			}

			if(init_num<=list_lens-1){//没添加完，继续添加
				this.falls_list();
			}
		};
		this.ajax=function(callback){
			var _this=this;
			$.ajax({
				url:BASE_URL +"/phweb/page/ajaxGetPostsList",
				data:{
					p:event_page,
					channel:"news_event"
				},
				type:"GET",
				success:function(d){
					if(d&&d.code==0){
						event_Data=d;
						if(event_Data.res.page_count==1){
							$("a[action-type=load_events]").hide()
						}
						if(callback)callback();	
					}
					
				}
			});	
		};
		this.hide_add_btn=function(){
			try{
				if(event_page>=event_Data.res.page_count){
				$("[action-type=load_events]").hide();
				}
				event_page++;
			}catch(e){
				console.log(e)
			}
		}
		this.event_init=function(){
			var _this=this;
			this.ajax(function(){
				if(event_Data){
					_this.hide_add_btn();
					_this.append(list_wrap_1);
					_this.falls_list();
				}else{
					//list_wrap_1.append()
					alert('暂无数据')
				}
			})
			
		};
		this.event_init();
	};
	func.press_list=function (){
		/*var testData={
			"code": 0, //状态码，0-成功，10103-缺少参数或参数无效，20001-请求成功但无数据
			"message": "ok", //对就code的描述
			"res": { //返回结果，非0时为空
				"list": [{//文章列表
					"post_id": 1, //文章id
					"channel": "news_event", //文章分类
					"thumb": "/images/html/www_ph/news/d_topImg.jpg", //缩略图
					"headline": "The Daily Tribune: 51Talk takes online teaching to a whole new level", //标题
					"subheading": "", //副标题
					"description": "The Daily Tribune has posted an article online, The article puts on how beneficial the", //描述
					"video_path": "", //视频地址
					"city": "Laguna,Luzon", //城市
					"create_at": "today", //时间
					"author": "Amanda", //作者
					"experience": "<span>2,500</span>minutes of teaching,<span>1,000</span>lessons" //教学经验
				},{
					"post_id": 2,
					"channel": "news_event",
					"thumb": "/images/html/www_ph/testimonials/teacher_s_1.jpg",
					"headline": "The Daily Tribune: 51Talk takes online teaching to a whole new level",
					"subheading": "",
					"description": "The Daily Tribune has posted an article online, The article puts on how beneficial the",
					"video_path": "",
					"city": "Laguna,Luzon",
					"create_at": "today",
					"author": "Amanda",
					"experience": "<span>2,500</span>minutes of teaching,<span>1,000</span>lessons"
				}],
				"next_page": 2 //下一页页码
			}
		};*/
		var press_data=null;
		this.create_list=function(){
			var data_list=press_data.res.list;
			var lists="";
			for(var i=0;i<data_list.length;i++){
				lists+=
				'<li>'+
		            '<div><img src='+data_list[i].thumb+'>'+
		              '<p><a target="_blank" href="'+data_list[i].url+'">'+data_list[i].headline+'</a></p>'+
		            '</div>'+
		            '<p>'+data_list[i].description+'</p><a target="_blank" class="r_more" href="'+data_list[i].url+'">Read More</a>'+
		         '</li>'
			};
			$("div.press>ul").append(lists);
		};
		this.ajax=function(callback){
			var _this=this;
			$.ajax({
				url:BASE_URL+"/phweb/page/ajaxGetPostsList",
				data:{
					p:press_page,
					channel:"news_press"
				},
				type:"GET",
				success:function(d){
					if(d&&d.code==0){
						press_data=d;
						if(callback)callback();
					}
					
				}
			});	
		};
		this.hide_add_btn=function(){
			try{
				if(press_page>=press_data.res.page_count){
					$("[action-type=load_press]").hide();
				}
				press_page++;
			}catch(e){
				console.log(e);
			}
			
		}
		this.press_init=function(){
			var _this=this;
			this.ajax(function(){
				if(press_data){
					console.log("callback");
					_this.hide_add_btn();
					_this.create_list();
				}else{
					alert('暂无数据');
				}	
			})
			
		}
		this.press_init();
	}

	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		currentClass:"current",
		current_page:"news"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		current_page:"teach"
	});
	if(first_banner_lens>1){
		//顶部轮播
		new slide({
			slideEles:".banner>ul",
			slideType:"fade",
			callback:function(){
				first_banner_num++;
				if(first_banner_num>(first_banner_lens-1)){
					first_banner_num=0
				};
				$(".banner>ol>li").removeClass("current");
				$(".banner>ol>li").eq(first_banner_num).addClass("current");

			}
		});	
	}
	

	//news页面 tab切换
	new hover({
		el:".twinkle_line_n_t",
		h_el:".n_t>ul",
		current_page:"teach",
		currentClass:"current",
		click_opt:true,
		complicate:2
	});
	$(".n_t").find("li").on("click",function(){
		var idx=$(this).index();
		if(idx==2)return;
		$(this).siblings().removeClass("current");
		$(this).addClass('current');
		$(".f_n_1>dd>div").removeClass("show");
		$(".f_n_1>dd>div").eq(idx).addClass("show");
	});
	//events列表加载
	func.event_list();
	$('[action-type=load_events]').on("click",function(){
		func.event_list();
	});
	//press列表加载
	func.press_list();
	$("[action-type=load_press]").on('click',function(){
		func.press_list();
	});
})