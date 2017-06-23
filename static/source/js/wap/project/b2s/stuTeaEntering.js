define(function(require,exports,module){
    var utility = require("utility"),
        regs = $.formVerify.utility.regs;
    var stuTeaFn = function(){
        this.eInput = $('.e-input input');
        this.btnBox = $('.btnBox');
        this.changeTeaSure = $('#changeTeaSure');
        this.documentBox = $('#documentBox');
        this.grade = $('.grade');
        this.classBox = $('.class');
        this.add = $('.add');
        this.nAdd = $('.n-add');
        this.maskBox = $('#maskBox');
        this.popUp = $('#popUp');
        this.classList = $('#classList');
        this.textTit = $('#textTit');
        this.gradeId = $('#gradeId');
        this.classId = $('#classId');
        this.mobileId = $('#mobileId');
        this.teacherCode = $('#teacherCode');
        this.enterSure = $('#enterSure');
        this.listpopUp = $('#listpopUp');
        this.listClassId = $('#listClassId');
        this.pupupBtn = $('#pupupBtn');
        this.gFlag = false;
        this.cFlag = false;
        this._init();
        this._event();
    };
    
    stuTeaFn.prototype = {
        _init:function(){
            if(this.documentBox.height()<$(document).height()){
                this.documentBox.height($(document).height() - this.btnBox.height() -10);
            }
            
            this.btnBox.css('visibility','visible');
        },
        _event:function(){
            var that = this;
            // this.eInput.on({
            //     focus:function(){
            //         this.eInputP = $(this).parent();
            //         if(!this.eInputP.hasClass('shadow-s')){
            //             this.eInputP.addClass('shadow-s');
            //         }
            //     },
            //     blur:function(){
            //         this.eInputP = $(this).parent();
            //         this.eInputP.removeClass('shadow-s');
            //     }
            // });
            
            this.teaFn(this.grade);
            this.teaFn(this.classBox);

            this.enterSure.on('touchend',function(){
                that.grade.find('li').each(function(){
                     that.gFlag = that.isSelect.call($(this),that.gFlag);
                });
                that.classBox.find('li').each(function(){
                    that.cFlag = that.isSelect.call($(this),that.cFlag);
                });
                if(that.gFlag == false && that.cFlag == true){
                    //alert('请选择年级！');
                    that.textTit.html('请选择年级！');
                    that.pupupBtn.html('<a href="javascript:;" class="add position-v">确定</a>');
                    that.showMaskFn();

                }else if(that.cFlag == false && that.gFlag == true){
                    that.textTit.html('请选择班级！');
                    that.pupupBtn.html('<a href="javascript:;" class="add position-v">确定</a>');
                    that.showMaskFn();

                }else if(that.cFlag == false && that.gFlag == false){
                   // alert('请选择班级和年级！');
                    that.textTit.html('请选择班级和年级！');
                    that.pupupBtn.html('<a href="javascript:;"  class="add position-v">确定</a>');
                    that.showMaskFn();
                }else{
                    that.username = $('#username');
                    that.mobile = $('#mobile');
                    that.classId = $('#classId');
                    that.gradeId = $('#gradeId');
                    
                    
                        
                    $.ajax({
                        url:'/WapNew/Student/saveRecordTeacherInfo',
                        type:'post',
                        dataType:'json',
                        data:{
                            username:that.username.val(),
                            mobile:that.mobile.val(),
                            class_id:that.classId.val(),
                            grade_id:that.gradeId.val()
                        },
                        success:function(data){
                            if(data.error != 0){
                                that.textTit.html(data.msg);
                                that.pupupBtn.html('<a href="javascript:;" class="add position-v">确定</a>');
                                that.showMaskFn();

                            }else{
                                that.textTit.html('提交成功！');
                                that.pupupBtn.html('<a href="javascript:;" id="stuSure" class="add position-v">确定</a>');
                                that.showMaskFn();
                            }
                        }

                    });
                    
                }
                
            });
            this.popUp.on('touchend', '#stuSure', function(){
                window.location.href = that.btnBox.attr('data-href');
            });
            this.classList.find('li').on('touchend',function(){
                that.showMaskFn();
                that.listClassId.val($(this).attr('data-val'));
                that.listpopUp.html('是否加入<span>'+ $(this).text() +'</span>？');
                that.pupupBtn.html('<a href="javascript:;" class="n-add">暂不加入</a><a href="javascript:;" class="sure-p" id="sureAdd">确认加入</a>');
            });
           
            this.popUp.on('touchend', '.n-add,.add',function(){
                that.hiddenMaskFn();
            });
            this.popUp.on('touchend','#sureAdd',function(){
                $.ajax({
                    url:'/WapNew/Student/changeClass',
                    data:{
                        invite_code:that.getQueryString('invite_code'),
                        class_id:that.listClassId.val()
                    },
                    type:'post',
                    dataType:'json',
                    success:function(data){
                        if(data.error != 0){
                            that.showMaskFn();
                            that.listpopUp.html(data.msg+'!');
                            that.pupupBtn.html('<a href="javascript:;" class="add position-v">确定</a>');
                        }else{
                            that.listpopUp.html('转班成功，祝你在新的班级里学习愉快！');
                            that.pupupBtn.html('<a href="javascript:;" id="cSure" class="add position-v">确定</a>');
                        }
                    }
                });
            });

            this.popUp.on('touchend', '#cSure', function(){
                that.timestamp = Date.parse(new Date());
                //window.location.href = that.pupupBtn.attr('data-href')+'?t='+that.timestamp;
                window.location.assign(that.pupupBtn.attr('data-href')+'?t='+that.timestamp);
            });
            
            this.changeTeaSure.on('touchend',function(){
                if(that.teacherCode.val() != ''){
                    $.ajax({
                        url:'/WapNew/Student/inputInviteCode',
                        type:'get',
                        dataType:'json',
                        data:{invite_code:that.teacherCode.val()},
                        success:function(data){
                            if(data.error != 0){
                                that.textTit.text(data.msg);
                                that.showMaskFn();
                            }else{
                                window.location.href = '/WapNew/Student/selectClass?invite_code='+data.invite_code;
                            }
                        }
                    });
                }else{
                    that.textTit.text('邀请码不能为空！');
                    that.showMaskFn();
                }
            });
            
        },
        getQueryString:function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        hiddenMaskFn:function(){
            this.popUp.removeClass('show').addClass('hide');
            this.maskBox.removeClass('show').addClass('hide');
            
        },
        showMaskFn:function(){
            this.popUp.removeClass('hide').addClass('show');
            this.maskBox.removeClass('hide').addClass('show');
            this.maskBox.css('opacity','0.7');
        },
        teaFn:function(dom){
            var that = this;
            dom.find('li').on('touchend',function(){
                if(!$(this).hasClass('current')){ 
                    dom.find('li').removeClass('current');
                    $(this).addClass('current');
                    // var self = $(this);
                    // if(dom.hasClass('grade') == true){
                    //     that.classBox.each(function(){
                    //         if($(this).attr('data-val') == self.attr('data-val')){
                    //             that.classBox.removeClass('show').addClass('hide');
                    //             $(this).removeClass('hide').addClass('show');
                    //         }
                    //     }); 
                    // } 
                     var self = $(this); 
                     if(dom.hasClass('grade') == true){
                        that.gradeId.val(self.attr('data-grade'));
                     }else if(dom.hasClass('class') == true){
                       that.classId.val(self.attr('data-class'));
                       
                     }
                }
                
            });
        },
        isSelect:function(f){
            if(this.hasClass('current')){
                f = true;
            }
            return f;
        }



    };
    new stuTeaFn();
});