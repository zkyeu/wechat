define(function(require,exports,module){
    var sellBuy={
        init: function(){ 
            $(".s_tip").on("click",".tipclose",this.tipShow);
            $(".seleter").on("click",".selectors",this.timeShow);
            $(".listbox").on("click",".list",this.getLessons);
        },
        tipShow: function(){
            var that=$(this);
            that.parent(".s_tip").hide();
        },
        timeShow: function(){
            var ele=$(this).parent(".seleter").find(".listbox");
            var ele_display=ele.css("display");
            if(ele_display=="none"){
               ele.css({display: "block"});    
            }else{
                ele.css({display: "none"});
            }
        },
        getLessons: function(){
            var course_id=$(this).attr("data-course-id");
            $(this).parent(".listbox").hide();
            $(this).parent(".listbox").siblings(".selectors").html();
        }
    }
    sellBuy.init();
});