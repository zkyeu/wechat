define("dalasiYouhua",[],function(t,e,n){function r(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}function o(){var t=r("type"),e=r("time"),n="",o="";e.indexOf("~")>-1?(n=e.split("~")[0],o=e.split("~")[1]):(n=e,o=e),console.log(n,o),a.request("get","/WorkCorrect/workCorrectStatFromCount",{beginTime:n,endTime:o,typeList:t},function(t){for(var n="",r=0;r<t.length;r++){var o=t[r].name,a=t[r].correct_num,u=t[r].group_num;n+="<tr>",n+="<td>"+e+"</td>",n+="<td>"+o+"</td>",n+="<td>"+a+"</td>",n+="<td>"+u+"</td>",n+="</tr>"}$("#dalasiYouhua").html(n)})}var a={request:function(t,e,n,r,o){$.ajax({url:e,type:t,data:n,dataType:"JSON",success:function(t){r(t)},error:o})}};o()});