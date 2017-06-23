/**
 * 配置路由
 * @file：   config.js
 * @author:  liya(liya@51talk.com)
 * @update:  2016-12-29
 */
;(function(){
	var aPage = $("[data-init]");
	if(!aPage.get(0)) return;
	var	arr = [];
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});
  seajs.config({
      map:[
          [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?20161229"]
      ]
  });
  seajs.use(arr);
})();
