define(function(require){
    $(function() {
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
            }
        };
        function Page() {
            this.getChangeBtn = $(".get_change_btn");
            this.shareTips = $("#share_tips");
            this.fillMessageTips = $("#fill_message");
            this.choosePeopleTips = $("#choose_people");
            //app
            this.appShare = $(".m-app-share");
            this.appShareTips = $("#app_share_tips");
        }

        $.extend(Page.prototype, {
            init: function() {
                this.bindEvents();
            },

            bindEvents: function() {
                var that = this;
                this.getChangeBtn.on("click", $.proxy(this.handleGetChangeBtnClick, this));
                //注意这是是指向.close_btn父级.f-mask的弹层
                this.shareTips.on("click", ".close_btn", $.proxy(this.handleThisTipsCloseClick, this));
                this.choosePeopleTips.on("click", ".people_selected", $.proxy(this.handlePeopleSelectOpen, this));
                this.choosePeopleTips.on("click", "li", $.proxy(this.handlePeopleSelectClose, this));
                this.choosePeopleTips.on("click", ".save_btn", $.proxy(this.handlePeopleSubmitClick, this));

                this.fillMessageTips.on("click", ".save_btn", $.proxy(this.handleFillMessageSubmitClick, this));
                this.fillMessageTips.on("keyup", "input", $.proxy(this.handleFillMessageInputKeyup, this));
                //app
                this.appShare.on("click", $.proxy(this.handleAppShareClick, this));
                this.appShareTips.on("click", ".p_close_btn", $.proxy(this.handleThisTipsCloseClick, this));

            },

            handleAppShareClick: function() {
                this.appShareTips.show();
            },

            handleFillMessageInputKeyup: function() {
                var name = this.fillMessageTips.find("#name"),
                    tel = this.fillMessageTips.find("#phone"),
                    address = this.fillMessageTips.find("#address"),
                    send_btn =  this.fillMessageTips.find(".save_btn"),
                    data = {
                        name: name.val(),
                        tel: tel.val(),
                        address: address.val()
                    };
                if(!validRule.isNoEmpty(data.name)) {
                    send_btn.removeClass('sure_success_btn');
                    return false;
                };
                if(!validRule.isMobile(data.tel)) {
                    send_btn.removeClass('sure_success_btn');
                    return false;
                };
                if(!validRule.isNoEmpty(data.address)) {
                    send_btn.removeClass('sure_success_btn');
                    return false;
                }
                send_btn.addClass('sure_success_btn');
            },

            handleFillMessageSubmitClick: function(e) {
                var target = $(e.currentTarget),
                    url = target.data('url'),
                    name = this.fillMessageTips.find("#name"),
                    tel = this.fillMessageTips.find("#phone"),
                    address = this.fillMessageTips.find("#address"),
                    data = {
                        name: name.val(),
                        mobile: tel.val(),
                        address: address.val()
                    };
                if(!target.hasClass('sure_success_btn')) {
                   return; 
                } 
                this.sendRequest(url, 'post', data, this.handleFillMessageSuccess, this.handleFillMessageError);
            },

            handleFillMessageSuccess: function(res) {
                this.fillMessageTips.hide();
            },

            handlePeopleSelectOpen: function(e) {
                var target = $(e.currentTarget),
                    parents = this.choosePeopleTips;

                target.addClass('people_list_open');
                parents.find(".choose_list").show();
            },

            handlePeopleSelectClose: function(e) {
                var target = $(e.currentTarget),
                    parents = this.choosePeopleTips;
                    index = target.index();

                parents.find(".people_selected").html(target.html())
                                                .css({color: '#fff'})
                                                .attr("data-index", index);
                parents.find(".people_selected").removeClass('people_list_open');
                parents.find(".choose_list").hide();
                parents.find(".save_btn").addClass('sure_success_btn');
            },

            adapterPeopleAge: function(status) {
                var adapter = {
                        '0':'1',
                        '1':'2',
                        '2':'3'
                    }
                return adapter[status];
            },

            handlePeopleSubmitClick: function(e) {
                var target = $(e.currentTarget),
                    url = target.data('url'),
                    parents = this.choosePeopleTips;
                    age = this.adapterPeopleAge(parents.find(".people_selected").attr("data-index"));
                    // 0:没有孩子 1：5-12岁 2： 其他年龄
                    data = {
                        age: age
                    };
                    console.log(data);
                    
                if(!target.hasClass('sure_success_btn')) {
                    return;
                }
                this.sendRequest(url, 'post', data, this.handlePeopleSuccess, this.handlePeopleError);
            },

            handlePeopleSuccess: function(res) {
                this.choosePeopleTips.hide();
            },

            hangleTranslateBtnClick: function(e) {
                var target = $(e.currentTarget),
                    targetParent = target.parent(),
                    parentSiblings = targetParent.siblings();

                    targetParent.hide();
                    parentSiblings.show();
            },

            handleGetChangeBtnClick: function() {
                this.shareTips.show();
            },

            handleThisTipsCloseClick: function(e) {
                var target = $(e.currentTarget),
                    parent = target.parents(".f-mask");
                    parent.hide();
            },

            sendRequest: function(url, method, data, success, error) {
                $.ajax({
                  url: url,
                  type: method,
                  dataType: 'json',
                  data: data,
                  context: this,
                  success: success,
                  error: error
                });
            }
        })

        var page = new Page();
        page.init();
    });       
});