/**
 * 默认逻辑处理
 * @author:  liliang（liliang05@51talk.com）
 * @update:  2017年 3月 8日 星期三 15时28分50秒 CST
 * @note:    黑鸟项目后台权限管理
 */
define("quanxianManage",['niceScroll'],function(require,exports,module){
    //封装ajax
    var  _$ ={
        request: function (type, url, data, success, error) {
            $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: "JSON",
                // cache: false,
                success: function (data) {
                    success(data);
                },
                error: error
            });
        }
    }
    getList();
    //获取信息列表
    function getList() {
        _$.request('GET','/AuthGroup/authGroupList', {}, function (data){
            if(data.status !=10000) return alert(data.message);
            var listLength = data.message.length;
            if(!listLength){
                $('.table-detail').hide();
                $('.table-box h5').show();
            }
            $('.table-detail').show();
            var html='';
            var dataDetail = data.message;
            for(var i = 0; i < listLength; i++){
                var id = dataDetail[i].id;
                var alias_name = dataDetail[i].alias_name;
                var admin_id = dataDetail[i].admin_id;
                var admin_name = dataDetail[i].admin_name;
                html += '<tr><td>'+ admin_name +'</td>';
                html += '<td style="text-align: left;">'+ alias_name +'</td>';
                html += '<td><span data-name="'+admin_name+'" data-alias_name="'+alias_name+'" data-eid="'+admin_id+'" class="edit">编辑</span><span data-id="'+ id +'" class="del">删除</span></tr>';
            }
            $('.sel-dom').html(html);
        });
    }

    var confirmAdd = $('.edit-layer .confirm');//添加新权限
    var mask = $('#maskLayer');//总弹层背景
    var editLayer = $('.edit-layer');//编辑弹层
    var concelBtn = $('.concel');

    $('#addNew').on('click',function () {
        $('.doLayer-w1 .edit').hide()
        $("#admin_name").val("");
        $("#group_alias").val("");

        confirmAdd.attr("style","display:inline-block");
        mask.show();
        editLayer.show();
        // editLayer.removeAttr("data-eid");
        $(".doLayer-w2").hide();
        getCrmGroup();
    });

    //获取权限组
    function getCrmGroup() {
        _$.request('GET','/AuthGroup/getCrmGroup', {}, function (data){
            if (data.status !=10000) return alert(data.message);
            var dataLength = data.message.length;
            var html = '';
            if(dataLength !=0){
                for(var i = 0; i < dataLength; i++){
                    html += '<span data-name="'+ data.message[i] +'">'+ data.message[i] +'</span>';
                }
                $('.manage-name-list').html(html).niceScroll();
                $('.name-list').show();
                selPower();
            }
        });
    }

    //添加权限
    confirmAdd.on('click',function () {
        saveInfo();
    });

    //隐藏清空设置数据
    concelBtn.on('click',function () {
        mask.hide();
        $('.doLayer-w1').removeAttr("data-etid");
    });

    // //保存数据
    function saveInfo() {
        var admin_name = $("#admin_name").val();
        var group_alias = [];
        var userSel = $('.manage-name-list span.group-sel');
        for(var l = 0; l < userSel.length; l++){
            group_alias.push(userSel[l].innerText);
        }
        if(admin_name==''){
            alert("请输入CRM账号！");
            return false;
        }
        if(group_alias.length == 0){
            alert("请选择管理组");
            return false;
        }
        reset($('.edit-layer').attr("data-etid"),admin_name,group_alias.join(','));
    }


    // //是否覆盖
    function reset(id,name,list) {
        _$.request('POST','/AuthGroup/hasAuthGroup', { user_name:name }, function (data){
            if (data.status !=10000) return alert(data.message);
            if(data.message.id != undefined){
                //console.log(data.message.admin_id);
                $('.edit-layer').hide();
                $('.doLayer-w2 .confirm').attr("style","display:inline-block");
                $('.doLayer-w2').show();
                $('.doLayer-w2 .confirm').on('click',function () {
                    editSave(data.message.admin_id,list);
                });
            }else{
                addNewList(name,list);
            }
        });
    }

    function addNewList(name,list) {
        _$.request('POST','/AuthGroup/saveAuthGroup', {admin_name:name, group_alias:list}, function (data){
            if(data.status !=10000) return alert(data.message);
            alert(data.message);
            getList();
            mask.hide();
        });
    }


    //编辑
    function editSave(id,list) {
        _$.request('POST','/AuthGroup/updateAuthGroup', {admin_id:id,group_alias:list}, function (data){
            if(data.status !=10000) return alert(data.message);
            alert(data.message);
            getList();
            mask.hide();
        });
    }

    // //删除数据
    $('body').on('click','.del',function () {
        var id = $(this).data('id');
        var name = $(this).siblings('span').data('name');
        console.log(name);
        if(confirm('确定要删除'+name+'的权限吗？')){
            var el = $(this).parent().parent().remove();
            _$.request('POST','/AuthGroup/delAuthGroup', {id:id}, function (data){
                if (data.status !=10000) return alert(data.message);
                alert(data.message);
                el.remove();
            });
        }
    });


    // //编辑功能
    $('body').on('click','td .edit',function () {
        $(".doLayer-w2").hide();
        confirmAdd.removeAttr("style");
        $('.doLayer-w1 .edit').attr("style","display:inline-block")
        var adminId = $(this).data('eid');
        console.log("设置当前:"+adminId);
        $('.edit-layer').attr('data-etid',adminId);
        var adminName = $(this).data('name');
        var alias_name = $(this).data('alias_name');
        $("#admin_name").val(adminName);
        $("#group_alias").val(alias_name);
        // $("#admin_name").attr('disabled','disabled');
        _$.request('POST','/AuthGroup/getCrmGroupByEdit', {
            admin_id:adminId
        }, function (data){
            if (data.status !=10000) return alert(data.message);
            var dataLength = data.message.length;
            var html = '';
            if(dataLength !=0){
                var group_alias = '';
                var is_check = '';
                var html = '';
                for(var i = 0; i < dataLength; i++){
                    var name = data.message[i].group_alias;
                    var chek = data.message[i].is_check;
                    //判断是否选中
                    if(chek){
                        html += '<span class="group-sel" data-name="'+ name +'">'+ name +'</span>';
                    }else{
                        html += '<span data-name="'+ name +'">'+ name +'</span>';
                    }
                }
                $('.manage-name-list').html(html).niceScroll();
                $('.name-list').show();
                selPower();
            }
        });
        mask.show();
        editLayer.show();
    });


    $('.doLayer-w1 .edit').on('click',function () {
        var admin_name = $("#admin_name").val();
        var id = $('.doLayer-w1').attr('data-etid');
        var group_alias = [];
        var userSel = $('.manage-name-list span.group-sel');
        for(var l = 0; l < userSel.length; l++){
            group_alias.push(userSel[l].innerText);
        }
        if(admin_name==''){
            alert("请输入CRM账号！");
            return false;
        }
        if(group_alias.length == 0){
            alert("请选择管理组");
            return false;
        }
        editSave(id,group_alias.join(','));
    });


    //选取权限数据
    function selPower(){
        var elm = $('.manage-name-list span');
       elm.on('click', function(){
           if($(this).hasClass('group-sel')){
               $(this).removeClass('group-sel');
           }else{
               $(this).addClass('group-sel');
           }
       })
    }

});