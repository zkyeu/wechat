/**
 * 配置路由
 * @file：   config.js
 * @author:  liya(liya@51talk.com)
 * @update:  2017-01-19
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
          [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+(version ? version : "20170119")]
      ]
  });
  seajs.use(arr);
})();
