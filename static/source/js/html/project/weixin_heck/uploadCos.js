/*腾讯云上传*/
define("uploadCos",["cosjs"],function(require,exports,module){
	require("cosjs");
	var uploadFn = new function(){
		var me = this;

		me.getSign = function(cb){
	    	$.ajax({
	    		url : "/AdminContact/getCosSign",
	    		dataType : "json",
	    		success : function(r){
	    			cb(r);
	    		}
	    	});
		}

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

		me.getSuffix = function(filename) {
		    var index = filename.lastIndexOf('.');
		    if(index > -1) return filename.substring(index + 1);
		}

		me.getRandomName = function(filename){
			return me.randomStr(20) + "." + me.getSuffix(filename);
		}

		me.cos = new CosCloud({
	        appid: "1253383298",// APPID 必填参数
	        bucket: "blackbird",//bucketName 必填参数
	        region: "tj",//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
	        getAppSign: function (callback) {//获取签名 必填参数
	        	me.getSign(function(r){
	        		callback(r.sign);
	        	});
	        },
	        getAppSignOnce: function (callback) {//单次签名，必填参数，参考上面的注释即可
	        	me.getSign(function(r){
	        		callback(r.sign);
	        	});
	        }
	    });

		me.init = function(opts){
			var defaults = {
				selector : "input[type=file]",
				myFolder : "",
				bucket : "blackbird",
				fileLimitType : [],
				fileLimitSize : 5120,
				error : function(){},
				errorCallBack : function(callback){
					alert(callback.responseJSON.message);
				},
				successCallBack : function(){
					console.log(arguments);
				},
				progressCallBack : function(){
					console.log(arguments);
				}
			},
			configs = $.extend(true, {}, defaults, opts);
			var fileInput = $(configs.selector);
			if(!fileInput.get(0)) return;

			var clearFn = function(){
				fileInput.val("");
				if(!!configs.progress()) configs.progress().style.width = "0%";
			}

			var errorCallBack = function(){
				typeof(configs.errorCallBack) == "function" && configs.errorCallBack.apply(null, arguments);
				clearFn();
			}

			var progressCallBack = function(per){
				if(!!configs.progress()) configs.progress().style.width = per * 100 + "%";
				typeof(configs.progressCallBack) == "function" && configs.progressCallBack.apply(null, arguments);
			}

			fileInput.on("change",function(e){
				var file = e.target.files[0];
				if(!file) return;
				var fileName = file.name;
				var fileType = me.getSuffix(fileName);
				if(configs.fileLimitType.indexOf(fileType) == -1) return configs.error({errorCode : -1});
				var fileSize = Math.ceil(file.size / 1024);
				if(fileSize > configs.fileLimitSize) return configs.error({errorCode : -2});

                typeof(configs.startCallBack) == "function" && configs.startCallBack();

				me.cos.uploadFile(function(){

					typeof(configs.successCallBack) == "function" && configs.successCallBack.call(null, {
						fileUpdate : arguments[0],
						fileInfo : {
							fileName : fileName,
							fileSize : fileSize
						}
					});
					clearFn();

				}, errorCallBack, progressCallBack, configs.bucket, configs.myFolder + me.getRandomName(fileName) , file, 0);
			});
		}
	}

	module.exports = uploadFn;
	
});
