 
define(function(require,exports,module){
  var daArr = {
      "status":1,
      "info":"ok",
      "data":[
        {
          "id":"12022",
          "name":"托福全能拔高班（七月班）",
          "start_time":"06月06日",
          "end_time":"07月14日",
          "pic_url":"http://img.51talk.com/webfront/multi_class/1465194824.png",
          "detial_url":"/SpecialClass/detial/12022"
        },
        {
          "id":"13011",
          "name":"雅思全能拔高班（七月班）",
          "start_time":"06月06日",
          "end_time":"07月14日",
          "pic_url":"http://img.51talk.com/webfront/multi_class/1464939751.png",
          "detial_url":"/SpecialClass/detial/13011"
        },
        {
          "id":"12042",
          "name":"新概念1（七月班）",
          "start_time":"06月06日",
          "end_time":"07月14日",
          "pic_url":"http://img.51talk.com/webfront/multi_class/1465202281.png",
          "detial_url":"/SpecialClass/detial/12042"
        },
        {
          "id":"15014",
          "name":"新概念2（七月班）",
          "start_time":"06月06日",
          "end_time":"07月14日",
          "pic_url":"http://img.51talk.com/webfront/multi_class/1465202319.png",
          "detial_url":"/SpecialClass/detial/15014"
        },
        {
          "id":"12032",
          "name":"英语发音雕琢（七月班）",
          "start_time":"06月06日",
          "end_time":"07月16日",
          "pic_url":"http://img.51talk.com/webfront/multi_class/1465199346.png",
          "detial_url":"/SpecialClass/detial/12032"
        },
        {
          "id":"14014",
          "name":"实用语法精讲（七月班）",
          "start_time":"06月06日",
          "end_time":"07月16日",
          "pic_url":"http://img.51talk.com/webfront/multi_class/1465202043.png",
          "detial_url":"/SpecialClass/detial/14014"
        }
      ]
    };
  var classList = $(".class_list1");

  $(".a_class span").on("click",function(){
    if($(this).index()==1){
      var str="";
      for(var i = 0; i < daArr.data.length ;i++){
        str += '<li>'+
            '<a href="'+daArr.data[i].detial_url+'">'+
              '<img src="'+daArr.data[i].pic_url+'" alt="" class="class_left">'+
              '<section class="class_right">'+
                '<h3 class="class_tit">'+daArr.data[i].name+'</h3>'+
                '<p class="class_time">开课时间: <span>'+daArr.data[i].start_time+' - '+daArr.data[i].end_time+'</span></p>'+
                '<span class="class_more">查看详情</span>'+
              '</section>'+
            '</a>'+
          '</li>';
      };

      classList.eq($(this).index()).html(str);
      classList.find("li").last().addClass("class_last");
    }
    $(".a_class span").attr("class","");
    $(this).attr("class","s_active");
    classList.hide();
    classList.eq($(this).index()).show();
  })
  $(".sucess_list li").on("click",function(){
    $(".sucess_list li").attr("class","");
    $(this).attr("class","s_active");
    $(".success_inner ul").hide();
    $(".success_inner ul").eq($(this).index()).show();
  })
});


  