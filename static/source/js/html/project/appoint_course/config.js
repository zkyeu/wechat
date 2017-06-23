(function(){ 
	var aPage=$("[data-init]");
	if(!aPage.get(0)) return;
	var getVersion=function(v){
		var src = $("script[src*=vendor]").attr("src"),
			version = "v="+v;
		if(!!src && src.indexOf("?")>-1) version = src.substring(src.lastIndexOf("?")+1);
		return version;
	},
	arr=[],
	version = getVersion("20170401");		
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});

    seajs.config({
    	alias:{"cart": "cart.js"},
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
    seajs.use(arr);
})();