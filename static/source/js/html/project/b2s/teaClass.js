define("teaClass",[""],function(require,exports,module){
    // require('placeholder');
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
    var dlLink = $("[name=dlLink]").val();
        dlLink = !!dlLink ? dlLink : "http://ac.51talk.com/ac/b2s/51Talk-AC.exe",
        goStudy = function(){
            $.confirm({
                msg:'该课程是通过AC客户端上课，请<a href="'+ dlLink +'" >点击下载</a>安装。如已经安装，请启动AC客户端直接上课。',
                addClass:"cls-dialog"
            })
        };
    $(".cls-list .stu-taste").on("click",".go-cls",goStudy);
    


    var teaClass = function(){
        this.classTab = $('#classTab');
        this.curClass = $('.cur-class');
        this.tClose = $('.t-close');
        this.maskId = $('#maskId');
        this.popUpId = $('#popUpId');
        this.show_class = $('.show_class');
        this.class_table = $('.class-table');
        this.class_tbody = this.class_table.find("tbody");
        this._event();
        this.showCon();
        
    };
    teaClass.prototype = {
        _event:function(){
            var that = this;
            
            // this.classTab.find('a').on('hover',function(){
            //     if(!$(this).hasClass('cur-color')){
            //         that.spanW = $(this).index()*64;
            //         that.classTab.find('a').removeClass('cur-color');
            //        // that.curClass.css({left:that.spanW});
            //         $(this).addClass('cur-color').siblings().removeClass("cur-color");  
            //     }
            // });

            this.tClose.on('click',function(){
                that.popUpId.hide();
                that.maskId.hide();
            });
        },
        showCon:function(){
            var that = this;
            this.show_class.on("click",function(){
                var self = $(this);
                var showurl = self.attr("showurl");
                //console.log(showurl);
                var toContent = that.class_table.find("tbody");

                $.ajax({
                    url : showurl,
                    type : "get",
                    dataType : "json",
                    cache : false,
                    success : function(r){
                        //console.log(r);
                        if(r.status == 1){
                            //console.log(r.data);
                            that.class_tbody.html(that.returnTable(r.data));
                            that.popUpId.show();
                            that.maskId.show();
                        }else{
                            
                        }
                    },
                    error : function(){
                        //locationTips(false);
                    }
                });

                $.ajax({
                    url : showurl,
                    type : "get",
                    dataType : "json",
                    cache : false,
                    success : function(r){
                        //console.log(r);
                        if(r.status == 1){
                            //console.log(r.data);
                            that.class_tbody.html(that.returnTable(r.data));
                            that.popUpId.show();
                            that.maskId.show();
                        }
                    },
                    error : function(){
                        //locationTips(false);
                    }
                });

            })
        },
        returnTable : function(data){
            var html = [];
            // html.push('<table class="class-table">');
            for(var x in data){
                var _data = data[x];
                html.push(this.returnTr(x,_data));
            }
            // html.push('</table>');
            return html.join("");
        },
        returnTr : function(key,value){
            var html = [],
                allCount = value.count,
                data = value.data;

            for(var i=0;i<allCount;i++){
                html.push('<tr>');

                // 1
                if(i==0){
                    html.push('<td rowspan="'+ allCount +'">'+ key +'</td>');
                }

                // 2
                ;(function(){
                    var init = 0;
                    for(var x in data){
                        var _data = data[x],
                            _count = _data.count,
                            __data = _data.data;
                        for(var c=0;c<__data.length;c++){
                            init++;
                            // 2
                            if(c==0 && (i+1 == init)){
                                html.push('<td rowspan="'+ _count +'">'+ x +'</td>');
                            }
                            // 3
                            if(i+1 == init){
                                html.push('<td>'+ __data[c] +'</td>');
                            }
                        }
                    }                   
                })();

                html.push('</tr>');
            }
            return html.join("");
        }
    };
    new teaClass();

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
                    success: function(rs){console.log(rs);
                        $('.dialog').hide();

                        if (rs.status == 1) {
                           // location.reload();
                            window.location.href="/class/lists";
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
});