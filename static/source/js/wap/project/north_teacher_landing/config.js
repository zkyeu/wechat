/**
 * 配置路由
 * @file：   config.js
 * @author: wuhao
 * @update:  2015-07-14
 * @note: base
 */
	var aPage=$("[data-init]");
	//f(!aPage.get(0)) return;
	var getVersion=function(v){
		var src = $("script[src*=vendor]").attr("src"),
			version = "v="+v;
		if(!!src && src.indexOf("?")>-1) version = src.substring(src.lastIndexOf("?")+1);
		return version;
	},
	arr=[],
	version = getVersion("20160430");		
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});

    seajs.config({
    	alias:{"calender": "calender"},
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
    seajs.use(arr);