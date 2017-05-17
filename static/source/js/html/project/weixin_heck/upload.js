define("upload",["plupload"],function(require,exports,module){
	
	var uploadFn = new function(){
		var me = this;
		// 签名
		me.upSign = {
			// 到期时限
			expire : 0
		};
		// 获取随机串
		me.randomStr = function(len){
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
		me.getSuffix = function(filename) {
		    var index = filename.lastIndexOf('.');
		    if(index > -1) return filename.substring(index);
		}
		// 获取随机文件名
		me.getRandomName = function(filename){
			return me.randomStr(20) + me.getSuffix(filename);
		}

		me.getNativeName = function(filename){
			var index = filename.lastIndexOf('.');
			if(index > -1) return filename.slice(0, index) + "_" + Math.round((new Date).getTime() / 1000) + filename.slice(index);
		}

		// 获取签名
		me.getSign = function(){
			return $.ajax({
				url : "/AdminContact/upload",
				type : "post",
				dataType : "json",
				success : function(r){
					me.upSign = r;
				},
				error : function(){
					alert("网络错误请重试！");
				},
				async : false
			});
		}
		// 预览
		me.previewImage = function(file, callback) {//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
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
		// 初始化
		me.init = function(opts){
			var defaults = {
				browse_button : "send_img_btn",
				container : "send_img",
				progress : function(){},
				filters : {
			        /*mime_types : [ //只允许上传图片和zip文件
			        	{ title : "Image files", extensions : "jpg,gif,png,bmp" }
			        ], */
			        max_file_size : "5120kb", //最大只能上传400kb的文件
			        // prevent_duplicates : true //不允许选取重复文件
			    },
			    rename : true
			},
			configs = $.extend(true, {}, defaults, opts);

			var uploader = new plupload.Uploader({
				url : "http://oss.aliyuncs.com",
				runtimes : "html5,flash,silverlight,html4",
				browse_button : configs.browse_button,
				container: configs.container,
				filters: configs.filters,
				init:{
					PostInit: function(){
						console.log("upload init");
					},
					// 选择文件
					FilesAdded: function(up, files) {
						/*plupload.each(files, function(file) { 
							file.fileName = me.getRandomName(file.name);
						});*/
						up.start();
					},
					BeforeUpload: function(up, file) {
			            // 获取签名 得到host 跟 dir
			            var now = Math.ceil((new Date).getTime() / 1000),
			            	buffer = 8;
			            if((now + buffer) >  me.upSign.expire) me.getSign();
		            	// 设置fileName 组装fileKey 跟 fileFullName
		            	file.fileName = configs.rename ? me.getRandomName(file.name) : me.getNativeName(file.name);
						file.fileKey = me.upSign.dir + file.fileName;
						file.fileFullName = me.upSign.host + "/" + me.upSign.dir + file.fileName;

	            	    new_multipart_params = {
					        "key" : file.fileKey,
					        "policy" : me.upSign.policy,
					        "OSSAccessKeyId": me.upSign.accessid, 
					        "success_action_status" : "200", //让服务端返回200,不然，默认会返回204
					        "signature": me.upSign.signature,
					    };

					    up.setOption({
					        'url': me.upSign.host,
					        'multipart_params': new_multipart_params
					    });

					    if(!!configs.progress()) configs.progress().style.width = "0%";
					    

					    // 上传之前 回调
					    (!!configs.BeforeUpload) && configs.BeforeUpload(up, file, me.previewImage);
			            

			        },
					UploadProgress: function(up, file) {
						if(!!configs.progress()) configs.progress().style.width = file.percent + "%";
						(!!configs.UploadProgress) && configs.UploadProgress.apply(null,arguments);
					},
					FileUploaded: function(up, file, info) {

						if(!!configs.progress()) configs.progress().style.width = "0%";

						var args = arguments;
			            if (info.status == 200){
			                // console.log('upload to oss success, object name:' + file.fileName);
			                (!!configs.FileUploaded) && configs.FileUploaded.apply(null,args);
			            }else{
			                console.log(info.response);
			            } 
					},
					Error: function(up, err) {
						console.log("error" + up, err);
                        if(!!configs.progress()) configs.progress().style.width = "0%";
						if(err.code == -600) alert("最大只能发送5M的文件！");
						(!!configs.Error) && configs.Error.apply(null,arguments);
					}
				}
			});

			uploader.init();
		}
	}

	module.exports = uploadFn;
	
});
