/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2017-02-17 12:10:30
 * @version 1.0.0
 */
define(function(require, exports, module) {
    function UpdateVideo(option, callback){
        this.fileElement = $(option.fileElement).get(0).files[0];
        this.fileSize = option.fileSize || 300 * 1024 * 1024;
        this.form = $(option.form);
        this.callback = callback;
        this.bar = {
            show: option.bar.show,
            barele: $(option.bar.barele)//展示进度条元素
        }
        
        window.uploadconfigs = {
            fileElement:$(option.fileElement).get(0).files[0],
            fileSize : option.fileSize || 300 * 1024 * 1024,
            form : $(option.form),
            callback :callback,
            bar:{
                show: option.bar.show,
                barele: $(option.bar.barele)//展示进度条元素
            },
            global:this

        }
         this.init();
        
    }
    UpdateVideo.prototype = {
        init: function(){
            this.bindEvents();
        },

        bindEvents:function(){
             $("#fileToUpload").on("change",function(event){
                     var reg = /(\.mp4)|(.flv)|(\.mov)|(\.3gp)|(\.3gp2)|(\.asf)$/;
                     var deffered = $.Deferred();
                    uploadconfigs.fileElement = this.files[0];
                    if($(".progress").text()=="正在上传中..."){
                        event.preventDefault();
                       return;
                    }
                    $(".status").addClass("disable");
                    if(uploadconfigs.fileElement.type=="video/mp4"){
                    }else if( uploadconfigs.fileElement.type=="video/quicktime"){
                         $(".error").html("您的格式不兼容，请到电脑端上传mp4视频");
                          $("#fileToUpload").val("");
                          return false;
                    }else{
                        $(".error").html("文件格式不对");
                        $("#fileToUpload").val("");
                        return false;
                    }

                    if (uploadconfigs.fileElement.size > uploadconfigs.fileSize){
                        $(".error").html("文件超过300m");
                        $("#fileToUpload").val("");
                        return false;
                    }
                    //判断时长，增加一个伪标签video,通过duration获取时长
                    if(!($("#filevideo").css("display"))){ 
                        $("body").append('<video style="display:none;" controls="controls" id="filevideo" volume=0 autoplay="autoplay"></video>')
                    }
                    
                    
                        uploadconfigs.fileName = uploadconfigs.fileElement.name.substring(0,uploadconfigs.fileElement.name.lastIndexOf("."));
                        var url = URL.createObjectURL(uploadconfigs.fileElement);  
                        var src=$("#filevideo").attr("src",url);
                        $("#filevideo").get(0).volume=0;
                        $("#filevideo").get(0).play();         
                        duration = Math.floor(this.duration);
                        deffered.resolve(duration);
                        deffered.done(function(duration){
                                if(Math.floor(duration) > 180){
                                    $(".error").html("时间超过3分钟");
                                    $("#fileToUpload").val("");
                                    return false;
                                }else{
                                    $(".error").html(""); 
                                }
                                $(".file").html(uploadconfigs.fileName+".mp4");
                                uploadconfigs.global.uploadFile();
                        });
             });

             var self =this;
             $(".upload_module .status").on("click",function(){
                if($(this).hasClass("disable")){
                    return;
                }
                    if($(".inputbox").val()==""){
                        $(".error").html("请填写作品名称");
                        return;
                    }else if($("#fileurl").val=="" && $(".progress").text()=="正在上传中..."){
                        $(".error").html("请稍后再进行提交，视频正在上传中");
                        return;
                    }else if($("#fileurl").val==""){
                        $(".error").html("请上传视频");
                        return;
                    }
                    uploadconfigs.form.submit();
             });
        },
        uploadFile: function(){ 
            var self = this;
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            fd.append("fileToUpload", uploadconfigs.fileElement);
            $(".progress").show().html("正在上传中...");
            $("#fileurl").val("");
            $(".status").addClass("disable");
            /* $.ajax({
                   url: "/Ajax/upSpeechVideo",
                   type: 'POST',
                   success: function(data, textStatus, jqXHR) {
                      //alert(JSON.stringify(data));
                      var data = JSON.parse(data); 
                      $("#fileurl").val(data.data.url);
                      $(".progress").html("上传成功");
                   },
                   error:function(jqXHR, textStatus, errorThrown) {
                        alert("error "+JSON.stringify(jqXHR) + " -- "+errorThrown);
                   },
                   data: fd,  
                   cache: false,  
                   contentType: false,
                   processData: false,
                   xhr:function(){
                        myXhr = $.ajaxSettings.xhr();
                        if(myXhr.upload){ 

                                myXhr.upload.addEventListener('progress',function(event){ 
                                    if (event.lengthComputable) {
                                        if(self.bar.show){  
                                            var percentComplete = Math.round(event.loaded * 100 / event.total) || 0;
                                            $(self.bar.barele).css("width", percentComplete + '%');
                                        }
                                    }else{
                                        if(self.bar.show){
                                          $(self.bar.barele).css("width", '0%');
                                        }
                                    }
                                }, false);
                        }
                        return myXhr; 
                   },
                   headers: {  
                   "Accept": "application/json"
                   }
           });*/
 
            var action = self.form.attr("action");

            
            xhr.upload.addEventListener("progress", function(event){ 
                /*if (event.lengthComputable) {
                    if(self.bar.show){  
                        var percentComplete = Math.round(event.loaded * 100 / event.total) || 0;
                        $(self.bar.barele).css("width", percentComplete + '%');
                    }
                }
                else{
                    if(self.bar.show){
                        $(self.bar.barele).css("width", '0%');
                    }
                }*/
            }, false);

            xhr.addEventListener("readystatechange", function(r){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        var data = JSON.parse(xhr.responseText); 
                        console.log(data.status);
                        if(data.status==1){
                            $(".progress").html("上传成功");
                            $(".status").removeClass("disable");
                            $("#fileurl").attr("data-videoStatus",data.status);
                            $("#fileurl").val(data.data.url);
                        }else{
                            $(".progress").html("上传失败");
                        }
                        
                    }
                }
                
            }, false);
            xhr.addEventListener("error", self.uploadFailed, false);
            xhr.addEventListener("abort", self.uploadCanceled, false);
            xhr.open("POST", "/Ajax/upSpeechVideo",true);
            xhr.send(fd);
         
        },
        uploadFailed: function(event){
            console.log("fail")
        },
        uploadCanceled: function(event){
            console.log("cancel")
        }
    };
    return UpdateVideo;

});