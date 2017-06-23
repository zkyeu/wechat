define(function(require,exports,module){
	Array.prototype.reArr = function(){
		if(this.length == 0) return this;
		var 
		hash = {},
		result = [];

		for(var i=0;i<this.length;i++){
			var v = this[i];
			if(!hash[v]){
				result.push(v), hash[v] = true;
			}
		}
		return result;
	}

	;(function(){
		var form = $("[rel=agentLogin]"),
		formData = {
			phone : ["手机号",/^1[0-9]{10}$/],
			password : ["密码"]
		},
		fromCheck = function(flag,tip){
			var self = $(this);
			self.data("flag", (flag ? "1" : "0") )
				.closest("dd")[ (flag ? "remove" : "add") + "Class" ]("s-err")
				.siblings("dd")
				.find(".error-tip").html( flag ? "" :  '<i class="tenIcon err-icon"></i><span>'+ tip +'</span>'  );
		}

		form.on({
			blur:function(){
				var self = $(this),
					rel = self.attr("rel"),
					val = $.trim(self.val());
				if(val == "") return fromCheck.call(self,false,formData[rel][0]+"不能为空");
				if(!!formData[rel][1] && !formData[rel][1].test(val)) return fromCheck.call(self,false,formData[rel][0]+"有误");
				fromCheck.call(self,true);
			},
			focus:function(){
				$(this).closest("dd").removeClass("s-err");
			}
		},"[rel]").on("submit",function(e){
			var e = e || event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var self = $(this),
				rel = self.find("[rel]"),
				subFlag = true;
			rel.trigger("blur").each(function(i,v){
				var flag = $(v).data("flag");
				if(flag == 0){
					subFlag = false;
					return false;
				}
			});

			if(subFlag) self.get(0).submit();
		});
	})();


	;(function(){
		var $delet = $(".delet");
		var $add_stu_confirm = $(".add_stu_confirm");
		var h = document.body.scrollHeight;
		var $close_confirm = $(".close_confirm");
		var $add_confirm = $(".add_confirm");
		var $stu_add = $(".stu_add");
		var $add_s = $(".add_s");
		var $add_sure = $(".add_sure");
		var $stu_error = $(".stu_error");
		var $textarea = $add_confirm.find("textarea");
		showError = function(flag,t){
			$stu_error.css("visibility", (flag ? "hidden" : "visible") ).find("span").html( (flag ? "" : t) );
		},
		testreg = new RegExp("(^1[0-9]{10}$)"),
		closefn = function(){
			$add_stu_confirm.hide();
			$add_confirm.hide();
			$textarea.val("");
			showError(true);
	}
//删除信息
	$delet.click(function(){
		var self = $(this)
		if(confirm("确认删除？")){
			window.location.assign(self.attr("_url"));
		}
		
	});
	$add_stu_confirm.css({'height':h});
//关闭弹窗
	$close_confirm.click(closefn);
//点击添加学生
	$stu_add.click(function(){
		$add_stu_confirm.show();
		$add_confirm.show();
	});
//空白页添加学生
	$add_s.click(function(){
		$add_stu_confirm.show();
		$add_confirm.show();
	});
//点击确定
	$add_sure.click(function(){
		var self = $(this),
			form = self.closest("form"),
			textarea = form.find("textarea"),
			name = form.find("[name=mobile]");
		var $text_val = textarea.val();
		if($text_val == ""){
			return showError(false,"请输入老师手机号码");
		}

		var $text_val_arr = $text_val.split("\n"),
			result = [],
			flag = true;
		$($text_val_arr).each(function(i,v){
			if(v == "") return true;
			if(!testreg.test( v.replace(/\s/g,""))){
				showError(false,"请输入正确老师手机号码");
				flag = false;
				return false;	
			}
			result.push(v);
		});

		if(flag) showError(true),name.val(encodeURIComponent(result.reArr().join(","))),form.get(0).submit();
	});
	})();
	(function(){
	    $('.select-s').on('change',function(){
	        if($(this).val() != 0){
	            $(this).css('color','#000');
	        }else{
	            $(this).css('color','#a9a9a9');
	        }
	    });

	    var chooseSchool = $('#chooseSchool'),
	    	schoolLevel = $('#schoolLevel'),
	    	maskId = $('#maskId'),
	    	bindValue= $('#bindValue'),
	    	classTime = $('#classTime'),
	    	classTimeArr = [5,6,0],
	    	timeArr = new Array(),
	    	number = 0,
	    	defBoardSchool = $('#defBoardSchool'),
	    	defSchoolLevel = $('#defSchoolLevel'),
	    	isboard = $('#isboard'),
	    	isChoseBoard = false;


	    $('.bind-s').on('click',function(){
	    	// var level = Number($(this).attr('level_id'));
	    	// if(level != 0){
	    	// 	$('#chooseId').find('li').each(function(){
	    	// 		 if(level == Number($(this).find('span').attr('selection-value'))){
	    	// 		 	$(this).find('span').addClass('current');
	    	// 		 	schoolLevel.val(level);
	    	// 		 	return false;
	    	// 		 }
	    	// 	});
	    	// }
	    	$('#chooseSchoolId').find('span').removeClass('current');
	    	$('#isBoardSchool').find('span').removeClass('current');
	    	classTime.find('span').removeClass('d-current');
	    	defBoardSchool.addClass('current');
	    	defSchoolLevel.addClass('current');
	    	classTime.find('span').addClass('d-current');

	    	var bindLink = $(this).attr('bind-link');
	    	chooseSchool.css('visibility','visible');
	    	maskId.show();
	    	bindValue.val(bindLink);

	    });
	    // var chooseLi = $('#chooseId li').size(),
	    // 	chooseWidth = $('#chooseId li').width()+36,
	    // 	cFlag = false;
	    // $('#chooseId').width(chooseWidth*chooseLi+5);
	    defBoardSchool.on('click',function(){
	    	$(".chose-class-time").hide();
	    	chooseSchool.removeClass('add-class-time');
	    });

	    $('#chooseSchoolId li span').on('click',function(){
	    	choseFn.call($(this),schoolLevel);
	    });

	    $('#isBoardSchool li span').on('click',function(){
	    	choseFn.call($(this),isboard);
	    	if($(this).attr('data-value') == 'true'){
	    		isChoseBoard = true;
	    		$('.chose-class-time').show();
	    		chooseSchool.addClass('add-class-time')
	    	}
	    });

	    classTime.find('span').on('click',function(){
	    	number = 0;
	    	if($(this).hasClass('d-current')){
	    		classTimeArr[$(this).parent().index()] = '#';
	    		$(this).removeClass('d-current');
	    	}else{
	    		$(this).addClass('d-current');
	    		
	    		if($(this).parent().index() == 2){
	    			classTimeArr[$(this).parent().index()] = $(this).parent().index()-2;
	    		}else{
	    			classTimeArr[$(this).parent().index()] = $(this).parent().index()+5;
	    		}
	    	}
	    });

	    function choseFn(optionObj){
	    	if(!this.hasClass('current')){
	    		this.parents('ul').find('span').removeClass('current');
	    		this.addClass('current');
	    		optionObj.val(this.attr('selection-value'));
	    	}
	    }
	    $('#sureBtn').on('click',function(){
	    	if(isChoseBoard == true){
	    		timeArr = [];
		    	$.each(classTimeArr,function(i){
					if(classTimeArr[i] == '#'){
						number++;
					}
		    	});
		    	if(number >= 2){
		    		alert('可上课时间（至少两项）');
		    	}else{
		    		$.each(classTimeArr,function(i){
						if(classTimeArr[i] != '#'){
							timeArr.push(classTimeArr[i]);
						}
			    	});
			    	var classTimeValue = timeArr.join(',');
			    	window.location.href = bindValue.val()+'&type='+ schoolLevel.val() +'&isboardType='+ isboard.val() +'&classTimeType='+ classTimeValue;	
		    	}
	    	}else{
	    		window.location.href = bindValue.val()+'&type='+ schoolLevel.val() +'&isboardType='+ isboard.val();
	    	}
	    	
	    



	    });
	    $('#closeBtn').on('click',function(){
	    	$('.chose-class-time').hide();
	    	$('#chooseId li span').removeClass('current');
	    	schoolLevel.val('3');
	    	maskId.hide();
	    	chooseSchool.removeClass('add-class-time');
	    	chooseSchool.css('visibility','hidden');
	    	isboard.val('0');
	    	bindValue.val('');
	    	
	    	$('#chooseId').css('visibility','hidden');

	    });
	})();
});