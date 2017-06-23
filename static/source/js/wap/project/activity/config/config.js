/**
 * 配置路由
 * @file：   config.js
 * @author:  liya(liya@51talk.com)
 * @update:  2017-05-11
 * @note: base
 */
'use strict';
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
          [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+(version ? version : "20170511")]
      ]
  });
  seajs.use(arr);
})();
