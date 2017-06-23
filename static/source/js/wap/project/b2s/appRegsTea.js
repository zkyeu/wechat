define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs,
        promptDialog = utility.promptDialog;

    // 表单验证
    ;(function(){
        var $form = $("[rel=form]");
        if(!$form[0]) return;
        $form.formVerify({
            checkAll : false,
            rules : {
                cnname:{
                    required : [true,"请输入中文名"],
                    reg : [regs.cnname,"请输入正确的中文名"]
                },
                phone:{
                    required:[true,"请输入手机号"],
                    reg:[regs.phone,"请输入正确的手机号"]
                },
                verifycode:{
                    required:[true,"请输入验证码"],
                    reg:[regs.verifycode,"请输入正确的验证码"]
                },
                password:{
                    required:[true,"请输入密码"],
                    reg:[regs.password,"请输入正确的密码"]
                },
                enname:{
                    required:[true,"请输入英文名或姓名拼音"],
                    reg:[regs.enname,"请输入正确的英文名或姓名拼音"]
                },
                school:{
                    required:[true,"请输入学校关键字"]
                },
                selgrade: {
                    required: [true, "请选择年级"]
                },
                selclass: {
                    required: [true, "请选择班级"]
                },
                sname:{
                    required : [true,"请输入您的姓名"],
                    reg : [regs.cnname,"请输入正确的姓名"]
                },
                sphone:{
                    required : [true,"请输入您的手机号"],
                    reg : [regs.phone,"请输入正确的手机号"]
                }



                // 学生登录
             //    stu : {
             //        required:[true,"请输入手机号或账号"],
             //        reg:[regs.stu,"请输入正确的手机号或账号"]
             //    },
            	// // 老师学生注册第1步 register_step1

             //    verifycode:{
             //        required:[true,"请输入手机验证码"],
             //        reg:[regs.verifycode,"请输入正确的手机验证码"]
             //    },
             //    password:{
             //        required:[true,"请输入密码"],
             //        reg:[regs.password,"请输入正确的密码"]
             //    },
             //    invitecode:{
             //        required:[true,"请输入班级邀请码"]
             //    },
                // 老师学生注册第1步 register_step1
                // 老师学生注册第2步 register_step2
                
                // enname:{
                //     required:[true,"请输入英文名"],
                //     reg:[regs.enname,"请输入正确的英文名"]
                // },
                // // 老师学生注册第2步 register_step2
                // // 输入学生姓名
                // stuname:{
                //     required:[true,"请输入学生姓名"]
                // },
                // // 代理商
                // teachername:{
                //     required:[true,"请输入老师姓名"]
                // },
                // teacherphone:{
                //     required:[true,"请输入手机号码"],
                //     reg:[regs.phone,"请输入正确的手机号码"]
                // },
                // // 学生激活
                // // 邀请码或者手机号
                // activeorphone:{
                //     required:[true,"请输入邀请码"],
                //     reg:[regs.activeorphone,"请输入正确的邀请码"]
                // }
            },
            errorHandler : function(flag,text){
                if(!flag) utility.appTip.open(text);
                    else utility.appTip.close();
            }
        });
    })();

    // 倒计时 老师学生注册第1步 register_step1
    ;(function(){
    	var sendVerify = $(".send-verify");
    	if(!sendVerify.get(0)) return;
        var form = $.formVerify.formlist.form;
        utility.deftime({
            url:$("[send-url]").attr("send-url"),
            tar:".send-verify>input[type=button]",
            tip:"S",
            success:function(r){
                if(r.status == 1){
                    form.verifycode.setState(false,"短信发送成功，请查收！");
                    return true;
                }else{
                    form.verifycode.setState(false,r.info);
                }
            },
            error:function(){
                form.verifycode.setState(false,"短信发送失败，请重试！");
            },
            sendBefore:function(){
                var phone = form.phone,
                    checkFlag = phone.trigger("blur").checkFlag;
                if(!checkFlag) return;
                return {
                    mobile : phone.val(),
                    sms_type : $("[send-type]").attr("send-type")
                }
            }
        });
    })();

    // 男女选择
    ;(function(){
    	var moRadio = $(".app-sex");
    	if(!moRadio.get(0)) return;
    	moRadio.on("tap","[data-sex]",function(){
            var self = $(this);
            if(self.hasClass("is-sel")) return;
            self.addClass("is-sel").siblings("[data-sex]").removeClass("is-sel")
            .closest("dd").find("[rel=sex]")
            .val(self.attr("data-sex"));
    	});
    })();

    // touch变色
    ;(function(){
        $(".app-sel-ul>li").not('.app-notouch').on("touchstart",function(){
            $(this).addClass("app-touched");
        }).on("touchend",function(){
            $(this).removeClass("app-touched");
        });
    })();

    // 定位
    ;(function(){
        var location = $(".app-location-fn");
        if(!location[0]) return;
        var locationTip = location.children("span"),
            locationGoto = location.children("a"),
            locationTips = function(f,t,cb){
                window.setTimeout(function(){
                    locationTip.text(!f ? "定位失败" : t||"");
                    typeof cb == "function" && cb(); 
                }, 600);
            },
            getCity = function(r,cb){
                var coords = r.coords,
                    sendData = {
                        lat : coords.latitude,
                        lon : coords.longitude                    
                    }

                $.ajax({
                    url : "/wapnew/Geo/getCityCode",
                    type : "get",
                    data : sendData,
                    dataType : "json",
                    cache : false,
                    success : function(r){
                        if(r.status == 1){
                            typeof(cb) == "function" && cb(r);
                        }else{
                             (false);
                        }
                    },
                    error : function(){
                        locationTips(false);
                    }
                });
            },
            ss = function(cb){
                if("sessionStorage" in window) typeof(cb) == "function" && cb(window.sessionStorage);
                
            },
            setCity = function(data){
                locationTips(true, data.name, function(){
                    location.append('<a href="'+ '/wapnew/Geo/getDistrict?cityId='+ data.id +'&city_code='+ data.province_id +'' +'" class="fr">选择区域</a>');
                });
            },
            locationFn = function(){
                var cityInfo;
                ss(function(se){
                    cityInfo = se.getItem("cityInfo");
                });

                if(!!cityInfo){
                    setCity(JSON.parse(cityInfo));
                }else{
                    if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(function(r){
                            getCity(r,function(data){
                                setCity(data);
                                // 存储
                                ss(function(se){
                                    se.setItem("cityInfo",JSON.stringify(data));   
                                });
                            });
                        },function(){
                            locationTips(false);
                        });
                    }else{
                        locationTips(false);
                    }                    
                }
            }

            locationFn();

            locationTip.on("tap",function(){
                var self = $(this);
                // 删除
                ss(function(se){
                    se.removeItem("cityInfo");   
                });
                self.text("定位中...").siblings("a").remove();
                locationFn();
            });



    })();

    // select 选择
    ;(function(){
        var uiselect = $(".ui-select");
        if(!uiselect[0]) return;

        var select = uiselect.find("select"),
            tempData = {},
            school_id = $("#school_id"),
            teacher_id = $("#teacher_id"),
            is_change = $("#is_change"),
            rel_selgrade = $("select[rel=selgrade]"),
            rel_selclass = $("select[rel=selclass]"),
            role=$("body").data("role");

            select.on({
                change: function(e) {
                    var self = $(this),
                        val = self.val(),
                        text = self.find("option:selected").text(),
                        e = e || event,
                        rel = $(e.target).attr("rel");
                    if (!!window.isTrigger) return;
                    
                    self.siblings("p")[(val == "" ? "remove" : "add") + "Class"]("is-val").text(text);

                    
                    /*if (rel == "selgrade"){
                        // isChangeRepeat();
                        if (!tempData[val]) {
                            $.ajax({
                                url: "/ajax/getGradeClassInfo",
                                data: {
                                    grade: val,
                                    school_id: school_id.val()
                                },
                                type: "get",
                                cache: false,
                                dataType: "json",
                                success: function(data) {
                                    var status = data.status;
                                    if (status == 1) {
                                        bindData(data.data);
                                        tempData[val] = data.data;
                                    }
                                }
                            });
                        }else{
                            bindData(tempData[val]);
                        }
                    }*/


                }

            });
    })();

    //搜索区等--limengyao
    ;(function(){
        var search_box = $(".search_box").find("input");
        var timer = null;
        search_box.on("input",function(){
            var that = $(this),
                sear_none = $(".sear_none"),
                appSelul = $(".app-sel-ul").eq("1"),
                aUrl = that.attr("ajax-url"),
                aData = that.val(),
                herfUrl = that.attr("herfUrl"),//跳转链接 结尾为id=
                searFlag = that.attr("searFlag");

            if(aData == ""){
                //sear_none.show();
                return;
            }
            clearTimeout(timer);
            timer = setTimeout(function() {
                $.ajax({
                    url : aUrl,
                    type : "get",
                    data : {
                        name:aData
                    },
                    dataType : "json",
                    cache : false,
                    success : function(r){
                        console.log(aUrl);
                        appSelul.html("");
                        if(r.status == 1){
                            var dataDate = r.data;
                            if(searFlag == "1"){//搜索区
                                if(dataDate){//如果匹配到
                                    sear_none.hide();
                                    for(var i=0;i<dataDate.length; i++){
                                        appSelul.append("<li><a href='"+(herfUrl + dataDate[i].id)+"&name="+dataDate[i].name+"'>"+dataDate[i].name+"</a></li>");
                                    }
                                }else{
                                    sear_none.show();
                                }
                            }else if(searFlag == "2"){//学校
                                if(dataDate){//如果匹配到
                                    sear_none.hide();
                                    for(var i=0;i<dataDate.length; i++){
                                        appSelul.append("<li><a href='"+(herfUrl + dataDate[i].id)+"&name="+dataDate[i].name+"'>"+dataDate[i].name+"</a></li>");
                                    }
                                }else{
                                    sear_none.show();
                                }
                            }else if(searFlag == "3"){//教材
                                sear_none.hide();
                                if(dataDate){//如果匹配到
                                    sear_none.hide();
                                    for(var i=0;i<dataDate.length; i++){
                                        appSelul.append("<li><a href='"+(herfUrl + dataDate[i].id)+ "&name=" + dataDate[i].name + "'>" + dataDate[i].name+ "</a></li>");
                                    }
                                }else{
                                    sear_none.hide();
                                };
                            }
                        }else{
                             // (false);
                        }
                    },
                    error : function(){
                        //locationTips(false);
                        console.log(aUrl);
                    }
                });
            },300)
            
        })
    })();
});