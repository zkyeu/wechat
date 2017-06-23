define(function(require,exports,module) {
	(function (win) {
            var ratio, scaleValue, renderTime,
                    document = window.document,
                    docElem = document.documentElement,
                    vpm = document.querySelector('meta[name="viewport"]');

            if (vpm) {
                var tempArray = vpm.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
                if (tempArray) {
                    scaleValue = parseFloat(tempArray[2]);
                    ratio = parseInt(1 / scaleValue);
                }
            } else {
                vpm = document.createElement("meta");
                vpm.setAttribute("name", "viewport");
                vpm.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no, minimal-ui");
                docElem.firstElementChild.appendChild(vpm);
            }

            win.addEventListener("resize", function () {
                clearTimeout(renderTime);
                renderTime = setTimeout(initPage, 300);
            }, false);

            win.addEventListener("pageshow", function (e) {
                e.persisted && (clearTimeout(renderTime), renderTime = setTimeout(initPage, 300));
            }, false);

            "complete" === document.readyState ? document.body.style.fontSize = 12 * ratio + "px" : document.addEventListener("DOMContentLoaded", function () {
                document.body.style.fontSize = 12 * ratio + "px";
            }, false);

            initPage();
            function initPage() {
                var htmlWidth = docElem.getBoundingClientRect().width;
                htmlWidth / ratio > 540 && (htmlWidth = 540 * ratio);
                win.rem = htmlWidth / 16;
                docElem.style.fontSize = win.rem + "px";
            }
            function hengshuping(){
				if(window.orientation==180||window.orientation==0){
				    //alert('竖屏状态！', window.orientation)
				}
				if(window.orientation==90||window.orientation==-90){
	/*				var el = document.createElement('div');
					el.setAttribute("id","mask");
		            document.body.appendChild(el)
				    document.body.style.backgroundColor="#000";//改变背景色*/
					//alert('不支持横屏', window.orientation)
				}
			}
			hengshuping();
			window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', hengshuping, false);

        })(window);

})