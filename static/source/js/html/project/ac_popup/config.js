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