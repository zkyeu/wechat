define(function(require,exports,module){
  var author = '979liyang@gmail.com';
  // Time Mapping Table
  var timeJson =  [
    ['06:00-08:00', {
      "13":["06:00","06:25"],
      "14":["06:30","06:55"],
      "15":["07:00","07:25"],
      "16":["07:30","07:55"],
      "17":["08:00","08:25"]
    }],
    ['08:30-10:30', {
      "18":["08:30","08:55"],
      "19":["09:00","09:25"],
      "20":["09:30","09:55"],
      "21":["10:00","10:25"],
      "22":["10:30","10:55"]
    }],
    ['11:00-13:00', {
      "23":["11:00","11:25"],
      "24":["11:30","11:55"],
      "25":["12:00","12:25"],
      "26":["12:30","12:55"],
      "27":["13:00","13:25"]
    }],
    ['13:30-15:30', {
      "28":["13:30","13:55"],
      "29":["14:00","14:25"],
      "30":["14:30","14:55"],
      "31":["15:00","15:25"],
      "32":["15:30","15:55"]
    }],
    ['16:00-18:00', {
      "33":["16:00","16:25"],
      "34":["16:30","16:55"],
      "35":["17:00","17:25"],
      "36":["17:30","17:55"],
      "37":["18:00","18:25"]
    }],
    ['18:30-20:30', {
      "38":["18:30","18:55"],
      "39":["19:00","19:25"],
      "40":["19:30","19:55"],
      "41":["20:00","20:25"],
      "42":["20:30","20:55"]
    }],
    ['21:00-23:30',{
      "43":["21:00","21:25"],
      "44":["21:30","21:55"],
      "45":["22:00","22:25"],
      "46":["22:30","22:55"],
      "47":["23:00","23:25"],
      "48":["23:30","23:55"]
    }]
  ];
  //Add---placeholder----IE
  if( !('placeholder' in document.createElement('input')) ){   
    $('input[placeholder],textarea[placeholder]').each(function(){    
      var that = $(this),    
      text= that.attr('placeholder');    
      if(that.val()===""){    
        that.val(text).addClass('placeholder');    
      }    
      that.focus(function(){    
        if(that.val()===text){    
          that.val("").removeClass('placeholder');    
        }    
      })    
      .blur(function(){    
        if(that.val()===""){    
          that.val(text).addClass('placeholder');    
        }    
      })    
    });    
  }   
  //Add----indexOf---IE8
  (function() {
    if (!Array.prototype.indexOf){
      Array.prototype.indexOf = function(elt /*, from*/){
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
          from += len;

        for (; from < len; from++){
          if (from in this && this[from] === elt)
            return from;
        }
        return -1;
      };
    }
  })();
  $(function() {
    //Time Filter
    function timeAreaFilter(f, c) {
      var fIndex = "";
      var cIndex = "";
      var oIndex = "";
      var oTimeItem = "";
      var arr = [];
      $.each(timeJson, function(index, item) {
        if(item[1][f]) {
          fIndex = index;
          oTimeItem = item[1][f];
        }
        if(item[1][c]) {
          cIndex = index;
        }
      });
      
      oIndex = (cIndex > fIndex)?cIndex:fIndex;
      arr.push(cIndex, oIndex, oTimeItem)//(开始Index, 当前Index, 时间数组老师渲染老师时间列表);
      return arr;
    };

    //Choose Course Item
    function ChooseCourse(day, time) {
      this.dayData = day;
      this.timeData = time;
      this.fTime = parseInt(this.dayData.favorite) || 13;
      this.cTime = parseInt(this.dayData.current_time) || 13;
      this.oTime = (this.cTime >= this.fTime)?this.cTime:this.fTime;
      this.day = $('.m-day-lst');
      this.timeList = $(".m-time-lst");
      this.timeVal = $("#time_val");
      this.timeArea = $("#time_area");
      this.timeList = $("#time_list");
      this.sexVal = $("#sex_val");
      this.sexList = $("#sex_list");
      this.advantageVal = $("#advantage_val");
      this.advantageList = $('#advantage_list');
      this.advantageBtn = $('.advantage_sure_btn');
      this.chooseData = {
        day: "",
        times: [],
        sex: "All",
        advantage: [],
        real_name: ""
      };
      this.teacherName = $("#teacher_name");
      this.advantageShowVal = [];
      this.searchBtn = $('#search_btn');
      this.loading = $(".teacher_info_loading");
      this.noTimeTips = $("#appoint_notimes_tips");
      this.teacherNone = $(".teacher_info_none");
      this.teacherContainer = $(".teacher_info_lst");
    }
    $.extend(ChooseCourse.prototype, {
      init: function() {
        this.renderDay(this.dayData.current, 'current');
        this.renderTimeAreas(this.fTime, this.cTime, true);
        this.bindEvents();
      },
      renderDay: function(data, name) {
        var that = this;
        $.each(data, function(index, item) {
          that.day.find('li').eq(index).html(item.show_time).attr('data-item', item.time);
        });
        this.day.find('li:first')[(name == 'current')? 'addClass': 'removeClass']('today');
        this.day.find('li:first').addClass('u-cur').siblings().removeClass('u-cur');
        this.day.find('li:first').trigger('click');
        this.chooseData.day = this.day.find('li:first').attr('data-item');
      },
      renderTimeAreas: function(fav, cur, today, newTime) {//喜爱时间点 当前时间点 是否今天boolean, 喜爱时间点没老师
        var that = this;
        var timeAreaArr = timeAreaFilter(fav, cur);

        this.timeArea.empty();
        renderTimeAreas(timeAreaArr, today);
        this.renderTimes(this.timeData[timeAreaArr[1]][1], today, true, newTime);
        function renderTimeAreas(data, today) {
          that.timeArea[(today)? 'addClass': 'removeClass']('today');//今天增加特殊标识
          that.timeVal.html(that.timeData[data[1]][0]);
          $.each(that.timeData, function(index, item) {  
            if(data[1] == index) {
              that.timeArea.append('<li class="f-cur" data-item='+index+'>'+item[0]+'</li>');
            } else if(data[0] <= index) {
              that.timeArea.append('<li data-item='+index+'>'+item[0]+'</li>');
            }
          });
        }
        this.v_bindEvents(this.timeArea.find('li'), 'f-cur', true, $.proxy(function(data, target) {
          var targetParent = target.parent();
          targetParent.prev().html(target.html());
          target.parents('.f-select').removeClass("f-open");
          this.renderTimes(this.timeData[data][1], (targetParent.hasClass('today') && target.index() == 0), false);
        }, this));
      },
      //(timeForm,yes or no today(boolean),from click dayList(boolean),because click dayList is different of timeAreas)；
      renderTimes: function(timesData, today, fromDayList, newTime) {//当前时间段 是否是今天 天列表点击or时间段点击 
        var that = this;
        var arrNum = [];
        var timeNum = "";
        this.timeList.empty();
        that.chooseData.times = [];
        (today)? renderTodayTimes(): renderOtherTimes();
        function renderTodayTimes() {//click Today, render today hava times;
          var oName = "";//当前时间点的K值
          oName = (fromDayList)? newTime || that.oTime: that.cTime;
          $.each(timesData, function(name, item) {
            if(that.cTime <= name) {
              if(oName == name) {
                timeNum = name;
                that.timeList.append('<li class="u-cur" data-item='+name+'>'+item[0]+'</li>');
              } else {
                that.timeList.append('<li data-item='+name+'>'+item[0]+'</li>');
              }
            }
          });
        };
        function renderOtherTimes() {//click other Days, render It's havaed times;
          $.each(timesData, function(name, item) {
            arrNum.push(parseInt(name));
          });
          var oName = "";//当前时间点的K值
          oName = (fromDayList)? that.fTime: arrNum[0];
          $.each(timesData, function(name, item) {
            if(oName == name) {
              timeNum = name;
              that.timeList.append('<li class="u-cur" data-item='+name+'>'+item[0]+'</li>');
            } else {
              that.timeList.append('<li data-item='+name+'>'+item[0]+'</li>');
            }
          });
        };

        that.chooseData.times.push(timeNum);
        this.v_bindEvents(this.timeList.find('li'), 'u-cur', false, $.proxy(function(data, target, add) {
          var dataIndex = this.chooseData.times.indexOf(data);
          if(add) {
            this.chooseData.times.push(data);
          } else {
            this.chooseData.times.splice(dataIndex, 1); 
          }
        }, this));
      },
      bindEvents: function() {
        this.timeVal.on('click', $.proxy(this.handleSelectOpenClose, this));
        this.sexVal.on('click', $.proxy(this.handleSelectOpenClose, this));
        this.advantageVal.on('click', $.proxy(this.handleSelectOpenClose, this));
        this.advantageBtn.on('click', $.proxy(this.handleSelectOpenClose, this));
        $(document).on('click', $.proxy(this.handleSelectCloseAll, this));
        this.day.on('click', '.change_day_btn', $.proxy(this.handleChangeDayBtnClick, this));
        this.searchBtn.on('click', $.proxy(this.handleSearchBtnClick, this));
        //弹层，没有时间点
        this.noTimeTips.on('click', '.close_btn', $.proxy(this.handleClosePublicMask, this));

        this.v_bindEvents(this.advantageList.find('li'), 'f-cur', false, $.proxy(function(data, target, add) {
          var dataIndex = this.chooseData.advantage.indexOf(data);
          var advantageIndex = this.advantageShowVal.indexOf(target.html());
          if(add) {
            this.chooseData.advantage.push(data);
            this.advantageShowVal.push(target.html());
          } else {
            this.chooseData.advantage.splice(dataIndex, 1); 
            this.advantageShowVal.splice(advantageIndex, 1);
          }
          var that = this;
          (function() {
            if(that.chooseData.advantage.length == 0) {
              that.advantageVal.html('外教特点');
            } else {
              var htmlVal = "";
              $.each(that.advantageShowVal, function(index, item) {
                htmlVal += (item+" ");
              });
              that.advantageVal.html(htmlVal);
            }
          })();
        }, this));
        this.v_bindEvents(this.sexList.find('li'), 'f-cur', true, $.proxy(function(data, target) {
          this.chooseData.sex = data;
          target.parent().prev().html(target.html());
          target.parents('.f-select').removeClass("f-open");
        }, this));
        this.v_bindEvents(this.day.find('li').not('.change_day_btn'), 'u-cur', true, $.proxy(function(data, target) {
          this.chooseData.day = data;
          (target.hasClass('today'))? this.renderTimeAreas(this.fTime, this.cTime, true)
                                    : this.renderTimeAreas(this.fTime, "", false);
        }, this));
      },
      v_bindEvents: function(dom, className, sRemove, callback) {
        dom['click'](function() {
          var self = $(this);
          if(className == "") {
            callback();
            return false;
          };
          if(sRemove) {
            self.addClass(className).siblings().removeClass(className);
            callback(self.attr('data-item'), self);
          } else {
            self[(!self.hasClass(className))? 'addClass': 'removeClass'](className);
            callback(self.attr('data-item') || "", self, (self.hasClass(className)));
          }
        });
      },
      handleSelectOpenClose: function(e) {
        var target = $(e.currentTarget),
            targetParents = target.parents('.f-select');
        $('.f-select').not(targetParents).removeClass('f-open');
        targetParents[(targetParents.hasClass('f-open'))?'removeClass':'addClass']("f-open");
      },
      handleSelectCloseAll: function(e) {
        var target = $(e.target);
        if(target.closest('.f-select').length == 0) {
          $('.f-select').removeClass("f-open");
        }
      },
      handleChangeDayBtnClick: function(e) {
        var target = $(e.currentTarget);
        if(!target.hasClass('prepend')) {
          target.addClass('prepend').html("< 前七天");
          this.renderDay(this.dayData.next, 'next');
        } else {
          target.removeClass('prepend').html("后七天 >");
          this.renderDay(this.dayData.current, 'current');
        }
      },
      handleSearchBtnClick: function(e) {
        this.chooseData.real_name = (this.teacherName.val() === this.teacherName.attr('placeholder')) ? "": this.teacherName.val();
        var target = $(e.currentTarget),
            oUrl = target.attr("data-url"),
            data = this.chooseData;
        if(data.times == "" || data.times == null) {
          this.noTimeTips.show();
          return;
        } else {
          this.noTimeTips.hide();
        }
        this.sendRequest(oUrl, "post", data, this.handleSendRequestBefore, this.handleSendRequestSuccess, this.handleSendRequestError);
      },
      handleClosePublicMask: function(e) {
        var target = $(e.currentTarget),
            targetParents = target.parents('.f-mask');
          targetParents.hide();
      },
      handleSendRequestBefore: function() {
        this.loading.show();
        this.teacherNone.hide();
      },
      handleSendRequestSuccess: function(res) {
        var status = res.status,
            data = res.data,
            info = res.info;
        if(status == 1) {
          renderTeacher.renderInit(data, dayData.page_size);
          this.loading.hide();
        } else {
          this.teacherNone.show();
          this.teacherContainer.empty();
        }
      },
      sendRequest: function(url, method, data, beforeSend, success, error) {
        $.ajax({
          url: url,
          type: method,
          dataType: 'json',
          data: data,
          context: this,
          beforeSend: beforeSend,
          success: success,
          error: error
        });
      }
    });

    //Render Teacher's List
    function RenderTeacher() {
      this.pagination = $("#pagination");
      this.teacherContainer = $(".teacher_info_lst");
      this.teacherInfoUrl = $("#teacher_info_url").attr('data-url');
      this.loading = $(".teacher_info_loading");
      this.teacherNone = $(".teacher_info_none");
    }
    $.extend(RenderTeacher.prototype, {
      init: function() {
        this.sendRequest(this.teacherInfoUrl, 'post', '', this.handleSendRequestBefore, this.handleSendRequestSuccess, this.handleSendRequestError);
        this.bindEvents();
      },
      bindEvents: function() {
        this.teacherContainer.on('mouseenter', '.teacher_item', $.proxy(this.handleTeacherMouseOver, this));
        this.teacherContainer.on('mouseleave', '.teacher_item', $.proxy(this.handleTeacherMouseLeave, this));
        this.teacherContainer.on('click', '.appoint_btn', $.proxy(this.handleAppointBtnClick, this));
        this.teacherContainer.on('click', '.detail_btn', function() {
          __sdonclick('click');
        });
      },
      renderInit: function(tData, showNum) {
        this.teacherData = tData;
        this.numEntries = tData.length;
        this.showNum = showNum;
        this.allPage = Math.ceil(this.numEntries/this.showNum);
        this.pagination.pagination(this.numEntries, {
          num_edge_entries: 1, //边缘页数
          num_display_entries: 4, //主体页数
          items_per_page: this.showNum,
          prev_text:'&nbsp;',
          next_text:'&nbsp;',
          callback: $.proxy(this.render, this)
        });
      },
      render: function(page_index) {
        var list = "";
        var haveNum = page_index*this.showNum;
        var max_elem = Math.min((page_index+1) * this.showNum, this.numEntries);
        var that = this;
        var rightName = "";

        $.each(this.teacherData, function(index, item) {
          rightName = ((index+1)%4 == 0)?"right":"";
          if(index >= haveNum && index < max_elem) {
            list += '<li class="teacher_item '+rightName+'">'+
                        '<div class="teacher_base">'+
                          that.renderBase(item)+
                        '</div>'+
                        '<div class="teacher_details_wrap">'+
                          '<em class="u-arrow"></em>'+
                          '<div class="teacher_details">'+
                            that.renderDetails(item)+
                          '</div>'+
                        '</div>'+
                    '</li>'
          };
        })
        this.teacherContainer.empty();
        this.teacherContainer.append(list);
        return false;
      },
      renderBase: function(item) {
        var data = '';
        data += baseInfo()+
                '<a href="javascript:;" class="appoint_btn">立即约课</a>'+
                timeList();
        return data;

        function baseInfo() {
          var info = (item.collection === 1)
                ?'<em class="heart_tag"></em>':((item.hot === 1)
                ?'<em class="hot_tag"></em>':"");
          info+=  '<div class="u-stars">'+
                   '<p class="get_stars" style="width:'+Math.floor(item.total_avg/10)*10+'%'+'"></p>'+
                  '</div>'+
                  '<div class="u-head">'+
                    '<img src="'+item.pic+'">'+
                  '</div>'+
                  '<p class="u-name">'+item.real_name+'</p>'+
                  '<p class="u-country">'+item.adds+'</p>'+
                  '<div class="honor-tags">'+
                    certs()+
                  '</div>';
          return info;

          function certs() {
            var list = '';
            $.each(item.certs, function(index, item) {
              list += '<span>'+item+'</span>';
            });
            return list;
          };
        };
        function timeList() {
          var tit = (item.free_time.length === 0)? '您选择的时间段已满': '选择上课时间';
          var list = '<div class="time_wrap">'+
                        '<div class="u-center">'+
                            '<h3 class="u-tit">'+tit+'</h3>'+
                            '<ul class="time_lst">'+
                              freeTime()+
                            '</ul>'+
                        '</div>'+
                      '</div>';
          return list;

          function freeTime() {
            if(item.free_time.length === 0) {
              return '<li><a href="'+item.detail_link+'" target="_blank">查看其它时间</a></li>'
            }
            var itemList = "";
            var linkUrl =  dayData.reserve_url+'?t_id='+item.job_id+'&date_time='+item.day+'_';
            $.each(item.free_time, function(index, item) {
              var newLinkUrl = linkUrl;
              newLinkUrl += item;
              itemList+= '<li><a href="'+newLinkUrl+'" target="_blank">'+timeAreaFilter(item)[2][0]+"-"+timeAreaFilter(item)[2][1]+'</a></li>';
            });
            return itemList;
          }
        };
      },
      renderDetails: function(item) {
        var data = '';
        data+= labels()+
               gradeList()+
               '<a href="'+item.detail_link+'" target="_blank" class="detail_btn">外教详情</a>';
        return data;

        function labels() {
          var list = '<div class="detail_lst01">';
          $.each(item.labels, function(index, item) {
            list+= '<p>'+
                    '<span class="u-num">'+item.num+'</span>'+
                    '<span class="u-text">'+item.labelName+'</span>'+
                  '</p>'
          })
          list+= '</div>';
          return list;
        };
        function gradeList() {
          var list = '<ul class="detail_lst02 clearfix">';
          $.each(item.grade_list, function(index, item) {
            var className = "";
            className = (item.status === "low")?"low":"above";
            list += '<li class="'+className+'">'+
                        '<em></em>'+
                        '<p class="u-num">'+item.compare+'</p>'+
                        '<p class="u-text">'+item.name+'</p>'+
                      '</li>'
          });
          list+= "</ul>";
          return list;
        };
      },
      handleTeacherMouseOver: function(e) {
        var target = $(e.currentTarget),
            teacherDetails = target.find(".teacher_details_wrap"),
            appointBtn = target.find(".appoint_btn"),
            timeList = target.find(".time_wrap");

          teacherDetails.show().css({opacity: '0.1'});;
          if(target.hasClass('right')) {
            teacherDetails.animate({left: "-237px", opacity: '1'}, 200);
          } else {
            teacherDetails.animate({left: "100%", opacity: '1'}, 200);
          }
      },
      handleTeacherMouseLeave: function(e) {
        var target = $(e.currentTarget),
            timeList = target.find(".time_wrap"),
            teacherDetails = target.find(".teacher_details_wrap");
        $('.teacher_details_wrap').hide().css({left:0});
        $(".time_wrap").animate({top: '100%'}, 100, function() {});
      },
      handleAppointBtnClick: function(e) {
        var target = $(e.currentTarget);
        target.next().animate({
          top: 0},
          300, function() {
        });
        $('.teacher_details_wrap').hide().css({left:0});
      },
      handleSendRequestBefore: function() {
        this.loading.show();
        this.teacherNone.hide();
      },
      handleSendRequestSuccess: function(res) {
        var status = res.status,
            data = res.data,
            info = res.info;
        if(status == 1) {
          renderTeacher.renderInit(data, dayData.page_size);
          this.loading.hide();
        } else {
          this.teacherNone.show();
        }
        if(info) {
          chooseCourse.renderTimeAreas(info, parseInt(dayData.current_time) || 13, true, info);
        }
      },
      handleSendRequestError: function() {
      },
      sendRequest: function(url, method, data, beforeSend, success, error) {
        $.ajax({
          url: url,
          type: method,
          dataType: 'json',
          data: data,
          context: this,
          beforeSend: beforeSend,
          success: success,
          error: error
        });
      }
    });
    
    var chooseCourse = new ChooseCourse(dayData, timeJson);
    chooseCourse.init();
    var renderTeacher = new RenderTeacher();
    renderTeacher.init();

    //Other Code  Write there
    function OtherModule() {
      this.scanCode = $('.scan-code');
    }
    $.extend(OtherModule.prototype, {
      init: function() {
        this.bindEvents();
      },
      bindEvents: function() {
        (this.scanCode.length)?this.scanCodePosition():"";
      },
      scanCodePosition: function() {
        var that = this;
        var scanCode = that.scanCode.offset().top;
        $(window).on('scroll', function() {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          that.scanCode[(scrollTop >= scanCode)?'addClass': 'removeClass']('scan-code-fixed');  
        });
      }
    })
    var otherModule = new OtherModule();
    otherModule.init();
  });
});