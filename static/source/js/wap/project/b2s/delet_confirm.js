define(function(require,exports,module){
    var utility = require("utility"),
        confirm = utility.confirm;
//删除班级弹层
    (function(){
        var $delet_btn = $(".delet_btn"),
            $a_delet = $(".a_delet");
        //老师删除班级
        $delet_btn.on("click",function(){
            var $this = $(this);
            confirm({
                content: "是否删除班级？",
                width: 240,
                sureCb: function() {
                    $.ajax({
                        url: "/wap/delClass",
                        cache: false,
                        dataType: "json",
                        data: {
                                class_id: $this.attr("class_id")
                            },
                        success: function(data) {
                            var Data = data;
                            if(Data.status){
                                // window.location.assign("/wap/lists" );
                                window.location.assign("/wapNew/Teacher/transferIndex");
                            }else{
                                 utility.promptDialog({
                                    content: "删除班级失败",
                                    width: 206,
                                    height: 90
                                });
                            }
                        }
                    })
                }
            })
        });
        //代理商
        $a_delet.on("click",function(){
            var $this = $(this);
            confirm({
                content: "是否删除班级？",
                width: 240,
                sureCb: function() {
                    $.ajax({
                        url: "/wapagent/delClass",
                        cache: false,
                        dataType: "json",
                        data: {
                                class_id: $this.attr("class_id")
                            },
                        success: function(data) {
                            var Data = data;
                            if(Data.status){
                                var url = window.location.href,
                                    index = url.indexOf("school_id"),
                                    val =  url.substring(index+10);
                                window.location.assign("/wapagent/schoolDetail/?school_id=" + val);
                            }else{
                                utility.promptDialog({
                                    content: "删除班级失败",
                                    width: 206,
                                    height: 90
                                });
                            }
                        }
                    })
                }
            })
          })
    })();
//关闭选择教材提示弹层
    (function(){
      var $confirm_select_tops  = $(".confirm_select_tops"),
          $select_confirm = $(".select_confirm"),
          $close_select_confirm = $(".close_select_confirm");
      $(".close_select_confirm").on("click",function(){
        $select_confirm.hide();
        $confirm_select_tops.hide();
      })
    })();
});