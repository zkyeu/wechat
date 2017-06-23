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
                        if (data.status==1) {
                            window.location.href='/user/trial';
                            return false;
                        } else if(data.status==2){
                            window.location.href='/user/newAboutClass';
                        }
                        else {
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
    // $("a[name='finish']").click(function(){
    //     var qq=$("input[name='qq']").val();
    //     var skype=$("input[name='skype']").val();

    //     var skypere = /^[A-Za-z\s]{1}[A-Za-z0-9\_\:\.\-\@\s]{5,31}$/;
    //     var qqre = /^[1-9]{1}[0-9]{4,}$/;
    //     if(!$(".expric").find("i").hasClass("on")){
    //         alert('请选择上课方式');
    //     }else if($("input[name='tool']").val() == "qq") {
    //         if (qq == '') {
    //             alert('请填写qq');
    //             return false;
    //         } else if ( !qqre.test(qq)) {
    //             alert('请填写正确的qq');
    //             return false;
    //         } else {
    //             document.getElementById("regForm").submit();
    //         }
    //     } else if ($("input[name='tool']").val() == "skype") {
    //         if (skype == '') {
    //             alert('请填写skype');
    //             return false;
    //         } else if ( !skypere.test(skype)) {
    //             alert('请填写正确的skype');
    //             return false;
    //         } else {
    //             document.getElementById("regForm").submit();
    //         }
    //     } else if ($("input[name='tool']").val() == "ac") {
    //         document.getElementById("regForm").submit();
    //     }else if($("input[name='tool']").val() == "app"){
    //         document.getElementById("regForm").submit();
    //     }
    // });
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
            $("input[name='purpose_desc']").val(44);
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
                                $("#checkPurpose ul").append('<li><a href="javascript:;" data="'+data.data.sub_ls[key]+'">'+key+'</a></li>');
                            }
                        }
                        $("#checkPurpose").unbind("click").on("click","li a",function(){
                            $("#checkPurpose li a").removeClass("active");
                            $(this).addClass("active");
                            $("input[name='purpose_desc']").val($(this).attr("data"));
                        });
                        $("#checkPurpose").show();
                    }
                }
            });
        }

    });
    // 年级
    $("#checkGrade").on("click","li a",function(){
        $("#checkGrade li a").removeClass("active");
        $(this).addClass("active");
        $("input[name='grade']").val($(this).attr("data"));
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
        } else if (englishLevel == 0 && englishLevel != undefined) {
            alert("请选择英语水平");
            return false;
        } else if (occup == "" && occup != undefined) {
            alert("请选择所属人群");
            return false;
        }else if(grade == "" && grade != undefined && ($("input[name='occup']").val()==4 || $("input[name='occup']").val()==6 || $("input[name='occup']").val()==7)){
            alert("请选择年级");
            return false;
        } else if (purpose_desc == "" && purpose_desc != undefined) {
            alert("请选择学习目的");
            return false;
        } else if ($("input[name='checked_code']").val()!=undefined && !flag) {
            alert("请填写正确验证码");
            return false;
        } else {
            document.getElementById("tabForm").submit();
        }
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
                    // if (data[$(this).parent().attr("data-course-id")].child != undefined) {
                    //     var str_c = '<li data-course-id=""><a href="javascript:;">Please Select<a></li>';
                    //     for (key_c in data[$(this).parent().attr("data-course-id")].child) str_c = str_c + '<li data-course-id="' + data[$(this).parent().attr("data-course-id")].child[key_c].id + '"><a href="javascript:;">' + data[$(this).parent().attr("data-course-id")].child[key_c].course_name + '<a></li>'
                    //     $(".ac-sect").eq(2).find(".ac-down").html(str_c);
                    //     $(".ac-sect").eq(2).show();
                    //     $(".ac-sect").eq(2).find(".ac-down li a").click(function(){
                    //         $(".ac-sect").eq(2).find(".ac-down").hide();
                    //         $(this).parents(".ac-sect").find(".lt").html($(this).html());
                    //         console.log($(this).parent().attr("data-course-id"));
                    //     });
                    // }
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

/*2016.5.18领取欧美体验课*/
  /*上课日期是否已满*/
  res={
    data:[
      {
        name: 'zzz',
        value: '1',
        dataType:"0",
        dataRm:"今天",
      },
      {
        name: 'zzz',
        value: '1',
        dataType:"0",
        dataRm:"明天",
      },
      {
        name: 'zzz',
        value: '1',
        dataType:"1",
        dataRm:"5.14",
      },
      {
        name: 'zzz',
        value: '1',
        dataType:"1",
        dataRm:"5.15",
      },
      {
        name: 'zzz',
        value: '1',
        dataType:"1",
        dataRm:"5.16",
      },
    ]
  }
  function dataTime(dataT){
    var str="";
    for(var i=0; i<dataT.length;i++){
      str+='<li  data-name="' + dataT[i].name + '" data-val="' + dataT[i].value + '" class="' + (dataT[i].dataType == 0 ? 'full': 'd-list') + '">'
        +'<a>'
        +'<span class="tm">'+dataT[i].dataRm+'</span>'
        +'<span class="dta">'+ (dataT[i].dataType == 0 ? '已满': '可选') + '</span>'
        +'</a>'
        +'</li>';
    }
    return str;
  }

  /*欧美上课日期*/
  $(".t-data").on("click",".d-list",function(){
    $(this).addClass("list-on").siblings().removeClass("list-on");
    $("#second").val("");

    if ($("#container").attr("data-debug") == "1") {
      $(".t-time .da-list").html(dataTime(res.data)).show();
      $(".t-time .da-full").hide();
    } else {
      $.ajax({
        url: $("#container").attr("data-url") || "",
        data: {tmData: $(this).attr("data-time")},
        dataType: 'json',
        type: 'post',
        success: function(res) {
          $(".t-time .da-list").html(dataTime(res.data)).show();
          $(".t-time .da-full").hide();
        }
      });
    }
    $("input[name='" + $(this).attr("data-name") + "']").val($(this).attr("data-val"));

    /*欧美上课时间*/
    $(".t-time").on("click",".d-list",function(){
      $(this).addClass("list-on").siblings().removeClass("list-on");
      $("input[name='" + $(this).attr("data-name") + "']").val($(this).attr("data-val"));
    });
  });
  /*提交按钮*/
  $(".am-btn").click(function(){
    if($("#amrForm input[name='course_date']").eq(0).val()==""){
      alert("请选择上课日期");
      return false;
    }
    if($("#amrForm input[name='course_time']").eq(1).val()==""){
      alert("请选择上课时间");
      return false;
    }
    $("#amrForm").submit();
  });
  $(document).ready(function() {
    $(".t-data .d-list").eq(0).hasClass("full")? $(".t-data .d-list").eq(1).trigger("click") : $(".t-data .d-list").eq(0).trigger("click");
  });

  //点击播放显示视频播放
    $('.video_guide .play').on('click',function(){
        $('.mask').show();
    })
    //点击蒙版隐藏视频
      $('.mask').on('click',function(){
        $(this).hide();
        $('video').get(0).pause();
      })
    setTimeout(function(){
        $('.mask + div').appendTo($('.mask'))
    },100);

  /*2016.6.30*/
 $(".exp-les").find("li").click(function(){
        $(this).addClass("les-on").siblings().removeClass("les-on");
        var index=$(this).index();
        $(".chr-mr .chr-tea").eq(index).removeClass("hide").siblings().addClass("hide");
        $("input[name='course_type']").val($(this).attr("type"));

        if($(this).attr("type") == 'ct'){
            $("input[name='tool']").val('ac');
        }else{
            var tool_val = $(".chr-mr .chr-tea").eq(index).find(".on").attr("type");
            $("input[name='tool']").val(tool_val ? tool_val : '');
        }
    });

  //完成预约
  $("a[name='finish']").click(function(){
    function teaRf(id){
        var $pred=$("#"+id);
        var qq=$pred.find("input[name='qq']").val();
        var skype=$pred.find("input[name='skype']").val();
        var skypere = /^[A-Za-z\s]{1}[A-Za-z0-9\_\:\.\-\@\s]{5,31}$/;
        var qqre = /^[1-9]{1}[0-9]{4,}$/;
        if(!$(".expric").find("i").hasClass("on")){
            alert('请选择上课方式');
        }else if($("input[name='tool']").val() == "qq") {
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
    }
    if($(".exp-t-one").hasClass("hide")){
      teaRf('expRt'); 
    }else{
      if($(".chr-mr .chr-tea").eq(0).hasClass("hide")){
        teaRf('expLt');
      }else{
        document.getElementById("regForm").submit();
      }
    }
  });
  $(".les-lt,.les-lt").click(function(){
    $("i").removeClass("on");
    $(this).find("i").addClass("on");
    $("input[name='tool']").val($(this).find("i").attr("type"));
  }); 

  // 插件
   $(function () {
        var currYear = (new Date()).getFullYear();  
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式 
            display: 'modal', //显示方式 
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy-mm-dd',
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear - 100, //开始年份
            endYear: currYear + 100 //结束年份
        };
        $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
        var optDateTime = $.extend(opt['datetime'], opt['default']);
        var optTime = $.extend(opt['time'], opt['default']);
        $("#appTime").mobiscroll(optTime).time(optTime);
    });
    /*添加推荐英文名2*/
    var regs = {
        qq: /^[1-9]{1}[0-9]{4,}$/i,
        realName: /^\s*[\u4e00-\u9fa5]{1,15}\s*$/,
        engName: /^[a-zA-Z]{2,20}$/
    }
    $(".m-addyoung-name .error-tit,.m-addadult-name .error-tit").click(function(){
        if($(this).parent().find("input").hasClass("date_picker")){
            $(this).hide().parent().find("input").show();
        }else{
            $(this).hide().parent().find("input").show().focus();
        }  
    })
   
    //提交按钮成人
    $('.m-addadult-name .subtn').click(function(){
        var realName = $.trim($('.m-addadult-name input[name="chName"]').val());
        var engName = $.trim($('.m-addadult-name input[name="engName"]').val());
        if(!regs.realName.test(realName)){
            $('input[name="chName"]').hide().next().show();
            return false; 
        }
        if(!regs.engName.test(engName)){
            $('input[name="engName"]').hide().next().show();
            return false;
        }
        /* 表单提交 */
        $.ajax({
            url: $(this).attr('infoUrl') || '',
            type: 'POST',
            data: {
                engName: engName,
                real_name: realName
            },
            dataType: 'json',
            success: function(rs){
                if(rs.status == 1){
                    $('.m-addadult-name').hide();
                }
            }
        });
    });

    //孩子性别
    $(".m-addyoung-name .child-sex span").click(function(){
        var _index = $(this).index();
        var _index = $(this).index();
        if(_index == 0){
            _index = "woman";
        }else if(_index == 1){
            _index = "man";
        }
        $(this).parent().next().hide();
        $(this).addClass("u-check");
        $(this).siblings().removeClass("u-check");
        $('.m-addyoung-name input[name="sex_info"]').val(_index);
    })
    // 青少提交
    $('.m-addyoung-name .subtn').click(function(){
        var realName = $.trim($('.m-addyoung-name input[name="chName"]').val());
        var engName = $.trim($('.m-addyoung-name input[name="engName"]').val());
        var sex = $.trim($('.m-addyoung-name input[name="sex_info"]').val());
        var date = $.trim($('.m-addyoung-name input[name="birthday"]').val());
        var regDate = /^((19|20)\d{2})-(\d{2})-(\d{2})$/;

        var myDate = new Date();
        var testDate = date.split("-");
        var _year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)    
        var _month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)    
        var _date = myDate.getDate(); //获取当前日(1-31)  
        if(!regs.realName.test(realName)){
            $('.m-addyoung-name input[name="chName"]').hide().next().show();
            return false;
        }
        if(!regs.engName.test(engName)){
            $('.m-addyoung-name input[name="engName"]').hide().next().show();
            return false;
        }
        if( sex == "" ){
            $('.m-addyoung-name .child-sex').next().show();
            return false;
        }
        if(_year < parseInt(testDate[0])){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show(); 
            return false;
        }
        if(_year == parseInt(testDate[0]) && _month < parseInt(testDate[1])){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show(); 
            return false;
        }
        if(_year == parseInt(testDate[0]) && _month == parseInt(testDate[1]) && _date < parseInt(testDate[2])){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show(); 
            return false;
        }
        if(!regDate.test(date)){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show();
            return false;
        }
        /* 表单提交 */
        $.ajax({
            url: $(this).attr('infoUrl') || '',
            type: 'POST',
            data: {
                engName: engName,
                sex: sex,
                real_name: realName,
                birthday: date
            },
            dataType: 'json',
            success: function(rs){
                if(rs.status == 1){
                    $('.m-addyoung-name').hide();
                }
            }
        });
    });


    //点击推荐名字
    $('.m-addyoung-name .rct-name').click(function(){
        if($(this).hasClass("haveshow")){
            $(this).removeClass("haveshow");
            $(".m-addyoung-name .m-namelist").hide();
        }else{
            $(this).addClass("haveshow");
            $(".m-addyoung-name .m-namelist").show();
        }
    })
    $('.m-addadult-name .rct-name').click(function(){
        if($(this).hasClass("haveshow")){
            $(this).removeClass("haveshow");
            $(".m-addadult-name .m-namelist").hide();
        }else{
            $(this).addClass("haveshow");
            $(".m-addadult-name .m-namelist").show();
        }
    })
     // 推荐名字
    $('.m-addyoung-name .u-nameList').on('click','li',function(){
        $('.m-addyoung-name input[name="engName"]').parent().find(".show-tit").hide();
        $('.m-addyoung-name input[name="engName"]').val($(this).find('a').text()).show().next().hide();
        $('.m-addyoung-name .m-namelist').hide();
        $('.m-addyoung-name .rct-name').removeClass("haveshow");
        return false;
    })
    $('.m-addadult-name .u-nameList').on('click','li',function(){
        $('.m-addadult-name input[name="engName"]').parent().find(".show-tit").hide();
        $('.m-addadult-name input[name="engName"]').val($(this).find('a').text()).show().next().hide();
        $('.m-addadult-name .m-namelist').hide();
        $('.m-addadult-name .rct-name').removeClass("haveshow");
        return false;
    })
    //tab切换
    $('.enameBox .names a').click(function(){
        var $list = $(this).closest('.enameBox');
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass('active');
        $list.find('.u-nameList').children().eq(index).show().siblings().hide();
        return false;
    })

    var url = $(".userinfo_namelist").attr('data-url');
    $(".u-showname").load(url);
    //女孩切换姓名
    $(".names .girlname").on('click',function(){
        var url=$(this).attr('data-url');
        $(".u-showname").html('');
        $(".u-loadding").show();
        $(".enameBox .refresh").attr('data-attr','2');
        $.get(url,'',function(data){
           $(".u-loadding").hide();
           $(".u-showname").html(data);
        })
    });
    //男孩切换姓名
    $(".names .boyname").on('click',function(data){
        var url=$(this).attr('data-url');
        $(".u-showname").html('');
        $(".u-loadding").show();
        $(".enameBox .refresh").attr('data-attr','1');
        $.get(url,'',function(data){
           $(".u-loadding").hide();
           $(".u-showname").html(data);
        })
    });
    //换一换刷新
    $(".enameBox .refresh").on('click',function(data){
        var type = $(this).attr('data-attr');
        $(".u-showname").html('');
        $(".u-loadding").show();
        if(type =='1'){
          var url = $(".boyname").attr('data-url');
        }else{
          var url = $(".girlname").attr('data-url');
        }
        $.get(url,'',function(data){
          $(".u-loadding").hide();
          $(".u-showname").html(data);
        })
    });

});
