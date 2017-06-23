define(function(require,exports,module){
/*验证*/
  $(".r-ul .jsCheck").focusin(function(){
    $(this).closest("li").addClass("icon-hover");
    $(".login .error").hide();
  }).focusout(function(){
    if(!$(this).val()){
      $(this).closest("li").removeClass("icon-hover");
    }
  });
  $(".a-log-btn").click(function(){
    var userName = $("input[name='nsername']").val();
    var userNameFle = /^[\u4e00-\u9fa5]{2,4}$/;
    var password = $("input[name='password']").val();
    var passwordFle = /^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
    if(userName==""){
      $(".login .error").html("请输入您的用户名").show(); 
      return false;
    }
    if(!userNameFle.test(userName)){
      $(".login .error").html("请输入正确的用户名").show();
      return false;  
    }
    if(password==""){
      $(".login .error").html("请输入您的密码").show(); 
      return false; 
    }
    if(!passwordFle.test(password)){
      $(".login .error").html("请输入正确的密码").show(); 
      return false;
    }
    $("#loginForm").submit();
  });
  $(".r-show").click(function(){
    $(this).toggleClass("r-show-hover");
    $(".r-icon ul").toggleClass("r-up");
  });
/*公共切换*/
  $(".a-top .r-bt").click(function(){
    $(".a-top .r-tit").toggleClass("r-tit-hor");
    $(".a-top .r-lg").toggle();
  });
  $(".a-top .r-lg").on("click","a",function(){
    $(this).addClass("check").siblings().removeClass("check");
    $(".a-top .r-lg").hide();
    $(".a-top .r-tit").removeClass("r-tit-hor");
  });
  $(".login .btn-i").on("click",function(){
    $(".btnUl").show();
    $(this).addClass("btn-i-hor");
  });
  $(".login .btnUl").on("click","li",function(){
    $(this).addClass("chekLi").siblings().removeClass("chekLi");
    $(".btnUl").hide();
    $(".login .btn-i").removeClass("btn-i-hor");
    $(".login .btn-ts").find("span").html($(this).find("a").html());
  });
  $(".homepage .l-ul").on("click",".sign",function(){
    $(this).addClass("sign-hover");
  });
  
  function Rquee(){
    $(".r-Bts").find("ul:first").animate({
      marginTop:"-22px"
    },1000,function(){
      $(this).css({
        marginTop:"0px"
      }).find("li:first").appendTo(this);
    });
  }
  setInterval(Rquee,1000);
/*点击轮播*/
  var oUl=$(".r-p-pic"); 
  var aLi=oUl.find("li");
  var aPoit=$(".r-p-switch li");
  var oCount=aLi.length;
  var oNow=0;
  var speed=300;// 渐变效果
  var slideSpeed=6000;//切换时间
  var timer=null;
  aPoit.on("click",function(){
    var index=$(this).index();
    if(oNow==index)return;
    slide(index);
  }).hover(function(){
    clearInterval(timer);
  },function(){
    begin();  
  });
  begin();
  function slide(type){
    if(aLi.eq(oNow).is(":animated")) return;
    aLi.eq(oNow).css({"z-index":0}).animate({"opacity":0},speed);
    if(type==="next"){
      oNow++;
    }else if(type==="prev"){
      oNow;
    }else{
      oNow=type;
    }
    if(oNow<0){
      oNow=oCount-1;
    }else if(oNow===oCount){
      oNow=0; 
    }
    aLi.eq(oNow).css({"z-index":1,"opacity":0.7}).animate({"opacity":1},speed); 
    pointer();
    begin();
  }
  function begin(){
    if(oCount<=1) return; 
    clearInterval(timer);
    timer=setInterval(function(){
      slide("next");
    },slideSpeed);
  }
  function pointer(){
    aPoit.removeClass("crt").eq(oNow).addClass("crt");
  }
/*自动轮播*/
  var index=0;
  var advImg=$(".page-adv img");
  var advLeg=advImg.length;
  function palyAdv(mx){
    advImg.eq(index).fadeIn(500).siblings("img").fadeOut(500);  
  }
  setInterval(function(){
    palyAdv(index);
    index++;
    if(index==advLeg){
      index=0;
    }    
  },2000);
/*期刊*/
  $(".jour").on("click",".flip li",function(){
    var index=$(this).index();
    $(this).addClass("f-crt").siblings().removeClass("f-crt");
    $(".jour-t-l").find("ul").eq(index).show().siblings().hide();   
  });
  var sPage=1;
  var i=12;
  var jourR=$(".jour-t-r").find("ul");
  var jourT=jourR.width();
  var jLen=$(".jour-t-r").find("li").length;
  var pageJlen= Math.ceil(jLen / i);//总共多少个版面
  $(".jour").on("click",".j-rt",function(){
    $(".jour .j-lt").removeClass("j-lt-hvt");
    if(sPage == pageJlen) {
      return false;
    }
    if(!jourR.is(":animated")){
      var jourJt=parseInt($("#j-it").html());
      jourJt++;
      $("#j-it").html(jourJt);
      sPage ++;
      jourR.animate({left:'-='+jourT},'slow');
      if(sPage == pageJlen){//最后一板块
        $(this).addClass("j-rt-hvt");
        sPage = pageJlen;
      }
    }
  });
  $(".jour").on("click",".j-lt",function(){
    $(".jour .j-rt").removeClass("j-rt-hvt");
    if(sPage==1){
      return false;
    }
    if(!jourR.is(":animated")){
      var jourJt=parseInt($("#j-it").html());
      jourJt--;
      $("#j-it").html(jourJt);
      sPage--; 
      jourR.animate({left:'+='+jourT},'slow');
      if(sPage==1){//第一模块
        $(this).addClass("j-lt-hvt");
        jourR.animate({left:'0px'},'slow');
      }
    }
  });
/*分页*/
  jQuery.fn.pagination = function(maxentries, opts){
    opts = jQuery.extend({
      items_per_page:10,//每页要显示的数量
      num_display_entries:10,//连续分页主体部分显示的分页条目数
      current_page:0,//当前选中的页面，默认第一页
      num_edge_entries:0,//两侧显示的首尾分页的条目数
      link_to:"#",//分页的连接
      prev_text:"Prev",
      next_text:"Next",
      ellipse_text:"...",
      prev_show_always:true,//是否显示前一页分页按钮
      next_show_always:true,//是否显示后一页分页按钮
      input_num_page:"",
      input_name:"",
      callback:function(){return false;}
    },opts||{});
    
    return this.each(function() {
      /**
       * 计算最大分页显示数目
       */
      function numPages() {
        return Math.ceil(maxentries/opts.items_per_page);
      } 
      /**
       * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
       * @返回 {数组(Array)}
       */
      function getInterval()  {
        var ne_half = Math.ceil(opts.num_display_entries/2);//展示页数的一半
        var np = numPages();//总页数
        var upper_limit = np-opts.num_display_entries;//主体剩余的页数,10
        var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
        var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
        return [start,end];
      }
      
      /**
       * 分页链接事件处理函数
       * @参数 {int} page_id 为新页码
       */

      function pageSelected(page_id, evt){
        current_page = page_id;
        drawLinks();
        var continuePropagation = opts.callback(page_id, panel);
        // if (!continuePropagation) {
        //  if (evt.stopPropagation) {
        //    evt.stopPropagation();
        //  }
        //  else {
        //    evt.cancelBubble = true;
        //  }
        // }
        // return continuePropagation;
      }
      
      /**
       * 此函数将分页链接插入到容器元素中
       */
      function drawLinks() {
        panel.empty();
        var interval = getInterval();//返回的开始和结束的数组
        var np = numPages();//总页数
        // 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected，这有点不明白
        var getClickHandler = function(page_id) {
          return function(evt){ return pageSelected(page_id,evt); }
        }
        //辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
        var appendItem = function(page_id, appendopts){
          page_id = page_id<0?0:(page_id<np?page_id:np-1); // 规范page id值
          appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
          if(page_id == current_page){
            var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
          }else{
            var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
              .bind("click", getClickHandler(page_id))
              .attr('href', opts.link_to.replace(/__id__/,page_id));    
          }
          if(appendopts.classes){lnk.addClass(appendopts.classes);}
          panel.append(lnk);
        }
        // 产生"Previous"-链接
        if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
          appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
        }
        // 产生起始点，num_edge_entries两侧要显示页数
        if (interval[0] > 0 && opts.num_edge_entries > 0)
        {
          var end = Math.min(opts.num_edge_entries, interval[0]);
          for(var i=0; i<end; i++) {
            appendItem(i);
          }
          if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
          {
            jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
            // appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});//后加
          }
        }
        // 产生内部的些链接
        for(var i=interval[0]; i<interval[1]; i++) {
          appendItem(i);
        }
        // 产生结束点
        if (interval[1] < np && opts.num_edge_entries > 0)
        {
          if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
          {
            // appendItem(current_page+1,{text:opts.next_text, classes:"next"});//后加
            jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
          }
          var begin = Math.max(np-opts.num_edge_entries, interval[1]);
          for(var i=begin; i<np; i++) {
            appendItem(i);
          }
          
        }
        // 产生 "Next"-链接
        if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
          appendItem(current_page+1,{text:opts.next_text, classes:"next"});
        }
      }
      
      //从选项中提取current_page
      var current_page = opts.current_page;
      //创建一个显示条数和每页显示条数值，maxentries是总数，items_per_page每页要显示的数量
      maxentries = (!maxentries || maxentries < 0)?1:maxentries;
      opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
      //存储DOM元素，以方便从所有的内部结构中获取
      var panel = jQuery(this);
      // 获得附加功能的元素
      this.selectPage = function(page_id){ pageSelected(page_id);}
      this.prevPage = function(){ 
        if (current_page > 0) {
          pageSelected(current_page - 1);
          return true;
        }
        else {
          return false;
        }
      }
      this.nextPage = function(){ 
        if(current_page < numPages()-1) {
          pageSelected(current_page+1);
          return true;
        }
        else {
          return false;
        }
      }
      // 所有初始化完成，绘制链接
      drawLinks();
          // 回调函数
          opts.callback(current_page, this);
          var go_link = opts.input_num_page;
          var go_num = opts.input_name;
          $("."+go_link).click(function(){
          var linkNum = $("input[name="+go_num+"]").val();
          var allPage = numPages();
        if(linkNum == null || linkNum == ""){
          alert("请输入要跳转的页数。");
        }else if(isNaN(linkNum) || linkNum <=0 || linkNum > allPage){
          alert("请输入正确的页数")
        }else{
          pageSelected(linkNum-1);
        }
          })
    });
  }
  var num_entries = $("#hiddenresult li").length;
  var showNum = 10;
  var allPage = Math.ceil(num_entries/showNum);
  var initPagination = function() {
    // 创建分页
    $(".f-jump-page").pagination(num_entries, {
      num_edge_entries: 1, //边缘页数
      num_display_entries: 4, //主体页数
      items_per_page:showNum,
      prev_text:'上一页',
      next_text:'下一页',
      input_num_page:"go_page",
      input_name:"page_num",
      callback: pageselectCallback
    });
   }();
    function pageselectCallback(page_index, jq){
      var max_elem = Math.min((page_index+1) * showNum,num_entries);
      $(".m-cer ul").html("");
      $(".m-cer ul").append(
        '<li class="m-l-fst">'
          +'<span class="checkbox"></span>'
          +'<span class="grade">等级</span>'
          +'<span class="theme">主题</span>'
          +'<span class="content">摘要</span>'
          +'<span class="time">时间</span>'
        +'</li>');
      for(var i=page_index*showNum;i<max_elem;i++){
        $(".m-cer ul").append($("#hiddenresult li:eq("+i+")").clone());
      }
    /*消息*/
    $(".m-cer .m-c-btn").click(function(){
      var checkBox=$(this).find(".checkbox");
      var cInput=$(this).find(".c-input");
      checkBox.toggleClass("cbActive");
      if(checkBox.hasClass("cbActive")){
        cInput.attr("checked",true);
      }else{
        cInput.attr("checked",false);  
      }
    });
    $(".m-cer .m-l-fst").on("click",".checkbox",function(){
      var fstBtn=$(this).parents().find(".m-c-btn .checkbox");
      var bInput=$(this).parents().find(".m-c-btn .c-input");
      $(this).toggleClass("cbActive");
      if($(this).hasClass("cbActive")){
        fstBtn.addClass("cbActive");  
      }else{
        fstBtn.removeClass("cbActive");  
      }
      if(fstBtn.hasClass("cbActive")){
        bInput.attr("checked",true);
      }else{
        bInput.attr("checked",false);  
      }
    });
    return false;
  }
   
  $(".m-lt .del").click(function(){
    $(this).parents().find(".mess .m-c-btn .cbActive").parent().hide();
  });
  $(".m-lt .read").click(function(){
    $(this).parents().find(".mess .m-c-btn .cbActive").siblings(".email").addClass("emailHf");
  });
