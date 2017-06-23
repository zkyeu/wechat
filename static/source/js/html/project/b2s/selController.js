define("selController",[],function(require,exports,module){
    var proObj = [{id:"1",name:"北京"},{id:"2",name:"上海"},{id:"5",name:"云南"}];
    // 城市选择控件
    ;(function($){
        $.selController = {
            dataCache : {
                pro : {},
                city : {},
                area : {},
                school : {}
            },
            defaults : {
                triggerType : "click",
                selector : "",
                title : "选择城市",
                subtitle : "所在城市",
                height : 240,
                // 初始数据
                preData : proObj,
                // 获取数据的地址
                dataURL : {
                    url : {
                        city : "/ajax/selectCityByProv",
                        area : "/ajax/selectDistrictByCity",
                        school : "/ajax/selectSchool",
                        filter : "/ajax/selectSchoolByFirstletter"                   
                    },
                    key : {
                        city : "province_id",
                        area : "city_id",
                        school : "district_id",
                        filter : "firstletter"
                    }
                },
                // type school city area school可选
                type : "school",
                onlyCity : false,
                // 提交回调
                callback : null,
                // 点击提交
                clickCb : null 
            },
            typeConfig : {
                pro : {
                    title : "选择省份",
                    subtitle : "所在省份",
                    height : 240                
                },
                city : {
                    title : "选择城市",
                    subtitle : "所在城市",
                    height : 240
                },
                area : {
                    title : "选择地区",
                    subtitle : "所在地区",
                    height : 240                
                },
                school : {
                    title : "选择学校",
                    subtitle : "学校地区",
                    height : 460              
                }
            },
            uiConfig : [
                ["pro","city","area","school"],
                ["省","市","区"]
            ]
        }

        $.fn.selController = function(opts){
            var
            self = $(this),
            selController = $.selController,
            defaults = selController.defaults,
            typeConfig = selController.typeConfig,
            uiConfig = selController.uiConfig,
            uiarr = uiConfig[0],
            uitxt = uiConfig[1],
            // 更新配置
            configs = $.extend({},defaults,opts),
            type = configs.type,
            dindex = $.inArray(type,uiarr);
            // 假设没有正确的type
            if(dindex == -1) return self;
            // 再次更新配置
            $.extend(configs,typeConfig[type],opts);
            

            var
            sel = new function(){
                var me = this;

                me.result = {};

                me.init = function(){
                    if(!me.ui) me.createUI();
                        else me.ui.show();                    
                }

                me.createSel = function(){
                    var
                    sindex = dindex+1,
                    result = [],
                    isSchool = sindex==4;
                    // 如果为school
                    if(isSchool) sindex = 3;

                    result.push('<div class="address clearfix">');
                    result.push('<label>'+configs.title+'：</label>');

                    $.each(uiarr.slice(0,sindex),function(i,v){
                        if(configs.onlyCity &&  i==0) return true;
                        result.push('<div class="sel" tabindex="-1" rel="'+v+'"><h4>'+uitxt[i]+'</h4><i class="tenIcon selIcon"></i><ul class="list"></ul></div>');
                    });
                    result.push('</div>');

                    if(isSchool){
                        result.push('<div class="schools">\
                                        <div class="labels clearfix">\
                                            <label>选择学校：</label>\
                                            <span class="active all">全部</span>\
                                            <span>A B C</span>\
                                            <span>D E F</span>\
                                            <span>G H I</span>\
                                            <span>J K L</span>\
                                            <span>M N O</span>\
                                            <span>P Q R</span>\
                                            <span>S T U</span>\
                                            <span>V W X</span>\
                                            <span class="last">Y Z</span>\
                                        </div>\
                                        <div rel="school">\
                                            <ul class="m-school-list list clearfix"></ul>\
                                        </div>\
                                    </div>');
                    }
                    return result.join("");
                }

                me.createUI = function(){
                    // 判断type 决定结构
                    var
                    selUI = me.createSel(),
                    ui  =   '<div class="m-schoolx '+configs.selector+'">\
                                <div class="content">\
                                    <h3 class="u-title">'+configs.title+' <a href="javascript:;" class="close"></a></h3>\
                                    <div class="m-school-form">\
                                        '+ selUI +'\
                                        <div class="schools">\
                                            <div class="makeSure">\
                                                <a href="javascript:;" class="submit">确定</a>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                             </div>';
                    me.ui = $(ui).appendTo("body");
                    me.setSelector();
                    me.resetPos();
                    me.bindEvent();
                    me.ui.show();              
                }

                me.resetPos = function(){
                    var s = me.s;
                    s.content.css({
                        height:configs.height,
                        marginTop:-configs.height/2
                    });
                    s.sel.css({
                        outline : "none"
                    });
                    s.list.filter(":not('.m-school-list')").css({
                        height : "auto",
                        maxHeight : 100
                    });
                }

                me.bindEvent = function(){
                    me.setClose();
                    me.setDefpro();
                    me.setSel();
                    me.setFilter();
                    me.setSubmit();        
                }

                me.setSelector = function(){
                    var ui = me.ui,
                        s = {};
                    s.content = ui.find(".content"),
                    s.closebtn = s.content.find(".u-title a");
                    s.sel = s.content.find("[rel]");
                    s.pro = s.sel.filter("[rel=pro]");
                    s.city = s.sel.filter("[rel=city]");
                    s.result = s.sel.filter("[rel="+ type +"]")
                    s.list = s.sel.find(".list");
                    s.labels = s.content.find(".schools .labels");
                    s.schoollist = s.content.find(".schools ul");
                    s.submit = s.content.find(".submit");
                    me.s = s;
                }

                me.setClose = function(){
                    me.s.closebtn.on("click",me.close);
                }

                me.close = function(){
                    me.ui.hide();
                }
                // 设置默认省
                me.setDefpro = function(){
                    if(configs.onlyCity){
                        me.getSel.call(me.s.city,configs.preData);
                    }else{
                        me.getSel.call(me.s.pro,configs.preData);
                    }
                }

                me.getSel = function(data){
                    if(!(data instanceof Array)) return;
                    var lis = [],
                        self = this,
                        list = $(data).map(function(i,v){
                            return '<li data-id="'+v.id+'">'+v.name+'</li>';
                        }),
                        listwrap = self.find(".list");
                    
                    if(listwrap.hasClass("m-school-list")) listwrap.addClass("m-school-list2");
                    listwrap.html(list.get().join(""));
                }

                me.setFilter = function(){
                    // 以后再改
                    if(dindex != 3) return;
                    var s = me.s;
                    s.labels.on("click","span",function(){
                        var self = $(this);
                        if(!s.schoollist.find("li")[0] || self.hasClass("active")) return;
                        var url = configs.dataURL.url.school,
                            district_id = me.s.sel.filter("[rel=area]").attr("data-id"),
                            dataURL = configs.dataURL,
                            url = dataURL["url"],
                            key = dataURL["key"];
                            
                        if(self.hasClass("all")){
                            url = url.school + "?" + key.school + "=" + district_id;
                        }else{
                            url = url.filter + "?" + key.school + "=" + district_id + "&" + key.filter + "=" + encodeURIComponent(self.text().split(" ").join(","));
                        }

                        $.get(url,function(r){
                            me.updateSel(3,r.data);
                            self.css({
                                backgroundPosition : "15px 35px"
                            }).addClass("active").siblings().removeClass("active");                        
                        },"json");


                    });
                }

                me.setSel = function(){
                    me.s.sel.on({
                        click:function(){
                            var list = $(this).find(".list");
                            // 这部分不合理 以后再改进
                            if(!list.find("li")[0]) return;
                            list.show();
                        },
                        blur:function(){
                            $(this).find(".list").hide();
                        }                   
                    }).on("click",".list li",function(e){
                        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                        var self = $(this),
                            data = self.attr("data-id"),
                            text = self.text(),
                            delegateTarget = $(e.delegateTarget),
                            rel = delegateTarget.attr("rel"),
                            target = delegateTarget.find("h4"),
                            gindex = $.inArray(rel,uiarr),
                            listwrap = self.parent(".list");

                        // 如果为选学校
                        if(gindex == 3){
                            self.addClass("active").siblings().removeClass("active");
                        }else{
                            listwrap.hide();
                        }
                        
                        if(data == delegateTarget.attr("data-id")) return;
                        target.text(text);
                        delegateTarget.attr("data-id",data);

                        me.result[rel] = [data,text];

                        ;(function(){
                            clickCb = configs.clickCb;
                            if(typeof (clickCb) == "function") clickCb.call(null,{
                                rel : rel,
                                data : data,
                                close : me.close
                            });
                        })();
                         

                        // 判断是否可以提交
                        if(dindex == gindex){
                            me.s.submit.addClass("active");
                        }else{
                        // 更新下级数据
                            // 获得下级菜单
                            var nindex = ++gindex,
                                next = uiarr[nindex],
                                dataCache = selController["dataCache"][next];
                            // 查看缓存
                            if(data in dataCache){
                                me.updateSel(nindex,dataCache[data]);
                            }else{
                                var dataURL = configs.dataURL,
                                    url = dataURL["url"][next],
                                    key = dataURL["key"][next],
                                    sendURL = url + "?" + key + "=" + data;
                                $.get(sendURL,function(r){
                                    if(r.status != 1) return;
                                    me.updateSel(nindex,r.data);
                                    dataCache[data] = r.data;
                                },"json");
                            }
                        }
                    });
                }

                me.updateSel = function(nindex,data){
                    var
                    next = uiarr[nindex],
                    txt = uitxt[nindex],
                    sel = me.s.sel,
                    next = sel.filter("[rel="+ next +"]"),
                    target = next.find("h4");
                    target.text(txt);
                    next.removeAttr("data-id");
                    me.getSel.call(next,data);

                    if(nindex == 3){
                        me.s.labels.find("span").eq(0).addClass("active").siblings().removeClass("active");
                    }

                    // 清空下级以后的数据
                    ;(function(){
                        if(nindex < dindex){
                            var clear = uiarr.slice(nindex+1, dindex+1);
                            $.each(clear,function(i,v){
                                sel.filter("[rel="+ v +"]").removeAttr("data-id").find("ul").html("").siblings("h4").text(uitxt[nindex+1+i]);
                            });
                        }
                    })();
                    // 变更为不可提交
                    me.s.submit.removeClass("active");                
                }

                me.setSubmit = function(){
                    me.s.submit.on("click",function(){
                        var $self = $(this);
                        if(!$self.hasClass("active")) return;
                        var callback = configs.callback;
                        if(typeof(callback) == "function"){
                            callback.call(null,me.result);
                        }
                        me.close();
                    });
                }

            }

            self.on(configs.triggerType,sel.init);
        }
    })(jQuery);

});