/**
 * @authors wanghuihui@51talk.com
 */
define("appointment",[""],function(require,exports,module){
    var AppointmentFn = function(){
        //tab
        this.tab = $('#tab');
        //老师列表
        this.teaL = $('._tea-l');
        //星星
        this.yellowS = $('._yellow-s'); 
        //筛选按钮
        this.filterId = $('#filterId');
        //吸顶tab
        this.fixId = $('#fixId');
        this.flag = true;
        this.rightC = $('._right-c');
        this.currentNum = 0;
        //筛选弹窗单选元素
        this.sexId = $('#sexId');
        this.classId = $('#classId');
        //筛选弹窗确定按钮
        this.sureBtn = $('#sureBtn');
        //弹窗
        this.showTipsLayer =$('#showTipsLayer');

        this._event();

        this.moreList();
    };
    AppointmentFn.prototype = {
        _event : function(){
            var that = this;

            //tab切换
            this.tab.find('li').on('touchend',function(){
                if(!$(this).hasClass('current')){
                    that.flag = true;
                    that.currentNum = $(this).index();
                    $(this).parent().find('li').removeClass('current');
                    $(this).addClass('current');
                    that.teaL.css('display','none');
                    that.teaL.eq($(this).index()).show();
                    //列表加载列多
                    that.moreList();
                }
            });

            //star渲染
            this.yellowS.each(function(i){
                that.scoreValue = Number($(this).attr('data-score'));
                that.starHtml = that.showStar(that.scoreValue);
                $(this).html(that.starHtml);
            });

            //获取列表高度
            this.listHeight = this.teaL.height();

            //设置列表高度
            $("._tea-l").css("height",$(window).height() - this.fixId.height()+"px");
            
            //筛选弹窗性别
            this.sexId.find('i').on('touchend',function(){
                that.showTipFn(that.sexId.find('i'),$(this));
            });

            //筛选弹窗上课方式
            this.classId.find('i').on('touchend',function(){
                that.showTipFn(that.classId.find('i'),$(this));
            });

            //筛选弹窗确定按钮
            this.sureBtn.on('touchend',function(){
                that.showTipsLayer.hide();
            });

            //筛选按钮
            this.filterId.on('touchend',function(){
                that.showTipsLayer.show();
            });
            
        },

        //筛选弹窗单选按钮
        showTipFn : function(obj,e){
            if(!e.hasClass('s-current')){
                    obj.removeClass('s-current');
                    e.addClass('s-current');
                }
        },

        //列表上滑加载更多
        moreList:function(){
            var that = this;
            $('#tea'+this.currentNum).on('touchend',function(){
                this.loadList = '';
                if(that.flag){
                    that.documentHeight = $(window).height();
                    that.scrollTop = that.fixId.height();
                    if(that.documentHeight - that.scrollTop + $(this).scrollTop() >= that.listHeight){
                        //加载更多
                        that.flag = false;
                        that.htmlFn();
                    }
                }
            });
        },

        //绘制老师列表
        htmlFn : function(){
            this.loadList = 'ss'
            // '<li>'+
            //             '<div class="tea-info">'+
            //                 '<span class="tea-icon">'+
            //                     '<img src="<%= imagessrc%>teacher01.png"/>'+
            //                     '<i>已收藏</i>'+
            //                 '</span>'+
            //                 '<div class="tea-des">'+
            //                     '<p class="tea-name">Sara LI</p>'+
            //                     '<div class="score">'+
            //                         '<span class="score-v">评分：95</span>'+
            //                         '<div class="star-box">'+
            //                             '<div class="yellow-s _yellow-s" data-score = "95">'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="half-star-g"></span>'+
            //                             '</div>'+
            //                             '<div class="grey-s">'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="star-g"></span>'+
            //                                 '<span class="star-g"></span>'+
            //                             '</div>'+
            //                         '</div>'+
            //                     '</div>'+
            //                     '<p class="level">适合初级学员</p>'+
            //                 '</div>'+
                            
            //             '</div>'+
            //             '<a class="appointment-btn" href="javascript:;">'+
            //                ' 预约'+
            //             '</a>'+
            //         '</li>';
            $('#tea'+this.currentNum).find('ul').append(this.loadList);
        },

        //老师得分star计算
        showStar : function(value){
            this.scroeHtml = '';
            if(value >= 0 && value<= 10){
                this.scroeHtml = '<span class="half-star-g"></span>';
            }else if(value > 10 && value <= 20){
                this.scroeHtml = '<span class="star-g"></span>';
            }else if(value > 20 && value <= 30){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="half-star-g"></span>';
            }else if(value > 30 && value <= 40){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="star-g"></span>';
            }else if(value > 40 && value <= 50){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="half-star-g"></span>';
            }else if(value > 50 && value <= 60){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>';
            }else if(value > 60 && value <= 70){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="half-star-g"></span>';
            }else if(value > 70 && value <= 80){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>';
            }else if(value > 80 && value <= 90){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="half-star-g"></span>';
            }else if(value > 90 && value <= 100){
                this.scroeHtml = '<span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>\
                    <span class="star-g"></span>';
            }
            return this.scroeHtml;
        }
    };
    new AppointmentFn();
    //选择时间
    (function ($) {
        var nowDate = new Date(),
            nowHours = nowDate.getHours()+1,
            time_num = 23.5 - nowHours;
        $.fn.mtimer = function(opts){
            var defaults = {
                dateStart : new Date(),
                dateNum : 10,
                timeStart : nowHours,
                timeNum : time_num,
                onOk : null,
                onCancel : null,
            };
            var option = $.extend(defaults, opts);

            var input = $(this),
                itemHeight = 48;
            var picker = {
                init : function(){
                    var _this = this;

                    _this.renderHTML();

                    var container = $('.mt_poppanel'),
                        mpDate = $('.mt_date', container),
                        mpTime = $('.mt_time', container);
                    //初始化date
                    var dateStr = '',
                        dateStart = option.dateStart,
                        sYear = dateStart.getFullYear(),
                        sMonth = dateStart.getMonth(),
                        sDate = dateStart.getDate();
                    for(var i=0; i<option.dateNum; i++){
                        var nextDate = new Date(sYear, sMonth, sDate+i),
                            m = nextDate.getMonth()+1,
                            d = nextDate.getDate(),
                            da = nextDate.getDay(),
                            w = '日一二三四五六'.charAt(da),
                            sel = i == 0 ? 'selected' : '';
                        if(m < 10){
                            m = '0' + m;
                        }
                        if(d < 10){
                            d = '0' + d;
                        }
                        dateStr += '<li class="'+sel+'" data-date="'+m+'-'+d+'">'+m+'月'+d+'日&nbsp;星期'+w+'</li>';
                    }
                    dateStr += '<li></li><li></li>';
                    mpDate.find('ul').append(dateStr);

                    //初始化time
                    var timeStr = '';
                    for(var j=0; j<option.timeNum; j++){
                        var t = option.timeStart + j,
                            sel = j == 0 ? 'selected' : '';
                        timeStr += '<li class="'+sel+'" data-time="'+t+':00">'+t+':00</li><li data-time="'+t+':30">'+t+':30</li>';
                        if(j==option.timeNum - 1){
                            timeStr += '<li data-time="'+(t+1)+':00">'+(t+1)+':00</li>';
                        }
                    }
                    timeStr += '<li></li><li></li>';
                    mpTime.find('ul').append(timeStr);

                    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                    //初始化scroll
                    var elHeight = itemHeight;
                    var dateScroll = new IScroll('.mt_date', {
                        snap : 'li',
                        probeType : 2,
                        tap : true
                    });
                    dateScroll.on('scroll', function(){
                        _this.updateSelected(mpDate, this);
                    });
                    dateScroll.on('scrollEnd', function(){
                        _this.updateSelected(mpDate, this);
                    });
                    var timeScroll = new IScroll('.mt_time', {
                        snap : 'li',
                        probeType : 2,
                        tap : true
                    });
                    timeScroll.on('scroll', function(){
                        _this.updateSelected(mpTime, this);
                    });
                    timeScroll.on('scrollEnd', function(){
                        _this.updateSelected(mpTime, this);
                    });

                    this.dateScroll = dateScroll;
                    this.timeScroll = timeScroll;

                    //初始化点击input事件
                    input.on('tap', function(){
                        if(container.hasClass('show')){
                            _this.hidePanel();
                        }
                        else{
                            _this.showPanel();
                        }
                    });

                    //初始化点击li
                    mpDate.find('li').on('tap', function(){
                        _this.checkDate($(this));
                    });
                    mpTime.find('li').on('tap', function(){
                        _this.checkTime($(this));
                    });

                    //初始化点击事件
                    $('.mt_ok', container).on('tap', function(){
                        var date = mpDate.find('.selected').data('date');
                        var time = mpTime.find('.selected').data('time');
                        input.val(date + ' ' + time);
                        _this.hidePanel();
                        option.onOk && typeof option.onOk=='function' && option.onOk(container);
                    });
                    $('.mt_cancel', container).on('tap', function(){
                        _this.hidePanel();
                        option.onCancel && typeof option.onCancel=='function' && option.onCancel(container);
                    });
                    $('.mt_mask').on('tap', function(){
                        _this.hidePanel();
                    });

                    //初始化原有的数据
                    this.setValue();
                },
                renderHTML : function(){
                    var stime = option.timeStart + ':00';
                    var etime = option.timeStart + option.timeNum + ':00';
                    var html = '<div class="mt_mask"></div><div id="mtimer" class="mt_poppanel"><div class="mt_panel"><h3 class="mt_title">请选择时间</h3><div class="mt_body"><div class="mt_date"><ul></ul></div><div class="mt_time"><ul></ul></div><div class="mt_indicate"></div></div><div class="mt_confirm"><a href="javascript:void(0);" class="mt_ok">确定</a> <a href="javascript:void(0);" class="mt_cancel">取消</a></div></div></div>';
                    $(document.body).append(html);
                },
                updateSelected : function(container, iscroll){
                    var index = (-iscroll.y) / itemHeight + 2;
                    var current = container.find('li').eq(index);
                    current.addClass('selected').siblings().removeClass('selected');
                },
                showPanel : function(container){
                    $('.mt_poppanel, .mt_mask').addClass('show');
                },
                hidePanel : function(){
                    $('.mt_poppanel, .mt_mask').removeClass('show');
                },
                setValue : function(){
                    var value = input.val();
                    var dateArr = value.split(' '),
                        date = dateArr[0],
                        time = dateArr[1],
                        dateItem = $('.mt_date li[data-date="'+date+'"]'),
                        timeItem = $('.mt_time li[data-time="'+time+'"]');
                    this.checkDate(dateItem);
                    this.checkTime(timeItem);

                },
                checkDate : function(el){
                    var target = el.prev('li').prev('li');
                    this.dateScroll.scrollToElement(target[0]);
                },
                checkTime : function(el){
                    var target = el.prev('li').prev('li');
                    this.timeScroll.scrollToElement(target[0]);
                }
            }
            picker.init();
            return picker;
        }
        return $.fn.mtimer;
    })(Zepto);

    $('#picktime').mtimer();

});
