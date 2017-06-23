/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-12-16 16:10:30
 * @version 1.0.0
 */
define("t_report",["highcharts","swfobject"],function(require,exports,module){


    $(function(){
       var ReportFn = function(){
       	 this.listBox = $('#listBox');
       	 this.listMain = $('.list-main');
       	 this.smallTab = $('._smallTab');
       	 this.preQuestion = $('._pre-q');
       	 this.nextQuestion = $('._next-q');
         this.playBtn = $('.play-btn');
       	 this._event();
       };
       ReportFn.prototype = {
       	_event:function(){
       		var that = this;
          $(".main-c").each(function(){
              $(this).find('.question').eq(0).find('._pre-q').addClass('first-question');
          });
       		this.preQuestion.on('click',function(){
       			//当前块问题总数
       			that.question = $(this).parents('.list-main').find('.question')
       			that.allQ = that.question.size();
       			//当前块当前问题索引值
       			that.currentQ = $(this).parents('.list-main .question').index();
       			if(that.currentQ > 0){
       				that.question.hide();
       				that.question.eq(that.currentQ-1).show();
       			}
       		});
       		this.nextQuestion.on('click',function(){
			     	that.question = $(this).parents('.list-main').find('.question');
       			that.allQ = that.question.size();
       			that.currentQ = $(this).parents('.list-main .question').index();
       			if(that.currentQ < that.allQ-1){
       				that.question.hide();
       				that.question.eq(that.currentQ+1).show();
              if(that.currentQ == that.allQ-2){
                that.question.eq(that.currentQ+1).find('._next-q').addClass('last-question');
              }
       			}
       		});
       		this.listBox.find('li').on('click',function(){
       			that.currentIndex = $(this).index();
       			$(this).parent().hide();
       			
       			that.listMain.eq(that.currentIndex).show();
       		});
       		this.smallTab.on('click',function(){
       			that.dataTab = $(this).attr('data-tab');
       			that.listMain.hide();

            $('ul[data-list="'+that.dataTab+'"]').show();
       		});
          this.playBtn.on('click',function(){
            that.yinpin = $(this).attr('yinp-value');
            playSound(that.yinpin);
            $(this).unbind('mouseout');
            that.showYellow($(this));
          });
          this.playBtn.on('mouseover',function(){
            that.showYellow($(this));
          });
          this.playBtn.on('mouseout',function(){
            that.showGrey($(this));
          });
       	},
        showYellow:function(dom){
          dom.removeClass('play-g');
          dom.addClass('play-y');
        },

        showGrey:function(dom){
          dom.removeClass('play-y');
          dom.addClass('play-g');
        }
       };
       new ReportFn();
    });


       (function () {

           $(document).ready(function () {
               // Build the chart
               $('#picContainer').highcharts({
                   chart: {
                       backgroundColor: null,
                       plotBackgroundColor: null,
                       plotBorderWidth: null,
                       plotShadow: false,
                       type: 'pie'
                   },
                   title: {
                       text: ''
                   },
                   tooltip: {
                       pointFormat: ''//<b>{point.percentage:.1f}%</b>
                   },
                   plotOptions: {
                       pie: {
                           allowPointSelect: true,
                           cursor: 'pointer',
                           dataLabels: {
                               enabled: false
                           },
                           showInLegend: true
                       }
                   },
                   series: [{
                       name: 'Brands',
                       colorByPoint: true,
                       data: [{
                           name: lScore,
                           y: lSpeech
                       },{
                           name: gScore,
                           y: gSpeech
                           //sliced: true,
                           //selected: true
                       }]
                   }],
                   colors: ['#058DC7', '#50B432']
               });
           });
       })();

       $(function () {

           $('#columnContainer').highcharts({
               chart: {
                   backgroundColor: null,
                   plotBackgroundColor: null,
                   type: 'column'
               },
               title: {
                   text: ''
               },
               subtitle: {
                   text: ''
               },
               xAxis: {
                   categories: [
                       /*'Jan',
                       'Feb',
                       'Mar',
                       'Apr',
                       'May',
                       'Jun',
                       'Jul',
                       'Aug',
                       'Sep',
                       'Oct',
                       'Nov'*/
                       cjshow
                   ],
                   crosshair: true
               },
               yAxis: {
                   min: 0,
                   title: {
                       text: ''//Rainfall (mm)
                   }
               },
               tooltip: {
                   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                   pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                       '<td style="padding:0"><b>{point.y:.1f} 分</b></td></tr>',
                   footerFormat: '</table>',
                   shared: true,
                   useHTML: true
               },
               plotOptions: {
                   column: {
                       pointPadding: 0.2,
                       borderWidth: 0
                   }
               },
               series: [{
                   name: gVoiceUnit1t,
                   data: [gVoiceUnit1]

               }, {
                   name: gVoiceUnit2t,
                   data: [gVoiceUnit2]

               }]
           });
       });



/*  swf音频播放  Start  */
function playSound(mp3_addr){
    document.getElementById('b2splay').playSound(mp3_addr,playCurrentTime);
}
function stopSound(){
    document.getElementById('b2splay').stopSound();
}
/*  swf音频播放  End  */

 var randomPlay = Math.random(),
     swfHref = $("[swfHref]").attr("swfHref") || "/static/js/html/project/b2s/b2splay.swf";
$("#mp3Box").append(
        '<object type="application/x-shockwave-flash" id="b2splay" name="mp3main" align="middle" data="'+ swfHref +'?rnd='+randomPlay+ '" width="1px" height="1px">'+
        '<param name="disState" value="0">'+
        '<param name="movie" value="'+ swfHref +'?rnd='+randomPlay+ '"/>'+
        '<param name="quality" value="high">'+
        '<param name="bgcolor" value="#ffffff">'+
        '<param name="allowscriptaccess" value="sameDomain">'+
        '<param name="allowfullscreen" value="false">'+
        '<param name="wmode" value="transparent">'+
        '</object>'
);




  window["playCurrentTime"] = 0;

  window["onSoundPaused"] = function (currentTime){    //通知JS，声音已经暂停
      playCurrentTime = currentTime;
  }

  window["onSoundPlayEnd"] = function (argv){  //通知JS声音播放完毕
      playCurrentTime = 0;
      if($('.play-btn').hasClass('play-y')){
        $('.play-btn').removeClass('play-y');
        $('.play-btn').addClass('play-g');
      }
      
  }


});