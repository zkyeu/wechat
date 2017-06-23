/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2015-07-14
 * @note: base
 */
(function(){ 
	var aPage=$("[data-init]");
	var arr=[];
    var setVersion = function(version) {
        var vendorSrc = $("script[src*=vendor]").attr("src");
        if(!!vendorSrc && vendorSrc.indexOf("?")>-1) {
            return "v=" + vendorSrc.substring(vendorSrc.lastIndexOf("?")+1);
        } else {
           return "v=" + version; 
        }
    };
    var version = setVersion("20160802");   
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});
    seajs.config({
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
    seajs.use(arr);
})();