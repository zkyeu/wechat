define("adminNew",["niceScroll","vm"],function(require,exports,module){

   
    window.adminNew = {};

    adminNew.returnData = function(arr){
        var resultArr = [],
            resultJson = {};

        for(var i=0,l=arr.length;i<l;i++){
            var ele = arr[i]
            var id = ele.id + "";
            resultArr.push(id);
            resultJson[id] = {
                content : ele.content,
                flag : ele.flag,
                name : ele.name,
                tagList: ele.tagList
            }
        }
        return {
            resultArr : resultArr,
            resultJson : resultJson
        }
    }

    adminNew.getData = function(arr,json){
        var result = [];
        for(var i=0,l=arr.length;i<l;i++){
            var id = arr[i];
                name = $.trim(json[id].name);
                tagList = json[id].tagList.sort();
            result.push({
                id : id,
                name : name,
                tagList : tagList
            });
        }
        return result;
    }

    adminNew.creatNewArr = function(arr){
        return arr.slice();
    }

    adminNew.getQueryStr = function(name){
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1) return "";
        return result[1];
    }

    adminNew.doAjax = function(opts){
        return $.ajax({
            url : opts.url,
            data : opts.data,
            type : "post",
            dataType : "json",
            success : function(r){
                typeof opts.success == "function" &&  opts.success.apply(null,arguments)
            },
            complete : function(){
                typeof opts.complete == "function" &&  opts.complete.apply(null,arguments)
            }
        });
    }
    //移动数据
    adminNew.listMove = function(arr,index,type){
        return adminNew.arrMove[type](arr,index);
    }
    adminNew.arrMove = {
        up : function(arr,index){
            if(index == 0) return;
            var ele = arr.splice(index,1)[0];
            arr.splice(index-1,0,ele);
            return true;
        },
        down : function(arr,index){
            if(index == arr.length-1) return;
            var ele = arr.splice(index,1)[0];
            arr.splice(index+1,0,ele);
            return true;
        }
    }

    adminNew.user_group = adminNew.getQueryStr("user_group");

    adminNew.keyword_id = adminNew.getQueryStr("keyword_id");


    // 代理数据
    adminNew.listData = adminNew.returnData(listData);
    adminNew.keywordData = adminNew.returnData(keywordData);

    // 数据备份
    adminNew._listDataArr = adminNew.creatNewArr(adminNew.listData.resultArr);
    
    adminNew.vm = new Vue({
        el : "body",
        data : {
            listData :  adminNew.listData,
            keywordData : adminNew.keywordData,
            user_group : adminNew.user_group,
            keyword_id : adminNew.keyword_id,
            // 新建数据
            creatPop : {
                // 是否新建
                creat : true,
                editid : "",
                show : false,
                content : "",
                type : (!!adminNew.keywordData.resultJson[adminNew.keyword_id] && adminNew.keywordData.resultJson[adminNew.keyword_id].name) || ""
            },
            toolPop : {
                show : false,
                editid : "",
                editvalue : "",
                layerShow: false
            },
            labelList: (function(){
                var resultJSON = {};
                var resultArr = [];
                $.map(lableSel, function(ele , index){
                    resultArr.push(ele.id);
                    resultJSON[ele.id] = ele;
                });
                return {
                    resultJSON : resultJSON,
                    resultArr : resultArr
                };
            })(),
            labelLayer: "",
            labelShow: false
        },
        methods : {
            returnArr : function(arr, data){
                var names= $.map(arr, function(ele , index){
                    return data[ele].tag_name;
                }).join(",");
                return names;
            },
            //选择当前标签
            setSel: function(x, y){
                var tagList = this.keywordData.resultJson[x].tagList;
                var index = tagList.indexOf(y);
                if(index > -1){
                    tagList.splice(index, 1);
                }else{
                    tagList.push(y);
                }
            },
            //显示标签管理弹层
            toolPopShow : function(){
                this.toolPop.show = true;
                this.$nextTick(function(){
                    $(".tool_content>ul").heckScroll();
                });
            },
            showSel:function(id){
                if(this.labelLayer == id){
                    this.labelLayer = "";
                }else{
                    this.labelLayer = id;
                    this.labelShow = !this.labelShow;
                    this.$nextTick(function(){
                        $(".showLay").focus();
                    });
                }
                this.toolPop.editid = id;
                this.toolPop.editvalue = this.keywordData.resultJson[id].name;

            },
            hideSel : function(){
                this.labelLayer = "";
            },
            listDataDeal : function(type,id){
                this.creatPop.creat = type == 'add';
                if(!this.creatPop.creat){
                    this.creatPop.editid = id;
                    this.creatPop.content = adminNew.listData.resultJson[id].content;
                }
                this.creatPop.show = true;
            },
            listDataCreatHide : function(){
                this.creatPop.show = false;
                this.creatPop.content = "";
            },
            listDataCreatSure : function(){
                var that = this;
                    content = $.trim(that.creatPop.content);
                if(content == "") return alert("请输入内容");
                var flag1 = content.search(/{[^{}]*}/);
                var flag2 = content.match(/{[^{}]*}/g);

                if(flag2 != null && (flag2.length > 1 || (flag2.length == 1 && flag1 != 0))) return alert("{}的内容只能在内容的开头部分");

                var ajaxParam = (function(){
                    if(that.creatPop.creat){
                        return {
                            url : "/Knowledge/add",
                            data : {
                                user_group : adminNew.user_group,
                                keyword_id : adminNew.keyword_id,  
                                content : content
                            }
                        }
                    }else{
                        return {
                            url : "/Knowledge/edit",
                            data : {
                                id : that.creatPop.editid,
                                content : content
                            }
                        }
                    }
                })(),
                ajaxParams = $.extend({},ajaxParam,{
                    success : function(r){
                        if(r.status != 10000) return alert(r.message);
                        // alert("操作成功");
                        window.location.reload();
                    }
                });

                adminNew.doAjax(ajaxParams);
            },
            listDataDel : function(id){
                if(window.confirm("确定删除该内容吗？")){
                    adminNew.doAjax({
                        url : "/Knowledge/del",
                        data : {
                            id : id,
                            user_group: adminNew.user_group
                        },
                        success : function(r){
                            if(r.status != 10000) return alert(r.message);
                            alert("删除成功");
                            window.location.reload();
                        }
                    });
                }
            },
            listDataMove : function(index,type){
                var _listDataArr = adminNew._listDataArr.slice();
                if(!adminNew.listMove(adminNew._listDataArr,index,type)) return;

                adminNew.doAjax({
                    url : "/Knowledge/moveCardPush",
                    data : {
                        ids : adminNew._listDataArr.join(",")
                    },
                    success : function(r){
                        if(r.status != 10000){
                            alert("移动失败");
                            adminNew._listDataArr = _listDataArr;
                        }else{
                           adminNew.listMove(adminNew.listData.resultArr,index,type);
                        }
                    }
                });
                return;
            },
            keywordDataMove : function(index,type){
                adminNew.listMove(this.keywordData.resultArr,index,type)
            },
            keywordDataClosePop : function(){
                this.toolPop.editid = "";
                this.keywordData = adminNew.returnData(keywordData);
                this.toolPop.show = false;
            },
            keywordDataDelet : function(id){
                if(!!this.toolPop.editid) return alert("请先完成当前标签修改再操作");
                this.keywordData.resultArr.$remove(id);
                delete this.keywordData.resultJson[id];
            },
            keywordDataChange : function(id){
                if(!!this.toolPop.editid) return alert("请先完成当前标签修改再操作");
                this.toolPop.editid = id;
                this.toolPop.editvalue = this.keywordData.resultJson[id].name;
                this.keywordData.resultJson[id].flag = true;
            },
            keywordDataClose : function(id){
                this.keywordData.resultJson[id].flag = false;
                this.keywordData.resultJson[id].name = this.toolPop.editvalue;
                this.toolPop.editvalue = "";
                this.toolPop.editid = "";
            },
            keywordDataRight : function(id){
                var name = $.trim(this.keywordData.resultJson[id].name);
                var label = this.keywordData.resultJson[id].tagList.length;
                if(name == "") return alert("修改标签内容不能为空");
                if(label == 0) return alert("选择标签");
                this.keywordData.resultJson[id].flag = false;
                this.toolPop.editvalue = "";
                this.toolPop.editid = "";
                return true;
            },
            keywordDataAdd : function(){
                if(!!this.toolPop.editid) return alert("请先完成当前标签修改再操作");
                // 先生成临时id
                var id = "new" + new Date().getTime() + "";
                this.toolPop.editid = id;
                this.keywordData.resultArr.push(id);
                Vue.set(this.keywordData.resultJson,id,{
                    name : "",
                    flag : true,
                    isNew : true,
                    tagList : []
                });

            },
            keywordDataSure : function(){
                // keywordDataRight
                if(!!this.toolPop.editid){
                    var flag = this.keywordDataRight(this.toolPop.editid);
                    if(!flag) return;
                }
                if(!!this.toolPop.editid) return alert("请先完成当前标签修改再操作");
                // if(this.keywordData.resultJson[this.toolPop.editid].tagList.length == 0) return alert("请选择标签");
                // if(!!this.toolPop.editid) return alert("请先完成当前标签修改再操作");

                var keywordData = adminNew.getData(this.keywordData.resultArr,this.keywordData.resultJson);
                // console.log(keywordData);
                // return;
                var that = this;
                adminNew.doAjax({
                    url : "/Knowledge/saveKeyword",
                    data : {
                        user_group: adminNew.user_group,
                        data : keywordData
                    },
                    success : function(r){
                        if(r.status != 10000) return alert(r.message);
                        alert("保存成功");
                        if($.inArray(adminNew.keyword_id,that.keywordData.resultArr) > -1){
                            window.location.reload();
                        }else{
                            window.location.assign(window.location.href.split("&")[0]);
                        }
                        that.labelLayer = "";
                    }
                });

            }
        },
        filter:{
            showValue: function(id){
                var str = lableSel; 
                $.map(str, function(ele, index){
                    if(ele.id == id){
                        return ele.tag_name;
                    }
                });
            }
        }
    });

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
    
    $(".lable_inner").height($(".content_list").outerHeight() - $(".label_list").outerHeight()).css("visibility","visible");
});

    /*$.fn.heckScroll = function(){
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

    var  vm = new Vue({
        el : "body",
        data : {
            listData : listData,
            keywordData : keywordData,
            tool_pop : {
                show : false
            },
            change_text_pop : {
                show : false
            },
            url_title : "",
            pop :{
                show:false
            },
            creatPop : {
                show : false
            },
            changeContent : "111",//编辑弹窗的附加内容
            keyword_id  : "1",
            user_group : "",
            listDataCreatAdd : "",//页面内增加标签下的内容
            listDataChangeId : "",
            isReadonlyfalg : true
        },
        methods : {
            keywordDataUp : function(index){ //弹窗内上移
                if(index == 0) return;
                var that = this,
                    keywordData = that.keywordData,
                    value = keywordData.splice(index,1);
                keywordData.splice(index-1,0,value[0]);
            },
            keywordDataDown : function(index){//弹窗内下移
                var that = this,
                keywordData = that.keywordData;
                if(index == keywordData.length) return;    
                var value = keywordData.splice(index,1);
                keywordData.splice(index+1,0,value[0]);
            },
            keywordDataDelet : function(index){//弹窗内删除
                var that = this,
                keywordData = that.keywordData;
                keywordData.splice(index,1);
            },
            keywordDataChange : function(obj){//弹窗内编辑
                var that = this,
                keywordData = that.keywordData;
                keywordData[obj].flag = true;
                that.isReadonlyflag = false; //？？？怎么只改变当前改变readonly
            },
            keywordDataAdd : function(){//添加标签
                var that = this,
                keywordData = that.keywordData;
                keywordData.push({
                    id : "",
                    name : "",
                    flag : true
                })
            },
            keywordDataClosePop : function(){//关闭编辑标签弹窗
                this.tool_pop.show = false;
            },
            keywordDataShow : function(){//显示编辑标签弹窗
                this.tool_pop.show = true;
            },
            keywordDataClose : function(obj){//关闭编辑弹窗内的编辑功能
                var that = this,
                keywordData = that.keywordData;
                //判断关闭的是否为刚创建的
                if(obj.id == ""){
                    keywordData.splice(keywordData.length-1,1);
                }else{
                    obj.flag = false;
                }
            },
            keywordDataRight : function(obj){//修改完成点对号 ？？？？？？？
                if(obj.id == ""){ //如果点击的为刚创建的保存
                    //先判断输入框的内容是否为空
                        //空不保存
                    //非空
                        //ajax更新keywordData 的 id  name 
                        // $.ajax({
                        //     url:"/Knowledge/addKeyword",
                        //     type : "post",
                        //     dataType : "json",
                        //     data : {
                        //         name: '50次次卡',
                                // user_group:1
                        //     },
                        //     success : function(data){
                                
                        //     },
                        //     error : function(){
                                
                        //     },
                        //     complete : function(){
                                
                        //     }
                        // })

                }else{//非新创建
                   // 更新keywordData 的name

                }
            },
            listDataUp : function(index){ //页面内上移    ?????ajax 数据问题
                if(index == 0) return;
                var that = this,
                    listData = that.listData,
                    value = listData.splice(index,1);
                listData.splice(index-1,0,value[0]);
                ids = [];
                for(var i=0; i<this.listData.length; i++){
                    ids.push(this.listData[i].id);
                }
                $.ajax({
                    url:"/Knowledge/moveCardPush",
                    type : "post",
                    dataType : "json",
                    data : {
                        ids : ids.join(",")
                    },
                    success : function(data){
                        if(data.status = "10000"){
                            alert("cg");
                        }
                    },
                    error : function(){
                        
                    },
                    complete : function(){
                        
                    }
                })
            },
            listDataDown : function(index){
                var that = this,
                listData = that.listData;
                if(index == listData.length) return;    
                var value = listData.splice(index,1);
                listData.splice(index+1,0,value[0]);
                ids = [];
                for(var i=0; i<this.listData.length; i++){
                    ids.push(this.listData[i].id);
                }
                $.ajax({
                    url:"/Knowledge/moveCardPush",
                    type : "post",
                    dataType : "json",
                    data : {
                        ids : ids.join(",")
                    },
                    success : function(data){
                        if(data.status == "10000"){
                            alert("成功")
                        }
                    },
                    error : function(){
                        
                    },
                    complete : function(){
                        
                    }
                })
            },
            listDataChange : function(obj){ //页面内编辑弹窗显示加title
                this.change_text_pop.show = true;
                this.changeContent = obj.content;
                this.listDataChangeId = obj.id  //点击编辑按钮的时候保存id
            },
            listDataClose : function(){ //页面内编辑弹窗点击消失

                this.change_text_pop.show = false;
            },
            listDataDelShow : function(obj){ //删除弹窗
                obj.flag = true;
            },
            listDataDelHide : function(obj){ //删除弹窗
                obj.flag = false;
            },
            listDataCreatShow : function(){//创建标签下内容
                //？？？？在页面内获取开场白的title
                //var url = window.location.href;
                var url = "http://172.16.3.16:3000/admin_new.html?user_group=1&keyword=开hh场白";
                var index = url.indexOf("keyword");
                this.keyword = url.substr(index+8);
                //console.log(url.substr(index+8));
                this.creatPop.show = true;
            },
            listDataCreatHide : function(){
                this.creatPop.show = false;
            },
            listDataCreatSure : function(){//页面内创建标签内容
                //var url = window.location.href;
                var that = this;
                var url = "http://172.16.3.16:3000/admin_new.html?user_group=1&keyword_id=8888";
                var index = url.indexOf("keyword_id");
                this.keyword_id = url.substr(index+11);
                url_2  = url.substr(0,index-1);
                index_2 = url_2.indexOf("user_group");
                this.user_group = url_2.substr(index_2+11);
                console.log(this.keyword,this.user_group,"xxxxxxxx"+this.listDataCreatAdd);

                $.ajax({
                    url:"/Knowledge/add",
                    type : "post",
                    dataType : "json",
                    data : {
                        user_group:this.user_group,
                        keyword_id:this.keyword_id,  
                        content: this.listDataCreatAdd
                    },
                    success : function(data){
                        if(data.status = "10000"){
                            that.creatPop.show = false;
                            alert("成功")
                        }
                    },
                    error : function(){
                        
                    },
                    complete : function(){
                        
                    }
                })
            },
            listDataSure : function(){ //页面内编辑保存
                var that = this;
                $.ajax({
                    url:"/Knowledge/edit",
                    type : "post",
                    dataType : "json",
                    data : {
                        id : this.listDataChangeId,
                        content: this.changeContent
                    },
                    success : function(data){
                        if(data.status == "10000"){
                            that.change_text_pop.show = false;
                            alert("成功")
                        }
                    },
                    error : function(){
                        
                    },
                    complete : function(){
                        
                    }
                })
            },
            listDataDelSure : function(obj){ //页面内删除内容的确定按钮
                //var url = window.location.href;
                var url = "http://172.16.3.16:3000/admin_new.html?user_group=1&keyword=开hh场白";
                var index = url.indexOf("keyword_id");
                this.keyword_id = url.substr(index+11);
                url_2  = url.substr(0,index-1);
                index_2 = url_2.indexOf("user_group");
                this.user_group = url_2.substr(index_2+11);
                $.ajax({
                    url:"/Knowledge/del",
                    type : "post",
                    dataType : "json",
                    data : {
                        id : obj.id,
                        user_group: this.user_group
                    },
                    success : function(data){
                        if(data.status == "10000"){
                            obj.falg = false;
                            alert("成功");
                        }
                    },
                    error : function(){
                        
                    },
                    complete : function(){
                        
                    }
                })
            },
            keywordDataSure : function(){//编辑标签内的保存
                var url = "http://172.16.3.16:3000/admin_new.html?user_group=1&keyword=开hh场白";
                var index = url.indexOf("keyword");
                this.keyword = url.substr(index+8);
                url_2  = url.substr(0,index-1);
                index_2 = url_2.indexOf("user_group");
                this.user_group = url_2.substr(index_2+11);
                $.ajax({
                    url:"/Knowledge/saveKeyword",
                    type : "post",
                    dataType : "json",
                    data : {
                        data : this.keywordData,
                        user_group: this.user_group
                    },
                    success : function(data){
                        if(data.status == "10000"){
                            alert("成功")
                        }
                    },
                    error : function(){
                        
                    },
                    complete : function(){
                        
                    }
                })
            }
        }
    });





    return;
    // 滚动条
    
    $(".tool_content").find("ul").niceScroll(
        {
            cursorcolor : "#686b71",
            autohidemode: true,
            cursorwidth:7,
            cursorborderradius:"999px",
            cursorborder : 0,
            horizrailenabled:false
        }
    );

    var $list_left = $(".project_list").find("li"),
        $label_list = $(".label_list").find("li"),
        $lable_administration = $(".lable_administration"),
        $tool_pop = $(".tool_pop"),
        $del_1 = $(".del-1"),
        $del_2 = $(".del-2"),
        $del_3 = $(".del-3"),
        $chenge = $(".chenge"),
        $change_text_pop = $(".change_text_pop"),
        $delet = $(".delet"),
        $pop = $(".pop"),
        $not_btn = $(".not_btn"),
        $add_normal_text = $(".add_normal_text"),
        $creat_text_pop = $(".creat_text_pop"),
        $down = $(".down"),
        $up = $(".up"),
        $lable_inner = $(".lable_inner"),
        $tool_content = $(".tool_content"),
        changePopText,
        $add_mes = $(".add_mes"),
        $t_del = $(".t-del");

    var method = {
        listLeftActive : function(obj){//点击添加样式
            obj.on("click",function(){
                $(this).addClass("active").siblings().removeClass("active");     
            })
        },
        show : function(obj,pop){ // 标签管理和新建弹窗
            obj.on("click",function(){
                var that = $(this);
                pop.show();
            })
        },
        showPop : function(obj,pop){//编辑弹窗
            obj.on("click",".chenge",function(){
                var that = $(this);
                pop.find("textarea").val(that.parent().parent().prev().text());
                pop.show();
            })
        },
        showPopDel : function(obj,pop){//删除弹窗
            obj.on("click",".delet",function(){
                var that = $(this);
                that.parent().next().show();
                that.parent().parent().parent().siblings().find(".pop").hide();
            })
        },
        hidePop : function(obj,pop){//隐藏弹窗
            obj.on("click",function(){
                    pop.hide();                    
            })
        },
        hidePopDel : function(obj,pop){//绑定删除弹框
            obj.on("click",".not_btn",function(){
                    var that = $(this);
                    that.parent().parent().hide();                    
            })
        },
        upIndex : function(obj){ //主页面内上移
            obj.on("click",".up",function(){
                var that = $(this),
                    parent = that.parent().parent().parent();
                    
                if(parent.prev().length){
                    parent.prev().before("<dl class='clear-fix'>"+parent.html()+"</dl>");
                    parent.remove();
                }
            })
        },
        downIndex : function(obj){ //主页面内下移
            obj.on("click",".down",function(){
                var that = $(this),
                    parent = that.parent().parent().parent();
                    
                if(parent.next().length){
                    parent.next().after("<dl class='clear-fix'>"+parent.html()+"</dl>");
                    parent.remove();
                }
            })
        },
        sureFun : function(obj){//弹框内编辑保存
            obj.on("click",".right",function(){
                var that = $(this);
                that.parent().removeClass("change_t").addClass("normal_t");
                that.parent().find("input").attr("readonly","true");
                if(that.parent().find("input").val() == ""){
                    that.parent().parent().remove();
                }
            })
        },
        closeFun : function(obj){//弹框内编辑挂壁
            obj.on("click",".error",function(){
                var that = $(this);
                that.parent().find("input").val(changePopText);
                that.parent().removeClass("change_t").addClass("normal_t");
                that.parent().find("input").attr("readonly","true");
                if(that.parent().find("input").val() == ""){
                    that.parent().parent().remove();
                }
            })
        },
        changeTextFun : function(obj){//d点击弹窗内修改
            obj.on("click",".t-change",function(){
                var that = $(this);
                changePopText = that.parent().prev().find("input").val();
                that.parent().prev().removeClass("normal_t").addClass("change_t");
                that.parent().prev().find("input").removeAttr("readonly");
            })
        },
        addPopFun : function(obj){ //点击弹窗内的添加标签按钮
            obj.on("click",function(){
                changePopText =="";
                $(this).parent().before('<li class="clear-fix"><p class="change_t"><input type="text" value="" /><span class="right"></span><span class="error"></span></p><p class="change_tool"><span class="t-up">上移 &nbsp;&nbsp;|</span><span class="t-down">&nbsp;&nbsp;下移 &nbsp;&nbsp;|</span><span class="t-change">&nbsp;&nbsp;修改 &nbsp;&nbsp;|</span><span class="t-del">&nbsp;&nbsp;删除</span></p></li> ');
            })  
        },
        deletePop : function(obj){//弹窗内删除标签
            obj.on("click",".t-del",function(){
                var that = $(this);
                that.parent().parent().remove();
            })    
        },
        upPop : function(obj){ //弹窗内上移
            obj.on("click",".t-up",function(){
                var that = $(this),
                    parent = that.parent().parent();
                    
                if(parent.prev().length){
                    parent.prev().before("<li class='clear-fix'>"+parent.html()+"</li>");
                    parent.remove();
                }
            })
        },
        downPop : function(obj){
            obj.on("click",".t-down",function(){
                var that = $(this),
                    parent = that.parent().parent();
                    
                if(parent.next().next().length){
                    parent.next().after("<li class='clear-fix'>"+parent.html()+"</li>");
                    parent.remove();
                }
            })
        }
    }


    // 调用
    method.listLeftActive($list_left);
    method.listLeftActive($label_list);
    method.show($lable_administration,$tool_pop);
    method.upIndex($lable_inner);
    method.showPop($lable_inner ,$change_text_pop);
    method.hidePop($del_2,$change_text_pop);
    method.showPopDel($lable_inner,$pop);
    method.hidePopDel($lable_inner,$pop);//删除弹框
    method.show($add_normal_text ,$creat_text_pop);
    method.hidePop($del_1,$tool_pop);
    method.hidePop($del_3,$creat_text_pop);
    method.downIndex($lable_inner);
    method.changeTextFun($tool_content);
    method.sureFun($tool_content);
    method.closeFun($tool_content);
    method.addPopFun($add_mes);
    method.deletePop($tool_content);
    method.upPop($tool_content);
    method.downPop($tool_content);



});


*/

/*标签管理
user_group_data : [
    {
        id : 5,
        content : "5"
    },
    {
        id : 1,
        content : "1"
    }
]

标签增加
user_group
content

返回id

标签保存

{
    user_group : user_group,
    user_group_data : [
        {
            id : 5,
            content : "5"
        },
        {
            id : 1,
            content : "1"
        }
    ]
}

新建标签内容
user_group
keyword_id
content

上移 下移*/

