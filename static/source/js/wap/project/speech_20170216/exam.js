/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2017-02-17 12:10:30
 * @version 1.0.0
 */
define(function(require, exports, module) {
    var page = 1;
    var j_exam_model = $('#j_exam_model');
    var j_grade_result = $('#j_grade_result');
    var model_max = $('#j_exam_model .test-model').length;
    var j_page_prev = $("#j_prev_btn");
    var j_page_next = $("#j_next_btn");
    var j_submit_btn = $('#j_submit_btn');
    var j_audio = $('#j_audio');
    var exam_grade3_ans = [
        {'id': '1', 'ans': 'C', 'score': 5},
        {'id': '2', 'ans': 'C', 'score': 5},
        {'id': '3', 'ans': 'D', 'score': 5},
        {'id': '4', 'ans': 'C', 'score': 5},
        {'id': '5', 'ans': 'D', 'score': 5},
        {'id': '6', 'ans': 'B', 'score': 5},

        {'id': '7', 'ans': 'B', 'score': 5},
        {'id': '8', 'ans': 'C', 'score': 5},
        {'id': '9', 'ans': 'A', 'score': 5},
        {'id': '10', 'ans': 'B', 'score': 5},
        {'id': '11', 'ans': 'A', 'score': 5},

        {'id': '16', 'ans': 'A', 'score': 5},  
        {'id': '17', 'ans': 'B', 'score': 5},  
        {'id': '18', 'ans': 'C', 'score': 5},  

        {'id': '15', 'ans': 'C', 'score': 5},
        {'id': '12', 'ans': 'B', 'score': 5},  
        {'id': '13', 'ans': 'A', 'score': 5},  
        {'id': '14', 'ans': 'A', 'score': 5},  
       
        {'id': '19', 'ans': 'A', 'score': 5},
        {'id': '20', 'ans': 'C', 'score': 5}
    ];

    var exam_grade6_ans = [
        {'id': '1', 'ans': 'C', 'score': 5},
        {'id': '2', 'ans': 'B', 'score': 5},
        {'id': '3', 'ans': 'C', 'score': 5},
        {'id': '4', 'ans': 'B', 'score': 5},
        {'id': '5', 'ans': 'A', 'score': 5},

        {'id': '6', 'ans': 'B', 'score': 5},
        {'id': '7', 'ans': 'B', 'score': 5},
        {'id': '8', 'ans': 'A', 'score': 5},
        {'id': '9', 'ans': 'C', 'score': 5},
        {'id': '10', 'ans': 'A', 'score': 5},

        {'id': '11', 'ans': 'A', 'score': 5},
        {'id': '12', 'ans': 'B', 'score': 5},
        {'id': '13', 'ans': 'A', 'score': 5},
        {'id': '14', 'ans': 'C', 'score': 5},
        {'id': '15', 'ans': 'A', 'score': 5},

        {'id': '16', 'ans': 'D', 'score': 5},
        {'id': '17', 'ans': 'A', 'score': 5},
        {'id': '18', 'ans': 'A', 'score': 5},
        {'id': '19', 'ans': 'C', 'score': 5},
        {'id': '20', 'ans': 'B', 'score': 5}
    ];

    //计算分数
    function buildScore(examGrade){
        var totalScore = 0;
        var grade = "";
        var useranswer=[];
        for(var i = 0; i < examGrade.length; i++) {
            if($('li[data-ans].active').eq(i).attr('data-ans') == examGrade[i].ans) {
                totalScore += examGrade[i].score;
            }
            useranswer.push($('li[data-ans].active').eq(i).attr('data-ans'));
        }

        grade = buildGrade(totalScore);

        $.ajax({
            url: '/ajax/englishSpeechResult',
            type: 'POST',
            data: {
                score: totalScore,
                test_content: useranswer.join(','),
                grade: grade
            },
            dataType: 'json',
            success: function(rs) {
                console.log("rs===="+rs);
                if (rs.status == 0) {
                    alert(rs.info);
                } else {
                    location.href = rs.data;
                }
            }
        });
    }

    //获取等级
    function buildGrade(score){
        var grade = "";
        if(score > 0 && score < 60) {
            grade = "C";
        } else if(score >= 60 && score < 80){
            grade = "B";
        } else if(score >= 80 && score <= 100) {
            grade = "A";
        } else {
            grade = "B";
        }
        return grade;
    }

    //上一页事件绑定
    $("#j_pager").on('click', '#j_prev_btn', function() {
        if($(this).hasClass('disabled')) {
            
        } else {
            stopAudio();
            j_page_next.removeClass('disabled');
            page--;
            pageChange();
        }
        
    });

    /* 下一页 */
    $("#j_pager").on('click', '#j_next_btn', function() {
        if($(this).hasClass('disabled')) {
            
        } else {
            stopAudio();
            j_page_prev.removeClass('disabled');
            var chooseItem = $(".test-model").eq(page-1).find(".active").length;
            if(chooseItem == 0) {
                alert("请选择答案!!");
            } else {
                page++;
                pageChange();
            }
        }  
    });

    /* 完成答题 */
    $("#j_pager").on('click', '#j_submit_btn', function() {
        stopAudio();
        var chooseItem = $(".test-model").eq(page-1).find(".active").length;
        if(chooseItem == 0) {
            alert("请选择答案!!");
        } else {
            //console.log("=====显示分数");
           if( $("#j_gradePage").val()==1 ){
              buildScore(exam_grade3_ans);
           }
           if( $("#j_gradePage").val()==2 ){
               buildScore(exam_grade6_ans);
           }
        }
    });

    //页面翻页
    function pageChange(){
        if(page == 1) {
            j_page_prev.addClass('disabled');
        }

        if(page == model_max) {
            j_page_next.addClass('disabled hide');
            j_submit_btn.removeClass('hide');
        } else {
            j_page_next.removeClass('disabled hide');
            j_submit_btn.addClass('hide');
        }
        j_exam_model.find('.test-model').addClass("hide");
        j_exam_model.find('.test-model').eq(page-1).removeClass("hide");
    }

    //停止播放
    function stopAudio(){
        if($('#j_audio').attr('src') != '') {
            $('#j_audio')[0].pause();
            $('#j_audio')[0].currentTime = 0;
            $(".exam-text .player").removeClass('pause');
        }
    }

    // 播放声音
    $(".exam-text").on('click', '.player', function() {
        var j_audio_btn = $(this);
        var audioSrc = j_audio_btn.attr('data-src');
        if(j_audio.attr('src') != audioSrc) {
            j_audio.attr('src', audioSrc);
        }
        
        if($(this).hasClass('pause')) {
            $('#j_audio')[0].pause();
            j_audio_btn.removeClass('pause');
        } else {
            $('#j_audio')[0].play();
            j_audio_btn.addClass('pause');
        }

        $('#j_audio').on("ended", function() {
            j_audio_btn.removeClass('pause');
        });
    });

    //选项点击
    $(".images-list").on('click', 'li', function() {
        $(this).parent('.images-list').find('li').removeClass('active');
        $(this).addClass('active');
    });

    $(".text-list").on('click', 'li', function() {
        $(this).parent('.text-list').find('li').removeClass('active');
        $(this).addClass('active');
    });
     //低版本浏览器有提示
    (function($){
        if ($.browser.msie  && parseInt($.browser.version, 10) < 10) {
            alert("您当前的浏览器版本过低，为保障信息完整展示，建议立即升级浏览器!");
        } 
    })(jQuery);
   
});