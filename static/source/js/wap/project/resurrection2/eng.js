/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/,
		gradeNum = $("#similarSel").attr("date-gradeNum"),
		englishNum = $("#similarSel").attr("date-englishNum"),
		groupNum = $("#similarSel").attr("date-groupNum"),
		grade;
	$("#reg1").click(function(){
		var tel = $("#reg1_tel").val();
		var passwd = $("#reg1_passwd").val();
		if (tel == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(tel)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
		if($("#similarSel").html()=="选择年级组"){
			alert("请选择班级");
			return false;
		}
		if(grade==null){
			grade=0;
		}
		// alert($("#register_from").attr("name"));
		data = {
			"mobile":$("input[name='mobile']").val(),
			"password":$("input[name='password']").val(),
			"gradeNum":gradeNum,
			"englishNum":englishNum,
			"groupNum":groupNum,
			"grade":grade,
			"registerName":$("#register_from").attr("value")
		};
		$.ajax({
			type: "post",
             url: "/Ajax/gradeInterface",
             data: data,
             dataType: "json",
             success:function(rel){
             	if(rel.status==1){
             		if(rel.data.url==''){
             				window.location.href="http://wap.51talk.com/user/trial/reg";
             		}else{
             				window.location.href=rel.data.url;
             		}
             	}else{
             		alert(rel.info);
             	}
             }
		});
	});
	$(function(){
	    var $advList = $('#advList');
	    var $advLi = $advList.find('li');
	    var $tabDivs = $('#tabDivs').children();
	    var oldIndex = 0;
	    $advLi.mouseover(function(){
	      var index = $(this).index();
	      $advLi.eq(oldIndex).find('span').removeClass('tab_color');
	      $advLi.eq(oldIndex).find('i').removeClass('tabon'+oldIndex);
	      $(this).children('i').addClass('tabon'+index);
	      $(this).children('span').addClass('tab_color');

	      $tabDivs.removeClass('tabDesc').eq(index).addClass('tabDesc')
	      $('#sanjiao').removeClass('tab_sanjiao'+oldIndex).addClass('tab_sanjiao'+index);
	    }).mouseout(function(){
	      oldIndex = $(this).index();
	    })

	    $('#similarSel,#selOption').click(function(){

	      $('#ageList').toggle();
	      $('#selOption').toggleClass('turnBg');
	      return false;
	    })

	    $(document).click(function(){
	      $('#ageList').hide();
	      $('#selOption').removeClass('turnBg');
	    })
	    $('#ageList span').click(function(){
	      var str = $(this).text();
	      gradeNum = $(this).attr('date-gradeNum');
	      englishNum = $(this).attr('date-englishNum');
	      groupNum = $(this).attr('date-groupNum');
	      grade = $(this).attr('date-grade');
	      // alert(grade);
	      $('#similarSel').text(str).css('color','#7a7a7a');
	      // $('#ageSel').val(num);
	      $('#ageList').hide();
	      $('#selOption').removeClass('turnBg');
	    })
	  });
});
