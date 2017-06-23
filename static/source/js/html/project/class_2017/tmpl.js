;(function(root, factory) {  if (typeof module === 'object' && module.exports) module.exports = factory();  else if (typeof define === 'function') define(factory);  else root = factory();}(typeof window === 'object' ? window : this, function() {  return {"bx_blind_double": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="box">\r\n    <div class="box-main">\r\n        <div class="f-cb wordchoose">\r\n            <ul>\r\n                <li id="j_prop" class="item word-pic animated fadeIn">\r\n                    <img class="pic" src="' +
((__t = ( domain + data.prop.img)) == null ? '' : __t) +
'"/>\r\n                    <span id="j_audio_1" class="audio-btn" media-audio="' +
((__t = ( domain + data.prop.record)) == null ? '' : __t) +
'"></span>\r\n                    <div class="bom">\r\n                        <p class="word-txt">\r\n                            ' +
((__t = ( propTitle)) == null ? '' : __t) +
'\r\n                        </p>\r\n                    </div>\r\n                </li>\r\n\r\n                <li id="j_target" class="item word-pic animated fadeIn hide" data-cix="' +
((__t = ( data.cix)) == null ? '' : __t) +
'">\r\n                    <img class="pic" src="' +
((__t = ( domain + data.target.img)) == null ? '' : __t) +
'"/>\r\n                    <span id="j_audio_2" class="audio-btn" media-audio="' +
((__t = ( domain + data.target.record)) == null ? '' : __t) +
'"></span>\r\n                    <div class="bom">\r\n                        <p class="word-txt">\r\n                            ' +
((__t = ( targetTitle)) == null ? '' : __t) +
'\r\n                        </p>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a id="j_page_prev" href="javascript:;" class="btn prev-btn"></a>\r\n        <a id="j_page_guess" href="javascript:;" class="btn guessed-btn disabled"></a>\r\n    </div>\r\n</div>\r\n\r\n<!-- 秘籍 -->\r\n';
if (tipCheats != 1) {;
__p += '\r\n    ';
if (tipCheats == '2') {;
__p += '\r\n    <div id="j_tip_cheats" class="bx-tip-cheats" data-url="http://16171e944862.ih5.cn/idea/TZXe2hJ">\r\n        <a href="javascript:void(0);" class="close"></a>\r\n    </div>\r\n    ';
}else{;
__p += '\r\n    <div id="j_tip_cheats" class="animated swing bx-tip-cheats" data-url="http://16171e944862.ih5.cn/idea/TZXe2hJ">\r\n        <a href="javascript:void(0);" class="close"></a>\r\n    </div>\r\n    ';
};
__p += '\r\n';
};
__p += '\r\n\r\n';

}
return __p
},
"bx_blind_listen": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="j_blind" class="box">\r\n    <div class="box-main">\r\n        <div class="f-cb n-blind">\r\n            <div id="j_monster" class="monster-pic" media-audio="' +
((__t = ( domain + data.record)) == null ? '' : __t) +
'">\r\n            \t<img class="pic-s" src="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/monster/' +
((__t = (data.monster)) == null ? '' : __t) +
'-monster_big.png" />\r\n            \t<i id="j_talk_gif" class="talk-gif hide"></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a id="j_page_prev" href="javascript:;" class="btn prev-btn"></a>\r\n        <a id="j_page_next" href="javascript:;" class="btn next-btn disabled"></a>\r\n    </div>\r\n</div>\r\n\r\n<!-- 升级 -->\r\n<div id="j_tip_upgrade" class="bx-tip bx-tip-upgrade animated zoomIn hide" media-audio="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/challenge.mp3"></div>';

}
return __p
},
"bx_blind_single": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="box">\r\n    <div class="box-main">\r\n        <div class="f-cb wordchoose choose-one">\r\n            <ul>\r\n                <li id="j_target" class="item word-pic" data-cix="' +
((__t = ( data.cix)) == null ? '' : __t) +
'">\r\n                    <img class="pic" src="' +
((__t = ( domain + data.target.img)) == null ? '' : __t) +
'"/>\r\n                    <span id="j_audio_1" class="audio-btn" media-audio="' +
((__t = ( domain + data.target.record)) == null ? '' : __t) +
'"></span>\r\n                    <div class="bom">\r\n                        <p class="word-txt">\r\n                            ' +
((__t = ( word)) == null ? '' : __t) +
'\r\n                        </p>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a id="j_page_prev" href="javascript:;" class="btn prev-btn"></a>\r\n        <a id="j_page_guess" href="javascript:;" class="btn guessed-btn disabled"></a>\r\n    </div>\r\n</div>';

}
return __p
},
"bx_cover": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="box">\r\n    <div class="box-main">\r\n        <div class="f-cb n-cover">\r\n            <p class="tc tt">\r\n                Where is the zoo？\r\n            </p>\r\n            <div id="j_monster_pic" class="monster-pic animated bounce infinite"></div>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
},
"bx_fight": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="box">\r\n    <div class="box-main">\r\n        <div class="f-cb n-fight">\r\n            <div class="tc c-step">\r\n                <img src="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/step2.png" />\r\n            </div>\r\n            <div class="tc c-pic">\r\n                <img src="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/c4.png" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a id="j_page_prev" href="javascript:;" class="btn prev-btn"></a>\r\n        <a id="j_page_next" href="javascript:;" class="btn next-btn disabled"></a>\r\n    </div>\r\n</div>\r\n\r\n<!-- 入场声音播放器 -->\r\n<div id="j_audio_link" class="hide" media-audio="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/link.mp3"></div>';

}
return __p
},
"bx_guess": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="box">\r\n    <div class="box-main">\r\n        <div class="f-cb animated zoomIn n-fight">\r\n            <div class="tc c-step">\r\n                <img src="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/step1.png" />\r\n            </div>\r\n            <div class="tc c-pic">\r\n                <img src="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/c5.png" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a id="j_page_prev" href="javascript:;" class="btn prev-btn disabled"></a>\r\n        <a id="j_page_next" href="javascript:;" class="btn next-btn"></a>\r\n    </div>\r\n</div>\r\n\r\n<!-- 入场声音播放器 -->\r\n<div id="j_audio_link" class="hide" media-audio="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/link.mp3"></div>\r\n';

}
return __p
},
"bx_listenread": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="box">\r\n    <div class="box-main">\r\n        <div class="f-cb word-speak">\r\n            <div class="word-pic">\r\n                <img class="pic" src="' +
((__t = ( domain + data.target.img)) == null ? '' : __t) +
'" />\r\n                <span class="audio-btn" media-audio="' +
((__t = ( domain + data.target.record)) == null ? '' : __t) +
'"></span>\r\n                <div class="bom">\r\n                    <p class="word-txt">\r\n                        ' +
((__t = ( targetTitle)) == null ? '' : __t) +
'\r\n                    </p>\r\n                </div>\r\n            </div>\r\n            <div class="practice">\r\n                <h3 class="word">' +
((__t = ( data.title)) == null ? '' : __t) +
'</h3>\r\n                ';
 if(data.detail != null && data.detail.show == 'on') {;
__p += '\r\n                <div class="translation tc">\r\n                    <i class="ic_translation"></i>\r\n                    <span class="text">' +
((__t = (data.detail.detail)) == null ? '' : __t) +
'</span>\r\n                </div>\r\n                ';
};
__p += '\r\n                <div class="funcs">\r\n                    <div class="f-item">\r\n                        <a href="javascript:;" media-audio="' +
((__t = ( domain + data.record)) == null ? '' : __t) +
'" class="f-btn btn-listen"></a>\r\n                    </div>\r\n                    <div class="f-item">\r\n                        <a href="javascript:;" class="f-btn btn-record"></a>\r\n                        <div class="score-result"></div>\r\n                        <!--<span class="s-tip f18 t_score">100</span>-->\r\n                        <span class="s-tip-default"></span>\r\n                        <div class="d-tip hide">\r\n                            得分与你的能力不符，快检查一下你的麦克风和网络哦！\r\n                        </div>\r\n                    </div>\r\n                    <div class="f-item">\r\n                        <a href="javascript:;" class="f-btn btn-play disabled"></a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a id="j_page_prev" href="javascript:;" class="btn prev-btn"></a>\r\n        <a id="j_page_next" href="javascript:;" class="btn next-btn"></a>\r\n    </div>\r\n</div>\r\n\r\n<!-- 成功 -->\r\n<div class="bx-tip animated zoomIn bx-tip-zan hide"></div>\r\n<div class="bx-tip animated zoomIn bx-tip-tzan hide"></div>\r\n<div class="bx-tip bx-tip-wrong hide"></div>';

}
return __p
},
"bx_pin": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="box" unselectable="on" id="j_pin" >\r\n    <div class="box-main">\r\n        <div class="f-cb puzzle" unselectable="on">\r\n            <!--\r\n            <div id="j_pic_list" class="pic-box hide">\r\n            -->\r\n            <div id="j_pic_list" class="pic-box" unselectable="on">\r\n                <ul class="list leftList"  unselectable="on">\r\n                    ';
 for (var i=0; i<data.option.length; i++) {;
__p += '\r\n                    <li unselectable="on" class="pic">\r\n                        <div class="dragTarget move" data-color="' +
((__t = (data.option[i].order)) == null ? '' : __t) +
'" style="background:url(' +
((__t = ( domain + data.option[i].img)) == null ? '' : __t) +
');background-size: 94px 288px;" draggable="true"></div>\r\n                    </li>\r\n                    ';
};
__p += '\r\n                </ul>\r\n            </div>\r\n\r\n            <!--\r\n            <div id="j_result_box" class="result-box r-success">\r\n            -->\r\n            <div unselectable="on" draggable="false" id="j_result_box" class="result-box" media-yes="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/goodjob.mp3" media-no="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/no.mp3" data-flag="0">\r\n                <ul class="list" draggable="false" unselectable="on">\r\n                    <li unselectable="on" draggable="false" class="pic" data-color="1"></li>\r\n                    <li unselectable="on" draggable="false" class="pic" data-color="2"></li>\r\n                    <li unselectable="on" draggable="false" class="pic" data-color="3"></li>\r\n                </ul>\r\n                <div class="jigsaw hide">\r\n                    <img src="' +
((__t = ( domain + data.jigsaw)) == null ? '' : __t) +
'" />\r\n                </div>\r\n                <p class="ft16 word-txt hide">' +
((__t = (targetTitle)) == null ? '' : __t) +
'</p>\r\n                <span id="j_audio_word" class="audio-btn" media-audio="' +
((__t = ( domain + data.target.record)) == null ? '' : __t) +
'"></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div unselectable="on" class="pagenation" draggable="false">\r\n    <span id="j_page_prev" unselectable="on" class="btn prev-btn"></span><span id="j_page_next" unselectable="on" class="btn next-btn"></span>\r\n    </div>\r\n</div>\r\n\r\n<!-- 成功 -->\r\n<div id="j_tip_zan" unselectable="on" class="bx-tip bx-tip-zan animated zoomIn hide"></div>\r\n<div id="j_tip_wrong" unselectable="on" class="bx-tip bx-tip-wrong animated zoomIn hide"></div>\r\n<!-- 拖动提示 -->\r\n<div id="j_tip_drag" unselectable="on" class="bx-tip bx-tip-drag animated slideOutRight hide"></div>';

}
return __p
},
"bx_result": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="box n-game-box">\r\n    <div class="box-main">\r\n        <div class="zoomIn animated tc n-game-result">\r\n            <div class="cup">\r\n                <img id="result-audio" media-audio="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/end.mp3" class="pic" src="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/j1.png" />\r\n            </div>\r\n            <div class="analysis">\r\n                <p class="text">完成！你是最棒的！爱你  ε٩(๑> ₃ <)۶з </p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a href="javascript:;" id="studySetence" class="btn preview-btn" style="display:none;"></a>\r\n        <a href="javascript:;" begin="' +
((__t = (data.begin)) == null ? '' : __t) +
'" id="reStudy" class="btn again-btn"></a>\r\n    </div>\r\n</div>';

}
return __p
},
"bx_select_chinese": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="box">\r\n    <div class="box-main">\r\n        <div class="choose-ans">\r\n            <!--<a href="#" class="audio-btn"></a>-->\r\n            <div id="j_word" class="word">\r\n                <span class="letter hide">' +
((__t = (data.title)) == null ? '' : __t) +
'</span>\r\n            </div>\r\n            <div id="j_monster" class="monster-pic" media-audio="' +
((__t = ( domain + data.record)) == null ? '' : __t) +
'" media-blow="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/blow.mp3">\r\n                <img class="animated bounce pic-s" src="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/monster/' +
((__t = (data.monster)) == null ? '' : __t) +
'-monster_big.png"/>\r\n                <i class="talk-gif hide"></i>\r\n            </div>\r\n\r\n            <div class="tc options">\r\n                <ul>\r\n                    ';
 for (var i=0; i<data.option.length; i++) {;
__p += '\r\n                        ';
if(data.option[i].correct==1){;
__p += '\r\n                        <li class="item" data-correct="1" media-audio="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/goodjob.mp3">\r\n                        ';
} else {;
__p += '\r\n                        <li class="item" data-correct="0" media-audio="' +
((__t = ( staticPath)) == null ? '' : __t) +
'/images/html/class_2017/audio/no.mp3">\r\n                        ';
};
__p += '\r\n                            ';
if(i==0){;
__p += '\r\n                            <i class="s">A</i>\r\n                            ';
};
__p += '  \r\n                            \r\n                            ';
if(i==1){;
__p += '\r\n                            <i class="s">B</i>\r\n                            ';
};
__p += '\r\n\r\n                            ';
if(i==2){;
__p += '\r\n                            <i class="s">C</i>\r\n                            ';
};
__p += '\r\n                            <span class="tt">' +
((__t = (data.option[i].title)) == null ? '' : __t) +
'</span>\r\n                        </li>\r\n                    ';
};
__p += '\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="pagenation">\r\n        <a id="j_page_prev" href="javascript:;" class="btn prev-btn"></a>\r\n        <a id="j_page_next" href="javascript:;" class="btn next-btn disabled"></a>\r\n    </div>\r\n</div>\r\n\r\n<!-- 成功 -->\r\n<div id="j_tip_zan" class="bx-tip bx-tip-zan animated zoomIn hide"></div>\r\n<div id="j_tip_wrong" class="bx-tip bx-tip-wrong animated zoomIn hide"></div>';

}
return __p
},
"diaglogue": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="g-diaglogue">\r\n    <div class="m-tips">\r\n       <h3 >提示: 可以选择完整试听全文后，进行单个句子练习，点击“读”进行发音练习后，系统会自动为你打分！</h3>\r\n    </div>\r\n    <div style="height:450px;overflow: auto;">\r\n      ';
for (var i=0, len=res.length; i<len; i++) {;
__p += '\r\n        <div class="allDiag">\r\n            <div class="m-title">\r\n              ';
if(res.length>1){;
__p += '\r\n                <h2>Part' +
((__t = ((i+1))) == null ? '' : __t) +
'</h2>\r\n              ';
};
__p += '  \r\n                ';
if(res[i].remark){;
__p += '\r\n                <h4>(' +
((__t = (res[i].remark)) == null ? '' : __t) +
')</h4>\r\n                ';
};
__p += '\r\n                <div class="f-cb">\r\n                     <a class="listenAll allPlay" href="javascript:;">完整试听全文</a> <a href="javascript:;" class="checkbox">循环播放</a>\r\n                     ';
if(res[i].zip){;
__p += '\r\n                        <a href="' +
((__t = (res[i].zip)) == null ? '' : __t) +
'" class="download">下载音频</a>\r\n                     ';
};
__p += '\r\n                </div>\r\n            </div>\r\n            <div class="diaglogue">\r\n                <ol class="f-cb">\r\n                    ';
for (j=0; j<res[i].role.length; j++) {;
__p += '\r\n                      <li>\r\n                          <div class="text">\r\n                              <p>\r\n                                 ';
if(res[i].role[j].role && res[i].role[j].user){;
__p += '\r\n                                        <em class="role2" style="color:' +
((__t = (res[i].role[j].color)) == null ? '' : __t) +
'">' +
((__t = (res[i].role[j].user)) == null ? '' : __t) +
':</em>\r\n                                  ';
};
__p += '\r\n                                  <em class="content">' +
((__t = (res[i].role[j].title)) == null ? '' : __t) +
'</em>\r\n                              </p>\r\n                          </div>\r\n                          <div class="operate">\r\n                            <span class="listen" media-audio="' +
((__t = (domain1 + res[i].role[j].record)) == null ? '' : __t) +
'" data-index="100' +
((__t = (i)) == null ? '' : __t) +
'' +
((__t = (j)) == null ? '' : __t) +
'">听<i></i></span>\r\n                            <span class="read" data-title="' +
((__t = (res[i].role[j].title)) == null ? '' : __t) +
'">读<i></i></span>\r\n                            <span class="result"></span>\r\n                          </div>\r\n                        </li>\r\n                      ';
};
__p += '\r\n                </ol>\r\n              </div>\r\n            </div>\r\n    ';
};
__p += '\r\n</div>';

}
return __p
},
"grammar": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="g-grammar">\r\n  ';
for (var i=0; i<res.total; i++) {;
__p += '\r\n      <div class="tab" ' +
((__t = (i!=0?'style=display:none':'')) == null ? '' : __t) +
'>\r\n          <div class="m-title">' +
((__t = (res.syntax[i].title)) == null ? '' : __t) +
'</div>\r\n          <div class="m-exp">\r\n              <ol>\r\n                ';
for (var j=0; j<res.syntax[i].yt.length;j++){;
__p += '\r\n                   <li> ' +
((__t = (res.syntax[i].yt[j] )) == null ? '' : __t) +
'</li>\r\n                 ';
};
__p += '  \r\n              </ol>\r\n          </div>\r\n      </div>\r\n  ';
};
__p += '\r\n    ';
if (res.total>1) {;
__p += '\r\n      <div class="trans-pages">\r\n                <a class="prev dis-prev" href="javascript:;" title="上一个单词">&lt;</a>\r\n                <span class="crt"><span id="cur">1</span>/' +
((__t = (res.total)) == null ? '' : __t) +
'</span>\r\n                <a class="next" href="javascript:;" title="下一个单词">&gt;</a>\r\n      </div>\r\n    ';
};
__p += '\r\n</div>';

}
return __p
},
"init": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<a class="recommand disableDrag" href="/efl/operationFile?classify=2&course_id=' +
((__t = (courseid)) == null ? '' : __t) +
'" target="_blank"></a>\r\n<div class="waiting"></div>\r\n<div class="nav-tab disableDrag">\r\n    <div class="list list-' +
((__t = (count)) == null ? '' : __t) +
' f-cb">\r\n        <ul>\r\n            ';
 for(var i=0;i<data.length;i++){;
__p += '\r\n                ';
 if(i==0){;
__p += '\r\n                  <li class="on" data-tab="' +
((__t = (data[i]['index'])) == null ? '' : __t) +
'" model="' +
((__t = (data[i]['model'])) == null ? '' : __t) +
'">\r\n                    ' +
((__t = (data[i]['key'])) == null ? '' : __t) +
'\r\n                  </li>\r\n                ';
} else {;
__p += '\r\n                  <li data-tab="' +
((__t = (data[i]['index'])) == null ? '' : __t) +
'" model="' +
((__t = (data[i]['model'])) == null ? '' : __t) +
'">\r\n                    ' +
((__t = (data[i]['key'])) == null ? '' : __t) +
'\r\n                  </li>\r\n                ';
};
__p += '\r\n            ';
};
__p += '\r\n        </ul>\r\n    </div>\r\n</div>\r\n<div class="sub-class"></div>\r\n<div class="m-dialog" id="runoff" style="display:none;">\r\n  <div class="in runoff">\r\n    <div class="hd hd2">\r\n      <a class="close"   href="javascript:void(0)" title="关闭"></a>\r\n    </div>\r\n    <div class="bd m-box2 f-cb">\r\n      <div class="f-cb">\r\n        <img src="' +
((__t = (staticPath)) == null ? '' : __t) +
'/images/html/class_2017/girl.png">\r\n        <div class="text-tit" style="width:400px;padding-top:30px;">\r\n          主人，不要放弃我！！<br/>\r\n          请告诉我本次没学完<①必学词汇>的原因，<br/>\r\n          奴婢为您改还不行吗，呜呜... T o T\r\n        </div>\r\n      </div>\r\n      <textarea id="contentText"></textarea>\r\n    </div>\r\n    <div class="f-ft">\r\n       <span class="btn">已详细描述问题，提交</span>\r\n       <span>来自：' +
((__t = (nick_name)) == null ? '' : __t) +
'（' +
((__t = (student_num)) == null ? '' : __t) +
'）</span>\r\n    </div>\r\n  </div>\r\n</div>';

}
return __p
},
"note": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="box">\r\n  <div class="g-note g-note2">\r\n  <div class="m-title">\r\n    <p>单词发声训练：点击“听”试听单词发音，点击“读”进行发音练习后，系统会自动为你打分。</p>\r\n    <a style="margin-left: 100px;" href="http://www.51talk.com/user/sword" target="_blank">查看生词表</a>\r\n  </div>\r\n  <div class="m-translate">\r\n    ';
for (var i=0, len=res.total; i<len; i++) {;
__p += '\r\n      <div class="trans-content" ' +
((__t = ((i!=0 ? 'style=display:none' : ''))) == null ? '' : __t) +
'>\r\n        <div class="trans-group f-cb">\r\n            <div class="title">\r\n                <span class="word">' +
((__t = (res.words[i].title)) == null ? '' : __t) +
'</span>\r\n                <span class="spell">' +
((__t = (res.words[i].content.yinb)) == null ? '' : __t) +
'\r\n                <a class="add" add_content="' +
((__t = (res.words[i].title)) == null ? '' : __t) +
'" is_words="' +
((__t = (res.words[i].is_words)) == null ? '' : __t) +
'" add_preid="' +
((__t = (res.words[i].id)) == null ? '' : __t) +
'" add_courseid="' +
((__t = (res.words[i].course_id)) == null ? '' : __t) +
'" href="javascript:void(0)" title="添加该单词到生词本" style="background-position: ' +
((__t = (res.words[i].is_words != 0?'-116px -74px':'0 -74px')) == null ? '' : __t) +
'">\r\n                </a>\r\n            </div>\r\n            <div class="comment">\r\n              <p>释义:' +
((__t = (res.words[i].content.explain)) == null ? '' : __t) +
'</p>\r\n              <p>' +
((__t = (res.words[i].content.yinj || '')) == null ? '' : __t) +
'</p>\r\n            </div>\r\n            <div class="oper oper2" style="padding-left:0; width:700px;">\r\n              <span class="listen" title="听" media-audio="' +
((__t = (domain1 + res.words[i].record)) == null ? '' : __t) +
'"  data-index="200' +
((__t = (i)) == null ? '' : __t) +
'">听<i></i>\r\n              </span>\r\n              ';
if(i==0){;
__p += '\r\n                <span class="read" id="hideTip" title="读" data-title="' +
((__t = (res.words[i].title)) == null ? '' : __t) +
'">读<i></i></span>\r\n              ';
}else{;
__p += '\r\n                  <span class="read"  title="读" data-title="' +
((__t = (res.words[i].title)) == null ? '' : __t) +
'">读<i></i></span>\r\n              ';
};
__p += '  \r\n              <span class="result"></span>\r\n                ';
if(i==0){;
__p += '\r\n                  <div class="m-tips" >\r\n                      听到“叮”声后开始朗读\r\n                      <a class="u-btn active" id="iknow" href="javascript:void(0)">我知道啦</a>\r\n                      <i class="arrow"></i>\r\n                      <i class="arrow2"></i>\r\n                  </div>\r\n                ';
};
__p += '  \r\n            </div>\r\n            <div style="clear:both;"></div>\r\n      </div>\r\n      <div class="samples f-cb" style="border-top:#dbdee0 solid 1px;">\r\n              <div class="exp">例句：</div>\r\n              <ol>\r\n                ';
for (var j=0; j<1; j++) {;
__p += '\r\n                   <li>\r\n                     <div class="sent">\r\n                        <div class="comment">\r\n                          <p>' +
((__t = (res.words[i].e_sentence1.replace(/\[/g,'<span style="color:#e10c0c">').replace(/\]/g,'</span>'))) == null ? '' : __t) +
'</p>\r\n                          <p style="color:#999;">' +
((__t = (res.words[i].c_sentence1.replace(/\[/g,'<span style="color:#e10c0c">').replace(/\]/g,'</span>'))) == null ? '' : __t) +
'</p>\r\n                        </div>\r\n                        <div class="oper oper2 oper3">\r\n                          <span class="listen" title="听" media-audio="' +
((__t = (domain1 + res.words[i].sentence1_url)) == null ? '' : __t) +
'" data-index="200' +
((__t = (i)) == null ? '' : __t) +
'' +
((__t = (Math.random())) == null ? '' : __t) +
'">听<i></i></span>\r\n                          <span class="read" title="读" data-title="' +
((__t = (res.words[i].e_sentence1)) == null ? '' : __t) +
'">读<i></i></span>\r\n                          <span class="result"></span>\r\n                        </div>\r\n                      </div>\r\n                      ';
if(res.words[i].sentence1_imgurl){;
__p += '\r\n                      <div class="word-img">\r\n                          <img width="127" height="92"  src="' +
((__t = (domain +'efl_image/prepar/'+ res.words[i].sentence1_imgurl)) == null ? '' : __t) +
'">\r\n                      </div>\r\n                      ';
};
__p += '\r\n                    </li>\r\n                    ';
if(res.words[i].e_sentence2 && !res.words[i].e_sentence3){;
__p += '\r\n                        <li>\r\n                           <div class="sent">\r\n                              <div class="comment">\r\n                                <p>' +
((__t = (res.words[i].e_sentence2)) == null ? '' : __t) +
'</p>\r\n                                <p style="color:#999;">' +
((__t = (res.words[i].c_sentence2)) == null ? '' : __t) +
'</p>\r\n                              </div>\r\n                              <div class="oper oper2 oper3">\r\n                                <span class="listen" title="听" media-audio="' +
((__t = (domain1 + res.words[i].sentence2_url)) == null ? '' : __t) +
'" data-index="200' +
((__t = (i)) == null ? '' : __t) +
'' +
((__t = (j)) == null ? '' : __t) +
'">听<i></i></span>\r\n                                <span class="read" title="读" data-title="' +
((__t = (res.words[i].e_sentence2)) == null ? '' : __t) +
'">读<i></i></span>\r\n                                <span class="result"></span>\r\n                              </div>\r\n                            </div>\r\n                            ';
if(res.words[i].sentence2_imgurl){;
__p += '\r\n                            <div class="word-img">\r\n                              <img width="127" height="92"  src="' +
((__t = (domain +'efl_image/prepar/'+ res.words[i].sentence2_imgurl)) == null ? '' : __t) +
'">\r\n                              </div>\r\n                            ';
};
__p += '  \r\n                      </li>\r\n                    ';
};
__p += '  \r\n                ';
};
__p += '\r\n              </ol>\r\n       </div>\r\n      ';
if(res.words[i].e_sentence3){;
__p += '\r\n         <div class="samples f-cb">\r\n              \r\n              <ol>\r\n                 <li>\r\n                   <div class="sent">\r\n                      <div class="comment">\r\n                        <p>——' +
((__t = (res.words[i].e_sentence2)) == null ? '' : __t) +
'</p>\r\n                        <p style="color:#999;' +
((__t = (!res.words[i].c_sentence2.match(/^——/g)?'text-indent:34px;':'')) == null ? '' : __t) +
'">' +
((__t = (res.words[i].c_sentence2)) == null ? '' : __t) +
'</p>\r\n                      </div>\r\n                      <div class="oper oper2 oper3">\r\n                        <span class="listen" title="听" media-audio="' +
((__t = (domain1 + res.words[i].sentence2_url)) == null ? '' : __t) +
'" data-index="200' +
((__t = (i)) == null ? '' : __t) +
'' +
((__t = (Math.random())) == null ? '' : __t) +
'">听<i></i></span>\r\n                        <span class="read" title="读" data-title="' +
((__t = (res.words[i].e_sentence2)) == null ? '' : __t) +
'">读<i></i></span>\r\n                        <span class="result"></span>\r\n                      </div>\r\n                    </div>\r\n                  </li>\r\n                  <li>\r\n                   <div class="sent">\r\n                      <div class="comment">\r\n                        <p>——' +
((__t = (res.words[i].e_sentence3)) == null ? '' : __t) +
'</p>\r\n                        <p style="color:#999;' +
((__t = (!res.words[i].c_sentence2.match(/^——/g)?'text-indent:34px;':'')) == null ? '' : __t) +
'">' +
((__t = (res.words[i].c_sentence3)) == null ? '' : __t) +
'</p>\r\n                      </div>\r\n                      <div class="oper oper2 oper3">\r\n                        <span class="listen" title="听" media-audio="' +
((__t = (domain1 + res.words[i].sentence3_url)) == null ? '' : __t) +
'" data-index="200' +
((__t = (i)) == null ? '' : __t) +
'' +
((__t = (Math.random())) == null ? '' : __t) +
'">听<i></i></span>\r\n                        <span class="read" title="读" data-title="' +
((__t = (res.words[i].e_sentence2)) == null ? '' : __t) +
'">读<i></i></span>\r\n                        <span class="result"></span>\r\n                      </div>\r\n                    </div>\r\n                    ';
if(res.words[i].sentence3_imgurl){;
__p += '\r\n                    <div class="word-img">\r\n                        <img width="127" height="92"  src="' +
((__t = (domain +'efl_image/prepar/'+ res.words[i].sentence3_imgurl)) == null ? '' : __t) +
'">\r\n                    </div>\r\n                    ';
};
__p += '\r\n                  </li>\r\n              </ol>\r\n         </div>\r\n      ';
};
__p += '   \r\n      </div>\r\n    ';
};
__p += '\r\n    ';
if (res.total<=1) {;
__p += '\r\n    </div>\r\n    ';
}else{;
__p += '\r\n        <div class="trans-pages">\r\n          <a class="prev dis-prev" href="javascript:;" title="上一个单词">&lt;</a>\r\n          <span class="crt"><span id="cur">1</span>/' +
((__t = (res.total)) == null ? '' : __t) +
'</span>\r\n          <a class="next" href="javascript:;" title="下一个单词">&gt;</a>\r\n        </div>\r\n      </div>\r\n    ';
};
__p += '     \r\n</div>';

}
return __p
},
"poster_list": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

