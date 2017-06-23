$(function(){
	var first_banner_num=0;
	var first_banner_lens=$(".banner>ol>li").length;
	var test_page=1;
	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		currentClass:"current",
		current_page:"test"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		current_page:"teach"
	});
	if(first_banner_lens>1){
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
	
	new slide({
		slideEles:".f4_banner>ul",
		nextBtn:"a.next",
		preBtn:"a.pre",
		slideType:"slide",
		slideAuto:true
	});
	var func={};
	func.test_list=function(){
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
		var testData=null;
		this.ajax=function(callback){
			var _this=this;
			$.ajax({
				url:BASE_URL +"/phweb/page/ajaxGetPostsList",
				data:{
					p:test_page,
					channel:"testimonials"
				},
				type:"GET",
				success:function(d){
					if(d&&d.code==0){
						testData=d;
						if(callback)callback();
					}
					
				}
			});
		};
		this.hide_btn=function(){
			try{
				if(test_page>=testData.res.page_count){
					$("[action-type=load_more]").hide();
				}
				test_page++;
			}catch(e){
				console.log(e);
			}
		}
		this.create_list=function(){
			var list=testData.res.list,
			list_wrap="";
			for(var i=0;i<list.length;i++){
				var n=((i%2==0)&&(i!=0));
				list_wrap+='<li class='+(n?"three_no_m_r":"")+'>'+
			                '<div class="t"><img src='+list[i].thumb+'></div>'+
			                '<div class="b">'+
			                  '<h4>Teacher '+list[i].author+'</h4>'+
			                  '<p class="place">'+list[i].city+'</p>'+
			                  '<p class="detail">'+list[i].experience+'</p>'+
			                  '<p class="words">'+list[i].description+'</p>'+
			                  //2017.1.13 by sxc edit
			                  //'<p class="words">'+list[i].description+'</p><a class="read_more" href=/phweb/page/detail?channel=news_event&pid='+list[i].p_id+'>Read More</a>'+
			                '</div>'+
		              '</li>'
			}
			$(".f_t_1>ul").append(list_wrap);
		};
		this.addClass=function(){
			$(".f_t_1>ul>li").each(function(i,els){//动态为3的倍数的元素加class
				if(((i+1)%3==0)&&(i!==0)){
					$(els).addClass("three_no_m_r");
				}
			});
		};
		this.test_init=function(){
			var _this=this;
			this.ajax(function(){
				if(testData){
					_this.hide_btn();
					_this.create_list();
					_this.addClass();
				}else{
					alert('暂无数据');
				}	
			})
		}
		this.test_init();
	}
	func.test_list();
	$('[action-type=load_more]').on("click",function(){
		func.test_list();
	})
})