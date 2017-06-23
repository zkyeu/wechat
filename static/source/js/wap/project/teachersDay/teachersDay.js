define(function(require,exports,module){
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

       var weibo_earnings_boot = function() {
            var $pages = $(".stag");
            var $currentPage = $pages.eq(0);
            var $nextPage;
            var $prevPage;
            var wrapper = document.querySelector('.wrapper');
            $pages.hide();
            $currentPage.show();
            $('.toswitch').show();

            function $getNextPage() {
                var next = $currentPage.next(".stag")[0];
                return next ? $(next) : null;
            }

            function $getPrevPage() {
                var prev = $currentPage.prev(".stag")[0];
                return prev ? $(prev) : null;
            }

            function translateFormat(y) {
                return "translate(0, " + y + "px)";
            }

            function scaleFormat(scale) {
                scale = 1;
                return "scale(" + scale + ")";
            }

            function scrollNum(start, end, during, cb) {
                var piece = 60;
                var step = (end - start) * piece / during;
                if (during - piece > piece) {
                    cb(Math.round(start + step));
                    setTimeout(function() {
                        scrollNum(start + step, end, during - piece, cb);
                    }, piece);
                } else {
                    cb(end);
                }
            }

            var draging = false;
            var startAtY;
            var pageHeight;
            var nowAtY;
            var transitionEndTimer;



            function start_scence(scenceID) {
                if (scenceID === 'scence3') {
                    wave.start();
                } else {
                    wave.stop();
                }
                if (scenceID === 'scence9') {
                    $('.toswitch').hide();
                } else {
                    $('.toswitch').show();
                }
                $('.toshare').hide();
            }


            function transitionEnd() {
                clearTimeout(transitionEndTimer);
                $currentPage.removeClass('animate');
                $currentPage.hide();
                $currentPage = $(this).show();
                $(this).off("transitionend", transitionEnd);
                $(document).on('touchstart', touchStart);
                wrapper.className = 'wrapper ' + this.getAttribute('scence');
                //start_scence(this.getAttribute('scence'));
            }

            function touchStart(event) {
                draging = true;
                startAtY = event.touches[0].pageY;
                $nextPage = $getNextPage();
                $prevPage = $getPrevPage();
                pageHeight = $(window).height();
                touchMove(event);
            }


             $("#start").tap(function(){
                var saveTransitionDelay = 500;
                $currentPage.css("-webkit-transform", translateFormat(-pageHeight));
                $nextPage.css("-webkit-transform", translateFormat(0));
                $nextPage.on("transitionend", transitionEnd);
                transitionEndTimer = setTimeout(function() {
                    if ($nextPage) {
                        $nextPage.trigger("transitionend", transitionEnd);
                    }

                }, saveTransitionDelay);
                $(document).off('touchstart', touchStart);
            });

            function touchEnd(event) {
                if (!draging) return;

                $currentPage.addClass('animate');


                var saveTransitionDelay = 500;
                var pageEdge = 50;

                var currentMove = nowAtY - startAtY;

                if (currentMove < -1 * pageEdge) {

                    if ($nextPage) {
                        $currentPage.css("-webkit-transform", translateFormat(-pageHeight));
                        $nextPage.css("-webkit-transform", translateFormat(0));
                        $nextPage.on("transitionend", transitionEnd);
                        transitionEndTimer = setTimeout(function() {
                            if ($nextPage) {
                                $nextPage.trigger("transitionend", transitionEnd);
                            }

                        }, saveTransitionDelay);
                        $(document).off('touchstart', touchStart);
                    } else {
                        $currentPage.css("-webkit-transform", translateFormat(0));
                    }

                } else if (currentMove > pageEdge) {
                    if ($prevPage) {
                        $currentPage.css("-webkit-transform", translateFormat(pageHeight));
                        $prevPage.css("-webkit-transform", translateFormat(0));
                        $prevPage.on("transitionend", transitionEnd);
                        transitionEndTimer = setTimeout(function() {
                            if ($prevPage) {
                                $prevPage.trigger("transitionend", transitionEnd);
                            }
                        }, saveTransitionDelay);
                        $(document).off('touchstart', touchStart);
                    } else {
                        $currentPage.css("-webkit-transform", translateFormat(0));
                    }


                }
                draging = false;
            }

            function touchMove(event) {
                event.preventDefault();
                if (!draging) return;
                nowAtY = event.touches[0].pageY;
                var y = nowAtY - startAtY;
                $currentPage.css("-webkit-transform", translateFormat(y));

            }

            $(document).on('touchstart', touchStart).on('touchmove', touchMove).on('touchend', touchEnd);
                



            function wheels(event) {
                var move = event.wheelDelta;
                var is_mac = /macintosh/.test(ua);
                var scroll_step = 50;
                if(is_mac){
                    scroll_step = 200;
                }
                if (Math.abs(move) > scroll_step && !draging) {
                    pageHeight = $(window).height();
                    if (move < 0) {
                        $nextPage = $getNextPage();
                        if ($nextPage) {
                            $(document).off('mousewheel', wheels);
                            $currentPage.addClass('animate');
                            $currentPage.css("-webkit-transform", translateFormat(-pageHeight));
                            $nextPage.css("-webkit-transform", translateFormat(0));
                            $nextPage.on("transitionend", transWheelsEnd);
                            transitionEndTimer = setTimeout(function() {
                                if ($nextPage) {
                                    $nextPage.trigger("transitionend", transWheelsEnd);
                                }
                            }, 500);

                            draging = true;
                        }
                    } else {
                        $prevPage = $getPrevPage();
                        if ($prevPage) {
                            $(document).off('mousewheel', wheels);
                            $currentPage.addClass('animate');
                            $currentPage.css("-webkit-transform", translateFormat(pageHeight));
                            $prevPage.css("-webkit-transform", translateFormat(0));
                            $prevPage.on("transitionend", transWheelsEnd);
                            transitionEndTimer = setTimeout(function() {
                                if ($prevPage) {
                                    $prevPage.trigger("transitionend", transWheelsEnd);
                                }
                            }, 500);

                            draging = true;
                        }
                    }
                }
            }

            function transWheelsEnd() {
                clearTimeout(transitionEndTimer);
                $currentPage.removeClass('animate');
                $currentPage.hide();

                $currentPage = $(this).show();
                $(this).off("transitionend", transWheelsEnd);
                $(document).on('mousewheel', wheels);
                wrapper.className = 'wrapper ' + this.getAttribute('scence');
                draging = false;
                //start_scence(this.getAttribute('scence'));
            }
            $(document).on('mousewheel', wheels);

            var ua = navigator.userAgent.toLowerCase();
            if (/msie/.test(ua)) {
                document.getElementById('browser_tip').style.display = 'block';
            } else {
                wrapper.className = 'wrapper scence1';
            }
        };
        //alert(document.documentElement.clientHeight);
       // alert(document.documentElement.clientWidth)
       weibo_earnings_boot();
       $(".role").tap(function(){
            $(".roleDialog").css({visibility: "visible"});
       });
       $(".music").tap(function(){
            var audio = document.getElementsByTagName('audio')[0];
            if($(this).hasClass('playing')){
                audio.pause();
                $(this).removeClass("playing").addClass('disable');

            }else{
                $(this).removeClass("disable");
                $(this).attr('class','music playing');
                audio.play();
            }
            
       });
       $(".praise").tap(function(){
            if($(this).hasClass("praise2")){
                return;
            }
            $(this).addClass("praise2");
            var id = $(".tdsetGoods").text();
            $.post("/ajax/tdsetGoods?id="+id,function(res){
                var res = JSON.parse(res);
                $(".praise").text(res.total);
            })
       });
       $(".close").tap(function(){
             $(".roleDialog").css({visibility: "hidden"});
       });
       $(".open").tap(function(){
            location.href="http://wap.51talk.com/landing/appqs.html";
       });
});