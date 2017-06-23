/**
 * Created by liliang on 2017年 6月16日 星期五 18时43分56秒 CST
 */
define("countTree",["vm","layui","niceScroll"],function(require,exports,module){
    require("layui");
    require("niceScroll");
    var getData = function (options) {
        var defaults = {
                timeout : 10000,
                type: "post",
                dataType: "json",
                error : function(){
                    alert("网络错误请重试！");
                }
            },
            settings = $.extend({}, defaults, options);
        $.ajax(settings);
    }

    new Vue({
        el:'body',
        data:{
            //apiUrl
            apiUrl:{
                getUserGroupList:'/MassMessageLog/getUserGroupList',
                getTeamList:'/MassMessageLog/getTeamList',
                userList: '/MassMessageLog/getUserList',
                getMassMessageList: '/MassMessageLog/getMassMessageList'
            },
            //数据
            requestData:{
                userGroupList:{},
                teamList:null,
                userList:[],
                messageList:[]
            },
            //组别相关
            team:{
                selType: false,
                noGroup: false,
                message: false
            },
            //当前样式
            cut:{
                group:'',
                team:'',
                user:'',
                cut:false
            },
            //起始时间
            time:{
                start:'',
                end:''
            }
        },
        methods:{
            //封装
            getData:function (a) {
                if(a.status != 10000) return alert(a.message);
            },
            //获取类型
            getUserGroupList: function () {
                var that = this;
                getData({
                    url:that.apiUrl.getUserGroupList,
                    success: function (data) {
                        that.getData(data);
                        that.requestData.userGroupList = data.message || {};
                        that.$nextTick(function () {
                            $('.groups').niceScroll({
                                cursorcolor: "#424242",
                                cursoropacitymin: 0,
                                cursoropacitymax: .5
                            });
                        });
                    }
                });
            },
            //获取组别
            getTeamList:function (id) {
                var that = this;
                that.cut.group = id;
                that.cut.team = '';
                getData({
                    url:that.apiUrl.getTeamList,
                    data:{
                        user_group:id
                    },
                    success: function (data) {
                        that.getData(data);
                        that.cut.user = '';
                        if(data.message.length != 0){
                            //console.log('有');
                            that.team.selType = false;
                            that.team.noGroup = false;
                            that.requestData.teamList = data.message;
                            that.$nextTick(function () {
                                $('.groupList').niceScroll({
                                    cursorcolor: "#424242",
                                    cursoropacitymin: 0,
                                    cursoropacitymax: .5
                                });
                            })
                        }else{
                            //console.log('no有')
                            that.team.noGroup = true;
                            that.requestData.teamList = [];
                        }
                    }
                });
            },

            //获取组别成员
            getUserList:function (id) {
                var that = this;
                // if(id == that.cut.team){
                //     that.cut.cut = !that.cut.cut;
                // }
                getData({
                    url:that.apiUrl.userList,
                    data:{
                        team_group:id,
                        user_group:that.cut.group
                    },
                    success: function (data) {
                        console.log(data.message)
                        that.cut.team = id;
                        that.requestData.userList = data.message;
                    }
                });
            },

            //获取群发详情信息
            getMassMessageList: function (id) {
                if(!this.cut.team) return alert('请选择组别！');
                if(!id) return alert('请选择学员！');
                if(!this.time.start) return alert('请选择开始时间！');
                if(!this.time.end) return alert('请选择结束时间！');
                var that = this;
                that.cut.user = id;
                getData({
                    url:that.apiUrl.getMassMessageList,
                    data:{
                        admin_id:id,
                        // begin_date:that.time.start,
                        // end_date:that.time.end
                        begin_date:startTime.value,
                        end_date:endTime.value
                    },
                    success: function (data) {
                        that.requestData.messageList =[];
                        if((data.message.constructor == Array) && (data.message.length !=0)){
                            that.team.message = false;
                            $.map(data.message, function (elm, index) {
                                if(elm.message_type == 3000){
                                    elm.content = JSON.parse(elm.content);
                                    that.requestData.messageList.push(elm);
                                }else{
                                    that.requestData.messageList.push(elm);
                                }
                            });
                        }else {
                            that.team.message = true;
                        }
                        that.$nextTick(function () {
                            $('.detail-list').niceScroll({
                                cursorcolor: "#424242",
                                cursoropacitymin: 0,
                                cursoropacitymax: .5,
                                ailpadding: { top: 10, right: -20, left: 0, bottom: 10 }
                            });
                        })
                    }
                });
            }
        },
        ready: function () {
            //获取类型
            this.getUserGroupList();
            // 设置时间
            var time = new Date();
            var y = time.getFullYear();
            var m = (time.getMonth()+1) > 9 ? time.getMonth()+1 :'0'+ (time.getMonth()+1)
            var d = time.getDate();
            var today = y+ '-'+m+'-'+d;
            this.time.start = this.time.end = today;
        }
    })

});