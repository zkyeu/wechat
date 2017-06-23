define("acTGrade",["utility"],function(require,exports,module){
	require("utility");
    var opinion = $(".class-opinion"),
        li = opinion.find("li");
    opinion.on("click","li span:not('.first-s')",function(){
        var self = $(this),
            cur = "current-radio";
        if(self.hasClass(cur)) return;
        var index = self.index(),
            li = self.closest("li");
        self.addClass(cur).siblings().removeClass(cur);
        if(!!self.closest(".m-text")[0]) index++;
        li.attr("data-checked",index);
    });

    $(".js-opinion").on("click.k",function(){
        var sbflag = true,
        	dataArr = [];
        $.each(li,function(i,v){
            var v = $(v),
                data = v.attr("data-checked");
            if(typeof(data) == "undefined"){
                acUtility.alert({"content":"调查问题还没填完，不能提交哦！",width:220});
                sbflag = false;
                return false;
            }else dataArr.push(data);
        });
        if(sbflag){
        	if(typeof(submitCb) == "function"){
        		submitCb.call(null,dataArr);
        	}
        }
    });
});