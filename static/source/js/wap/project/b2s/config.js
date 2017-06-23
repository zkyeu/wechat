/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2015-07-14
 * @note: base
 */
;(function(){ 
	var aPage=$("[data-init]");
	if(!aPage.get(0)) return;
	var getVersion=function(){
		var script = $("script"),
			version = null;
		$.each(script,function(i,v){
			var $v = $(v),
				$src = $v.attr("src");
				
			if(!!$src && $src.indexOf("vendor.js")>-1 && $src.indexOf("?")>-1){
				version = $src.substring($src.lastIndexOf("?")+1);
				return false;
			}
		});
		return version;
	},
	arr=[],
	version = getVersion();
	
	version = version ? version : "20160407";
		
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

/*
百度统计代码
*/
;(function(root) {
	root["_hmt"] = root["_hmt"] || [];
	var hm = document.createElement("script");
	var src = ["https://hm.baidu.com/hm.js"];
	var srcConfig = {
		"talk" : "131fc2de6e880e13d1e31682d5018f5f",
		"kt" : "50985f9eabbd851593c72aaa01845483"
	}
	var srcHash = srcConfig[root.location.hostname.split(".").slice(-2)[0].replace(/\d/g,"")];
	if(!srcHash) return;
	src.push("?");
	src.push(srcHash);
	hm.src = src.join("");
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
})(window);