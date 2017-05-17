
;!function(win){

    "use strict";
    var Lay = function(){
        this.v = '1.0.7'; //版本号
    };
    Lay.fn = Lay.prototype;
    var doc = document, config = Lay.fn.cache = {},
//获取layui所在目录
        getPath = function(){
            var js = doc.scripts, jsPath = js[js.length - 1].src;
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        }(),
//异常提示
        error = function(msg){
            win.console && console.error && console.error('Layui hint: ' + msg);
        },
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
//内置模块
        modules = {
            laydate: 'laydate'
            // ,'layui.mod': 'dest/layui.mod' //PC模块合并版
        };
    config.modules = {}; //记录模块物理路径
    config.status = {}; //记录模块加载状态
    config.timeout = 10; //符合规范的模块请求最长等待秒数
    config.event = {}; //记录模块自定义事件
//定义模块
    Lay.fn.define = function(deps, callback){
        var that = this
            ,type = typeof deps === 'function'
            ,mods = function(){
            typeof callback === 'function' && callback(function(app, exports){
                layui[app] = exports;
                config.status[app] = true;
            });
            return this;
        };
        type && (
            callback = deps,
                deps = []
        );
        if(layui['layui.all']){
            return mods.call(that);
        };
        that.use(deps, mods);
        return that;
    };
//使用特定模块
    Lay.fn.use = function(apps, callback, exports){
        var that = this, dir = config.dir = config.dir ? config.dir : getPath;
        var head = doc.getElementsByTagName('head')[0];
        apps = typeof apps === 'string' ? [apps] : apps;

        //如果页面已经存在jQuery1.7+库且所定义的模块依赖jQuery，则不加载内部jquery模块
        if(window.jQuery && jQuery.fn.on){
            that.each(apps, function(index, item){
                if(item === 'jquery'){
                    apps.splice(index, 1);
                }
            });
            layui.jquery = jQuery;
        }

        var item = apps[0], timeout = 0;
        exports = exports || [];
        //静态资源host
        config.host = config.host || (dir.match(/\/\/([\s\S]+?)\//)||['//'+ location.host +'/'])[0];

        if(apps.length === 0 || (layui['layui.all'] && modules[item])){
            return typeof callback === 'function' && callback.apply(layui, exports), that;
        }
        //加载完毕
        function onScriptLoad(e, url){
            var readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
            if (e.type === 'load' || (readyRegExp.test((e.currentTarget || e.srcElement).readyState))) {
                config.modules[item] = url;
                head.removeChild(node);
                (function poll() {
                    if(++timeout > config.timeout * 1000 / 4){
                        return error(item + ' is not a valid module');
                    };
                    config.status[item] ? onCallback() : setTimeout(poll, 4);
                }());
            }
        }
        //加载模块
        var node = doc.createElement('script'), url =  (
                modules[item] ? dir : (config.base || '')
            ) + (that.modules[item] || item) + '.js';
        node.async = true;
        node.charset = 'utf-8';
        node.src = url + function(){
                var version = config.version === true
                    ? (config.v || (new Date()).getTime())
                    : (config.version||'');
                return version ? ('?v=' + version) : '';
            }();

        //首次加载
        if(!config.modules[item]){
            head.appendChild(node);
            if(node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera){
                node.attachEvent('onreadystatechange', function(e){
                    onScriptLoad(e, url);
                });
            } else {
                node.addEventListener('load', function(e){
                    onScriptLoad(e, url);
                }, false);
            }
        } else {
            (function poll() {
                if(++timeout > config.timeout * 1000 / 4){
                    return error(item + ' is not a valid module');
                };
                (typeof config.modules[item] === 'string' && config.status[item])
                    ? onCallback()
                    : setTimeout(poll, 4);
            }());
        }

        config.modules[item] = url;

        //回调
        function onCallback(){
            exports.push(layui[item]);
            apps.length > 1 ?
                that.use(apps.slice(1), callback, exports)
                : ( typeof callback === 'function' && callback.apply(layui, exports) );
        }
        return that;
    };
//获取节点的style属性值
    Lay.fn.getStyle = function(node, name){
        var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
        return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
    };
//css外部加载器
    Lay.fn.link = function(href, fn, cssname){
        var that = this, link = doc.createElement('link');
        var head = doc.getElementsByTagName('head')[0];
        if(typeof fn === 'string') cssname = fn;
        var app = (cssname || href).replace(/\.|\//g, '');
        var id = link.id = 'layuicss-'+app, timeout = 0;

        link.rel = 'stylesheet';
        link.href = href + (config.debug ? '?v='+new Date().getTime() : '');
        link.media = 'all';

        if(!doc.getElementById(id)){
            head.appendChild(link);
        }
        if(typeof fn !== 'function') return ;

        //轮询css是否加载完毕
        (function poll() {
            if(++timeout > config.timeout * 1000 / 100){
                return error(href + ' timeout');
            };
            parseInt(that.getStyle(doc.getElementById(id), 'width')) === 1989 ? function(){
                    fn();
                }() : setTimeout(poll, 100);
        }());
    };
//css内部加载器
    Lay.fn.addcss = function(firename, fn, cssname){
        // layui.link(config.dir + 'css/' + firename, fn, cssname);
    };
//图片预加载
    Lay.fn.img = function(url, callback, error) {
        var img = new Image();
        img.src = url;
        if(img.complete){
            return callback(img);
        }
        img.onload = function(){
            img.onload = null;
            callback(img);
        };
        img.onerror = function(e){
            img.onerror = null;
            error(e);
        };
    };
//全局配置
    Lay.fn.config = function(options){
        options = options || {};
        for(var key in options){
            config[key] = options[key];
        }
        return this;
    };
//记录全部模块
    Lay.fn.modules = function(){
        var clone = {};
        for(var o in modules){
            clone[o] = modules[o];
        }
        return clone;
    }();
//拓展模块
    Lay.fn.extend = function(options){
        var that = this;
        //验证模块是否被占用
        options = options || {};
        for(var o in options){
            if(that[o] || that.modules[o]){
                error('\u6A21\u5757\u540D '+ o +' \u5DF2\u88AB\u5360\u7528');
            } else {
                that.modules[o] = options[o];
            }
        }

        return that;
    };
//路由
    Lay.fn.router = function(hash){
        var hashs = (hash || location.hash).replace(/^#/, '').split('/') || [];
        var item, param = {
            dir: []
        };
        for(var i = 0; i < hashs.length; i++){
            item = hashs[i].split('=');
            /^\w+=/.test(hashs[i]) ? function(){
                    if(item[0] !== 'dir'){
                        param[item[0]] = item[1];
                    }
                }() : param.dir.push(hashs[i]);
            item = null;
        }
        return param;
    };
//本地存储
    Lay.fn.data = function(table, settings){
        table = table || 'layui';

        if(!win.JSON || !win.JSON.parse) return;

        //如果settings为null，则删除表
        if(settings === null){
            return delete localStorage[table];
        }

        settings = typeof settings === 'object'
            ? settings
            : {key: settings};

        try{
            var data = JSON.parse(localStorage[table]);
        } catch(e){
            var data = {};
        }

        if(settings.value) data[settings.key] = settings.value;
        if(settings.remove) delete data[settings.key];
        localStorage[table] = JSON.stringify(data);

        return settings.key ? data[settings.key] : data;
    };
//提示
    Lay.fn.hint = function(){
        return {
            error: error
        }
    };
//遍历
    Lay.fn.each = function(obj, fn){
        var that = this, key;
        if(typeof fn !== 'function') return that;
        obj = obj || [];
        if(obj.constructor === Object){
            for(key in obj){
                if(fn.call(obj[key], key, obj[key])) break;
            }
        } else {
            for(key = 0; key < obj.length; key++){
                if(fn.call(obj[key], key, obj[key])) break;
            }
        }
        return that;
    };
//阻止事件冒泡
    Lay.fn.stope = function(e){
        e = e || win.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    };
//自定义模块事件
    Lay.fn.onevent = function(modName, events, callback){
        if(typeof modName !== 'string'
            || typeof callback !== 'function') return this;
        config.event[modName + '.' + events] = [callback];

        //不再对多次事件监听做支持
        /*
         config.event[modName + '.' + events]
         ? config.event[modName + '.' + events].push(callback)
         : config.event[modName + '.' + events] = [callback];
         */

        return this;
    };
//执行自定义模块事件
    Lay.fn.event = function(modName, events, params){
        var that = this, result = null, filter = events.match(/\(.*\)$/)||[]; //提取事件过滤器
        var set = (events = modName + '.'+ events).replace(filter, ''); //获取事件本体名
        var callback = function(_, item){
            var res = item && item.call(that, params);
            res === false && result === null && (result = false);
        };
        layui.each(config.event[set], callback);
        filter[0] && layui.each(config.event[events], callback); //执行过滤器中的事件
        return result;
    };
    win.layui = new Lay();
}(window);

/**

 @Name : layDate v1.1 日期控件
 @Author: 贤心
 @Date: 2014-06-25

 */

layui.define(function(exports){
    "use strict";

    var win = window;

    //全局配置，如果采用默认均不需要改动
    var config =  {
        path: '', //laydate所在路径
        skin: 'default', //初始化皮肤
        format: 'YYYY-MM-DD', //日期格式
        min: '1900-01-01 00:00:00', //最小日期
        max: '2099-12-31 23:59:59', //最大日期
        isv: false,
        init: true
    };

    var Dates = {}, doc = document, creat = 'createElement', byid = 'getElementById', tags = 'getElementsByTagName';
    var as = ['laydate_box', 'laydate_void', 'laydate_click', 'LayDateSkin', 'skins/', '/laydate.css'];


    //主接口
    win.laydate = function(options){
        options = options || {};
        Dates.run(options);
        return laydate;
    };

    laydate.v = '1.1';

    Dates.trim = function(str){
        str = str || '';
        return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
    };

    //补齐数位
    Dates.digit = function(num){
        return num < 10 ? '0' + (num|0) : num;
    };

    Dates.stopmp = function(e){
        e = e || win.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        return this;
    };

    Dates.each = function(arr, fn){
        var i = 0, len = arr.length;
        for(; i < len; i++){
            if(fn(i, arr[i]) === false){
                break
            }
        }
    };

    Dates.hasClass = function(elem, cls){
        elem = elem || {};
        return new RegExp('\\b' + cls +'\\b').test(elem.className);
    };

    Dates.addClass = function(elem, cls){
        elem = elem || {};
        Dates.hasClass(elem, cls) || (elem.className += ' ' + cls);
        elem.className = Dates.trim(elem.className);
        return this;
    };

    Dates.removeClass = function(elem, cls) {
        elem = elem || {};
        if (Dates.hasClass(elem, cls)) {
            var reg = new RegExp('\\b' + cls +'\\b');
            elem.className = elem.className.replace(reg, '');
        }
        return this;
    };

    //清除css属性
    Dates.removeCssAttr = function(elem, attr){
        var s = elem.style;
        if(s.removeProperty){
            s.removeProperty(attr);
        } else {
            s.removeAttribute(attr);
        }
    };

    //显示隐藏
    Dates.shde = function(elem, type){
        elem.style.display = type ? 'none' : 'block';
    };

    //简易选择器
    Dates.query = function(node){
        if(node && node.nodeType === 1){
            if(node.tagName.toLowerCase() !== 'input'){
                throw new Error('选择器elem错误');
            }
            return node;
        }

        var node = (Dates.trim(node)).split(' '), elemId = doc[byid](node[0].substr(1)), arr;
        if(!elemId){
            return;
        } else if(!node[1]){
            return elemId;
        } else if(/^\./.test(node[1])){
            var find, child = node[1].substr(1), exp = new RegExp('\\b' + child +'\\b');
            arr = []
            find = doc.getElementsByClassName ? elemId.getElementsByClassName(child) : elemId[tags]('*');
            Dates.each(find, function(ii, that){
                exp.test(that.className) && arr.push(that);
            });
            return arr[0] ? arr : '';
        } else {
            arr = elemId[tags](node[1]);
            return arr[0] ? elemId[tags](node[1]) : '';
        }
    };

    //事件监听器
    Dates.on = function(elem, even, fn){
        elem.attachEvent ? elem.attachEvent('on'+ even, function(){
                fn.call(elem, win.even);
            }) : elem.addEventListener(even, fn, false);
        return Dates;
    };

    //阻断mouseup
    Dates.stopMosup = function(evt, elem){
        if(evt !== 'mouseup'){
            Dates.on(elem, 'mouseup', function(ev){
                Dates.stopmp(ev);
            });
        }
    };

    Dates.run = function(options){
        var S = Dates.query, elem = options.elem, devt;

        if(!elem) return;

        as.elemv = /textarea|input/.test(elem.tagName.toLocaleLowerCase()) ? 'value' : 'innerHTML';
        if (('init' in options ? options.init : config.init) && (!elem[as.elemv])) elem[as.elemv] = laydate.now(null, options.format || config.format);

        Dates.view(elem, options);
        Dates.reshow();

    };

    Dates.scroll = function(type){
        type = type ? 'scrollLeft' : 'scrollTop';
        return doc.body[type] | doc.documentElement[type];
    };

    Dates.winarea = function(type){
        return document.documentElement[type ? 'clientWidth' : 'clientHeight']
    };

    //判断闰年
    Dates.isleap = function(year){
        return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
    };

    //检测是否在有效期
    Dates.checkVoid = function(YY, MM, DD){
        var back = [];
        YY = YY|0;
        MM = MM|0;
        DD = DD|0;
        if(YY < Dates.mins[0]){
            back = ['y'];
        } else if(YY > Dates.maxs[0]){
            back = ['y', 1];
        } else if(YY >= Dates.mins[0] && YY <= Dates.maxs[0]){
            if(YY == Dates.mins[0]){
                if(MM < Dates.mins[1]){
                    back = ['m'];
                } else if(MM == Dates.mins[1]){
                    if(DD < Dates.mins[2]){
                        back = ['d'];
                    }
                }
            }
            if(YY == Dates.maxs[0]){
                if(MM > Dates.maxs[1]){
                    back = ['m', 1];
                } else if(MM == Dates.maxs[1]){
                    if(DD > Dates.maxs[2]){
                        back = ['d', 1];
                    }
                }
            }
        }
        return back;
    };

    //时分秒的有效检测
    Dates.timeVoid = function(times, index){
        if(Dates.ymd[1]+1 == Dates.mins[1] && Dates.ymd[2] == Dates.mins[2]){
            if(index === 0 && (times < Dates.mins[3])){
                return 1;
            } else if(index === 1 && times < Dates.mins[4]){
                return 1;
            } else if(index === 2 && times < Dates.mins[5]){
                return 1;
            }
        } else if(Dates.ymd[1]+1 == Dates.maxs[1] && Dates.ymd[2] == Dates.maxs[2]){
            if(index === 0 && times > Dates.maxs[3]){
                return 1;
            } else if(index === 1 && times > Dates.maxs[4]){
                return 1;
            } else if(index === 2 && times > Dates.maxs[5]){
                return 1;
            }
        }
        if(times > (index ? 59 : 23)){
            return 1;
        }
    };

    //检测日期是否合法
    Dates.check = function(){
        var reg = Dates.options.format.replace(/YYYY|MM|DD|hh|mm|ss/g,'\\d+\\').replace(/\\$/g, '');
        var exp = new RegExp(reg), value = Dates.elem[as.elemv];
        var arr = value.match(/\d+/g) || [], isvoid = Dates.checkVoid(arr[0], arr[1], arr[2]);
        if(value.replace(/\s/g, '') !== ''){
            if(!exp.test(value)){
                Dates.elem[as.elemv] = '';
                Dates.msg('日期不符合格式，请重新选择。');
                return 1;
            } else if(isvoid[0]){
                Dates.elem[as.elemv] = '';
                Dates.msg('日期不在有效期内，请重新选择。');
                return 1;
            } else {
                isvoid.value = Dates.elem[as.elemv].match(exp).join();
                arr = isvoid.value.match(/\d+/g);
                if(arr[1] < 1){
                    arr[1] = 1;
                    isvoid.auto = 1;
                } else if(arr[1] > 12){
                    arr[1] = 12;
                    isvoid.auto = 1;
                } else if(arr[1].length < 2){
                    isvoid.auto = 1;
                }
                if(arr[2] < 1){
                    arr[2] = 1;
                    isvoid.auto = 1;
                } else if(arr[2] > Dates.months[(arr[1]|0)-1]){
                    arr[2] = 31;
                    isvoid.auto = 1;
                } else if(arr[2].length < 2){
                    isvoid.auto = 1;
                }
                if(arr.length > 3){
                    if(Dates.timeVoid(arr[3], 0)){
                        isvoid.auto = 1;
                    };
                    if(Dates.timeVoid(arr[4], 1)){
                        isvoid.auto = 1;
                    };
                    if(Dates.timeVoid(arr[5], 2)){
                        isvoid.auto = 1;
                    };
                }
                if(isvoid.auto){
                    Dates.creation([arr[0], arr[1]|0, arr[2]|0], 1);
                } else if(isvoid.value !== Dates.elem[as.elemv]){
                    Dates.elem[as.elemv] = isvoid.value;
                }
            }
        }
    };

    //生成日期
    Dates.months = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    Dates.viewDate = function(Y, M, D){
        var S = Dates.query, log = {}, De = new Date();
        Y < (Dates.mins[0]|0) && (Y = (Dates.mins[0]|0));
        Y > (Dates.maxs[0]|0) && (Y = (Dates.maxs[0]|0));

        De.setFullYear(Y, M, D);
        log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];

        Dates.months[1] = Dates.isleap(log.ymd[0]) ? 29 : 28;

        De.setFullYear(log.ymd[0], log.ymd[1], 1);
        log.FDay = De.getDay();

        log.PDay = Dates.months[M === 0 ? 11 : M - 1] - log.FDay + 1;
        log.NDay = 1;

        //渲染日
        Dates.each(as.tds, function(i, elem){
            var YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
            elem.className = '';
            if(i < log.FDay){
                elem.innerHTML = DD = i + log.PDay;
                Dates.addClass(elem, 'laydate_nothis');
                MM === 1 && (YY -= 1);
                MM = MM === 1 ? 12 : MM - 1;
            } else if(i >= log.FDay && i < log.FDay + Dates.months[log.ymd[1]]){
                elem.innerHTML = DD = i  - log.FDay + 1;
                if(i - log.FDay + 1 === log.ymd[2]){
                    Dates.addClass(elem, as[2]);
                    log.thisDay = elem;
                }
            } else {
                elem.innerHTML = DD = log.NDay++;
                Dates.addClass(elem, 'laydate_nothis');
                MM === 12 && (YY += 1);
                MM = MM === 12 ? 1 : MM + 1;
            }

            if(Dates.checkVoid(YY, MM, DD)[0]){
                Dates.addClass(elem, as[1]);
            }

            Dates.options.festival && Dates.festival(elem, MM + '.' + DD);
            elem.setAttribute('y', YY);
            elem.setAttribute('m', MM);
            elem.setAttribute('d', DD);
            YY = MM = DD = null;
        });

        Dates.valid = !Dates.hasClass(log.thisDay, as[1]);
        Dates.ymd = log.ymd;

        //锁定年月
        as.year.value = Dates.ymd[0] + '年';
        as.month.value = Dates.digit(Dates.ymd[1] + 1) + '月';

        //定位月
        Dates.each(as.mms, function(i, elem){
            var getCheck = Dates.checkVoid(Dates.ymd[0], (elem.getAttribute('m')|0) + 1);
            if(getCheck[0] === 'y' || getCheck[0] === 'm'){
                Dates.addClass(elem, as[1]);
            } else {
                Dates.removeClass(elem, as[1]);
            }
            Dates.removeClass(elem, as[2]);
            getCheck = null
        });
        Dates.addClass(as.mms[Dates.ymd[1]], as[2]);

        //定位时分秒
        log.times = [
            Dates.inymd[3]|0 || 0,
            Dates.inymd[4]|0 || 0,
            Dates.inymd[5]|0 || 0
        ];
        Dates.each(new Array(3), function(i){
            Dates.hmsin[i].value = Dates.digit(Dates.timeVoid(log.times[i], i) ? Dates.mins[i+3]|0 : log.times[i]|0);
        });

        //确定按钮状态
        Dates[Dates.valid ? 'removeClass' : 'addClass'](as.ok, as[1]);
    };

    //节日
    Dates.festival = function(td, md){
        var str;
        switch(md){
            case '1.1':
                str = '元旦';
                break;
            case '3.8':
                str = '妇女';
                break;
            case '4.5':
                str = '清明';
                break;
            case '5.1':
                str = '劳动';
                break;
            case '6.1':
                str = '儿童';
                break;
            case '9.10':
                str = '教师';
                break;
            case '10.1':
                str = '国庆';
                break;
        };
        str && (td.innerHTML = str);
        str = null;
    };

    //生成年列表
    Dates.viewYears = function(YY){
        var S = Dates.query, str = '';
        Dates.each(new Array(14), function(i){
            if(i === 7) {
                str += '<li '+ (parseInt(as.year.value) === YY ? 'class="'+ as[2] +'"' : '') +' y="'+ YY +'">'+ YY +'年</li>';
            } else {
                str += '<li y="'+ (YY-7+i) +'">'+ (YY-7+i) +'年</li>';
            }
        });
        S('#laydate_ys').innerHTML = str;
        Dates.each(S('#laydate_ys li'), function(i, elem){
            if(Dates.checkVoid(elem.getAttribute('y'))[0] === 'y'){
                Dates.addClass(elem, as[1]);
            } else {
                Dates.on(elem, 'click', function(ev){
                    Dates.stopmp(ev).reshow();
                    Dates.viewDate(this.getAttribute('y')|0, Dates.ymd[1], Dates.ymd[2]);
                });
            }
        });
    };

    //初始化面板数据
    Dates.initDate = function(){
        var S = Dates.query, log = {}, De = new Date();
        var ymd = Dates.elem[as.elemv].match(/\d+/g) || [];
        if(ymd.length < 3){
            ymd = Dates.options.start.match(/\d+/g) || [];
            if(ymd.length < 3){
                ymd = [De.getFullYear(), De.getMonth()+1, De.getDate()];
            }
        }
        Dates.inymd = ymd;
        Dates.viewDate(ymd[0], ymd[1]-1, ymd[2]);
    };

    //是否显示零件
    Dates.iswrite = function(){
        var S = Dates.query, log = {
            time: S('#laydate_hms')
        };
        Dates.shde(log.time, !Dates.options.istime);
        Dates.shde(as.oclear, !('isclear' in Dates.options ? Dates.options.isclear : 1));
        Dates.shde(as.otoday, !('istoday' in Dates.options ? Dates.options.istoday : 1));
        Dates.shde(as.ok, !('issure' in Dates.options ? Dates.options.issure : 1));
    };

    //方位辨别
    Dates.orien = function(obj, pos){
        var tops, rect = Dates.elem.getBoundingClientRect();
        obj.style.left = rect.left + (pos ? 0 : Dates.scroll(1)) + 'px';
        if(rect.bottom + obj.offsetHeight/1.5 <= Dates.winarea()){
            tops = rect.bottom - 1;
        } else {
            tops = rect.top > obj.offsetHeight/1.5 ? rect.top - obj.offsetHeight + 1 : Dates.winarea() - obj.offsetHeight;
        }
        obj.style.top = Math.max(tops + (pos ? 0 : Dates.scroll()),1) + 'px';
    };

    //吸附定位
    Dates.follow = function(obj){
        if(Dates.options.fixed){
            obj.style.position = 'fixed';
            Dates.orien(obj, 1);
        } else {
            obj.style.position = 'absolute';
            Dates.orien(obj);
        }
    };

    //生成表格
    Dates.viewtb = (function(){
        var tr, view = [], weeks = [ '日', '一', '二', '三', '四', '五', '六'];
        var log = {}, table = doc[creat]('table'), thead = doc[creat]('thead');
        thead.appendChild(doc[creat]('tr'));
        log.creath = function(i){
            var th = doc[creat]('th');
            th.innerHTML = weeks[i];
            thead[tags]('tr')[0].appendChild(th);
            th = null;
        };

        Dates.each(new Array(6), function(i){
            view.push([]);
            tr = table.insertRow(0);
            Dates.each(new Array(7), function(j){
                view[i][j] = 0;
                i === 0 && log.creath(j);
                tr.insertCell(j);
            });
        });

        table.insertBefore(thead, table.children[0]);
        table.id = table.className = 'laydate_table';
        tr = view = null;
        return table.outerHTML.toLowerCase();
    }());

    //渲染控件骨架
    Dates.view = function(elem, options){
        var S = Dates.query, div, log = {};
        options = options || elem;

        Dates.elem = elem;
        Dates.options = options;
        Dates.options.format || (Dates.options.format = config.format);
        Dates.options.start = Dates.options.start || '';
        Dates.mm = log.mm = [Dates.options.min || config.min, Dates.options.max || config.max];
        Dates.mins = log.mm[0].match(/\d+/g);
        Dates.maxs = log.mm[1].match(/\d+/g);

        if(!Dates.box){
            div = doc[creat]('div');
            div.id = as[0];
            div.className = as[0];
            div.style.cssText = 'position: absolute;';
            div.setAttribute('name', 'laydate-v'+ laydate.v);

            div.innerHTML =  log.html = '<div class="laydate_top">'
                +'<div class="laydate_ym laydate_y" id="laydate_YY">'
                +'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
                +'<input id="laydate_y" readonly><label></label>'
                +'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
                +'<div class="laydate_yms">'
                +'<a class="laydate_tab laydate_chtop"><cite></cite></a>'
                +'<ul id="laydate_ys"></ul>'
                +'<a class="laydate_tab laydate_chdown"><cite></cite></a>'
                +'</div>'
                +'</div>'
                +'<div class="laydate_ym laydate_m" id="laydate_MM">'
                +'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
                +'<input id="laydate_m" readonly><label></label>'
                +'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
                +'<div class="laydate_yms" id="laydate_ms">'+ function(){
                    var str = '';
                    Dates.each(new Array(12), function(i){
                        str += '<span m="'+ i +'">'+ Dates.digit(i+1) +'月</span>';
                    });
                    return str;
                }() +'</div>'
                +'</div>'
                +'</div>'

                + Dates.viewtb

                +'<div class="laydate_bottom">'
                +'<ul id="laydate_hms">'
                +'<li class="laydate_sj">时间</li>'
                +'<li><input readonly>:</li>'
                +'<li><input readonly>:</li>'
                +'<li><input readonly></li>'
                +'</ul>'
                +'<div class="laydate_time" id="laydate_time"></div>'
                +'<div class="laydate_btn">'
                +'<a id="laydate_clear">清空</a>'
                +'<a id="laydate_today">今天</a>'
                +'<a id="laydate_ok">确认</a>'
                +'</div>'
                +(config.isv ? '<a href="http://sentsin.com/layui/laydate/" class="laydate_v" target="_blank">laydate-v'+ laydate.v +'</a>' : '')
                +'</div>';
            doc.body.appendChild(div);
            Dates.box = S('#'+as[0]);
            Dates.events();
            div = null;
        } else {
            Dates.shde(Dates.box);
        }
        Dates.follow(Dates.box);
        options.zIndex ? Dates.box.style.zIndex = options.zIndex : Dates.removeCssAttr(Dates.box, 'z-index');
        Dates.stopMosup('click', Dates.box);

        Dates.initDate();
        Dates.iswrite();
        Dates.check();
    };

    //隐藏内部弹出元素
    Dates.reshow = function(){
        Dates.each(Dates.query('#'+ as[0] +' .laydate_show'), function(i, elem){
            Dates.removeClass(elem, 'laydate_show');
        });
        return this;
    };

    //关闭控件
    Dates.close = function(){
        Dates.reshow();
        Dates.shde(Dates.query('#'+ as[0]), 1);
        Dates.elem = null;
    };

    //转换日期格式
    Dates.parse = function(ymd, hms, format){
        ymd = ymd.concat(hms);
        format = format || (Dates.options ? Dates.options.format : config.format);
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index){
            ymd.index = ++ymd.index|0;
            return Dates.digit(ymd[ymd.index]);
        });
    };

    //返回最终日期
    Dates.creation = function(ymd, hide){
        var S = Dates.query, hms = Dates.hmsin;
        var getDates = Dates.parse(ymd, [hms[0].value, hms[1].value, hms[2].value]);
        Dates.elem[as.elemv] = getDates;
        if(!hide){
            Dates.close();
            typeof Dates.options.choose === 'function' && Dates.options.choose(getDates);
        }
    };

    //事件
    Dates.events = function(){
        var S = Dates.query, log = {
            box: '#'+as[0]
        };

        Dates.addClass(doc.body, 'laydate_body');

        as.tds = S('#laydate_table td');
        as.mms = S('#laydate_ms span');
        as.year = S('#laydate_y');
        as.month = S('#laydate_m');

        //显示更多年月
        Dates.each(S(log.box + ' .laydate_ym'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                Dates.addClass(this[tags]('div')[0], 'laydate_show');
                if(!i){
                    log.YY = parseInt(as.year.value);
                    Dates.viewYears(log.YY);
                }
            });
        });

        Dates.on(S(log.box), 'click', function(){
            Dates.reshow();
        });

        //切换年
        log.tabYear = function(type){
            if(type === 0){
                Dates.ymd[0]--;
            } else if(type === 1) {
                Dates.ymd[0]++;
            } else if(type === 2) {
                log.YY -= 14;
            } else {
                log.YY += 14;
            }
            if(type < 2){
                Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
                Dates.reshow();
            } else {
                Dates.viewYears(log.YY);
            }
        };
        Dates.each(S('#laydate_YY .laydate_tab'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev);
                log.tabYear(i);
            });
        });


        //切换月
        log.tabMonth = function(type){
            if(type){
                Dates.ymd[1]++;
                if(Dates.ymd[1] === 12){
                    Dates.ymd[0]++;
                    Dates.ymd[1] = 0;
                }
            } else {
                Dates.ymd[1]--;
                if(Dates.ymd[1] === -1){
                    Dates.ymd[0]--;
                    Dates.ymd[1] = 11;
                }
            }
            Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
        };
        Dates.each(S('#laydate_MM .laydate_tab'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                log.tabMonth(i);
            });
        });

        //选择月
        Dates.each(S('#laydate_ms span'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                if(!Dates.hasClass(this, as[1])){
                    Dates.viewDate(Dates.ymd[0], this.getAttribute('m')|0, Dates.ymd[2]);
                }
            });
        });

        //选择日
        Dates.each(S('#laydate_table td'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                if(!Dates.hasClass(this, as[1])){
                    Dates.stopmp(ev);
                    Dates.creation([this.getAttribute('y')|0, this.getAttribute('m')|0, this.getAttribute('d')|0]);
                }
            });
        });

        //清空
        as.oclear = S('#laydate_clear');
        Dates.on(as.oclear, 'click', function(){
            Dates.elem[as.elemv] = '';
            Dates.close();
        });

        //今天
        as.otoday = S('#laydate_today');
        Dates.on(as.otoday, 'click', function(){
            var now = new Date();
            Dates.creation([now.getFullYear(), now.getMonth() + 1, now.getDate()]);
        });

        //确认
        as.ok = S('#laydate_ok');
        Dates.on(as.ok, 'click', function(){
            if(Dates.valid){
                Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
            }
        });

        //选择时分秒
        log.times = S('#laydate_time');
        Dates.hmsin = log.hmsin = S('#laydate_hms input');
        log.hmss = ['小时', '分钟', '秒数'];
        log.hmsarr = [];

        //生成时分秒或警告信息
        Dates.msg = function(i, title){
            var str = '<div class="laydte_hsmtex">'+ (title || '提示') +'<span>×</span></div>';
            if(typeof i === 'string'){
                str += '<p>'+ i +'</p>';
                Dates.shde(S('#'+as[0]));
                Dates.removeClass(log.times, 'laydate_time1').addClass(log.times, 'laydate_msg');
            } else {
                if(!log.hmsarr[i]){
                    str += '<div id="laydate_hmsno" class="laydate_hmsno">';
                    Dates.each(new Array(i === 0 ? 24 : 60), function(i){
                        str += '<span>'+ i +'</span>';
                    });
                    str += '</div>'
                    log.hmsarr[i] = str;
                } else {
                    str = log.hmsarr[i];
                }
                Dates.removeClass(log.times, 'laydate_msg');
                Dates[i=== 0 ? 'removeClass' : 'addClass'](log.times, 'laydate_time1');
            }
            Dates.addClass(log.times, 'laydate_show');
            log.times.innerHTML = str;
        };

        log.hmson = function(input, index){
            var span = S('#laydate_hmsno span'), set = Dates.valid ? null : 1;
            Dates.each(span, function(i, elem){
                if(set){
                    Dates.addClass(elem, as[1]);
                } else if(Dates.timeVoid(i, index)){
                    Dates.addClass(elem, as[1]);
                } else {
                    Dates.on(elem, 'click', function(ev){
                        if(!Dates.hasClass(this, as[1])){
                            input.value = Dates.digit(this.innerHTML|0);
                        }
                    });
                }
            });
            Dates.addClass(span[input.value|0], 'laydate_click');
        };

        //展开选择
        Dates.each(log.hmsin, function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                Dates.msg(i, log.hmss[i]);
                log.hmson(this, i);
            });
        });

        Dates.on(doc, 'mouseup', function(){
            var box = S('#'+as[0]);
            if(box && box.style.display !== 'none'){
                Dates.check() || Dates.close();
            }
        }).on(doc, 'keydown', function(event){
            event = event || win.event;
            var codes = event.keyCode;

            //如果在日期显示的时候按回车
            if(codes === 13 && Dates.elem){
                Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
            }
        });
    };

    //重置定位
    laydate.reset = function(){
        (Dates.box && Dates.elem) && Dates.follow(Dates.box);
    };

    //返回指定日期
    laydate.now = function(timestamp, format){
        var De = new Date((timestamp|0) ? function(tamp){
                return tamp < 86400000 ? (+new Date + tamp*86400000) : tamp;
            }(parseInt(timestamp)) : +new Date);
        return Dates.parse(
            [De.getFullYear(), De.getMonth()+1, De.getDate()],
            [De.getHours(), De.getMinutes(), De.getSeconds()],
            format
        );
    };

    //加载组件所需的css
    // layui.addcss('modules/laydate/laydate.css', function(){
    // }, 'laydatecss');

    exports('laydate', laydate);

});