for(var i=0;i<noticelist.length;i++){;
__p += '\r\n    <div class="m-dialog greay-dialog"  style="display: block;">\r\n      <div class="in poster">\r\n        <div class="hd hd2">\r\n          <a class="close" data-nid="' +
((__t = (noticelist[i].id)) == null ? '' : __t) +
'" href="javascript:void(0)" title="关闭"></a>\r\n        </div>\r\n\r\n        ';
if(noticelist[i].url){;
__p += '\r\n          <a class="linka" href="' +
((__t = (noticelist[i].url)) == null ? '' : __t) +
'" target="_blank"><img src="' +
((__t = (domain+noticelist[i].imgurl)) == null ? '' : __t) +
'"></a>\r\n        ';
}else{;
__p += '\r\n          <img src="' +
((__t = (domain+noticelist[i].imgurl)) == null ? '' : __t) +
'">\r\n        ';
};
__p += '\r\n      </div>\r\n    </div> \r\n';
};


}
return __p
},
"setence": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="box">\r\n    <div class="g-diaglogue g-diaglogue2">\r\n    <div class="m-tips">\r\n       <h3 >提示: 可以选择完整试听全文后，进行单个句子练习，点击“读”进行发音练习后，系统会自动为你打分！</h3>\r\n    </div>\r\n    <div style="height:450px;overflow: auto;">\r\n        <div class="allDiag">\r\n       \r\n            <div class="diaglogue">\r\n                <ol class="f-cb">\r\n                    ';
for (j=0; j<res.sentence.length; j++) {;
__p += '\r\n                          ';
if(!res.sentence[j]['e_sentence1']){;
__p += '\r\n                              <li >\r\n                                    <div class="f-cb">\r\n                                      <div class="text">\r\n                                          <p>\r\n                                              ' +
((__t = (j+1)) == null ? '' : __t) +
'.<em class="content">' +
((__t = (res.sentence[j].title)) == null ? '' : __t) +
'</em>\r\n                                          </p>\r\n                                      </div>\r\n                                      <div class="operate">\r\n                                        <span class="listen" media-audio="' +
((__t = (domain1 + res.sentence[j].url)) == null ? '' : __t) +
'" data-index="100' +
((__t = (j)) == null ? '' : __t) +
'">听<i></i></span>\r\n                                        <span class="read" data-title="' +
((__t = (res.sentence[j].title)) == null ? '' : __t) +
'">读<i></i></span>\r\n                                        <span class="result"></span>\r\n                                      </div>\r\n                                    </div>\r\n                                    ';
if(res.sentence[j].explain){;
__p += '\r\n                                        <div style="padding-left:17px;text-indent:14px;line-height:28px;color:#999999;width:428px;">' +
((__t = (res.sentence[j].explain)) == null ? '' : __t) +
'</div>\r\n                                    ';
};
__p += '\r\n                              </li>\r\n                            ';
}else{;
__p += '\r\n                                <li >\r\n                                    <div class="f-cb">\r\n                                      <div class="text">\r\n                                          <p>\r\n                                              ' +
((__t = (j+1)) == null ? '' : __t) +
'.—— <em class="content">' +
((__t = (res.sentence[j].title)) == null ? '' : __t) +
'</em>\r\n                                          </p>\r\n                                      </div>\r\n                                      <div class="operate">\r\n                                        <span class="listen" media-audio="' +
((__t = (domain1 + res.sentence[j].url)) == null ? '' : __t) +
'" data-index="100' +
((__t = (j)) == null ? '' : __t) +
'">听<i></i></span>\r\n                                        <span class="read" data-title="' +
((__t = (res.sentence[j].title)) == null ? '' : __t) +
'">读<i></i></span>\r\n                                        <span class="result"></span>\r\n                                      </div>\r\n                                    </div>\r\n                                    ';
if(res.sentence[j].explain){;
__p += '\r\n                                        <div class="cn-des">' +
((__t = (res.sentence[j].explain)) == null ? '' : __t) +
'</div>\r\n                                    ';
};
__p += '\r\n                                </li>\r\n                                <li >\r\n                                    <div class="f-cb" >\r\n                                      <div class="text">\r\n                                          <p style="padding-left:13px; text-indent:16px;">\r\n                                             ——<em class="content">' +
((__t = (res.sentence[j]['e_sentence1'])) == null ? '' : __t) +
'</em>\r\n                                          </p>\r\n                                      </div>\r\n                                      <div class="operate">\r\n                                        <span class="listen" media-audio="' +
((__t = (domain1 + res.sentence[j]['sentence1_url'])) == null ? '' : __t) +
'" data-index="100' +
((__t = (j+'w1')) == null ? '' : __t) +
'">听<i></i></span>\r\n                                        <span class="read" data-title="' +
((__t = (res.sentence[j]['e_sentence1'])) == null ? '' : __t) +
'">读<i></i></span>\r\n                                        <span class="result"></span>\r\n                                      </div>\r\n                                    </div>\r\n                                    ';
if(res.sentence[j]['c_sentence1']){;
__p += '\r\n                                        <div class="cn-des">' +
((__t = (res.sentence[j]['c_sentence1'])) == null ? '' : __t) +
'</div>\r\n                                    ';
};
__p += '\r\n                                </li>\r\n                            ';
};
__p += '                          \r\n                    ';
};
__p += '\r\n                </ol>\r\n              </div>\r\n            </div>\r\n\r\n</div>\r\n</div>';

}
return __p
},
"singleVideo": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="box">\r\n\t<div class="video">\r\n\t\t<video width=950 controls="controls" autoplay="autoplay"   preload  src="http://static.51talk.com/upload/efl_video/prepar/' +
((__t = (data["video"])) == null ? '' : __t) +
'"></video>\r\n\t</div>\r\n\t\r\n</div>';

}
return __p
},
"soundPic": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3 class="pic-h3 f-cb">\r\n<span class="t2">听声选图</span>\r\n<span class="t1">实现听力秒懂</span>\r\n</h3>\r\n<div style="clear:both"></div>\r\n        <div class="bom-wr">\r\n          <div class="sound-pic" id="classOff">\r\n            <a href="javascript:;" class="icon" media-audio="' +
((__t = (domain + data.record)) == null ? '' : __t) +
'" data-index="9"></a>\r\n            <ul>\r\n              <li  data-status="' +
((__t = ((data.option[0].correct || 0))) == null ? '' : __t) +
'">\r\n                <a href="javascript:;" class="linkClass">\r\n                  <div class="' +
((__t = (data.option[0].correct?'wordhover':'')) == null ? '' : __t) +
'" >\r\n                  <img src="' +
((__t = (domain +'pre_img_thumb/' + data.option[0].img)) == null ? '' : __t) +
'" data-img="' +
((__t = (domain + data.option[0].img)) == null ? '' : __t) +
'" alt="" class="abaImg">\r\n                </div>\r\n                  <i class="check"></i>\r\n                  <span class="correct"></span>\r\n                </a>\r\n              </li>\r\n              <li  data-status="' +
((__t = ((data.option[1].correct || 0))) == null ? '' : __t) +
'">\r\n                <a href="javascript:;" class="linkClass">\r\n                  <div  class="' +
((__t = (data.option[1].correct?'wordhover':'')) == null ? '' : __t) +
'">\r\n                  <img src="' +
((__t = (domain +'pre_img_thumb/' + data.option[1].img)) == null ? '' : __t) +
'" data-img="' +
((__t = (domain + data.option[1].img)) == null ? '' : __t) +
'" alt="" class="abaImg">\r\n                </div>\r\n                  <i class="check"></i>\r\n                  <span class="correct"></span>\r\n                </a>\r\n              </li>\r\n              <li data-status="' +
((__t = ((data.option[2].correct || 0))) == null ? '' : __t) +
'">\r\n                <a href="javascript:;" class="linkClass">\r\n                 <div class="' +
((__t = (data.option[2].correct?'wordhover':'')) == null ? '' : __t) +
'" > \r\n                  <img src="' +
((__t = (domain +'pre_img_thumb/' + data.option[2].img)) == null ? '' : __t) +
'" data-img="' +
((__t = (domain + data.option[2].img )) == null ? '' : __t) +
'" alt="" class="abaImg">\r\n                </div>\r\n                  <i class="check"></i>\r\n                  <span class="correct"></span>\r\n                </a>\r\n              </li>\r\n              <li   data-status="' +
((__t = ((data.option[3].correct || 0))) == null ? '' : __t) +
'">\r\n                <a href="javascript:;" class="linkClass">\r\n                  <div  class="' +
((__t = (data.option[3].correct?'wordhover':'')) == null ? '' : __t) +
'">\r\n                    <img src="' +
((__t = (domain +'pre_img_thumb/' + data.option[3].img)) == null ? '' : __t) +
'" data-img="' +
((__t = (domain + data.option[3].img)) == null ? '' : __t) +
'" alt="" class="abaImg">\r\n                  </div>\r\n                  <i class="check"></i>\r\n                  <span class="correct"></span>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>';

}
return __p
}}}));