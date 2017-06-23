var completeLessonMemo =0;
//AC接收日期参数
var class_notify_json; 
//调用客户端方法
function js2c(name,json){
    if(typeof json == 'object'){
        var json = JSON.stringify(json);
    }
    if(originStr=='mac'){
        window["webkit"]["messageHandlers"][name]["postMessage"]({'mac_parameters': json});
    }else{
        //windows系统调用此方法
        window.AcJs_get(name, json);
    }
}

//进出教室刷新
function timed_refresh(){
    var second = parseInt((Math.random()*5+5)*60*1000);
    setTimeout(function(){
        location.reload();
    },second)
}

//定义进入教室函数，等待客户端调用
function autoenter_class(obj){
    var newObj = JSON.parse(obj);
    $('#myList .item').each(function(){
        var itemId = $(this).data('id');
        var itemTypeid = $(this).data('typeid');
        if( (newObj.id==itemId) && (newObj.coursestyle==itemTypeid)){
            timed_refresh();
            var str = $(this).find('.enter').attr('data-enter');
            str = str.replace(/\@{5}/g,'>').replace(/%{5}/g,'<').replace(/\*{5}/g,"'");
            js2c('cpp_EnterClass',str);
        }
    })
}
// 默认空函数
function svc_notify(){}



$(function(){
    var upcomingArr = [];
    var completeArr = [];
    var time = 0;
    var tipTimer;
    var freshTimer;
    var playCardTimer;
    var timerBanner;
    var arrSendAgain = [];

    var timeConfig = {};
    var banWidth;
    var liLen;
    var iNow=0;
    var defaultConfig;
    init();
    //入口
    function init(){
        // 获取默认参数
        var argumentStr = location.search.substring(1);
        defaultConfig = str2json(argumentStr);
        
        //初始化window大小
        initWindow();
        //获取默认距离开课的提醒时间
        getConfigTime();
        //获取默认距离解锁打卡时间
        getSignTime();
        //tab请求
        tabAjax();
        //banner请求
        bannerAjax();
    }
    //初始化body宽高
    function initWindow(){
        var winW = $(window).width();
        var winH = $(window).height();
        $('body').css({
            width: winW-20,
            height: winH
        })
    }

    //复制到粘贴板
    function setCopy(){
        var client = new ZeroClipboard( $('.copyHref') );
        client.on( "ready", function( readyEvent ) {
          client.on( "aftercopy", function( event ) {
            $(event.target).prev().show();
            setTimeout(function(){
                $(event.target).prev().hide();
            },1500)
          });
        } );
    }

    //解锁打卡
    function changeCheck(){
        clearInterval(playCardTimer);
        playCardTimer = setInterval(function(){
            var $noCheck = $('#myList .no-check');
            if($noCheck.length==0){
                clearInterval(playCardTimer);
            }else{
                $noCheck.each(function(index,item){
                    var cardTime = $(this).attr('data-cardTime');
                    if(cardTime*1000 < time){
                        $(this).removeClass("no-check").addClass("check-now").find('.tipInfoCommon').remove();
                    }
                })
            }
        },1000)
    }
    //href参数切割
    function str2json(str){
        var arr = str.split('&');
        var json = {};
        for(var i=0; i<arr.length; i++){
            var key2val = arr[i].split('=');
            json[key2val[0]] = key2val[1];
        }
        return json;
    }
    //打卡 ajax请求
    function signAjax($item){
        var str = '<a href="javascript:;"><span class="check-icon"></span>Checked in</a>';
        $item.removeClass("check-now").addClass("checked").html(str);
        var courseId = $item.closest(".item").data('id');
        var now = parseInt(Date.now()/1000);
        var dates = new Date()
        var signInfo = {
            u_id: defaultConfig.relId,
            c_id: courseId,
            c_type:0, //1v1固定为0
            c_time:now,
            syn_time:time/1000,
            token: defaultConfig.token
        }

        $.extend(true,signInfo,defaultConfig);

        $.ajax({
            url: host + '/Ac/AcSign/signIn',
            type: 'get',
            data: signInfo,
            dataType:'jsonp',
            jsonp:'jsoncallback',
            success: function(rs){
                if(rs.code>=20000){
                    js2c('cpp_TokenBreak','');
                }
            }
        })
    }
    //banner点击统计次数
    function bannerClick(id){
        var bannerInfo = {
            id: id,
            uid: defaultConfig.relId,
            type: 'teacher'
        }
        $.ajax({
            url: host + '/Ac/AcData/addBannerClickLog',
            type: 'get',
            data: bannerInfo,
            dataType:'jsonp',
            jsonp:'jsoncallback',
            success: function(rs){}
        })
    }

    //根据sessionStorage, 判断显示哪天数据
    function showWhichDay(){
        var preView = sessionStorage.getItem('DateStr');
        var isOvertime = true;
        var $lis = $('#classTab li');
        var $first = $lis.eq(0);
        if(preView){
            $lis.each(function(){
                var day = $(this).attr('data-date');
                if(day==preView){
                    isOvertime = false;
                    $(this).addClass("active");
                    switchList(this,day);
                    return false;
                }
            })
            if(isOvertime){
                $first.addClass("active");
                switchList($first[0]);
            }
        }else{
            $first.addClass("active");
            switchList($first[0]);
        }
    }
    
    //更新课程列表
    function switchList(item,day,isForce){
        upcomingArr = [];
        completeArr = [];
        $('#listBox').children().html('');
        var classNum = $(item).find('.day-tips').text();
        var isPast = $(item).attr('data-past');

        if(isForce){
            changeListTab(isPast);
            listAjax(day);
        }else{
            if(classNum>0){
                changeListTab(isPast);
                listAjax(day);
            }else{
                noClassTip(0);
                $('#pass-list').hide();
            }
        }
    }

    //切换未完成、已完成tab
    function changeListTab(isPast){
        $('#pass-list li').removeClass("active").eq(isPast).addClass("active");
        $('#listBox').children().addClass("hide").eq(isPast).removeClass("hide");
    }

    //更改屏幕尺寸大小
    window.onresize = function(){
        initWindow();
    }
    //点击tab日期标签，更新列表
    $('#classTab').on('click','li',function(){
        var day = $(this).attr('data-date');
        sessionStorage.setItem('DateStr',day);
        $(this).addClass("active").siblings().removeClass("active");
        //数据初始化
        loadList(this,day,false);
    })

    function loadList(obj,day,isForce){
        arrSendAgain = [];
        clearInterval(tipTimer);
        clearInterval(freshTimer);
        clearInterval(playCardTimer);
        switchList(obj,day,isForce);
    }

    //重刷页面
    $('#refreshBtn').click(function(){
        var $li = $('#classTab .active');
        var day = $li.attr('data-date');
        loadList($li[0],day,true);
    })
    //移入移出禁止打卡标签
    $('#myList').on('mouseover','.no-check',function(){
        $(this).find('.tipInfoCommon').show().find('i').text(timeConfig.sign);
    }).on('mouseout','.no-check', function(){
        $(this).find('.tipInfoCommon').hide();
    })
    //点击打卡
    $('#myList').on('click','.check-now',function(){
        signAjax($(this));
    })
    //已完成，未完成 tab切换
    $('#pass-list li').click(function(){
        $('#defaultTip').hide();
        var $This = $(this);
        var index = $This.index();
        var classNum = $This.find('span').text().replace(/[()]/g,'');
        changeListTab(index);

        if(classNum==0){
            noClassTip(index);
        }
    })
    
    //点击链接，打开新页面
    $('#myList').on('click','.openHref',function(){
        var href = $(this).find('a').attr('data-href');
        js2c('cpp_OpenURL',href);
    })
    $('#bannerList').on('click','li',function(){
        var $A = $(this).find('a');
        var href = $A.attr('data-href');
        var id = $A.attr('data-id');
        bannerClick(id);
        js2c('cpp_OpenURL',href);
    })

    //点击进入教室
    $('#myList').on('click','.enter',function(){
        timed_refresh();
        var str = $(this).attr('data-enter');
        var str = str.replace(/\@{5}/g,'>').replace(/%{5}/g,'<').replace(/\*{5}/g,"'");
        js2c('cpp_EnterClass',str);
    })
    
    //点击banner图点点
    $('#dots').on('click','li',function(){
        clearInterval(timerBanner);
        iNow = $(this).index()-1;
        move(iNow,banWidth,liLen);
    })
    //移入移出banner
    $('#bannerList').hover(function(){
        clearInterval(timerBanner);
    },function(){
       timerBanner = setInterval(function(){
           move(iNow,banWidth,liLen);
       },2000);
    })

    /**
     * 功能：获取1vs1 学生标签及描述
     * items: 元素集合
     * begin：开始
     * end：结束
     * hasSend： 是否是第二次请求
     */
    //获取1vs1 学生标签及描述
    function dealTag(items,begin,end){
        if(begin<=end){
            var ele = items.eq(begin);
            var id = ele.attr('data-id');

            var defer = $.ajax({
                url: host + '/Ac/MyLesson/getAppointTeachInfo',
                type: 'get',
                data: {appoint_id:id,relId:defaultConfig.relId},
                dataType:'jsonp',
                jsonp:'jsoncallback'
            })

            defer.always(function(rs){
                if(rs.code == 1){
                    var teacherTips = rs.res;
                    var classTips = '';
                    
                    var listLi = '';
                    for(var attr in teacherTips){

                        if(attr != 'stuTag' && (typeof teacherTips[attr] != 'boolean')){
                            if(teacherTips[attr].length){
                                var joinIcon = '';

                                if(attr == 'teaching_tips'){
                                    joinIcon = '/';
                                }else{
                                    joinIcon = '';
                                }
                                var txt = teacherTips[attr].join(joinIcon);

                                var title = attr.replace('_',' ').replace(/\b\w+\b/g,function($1){
                                    return $1.substring(0,1).toUpperCase()+ $1.substring(1);
                                })
                                listLi += '<li><h3 class="lesson-tit">- '+title+' :  </h3><p class="lesson-text">'+txt+'</p>';
                            }

                            classTips = '<div class="lesson-cont"><h3 class="lesson">Lesson Preparation:</h3><ul class="lesson-list">'+listLi+'</ul></div>';

                        }else{
                            var tagStr = '';
                            var newTags = teacherTips.stuTag;
                            for(var i=0; i<newTags.length; i++){
                                tagStr += '<span class="'+newTags[i]+'"></span>';
                            }
                        }
                    }
                    ele.find('.student-type').append(tagStr);
                    ele.find('.test').replaceWith(classTips);
                    dealTag(items,++begin,end);
                }else{
                    ele.find('.test').remove();
                }
            })
        }
    }
    //展示时间信息
    function getUTCtime(time){
        $('#utcTime .china-t').show();

        var d = getChinaDate(time)
        dStr = d.toString()
        var arr = dStr.split(' ');
        var year = arr[3];
        var day = arr[2];
        var month = d.getMonth()+1;
        day = parseInt(day);
        month = parseInt(month);
        day = day>9 ? day : '0'+ day;
        month = month>9 ? month : '0'+month;
        var dateStr = month + '/' +day + '/' + year;
        var $right = $('#utcTime');
        $right.find('.time').text(arr[4]);
        $right.find('.China-day').text(dateStr);
        $right.find('.China-week').text(arr[0]);
    }

    //将其他时间转换为北京时间
    function getChinaDate(time){
        var d = new Date(); 
        var utc = time + d.getTimezoneOffset() * 60000; 
        var chinaTime = utc + (3600000*8); 
        d.setTime(chinaTime); 
        return d;
    }
                     
    //创建tab日期列表
    function createTab(arr){
        var str = '';
        for(var i=0; i<arr.length; i++){
            var obj = arr[i];
            var num = parseInt(obj.classNum);
            var className = '';
            if(num>0){
                className = 'hasClass';
            }
            var day = '<span class="day">'+obj.showTime+'&nbsp;'+obj.dateDesc+'</span><br>';
            var icon = '<span class="day-icon"></span>';
            var tip = '<span class="day-tips">'+obj.classNum+'</span>';
            str += '<li data-past="'+obj.isPast+'" data-date="'+obj.hiddenTime+'" class="'+className+'">'+day+icon+tip+'</li>';
        }
        $('#classTab').html(str);
    }

    //处理上课展示类型
    function dealType(obj){
        var classWay, classTypeIcon;
        switch(obj['teachType']){
            case 0:
                classWay = classTypeIcon = '';
                break;
            case 1:
                classWay = 'type-qq';
               classTypeIcon = ' <span class="tel-qq"><span class="qq-icon">QQ </span><span class="qq-n">'+obj.qq+'</span></span>';
                break;
            case 2:
                classWay = 'type-s';
                classTypeIcon = ' <span class="tel-qq"><span class="qq-icon">Skype </span><span class="qq-n">'+obj.skype+'</span></span>';
                break;
            case 3:
                classWay = 'type-phone';
                classTypeIcon = '<span class="tel-phone"><span class="phone-icon"></span><span class="phone-n">'+obj.phone+'</span></span>';
                break;
            default:
                classWay = classTypeIcon = '';
        }
        return {
            way: classWay,
            icon: classTypeIcon
        }
    }

    //每秒钟刷新一次上课列表
    function freshList(){
        freshTimer = setInterval(function(){
            var $spanArr = $('#myList .time-long');
            if($spanArr.length == 0){
                clearInterval(freshTimer);
            }else{
                $spanArr.each(function(index,item){
                    var start = $(this).attr('data-start')*1000;
                    var end = $(this).attr('data-finish')*1000;

                    if(time>=end){
                        var id = $(this).attr('data-id');

                        $(this).closest(".item").remove();
                        for(var i=0; i<upcomingArr.length; i++){
                            var obj = upcomingArr[i];
                            if(obj.id == id){
                                var completedItemHtml = initList([obj],true);
                                completeArr.push(obj);
                                upcomingArr.splice(i,1);
                                var upcomingLen = upcomingArr.length;
                                if(upcomingLen==0){
                                    noClassTip(0);
                                }
                                if(obj.courseDesc===0 || obj.gradeRating===0){
                                    $('#pass-list li').eq(1).find('.pass-tips').text('('+(nosubTotal+1)+')');
                                }    
                                $('#pass-list li').eq(0).find('.today-tips').text('('+upcomingLen+')');
                                $('#pass-list li').eq(1).find('.pass-tips').text('('+completeArr.length+')');
                                
                                $('#myComplete').append(completedItemHtml);
                                break;
                            }
                        }
                    }else if(time<end && start<time){
                        $(this).find('.clock-infor').html('In progress !');
                        $(this).removeClass("time-pre");
                        var id = $(this).attr('data-id');
                        var $ele = $(this);
                        var parent =  $ele.closest(".item"); 
                        parent.find(".memoflag").removeClass("check").removeClass('no-check'); 
                        parent.find(".levelflag").removeClass("check").removeClass('no-check');
                       
                    }else{
                        if(start-time< 1000 * 60 *60){
                            var leaveTime = parseInt((start-time)/(1000*60))+1;
                            var temp = (leaveTime>1) ? 'mins left !' : 'min left !';

                            $(this).find('.clock-infor').html(leaveTime +temp);
                            $(this).removeClass("time-pre");
                        }
                    }
                })
            }
        },1000)
    }


    //生成 lessonmemo的状态逻辑
            //courseDesc 0 
    function renderMemoBtn(obj){

        var rightPart="";
        var start= obj.startTimeStamp*1000; 
        var end = obj.endTimeStamp*1000;
        var lessonMemoClass ="";
            var levelAssesement="";
            if(obj.courseDesc!=0){
                lessonMemoClass="memoflag havenSubmit";
            }else{
                lessonMemoClass = "normal memoflag";
            }

            if(obj.gradeRating!=0){
                levelAssesement="levelflag havenSubmit";
            }else{
               levelAssesement= "normal levelflag"
            }
    /*    if(time<end && start<time){
            //正在进行中
            if(obj.user_point!="buy"){
                rightPart+='<li class="'+lessonMemoClass+'" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                rightPart+='<li class="'+levelAssesement+'" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Level Assessment</li>';
            }else{
                rightPart+='<li class="'+lessonMemoClass+'" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
            } 
        }else if(time>end){
            //已经完成的
            if(obj.user_point!="buy"){
                rightPart+='<li class="'+lessonMemoClass+'" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                rightPart+='<li class="'+levelAssesement+'" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Level Assessment</li>';
            }else{
                rightPart+='<li class="'+lessonMemoClass+'" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
            } 
        }else {
            //未开始的
             if(obj.user_point!="buy"){
                
                rightPart+='<li class="normal memoflag check no-check" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'"><span class="tipInfoCommon tipSign">Fill it after the start of course</span><a href="javascript:void(0)">Lesson Memo</a></li>';
                rightPart+='<li class="normal levelflag check no-check" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'"><span class="tipInfoCommon tipSign">Fill it after the start of course</span><a href="javascript:void(0)">Level Assessment</a></li>';
            }else{
                rightPart+='<li class="normal memoflag check no-check" data-occup="'+obj.occup +'"  data-stulevel="'+obj.stuLevel+'" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'"><span class="tipInfoCommon tipSign">Fill it after the start of course</span><a href="javascript:void(0)">Lesson Memo</a></li>';
            } 
        }*/


        return rightPart;
         
    }
    
    //生成列表
    function initList(data,isComplete){
        var ulHtml = '';
        for(var i=0; i<data.length;i++){
            var obj = data[i];
            //将>转为5个@,<转为5个%
            var objStr = JSON.stringify(obj).replace(/\>/g,'@@@@@').replace(/\</g,'%%%%%').replace(/'/g,'*****');
            var classType = obj.classTypeId-0;
            
            var classTypeStr = '<span class="type">'+obj.classTypeEn+'</span>';
            var beginTime = obj.startTime.split(' ')[1].substring(0,5);
            var endTime = obj.endTime.split(' ')[1].substring(0,5);
            var classTime = '<span class="clock-time">'+beginTime +'-' +endTime+'</span>';
            var stuStr = '';
            var extraDiv = '';
            var loadingDiv = '';
            var classTitle = '<div class="schedule">'+obj.courseName+'</div>';
            var rightPart = '';
            var loneItem = '';

            var typeObj = dealType(obj);

            var classWay = typeObj.way;
            var classTypeIcon = typeObj.icon;
            var classWayStr = '<dt class="type-class '+classWay+'"></dt>';
            switch(classType){
                case 0:  // 1vs1
                    classTime = '<span class="clock-time">'+beginTime+'</span>';

                    if(obj.isObtTrail==1){
                        classTypeStr = '<span class="type"><i class="obt"></i><i>'+obj.classTypeEn+'</i></span>';
                    }
                    //1v1且上课类型为ac的体验课
                    if( (obj.isObtTrail==1) && (obj['teachType']==0) ){
                        var obtTxt = '';
                        if(isComplete){
                            obtTxt = 'The system didn\'t assign any student for this slot.';
                        }else{
                            obtTxt = 'Waiting for a student to be assigned to you.';
                        }
                        loneItem = '<div class="item" data-typeid="'+classType+'" data-id="'+obj.id
                                    +'"><dl class="item-left">'
                                    + classWayStr
                                    + '<dd class="class-cont"><div class="time-type"><span class="time-long time-pre" data-start="'+obj.startTimeStamp+'" data-finish="'+obj.endTimeStamp+'" data-id="'+obj.id+'" data-teatype="'+obj['teachType']+'"><span class="clock-icon"></span>'
                                    +  classTime ;
                                    
                        loneItem =loneItem +'</span>'+ classTypeStr+ '</div><div class="student-type">'+obtTxt+'</div></dd></dl></div>';
                     }else{
                        if(obj.isShowFt==1){
                            classTypeStr = '<span class="type"><i class="obt"></i><i>'+obj.classTypeEn+'</i></span>';
                        }
                        var downUrl = obj.courseSource;
                        var downUrl2 = obj.teaCourseSource||obj.courseSource;
                        if(obj.stuLevel){
                            var showLevel = '（Level '+obj.stuLevel+'）';
                        }else{
                            var showLevel = '';
                        }
                        stuStr = '<div class="student-type"><span class="s-level">Student：'+obj.stuNickName+showLevel+'</span>';
                        classTitle = '<div class="schedule">'+obj.courseClassNameEn +'>'+obj.courseNameEn+'</div>';
                        
                        if(!isComplete){
                            loadingDiv= '<div class="test"><div class="insertLoad"><img src="/static/images/html/AC/loading.gif"/><span>loading...</span><div></div>';

                            if(obj['teachType']==0){
                                rightPart +='<ul class="item-right"><li class="enter" data-enter=\''+objStr+'\'><a href="javascript:;">Enter Classroom</a></li>'
                                if(downUrl){
                                    rightPart += '<li class="normal openHref"><a data-href="'+downUrl2+'">Download</a></li>';
                                }

                                rightPart += renderMemoBtn(obj); 
                                /*if(obj.user_point!="buy"){
            
                                     rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                                     rightPart+='<li class="normal levelflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Level Assessment</li>';
                                }else{
                                     rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                                }   */
                            }else{
                                rightPart +='<ul class="item-right">';
                                switch(obj.clockStatus){
                                    //未打卡
                                    case '0':
                                       rightPart +='<li class="check check-now"><a href="javascript:;"><span class="check-icon"></span>Check in</a></li>';
                                       break;
                                    //已打卡
                                    case '1':
                                        rightPart +='<li class="check checked"><a href="javascript:;"><span class="check-icon"></span>Checked in</a></li>';
                                        break;
                                    //屏蔽打卡
                                    case '2':
                                        rightPart +='<li class="check no-check" data-cardTime="'+obj.playCard+'"><span class="tipInfoCommon tipSign">Press the check in button <i></i> secs prior to class</span><a href="javascript:;"><span class="check-icon"></span>Check in</a></li>';
                                }
                                if(downUrl){
                                    rightPart += '<li class="normal openHref"><a data-href="'+downUrl2+'">Download</a></li>';
                                }
                                /*if(obj.user_point!="buy"){
                                     rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                                     rightPart+='<li class="normal levelflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Level Assessment</li>';
                                }else{
                                     rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                                } */
                                rightPart += renderMemoBtn(obj); 
                                if(obj.teaFlashUrl){
                                    rightPart += '<li class="normal openHref"><a data-href="'+obj.teaFlashUrl+'">Teacher Whiteboard</a></li>';
                                }
                                if(obj.stuFlashUrl && (obj['teachType']!=3)){
                                    rightPart += '<li class="normal"><span class="tipInfoCommon">Copied</span><a class="copyHref" data-clipboard-text="'+obj.stuFlashUrl+'">Student Whiteboard</a></li>';
                                }
                            }
                            rightPart += '</ul>';
                        }else{
                            if(obj.status == 's_absent'){
                                rightPart = '<ul class="item-right"><li class="absent"><a href="javascript:;"><span class="absent-icon"></span>Student absent</a></li>';
                                rightPart += renderMemoBtn(obj);     
                                rightPart=+'</ul>';
                            }else{
                                rightPart = '<ul class="item-right">';
                                rightPart += renderMemoBtn(obj);     
                                rightPart +='</ul>';
                            }
                        }
                    }
                    break;
                case 1:  // open class
                case 12: // kids group class
                    if(classType==12){
                        stuStr = '<div class="student-type">';
                    }else{
                        var totalStu = obj.totalStu;
                        if(totalStu>1){
                            stuStr = '<div class="student-type"><span class="s-level"> '+totalStu+' Students have booked</span>';
                        }else{
                            stuStr = '<div class="student-type"><span class="s-level"> '+totalStu+' Student have booked</span>';
                        }
                        
                    }
                    
                    if(!isComplete){
                        rightPart +='<ul class="item-right"><li class="enter" data-enter=\''+objStr+'\'><a href="javascript:;">Enter Classroom</a></li>';
                    }
                    /*if(obj.user_point!="buy"){
                         rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                         rightPart+='<li class="normal levelflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Level Assessment</li>';
                    }else{
                         rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                    } */
                   // rightPart += renderMemoBtn(obj); 
                    break;
                case 6: //training class
                    if((obj.courseStyle==0) || (obj.courseStyle==6)){
                        classTime = '<span class="clock-time">'+beginTime+'</span>';
                        if(obj.courseStyle==0){
                            classTitle = '<div class="schedule">'+obj.courseClassNameEn +'>'+obj.courseNameEn+'</div>';
                            if(obj.courseRole==1){
                                stuStr = '<div class="student-type"><span class="s-level">Teacher：'+obj.teaRealName+'</span>';
                            }else{
                                stuStr = '<div class="student-type"><span class="s-level">Student：'+obj.stuNickName+'</span>';
                            }
                        }
                        if(obj.courseStyle==6){
                            classTitle = '<div class="schedule">'+obj.courseName+'</div>';
                        }
                        
                        if(!isComplete){
                            rightPart +='<ul class="item-right"><li class="enter" data-enter=\''+objStr+'\'><a href="javascript:;" >Enter Classroom</a></li>'
                            if(downUrl){
                                rightPart += '<li class="normal openHref"><a data-href="'+downUrl2+'">Download</a></li>';
                            }
                            /*if(obj.user_point!="buy"){
                                 rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                                 rightPart+='<li class="normal levelflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Level Assessment</li>';
                            }else{
                                 rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                            } */
                           //rightPart += renderMemoBtn(obj); 
                            rightPart += '</ul>';
                        }
                        
                    }
                    break;
                default:
                    if(!isComplete){
                        rightPart +='<ul class="item-right"><li class="enter" data-enter=\''+objStr+'\'><a href="javascript:;">Enter Classroom</a></li>';
                    }
                   /* if(obj.user_point!="buy"){
                         rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                         rightPart+='<li class="normal levelflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Level Assessment</li>';
                    }else{
                         rightPart+='<li class="normal memoflag" data-tageid="'+obj.tagId+'" data-teaid="'+obj.teaId+'" data-appointid="'+obj.id+'">Lesson Memo</li>';
                    } */
                    //rightPart += renderMemoBtn(obj); 
                    rightPart +="</ul>";
            }
            if(stuStr){
                extraDiv = '</div>';
            }
            console.log(loneItem)
            if(loneItem){
                ulHtml += loneItem;

            }else{
                ulHtml += '<div class="item" data-typeid="'+classType+'" data-id="'+obj.id+'"><dl class="item-left">'
                        +  classWayStr
                        + '<dd class="class-cont"><div class="time-type"><span class="time-long time-pre" data-start="'+obj.startTimeStamp+'" data-finish="'+obj.endTimeStamp+'" data-id="'+obj.id+'" data-teatype="'+obj['teachType']+'"><span class="clock-icon"></span>'
                        + classTime
                        + '<span class="clock-infor"></span></span>'
                        + classTypeStr
                        + '</div>'
                        + stuStr
                        + classTypeIcon
                        + extraDiv
                        + classTitle
                        + loadingDiv
                        + '</dd></dl>'
                        + rightPart
                        + '</div>';
            }
        }

        return ulHtml;
    }
    //根据rs，处理数据信息
    function classList(rs){
        if(rs.code==1){
            upcomingArr = rs.res.classList.upcoming;
            completeArr = rs.res.classList.completed;
            if(!upcomingArr){
                upcomingArr = [];
            }
            if(!completeArr){
                completeArr = [];
            }
            var upcomingLen = upcomingArr.length;
            var completeLen = completeArr.length;
            nosubTotal = 0;    
            for(var i=0;i<completeLen;i++){
                var obj = completeArr[i];
                if(obj.courseDesc==0 || obj.gradeRating==0){
                    nosubTotal++;    
                }

            }
            $('#pass-list li').eq(0).find('.today-tips').text('('+upcomingLen+')');
            $('#pass-list li').eq(1).find('.pass-tips').text('('+completeLen+')');
            if(nosubTotal>0){
                $('#pass-list li').eq(1).find(".noSubmit").show().text(nosubTotal);
            }else{
                 $('#pass-list li').eq(1).find(".noSubmit").hide();
            }
            

            if((upcomingLen==completeLen) && (completeLen==0)){
                $('#pass-list').hide();
            }else{
                $('#pass-list').show();
            }
            
            var isPast = $('#classTab .active').attr('data-past');
            if(upcomingLen>0){

                //AC接收
                 var myDate = new Date();
                 var tYear=myDate.getFullYear();
                 var tMonth=myDate.getMonth()+1;
                 var tDate=myDate.getDate();
                 var todayTime=tYear+'-'+tMonth+"-"+tDate;
                if(todayTime){
                    class_notify_json = upcomingArr;
                }

                var upcomingHtml = initList(upcomingArr,false);
                $('#myList').html(upcomingHtml);
                var $items = $('#myList .test').closest(".item");
                var itemLen = $items.length;
                dealTag($items,0,itemLen-1);
                freshList();
                nextTip();
                changeCheck();
                setCopy();
            }else{
                if(isPast==0){
                    noClassTip(isPast);
                }
            }

            if(completeLen>0){
                var completeHtml = initList(completeArr,true);
                $('#myComplete').html(completeHtml);
            }else{
                if(isPast==1){
                    noClassTip(isPast);
                }
            }
        }
    }
    //对即将开课的进行提示
    function nextTip(){
        tipTimer = setInterval(function(){
            var $vsArr = [];
            var nearTime = 99999999999999;
            var iNow = -1;

            $('#myList .item').each(function(){
                var id = $(this).attr('data-typeid');
                if(id == 0){
                    $vsArr.push($(this));
                }
            })

            $vsArr.forEach(function(item,index){
                var startTime = $(item).find('.time-long').attr('data-start')*1000;
                if(startTime>time){
                    if(startTime<nearTime){
                        nearTime = startTime;
                        iNow = index;
                    }
                }
            })

            if(iNow==-1){
                clearInterval(tipTimer);
            }else{
                var disTime = nearTime-time;
                var $item = $vsArr[iNow];
                var id = $item.attr('data-id') - 0;
                var tipId= sessionStorage.getItem('tipId');
                if(disTime<=timeConfig.start*1000 && (tipId!=id)){
                    
                    var $span = $item.find('.time-long');
                    var type = $span.attr('data-teatype')-0;
                    var json = {
                        style: 0,
                        cid: id,
                        type: type,
                        start: disTime/1000,
                        expire: timeConfig.expire
                    }
                    js2c("cpp_NoteBeforeClass",json);
                    //已提醒过的课程id
                    sessionStorage.setItem('tipId',id);
                }
            }
        },1000) 
    }

    //生成utc时间
    function dealTab(rs){
        if(rs.code == 1){
            var arr = rs.res.data;
            time = rs.res.serverDate*1000;
            createTab(arr);
            setInterval(function(){
                getUTCtime(time);
                time += 1000;
                setDate(time);
            },1000)
        }
    }
    // 5点刷新页面
    function setDate(time){
        var d = getChinaDate(time);
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        if((h==5) &&(m==0)&&(s==0)){
            location.reload();
        }
    }

    //发送tab请求
    function tabAjax(){
        var df1 = $.ajax({
            url: host + '/Ac/MyLesson/getTabs',
            type: 'get',
            data: defaultConfig,
            dataType:'jsonp',
            jsonp:'jsoncallback'
        })

        df1.done(function(rs){
            if(rs.code == 1){
                dealTab(rs);

                showWhichDay();
            }
        })
    }

    //请求列表数据
    function listAjax(dataStr){

        var listInfo = {};
        $.extend(true,listInfo,defaultConfig);
        
        if(dataStr){
            listInfo.startDate = dataStr;
        }

        $.ajax({
            url: host + '/Ac/MyLesson/getTeaLessonList',
            type: 'get',
            data: listInfo,
            dataType:'jsonp',
            beforeSend: function(){
                var $tip = $('#defaultTip');
                $('#tipImg img').hide().eq(0).show();
                $tip.find('p').text('Loading course list...');
                $tip.find('.refreshBtn').hide();
                $tip.show();
            },
            jsonp:'jsoncallback',
            success: function(rs){
                if(rs.code == 1){
                    $('#defaultTip').hide();
                    classList(rs);
                }else if(rs.code>=20000){
                    js2c('cpp_TokenBreak','');
                }else{
                    errorClassTip();
                }
            },
            error: function(){
                errorClassTip();
            }
        })
    }

    //课表错误提醒
    function errorClassTip(){
        var $tip = $('#defaultTip');
        $('#tipImg img').hide().eq(2).show();
        $tip.find('p').text('Error...load course list failed.');
        $tip.find('.refreshBtn').show();
        $tip.show();
        $('#pass-list').hide();
    }
    //课表为空提醒
    function noClassTip(index){
        var $tip = $('#defaultTip');
        $('#tipImg img').hide().eq(1).show();
        $tip.find('.refreshBtn').show();
        $tip.show();

        if(index==0){
            $tip.find('p').text('No Reservation');
        }else{
            $tip.find('p').text('Currently there is no completed lessons');
        }
    }

    //banner ajax请求
    function bannerAjax(){
        var bannerInfo = {
            user_id: defaultConfig.relId,
            user_type: 2, //老师固定为2,学生为1
            occup: defaultConfig.occup,
            version: defaultConfig.version,
            buildver: defaultConfig.buildver,
            lang: defaultConfig.lang,
            token: defaultConfig.token
        }

        $.ajax({
            url: host + '/Ac/User/getAcBanner',
            type: 'get',
            data: bannerInfo,
            dataType:'jsonp',
            jsonp:'jsoncallback',
            success: function(rs){
                if(rs.code ==1){
                    dealBanner(rs);
                }else{
                    $('#pass-list').css('top','127px');
                    $('#teacher .day-tap').css('top',0);
                    $('#teacher .bannerWrap').remove();
                }
                
            }
        })
    }
        
    //生成banner图片
    function dealBanner(rs){
        if(rs.code == 1){
            
            var arr = rs.res.AcBanner;
            var str = '';
            var dotStr = '';
            for(var i=0; i<arr.length; i++){
                var obj = arr[i];
                str += '<li><a data-href="'+obj['pic_url']+'" data-id="'+obj.id+'"><img src="'+obj.pic+'"/></a></li>';
                if(i==0){
                    dotStr += '<li class="active"></li>';
                }else{
                    dotStr += '<li></li>';
                }
            }
            $('#bannerList').html(str);
            var $firstCopy = $('#bannerList li').first().clone();
            $('#bannerList').append($firstCopy);
            $('#dots').html(dotStr).show();
            moveBanner();
            
        }
    }

    // 开启banner定时器
    function moveBanner(){
        banWidth = $('#banner').width();
        liLen = $('#bannerList li').length;
        $('#bannerList').width(banWidth*liLen);

        timerBanner = setInterval(function(){
            move(iNow,banWidth,liLen);
        },2000);
    }
    
    //banner运动
    function move(i,banWidth,liLen){
        iNow = i;
        iNow++;
        $('#bannerList').animate({'left':-banWidth*iNow},function(){
            if(iNow==liLen-1){
                iNow=0;
                $('#bannerList').css('left',0);
            }
            $('#dots li').removeClass("active").eq(iNow).addClass("active");
        })
    }
    
    //获取下节课弹层提醒信息
    function getConfigTime(){
        $.ajax({
            url: host + '/Ac/AcConf/popConf',
            type: 'get',
            data: {},
            dataType:'jsonp',
            jsonp:'jsoncallback',
            success: function(rs){
                timeConfig.start = rs.start;
                timeConfig.expire = rs.expire;
            }
        })
    }
    //获取打卡提示时间
    function getSignTime(){
        $.ajax({
            url: host + '/Ac/AcSign/getConf',
            type: 'get',
            data: {},
            dataType:'jsonp',
            jsonp:'jsoncallback',
            success: function(rs){
                if(rs.code == 0){
                    timeConfig.sign = rs.time;
                }
            }
        })
    }  
})
    
     //AC接收方法
    function  mycourselist_notify(){
        //return class_notify_json;
        js2c('cpp_MyCourseList', JSON.stringify(class_notify_json));
    }


