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

    //处理标签
    function dealTag(obj){
        var str = '';
        var payStr = '';
        var timeTag = obj.startTime.substring(11,16);
        str += '<li>'+timeTag+'</li>';
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
        var liStr = '';
        if(len==0){
            return ;
        }

        lineStr += dealDirection(0,arr[0].Time);
        if(len>1){
            lineStr += dealDirection(1,arr[0].Time);
        }
        if(len>2){
            lineStr += '<a href="javascript:;">展开</a>';
        }
        $('#'+id).find('.title').html(lineStr).show();

        
        for(var i=2; i<len; i++){
            var $li = $('li');
            var type = i%2;
            liStr += dealDirection(type,arr[i].Time);
            iNow++;
            if(iNow==2){
                ulStr += '<li class="lineInfo">'+liStr+'<li/>';
                liStr = '';
                iNow=0;
            }else if(i==len-1){
                if(len%2==1){
                    ulStr += '<li class="lineInfo">'+liStr+'<li/>';
                }
            }
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
    //根据数据处理订单页面展示
    function dealClassInfo(obj){
        dealRoom(obj);
        dealTag(obj);
        dealIds(obj);
        dealTitle(obj);
        dealStuInfos(obj);
        dealTeaInfos(obj);
        dealEnter(obj);
    }
    

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

    //叫号请求
    function showMenu(isAsk){
    	url = '/Ac/CritInAc/getNewClassInfo';
    	if(isAsk){
    		url = '/Ac/CritInAc/getCritInAcStation';
    	}
        $.ajax({
            url: host + url,
            type: 'get',
            data: defaultConfig,
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
                if(rs.code == 102){//展示订单详情
                    var obj = rs.res.data;
                    if(obj){
                        $('#sayNextBox').hide();
                        dealClassInfo(obj);
                        $('#list').show();
                    }
                }else{//展示叫号
                    $('#sayNextBox').show();
                }
            },
            error: function(){
                //$('#noContent').show();
            }
        })
    }
    //进入教室
    $('#enterRoom').click(function(){
        sendLog();
        var str = $(this).attr('data-enter');
        str = str.replace(/\@{5}/g,'>').replace(/%{5}/g,'<').replace(/\*{5}/g,"'");
        js2c('cpp_EnterClass',str);
    })
    //叫号
    $('#sayNext').click(function(){
    	showMenu(true);
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
    //是否显示关单窗口
    function isShowCloseOrder(isShow){
    	if(isShow){
    		$('#mask,#itemBox').show();
    	}else{
    		$('#mask,#itemBox').hide();
    	}
    }

    $('#closeBtn').click(function(){
    	isShowCloseOrder(true);
    })
    
    showMenu();
    
})