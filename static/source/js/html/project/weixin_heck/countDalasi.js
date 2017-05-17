/**
 * Created by liliang on 2017/02/24.
 */
define("countDalasi",[],function(require,exports,module){

// ;(function () {
//         $.ajax({
//             url : '/WorkCorrect/jobStats',
//             type :'GET',
//             dataType :'json',
//             success : function (data) {
//                 if(data.status != 10000) return;
//                 var html,elm;
//                 elm = $('.manage');
//                 html += '<td>1</td>';
//                 html += '<td>'+ data.message.modNum +'</td>';
//                 html += '<td>'+ data.message.imgNum +'</td>';
//                 elm.append(html);
//             }
//         })
//     })();
//     var elmSel = document.getElementsByClassName("chart-btn");
    var elmSel = $(".chart-btn div");
    elmSel.on("click",function () {
        $(this).addClass("cut-sel").siblings().removeClass("cut-sel")
    });
});