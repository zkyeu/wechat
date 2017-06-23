define(function(require, exports, module){
	var itemAttr = $(".info-item");
	// 选择学员身份
	$(".info-student").on("tap","li",function(){
		var gradeShow;
		var infoNum = $(this).attr("tid");
		$("#occup").val(infoNum);
		// 判断是否显示年级
		if(infoNum == "6" || infoNum == "4" || infoNum == "7"){
			gradeShow=$(".info-grade");
			$(".info-grade").show();
			$(".info-objective").find(".info-cont").hide();
			$(".info-objective").find(".item-tit").show();
		}else{
			gradeShow=$(".info-objective");
			$(".info-grade").hide();
			$("#grade").val("");
		}
		activeNext($(this),gradeShow);
	});
	// 选择年级
	$(".info-grade").on("tap","li",function(){
		var infoNum = $(this).attr("tid");
		$("#grade").val(infoNum);
		activeNext($(this),$(".info-objective"));
	});
	// 选择学习目的
	$(".info-objective").on("tap","li",function(){
		var infoNum = $(this).attr("tid");
		$("#purpose_desc").val(infoNum);
		activeNext($(this),$(".info-level"));
	});
	// 选择英语水平
	$(".info-level").on("tap","li",function(){
		var infoNum = $(this).attr("tid");
		$("#english_level").val(infoNum);
		$(this).parent().find("li").removeClass("active");
		$(this).addClass('active');
		$(".sure-button").find("span").addClass("sure");
	});
	function activeNext(atv,atr){
		var atr=atr||{};
		atv.parent().find("li").removeClass("active");
		atv.addClass('active');
		atr.find(".item-tit").hide();
		//如果全部展开，再次点击最上面的切换，下面收起
		var indexItem = atr.index();
		var inputHidden = $("input[type='hidden']");
		for(var i = 0;i < itemAttr.length;i++){
			if(i>indexItem){ 
				itemAttr.eq(i).find(".info-cont").hide().find("li").removeClass("active");
				itemAttr.eq(i).find(".item-tit").show();
				inputHidden.eq(i).val("");
			}else if(i==indexItem){
				itemAttr.eq(i).find(".info-cont").find("li").removeClass("active");
				inputHidden.eq(i).val("");
			}
		}
		atr.find(".info-cont").show();
		atr.find(".item-tit").hide();
		$(".sure-button").find("span").removeClass("sure");
		// 每次点击请求ajax加载
		
		var data = { 
			name:atv.parent().attr("date-name"),
			tid:atv.attr("tid")
		}
		$.ajax({
			url:"/Ajax/perfectDetails",
			data:data,
			type:'post',
			dataType:'json',  
			success: function (res) { 
				if(res.status=="2"){//如果是幼儿选项除了幼儿大班其它选项点击无学习目的，直接显示英语水平
					$(".info-objective").hide();
					$(".info-level .item-tit").hide();
					$(".info-level .info-cont").show();
					$("#purpose_desc").val("77");
					var str=""; 
					for(var key in res.data){
						str+='<li tid="'+res.data[key]+'">'+key+'</li>';
					}
					$(".info-level .info-cont").find("ul").html(str);
				}else if(res.status=="1"){
					$(".info-objective").show();
					var str=""; 
					for(var key in res.data){
						str+='<li tid="'+res.data[key]+'">'+key+'</li>';
					}
					atr.find("ul").html(str);

				}

            }
		});


	};
	// 点击确定
	$(".sure-button").on("click","span[class='sub sure']",function(){
		var data={
			occup:$("#occup").val(),
			grade:$("#grade").val(),
			purpose_desc:$("#purpose_desc").val(),
			english_level:$("#english_level").val(),
			is_new_occup_pop:"1",
			area:'1'
		};
		$.ajax({
			url:"/user/storageUserInfo",
			data:data,
			type:'post',
			dataType:'json',
			success:function(res){
				if(res.status==1){
					window.location.href=res.data;
				}
			}
		});
	})
	var timeTit = $(".time-cont-l .time-item-tit");// 上午下午晚上
	// 默认现有的时间段展示
	getTimelist("","",function(timePart){
		if(timePart=="morning"){
			listTimecolor("move2 move1","",0);
		}else if(timePart=="afternoon"){
			listTimecolor("move2","move1",1);
		}else{
			listTimecolor("move1","move2",2);
		}
	});
	//渲染时间点
	function getTimelist(timeDate,timeP,callback){
		var urlTime = "/ajax/newGetTrialTimes";
		var dateTime = new Date();
		var yearTime = dateTime.getFullYear();
		var monthTime = dateTime.getMonth();
		var dayTime = dateTime.getDate();
		if(monthTime<="9"){//月数个位变两位
			monthTime="0"+(monthTime+1);
		}else{
			monthTime=monthTime;
		}
		var nowTime ="";
		if(timeDate==""){
			nowTime = yearTime+"-"+monthTime+"-"+dayTime;//转换格式
		}else{
			nowTime=timeDate;
		}

		$.ajax({
			url:urlTime,
			data:{
				tmData:nowTime
			},
			type:'post',
			dataType:'json',
			success: function (res) {
				if(res.status=="1"){
					var timeUl = $(".time-cont-l .time-cont");
					var spanTit = timeTit.find("span");
					var timeStr = "";
					var timePart = "";
					for(var key in res.data){
						if(res.data[key].length >0){//默认显示有课的半天时间段 此处只是查找一下有课的第一个时间段
							timePart=key;//赋值给timePart
							break;
						}
					}
					//判断上午下午晚上显示样式
					if(callback){
						callback(timePart);
					}

					timePart = timeP || timePart;  //判断时间段是上午下午或者晚上 优先选择传入 没有传入
					for(var i=0; i < res.data[timePart].length; i++){
						if(res.data[timePart][i].dataType=="1"){//1是预约未满
							timeStr+="<li name='"+res.data[timePart][i].name+"' value='"+res.data[timePart][i].value+"' dataType='"+res.data[timePart][i].dataType+"'>"+res.data[timePart][i].dataRm+"</li>";
						}else if(res.data[timePart][i].dataType=="0"){//0是已约满
							timeStr+="<li class='gray' name='"+res.data[timePart][i].name+"' value='"+res.data[timePart][i].value+"' dataType='"+res.data[timePart][i].dataType+"'>"+res.data[timePart][i].dataRm+"<br><span>已约满</span></li>";
						}
						
					}
					timeUl.html(timeStr);
				}
	        }
		});
	}

	// 默认现有时间段的字体颜色
	function listTimecolor(str1,str2,index){
		var spanTit = timeTit.find("span");
		timeTit.removeClass(str1); 
		timeTit.addClass(str2);
		spanTit.removeClass("span-font");
		spanTit.eq(index).addClass("span-font");
	}
 	
	// 选择上课时间
	$(".time-list").on("tap","li",function(){
		var liTime = $(this).attr("date-time");
		getTimelist(liTime,"",function(timePart){
			if(timePart=="morning"){
				listTimecolor("move2 move1","",0);
			}else if(timePart=="afternoon"){
				listTimecolor("move2","move1",1);
			}else{
				listTimecolor("move1","move2",2);
			}
		});

		$(".time-list li .time-day").removeClass('day-now');
		$(this).find(".time-day").addClass('day-now');

		// 切换清空下面内容回到默认状态
		$(".time-cont-l span").removeClass("span-font");
		$(".time-cont-l span").eq(0).addClass("span-font");
		$(".time-cont-l .time-item-tit").attr("class","time-item-tit");
		clearR();

	});
	// 选择上午下午晚上
	$(".time-cont-l .time-item-tit").on("tap","span",function(){
		var dayTimelist = $(".day-now").parent("li").attr("date-time");
		if($(this).index()=="2"){
			getTimelist(dayTimelist,"night");
			listTimecolor("move1","move2",2);
		}else if($(this).index()=="1"){
			getTimelist(dayTimelist,"afternoon");
			listTimecolor("move2","move1",1);
		}else{
			getTimelist(dayTimelist,"morning");
			listTimecolor("move2 move1","",0);
		}
		clearR();
	});
	// 点击时间段
	$(".time-cont-l").on("tap","li",function(){
		if($(this).hasClass("gray")){
			return false;
		}else{
			$(".time-cont-l li").removeClass("active");
			$(this).addClass("active");
			$(".sure-button").find("span").addClass("sure");
		}
	})
	// 点击老师国籍 
	$(".time-teacher").on("tap","li",function(){
		if($(this).hasClass("gray")){
			return;
		}else{
			$(".time-teacher li").removeClass("active");
			$(this).addClass("active");
		}
	})

	function clearR(){
		$(".time-cont-l li").removeClass("active");
		$(".sure-button").find("span").removeClass("sure");
	}

	// 点击完成预约
	$('.sure-button').on("click","span[class='complete sure']",function(){
		var dayTimelist = $(".day-now").parent("li").attr("date-time");
		var timeList = $(".time-cont-l .time-cont .active").val()
		var timeTeacher = '';
		if($(".time-teacher")){//判断老师国籍是否存在 如果存在就取当前所选老师类型
			timeTeacher=$(".time-teacher .active").attr("teacher-type");
		}
		$.ajax({
			url:"/Ajax/newCompleteAbout",
            data:{
                area:"1",
                course_date:dayTimelist.replace(/-/gm,''),//格式20170222
                course_time:timeList,
                course_type:timeTeacher
            },
            type:'post',
            dataType:'json',
            success: function(res) {
                if(res.status=="2"){
                	$(".mask").show();
                }else if(res.status=="0"){
                	alert(res.info);
                }else if(res.status=="1"){
                	window.location.href=res.data;
                }else if(res.status=="3"){
                	window.location.href=res.data;
                }
            }
		});
	})

	// 点击验证
	var reCode = /[0-9]{5}$/;
	$(".button").on("click","#test",function(){
		var mobile = $("#tel").val();
		var mobile_code = $("#code").val();
		var checked_imgcode = $("#checked_imgcode").val();
		if(checked_imgcode == ""){
			alert('请填写图片验证码');
			return false;
		}else if(mobile_code==""){
			alert('请填写手机验证码');
			return false;
		}else if(!reCode.test(mobile_code)){
			alert('手机验证码错误，请重新输入');
			return false;
		};
		$.ajax({
			url:"/User/newTrialMobileCheck",
            data:{
                mobile:mobile,
                mobile_code:mobile_code
            },
            type:'post',
            dataType:'json',
            success: function(res) {
                if (res.status==1) {
                    $(".mask").hide();
                } else {
                    alert(res.info);
                }
            }
		})
	});
	// 验证码获取倒计时
    var wait = 60;
    function time(o) {
        if (wait == 0) {
            o.attr("disabled", false);
            o.removeClass("y_code_down");
            o.text("获取验证码");
            wait = 60;
        } else {
            o.attr("disabled", true);
            o.addClass("y_code_down");
            o.text(wait + "秒后可重新获取");
            wait--;
            setTimeout(function() {time(o);}, 1000);
        }
    };
    // 获取验证码
    $("#getCode").click(function() {
    	var tel = $("#tel").val();
        if ($(this).hasClass("y_code_down")) return false;
        var index=$(this);
        var mobile = $("input[name='mobile']").val() || "";
        
        if ($("#checked_imgcode").val() == "") {
            alert("请填写图片验证码");
            return false;
        }
        var aj = $.ajax({
            url: "/ajax/sendCheckCode",
            data:{
                mobile: mobile,
                imgcode: $("#checked_imgcode").val()
            },
            type:'post',
            cache:false,
            dataType:'json',
            success: function (data) {
                if (data.status==0) {
                    alert(data.info);
                    return false;
                } else {
                    time(index);
                }
            },
            error: function() {
                alert('网络异常，短信发送失败');
                return false;
            }
        });
    });


	// 点击关闭验证弹窗
	$(".close").on("click","",function(){
		$(".mask").hide();
	})


	// 约课成功页
	var qqNumber = $(".qq-number input");
	qqNumber.click(function(){
		$(".qq-number span").addClass("activeGo");
		return false;
	});
	var activeGo = $(".qq-number .activeGo");
	$(".qq-number").on("tap",".activeGo",function(){
		var qqre = /^[1-9]{1}[0-9]{4,}$/;
		if(qqNumber.val()==""){
			alert("请输入QQ号");
			return false;
		}else if(!qqre.test(qqNumber.val())){
			alert('请填写正确的qq');
            return false; 
		}
		$.ajax({
			url:'/Ajax/addQQ',
			data:{
                qq:qqNumber.val()
            },
            type:'post',
            dataType:'json',
            success:function(res){
            	alert("保存成功");
            	location.reload();
            }
		})
	});

  /*跳转获取默认值*/
  if( $("#getPurpose").length>0 ){
      var _this=$(".info-student").find("li.active");
      var infoNum=$(".info-student").find("li.active").attr("tid");
      var gradeShow;
      if(infoNum == "6" || infoNum == "4" || infoNum == "7"){
        gradeShow=$(".info-grade");
        $(".info-grade").show();
        $(".info-objective").find(".info-cont").hide();
        $(".info-objective").find(".item-tit").show();
      }else{
        gradeShow=$(".info-objective");
        $(".info-grade").hide();
        $("#grade").val("");
      }
      activeNext(_this,gradeShow);
  }

});