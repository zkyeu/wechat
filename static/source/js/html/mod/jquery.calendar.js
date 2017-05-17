define('calendar', [], function(require, exports, module) {
    if(jQuery&&!jQuery.calendar){
        var _$ = $;
        $ = jQuery;
        $.calendar = {
            a:new Array('����','����','����','����','����','��','��','��','��ʮ','��ʮ','��ʮ','ũ��','����','��','����','һ','��','��','��','��','��')
            //0  ����
            //1  ����
            //2  ����
            //3  ����
            //4  ����
            //5  ��
            //6  ��
            //7  ��
            //8  ��ʮ
            //9  ��ʮ
            //10 ��ʮ
            //11 ũ��
            //12 ����
            //13 ��
            //14 ����
            //15 һ
            //16 ��
            //17 ��
            //18 ��
            //19 ��
            //20 ��
            //�������� *��ʾ�ڼ���
            ,sFtv : new Array(
                "0101*Ԫ��",
                "0214 ���˽�",
                "0308 ��Ů��",
                "0312 ֲ����",
                "0315 ������Ȩ����",
                "0321 ����ɭ���ա�����������",
                "0322 ����ˮ��",
                "0323 ����������",
                "0324 �������ν��˲���",
                
                "0401 ���˽�",
                "0407 ����������",
                "0422 ����������",
                
                "0501*�Ͷ���",
                "0504 ������",
                "0505 ��ȱ����������",
                "0508 ������ʮ����",
                "0512 ���ʻ�ʿ��",
                "0515 ���ʼ�ͥ��",
                "0517 ����������",
                "0518 ���ʲ�������",
                "0520 ȫ��ѧ��Ӫ����",
                "0523 ����ţ����",
                "0531 ����������",
                
                "0601 ��ͯ��",
                "0605 ���绷����",
                "0606 ȫ��������",
                "0616 ���λ�Į���͸ɺ���",
                "0623 ���ʰ���ƥ����",
                "0625 ȫ��������",
                "0626 ���ʷ���Ʒ��",
                
                "0701 ������ ���ۻع����� ���ʽ�����",
                "0707 �й���������ս��������",
                "0711 �����˿���",
            
                "0801 ������",
                "0808 ���׽�",
                
                "0908 ����ɨä��",
                "0909 ë������������",
                "0910 ��ʦ��",
                "0916 ���ʳ����㱣����",
                "0920 ���ʰ�����",
                "0927 ����������",
                "0928 ���ӵ���",
                
                "1001*������ ����������",
                "1004 ���綯����",
                "1006 ���˽�",
                "1008 ȫ����Ѫѹ�� �����Ӿ���",
                "1009 ����������",
                "1015 ����ä�˽�",
                "1016 ������ʳ��",
                "1017 ��������ƶ����",
                "1024 ���Ϲ���",
                
                "1108 �й�������",
                "1109 ����������",
                "1112 ����ɽ��������",
                "1114 ������������",
                "1117 ���ʴ�ѧ����",
        
                "1201 ���簬�̲���",
                "1203 �����м�����",
                "1209 ����������",
                "1220 ���Żع�����",
                "1225 ʥ����",
                "1226 ë�󶫵�������",
                "1229 ����������������"
                )
        
            //ũ������ *��ʾ�ڼ���
            ,lFtv: new Array(
                "0101*����",
                "0115 Ԫ����",
                "0505 ������",
                "0506 ���Ľ�",
                "0606 ���ܽ�",
                "0707 ��Ϧ���˽�",
                "0715 ��Ԫ��(����)",
                "0815 ������",
                "0909 ������",
                "1001 ������",
                "1208 ���˽�",
                "1223 С��",
                "0100*��Ϧ"
                )
        
            //���ܼ��� ������
            ,wFtv: new Array(
                "0520 ����ĸ�׽�",
                "0530 ȫ��������",
                "0630 ���ʸ��׽�",
                "0932 ���ʺ�ƽ��",
                "0940 �������˽�",
                "1013 ���ʼ�����Ȼ�ֺ���",
                "1011 ����ס����"
                )
            ,SolarTerm:function(DateGL){
                var DifferenceInYear=31556926;
                var BeginTime=new Date(1901/1/1);
                BeginTime.setTime(947120460000);
                for(;DateGL.getFullYear()<BeginTime.getFullYear();){
                    BeginTime.setTime(BeginTime.getTime()-DifferenceInYear*1000);
                }
                for(;DateGL.getFullYear()>BeginTime.getFullYear();){
                    BeginTime.setTime(BeginTime.getTime()+DifferenceInYear*1000);
                }
                for(var M=0;DateGL.getMonth()>BeginTime.getMonth();M++){
                    BeginTime.setTime(BeginTime.getTime()+$.calendar.DifferenceInMonth[M]*1000);
                }
                if(DateGL.getDate()>BeginTime.getDate()){
                    BeginTime.setTime(BeginTime.getTime()+$.calendar.DifferenceInMonth[M]*1000);
                    M++;
                }
                if(DateGL.getDate()>BeginTime.getDate()){
                    BeginTime.setTime(BeginTime.getTime()+$.calendar.DifferenceInMonth[M]*1000);
                    M==23?M=0:M++;
                }
                var JQ;
                if(DateGL.getDate()==BeginTime.getDate()){
                    JQ=$.calendar.a[0]+"<span>"+$.calendar.SolarTermStr[M] + "</span>";//0  ����
                }else if(DateGL.getDate()==BeginTime.getDate()-1){
                    JQ=$.calendar.a[1]+"<span>"+$.calendar.SolarTermStr[M] + "</span>";//1  ����
                }else if(DateGL.getDate()==BeginTime.getDate()-2){
                    JQ=$.calendar.a[2]+"<span>"+$.calendar.SolarTermStr[M] + "</span>";//2  ����
                }else{
                    JQ=" ";
                    if(DateGL.getMonth()==BeginTime.getMonth()){
                        JQ+=$.calendar.a[3];//3  ����
                    }else{
                        JQ+=$.calendar.a[4];//4  ����
                    }
                    JQ+=BeginTime.getDate()+$.calendar.a[7]+"<span>"+$.calendar.SolarTermStr[M]+"</span>";//7  ��
                }
                return JQ;
            }
            ,lunarInfo:new Array(
                0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
                0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
                0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
                0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
                0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
                0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
                0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
                0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
                0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
                0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
                0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
                0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
                0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
                0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
                0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)
            ,nStr1:new Array('��','һ','��','��','��','��','��','��','��','��','ʮ')
            ,nStr2:new Array('��','ʮ','إ','ئ','��')
            ,nStr3:new Array("��","��","��","��","��","��","��","��","��","��","ʮ","��","��")
            ,SolarTermStr:new Array(
                "С��","����","����","��ˮ","����","����",
                "����","����","����","С��","â��","����",
                "С��","����","����","����","��¶","����",
                "��¶","˪��","����","Сѩ","��ѩ","����")
            ,DifferenceInMonth:new Array(
                1272060,1275495,1281180,1289445,1299225,1310355,
                1321560,1333035,1342770,1350855,1356420,1359045,
                1358580,1355055,1348695,1340040,1329630,1318455,
                1306935,1297380,1286865,1277730,1274550,1271556)
            ,Lunar:function(objDate) {
               var ret = {};
               var i, leap=0, temp=0;
               var baseDate = new Date(1900,0,31);
               var offset   = Math.floor((objDate.getTime() + 2206425600000)/86400000);
               
               ret.dayCyl = offset + 40;
               ret.monCyl = 14;
            
               for(i=1900; i<2050 && offset>0; i++) {
                  temp = $.calendar.lYearDays(i);
                  offset -= temp;
                  ret.monCyl += 12;
               }
               
               if(offset<0) {
                  offset += temp;
                  i--;
                  ret.monCyl -= 12;
               }
            
               ret.year = i;
               ret.yearCyl = i-1864;
            
               leap = $.calendar.leapMonth(i);
               ret.isLeap = false;
            
               for(i=1; i<13 && offset>0; i++) {
                  if(leap>0 && i==(leap+1) && ret.isLeap==false)
                     { --i; ret.isLeap = true; temp = $.calendar.leapDays(ret.year); }
                  else
                     { temp = $.calendar.monthDays(ret.year, i); }
            
                  if(ret.isLeap==true && i==(leap+1)) ret.isLeap = false;
            
                  offset -= temp;
                  if(ret.isLeap == false) ret.monCyl ++;
               }
            
               if(offset==0 && leap>0 && i==leap+1)
                  if(ret.isLeap)
                     { ret.isLeap = false; }
                  else
                     { ret.isLeap = true; --i; --ret.monCyl;}
            
               if(offset<0){ offset += temp; --i; --ret.monCyl; }
            
               ret.month = i;
               ret.day = offset + 1;
               ret.dayText=$.calendar.cDay(ret.day);
               ret.monthText = $.calendar.nStr3[ret.month]+$.calendar.a[6];//6  ��
               return ret;
            }
            ,lYearDays:function(y) {
               var i, sum = 348;
               for(i=0x8000; i>0x8; i>>=1) sum += ($.calendar.lunarInfo[y-1900] & i)? 1: 0;
               return(sum+$.calendar.leapDays(y));
            }
            ,leapDays:function(y) {
               if($.calendar.leapMonth(y))  return(($.calendar.lunarInfo[y-1900] & 0x10000)? 30: 29);
               else return(0);
            }
            ,leapMonth:function(y) {
               return($.calendar.lunarInfo[y-1900] & 0xf);
            }
            ,monthDays:function(y,m) {
               return( ($.calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
            }
            ,cDay:function(d){
                var s;
                switch (d) {
                    case 10:
                        s = $.calendar.a[8]; //8  ��ʮ
                        break;
                    case 20:
                        s = $.calendar.a[9]; //9  ��ʮ
                        break;
                    case 30:
                        s = $.calendar.a[10];//10 ��ʮ
                        break;
                    default :
                        s = $.calendar.nStr2[Math.floor(d/10)];
                        s += $.calendar.nStr1[d%10];
                }
                return(s);
            }
            ,today:new Date()
            ,detail:function(DateGL){
                if(typeof DateGL == "string"){
                    DateGL = DateGL.toDate();
                };
                var ret = {},cndate = $.calendar.Lunar(DateGL);
                ret.value = DateGL.pattern("yyyy-MM-dd");
                DateGL.getFullYear()==$.calendar.today.getFullYear() && DateGL.getMonth()==$.calendar.today.getMonth() && DateGL.getDate()==$.calendar.today.getDate() && (ret.today = true);
                ret.cnMonth = {number:cndate.month,text:cndate.monthText};
                ret.cnDay = {number:cndate.day,text:cndate.dayText};
                ret.solarTerm = $.calendar.SolarTerm(DateGL);
                for(i in $.calendar.sFtv){
                    if(typeof $.calendar.sFtv[i] != 'string')continue;
                    if($.calendar.sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
                        if(Number(RegExp.$1)==(DateGL.getMonth()+1)) {
                            if(Number(RegExp.$2)==DateGL.getDate()){
                                ret.holiday = RegExp.$4;
                                if(RegExp.$3=='*'){
                                    ret.imp = true;
                                }
                            }
                        }
                }
                for(i in $.calendar.lFtv){
                    if(typeof $.calendar.lFtv[i] != 'string')continue;  
                    if($.calendar.lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/))
                        if(Number(RegExp.$1)==ret.cnMonth.number) {
                            if(Number(RegExp.$2)==ret.cnDay.number){
                                if(!!ret.holiday){
                                   ret.holiday += " "+RegExp.$4;
                                }else{
                                    ret.holiday = RegExp.$4;
                                }
                                ret.cn = true;
                                if(RegExp.$3=='*'){
                                    ret.imp = true;
                                }
                            }
                        }
                }
                for(i in $.calendar.wFtv){
                    if(typeof $.calendar.wFtv[i] != 'string')continue;
                    if($.calendar.wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
                        if(Number(RegExp.$1)==(DateGL.getMonth()+1)) {
                            if(Number(RegExp.$3)==DateGL.getDay()){
                                if(Number(RegExp.$2)==Math.floor((DateGL.getDate()+6)/7)){
                                    if(!!ret.holiday){
                                       ret.holiday += " "+RegExp.$5;
                                    }else{
                                        ret.holiday = RegExp.$5;
                                    }
                                    if(RegExp.$4=='*'){
                                        ret.imp = true;
                                    }
                                }
                            }
                        }
                }
                var tmp = $.calendar.a[11];//11 ũ��
                tmp += ret.cnMonth.text;
                tmp += ret.cnDay.text;
                (ret.solarTerm == $.calendar.a[0]+"<span>"+$.calendar.a[12]+"</span>") && (ret.holiday = $.calendar.a[12]+$.calendar.a[13]) && (ret.cn = true);//0  ���� 12 ���� 13 ��
                !!ret.holiday || (tmp+= "&nbsp;&nbsp;"+ret.solarTerm);
                !!ret.holiday && (tmp+="&nbsp;&nbsp;"+$.calendar.a[0]+"<span>"+ret.holiday+"</span>");//0  ����
                ret.text = tmp;
                return ret;
            }
            ,init:function(el,_x){
                var d_x = {count:2,debug:!1,showHoliday:!0,yearRange:false,monthRange:false,ignoreCanVisit:false,tip:true,float:false,anim:!$.calendar.IE,format:'yyyy-MM-dd'};
                var x = $.extend(d_x,_x);
                if(x.count>1)x.ignoreCanVisit = true;
                if(x.yearRange)x.ignoreCanVisit = true;
                if(x.monthRange)x.ignoreCanVisit = true;
                var m=null,n=null,w=null,_w=null,id=null;
                function A(u){
                    var t,_s = [],_u; 
                    u.setDate(1);
                    _u = u.cl();//new
                    t = m.data("sd");t.setFullYear(_u.getFullYear());t.setMonth(_u.getMonth());
                    for(var i = 0;i<x.count;i++){
                        t = _u.pattern('yyyyMM');
                        t = m.find("#c"+id+t);
                        if(!t.length){
                            t = H(_u);
                            m.find(".content").append(t);
                        };
                        _u.setMonth(_u.getMonth()+1);
                        _s.push(t);
                    }
                    m.find(".monthbox").each(function(i,j){
                        j = $(j);
                        var t1 = j.data("date");
                        var t2 = 12*(u.getFullYear()-t1.getFullYear())+(u.getMonth()-t1.getMonth());
                        j.css({left:-(t2*221)}).data("pos",-(t2*221));
                        if(x.debug && window.console){
                            console.log('position==>'+j.attr('id')+":"+(-t2*221));
                        }
                    });
                    S(u);
                    for(var i=0;i<_s.length;i++){
                        X(_s[i]);
                    }
                    N(u);
                }
                function K(){
                    if(!(new Date()).pattern)return false;
                    if(!''.toDate)return false;
                    var z;
                    $.calendar.counter++;
                    id = $.calendar.counter;
                    m = L();
                    z = new Date();
                    z.setDate(1);
                    !!x.defaultMonth && z.setMonth(+x.defaultMonth-1);
                    !!x.defaultYear && z.setFullYear(+x.defaultYear);
                    m.data("sd",z);
                    T();
                    n.focus(B);
                    $(window).resize(Z);
                    $(document).mousedown(Q);
                    !x.canread && n.attr("readonly","readonly").css({cursor:"pointer"});
                    var st = !!n.val()?n.val().toDate(x.format):new Date();
                    n.data("text",$.calendar.detail(st).text);
                    z = H(st);
                    m.find(".content").empty().append(z);
                    m.find('iframe').height(m.height());
                    m.find(".next,.prev").click(function(){
                        var a,b,c = m.data("sd"),d = $(this).hasClass("next")?(221*x.count):-221,e,k;
                        k = G(m.data("sd"));
                        if(x.debug && window.console)console.log('show:'+m.data('sd').pattern('yyyy-MM-dd')+',status:'+k);
                        if(!x.ignoreCanVisit && (((k & 1)&&d<0) || ((k & 4)&&d>0)))
                            return false;
                        k = c.nm(0),//new
                        k.setMonth(c.getMonth()+(d>0?x.count:-1)),
                        a = m.find("#c"+id+c.pattern("yyyyMM")),
                        b = m.find("#c"+id+k.pattern("yyyyMM"));
                        c.setMonth(c.getMonth()+(d>0?1:-1));
                        if(b.length == 0){
                            c = H(k);
                            c.data("pos",d);
                            e = a.data("pos");  
                            !e && (e = 0);
                            c.css({left:e+d});
                            m.find(".content").append(c);
                            b = c;
                        };
                        X(b);
                        m.find(".monthbox").each(function(i,j){
                            var pos = $(j).data("pos");
                            !pos && (pos = 0);
                            pos -= (d>0?221:-221);
                            $(j).data("pos",pos);
                            if(x.anim){
                                if(!!i)
                                    $(j).stop().animate({left:pos},500);
                                else
                                    $(j).stop().animate({left:pos},500,function(){
                                        N(m.data("sd"));
                                        S(m.data("sd"));
                                    });
                            }else{
                                $(j).css({left:pos});
                                N(m.data("sd"));
                                S(m.data("sd"));
                            }
                        });   
                        return false;
                    });
                }
                function I(){
                    var _this = $(this);
                    if(x.tip){
                        if(x.float){
                            var a = _this.data("text");
                            w.find('.cn').html(a.split("&")[0]);
                            w.find('.imp').html(a.split(";")[2].replace(/^\s*/,'').replace(/\s/gi,'<br/>'));
                            w.show().position({
                                of: _this,
                                my: "left top",
                                at: "left bottom",
                                offset:$.calendar.IE6?"-36 1":"-36 8",
                                collision:"none none"
                            });
                        }else{
                            w.html(_this.data("text"));
                            if(w.height()!=_w.height()){
                                if(x.anim)
                                    _w.stop().animate({top:"-="+(w.height()-_w.height())+"px",height:w.height()},500);
                                else
                                    _w.css({top:+_w.css('top').replace(/px/gi,'')-w.height()+_w.height(),height:w.height()});
                            }
                        }
                        _this.hasClass("dis") && _w.addClass("dis");
                    }
                    if(_this.hasClass("dis") || _this.hasClass("cur")){
                        n.data("f",true);
                        return false;
                    }
                    if(x.anim)
                        _this.stop().animate({color:"#FFF",backgroundColor:"#5DA9E2",borderColor:"#666"},1000);
                    else
                        _this.css({color:"#FFF",backgroundColor:"#5DA9E2",borderColor:"#666"});
                }
                function J(){
                    var _this = $(this);
                    if(x.tip){
                        if(x.float){
                            w.hide();
                        }else{
                            w.html(n.data("text"));
                            if(w.height()!=_w.height() && _w.is(":visible")){
                                if(x.anim)
                                    _w.stop().animate({top:"-="+(w.height()-_w.height())+"px",height:w.height()},500);
                                else
                                    _w.css({top:+_w.css('top').replace(/px/gi,'')-w.height()+_w.height(),height:w.height()});
                            }
                        }
                        _w.removeClass("dis");
                    }
                    if(_this.hasClass("dis") || _this.hasClass("cur")){
                        n.data("f",false);
                        return false;
                    }
                    var t = _this.data("colors").split(",");
                    if(x.anim)
                        _this.stop().animate({color:t[0],backgroundColor:t[1],borderColor:t[2]},1000);
                    else
                        _this.css({color:t[0],backgroundColor:t[1],borderColor:t[2]});
                }
                function H(a){
                      var d = a.nm(0),b,c,e,f=$("<ol>").addClass("monthbox"),g,_g,l,el,_a = a.nm(0);
                      c = d.getDay();
                      !c && (c = 7);
                      c--;
                      f.data("date",_a);
                      f.attr("id","c"+id+a.pattern("yyyyMM"));
                      if(x.debug){
                        f.append($("<li>")
                        .css({position:'relative',width:0})
                        .append($('<div>').addClass('debug').html(a.getFullYear()+$.calendar.a[5]+(a.getMonth()+1)+$.calendar.a[6])));//5  �� 6  ��
                      }
                      for(e=0;e<c;e++){
                          f.append($("<li>").addClass("daybtn"));
                      }
                      b = a.getMonth();
                      while(d.getMonth() == b){
                          g = d.getDate();
                          l = $.calendar.detail(d);
                          _g = !1;
                          if(x.showHoliday){
                              if(l.holiday){
                                  if(/^([\u4E00-\u9FA5]{2})[\u4E00-\u9FA5]?(\s|$|\()/.test(l.holiday)){
                                      _g = RegExp.$1;
                                  }
                              }else if(l.today){
                                  _g = $.calendar.a[14];//14 ����
                              }
                          }
                          f.append($("<li>").addClass("daybtn").append(el = $("<a>").data("text",l.text).data("date",(g<10?"0":"")+g).html(_g?_g:g).hover(I,J).mousedown(function(){
                              var a = $(this),b = a.parents(".monthbox"),c;
                              if(a.hasClass("dis")){
                                  return true;
                              }
                              m.find(".cur").removeClass("cur");
                              a.addClass("cur");
                              c = (b.data("date").pattern("yyyy-MM-")+a.data("date")).toDate();
                              c = c.pattern(x.format);
                              n.val(c);
                              if(x.change && typeof x.change == "function"){
                                  x.change(n,c);
                              }
                              return true;
                          })));
                          // !!l.holiday && !l.cn && !l.imp && el.addClass("holiday");
                          // !!l.holiday && !!l.cn && !l.imp && el.addClass("cnholiday");
                          !!l.imp && el.addClass("import");
                          !!l.today && el.addClass("today");
                          d.setDate(g+1);
                      }
                      return f;
                }
                function L(){
                    if(x.float){
                        w = $('#cnfloat');
                        w.length || (w = $("<div>").attr('id','cnfloat')
                        .append($('<div>').addClass('cn'))
                        .append($('<div>').addClass('imp')));
                        $.calendar.IE6 || (w.append($('<div>').addClass('arrow'))
                        .append($('<div>').addClass('sarrow')));
                        w.appendTo($('body'));
                        _w = w;
                    }else{
                        w = $("#cndate div");
                        w.length || (w = $("<div>").appendTo($("<div id='cndate'>").appendTo($("body"))));
                        _w = $("#cndate");
                    }
                    var a = $("<div>").addClass("nav").addClass("not_close").append(
                        $("<a>").addClass("prev"));
                    for(var i=0;i<x.count;i++){
                        a.append($("<span>").addClass("title").css({left:80+i*221}));
                        if((x.yearRange||x.monthRange)&&i==0){
                            var l1 = $("<label>"),l2 = $("<label>");
                            if(x.yearRange){
                                l1.addClass("year").click(function(){
                                    var a = $(this),b,c,d;
                                    b = a.data("showmenu");
                                    P(a,false);
                                    if(b){
                                        if(!x.yts.is(':visible')){
                                            x.yts.height(0).show();
                                            x.ybs.height(0).show();
                                        }
                                        x.yts.stop();
                                        x.yts.position({
                                            of: $(this),
                                            my: "left bottom",
                                            at: "left top",
                                            offset:"-1 0",
                                            collision:"none none"
                                        });
                                        c = +x.yts.css('top').replace(/px/gi,''),d = x.yts.height();
                                        x.ybs.stop();
                                        x.ybs.position({
                                            of: $(this),
                                            my: "left top",
                                            at: "left bottom",
                                            offset:"-1 0",
                                            collision:"none none"
                                        });
                                        if(x.anim){
                                            x.yts.animate({height:x.th},{step:function(now,fx){
                                                $(fx.elem).css("top",c-now+d);
                                            }});
                                            x.ybs.animate({height:x.bh});
                                        }else{
                                            x.yts.css({height:x.th,top:c-x.th+d});
                                            x.ybs.css({height:x.bh});
                                        }
                                    }
                                });
                            }
                            if(x.monthRange){
                                l2.addClass("month").click(function(){
                                    var a = $(this),b;
                                    b = a.data("showmenu");
                                    P(a,true);
                                    if(b){
                                        if(!x.mbs.is(':visible')){
                                            x.mbs.height(0).show();
                                        }
                                        x.mbs.stop();
                                        x.mbs.position({
                                            of: $(this),
                                            my: "left top",
                                            at: "left bottom",
                                            offset:"-1 0",
                                            collision:"none none"
                                        });
                                        if(x.anim){
                                            x.mbs.animate({height:x.mbh});
                                        }else{
                                            x.mbs.css({height:x.mbh});
                                        }
                                    }
                                });
                            }
                            a.find(".title").css({left:70}).append(l1)
                            .append($("<span>").html($.calendar.a[5]))//5  ��
                            .append(l2)
                            .append($("<span>").html($.calendar.a[6]));//6  ��
                        }
                    }
                    a.append($("<a>").addClass("next"));
                    return $("<div>")
                    .addClass("calendar").css("display","none")
                    .append(a)
                    .append($("<div>").addClass("week"))
                    .append($("<div>").addClass("content"))
                    .append($.calendar.IE6?$('<iframe>')
                    .attr('frameborder','0').attr('marginheight','0'):'')
                    .appendTo($("body"));
                }
                function M(){
                    n.unbind("focus",B);
                    $(document).unbind('mousedown',Q);
                    $(window).unbind('resize',Z);
                    if(m.detach){
                        m.detach();
                    }else if(m.remove){
                        m.remove();
                    }
                    m = undefined;
                }
                function G(a){
                    var r = 0,_a;
                    if(!!a){
                        _a = a.cl();
                    }else{
                        _a = new Date();
                    }
                    var b = _a.pattern("yyyy-MM"),c = "";
                    if(x.minDate){
                        if(x.minDate.val){
                            c = x.minDate.val().replace(/-\d\d$/g,"");
                        }else if(x.minDate.pattern){
                            c = x.minDate.pattern("yyyy-MM");
                        }else if(typeof x.minDate == 'string' && /(\d{4}-\d{2})-\d{2}/.test(x.minDate)){
                            c = RegExp.$1;
                        }
                        c || (c = "0000-00");
                        if(b.localeCompare(c)==0){
                            r += 1;
                        }else if(b.localeCompare(c)<0){
                            r += 2;
                        }
                    }
                    if(x.maxDate){
                        _a.setDate(1);
                        _a.setMonth(_a.getMonth()+x.count-1);
                        b = _a.pattern("yyyy-MM");
                        if(x.maxDate.val){
                            c = x.maxDate.val().replace(/-\d\d$/g,"");
                        }else if(x.maxDate.pattern){
                            c = x.maxDate.pattern("yyyy-MM");
                        }else if(typeof x.maxDate == 'string' && /(\d{4}-\d{2})-\d{2}/.test(x.maxDate)){
                            c = RegExp.$1;
                        }
                        c || (c = "9999-99");
                        if(b.localeCompare(c)==0){
                            r += 4;
                        }else if(b.localeCompare(c)>0){
                            r += 8;
                        }
                    }
                    _a = null;
                    return r;
        
                }
                function N(a){
                    m.find(".prev,.next").show();
                    if(x.ignoreCanVisit){return;}
                    var h = G(a);
                    if(h & 1 || h & 2){
                        m.find(".prev").hide();
                    }
                    if(h & 4 || h & 8){
                        m.find(".next").hide();
                    }
                }
                function X(a){
                    var c="",d="",e,f,g,p=0,q=0,r,s={dis:"#DCDCDC",cur:"#fff",nor:"#222"};
                    if(x.minDate || x.maxDate){
                        if(x.minDate){
                            if(x.minDate.val){
                                c = x.minDate.val().toDate(x.format).pattern('yyyy-MM-dd').replace(/-\d\d$/g,"");
                                p = parseInt(x.minDate.val().replace(/^\d{4}-\d{2}-/g,""),10);
                                c || (c = "0000-00",p=0);
                            }else if(x.minDate.pattern){
                                c = x.minDate.pattern("yyyy-MM");
                                p = x.minDate.getDate();
                            }else{
                                var tp = x.minDate.toDate(x.format).pattern('yyyy-MM-dd');
                                c = tp.replace(/-\d\d$/g,"");
                                p = +tp.replace(/^\d{4}-\d{2}-/g,'');
                            }
                        }
                        if(x.maxDate){
                            if(x.maxDate.val){
                                d = x.maxDate.val().toDate(x.format).pattern('yyyy-MM-dd').replace(/-\d\d$/g,"");
                                q = parseInt(x.maxDate.val().replace(/^\d{4}-\d{2}-/g,""),10);
                                d || (d = "9999-99",q=32);
                            }else if(x.maxDate.pattern){
                                d = x.maxDate.pattern("yyyy-MM");
                                q = x.maxDate.getDate();
                            }else{
                                var tp = x.maxDate.toDate(x.format).pattern('yyyy-MM-dd');
                                d = tp.replace(/-\d\d$/g,"");
                                q = +tp.replace(/^\d{4}-\d{2}-/g,'');
                            }
                        }
                    }
                    e = a.data("date").pattern("yyyy-MM");
                    f = a.find(".daybtn a");
                    
                    f.each(function(i,j){
                        j = $(j);
                        j.removeClass("dis");
                        if(j.hasClass("cnholiday")){
                            j.css({color:"#26A10B",background:"#CEF6D8",borderColor:"#58FAAC"})
                            .data("colors","#26A10B,#CEF6D8,#58FAAC");
                        }else if(j.hasClass("holiday")){
                            j.css({color:"#0168EA",background:"#EFF9FB",borderColor:"#E8F5F9"})
                            .data("colors","#0168EA,#EFF9FB,#E8F5F9");
                        }else if(j.hasClass("import")){
                            j.css({color:"#FE001A",background:"#FFEFDB",borderColor:"#FFFACD"})
                            .data("colors","#FE001A,#FFEFDB,#FFFACD");
                        }else{
                            j.css({color:"#222",background:"#FFF",borderColor:"#FFF"})
                            .data("colors","#222,#FFF,#FFF");
                        }
                        if(j.hasClass("today")){
                            j.css({borderColor:"#67A1E2"}).data("colors",j.data("colors").replace(/,#[a-fA-F0-9]+$/g,",#67A1E2"));
                        }
                    });
                    r = n.val();
                    if(r){
                        r = r.toDate(x.format).pattern('yyyy-MM-dd');
                        if(r.indexOf(e)==0){
                            var j = $(f[parseInt(r.split("-")[2],10)-1]);
                            if(!j.hasClass("cur")){
                                m.find(".cur").removeClass("cur");
                                j.addClass("cur");
                            }
                            if(j.hasClass("today")){
                                j.css({color:"#FFF",background:"#FDAB00",borderColor:"#67A1E2"})
                                .data("colors","#FFF,#FDAB00,#000");
                            }else{
                                j.css({color:"#FFF",background:"#FDAB00",borderColor:"#FFF"})
                                .data("colors","#FFF,#FDAB00,#FFF");
                            }
                        }
                    }
                    if(c && c.localeCompare(e)==0){
                        f.each(function(i,j){
                            g = $(j).data('date');
                            if(!g)return;
                            if(p > parseInt(g,10)){
                                $(j).addClass("dis");
                                $(j).css({color:s.dis});
                            }
                        });
                    }
                    if(d && d.localeCompare(e)==0){
                        f.each(function(i,j){
                            g = $(j).data('date');
                            if(!g)return;
                            if(q < parseInt(g,10)){
                                $(j).addClass("dis");
                                $(j).css({color:s.dis});
                            }
                        });
                    }
                    if(c && c.localeCompare(e)>0){
                        f.addClass("dis");
                        f.css({color:s.dis});
                    }
                    if(d && d.localeCompare(e)<0){
                        f.addClass("dis");
                        f.css({color:s.dis});
                    }
                }
                function S(u){
                    var a = u.nm(0);
                    m.find(".title").each(function(i,j){
                        if((x.yearRange||x.monthRange)&&i==0){
                            j = $(j).find("label");
                            $(j[0]).html(a.getFullYear());
                            $(j[1]).html((a.getMonth()<9?"0":"")+(a.getMonth()+1));
                        }else{
                            $(j).html(a.pattern("yyyy"+$.calendar.a[5]+"MM"+$.calendar.a[6]));//5  �� 6  ��
                        }
                        a.setMonth(a.getMonth()+1);
                    });
                    a = null;
                }
                function T(){
                    var c = m.find(".content"),d = m.find(".nav"),e = c.width();
                    c.width(e*x.count);
                    m.find('iframe').width(e*x.count);
                    d.width(d.width()+e*(x.count-1));
                    var _w_ = m.find(".week");
                    x.count >= 2 && _w_.width(_w_.width()+_w_.outerWidth(!0)*(x.count-1));
                    for(var i = 0;i < x.count; i++){
                        _w_.append($("<ol>")
                            .append($("<li>").append($("<span>").addClass("i1").html($.calendar.a[15])))//15 һ 16 �� 17 �� 18 �� 19 �� 20 �� 7  ��
                            .append($("<li>").append($("<span>").addClass("i2").html($.calendar.a[16])))
                            .append($("<li>").append($("<span>").addClass("i3").html($.calendar.a[17])))
                            .append($("<li>").append($("<span>").addClass("i4").html($.calendar.a[18])))
                            .append($("<li>").append($("<span>").addClass("i5").html($.calendar.a[19])))
                            .append($("<li>").append($("<span>").addClass("i6").html($.calendar.a[20])))
                            .append($("<li>").append($("<span>").addClass("i0").html($.calendar.a[7])))
                        );
                    }
                    m.width(e*x.count);
                    
                }
                function O(u){
                    for(var i = 0;i<u.length;i++){
                        var j = $(u[i]);
                        if(x.anim){
                            if(j.hasClass('top')){
                                j.stop();
                                var h = j.height(),t = +j.css('top').replace(/px/gi,'');
                                j.stop().animate({height:0},{step:function(now,fx){
                                    $(fx.elem).css("top",t+h-now);
                                },complete: function() {
                                  $(this).hide();
                                }});
                            }else{
                                j.stop().animate({height:0},"normal","linear",function(){$(this).hide()});
                            }
                        }else{
                            j.hide();
                        }
                    }
                    return !!u.length;
                }
                function P(a,b){
                    var u,v = +a.html(),s = 4;
                    if(!b){
                        if(!x.yts){
                            u = x.yts = $("<ul>").addClass("select").addClass("top").addClass("not_close");
                            u.width(a.outerWidth(true));
                            for(var i=0;i<s;i++){
                                u.append($("<li>").html(v-s+i).hover(R,R).addClass(i==s-1?'last':'').mousedown(U));
                            }
                            u.appendTo($("body"));
                            x.th=u.height();
                            u.height(0).hide();
                            
                            u = x.ybs = $("<ul>").addClass("select").addClass("bottom").addClass("not_close");
                            u.width(a.outerWidth(true));
                            for(var i=0;i<s;i++){
                                u.append($("<li>").html(v+1+i).hover(R,R).addClass(i==0?'first':'').mousedown(U));
                            }
                            u.appendTo($("body"));
                            x.bh=u.height();
                            u.height(0).hide();
                        }else{
                            var tm = x.yts.find('li');
                            for(var i=0;i<tm.length;i++){
                                $(tm[i]).html(v-tm.length+i);
                            }
                            tm = x.ybs.find('li');
                            for(var i=0;i<tm.length;i++){
                                $(tm[i]).html(v+1+i);
                            }
                        }
                    }else{
                        if(!x.mbs){
                            u = x.mbs = $("<ul>").addClass("select").addClass("bottom").addClass("not_close");
                            u.width(a.outerWidth(true));
                            for(var i=1;i<13;i++){
                                if(v == i)
                                    continue;
                                u.append($("<li>").html(i).hover(R,R).addClass(i==0?'first':'').mousedown(V));
                            }
                            u.appendTo($("body"));
                            x.mbh=u.height();
                            u.height(0).hide();
                        }else{
                        }
                    }
                }
                function Q(e){
                    var t = $(e.target);
                    if(!!t.parents(".not_close").length || t.hasClass("not_close")){
                        O($('.select:visible'));
                        var a = t.data("showmenu");
                        m.find(".year,.month").data("showmenu",false);
                        if(t.hasClass('year') || t.hasClass('month')){
                            t.data("showmenu",!a);
                        }
                        return false;
                    }
                    n.blur();
                    if(x.tip && !x.float){
                        _w.hide();
                    }
                    $(".select").hide();
                    m.find(".year,.month").data("showmenu",false);
                    m.hide();
                }
                function R(){
                    var a = $(this),b = a.parents('ul'),c = a.index();
                    a.toggleClass("hover");
                    if(b.hasClass('top') && c == 0){
                        if(a.hasClass('hover')){
                            a.css("border-top-color","#EFF9FB");
                        }else{
                            a.css("border-top-color","#fff");
                        }
                    }
                    if(b.hasClass('bottom') && c == b.find('li').length-1){
                        if(a.hasClass('hover')){
                            a.css("border-bottom-color","#EFF9FB");
                        }else{
                            a.css("border-bottom-color","#fff");
                        }
                    }
                }
                function U(){
                    var a = $(this),b = +a.html(),c = m.data("sd"),d = c.getMonth();
                    c.setDate(1),c.setFullYear(b);c.setMonth(d);
                    A(c);
                }
                function V(){
                    var a = $(this),b = +a.html(),c = m.data("sd");
                    c.setDate(1);
                    c.setMonth(b-1);
                    A(c);
                }
                function B(){
                    var s = n.val(),u;
                    if(!!s){
                        u = s.toDate(x.format);
                    }else{
                        u = m.data('sd');
                        !u && (u = new Date());
                        if(!x.ignoreCanVisit){
                            if(x.maxDate){
                                var c;
                                if(x.maxDate.val){
                                    c = x.maxDate.val().toDate();
                                }else if(x.maxDate.toDate){
                                    c = x.maxDate.toDate();
                                }else{
                                    c = x.maxDate;
                                }
                                if(c && c.getFullYear){
                                    if(c.getFullYear()<u.getFullYear()){
                                        u.setFullYear(c.getFullYear());
                                    }
                                    if(c.getMonth()<u.getMonth()){
                                        u.setMonth(c.getMonth());
                                    }
                                    if(c.getDate()<u.getDate()){
                                        u.setDate(c.getDate());
                                    }
                                }
                            }
                            if(x.minDate){
                                var c;
                                if(x.minDate.val){
                                    c = x.minDate.val().toDate();
                                }else if(x.minDate.toDate){
                                    c = x.minDate.toDate();
                                }else{
                                    c = x.minDate;
                                }
                                if(c && c.getFullYear){
                                    if(c.getFullYear()>u.getFullYear()){
                                        u.setFullYear(c.getFullYear());
                                    }
                                    if(c.getMonth()>u.getMonth()){
                                        u.setMonth(c.getMonth());
                                    }
                                    if(c.getDate()>u.getDate()){
                                        u.setDate(c.getDate());
                                    }
                                }
                            }
                        }
                    }
                    A(u);
                    $(".selectBox,.select_warp,.calendar").hide();
                    m.show();m.position({
                        of: n,
                        my: "left top",
                        at: "left bottom",
                        offset:"0 4",
                        collision:"none none"
                    });
                    if(x.tip){
                        if(x.float){
                        }else{
                            w.html($.calendar.detail(u).text);
                            _w.show().position({
                                of: n,
                                my: "left bottom",
                                at: "left top",
                                offset:"0 -4",
                                collision:"none none"
                            });
                        }
                    }
                }
                function Z(){
                    if(m.is(':visible')){
                        m.position({
                            of: n,
                            my: "left top",
                            at: "left bottom",
                            offset:"0 4",
                            collision:"none none"
                        });
                        if(x.tip && !x.float){
                            _w.position({
                                of: n,
                                my: "left bottom",
                                at: "left top",
                                offset:"0 -4",
                                collision:"none none"
                            });
                        }
                        if(x.yearRange && x.yts && x.yts.is(':visible')){
                            var _t = m.find('.year');
                            x.yts.position({
                                of: _t,
                                my: "left bottom",
                                at: "left top",
                                offset:"-1 0",
                                collision:"none none"
                            });
                            x.ybs.position({
                                of: _t,
                                my: "left top",
                                at: "left bottom",
                                offset:"-1 0",
                                collision:"none none"
                            });
                        }
                        if(x.monthRange && x.mbs && x.mbs.is(':visible')){
                            var _t = m.find('.month');
                            x.mbs.position({
                                of: _t,
                                my: "left top",
                                at: "left bottom",
                                offset:"-1 0",
                                collision:"none none"
                            });
                        }
                    }
                }
                n = $(el);
                if(n.data('release')){
                    n.data('release')();
                }
                n.data('release',M);
                K();
            }
            ,counter:0
            ,IE6:window.ActiveXObject&&!window.XMLHttpRequest
            ,IE:!!document.all
        };
        $.fn.calendar = function(options){
            return this.each(function(){
                (new $.calendar.init(this, options));
            });
        };
        $ = _$;
    }
})