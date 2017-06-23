$(function(){
    var $list = $('#sliderList');
    var $firstLi = $list.children().eq(0);
    var $lastLi = $list.children().last();
    var liWidth = $firstLi.width();
    $list.append($firstLi.clone());
    $list.prepend($lastLi.clone());

    var liLen = $('#sliderList li').length;
    

    var iNow = 1;
    $list.css({
        width: liLen*liWidth,
        left: liWidth*(-1)
    })

    $('#next,#prev').click(function(){
        var id = $(this).attr('id');
        move(iNow,liWidth,liLen,id);
    })

    function move(i,banWidth,liLen,forward){
        iNow = i;
        if(forward=='next'){
            iNow++;
            $('#sliderList').animate({'left':-banWidth*iNow},function(){
                if(iNow==liLen-1){
                    iNow=1;
                    $('#sliderList').css('left',liWidth*(-1));
                }
            })
        }else{
            iNow--;
            $('#sliderList').animate({'left':-banWidth*iNow},function(){
                if(iNow==0){
                    iNow=liLen-2;
                    $('#sliderList').css('left',-banWidth*iNow);
                }
            })
        }
        
        
    }
})






























