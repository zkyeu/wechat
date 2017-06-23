/*!
* pingd.js v1.0
*
* Copyright 2016, 51talk
*
* Date: 2016-11-01 10:00:00
*
* Modified 2016-11-01 10:00:00
*/
(function ping() {
    var d = document,
    bd = d.body;
    var t = new Date();
    var v = "http://mercury.51talk.com/t/t.gif?";
    var ss = sl(location.href);
    var rr = d.referrer.match(/.*?\/([\w-.]+)(\/[^?]*)?(?:\?(.*))?/);
    var tt = "pv";
    var jsvsion = "1.0.0.0";
  
    try {
        
        
        var ao = d.createElement('input');
        ao.type = "button";
        ao.value = "-"
        ao.style.display = "none";
        ao.id = "added_object_for_bi";
        ao.onclick = function() {
           _tmp = on();
           //surl.value = v + _tmp;
           s(v + _tmp); 
           
        };
        bd.appendChild(ao);
        
        var pvidtxt = d.createElement('input');
        pvidtxt.type = "hidden";
        //pvidtxt.id = "pvtxt";
        bd.appendChild(pvidtxt);
        
        
        var _tmp = tu();
        s(v + _tmp);
        
        
        //var surl = d.createElement('textarea');
        //surl.id = "surlsss";
        //surl.cols='100';
        //surl.rows='10';
        //surl.value = v + _tmp;
        //bd.appendChild(surl);
        
        
        _writescript();        
        
    } catch(e) {};
    
    
    function sl(u) {
        return u.match(/.*?\/([\w-.]+)(\/[\w-.\/]+|\/)?(?:\?(.*))?/)
    };
    
    
    //image send
    function s(u) {
        var i = new Image(1, 1);
        i.src = u;
        i.onerror = function() {}
    };
    
    
    //set cookie name value
    function sc(n, v) {
        var lt = ss[1].length;

        if (ss[1].substr(lt - 11) == ".51talk.com") {
            d.cookie = n + "=" + escape(v) + "; expires=Sun, 18 Jan 2038 00:00:00 GMT;path=/;domain=.51talk.com";
        } else {
            d.cookie = n + "=" + escape(v) + "; expires=Sun, 18 Jan 2038 00:00:00 GMT;path=/;domain=" + ss[1]
        }
    };

    //get cookie name
    function gc(n) {
        var a = d.cookie.match(new RegExp("(^|\\s)" + n + "=([^;]*)(;|$)"));
        return a == null ? "": unescape(a[2])
    };

    
    
    //get new old userid 
    function guv() {
        var ugos = "g";
        var pre = 'SpMLdaPx';
        var i = gc(pre + '_uuid');
        if (!i || i == '0') {
            var a = t.getUTCMilliseconds();
            i = (Math.round(Math.random() * 2147483647) * a) % 10000000000;
            while (i == 0) {
                i = (Math.round(Math.random() * 2247483647) * a) % 10000000000
            }
            ugos = 's';
            sc(pre + '_uuid', i)
        }
        return (null != gc(pre + '_uuid') && 'undefined' != gc(pre + '_uuid') && '' != gc(pre + '_uuid')) ? ugos + gc(pre + '_uuid') : "ra" + i
    };
    
    
    function gpv(){
    	 //set cookie pvid
       p_id = t.getTime()
       sc('SpMLdaPx_pvid', p_id);
        
       pvidtxt.value = p_id;
        
    	 var cookiepvid = pvidtxt.value ? pvidtxt.value: t.getTime();
    	 return cookiepvid
    	 
    }
    
    // other flash
    function gf() {
        var f = "-",
        n = navigator;
        try {
            if (n.plugins && n.plugins.length) {
                for (var i = 0; i < n.plugins.length; i++) {
                    if (n.plugins[i].name.indexOf('Shockwave Flash') != -1) {
                        f = n.plugins[i].description.split('Shockwave Flash ')[1];
                        break
                    }
                }
            } else if (window.ActiveXObject) {
                for (var i = 10; i >= 2; i--) {
                    try {
                        var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + i + "');");
                        if (fl) {
                            f = i + '.0';
                            break
                        }
                    } catch(e) {}
                }
            }
        } catch(e) {};
        return f
    };
    
    // orther info
    function ge() {
        var r = "",
        a = b = c = h = e = f = g = "-",
        i = 0,
        n = navigator;
        try {
            if (self.screen) {
                a = screen.width + "x" + screen.height;
                b = screen.colorDepth + "-bit"
            };
            if (n.language) {
                c = n.language.toLowerCase()
            } else if (n.browserLanguage) {
                c = n.browserLanguage.toLowerCase()
            };
            i = n.javaEnabled() ? 1 : 0;
            h = n.cpuClass;
            e = n.platform;
            f = t.getTimezoneOffset() / 60;
            if (bd.addBehavior) {
                bd.addBehavior("#default#clientCaps");
                g = bd.connectionType
            };
            r = "&scr=" + a + "&scl=" + b + "&lang=" + c + "&java=" + i + "&cc=" + h + "&pf=" + e + "&tz=" + f + "&flash=" + gf() + "&ct=" + g + "&vs=1.0"
        } catch(e) {} finally {
            return r
        }
    };
    

    function on(){
    	
    	   
        tt="oc"
        vv=ao.value
        pvid = pvidtxt.value;
         // get url
        
        var a = b = c = "";
        if (rr) {
            a = rr[1];
            b = rr[2];
            c = typeof(rr[3]) != "undefined" ? rr[3] : ""
        };
        if (a == "") {
            var r = location.href.match(new RegExp('[\?&#](((referurl)|(m_referer)|(ADTAG))=[^&#]+)(&|#|$)'));
            if (r) {
                a = r[1] == null ? "": escape(r[1])
            }
        };
        var r = location.href.match(new RegExp('[\?&#]((referurl)|(m_referer)=[^&#]+)(&|#|$)'));
        if (r) {
            a = r[1] == null ? "": escape(r[1])
        };
        

        
        
        _tmp = "tt=" +tt+ "&dm=" + ss[1] + "&rdm=" + a + "&loc=" + escape(location.href) + "&ref=" + escape(d.referrer) + "&uv=" + guv() + "&pvid=" + pvid + "&_title=" + encodeURIComponent(document.title)  + ge() + "&ver=" + jsvsion + "&rand=" + Math.round(Math.random() * 100000)
        
        var i = [];
        i[0] = "t=" + tt,
        i[1] = "m=" + ss[1],
        i[2] = "rm=" + a,
        i[3] = "cul=" + escape(location.href),
        //i[3] = "cul=" + encodeURIComponent(location.href), 
        i[4] = "ref=" + escape(d.referrer),
        i[5] = "v=" +vv
        i[6] = "uuid=" + guv(),
        i[7] = "uuid_="
        i[8] = "auid=" +gc("talk_user_id")
        i[9] = "visit="+gc("visitid")
        i[10] = "pvid=" +pvid 
        i[11] = "_title=" +encodeURIComponent(document.title)  + ge(),
        i[12] = "ver=" +jsvsion,
        i[13] = "rand=" +  Math.round(Math.random() * 100000);
        
        
        _tmp=i.join("&");
         
         return _tmp
         // send url
         //s(v + _tmp);	
    	
    	
    }

    
    //url info
    function tu() {
        var a = b = c = "";
        if (rr) {
            a = rr[1];
            b = rr[2];
            c = typeof(rr[3]) != "undefined" ? rr[3] : ""
        };
        if (a == "") {
            var r = location.href.match(new RegExp('[\?&#](((referurl)|(m_referer)|(ADTAG))=[^&#]+)(&|#|$)'));
            if (r) {
                a = r[1] == null ? "": escape(r[1])
            }
        };
        var r = location.href.match(new RegExp('[\?&#]((referurl)|(m_referer)=[^&#]+)(&|#|$)'));
        if (r) {
            a = r[1] == null ? "": escape(r[1])
        };
        
        vv=ao.value
        pvid = gpv();
        
        var i = [];
        i[0] = "t=" + tt,
        i[1] = "m=" + ss[1],
        i[2] = "rm=" + a,
        i[3] = "cul=" + escape(location.href),
        i[4] = "ref=" + escape(d.referrer),
        i[5] = "v=" +vv
        i[6] = "uuid=" + guv(),
        i[7] = "uuid_="
        i[8] = "auid=" +gc("talk_user_id")
        i[9] = "visit="+gc("visitid")
        i[10] = "pvid=" +pvid 
        i[11] = "_title=" +encodeURIComponent(document.title)  + ge(),
        i[12] = "ver=" +jsvsion,
        i[13] = "rand=" +  Math.round(Math.random() * 100000);
        
        _tmp=i.join("&");
        
        //return "tt=" +tt+ "&dm=" + ss[1] + "&rdm=" + a + "&loc=" + escape(location.href) + "&ref=" + escape(d.referrer) + "&uv=" + guv() + "&pvid=" + gpv() + "&_title=" + encodeURIComponent(document.title)  + ge() + "&ver=" + jsvsion + "&rand=" + Math.round(Math.random() * 100000)
        return _tmp
    };
    
    function rs() {
        ss = location.href.match(/http:\/\/([\w-.]+)(\/[\w-.\/]+|\/)?(?:\?([^\#]*))?(?:\#.*?(\d+))?/);
        rr = ["", ss[1], ss[2]];
        if (typeof(ss[4]) == "undefined" || !ss[4]) {
            return
        };
        if (ss[2].match(/(.*\/\d+)(\.s?html?)$/)) {
            try {
                ss[2] = ss[2].replace(/(.*\/\d+)(\.s?html?)$/, "$1_" + ss[4] + "$2")
            } catch(e) {
                return
            }
        } else {
            ss[3] = typeof(ss[3]) != "undefined" ? ("p=" + ss[4]) : (ss[3] + "&p=" + ss[4])
        };
        try {
            s(v + tu())
        } catch(e) {}
    };
   
    function _writescript() {
        document.write(unescape("%3Cscript type=%22text/javascript%22%3E%0Afunction __sdonclick%28btvalue%29%7B var obj_for_bi = document.getElementById%28%22added_object_for_bi%22%29%3B%0A     if %28obj_for_bi%29 %7B%0A         obj_for_bi.value = btvalue%3B%0A        obj_for_bi.click%28%29%0A     %7D%0A%7D%0A%3C/script%3E"))
    }
   
})();