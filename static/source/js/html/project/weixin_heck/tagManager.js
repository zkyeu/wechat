define("tagManager",["niceScroll","vm"],function(require,exports,module){

    $.fn.heckScroll = function(){
        var self = $(this);
        self.niceScroll(
            {
                cursorcolor : "#686b71",
                autohidemode: true,
                cursorwidth:7,
                cursorborderradius:"999px",
                cursorborder : 0
            }
        );
        return self;
    }

    var tagManager = new Vue({
        el : "body",
        data : function(){
            return {
               curType : "",
               types : [],
               list : {},
               inited : false,
               editShow : false,
               // 0 新建 1 修改
               editType : "1",
               curEdit : {
                    id: "",
                    tag_name: "",
                    type: "",
                    user_group: "",
                    status: "",
                    tag_short: "",
                    tag_brief: "",
                    tag_class: "",
                    tag_posion: ""
               }
            }
        },
        methods : {
            changeType : function(x){
                this.curType = x.type;
                if(!this.curList) this.updateList();
            },
            del : function(x){
                if(!confirm("是否删除此条？")) return;
                doAjax({
                    url : "/UserGroupTag/deleteUserGroupTag",
                    data : {
                        id : x.id
                    }
                })
                .success(function(r){
                    if(r.status != 10000) return alert(r.message);
                    alert("删除成功");
                    this.updateList();
                }.bind(this));
            },
            add : function(){
                this.editType = "0";
                this.curEdit.type = this.curType + "";
                this.editShow = true;
            },
            edit : function(x){
                this.editType = "1";
                Object.assign(this.curEdit, x);
                this.editShow = true;
            },
            editHide : function(){
                this.editShow = false;
                this.editClear();
            },
            init : function(){
                this
                .updateTypes()
                .success(this.updateList);
            },
            updateTypes : function(){
                return doAjax({
                    url : "/UserGroupTag/getTypeList"
                })
                .success(function(r){
                    if(r.status != 10000) return alert(r.message);
                    this.types = r.message;
                    this.curType = this.types[0].type;
                }.bind(this));
            },
            updateList : function(){
                return doAjax({
                    url : "/UserGroupTag/getTagListByType",
                    data : {
                        type : this.curType
                    }
                })
                .success(function(r){
                    if(r.status != 10000) return alert(r.message);
                    // var message = this.formatList(r.message);
                    Vue.set(this.list, this.curType, r.message);
                    this.inited = true;
                }.bind(this));
            },
            formatList : function(data){
                var list = {};
                data.map(function(ele, idx){
                    var status = ele.status;
                    var user_group = ele.user_group;
                    if(!list[status]) list[status] = {};
                    if(!list[status][user_group]) list[status][user_group] = [];
                    list[status][user_group].push(ele);
                });
                return list;
            },
            editSubmit : function(){
                if(this.cantEdit) return;
                var api = this.editType == 0 ? "/UserGroupTag/addUserGroupTag" : "/UserGroupTag/updateUserGroupTag";
                doAjax({
                    url : api,
                    data : this.curEdit
                })
                .success(function(r){
                    if(r.status != 10000) return alert(r.message);
                    alert("更新成功");
                    this.updateList();
                    this.editHide();
                }.bind(this));
            },
            editClear : function(){
                for(var x in this.curEdit){
                    this.curEdit[x] = "";
                }
            }
        },
        created : function(){
            this.init();
            $(".data_list_con").heckScroll();
        },
        computed : {
            curList : function(){
                return this.list[this.curType];
            },
            cantEdit : function(){
                var flag = false;
                for(var x in this.curEdit){
                    var s = this.curEdit[x].trim();
                    if(s == ""){
                        // 新增
                        if(this.editType == 0){
                            if(x != "tag_brief" && x != "id" && x != "tag_posion"){
                                flag = true;
                                break;
                            }
                        // 修改
                        }else if(this.editType == 1){
                            if(x != "tag_brief"){
                                flag = true;
                                break;
                            }
                        }
                    }
                }
                return flag;
            }
        }
    });


    function doAjax(opts){
        var defaults = {
            type : "post",
            dataType : "json",
            error : function(){
                alert("网络错误， 请重试！");
            }
        },
        configs = $.extend({}, defaults, opts);

        return $.ajax(configs);
    }
   
});