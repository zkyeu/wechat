define(function(require,exports){
    $(function(){

        function Observer(){};

        Observer.prototype = {
            constructor: Observer,
            target: $(document),
            subscribe: function(){
                this.target.on.apply(this.target, arguments);
            },
            publish: function(){
                this.target.trigger.apply(this.target,arguments);
            }
        }


        function ajax(){
            var user_phone = $.trim($('#user_phone').val());
            var real_name = $.trim($('#real_name').val());
            var pick_name = $.trim($('#pick_name').val());
            var user_addr = $.trim($('#user_addr').val());
            var reg = /^[1-9]\d{10}$/;
            if(!reg.test(user_phone)){
                $('#tip_msg').html('手机号不正确！');
                $('#tipBox,#mask_ok').show();
                return false;
            }
            if(real_name&&pick_name&&user_addr){
                $.ajax({
                    url: '/ajax/saveUserInfo',
                    data: {
                        user_phone: user_phone,
                        real_name: real_name,
                        pick_name: pick_name,
                        user_addr: user_addr
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function(rs){
                        $('#tip_msg').html(rs.info);
                        $('#tipBox,#mask_ok').show();
                    }
                })
            }else{
                $('#tip_msg').html('信息不能为空');
                $('#tipBox,#mask_ok').show();
                return false;
            }
        }


        var ob = new Observer();
        ob.subscribe('sendAjax',ajax);


        $('#close').tap(function(){
            $('#tipBox,#mask_ok').hide();
        })

        $('#save').tap(function(){
            ob.publish('sendAjax');
        })

















    })
})