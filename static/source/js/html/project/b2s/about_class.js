define(function(require,exports,module){
    var aboutClassFn = function(){
        this.selectDate = $('#selectDate');
        this.checkTime = $('#checkTime');
        this.submitBtn = $('#submitBtn');
        this._event();
        //数据缓存
        this.cacheDate={};
    };
    aboutClassFn.prototype = {
        _event:function(){
            var that = this;
            //选择测评日期
            this.selectDate.find('li').on('click',function(){
                if(!$(this).hasClass('current-s')){
                    $(this).addClass('current-s').siblings().removeClass('current-s');
                    that.date=$(this).attr("date");
                    $("#course_date").val(that.date);
                    $("#course_time").val("");
                    $("#checkTime").html('正在加载...');
                    if(that.date in that.cacheDate){
                        $("#checkTime").html(that.cacheDate[that.date]);
                    }else{
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: "/ajax/getFreeOpenTime",
                            data: "date="+that.date,
                            success: function(res){
                                var sHtml="";
                                if(res.status){
                                    $.each(res.data,function(i,item){
                                        sHtml+='<li class="time-li" time="'+item.id+'" setdata="checkTime">'+item.start+'</li>';
                                    });
                                    that.cacheDate[that.date]=sHtml;
                                }else{
                                    sHtml="<li>该时间段的课程已经被约光，请选择其它上课日期。</li>";
                                }
                                $("#checkTime").html(sHtml);
                            }
                        });
                    }
                }
            });
            //选择上课时间段
            this.checkTime.on('click','li.time-li',function(){
                if(!$(this).hasClass('c-time')){
                    $(this).addClass('c-time').siblings().removeClass('c-time');
                    //预约三十分钟内的体验课不能取消
                    var aTime = $(this).html().split(':').concat(that.selectDate.find('li.current-s span').eq(0).html().split('-'));
                    var oDate=new Date();
                    oDate.setHours(aTime[0]);
                    oDate.setMinutes(aTime[1]);
                    oDate.setMonth(aTime[2]-1);
                    oDate.setDate(aTime[3]);
                    var disTimer=oDate.getTime()-new Date().getTime();
                    if(!$(this).attr('data-alert30') && disTimer < 1000*60*30 && disTimer >0){
                        $.confirm({msg: "预约三十分钟之内的体验课是不可以取消的哦！",addClass:'aclass-alert'});
                        $(this).attr('data-alert30',true);
                    }
                    $("#course_time").val($(this).attr("time"));

                }
            });

            //提交表单
            var submitFlag = 0;
            this.submitBtn.on('click',function(){
                
                if($('#course_time').val() != ''){
                    if(submitFlag == 0){
                        $('#form1').submit();
                        submitFlag = 1;
                    }
                }else{
                    $.confirm({msg: "请选择测试时间段！",addClass:'aclass-alert'});
                }     
            });
        }
        
    };
    new aboutClassFn();
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
                + '</span></div><div class="info-txt"><input class="txt jsBlank" type="text" name="'
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
});