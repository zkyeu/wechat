
define('flbreg',['calender'],function(require,exports,module){
//验证英文名字
	$("input[name='first_name']").blur(function(){
			var first_name=$("input[name='first_name']").val();
			var Name = /^[A-Za-z]+$/;
			if(first_name==""){
					$(".e_fullname").html("Please fill out your first name.");
					return false;
			}
	});
	$("input[name='first_name']").focus(function(){
			$(".e_fullname").html("");
	});
	$("input[name='last_name']").blur(function(){
		  var Name = /^[A-Za-z]+$/;
			var last_name=$("input[name='last_name']").val();
			if(last_name==""){
					$(".e_fullname").html("Please fill out your last name.");
					return false;
			} 
	});
	$("input[name='last_name']").focus(function(){
			$(".e_fullname").html("");
	});
//验证email
	$("input[name='email']").blur(function(){
		  var E_mail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
			var email=$("input[name='email']").val();
			if(email==""){
					$(".e_email").html("Please fill out your email address.");
					return false;
			}else if(!E_mail.test(email)){
					$(".e_email").html("Email format is not correct.");
					return false;
			}
	});
	$("input[name='email']").focus(function(){
			$(".e_email").html("");
	});
//验证Mobile Number
	$("input[name='mobile']").blur(function(){
		var mobile=$("input[name='mobile']").val();
		var reMobile = /^[0-9]*$/; 
			if(mobile==""){
					$(".e_mobile").html("Please fill out your mobile number.");
					return false;
			}else if(!reMobile.test(mobile)){
					$(".e_mobile").html("Mobile number format is not correct.");
					return false;
			}
	});
	$("input[name='mobile']").focus(function(){
			$(".e_mobile").html("");
	});
//验证Skype ID
$("input[name='skype']").blur(function(){
			var skype=$("input[name='skype']").val();
			if(skype==""){
					$(".e_skype").html("Please fill out your skype ID.");
					return false;
			} 
	});
	$("input[name='skype']").focus(function(){
			$(".e_skype").html("");
	});
//	

$(".experience").change(function(){
	var val = $(this).val();
	$(".e_experience").html("");
	if(val==16 || val==17){
		$("#yearsTeaching").show();
	}else{
		$("#yearsTeaching").hide();
	}
});

$(".teacherYear").change(function(){
	$(".e_teacherYear").html("");
});
$(".teacherYear").blur(function(){
	var teacherYear = $(this).val();
	if(teacherYear=="Select" || teacherYear==""){
		$(".e_teacherYear").html("Please fill out your Years of Teaching.");
		return false;
	}
});
$(".experience").blur(function(){
	var experience = $(this).val();
	if(experience=="Select" || experience==""){
		$(".e_experience").html("Please fill out your Kids Teaching Experience.");
		return false;
	}
});
$("#appDate").focus(function(){
	$(".e_date").html("");
});
$("#appDate").change(function(){
	var val = $(this).val();
	if(val==""){
		$(".e_date").html("");
	}
	
});

$("#appDate").blur(function(){
	var appDate = $(this).val();
	if(!appDate){
		$(".e_date").html("Please fill out your Preferred Interview Date.");
		return false;
	}else{
		$(".e_date").html("");
	}
});
$("#interview_times").change(function(){
	$(".e_time").html("");
});
$("#interview_times").blur(function(){
	var tmp_season = $(this).val();
	if(tmp_season=="-1" || tmp_season==""){
		$(".e_time").html("Please fill out your Preferred Interview Time.");
		return false;
	}
});
//form验证
	$("#e_submit").on("click",function(){
			var reMobile = /^[0-9]*$/;
			var Name = /^[A-Za-z]+$/;
			var E_mail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
			var first_name=$("input[name='first_name']").val();
			var last_name=$("input[name='last_name']").val();
		  var email=$("input[name='email']").val();
		  var mobile=$("input[name='mobile']").val(); 
		  var skype=$("input[name='skype']").val();
		  var experience = $(".experience").val();
		  var appDate = $("#appDate").val();
		  var tmp_season = $("#interview_times").val();
		  var teacherYear = $(".teacherYear").val();
			if(first_name==""){
					$(".e_fullname").html("Please fill out your first name.");
					return false;
			}else if(last_name==""){
					$(".e_fullname").html("Please fill out your last name.");
					return false;
			}else if(email==""){
					$(".e_email").html("Please fill out your email address.");
					return false;
			}else if(!E_mail.test(email)){
					$(".e_email").html("Email format is not correct.");
					return false;
			}else if(mobile==""){
					$(".e_mobile").html("Please fill out your mobile number.");
					return false;
			}else if(!reMobile.test(mobile)){
					$(".e_mobile").html("Mobile number format is not correct.");
					return false;
			}else if(skype==""){
					$(".e_skype").html("Please fill out your skype ID.");
					return false;
			}else if(experience =="Select" || experience==""){
				$(".e_experience").html("Please fill out your Kids Teaching Experience.");
				return false;
			}else if(appDate ==""){
				$(".e_date").html("Please fill out your Preferred Interview Date.");
				return false;
			}else if(tmp_season=="-1" || tmp_season==""){
				$(".e_time").html("Please fill out your Preferred Interview Time.");
				return false;
			}else if((experience==16 || experience==17) && (teacherYear=="" || teacherYear=="Select")){
				$(".e_time").html("Please fill out your Preferred Interview Time.");
				return false;
			}
			$.ajax({
				url:"../admin/invite/do_add_new_lead_20160312.php",
				type:"post",
				data:{
					"first_name":first_name,
					"last_name":last_name,
					"skype_hidden":skype,
					"phone_num_hidden":mobile,
					"email_hidden":email,
					"background" : $(".experience").val(),
					"date" : $("#appDate").val(),
					"interview_time":$(".interview_time").val(),
					"source_details" :$("#source_details").val(),
					"tmp_season" : $("#tmp_season").val(),
					"source" :  $("#source").val(),
					"experience" : teacherYear
				},
				success:function(res){
					var from = $("#source_details").val();
					if(res=="success"){
						var dtime = $(".interview_time option:selected").text();
                        var dateTime = encodeURI($("#appDate").val()+' '+dtime);
						location.href="../ph/landing_success_done.php?from="+from+'&dateTime='+dateTime;
					}else{
						$(".mask").show();
						$(".dialog").show();

					}
				}
			})
	});

	$(".close").on('click',function(){
		$('.dialog').hide();
		$(".mask").hide();
	});
	require('calender');
	(function(){
			var DSTstart =$("#DSTstart").val();
    				var DSTend = $("#DSTend").val();
    				    var dstTimeArr1 = new Array(
			            "00:00",
			            "00:30",
			            "01:00",
			            "01:30",
			            "02:00",
			            "02:30",
			            "03:00",
			            "03:30",
			            "04:00",
			            "04:30",
			            "05:00",
			            "05:30",
			            "06:00",
			            "06:30",
			            "07:00",
			            "07:30",
			            "08:00",
			            "08:30",
			            "09:00",
			            "09:30",
			            "10:00",
			            "10:30",
			            "11:00",
			            "11:30",
			            "17:00",
			            "17:30",
			            "18:00",
			            "18:30",
			            "19:00",
			            "19:30",
			            "20:00",
			            "20:30",
			            "21:00",
			            "21:30",
			            "22:00",
			            "22:30",
			            "23:00",
			            "23:30"
			    );
			    var dstTimeArr2 = new Array(
			            '<option value="00:00">12:00 A.M.</option>',
			            '<option value="00:30">12:30 A.M.</option>',
			            '<option value="01:00">1:00 A.M.</option>',
			            '<option value="01:30">1:30 A.M.</option>',
			            '<option value="02:00">2:00 A.M.</option>',
			            '<option value="02:30">2:30 A.M.</option>',
			            '<option value="03:00">3:00 A.M.</option>',
			            '<option value="03:30">3:30 A.M.</option>',
			            '<option value="04:00">4:00 A.M.</option>',
			            '<option value="04:30">4:30 A.M.</option>',
			            '<option value="05:00">5:00 A.M.</option>',
			            '<option value="05:30">5:30 A.M.</option>',
			            '<option value="06:00">6:00 A.M.</option>',
			            '<option value="06:30">6:30 A.M.</option>',
			            '<option value="07:00">7:00 A.M.</option>',
			            '<option value="07:30">7:30 A.M.</option>',
			            '<option value="08:00">8:00 A.M.</option>',
			            '<option value="08:30">8:30 A.M.</option>',
			            '<option value="09:00">9:00 A.M.</option>',
			            '<option value="09:30">9:30 A.M.</option>',
			            '<option value="10:00">10:00 A.M.</option>',
			            '<option value="10:30">10:30 A.M.</option>',
			            '<option value="11:00">11:00 A.M.</option>',
			            '<option value="11:30">11:30 A.M.</option>',
			            '<option value="17:00">5:00 P.M.</option>',
			            '<option value="17:30">5:30 P.M.</option>',
			            '<option value="18:00">6:00 P.M.</option>',
			            '<option value="18:30">6:30 P.M.</option>',
			            '<option value="19:00">7:00 P.M.</option>',
			            '<option value="19:30">7:30 P.M.</option>',
			            '<option value="20:00">8:00 P.M.</option>',
			            '<option value="20:30">8:30 P.M.</option>',
			            '<option value="21:00">9:00 P.M.</option>',
			            '<option value="21:30">9:30 P.M.</option>',
			            '<option value="22:00">10:00 P.M.</option>',
			            '<option value="22:30">10:30 P.M.</option>',
			            '<option value="23:00">11:00 P.M.</option>',
			            '<option value="23:30">11:30 P.M.</option>'
			    );
			    var wtTimeArr1 = new Array(
			            "00:00",
			            "00:30",
			            "01:00",
			            "01:30",
			            "02:00",
			            "02:30",
			            "03:00",
			            "03:30",
			            "04:00",
			            "04:30",
			            "05:00",
			            "05:30",
			            "06:00",
			            "06:30",
			            "07:00",
			            "07:30",
			            "08:00",
			            "08:30",
			            "09:00",
			            "09:30",
			            "10:00",
			            "10:30",
			            "16:00",
			            "16:30",
			            "17:00",
			            "17:30",
			            "18:00",
			            "18:30",
			            "19:00",
			            "19:30",
			            "20:00",
			            "20:30",
			            "21:00",
			            "21:30",
			            "22:00",
			            "22:30",
			            "23:00",
			            "23:30"
			    );

			    var wtTimeArr2 = new Array(
			            '<option value="00:00">12:00 A.M.</option>',
			            '<option value="00:30">12:30 A.M.</option>',
			            '<option value="01:00">1:00 A.M.</option>',
			            '<option value="01:30">1:30 A.M.</option>',
			            '<option value="02:00">2:00 A.M.</option>',
			            '<option value="02:30">2:30 A.M.</option>',
			            '<option value="03:00">3:00 A.M.</option>',
			            '<option value="03:30">3:30 A.M.</option>',
			            '<option value="04:00">4:00 A.M.</option>',
			            '<option value="04:30">4:30 A.M.</option>',
			            '<option value="05:00">5:00 A.M.</option>',
			            '<option value="05:30">5:30 A.M.</option>',
			            '<option value="06:00">6:00 A.M.</option>',
			            '<option value="06:30">6:30 A.M.</option>',
			            '<option value="07:00">7:00 A.M.</option>',
			            '<option value="07:30">7:30 A.M.</option>',
			            '<option value="08:00">8:00 A.M.</option>',
			            '<option value="08:30">8:30 A.M.</option>',
			            '<option value="09:00">9:00 A.M.</option>',
			            '<option value="09:30">9:30 A.M.</option>',
			            '<option value="10:00">10:00 A.M.</option>',
			            '<option value="10:30">10:30 A.M.</option>',
			            '<option value="16:30">4:30 P.M.</option>',
			            '<option value="17:00">5:00 P.M.</option>',
			            '<option value="17:30">5:30 P.M.</option>',
			            '<option value="18:00">6:00 P.M.</option>',
			            '<option value="18:30">6:30 P.M.</option>',
			            '<option value="19:00">7:00 P.M.</option>',
			            '<option value="19:30">7:30 P.M.</option>',
			            '<option value="20:00">8:00 P.M.</option>',
			            '<option value="20:30">8:30 P.M.</option>',
			            '<option value="21:00">9:00 P.M.</option>',
			            '<option value="21:30">9:30 P.M.</option>',
			            '<option value="22:00">10:00 P.M.</option>',
			            '<option value="22:30">10:30 P.M.</option>',
			            '<option value="23:00">11:00 P.M.</option>',
			            '<option value="23:30">11:30 P.M.</option>'
			    );
			    function checkDST (timestamp) {
			        //除了当年夏令时区内, 都是冬令时
			        if (timestamp > DSTstart && timestamp <= DSTend) {
			            return 1;
			        } else {
			            return 0;
			        }
			    }
			    //判断当前时间是否为天数+2
			    function checkDayAdd2() {
			        //获取当前时间,时间戳
			        var now = new Date()
			        var time1 = now.getTime();
			        var nowtemp = parseInt(time1 / 1000);

			        //解析当前时间+24小时的时令
			        var tomorrow = nowtemp + 86400;
			        var lastTime;
			        var reasonTime;
			        //夏令时
			        if (checkDST(tomorrow)) {
			            reasonTime = dstTimeArr1;
			            //冬令时
			        } else {
			            reasonTime = wtTimeArr1;
			        }
			        lastTime = reasonTime.pop();
			        //拼接第二天时令的最后一个工作时间
			        var d = getTimeObj(tomorrow * 1000);//时间戳转换,防止跨年!
			        var laststr = d.year + "/" + d.month + "/" + d.day + ' ' + lastTime;
			        //+2天
			        if (Date.parse(laststr) < Date.parse(now)) {
			            return 1;
			        }
			        return 0;
			        //比较第二天当前时间与最后一个工作时间大小
			    }
			    $("#appDate").attr("min",getStartTime());
			    // 返回格式如 : 2016/11/07 14:52
			    function getStartTime() {
			        var addDays;
			        if (checkDayAdd2()) {
			            addDays = 2;
			            //+1天
			        } else {
			            addDays = 1;
			        }
			        //获取起始时间
			        var startTime = ( Date.parse(new Date()) / 1000 ) + 86400 * addDays;
			        var d = getTimeObj(startTime);
			        var datestr = d.year + "-" + d.month + "-" + d.day;
			        var timestr = d.hour + ':' + d.minute;
			        //比较时令,获取最近时间
			        var nearTime;
			        var reasonTimelist;
			        //夏令时
			        if (checkDST(startTime)) {
			            reasonTimelist = dstTimeArr1;
			            //冬令时
			        } else {
			            reasonTimelist = wtTimeArr1;
			        }

			        var startKey;//起始时间index
			        if (addDays == 2) {
			            startKey = 0;
			        } else {
			            startKey = getTimeStartIndex(timestr, reasonTimelist);
			        }
			        nearTime = reasonTimelist[startKey];
			        return datestr;
			    };

			    /*
			     * 根据当前时间 如 14:40 获取到列表中最接近的列表中的下标
			     * 时间列表必须有序!
			     */
			    function getTimeStartIndex(timeStr, timeList) {
			        var startKey;
			        $.each(timeList, function (index, value) {
			            if (timeStr < value) {
			                startKey = index;
			                return false;
			            }
			        });
			        return startKey;
			    };

			    function getTimeObj(time) {
			        //根据时间戳转换获取 年月日时分
			        var year, month, day, hour, minute;
			        var d = new Date(time * 1000);//时间戳转换
			        year = d.getFullYear();
			        month = pad(d.getMonth() + 1, 2);
			        day = pad(d.getDate(), 2);
			        hour = pad(d.getHours(), 2);
			        minute = pad(d.getMinutes(), 2);
			        return {'year': year, 'month': month, 'day': day, 'hour': hour, 'minute': minute};
			    }
			    /* 字符串前导零 */
			    function pad(num, n) {
			        var len = num.toString().length;
			        while (len < n) {
			            num = "0" + num;
			            len++;
			        }
			        return num;
			    }
			    //点击选定时间触发回调 -- 时间大于24为后天,小于为明天
			     function callBackfun() {
			        var dateStr = $('#appDate').val();
			        dateStr = dateStr.replace(/-/g, '/');
			        var date = new Date(dateStr);
			        var now = new Date().getTime();
			        //限制所选时间必须大于第二天,非严格判断
			        var time = date.getTime();
			        if (time <= now) {
			            alert('Please select the correct Date!');
			            $("#appDate").val("");
			            return false;
			        }
			        var timestamp = time / 1000;
			        var nowtime = new Date().getTime() + 86400000;
			        var fullDaytype = 1;//默认完整的一天
			        //选定时间为明天非完整天
			        if (nowtime > time) {
			            fullDaytype = 0;
			        }
			        appendTimeList(timestamp, fullDaytype)
			    }
			    /**
			     * 保存初始化的起始时间
			     * 比较日期 + 00:00 与 起始时间大小
			     *      大 : 完整展示列表
			     *      小 : 展示最小时间起始列表
			     */
			    var appendTimeList = function (startTime, fullDaytype) {
			        var timeList, DOMList;
			        if (checkDST(startTime)) {
			            timeList = dstTimeArr1;
			            DOMList = dstTimeArr2;
			        } else {
			            timeList = wtTimeArr1;
			            DOMList = wtTimeArr2;
			        }

			        var startKey = 0;
			        if (!fullDaytype) {
			            //根据时间戳转换获取 年月日时分
			            var nowDate = new Date();
			            var nowtimestr = pad(nowDate.getHours(), 2) + ':' + pad(nowDate.getMinutes(), 2);
			            startKey = getTimeStartIndex(nowtimestr, timeList);
			        }

			        //得到最后时间点起始
			        //拼装列表
			        var domStr = '<option value="-1">Select</option>';
			        for (i = startKey; i < DOMList.length; i++) {
			            domStr += DOMList[i];
			        }
			        $('#interview_times').html(domStr);
			    }
			var currYear = (new Date()).getFullYear();	
	        var opt={};
	        opt.date = {preset : 'date'};
	        opt.datetime = {preset : 'datetime'};
	        opt.time = {preset : 'time'};
	        opt.default = {
	            theme: 'android-ics light', //皮肤样式 
	            display: 'modal', //显示方式 
	            mode: 'scroller', //日期选择模式
	            dateFormat: 'yyyy-mm-dd',
	            lang: 'en',
	            showNow: false,
	            nowText: "today",
	            //min:new Date(2016,11,5),
	            startYear: currYear - 100, //开始年份
	            endYear: currYear + 100 //结束年份
	        };
	        $("#appDate").mobiscroll($.extend(opt['date'], opt['default'])).on("change",function(){  
	            if($(this).val()){
	            	$(".e_date").html("");		
	               	callBackfun();

            	}
        });

	})()

});
