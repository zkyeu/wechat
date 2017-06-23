define("select_class",["utility"],function(require,exports,module){
	 var utility = require("utility"),
        regs = $.formVerify.utility.regs;
        var $com_form = $(".com_form");
        
       
        var $se_class = $(".se_class");
        $se_class.click(function(){
        	$(this).addClass("click_class").parent().siblings().find("li").removeClass("click_class");
        	var $s_id = $(this).attr("data-id");
        	$(".select_id").val($s_id);
        })
        var $have_select = $com_form.find(".click_class").length;


       $(".select-submit").click(function(){
	       	var $have_select = $com_form.find(".click_class").length;
	       	// alert($(".select_id").val());
		    if($have_select == 0){
		       	$(".err_select").show();
		    }else{
		      	$("#select_class").submit();
		     }
       })
});