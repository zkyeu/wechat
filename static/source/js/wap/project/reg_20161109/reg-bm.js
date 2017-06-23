/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
    // 登陆验证
    $("a[name='register']").click(function(){
        var user_name = $("#user_name").val();
        var password = $("#password").val();
        var regMobile=/^1[0-9]{10}$/;
        var regPass=/^([\w\+\!\@\#\$\%\^\&\*\(\)]{6,20})$/;
        var emailre = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
        if (user_name == "") {
            alert('请填写手机号码或邮箱');
            return false;
        } else if (!regMobile.test(user_name) && !emailre.test(user_name)) {
            alert('请填写正确的手机号码或邮箱');
            return false;
        } else if(password=="") {
            alert('请填写密码');
            return false;
        } else if(!regPass.test(password)) {
            alert('密码为6-20位字母数字组合');
            return false;
        } else {
            document.getElementById("regForm").submit();
        }
    });
    // 验证码获取倒计时
    var wait = 60;
    function time(o) {
        if (wait == 0) {
            o.attr("disabled", false);
            o.removeClass("y_code_down");
            o.text("获取验证码");
            wait = 60;
        } else {
            o.attr("disabled", true);
            o.addClass("y_code_down");
            o.text(wait + "秒后可重新获取");
            wait--;
            setTimeout(function() {time(o);}, 1000);
        }
    };

    // if ($("#getCode").hasClass("reg_class") && $("#getCode").hasClass("come_reg")) {
    //     time($("#getCode"));
    // }

    $("#getCode").click(function() {
        if ($(this).hasClass("y_code_down")) return false;
        var index=$(this);
        var url = "";
        var mobile = $("input[name='mobile']").val() || "";
        if ($(this).hasClass("forget_password")) {
            url="/ajax/findPwdCheckCode";
        } else if ($(this).hasClass("reg_class")) {
            url="/ajax/sendCheckCode";
        }
        if (mobile=="") {
            alert("请填写手机号");
            return false;
        }
        if ($("#checked_imgcode").val() == "") {
            alert("请填写图片验证码");
            return false;
        }
        var aj = $.ajax({
            url: url,
            data:{
                mobile: mobile,
                imgcode: $("#checked_imgcode").val()
            },
            type:'post',
            cache:false,
            dataType:'json',
            success: function (data) {
                if (data.status==0) {
                    alert(data.info);
                    return false;
                } else {
                    time(index);
                }
            },
            error: function() {
                alert('网络异常，短信发送失败');
                return false;
            }
        });
    });
    var flag = false;
    // 验证码正确性校验
    $("#checked_code").blur(function() {
        $(this).val();
        var url = '';
        if ($(this).hasClass("nouse")) {
            url = "/ajax/checkFindCode";
        } else {
            url = "/ajax/checkCode";
        }
        var mobile = $("input[name='mobile']").val() || "";
        var mobile_code = $("#checked_code").val() || "";
        if (mobile_code == "") {
            alert("请填写验证码");
            return false;
        } else if (mobile == "") {
            alert("请填写手机号");
            return false;
        } else {
            $.ajax({
                url: url,
                data:{
                    mobile:mobile,
                    mobile_code:mobile_code
                },
                type:'post',
                cache:false,
                dataType:'json',
                success: function(data) {
                    if (data.status==1) {
                        $(".reg h3 a").hide();
                        $(".reg h3 .a1").show();
                        flag = true;
                    } else {
                        $(".reg h3 a").show();
                        $(".reg h3 .a1").hide();
                        flag = false;
                    }
                },
                error: function() {
                    $(".reg h3 a").show();
                    $(".reg h3 .a1").hide();
                    flag = false;
                }
            });
        }

    });
    // 找回密码校验
    $("a[name='login']").click(function(){
        var mobile=$("input[name='mobile']").val()
        var checked_code=$("input[name='checked_code']").val()
        var n_pwd=$("input[name='n_pwd']").val()


        var regMobile=/^1[0-9]{10}$/;
        var regPass=/^([\w\+\!\@\#\$\%\^\&\*\(\)]{6,20})$/;
        var checked_codere = /^[0-9]{6}$/;
        if (mobile=="") {
            alert('请填写手机号码');
            return false;
        } else if(!regMobile.test(mobile)) {
            alert('请填写正确的手机号码');
            return false;
        } else if (!checked_codere.test(checked_code)) {
            alert('请填写正确验证码');
            return false;
        // } else if (!flag) {
        //     alert('请输入正确的验证码');
        //     return false;
        } else if (n_pwd=="") {
            alert('请填写新密码');
            return false;
        } else if(!regPass.test(n_pwd)) {
            alert('密码为6-20位字母数字组合');
            return false;
        } else {
            document.getElementById("regForm").submit();
        }
    });
    // 注册验证
    $("a[name='reg']").click(function(){
        var mobile = $("input[name='mobile']").val();
        var password = $("input[name='password']").val();

        var regMobile=/^1[0-9]{10}$/;
        var regPass=/^([\w\+\!\@\#\$\%\^\&\*\(\)]{6,20})$/;

        if(''==mobile) {
            alert('请填写手机号');
            return false;
        } else if(!regMobile.test(mobile)) {
            alert('请填写正确的手机号码');
            return false;
        } else if(password == "") {
            alert('密码不能为空');
            return false;
        } else if(!regPass.test(password)) {
            alert('密码为6-20位字母数字组合');
            return false;
        } else {
            document.getElementById("regForm").submit();
        }
    });
    // 取消课程
    $(".delclass").click(function() {
        if ($(this).attr("time_end")==1) {
            var teacher_name = ($(this).attr("appoint_id") == "_1" ? "" : $(".t-name").text());
            if (confirm("为了您能享受一节完美的体验课，" + teacher_name + "老师正在努力的备课中， 确认取消么？")) {
                var tea_name = $(this).attr("tea_name");
                var appoint_id = $(this).attr("appoint_id");
                $.ajax({
                    url:"/ajax/delCoruse",
                    data:{
                        tea_name: tea_name,
                        appoint_id: appoint_id
                    },
                    type:'post',
                    cache:false,
                    dataType:'json',
                    success: function(data) {
                        if (data.status!=0) {
                            window.location.href='/user/trial';
                            return false;
                        } else {
                            alert(data.info);
                            return false;
                        }
                    },
                    error: function() {
                        alert('网络异常，取消失败');
                    }
                });
            } else {
                return false;
            }
        } else {
            alert("上课前半小时无法取消课程");
            return false;
        }
    });
    // 完成预约校验
    $("a[name='finish']").click(function(){
        var qq=$("input[name='qq']").val();
        var skype=$("input[name='skype']").val();

        var skypere = /^[A-Za-z\s]{1}[A-Za-z0-9\_\:\.\-\@\s]{5,31}$/;
        var qqre = /^[1-9]{1}[0-9]{4,}$/;

        if ($("input[name='tool']").val() == "qq") {
            if (qq == '') {
                alert('请填写qq');
                return false;
            } else if ( !qqre.test(qq)) {
                alert('请填写正确的qq');
                return false;
            } else {
                document.getElementById("regForm").submit();
            }
        } else if ($("input[name='tool']").val() == "skype") {
            if (skype == '') {
                alert('请填写skype');
                return false;
            } else if ( !skypere.test(skype)) {
                alert('请填写正确的skype');
                return false;
            } else {
                document.getElementById("regForm").submit();
            }
        } else if ($("input[name='tool']").val() == "ac") {
            document.getElementById("regForm").submit();
        }else if($("input[name='tool']").val() == "app"){
            document.getElementById("regForm").submit();
        }
    });

    $(".lab").click(function() {
        $("i").removeClass("on");
        $(this).addClass("on");
        $("input[name='tool']").val($(this).attr("type"));
    });
    $(".lab2").click(function() {
        $("i").removeClass("on");
        $(this).addClass("on");
        $("input[name='tool']").val($(this).attr("type"));
    });
    // 英语水平选择
    $(".e-level").on("click","li a",function(){
        $(".e-level li a").removeClass("active");
        $(this).addClass("active");
        $("#englishLevel").val($(this).attr("data"));
        if ($("input[name='occup']").val()==6) {
            if ($("#englishLevel").val()==3 || $("#englishLevel").val()==0) {
                if ($("input[name='purpose_desc']").val()==10) {
                    $("#checkPurpose li a").removeClass("active");
                    $("input[name='purpose_desc']").val("");
                }
                $("#junior").show();
            } else {
                $("#junior").hide();
                if ($("input[name='purpose_desc']").val()==10) {
                    $("input[name='purpose_desc']").val("");
                    $("#checkPurpose li a").removeClass("active");
                }
            }
        }
    });
    // 上课日期
    $(".c-day").on("click","li a",function(){
        $(".c-day li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='course_date']").val($(this).attr("data"));
        if ($(this).parent("li").index()!=0) {
            $(".c-time-today").hide();
            $(".c-time-other").show();
        } else {
            $(".c-time-other").hide();
            $(".c-time-today").show();
        }
        //青少强制AC体验课测试
        $.ajax({
            url: "/user/ajaxShowQQ",
            data:{
                "course_date":$("input[name='course_date']").val(),
                "course_time":$("input[name='course_time']").val(),
                "grade":$("input[name='grade']").val()
            },
            type:'post',
            dataType:'json',
            success: function(data) {
                if (data.status==1) {
                    $("#checkQQ").show();
                    $("#tabForm").attr("action","/user/doReserve");
                } else {
                    $("#checkQQ").hide();
                }
            }
        });
    });
    // 上课时间
    $(".c-time-today").on("click","li a",function(){
        $(".c-time-today li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='course_time']").val($(this).attr("data"));
        //青少强制AC体验课测试
        $.ajax({
            url: "/user/ajaxShowQQ",
            data:{
                "course_date":$("input[name='course_date']").val(),
                "course_time":$("input[name='course_time']").val(),
                "grade":$("input[name='grade']").val()
            },
            type:'post',
            dataType:'json',
            success: function(data) {
                if (data.status==1) {
                    $("#checkQQ").show();
                    $("#tabForm").attr("action","/user/doReserve");
                } else {
                    $("#checkQQ").hide();
                }
            }
        });
    });
    $(".c-time-other").on("click","li a",function(){
        $(".c-time-other li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='course_time']").val($(this).attr("data"));
        // $("input[name='occup']").val("");
        //青少强制AC体验课测试
        $.ajax({
            url: "/user/ajaxShowQQ",
            data:{
                "course_date":$("input[name='course_date']").val(),
                "course_time":$("input[name='course_time']").val(),
                "grade":$("input[name='grade']").val()
            },
            type:'post',
            dataType:'json',
            success: function(data) {
                if (data.status==1) {
                    $("#checkQQ").show();
                    $("#tabForm").attr("action","/user/doReserve");
                } else {
                    $("#checkQQ").hide();
                }
            }
        });
    });
    // 所属人群
    $(".occup li a").on("click",function(){
        if($(this).hasClass('active'))return;
        $("#checkPurpose").hide();
        $("#checkPurpose ul li").remove();
        $(".occup li a").removeClass("active");
        $("#checkGrade").hide().find("li a").removeClass("active");
        $('#age').hide().find("li a").removeClass("active");
        $('#mdSchool').hide().find("li a").removeClass("active");
        $("input[name='grade']").val("");
        $(this).addClass("active");
        $("input[name='occup']").val($(this).attr("data"));

        if ($(this).attr("data")==6) {
            $("input[name='grade']").val("");
            $('#mdSchool').show();
        }

        if ($(this).attr("data")==4) {
            $("input[name='purpose_desc']").val('');
            $("#checkGrade").show();
        } else if ($(this).attr("data")==7) {
            $("input[name='purpose_desc']").val(77);
            $('#age').show();
        } else {
            $("input[name='purpose_desc']").val("");
            $.ajax({
                url:"/ajax/getPurpose",
                data:{occup_id: $(this).attr("data")},
                type:'post',
                cache:false,
                dataType:'json',
                success: function(data) {
                    if (data.status==1) {
                        for (var key in data.data.sub_ls) {
                            if ($("input[name='occup']").val()==6 && data.data.sub_ls[key]==10) {
                                if ($("#englishLevel").val()==3 || $("#englishLevel").val()==0) {
                                    $("#checkPurpose ul").append('<li id="junior"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                } else {
                                    $("#checkPurpose ul").append('<li id="junior" style="display: none;"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                            } else {
                                var hotFlag = (data.data.sub_ls[key] == 20 || data.data.sub_ls[key] == 21) ? '<span class="hot-i"></span>' : '';

                                $("#checkPurpose ul").append('<li>'+hotFlag+'<a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                            }
                        }
                        $("#checkPurpose").unbind("click").on("click","li a",function(){
                            $("#checkPurpose li a").removeClass("active");
                            $("input[name='purpose_desc']").val($(this).attr("data"));
                            eLevelFn.call(null,$(this));
                            $(this).addClass("active");
                        });
                        $("#checkPurpose").show();
                    }
                }
            });
        }

    });
    // 年级
    $("#checkGrade").on("click","li a",function(){
        if($(this).hasClass('active'))return;
        $("#checkGrade li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='grade']").val($(this).attr("data"));

        // if($(this).hasClass('active'))return;
        $("#checkPurpose").hide();
        $("#checkPurpose ul li").remove();
        //青少强制AC体验课测试
        $.ajax({
            url: "/user/ajaxShowQQ",
            data:{
                "course_date":$("input[name='course_date']").val(),
                "course_time":$("input[name='course_time']").val(),
                "grade":$("input[name='grade']").val()
            },
            type:'post',
            dataType:'json',
            success: function(data) {
                if (data.status==1) {
                    $("#checkQQ").show();
                    $("#tabForm").attr("action","/user/doReserve");
                } else {
                    $("#checkQQ").hide();
                }
            }
        });

        //学习目的
        $.ajax({
                url:"/ajax/getPurpose",
                data:{
                    grade: $(this).attr("data"),
                    occup_id:$("input[name='occup']").val()
                },
                type:'post',
                cache:false,
                dataType:'json',
                success: function(data) {
                    if (data.status==1) {
                        for (var key in data.data.sub_ls) {
                            if ($("input[name='occup']").val()==6 && data.data.sub_ls[key]==10) {
                                if ($("#englishLevel").val()==3 || $("#englishLevel").val()==0) {
                                    $("#checkPurpose ul").append('<li id="junior"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                } else {
                                    $("#checkPurpose ul").append('<li id="junior" style="display: none;"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                            } else {
                                if(data.data.sub_ls[key]==29){
                                    $("#checkPurpose ul").append('<li><span class="usa-i"></span><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }else{
                                    $("#checkPurpose ul").append('<li><span class="hot-i"></span><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                            }
                        }
                        $("#checkPurpose").unbind("click").on("click","li a",function(){
                            $("#checkPurpose li a").removeClass("active");
                            $("input[name='purpose_desc']").val($(this).attr("data"));
                            eLevelFn.call(null,$(this));
                            $(this).addClass("active");
                        });
                        $("#checkPurpose").show();
                    }
                }
            });
    });

    $('aside').not('.e-level').not('#mdSchool').on('click','li a',function(){
        $('#nceLevel').hide();
        $('#eLevel').show();
    });
    function eLevelFn(ele){
        var dataValue = ele.attr('data');
        if(dataValue == 20 || dataValue == 22){
            if(ele.hasClass('active')) return false;
            var englistLevel = '';
            $.ajax({
                type:'post',
                url:'/ajax/getEnglishLevel',
                data:{
                    purpose:ele.attr('data')
                },
                dataType:'json',
                cache:false,
                success:function(data){
                    if(data.status == 1){
                        $('#englishLevel').val('0');
                        $('#eLevel ul li a').removeClass('active');
                        for(key in data.data.sub_ls){
                            englistLevel += '<li><a href="javascript:;" data="'+ data.data.sub_ls[key] +'">'+ key +'</a></li>'
                        }
                        $('#nceLevel ul').html(englistLevel);
                        $('#nceLevel').show();
                        $('#eLevel').hide();
                    } 
                }
            });
        }else{
            $('#nceLevel').hide();
            $('#eLevel').show();      
        }
    }
    // 年龄
    $("#age").on("click","li a",function(){
        $("#age li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='grade']").val($(this).attr("data"));
    });
    //初中生  年级
    $("#mdSchool").on("click","li a",function(){
        $("#mdSchool li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='grade']").val($(this).attr("data"));
    });
    
    // 约课提交
    $("#tabSure").click(function() {
        var course_date = $("input[name='course_date']").val() || "";
        var course_time = $("input[name='course_time']").val() || "";
        var purpose_desc = $("input[name='purpose_desc']").val();
        var occup = $("input[name='occup']").val();
        var grade = $("input[name='grade']").val();
        var englishLevel = $("#englishLevel").val();
        if (course_date=="") {
            alert("请选择上课日期");
            return false;
        } else if (course_time == "") {
            alert("请选择上课时间");
            return false;
        } else {
            document.getElementById("tabForm").submit();
        }
        // } else if (englishLevel == 0 && englishLevel != undefined) {
        //     alert("请选择英语水平");
        //     return false;
        // } else if (occup == "" && occup != undefined) {
        //     alert("请选择所属人群");
        //     return false;
        // }else if(grade == "" && grade != undefined && ($("input[name='occup']").val()==4 || $("input[name='occup']").val()==6 || $("input[name='occup']").val()==7)){
        //     alert("请选择年级");
        //     return false;
        // } else if (purpose_desc == "" && purpose_desc != undefined) {
        //     alert("请选择学习目的");
        //     return false;
        // } else if ($("input[name='checked_code']").val()!=undefined && !flag) {
        //     alert("请填写正确验证码");
        //     return false;
        // } else {
        //     document.getElementById("tabForm").submit();
        // }
    });

    $(".rtChange").click(function(){
        $(this).siblings("img").trigger("click");
        return false;
    });
    

    // 温馨提示窗口
    $("#ac-btn").click(function(){
        $(".ac-com").hide();
    });
    // 修改课程
    $(".ac-sect .lt,.rt").click(function(){
        $(this).parents(".ac-sect").find(".ac-down").toggle();
    });
    $("#ac-lt").click(function(){
        $(".ac-down-new").toggle();
    });

    /* 课程和教材修改 */
    $(".ac-down li a").click(function() {
        $(this).parents(".ac-sect").find(".lt").html($(this).html());
        $(this).parents(".ac-down").hide();
        $("#course_top").val($(this).parent().attr("data-course-id") || "");
        $("#course_sub").val("");
        if ($(this).parent().attr("data-course-id") == "" || $(this).parent().attr("data-course-id") == undefined) {
            $(".ac-sect").eq(1).hide();
            return;
        }
        var data = {};
        data.course_id = $(this).parent().attr("data-course-id");
        $.ajax({
            url: '/ajax/getCourseNew',
            data: data,
            dataType: 'json',
            type: 'POST',
            success: function(res) {
                var data = res.data;
                if(!data){
                  return;
                }
                var str = '<li data-course-id=""><a href="javascript:;">Please Select<a></li>';
                for (key in data)  str = str + '<li data-course-id="' + data[key].id + '"><a href="javascript:;">' + data[key].course_name + '<a></li>'
                $(".ac-sect").eq(1).css("z-index", "2");
                $(".ac-sect").eq(1).find(".ac-down").html(str);
                $(".ac-sect").eq(1).show();
                $(".ac-sect").eq(1).find(".ac-down li a").click(function(){
                    $(".ac-sect").eq(1).find(".ac-down").hide();
                    $(this).parents(".ac-sect").find(".lt").html($(this).html());
                    $("#course_sub").val($(this).parent().attr("data-course-id"));
                });
            }
        });
    });

    /* 上课方式修改 */
    $(".ac-down-new li a").click(function(){
        $("#ac-lt .lt").html($(this).html());
        $(".ac-down-new").hide();
        $("#lesson_type").val($(this).attr("data-listen-type"));
    });


    $("#changeBtn").click(function() {
        if(!$(".ac-sect").eq(1).is(":hidden") && $("#course_sub").val() == "") {
            alert("请选择教材");
            return false;
        }
        if($("#course_sub").val() != $("#old_course_sub").val() || $("#lesson_type").val() != $("#old_lesson_type").val()) {
            document.getElementById("regForm").submit();
            return;
        } else {
            if (confirm("您当前没有做任何的修改")) {
                document.getElementById("regForm").submit();
                return;
            }
        }
    });

    //点击下载手机客户端领取新人红包
    $('.secondLink').on('click',function(){
        var data={};
        data.type = $('.secondLink').attr('data-type');
        $.ajax({
            url:"/Ajax/countWchat",
            data:data,
            type:'post',
            dataType:'json'
        });
        var dataUrl = $('.secondLink').attr('data-url');
        $('.secondLink').attr('href',dataUrl);
    });

    $('#bm-next').on('click', function(){
        var purpose_desc = $("input[name='purpose_desc']").val();
        var occup = $("input[name='occup']").val();
        var grade = $("input[name='grade']").val();
        var englishLevel = $("#englishLevel").val();
        if (englishLevel == 0 && englishLevel != undefined) {
            alert("请选择英语水平");
            return false;
        } else if (occup == "" && occup != undefined) {
            alert("请选择学员身份");
            return false;
        }else if(grade == "" && grade != undefined && ($("input[name='occup']").val()==4 || $("input[name='occup']").val()==6 || $("input[name='occup']").val()==7)){
            alert("请选择年级");
            return false;
        } else if (purpose_desc == "" && purpose_desc != undefined) {
            alert("请选择学习目的");
            return false;
        } else {
            document.getElementById("tabForm1").submit();
        }
    });

    //北美学员类型的学习目的增加美小
    // 英语水平选择
    var specialSituation = "";
    $("#tabFormUSA .e-level").on("click","li a",function(){
        $(".e-level li a").removeClass("active");
        $(this).addClass("active");
        $("#englishLevelUSA").val("");
        $("#englishLevelUSA").val($(this).attr("data"));
        if ($("input[name='occup']").val()==6) {
            if ($("#englishLevelUSA").val()==3 || $("#englishLevelUSA").val()==0) {
                if ($("input[name='purpose_desc']").val()==10) {
                    $("#checkPurpose li a").removeClass("active");
                    $("input[name='purpose_desc']").val("");
                }
                $("#juniorUSA").show();
            } else {
                $("#juniorUSA").hide();
                if ($("input[name='purpose_desc']").val()==10) {
                    $("input[name='purpose_desc']").val("");
                    $("#checkPurposeUSA li a").removeClass("active");
                }
            }
        }
    });
    // 所属人群
    $("#tabFormUSA .occup li a").on("click",function(){

        // if($(this).hasClass('active')){
        //     alert(0)
        // }
        $("#checkPurposeUSA").hide();
        $("#checkPurposeUSA ul li").remove();
        $(".occup li a").removeClass("active");
        $("#checkGradeUSA").hide().find("li a").removeClass("active");
        $('#ageUSA').hide().find("li a").removeClass("active");
        $('#mdSchoolUSA').hide().find("li a").removeClass("active");
        $("input[name='grade']").val("");
        $(this).addClass("active");
        $("input[name='occup']").val($(this).attr("data"));
        specialSituation = "";
        if ($(this).attr("data")==6) {
            $("input[name='grade']").val("");
            $('#mdSchoolUSA').show();
        }

        if ($(this).attr("data")==4) {
            specialSituation = "special";
            $("input[name='purpose_desc']").val('');
            $("#checkGradeUSA").show();
        } else if ($(this).attr("data")==7) {
            specialSituation = "special";
            $("input[name='purpose_desc']").val(77);
            $('#ageUSA').show();
        } else {
            $("input[name='purpose_desc']").val("");
            $.ajax({
                url:"/ajax/getNaPurpose",
                data:{occup_id: $(this).attr("data")},
                type:'post',
                cache:false,
                dataType:'json',
                success: function(data) {
                    if (data.status==1) {
                        for (var key in data.data.sub_ls) {
                            if ($("input[name='occup']").val()==6 && data.data.sub_ls[key]==10) {
                                if ($("#englishLevelUSA").val()==3 || $("#englishLevelUSA").val()==0) {
                                    $("#checkPurposeUSA ul").append('<li id="junior"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                } else {
                                    $("#checkPurpose ul").append('<li id="juniorUSA" style="display: none;"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                            } else {
                                var hotFlag = (data.data.sub_ls[key] == 20 || data.data.sub_ls[key] == 21) ? '<span class="hot-i"></span>' : '';

                                $("#checkPurposeUSA ul").append('<li>'+hotFlag+'<a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                            }
                        }
                        $("#checkPurposeUSA").unbind("click").on("click","li a",function(){
                            $("#checkPurposeUSA li a").removeClass("active");
                            $("input[name='purpose_desc']").val($(this).attr("data"));
                            eLevelFn.call(null,$(this));
                            $(this).addClass("active");
                        });
                        $("#checkPurposeUSA").show();
                    }
                }
            });
        }

    });
    // 年级
    $("#checkGradeUSA").on("click","li a",function(){
        if($(this).hasClass('active'))return;
        $("#checkGradeUSA li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='grade']").val($(this).attr("data"));
        $("input[name='purpose_desc']").val("");
        // if($(this).hasClass('active'))return;
        $("#checkPurposeUSA").hide();
        $("#checkPurposeUSA ul li").remove();
        //青少强制AC体验课测试
        $.ajax({
            url: "/user/ajaxShowQQ",
            data:{
                "course_date":$("input[name='course_date']").val(),
                "course_time":$("input[name='course_time']").val(),
                "grade":$("input[name='grade']").val()
            },
            type:'post',
            dataType:'json',
            success: function(data) {
                if (data.status==1) {
                    $("#checkQQ").show();
                    $("#tabForm").attr("action","/user/doReserve");
                } else {
                    $("#checkQQ").hide();
                }
            }
        });

        //学习目的
        if($(this).parents("#checkGradeUSA").hasClass("learn_goals")){
           
        }else{
            $.ajax({
                url:"/ajax/getNaPurpose",
                data:{
                    grade: $(this).attr("data"),
                    occup_id:$("input[name='occup']").val()
                },
                type:'post',
                cache:false,
                dataType:'json',
                success: function(data) {
                    if (data.status==1) {
                        for (var key in data.data.sub_ls) {
                            if ($("input[name='occup']").val()==6 && data.data.sub_ls[key]==10) {
                                if ($("#englishLevelUSA").val()==3 || $("#englishLevelUSA").val()==0) {
                                    $("#checkPurposeUSA ul").append('<li id="junior"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                } else {
                                    $("#checkPurposeUSA ul").append('<li id="junior" style="display: none;"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                            } else {
                                if(data.data.sub_ls[key]==29){
                                    $("#checkPurposeUSA ul").append('<li><span class="usa-i"></span><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }else{
                                    $("#checkPurposeUSA ul").append('<li><span class="hot-i"></span><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                                

                            }
                        }
                        $("#checkPurposeUSA").unbind("click").on("click","li a",function(){
                            $("#checkPurposeUSA li a").removeClass("active");
                            $("input[name='purpose_desc']").val($(this).attr("data"));
                            eLevelFn.call(null,$(this));
                            $(this).addClass("active");
                        });
                        $("#checkPurposeUSA").show();
                    }
                }
            });
        }
       
    });

    $('aside').not('.e-level').not('#mdSchoolUSA').on('click','li a',function(){
        $('#nceLevelUSA').hide();
        $('#eLevelUSA').show();
    });
    function eLevelFn(ele){
        var dataValue = ele.attr('data');
        if(dataValue == 20 || dataValue == 22){
            if(ele.hasClass('active')) return false;
            var englistLevel = '';
            $.ajax({
                type:'post',
                url:'/ajax/getEnglishLevel',
                data:{
                    purpose:ele.attr('data')
                },
                dataType:'json',
                cache:false,
                success:function(data){
                    if(data.status == 1){
                        $('#englishLevelUSA').val('0');
                        $('#eLevelUSA ul li a').removeClass('active');
                        for(key in data.data.sub_ls){
                            englistLevel += '<li><a href="javascript:;" data="'+ data.data.sub_ls[key] +'">'+ key +'</a></li>'
                        }
                        $('#nceLevelUSA ul').html(englistLevel);
                        $('#nceLevelUSA').show();
                        $('#eLevelUSA').hide();
                    } 
                }
            });
        }else{
            $('#nceLevelUSA').hide();
            $('#eLevelUSA').show();      
        }
    }
    // 年龄
    $("#ageUSA").on("click","li a",function(){
        $("#ageUSA li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='grade']").val($(this).attr("data"));
        $("#checkPurposeUSA").hide();
        $("#checkPurposeUSA ul li").remove();
        //学习目的
        if($(this).parents("#ageUSA").hasClass("learn_goals")){
         
        }else{
            $.ajax({
                url:"/ajax/getNaPurpose",
                data:{
                    grade: $(this).attr("data"),
                    occup_id:$("input[name='occup']").val()
                },
                type:'post',
                cache:false,
                dataType:'json',
                success: function(data) {
                    if (data.status==1) {
                        for (var key in data.data.sub_ls) {
                            if ($("input[name='occup']").val()==7 && data.data.sub_ls[key]==10) {
                                if ($("#englishLevelUSA").val()==3 || $("#englishLevelUSA").val()==0) {
                                    $("#checkPurposeUSA ul").append('<li id="junior"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                } else {
                                    $("#checkPurposeUSA ul").append('<li id="juniorUSA" style="display: none;"><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                            } else {
                                if(data.data.sub_ls[key]==29){
                                    $("#checkPurposeUSA ul").append('<li><span class="usa-i"></span><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }else{
                                    $("#checkPurposeUSA ul").append('<li><span class="hot-i"></span><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                                }
                                
                            }
                        }
                        $("#checkPurposeUSA").unbind("click").on("click","li a",function(){
                            $("#checkPurposeUSA li a").removeClass("active");
                            $("input[name='purpose_desc']").val("");
                            $("input[name='purpose_desc']").val($(this).attr("data"));
                            eLevelFn.call(null,$(this));
                            $(this).addClass("active");
                        });
                        if($("#ageUSA li a[class=active]").attr("data")!=-1){
                            $("#checkPurposeUSA").hide();

                        }else{
                            $("#checkPurposeUSA").show();
                            $("input[name='purpose_desc']").val("");

                        }
                        
                    }
                }
            }); 
        }
       
    });
    //初中生  年级
    $("#mdSchoolUSA").on("click","li a",function(){
        $("#mdSchoolUSA li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='grade']").val($(this).attr("data"));
    });

    $('#bm-nextUSA').on('click', function(){
        var purpose_desc = $("input[name='purpose_desc']").val();
        var occup = $("input[name='occup']").val();
        var grade = $("input[name='grade']").val();
        var englishLevel = $("#englishLevelUSA").val();
        if(specialSituation === "special" && $("#tabFormUSA").hasClass("specialPath")){
            purpose_desc = "special";
        }
        if (englishLevel == 0 && englishLevel != undefined) {
            alert("请选择英语水平");
            return false;
        } else if (occup == "" && occup != undefined) {
            alert("请选择学员身份");
            return false;
        }else if(grade == "" && grade != undefined && ($("input[name='occup']").val()==4 || $("input[name='occup']").val()==6 || $("input[name='occup']").val()==7)){
            alert("请选择年级");
            return false;
        } else if (purpose_desc == "" && purpose_desc != undefined) {
            alert("请选择学习目的");
            return false;
        } else {
            document.getElementById("tabFormUSA").submit();
        }
    });
    //美国小学市场渠道落地页
    $(".special_more_btn").on("click",function(){
        $(this).hide();
        $("#tabFormUSA").find(".special_hide").show();
    })
});
