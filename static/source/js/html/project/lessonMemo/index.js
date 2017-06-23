$(function(){
    $('.toUp').click(function(){
        $(this).toggleClass('toDown');
    });


    $.getJSON("http://one.frontend.com/static/js/html/project/AC/lesson-memo.json",function(res){
    	var datas = res.data;
    	var listHtml = _.template(document.getElementById("dialog-w").innerHTML, datas);
    	$("#lesson-dialog").html(listHtml);
    });
})