define("teaInfo",["plupload","selController"],function(require,exports,module){
    require("selController");
    var isSuccess = false,
        uploadId = $('#uploadId');
    var teaInfoFn = function(){
        this.aFlag = $('.a-flag');
        this.sureBtn = $('#sureBtn');
        this.gradeId = $('#gradeId');
        this.classId = $('#classId');
        this.dutiesId = $('#dutiesId');
        this.nameId = $('#nameId');
        this.phoneId = $('#phoneId');
        this.codeId = $('#codeId');
        this.pReg = /^\d{11}$/;
        this.cReg = /^\d$/;
        this.errorIcon = $('.error-s');
        this.choseSchool = $('#choseSchool');
        this.choseClass = $('#choseClass');
        this.choseDuties = $('#choseDuties');
        this.dutiesId1 = $('#dutiesId1');
        this.dutiesId2 = $('#dutiesId2');
        this.dutiesId3 = $('#dutiesId3');
        this.sendCode = $('#sendCode');
        this.number = 5;
        this._event();
    };
    teaInfoFn.prototype = {
        _event:function(){
            var that = this;
            //选项滑过状态控制
            this.aFlag.find('a').hover(function(){
              if(!$(this).hasClass('cur-flag')){
                $(this).addClass('current');
              }
            },function(){
              if(!$(this).hasClass('cur-flag')){
                $(this).removeClass('current');
              }
            });
        
            //选中选项
            this.aFlag.find('a').on('click',function(){
              if(!$(this).parent().hasClass('duties-box')){
                if($(this).parent().attr('data-flag') == 'gradeFlag'){
                  that.gradeId.val($(this).attr('data-value'));
                }else if($(this).parent().attr('data-flag') == 'classFlag'){
                  that.classId.val($(this).attr('data-value'));
                }
                if(!$(this).hasClass('cur-flag')){
                  $(this).parent().find('a').removeClass('current cur-flag');
                  $(this).addClass('current cur-flag');
                }
                that.hideErrorFn.call($(this));
              }
            });
            //职务选项
            $('.duties-box').find('a').on('click',function(){
              
              that.num = $(this).index()+1;
              if(!$(this).hasClass('cur-flag')){
                that.hideErrorFn.call($(this));
                $('#dutiesId'+ that.num).val(that.num);
                $(this).addClass('current cur-flag');
              }else{
                $(this).parent().next().removeClass('hide').addClass('show');
                $('#dutiesId'+ that.num).val('');
                $(this).removeClass('current cur-flag');
              }
            });
            
            //职务 错识信息展示
            this.dutiesId.on('focus',function(){
              that.hideErrorFn.call($(this));
            });

            //确定提交
            this.sureBtn.on('click',function(){
              var multiSelect = that.dutiesId1.val() != '' || that.dutiesId2.val() != '' || that.dutiesId3.val() != '' || that.dutiesId.val() != '';
              //不为空
              if(that.gradeId.val() != '' && that.classId.val() != '' && multiSelect == true && that.nameId.val() != '' && that.phoneId != '' && that.codeId != '' && 
            isSuccess == true){
                if(!that.pReg.test(that.phoneId.val())){
                  that.errorFn.call(that.phoneId,'格式不正确');
                  return false;
                }else if(!that.cReg.test(that.codeId.val())){
                  that.errorFn.call(that.codeId,'验证码为数字');
                  return false;
                }else{
                  alert('提交');
                }
              }else{
                if(that.gradeId.val() == ''){
                  that.errorFn.call(that.choseSchool,'请选择所在年级');
                }
                if(that.classId.val() == ''){
                  that.errorFn.call(that.choseClass,'请选择所在班级');
                }
                if(multiSelect == false){
                  that.errorFn.call(that.choseDuties,'请选择职务');
                }
                if(that.nameId.val() == ''){
                  that.errorFn.call(that.nameId,'姓名不能为空');
                }
                if(that.phoneId.val() == ''){
                  that.errorFn.call(that.phoneId,'手机号不能为空');
                }
                if(that.codeId.val() == ''){
                  that.errorFn.call(that.codeId,'验证码不能为空');
                }
                if(isSuccess == false){
                  that.errorFn.call(uploadId,'请选择上传的图片');
                }
              }
            });

            //input 清空错误内容
            this.errorIcon.on('click',function(){
              $(this).prev().val('').end().parent().removeClass('border-s');
              if($(this).prev().attr('id') == 'codeId'){
                $(this).parents('.info-box').next().next().text('').removeClass('show').addClass('hide');
              }else{
                $(this).parents('.info-box').next().text('').removeClass('show').addClass('hide'); 
              }
            });

            this.sendCode.on('click',function(){

              $(this).addClass('hide');
              var self = $(this);
              that.timeEle = $(this).next();
              that.timeEle.removeClass('hide').addClass('show');
              var clearTime =setInterval(function(){
                that.timeEle.text(that.number-- +'S后重新发送');
                if(that.number < 0){
                  that.number = 5;
                  clearTimeout(clearTime);
                  that.timeEle.text('').removeClass('show').addClass('hide');
                  self.removeClass('hide');
                }
              },1000);
            });

                    },
        errorFn:function(s){
          this.parent().addClass('border-s');
          if(this.attr('id') == 'codeId'){
            this.parents('.info-box').next().next().text(s).removeClass('hide').addClass('show');
          }else if(this.attr('id') == 'phoneId' || this.attr('id') == 'nameId'){ // if(this.attr('id') == 'phoneId')
            this.parents('.info-box').next().text(s).removeClass('hide').addClass('show'); 
          }else{
            this.text(s).removeClass('hide').addClass('show'); 
          }
        },
        hideErrorFn:function(){
          this.parent().next().removeClass('show').addClass('hide');
        }
    };
    new teaInfoFn();

    

    ;(function(){
        var $filelist = $("#filelist"),
            isImg = false;
            
        // 上传头像
        var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
            browse_button : 'pickfiles',
            url : '/File/uploadPicture',
            flash_swf_url : 'Moxie.swf',
            // silverlight_xap_url : 'js/Moxie.xap',
            filters: {
              mime_types : [ //只允许上传图片文件
                { extensions : "jpg,gif,png" }
              ]
            }
        });
        uploader.init(); //初始化

        //绑定文件添加进队列事件
        uploader.bind('FilesAdded',function(uploader,files){
            previewImage(files[0],function(imgsrc){
              if(files[0].size >= 2097152){
                alert('图片尺寸应该小于2M');
              }else{
                if(!isImg){
                  $filelist.append('<img width="100" height="100" src="'+ imgsrc +'" />');
                  isImg = true;
                }else{
                  $filelist.find("img").attr("src",imgsrc);
                }
              }
              
            }) 
        });

          // 上传的方法
          $('#uploadfiles').on('click',function(){
            uploader.start();
          });

        uploader.bind('UploadProgress',function(uploader,file){
          // 上传进度
            // $progress.css("width", file.percent + "%");
        });


        uploader.bind("FileUploaded",function(uploader,file,responseObject){
            // console.log(uploader,file,responseObject);
            if(file.status == 5){
                // 表单提交
                isSuccess = true;
                alert("头像上传成功");
            }else{
                alert("保存头像失败，请重试");
            }
        });

        uploader.bind("Error",function(uploader,errObject){
            alert("保存头像失败，请重试");
        });



        /*uploader.bind("UploadProgress",function(uploader,file){
            console.log(uploader,file);
        });

        uploader.bind("UploadComplete",function(uploader,files){
            console.log(uploader,files);
        });*/


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
                preloader.load( file.getSource() );
            }   
        }

    })();







    $(function(){
        $(".school-choice").eq(0).selController({
            type : "school",
            callback : function(r){
                console.log(r);
            }
        });
    });
});



