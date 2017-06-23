define("scheduleDate",["jedate"],function(require,exports,module){
    //引入日期插件
    var jedate = require("jedate");
    (function(){
        //开始日期
        var stime_icon = ".input-box";
        $('body').delegate(stime_icon,"click",function(){
            var inputId = ($(this).attr('id'));
            jedate({
                dateCell:"#"+inputId,
                format:"YYYY-MM-DD",
                isinitVal:false,
                isTime:false, //isClear:false,
                minDate:"2014-09-19",
            });
        });
    })();
});