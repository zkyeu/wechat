define("sell_pay1_t", ["utility"], function(require, exports, module) {
    // var js_countDown = $(".js_countDown"),
    //     startTime = js_countDown.attr("startTime") || "",
    //     endTime = js_countDown.attr("endTime") || "";
    //倒计时 start
    var js_countDown = $(".js_countDown"),
        js_startendtext = $(".js_startendtext"),
        js_countDown_btn1 = $(".js_countDown_btn1"),
        js_countDown_btn2 = $(".js_countDown_btn2"),
        js_price = $(".js_price"),
        js_dayShow = $(".js_dayShow"),
        js_day = $(".js_day"),
        js_hour = $(".js_hour"),
        js_minute = $(".js_minute"),
        js_second = $(".js_second"),
        systime = js_countDown.attr("systime") || "",
        startTime = js_countDown.attr("startTime") || "",
        endTime = js_countDown.attr("endTime") || "",
        unknownPrice = js_countDown.attr("unknownPrice") || "",
        salePrice = js_countDown.attr("salePrice") || "",
        timing = null,
        time = null;

    if (systime == "" || startTime == "" || endTime == "") {
        //证明没有活动，不用倒计时。
        return ;
    }

    if (endTime == 0) {
    	js_countDown_btn1.addClass('disnone');
        js_countDown_btn2.removeClass('disnone');
        js_countDown.addClass('disnone');
        js_countDown_btn2.find('span').text("本期招生未开始，招生开始前我们将及时通知，感谢您的耐心。");
        js_price.text(unknownPrice);
        return ;
    }

    // assignment();
    write();
    timing = setInterval(function() {
        /*nowtime = nowtime - 1;
        if (nowtime < 0) {
            nowtime = maxtime;
        }*/
        // alert(123)
        write();
    }, 1000)

    function write(){
    	// var _nowtime = (new Date()).getTime(),
        //	 nowtime = parseInt(_nowtime/1000),
        systime = systime * 1 + 1;
        var nowtime = systime,
            fromStart = startTime - nowtime,
            fromEnd = endTime - nowtime;
        if(fromStart >= 0){
        	/*js_startendtext.html("开始");
        	js_countDown_btn1.addClass('disnone');
        	js_countDown_btn2.removeClass('disnone');
        	js_price.text(unknownPrice);
        	assignment(fromStart);*/
        	js_countDown_btn1.addClass('disnone');
        	js_countDown_btn2.removeClass('disnone');
        	js_countDown.addClass('disnone');
        	js_countDown_btn2.find('span').text("本期招生未开始，招生开始前我们将及时通知，感谢您的耐心。");
        	js_price.text(unknownPrice);
        }else if(fromEnd >= 0){
        	js_startendtext.html("结束");
        	js_countDown_btn1.removeClass('disnone');
        	js_countDown_btn2.addClass('disnone');
        	js_countDown.removeClass('disnone');
        	js_price.text(salePrice);
        	assignment(fromEnd);
        }else{
        	// alert("过了结束期");
        	clearInterval(timing);
        	js_countDown_btn1.addClass('disnone');
        	js_countDown_btn2.removeClass('disnone');
        	js_countDown.addClass('disnone');
        	js_countDown_btn2.find('span').text("本期招生已结束，请关注无忧课堂APP、班级家长群、服务号的新一期招生信息。");
        	js_price.text(unknownPrice);
        }
    }

    function assignment(s) {
        time = count(s);
        if(time.day <= 0){
            js_dayShow.addClass('disnone');
        }else{
            js_dayShow.removeClass('disnone');
        }
        js_day.html(time.day);
        js_hour.html(time.hour);
        js_minute.html(time.minute);
        js_second.html(time.second);
    }

    function count(s) {
        // console.log(s)
        var time = {};
        time.day = Math.floor(s / (24 * 60 * 60));
        time.hour = Math.floor(s / (60 * 60) % 24);
        time.hour = time.hour <10 ? "0"+time.hour:time.hour;
        time.minute = Math.floor(s / 60 % 60);
        time.minute = time.minute <10 ? "0"+time.minute:time.minute;
        time.second = Math.floor(s % 60);
        time.second = time.second <10 ? "0"+time.second:time.second;
        return time;
    }
    //倒计时 end

    

    // alert(111)
});
