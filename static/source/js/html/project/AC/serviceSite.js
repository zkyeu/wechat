$(function(){
    //配置host
    var host = 'http://';
    if(!window.request_host){
        host += 'www.51talk.com';
    }else{
        host += window.request_host;
    }
    var argumentStr = location.search.substring(1);
    var defaultConfig = str2json(argumentStr);
    defaultConfig.lang = 'Cn';
    var myAppointId = 0;
    //复制到粘贴板
    var client = new ZeroClipboard( $('.copy') );
    client.on( "ready", function( readyEvent ) {
        client.on( "aftercopy", function( event ) {
            $('#showCopy').show().css('display','inline-block');
            setTimeout(function(){
                $('#showCopy').hide();
            },2000)
        });
    } );

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

    //调用客户端方法
    function js2c(name,json){
        if(typeof json == 'object'){
            var json = JSON.stringify(json);
        }
        window.AcJs_get(name, json);
    }

    //收起上课时间选项
    function slideUpTime(){
        $('#timeTri').removeClass("slideUp").next().hide();
    }
    //处理标签
    function dealTag(obj){
        var str = '';
        var payStr = '';
        str += '<li>'+$('#showedTime').html()+'</li>';
        str += '<li>'+obj.classTypeCn+'</li>';

        if(obj.courseTypeEx==1){
            payStr = '体验课';
        }else{
            payStr = '付费课';
        }
        str += '<li>'+payStr+'</li>';
        $('#tags').html(str);
    }
    //处理教材和课程ID
    function dealIds(obj){
        var $i = $('#ids').find('i');
        var $copy = $('#ids').find('.copy');
        var classId = obj.id;
        var courseId = obj.courseId;
        myAppointId = classId;
        $i.eq(0).html(classId);
        $i.eq(1).html(courseId);
        $copy.eq(0).attr('data-clipboard-text',classId);
        $copy.eq(1).attr('data-clipboard-text',courseId);
    }
    //处理进出教室逻辑
    function dealRoom(obj){

        $('#leftRoom .title, #leftRoom .loginInfo').hide();
        $('#rightRoom .title, #rightRoom .loginInfo').hide();
        var stuInfo = obj.stuInAndOutClassLog;
        var teaInfo = obj.teaInAndOutClassLog;

        dealInfo(stuInfo,'leftRoom');
        dealInfo(teaInfo,'rightRoom');
    }
    function dealInfo(arr,id){
        var len = arr.length;
        var iNow = 0;
        var lineStr = '';
        var ulStr = '';
        var enterArr = [];
        var leaveArr = [];
        var leaveLen;
        var enterLen;
        for(var i=0; i<len; i++){
            var obj = arr[i];
            if(obj.LogType==0){
                enterArr.push(obj);
            }else{
                leaveArr.push(obj);
            }
        }
        enterLen = enterArr.length;
        leaveLen = leaveArr.length;
        enterArr = enterArr.sort(function(n1,n2){
            return n1.Time - n2.Time;
        })
        leaveArr = leaveArr.sort(function(n1,n2){
            return n1.Time - n2.Time;
        })
        
        if(len==0){
            return ;
        }
        if(len==1){
            lineStr += dealDirection(0,arr[0].Time);
        }
        
        if(len>=2){
            lineStr += dealDirection(0,enterArr[enterLen-1].Time);
            if(enterLen==leaveLen){
                lineStr += dealDirection(1,leaveArr[leaveLen-1].Time);
            }
        }
        if(len>2){
            lineStr += '<a href="javascript:;">展开</a>';
        }
        $('#'+id).find('.title').html(lineStr).show();

        for(var j=0; j<enterArr.length;j++){
            var leftSpan = dealDirection(0,enterArr[j].Time);
            var rightSpan = '';
            if(leaveArr[j]){
                rightSpan = dealDirection(1,leaveArr[j].Time);
            }else{
                rightSpan = '';
            }
            ulStr += '<li class="lineInfo">'+leftSpan+rightSpan+'<li/>';
        }
        
        $('#'+id).find('.loginInfo').html(ulStr);
    }

    function dealDirection(type,time){
        var timeStr = changeTime(time)
        if(type==0){
            return '<span><b class="leftb"></b><i>'+timeStr+'</i>进入教室</span>';
        }else{
            return '<span><b class="rightb"></b><i>'+timeStr+'</i>离开教室</span>'
        }
        
    }

    var myselfT = new Date();
    //将时间戳变成时分显示
    function changeTime(time){

        myselfT.setTime(time*1000);
        var h = addZero(parseInt(myselfT.getHours()));
        var m = addZero(parseInt(myselfT.getMinutes()));

        return h+ ' : ' +m;
    }
    function addZero(n){
        return n>9 ? n : '0'+n;
    }
    //处理课程名称
    function dealTitle(obj){
        $('#classTitle').html(obj.courseNameCn);
    }
    //处理学员信息
    function dealStuInfos(obj){
        var $i = $('#stuInfo').find('i');
        var $copy = $('#stuInfo').find('.copy');
        var stuId = obj.stuId;
        var phone = obj.phone;
        var qq = obj.qq;
        var version = obj.stu_version;
        if(!qq){
            qq = '---';
        }
        if(!version){
            version = '---';
        }else{
            version = obj.stu_client_type +' '+ version;
        }
        $i.eq(0).html(obj.stuNickName).parent().next().remove();
		if(obj.stuStatus=="不在教室"){
			$i.eq(0).parent().after('<span class="class notInclass">不在教室</span>')
		}else{
			$i.eq(0).parent().after('<span class="class inclass">在教室</span>')
		}
        $i.eq(1).html(obj.stuId);
        $i.eq(2).html(obj.stu_type_name);
        $i.eq(3).html(obj.phone);
        $i.eq(4).html(version);
        $i.eq(5).html(qq);
        $copy.eq(0).attr('data-clipboard-text',stuId);
        $copy.eq(1).attr('data-clipboard-text',phone);
        $copy.eq(2).attr('data-clipboard-text',qq);
    }
    //处理老师信息
    function dealTeaInfos(obj){
        var $i = $('#teaInfo').find('i');
        var $copy = $('#teaInfo').find('.copy');
        var teaId = obj.teaId;
        var phone = obj.tea_phone;
        var qq = obj.tea_qq;
        var skypeStr = obj.tea_skype;
        var version = obj.tea_version;
        if(!qq){
            qq = '---';
        }
        if(!version){
            version = '---';
        }else{
            version = obj.tea_client_type +' '+ version;
        }
        if(!skypeStr){
            skypeStr = '---';
        }else{
            if(skypeStr.length>11){
                skypeStr = skypeStr.substring(0,11);
            }  
        }
        if(!phone){
            phone = '---';
        }
        
        $i.eq(0).html(obj.teaRealName).parent().next().remove();
		if(obj.teaStatus=="不在教室"){
			$i.eq(0).parent().after('<span class="class notInclass">不在教室</span>')
		}else{
			$i.eq(0).parent().after('<span class="class inclass">在教室</span>')
		}
        $i.eq(1).html(teaId);
        $i.eq(2).html(obj.tea_type_name);
        $i.eq(3).html(phone);
        $i.eq(4).html(version);
        $i.eq(5).html(qq);
        $i.eq(6).html(skypeStr).attr('title',obj.tea_skype);
        $copy.eq(0).attr('data-clipboard-text',teaId);
        $copy.eq(1).attr('data-clipboard-text',phone);
        $copy.eq(2).attr('data-clipboard-text',qq);
        $copy.eq(3).attr('data-clipboard-text',skypeStr);
    }
    //处理enter进入
    function dealEnter(obj){
        var objStr = JSON.stringify(obj).replace(/\>/g,'@@@@@').replace(/\</g,'%%%%%').replace(/'/g,'*****');
        $('#enterRoom').attr('data-enter',objStr);
    }
    function dealClassInfo(obj){
        dealRoom(obj);
        dealTag(obj);
        dealIds(obj);
        dealTitle(obj);
        dealStuInfos(obj);
        dealTeaInfos(obj);
        dealEnter(obj);
    }
    function dealOptions(){
        var str = '';
        var d = new Date();
        d.setTime(window.now_time*1000);
        var h = d.getHours();
        var min = d.getMinutes();
        if(h<6){
            now = 12;
        }else{
            now = h * 2;
            if(min>=30){
                now = h * 2 + 1;
            }
        }
        for(var i=now; i<48;i++){
            if(i%2){
                str += '<li data-num="'+i+'">'+(i-1)/2+':30</li>';
            }else{
                str += '<li data-num="'+i+'">'+i/2+':00</li>';
            }
        }
        $('#timeSel').html(str);
        var first = $('#timeSel li').first();
        var liStr = first.html();
        var dataNum = first.data('num');
        $('#showedTime').attr('data-num',dataNum).text(liStr);
    }
    dealOptions();
    $(document).click(function(){
        slideUpTime();
        $('#showedTime').data('times',0);
    })

    $('#showedTime,#timeTri').click(function(){
        var times = $('#showedTime').data('times');
        if(times%2){
            $('#timeSel').hide();
        }else{
            $('#timeSel').show();
        }
        var newTimes = parseInt(times)+1;
        $('#showedTime').data('times',newTimes);
        $('#timeTri').toggleClass("slideUp");
        return false;
    })
    $('#leftRoom .title, #leftRoom .loginInfo').hide();
    $('#rightRoom .title, #rightRoom .loginInfo').hide();

    $('#leftRoom .title,#rightRoom .title').on('click','a',function(){
        var num = parseInt($(this).attr('data-num'));
        if(!num){
            $(this).html('收起').attr('data-num',1);
            $(this).closest(".title").next().show();
        }else{
            $(this).html('展开').attr('data-num',0);
            $(this).closest(".title").next().hide();
        }
    })
    $('#timeSel').on('click','li',function(){
        slideUpTime();
        var time = $(this).text();
        var num = $(this).data('num');
        $('#showedTime').attr('data-num',num).data('times',0).html(time);
    })
   
    $('#exSearch').click(exSearch);

    $('#appointId,#teacherName').keydown(function(e){
        if(e.keyCode == 13){
            exSearch();
        }
    })

    function exSearch(){
        //隐藏没内容的默认图片
        $('#noContent').hide();
        var stu_id = $.trim($('#appointId').val());
        var tea_name = $.trim($('#teacherName').val());
        var class_time = $('#showedTime').attr('data-num');

        var listInfo = $.extend(true,{},defaultConfig);

        if(stu_id||tea_name){
           listInfo.tea_name = tea_name;
           listInfo.stu_id = stu_id;
           listInfo.class_time =class_time;
           $('#waitSearch').hide();
        }else{
            $('#exSearch').nextAll(".tips").show();
            var timer = setTimeout(function(){
                $('#exSearch').nextAll(".tips").hide();
                clearTimeout(timer);
            },3000)
            return false;
        }
        
        $.ajax({
            url: host + '/Ac/CritInAc/getClassInfo',
            type: 'get',
            data: listInfo,
            dataType:'jsonp',
            beforeSend: function(){
                $('#searchBox').show();
                $('#list').hide();
            },
            complete: function(){
                $('#searchBox').hide();
            },
            jsonp:'jsoncallback',
            success: function(rs){
                if(rs.code == 1){
                    var obj = rs.res.data;
                    if(obj){
                        $('.searchBox').hide();
                        dealClassInfo(obj);
                        $('#list').show();
                    }else{
                        $('#noContent').show();
                    }
                }else{
                    $('#noContent').show();
                }
            },
            error: function(){
                $('#noContent').show();
            }
        })
    }
    
    $('#enterRoom').click(function(){
        sendLog();
        var str = $(this).attr('data-enter');
        str = str.replace(/\@{5}/g,'>').replace(/%{5}/g,'<').replace(/\*{5}/g,"'");
        js2c('cpp_EnterClass',str);
    })

    //点击进入教室，打log
    function sendLog(){
        var info = $.extend({},defaultConfig,{appointId: myAppointId});
        $.ajax({
            url: host + '/Ac/CritInAc/setCritInClassRoomLog',
            type: 'get',
            data: info,
            dataType:'jsonp',
            jsonp:'jsoncallback',
            success: function(rs){}
        })
    }
    

    
})