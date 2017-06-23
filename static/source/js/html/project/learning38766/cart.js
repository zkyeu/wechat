/**
 * 
 * @authors Saturday (zhouling@51talk.com)
 * @date    2014-11-13 18:53:30
 * @version 1.0.0
 */
//购物车
define("cart",[],function (require,exports,module){
    var cookies= require("cookie");
    var JSON2=require("json2");
    //是否分期付款
    var bStaging=$("#showAgree").val()=="y";
	var sDomain =document.domain;
    var oCart=$("#cart");
    var oForm=oCart.parents("form");
    var oInput=oForm.find("input:first");
    //订单数量
    var aCount=oCart.find(".jsCount");
    //存放商品列表的div
    var oWrap=oCart.find(".jsWrap");
    //订单总金额
    var oTotal=oCart.find(".total-orders");
    var oTotalStagin=oCart.find(".total-orders-stagin");
    //电话包总金额
    var oPackage=oCart.find(".jsPackage");
    //分页模块
    var oPage=oCart.find(".u-pages");
    //总页数
    var oPageCount=oPage.find(".jsPageCount");
    //当前页码
    var oPageNow=oPage.find(".jsPageNow");
    //上一页
    var oPrev=oPage.find(".prev");
    //下一页
    var oNext=oPage.find(".next");
    //默认显示第一页
    var iPageNow=1;
    //默认每页三个
    var iPages=3;
    //每一页的高度
    var top=oWrap.parent().height();
    //购物车类型 用以区分购物车和套餐升级
    var cartType="";
    //附加商品模块（电话包、耳机）
    var oAdds=oCart.find(".addeds");
    var oPackageChk=oAdds.find("input[name='package']");
    var oEarphoneChk=oAdds.find("input[name='earphone']");
    //补差价显示模块
    var oDiffer=oCart.find(".differ");
    //被减数
    var oMinuend=oDiffer.find(".jsMinuend");
    //减数
    var oMeiosis=oDiffer.find(".jsMeiosis");
    //差
    var oDifference=oDiffer.find(".jsDifference");
    var cookieName="";
    var bFirst=true;
    function fnCart(){

        if($("#cart").length==0)return;
        cartType=$("#cartType").val() || "cart";
        cookieName=cartType+$("#cartID").val();
        //移入移除效果
        var right=parseInt(oCart.css("right"));
        oCart.mouseenter(function(){
            this.timer=setTimeout(function(){
                oCart.stop().animate({"right":0});
            },100);
        }).mouseleave(function(event){
            
            if(event.pageX<$(window).width()){
                clearTimeout(this.timer);
                oCart.stop().animate({"right":-255});
            }            
        });
        //删除购物车里的商品
        oCart.find(".jsDelete").live("click",function(){
            subtract.call(this);
        });
        //购买按钮状态切换
        $("a[data-cart]").on("click",function(){
            $("#cart").show();
            var oBtn=$(this);
            if(oBtn.hasClass("hover2"))return;
            var isoumei = parseInt($("#isoumei").val());
            var sData1=oBtn.attr("data-cart");
            var json1=JSON2.parse(sData1);
            if(parseInt(json1.is_payed)==1){
                $(".alert_dialog p").text("您已经购买过该套餐了，活动期间只能购买一次哦~");
                $(".alert_dialog").show();
                return;
            }
            if(isoumei==1 && ((json1.point_type == "point") || (json1.point_type =="month"))){
                $(".alert_dialog p").text("您不能购选该课程哦！");
                $(".alert_dialog").show();
                return;
            }else if(isoumei==0 && (json1.point_type == "na_pri")){
                $(".alert_dialog p").text("您不能购选该课程哦！");
                $(".alert_dialog").show();
                return;    
            }
            //专项包课程不能重复购买
           /* if(oBtn.attr("data-payed")==1){
                $.alert("套餐有效期内不能重复购买");
                return;
            }*/
            /*if(oBtn.hasClass("jsPre") && $(".jsPre").filter(".hover2").length){
                $.alert("亲爱的学员，零基础中教课程套餐不能重复购买，有疑问请联系客服4000515151",$.noop,"知道了");
                return;
            }*/
            oCart.stop().animate({"right":0});
            if(cartType=="cover"){
                oPackageChk.unChecked();
            }
            add(oBtn);
        });
        if(cartType=="cover"){
            oPage.hide();
        }
        oPrev.on("click",function(){
            if(oPrev.hasClass("dis-prev") || oWrap.is(":animated"))return;
            iPageNow--;
            oWrap.animate({"top":-(iPageNow-1)*top});
            setPage();
        });
        oNext.on("click",function(){
            if(oNext.hasClass("dis-next") || oWrap.is(":animated"))return;
            iPageNow++;
            oWrap.animate({"top":-(iPageNow-1)*top});
            setPage();
        });
        oCart.find(".jsEarphoneLabel,.jsPackageLabel").on("click",function(){
            updateCart();
        });
       var sData=cookies.getCookie(cookieName);

       /* console.log(cookies.getCookie(cookieName));
        debugger; */
        if(!sData){
            bFirst=false;
            return;
        };
        var json=JSON2.parse(sData);
        var aCart=json.cart;
        var _package=json.package;
        var earphone=json.earphone;

        //保证id真实有效----套餐升级bug修复
        var aEffId=[];
        for(var i=0;i<aCart.length;i++){
            var id=aCart[i];
            var oBtn=$(".u-btn[data-id="+aCart[i]+"]");
            if(oBtn.length){
                aEffId.push(id);
            }
        }
        json.cart=aEffId;

        if(!aEffId.length){
            bFirst=false;
            return;
        };

        if(aCart.length){
            oInput.val(JSON2.stringify(json));
        }


        if(_package=="on"){
           oPackageChk.checked();
        }else{
           oPackageChk.unChecked();
        }
        if(earphone=="on"){
           oEarphoneChk.checked();
        }else{
           oEarphoneChk.unChecked();
        }
        for(var i=0;i<aCart.length;i++){
            var oBtn=$(".u-btn[data-id="+aCart[i]+"]");
            add(oBtn);
        }
        updateCart();
        bFirst=false;

    }
    function subtract(){
        var oProduct=$(this).parents(".product");
        oProduct.remove();
        var dataId=$(this).attr("data-id");
        var oBtn=$(".u-btn[data-id="+dataId+"]");
        oBtn.removeClass("hover2").addClass("active").css("cursor","pointer");
        updateCart();
    }
    function add(oBtn){
        var sData=oBtn.attr("data-cart");
        var json=JSON2.parse(sData);
        //var json = JSON.parse(sData);
        // id/价格/电话包价格/代金券/类型/课程次数/有效期
        //{"id":112,"price":3866,"package":900,"cash_card":0,"point_type":"month","point_value":6,"expire_days":180,title:"专项课的特殊文案"}
        var dataId       = json.id;
        var price        = json.price;
        var _package     = json.package;
        var cash_card    = json.cash_card;
        var point_type   = json.point_type;
        var point_value  = json.point_value;
        var expire_days  = json.expire_days;
        var supply_money = json.supply_money;
        //新版教材寄送
        var book_ce      = json.bookce;
        var book_type    = json.booktype;
        //专项课的特殊文案
        var gvp_txt      = json.title;
        var point_title  = json.point_title;
        var sDl="";
        var book_style = '';
        switch (book_ce) {
            case "1":
                book_style = '上册';
            break;
            case "2":
                book_style = '中册';
            break;
            case "3":
                book_style = '下册';
            break;
        }
        switch(point_type){
            case "point":
                point_value+="次次卡 次卡学习套餐";
                break;
            case "month":
                point_value+="个月 包月学习套餐";
                break;
            case "classic":
                point_value+="个月 无限卡学习套餐";
                break;
            case "class_time":
                point_value+="课时 精品课时学习套餐";
                break;
            // 修改显示新版的
            case "book":
                point_value = book_type + ' ' + 'Level' + point_value + " " + book_style;
                break;
            // case "book":
            //     point_value="推荐教材 Level "+point_value;
            //     break;
            case "blend":
                point_value="零基础中教课程组合套餐";
                break;
            case "ct":
                point_value="零基础中教课程套餐";
                break;
            case "junior_point":
                point_value=point_title;
                break;
            case "na_pri":
                point_value="2单元学习套餐";
                break;    
            case "gvp":
                point_value+=gvp_txt;
                break; 
        }
        if(cartType=="cover"){
            point_value="升级到"+point_value;
        }
        if(bStaging){
            sDl='<dl class="product">'+
                '<dt class="name"><a class="jsDelete" href="javascript:;" data-package="'+_package+'" data-id="'+dataId+'">删除</a>'+point_value+'</dt>'+
                '<dd class="valid">'+(price/12).toFixed(2)+' × 12期</dd>'+
                '<dd class="total"><em class="jsPrice">'+price+'</em><i></i></dd>'+
            '</dl>';
        }else{
            if(point_type=="blend" || point_type=="ct"){
                sDl='<dl class="product">'+
                    '<dt class="name"><a class="jsDelete" href="javascript:;" data-package="'+_package+'" data-id="'+dataId+'">删除</a>'+point_value+'</dt>'+
                    '<dd class="valid">&nbsp;</dd>'+
                    '<dd class="total"><em class="jsPrice">'+price+'</em><i></i></dd>'+
                '</dl>';
            }else{
                sDl='<dl class="product">'+
                    '<dt class="name"><a class="jsDelete" href="javascript:;" data-package="'+_package+'" data-id="'+dataId+'">删除</a>'+point_value+'</dt>'+
                    '<dd class="valid">有效期：'+expire_days+'天</dd>'+
                    '<dd class="total"><em class="jsPrice">'+price+'</em><i></i></dd>'+
                '</dl>';
            }
            
        }
        
        //记录原来的文本
        oBtn.attr("data-text",oBtn.html());
        oBtn.removeClass("active").addClass("hover2").css("cursor","default").blur();
        var oDl=$(sDl);
        if(cartType=="cover"){
            oWrap.html(oDl);
            oDiffer.show();
            // oMinuend oMeiosis oDifference
            $("a[data-cart]").not(oBtn).removeClass("hover2").addClass("active").css("cursor","pointer");
            oMinuend.html(price);
            oMeiosis.html(supply_money);
            oDifference.html(Number(price)-Number(supply_money));
        }else{
            oWrap.append(oDl);
        }
        //教材不显示有效期
        if(point_type=="book"){
            oDl.find(".valid").css("visibility","hidden").addClass("jsBook");
        }
        updateCart();
    }
    function updateCookie(){
        var jData={};
        //{"cart":[100,2,3],"package":"on","earphone":"on"}
        var aCart=[];
        oCart.find(".jsDelete").each(function(){
            aCart.push($(this).attr("data-id"));
        });
        jData.cart=aCart;
        if(oPackageChk.prop("checked")){
            jData.package="on";
        }else{
            jData.package="off";
        }
        if(oEarphoneChk.prop("checked")){
            jData.earphone="on";
        }else{
            jData.earphone="off";
        }
        var sData=JSON2.stringify(jData);
        oInput.val(sData);
        cookies.setCookie(cookieName,sData);
        //$.cookie(cookieName,sData,{expires:7,path:'/',domain:sDomain});
    }
    function updateCart(){
        var total=0;
        var _package=0;
        oCart.find(".jsDelete").each(function(){
            _package+=Number($(this).attr("data-package"));
        });
        oCart.find(".jsPrice").each(function(){
            total+=Number(this.innerHTML);
        });
        
        var count=oWrap.find(".product").length;
        aCount.html(count);
        if(count>0){
            //oAdds.show();
            oAdds.css("visibility","visible");
            //购买教材无电话包
            if(oWrap.find(".jsBook").length==count){
                oPackageChk.unChecked().parent().hide();
                oEarphoneChk.parents(".product").css("border-top","none");
            }else{
                oEarphoneChk.parents(".product").css("border-top","1px solid #e4eaee");
                oPackageChk.parent().show();
            }
            $("#cart").show();
        }else{
            //oAdds.hide();
            oAdds.css("visibility","hidden");
            oEarphoneChk.unChecked();
            oPackageChk.unChecked();
        }
        if(oPackageChk.prop("checked")){
            total+=_package;
        }
        if(oEarphoneChk.prop("checked")){
            total+=50;
        }

        if(cartType=="cover"){
            total-=Number(oMeiosis.html());
        }
        if(total<0){
            total=0;
        }
        if(bStaging){
            if(total>0){
                oTotalStagin.show().find(".jsTotal").html(total+"元="+(total/12).toFixed(2)+"元 × 12期");  
            }else{
                oTotalStagin.show().find(".jsTotal").html(total);
            }
            
            oTotal.hide();
            oCart.find('.jsSubmit').width(220);
        }else{
            oTotal.show().find(".jsTotal").html(total);
            oTotalStagin.hide();
            oCart.find('.jsSubmit').width(105);
        }
        $(".jsTotal").attr("data-total",total);
        oPackage.html(_package);
        if(count==0){
            var iPageCount=1;
        }else if(count%iPages){
            var iPageCount=parseInt(count/iPages)+1;
        }else{
            var iPageCount=parseInt(count/iPages);
        }
        oPageCount.html(iPageCount);
        if(iPageNow>iPageCount){
            iPageNow=iPageCount;
            oWrap.animate({"top":-(iPageNow-1)*top});
        }
        setPage();
        if(!bFirst) updateCookie();
    }
    function setPage(){
        oPageNow.html(iPageNow);
        if(iPageNow==oPageCount.html()){
            oNext.addClass("dis-next");
        }else{
            oNext.removeClass("dis-next");
        }
        if(iPageNow==1){
            oPrev.addClass("dis-prev");
        }else{
            oPrev.removeClass("dis-prev");
        }
    }
    var oForm=$("form[name='point_form']");
    var subAgain=false;
    oForm.on("submit",function(){
        var iBook=$(".m-textbook").find("a.hover").length;
        var total=$(".jsTotal").attr("data-total")*1;
        var dMoney=$("#downMoney").val() || 0;
        if(total<=0){
            //$.alert("您还未选购课程哦");
            $(".alert_dialog p").text("您还未选购课程哦");
            $(".alert_dialog").show();
           // alert("您还未选购课程哦");
            return false;
        }
        //中教不参与送书
        if($(".jsPre.hover").length>0){
            total-=$.parseJSON($(".jsPre.hover").attr("data-cart")).price;
        }
        var arr=$("#actArr").val();
        if(arr && !subAgain && total>0){
            arr=eval(arr);
            var arr1=[total - (iBook * 88) - dMoney];
            arr.push(arr1);
            arr.sort(function(m,n){
                return m[0]-n[0];
            });
            var index1=arr.indexOf(arr1);
            if(index1==0){
                return true;
            }
            var index=index1-1; 
            var arr2=arr[index];
            var iBook2=arr2[2];
            if(iBook2>0 && iBook<iBook2){
                $.confirm("您已免费获得"+iBook2+"本教材，马上去挑选！",function(){
                    location.href="#level";
                },function(){
                    //临时处理方式，暂不扩展confirm
                    if($(this).html()=="去结算"){
                        subAgain=true;
                        oForm.submit();
                        setTimeout(function(){
                            subAgain=false;
                        },1000);
                    }
                },"去挑选","去结算");
                return false;
            }
        }
    });
    exports.cart=fnCart;
});
