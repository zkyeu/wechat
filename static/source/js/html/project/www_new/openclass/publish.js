define('openclass/publish',['common'],function(require,exports,module){
    var common=require("common");
    $.fn.extend({
        alert: function (msg, fnCb,btnMsg) {
            btnMsg=btnMsg || "确&nbsp;定";
            if ($("#m-alert").length) {
                $("#m-alert").show().find(".bd").html(msg).end().find(".u-btn").html(btnMsg);
            } else {
                var sAlert = '<div class="m-alert" id="m-alert" style="display:block;">' +
                    '<div class="in">' +
                    '<div class="hd">' +
                    '<a class="close" href="javascript:;" title="关闭">x</a>' +
                    '<h4>温馨提示</h4>' +
                    '</div>' +
                    '<div class="bd">' +
                    msg +
                    '</div>' +
                    '<div class="ft">' +
                    '<div class="sibmit f-tac">' +
                    '<span class="close u-btn hover">'+btnMsg+'</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                var oAlert = $(sAlert);
                $("body").append(oAlert);
                oAlert.find(".close").unbind("click").bind("click", function () {
                    oAlert.hide();
                    fnCb && 　fnCb.call(this);
                });
                var timer = null;
                oAlert.on("click", function (event) {
                    if ($(event.target).hasClass("m-alert")) {
                    var i = 0;
                    clearInterval(timer);
                    timer = setInterval(function () {
                        oAlert.find(".sibmit .close").toggleClass("active");
                        i++;
                        if (i == 4)
                        clearInterval(timer);
                    }, 120);
                    }
                });

            }
        },
        confirm: function (msg, fnSure, fnCancel, sSure, sCancel) {
            sSure = sSure || "确定";
            sCancel = sCancel || "取消";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert" id="m-confirm" style="display:block;">' +
                        '<div class="in" style="width:260px;margin-left:-130px;">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭">x</a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        msg +
                        '</div>' +
                        '<div class="ft">' +
                        '<div class="sibmit f-tac">' +
                        '<span class="u-btn active jsSure">' + sSure + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn hover jsCancel">' + sCancel + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                var oConfirm = $(sConfirm);
                $("body").append(oConfirm);

                var timer = null;
                oConfirm.on("click", function (event) {
                    if ($(event.target).hasClass("m-alert")) {
                        var i = 0;
                        clearInterval(timer);
                        timer = setInterval(function () {
                            oConfirm.find(".jsSure").toggleClass("active");
                            i++;
                            if (i == 4)
                                clearInterval(timer);
                        }, 120);
                    }
                });

            }
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel();
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        },
        loading: function () {
            if ($("#m-load").length) {
            $("#m-load").show();
            } else {
            var sLoading = '<div class="m-load" id="m-load" style="display:block;">正在努力加载中</div>';
            $("body").append(sLoading);
            }
        },
        unloading: function () {
            $("#m-load").hide();
        },
        mask:function(){
            if($("#j-mask").length){
                $("#j-mask").show();
            }else{
                $("body").append("<div id='j-mask'>");
            }
        },
        unMask:function(){
            $("#j-mask").hide();
        }
    });
    $.fn.extend({
        showDialog:function(){
            var h=this.height();
            var w=this.width();
            var oWin=$(window);
            this.css({
                "top":oWin.height()/2+oWin.scrollTop(),
                "left":"50%",
                "margin-left":-w/2,
                "margin-top":-h/2,
                "position":"absolute",
                "z-index":$("#mask").css("z-index")*1+1
            });
            $.mask();
            this.show();
        },
        hideDialog:function(){
            this.hide();
            $.unMask();
        }
    });

    var oUE = UE.getEditor('editor', {
        serverUrl:"/api/upload",
        enableAutoSave: false,
        autoSyncData:false,
        wordCount:false,
        wordOverFlowMsg:'',
        toolbars: [['bold', 'insertorderedlist', 'insertunorderedlist', 'blockquote', 'link', 'unlink', 'insertcode', 'simpleupload','emotion',"forecolor","fontsize","fontfamily"]]
    });
    
    //选择分类
    $(".titList li").on("click",function(){
        $("#module").val($(this).find("a").attr("data-key"));
        $(".titList").hide(); 
        $("#classify").html($(this).find("a").html());
    });
    //插入要编辑的内容
    oUE.addListener("ready", function () {
        // editor准备好之后才可以使用
        oUE.execCommand('insertHtml',$("#content").val());
 
    });

    $("#publishSubmit").on('click', function () {

        var oForm=$("#publishForm");
        var regS = new RegExp("&#39;","gi");
        var forumData = $.trim(oUE.getContent()).replace(regS,'');
        $("#content").val(forumData);
        if(!$("#title").val()){
            $.fn.alert("标题不能为空");
            return;
        }
        if(limitBytes($("#title").val(),60).overstep){
            $.fn.alert("标题不能超过30个字");
            return;
        }
        if($("#classify").html()=="请选择板块"){
            $.fn.alert("请选择板块");
            return;
        }
        if(!$("#content").val()){
             $.fn.alert("发布内容不能为空");
             return;
        }
        oForm.ajaxSubmit({
            dataType:"JSON",
            success:function(res){
                if(res.status){
                    $.fn.alert(res.info,function(){
                        if(res.data){
                            location.href=res.data;
                        }

                    });
                    setTimeout(function(){
                        location.href=res.data;
                    },3000);
                }else{
                    if(res.data=="codeError"){
                        var oImg=document.getElementById("codeImg");
                        var src="";
                        var v="/vv//"
                        if(oImg.src.indexOf(v)!=-1){
                            src=oImg.src.substring(0,oImg.src.indexOf(v)+v.length);
                        }else{
                            src=oImg.src+v;
                        }
                        oImg.src=src+Math.random();
                    }
                    $.fn.alert(res.info);
                }
            },
            error:function(){
                $.fn.alert("网络连接失败！");
            }
        });
    });

     function limitBytes(str,max){
        var count=0;
        var reg=/[\u4e00-\u9fa5]/;
        var res={};
        for(var i=0;i<str.length;i++){
            if(reg.test(str.charAt(i))){
                count+=2;
            }else{
                count++;
            }
            if(count==max){
                res.index=i;
            }
        }
        res.overstep=count>max;
        return res;
    } 

});




     