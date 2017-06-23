 
define(function(require,exports,module){
   (function(){
     $("#rd_alreadySetup").click(function(){
            $(".rd_sWin").hide();
       })
   })();
       $(function () {
        var currYear = (new Date()).getFullYear();  
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式 
            display: 'modal', //显示方式 
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy-mm-dd',
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear - 100, //开始年份
            endYear: currYear + 100 //结束年份
        };
        $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
        var optDateTime = $.extend(opt['datetime'], opt['default']);
        var optTime = $.extend(opt['time'], opt['default']);
        $("#appTime").mobiscroll(optTime).time(optTime);
    });
    /*添加推荐英文名2*/
    var regs = {
        qq: /^[1-9]{1}[0-9]{4,}$/i,
        realName: /^\s*[\u4e00-\u9fa5]{1,15}\s*$/,
        engName: /^[a-zA-Z]{2,20}$/
    }
    $(".m-addyoung-name .error-tit,.m-addadult-name .error-tit").click(function(){
        if($(this).parent().find("input").hasClass("date_picker")){
            $(this).hide().parent().find("input").show();
        }else{
            $(this).hide().parent().find("input").show().focus();
        }  
    })
   
    //提交按钮成人
    $('.m-addadult-name .subtn').click(function(){
        var realName = $.trim($('.m-addadult-name input[name="chName"]').val());
        var engName = $.trim($('.m-addadult-name input[name="engName"]').val());
        if(!regs.realName.test(realName)){
            $('input[name="chName"]').hide().next().show();
            return false; 
        }
        if(!regs.engName.test(engName)){
            $('input[name="engName"]').hide().next().show();
            return false;
        }
        /* 表单提交 */
        $.ajax({
            url: $(this).attr('infoUrl') || '',
            type: 'POST',
            data: {
                engName: engName,
                real_name: realName
            },
            dataType: 'json',
            success: function(rs){
                if(rs.status == 1){
                    $('.m-addadult-name').hide();
                }
            }
        });
    });

    //孩子性别
    $(".m-addyoung-name .child-sex span").click(function(){
        var _index = $(this).index();
        var _index = $(this).index();
        if(_index == 0){
            _index = "woman";
        }else if(_index == 1){
            _index = "man";
        }
        $(this).parent().next().hide();
        $(this).addClass("u-check");
        $(this).siblings().removeClass("u-check");
        $('.m-addyoung-name input[name="sex_info"]').val(_index);
    })
    // 青少提交
    $('.m-addyoung-name .subtn').click(function(){
        var realName = $.trim($('.m-addyoung-name input[name="chName"]').val());
        var engName = $.trim($('.m-addyoung-name input[name="engName"]').val());
        var sex = $.trim($('.m-addyoung-name input[name="sex_info"]').val());
        var date = $.trim($('.m-addyoung-name input[name="birthday"]').val());
        var regDate = /^((19|20)\d{2})-(\d{2})-(\d{2})$/;

        var myDate = new Date();
        var testDate = date.split("-");
        var _year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)    
        var _month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)    
        var _date = myDate.getDate(); //获取当前日(1-31)  
        if(!regs.realName.test(realName)){
            $('.m-addyoung-name input[name="chName"]').hide().next().show();
            return false;
        }
        if(!regs.engName.test(engName)){
            $('.m-addyoung-name input[name="engName"]').hide().next().show();
            return false;
        }
        if( sex == "" ){
            $('.m-addyoung-name .child-sex').next().show();
            return false;
        }
        if(_year < parseInt(testDate[0])){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show(); 
            return false;
        }
        if(_year == parseInt(testDate[0]) && _month < parseInt(testDate[1])){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show(); 
            return false;
        }
        if(_year == parseInt(testDate[0]) && _month == parseInt(testDate[1]) && _date < parseInt(testDate[2])){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show(); 
            return false;
        }
        if(!regDate.test(date)){
            $('.m-addyoung-name .date_picker').hide().parent().find(".error-tit").show();
            return false;
        }
        /* 表单提交 */
        $.ajax({
            url: $(this).attr('infoUrl') || '',
            type: 'POST',
            data: {
                engName: engName,
                sex: sex,
                real_name: realName,
                birthday: date
            },
            dataType: 'json',
            success: function(rs){
                if(rs.status == 1){
                    $('.m-addyoung-name').hide();
                }
            }
        });
    });


    //点击推荐名字
    $('.m-addyoung-name .rct-name').click(function(){
        if($(this).hasClass("haveshow")){
            $(this).removeClass("haveshow");
            $(".m-addyoung-name .m-namelist").hide();
        }else{
            $(this).addClass("haveshow");
            $(".m-addyoung-name .m-namelist").show();
        }
    })
    $('.m-addadult-name .rct-name').click(function(){
        if($(this).hasClass("haveshow")){
            $(this).removeClass("haveshow");
            $(".m-addadult-name .m-namelist").hide();
        }else{
            $(this).addClass("haveshow");
            $(".m-addadult-name .m-namelist").show();
        }
    })
     // 推荐名字
    $('.m-addyoung-name .u-nameList').on('click','li',function(){
        $('.m-addyoung-name input[name="engName"]').parent().find(".show-tit").hide();
        $('.m-addyoung-name input[name="engName"]').val($(this).find('a').text()).show().next().hide();
        $('.m-addyoung-name .m-namelist').hide();
        $('.m-addyoung-name .rct-name').removeClass("haveshow");
        return false;
    })
    $('.m-addadult-name .u-nameList').on('click','li',function(){
        $('.m-addadult-name input[name="engName"]').parent().find(".show-tit").hide();
        $('.m-addadult-name input[name="engName"]').val($(this).find('a').text()).show().next().hide();
        $('.m-addadult-name .m-namelist').hide();
        $('.m-addadult-name .rct-name').removeClass("haveshow");
        return false;
    })
    //tab切换
    $('.enameBox .names a').click(function(){
        var $list = $(this).closest('.enameBox');
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass('active');
        $list.find('.u-nameList').children().eq(index).show().siblings().hide();
        return false;
    })

    var url = $(".userinfo_namelist").attr('data-url');
    $(".u-showname").load(url);
    //女孩切换姓名
    $(".names .girlname").on('click',function(){
        var url=$(this).attr('data-url');
        $(".u-showname").html('');
        $(".u-loadding").show();
        $(".enameBox .refresh").attr('data-attr','2');
        $.get(url,'',function(data){
           $(".u-loadding").hide();
           $(".u-showname").html(data);
        })
    });
    //男孩切换姓名
    $(".names .boyname").on('click',function(data){
        var url=$(this).attr('data-url');
        $(".u-showname").html('');
        $(".u-loadding").show();
        $(".enameBox .refresh").attr('data-attr','1');
        $.get(url,'',function(data){
           $(".u-loadding").hide();
           $(".u-showname").html(data);
        })
    });
    //换一换刷新
    $(".enameBox .refresh").on('click',function(data){
        var type = $(this).attr('data-attr');
        $(".u-showname").html('');
        $(".u-loadding").show();
        if(type =='1'){
          var url = $(".boyname").attr('data-url');
        }else{
          var url = $(".girlname").attr('data-url');
        }
        $.get(url,'',function(data){
          $(".u-loadding").hide();
          $(".u-showname").html(data);
        })
    });

});
