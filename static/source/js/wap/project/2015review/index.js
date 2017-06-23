define(function(require,exports,module){
    /* swipepage plugin */
    var startX=0,startY=0;margin=0;var curPage=0;var pageWidth=0,pageHeight=0;var scrollPrevent=false,movePrevent=false,touchDown=false;var con=null;var pages=null;var distance=50;var touchUp=false;var sizeCon=$(window);var sizeConDefault=false;function bindEvent(){$(document.body).on("touchstart",function(e){e=e.changedTouches[0];onStart(e)});$(document.body).on("touchmove",function(e){onMove(e.changedTouches[0],e)});$(document.body).on("touchend",function(e){onEnd(e.changedTouches[0])});$(window).bind("orientationchange",function(event){var ro=window.orientation;if(ro===90||ro===-90){con.trigger("orientationDown",{degree:ro,curpage:curPage})}else{con.trigger("orientationUp",{degree:ro,curpage:curPage})}con.trigger("orientation",{degree:ro,curpage:curPage})})}function swipepage(container,items,dis,isTouchUp,sizeContainer){if(dis){distance=dis}if(isTouchUp){touchUp=true}if(sizeContainer){sizeCon=sizeContainer;sizeConDefault=false}bindEvent();initPage(container,items);con.on("orientation",function(e){setInit()})}swipepage.goPage=function(n){animatePage(n);con.trigger("page",n)};function setInit(){if(!sizeConDefault){pages.css({width:"100%",height:"100%"});pageWidth=sizeCon.width();pageHeight=sizeCon.height()}else{pageWidth=sizeCon.width();pageHeight=sizeCon.height();pages.css({width:pageWidth+"px",height:pageHeight+"px"})}if(touchUp){con.css("-webkit-transition","all .5s ease-out")}con.height(pageHeight+"px");animatePage(curPage)}function initPage(container,items){con=container;pages=items;setInit()}function onStart(e){if(movePrevent==true){event.preventDefault();return false}touchDown=true;startX=e.pageX;startY=e.pageY;margin=con.css("-webkit-transform");margin=margin.replace("matrix(","");margin=margin.replace(")","");margin=margin.split(",");margin=parseInt(margin[5],10)}function onMove(e,oe){if(movePrevent==true||touchDown!=true){event.preventDefault();return false}event.preventDefault();if(scrollPrevent==false&&e.pageY!=startY&&!touchUp){var temp=margin+e.pageY-startY;con.css("-webkit-transform","matrix(1, 0, 0, 1, 0, "+temp+")")}}function onEnd(e){if(movePrevent==true){event.preventDefault();return false}touchDown=false;if(scrollPrevent==false){endX=e.pageX;endY=e.pageY;if(Math.abs(endY-startY)<=distance&&!touchUp){animatePage(curPage)}else{if(Math.abs(endY-startY)>distance){if(endY>startY){prevPage()}else{nextPage()}}}}}function prevPage(){var newPage=curPage-1;animatePage(newPage);con.trigger("prevPage",newPage);con.trigger("page",newPage)}function nextPage(){var newPage=curPage+1;animatePage(newPage);con.trigger("nextPage",newPage);con.trigger("page",newPage)}function animatePage(newPage){if(newPage<0){newPage=0}if(newPage>pages.length-1){newPage=pages.length-1}curPage=newPage;var newMarginTop=newPage*-pageHeight;con.css({"-webkit-transform":"matrix(1, 0, 0, 1, 0, "+newMarginTop+")"})};

/* my code for project(review 2015)*/
	var con = $(".container .sec");
	var aitems = $(".container .sec .li");
    
	var items = $(".container .li");
	var page = 0;
	swipepage(con,aitems,30);
    /* page code */
	con.on('page',function(e){resetAnimate(e.data);});
	con.on('nextPage',function(e){resetAnimate(e.data);});
	con.on('prevPage',function(e){resetAnimate(e.data);});
    /* page animate function */
    function resetAnimate(p) {
        location.hash = p;
        if (p >= 0 && p < 9) {
         $(".container .sec .li").find(".animat").css({
             'display':'none'
         });
         $(".container .sec .li").eq(p).find(".animat").css({
             'display':'block'
         });
         }
        if (p <= 9 && p > 0) {
            con.css("-webkit-transition", "all .5s ease-out");
        }
    }
	$(function(p){
        $(".container .sec .li").find(".animat").css({'display':'none'});
        $(".container .sec .li").eq(0).find(".animat").css({'display':'block'});
		$('.sec .li').each(function(){
			var thisi=$(this).index();
			$(this).find('.span').on('tap', function(){swipepage.goPage(thisi+1);});
		});
	});
    $(document).ready(function() {
        //设置基准响应比率；
        var _height = parseInt(document.documentElement.clientHeight);
        var _width = parseInt($(document.body).css("width"));
        var _sheight = parseInt(window.screen.height);
        var _swidth = parseInt(window.screen.width);
        $(window).bind("orientationchange", function() {page_reor();});
        function page_reor() {
            if (window.orientation == -90 || window.orientation == 90) {
                if (_width < _height) {
                    _new_width = _width * _sheight / _swidth;
                    _new_height = _swidth;
                } else {
                    _new_width = _width;
                    _new_height = _height;
                }
            } else {
                if (_width > _height) {
                    if (_swidth > _sheight) {
                        _new_width = _width * _sheight / _swidth;
                        _new_height = _height * _swidth / _sheight;
                    } else {
                        _new_width = _width * _swidth / _sheight;
                        _new_height = _height * _sheight / _swidth;
                    }
                } else {
                    _new_height = _height;
                    _new_width = _width;
                }
            }
            $("body").css({"font-size": 32 * _new_height / 1136 + "px"});
        }
        $("body").css({"font-size": 32 * _height / 1136 + "px"});
    });

    /*email check*/
    var reTel = /^1[0-9]{10}$/;
    $("#sha-reg").click(function(){
      var tel = $("#dl-tel").val();
      var passwd = $("#dl_password").val();
      if (tel == "") {
        alert("请填写手机号码");
        return false;
      }
      if (!reTel.test(tel)) {
        alert("请填写正确格式手机号码");
        return false;
      }
      if (passwd == "") {
        alert("请填写密码");
        return false;
      }
      document.getElementById("RegForm").submit();
    });
});