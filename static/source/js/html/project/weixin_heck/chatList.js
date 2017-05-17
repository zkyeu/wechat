/**
 * 默认逻辑处理
 * @author:  liliang（liliang05@51talk.com）
 * @update:  2017年 3月 8日 星期三 15时28分50秒 CST
 * @note:    黑鸟项目后台权限管理
 */
define("chatList",["layui","niceScroll"],function(require,exports,module){
    require("layui");

    //优化滚动条
    $.fn.chatScroll = function () {
        var self = $(this);
        self.niceScroll(
            {
                cursorcolor: "#686b71",
                autohidemode: true,
                cursorwidth: 7,
                cursorborderradius: "999px",
                cursorborder: 0
            }
        );
        return self;
    }

    //封装ajax
    var _$ ={
        request: function (type, url, data, success, error) {
            $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: "JSON",
                // cache: false,
                success: function (data) {
                    success(data);
                },
                error: error
            });
        }
    }
    var getSomeData = $('#getChatList');
    var getAllData = $('#getAllList');

    var qian = GetDateStr(-2);
    var zuo = GetDateStr(-1);

    $('#stime').val(start_time);
    $('#etime').val(end_time);

    //setHeight();
    selTime();
    setVoice();

    getDefaultList();

    getSomeData.on('click',function () {
        getData();
    });

    getAllData.on('click',function () {
        getAllDatas();
    });

    //设置时间
    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+"-"+m+"-"+d;
    }
    // document.write("前天："+GetDateStr(-2));
    // document.write("<br />昨天："+GetDateStr(-1));
    // document.write("<br />今天："+GetDateStr(0));
    // document.write("<br />明天："+GetDateStr(1));
    // document.write("<br />后天："+GetDateStr(2));
    // document.write("<br />大后天："+GetDateStr(3));



    // var stime = parseInt($('#stime').val().replace(/-/g,''));
    // var etime = parseInt($('#etime').val().replace(/-/g,''));
    //
    // if((stime-etime) < 0){
    //     alert(0)
    // }


    function setVoice() {
        $('body').on('click','.voice',function () {
            $("#music").attr("src",$(this).data("src"));
            var m = document.getElementById("music");
            // console.log($(this).data("src"));
            var sc=0;
            m.addEventListener("canplay", function(){
                sc=parseInt(m.duration);
                if(sc>0){
                    m.play();
                }
                console.log(sc);
                setTimeout(function(){
                    $(".voice").removeClass("voice-play");
                },(sc-1)*1000)

            });
            $(this).addClass("voice-play");
        });

    }

    //选择时间
    function selTime() {
        layui.use('laydate', function(){
            var laydate = layui.laydate;

            var start = {
                min: laydate.now()
                ,max: '2099-06-16 23:59:59'
                ,istoday: false
                ,choose: function(datas){
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };

            var end = {
                min: laydate.now()
                ,max: '2099-06-16 23:59:59'
                ,istoday: false
                ,choose: function(datas){
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };
        });
    }

    //聊天记录高度
    function setHeight() {
        var heights = window.innerHeight;
        // var sysH = document.body.scrollHeight;
        // console.log(heights,sysH);
        var elm = document.getElementById('chatList');
        elm.style.height=(heights-400)+'px';
        $('#chatList').chatScroll();
    }

    //默认聊天数据
    function getDefaultList() {
        var qian = start_time;
        var zuo = end_time;
        ajax(qian,zuo);
    }
    
    //获取聊天记录
    function getData() {
        var stime = $('#stime').val();
        var etime = $('#etime').val();
        ajax(stime,etime);
    }

    //获取所有聊天记录
    function getAllDatas() {
        var a = b = '';
        ajax(a,b);
    }

    function ajax(a,b){
        console.log(a,b);
        _$.request('get','/AuthGroupStats/message', {
            start_time: a,
            end_time: b,
            terminal_id:terminal_id,
            wechat_id:wechat_id
        }, function (data){
            callBack(data);
        });
    }
    
    //获取返回数据
    function callBack(data) {
        if (data.status !=10000) return alert(data.message);
        var getData= data.message;
        var name = getData.userInfo.user_name;
        var list = getData.list;
        if(!list){
            $('#chatList').hide();
            $('#noChat').show();
        }
        var html = '';
        var sender ='';
        var sysName = '51君';
        for(var i=0; i<list.length; i++){
            var send_type = list[i].send_type;
            var message_type = list[i].message_type;
            var content = list[i].content;
            var send_time = list[i].send_time;

            if(send_type == 2){
                html += '<li class="mes-left">';
            }else{
                html += '<li class="mes-right">';
            }
            //发送类型
            switch(send_type){
                case '1':
                    sender = '黑鸟发送';
                    break;
                case '2':
                    sender = '好友发送';
                    break;
                case '3':
                    sender = '微信发送';
                    break;
                case '4':
                    sender = '系统发送';
                    break;
                case '5':
                    sender = '中转发送';
                    break;
                default:
                    sender = '常规发送';
            }
            html += '<dt><span class="name">';
            if(send_type == 2){
                html += name;
            }else{
                html += sysName;
            }
            html += '</span><span class="time">'+ send_time +'</span>';
            html += '<span class="sender">'+ sender +'</span>';
            html += '</dt>';
            //内容类型
            switch(message_type){
                case '0':
                    //文字
                    html += '<dd class="text">';
                    html += content;
                    break;
                case '1':
                    //图片
                    // var pics;
                    var pic =content.split(",")[0];
                    // if(pic[1]){
                    //     pics = pic[1];
                    // }else{
                    //     pics = pic[0];
                    // }
                    html += '<dd class="pic">';
                    html += '<img src="'+ pic +'">';
                    break;
                case '2':
                    //语音
                    html += '<dd class="voice" data-src="' + content + '">';
                    break;
                case '42':
                    //文字
                    html += '<dd class="text">';
                    html += '名片消息';
                    break;
                case '495':
                    var obj = JSON.parse(content);
                    html += '<dd class="article"><a href="' + obj.urlStr + '" target="_blank">';
                    html += '<div><h4>'+ obj.title +'</h4>';
                    html += '<p>'+ obj.desc +'</p></div>';
                    html += '<div><img src="'+ obj.thumbUrl +'"></div>';
                    html += '</a>';
                    break;
                case '3000':
                    var obj = JSON.parse(content);
                    html += '<dd class="article"><a href="' + obj.link + '" target="_blank">';
                    html += '<div><h4>'+ obj.title +'</h4>';
                    html += '<p>'+ obj.introduction+'</p></div>';
                    html += '<div><img src="'+ obj.icon +'"></div>';
                    html += '</a>';
                    break;
                case '5000':
                    html += '<dd class="text">';
                    html += content;
                    break
                case '6001':
                    //视频
                    var obj = JSON.parse(content);
                    html += '<dd class="vedio"><video controls><source src="'+ obj.url +'"></video>';
                    break;
                case '6000':
                    //文章
                    var obj = JSON.parse(content);
                    html += '<dd class="file"><a href="'+obj.url+'" target="_blank">';
                    html += '<div>'+obj.title;
                    html += '<em class="fileOther"></em></div><div>';
                    html += (obj.size/1024).toFixed(2);
                    html += 'KB</div></a>';
                    break;
                default:
                    html += '<dd class="text">';
                    html += content;
            }
            html += '</dd>';
            html += '</li>';
        }
        $('#chatList').html(html);
    }
});