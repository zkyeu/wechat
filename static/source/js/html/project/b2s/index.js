/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-12-16 16:10:30
 * @version 1.0.0
 */
define("index",["utility"],function(require,exports,module){
    // require('placeholder');
    if($(".add_teaching")[0]){
        seajs.use("add_teaching");
    }
    if($(".js_sell_pay1_t")[0]){
        seajs.use("sell_pay1_t");
    }
    
    //confirm弹层
    $.extend({
        confirm: function(option) {
            var msg = option.msg,
                type = option.type || 'alert',
                sSure = option.sureText || "确定",
                sCancel = option.cancelText || "取消",
                isReverse = option.isReverse || false,
                fnCancel = option.fnCancel || function(){},
                fnSure = option.fnSure || function(){},
                addClass = option.addClass || "";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd p:first").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert '+addClass+'" id="m-confirm" style="display:block;">' +
                        '<div class="in">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭"></a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        '<p class="f-tac">'+msg+'</p>' +
                        '</div>' +
                        '<div class="ft f-tac">' +
                        '<span class="u-btn jsCancel">' + sCancel + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn jsSure">' + sSure + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                $("body").append(sConfirm);
            }

            if(type == 'alert'){
                
                $("#m-confirm").find(".ft i").hide();
                $("#m-confirm").find(".jsCancel").hide();
            }else{
                
                var oI=$("#m-confirm").find(".ft i");
                $("#m-confirm").find(".jsCancel").show();
                oI.show();

                if(!isReverse){
                    oI.after($("#m-confirm").find(".jsSure"));
                    oI.before($("#m-confirm").find(".jsCancel"));
                }else{
                    oI.after($("#m-confirm").find(".jsCancel"));
                    oI.before($("#m-confirm").find(".jsSure"));
                }
            }
            
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel.call(this);
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        },
        jsInputOk: function (){
            $('body').on('focus','.jsInputOk',function(){
                $(this).next().next().hide();
            }).on('blur','.jsInputOk',function(){
                var val = $.trim($(this).val());
                if(val == ''){
                    $(this).next().next().show();
                }
                if($(this).hasClass("tel")){
                    if(!reRule.tel.re.test(val)){
                        $(this).next().next().show();
                    }
                }
                if($(this).hasClass("email")){
                    if(!reRule.email.re.test(val)){
                        $(this).next().next().show();
                    }
                }
                if($(this).hasClass("telemailword")){
                    if(!reRule.telemailword.re.test(val)){
                        $(this).next().next().show();
                    }
                }
            })
        },
        createInput: function(obj) {
            var str = '<div class="info-content"><div class="label"><span>' 
                + obj.label 
                + '</span></div><div class="info-txt"><input class="txt jsBlank input-text" type="text" name="'
                + obj.name
                + '" placeholder="'
                + obj.holder
                + '"/><p class="err-tips"><i class="err-icon"></i><span>'
                + obj.tip
                + '</span></p></div></div>';
            return str;
        },
        createOption: function (obj){
            var str = '';
            for (key in obj)
                str += '<option value="' + obj[key] + '">' + key + '</option>'
            return str;
        },
        createSelect: function(obj){
            var str = '<div class="info-content"><div class="label"><span>' 
                + obj.label 
                + '</span></div><div class="info-txt"><select name="'
                + obj.name
                + '" class="txt jsChange" >';

            str += $.createOption(obj.select);
            str += '</select><p class="err-tips"><i class="err-icon"></i><span>'
                +  obj.holder
                +  '</span></p></div></div>';
            return str;
        },
        createR: function(obj){
            var str = '';
            for(var prop in obj){
                str += '<strong><span class="tenIcon check-icon" data-id="'
                    + obj[prop]
                    + '"></span><span>'
                    + prop
                    + '</span></strong>';
            }
            return str;
        },
        createRadio: function(obj){
            var str = '<div class="info-content"><div class="label"><span>'
                + obj.label
                + '</span></div><div class="info-txt"><div class="sexSel">';

            str += $.createR(obj.radio);
            str += '</div><input type="hidden" name="'
                + obj.name
                + '"><p class="err-tips"><i class="err-icon"></i><span>'
                + obj.tip
                + '</span></p></div></div>';
            return str;
        }
    });
    //input框的聚焦，失焦
    $.jsInputOk();
    //关闭弹层
    $(".dialog").find(".close").click(function(){$(".dialog").hide();});
    //公用添加点击事件
    $(".add").click(function(){
        $(".dialog h4").html($(this).attr("data-title") || '创建');
        $(".dialog .submit a").html($(this).attr("data-submit") || '创建');
        var str = "";
        var dataArray =  $.parseJSON($(this).attr("data-obj")) || [];
        for (var i=0, len=dataArray.length; i<len; i++){
            var type = dataArray[i].type;
            switch(type){
                case 1:
                    str += $.createInput(dataArray[i]);
                    break;
                case 2:
                    str += $.createSelect(dataArray[i]);
                    break;
                case 3:
                    str += $.createRadio(dataArray[i]);
                    break;
            }
        }
        $(".dialog .info").html(str);
        $(".dialog").show();
    });
    //公用添加提交表单
    $(".dialog .submit").find('a').click(function(){
        var ajaxUrl = $('.add').attr('data-url');
        var data = {};
        var isOk = true;
        switch($('.add').attr('data-type')){
            case 'teacher':
                data.name = $.trim($('input[name="name"]').val());
                data.mobile = $.trim($('input[name="mobile"]').val());
                data.email = $.trim($('input[name="email"]').val());
                data.sex = $('.dialog [name="sex"]').val();
                
                /* 数据校验 */
                if(data.name == ""){
                    $('input[name="name"]').next().show();
                    isOk = false;
                }

                if(data.mobile == '' || !reRule.tel.re.test(data.mobile)){
                    $('input[name="mobile"]').next().show();
                    isOk = false;
                }

                if(data.email == '' || !reRule.email.re.test(data.email)){
                    $('input[name="email"]').next().show();
                    isOk = false;
                }
                if(data.sex === ""){
                    $('.dialog [name="sex"]').next().show();
                    isOk = false;
                }
                 
                break;
            case 'class': 
                data.grade = $.trim($('select[name="grade"]').val());
                data.index = $.trim($('select[name="index"]').val());
                data.teaching_materials = $('.dialog [name="teaching_materials"]').val();
                data.learn_schedule = $('.dialog [name="learn_schedule"]').val();
                data.teaching_schedule = $('.dialog [name="teaching_schedule"]').val();

                if(data.grade === ""){
                    $('select[name="grade"]').next().show();
                    isOk = false;
                }
                
                if(data.index == ""){
                    $('select[name="index"]').next().show();
                    isOk = false;
                }

                if($('select[name="teacher_id"]').length>0){
                    data.teacher_id = $.trim($('select[name="teacher_id"]').val());
                    if(data.teacher_id === ""){
                        $('select[name="teacher_id"]').next().show();
                        isOk = false;
                    }
                }
                if(data.teaching_materials == '' || !reRule.chinesecharacters.re.test(data.teaching_materials)){
                    $('input[name="teaching_materials"]').next().show();
                    isOk = false;
                }
                if(data.learn_schedule == '' || !reRule.chinesecharacters.re.test(data.learn_schedule)){
                    $('input[name="learn_schedule"]').next().show();
                    isOk = false;
                }
                if(data.teaching_schedule == "" || !reRule.chinesecharacters.re.test(data.teaching_schedule)){
                    $('.dialog [name="teaching_schedule"]').next().show();
                    isOk = false;
                }
                break;
            default:
                return false;
        }
        if(isOk){
            $.ajax({
                url: ajaxUrl,
                data: data,
                type: 'POST',
                dataType: 'json',
                success: function(rs){
                    $('.dialog').hide();

                    if (rs.status == 1) {
                        location.reload();
                    }else{
                        $.confirm({msg: rs.message});
                        return false;
                    }
                },
                error: function(rs){
                    $('.dialog').hide();
                    $.confirm({msg: '添加失败，请重试'});
                    return false;
                }
            });
        }   
    })
    /* 验证规则 */
    var reRule = {
        tel: {
            re: /^1[0-9]{10}$/,
            tips: "请输入正确的邮箱或手机"
        },
        email: {
            re: /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i,
            tips: "请输入正确的邮箱或手机"
        },
        telemailword:{
            re:/(^1[0-9]{10}$)|(^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$)|(^[a-zA-Z]\w+$)/i,
            tips: "请输入正确的邮箱或手机"
        },
        word:{
            re:/^[a-zA-Z]\w+$/i,
            tips: "请输入正确的邮箱或手机"
        },
        chinesecharacters:{
            re:/^.{1,20}$/,
            tips:"请输入正确的格式，长度1-20个"
        }
    };

    $("#submit").on("click",function(){
        var telEmail = $("#telEmail").val() || "";
        var passwd = $("#passwd").val() || "";
        var isOk = true;
        if (telEmail == "") {
            $("#telEmail").siblings(".hm-erro").find("b").show();
            $("#hm-email").show();
            isOk = false;
        } else if (!reRule.tel.re.test(telEmail) && !reRule.email.re.test(telEmail) && !reRule.word.re.test(telEmail)) {
            $("#telEmail").siblings(".hm-erro").find("b").html(reRule.tel.tips);
            $("#hm-email").show();
            isOk = false;
        }

        if (passwd == "") {
            $("#passwd").siblings(".hm-erro").find("b").html("密码不能为空");
            $("#hm-psd").show();
            isOk = false;
        }
        if(isOk){
            $("#regFrom").submit();
        }
    });
    /*清空input框内容*/
    $(".del-icon").on("click",function(){
        $(this).prevAll("input").attr("value","");
    });

    /* 我的班级/近期公开课/去上课 */
    $(".gos").on("click",function(){
        var position = {
            left : $(this).offset().left -65,
            top : $(this).offset().top - 135
        }
        $("#layerTip").css({
            left: position.left,
            top: position.top
        }).show();
    });

    $('#layerTip .ly-icon').click(function(){
        $('#layerTip').hide();
    })

    //公开课内部tab切换
    $('.rct-nav li').click(function(){
        var i = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('#c-rct-nav').find('.rct-contents').hide().eq(i).show();
        
    });


    //为生成的input,select绑定聚焦，失焦，change事件。
    $('body')
        .on('focus', '.jsBlank',function(){$(this).next().hide();})
        .on('blur','.jsBlank',function(){if($.trim($(this).val()) == '') $(this).next().show();});

    $('.dialog').on('change','.jsChange',function(){
        var self = $(this);
        if(self.val() != '') self.next().hide();
       
        if(self.attr('name') == 'grade'){
            $.ajax({
                type:'post',
                url:'/class/getGradeClassInfo',
                dataType: "json",
                data : {
                    grade : self.val()
                },
                success:function(data){
                    if(data.status == 0){
                        $('[name=teaching_materials]').val(data.data.teaching_materials);
                        $('[name=learn_schedule]').val(data.data.learn_schedule);
                        $('[name=teaching_schedule]').val(data.data.teaching_schedule);
                    }
                    if(data.data.teaching_materials != ''){
                        $("input[name = teaching_materials]").siblings().hide();
                    }
                    if(data.data.learn_schedule != ''){
                        $("input[name = learn_schedule]").siblings().hide();
                    }
                    if(data.data.teaching_schedule != ''){
                        $("input[name = teaching_schedule]").siblings().hide();
                    }  
                }
            });
        }
        

    });

    //找回密码页面绑定聚焦，失焦，change事件。
    $('body')
        .on('focus', '.findjsBlank',function(){$(this).siblings('.info-tip').hide();})
        .on('blur','.findjsBlank',function(){if($.trim($(this).val()) == '') $(this).siblings('.info-tip').show();});


    //个人信息提交验证
    $('#perfect_Form .infor-submit').click(function(){
        var $form = $('#perfect_Form');
        var chinaName = $.trim($form.find('.china-name').val());
        var engName = $.trim($form.find('.eng-name').val());
        var qq = $.trim($form.find('.qq').val());
        var year = $form.find('.sel-year').val();
        var month = $form.find('.sel-month').val();
        var day = $form.find('.sel-day').val();
        var sex = $form.find('.info-sex').find('.sex-radio').val();
        var regQQ = /^[1-9]{1}[0-9]{4,}$/i;
        var isFail = false;
        if(chinaName == ''){
            $form.find('.china-name').next().show();
            isFail = true;
        }
        if(engName == ''){
            $form.find('.eng-name').next().show();
            isFail = true;
        }
        if(sex == ''){
            $.confirm({msg: '请选择性别'});
            isFail = true;
        }
        if(!year || !month || !day){
            $.confirm({msg: '生日信息选择错误'});
            isFail = true;
        }
        if(qq && !regQQ.test(qq)){
            $.confirm({msg: 'qq填写错误！'});
            isFail = true;
        }

        if(isFail){
            return false;
        }else{
            $form.submit();
        }
    })

     //老师个人信息提交验证
    $('#perfect_teacher_Form .infor-submit').click(function(){
        var $form = $('#perfect_teacher_Form');
        var chinaName = $.trim($form.find('.china-name').val());
        var engName = $.trim($form.find('.eng-name').val());
        var mail = $.trim($form.find('.mail').val());
        var sex = $form.find('.info-sex').find('.sex-radio').val();
        var regMail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
        var isFail = false;
        if(chinaName == ''){
            $form.find('.china-name').next().show();
            isFail = true;
        }
        if(sex == ''){
            $.confirm({msg: '请选择性别'});
            isFail = true;
        }
        if(mail && !regMail.test(mail)){
            $.confirm({msg: '邮箱填写错误！'});
            isFail = true;
        }

        if(isFail){
            return false;
        }else{
            $form.submit();
        }
    })
    //找回密码验证
    $('#find_password_Form .infor-submit').click(function(){
        var $form = $('#find_password_Form');
        var chinaName = $.trim($form.find('.china-name').val());
        var isFail = false;
        if(chinaName == ''){
            $form.find('.china-name').siblings('.info-tip').show();
            isFail = true;
        }

        if(isFail){
            return false;
        }else{
            $form.submit();
        }
    })

    $('#modify_password_Form .infor-submit').click(function(){
        var $form = $('#modify_password_Form');
        var chinaName = $.trim($form.find('.china-name').val());
        var isFail = false;
        if(chinaName == ''){
            $form.find('.china-name').siblings('.info-tip').show();
            isFail = true;
        }

        if(isFail){
            return false;
        }else{
            $form.submit();
        }
    })

    //学生注册信息验证
    $('#registForm .submit').click(function(){
        var $form = $('#registForm ');
        var email = $.trim($form.find('.email').val());
        var tel = $.trim($form.find('.tel').val());
        var myCode = $.trim($form.find('.myCode').val());
        var pwd = $.trim($form.find('.pwd').val());
        var inviteCode = $.trim($form.find('.inviteCode').val());

        var isOk = true;

        if(email == '' || !reRule.email.re.test(email)){
            $form.find('.email').next().next().show();
            isOk = false;
        }

        if(tel == '' || !reRule.tel.re.test(tel)){
            $form.find('.tel').next().next().show();
            isOk = false;
        }
        
        if(myCode == ''){
            $form.find('.myCode').parent().next().next().show();
            isOk = false;
        }
        if(pwd == ''){
            $form.find('.pwd').next().next().show();
            isOk = false;
        }
        if(inviteCode == ''){
            $form.find('.inviteCode').next().next().show();
            isOk = false;
        }

        if(isOk){
           $('#registForm').submit();
        }

    })

    $('#registForm .myCode').focus(function(){
        $(this).parent().next().next().hide();
    }).blur(function(){
        var val = $.trim($(this).val());
        if(val == ''){
            $(this).parent().next().next().show();
        }
    })

    //老师注册信息验证
    $('#regist_teacher_Form .submit').click(function(){
        var $form = $('#regist_teacher_Form');
        var school_name = $.trim($form.find('.school_name2').val());
        var tel = $.trim($form.find('.tel').val());
        var myCode = $.trim($form.find('.myCode').val());
        var pwd = $.trim($form.find('.pwd').val());
        //var inviteCode = $.trim($form.find('.inviteCode').val());

        var isOk = true;

        if(school_name == ''){
            $form.find('.school_name2').next().next().show();
            isOk = false;
        }

        if(tel == '' || !reRule.tel.re.test(tel)){
            $form.find('.tel').next().next().show();
            isOk = false;
        }
        
        if(myCode == ''){
            $form.find('.myCode').parent().next().next().show();
            isOk = false;
        }
        if(pwd == ''){
            $form.find('.pwd').next().next().show();
            isOk = false;
        }
        if(isOk){
           $('#regist_teacher_Form').submit();
        }

    })

    $('#regist_teacher_Form .myCode').focus(function(){
        $(this).parent().next().next().hide();
    }).blur(function(){
        var val = $.trim($(this).val());
        if(val == ''){
            $(this).parent().next().next().show();
        }
    })


    //apply 
    $('#applyForm .school-logo').change(function(){
        var val = $(this).val();
        if(val == ''){
            $('#applyForm .sug-img').text('图片不能为空').css('color','red');
        }else{
            $('#applyForm .sug-img').text(val).css('color','#000');
        }
    })
    //apply验证
    $('#applyForm .md').click(function(){
        var $form = $('#applyForm');
        var schoolName = $.trim($form.find('.school-name').val());
        var logo = $form.find('.school-logo').val();
        var address = $.trim($form.find('.address').val());
        var relatives = $.trim($form.find('.relatives').val());
        var sex = $form.find('.info-sex').find('.sex-radio').val();
        var callNum = $.trim($form.find('.call-num').val());
        var tel = $.trim($form.find('.tel').val());
        var code = $.trim($form.find('.code').val());
        var email = $.trim($form.find('.email').val());
        
        var isFail = false;
        if(schoolName == ''){
            $.confirm({msg: '请填写学校名称'});
            isFail = true;
        }
        if(logo == ''){
            $.confirm({msg: '请上传学校logo'});
            isFail = true;
        }
        if(address == ''){
            $.confirm({msg: '请填写详细地址'});
            isFail = true;
        }
        if(relatives == ''){
            $.confirm({msg: '请填写联系人'});
            isFail = true;
        }
        if(sex == ''){
            $form.find('.info-sex').parent().next().show();
            isFail = true;
        }
        if(callNum == ''){
            $.confirm({msg: '请填写座机号'});
            isFail = true;
        }

        if(tel == '' || !reRule.tel.re.test(tel)){
            $form.find('.tel').parent().next().next().show();
            isFail = true;
        }

        if(code == ''){
            $form.find('.code').parent().next().show();
            isFail = true;
        }

        if(email == '' || !reRule.email.re.test(email)){
            $form.find('.email').parent().next().show();
            isFail = true;
        }

        if(!isFail){
            $form.submit();
        }
    })
    //获取验证码
    $('.sendCode').click(function(){
        var $self = $(this);
        if($self.hasClass("isajax")) return;
        if($(this).text() == '获取验证码'){
            var reg = /^1[0-9]{10}$/;
            var mobile = $.trim($('.tel').val());
            var isApply = ($(this).closest("#applyForm").length>0)? true : false;
            var isTeacher = ($(this).closest("#regist_teacher_Form").length>0)? true : false;
            var isFindPassword = ($(this).closest("#find_password_Form").length>0)? true : false;
            var ismModifyPassword = ($(this).closest("#modify_password_Form").length>0)? true : false;
            var sms_type = 1;
            if(isApply){
                sms_type = 2;
            }
            if(isTeacher){
                sms_type = 3;
            }
            if(isFindPassword){
                 sms_type = 5;
                var error = $('.find-error');
            }
            if(ismModifyPassword){
                 mobile = $.trim($('.modify-mobile-text').text());
                 sms_type = 5;
            }
            if(mobile == '' || !reg.test(mobile)){
                switch(sms_type){
                    case 1:
                    case 3:
                        $('.tel').next().next().show();
                        break;
                    case 2:
                        $('#applyForm .tel').parent().next().next().show();
                        break;
                    case 5:
                        error.show();
                }

            }else{
                $.ajax({
                    beforeSend:function(){
                        $self.addClass("isajax");
                    },
                    url: '/ajax/sendMobileCode',
                    data: {mobile:mobile,sms_type: sms_type},
                    dataType: 'json',
                    type: 'post',
                    success: function(rs){
                        getSms(rs);
                    },
                    error: function(){
                        $.confirm({msg: '获取验证码失败'})
                    },
                    complete:function(){
                        $self.removeClass("isajax");
                    }
                })
            }
        }
    })
    
    $('.getCode').on('click',function(){
        var $self = $(this),
            sms_type = 4,
            mobile = $('.info-phone span').text();
        if($self.hasClass("isajax")) return;
        $.ajax({
            beforeSend:function(){
                $self.addClass("isajax");
            },
            url: '/ajax/sendMobileCode',
            data: {mobile:mobile,sms_type: sms_type},
            dataType: 'json',
            type: 'get',
            success: function(rs){
                if(rs.status == 1){
                    getPhoneSms(rs);
                }else{
                    $('.m-info-tip').removeClass('hide').addClass('show');
                    $('.m-info-tip').html('<span></span>'+ rs.info);
                }
            }
        })
    });
    $('#mSureBtn').on('click',function(){
        if($('.dentifying-code').val() == ''){
            $('.m-info-tip').removeClass('hide').addClass('show');
            $('.m-info-tip').html('<span></span>验证码不能为空！');
        }else{
            $.ajax({
                url:'/teacher/mobileVerifyCode',
                type:'post',
                data:{code:$('.dentifying-code').val()},
                dataType: 'json',
                success:function(data){
                    if(data.status == 0){
                        window.location.href = '/teacher/info';
                    }else if(data.status == 1){
                        $('.m-info-tip').removeClass('hide').addClass('show');
                        $('.m-info-tip').html('<span></span>'+data.info);
                    }
                }
            });
        } 

    });
    $('.dentifying-code').on('focus',function(){
        $('.m-info-tip').removeClass('show').addClass('hide');
    });

    $('#nextBtn').on('click',function(){
        if($('#newPhone').val() == ''){
            $('.m-info-tip').removeClass('hide').addClass('show');
            $('.m-info-tip').html('<span></span>手机号不能为空！');
        }else{
            $.ajax({
                url:'/teacher/checkMobile',
                type:"post",
                data:{'mobile':$('#newPhone').val()},
                dataType:'json',
                success:function(data){
                    if(data.status == 0){
                        window.location.href = '/teacher/editMobile';
                    }else{
                        $('.m-info-tip').removeClass('hide').addClass('show');
                        $('.m-info-tip').html('<span></span>'+data.info);
                    }
                }
            });
        }
    });
    function getPhoneSms(rs){
        if(rs.status == 1){
            var str = '剩余';
            var num = 59;
            var $code = $('.getCode');
            $code.addClass('get-code-d');
            $code.text(str+'59s');
            var timer = setInterval(function(){
                num--;
                if(num<1){
                    clearInterval(timer);
                    $code.text('获取验证码');
                    $code.removeClass('isajax').removeClass('get-code-d');
                }else{
                    $code.text(str+num+'s');
                }
            },1000);
        }else{
            $.confirm({msg: rs.info});
        }
    }

   /* //上传图片
    $('#applyForm .school-logo').change(function(){
        var pic = $.trim($(this).val());
        if(pic != ''){
            $.ajax({
                url: '/ajax/uploadLogo',
                type: 'post',
                data: {logo: pic},
                success: function(rs){
                    if(rs.status == 1){
                        $('#applyForm').find('.logoVal').val(rs.data.logo);
                    }else{
                        alert(rs.info);
                    }
                }
            })
        }
    })*/

    function getSms(rs){
        if(rs.status == 1){
            var str = '秒重新获取';
            var num = 59;
            var $code = $('.sendCode');
            $code.text('59'+str);
            var timer = setInterval(function(){
                num--;
                if(num<1){
                    clearInterval(timer);
                    $code.text('获取验证码');
                }else{
                    $code.text(num+str);
                }
            },1000);
        }else{
            $.confirm({msg: rs.info});
        }
    }

    $('#applyForm .email, #applyForm .code').focus(function(){
        $(this).parent().next().hide();
    }).blur(function(){
        var val = $.trim($(this).val());
        if($(this).hasClass("email")){
            if(val == '' || !reRule.email.re.test(val)){
               $(this).parent().next().show();
            }
        }else{
            if(val == ''){
                $(this).parent().next().show();
            }
        }
        
        
    })
    $('#applyForm .tel').focus(function(){
        $(this).parent().next().next().hide();
    }).blur(function(){
        var val = $.trim($(this).val());
        if(val == '' || !reRule.tel.re.test(val)){
            $(this).parent().next().next().show();
        }
    })
    $(".info-sex .check-icon").on("click",function(){
        var sexVal = $(this).attr('data-id');
        $(".check-icon").removeClass("check-on");
        $(this).addClass("check-on");
        $(".info-sex").find('.sex-radio').val(sexVal);
        var isUl = $(this).parent().parent().hasClass("group-ul");
        if(isUl){
            $('#applyForm .group-ul').parent().next().hide();
        }
    })

    $('.dialog .info').on('click','.check-icon',function(){
        var id = $(this).attr('data-id');
        $('.sexSel').find(".check-icon").removeClass("check-on");
        $(this).addClass("check-on");
        $('.dialog').find('[name=sex]').val(id).next().hide();
    })

    //公开课初始化页面时tab展示。
    function decodeUrl(){
        var url = location.href;
        var index = url.lastIndexOf('&');
        var str = url.substring(index+1);
        var arr = str.split('=');
        var iNow = 0;
        if(arr[0] == 'open_tab_type'){
            switch(arr[1]){
                case 'info':
                    iNow = 0;
                    break;
                case 'recent':
                    iNow = 1;
                    break;
                case 'expire':
                    iNow = 2;
                    break;
            }
            $('#c-rct-nav').find('.rct-nav').find('li').removeClass("on").eq(iNow).addClass("on");
            $('#c-rct-nav').find('.rct-contents').hide().eq(iNow).show();
        }
    }

    if($('#c-rct-nav').length>0){
        decodeUrl();
    }

    //选择学校select
    $('#m-school').find('.list').on('click','li',function(){
        var $title = $(this).parent().prev().prev();
        var myId = $title.attr('data-id');
        var id = $(this).attr('data-id');

        var index = $('#m-school').find('.list').index($(this).parent());
        var url = '';
        var data = {};
        $(this).parent().prev().removeClass("open");
        if(myId == id){
            return;
        }
        
        $('#m-school .labels').find('span').removeClass("active").eq(0).addClass("active");
        $('#m-school .submit').removeClass("active").removeAttr("data-id");
        $(this).parent().hide();
        $title.text($(this).text()).attr('data-id',id);
        $('#m-school').find('.m-school-list').html('');

        var url = '/ajax/selectCityByProv/';
        switch(index){
            case 0:
                data['province_id'] = id;
                $('#m-school').find('.list').eq(1).html('').hide().prev().prev().text('市').removeAttr("data-id");
                $('#m-school').find('.list').eq(2).html('').hide().prev().prev().text('区').removeAttr("data-id");
                break;
            case 1:
                data['city_id'] = id;
                $('#m-school').find('.list').eq(2).html('').hide().prev().prev().text('区').removeAttr("data-id");
                url = '/ajax/selectDistrictByCity/';
                break;
            case 2:
                data['district_id'] = id;
                url = '/ajax/selectSchool/';
                break;        
        }
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: function(rs){
                if(rs.status == 1){
                   var str = createItem(rs);
                   switch(index){
                       case 0:
                       case 1:
                           $('#m-school').find('.list').eq(index+1).html(str);
                           break;
                       case 2:
                            if(rs.data.length>16){
                                $('#m-school').find('.m-school-list').addClass("m-school-list2").html(str);
                            }else{
                                $('#m-school').find('.m-school-list').removeClass("m-school-list2").html(str);
                            }
                           break;
                   } 
                } 
            }
        })
    })

    function createItem(rs){
        var str = '';
        var data = rs.data;
        for(var i=0,len=data.length; i<len; i++){
            str += '<li data-id="'+ data[i].id +'">'+data[i].name+'</li>';
        }
        return str;
    }

    $('#m-school').find('h4').click(function(){
        $('#m-school .sel').find('.list').hide();
        $(this).next().addClass("open");
        $(this).next().next().show();
        return false;
    })

    $('#m-school').find('.m-school-list').on('click','li',function(){
        $(this).addClass("active").siblings().removeClass("active");
        $('#m-school .submit').addClass("active")
            .attr('data-id',$(this).attr('data-id'))
            .attr('data-name',$(this).text())
    })

    $('#m-school .labels').find('span').click(function(){
        var index = $(this).index();
        var url = '';
        var data = {};
        var district_id = $('#m-school').find('h4').eq(2).attr('data-id');
        var leftArr = [0,10,15,15,15,10,19,15,15,19,10];

        if($(this).hasClass("active")){
            return;
        }

        if(district_id === undefined){
            return;
        }

        $(this).addClass("active")
            .css('backgroundPosition',leftArr[index]+'px 35px')
            .siblings()
            .removeClass("active");
        $('#m-school .submit').removeClass("active").removeAttr("data-id");

        data['district_id'] = district_id;
        
        if(index != 1){
            var letters = $(this).text().replace(/\s/g, ',');
            data.firstletter = letters;
            url = '/ajax/selectSchoolByFirstletter/';
        }else{
            url = '/ajax/selectSchool/';
        }

        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: function(rs){
                if(rs.status == 1){
                    var str = createItem(rs);
                    if(rs.data.length>16){
                        $('#m-school').find('.m-school-list').addClass("m-school-list2").html(str);
                    }else{
                        $('#m-school').find('.m-school-list').removeClass("m-school-list2").html(str);
                    }  
                }
            }
        })   
    })

    $(document).click(function(){
        $('#m-school').find('.list').hide();
    })

    $('#m-school .close').click(function(){
        $('#m-school').hide();
    })

    $('#m-school .submit').click(function(){
        var id = $(this).attr("data-id");
        var schoolName = $(this).attr("data-name");
        var hasActive = $(this).hasClass("active");
        if(id !== undefined && hasActive){
            $('#m-school').hide();
            $('#regist_teacher_Form .school_name').text(schoolName);
            $('#regist_teacher_Form .school_name2').val(id).next().next().hide();
        }
    })

    $('#regist_teacher_Form .hm-login').children().first().click(function(){
        $('#m-school').show();
    })
    /*兼容placeholder*/
    function isPlaceholder(){  
      var input = document.createElement('input');  
      return 'placeholder' in input;  
    }
    (function($){
      if(!isPlaceholder()){
        $("li input").each(//把input绑定事件 排除password框  
          function(){  
            if($(this).val()=="" && $(this).attr("placeholder")!=""){  
              $(this).val($(this).attr("placeholder"));     
              $(this).focus(function(){  
                if($(this).val()==$(this).attr("placeholder")) $(this).val("");  
              });  
              $(this).blur(function(){  
                if($(this).val()=="") $(this).val($(this).attr("placeholder"));  
              });  
            }  
        });  
      }  
    })(jQuery);

    //学生信息编辑交互
    (function($){
        var SelectBoxFn = function(){
            this.selectBox = $('.select-box');
            this.selectMenu = $('.select-menu');
            
            this.modifyYear = $('#modifyYear');
            this.modifyMonth = $('#modifyMonth');
            this.modifyDay = $('#modifyDay');

            this.modifyYearVal = $('#modifyYearVal');
            this.modifyMonthVal = $('#modifyMonthVal');
            this.modifyDayVal = $('#modifyDayVal');

            this.womanSex = $('#womanSex');
            this.menSex = $('#menSex');

            this.modifyInfoBox = $('#modifyInfoBox');
            this.infoBox = $('#infoBox');

            this.modifyBtnId = $('#modifyBtnId');
            this.modifyCancelBtn = $('.modify-cancel');

            this.selectMenuUl = $('.select-menu-ul');

            this.modyfySure = $('#modyfySure');            

            

            //隐藏域
            this.dateBrith = $('#dateBrith').val();
            this.selectBoxValue = $('#selectBoxValue').val();
            
            this._event();
            this.dateBrithFn();
            this.sexFn();

        };
        SelectBoxFn.prototype = {

            _event:function(){
                var that = this;
                
                this.selectBox.on('click',function(){
                    if(!$(this).find('.sex-selected').hasClass('select-current')){
                        $(this).parent().find('.sex-selected').removeClass('select-current');
                        $(this).find('.sex-selected').addClass('select-current');
                    }
                    $('#selectBoxValue').val($(this).attr('data-id'));
                });
                this.selectMenu.on('click',function(){
                    $(this).parent().find('ul').hide();
                    $(this).find('ul').show();
                    return false;
                });
                $('body').on('click',function(){
                    $('.select-menu').find('ul').hide();
                });

                this.modifyBtnId.on('click',function(){
                    that.infoBox.hide();
                    that.modifyInfoBox.show();
                });

                this.modifyCancelBtn.on('click',function(){
                    that.infoBox.show();
                    that.modifyInfoBox.hide();
                });



                
            },
            dateBrithFn:function(){
                var that = this;
                var dateBrith = [];
                if(this.dateBrith == undefined || this.dateBrith == null || this.dateBrith == ''){
                    this.modifyYear.text('----');
                    this.modifyMonth.text('--');
                    this.modifyDay.text('--');
                }else{
                    dateBrith = this.dateBrith.split(',');
                    this.modifyYear.text(dateBrith[0]);
                    this.modifyMonth.text(dateBrith[1]);
                    this.modifyDay.text(dateBrith[2]);
                }
                this.selectMenuUl.delegate('li', 'click',function(){
                    $(this).parent().parent().find('span').text($(this).text());
                    if($(this).parent().parent().find('span').attr('id') == 'modifyYear'){
                        that.modifyYearVal.val(that.modifyYear.text()); 
                    }else if($(this).parent().parent().find('span').attr('id') == 'modifyMonth'){
                        that.modifyMonthVal.val(that.modifyMonth.text()); 
                    }else if($(this).parent().parent().find('span').attr('id') == 'modifyDay'){
                        that.modifyDayVal.val(that.modifyDay.text()); 
                    }
                    $(this).closest('.select-menu-ul').hide();
                    return false;
                });

                var myDate = new Date();
                var nowYear = myDate.getFullYear(); 
                //年
                for(var i = nowYear; i>= 1995; i--){
                    $('.select-menu .select-menu-ul').eq(0).append('<li>'
                        + i +'</li>');
                }
                //月
                for(var i = 1; i<= 12; i++){
                    $('.select-menu .select-menu-ul').eq(1).append('<li>'
                        + i +'</li>');
                }
                //日
                for(var i = 1; i<= 31; i++){
                    $('.select-menu .select-menu-ul').eq(2).append('<li>'
                        + i +'</li>');
                }

                
            },
            sexFn:function(){
               
                if(this.selectBoxValue == this.womanSex.attr('data-id')){
                    this.womanSex.parent().find('.sex-selected').removeClass('select-current');
                    this.womanSex.find('.sex-selected').addClass('select-current');
                }else if(this.selectBoxValue == this.menSex.attr('data-id')){
                    this.menSex.parent().find('.sex-selected').removeClass('select-current');
                    this.menSex.find('.sex-selected').addClass('select-current');
                }
            }

        };
        new SelectBoxFn();
    })(jQuery);

    //学生信息tab切换
    ;(function(){
        var $tab_ban= $(".tab_ban");
        var $change_info = $(".change_info");
        $tab_ban.on("click","p",function(){
            var index = $(this).index();
            $(this).addClass("act_p").siblings().removeClass("act_p");
            $change_info.eq(index).show().siblings().hide();
        })
    })();

    //a链接跳转
   ;(function(){
        var href = location.href;
        var index = href.indexOf('?');
        var str = href.substring(index+1);
        if(str == "from=order"){
            $my_info_pay.show();
            $infoBox.hide();
            $modifyInfoBox.hide();
            $order_p.addClass("act_p");
            $mes_P.removeClass("act_p");
        }
   })()
    
    ;(function(){
        var dlLink = $("[name=dlLink]").val();
        dlLink = !!dlLink ? dlLink : "http://ac.51talk.com/ac/b2s/51Talk-AC.exe",
        // 去上课事件
        goStudy = function(){
            $.confirm({
                msg:'该课程是通过AC客户端上课，请<a href="'+ dlLink +'" >点击下载</a>安装。如已经安装，请启动AC客户端直接上课。',
                addClass:"cls-dialog"
            })
        },
        // 旁听按钮点击事件
        goAudit = function(){
            $.confirm({
                msg:'旁听只能听讲，不能举手发言喔。要想和外教老师互动，就快来购买外教辅导课吧！',
                addClass:"cls-dialog",
                type:"confirm",
                sureText:"查看详情",
                cancelText:"去AC旁听",
                fnSure:function(){
                    window.open("/pay/info");
                }
            })            
        }


        // 免费体验点击事件
        $(".cls-list .stu-taste").on("click",".go-cls",goStudy);
        $(".cls-list .is-buy").on("click",".go-cls",goStudy);
        // $(".go-class-box .go-class").on("click","s-yellow ",goStudy);
        // 列表页
        // $(".cls-list .go-buy").on("click",".go-cls",goAudit); 
        $(".cls-list .go-buy").on("click",".go-cls",goStudy);
        // 详情页
        $(".sed-text").on("click",".free:not('.wait')",goStudy);
        $(".sed-text").on("click",".pangting",goAudit);
        $(".sed-text").on("click",".go_s",goStudy);
        $(".s-yellow").click(function(){
            goStudy();
        })
        // tag显示
        $(".buy-tag em").hover(function() {
            $(this).find(".tag-i").toggle();
        }, function() {
            $(this).find(".tag-i").toggle();
        });
    })();

    //未购买用户下载教材时弹框
    ;(function(){
        goLoad = function(){
           $.confirm({
                msg:'您没有购买精品外教辅导课，不可以下载教材哦',
                addClass:"cls-dialog",
                type:"confirm",
                sureText:"查看详情",
                cancelText:"取消",
                fnSure:function(){
                    window.open("/pay/info");
                }
            })        
        }
        //判断详情页的状态
        ifGoload = function(){
            var $load_val = $(".det").find("a").attr("href"); 
            if($load_val == "javascript:;"){
               $.confirm({
                    msg:'您没有购买精品外教辅导课，不可以下载教材哦',
                    addClass:"cls-dialog",
                    type:"confirm",
                    sureText:"查看详情",
                    cancelText:"取消",
                    fnSure:function(){
                        window.open("/pay/info");
                    }
                })      
            }
        }
        $(".cls-list .go-buy").on("click",".load",goLoad); 
        //详情页
        $(".load").click(function(){
            goLoad();
        });
        
        $(".sed-text-dd").on("click",".load",ifGoload);
    })();

    (function(){
        var windowFn = function(){
            this.maskId = $('#maskId'),
            this.popUpId = $('#popUpId'),
            this.closeId = $('#closeId'),
            this.gTitText = $('.g-tit-text'),
            this.classInfo = $('#classInfo'),
            this.workBtn = $('#workBtn'),
            this.btnBox = $('#btnBox'),
            this.workDetail = $('#workDetail'),
            this.workSureBtn = $('#workSureBtn');
            this.gradeItem = $('.grade-item');
            this.flag = 1;
            this._event();
        };
        windowFn.prototype = {
            _event:function(){
                var that = this,
                    heightValue = $(document).height();
                this.maskId.height(heightValue+'px');

                this.closeId.on('click',function(){
                    that.closeFn();
                });

                this.workSureBtn.on('click',function(){
                    that.closeFn();
                });

                this.gTitText.on('click',function(){
                    if($(this).attr('data-work') == 0){
                        that.btnBox.html('<a id="workBtn">布置作业</a>');
                        that.detailUrl = $(this).attr('detail-url');
                        that.workDetail.attr('href',that.detailUrl);
                        that.workBtn = $('#workBtn');
                        that.classInfo.text($(this).attr('data-value'));
                        that.flag = Number($(this).attr('data-flag'));
                        that.showFn();
                    } 
                });

                
            },
            showFn:function(){
                var that = this;
                this.popUpId.show();
                this.maskId.show();
                this.workBtn.on('click',function(){
                    that.classId = that.gradeItem.eq(that.flag).attr('class-id');
                    $.post(
                    '/teacher/homework',
                        {class_ids:that.classId},
                        function(data){
                            var data = jQuery.parseJSON(data);
                            if(data.status == 0){
                                that.workBtn.css('background-color','#c8c8c8');
                                that.workBtn.text('已布置');
                                that.gradeItem.eq(that.flag).find('.g-tit-text').text('已布置').attr('data-work','1').css('background-color','#c8c8c8');

                            }else{
                               $.confirm({msg: data.info});
                            }
                        }
                    );
                    
                });
            },
            closeFn:function(){
                this.popUpId.hide();
                this.maskId.hide();
            }
        };
        new windowFn();
        
    })();

    //添加演示视频功能
    // ;(function(){
    //     $("[data-vedioSrc]").on("click",function(){
    //         var oBtn=$(this);
    //         var src=oBtn.attr("data-vedioSrc");
    //         var width=oBtn.attr("data-width") || 800;
    //         var height=oBtn.attr("data-height") || 450;
    //         //视频来源地址
    //         var source=oBtn.attr("data-source") || "";
    //         if(!src)return;
    //         if($("#ckplayerDialog").length==0){
    //             $("body").append(
    //                 '<div id="ckplayerDialog">'+
    //                     '<a class="b2s_close" href="javascript:;"></a>'+
    //                     '<a class="source"></a>'+
    //                     '<div id="playerContent"></div>'+
    //                 '</div>'+
    //                 '<div id="j-mask"></div>'
    //             );
    //             $("#ckplayerDialog").find('.b2s_close').add('#j-mask').on("click",function(){
    //                 $("#ckplayerDialog").hide();
    //                 $("#j-mask").fadeOut();
    //                 //继续轮播图
    //                 // begin();
    //             });
    //         }
    //         CKobject.embed(
    //             'http://static.51talk.com/static/js/html/lib/ckplayer/ckplayer.swf',
    //             'playerContent',
    //             'ckplayer_playerContent',
    //             width,
    //             height,
    //             false,
    //             {f: src, c: 0, b: 1, p: 1},
    //             [src],
    //             {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
    //         );
    //         $("#ckplayerDialog").css({
    //             "display":"block",
    //             "width":width,
    //             "height":height
    //         }).find(".source").html(source);
    //         $("#j-mask").height($(document).height()).show();
    //         //暂停轮播图
    //         // clearInterval(timer);
    //     });
    // })();


    //获取本机时间
    var myDate  = new Date(),
        myYear  = myDate.getFullYear(),
        myMonth = myDate.getMonth(),
        myDay   = myDate.getDate(),
        myH     = myDate.getHours(),
        myM     = myDate.getMinutes();
    var $time_year = $(".time_year");
    var $time_mon = $(".time_mon");
    var $time_over = $(".time_over");
    var h,Mo,d,m,over_h,over_m;
    if(myM > 30){
        over_m = myM - 30;
        if(over_m <10){
          over_m =  "0"+over_m;  
        }
        over_h = myH + 1;
    }else{
        over_m = myM + 30;
        over_h = myH;
    }

    if(myMonth<10){
        Mo = "0" + (myMonth+1);
    }else{
        Mo = myMonth+1;
    }
    if(myDay<10){
        d = "0" + myDay;
    }else{
        d =myDay;
    }
    if(myH<10){
        h = "0" + myH;
    }else{
        h = myH;
    }
    if(myM<10){
        m = "0" + myM;
    }else{
        m = myM
    }

    $time_year.html(myYear+'/'+Mo+'/'+d);
    $time_mon.html( h+':'+m);
    $time_over.html(over_h + ":" + over_m);
  
    ;(function(){
        seajs.use("utility",function(utility){
            var cookieFn = utility.cookieFn;
            if(!!cookieFn.get("popflag")) return;
            var
            pop = $(".btm_float,.btm_float_show");
            pop.on("click",".close_ly",function(){
                pop.hide();
                if($(this).attr('data-isStudent') == 0){
                    cookieFn.set("popflag","1",1);
                }
            }).show();
        });
    })();
    ;(function(){
        $(".v_toUse").mousedown(function(){
            $(this).css({"color":"#012345","border":"1px solid #012345"});
        });
         $(".v_toUse").mouseover(function(){
            $(this).css({"color":"#3397da","border":"1px solid #3397da"});
        });
          $(".v_toUse").mouseout(function(){
            $(this).css({"color":"#012345","border":"1px solid #012345"});
        });
    })();


    //选择教材
    $(".book_text").on("mouseover",function(){
        var that = $(this);
        that.siblings("p").show();
    });
     $(".book_text").on("mouseout",function(){
        var that = $(this);
        that.siblings("p").hide();
    });
     $('.delete-btn').on('click',function(){
            var dHref = $(this).attr('deleteHref');
            $.confirm({msg: '确认删除该班级？',
                type:"confirm",
                sureText:"确定",
                cancelText:"取消",
                fnSure:function(){
                    window.location.href = dHref;
                }
            });
        });
     (function(){
        if($('.central').size()>0){
            $('.central').addClass('central-bg');
        }
     })();

