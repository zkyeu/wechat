/**
 * Created by liliang on 2017年 5月25日 星期四 18时24分24秒 CST.
 */
define("helperIframe",["helperLink"],function(require,exports,module){
   require("helperLink");

    // function getQueryString(name)
    // {
    //     var uri = $('.home-work-in iframe');
    //     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //     console.log(uri);
    //     // var r = uri.search.substr(1).match(reg);
    //     // var r = uri.split("?")[1].match(reg);
    //     // if(r!=null)return  unescape(r[2]); return null;
    // }
    // // var uri = $('.home-work-in iframe').attr("src");
    // var adminId = getQueryString("admin_id");
    // console.log(adminId);

    function setDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : '0'+ (dd.getMonth() + 1);
        var d = dd.getDate() > 9 ? dd.getDate() :'0'+ dd.getDate();
        return y+"-"+m+"-"+d;
    }

    //获取iframe数据信息
    $.ajax({
        url:'/NewDispatchCc/getNewDispatchUser',
        type:'POST',
        dataType:'json',
        data:{
            // admin_id: 189,
            admin_id: window.parent.wxHeck.wxInit.wxData.localInfo.admin_id,
            type : 2
        },
        success:function(r){
            if(r.status != 10000) return alert(r.message);
            //console.log(r)
            dataHandle(r.message);
        },
        error: function (r) {
            console.log(r)
        }
    });


    function dataHandle(data) {
        if(data){
            var html = '';
            var title = '<tr>'+
                '<th>体验课时间</th>'+
                '<th>体验课状态</th>'+
                '<th>学员信息</th>'+
                //'<th>所属人群</th>'+
                '<th>课程教材</th>'+
                '<th>联系方式</th>'+
                '<th>备注</th>'+
                //'<th>follow</th>'+
                '<th>操作</th>'+
                '</tr>';
            $('#stuNum').html(data.length);
            for(var i = 0; i < data.length; i++){
                var user_id = data[i].user_id;
                var nick_name = data[i].nick_name;
                var mobile = data[i].mobile;
                var trial_time = data[i].trial_time;
                var trial_status = data[i].trial_status;
                var course_name = data[i].course_name || '';
                var remark = data[i].remark;
                var _remark = "";
                if(remark){
                    _remark = data[i].remark[0].content;
                }
                var friend = false;
                var isFriend = '';
                if(friend){
                    isFriend = 'dn'
                }
                var _data = {
                    "type" : 0,
                    "acc" : mobile
                }
                html += '<tr>';
                html += '<td class="col-1"><p>'+ trial_time +'</p></td>';
                html += '<td class="col-2"><p>'+ trial_status +'</p></td>';
                html += '<td class="col-3"><p><a class="helper-student link" target="_blank" href="http://crm.51talk.com/admin/user/user_detail_info.php?user_id='+user_id+'">'+ nick_name +'('+ user_id+')' +'</a></p></td>';
                //html += '<td class="col-4"><p>'+ '所属人群' + '</p></td>';
                html += '<td class="col-5"><p>'+ course_name + '</p></td>';
                html += '<td class="col-6"><p>'+ mobile + '</p></td>';
                html += '<td class="col-7"><p>'+ _remark + '</p></td>';
                //html += '<td class="col-8"><p>'+ 'follow' + '</p></td>';
                html += '<td class="col-9" data-userId='+ user_id +
                    '><p><span class="helper-edit" data-userId="'+user_id+'">修改备注</span></p>'+
                    '<p><span class="helper-call">打电话</span></p>'+
                    '<p><span class="helper-add helper-link '+ isFriend +'" data-action="addFriend" data-data='+ JSON.stringify(_data) +'>加微信</span></p>'+
                    '<p><span class="helper-sms" data-userid="'+ user_id +'" data-mobile="'+ mobile +'">发短信</span></p></td>';
                html += '</tr>';
            }
            $('.table-control thead').html(title);
            $('.table-control tbody').html(html);
            $('.table-control').show();
            addRemark();
            handCall();
            sendSms();
        }else{
            $('.table-nodata').show();
        }
    }

    //关闭层
    $('.close-layer-btn-right').on('click', function () {
        $('.add-remark').hide();
    })


    //选择时间
    $('.follow-time').val(setDateStr(1));
    var time= new Date();
    var year= time.getFullYear();
    var mon= time.getMonth() +1;
    var day = time.getDate();
    var month,dayth;
    //选择状态
    $('.set-time i').on('click', function () {
        if($('.set-time i').hasClass('cut')){
            $(this).removeClass('cut')
        }else{
            $(this).addClass('cut');
        }

    });
    // //年
    // $('.cut-year').html(year);
    // //月
    // var dateTime = setDateStr(1);
    // for(var i = 1; i <= 12; i++){
    //     if(i == mon){
    //         month += '<option value="'+ i +'" selected>'+ i +'</option>';
    //     }else{
    //         month += '<option value="'+ i +'">'+ i +'</option>';
    //     }
    // }
    // $('.cut-month').html(month);
    //
    // //日
    // for(var j = 1; j <= 31; j++){
    //     if(j == day){
    //         dayth += '<option value="'+ j +'" selected>'+ j +'</option>';
    //     }else{
    //         dayth += '<option value="'+ j +'">'+ j +'</option>';
    //     }
    // }
    // $('.cut-dayth').html(dayth);


    //获取当前数据并添加
    $('#addRemark').on('click', function () {
        var text = $('.add-remind textarea').val();
        // var selTime = '';
        // if($('.set-time i').hasClass('cut')) {
        //     var _mon = $('.cut-month').val() < 10 ? '0'+ $('.cut-month').val() : $('.cut-month').val() ;
        //     var _day = $('.cut-dayth').val();
        //     selTime = year +'-' +  _mon + '-'+ _day
        // }
        var selTime = $('.follow-time').val();
        var userid = $(this).attr('data-id');

        console.log(text,selTime,userid);
        if(!text){
            return alert("请输入备注信息！");
        }
        $.ajax({
            url: "/Remark/addNew",
            data: {
                user_id: userid,
                content: text,
                follow_date:selTime
            },
            type:'POST',
            dataType:'json',
            success: function (r) {
                if (r.status != 10000) return alert(r.message);
                alert(r.message);
                reset();
                $('.add-remark').hide();
            }
        });
    });

    //取消添加
    $('#concel').on('click',function () {
        reset();
    });

    //重置数据
    function reset() {
        $('.add-remind textarea').val('');
        $('.add-remark').hide();
        if($('.set-time i').hasClass('cut')) {
            $('.set-time i').removeClass('cut');
        }
    }
    //修改备注
    function addRemark() {
        $('.helper-edit').on('click',function () {
            var userId = $(this).closest('.col-9').attr('data-userId');
            $('#addRemark').attr('data-id',userId);
            $('.add-remark').show();
        });
    }

    //打电话
    function handCall() {
        $('.helper-call').on('click',function () {
            var userId = $(this).closest('.col-9').attr('data-userId');
            $.ajax({
                url: "/Call/handCall",
                data: {
                    "user_id":userId,
                    "wechat_id": window.parent.wxHeck.wxInit.wxData.localInfo.wechat_id
                },
                type:'POST',
                dataType:'json',
                success: function (r) {
                    if (r.status != 10000) return alert(r.message);
                    alert("拨打成功！");
                }
            });
        });
    }

    //发短信
    function  sendSms() {
        var send = $('.send');
        var close =  $('.close');
        $('.helper-sms').on('click', function (e) {
            $('.sms-layer').attr('style','top:'+(e.clientY-110)+'px');
            $('.sms').show();
            send.attr('data-id',$(this).data("userid"));
            send.attr('data-mobile',$(this).data("mobile"));
            console.log('点击【发短信】');
        });
        close.on('click', function () {
            $('.sms').hide();
            send.attr('data-id','');
            send.attr('data-mobile','');
            $('.sms textarea').val('');
        });
        send.on('click', function () {
            var con= $('#smsCon').val();
            var userIds = $('.send').attr("data-id");
            var mobile = $('.send').attr("data-mobile");
            if(!con) return alert("请输入短信内容！");
            if(con.length > 50) return alert("短信内容超出字数限制！");
            $.ajax({
                url:'/SendSms/sendSms',
                type:'POST',
                dataType:'json',
                data:{
                    mobile:mobile,
                    msg:con,
                    user_id:userIds
                },
                success: function (data) {
                    console.log(data)
                    if(data.status == 10000 ){
                        $('#smsCon').val('');
                        $('.sms').hide();
                        return alert(data.message);
                    }else{
                        alert(data.message);
                    }
                }
            });
        })
    }
});