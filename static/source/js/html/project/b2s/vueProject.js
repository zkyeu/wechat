
define("vueProject",["vm"],function(require,exports,module){

//判断初始值   T.newData：默认区  T.newschool 默认学校
T.reId = "";
T.scId = "";
T.seachList = [];
//T.allname = "全部";
//全部数据 添加默认全部
  function searchBox(){
    var _a = [];
    var _aa = {
      "schoolName" : "全部",
      "id" : ""
    }
    _a.push(_aa);

    for(var e=0; e<T.allDate.length; e++){
      for(var f=0; f<T.allDate[e].schoollist.length; f++){
        _a.push(T.allDate[e].schoollist[f])
      }
    }
    return _a;
  }


 if(!T.newData){
    T.newData = "全部";
 }else{
     for(var i=0; i<T.allDate.length; i++){
      if (T.allDate[i].name == T.newData){
        //console.log(T.allDate[i].schoollist);
        T.reId = T.allDate[i].id;
        _p = {
          "schoolName" : "全部",
          "id" : ""
        };
        T.allDate[i].schoollist.unshift(_p);
        console.log(T.allDate[i].schoollist)
        T.seachList = T.allDate[i].schoollist;//初始化有区的 默认学校
      }
     }

 }
 if(!T.newschool){//默认为全部时  初始化 seachList
    T.newschool = "全部";
    T.seachList = searchBox();
 }else{
    for(var j=0; j<T.allDate.length; j++){
      for(var n=0; n<T.allDate[j].schoollist.length; n++){
        if(T.allDate[j].schoollist[n].schoolName == T.newschool){
          T.scId = T.allDate[j].schoollist[n].id;
        }
      }
    }
 }
 function makePop(){
    var empty = [];
    var _s = [];
    var _ss = {
      "schoolName" : "全部",
      "id" : ""
    }
    _s.push(_ss);

    for(var e=0; e<T.allDate.length; e++){
      for(var f=0; f<T.allDate[e].schoollist.length; f++){
        _s.push(T.allDate[e].schoollist[f])
      }
    }
    empty = {
       "name" : "全部",
       "id" : "",
       "schoollist" : _s,
    }
    return empty;
 }  
var empty = makePop();
//console.log(empty);
T.allDate.unshift(empty);//把数据内部第一个 初始化为空
//console.log(T.allDate);

T.vm = new Vue({
        el : "#app",
        data : {
            seachList :T.seachList,//搜索结果
            seachValue:T.newschool,//搜索框内的值
            //selected:"选择区域",
            productList:[],//整个数据
            schoolIndex:[],//当前区内数据
            showList : true,//匹配出的内容显示
            search_box : false,//搜索出来的内容的显示
            showgrad : false,//选择区的显示
            showgradText : T.newData,
            test : T.scId,//学校id
            region : T.reId,//区域id
            doubleshow : true,
            flagS : true,//判断是否是从区切换过去的
            falgmore : true,//只添加一个全部
        },
        // mounted:function(){
        //     this.cartView();
        // },
        methods:{
            cartView : function(){
                this.productList = T.allDate;
            },
            searchBox : function(){
                var _a = [];
                var _aa = {
                  "schoolName" : "全部",
                  "id" : ""
                }
                _a.push(_aa);

                for(var e=0; e<T.allDate.length; e++){
                  for(var f=0; f<T.allDate[e].schoollist.length; f++){
                    _a.push(T.allDate[e].schoollist[f])
                  }
                }
                return _a;
            },
            showSchool : function(index){//记录当前所选数据
              this.showList = false;
              this.search_box = false;
              //console.log(this.search_box);
              // this.seachValue = T.allname;
              this.seachValue = "全部";
              this.schoolIndex = index;
              //console.log(index.schoollist);
              this.showgradText = this.schoolIndex.name;
              this.showgrad = false;
              this.flagS = true;
              this.region = this.schoolIndex.id;
              this.test = "";
              //this.seachList = this.schoolIndex.schoollist;
              var _lists;
              //if(this.falgmore){
                if(this.schoolIndex.schoollist[0].schoolName == "全部"){
                  _lists = this.schoolIndex.schoollist;
                }else{
                    
                     var _p = {
                      "schoolName" : "全部",
                      "id" : "",
                    }
                    _lists = this.schoolIndex.schoollist.unshift(_p);
                    //this.falgmore = false;
                }
              this.seachList = _lists;

            },
            foucuShow : function(val){
                //this.showList = true;
                //this.search_box = true;

                // if(val == "全部"){
                //     //console.log(this.region + "#######");
                //     if(this.region){
                //         //console.log("a");
                //         this.showList = true;
                //         this.search_box = false;
                //     }else{
                //         //console.log("b");
                //         this.showList = false;
                //         this.search_box = true;
                //     }
                  
                // }else{
                //     this.showList = false;
                //     this.search_box = true;
                // }
                // if(this.schoolIndex.name == "全部"){
                //     this.showList = true;
                //     this.search_box = false;
                // }
                this.search_box = true;
                this.seachValue = "";
                this.showgrad = false;

            },
            returnData : function(sName){
              this.seachValue = sName.schoolName;
              this.test = sName.id;
              this.search_box = false;
              this.doubleshow = true;

              this.showList = false;
              //T.newschool = this.seachValue;
            },
            returnMes :function(obj){
              if(obj.id){
                this.seachValue = obj.schoolName;
              }
              else{
                //this.seachValue = "全部";
                this.showList = false;
              }
              //this.seachValue = obj.schoolName;
              this.search_box = false;
              this.test = obj.id;
              this.doubleshow = true;
              //T.newschool = this.seachValue;

            },
            showgradData : function(){
              this.productList = T.allDate;
              this.showgrad = true;
              this.search_box = false;
            },
            graBlur : function(){//选择区域失去焦点事件
              alert("a");
                this.showgrad = false;
            },
            onSubmit : function(){
                // if(this.search_box){
                //     alert("请选择学校");
                //     return;
                // }else{
                //     alert("aaa");
                //     $("#app").submit();
                // }
            }
        },
        creaded: function () {
            this.cartView();
        },
        watch:{
            seachValue : function(val){
                this.showgrad = false;
                this.showList = false;
                this.seachValue = val;
                // if(this.doubleshow){
                //   this.search_box = false;
                // }else{
                //   if(this.flagS){
                //     this.search_box = false;
                //     this.flagS = false;
                //   }else{
                //     this.search_box = true;
                //   }
                  
                // }
                // this.doubleshow = false;
                this.schoolId = "";
                //console.log(val)
                //获取选择的 val   来匹配当前的 schoolIndex.schoolList
                var seachList = this.seachList;
                seachList=[];
                var list;
                if(this.schoolIndex.schoollist){
                    list = this.schoolIndex.schoollist;
                }else{
                    list = T.seachList;
                }
                //console.log(list);
                for(var i=0; i<list.length ;i++){
                  if(list[i].schoolName.indexOf(val) >= 0){
                    seachList.push(list[i]);
                  }
                }
                this.seachList = seachList;

                for(var m=0; m<seachList.length; m++){
                  if(seachList[m].schoolName != this.seachValue){
                    this.test= "";
                  }
                }
                //console.log(list);
                //console.log(seachList);
            }
        }
    });


});