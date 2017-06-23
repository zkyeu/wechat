define("tea_problem",[""],function(require,exports,module){
	//跳转到页面指定位置
	var href = location.href;
	var index = href.indexOf("?");
	var str = href.substring(index+1);
	if(str == "scroll=true"){
		 $(document).scrollTop("2730");
	}
	
    //回到顶部
    $(window).scroll(function(){  
        if ($(window).scrollTop()>100){  
            $("#back-to-top").show();  
        }  
        else  
        {  
            $("#back-to-top").hide();  
        }  
    });  

    //当点击跳转链接后，回到页面顶部位置  

    $("#back-to-top").click(function(){  
        $('body,html').animate({scrollTop:0},300);  
        return false;  
    });  
  


});