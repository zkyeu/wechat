/**
 * Created by li on 2016/12/8.
 */
define("offLineList",[],function(require,exports,module){
    ;(function(){
        // $(".off_line_container").find("a[data-trust-self = 1]").attr("style","background:#ffdb69");
        $(".off_line_container").find("a[data-trust-self = 1]").addClass("trust-self");

        var userJump = function(event){
            var cutAdmin_id = event.target.getAttribute('data-admin-id');
            if(!cutAdmin_id) return ;
            console.log($(this).attr("data-admin-id"));
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: '/AdminContact/checkTruct',
                data:{
                    admin_id:cutAdmin_id
                },
                success: function (data) {
                    if (data.status == 10000) {
                        var newWindow = data.message.url;
                        window.open(newWindow);
                    } else if (data.status > 10000) {
                        var messageshow = data.message.message;
                        alert(messageshow);
                    }else {
                        alert("请联系技术支持！");
                    }
                },
                error:function () {
                    alert("系统罢工！");
                }

            });
            // $(this).unbind("click");点击解绑事件
        }
        $(".off_line_container a").click(userJump);
    })();

});