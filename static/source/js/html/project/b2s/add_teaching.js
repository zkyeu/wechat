define("add_teaching",["utility"],function(require,exports,module){
	var utility = require("utility");
	require("utility");

    var gradeHtml;
	//添加图书
	var $bookList = $(".bookList"),
		//$class_grade = $(".class_grade").val(),
		//$class_id = $('#classId').val(),
		addTeaching = $('#addTeaching'),
		shadeBox = $('#shadeBox'),
		closeBtn = $('#closeBtn'),
		classId = $('#classId'),
		midId = $('#midId'),
		defData = null,
		// defData = {
		// 	grade:$class_grade
		// },
		$path = !!$(".agent-wrap")[0] ? "agent" : "class",
		getData = function(data,type){
			$.ajax({
				type:'get',
				url:'/'+ $path +'/ajaxGetTeachingMaterials',
				dataType : 'json',
				data : data,
				success:function(data){
					var data = data.data;
					var html = [];
                     var $grade_tit = $(".grade-tit");
                    $grade_tit.html(gradeHtml);
					$.each(data,function(idx,item){     
				    	html.push("<li dataId="+ item.id +" class='clearfix'><a href='javascript:;'>\
		                    <P class='book'></P>\
		                   <p class='book_name'><em>"+item.name+"</em><i></i></p>\
		                   <span class='border-line'></span>\
		                  </a></li>");
					});
					$bookList.html(html.join(""));
					//addTeaching.css('top',$(document).scrollTop()+243+'px');
					if(type){
						var windowTop = $(document).scrollTop()+($(window).height()-addTeaching.height())/2;
						addTeaching.css('top', windowTop+'px');
						addTeaching.show();
						shadeBox.show();
						//添加滚动条
    					$(".teaching_book").removeData("__nicescroll").teachingScroll();
					}
					

				}
			});
		}
		shadeBox.height($(document).height());
		//closeBtn.hide();
        $(".g-tit-teaching").on("click",function(){
            closeBtn.hide();
        })
	$('.grade-item').on('click','.g-tit-teaching,.book_change,.js-choseTeaching', function(){

		hidePromptFn();
		var gradeValue = $(this).attr('grade');
		classId.val($(this).attr('class_id'));
		// if($(this).attr('class') == "book_change"){
		// 	gradeHtml = $(this).parent().siblings().eq(0).text();
			
		// }else{
		// 	closeBtn.hide();
		// 	gradeHtml = $(this).prev().text();
		// }
		if($(this).hasClass('book_change')){
            gradeHtml = $(this).parent().siblings().eq(0).text();
            
        }else if($(this).hasClass('g-tit-teaching')){
            closeBtn.hide();
            gradeHtml = $(this).prev().text();
            
        }else if($(this).hasClass('js-choseTeaching')){
            closeBtn.hide();
            gradeHtml = $('.cur-color').text();
        }
		defData = {
			grade : gradeValue
		}
		getData(defData,true);

	});
	closeBtn.on('click',function(){
		addTeaching.hide();
		shadeBox.hide();
		$('.nicescroll-rails').remove();
		clearInputText();
		$('#desBox').hide();
		$('#sureBtn').find('a').addClass('grey').removeClass('yellow');
	});
	function clearInputText(){
		$(".seach_input").val('');
		$('.diyname').val('');
	}
	clearInputText();

    

    //搜索图书
    var $seach_input = $(".seach_input"),
    	timer;
    	
    $seach_input.on("input propertychange",function(){
		clearTimeout(timer);
		timer =setTimeout(function(){
			getData($.extend({},defData,{
				name : encodeURI($seach_input.val())
			}),false);
		},300);
		$('#desBox').hide();
		$('#sureBtn').find('a').addClass('grey').removeClass('yellow');
	})
    //自定义教材
    $(".text_box span").on("click",function(){
    	var diyname = $(".diyname").val();
    	window.location.href = "/"+ $path +"/doSetMaterial?class_id="+ classId.val() +"&name="+encodeURI(diyname)+"";
    });
 
	$bookList.on({
    	click:function(){
    		var $self = $(this),
    		  desBox = $('#desBox'),
    		aSureBtn = $('#sureBtn').find('a');
    		if($self.hasClass('isSel')){
    			$self.find('span').hide();
    			$self.removeClass('current');
    			$self.removeClass('isSel');
    			midId.val('');
    			aSureBtn.addClass('grey').removeClass('yellow');
    			aSureBtn.attr('href','javascript:;');
    			desBox.hide();
    		}else{
				$self.find('span').show().end().siblings().find('span').hide();
	    		$self.addClass('current').siblings().removeClass('current');
	    		$self.addClass('isSel').siblings().removeClass('isSel');
	    		aSureBtn.addClass('yellow').removeClass('grey');
	    		midId.val($(this).attr('dataId'));
				var data = {
					mid:$(this).attr('dataId')
				};
				$.ajax({
					url:'/'+ $path +'/ajaxGetRelateMaterials',
					type:'post',
					dataType:'json',
					data:data,
					success:function(data){
						var data = data.data;
						// if(data.related == 1){
						// 	desBox.find('.book-t').text(data.relate_data.name);
						// 	desBox.show();
						// 	midId.val(data.relate_data.id);
						// }else{
						// 	desBox.hide();
						// }
						var sureUrl = !$('.js-choseTeaching')[0] ? "/"+$path +"/doSetMaterial?class_id="+ classId.val() + "&mid="+midId.val() : "/"+$path +"/doSetMaterial?class_id="+ classId.val() + "&mid="+midId.val() + "&redirect=/teacher/mylesson";
						aSureBtn.attr("href",sureUrl);
					//	aSureBtn.attr("href","/"+ $path +"/doSetMaterial?class_id="+ classId.val() + "&mid="+midId.val());
					}
				});
				
    		}
    	},
    	mouseenter:function(){
    		
	    		$(this).find('span').show();
	    		$(this).addClass('current');
	    
    	},
    	mouseleave:function(){
    			if($(this).hasClass('isSel')) return;
	    		$(this).find('span').hide();
	    		$(this).removeClass('current');
	    
    	}

	},'li');
	$('#nBtn').on('click',function(){
		hidePromptFn();
	});
	var mHeightValue = $(document).height();
    $('.maskId').height(mHeightValue+'px');
	function hidePromptFn(){
		//$('.maskId').removeClass('show').addClass('hide');
		$('.select-prompt').hide();
		$('.g-tit-teaching').removeClass('zindex-n');

	}
});