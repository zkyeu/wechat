define("heckCircle",["plupload","niceScroll","fancybox"],function(require,exports,module){
    require("niceScroll");
    require("fancybox");
    //设置自适应高度
    // var heights = window.innerHeight-120;
    // $('.heck_center').attr("style","height:"+ heights + "px");
    // 大图
    $("[rel=gallery]").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });
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
    var $message_center_con = $(".message_center_con");
    $message_center_con
    .heckScroll()
    .on("click", "li", function(){
        var self = $(this);
        url = self.attr("data-url");
        if(!url) return;
        window.open(url);
        self.remove();
        if($message_center_con.find("li").length == 0) $message_center_con.find("ul").append('<li class="message_none">暂无新的消息</li>');
    });
    /*$(".message_center_con > ul > li").hover(function() {
     $(this).prev().addClass("hover");
     }, function() {
     $(this).prev().removeClass("hover");
     });*/
    // 用户类型选择
    // $(".show-lable span[label-value=all]").click(function () {
    //     var rel = $(this).hasClass("choose-show");
    //     if(rel){ //取消选中
    //         $(".choose-show[label-value != all]").removeClass("choose-show")
    //     }else { //选中
    //         $.each($(".show-lable [label-value != all]"),function (a,b) {
    //             if($(b).attr("label-value")){
    //                 $(b).addClass("choose-show");
    //             }
    //         })
    //     }
    // });
    //朋友圈库链接处理
    function testCircle() {
        var cutUrl = window.location.href;
        if(cutUrl.indexOf("manageMomentLibrary") > 0 ){
            return true;
        }else{
            return false;
        }
    }
    // $("body").heckScroll();
    $(".ifra").heckScroll();
    var $ifr = $(".ifr"),
        $iframe = $ifr.find("iframe");
    $(".Circle_library").on("click",function () {
        $ifr.show();
    });
    $ifr.find("span").click(function () {
        $ifr.hide();
    });
    //检测悬浮评论数量
    var comment_count = Number($(".friend_comment h6 em").text());
    if( comment_count <= 0){
        $(".friend_comment").hide();
    };
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
    $(".content").heckScroll();
    $(".already_send").find("ul").heckScroll();

    //删除朋友圈
    var likeFn = function(status, wechat_mid, success){
        $.ajax({
            url : "/CircleFriend/giveLikeCircleFriend",
            type : "post",
            dataType : "json",
            data : {
                // status：0表示点赞；1表示取消点赞
                status : status,
                wechat_mid : wechat_mid
            },
            success : function(r){
                if(r.status != 10000) return alert(r.message);
                success.apply(null, arguments);
            },
            error : function(){
                alert("网络错误请重试！");
            }
        });
    }
    $(".already_send_mes").on("click",".close_btn",function(){
        var wechat_mid = $(this).closest(".already_mes").attr("wechat-mid"),
            delet_url = $(this).attr("delet-url");
        console.log(wechat_mid);
        if(window.confirm("确认删除此条？")){
            $.ajax({
                url : delet_url,
                type : "post",
                dataType : "json",
                data:{
                    wechat_mid : wechat_mid
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
    }).on("click", ".js-like-mes", function(){
        var self = $(this),
            wechat_mid = self.closest(".already_mes").attr("wechat-mid"),
            // 该条自己是否点赞了
            isLike = !self.hasClass("not-like"),
            // 点赞数据
            dataLike = self.attr("data-like"),
            commentPeople = self.closest(".comment_people"),
            // 点赞数据的dom结构
            commentLike = commentPeople.find(".comment_like"),
            // 评论区域
            commentH = commentPeople.find(".comment_h"),
            // 点赞人信息
            dataSelf = $("#data-self"),
            dataNick = dataSelf.attr("data-nick"),
            dataId = dataSelf.attr("wechat-id"),
            dataS = {
                username : dataId,
                nickname : dataNick
            },
            toComment = function(data){
                return $.map(data, function(ele, index){
                    return ele.nickname
                }).join("，");
            }
        dataLike = !dataLike ? [] : JSON.parse(self.attr("data-like"));
        if(isLike){
            // 如果当条被自己点赞
            // 取消点赞
            likeFn(1, wechat_mid, function(){
                self.addClass("like-animate").one("animationend", function(){
                    self.removeClass("like-animate");
                    self.addClass("not-like");
                });
                // 去掉自己的点赞数据
                $.map(dataLike, function(ele, index){
                    var id = ele.username;
                    if(id == dataId){
                        dataLike.splice(index, 1);
                    }
                });
                if(dataLike.length == 0){
                    commentLike.remove();
                    self.attr("data-like", "");
                }else{
                    commentLike.html(toComment(dataLike));
                    self.attr("data-like", JSON.stringify(dataLike));
                }
            });
        }else{
            // 当条没有被自己点赞
            // 增加点赞
            likeFn(0, wechat_mid, function(){
                self.addClass("like-animate").one("animationend", function(){
                    self.removeClass("like-animate");
                    self.removeClass("not-like");
                });
                // 加上自己的点赞数据
                dataLike.push(dataS);

                if(dataLike.length == 1){
                    commentH.prepend('<div class="comment_like">'+ toComment(dataLike) +'</div>')
                }else{
                    commentLike.html(toComment(dataLike));
                }
                self.attr("data-like", JSON.stringify(dataLike));
            });
        }
        /*if(isLike){
         // 如果当条被自己点赞
         if(_dataLike.length == 1){
         // 当前就一个点赞人 所以只能为自己
         commentLike.remove();
         self.attr("data-like", "");
         self.addClass("not-like");
         }else{
         // 当前不止一个点赞人
         var _cur = dataSelf.split(",");
         var result = [];
         var newLike = $.map(_dataLike, function(ele, index){
         var _ele = ele.split(",");
         if(_cur[0] != _ele[0]){
         result.push(_ele[1]);
         return _ele.join(",");
         }
         }).join("|");
         commentLike.html(result.join("，"));
         self.attr("data-like", newLike);
         self.addClass("not-like");
         }
         }else{
         // 当条没有被自己点赞
         if(dataLike.length == 0){
         // 如果点赞数据为空 当前没有点赞人
         commentH.prepend('<div class="comment_like">'+ dataSelf.split(",")[1] +'</div>')
         self.attr("data-like", dataSelf);
         self.removeClass("not-like");
         }else{
         // 如果点赞数据不为空 当前有点赞人
         commentLike.append("，" + dataSelf.split(",")[1]);
         self.attr("data-like", dataLike + "|" + dataSelf);
         self.removeClass("not-like");
         }
         }*/
    });

    var zfLayer = $('.zhuanfa-layer')
    //展示转发朋友圈层
    $('.js-broad-mes').on('click', function(){

        zfLayer.find('.confirm').attr("data-id",$(this).data("admin-id"))
        zfLayer.show();
        zfLayer.find('textarea').focus();
    });

    //确定转发
    zfLayer.find('.confirm').on('click', function(){
        var content = zfLayer.find('textarea').val();
        var id = zfLayer.find('.confirm').data('id');
        console.log(id)
    });

    //取消转发
    zfLayer.find('.concel').on('click',function(){
        zfLayer.find('textarea').val('');
        zfLayer.hide();

    })






    // 上传
    var uploader;
    var upImgFn = function(){
        var $upImg = $(".up_img"),
            $upImgUl = $upImg.children("ul"),
            $upImgLastli = $upImgUl.find(".add_img");
        $browse = $("#browse"),
            close;
        close = function(){
            if(!window.confirm("确认关闭删除图片吗？")) return;
            // 删除队列
            $upImgUl.find(".js-check").remove();
            $upImg.hide();
            uploader.splice(0,20);
            $upImgUl.find(".js-addP").parent().remove();
        }
        $upImg.on("click","p>span",close);
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
                    //if(imgArr.length>9) return alert("11");
                    html.push('<li><img src="'+ ele.imgSrc +'" imgId="'+ ele.imgId +'"class="js-addP" /><span>&times;</span></li>');
                });
                // 最多9张
                // if(imgArr.length < 9){
                //     html.push('<li class="add_img" id="addImg">+</li>');
                // }
                // $upImgUl.html(html.join(""));
                /************/
                //console.log(html);
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
    submit = function(opts){
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
                        // 关闭遮罩
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
        // console.log(configs.data);
        // return;
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

                    /********/
                    // $.map(files,function(ele,index){
                    //     if(up.files.length > 9){
                    //         if(flag){
                    //             alert("请勿上传大于9张");
                    //             flag = false;
                    //         }
                    //         up.splice(9,100);
                    //     }
                    // });

                    // previewImageArr(up.files,function(imgArr){
                    //     upImg.setCon(imgArr);
                    //     upImg.open();
                    // });
                    /********/
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

            var data = {
                text : _text,
                imgHost : upSign.host,
                imgSrc : imgSrc.join(","),
                imgCirSrc :　imgCirArr.join(","),
                // arrShow :　arrShow
                // arrShow :　selArr
                arrShow :　['all']
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
        selArr = ['all'],
        arrShow = "";
    $("#start_upload").on("click",function(){
        _text = $.trim($text.val());
        //if(_text == "") return alert("发布内容不能为空！");
        var length = uploader.files.length;
        // if(!testCircle()){
        //     if($(".choose-show").length == 0 && $(".choose-show2").length == 0){
        //         return alert("请勾选至少一个朋友圈可见标签！");
        //     }
        // }
        //获取选择的标签
        // var selOn = $(".choose-show[label-value != all]");
        selArr = ['all'];
        var selOn = $(".choose-show");
        $.each(selOn,function (a,b) {
            var demo = $(b).attr("label-value");
            selArr.push(demo);
        });
        if($(".choose-show2").length){
            selArr=["all"];
        }
        console.log("标签是:"+selArr);
        // 准备提交 打开遮罩
        if(length == 0){
            var imgCirArr = [],
                imgCircle = $(".js-check");
            if(imgCircle.length > 0){
                for(var i=0; i<imgCircle.length; i++){
                    imgCirArr.push(imgCircle.eq(i).find("img").attr("src"));
                }
            }
            var data = {
                text : _text,
                imgCirSrc :　imgCirArr.join(","),
                // arrShow : arrShow
                // arrShow : selArr
                arrShow : ['all']
            }
            console.log(data);
            submit({
                data : data
            });
        }else{
            $(".load_up").show();
            uploader.start();
        }
    });

    //回复评论坑
    var comment_people = $(".comment_people"),
        back_name ,//被回复的人
        wechat_rid;//当前人
    comment_people.on("click",".js-back-mes",function(){
        var that = $(this);
        $('.comment_b').remove();
        wechat_rid = that.attr("wechat-rid") || "";
        back_name = that.attr("back-name") || "";
        if(that.closest(".comment_people").find("textarea").length == 0){
            var html ='<div class="comment_b"><dt>'+ wechat_rid +'</dt><dd><span class="re_con">回复'+ back_name +'：</span><textarea></textarea><div class="com-btn"><a href="javascript:;" class="js-sure-back" wechat_name=' + back_name + '>发布</a><a href="javascript:;" class="js-close">取消</a></div></dd></div>';
            that.closest(".comment_people").find(".comment_h").append(html);
        }
    });
    //回复信息按钮
    comment_people.on("click",".js-sure-back",function(){
        var that = $(this),
            wechat_mid = that.closest(".already_mes").attr("wechat-mid"),
            weiVal = that.closest(".comment_people").find("textarea").val(),
            wechat_name = that.attr("wechat_name");
        console.log(wechat_mid,wechat_rid,weiVal,wechat_name);
        //判断回复内容信息
        if(weiVal.length){
            $.ajax({
                url : "/CircleFriend/commentMoments",
                type : "post",
                data :{
                    wechat_mid : wechat_mid,
                    wechat_rid : wechat_rid,
                    wechat_name : wechat_name,
                    weiVal : weiVal
                },
                dataType : "json",
                success : function(r){
                    if(r.status == 10000){
                        var content;
                        if(wechat_name.length == 0){
                            // var selfs = that.find(".comment_a").children("p").first().text();
                            // $('.comment_b').before('<div class="comment_a"><p>我：</p>' + '<p>' + weiVal + '</p></div>');
                            content = '<div class="comment_g"><p><em>我:</em>'+ weiVal +'</p></div>';
                        }else{
                            // that.parent().append("<span>我 回复"+back_name+" </span>"+that.prev().val());
                            // $('.comment_b').before('<div class="comment_a"><p>我 <f>回复</f> ' + back_name + '： </p>' + '<p>' + weiVal + '</p></div>');
                            content = '<div class="comment_g"><p><em>我</em>回复<em>'+ back_name +':</em>'+ weiVal +'</p></div>';
                        }
                        $('.comment_b').before(content);
                        $('.comment_b').remove(); //移除输入框显示回复
                    }else{
                        alert(r.message);
                    }
                },
                error : function(){
                    alert("网络错误请重试！");
                }
            })
        }else{
            alert("评论内容不能为空!");
        }

    });
    comment_people.on("click",".js-close",function(){
        $('.comment_b').remove();
    });
    //回复自己的评论
    comment_people.on("click","h2",function(){
        if($(this).parent().find("input").length == 0){
            var html ='<div class="comment_b"><dt>'+ wechat_rid +'</dt><dd><textarea placeholder="回复："></textarea><div class="com-btn"><a href="javascript:;" class="js-sure-back">发布评论</a><a href="javascript:;" class="js-close">取消</a></div></dd></div>';
            $(this).parent().append(html);
            // $(this).parent().append('<p><input value="" type="text"/> <i class="js-sure-back" wechat_name=""> 确定</i> <i class="js-close"> 取消</i></p>');
        }
    });

    window.closeIfr = function () {
        //从朋友圈库回来
        $ifr.hide();
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
        var selElm = $(".show-lable span[label-value=all]");
        var selElm2 = $(".show-lable span[label-value!=all]");
        selElm.on("click",function(){
            if(!selElm2.hasClass("choose-show")){
                if(selElm.hasClass("choose-show2")){
                    selElm.removeClass("choose-show2");
                    selElm2.removeClass("choose-show");
                } else{
                    selElm.addClass("choose-show2");
                }
            }
        });
        selElm2.on("click",function(){
            var that = $(this);
            if(!selElm.hasClass("choose-show2")){
                if(that.hasClass("choose-show")){
                    that.removeClass("choose-show");
                } else{
                    that.addClass("choose-show");
                }
            }else{
            }
        });
        // var selElm = $(".show-lable span[label-value=all]");
        // var selElm2 = $(".show-lable span[label-value!=all]");
        //
        // selElm.on("click",function(){
        //     if(selElm.hasClass("choose-show2")){
        //         selElm.removeClass("choose-show2");
        //         selElm2.removeClass("choose-show");
        //     } else{
        //         selElm.addClass("choose-show2");
        //         selElm2.addClass("choose-show");
        //     }
        // });
        // selElm2.on("click",function(){
        //     var that = $(this);
        //     if(that.hasClass("choose-show")){
        //         that.removeClass("choose-show");
        //     } else{
        //         that.addClass("choose-show");
        //     }
        //     if(selElm2.length != $(".choose-show").length){
        //         selElm.removeClass("choose-show2");
        //     }else{
        //         selElm.addClass("choose-show2");
        //     }
        // });
    })();
});