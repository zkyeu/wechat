define(function(require,exports,module){
    //全局参数配置
    var gconfig = {
        url: "http://wapdev.51talk.com"
    };

    /****************获奖名单播放 Start******************/
    function scroll_news(){
        var nameList = $('.share_names');
        nameList.find(".name_list").animate({
            marginTop: "-1.5rem"
        },500,'ease-in-out',function(){
            $(this).css({marginTop: "0rem"}).find("li:first").appendTo(this);
        });
    }
    setInterval(scroll_news,2000);
    /****************获奖名单播放 End ******************/

    var $ruleBtn = $('#rule');
    var $rulePannel = $('#rulePanel');//活动介绍
    var $rulePanelClose = $('#rulePanel .close');

    $ruleBtn.click(function(){
        $rulePannel.removeClass('hide');
    });
    $rulePanelClose.click(function(){
        $rulePannel.addClass('hide');
    });

});
