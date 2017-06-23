/**
 * Created by li on 2016/12/8.
 */
define("articleManage",["upload","niceScroll"],function(require,exports,module){
    var uploadFn = require("upload");
    var updateImg = "";
    var updateShow = $(".update_show");
    // update

    uploadFn.init({
        browse_button : "update_btn",
        container : "update_box",
        FileUploaded : function (up, file, info) {
            var src = file.fileFullName;
            updateImg = src;
            updateShow.html('<img src="'+ updateImg +'" />');
        }
    });

    // 滚动条
    require("niceScroll");
    $.fn.heckScroll = function(){
        var that = $(this);
        that.niceScroll(
            {
                cursorcolor : "#686b71",
                autohidemode: true,
                cursorwidth:7,
                cursorborderradius:"999px",
                cursorborder : 0,
                horizrailenabled:false
            }
        );
        return that;
    }

    ;(function(){
        var ulHeight = window.innerHeight-240;
        $('.article_list_detail').attr("style","height:"+ulHeight+'px')
        //请求数据返回
        function requestData(data) {
            if (data.status == 10000) {
                var dataDetail = data.message.list;
                var html = '';
                if(dataDetail.length==0){
                    var html = '<h5>暂无文章</h5>';
                    $('.article_list_detail').append(html);
                }
                for(var i = 0; i < dataDetail.length; i++){
                    var id = dataDetail[i].id;
                    var title = dataDetail[i].title;
                    var icon = dataDetail[i].icon;
                    var link = dataDetail[i].link;
                    var introduction = dataDetail[i].introduction;
                    var add_time = dataDetail[i].add_time;
                    html += '<li><div class="at_left">';
                    html += '<p>'+ title +'</p>';
                    html += '<p>'+ introduction +'</p>';
                    html += '<p><a href="javascript:;" target="_blank">'+ link +'</a></p>';
                    html += '</div><div class="at_right">';
                    html += '<img src="'+ icon +'">';
                    html += '<div data-id="'+ id +'">删除文章</div>';
                    html += '</div></li>';
                }
                $('.article_list_detail').html(html);
                $(".article_list_detail").heckScroll();
            }
            if(data.status > 10000){
                alert(data.message);
            }
        }
        
        // 默认数据显示
        function defaultAritcle() {
            $.ajax({
                type: "POST",
                url: "/Article/articleList",
                data: {
                    aid : 1,
                    gtype:1
                },
                dataType: "json",
                success: function (data) {
                    requestData(data);
                }
            });
        }
        
        //显示弹层
        function addArticle() {
            $(".add_article_btn").on('click',function () {
                $('input').removeClass("err-bor");
                $('textarea').removeClass("err-bor");
                $('#update_btn').removeClass("err-bor");
                $(".add-article-layer").fadeIn(380);
            });
        }

        //关闭弹层
        function closeBtn() {
            $(".close-layer-btn-right").on('click',function () {

                $(".add-article-layer").fadeOut(380);
            });
        }

        //分类选择
        function selRadio() {
            $(".radio-sel input").click(function(){
                var cutInput = $(this).attr('id');
                $("#"+cutInput).attr("checked","checked");
                $("#"+cutInput).siblings("span").addClass("active");
                $("#"+cutInput).parents("p").siblings("p").children("span").removeClass("active").removeAttr("checked");
            });
        }
        
        //获取分类
        function getTypes() {
            $.ajax({
                type: "POST",
                // url: "/Article/getArctype",
                url: "/Article/getClass",
                dataType: "json",
                success: function (data) {
                    if(data.status > 10000) return alert(data.message);
                    if (data.status == 10000) {
                        var html = '';
                        var _html = '';
                        var classA = data.message.grouptype;
                        var classB = data.message.arctype;
                        // var actives = ' active';
                        for(var p in classA){
                            var actives = ' active';
                            if(p != 1) actives = '';
                            html += '<li class="seltype'+ actives +'" data-bid="'+ p +'">'+ classA[p] + '</li>';
                        }
                        $('#aid').append(html);
                        for(var q in classB){
                            var actives = ' active';
                            if(q != 1) actives = '';
                            _html += '<li class="seltype'+ actives +'" data-aid="'+ q +'">'+ classB[q] + '</li>';
                        }
                        $('#bid').append(_html);
                    }

                }
            });
        }

        //获取分类文章
        function gettypesArtile() {

            $('body').on('click','.seltype', function () {
                $(this).addClass("active").siblings('li').removeClass("active");
                var cutBid = $(".type-list .active").data('bid');
                var cutAid = $(".type-sel .active").data('aid');
                $.ajax({
                    type: "POST",
                    url: "/Article/articleList",
                    data: {
                        aid : cutAid,
                        gtype:cutBid
                    },
                    dataType: "json",
                    success: function (data) {
                        requestData(data);
                    }
                });
            })
        }

        //检测表单 并添加文章
        function checkForm() {
            $("#addArticleBtn").on('click',function () {
                var gtype = $("#gtype input:radio:checked").val();
                var types = $("#types input:radio:checked").val();
                var title = $("input[name='title']").val();
                var content = $("textarea[name='content']").val();
                var link = $("input[name='link']").val();
                var pic = $(".update_show").find("img").attr("src");

                if(!gtype){
                   return alert("请选择身份分类！");
                }

                if(!types){
                    return alert("请选择文章分类！");
                }
                if(!link){
                    $("input[name='link']").addClass("err-bor");
                    // $("input[name='link']").focus();
                }else{
                    // alert(link)
                    if(link.indexOf("http") > -1) {
                        $("input[name='link']").removeClass("err-bor");
                    }else {
                        alert("您填写的必须是合法的链接");
                        // $("input[name='link']").focus();
                    }
                }
                if(!content){
                    $("textarea[name='content']").addClass("err-bor");
                    // alert("请输内容信息！");
                    // $("textarea[name='content']").focus();
                }else{
                    $("textarea[name='content']").removeClass("err-bor");
                }
                if(!title){
                    $("input[name='title']").addClass("err-bor");
                    // alert("请输入标题信息！");
                    // $("input[name='title']").focus();
                }else{
                    $("input[name='title']").removeClass("err-bor");
                }
                if(!pic){
                    $("#update_btn").addClass("err-bor");
                    // alert("请上传图片！");
                }else{
                    $("#update_btn").removeClass("err-bor");
                }

                $("input[name='title']").focus(function () {
                    $(this).removeClass('err-bor')
                })
                $("textarea[name='content']").focus(function () {
                    $(this).removeClass('err-bor')
                })
                $("input[name='link']").focus(function () {
                    $(this).removeClass('err-bor')
                })
                $("#update_btn").click(function () {
                    $(this).removeClass('err-bor')
                })




                //添加文章
                var error = $('.err-bor').length;
                if(!error){
                    $.ajax({
                        type: "POST",
                        url: "/Article/Add",
                        data: {
                            gtype: gtype.substr(gtype.length-1,1),
                            aid : types.substr(types.length-1,1),
                            title:title,
                            introduction:content,
                            link:link,
                            icon:pic
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.status == 10000) {
                                alert(data.message);
                                $(".add-article-layer").fadeOut(380);
                                location.reload();
                            }
                            if(data.status > 10000){
                                alert(data.message);
                            }
                        }
                    });
                }
            });
        }

        //删除文章
        function delArticle() {
            // $(".at_right").find("div").on('click',function () {
            $("body").on('click', ".at_right div", function () {
                var articleID = $(this).data("id");
                if(!window.confirm("确认删除文章？")) return;
                $.ajax({
                    type: "POST",
                    url: "/Article/Del",
                    data: {
                        id:articleID
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 10000) {
                            location.reload();
                        }
                        if(data.status > 10000){
                            alert(data.message);
                        }
                    }
                });
            })
        }

        defaultAritcle();
        getTypes();
        gettypesArtile();
        selRadio();
        addArticle();
        closeBtn();
        checkForm();
        delArticle();
    })();

});