/**
 * @authors wanghuihui@51talk.com
 */
define("aboutClass",[""],function(require,exports,module){
    var AboutclassFn = function(){
        this.subLevel = $('._sub-l');
        this.titShrink = $('#tit_shrink');
        this.payShrink = $('#pay_shrink');
        this.levelShow = $('#level_show');
        this.payMode = $('#pay_mode');
        this.majorBox = $('._major-box');
        this.courseThr = $('#course_thr');
        this.lesson = $('._lesson');
        this.uintBox = $('._uint-box');
        this.infoC = $('._info-c');
        this.unitC = $('._unit-c');
        this.unit = $('._unit');
        this.lessonMode = $('#lesson-mode');
        this.toolPay = $('#tool_pay');
        this.teacherId = $('#teacher_id');
        this.ecCourseMax = $('#ec_course_max');
        this.dateTimeValue = $('#date_time');
        this.sureBtn = $('#sure_btn');
        this.infoId = $('#info_id');
        this.layerShow = $('#layer_show');
        this.layerBtn = $('#layer_btn');
        this._event();
    };
    AboutclassFn.prototype = {
        _event : function(){
            var that = this;
            //选中
            this.lesson.on('touchend',function(){
                if(!$(this).hasClass('current')){
                    $(this).parents('.info-c').find('._lesson').removeClass('current');
                    $(this).addClass('current');
                    that.courseThr.val($(this).attr('course-thr'));
                }
            });

            this.uintBox.find('.arrow').on('touchend',function(){              
                that.num = $(this).parents('._unit').index();
                if($(this).hasClass('open')){
                    $(this).removeClass('open');
                    $(this).parents('._unit').find('._sub-l').addClass('hide');
                }else{
                    that.uintBox.parents('._major-box').find('._uint-box').find('.arrow').removeClass('open');
                    $(this).addClass('open');
                    
                    that.uintBox.parents('._major-box').find('._sub-l').addClass('hide');
                    $(this).parents('._unit').find('._sub-l').removeClass('hide');
                }
            });

            this.levelShow.find('.l-arrow').on('touchend',function(){
                if($(this).hasClass('open')){
                    $(this).removeClass('open');
                    $(this).parents('._major-box').find('._unit-c').addClass('hide');
                }else{
                    that.levelShow.find('.l-arrow').removeClass('open');
                    $(this).addClass('open');
                    that.subLevel.addClass('hide');
                    $(this).parents('._info-c').find('.arrow').removeClass('open');
                    that.levelShow.find('._unit-c').addClass('hide');
                    $(this).parents('._major-box').find('._unit-c').removeClass('hide');
                }
            });
            this.titShrink.on('touchend',function(){
                that.shrinkFn.call($(this),that.levelShow);
                that.payMode.addClass('hide');
                that.payShrink.removeClass('open');

            });
            this.payShrink.on('touchend',function(){
                that.shrinkFn.call($(this),that.payMode);
                that.levelShow.addClass('hide');
                that.titShrink.removeClass('open');
                that.unitC.addClass('hide');
                that.infoC.find('.l-arrow').removeClass('open');
                that.unitC.addClass('hide');
                that.subLevel.addClass('hide');

            });
            this.lessonMode.find('div').on('touchend',function(){
                if(!$(this).hasClass('current')){
                    that.lessonMode.find('div').removeClass('current');
                    $(this).addClass('current');
                    that.toolPay.val($(this).attr('tool-data'));
                }
            });
            this.sureBtn.on('touchend',function(){
                $.ajax({
                    url:'/mobile/book/doBook',
                    type:'post',
                    data:{
                        tool:that.toolPay.val(),
                        t_id:that.teacherId.val(),
                        course_thr:that.courseThr.val(),
                        date_time:that.dateTimeValue.val(),
                        ec_course_max:that.ecCourseMax.val()
                    },
                    dataType:"json",
                    async:false,
                    success:function(data){
                        if(data.status == 0){
                            that.layerShow.show();
                            that.infoId.text(data.info);
                        }else{
                            window.location = "/mobile/book/success?appoint_id="+data.data.appoint_id;
                        }
                    }
                });
            });
            this.layerBtn.on('touchend',function(){
                that.layerShow.hide();
            });
                
        },
        //收缩控制
        shrinkFn : function(obj){
            if(this.hasClass('open')){
                obj.addClass('hide');
                this.removeClass('open');
            }else{
                obj.removeClass('hide');
                this.addClass('open');
            }
        }

    };
    new AboutclassFn();
});