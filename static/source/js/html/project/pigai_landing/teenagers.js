 
define(function(require,exports,module){
	require("placeholder");
    $(".pow_group,.pg_arrow").click(function(){
          $(".list_group").toggle();
          $(".pg_arrow").attr("src","http://one.frontend.com/static/images/html/pigai_landing/pg_down.png");
       var pg_arrow_src=$(".pg_arrow").attr("src");
       if(pg_arrow_src=="http://one.frontend.com/static/images/html/pigai_landing/pg_down.png"){
             $(".pg_arrow").attr("src","http://one.frontend.com/static/images/html/pigai_landing/pg_up.png");
             return false;
       }else{
             $(".pg_arrow").attr("src","http://one.frontend.com/static/images/html/pigai_landing/pg_down.png");
             return false;
       }    
   });
     $(".list_group").find("a").click(function(){
       var nowTxt=$(this).text();
       $(".pow_group").text(nowTxt);
       $(".list_group").hide();
       $(".pg_arrow").attr("src","http://one.frontend.com/static/images/html/pigai_landing/pg_down.png");
     })
    $(".pow_btn").click(function(){
        var pow_email=$(".pow_email").val();
        var pow_phone=$(".pow_phone").val();
        var pow_pw = $(".pow_pw").val();
        var pow_group=$(".pow_group").text();
        var emailre = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
        var regMobile=/^1[0-9]{10}$/;
        var regPass=/^([a-z0-9]{6,20})$/;
        if (!emailre.test(pow_email)) {
            alert('请填写正确的邮箱！');
            return false;
        } else if(!regMobile.test(pow_phone)) {
            alert('请填写正确的手机号码！');
            return false;
        } else if(!regPass.test(pow_pw)){
           alert('密码为6-20位字母数字组合');
           return false;
        }else if(pow_group!="中学"&&pow_group!="大学"){
            alert("请选择您的年级！");
            return false;
        }else {
          document.getElementById("t-regForm").submit();
        }
    })
  
});
