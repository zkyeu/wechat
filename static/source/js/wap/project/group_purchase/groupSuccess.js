/**
 * @authors wanghuihui@51talk.com
 */
define("groupSuccess",[""],function(require,exports,module){
    //开团倒计时
    var hour1 = $('#hour1'),
        hour2 = $('#hour2'),
        minute1 = $('#minute1'),
        minute2 = $('#minute2'),
        second1 = $('#second1'),
        second2 = $('#second2');
        timestamp=new Date().getTime(),
        time_end = new Date($('#timeId').val()).getTime(), 
        value = (time_end - timestamp)/1000,
        intDiff = parseInt(value); //倒计时总秒数量
    function timer(intDiff) {
      window.setInterval(function () {
        var day = 0,
          hour = 0,
          minute = 0,
          second = 0,
          hour_1 = '0',
          hour_2 = '0',
          minute_1 = '0',
          minute_2 = '0',
          second_1 = '0',
          second_2 = '0';
        if (intDiff > 0) {
          hour = Math.floor(intDiff / (60 * 60));
          if(String(hour).split('').length == 1){
            hour_1 = 0;
            hour_2 = String(hour).split('')[0];
          }else{
            hour_1 = String(hour).split('')[0];
            hour_2 = String(hour).split('')[1];
          }
          
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
          if(String(minute).split('').length == 1){
            minute_1 = 0;
            minute_2 = String(minute).split('')[0];
          }else{
            minute_1 = String(minute).split('')[0];
            minute_2 = String(minute).split('')[1];
          }

          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          if(String(second).split('').length == 1){
            second_1 = 0;
            second_2 = String(second).split('')[0];
          }else{
            second_1 = String(second).split('')[0];
            second_2 = String(second).split('')[1];
          }

        }
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        hour1.html(hour_1);
        hour2.html(hour_2);

        minute1.html(minute_1);
        minute2.html(minute_2);

        second1.html(second_1);
        second2.html(second_2);
        intDiff--;
      }, 1000);
    }
    timer(intDiff);
});
