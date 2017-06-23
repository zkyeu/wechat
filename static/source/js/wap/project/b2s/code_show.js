define("code_show", ["swiper-3.3.1.jquery.min", "fastclick"], function(require, exports, module) {
    
    require("fastclick");//去除click延迟

    FastClick.attach(document.body);

    var mySwiper = new Swiper('.swiper-container', {
        //autoplay: 5000,//可选选项，自动滑动
        pagination : '.swiper-pagination',
        paginationClickable :true,
        //width : 800,
        paginationBulletRender: function (index, className, callback) {
            return '<span class="' + className + '">' + ["美小课程", "专属礼物"][index] + '</span>';
        }
    });

//判断图片是否存在
    function CheckImgExists(imgurl) {  
        var ImgObj = new Image(); //判断图片是否存在  
        ImgObj.src = imgurl;  
        //没有图片，则返回-1  
        if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
            return true;  
        } else {  
            return false;
        }  
    }
// $(".swiper-pagination-bullet").eq(0).html("美小课程");
//              $(".swiper-pagination-bullet").eq(1).html("课题推广");
    // var time = setInterval(function(){
    //     $(".swiper-slide").each(function(i){
    //         var that = $(this);
    //         var url = that.find("img").attr("src");
    //         if(CheckImgExists(url)){
    //             console.log("aa");
    //             $(".swiper-pagination-bullet").eq(0).html("美小课程");
    //             $(".swiper-pagination-bullet").eq(1).html("课题推广");
    //             clearInterval(time);
    //         }
    //     }) 
    // },300);
    

});
