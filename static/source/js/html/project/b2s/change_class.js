define("change_class",[""],function(require,exports,module){
	;(function(){
		var $chang_class = $(".chang_class");

		$chang_class.bind("click",function(){
			var checkbox = $(":checkbox");
			var flag = [];
			for(var i=0; i<checkbox.length; i++){
				flag.push(checkbox.eq(i).prop("checked"));
			}
			var num=0;
			for(var m=0; m<flag.length; m++){
				if(flag[m] == true){
					num++;
				}
			}
			if(num == 0){
				$(".add_stu_confirm1").show();
				$(".add_confirm2").show();
				$(".close_confirm1").bind("click",function(){
					$(".add_stu_confirm1").hide();
					$(".add_confirm2").hide();
				})
			}else{
				$(".add_stu_confirm1").show();
				$(".add_confirm1").show();
				$(".close_confirm1").bind("click",function(){
					$(".add_stu_confirm1").hide();
					$(".add_confirm1").hide();
				})
			}
			
		});
	
		$(".all").bind("click",function(){
			if(this.checked){
				$(":checkbox").prop("checked",true);
			}else{
				$(":checkbox").prop("checked",false);
			}
		})
	})();
});