define("lessonTips",["niceScroll","vm"],function(require,exports,module){

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
               text : "",
               types : [],
               list : {},
               inited : false
            }
        },
        methods : {
            init : function(){
                this
                .updateTypes()
                .success(this.updateList);
            },
            updateTypes : function(){
                return doAjax({
                    url : "/CourseRemindTemplate/getTemplateType"
                })
                .success(function(r){
                    if(r.status != 10000) return alert(r.message);
                    var types = [];
                    for(var x in r.message){
                        types.push({
                            name : r.message[x],
                            type : x
                        });
                    }
                    this.types = types;
                    this.curType = this.types[0].type; 
                }.bind(this))
            },
            updateList : function(){
                return doAjax({
                    url : "/CourseRemindTemplate/getTemplateList",
                    data : {
                        type : this.curType
                    }
                })
                .success(function(r){
                    if(r.status != 10000) return alert(r.message);
                    Vue.set(this.list, this.curType, r.message);
                    this.inited = true;
                }.bind(this));
            },
            changeType : function(x){
                this.curType = x.type;
                if(!this.curList) this.updateList();
            },
            del : function(x){
                if(!confirm("是否删除此条？")) return;
                doAjax({
                    url : "/CourseRemindTemplate/delTemplate",
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
                if(this._text == "") return;
                doAjax({
                    url : "/CourseRemindTemplate/addTemplate",
                    data : {
                        type : this.curType,
                        template_doc : this._text
                    }
                })
                .success(function(r){
                    if(r.status != 10000) return alert(r.message);
                    alert("更新成功");
                    this.text = "";
                    this.updateList();
                }.bind(this));
            }
        },
        created : function(){
            this.init();
            $(".lesson-tips dd").heckScroll();
        },
        computed : {
            curList : function(){
                return this.list[this.curType];
            },
            _text : function(){
                return this.text.trim();
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