 
define(function(require,exports,module){
require("placeholder");
  /*数字*/
  $(".s_nums").on("keyup",function () {
      if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}
  });
  $(".s_nums").on("afterpaste",function () {
      if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}
  });
  /*选择等级*/
  $(".s_userType").change(function(){
      var s_userType=$(".s_userType").val();
      var s_userLevel=$(".s_userLevel").val();
      if(s_userType=="0"){
          $(".s_dataNone").addClass("show").removeClass("hide");
          $(".s_dataAdult").addClass("hide").removeClass("show");
          $(".s_dataJunior").addClass("hide").removeClass("show");
      }else{
          if(s_userType=="1"){
              $(".s_dataNone").addClass("hide").removeClass("show");
              $(".s_dataAdult").addClass("show").removeClass("hide");
              $(".s_dataJunior").addClass("hide").removeClass("show");
              
            }
          if(s_userType=="2"){
              $(".s_dataNone").addClass("hide").removeClass("show");
              $(".s_dataAdult").addClass("hide").removeClass("show");
              $(".s_dataJunior").addClass("show").removeClass("hide");
            } 
          }

  });
 /*选择级别*/
 $(".s_userLevel.booklevel").change(function(){
      var s_userType=$(".s_userType").val();
      var s_userLevel=$(".s_userLevel.show").val();
      $.ajax({
              url:"/Admin/course/textbooksVerify",
              type:"post",
              dataType:"json",
              cache:false,
              data:{
                  "textbook":s_userType,
                  "level":s_userLevel
              },
              success: function (data) {
                 if(data.status==0) {
                    alert(data.info);
                    window.location.href=data.data;
                    return false;
                }
              }

          });
 });
   
   /*添加，删除*/
   $(".s_part").find(".s_add").live("click",function(){
        var oPart='<div class="s_part">'
        +'<div class="s_group">'
                     +'<div class="s_list s_left">'
                           
                      +'</div>'
                      +'<div class="s_list s_right">'
                          +'<input type="text" class="s_number s_txt s_en" placeholder="英文" >'
                      +'</div>'
                  +'</div>'
                  +'<div class="s_group">'
                      +'<div class="s_list s_left">'
                          
                      +'</div>'
                      +'<div class="s_list s_right">'
                         +'<input type="text" class="s_number s_txt s_cn" placeholder="中文" >'
                          +'<div class="s_action">'
                            +'<a href="javascript:;" class="s_add">+添加</a>'
                            +'<a href="javascript:;" class="s_remove">-删除</a>'
                          +'</div>'
                      +'</div>'
                  +'</div>'
                +'</div>'
        var oPartParent=$(this).parents(".s_part");
        var oParentLength=$(this).parents(".s_parent").children(".s_part").length;
        if(oParentLength>=20){return false;}
        $(oPart).insertAfter(oPartParent);
        // $(this).parents(".s_parent").find(".s_remove:gt(0)").removeClass("s_gay");
   });
     // $(".s_part").find(".s_remove:first").click(function(){
     //      return false;
     // });
    $(".s_part").find(".s_remove").live("click",function(){
        var arr=$(this).parents(".s_parent").find(".s_part");
        if(arr.length<=1){
            return false;
        }
        $(this).parents(".s_part").remove();  
    });
  /*验证form*/
  $(".s_save").on("click",function () {
      var userType=$("select[name='userType']").val();
      var en_cando=$("textarea[name='en_cando']").val();
      var cn_cando=$("textarea[name='cn_cando']").val();
      var num_theme=$("input[name='num_theme']").val();
      var en_theme=$("input[name='en_theme']").val();
      var cn_theme=$("input[name='cn_theme']").val();
      var theme=[];
      var num_words=$("input[name='num_words']").val();
      var en_words=$("input[name='en_words']").val();
      var cn_words=$("input[name='cn_words']").val();
      var words=[];
      var num_key=$("input[name='num_key']").val();
      var en_key=$("input[name='en_key']").val();
      var cn_key=$("input[name='cn_key']").val();
      var key=[];
      var num_grammar=$("input[name='num_grammar']").val();
      var en_grammar=$("input[name='en_grammar']").val();
      var cn_grammar=$("input[name='cn_grammar']").val();
      var grammar=[];
      var keyVocabulary=$("input[name='keyVocabulary']").val();
      var keySentence=$("input[name='keySentence']").val();


      $(".s_theme").find(".s_part").each(function (i,v) {
            var en=$(v).find(".s_en").val();
            var cn=$(v).find(".s_cn").val();
            var object={};
            object.en=en;
            object.cn=cn;
            theme.push(object); 
      });    

      $(".s_words").find(".s_part").each(function (i,v) {
            var en=$(v).find(".s_en").val();
            var cn=$(v).find(".s_cn").val();
            var object={};
            object.en=en;
            object.cn=cn;
            words.push(object); 
      });   

      $(".s_key").find(".s_part").each(function (i,v) {
            var en=$(v).find(".s_en").val();
            var cn=$(v).find(".s_cn").val();
            var object={};
            object.en=en;
            object.cn=cn;
            key.push(object); 
      });   

      $(".s_grammar").find(".s_part").each(function (i,v) {
            var en=$(v).find(".s_en").val();
            var cn=$(v).find(".s_cn").val();
            var object={};
            object.en=en;
            object.cn=cn;
            grammar.push(object); 
      }); 
    theme = JSON.stringify(theme);
    words = JSON.stringify(words);
    key = JSON.stringify(key);
    grammar = JSON.stringify(grammar);

      $("input[name='theme']").val(theme);
      $("input[name='words']").val(words);
      $("input[name='key']").val(key);
      $("input[name='grammar']").val(grammar);

      // 等级
      var userLevel=$(".s_userLevel.show").val();
      $("input[name='level']").val(userLevel);
  
      if (userType=="0") {
          alert("请选择教材！");
          return false;
      }
      if (en_cando==""||cn_cando=="") {
          alert("请填写cando内容！");
          return false;
      }
      if (num_theme=="") {
          alert("请填写theme数字！");
          return false;
      }
      if (en_theme==""||cn_theme=="") {
          alert("请填写theme中文或者英文内容！");
          return false;
      }
      if (num_words=="") {
          alert("请填写Words/chunks数字！");
          return false;
      }
      if (en_words==""||cn_words=="") {
          alert("请填写Words/chunks中文或者英文内容！");
          return false;
      }
      if (num_key=="") {
          alert("请填写Key Sentences数字！");
          return false;
      }
      if (en_key==""||cn_key=="") {
          alert("请填写Key Sentences中文或者英文内容！");
          return false;
      }
      if (num_grammar=="") {
          alert("请填写Grammar数字！");
          return false;
      }
      if (en_grammar==""||cn_grammar=="") {
          alert("请填写Grammar中文或者英文内容！");
          return false;
      }
      if (keyVocabulary=="") {
          alert("请填写关键词汇！");
          return false;
      }
      if (keySentence=="") {
          alert("请填写关键句！");
          return false;
      }else{
          $("#regForm").submit();
      }
  });
}); 