define(function(require, exports, module) {
  var click = false,
      newLink = "";
      //防止连续抽奖
  var canLottery = true;
  var scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
  $('.mask').height(scrollHeight)
  //点击抽奖
  var lottery = {
      index: 0, //当前转动到哪个位置，起点位置
      count: 0, //总共有多少个位置
      timer: 0, //setTimeout的ID，用clearTimeout清除
      speed: 20, //初始转动速度
      times: 0, //转动次数
      cycle: 40, //转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: 0, //中奖位置
      init: function(className) {
          if ($("." + className).find(".prize-item").length > 0) {
              var $lottery = $("." + className);
              var $units = $lottery.find(".prize-item");
              this.obj = $lottery;
              this.count = $units.length;
              $lottery.find(".prize-" + this.index).addClass("prize-current");
          }
      },
      roll: function() {
          var index = this.index;
          var count = this.count;
          var lottery = this.obj;
          $(lottery).find(".prize-" + index).removeClass("prize-current");
          index += 1;
          if (index > count - 1) {
              index = 0;
          }
          $(lottery).find(".prize-" + index).addClass("prize-current");
          this.index = index;
          return false;
      },
      stop: function(index) {
          this.prize = index;
          return false;
      }
  };
  function roll() {
      lottery.times += 1;
      lottery.roll();
      var prize_site = $(".sudoku").attr("prize_site");
      if (lottery.times > lottery.cycle + 10 && lottery.index == prize_site) {
          canLottery = true;
          if(prize_site == 4) {
              var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
              var clientHeight = (document.body.clientHeight || document.documentElement.clientHeight) / 2;
              var sTop = scrollTop > 0 ? scrollTop : 0;
              setTimeout(function() {
                  $('.mask').css('display','block');
                  $('.thanks-dialog').css('top',  sTop + clientHeight +'px');
                  $('.thanks-dialog').show();
              }, 1000);
          } else {
               setTimeout(function(){
                  window.location.href = newLink;
              }, 1000);
          }
          clearTimeout(lottery.timer);
          lottery.prize = -1;
          lottery.times = 0;
          click = false;

      } else {
          if (lottery.times < lottery.cycle) {
              lottery.speed -= 10;
          } else if (lottery.times == lottery.cycle) {
              var index = Math.random() * (lottery.count) | 0;
              lottery.prize = index;
          } else {
              if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                  lottery.speed += 110;
              } else {
                  lottery.speed += 50;
              }
          }
          if (lottery.speed < 40) {
              lottery.speed = 40;
          }
          lottery.timer = setTimeout(roll, lottery.speed);
      }
      return false;
  }
  $(function() {
    lottery.init('sudoku');
    var residueDegree = $(".top-container .count").find("em");
    //还需要写一层限制
    function getScrollTop() {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      return scrollTop > 0 ? scrollTop : 0;
    }
    function getClientHeight() {
      var clientHeight = (document.body.clientHeight || document.documentElement.clientHeight) / 2;
      return clientHeight;
    }
    // ----------------- 抽奖动作开始 ---------------------
    $(".sudoku .default").click(function() {
        var that = $(this),
            url = $(this).data("url"),
            firstPhoneTips = $("#first_phone"),
            totalPrizeTimes = parseInt(residueDegree.text()),
            scrollTop = getScrollTop(),
            clientHeight = getClientHeight();
        if(totalPrizeTimes <= 0) {
          $('.mask').css('display','block');
          console.log(scrollTop+ clientHeight)
          $('.count-dialog').css('top', (scrollTop + clientHeight) +'px');
          $('.count-dialog').show();
          return false;
        }
        //填写手机号弹层是否出现 1 出现 0不出现
        if(firstPhoneTips.val() == "1") {
            $('.mask').css('display','block');
            $('.tel-dialog').find('#tel').val('');
            $('.tel-dialog').find('.error').remove();
            $('.tel-dialog').css('top', scrollTop + clientHeight +'px');
            $(".tel-dialog").show();
            return false;
        }
        // if(totalPrizeTimes === 0) {
        //   $('.mask').css('display','block');
        //   $('.count-dialog').show();
        // }
        if(canLottery) {
            //可以抽奖
            lottery.speed = 100;
            $.ajax({
                type: "post",
                dataType: "json",
                url: url,
                beforeSend: function () {
                   canLottery = false;
                },
                success:function(res) {
                    var times = res.data.last_times;
                    residueDegree.text(times);
                    if(res.status == 1){
                        $(".sudoku").attr("prize_site",res.data.angle-1);
                        newLink = res.data.url;
                        roll();
                    }else {
                        canLottery = true;
                        if(times == 0) {
                            $('.mask').css('display','block');
                            $(".tel-dialog").show();
                        } else {
                            alert(res.info);
                        }
                    }
                }
            });
        }
    });
  })
  // ---------------- 点击抽奖动作结束 -------------------
  // ---------------- 定义验证规则 -----------------------
  var validRule = {
      isNoEmpty: function(value) {
          if(!value) {
              return false;
          } else {
              return true;
          }
      },
      passwordVal: function(value) {
          var reg = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
          if(!reg.test(value)) {
              return false;
          } else {
              return true;
          }
      },
      isMobile: function(value) {
          var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
          if(!reg.test(value)) {
              return false;
          } else {
              return true;
          }
      },
      isCode: function(value) {
          var reg = /^\d{6}$/;
          if(!reg.test(value)) {
              return false;
          } else {
              return true;
          }
      }
  };
  // ------------------- 验证规则结束 -------------------------
  // ------------------- 页面弹窗操作开始 ---------------------
  function Page() {
    // ----------- 定义的弹窗 -------------
    this.telDialog = $('.tel-dialog');
    this.thanksDialog = $('.thanks-dialog');
    this.countDialog = $('.count-dialog');
    this.shareDialog = $('.share-dialog');
    this.helpDialog = $('.help-dialog');
    this.helpDialogApp = $('.help-dialog-app');
    this.helpSuccessDialog = $('.help-success-dialog');
    this.mask = $('.mask');
    // ------------ 结果页弹窗 --------------
    this.resultShareDialog = $('.share-dialog');
    this.resultShareDialogApp = $('.share-dialog-app');
    this.resultCrowdDialog = $('.select-crowd__dialog');
    this.resultSimulateSelect = this.resultCrowdDialog.find('.simulate-select');
    this.resultSimulateSelectText = this.resultCrowdDialog.find('.simulate-select__text');
    this.resultSimulateSelectSure = this.resultCrowdDialog.find('.btn');
    this.resultDropDown = this.resultCrowdDialog.find('.drop-down__list');
    this.resultMailDialog = $('.mail-info__dialog');
    this.resultMailDialogName = this.resultMailDialog.find('#name');
    this.resultMailDialogTel = this.resultMailDialog.find('#tel');
    this.resultMailDialogAddress = this.resultMailDialog.find('#address');
    this.resultMailDialogBtn = this.resultMailDialog.find('.btn');
    this.resultHelpBtn = $('.result .btn-wrap .help-btn');
    this.resultContinueBtn = $('.result .btn-wrap .continue-btn');
    this.alertType = $('#alert_type');
    // --------- 弹窗关闭 ---------------
    this.telDialogClose = this.telDialog.find('.close');
    this.thanksDialogClose = this.thanksDialog.find('.close');
    this.countDialogClose = this.countDialog.find('.close');
    this.shareDialogClose = this.shareDialog.find('.btn');
    this.helpDialogClose = this.helpDialog.find('.close');
    this.helpSuccessDialogClose = this.helpSuccessDialog.find('.close');

    // ----------- 填写手机号弹窗操作 --------------
    this.telDialogGetCode = this.telDialog.find('.get-code');
    this.tel = this.telDialog.find('#tel');
    this.telWrap = this.telDialog.find('.tel');
    this.code = this.telDialog.find('#code');
    this.codeWrap = this.telDialog.find('.code');
    this.telDialogSure = this.telDialog.find('.submit');
    // ---------- 没有抽奖次数弹窗操作 -------------------
    this.countDialogNumber = this.countDialog.find('.count');
    // ---------- 赠送成功开始抽奖 -------------------
    this.beginDraw = this.helpSuccessDialog.find('.go');
    // ---------- 送给好友抽奖机会 -------------------
    this.helpDialogGive = this.helpDialog.find('.give');
    // ---------- 中奖动态 ------------
    this.trendList = $('.trends .trends-list ul');

    // 抽奖操作
    this.helpSubmit = $('.help-submit');
    this.drawBtn = $('.sudoku .default');
    this.drawCount = $(".top-container .count").find("em");
    this.shareDialogApp = $('.share-dialog-app');
    this.shareDialogAppClose = this.shareDialogApp.find('.share-dialog-app__cancel');
    this.isApp = $('#is_app');
    this.isHeadImg = $('#is_headimg');
    this.isSend = $('#is_send');
    this.openId = $('#open_id');
    this.firstPhone = $('#first_phone');
  }
  $.extend(Page.prototype, {
    init: function() {
      var that = this;
      setInterval( () => {
        that.trendsAutoSlide();
      }, 2000);
      this.showHelpDialogHandler();
      this.alertTypeAgeHandler();
      this.otherBrowers();
      this.bindEvents();
    },
    otherBrowers: function() {
      var cWidth = document.body.clientWidth || document.documentElement.clientWidth;
      var fontSize = document.getElementsByTagName('html')[0].style.fontSize;
      if(cWidth === 360 && fontSize != '36px') {
        document.getElementsByTagName('html')[0].style.fontSize = '48px';
      }
    },
    showHelpDialogHandler: function() {
      var isApp = this.isApp.val();
      var isSend = this.isSend.val();
      var isHeadImg = this.isHeadImg.val();
      if(isSend === '1' && isHeadImg === '0') {
          this.mask.css('display','block');
          this.helpDialogApp.show();
          document.body.scrollTop = document.documentElement.scrollTop = 0;
      } else if(isSend === '1' && isHeadImg === '1'){
        this.mask.css('display','block');
        this.helpDialog.show();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    },
    // ------------------- 结果页 ------------------
    alertTypeAgeHandler: function() {
      if(this.alertType.length > 0) {
        var type = this.alertType.val();
        if(type === 'age') {
          this.mask.css('display','block');
          this.resultCrowdDialog.show();
        } else if(type === 'address') {
          this.mask.css('display','block');
          this.resultMailDialog.show();
        }
      }
    },
    trendsAutoSlide: function() {
      let _self = this;
      let liHeight = this.trendList.find('li').height();
      let firstLi = this.trendList.find('li').eq(0);
      let promise = new Promise((resolve, reject) => {
        resolve(function() {
          _self.trendList.css({'transform': 'translateY(-'+liHeight+'px)'})
        });
      }).then(function(resolve) {
        _self.trendList.css({'transform': 'translateY(0)'});
        firstLi.appendTo(_self.trendList);
      }).catch(function(err) {
        console.log(err);
      })
    },
    bindEvents: function() {
      this.drawBtn.on('click', $.proxy(this.drawCountHandler, this));
      this.helpSubmit.on('click', $.proxy(this.shareDialogHandler, this));
      this.shareDialogApp.on('click', 'a', $.proxy(this.hideShareDialogApp, this));
      this.shareDialogAppClose.on('click', $.proxy(this.shareDialogAppCloseHandler, this));
      // ------------- 手机号验证 ---------------
      this.tel.on('blur', $.proxy(this.validateTelHandler, this));
      this.tel.on('focus', $.proxy(this.validateFocusHandler, this));
      this.telDialogSure.on('click', $.proxy(this.validateTelSureHandler, this));
      // ------------- 验证码验证 ---------------
      this.telDialogGetCode.on('click', $.proxy(this.getCodeHandler, this));
      this.code.on('blur', $.proxy(this.validateCodeHandler, this));
      this.code.on('focus', $.proxy(this.validateFocusHandler, this));
      // ----------------------   关闭弹层操作 -----------------------
      this.telDialogClose.on('click', $.proxy(this.closeTelDialogHandler, this));
      this.thanksDialogClose.on('click', $.proxy(this.closeThanksDialogHandler, this));
      this.countDialogClose.on('click', $.proxy(this.closeCountDialogHandler, this));
      this.shareDialogClose.on('click', $.proxy(this.closeShareDialogHandler, this));
      this.helpDialogClose.on('click', $.proxy(this.closeHelpDialogHandler, this));
      this.helpDialogApp.on('click', '.close', $.proxy(this.closeHelpDialogAppHandler, this));
      this.helpSuccessDialogClose.on('click', $.proxy(this.closeHelpSuccessDialogHandler, this));
      this.beginDraw.on('click', $.proxy(this.closeHelpSuccessDialogHandler, this));
      // ---------------------  赠送抽奖机会 -----------------------------
      this.helpDialogGive.on('click', $.proxy(this.giveLotteryHandler, this));
      this.helpDialogApp.on('click', '.give', $.proxy(this.giveLotteryHandler, this));
      // --------------------- 结果页操作 --------------------------------
      this.resultHelpBtn.on('click', $.proxy(this.resultShareDialogHandler, this));
      this.resultContinueBtn.on('click', $.proxy(this.resultContinueHandler, this));
      this.resultSimulateSelect.on('click', $.proxy(this.resultSimulateSelectHandler, this));
      this.resultDropDown.on('click', 'li', $.proxy(this.resultDropDownHandler, this));
      this.resultSimulateSelectSure.on('click', $.proxy(this.resultSimulateSelectSureHandler, this));
      this.resultMailDialogBtn.on('click', $.proxy(this.resultMailDialogHandler, this));
      this.resultMailDialog.on('click', '.close', $.proxy(this.resultMailDialogClose, this));
      this.resultCrowdDialog.on('click', '.close', $.proxy(this.resultCrowdDialogClose, this));
      this.resultMailDialogName.on('blur', $.proxy(this.resultMailDialogValidate, this));
      this.resultMailDialogTel.on('blur', $.proxy(this.resultMailDialogValidate,this));
      this.resultMailDialogAddress.on('blur', $.proxy(this.resultMailDialogValidate,this));
    },
    errorTipsHandler: function(text) {
      var errorWrap = '<section class="error">'+ text +'</section>';
      return errorWrap;
    },
    hideShareDialogApp: function() {
      this.mask.hide();
      $('.share-dialog-app').hide();
    },
    drawCountHandler: function() {
      var count = this.drawCount.text();
      if(count === 0) {
        this.mask();
        this.countDialog.show();
      }
    },
    getScrollTopHandler: function() {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      return scrollTop > 0 ? scrollTop : 0;
    },
    shareDialogHandler: function() {
      var isApp = this.isApp.val();
      var firstPhone = this.firstPhone.val();
      var scrollTop = this.getScrollTopHandler();
      var clientHeight = (document.body.clientHeight || document.documentElement.clientHeight) / 2;
      if(firstPhone === '1') {
        this.mask.css('display','block');
        this.tel.val('');
        this.telDialog.css('top', scrollTop + clientHeight +'px');
        this.telDialog.show();
        return false;
      }
      if(isApp === "1") {
        this.mask.css('display','block');
        this.shareDialogApp.css('display','block');
      } else {
        this.mask.css('display','block');
        this.shareDialog.show();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    },
    validateTelHandler: function() {
      var val = this.tel.val();
      if(!validRule.isNoEmpty(val)) {
        var errorText = this.errorTipsHandler('请输入手机号');
        $(errorText).appendTo(this.telWrap);
      } else if(!validRule.isMobile(val)) {
        var errorText = this.errorTipsHandler('请输入正确的手机号');
        $(errorText).appendTo(this.telWrap);
      }
    },
    validateTelSureHandler: function(e) {
      this.telDialog.find('.error').remove();
      var target = $(e.currentTarget);
      var mobile = this.tel.val();
      var code = this.code.val();
      if(!validRule.isNoEmpty(mobile)) {
        var errorText = this.errorTipsHandler('请输入手机号');
        $(errorText).appendTo(this.telWrap);
        return false;
      } else if(!validRule.isMobile(mobile)) {
        var errorText = this.errorTipsHandler('请输入正确的手机号');
        $(errorText).appendTo(this.telWrap);
        return false;
      }
      if(!validRule.isNoEmpty(code)) {
        var errorText = this.errorTipsHandler('请输入验证码');
        $(errorText).appendTo(this.codeWrap);
        return false;
      } else if(!validRule.isCode(code)) {
        var errorText = this.errorTipsHandler('请输入正确的验证码');
        $(errorText).appendTo(this.codeWrap);
        return false;
      }
      var data = {
        "mobile": mobile,
        "code": code
      };
      var url = target.attr('data-url');
      this.sendRequestHandler(url, 'POST', 'json', data, this.validateTelSuccessHandler, this.validateTelErrorHandler);
    },
    validateFocusHandler: function() {
      var error = this.telDialog.find('.error');
      if(error.length > 0) {
        error.remove();
      }
    },
    validateCodeHandler: function() {
      var val = this.code.val();
      if(!validRule.isNoEmpty(val)) {
        var errorText = this.errorTipsHandler('请输入验证码');
        $(errorText).appendTo(this.codeWrap);
      } else if(!validRule.isCode(val)) {
        var errorText = this.errorTipsHandler('请输入正确的验证码');
        $(errorText).appendTo(this.codeWrap);
      }
    },
    validateTelSuccessHandler: function(res) {
      if(res.status === 0)  {
        this.closeTelDialogHandler();
        this.firstPhone.val('0');
        res.data.last_times >= 0 ? this.drawCount.text(res.data.last_times) : this.drawCount.text('0');
        location.reload();
      } else if(res.status > 0) {
        var errorText = this.errorTipsHandler(res.info);
        $(errorText).appendTo(this.telWrap);
      }
    },
    validateTelErrorHandler: function(res) {
      console.log(res);
    },
    getCodeHandler: function(e) {
      var target = $(e.currentTarget);
      this.telDialog.find('.error').remove();
      var url = $(e.currentTarget).data('url');
      var tel = this.tel.val();
      if(!validRule.isNoEmpty(tel)) {
        var errorText = this.errorTipsHandler('请输入手机号');
        $(errorText).appendTo(this.telWrap);
        return false;
      } else if(!validRule.isMobile(tel)) {
        var errorText = this.errorTipsHandler('请输入正确的手机号');
        $(errorText).appendTo(this.telWrap);
        return false;
      }
      if(!target.hasClass('countdown')) {
          this.sendRequestHandler(url, 'POST', 'json', {'mobile': tel}, this.getCodeSuccessHandler, this.getCodeErrorHandler);
      }
    },
    getCodeSuccessHandler: function(res) {
      var countDown = 60;
      function settime(elem) {
        if (countDown == 0) {
          elem.removeClass('countdown');
          elem.text('获取验证码');
          return false;
        } else {
          elem.addClass('countdown');
          elem.text(countDown + 's');
          countDown--;
        }
        setTimeout(function() {
          settime($('.tel-dialog .get-code'))
        },1000)
      };
      if(res.status > 0) {
        var errorText = this.errorTipsHandler(res.info);
        $(errorText).appendTo(this.telWrap);
      } else {
        settime($('.tel-dialog .get-code'))
      }
    },
    getCodeErrorHandler: function() {
      console.log(res);
    },
    giveLotteryHandler: function(e) {
      var target = $(e.currentTarget);
      var url = target.attr('data-url');
      var openId = this.openId.val();
      this.sendRequestHandler(url, 'POST', 'json', {'open_id': openId}, this.giveLotterySuccessHandler, this.giveLotteryErrorHandler);
    },
    giveLotterySuccessHandler: function(res) {
      if(res.status === 0) {
        alert(res.info);
        this.mask.hide();
        this.helpDialog.hide();
        this.helpDialogApp.hide();
      } else if(res.status === 1) {
        this.mask.hide();
        this.helpDialog.hide();
        this.helpDialogApp.hide();
        if(res.data === 1) {
            this.mask.css('display', 'block');
            this.helpSuccessDialog.show();
        }
      }
    },
    giveLotteryErrorHandler: function(res) {
      console.log(res);
    },
    // -------------------- 结果页操作 start -------------------------
    resultShareDialogHandler:function() {
      var isApp = this.isApp.val();
      var that = this;
      if(isApp === '1') {
        setTimeout(function() {
          that.mask.css('display','block');
          that.resultShareDialogApp.show();
        }, 1000)
      } else {
        setTimeout(function() {
          that.mask.css('display','block');
          that.resultShareDialog.show();
        }, 1000);
      }
    },
    resultContinueHandler:function() {
      window.history.go(-1);
    },
    resultSimulateSelectHandler: function(e) {
      var target = $(e.currentTarget);
      target.addClass('simulate-select__current');
    },
    resultDropDownHandler: function(e) {
      var target = $(e.currentTarget),
          text = target.text(),
          age = target.attr('data-age');
      this.resultSimulateSelect.removeClass('simulate-select__current');
      this.resultSimulateSelectText.text(text).attr('data-age',age);
      e.stopPropagation();
    },
    resultSimulateSelectSureHandler:function(e) {
      var target = $(e.currentTarget),
          url = target.attr('data-url'),
          age = this.resultSimulateSelectText.attr('data-age');
      this.sendRequestHandler(url, 'POST', 'json', {'age': age}, this.resultSimulateAgeSuccess, this.resultSimulateAgeError);
    },
    resultSimulateAgeSuccess: function(res) {
      if(res.status === 1) {
        this.mask.hide();
        this.resultCrowdDialog.hide();
      }
    },
    resultSimulateAgeError: function(res) {
      console.log(res);
    },
    resultMailDialogValidate: function(e) {
      var target = $(e.currentTarget);
      var val = target.val();
      if(val) {
        target.parents('li').find('.error').remove();
      }
    },
    resultMailDialogClose: function() {
      this.mask.hide();
      this.resultMailDialog.find('.error').remove();
      this.resultMailDialog.hide();
    },
    resultMailDialogHandler: function(e) {
      var target = $(e.currentTarget),
          url = target.attr('data-url'),
          name = this.resultMailDialogName.val(),
          mobile = this.resultMailDialogTel.val(),
          address = this.resultMailDialogAddress.val();
      var data = {
        "name": name,
        "mobile": mobile,
        "address": address
      };
      var wrap = $('.mail-info__dialog li');
      if(!validRule.isNoEmpty(name)) {
        var errorText = this.errorTipsHandler('请输入姓名');
        $(errorText).appendTo(wrap.eq(0));
        return false;
      };
      if(!validRule.isNoEmpty(mobile)) {
        var errorText = this.errorTipsHandler('请输入手机号');
        $(errorText).appendTo(wrap.eq(1));
        return false;
      };
      if(!validRule.isNoEmpty(address)) {
        var errorText = this.errorTipsHandler('请输入收货地址');
        $(errorText).appendTo(wrap.eq(2));
        return false;
      }
      this.sendRequestHandler(url, 'POST', 'json', data, this.resultMailDialogSuccess, this.resultMailDialogError);
    },
    resultMailDialogSuccess: function(res) {
      if(res.status === 1) {
        this.mask.hide();
        this.resultMailDialog.hide();
      }
    },
    resultCrowdDialogClose: function() {
      this.mask.hide();
      this.resultCrowdDialog.hide();
    },
    // -------------------- 结果页操作 end-------------------------
    shareDialogAppCloseHandler: function() {
      this.mask.hide();
      this.shareDialogApp.hide();
    },
    closeTelDialogHandler: function() {
      this.telDialog.find('.error').hide();
      this.mask.hide();
      this.telDialog.hide();
      this.tel.val('');
      this.code.val('');
    },
    closeThanksDialogHandler: function() {
      this.mask.hide();
      this.thanksDialog.hide();
    },
    closeCountDialogHandler: function() {
      this.mask.hide();
      this.countDialog.hide();
    },
    closeShareDialogHandler: function() {
      this.mask.hide();
      this.shareDialog.hide();
    },
    closeHelpDialogHandler: function() {
      this.mask.hide();
      this.helpDialog.hide();
    },
    closeHelpDialogAppHandler: function() {
      this.mask.hide();
      this.helpDialogApp.hide();
    },
    closeHelpSuccessDialogHandler: function() {
      this.mask.hide();
      this.helpSuccessDialog.hide();
    },
    sendRequestHandler: function(url, type, dataType, data, successRequestHandler, errorRequestHandler) {
      $.ajax({
        url: url,
        type: type,
        dataType: dataType,
        data: data,
        context: this,
        success: successRequestHandler,
        error: errorRequestHandler
      })
    }
  });
  var app = new Page();
  app.init();
  // ------------------- 页面弹窗操作结束 ---------------------
});
