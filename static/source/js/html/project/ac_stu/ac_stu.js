//公共函数
var host = 'http://';
if(!window.request_host){
    host += 'www.51talk.com';
}else{
    host += request_host;
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
var argumentStr = location.search.substring(1);
var defaultConfig = str2json(argumentStr);

//定义进入教室函数，等待客户端调用
function autoenter_class(obj){
    var newObj = JSON.parse(obj);
    $('#comingList .item').each(function(){
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
//刷新页面客户端调用
function class_notify(obj){
    $.ajax({
        url: host + '/Ac/Log/AcWebFreshLog',
        data: {
            relId: defaultConfig.relId,
            jsonData: obj
        },
        dataType:'json',
        success: function(rs){
            if(rs.code==1){
                var newObj = JSON.parse(obj);
                var type = newObj.uType;
                switch(type){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 8:
                    case 9:
                    case 1002:
                    case 1004:
                        reload();
                        break;
                    case 1003:
                        if(newObj.strOther==2){
                            reload();
                        }
                        break;
                }
            }
        }
    })
}
//刷新页面
function reload(){
    location.reload();
}

//进出教室刷新
function timed_refresh(){
    var second = parseInt((Math.random()*5+5)*60*1000);
    setTimeout(function(){
        location.reload();
    },second)
}

//公共接口
function comm_type_get(fnName,data){
    var newFn = eval(fnName);
    if(typeof newFn =='function'){
        newFn(data);
    }
}

$(function(){
    /*
     * 搞起来
    */
    var typeId = 0;
    var classData = null;
    var serverTime;


    serverTime = serviceTime*1000;
    setInterval(function(){
        serverTime += 1000;
    },1000)


    var loadingTab = true;   //当点击date选项的时候，
    var clickTabPrevNext = true;  //只能触发一次上周或者下周，只有数据返回成功的时候进行切换

    var upcomingArr = [];
    var completeArr = [];
    var freshTimer = null;
    var isToday;
    
    //defaultConfig.user_type = 1;
    //defaultConfig.lang = 'Cn';




    var timers = {
        opTimer: null,
        bannerTimer:null
    }
    //课表右侧按钮 
    var button = {
        init: function(){

        },
        bindEvents: function(){
            $('#content').on({
                'mouseenter': this.enter,
                'mouseleave': this.leave
            },'.btn')
        },
        enter: function(){
            $(this).next().show();
        },

        leave: function(){
            var self = this;
            timers.opTimer = setTimeout(function(){
                $(self).next().hide();
                clearTimeout(timers.opTimer);
            },500)
        }
    }
    //课表右侧弹层
    var layer = {
        bindEvents: function(){
            $('#content').on({
                'mouseenter': this.enter,
                'mouseleave': this.leave
            },'.opsBox')
        }, 
        enter: function(){
            $(this).show();
            clearTimeout(timers.opTimer);
        },

        leave: function(){
            $(this).hide();
        }
    }
    //日期列表
    var dateTab = {
        prev: $('#prev'),
        next: $('#next'),
        tab: $('#dateList'),
        list: $('#tabList'),
        leftStr: '',
        rightStr: '',
        iNow: 1,
        ajaxtimes:0,
        init: function(){
            this.bindEvents();
            var tabPage = sessionStorage.getItem('tabPage');
            if(!tabPage){
                tabPage = 2;
            }
            return this.ajax(tabPage);
        },
        ajax: function(tabPage){
            var self = this;
            var deffered =  new $.Deferred();
            defaultConfig.tabPage = tabPage;
            $.ajax({
                url: host + '/Ac/MyLesson/getTabs',
                type: 'get',
                data: defaultConfig,
                dataType:'jsonp',
                jsonp:'jsoncallback',
                success: function(rs){
                    deffered.resolve();
                    self.succFn(rs,tabPage);
                    sessionStorage.setItem("tabPage",tabPage);
                }
            })
            return deffered;
        },
        bindEvents: function(){
            var self = this;
            this.width = this.tab.width();
            this.list.width(this.width*3);
            this.prev.on('click',$.proxy(this.goPrev,this));
            this.next.on('click',$.proxy(this.goNext,this));
            this.list.on('click','li',function(){
                $(this).addClass("active").siblings().removeClass("active");
                self.beforeSendFn($(this));
            })
        },
        succFn: function(rs,tabPage){
            if(rs.code == 1){
                var arr = rs.res.data;

                this.createTab(arr,tabPage);
            }
        },
        createTab: function(arr,tabPage){
            var str = '';
            var self = this;
            var sessionDate = sessionStorage.getItem('date');
            for(var i=0; i<arr.length; i++){
                var obj = arr[i];
                var num = parseInt(obj.classNum);
                var className = '';
                var dataNow = '';
                if(num==0){
                    className = 'die';
                }

                if(obj.dateDesc=='今天'){
                    dataNow = 'data-now="1"';
                    if(!sessionDate){
                       // className = 'active';
                    }
                }
                var arrStr = [
                    '<li data-past="'+obj.isPast+'" data-date="'+obj.hiddenTime+'"' +dataNow+ 'class="'+className+'">',
                    '<h3 class="day">'+obj.showTime+'&nbsp;<i>'+obj.dateDesc+'</i></h3>',
                    '<p><i></i><span><b>'+num+'</b>节课</span></p></li>'
                ]
                str+=arrStr.join('');
            }
            if(tabPage==1){
                $("#first").html(str);
                this.ajaxRender($("#first"),1);
            }else if(tabPage==2){
                $("#second").html(str);
                this.ajaxRender($("#second"),2);
            }else if(tabPage==3){
                $("#third").html(str);
                this.ajaxRender($("#third"),3);
            }

        },
        ajaxRender:function($ele,tabPage){
            this.cotronPevNext(tabPage);
            var self = this;
            var sessionDate = sessionStorage.getItem("date");
            var $li;
            $ele.show().siblings().hide();
            if(sessionDate){
                $ele.siblings().children().removeClass("active");
                $ele.children().each(function(index,item){
                    if($(this).data('date') == sessionDate){
                        $li =  $(this).addClass("active");
                        return false;
                    }/*else if($(this).data('now')==1){
                        $li =  $(this).addClass("active");
                        return false;
                    }*/
                });

                if(!$li){
                    $ele.children().each(function(index,item){
                     if($(this).data('now')==1){
                            $li =  $(this).addClass("active");
                            return false;
                        }
                    });
                }

                if(!$li){
                    $ele.children().eq(0).siblings().removeClass("active");
                    $li = $ele.children().eq(0).addClass("active");
                }
              /*  if(tabPage!=sessionStorage.getItem("tabPage")){
                    $li = $ele.children().eq(0).addClass("active").siblings().removeClass("active");
                }*/

            }else{
               $ele.children().each(function(index,item){
                  if($(this).data('now')==1){
                        $li =  $(this).addClass("active");
                    }
                });
            }

             this.beforeSendFn($li);
        },
        cotronPevNext: function(tabPage){
            var self =  this;
            if(tabPage==1){
                self.prev.addClass("prevActive");
                self.next.removeClass("nextActive");
                self.iNow = 0;
            }else if(tabPage==2){
                self.prev.removeClass("prevActive");
                self.next.removeClass("nextActive");
                self.iNow = 1;
            }else if(tabPage==3){
                self.prev.removeClass("prevActive");
                self.next.addClass("nextActive");
                self.iNow = 2;
            }
        },

        isHaveSession:function($ele,tabPage,tab){
            var self = this;
            var sessionDate = sessionStorage.getItem("date");
            var $li;
            this.cotronPevNext(tabPage);
            $ele.show().siblings().hide();
            $ele.siblings().children().removeClass("active");
            if(tabPage!=2){
                $li = $ele.children().eq(0).addClass("active");
            }else{
                $ele.children().each(function(index,item){
                    if($(this).data('now') == 1){
                        $li =  $(this).addClass("active");
                    }
                });
            }

            return $li;
           
        },
        goPrev: function(){
            if(this.iNow==0){
                return;
            }
            this.next.removeClass("nextActive");
            if(this.iNow==1){
                this.prev.addClass("prevActive");
            }else{
                this.prev.removeClass("prevActive");
            }
            this.iNow--;
            this.nextPrevShow(); 
            //this.activeDate(this.iNow);
            //this.list.animate({left: this.iNow*this.width*(-1)});

        },
        goNext: function(){
            if(this.iNow==2){
                return;
            }
            this.prev.removeClass("prevActive");
            if(this.iNow==1){
                this.next.addClass("nextActive");
            }else{
                this.next.removeClass("nextActive");
            }
            this.iNow++;
            this.nextPrevShow();   
            /*this.activeDate(this.iNow);
            this.list.animate({left: this.iNow*this.width*(-1)})*/
        },
        nextPrevShow:function(){
            if(this.iNow==0){
                if($("#first").children().length==0){
                    this.ajax(1);
                }else{
                    this.beforeSendFn(this.isHaveSession($("#first"),1,true));
                }
            }else if(this.iNow==1){

                if($("#second").children().length==0){
                    
                    this.ajax(2);
                }else{
                    this.beforeSendFn(this.isHaveSession($("#second"),2,true));
                }
            }else if(this.iNow==2){
                if($("#third").children().length==0){
                    this.ajax(3)
                }else{
                    this.beforeSendFn(this.isHaveSession($("#third"),3,true));
                    
                }
            }
        },
        activeDate:function(iNow){
            var activeNum = iNow*7;
            var maxLeng = activeNum +7;
            var $li = this.list.children().removeClass("active").eq(activeNum).addClass("active");
            for(;activeNum<maxLeng;activeNum++){
               var tempEle =  this.list.children().eq(activeNum);
               if(tempEle.data("now")==1){
                    this.list.children().removeClass("active");
                    var $li = tempEle.addClass("active");
               }
            }
            this.beforeSendFn($li);
        },
        beforeSendFn: function(el){
            var date = el.data('date');
            var isPast = el.data('past');
            sessionStorage.setItem('date',date);
            sessionStorage.setItem('isPast',isPast);
            if(date == window.nowtime){
                isToday = true;
            }else{
                isToday = false;
            }
            classList.ajax(date,isPast);
            $('#noClassList .noClass').hide();
        }
    }
    //banner处理区
    var banner = {
        box: $('#banner'),
        list: $('#bannerList'),
        dots: $('#dots'),
        iNow: 0,
        init: function(){
            this.ajax();
        },
        ready: function(){
            var self = this;
            var $firstCopy = this.list.find('li').first().clone();
            this.list.append($firstCopy);
            this.len = this.list.find('li').length;
            if(this.len==2){
                return false;
            }
            this.boxWidth = this.box.width();
            this.list.css('width',this.boxWidth*this.len);
            this.dots.children().removeClass("active").first().addClass("active");
            timers.bannerTimer = setInterval(function(){
                this.move();
            }.bind(this),4000);
            this.dots.on('click','a',function(){
                self.iNow = $(this).index()-1;
                self.move();
            })
        },
        move: function(){
            this.iNow++;
            var self = this;
            this.list.animate({'left':-this.boxWidth*this.iNow},function(){
                if(self.iNow==self.len-1){
                    self.iNow = 0;
                    $(this).css('left',0);
                }
                self.dots.find('a').removeClass("active").eq(self.iNow).addClass("active");
            })
        },
        ajax: function(){
            var self = this;
            var dataInfo = {
                user_id: defaultConfig.relId,
                user_type: user_type,
                from: window.originStr
            }
            $.ajax({
                url: host + '/Ac/User/getAcBanner',
                type: 'get',
                data: dataInfo,
                dataType:'jsonp',
                jsonp:'jsoncallback',
                success: function(rs){
                    if(rs.code==1){
                        self.joinStr(rs);
                    }else{
                        $("#banner").css({"display":"none"});
                        $(".dateBox").css({"top":"12px"});
                        $("#content").css({"margin-top":"95px"});
                        $(".noClass7").css({"margin-top":"210px"});
                        $(".noClass4").css({"margin-top":"210px"});
                    }
                    
                }
            })
        },
        joinStr: function(rs){
            if(rs.code ==1){
                var arr = rs.res.AcBanner;
                var str = '';
                var dotStr = '';
                for(var i=0; i<arr.length; i++){
                    var obj = arr[i];
                    str += '<li><a data-href="'+obj['pic_url']+'" data-id="'+obj.id+'"><img src="'+obj.pic+'"/></a></li>';
                    if(i==0){
                        dotStr += '<a class="active"></a>';
                    }else{
                        dotStr += '<a></a>';
                    }
                }
                this.list.html(str);
                this.dots.html(dotStr);
                this.ready();
            }
        }
    }

    //banner点击统计次数
    function bannerClick(id){
        var userType = window.user_type==1? 'student' : 'teacher';

        var bannerInfo = {
            id: id,
            uid: defaultConfig.relId,
            type: userType
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
    $('#bannerList').on('click','li',function(){
        var $A = $(this).find('a');
        var href = $A.attr('data-href');
        var id = $A.attr('data-id');
        bannerClick(id);
        js2c('cpp_OpenURL',href);
    })
    //课表处理区
    var classList = {
        
        comingDom: $('#comingList'),
        completeDom: $('#completeList'),
        box: $('#classTab'),
        list: $('#content .classList'),
        init: function(date,isPast){
            var self = this;

            if(date){
                this.ajax(date,isPast);
            }else{
                this.ajax();
            }
            this.bindEvents();
            
        },
        bindEvents:function(){
            var self = this;
            this.box.off().on('click','a',function(){
                if($(this).hasClass("disable")){
                    return false;
                }
                var index = $(this).index();
                var num = $(this).find('span').text().replace("(","").replace(")","");
                $(".noClass").hide();
                 var isPast = $('#tabList .active').attr('data-past')==1? true: false;
                if(num==0 && !isPast){
                    if(isToday){
                        if(upcomingArr.length==0 && completeArr.length>0&&index==0){
                            $('#noClass5').show();
                            $("#comingList").hide();
                        }
                    }
                    if(upcomingArr.length>0 && index==1 && completeArr.length==0){
                            //当今天已完成为0时，默认图为何？
                            $("#completeList").hide();
                            $("#noClass6").show();
                    }
                }else{
                    $('#noClassList .noClass').hide();
                }
                
                $(this).addClass("active").siblings().removeClass("active");
                self.list.hide().eq(index).show();
            });

        },
        ajax: function(date,isPast){
            var self = this;
            var listInfo = {};
            $.extend(true,listInfo,defaultConfig);
            if(date){
                listInfo.startDate = date;
            }
            self.bindEvents();
            $.ajax({
                url: host + '/Ac/MyLesson/getStuLessonList',
                type: 'get',
                data: listInfo,
                dataType:'jsonp',
                jsonp:'jsoncallback',
                success: function(rs){
                    if(rs.code == 1){

                        self.createList(rs,isPast);
                    }
                }
            })
        },
        createList: function(rs,isPast){
            var isPast = (isPast==1) ? true: false;
            this.box.show().find('.disable').removeClass("disable");
            $('#noClassList .noClass').hide();
            var list = rs.res.classList;
            upcomingArr = list.upcoming;
            completeArr = list.completed;
            if(!upcomingArr){
                upcomingArr = [];
            }
            if(!completeArr){
                completeArr = [];
            }
            var upcomingLen = upcomingArr.length;
            var completeLen = completeArr.length;
            var upcomingHtml = '';
            var completeHtml = '';
            //如果没有约课时隐藏TAB
            if(upcomingLen+completeLen==0){
                $('#classTab').hide();
            }
            this.box.children().removeClass("active");
            this.box.children().eq(0).find('span').text(upcomingLen);
            this.box.children().eq(1).find('span').text(completeLen);
            if(upcomingLen>0){
                upcomingHtml = this.initList(upcomingArr,0); 
            }
            if(completeLen>0){
                completeHtml = this.initList(completeArr,1);
            }
            this.comingDom.html(upcomingHtml);
            this.completeDom.html(completeHtml);
            if(isPast){
                this.box.children().eq(0).addClass("disable");
                this.box.children().eq(1).addClass("active");
                this.comingDom.css('display','none');
                if(completeLen==0){
                    $('#noClass4').show();
                }else{
                    this.completeDom.css('display','block');
                }
            }else{
                if(!isToday){
                    this.box.children().eq(1).addClass("disable");
                }

                if(isToday && upcomingArr.length==0 && completeArr.length>0){
                     //this.box.children().eq(0).addClass("disable");
                     this.box.children().eq(0).addClass("active");
                     this.comingDom.css('display','none');
                     this.completeDom.css('display','none');
                     $("#noClass5").show();
                }else if(upcomingArr.length>0 ){
                      this.box.children().eq(0).addClass("active");
                      this.completeDom.css('display','none');
                      this.comingDom.css('display','block');
                }else if(upcomingArr.length==0){
                    //没有预约预约课
                     showClassTip();
                }

              
               /* if(upcomingLen==0){
                   showClassTip();
                }*/
            }
           

            //判断是否是今天的课程，判断是否需要刷新列表。
            if(isToday){
                freshList();
            }
        },

        initList: function(arr,isComplete){
            var htmlStr = '';
            for(var i=0; i<arr.length; i++){
                var obj = arr[i];
                var rightPartStr = '';
                var classType = obj.classTypeId;
                var leftObj = this.dealLeft(obj,isComplete);
                var descObj = this.dealDesc(obj);
                var opsObj = this.dealOptions(obj,isComplete);
                var startStamp = obj.startTimeStamp*1000;
                var endStamp = obj.endTimeStamp*1000;
                var liStr = '<li class="item clearfix" data-start="'+startStamp+'" data-finish="'+endStamp+'" data-id="'+obj.id+'" data-typeid="'+classType+'"><div class="leftPart"><div class="titleBox">'
                            + leftObj.timeStr
                            + '</div><dl class="detail clearfix">'
                            + leftObj.picStr
                            + descObj.desc
                            + '</dl></div>';
                
                if(!obj.is_absent){
                    liStr += '<div class="rightPart">'+opsObj.opsView+opsObj.ops+'</div></li>';
                }else{
                    liStr += '</li>';
                }
                htmlStr += liStr;
            }
            return htmlStr;
        },
        dealLeft: function(obj,isComplete){
            if(obj.coursePic){
                 var pic = obj.coursePic;
             }else{
                 var pic = obj.teaPic;
             }
           
            var className = '';
            var picStr = '';
            var beginTime = obj.startTime.split(' ')[1].substring(0,5);
            var endTime = obj.endTime.split(' ')[1].substring(0,5);
            var colorClass = 'yellow';
            var copyImg = '';
            if(isComplete){
                colorClass = 'gray';
            }
            var timeStr = '<div class="time '+colorClass+'"><i></i><span class="begin">'+beginTime+'-'+endTime+'</span></div>';

            if(obj.classTypeId==0){
                className = 'teaDt';
                pic = obj.teaPic;
                timeStr = '<div class="time '+colorClass+'"><i></i><span class="begin">'+beginTime+'</span></div>';
            }
            copyImg = '<img src="'+pic+'">';
            if(obj.classTypeId==10){
                var reg = /.*(\.jpg|\.png|\.gif)$/;
                if(!pic||(!reg.test(pic))){
                    copyImg = '<span class="defTea"></span>';
                }else{
                    copyImg = '<img src="'+pic+'">';
                }
            }

            picStr = '<dt class="'+className+'">'+copyImg+'<div class="tip">课程将于<span>0</span>分钟后开始</div><div class="ongoing">进行中...</div></dt>';
            return {
                picStr: picStr,
                timeStr: timeStr
            }
        },
        dealDesc: function(obj){
            var classType = obj.classTypeId;
            var teaInfo = obj.teaRealName;
            var title = '<h3 class="title">'+obj.courseName+'</h3>';
            var subTitle = '';
            var teaName = '';
            var labelStr = '<div class="labels"><a href="javascript:;">'+obj.classTypeCn+'</a></div>';

            switch(classType){
                case '0':
                    if(defaultConfig.lang == 'Cn'){
                        title = '<h3 class="title">'+obj.courseNameCn+'</h3>';
                        subTitle = '<p class="desc">'+obj.courseClassNameCn+'</p>';
                        labelStr = '<div class="labels"><a href="javascript:;">'+obj.classTypeCn+'</a></div>';
                    }else{
                        title = '<h3 class="title">'+obj.courseNameEn+'</h3>';
                        subTitle = '<p class="desc">'+obj.courseClassNameEn+'</p>';
                        labelStr = '<div class="labels"><a href="javascript:;">'+obj.classTypeEn+'</a></div>';
                    }
                    
                    if(obj.is_absent){
                        teaInfo = obj.absent_info;
                    }
                    teaName = '<p class="teaName"><span class="teaBg"></span><span>'+teaInfo+'</span></p>';
                    break;
                case '1':
                    subTitle = '<p class="desc"><span>'+obj.totalStu+'</span>人预定</p>';
                    break;
                case '12':
                    if(obj.totalStu>0){
                        subTitle = '<p class="desc"><span>'+obj.totalStu+'</span>人预定</p>';
                    }
                    if(obj.subCourseType == 4){
                        labelStr = '<div class="labels"><a href="javascript:;" class="label1">选修课</a><a href="javascript:;" class="label2">'+obj.subCourseTypeStr+'</a></div>';
                    }else{
                        labelStr = '<div class="labels"><a href="javascript:;" class="label1">必修课</a><a href="javascript:;" class="label2">'+obj.subCourseTypeStr+'</a></div>';
                    }
                    
                    break;
            }

            if(classType!=4&&classType!=0&&teaInfo){
                teaName = '<p class="teaName"><span class="teaBg"></span><span>'+teaInfo+'</span></p>';
            }
            
            var desc = '<dd>'+labelStr+title+subTitle+teaName+'</dd>';
            return {
                desc: desc
            }
        },
        dealOptions: function(obj,isComplete){
            var objStr = str2code(JSON.stringify(obj));
            var classType = obj.classTypeId;
            var cancel = '';
            var prew = '';
            var ops = '';
            var opsBox = '';
            var downStr = '';
            if(!isComplete){
                switch(classType){
                    case '0':
                        var usa_preUrl = obj.usa_prepare_url;
                        var preUrl = obj.prepare_url;
                        if(usa_preUrl){
                            prew = '<li class="preview yuxi usa" data-id="'+obj.courseId+'" data-url="'+usa_preUrl+'">预习</li>';
                        }else if(preUrl){
                            prew = '<li class="preview yuxi" data-id="'+obj.courseId+'" data-url="'+preUrl+'">预习</li>';
                        }
                        if(!obj.is_absent){
                            cancel = '<li class=""><i></i><span class="delClass" data-id="'+classType+'">取消课程</span></li>';
                        }
                        downStr = '<li class="downLi" data-href="'+obj.courseSource+'"><i class="downLoad"></i><span>下载教材</span></li>';
                        break;
                    case '1':
                        if(obj.isAllowCancel=='allow_cancel'){
                            cancel = '<li><i></i><span class="delClass" data-id="'+classType+'">取消课程</span></li>';
                        }
                        break;
                    case '4':
                        cancel = '<li><i></i><span class="delClass" data-id="'+classType+'">取消课程</span></li>';
                        break;
                }
                if(defaultConfig.enter==1 || ((obj.startTimeStamp*1000-serverTime)/1000/60<=60) ){
                    ops = '<ul class="ops"><li class="enter room" data-enter=\''+objStr+'\'>进入教室</li>'+prew+'</ul>';
                }else{
                    ops = '<ul class="ops"><li class="disable room" data-enter=\''+objStr+'\'><span class="waitingInfo"></span>进入教室</li>'+prew+'</ul>';
                }
                opsBox = '<div class="opsView"><a href="javascript:;" class="btn"></a><div class="opsBox"><i class="triangle"></i><ul class="opsList">'+downStr+cancel+'</ul></div></div>';
                switch(classType){
                    case '2':
                    case '6':
                    case '7':
                    case '8':
                    case '10':
                    case '12':
                    case '13':
                    case '14':
                        opsBox = '';
                        break;
                }
            }else{
                if(classType==0){
                    var review = obj.review_url;
                    if(review){
                        prew = '<li class="preview fuxi" data-id="'+obj.courseId+'">复习</li>';
                    }
                }
                ops = '<ul class="ops">'+prew+'</ul>';
            }
            
            return {
                ops: ops,
                opsView: opsBox
            }
        }
    }
    //收藏或推荐老师
    var teachers = {
        isBack: true,
        init: function(){
            var self = this;
            $('#cTea').click(function(){
                if(!self.isBack){
                    return false;
                }
                $('#rTea').removeClass("active");
                $(this).addClass("active");
                $('#moreSel').attr('data-href','http://www.51talk.com/reserve/index?type=mybest');
                self.hideAll();

                if($('#collectionTea li').length>0){
                    $('#collectionTea').show();
                    return false;
                }
                
                self.ajax('getCollectionTeacher');
            })
            $('#rTea').click(function(){
                if(!self.isBack){
                    return false;
                }

                $('#cTea').removeClass("active");
                $(this).addClass("active");
                $('#moreSel').attr('data-href','http://www.51talk.com/reserve/index');
                self.hideAll();
                
                var date = sessionStorage.getItem('date');
                self.ajax('getRecommendTeacher',date);
            })
        },
        hideAll: function(){
            $('#collectionTea,#recommendTea,#noTeacher').hide();
        },
        ajax: function(url,date){

            var dataInfo = $.extend({},defaultConfig);
            if(date){
                dataInfo.date = date;
            }
            var self = this;
            $.ajax({
                url: host + '/Ac/MyLesson/' + url,
                type: 'get',
                data: dataInfo,
                dataType:'jsonp',
                beforeSend: function(){
                    self.isBack = false;
                },
                complete: function(){
                    self.isBack = true;
                },
                jsonp:'jsoncallback',
                success: function(rs){
                    if(url == 'getCollectionTeacher'){
                        if(rs.code == 1){
                            var temp = self.dealDom(rs);
                            $('#collectionTea').html(temp).show();
                        }else{
                            $('#noTeacher').show();
                        }
                    }else{
                        if(rs.code == 1){
                            var temp = self.dealDom(rs);
                            $('#recommendTea').html(temp).show();
                        }
                    }
                }
            })
        },
        dealDom: function(rs){
            var data = rs.res.data;
            var len = data.length>6?6:data.length;
            var str = '';
            for(var i=0; i<len; i++){
                var obj = data[i];
                str += '<li data-href="'+obj.url+'"><a href="javascript:;"><img src="'+obj.tea_pic+'"></a><p class="name">'+obj.real_name+'</p><p class="score">评分：'+obj.score+'</p></li>';
            }
            
            return str;
        }
    }

    var timeDeffered = dateTab.init();
    button.bindEvents();
    layer.bindEvents();
    banner.init();
    if(sessionStorage.getItem('date')){
        var date = sessionStorage.getItem('date');
        var isPast = sessionStorage.getItem('isPast');
      /*  timeDeffered.done(function(){
            classList.init(date,isPast);
        })*/
        
        if(date==window.nowtime){
            isToday = true;
        }else{
            isToday = false;
        }
    }else{
        classList.init();
        isToday = true;
    }
    
    teachers.init();

    //跳转链接带token
    function urlAddToken(url){
        var t_url_time = Date.parse(new Date())/1000;
        var t_url_token_md5 = $.md5(''+defaultConfig.relId+user_nick+t_url_time);
        var t_url_token = t_url_token_md5.substring(0,10);
        return "http://www.51talk.com/admin/user/login_to_stu.php?user_id="+defaultConfig.relId+"&nick_name="+user_nick+"&target=ClosePopUrl&token="+t_url_token+"&time="+t_url_time+"&pop_url="+url+"&sign="+defaultConfig.token;
    }

    //缺少变量user_nick,需要大刚传递。
    //绑定事件：课前预习//课后复习
    $('#comingList').on("click", ".yuxi",function() {
        var course_id = $(this).attr('data-id');
        var t_url_time = Date.parse(new Date())/1000;
        var t_url_token_md5 = $.md5(''+defaultConfig.relId+user_nick+t_url_time);
        var t_url_token = t_url_token_md5.substring(0,10);
        var isusapreview = $(this).hasClass('usa');
        if(isusapreview){
            var data ="http://www.51talk.com/admin/user/login_to_stu.php?user_id="+defaultConfig.relId+"&nick_name="+user_nick+"&target=ClosePopUrl&token="+t_url_token+"&time="+t_url_time+"&pop_url="+isusapreview+"&sign="+defaultConfig.token;
        }else{
            var data ="http://www.51talk.com/admin/user/login_to_stu.php?user_id="+defaultConfig.relId+"&nick_name="+user_nick+"&target=Preview&token="+t_url_token+"&time="+t_url_time+"&course_id="+course_id+"&sign="+defaultConfig.token;
        }
        try{
            js2c("cpp_OpenURL",data);
        } catch (e) {}
    });

    $('#completeList').on("click",".fuxi",function() {
        var course_id = $(this).attr('data-id');
        var t_url_time = Date.parse(new Date())/1000;
        var t_url_token_md5 = $.md5(''+defaultConfig.relId+user_nick+t_url_time);
        var t_url_token = t_url_token_md5.substring(0,10);
        var data = "http://www.51talk.com/admin/user/login_to_stu.php?user_id="+defaultConfig.relId+"&nick_name="+user_nick+"&target=Review&token="+t_url_token+"&time="+t_url_time+"&course_id="+course_id+"&sign="+defaultConfig.token;
        try{
            js2c("cpp_OpenURL",data);
        } catch (e) {}
    });

    //点击进入教室
    $('#comingList').on('click','.enter',function(){
        timed_refresh();
        var str = code2str($(this).attr('data-enter'));
        js2c('cpp_EnterClass',str);
    })

    //进入教室移入移出
    $('#comingList').on({
        'mouseover': function(){
            var str = '';
            if($('#tabList .active').data('past')==0){
                if(isToday){
                    str = watingTimes(this) + ' 后可进入教室'
                }else{
                    str = '课程还没有开始，现在不能进入教室哦！'
                }
                $(this).find('.waitingInfo').html(str).show();
            }
            
        },
        'mouseout':function(){
            $(this).find('.waitingInfo').hide();
        }
    },'.disable')

    function watingTimes(el){
        var start = $(el).closest(".item").attr('data-start');
        var oneHour = 60*60*1000;
        var distance = (start-oneHour-serverTime)/1000;
        var hour = Math.floor(distance/3600);
        var min = Math.floor((distance-hour*3600)/60);
        var sec = distance%60;
        return addZero(hour)+ ' : '+ addZero(min)+ ' : ' +addZero(sec);
    }

    function addZero(n){
        return n>9 ? n : '0'+n;
    }

    

    //点击链接，打开新页面
    $('#comingList').on('click','.downLi',function(){
        var href = $(this).attr('data-href');
        js2c('cpp_OpenURL',href);
    })

    $('#noClass1 .orderClass, #noClass2 .testMe, #noClass3 a, #moreSel').click(function(){
        var href = $(this).attr('data-href');
        href = urlAddToken(href);
        js2c('cpp_OpenURL',href);
    })

    $('#comingList').on('click','.delClass',function(){
        if($(this).parent().hasClass("disableCancel")){
            return;
        }
        $('#mask,#cancelBox').show();
        $('#mask').css('top',0);
        typeId = $(this).attr('data-id');
        var objStr = $(this).closest(".opsView").next().find('.room').attr('data-enter');
        classData = JSON.parse(code2str(objStr));
    })

    $('#cancelBox .cancel').click(function(){
        $('#mask,#cancelBox').hide();
    })

    $('#cancelBox .sure').click(function(){
        $('#mask,#cancelBox').hide();
        var url = '';
        var dataInfo = {
            userId: defaultConfig.relId,
            lang: defaultConfig.lang,
            token: defaultConfig.token
        };
        switch(typeId){
            case '0':
                dataInfo.appointId = classData.id;
                url = '/Ac/User/cancelAppointClasses';
                break;
            case '1':
                dataInfo.courseId = classData.id;
                dataInfo.courseType = 'open';
                url = '/Ac/User/cancelOpen';
                break;
            case '4':
                dataInfo.topicId = classData.topic_id;
                dataInfo.time = classData.date_str;
                dataInfo.tag = classData.tag;
                url = '/Ac/User/cancelSmallClasses';
                break;
        }
         
        $.ajax({
            url: host + url,
            type: 'get',
            data: dataInfo,
            dataType:'jsonp',
            jsonp:'jsoncallback',
            success: function(rs){
                $('#mask,#cancelTip').show();
                if(rs.code == 1){
                    $('#cancelTip').find('.pic').removeClass('error');
                    $('#cancelTip').find('p').html('取消成功');
                    setTimeout(function(){
                        location.reload();
                    },2000)
                }else{
                    $('#cancelTip').find('.pic').addClass('error');
                    $('#cancelTip').find('p').html(rs.res.remindMsg);
                    setTimeout(function(){
                        $('#cancelTip,#mask').hide();
                    },2000)
                }
            }
        })
    })

    $('#collectionTea, #recommendTea').on('click','li',function(){
        var href = $(this).attr('data-href');
        href = urlAddToken(href);
        js2c('cpp_OpenURL',href);
    })

    function str2code(str){
        return str.replace(/\>/g,'@@@@@').replace(/\</g,'%%%%%').replace(/'/g,'*****');
    }

    function code2str(str){
        return str.replace(/\@{5}/g,'>').replace(/%{5}/g,'<').replace(/\*{5}/g,"'");
    }

    //调用客户端方法
    function js2c(name,json){
        if(typeof json == 'object'){
            var json = JSON.stringify(json);
        }
        if(window.originStr=='mac'){
            window["webkit"]["messageHandlers"][name]["postMessage"]({'mac_parameters': json});
        }else{
            //windows系统调用此方法
            window.AcJs_get(name, json);
        }
    }


    //每秒钟刷新一次上课列表
    function freshList(){
        freshTimer = setInterval(function(){
            var $itemArr = $('#comingList .item');
            if($itemArr.length == 0){
                clearInterval(freshTimer);
            }else{
                $itemArr.each(function(index,item){
                    var start = $(this).attr('data-start');
                    var tempDate = new Date(parseInt(start));

                    var t24 = tempDate.getFullYear()+"-"+(tempDate.getMonth()+1)+"-"+tempDate.getDate()+" "+"00:"+"00";
                    var tTo24 = new Date(t24).getTime()+24*60*60*1000; //判断过了24：00时归为上过的课程
                    var end = $(this).attr('data-finish');
                    if(serverTime>start &&  serverTime<end){
                        $(this).find(".delClass").parent().addClass("disableCancel");
                    }
                    if(serverTime>=end || serverTime>=tTo24){
                        var id = $(this).attr('data-id');
                        $(this).remove();
                        for(var i=0; i<upcomingArr.length; i++){
                            var obj = upcomingArr[i];
                            if(obj.id == id){
                                var completedItemHtml = classList.initList([obj],1);
                                completeArr.push(obj);
                                upcomingArr.splice(i,1);
                                var upcomingLen = upcomingArr.length;
                                if(upcomingLen==0){
                                    showClassTip();
                                }
                                $('#classTab a').eq(0).find('span').text('('+upcomingLen+')');
                                $('#classTab a').eq(1).find('span').text('('+completeArr.length+')');
                                
                                $('#completeList').append(completedItemHtml);
                                break;
                            }
                        }
                    }else if(serverTime<end && start<serverTime){
                        $(this).find('.disable').addClass("enter").removeClass("disable");
                        $(this).find('.yellow').addClass("red").removeClass('.yellow');
                        $(this).find('.ongoing').show();
                        $(this).find('.tip').remove();
                    }else{
                        if(start-serverTime< 1000 * 60 *60){
                            $(this).find('.disable').addClass("enter").removeClass("disable");
                            $(this).find('.yellow').addClass("red").removeClass('.yellow');
                            var leaveTime = parseInt((start-serverTime)/(1000*60))+1;
                            $(this).find('.tip').show().find('span').html(addZero(leaveTime));
                        }
                    }
                })
            }
        },1000)
    }

    //没有课程时的默认展示图片
    function showClassTip(index){

        //第一种情况是切换到的当天有约课，没有一节完成（不包含 today ,包含以往）
        if(defaultConfig.type=='psoStu'){
             $('#noClass7').show();
            return false;
        }
        var isPast = $('#tabList .active').attr('data-past')==1? true: false;
        if(isPast){
            $('#noClass4').show();
        }else{
            //判断是否已上完今天的课程。
           

            if(upcomingArr.length==0 && completeArr.length>0){
                    $('#noClass5').show();
                    $("#comingList").hide();
                    return;
           }


            //付费用户
            if(window.isBuy==1 && window.userlevel!=""){
                $('#noClass1').show();
                $('#rTea').trigger("click");
            }
            else{
                var userTypeId = parseInt(window.userTypeId);
               // alert(window.userlevel);
                if(window.userlevel==""){
                    //体验用户无评级 
                   
                    switch(userTypeId){
                        case 1:
                            //成人
                             $('#noClass2').show();
                        case 2:
                            //青少
                              $('#noClass2').show();
                        case 3:
                            //美小
                            $('#noClass2').show();
                            break;
                        case 4:
                            //b2s课程
                            $('#noClass3').show();
                            break;
                       /* default:
                            $('#noClass2').show();
                            break;*/
                    }
                }else{
                   //体验用户有评级
                  switch(userTypeId){
                        case 1:
                            //成人
                             $('#noClass7').show();
                        case 2:
                            //青少
                              $('#noClass7').show();
                        case 3:
                            //美小
                            $('#noClass7').show();
                            break;
                        case 4:
                            //b2s课程
                            $('#noClass3').show();
                            break;
                        /*default:
                            $('#noClass2').show();
                            break;*/
                    } 
                }
                
            }
        }
    }
})