/*上下轮播*/
  function AutoScroll(obj) {
   $(obj).find("ul:first").animate({
    marginBottom: "-30px"
   }, 1000, function() {
    $(this).css({ marginBottom: "0px" }).find("li:first").appendTo(this);
   });
  }
 var lHolder=setInterval(function(){
  AutoScroll(".l-list,.a-list");
 },1000);
/*你问我答*/
  $(".ask .s-lt").on("click","li",function(){
    $(this).addClass("cor").siblings().removeClass("cor");
    var index=$(this).index();
    $(".ask .sr-list").eq(index).show().siblings(".sr-list").hide();
  });
/*系统消息*/
  $(".sr-list li").mouseover(function(){
    $(this).addClass("s-hor-clor");
    $(this).find(".del").show();
  }).mouseleave(function(){
    $(this).removeClass("s-hor-clor");
    $(this).find(".del").hide();
  });
  $(".sr-list li").on("click",".del",function(){
    $(".n-layer").show();
    nDel($(this));
  });
  function nDel(del){
    $(".n-layer .yes").click(function(){
      del.closest("li").remove();
    });
  }
  $(".n-layer .no,.n-layer .yes").click(function(){
    $(".n-layer").hide();
  });
  $(".news .allDel").click(function(){
    $(this).closest(".sr-list").find("ul").remove();
  });
  $(".news .read").click(function(){
    $(this).closest(".sr-list").find("ul li").addClass("sr-hor");
  })
