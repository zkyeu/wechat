define("friendCircleManage",["plupload","niceScroll","layui"],function(require,exports,module){
    require("niceScroll");
    require("layui");
    // 滚动条
    $.fn.heckScroll = function(){
        var that = $(this);
        that.niceScroll(
            {
                cursorcolor : "#686b71",
                autohidemode: true,
                cursorwidth:7,
                cursorborderradius:"999px",
                cursorborder : 0,
                horizrailenabled:false
            }
        );
        return that;
    }
    //监听显示到顶部按钮
    window.onscroll=function(){
        if($(document).scrollTop()>80){
            $(".uptop").show();
        }else{
            $(".uptop").hide();
        };
    }
    $(".uptop").click(function() {
        $("html,body").animate({scrollTop:0}, 500);
    });
    //用户类型选择
    $(".sel-types p[label-value=all]").click(function () {
        var rel = $(this).hasClass("choose-show");
        if(rel){ //取消选中
            $(".choose-show[label-value != all]").removeClass("choose-show")
        }else { //选中
            $.each($(".sel-types [label-value != all]"),function (a,b) {
                if($(b).attr("label-value")){
                    $(b).addClass("choose-show");
                }
            })
        }
    });
    var html,html2;
    for(var i = 0; i < 24; i++){
        html += '<option value="'+i+'">'+ i+'</option>';
    }
    $(".putHours select").html(html);
    for(var j = 0; j < 60; j++){
        if(j%15==0){
            html2 += '<option value="'+j+'">'+ j+'</option>';
        }
    }
    $(".putMinut select").html(html2);
    $(".times").on('click', function () {
        $("#setTime").show(300);
    });
    $(".closeTimeBtn").on('click', function (event) {
        $("#setTime").hide()
        event.stopPropagation();
    });
    //删除朋友圈
    $(".already_send_mes").on("click",".close_btn",function(){
        var wechat_mid = $(this).closest(".already_mes").attr("id"),
            delet_url = $(this).attr("delet-url");
        console.log(wechat_mid);
        if(window.confirm("确认删除此条？")){
            $.ajax({
                url : delet_url,
                type : "post",
                dataType : "json",
                data:{
                    id : wechat_mid
                },
                success : function(r){
                    if(r.status == 10000){
                        //alert("删除成功！");
                        window.location.reload();
                    }else if(r.status == 10020){
                        window.location = '/AdminContact/guide';
                    }else{
                        alert(r.message);
                    }
                },
                error : function(){
                    alert("网络错误请重试！");
                }
            });
        }
    });
    // 上传
    var uploader;
    var upImgFn = function(){
        var $upImg = $(".up_img"),
            $upImgUl = $upImg.children("ul"),
            $upImgLastli = $upImgUl.find(".add_img");
        $browse = $("#browse"),close;
        close = function(){
            if(!window.confirm("确认关闭删除图片吗？")) return;
            // 删除队列
            $upImgUl.find(".js-check").remove();
            $upImg.hide();
            uploader.splice(0,20);
            $upImgUl.find(".js-addP").parent().remove();
        }
        $upImg.on("click","p>span",close);//点击关闭图片列表层
        $upImgUl.on("click","#addImg",function(){
            $browse.trigger("click");
        }).on("click","li>span",function(){
            var self = $(this),
                imgId = self.siblings("img").attr("imgId");
            uploader.removeFile(imgId);
            self.parent().remove();
            if($upImgUl.find("li").length <= 10){//add_img是隐藏的 长度还计算在内
                $(".add_img").show();
            }
            /*********/
            // previewImageArr(uploader.files,function(imgArr){
            //     upImg.setCon(imgArr);
            //     upImg.open();
            // });
            /*********/
        }).on("click","li>i",function(){//删除从朋友圈拉去出来的数据
            var that = $(this);
            that.parent().remove();
            if($upImgUl.find("li").length <= 10){
                $(".add_img").show();
            }
        });
        return {
            close : close,
            open : function(){
                $upImg.show();
            },
            setCon : function(imgArr){
                var html = [];
                $.map(imgArr,function(ele,index){
                    html.push('<li><img src="'+ ele.imgSrc +'" imgId="'+ ele.imgId +'"class="js-addP" /><span>&times;</span></li>');
                });
                //9张图片
                if(imgArr.length <= 9){
                    $upImgLastli.before(html.join(""));
                    $(".add_img").show();
                }
            }
        }
    }
    var
        upImg = upImgFn(),
        upSign = {
            expire : 0
        },
        getSign,
        previewImage,
        previewImageArr,
        randomStr,
        getSuffix,
        getRandomName,
        submit,
        init;
    getSign = function(){
        var now = Math.ceil((new Date).getTime() / 1000),
            expire = upSign.expire,
            buffer = 8,
            needUpdate = (expire - (now + buffer) <= 0);
        if(needUpdate){//是否需要重新获取签名文件等
            $.ajax({
                url : "/AdminContact/upload",
                type : "post",
                dataType : "json",
                success : function(r){
                    upSign = r;
                },
                error : function(){
                    alert("网络错误请重试！");
                },
                async : false
            });
        }
    }
    // 预览
    previewImage = function(file, callback) {//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
        if (!file || !/image\//.test(file.type)) return; //确保文件是图片
        if (file.type == 'image/gif') {//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
            var fr = new mOxie.FileReader();
            fr.onload = function () {
                callback(fr.result);
                fr.destroy();
                fr = null;
            }
            fr.readAsDataURL(file.getSource());
        } else {
            var preloader = new mOxie.Image();
            preloader.onload = function () {
                //preloader.downsize(550, 400);//先压缩一下要预览的图片,宽300，高300
                var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                callback && callback(imgsrc); //callback传入的参数为预览图片的url
                preloader.destroy();
                preloader = null;
            };
            preloader.load(file.getSource());
        }
    }
    previewImageArr = function(files,callback){
        var length = files.length,
            imgArr = [];
        $.map(files,function(ele,index){
            previewImage(ele,function(imgSrc){
                imgArr.push({
                    imgId : ele.id,
                    imgSrc : imgSrc
                });
                length--;
                if(length == 0) typeof(callback) == "function" && callback(imgArr);
            });
        });
    }
    // 获取随机串
    randomStr = function(len){
        var len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = [];
        for(i=0;i<len;i++){
            pwd.push(chars.charAt(Math.floor(Math.random() * maxPos)));
        }
        return pwd.join("");
    }
    // 获取后缀名
    getSuffix = function(filename) {
        var index = filename.lastIndexOf('.');
        if(index > -1) return filename.substring(index);
    }
    // 获取随机文件名
    getRandomName = function(filename){
        return randomStr(20) + getSuffix(filename);
    }
    //发布朋友圈
    var selArr = [];//选择标签
    submit = function(opts){
        selArr = [];
        var selOn= $(".choose-show[label-value != all]");
        $.each(selOn,function (a,b) {
            var demo = $(b).attr("label-value");
            selArr.push(demo);
        });
        var url = $(".send_to_user").attr("ajax-url");
        var defaults = {
                url : url,
                type : "post",
                dataType : "json",
                success : function(r){
                    if(r.status == 10000){
                        // alert("发布成功了！");
                        window.location.reload();
                    }else if(r.status == 10020){
                        window.location = '/AdminContact/guide';
                    }else{
                        $(".load_up").hide();
                        alert(r.message);
                    }
                },
                error : function(){
                    $(".load_up").hide();
                    alert("网络错误，请重试！");
                },
                complete : function(){
                    // 关闭遮罩
                    $(".load_up").hide();
                }
            },
            configs = $.extend({}, defaults, opts);
        console.log(configs.data);
        $.ajax(configs);
    }
    init = function(obj){
        uploader = new plupload.Uploader({
            url : "http://oss.aliyuncs.com",
            runtimes : "html5,silverlight,html4",
            browse_button : "browse",
            container: "select_mes",
            filters:{
                mime_types : [ //只允许上传图片和zip文件
                    { title : "Image files", extensions : "jpg,gif,png,bmp" }
                ],
                max_file_size : "5120kb", //最大只能上传5120kb的文件
                // prevent_duplicates : true //不允许选取重复文件
            },
            init:{
                PostInit: function(){
                    console.log("upload init");
                },
                // 选择文件
                FilesAdded: function(up, files) {
                    var flag = true;
                    var circleImg = $(".up_img").find(".js-check");;
                    if(up.files.length > (9 - circleImg.length)){
                        alert("上传图片数不能多于9张");
                        up.splice(0,100);
                    }else if(up.files.length < (9 - circleImg.length)){
                        previewImageArr(files,function(imgArr){
                            upImg.setCon(imgArr);
                            upImg.open();
                        });
                    }else if(up.files.length == (9 - circleImg.length)){
                        console.log(up.files.length);
                        previewImageArr(files,function(imgArr){
                            upImg.setCon(imgArr);
                            upImg.open();
                            $(".add_img").hide();
                        });
                    }
                },
                BeforeUpload: function(up, file) {
                    getSign();
                    // 设置fileName 组装fileKey 跟 fileFullName
                    file.fileName = getRandomName(file.name);
                    file.fileKey = upSign.dir + file.fileName;
                    file.fileFullName = upSign.host + "/" + upSign.dir + file.fileName;
                    new_multipart_params = {
                        "key" : file.fileKey,
                        "policy" : upSign.policy,
                        "OSSAccessKeyId": upSign.accessid,
                        "success_action_status" : "200", //让服务端返回200,不然，默认会返回204
                        "signature": upSign.signature,
                    };
                    up.setOption({
                        'url': upSign.host,
                        'multipart_params': new_multipart_params
                    });
                },
                UploadProgress: function(up, file) {
                    // file.percent
                },
                FileUploaded: function(up, file, info) {
                },
                UploadComplete : function(uploader,files){
                    typeof(obj.complete) == "function" && obj.complete(uploader,files);
                },
                FilesRemove : function(uploader,files){
                    //removeFile( files, true );
                },
                Error: function(up, err) {
                    console.log("error " + up, err);
                }
            }
        });
        window.uploader = uploader;
        uploader.init();
    }
    init({
        complete : function(uploader,files){
            var
                imgSrc = $.map(files,function(ele,index){
                    return ele.fileKey;
                }),
                imgCirArr = [],
                imgCircle = $(".js-check");
            if(imgCircle.length > 0){
                for(var i=0; i<imgCircle.length; i++){
                    imgCirArr.push(imgCircle.eq(i).find("img").attr("src"));
                }
            }
            // console.log(imgCirArr);
            var putTime = $("#layui-laydate-input").val();
            var putHours = $(".putHours select").val();
            var putMinut = $(".putMinut select").val();
            var putdetailTime = putTime +' '+ putHours +':'+putMinut;
            var data = {
                text : _text,
                imgHost : upSign.host,
                imgSrc : imgSrc.join(","),
                // imgCirSrc :　imgCirArr.join(","),
                // arrShow :　arrShow
                pubTime: putdetailTime,
                userGroup :selArr
            }
            submit({
                data : data
            });
        }
    });
    //选择表情
    $.fn.insertText = function(text) {
        this.each(function() {
            if (this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {
                return;
            }
            if (document.selection) {
                this.focus();
                var cr = document.selection.createRange();
                cr.text = text;
                cr.collapse();
                cr.select();
            } else if (this.selectionStart !== undefined) {
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + text
                    + this.value.substring(end, this.value.length);
                this.selectionStart = this.selectionEnd = start + text.length;
            } else {
                this.value += text;
            }
        });
        return this;
    }
    $(".smail").on("click","em",function(e){
        $(".face_panel").fadeIn();
        e.stopPropagation();
    });
    $(window).on("click",function(){
        $(".face_panel").fadeOut();
    });
    $(".face_con").on("click",".qqface",function(){
        var that = $(this),
            $textarea = $("textarea"),
            expression = "/" + that.attr("title"),
            beforeVal = $textarea.val(),
            afterVal = beforeVal + "/" + expression;
        $textarea.insertText(expression);
        //console.log();
        //$("textarea").val(afterVal);
    })
    // 发布
    var $text = $(".send_message textarea"),
        _text,
        selArr = [];
    $("#start_upload").on("click",function(){
        _text = $.trim($text.val());//文本域内容
        var length = uploader.files.length;
        var putTime = $("#layui-laydate-input").val();
        var putHours = $(".putHours select").val();
        var putMinut = $(".putMinut select").val();
        var putdetailTime = putTime +' '+ putHours +':'+putMinut;
        // if(_text == "") return alert("发布内容不能为空！");
        if(putTime.length ==0 )  return alert("请选择发送时间！");
        var mydate = new Date();
        var str = "" + mydate.getFullYear()+'-'+(mydate.getMonth()+1)+'-'+mydate.getDate()+' '+mydate.getHours()+':'+mydate.getMinutes();
        var localTime = new Date(putdetailTime);
        var curTime = new Date(str);
        if(localTime < curTime){
            return alert('发布时间不能早于当前！')
        }
        if($(".choose-show").length == 0){
            return  alert("请勾选至少一个标签！");
        }
        //获取选择的标签
        selArr = [];
        var selOn = $(".choose-show[label-value != all]");
        $.each(selOn,function (a,b) {
            var demo = $(b).attr("label-value");
            selArr.push(demo);
        });
        if(selArr[0] == undefined){
            selArr.splice(0,1);
        }
        // 准备提交 打开遮罩
        if(length == 0){
            var imgCirArr = [],
                imgCircle = $(".js-check");
            var putTime = $("#layui-laydate-input").val();
            var putHours = $(".putHours select").val();
            var putMinut = $(".putMinut select").val();
            var putdetailTime = putTime +' '+ putHours +':'+putMinut;
            if(imgCircle.length > 0){
                for(var i=0; i<imgCircle.length; i++){
                    imgCirArr.push(imgCircle.eq(i).find("img").attr("src"));
                }
            }
            var data = {
                text : _text,
                pubTime: putdetailTime,
                userGroup :selArr
            }
            // console.log(data);
            submit({
                data : data
            });
        }else{
            $(".load_up").show();
            uploader.start();
        }
    });

    window.closeIfr = function () {
        //从朋友圈库回来
        var form_text = sessionStorage.getItem("text"),
            $upImg = $(".up_img"),
            $upImgUl = $upImg.children("ul"),
            form_imgarr = sessionStorage.getItem("imgArr");
        // console.log(form_imgarr);
        if(!form_imgarr) form_imgarr = '';
        var imgIn = form_imgarr.split(","),
            cricleFlag = sessionStorage.getItem("flag"),
            $up_img = $(".up_img");
        if(cricleFlag == 1){
            if($(".send_message").find("textarea").val() != ""){
                if(confirm("您确定要放弃现在编辑的内容吗？")){
                    $(".send_message").find("textarea").val(form_text);
                }
            }else{
                $(".send_message").find("textarea").val(form_text);
            }
            if(!(form_imgarr == '')){
                if(imgIn.length < 9 && imgIn.length>=1){
                    $upImgUl.find(".js-check").remove();
                    uploader.splice(0,20);
                    $upImgUl.find(".js-addP").parent().remove();
                    $up_img.find(".add_img").before(imgIn.join(""));
                    $up_img.show();
                    $up_img.find(".add_img").show();
                }else if(imgIn.length == 9){
                    $upImgUl.find(".js-check").remove();
                    uploader.splice(0,20);
                    $upImgUl.find(".js-addP").parent().remove();
                    $up_img.find(".add_img").before(imgIn.join(""));
                    $up_img.find(".add_img").hide();
                    $up_img.show();
                }
            }
            sessionStorage.setItem("flag",0);
            sessionStorage.setItem("text","");
            sessionStorage.setItem("imgArr","");
        }
    }
    //选择对谁可见
    ;(function(){
        //删除数组中指定元素
        function removeByValue(arr, val) {
            for(var i=0; i<arr.length; i++) {
                if(arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        };
        // $(".sel-types p").on("click",function(){
        //     var that = $(this);
        //     if(that.hasClass("choose-show")){
        //         that.removeClass("choose-show");
        //
        //     }else{
        //         that.addClass("choose-show");
        //
        //     }
        // });
        var selElm = $(".sel-types p[label-value=all]");
        var selElm2 = $(".sel-types p[label-value!=all]");
        selElm.on("click",function(){
            if(selElm.hasClass("choose-show2")){
                selElm.removeClass("choose-show2");
                selElm2.removeClass("choose-show");
            } else{
                selElm.addClass("choose-show2");
                selElm2.addClass("choose-show");
            }
        });
        selElm2.on("click",function(){
            var that = $(this);
            if(that.hasClass("choose-show")){
                that.removeClass("choose-show");
            } else{
                that.addClass("choose-show");
            }
            if(selElm2.length != $(".choose-show").length){
                selElm.removeClass("choose-show2");
            }else{
                selElm.addClass("choose-show2");
            }
        });
    })();
});