define("heckCircle",["plupload","niceScroll","jedate"],function(require,exports,module){
     require("plupload");
     var jedate = require("jedate");

     //计算已经发送侧边栏的高度

    $(".already_send").height(784 - $(".to_send").height() + "px");
    $(".already_send").find("ul").height(740 - $(".to_send").height() - 50 + "px")

    // 滚动条
    
    $(".already_send_mes").niceScroll(
        {
            cursorcolor : "#686b71",
            autohidemode: true,
            cursorwidth:7,
            cursorborderradius:"999px",
            cursorborder : 0,
            horizrailenabled:false
        }
    );
    $(".already_send").find("ul").niceScroll(
        {
            cursorcolor : "#686b71",
            autohidemode: true,
            cursorwidth:7,
            cursorborderradius:"999px",
            cursorborder : 0,
            horizrailenabled:false
        }
    );
  
  
    //上传图片
    ;(function(){
        var $up_img = $(".up_img"),
            isImg = false;
        //实例化一个plupload上传对象
        var uploader = new plupload.Uploader({
            browse_button : 'browse', //触发文件选择对话框的按钮，为那个元素id
            url : 'upload.php', //服务器端的上传页面地址
            flash_swf_url : 'Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
            silverlight_xap_url : 'js/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
        });  
        var uploaderAdd = new plupload.Uploader({
            browse_button : 'addImg', //触发文件选择对话框的按钮，为那个元素id
            url : 'upload.php', //服务器端的上传页面地址
            flash_swf_url : 'Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
            silverlight_xap_url : 'js/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
        });     

        //在实例对象上调用init()方法进行初始化
        uploader.init();
        uploaderAdd.init();
        //绑定各种事件，并在事件监听函数中做你想做的事
        uploader.bind('FilesAdded',function(uploader,files){
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        });
        uploader.bind('UploadProgress',function(uploader,file){
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        });
        //绑定文件添加进队列事件
            uploader.bind('FilesAdded',function(uploader,files){
                previewImage(files[0],function(imgsrc){
                  if(files[0].size >= 2097152){
                    alert('图片尺寸应该小于2M');
                  }else{
                    if(!isImg){
                      $(".add_img").before('<li><img src="'+ imgsrc +'" /></li>');
                      $up_img.show();
                    }
                  }
                  
                }) 
            });
             uploaderAdd.bind('FilesAdded',function(uploader,files){
                previewImage(files[0],function(imgsrc){
                  if(files[0].size >= 2097152){
                    alert('图片尺寸应该小于2M');
                  }else{
                    if(!isImg){
                      $(".add_img").before('<li><img src="'+ imgsrc +'" /></li>');
                      $up_img.show();
                    }
                  }
                  
                }) 
            });
            function previewImage(file,callback){
                if(!file || !/image\//.test(file.type)) return;
                if(file.type=='image/gif'){
                    var fr = new mOxie.FileReader();
                    fr.onload = function(){
                        callback(fr.result);
                        fr.destroy();
                        fr = null;
                    }
                    fr.readAsDataURL(file.getSource());
                }else{
                    var preloader = new mOxie.Image();
                    preloader.onload = function() {
                        preloader.downsize( 150, 150 );
                        var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                        callback && callback(imgsrc); 
                        preloader.destroy();
                        preloader = null;
                    };
                    preloader.load( file.getSource());
                }   
            }
        //最后给"开始上传"按钮注册事件
        document.getElementById('start_upload').onclick = function(){
            uploader.start(); //调用实例对象的start()方法开始上传文件，当然你也可以在其他地方调用该方法
            uploaderAdd.start();
        }
    })();




    //指定时间发送
    (function(){

        var time_icon = $(".time_icon");
        time_icon.on("click",function(){
            jedate({
                dateCell:"#dateinfo",
                format:"YYYY年MM月DD日 hh:mm:ss",
                isinitVal:true,
                isTime:true, //isClear:false,
                minDate:"2014-09-19 00:00:00",
            });
        });
    })();


   // 提交
   (function(){
        var up_img = $(".up_img"),
            closebtn = up_img.find("p").find("span"),
            imgBox =  up_img.find("ul"),
            form = $("[rel = friendsCircle]");
        closebtn.on("click",function(){
            imgBox.html("<li class='add_img' id='addImg'>+</li>");
            up_img.hide();
    });

    //表单
    form.on("submit",function(e){
        var e = e || event,
        val = $("textarea").val(),
        data_id = $("#data-id").attr("data-id"),
        wechat_id = $("#wechat-id").attr("wechat-id"),
        time = $("#dateinfo").val();
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        if(form.sendStatus) return;
        $.ajax({
            beforeSend : function(){
                form.sendStatus = true;
            },
            url : "/CircleFriend/addCircleFriend",
            type : "post",
            data : {
                content :val,
                admin_id : data_id,
                wechat_id : wechat_id,
                delayed_time : time
            },
            dataType : "json",
            success : function(data){
                if(data.status == 10000){
                    window.location.reload();
                }else{
                    alert(data.message);
                }
            },
            error : function(){
                alert("网络错误请重试！")
            },
            complete : function(){
                form.sendStatus = false;
            }
        });
    });
    })();

//删除弹层
    var $close_btn = $(".close_btn"),
    $pop = $(".pop"),
    $sure_btn = $(".sure_btn"),
    $not_btn = $(".not_btn");
    $close_btn.on("click",function(){
        $(this).siblings().show();
    });
    $sure_btn.on("click",function(){
        $.ajax({
            url : "/CircleFriend/delCircleFriend",
            type : "post",
            dataType : "json",
            success : function(data){
                if(data.status == 10000){
                    window.location.reload();
                }else{
                    alert(data.message);
                }
            },
            error : function(){
                alert("网络错误请重试！");
            }
        });
    });
    $not_btn.on("click",function(){
        $(this).parent().parent().hide();
    });
});