/*信息详情页*/
  //赞过 
  $(".likes .agree").click(function(){
    $(this).addClass("agree-hover");
    $(this).find("i").html(parseInt($(this).find("i").html())+1);
    $(this).unbind("click");
    // ajax
    $.ajax({
      type:"post",
      url:"http://www.a.com",
      dataType:"json",
      data:{},
      scuess:function(msg){
        if(msg.status){
          $(this).find("i").html(parseInt($(this).find("i").html())+1);
        }
      }
    });
  }); 
  //踩过
  $(".likes .disagree").click(function(){
    $(this).addClass("disagree-hover");
    $(this).find("i").html(parseInt($(this).find("i").html())+1);
    $(this).unbind("click");
    // ajax
    $.ajax({
      type:"post",
      url:"http://baidu.com",
      dataType:"json",
      data:{},
      scuess:function(msg){
        if(msg.status){
          $(this).find("i").html(parseInt($(this).find("i").html())+1);
        }
      }
    });
  }); 
  $(".reply-more .more-t").click(function(){
    $(".reply-list").css("height","auto");
    $(".reply-more").hide();
    $(".reply-page").show();
  });
/*2016/11/8第二期*/
/*个人信息*/
  $(".infoLeft li").click(function(){
    $(this).addClass("check").siblings().removeClass("check");
    var index=$(this).index();
    var infoHg=$(".rt-info").eq(index).offset();
    $("body,html").animate({
      scrollTop:infoHg.top
    },500)
  });
  $(window).scroll(function(){
    $(".rt-info").each(function(){
      var index=$(this).index();
      var offsetH=$(".rt-info").eq(index).offset().top;
      if($(window).scrollTop()>=offsetH){
        $(".infoLeft li").eq(index).addClass("check").siblings().removeClass("check");  
      }
    });
  });
