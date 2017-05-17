define('calendarData', [], function(require, exports, module) {
    Date.prototype.pattern=function(fmt) {     
        var o = {        
        "M+" : this.getMonth()+1, //月份        
        "d+" : this.getDate(), //日        
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时        
        "H+" : this.getHours(), //小时        
        "m+" : this.getMinutes(), //分        
        "s+" : this.getSeconds(), //秒        
        "q+" : Math.floor((this.getMonth()+3)/3), //季度       
        "S" : this.getMilliseconds() //毫秒        
        };        
        var week = {        
        "1" : "一",//"/u65e5",        
        "2" : "二",//"/u4e00",        
        "3" : "三",//"/u4e8c",        
        "4" : "四",//"/u4e09",        
        "5" : "五",//"/u56db",        
        "6" : "六",//"/u4e94",        
        "0" : "日"//"/u516d"    
        };        
        if(/(y+)/.test(fmt)){        
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));        
        }        
        if(/(E+)/.test(fmt)){        
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? /*"/u661f/u671f"*/"星期" : /*"/u5468"*/"周") : "")+week[this.getDay()+""]);        
        }        
        for(var k in o){        
            if(new RegExp("("+ k +")").test(fmt)){        
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));        
            }        
        }        
        return fmt;        
    }

    String.prototype.toDate = function(fmt){
        var a = new Date(),b = [1,2,3],c,d = [0,0,0];
        if(fmt){
            /(y+)/.test(fmt);b[0] = fmt.indexOf('y');d[0] = RegExp.$1.length;
            /(M+)/.test(fmt);b[1] = fmt.indexOf('M');d[1] = RegExp.$1.length;
            /(d+)/.test(fmt);b[2] = fmt.indexOf('d');d[2] = RegExp.$1.length;
            if(b[0]<b[1]&&b[1]<b[2])b=[1,2,3];
            else if(b[0]<b[2]&&b[2]<b[1])b=[1,3,2];
            else if(b[2]<b[0]&&b[0]<b[1])b=[2,3,1];
            else if(b[2]<b[1]&&b[1]<b[0])b=[3,2,1];
            else if(b[1]<b[0]&&b[0]<b[2])b=[2,1,3];
            else b=[3,1,2];
            fmt = fmt.replace(/d+/,'(\\d{'+d[2]+'})').replace(/y+/,'(\\d{'+d[0]+'})').replace(/M+/,'(\\d{'+d[1]+'})');
            c = new RegExp("^"+fmt+"$");
        }else{
            c = new RegExp("^(\\d{4})-(\\d{2})-(\\d{2})$");
        }
        if(!c.test(this))
            return new Date();
        a.setDate(+eval('RegExp.$'+b[2]));
        a.setMonth(+eval('RegExp.$'+b[1])-1);
        a.setFullYear(+eval('RegExp.$'+b[0]));
        return a;
    }

    Date.prototype.nm = function(d){
        var r = new Date(); 
        r.setDate(1);
        r.setFullYear(this.getFullYear());
        r.setMonth(this.getMonth()+(+d));
        return r;
    }

    Date.prototype.cl = function(){
        var r = new Date(); 
        r.setDate(this.getDate());
        r.setMonth(this.getMonth());
        r.setFullYear(this.getFullYear());
        return r;
    }
})