/**
 * @authors wanghuihui@51talk.com
 */
define("comment",[""],function(require,exports,module){
    var CommentFn = function(){
        //黄色star
        this.yStar = $('#yStar');
        //star点击层
        this.clickDiv = $('#clickDiv');
        //点击star数量隐藏域
        this.starNum = $('#starNum');
        //确定按钮
        this.sureBtn = $('#sureBtn');
        //弹窗确定按钮
        this.layerBtn = $('#layerBtn');
        //弹窗
        this.showTipsLayer = $('#showTipsLayer');
        //评语
        this.commentId = $('#commentId');
        //弹窗信息
        this.infoId = $('#infoId');
        this._event();
    };
    CommentFn.prototype = {
        _event : function(){
            var that = this;

            //start模拟点击层
            this.clickDiv.find('span').on('touchend',function(){
                that.starNum.val($(this).index() + 1);
                that.yStar.find('span').hide();
                that.showStar($(this).index());
            });

            //弹窗确定事件
            this.layerBtn.on('touchend',function(){
                //提交状态
                if(that.infoId.find('span').attr('isSubmit-data')){
                
                //ajax请求
                }
                that.showTipsLayer.hide();
            });

            //确定按钮
            this.sureBtn.on('touchend',function(){
                if(that.commentId.val() == ''){
                    that.showLayer('请留下您宝贵的建议~');
                }else{
                    $.ajax({
                        url:"/mobile/feedback/doFeedback",
                        type:"post",
                        data:{
                            star:that.starNum.val(),
                            content: that.commentId.val()
                        },
                        success:function(res){
                            res = JSON.parse(res);
                            if(res.status==1){
                                that.showLayer('您的建议就是我们不断前进的动力~',true);
                                // $("#showTipsLayer").find("p").html("你的反馈已提交，非常感谢！</br>我们会重视您的宝贵意见。");
                                // $("#showTipsLayer").show();
                                $("#showTipsLayer a").on('touchend',function(){
                                    $("#showTipsLayer").hide();
                                    wx.closeWindow();
                                })
                            }else{
                                that.showLayer(res.info);
                               // $("#showTipsLayer").find("p").html(res.info);
                                $("#showTipsLayer").show().on('touchend',"a",function(){
                                    $("#showTipsLayer").hide();

                                })
                            }
                        }
                    })
                }
            });
        },

        //老师得分star展示
        showStar : function(num){
            this.starHtml = '';
            for(var i=0; i<=num; i++){
                this.yStar.find('span').eq(i).css('display','inline-block');
            }
        },

        //渲染弹窗
        showLayer : function(str,isSubmit){
            if(isSubmit == undefined){
                this.infoId.html('<p>'+ str +'</p>');
            }else{
                this.infoId.html('<span isSubmit-data="true"></span><p>'+ str +'</p>');
            }
            this.showTipsLayer.show();
        }

    };
    new CommentFn();
});