/*办公用品领用*/
  $("#addImg").click(function(){
    var copy=$(".requis-list").eq(0).clone(true);
    $(".req-copy").append(copy);
  });
  $(".rt-list .input").click(function(event){
    event.stopPropagation(); //阻止事件冒泡 
    $(this).toggleClass("input-hover");
    $(this).find(".drop-down").toggleClass("drop-up");
    $(this).parents(".rt-list").find(".layer-list").toggle();
    $(this).parents(".rt-list").find(".error").hide();
  });
  $(".rt-list-input .input").click(function(){
    $(this).parents(".rt-list-input").find(".error").hide();
  });
  $(document).click(function(e){
    if (!$(".rt-list .input").hasClass("layer-list")){
      $(".layer-list").hide();
      $(".rt-list .input").removeClass("input-hover");
      $(".rt-list .input").find(".drop-down").removeClass("drop-up");
    } 
  });
  $(".layer-list li").click(function(){
    var str=$(this).text();
    var num=$(this).attr("num");
    var LayerList=$(this).parents(".layer-list");
    var LayerInput=LayerList.siblings(".input");
    LayerList.siblings(".select-hd").val(num);
    LayerInput.removeClass("input-hover");
    LayerInput.find(".test").text(str);
    LayerInput.find(".drop-down").removeClass("drop-up");
    LayerList.hide(); 
    LayerList.siblings(".form-select").val(num);
  }); 
  $(".form-btn").click(function(){
    $(".requis-list").each(function(){
      var groupN=$(this).find(".group").val();
      var nameN=$(this).find(".name").val();
      var numN=$(this).find(".number").val();
      var comN=$(this).find(".company").val();
      if(groupN==""){
        $(this).find(".error01").show();  
      }
      if(nameN==""){
        $(this).find(".error02").show();  
      }
      if(numN==""){
        $(this).find(".error03").show();  
      }
      if(comN==""){
        $(this).find(".error04").show();  
      }
    });
  });
 
});
