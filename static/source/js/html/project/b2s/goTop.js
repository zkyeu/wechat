define("goTop",[""],function(require,exports,module){
    $.fn.goTop = function(options){
        var defaults = {
            time : 300
        },
        configs = $.extend({}, defaults, options),
        $self = $(this);
        $(window).on("scroll load",function(){  
            if ($(window).scrollTop()>100){  
                $self.show();  
            }  
            else{  
                $self.hide();  
            }  
        });  

        $self.click(function(){  
            $('body,html').animate({scrollTop:0},defaults.time);  
            return false;  
        });  
          
    }
    $(".go_top").goTop();
});