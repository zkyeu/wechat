define(function(require, exports, module) {
	var tab = $('.l-list li'),
		switchElem = $('.les-list'),
		tabType = null;
	tab.on('click', function() {
		var _self = $(this),
			index = _self.index();
		tabType = _self.data('type');
		_self.addClass('cont').siblings().removeClass('cont');
		switchElem.eq(index).show().siblings('.les-list').hide();
	});
  //添加图片
  function Uploader(options){
    this.configs = $.extend({
        fileinput:"#fileinput",
        btn1:"#upload",
        btn2:"#btn2",
        maxTotal:3,
        url:"/penalty_appeal/upload",
        maxSize:10000000000,
        isHide:true,//大于上传限制，隐藏按钮
        type:"image",//上传文件类型
        callback:function(){
          var file = arguments[0];
            var galleryId = "gallery";
            var gallery = document.getElementById(galleryId);
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                throw "File Type must be an image";
            }
            $(".word").hide();
            $("#gallery").show();
            var li =$("<li/>");
            var flag = arguments[1];
            li.attr('flag',flag);
            var img = document.createElement("img");
            img.file = file;
            li.append($(img));
            li.append("<div class='uploading'>uploading...</div>");
            $("#gallery ul").append(li);
            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
        }
    },options);
    this.init();
  }
  Uploader.prototype={
      init:function(){
          this.bindEvents();
      },
      bindEvents:function(){
        var self = this;
        $(this.configs.fileinput).on("change",function(){
          var files = this.files;
          if(files.length>self.configs.maxTotal){
              alert("上传文件超出最大限制数目");
              return;
          }
         
          for(var i=0; i<files.length; i++){
            var name = this.files[i].name;
            var index = name.lastIndexOf('.');
            var prefix = name.slice((index+1));
            if(index<0){
              alert('please upload JPG,PNG,JPEG!');
              return;
            }
            if(prefix=="png" || prefix=="jpg" || prefix =="jpeg" || prefix=="PNG" || prefix=="JPG" || prefix =="JPEG" ){
               
            }else{
               alert('please upload JPG,PNG,JPEG!');
                return;
            }
              
           }
          for(var i=0; i<files.length; i++){
              if(this.files[i].size>self.configs.maxSize){
                  alert("上传文件大小超过"+(self.configs.maxSize/1024/1024).toFixed(2)+"M");
                  return;
              }
              
           }

          self.configs.maxTotal = self.configs.maxTotal - files.length;
           if(self.configs.maxTotal<=0 && self.configs.isHide){
                  $(self.configs.btn1).hide();
                  $(self.configs.btn2).hide();
           }else if(self.configs.isHide){
                  $(self.configs.btn1).hide();
                   $(self.configs.btn2).show();
           }
           for(var i=0; i<files.length; i++){
              var flag = "img"+new Date().getTime();
              self.configs.callback(this.files[i],flag);
              self.uploadFile(this.files[i],flag);
           } 
        });
        
        $(this.configs.btn1).on("click",function(){
            $(self.configs.fileinput).click();
        });
        $(this.configs.btn2).on("click",function(){
            
            $(self.configs.fileinput).click();
        });
	    },
	    uploadFile:function(file,flag){
	      var url = this.configs.url;
	      var xhr = new XMLHttpRequest();
	      var fd = new FormData();
	      xhr.open("POST", url, true);
	      xhr.onreadystatechange = function() {
	           if (xhr.readyState == 4 && xhr.status == 200) {
                    // Every thing ok, file uploaded
                    console.log(xhr.responseText); // handle response.
                     var data = eval("(" + xhr.responseText +")");
                    if (data.status != 1) {
                        alert(data.info);
                    } else {
                       if ($("#proof").length > 0) {
                          var proof = $("#proof").val();
                          if (proof != '') {
                             $("#proof").val(proof + "," + data.info);
                          } else {
                             $("#proof").val(data.info);
                          }

                          $("li[flag='"+data.data+"']").find('.uploading').remove();
                        }
                     }
        
               }
	      };
	      fd.append("upload_file", file);
        fd.append('flag',flag);
	      xhr.send(fd);
	    }
  }
  var upload =  new Uploader({btn1:"#btn1",btn2:"#btn2",maxTotal:3});
  //下拉
  var drop = {
    down: function(elem, e) {
      var e = e || window.event,
        _self = $(this);
      e.stopPropagation();
      _self.addClass('ched').siblings().removeClass('ched');
      elem.toggle();
    },
    up: function(full, elem) {
      var _self = $(this);
      _self.addClass('ched').siblings().removeClass('ched');
      full.val(_self.html());
      elem.toggle();
    }
  };
  $('.les-lt .select').on('click', function(e) {
    drop.down.call(this, $(".l-slt"), e)
  });
  $(".l-slt li").on('click', function() {
    drop.up.call(this, $(".select .selt"), $('.l-slt'));
  });
  $('.lesson-audit__select .select').on('click', function(e) {
    drop.down.call(this, $(".l-slt"), e)
  });
  //鼠标经过显示大图
  var bigImgSrc = null;
  var showBigPic = {
    over: function(e) {
      var _self = $(this),
          bigImgSrc = _self.find('img').attr('data-src'),
          photoViewer = $('<div class="photo-viewer"><img src='+ bigImgSrc +'></div>');
        $('body').append(photoViewer);
        photoViewer.show();
      },
    out: function() {
      $('.photo-viewer').remove();
    }
  }
  $('.uplist li').mouseover(function(e) {
    showBigPic.over.call(this, e);
  });
  $('body').on('mouseout', '.photo-viewer', function() {
    showBigPic.out();
  })
  // 弹窗拖拽
  var drag = {
    fnDown: function(e, elem) {
      var e = e || window.event,
          target = e.srcElement ? e.srcElement : e.target;
      var disX = e.clientX - elem.offsetLeft,
          disY = e.clientY - elem.offsetTop;
      if (target.className == 'lesson-audit__record') {
        return false;
      }
      document.onmousemove = function(e){
        var e = e || window.event;
        drag.fnMove(e, disX, disY, elem);
      }
    },
    fnMove: function(e, posX, posY, elem) {
      var offsetLeft = e.clientX - posX,
          offsetTop = e.clientY - posY,
          winW = document.documentElement.clientWidth || document.body.clientWidth,
          winH = document.documentElement.clientHeight || document.body.clientHeight,
          maxW = winW - elem.offsetWidth,
          maxH = winH - elem.offsetHeight;
      if ( offsetLeft < 0) {
        offsetLeft = 0
      } else if (offsetLeft > maxW) {
          offsetLeft = maxW;
      };
      if (offsetTop < 0) {
        offsetTop = 0;
      } else if (offsetTop > maxH) {
        offsetTop = maxH;
      };
      elem.style.top = offsetTop + 'px';
      elem.style.left = offsetLeft + 'px';
      elem.style.margin = 0;
    },
    fnUp: function() {
      document.onmousemove = document.onmouseup = null;
    }
  };
  var lessonAudit = document.getElementById('lesson-audit');
  if (lessonAudit) {
    lessonAudit.onmousedown = function(e) {
      drag.fnDown(e, lessonAudit);
    }
    lessonAudit.onmouseup = drag.fnUp;
  }
  
  // 点击弹窗外的区域关闭弹窗
  var closeDialog = function(e, closeElem) {
    var e = e || window.event,
        target = e.srcElement ? e.srcElement : e.target;
    closeElem.hide();
  };
  $('.lesson-audit .lesson-audit__close').on('click', function(e) {
    closeDialog(e, $('#lesson-audit'));
  });
  $('#lesson-audit').on('click', function(e) {
    e.stopPropagation();
  });
  $('#layer .close').on('click', function(e) {
    closeDialog(e, $('.layer'));
  });
  $('#layer').on('click', function(e) {
    e.stopPropagation();
  });
  $(document).click(function(e){
    $(".l-slt").hide();
    closeDialog(e, $('#lesson-audit'));
    closeDialog(e, $('#layer'));
  })
})