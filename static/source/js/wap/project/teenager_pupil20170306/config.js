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
	var	version=aPage.attr("version"),
		arr=[];

	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});

  seajs.config({
      map:[
          [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+(version ? version : "20160831")]
      ]
  });
  seajs.use(arr);
})();
