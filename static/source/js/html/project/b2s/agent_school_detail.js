define("agent_school_detail",["utility"],function(require,exports,module){
	 var utility = require("utility"),
        regs = $.formVerify.utility.regs;

	;(function(){
		var $delet = $(".delet");
		var $add_stu_confirm = $(".add_stu_confirm");
		var $add_stu_confirm1 = $(".add_stu_confirm1");
		var h = document.body.scrollHeight;
		var $close_confirm = $(".close_confirm");
		var $close_confirm1 = $(".close_confirm1");
		var $add_confirm = $(".add_confirm");
		var $add_confirm1 = $(".add_confirm1");
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
		closefn1 = function(){
			$add_stu_confirm1.hide();
			$add_confirm1.hide();
		}
//删除信息
	$delet.click(function(){
		var self = $(this)
		if(confirm("确认删除？")){
			window.location.assign(self.attr("_url"));
		}
		
	});
	$add_stu_confirm.css({'height':h});
	$add_stu_confirm1.css({'height':h});
//关闭弹窗
	$close_confirm.click(closefn);
	$close_confirm1.click(closefn1);
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
//添加老师
		;(function(){
	        $("[rel=agent_detail]").formVerify({
	            rules:{
	                phone:{
	                    required:[true,"请输入手机号"],
	                    reg:[regs.phone,"请输入正确的手机号"]
	                },
	                teaname:{
	                	required:[true,"请输入姓名"],
	                    reg:[regs.teaname,"请输入正确的姓名"]
	                }
	            },
	             errorHandler:function(flag,text){
		        	var type = flag ? "hide" : "fadeIn";
		        	$(this).closest("ul").find("em").text(text).parent(".error-tips")[type]();
		        }
	        });        
	    })();
//绑定
	$(".to_tea").click(function(){
		var $teacher_id = $(this).attr("data-tid");
		 //alert($teacher_id);
		$(".tea_id").val($teacher_id);
		$add_stu_confirm1.show();
		$add_confirm1.show();
	});
//绑定班级
	;(function(){
	    $("[rel=agent_detail_class]").formVerify({
	    	  rules:{
	    	  		grade:{
	    	  			required:[true,"请选择年级"]
	    	  		},
	    	  		classroom:{
	    	  			required:[true,"请选择班级"]
	    	  		},
	                teachingtext:{
	                    required:[true,"输入内容不能为空"],
	                    reg:[regs.teachingtext,"请输入正确的教材"]
	                }
	            },
	            errorHandler:function(flag,text){
;		        	var type = flag ? "hide" : "fadeIn";
		        	$(this).closest("ul").find("em").text(text).parent(".error-tips")[type]();
		        },
		        submitHandler:function(){
		        	if(!this.checkFlag) return;
		        	 $.ajax({
			            url: '/agent/checkBindClassStatus',
			            data: {
			                'school_id': document.getElementById('school_id').value,
			                'teacher_id': document.getElementById('teacher_id').value,
			                'class_index': document.getElementById('class_index').value,
			                'grade_index': document.getElementById('grade_index').value
			            },
			            type: 'post',
			            dataType: 'json',
			            success: function (str) {
			                returndata = str;
			                if (returndata.status == 'ok') {
			                    document.form1.submit();
			                } else {
			                    if (returndata.status == 'fail') {
			                        if (returndata.msg.length == 0) {
			                            document.getElementById('is_change').value = 1;
			                            document.form1.submit();
			                        } else {
			                            if (confirm(returndata.msg)) {
			                                document.getElementById('is_change').value = 1;
			                                document.form1.submit();
			                            } else {
			                                return false;
			                            }
			                        }
			                    } else {
			                        location.href="/agent/showError/?msg="+returndata.msg+"&goto=/agent/schoolDetail/?school_id="+document.getElementById('school_id').value;
			                        return false;
			                    }
			                }
			            },
			            error: function () {
			                return false;
			            }
			        });

		        }
	    });        
	})();
	//输入年级之后的ajax请求
	$(".grade").change(function(e,r){
		var ajaxUrl = $(".grade").attr("data-url");
		var self = $(this);
		var isTrigger=e.isTrigger;
		
		if(!!isTrigger) return;
		$.ajax({
            url: ajaxUrl,
            data : {
                    grade : self.val(),
                    school_id : $(".grade").attr("school-id")
            },
            type: 'POST',
            dataType: 'json',
            success:function(data){
	            if(data.status == 0){
	                $('[name=teaching_materials]').val(data.data.teaching_materials);
	                $('[name=learn_schedule]').val(data.data.learn_schedule);
	                $('[name=teaching_schedule]').val(data.data.teaching_schedule);
	            }
	            if(data.data.teaching_materials.length>0){
	            	$("[name=teaching_materials]").parent().siblings().hide();
	            }
	            if(data.data.learn_schedule.length>0){
	            	$("[name=learn_schedule]").parent().siblings().hide();
	            }
	            if(data.data.teaching_schedule.length>0){
	            	$("[name=teaching_schedule]").parent().siblings().hide();
	            }    
	        }
        });
	})	
	
		

		$('.js-bind-class').on('click',function(){
			var gradeArr = [];
			$('#gradeId input').each(function(i){
				if($(this).attr('checked') == 'checked'){
					gradeArr.push($(this).val());
				}
			});
			$('.js-classroom').val(gradeArr);
			
		});

	})();
});