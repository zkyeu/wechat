define('north_america/north',['formCheck','silder','common'],function(require,exports,module){
  require("common");
/*点击轮播*/
  var curIndex = 0,  //当前index
      imgLen = $(".m-silder-list li").length;  //图片总数
  var ltPrev=$(".u-prev");
  var rtNext=$(".u-next");
  // 定时器自动变换2.5秒每次
  var autoChange = setInterval(function(){ 
      if(curIndex <  imgLen-1){ 
          curIndex ++; 
      }else{ 
          curIndex = 0;
     }
      //调用变换处理函数
      changeTo(curIndex);  
  },2500);
    
  //左箭头滑入滑出事件处理
  ltPrev.hover(function(){ 
     //滑入清除定时器
      clearInterval(autoChange);
  },function(){ 
      //滑出则重置定时器
      autoChangeAgain();
  });
  //左箭头点击处理
  ltPrev.click(function(){
      //根据curIndex进行上一个图片处理
      curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
      changeTo(curIndex);
  });
  
  //右箭头滑入滑出事件处理
 rtNext.hover(function(){ 
      //滑入清除定时器
      clearInterval(autoChange);
  },function(){ 
      //滑出则重置定时器
      autoChangeAgain();
  });
  //右箭头点击处理
  rtNext.click(function(){ 
      curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
     changeTo(curIndex);
 });
  $(".m-silder-box").hover(function(){ 
      //滑入清除定时器
      clearInterval(autoChange);
  },function(){ 
      //滑出则重置定时器
      autoChangeAgain();
  });
 //对右下角按钮index进行事件绑定处理等
  $(".u-dots").find("li").each(function(item){ 
    $(this).hover(function(){ 
        clearInterval(autoChange);
        changeTo(item);
        curIndex = item;
    },function(){ 
        autoChangeAgain();
    });
  });
  //清除定时器时候的重置定时器--封装
  function autoChangeAgain(){ 
    autoChange = setInterval(function(){ 
    if(curIndex < imgLen-1){ 
      curIndex ++;
    }else{ 
      curIndex = 0;
    }
    //调用变换处理函数
      changeTo(curIndex);  
    },2500);
  }
  function changeTo(num){ 
    var goLeft = num *  785;
    $(".m-silder-list").animate({left: "-" + goLeft + "px"},500);
    $(".u-dots").find("li").removeClass("silder-crt").eq(num).addClass("silder-crt");
  }

/*滚动效果*/
  if($(".north_america").length){
    var eduH=$(".north-education .edu-list").offset().top-$(window).height();
    var learH=$(".north-learning").offset().top-$(window).height();
    $(window).scroll(function(){
      if($(window).scrollTop()>eduH){
        $(".north-education").addClass("animation-hover");
      }
      if($(window).scrollTop()>learH){
        $(".north-learning .lear-img").addClass("animation-hover"); 
      }
    });
  }
});