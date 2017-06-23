 
define(function(require,exports,module){
    
    $(".m-bar-table-2 li:gt(0)").each(function(index) {
      var oLi=$(this);
      oLi.hover(function() {
        oLi.addClass('hover'+(index));
        $(".m-bar-table-2 .m-level-des").hide().eq(index).show();
      }, function() {
        oLi.removeClass('hover'+(index));
      });
    });


    $(".m-bar-table li:gt(0)").each(function(index) {
      var oLi=$(this);
      oLi.hover(function() {
        oLi.addClass('hover'+(index+1));
        $(".m-bar-table .m-level-des").hide().eq(index).show();
      }, function() {
        oLi.removeClass('hover'+(index+1));
      });
    });

    $(".m-scroll").mouseleave(function(){
        var oLast=$(this).find('.active:last');
        var text=oLast.attr("data-title");
        oLast.addClass('u-tri').removeClass('u-pt').siblings().removeClass('u-tri').addClass('u-pt');
        $(this).next().html(text);
    }).find('li i').mouseover(function(){
        var oLi=$(this).closest("li");
        var text=oLi.attr("data-title");
        oLi.closest(".m-scroll").next().html(text);
        //if(oLi.hasClass('active')) return;
        oLi.addClass('u-tri').removeClass('u-pt').siblings().removeClass('u-tri').addClass('u-pt');
    });

}); 