//1V1是否选课，冒泡弹层

    function SetCookie(name, value) {  
        var exp = new Date();  
        exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000); //3天过期  
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString()+";path=/";  
        return true;  
    }; 
    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
    }
    var fxClose = $(".fx-close"),
        usaClose = $(".usa-close");

    function isClose(dom,obj){
        if(!getCookie(obj)){
            dom.show();
        }

        dom.on("click","i",function(e){
            SetCookie(obj,"close");
            dom.fadeOut();
            e.stopPropagation();
        })
    }

    isClose(fxClose,"fxclose");
    isClose(usaClose,"usaclose");

     // 达拉斯选课弹窗
     seajs.use("classProcessChoose");
});



// if($(".cls-top").attr("data-vedio")){
//       $(".cls-top .video_play").attr({
//         "data-vedioSrc":$(".cls-top").attr("data-vedio"),
//         "data-width":$(".cls-top").attr("data-width"),
//         "data-height":$(".cls-top").attr("data-height"),
//         //视频来源地址
//         "data-source":$(".cls-top").attr("data-source")
//       }).show();
//     }else{
//       $(".cls-top .video_play").hide();
//     }
//     $("[data-vedioSrc]").on("click",function(){
//         var oBtn=$(this);
//         var src=oBtn.attr("data-vedioSrc");
//         var width=oBtn.attr("data-width") || 800;
//         var height=oBtn.attr("data-height") || 450;
//         //视频来源地址
//         var source=oBtn.attr("data-source") || "";
//         $("#j-mask").show();
//         if(!src)return;
//         if($("#ckplayerDialog").length==0){
//             $("body").append(
//                   '<div id="ckplayerDialog">'+
//                         '<a class="close" href="javascript:;"></a>'+
//                         '<a class="source"></a>'+
//                         '<div id="playerContent"></div>'+
//                       '</div>'+
//                   '<div id="j-mask"></div>'
//             );
//             $("#ckplayerDialog").find('.close').add('#j-mask').on("click",function(){
//               $("#ckplayerDialog").hide();
//               $("#j-mask").hide();
//             });
//           }
//           CKobject.embed(
//               'http://static.51talk.com/static/js/html/lib/ckplayer/ckplayer.swf',
//               'playerContent',
//               'ckplayer_playerContent',
//               width,
//               height,
//               false,
//               {f: src, c: 0, b: 1, p: 1},
//               [src],
//               {bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'}
//           );
//           $("#ckplayerDialog").css({
//             "display":"block",
//             "width":width,
//             "height":height,
//           }).find(".source").html(source); 
//           return false;
//       });