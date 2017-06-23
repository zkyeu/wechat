define(function(require){
/*验证*/
  var reTel = /^1[0-9]{10}$/;
  var sLar=/^[124567]$/;
  $("#submit1").click(function(){
    var tel=$("#reg1_tel").val();
    var passwd=$("#reg1_passwd").val();
    var similar=$("#ageSel").val();
    if(tel==""){
      alert("请填写手机号码");
      return false;
    }
    if(!reTel.test(tel)){
      alert("请填写正确格式手机号码"); 
      return false; 
    }
    if(passwd==""){
      alert("请填写密码");
      return false;
    }
    if(similar== -1){
      alert("年龄段不能为空");
      return false;
    }
    if(!sLar.test(similar)){
      alert("年龄段格式不正确");
      return false;
    }
    $("#RegForm1").submit();
  });

/*选择学员*/
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
      $('#ageList').show();
      $('#openWidnow').addClass('openWidnowUp');
      $('#selOption').addClass('turnBg');
      $('#orderBtn2').hide();
      return false;
    })

    $(document).click(function(){
      $('#openWidnow').removeClass('openWidnowUp');
      $('#ageList').hide();
      $('#selOption').removeClass('turnBg');
      $('#orderBtn2').show();
    })
    $('#ageList span').click(function(){
      var str = $(this).text();
      var num = $(this).attr('num');
      $('#openWidnow').removeClass('openWidnowUp');
      $('#similarSel').text(str).css('color','#000');
      $('#ageSel').val(num);
      $('#ageList').hide();
      $('#selOption').removeClass('turnBg');
      $('#orderBtn2').show();
    })
  });
});