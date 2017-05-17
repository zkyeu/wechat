/**
 * 
 * @authors Saturday (zhuning@51talk.com)
 * @date    2015-04-07 17:26:36
 * @version 1.0.0
 */
define("cookie",[],function(require,exports,module){
    exports.setCookie = function (c_name, value, expiredays) {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";path=/;expires="+exdate.toGMTString());
    }

    exports.getCookie = function (c_name) {
        if (document.cookie.length>0) {
          c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1) { 
                c_start=c_start + c_name.length+1 
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end))
            } 
        }
        return "";
    }
    exports.clearCookie = function (name) {  
        document.cookie=name+"="+""+";expires=-1"
    }
});
