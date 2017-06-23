//HEAD 
window["html2js"] = {};

window["html2js"]["html/weixin_heck/helpChat_body.html2js.html"] = "<div class=\"clear-fix heck_center\" v-cloak>\n" +
    "    <div class=\"labels_wrap\" v-show=\"labelsWrap.show\" :class=\"{'vis': labelsWrap.showvis}\" style=\"display: none;\" :style=\"labelsWrap.pos\">\n" +
    "        <ul>\n" +
    "            <li v-for=\"x in labelsWrap.data\" :class=\"{'is-sys' : x.status == 1}\">{{ x.tag_name }}</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"user_list\">\n" +
    "        <span class=\"wx_mask\" v-if=\"setGroupChat.flag || helperSel.flag\"></span>\n" +
    "        <div class=\"user_head\">\n" +
    "            <div class=\"user_head_in clearfix\">\n" +
    "                <img :src=\"wxData.localInfo.img\" @click=\"showPersonalMask\"/>\n" +
    "                <p>{{ wxData.localInfo.admin_name }}</p>\n" +
    "                <a href=\"/CircleFriend/circleFriendList\" target=\"_blank\" class=\"friend_cecal\"\n" +
    "                   v-if=\"wxData.localInfo.is_trust != 1\" @click=\"sendCircleFriend\">\n" +
    "                    <i class=\"wx_counts more\" v-if=\"wxData.comment > 999\"></i><i class=\"wx_counts num\" v-if=\"(wxData.comment > 0) && (wxData.comment <= 999)\">{{ wxData.comment }}</i>\n" +
    "                </a>\n" +
    "                <div class=\"user_op\" tabindex=\"-1\" @blur=\"userOpHide\">\n" +
    "                    <span @click=\"userOpShow\">\n" +
    "                        <i></i>\n" +
    "                        <i></i>\n" +
    "                        <i></i>\n" +
    "                        <em class=\"wx_counts more\" v-if=\"newFriCount > 999\"></em><em class=\"wx_counts num\" v-if=\"(newFriCount > 0) && (newFriCount <= 999)\">{{ newFriCount }}</em>\n" +
    "                    </span>\n" +
    "                    <ul class=\"user_op_pop\" v-show=\"userOp.show\" transition=\"trans1\">\n" +
    "\n" +
    "                        <li @click=\"openHelperSel\">黑鸟小助手</li>\n" +
    "                        <!-- <li @click=\"blackUseTips('show')\">注意事项</li>\n" +
    "                        <li @click=\"myStudy\">我的学员</li>\n" +
    "                        <li @click=\"addFriend({type:'0'})\">添加好友</li>\n" +
    "                        <li @click=\"getMyFriend\">新的好友<i class=\"wx_counts more\" v-if=\"newFriCount > 999\"></i><i class=\"wx_counts num\" v-if=\"(newFriCount > 0) && (newFriCount <= 999)\">{{ newFriCount }}</i></li>\n" +
    "                        <li @click=\"getChat('getGroupChat', '0')\">群发个人</li>\n" +
    "                        <li @click=\"getChat('getGroupChat', '1')\">群发给群</li>\n" +
    "                        <li @click=\"getChat('getChat')\">发起群聊</li>\n" +
    "                        <li @click=\"updateInfo\">个人信息</li>\n" +
    "                        <li @click=\"logoutTrust\">托管</li>\n" +
    "                        <li @click=\"userLogoutTrustByWX\">退出</li> -->\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "<!---->\n" +
    "            <div class=\"lable-search\">\n" +
    "                <!-- 分类 -->\n" +
    "                <!-- <user-types :local-info=\"wxData.localInfo\"></user-types> -->\n" +
    "                <!-- 搜索 -->\n" +
    "                <user-search :sel-list=\"userListByType.slice()\" :sel-data=\"wxData.msgList\" :local-info=\"wxData.localInfo\"></user-search>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"user_progress\" v-show=\"userProgress.isFirst\">\n" +
    "            <div class=\"user_progress_in\">\n" +
    "                <div class=\"sk-circle\">\n" +
    "                    <div class=\"sk-circle1 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle2 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle3 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle4 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle5 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle6 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle7 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle8 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle9 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle10 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle11 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle12 sk-child\"></div>\n" +
    "                </div>\n" +
    "                列表加载中，请稍后...\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"user_lists\" style=\"display: none;\" @scroll=\"scrollShow($event, userListByType.length)\" v-else>\n" +
    "            <dl v-for=\"x in userListByType.slice(0, showLength.userListByType.start)\" track-by=\"$index\"\n" +
    "                :class=\"{'cur':x == wxData.curUserId, 'top' :  wxData.topList.indexOf(x) > -1, 'isHelper' : x == 'helper' }\"\n" +
    "                @click=\"changeUser(x);\">\n" +
    "                <dt>\n" +
    "                    <!-- 头像 -->\n" +
    "                    <img :src=\"wxData.localInfo.groupheader\"/>\n" +
    "                    <!-- 消息数 -->\n" +
    "                    <span class=\"wx_counts more\" v-if=\"wxData.msgList[x].noRead > 999\"></span>\n" +
    "                    <span class=\"wx_counts num\"\n" +
    "                          v-if=\"(wxData.msgList[x].noRead > 0) && (wxData.msgList[x].noRead <= 999)\">{{ wxData.msgList[x].noRead }}</span>\n" +
    "                    <!-- 消息数 -->\n" +
    "                </dt>\n" +
    "                <dd class=\"user_list_detail\">\n" +
    "                    <h6>{{ wxData.msgList[x].userInfo.c_remark || wxData.msgList[x].userInfo.nick }}</h6>\n" +
    "                    <p>\n" +
    "                        <span v-if=\"(wxData.msgList[x].at_fg >= 1 && wxData.msgList[x].atshow && wxData.msgList[x].lastMsg)\">[有人@我<i\n" +
    "                                    v-if=\"(wxData.msgList[x].at_fg == 2)\">们</i>]</span>{{{ wxData.msgList[x].lastMsg }}}\n" +
    "                    </p>\n" +
    "                </dd>\n" +
    "                <!-- 新标签 -->\n" +
    "                <!-- <template v-if=\"!wxData.msgList[x].isGroup\">\n" +
    "                    <dd class=\"user_list_label\" @mouseenter=\"showLabelTab($event, getLabel(x))\" @mouseleave=\"hideLabelTab()\">\n" +
    "                        <ul v-if=\"getLabel(x).length != 0\">\n" +
    "                            <li v-for=\"label in getLabel(x)\" :class=\"{'is-sys' : label.status == 1}\">\n" +
    "                                {{ label.tag_short }}\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </dd>\n" +
    "                    <dd class=\"user_list_label_s\" @click.stop=\"showLabelEdit($event, x);\" :class=\"{isOpen : x == showLabelEditor}\"></dd>\n" +
    "                </template> -->\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"content_box\" :class=\"{'content_box_group':setGroupChat.flag , 'content_box_helper' : helperSel.flag}\">\n" +
    "        <helper-sel v-ref:helper></helper-sel>\n" +
    "        <user-sel :sel-labels=\"labels\" :sel-data=\"wxData.msgList\" :local-info=\"wxData.localInfo\"></user-sel>\n" +
    "        <div class=\"content_box_none\" v-show=\"!wxData.curUserId\">\n" +
    "            <span>未选择聊天</span><i></i>\n" +
    "        </div>\n" +
    "        <div class=\"content_inner\" v-else>\n" +
    "            <div class=\"content_text\">\n" +
    "                <!-- 昵称 -->\n" +
    "                <div class=\"content_title\">\n" +
    "                    <p class=\"content_tit\">\n" +
    "                        <!-- 备注 || 昵称 -->\n" +
    "                        <i>{{ wxData.msgList[wxData.curUserId].userInfo.c_remark ||\n" +
    "                            wxData.msgList[wxData.curUserId].userInfo.nick }}<span\n" +
    "                                    v-if=\"wxData.groupUserLists[wxData.curUserId] && wxData.groupUserLists[wxData.curUserId].length > 0\">({{wxData.groupUserLists[wxData.curUserId].length}})</span><em v-if=\"wxData.msgList[wxData.curUserId].isGroup\" @click=\"showGroupLayer\"  :class=\"contentGroupLayer.show ? 'up-arrow' : 'down-arrow'\"></em></i>\n" +
    "\n" +
    "                        <!-- 修改昵称 .isGroup群组  否则个人  v-if=\"wxData.msgList[wxData.curUserId].isGroup\"  -->\n" +
    "                        <!--<em class=\"content_title_edit\" @click=\"editNameShow(wxData.msgList[wxData.curUserId].isGroup, wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick )\"></em>-->\n" +
    "                    </p>\n" +
    "\n" +
    "                    <!--个人备注&删除-->\n" +
    "                    <!-- <div class=\"user-menu\" v-if=\"!wxData.msgList[wxData.curUserId].isGroup\" @click=\"userOptShow\" tabindex=\"-1\" @blur=\"userOptHide\">\n" +
    "                        <div class=\"user-menu-list\" v-show=\"userOpt.show\" transition=\"trans1\">\n" +
    "                            <ul>\n" +
    "                                <li @click=\"editNameShow(wxData.msgList[wxData.curUserId].isGroup, wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick )\">\n" +
    "                                    修改备注\n" +
    "                                </li>\n" +
    "                                <li @click=\"showUserDetail(wxData.msgList[wxData.curUserId].userInfo.id)\">\n" +
    "                                    微信信息\n" +
    "                                </li>\n" +
    "                                <li @click=\"delFriend(wxData.msgList[wxData.curUserId].userInfo.id,wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick)\">\n" +
    "                                    删除联系人\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div> -->\n" +
    "\n" +
    "                    <!--群列表层-->\n" +
    "                    <div class=\"content-group-show-layer\" v-if=\"wxData.msgList[wxData.curUserId].isGroup && contentGroupLayer.show\" transition=\"trans1\" >\n" +
    "                        <ul class=\"content-group-list\">\n" +
    "                            <li @click=\"getChat('add_group_mem')\">\n" +
    "                                <p></p>\n" +
    "                                <p>添加</p>\n" +
    "                            </li>\n" +
    "                            <li @click=\"showGroupDelIcon\">\n" +
    "                                <p></p>\n" +
    "                                <p>删除</p>\n" +
    "                            </li>\n" +
    "                            <template v-if=\"contentGroupLayer.show\">\n" +
    "                                <li v-for=\"x in wxData.groupUserLists[wxData.curUserId]\">\n" +
    "                                    <p @click=\"quickTab($event,x,wxData.groupUserLists[wxData.curUserId])\">\n" +
    "                                        <img :src=\"x.wechat_img\" :title=\"x.wechat_nick\">\n" +
    "                                        <i v-show=\"contentGroupLayer.del\" @click=\"delGroupDetailUser(x)\">&minus;</i>\n" +
    "                                    </p>\n" +
    "                                    <p :title=\"x.wechat_nick\">{{x.wechat_nick}}</p>\n" +
    "                                </li>\n" +
    "                            </template>\n" +
    "                        </ul>\n" +
    "                        <div class=\"group-bottom-btn clearfix\">\n" +
    "                            <span class=\"btn-global default\" @click=\"groupPowerChange\" v-if=\"wxData.showOwnnerBtn\">群主管理权转让</span>\n" +
    "                            <span class=\"btn-global default\" @click=\"showAnnounceLayer\" v-if=\"wxData.showOwnnerBtn\">群公告</span>\n" +
    "                            <span class=\"btn-global greey\" @click=\"editNameShow(wxData.msgList[wxData.curUserId].isGroup, wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick )\" >修改群备注名</span>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                    <!-- 加人 -->\n" +
    "                    <!--<em class=\"content_title_add\" v-if=\"wxData.msgList[wxData.curUserId].isGroup\" @click=\"getChat('addUsers')\"></em>-->\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"content_message\" @mouseup=\"getSelCon\" @scroll=\"scrollFn\">\n" +
    "\n" +
    "                    <!-- 拉取历史记录 -->\n" +
    "                    <div class=\"get_history\">\n" +
    "                        <div v-show=\"!wxData.msgList[wxData.curUserId].historyMsg.isGetAll\">\n" +
    "                            <a href=\"javascript:void(0);\" @click=\"getHistoryFn\"\n" +
    "                               v-show=\"!historyMsg.isLoading\">查看历史纪录</a>\n" +
    "                            <span v-else>加载中...</span>\n" +
    "                        </div>\n" +
    "                        <p v-else>已拉取全部历史纪录</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- 消息 -->\n" +
    "                    <dl v-for=\"x in wxData.msgList[wxData.curUserId].userMsg\"\n" +
    "                        :class=\"x.isCC ? 'mes_right' : 'mes_left'\">\n" +
    "                        <!--系统-->\n" +
    "                        <template v-if=\"x.cnt_type == 400\">\n" +
    "                            <dt class=\"mes_tips clearfix\" :title=\"x.content\">\n" +
    "                                <span class=\"del-friend\"></span>\n" +
    "                                <p class=\"addfriend clearfix\">\n" +
    "                                    【{{ x.name }}】开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。\n" +
    "                                    <span @click=\"addDelFriend\">申请好友></span>\n" +
    "                                </p>\n" +
    "                            </dt>\n" +
    "                        </template>\n" +
    "                        <template v-if=\"x.cnt_type == 4000\">\n" +
    "                            <dt class=\"mes_tips clearfix\" :title=\"x.content\">\n" +
    "                                <span class=\"follow\"></span>\n" +
    "                            <p class=\"follow clearfix\">{{ 'Follow提醒内容：' + x.content }}</p>\n" +
    "                            </dt>\n" +
    "                        </template>\n" +
    "                        <template v-if=\"x.cnt_type == 5000 || x.cnt_type == 10000\">\n" +
    "                            <dt class=\"mes_tips clearfix\" :title=\"x.content\">\n" +
    "                                <span></span>\n" +
    "                                <p class=\"follow greey clearfix \">{{ x.content }}</p>\n" +
    "                            </dt>\n" +
    "                        </template>\n" +
    "                        <!--常规-->\n" +
    "                        <template v-else>\n" +
    "                            <dt @click=\"quickTab($event,x,wxData.msgList[wxData.curUserId].isGroup)\"\n" +
    "                                :class=\"x.cnt_type == 400 || x.cnt_type == 4000 || x.cnt_type == 5000 ? 'dn' : ''\">\n" +
    "                                <img :src=\"x.isCC ? wxData.localInfo.img : wxData.localInfo.groupheader\"/>\n" +
    "                            </dt>\n" +
    "                            <dd @mouseenter=\"mesBackShowFn(x.isCC && $index + 1 == wxData.msgList[wxData.curUserId].userMsg.length, 1)\" @mouseleave=\"mesBackShowFn(x.isCC && $index + 1 == wxData.msgList[wxData.curUserId].userMsg.length, 0)\">\n" +
    "                                <h6 :class=\"x.cnt_type == 400 || x.cnt_type == 4000 || x.cnt_type == 5000 ? 'dn' : ''\">{{ (x.c_remark ||\n" +
    "                                    x.name) ? (x.c_remark || x.name) : x.isCC ?\n" +
    "                                    wxData.localInfo.admin_name : (wxData.msgList[wxData.curUserId].userInfo.c_remark ||\n" +
    "                                    wxData.msgList[wxData.curUserId].userInfo.nick) }} <span>{{ x.time }}</span></h6>\n" +
    "                                <!-- 撤回 -->\n" +
    "                                <span class=\"mes_back\" v-if=\"x.isCC && $index + 1 == wxData.msgList[wxData.curUserId].userMsg.length && mesBackShow\">\n" +
    "                                    <em @click=\"mesBack\">撤回</em>\n" +
    "                                </span>\n" +
    "                                <!-- 消息内容 -->\n" +
    "                                <!-- 文本消息 -->\n" +
    "                                <pre v-if=\"x.cnt_type == 0\" class=\"mes_con\">{{{ x.content }}}</pre>\n" +
    "                                <!--@人消息-->\n" +
    "                                <pre v-if=\"x.cnt_type == 3100\" class=\"mes_con\">{{{ x.content.content }}}</pre>\n" +
    "                                <!-- 图片消息 -->\n" +
    "                                <p v-if=\"x.cnt_type == 1\" class=\"mes_con mes_img\">\n" +
    "                                    <a rel=\"gallery\" :href=\"x.content.split(',')[1] || x.content\">\n" +
    "                                        <img :src=\"x.content.split(',')[0] || x.content\" class=\"weichat_img\"/>\n" +
    "                                    </a>\n" +
    "                                </p>\n" +
    "                                <!-- 图片上传消息 -->\n" +
    "                                <p v-if=\"x.cnt_type == 9999\" class=\"mes_con mes_img weichat_img_up\">\n" +
    "                                    <!-- 真实url -->\n" +
    "                                    <a rel=\"gallery\" :href=\"x.content[1]\">\n" +
    "                                        <!-- base64 -->\n" +
    "                                        <img :src=\"x.content[0]\" class=\"weichat_img\"/>\n" +
    "                                    </a>\n" +
    "                                </p>\n" +
    "                                <!-- 语音消息 -->\n" +
    "                                <p v-if=\"x.cnt_type == 2\" class=\"mes_con mes_voice\" @click=\"playVoice(x.content)\"\n" +
    "                                   :class=\"{'mes_voice_isplaying':x.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "\n" +
    "                                <!-- 名片消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 42 && typeof x.content == 'object'\" class=\"mes_con mes_card\"\n" +
    "                                     @click=\"addFriend({wxAcc:x.content.wxid,type:'1'})\">\n" +
    "                                    <div class=\"mes_con_t\">\n" +
    "                                        <img :src=\"x.content._smallheadimgurl\" class=\"fl\"/>\n" +
    "                                        <div class=\"mes_con_c fl\">\n" +
    "                                            <h4 :title=\"x.content._nickname\">{{ x.content._nickname }}</h4>\n" +
    "                                            <p :title=\"x.content.alias\">{{ x.content.alias }}</p>\n" +
    "                                        </div>\n" +
    "                                        <em class=\"fl\"></em>\n" +
    "                                    </div>\n" +
    "                                    <p class=\"mes_con_b\">个人名片</p>\n" +
    "                                </div>\n" +
    "                                <!-- 兼容老的名片历史记录 -->\n" +
    "                                <pre class=\"mes_con\" v-if=\"x.cnt_type == 42 && typeof x.content == 'string'\">{{ x.content }}</pre>\n" +
    "\n" +
    "                                <!-- 发文章消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 3000\" class=\"mes_con mes_article\">\n" +
    "                                    <div class=\"mes_con_box\">\n" +
    "                                        <div><img :src=\"x.content.icon\"/></div>\n" +
    "                                        <div>\n" +
    "                                            <h4>{{ x.content.title }}</h4>\n" +
    "                                            <p>{{ x.content.introduction }}</p>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <p><a :href=\"x.content.link\" target=\"_blank\">{{ x.content.link }}</a></p>\n" +
    "                                </div>\n" +
    "                                <!-- 收文章消息 -->\n" +
    "                                <!-- 分享文章消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 495\" class=\"mes_con mes-share-article\">\n" +
    "                                    <i @click=\"shareArticleData(x.content,'article')\">分享到朋友圈</i>\n" +
    "                                    <div class=\"con-box\">\n" +
    "                                        <a :href=\"x.content.urlStr\" target=\"_blank\">\n" +
    "                                            <div>\n" +
    "                                                <h4>{{ x.content.title }}</h4>\n" +
    "                                                <p>{{ x.content.desc }}</p>\n" +
    "                                            </div>\n" +
    "                                            <div>\n" +
    "                                                <img :src=\"x.content.thumbUrl\"/>\n" +
    "                                            </div>\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <!-- 群邀请 -->\n" +
    "                                <div v-if=\"x.cnt_type == 4950\" class=\"mes_con mes-share-article\">\n" +
    "                                    <div class=\"con-box\" @click=\"inviteGroupMem(x.content.localMsgId)\">\n" +
    "                                        <div>\n" +
    "                                            <h4>{{ x.content.title }}</h4>\n" +
    "                                            <p>{{ x.content.desc }}</p>\n" +
    "                                        </div>\n" +
    "                                        <div>\n" +
    "                                            <img :src=\"x.content.thumbUrl\"/>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <!-- 文件消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 6000  && typeof x.content == 'object'\"\n" +
    "                                     class=\"mes_con mes_file\">\n" +
    "                                    <div class=\"mes_con_t\">\n" +
    "                                        <div class=\"mes_con_c fl\">\n" +
    "                                            <a :href=\"x.content.url\" :title=\"x.content.title\"></a>\n" +
    "                                            <p>{{ x.content.title}}</p>\n" +
    "                                        </div>\n" +
    "                                        <em class=\"fr\" :class=\"getFileClass(x.content.url)\"></em>\n" +
    "                                    </div>\n" +
    "                                    <p class=\"mes_con_b\">{{ x.content.size/1024 | _parseInt }}KB</p>\n" +
    "                                </div>\n" +
    "                                <!-- 视频消息 -->\n" +
    "                                <p v-if=\"x.cnt_type == 6001\" class=\"mes_con mes-video\">\n" +
    "                                    <i @click=\"shareArticleData(x.content,'video')\">分享到朋友圈</i>\n" +
    "                                    <video class=\"setVideo\" controls>\n" +
    "                                        <source :src=\"x.content.url\">\n" +
    "                                    </video>\n" +
    "                                    <!--<span>{{'0:09'}}</span>-->\n" +
    "                                    <!--<em @click=\"palyVideo\"></em>-->\n" +
    "                                </p>\n" +
    "                                <!-- 其他消息 -->\n" +
    "                                <pre v-if=\"contentType.types.indexOf((x.cnt_type + '')) == -1\" class=\"mes_con\">{{{ x.content }}}</pre>\n" +
    "                            </dd>\n" +
    "                        </template>\n" +
    "                    </dl>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"content_send\">\n" +
    "                <span class=\"content_message_tip\" @click=\"gotoBottom\"\n" +
    "                      v-if=\"wxData.msgList[wxData.curUserId].noRead != 0\">↓您有{{ wxData.msgList[wxData.curUserId].noRead }}条新消息</span>\n" +
    "                <div class=\"content_tips\" v-show=\"contentTip != ''\" transition=\"contentTip\" @mouseenter=\"contentTipShow\"\n" +
    "                     @mouseleave=\"contentTipHide\">\n" +
    "                    <p>{{ contentTip }}</p>\n" +
    "                    <!--<span @click=\"sendMsgForce\">强制发送</span>-->\n" +
    "                </div>\n" +
    "                <div class=\"send_progress\">\n" +
    "                    <i></i>\n" +
    "                </div>\n" +
    "                <chat-tools v-ref:chatTools></chat-tools>\n" +
    "                <textarea class=\"send_text\" v-model=\"wxData.msgList[wxData.curUserId].msgContent\"\n" +
    "                          @keyDown.enter=\"sendMsg\" @focus=\"clearAtUs\" placeholder=\"请在此输入\"></textarea>\n" +
    "                <!-- helper -->\n" +
    "                <template v-if=\"helperSel.flag\">\n" +
    "                    <div class=\"send_btn send_btn_group\">\n" +
    "                        <input type=\"button\" value=\"取消\" @click=\"closeHelperSel\">\n" +
    "                        <input type=\"button\" class=\"group_send\"\n" +
    "                               :class=\"{'dis' : helperSel.list.length == 0 || wxData.msgList[wxData.curUserId].msgContent == ''}\"\n" +
    "                               value=\"发送\" @click=\"sendMsg\"/>\n" +
    "                        <span>按下Shift+Enter换行</span>\n" +
    "                    </div>\n" +
    "                </template>\n" +
    "                \n" +
    "                <template v-else>\n" +
    "                    <div class=\"send_btn\" v-if=\"!setGroupChat.flag\">\n" +
    "                        <input type=\"button\" value=\"发送\" @click=\"sendMsg\"/>\n" +
    "                        <span>按下Shift+Enter换行</span>\n" +
    "                    </div>\n" +
    "                    <!-- 群发到群 -->\n" +
    "                    <div class=\"send_btn send_btn_group\" v-else>\n" +
    "                        <input type=\"button\" value=\"取消\" @click=\"closeGroupChat\">\n" +
    "                        <input type=\"button\" class=\"group_send\"\n" +
    "                               :class=\"{'dis' : setGroupChat.list.length == 0 || wxData.msgList[wxData.curUserId].msgContent == ''}\"\n" +
    "                               value=\"开始群发({{setGroupChat.list.length}})\" @click=\"sendMsg\"/>\n" +
    "                        <span>按下Shift+Enter换行</span>\n" +
    "                    </div>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"user_message\">\n" +
    "        <span class=\"wx_mask\" v-if=\"setGroupChat.flag || helperSel.flag\"></span>\n" +
    "        <div v-if=\"!!wxData.curUserId\" class=\"user_mes_boxc\" :class=\"{'group-dalasi':wxData.msgList[wxData.curUserId].isGroup}\">\n" +
    "            <!--个人-->\n" +
    "            <template v-if=\"!wxData.msgList[wxData.curUserId].isGroup\">\n" +
    "                <div v-show=\"bindCrm.showBindCon\" class=\"user_mes_box\">\n" +
    "                    <!-- 绑定按钮 -->\n" +
    "                    <!-- <a href=\"javascript:void(0)\" class=\"user_bind\" @click=\"bindUser\" v-show=\"bindCrm.showBindBtn\">绑定用户</a> -->\n" +
    "                    <!-- 头像 -->\n" +
    "                    <img :src=\"wxData.localInfo.groupheader\" class=\"user_head\"/>\n" +
    "                </div>\n" +
    "                <div v-show=\"bindCrm.showBindInfo\" class=\"user_mes_conc\">\n" +
    "                    <!-- 解绑按钮 -->\n" +
    "                    <!--<a href=\"javascript:void(0)\" class=\"user_bind\" @click=\"unbindUser\">解除绑定</a>-->\n" +
    "                    <dl>\n" +
    "                        <dt class=\"user_mes_e\">\n" +
    "                            <div class=\"clearfix user_mes_c\">\n" +
    "                                <a :href=\"wxData.msgList[wxData.curUserId].crmInfo.user_login\" target=\"_blank\"><img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\"/></a>\n" +
    "                                <div class=\"user_mes_t\">\n" +
    "                                    <div class=\"user_mes_pp\">\n" +
    "                                        <span class=\"user_mes_enname\"\n" +
    "                                                  v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.nick_name\"\n" +
    "                                                  @keydown.enter.prevent  contenteditable=\"plaintext-only\"\n" +
    "                                                  @blur=\"enNameEdit($event,wxData.msgList[wxData.curUserId].crmInfo)\">{{ wxData.msgList[wxData.curUserId].crmInfo.nick_name }}</span>\n" +
    "                                        <div class=\"bind-btn-group\">\n" +
    "                                            <select class=\"user_mes_about\"\n" +
    "                                                    v-if=\"wxData.msgList[wxData.curUserId].crmInfo.member\"\n" +
    "                                                    v-model=\"wxData.msgList[wxData.curUserId].crmInfo.selectMember\"\n" +
    "                                                    @change=\"updateSelectMember(wxData.curUserId,wxData.msgList[wxData.curUserId].crmInfo)\">\n" +
    "                                                <option value=\"0\" v-if=\"wxData.msgList[wxData.curUserId].crmInfo.selectMember == 0\">\n" +
    "                                                    请选择\n" +
    "                                                </option>\n" +
    "                                                <option v-for=\"x in wxData.msgList[wxData.curUserId].crmInfo.member\" :value=\"$key\">\n" +
    "                                                    {{x}}\n" +
    "                                                </option>\n" +
    "                                            </select>\n" +
    "                                            <div class=\"user-unbind\" @click=\"unbindUser\">\n" +
    "                                                解除绑定\n" +
    "                                            </div>\n" +
    "                                            <div class=\"bind-menu\">\n" +
    "                                                <div class=\"bind-menu-style\" @click=\"showBindMenuList\" tabindex=\"-1\" @blur=\"hideBindMenuList\"></div>\n" +
    "                                                <div class=\"bind-menu-group\" v-show=\"cutUserMenuList\" transition=\"trans1\">\n" +
    "                                                    <ul>\n" +
    "                                                        <li @click=\"setAutoSend\">设置自动发送</li>\n" +
    "                                                        <li @click=\"recommendUser\">推荐学员</li>\n" +
    "                                                    </ul>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"bind-user-detail\">\n" +
    "                                        <span v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.sex\" class=\"sex\" \n" +
    "                                        :class=\"{'man':wxData.msgList[wxData.curUserId].crmInfo.sex=='man', 'women':wxData.msgList[wxData.curUserId].crmInfo.sex =='woman'}\"></span>\n" +
    "                                        <span v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.age\">{{ wxData.msgList[wxData.curUserId].crmInfo.age }}岁</span>\n" +
    "                                        <span v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.city\">{{ wxData.msgList[wxData.curUserId].crmInfo.city }}</span>\n" +
    "                                        <template v-if=\"wxData.msgList[wxData.curUserId].crmInfo.crmUserType && wxData.msgList[wxData.curUserId].crmInfo.crmUserType.length != 0\">\n" +
    "                                            <span class=\"lable\" v-for=\"x in wxData.msgList[wxData.curUserId].crmInfo.crmUserType\">{{ x }}</span>\n" +
    "                                        </template>\n" +
    "                                        <span class=\"lable\" v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.from_url\">{{ wxData.msgList[wxData.curUserId].crmInfo.from_url }}</span>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </dt>\n" +
    "                        <dd>\n" +
    "                            <div class=\"uer-bind-info\" v-if=\"wxData.msgList[wxData.curUserId].crmInfo.combo\">\n" +
    "                                <table>\n" +
    "                                    <tbody>\n" +
    "                                        <template v-if=\"false\">\n" +
    "                                            <tr>\n" +
    "                                                <td>电话</td>\n" +
    "                                                <td>13211111111</td>\n" +
    "                                                <td><i class=\"tel\"></i></td>\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>购买套餐</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <select class=\"taocan\">\n" +
    "                                                        <option v-for=\"x in 5\" :value=\"$index\">{{ x }}</option>\n" +
    "                                                    </select>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>套餐期限</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <p>2017-01-20 ~ 2017-05-20</p>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>最近上课</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <div>2017-12-10 8:00</div>\n" +
    "                                                    <div :class=\"{'row-one':!showInfo,'row-two':showInfo}\">\n" +
    "                                                        <p>这里显示相关内容这里显示这里显示这里显示相关内容这里显示这里显示这里显示相关内容这里显示这里显示</p>\n" +
    "                                                        <em class=\"down\"></em>\n" +
    "                                                    </div>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>最近上课</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <div>2017-12-10 8:00</div>\n" +
    "                                                    <div class=\"row-two\">\n" +
    "                                                        <p>这里显示相关内容这里显示这里显示这里显示相关内容这里显示这里显示这里显示相关内容这里显示这里显示</p>\n" +
    "                                                        <em class=\"up\"></em>\n" +
    "                                                    </div>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>最近预约</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <div>2017-12-10 8:00</div>\n" +
    "                                                    <div class=\"row-one\">\n" +
    "                                                        <p>这里显示相关内容这里显示这里显示这里显示相关内容这里显示这里显示这里显示相关内容这里显示这里显示</p>\n" +
    "                                                        <i class=\"yuyue\"></i>\n" +
    "                                                        <em class=\"down\"></em>\n" +
    "                                                    </div>\n" +
    "                                                </td>\n" +
    "\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>备注信息</td>\n" +
    "                                                <td>\n" +
    "                                                    <p>1231231231</p>\n" +
    "                                                </td>\n" +
    "                                                <td>\n" +
    "                                                    <i class=\"beizhu\"></i>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                        </template>\n" +
    "                                        <template v-if=\"true\">\n" +
    "                                            <tr>\n" +
    "                                                <td>电话</td>\n" +
    "                                                <td>\n" +
    "                                                    {{ wxData.msgList[wxData.curUserId].crmInfo.mobile || '暂无' }}\n" +
    "                                                        <!--<div class=\"tel-icon\" @click=\"handCall\">-->\n" +
    "                                                        <!--<div class=\"showtel\">-->\n" +
    "                                                        <!--<em><i></i></em>-->\n" +
    "                                                        <!--<ul>-->\n" +
    "                                                        <!--<li>1这里是什么鬼信息啊</li>-->\n" +
    "                                                        <!--<li>2这里是什么鬼信息啊</li>-->\n" +
    "                                                        <!--<li>3这里是什么鬼信息啊</li>-->\n" +
    "                                                        <!--<li>4这里是什么鬼信息啊</li>-->\n" +
    "                                                        <!--</ul>-->\n" +
    "                                                        <!--</div>-->\n" +
    "                                                        <!--</div>-->\n" +
    "                                                </td>\n" +
    "                                                <td>\n" +
    "                                                    <i class=\"tel\" @click=\"handCall\"></i>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <template v-if=\"wxData.msgList[wxData.curUserId].crmInfo.combo && wxData.msgList[wxData.curUserId].crmInfo.combo.length > 0\">\n" +
    "                                                <tr>\n" +
    "                                                    <td>购买套餐</td>\n" +
    "                                                    <td colspan=\"2\">\n" +
    "                                                        <select v-model=\"wxData.msgList[wxData.curUserId].crmInfo.comboSel\" class=\"taocan\">\n" +
    "                                                            <option v-for=\"x in wxData.msgList[wxData.curUserId].crmInfo.combo\" :value=\"$index\">{{ x.name }}\n" +
    "                                                            </option>\n" +
    "                                                        </select>\n" +
    "                                                    </td>\n" +
    "                                                </tr>\n" +
    "                                                <tr>\n" +
    "                                                    <td>套餐期限</td>\n" +
    "                                                    <td colspan=\"2\">\n" +
    "                                                        <p>\n" +
    "                                                            {{ wxData.msgList[wxData.curUserId].crmInfo.combo[wxData.msgList[wxData.curUserId].crmInfo.comboSel].start_time | y_m_d }}\n" +
    "                                                            ~ {{ wxData.msgList[wxData.curUserId].crmInfo.combo[wxData.msgList[wxData.curUserId].crmInfo.comboSel].end_time | y_m_d }}\n" +
    "                                                        </p>\n" +
    "                                                    </td>\n" +
    "                                                </tr>\n" +
    "                                            </template>\n" +
    "                                            <template v-else>\n" +
    "                                                <tr>\n" +
    "                                                    <td>购买套餐</td>\n" +
    "                                                    <td colspan=\"2\">暂无</td>\n" +
    "                                                </tr>\n" +
    "                                                <tr>\n" +
    "                                                    <td>套餐期限</td>\n" +
    "                                                    <td colspan=\"2\">暂无</td>\n" +
    "                                                </tr>\n" +
    "                                            </template>\n" +
    "                                            <tr v-if=\"wxData.msgList[wxData.curUserId].crmInfo.last.start_time\">\n" +
    "                                                <td>最近上课</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <div>{{ wxData.msgList[wxData.curUserId].crmInfo.last.start_time | y_m_d_h_m }}</div>\n" +
    "                                                    <div :class=\"{'row-one':!showInfo.last,'row-two':showInfo.last}\">\n" +
    "                                                        <p :title=\"wxData.msgList[wxData.curUserId].crmInfo.last.course_name_cn + '' +  wxData.msgList[wxData.curUserId].crmInfo.last.unit_name_cn + '' + wxData.msgList[wxData.curUserId].crmInfo.last.lession_name_cn\">\n" +
    "                                                            {{ wxData.msgList[wxData.curUserId].crmInfo.last.course_name_cn + '' +\n" +
    "                                                            wxData.msgList[wxData.curUserId].crmInfo.last.unit_name_cn + '' +\n" +
    "                                                            wxData.msgList[wxData.curUserId].crmInfo.last.lession_name_cn }}\n" +
    "                                                        </p>\n" +
    "                                                        <em :class=\"{'down':!showInfo.last,'up':showInfo.last}\" @click=\"showInfoFn('last')\"></em>\n" +
    "                                                    </div>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <!--<tr v-if=\"wxData.msgList[wxData.curUserId].crmInfo.recent.start_time\">-->\n" +
    "                                            <tr>\n" +
    "                                                <td>最近预约</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <div>{{ wxData.msgList[wxData.curUserId].crmInfo.recent.start_time }}</div>\n" +
    "                                                    <div :class=\"{'row-one':!showInfo.recent,'row-two':showInfo.recent}\">\n" +
    "                                                        <template v-if=\"wxData.msgList[wxData.curUserId].crmInfo.recent.length != 0\">\n" +
    "                                                            <p :title=\"wxData.msgList[wxData.curUserId].crmInfo.recent.course_name_cn + '' + wxData.msgList[wxData.curUserId].crmInfo.recent.unit_name_cn + '' + wxData.msgList[wxData.curUserId].crmInfo.recent.lession_name_cn\">\n" +
    "                                                                {{ wxData.msgList[wxData.curUserId].crmInfo.recent.course_name_cn + '' +\n" +
    "                                                                wxData.msgList[wxData.curUserId].crmInfo.recent.unit_name_cn + '' +\n" +
    "                                                                wxData.msgList[wxData.curUserId].crmInfo.recent.lession_name_cn }}\n" +
    "                                                            </p>\n" +
    "                                                            <i class=\"yuyue\" @click=\"sendClassLink\"></i>\n" +
    "                                                            <em :class=\"{'down':!showInfo.recent,'up':showInfo.recent}\" @click=\"showInfoFn('recent')\"></em>\n" +
    "                                                        </template>\n" +
    "                                                        <template v-else>\n" +
    "                                                            <p>暂无</p>\n" +
    "                                                        </template>\n" +
    "\n" +
    "                                                    </div>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>备注信息</td>\n" +
    "                                                <td>\n" +
    "                                                    <p :title=\"wxData.msgList[wxData.curUserId].crmInfo.remarkInfo.length > 0 ? wxData.msgList[wxData.curUserId].crmInfo.remarkInfo[0].content : ''\">\n" +
    "                                                        {{ wxData.msgList[wxData.curUserId].crmInfo.remarkInfo.length > 0 ? wxData.msgList[wxData.curUserId].crmInfo.remarkInfo[0].content : \"暂无\" }}\n" +
    "                                                    </p></td>\n" +
    "                                                <td>\n" +
    "                                                    <i class=\"beizhu\" @click=\"crmRemarkOpen(wxData.msgList[wxData.curUserId].crmInfo.user_id)\"></i>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                        </template>\n" +
    "                                    </tbody>\n" +
    "                                </table>\n" +
    "                            </div>\n" +
    "                            <div class=\"user_info_link\">\n" +
    "                                <a target=\"_blank\" :href=\"wxData.msgList[wxData.curUserId].crmInfo.user_detail\"\n" +
    "                                   v-show=\"wxData.msgList[wxData.curUserId].crmInfo.user_detail\">查看详情</a>\n" +
    "                                <a href=\"javascript:void(0);\" v-if=\"wxData.msgList[wxData.curUserId].showHW != 999 && wxData.msgList[wxData.curUserId].showHW\" @click=\"homeWorkOneShow(wxData.curUserId)\">作业批改</a>\n" +
    "                            </div>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                </div>\n" +
    "            </template>\n" +
    "\n" +
    "            <!--群-->\n" +
    "            <template v-else>\n" +
    "                <!--达拉斯-->\n" +
    "                <template v-if=\"true\">\n" +
    "                    <div class=\"group-right-top-layer\" v-if=\"bindGroupCtl.groupType.dls\">\n" +
    "                        <div class=\"group-bind-row\">\n" +
    "                            <!--群头像-->\n" +
    "                            <div class=\"group-bind-img\">\n" +
    "                                <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\"/>\n" +
    "                            </div>\n" +
    "                            <div class=\"group-bind-con\">\n" +
    "                                <div class=\"group-bind-con-up\">\n" +
    "                                    <!--群名字-->\n" +
    "                                    <div class=\"group-name\">{{ wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick }}</div>\n" +
    "                                    <div class=\"bind-menu\">\n" +
    "                                        <!--绑定按钮-->\n" +
    "                                        <div class=\"group-bind-btn\" name=\"group-bind-btn\" v-show=\"bindGroupCtl.showBindGroup && bindGroupCtl.userGroup == '7'\" @click=\"bindGroupBtn\">绑定商品</div>\n" +
    "                                        <div class=\"group-bind-btn\" name=\"group-unbind-btn\" v-show=\"bindGroupCtl.canselBindGroup && bindGroupCtl.userGroup == '7'\" @click=\"unbindGroup\">解除绑定</div>\n" +
    "                                        <!--绑定后的菜单-->\n" +
    "                                        <div class=\"bind-menu-style\" name=\"bind-menu-style\" @click=\"groupBindMenu\" v-show=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                            <div class=\"bind-menu-group\" transition=\"trans1\" name=\"bind-menu-group\" v-show=\"bindGroupCtl.menu\">\n" +
    "                                                <ul>\n" +
    "                                                    <li name=\"setAutoSend\">\n" +
    "                                                        <a :href=\"bindGroupCtl.groupDetail.commodityUrl\" target=\"_blank\">商品详情</a>\n" +
    "                                                    </li>\n" +
    "                                                    <li name=\"recommendUser\" class=\"class-detail-layer\">\n" +
    "                                                        班级信息\n" +
    "                                                        <div class=\"class-detail-detail\">\n" +
    "                                                            <table>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>商品ID</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.commodityId}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>商品名称</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.name}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>中教班课</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.courseName}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>次卡套餐</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.comboName}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>上课周期</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.startClassTime}} ~\n" +
    "                                                                        {{bindGroupCtl.groupDetail.endClassTime}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>下次上课</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.newClassTime}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                            </table>\n" +
    "                                                        </div>\n" +
    "                                                    </li>\n" +
    "                                                </ul>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"group-bind-con-down\">\n" +
    "                                    <!--群的二维码-->\n" +
    "                                    <div class=\"show-wechat\" v-if=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                        <div class=\"wechat-img\">\n" +
    "                                            <img :src=\"bindGroupCtl.wechatCode\">\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"group-bind-row-down\">\n" +
    "                            <!--如果绑定了-->\n" +
    "                            <template v-if=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                <a href=\"javascript:;\" @click=\"setHWShow(wxData.curUserId)\">布置作业</a>\n" +
    "                                <a href=\"javascript:;\" @click=\"homeWorkShow(wxData.curUserId)\">作业批改</a>\n" +
    "                                <a href=\"javascript:;\" @click=\"homeWorkShowDetail(wxData.curUserId)\">作业汇总</a>\n" +
    "                            </template>\n" +
    "                            <!--没有绑定-->\n" +
    "                            <template v-if=\"bindGroupCtl.showBindGroup && bindGroupCtl.userGroup == '7'\">\n" +
    "                                绑定后，批改作业相关功能才可以使用\n" +
    "                            </template>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </template>\n" +
    "                <template v-if=\"false\">\n" +
    "                    <div class=\"group_mes_box\" v-if=\"bindGroupCtl.groupType.dls\">\n" +
    "                        <div class=\"group-bind-head clearfix\">\n" +
    "                            <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\"/>\n" +
    "                            <p>{{ wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick }}</p>\n" +
    "                            <span v-show=\"bindGroupCtl.showBindGroup\" @click=\"bindGroupBtn\">绑定商品</span>\n" +
    "                            <span v-show=\"bindGroupCtl.canselBindGroup\" @click=\"unbindGroup\">取消绑定</span>\n" +
    "                        </div>\n" +
    "                        <div class=\"group_mes_con\">\n" +
    "                            <div class=\"group-bind-con\">\n" +
    "                                <div class=\"group-detail\">\n" +
    "                                    <!--没有绑定显示群二维码-->\n" +
    "                                    <div v-show=\"bindGroupCtl.showBindGroup\">\n" +
    "                                        <img class=\"single-img\" :src=\"bindGroupCtl.wechatCode\">\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <!--显示群绑定信息-->\n" +
    "                                    <div v-show=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                        <div class=\"group-btn\">\n" +
    "                                            <a :href=\"bindGroupCtl.groupDetail.commodityUrl\" target=\"_blank\">商品详情</a>\n" +
    "                                            <a href=\"javascript:void(0);\" @click=\"setHWShow(wxData.curUserId)\">布置作业</a>\n" +
    "                                            <a href=\"javascript:void(0);\" @click=\"homeWorkShow(wxData.curUserId)\">作业批改</a>\n" +
    "                                            <a href=\"javascript:void(0);\" @click=\"homeWorkShowDetail(wxData.curUserId)\">作业汇总</a>\n" +
    "                                        </div>\n" +
    "                                        <p><em>商&nbsp;品&nbsp;I&nbsp;D：</em><i>{{bindGroupCtl.groupDetail.commodityId}}</i>\n" +
    "                                        </p>\n" +
    "                                        <p><em>商品名称：</em><i>{{bindGroupCtl.groupDetail.name}}</i></p>\n" +
    "                                        <p><em>中教班课：</em><i>{{bindGroupCtl.groupDetail.courseName}}</i></p>\n" +
    "                                        <p><em>次卡套餐：</em><i>{{bindGroupCtl.groupDetail.comboName}}</i></p>\n" +
    "                                        <p><em>上课周期：</em><i>{{bindGroupCtl.groupDetail.startClassTime}} ~\n" +
    "                                                {{bindGroupCtl.groupDetail.endClassTime}}</i></p>\n" +
    "                                        <p><em>下次上课：</em><i>{{bindGroupCtl.groupDetail.newClassTime}}</i></p>\n" +
    "                                        <h5><img :src=\"bindGroupCtl.wechatCode\"></h5>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </template>\n" +
    "                <!--CST-->\n" +
    "                <div class=\"group_mes_box\" v-if=\"bindGroupCtl.groupType.cst\">\n" +
    "                    <div class=\"group-bind-head clearfix\">\n" +
    "                        <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\"/>\n" +
    "                        <p class=\"cst-title\">{{ wxData.msgList[wxData.curUserId].userInfo.c_remark ||\n" +
    "                            wxData.msgList[wxData.curUserId].userInfo.nick }}</p>\n" +
    "                        <span class=\"cst-bind-btn\" @click=\"setGroupToClass('bind')\" v-show=\"classGroupInfo.bindBtn\">设置为班级群</span>\n" +
    "                        <span class=\"cst-bind-btn\" @click=\"setGroupToClass('unbind')\" v-show=\"!classGroupInfo.bindBtn\">取消设置</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"cst-con\">\n" +
    "                        <template v-if=\"!classGroupInfo.bindBtn\">\n" +
    "                            <div class=\"cst-btn-list\">\n" +
    "                                <span @click=\"setHWShow(wxData.curUserId)\">布置作业</span>\n" +
    "                                <span @click=\"homeWorkShow(wxData.curUserId)\">作业批改</span>\n" +
    "                                <span @click=\"homeWorkShowDetail(wxData.curUserId)\">作业汇总</span>\n" +
    "                            </div>\n" +
    "                        </template>\n" +
    "                        <template v-if=\"classGroupInfo.bindBtn\">\n" +
    "                            绑定后，批改作业相关功能才可以使用\n" +
    "                        </template>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <!--其他-->\n" +
    "\n" +
    "            </template>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- 知识库 -->\n" +
    "        <quick-con :is-show=\"!!wxData.curUserId\" :is-group=\"wxData.curUserId && wxData.msgList[wxData.curUserId].isGroup\" v-ref:quickCon></quick-con>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- 绑定弹层 -->\n" +
    "<div class=\"weixin_bind_bom\" v-if=\"bindCrm.showBindPop\" v-cloak>\n" +
    "    <div class=\"weixin_bind\">\n" +
    "        <span class=\"close\" @click=\"hideBindPop\"><i>x</i></span>\n" +
    "        <h3>绑定用户</h3>\n" +
    "        <i class=\"border\"></i>\n" +
    "        <form action=\"#\" @submit.prevent=\"bindSearch\" autocomplete=\"off\">\n" +
    "            <p class=\"search\">\n" +
    "                <!-- 电话号码或ID号 -->\n" +
    "                <input type=\"text\" class=\"text_bind\" placeholder=\"请输入电话号码或ID号搜索\" v-model=\"bindCrm.searchKey\">\n" +
    "                <input type=\"submit\" class=\"text_bind_sub\"/>\n" +
    "            </p>\n" +
    "            <p class=\"result\">\n" +
    "                <input type=\"text\" placeholder=\"搜索结果\" readonly :value=\"bindCrmSearchResult\"/>\n" +
    "            </p>\n" +
    "            <p class=\"sub_bind\">\n" +
    "                <a href=\"javascript:void(0)\" @click=\"bindCrmFn\">绑定</a>\n" +
    "            </p>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--群组绑定-->\n" +
    "<div class=\"update_mask\" v-if=\"bindGroupCtl.showbindLayer\">\n" +
    "    <div class=\"bind-group-box\">\n" +
    "        <h5>绑定商品</h5>\n" +
    "        <i></i>\n" +
    "        <div class=\"input-in\">\n" +
    "            <label>商品&nbsp;&nbsp;&nbsp;ID</label>\n" +
    "            <input type=\"text\" placeholder=\"请输入商品ID\" v-model=\"bindGroupCtl.searchKey\">\n" +
    "            <span @click=\"bindGroupSearch\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"input-in\">\n" +
    "            <label>商品名称</label>\n" +
    "            <input type=\"text\" placeholder=\"搜索结果\" readonly :value=\"bindGroupSearchResult\">\n" +
    "        </div>\n" +
    "        <div class=\"btn_foot\" style=\"text-align: right\">\n" +
    "            <input type=\"button\" value=\"确定\" class=\"btn_sure\"\n" +
    "                   :class=\"{'btn_disable':this.bindGroupCtl.searchResult.name == ''}\"\n" +
    "                   :disabled=\"this.bindGroupCtl.searchResult.name == ''\" @click=\"bindGroupFn\"/>\n" +
    "            <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click=\"hideBindGroupLayer\"/>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- 选择联系人弹层 -->\n" +
    "<!-- <user-sel :sel-labels=\"labels\" :sel-data=\"wxData.msgList\" :local-info=\"wxData.localInfo\"></user-sel> -->\n" +
    "\n" +
    "<!-- 选择联系人模板 -->\n" +
    "<template id=\"weixin_sel_bom\">\n" +
    "    <div class=\"weixin_sel_bom\" :class=\"{'weixin_sel_getGroupChat':isGetGroupChat }\" v-if=\"selShow\">\n" +
    "        <div class=\"weixin_sel\">\n" +
    "            <h5>{{ selTitle }}</h5>\n" +
    "            <div class=\"sel_con clearfix\" :class=\"{'sel_con_msg':isGetGroup}\">\n" +
    "                <div class=\"sel_con_l\">\n" +
    "                    <div class=\"sel_input\">\n" +
    "                        <select v-model=\"selLabel\">\n" +
    "                            <option value=\"\">全部</option>\n" +
    "                            <template v-for=\"x in localInfo.labelList\">\n" +
    "                                <option :value=\"xx.tag_name\" v-for=\"xx in x\">\n" +
    "                                    {{xx.tag_name}}\n" +
    "                                </option>\n" +
    "                            </template>\n" +
    "                        </select>\n" +
    "                        <input type=\"text\" placeholder=\"搜索\" v-model=\"selFilter\"/>\n" +
    "                    </div>\n" +
    "                    <!-- 全选 -->\n" +
    "                    <div class=\"sel_all\" @click=\"selUserAll\">\n" +
    "                        全选&nbsp;&nbsp;<i :class=\"{'sel_seled':isSelUserAll}\"></i>\n" +
    "                    </div>\n" +
    "                    <!-- 勾选列表 -->\n" +
    "                    <ul class=\"sel_list\">\n" +
    "                        <li v-for=\"x in selLists\" @click=\"selUser(x)\" track-by=\"$index\">\n" +
    "                            <img :src=\"selData[x].isGroup ? localInfo.grouphead : selData[x].userInfo.img\"/>\n" +
    "                            <p>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</p>\n" +
    "                            <i :class=\"{'sel_seled': selSelect.indexOf(x) > -1}\"></i>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"sel_con_r\">\n" +
    "                    <p class=\"sel_tip\">\n" +
    "                        <span v-show=\"selSelect.length == 0\">请勾选需要选择的联系人</span>\n" +
    "                        <span v-else>已选择了{{ selSelect.length }}个联系人</span>\n" +
    "                    </p>\n" +
    "                    <ul class=\"sel_list\">\n" +
    "                        <li v-for=\"x in selSelect\" track-by=\"$index\">\n" +
    "                            <img :src=\"selData[x].isGroup ? localInfo.grouphead : selData[x].userInfo.img\"/>\n" +
    "                            <p>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</p>\n" +
    "                            <i @click=\"selDel(x)\"></i>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <!-- 输入框 -->\n" +
    "                    <div class=\"sel_msg\" v-if=\"isGetGroup\">\n" +
    "                        <textarea v-model=\"inputMsg\" placeholder=\"请在此输入\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"sel_foot clearfix\">\n" +
    "                <!-- 操作 -->\n" +
    "                <div v-if=\"!isPending.flag\">\n" +
    "                    <span class=\"sel_cancel\" @click=\"selCancel\">取消</span>\n" +
    "                    <!-- 群发 -->\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':selSelect.length == 0 || inputMsgVal == ''}\"\n" +
    "                          @click=\"selSure\" v-if=\"isGetGroup\">\n" +
    "                        开始群发\n" +
    "                        <em v-show=\"selSelect.length != 0\">({{ selSelect.length }})</em>\n" +
    "                    </span>\n" +
    "                    <!-- 其他 -->\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':selSelect.length == 0}\" @click=\"selSure\" v-else>\n" +
    "                        确定\n" +
    "                        <em v-show=\"selSelect.length != 0\">({{ selSelect.length }})</em>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <!-- 操作等待 -->\n" +
    "                <div v-else>\n" +
    "                    <span class=\"sel_sure sel_nosure\" v-if=\"!isPending.isSure\">{{ isPending.text }}</span>\n" +
    "                    <span v-else class=\"sel_sure sel_isSure\">{{ isPending.sureText }}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "\n" +
    "<!-- 编辑名字弹层 -->\n" +
    "<edit-name></edit-name>\n" +
    "<!-- 编辑名字弹层模板 -->\n" +
    "<template id=\"weixin_edit\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"editShow\">\n" +
    "        <div class=\"weixin_edit ani-pops\">\n" +
    "            <h5>修改{{ isGroup ? '群名称' : '备注' }}</h5>\n" +
    "            <input type=\"text\" v-model=\"editvalue\"/>\n" +
    "            <p v-if=\"!isGroup\">备注名包含学员手机号或CRM账号系统将会自动绑定 </p>\n" +
    "            <div class=\"sel_foot clearfix\">\n" +
    "                <span class=\"sel_cancel\" @click=\"selCancel\">取消</span>\n" +
    "                <span class=\"sel_sure\" :class=\"{'sel_nosure':editValue == ''}\" @click=\"selSure\">确定</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 知识库 -->\n" +
    "<template id=\"quick_con\">\n" +
    "    <div class=\"user_mes_content\" :class=\"{'group-label-con-height':isGroup}\" v-if=\"isShow\">\n" +
    "        <dl class=\"user_mes_con\">\n" +
    "            <dt class=\"clearfix\">\n" +
    "                <div class=\"user_mes_sel\" tabIndex=\"-1\" @blur=\"selHide\">\n" +
    "                    <span @click=\"selShow\">{{ tagSel.selName || '请选择标签' }}</span>\n" +
    "                    <ul v-show=\"tagSel.selShow\">\n" +
    "                        <li v-for=\"x in tagSel.selData\" @click=\"getTag(x)\">{{ x.name }}</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <input type=\"text\" v-model=\"inputData\" debounce=\"500\"/>\n" +
    "                <div class=\"system-label\" v-if=\"!isGroup\">\n" +
    "                    <template v-for=\"y in tagList\">\n" +
    "                        <i :class=\"{'active':y.id == labelId}\"  @click=\"getTag(y)\">{{ y.name }}</i>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "            </dt>\n" +
    "            <dd>\n" +
    "                <p v-show=\"conList.length == 0\">暂无信息</p>\n" +
    "                <ul v-else :class=\"{'isSearch' : isSearch}\">\n" +
    "                    <li v-for=\"x in conList\" @click=\"sendQuickCon(x.content)\">\n" +
    "                        <h4>{{{ x._content || x.content }}}</h4>\n" +
    "                        <p>{{{ x._content || x.content }}}</p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </dd>\n" +
    "        </dl>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 搜索 -->\n" +
    "<template id=\"user_search\">\n" +
    "    <div class=\"user_search\">\n" +
    "        <input type=\"text\" placeholder=\"\" v-model=\"selFilter\" @blur=\"searchHide\"/>\n" +
    "        <div class=\"user_search_result\" v-show=\"showSel\" @mouseenter=\"cannotHide\" @mouseleave=\"canHide\">\n" +
    "            <ul v-show=\"userListFilter.length != 0\">\n" +
    "                <li v-for=\"x in userListFilter\" track-by=\"$index\" @click=\"searchReturn(x)\">\n" +
    "                    <img :src=\"localInfo.groupheader\"/>\n" +
    "                    <h6>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</h6>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <p v-else>找不到匹配的结果</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 分类 -->\n" +
    "<template id=\"user_type\">\n" +
    "    <div class=\"user_type\">\n" +
    "        <ul>\n" +
    "            <li @click=\"setType('')\" :class=\"{cur: listType == ''}\">全部</li>\n" +
    "            <template v-for=\"x in selLabels\">\n" +
    "                <li v-for=\"xx in x\" @click=\"setType(xx)\" :class=\"{cur: listType == xx}\">{{ xx }}</li>\n" +
    "            </template>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<template id=\"user_types\">\n" +
    "    <div class=\"user_type\" tabIndex=\"-1\" @blur=\"hideFn\">\n" +
    "        <h4 @click=\"showFn\">{{ showType }}</h4>\n" +
    "        <div class=\"wx_sel\" v-show=\"show\" style=\"display: none;\" transition=\"trans1\">\n" +
    "            <ul>\n" +
    "                <li @click=\"setType('')\">全部</li>\n" +
    "            </ul>\n" +
    "            <ul>\n" +
    "                <li @click=\"setType('todayFocus')\">今日关注</li>\n" +
    "            </ul>\n" +
    "            <ul v-for=\"x in localInfo.labelList\">\n" +
    "                <li v-for=\"xx in x\" @click=\"setType(xx.tag_name)\">\n" +
    "                    {{ xx.tag_name }}\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--<info-update :local-info=\"wxData.localInfo\" :nick-name=\"wxData.localInfo.nick_name\" :user-group=\"wxData.localInfo.user_group\" :device-id=\"wxData.localInfo.device_id\" :rank-list=\"wxData.localInfo.rank_list\"></info-update>-->\n" +
    "<!-- <info-update :local-info=\"wxData.localInfo\" :nick-name=\"wxData.localInfo.nick_name\" :user-group=\"wxData.localInfo.user_group\" :device-id=\"wxData.localInfo.device_id\" ></info-update> -->\n" +
    "<!-- 补充个人信息 -->\n" +
    "<template id=\"info_update\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"updateShow || initShow\">\n" +
    "        <div class=\"info_update ani-pops\">\n" +
    "            <h4>个人信息</h4>\n" +
    "            <dl>\n" +
    "                <dt>微信英文名</dt>\n" +
    "                <dd>\n" +
    "                    <input type=\"text\" placeholder=\"请输入您在微信里的英文名\" v-model=\"nickName\" />\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>设备编号</dt>\n" +
    "                <dd>\n" +
    "                    <input type=\"text\" placeholder=\"请输入手机设备编号\" v-model=\"deviceId\"/>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>用户类型</dt>\n" +
    "                <dd>\n" +
    "                    <select v-model=\"userGroup\">\n" +
    "                        <option value=\"\">请选择您的用户类型</option>\n" +
    "                        <option v-for=\"x in localInfo.userGroupList\" :value=\"x.id\">{{ x.name }}</option>\n" +
    "                    </select>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <!---->\n" +
    "            <dl v-show=\"false\">\n" +
    "                <dt>上级账号</dt>\n" +
    "                <dd>\n" +
    "                    <!--<input type=\"text\" placeholder=\"请输入上级账号，多个账号请用逗号分隔\" v-model=\"rankList\"/>-->\n" +
    "                    <input type=\"text\" placeholder=\"请输入上级账号，多个账号请用逗号分隔\" />\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>&nbsp;</dt>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate,'sel_int':initShow}\" @click=\"updateInfoFn\">确定</span>\n" +
    "                    <span class=\"sel_cancel\" @click=\"updateHide\" v-if=\"!initShow\" >取消</span>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<add-friend :local-info=\"wxData.localInfo\" v-ref:addFriend></add-friend>\n" +
    "<!-- 增加好友 -->\n" +
    "<template id=\"add_friend\">\n" +
    "    <div class=\"weixin_mask weixin_mask_addFri\" v-if=\"addFriendShow\">\n" +
    "        <div class=\"info_update ani-pops add_friend\">\n" +
    "            <h4>添加好友</h4>\n" +
    "            <!-- 卡片 -->\n" +
    "            <template v-if=\"type == 1\">\n" +
    "                <dl>\n" +
    "                    <dt>添加账号</dt>\n" +
    "                    <dd>\n" +
    "                        <input type=\"text\" placeholder=\"请输入微信账号或手机号\" v-model=\"wxAcc\"/>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <dl>\n" +
    "                    <dt>个人介绍</dt>\n" +
    "                    <dd>\n" +
    "                        <input type=\"text\" placeholder=\"请输入您的个人介绍\" v-model=\"wxDes\"/>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <dl>\n" +
    "                    <dt>&nbsp;</dt>\n" +
    "                    <dd class=\"sel_foot\">\n" +
    "                        <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate}\" @click=\"addFriendFn\">添加</span>\n" +
    "                        <span class=\"sel_cancel\" @click=\"addFriendHide\">取消</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "            </template>\n" +
    "\n" +
    "            <!-- 搜索 -->\n" +
    "            <template v-else>\n" +
    "                <template v-if=\"!toNext\">\n" +
    "                    <dl>\n" +
    "                        <dt>添加账号</dt>\n" +
    "                        <dd>\n" +
    "                            <input type=\"text\" placeholder=\"请输入微信账号或手机号\" v-model=\"wxAcc\"/>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>&nbsp;</dt>\n" +
    "                        <dd class=\"sel_foot\">\n" +
    "                            <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate}\" @click=\"addFriendNext\">下一步</span>\n" +
    "                            <span class=\"sel_cancel\" @click=\"addFriendHide\">取消</span>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                </template>\n" +
    "\n" +
    "                <template v-else>\n" +
    "                    <dl class=\"add_friend_info\">\n" +
    "                        <dt>好友信息</dt>\n" +
    "                        <dd>\n" +
    "                            <div class=\"add_friend_info_in\">\n" +
    "                                <img :src=\"wechat_img\" v-if=\"!!wechat_img\"/>{{ wechat_nick }}\n" +
    "                            </div>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>个人介绍</dt>\n" +
    "                        <dd>\n" +
    "                            <input type=\"text\" placeholder=\"请输入您的个人介绍\" v-model=\"wxDes\"/>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>设置备注</dt>\n" +
    "                        <dd>\n" +
    "                            <input type=\"text\" placeholder=\"对该好友进行备注\" v-model=\"remark\"/>\n" +
    "                            <!--<input type=\"text\" placeholder=\"对该好友进行备注\" v-model=\"wechat_nick\"/>-->\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>&nbsp;</dt>\n" +
    "                        <dd class=\"sel_foot\">\n" +
    "                            <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate}\" @click=\"addFriendFn\">添加</span>\n" +
    "                            <span class=\"sel_cancel\" @click=\"addFriendHide\">取消</span>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                </template>\n" +
    "            </template>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<div class=\"mask-bg-layer  trans1-transition\" v-if=\"addDelFriendInfo.show\">\n" +
    "    <div class=\"add-del-friend\">\n" +
    "        <h5>发送验证</h5>\n" +
    "        <span class=\"title-tip\"></span>\n" +
    "        <div>\n" +
    "            <dt>验证申请</dt>\n" +
    "            <dd>\n" +
    "                <textarea v-model=\"addDelFriendInfo.msg\">你好，我是您在{{ addDelFriendInfo.nameTitle }}，以后我们都用微信进行沟通，麻烦通过一下。</textarea>\n" +
    "                <div class=\"check-btn\">\n" +
    "                    <span class=\"btn confirm\" @click=\"sendAddFriendBtn\">发送</span>\n" +
    "                    <span class=\"btn concel\" @click=\"hideSendfriendBtn\">取消</span>\n" +
    "                </div>\n" +
    "            </dd>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<template id=\"addDelFriend\"></template>\n" +
    "<!-- 聊天工具 -->\n" +
    "<template id=\"chat_tools\">\n" +
    "    <ul class=\"chat_tools clearfix\">\n" +
    "        <send-face></send-face>\n" +
    "        <send-img></send-img>\n" +
    "        <send-article></send-article>\n" +
    "        <send-file></send-file>\n" +
    "        <send-voice v-ref:sendVoice></send-voice>\n" +
    "    </ul>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 发送图片 -->\n" +
    "<template id=\"send_img\">\n" +
    "    <li class=\"send_img\" id=\"send_img\">\n" +
    "        <em id=\"send_img_btn\" title=\"发送图片\"></em>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 发送表情 -->\n" +
    "<template id=\"send_face\">\n" +
    "    <li class=\"send_face\" tabIndex=\"-1\" @blur=\"sendFaceHide\">\n" +
    "        <em @click=\"sendFaceShow\" title=\"表情\"></em>\n" +
    "        <div class=\"face_panel\" v-show=\"show\" transition=\"trans2\">\n" +
    "            <span class=\"face_panel_arr\"></span>\n" +
    "            <ul class=\"face_con\">\n" +
    "                <li v-for=\"x in faceData\" v-show=\"x.type == curType\">\n" +
    "                    <!-- qq表情 -->\n" +
    "                    <div v-if=\"x.type == 0\" class=\"face_qq clearfix\">\n" +
    "                        <span v-for=\"xx in x.data\" :title=\"xx.slice(1,-1)\" class=\"qqface\" :class=\"'qqface'+$index\"\n" +
    "                              @click=\"sendFace(x.type,xx)\"></span>\n" +
    "                    </div>\n" +
    "                    <div v-else>其他表情</div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <ul class=\"face_type\">\n" +
    "                <li v-for=\"x in faceData\" :class=\"{'cur':x.type == curType}\" @click=\"changType(x.type)\">{{ x.des }}</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 发送文章 -->\n" +
    "<template id=\"send_article\">\n" +
    "    <li class=\"send_article\">\n" +
    "        <em id=\"send_article_btn\" @click=\"show\" title=\"发送文章\"></em>\n" +
    "        <div class=\"weixin_mask\" v-if=\"articleListShow\">\n" +
    "            <div class=\"send_article_box ani-pops\">\n" +
    "                <h4><span>文章</span></h4>\n" +
    "                <div class=\"send_article_inner\">\n" +
    "                    <ul class=\"con-change clearfix\">\n" +
    "                        <li :class=\"{'cut-tab': $index+1 == articleCurrentPage }\" v-for=\"x in navlist\" @click=\"getArticle($index+1)\">\n" +
    "                            {{ x }}\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <span class=\"loading\" v-show=\"isLoading\"></span>\n" +
    "                    <ul class=\"con-show\" v-else>\n" +
    "                        <template v-if=\"articleListData.length > 0\">\n" +
    "                            <li v-for=\"x in articleListData\" @click=\"cutAticle($index)\"\n" +
    "                                :class=\"{'select-li': $index == curArticleIndex }\" title=\"{{x.introduction}}\">\n" +
    "                                <div class=\"up_box clearfix\">\n" +
    "                                    <div>\n" +
    "                                        <p>{{x.title}}</p>\n" +
    "                                        <p>{{x.introduction}}</p>\n" +
    "                                    </div>\n" +
    "                                    <div><img :src=\"x.icon\"></div>\n" +
    "                                </div>\n" +
    "                                <div class=\"down_box clearfix\" :class=\"{'sel-bor': $index == curArticleIndex }\">\n" +
    "                                    <a :href=\"x.link\" target=\"_blank\" title=\"{{x.title}}\">{{x.link}}</a>\n" +
    "                                </div>\n" +
    "                            </li>\n" +
    "                        </template>\n" +
    "                        <template v-else>\n" +
    "                            <li class=\"li-none\">此分类下暂无文章</li>\n" +
    "                        </template>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <!--分页-->\n" +
    "                <!--<div class=\"pages clearfix\">-->\n" +
    "                <!--&lt;!&ndash;<em>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;<a href=\"javascript:;\" >上一页</a>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;</em>&ndash;&gt;-->\n" +
    "                <!--<em>-->\n" +
    "                <!--<a v-for=\"x in articlePageCount\" href=\"javascript:;\" :class=\"{'cut': (x + 1) == articleCurrentPage }\" @click=\"getArticle(x+1)\">{{ x + 1 }}</a>-->\n" +
    "                <!--</em>-->\n" +
    "                <!--&lt;!&ndash;<em>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;<a href=\"javascript:;\" >下一页</a>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;</em>&ndash;&gt;-->\n" +
    "                <!--</div>-->\n" +
    "                <div class=\"btn_foot\">\n" +
    "                    <input type=\"button\" value=\"确定\" class=\"btn_sure\"\n" +
    "                           :class=\"{'btn_disable':this.curArticleIndex == null}\"\n" +
    "                           :disabled=\"this.curArticleIndex == null\" @click.stop=\"sendArticle\"/>\n" +
    "                    <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click.stop=\"hide\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<crm-remark></crm-remark>\n" +
    "<!-- crm备注 -->\n" +
    "<template id=\"crm_remark\">\n" +
    "    <div class=\"weixin-mask\" v-if=\"isshow\">\n" +
    "        <div class=\"send_article_box crm_remark ani-pops\">\n" +
    "            <div class=\"close-layer-btn-right\" @click=\"hide\">\n" +
    "                <em></em>\n" +
    "            </div>\n" +
    "            <h4><span>备注内容</span></h4>\n" +
    "            <div class=\"mark-info\">\n" +
    "                <span class=\"add_tip\" v-show=\"showTip\">\n" +
    "                    您提交的信息将在5分钟之后显示\n" +
    "                </span>\n" +
    "                <div class=\"add-info-scroll\">\n" +
    "                    <table>\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>序号</th>\n" +
    "                            <th>备注内容</th>\n" +
    "                            <th>备注时间</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tr v-for=\"x in remarks\">\n" +
    "                            <td>{{ $index + 1 }}</td>\n" +
    "                            <td>{{ x.content }}</td>\n" +
    "                            <td>{{ x.add_time }}</td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <!--<ul>-->\n" +
    "                <!--<li v-for=\"x in remarks\">-->\n" +
    "                <!--<span>{{ $index + 1 }}</span>-->\n" +
    "                <!--<p :title=\"x.content\">{{ x.content }}</p>-->\n" +
    "                <!--</li>-->\n" +
    "                <!--</ul>-->\n" +
    "                <div class=\"add_remark\">\n" +
    "                    <div>\n" +
    "                        <input type=\"text\" v-model=\"inputData\"/>\n" +
    "                        <span :class=\"{'dis': this._inputData == ''}\" @click=\"addRemark\">添加</span>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <span :class=\"{'choose-show': demo}\" @click=\"addRemarkTime\">添加提醒时间：</span>\n" +
    "                        <em><i>{{selYear}}</i>年</em>\n" +
    "                        <select class=\"selMonth\" v-model=\"selMonth\">\n" +
    "                            <option v-for=\"x in 12\">{{x+1}}</option>\n" +
    "                        </select>\n" +
    "                        月\n" +
    "                        <select class=\"selDay\" v-model=\"selDay\">\n" +
    "                            <option v-for=\"x in 31\">{{x+1}}</option>\n" +
    "                        </select>\n" +
    "                        日\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!--<div class=\"btn_foot\">-->\n" +
    "            <!--<input type=\"button\" class=\"btn_cancel\" value=\"关闭\"/>-->\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</template>\n" +
    "\n" +
    "<!--发送文件-->\n" +
    "<template id=\"send_file\">\n" +
    "    <li class=\"send_file\">\n" +
    "        <label title=\"发送文件\">\n" +
    "            <input type=\"file\" id=\"send_file_button\"/>\n" +
    "        </label>\n" +
    "        <p class=\"show-tip\">发送文件需要电脑管理员权限，如果无法发送，请到OA填写IT工单：<a href=\"http://172.16.0.252:8080/WOListView.do\"\n" +
    "                                                               target=\"_blank\">http://172.16.0.252:8080/WOListView.do</a>。<i></i>\n" +
    "        </p>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!--发送语音-->\n" +
    "<template id=\"send_voice\">\n" +
    "    <li class=\"send_voice\">\n" +
    "        <em id=\"send_voice_btn\" @click=\"open\" title=\"发送语音\"></em>\n" +
    "        <div class=\"weixin_mask\" v-if=\"creat\" :class=\"{'voice_open': show}\">\n" +
    "            <!-- 录音flash -->\n" +
    "            <div class=\"recorderAppOuter\" :class=\"{'recorderOpen' : recorderOpen}\">\n" +
    "                <dl class=\"recorderTip\">\n" +
    "                    <dt>录音设置：</dt>\n" +
    "                    <dd>\n" +
    "                        1.点击允许，并勾选记住<br />\n" +
    "                        2.点击关闭按钮<br />\n" +
    "                        3.点击开始录音\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <object type=\"application/x-shockwave-flash\" id=\"recorderApp\" class=\"recorderApp\" name=\"recorderApp\" width=\"0\" height=\"0\" data=\"/recorder/recorder.swf\"></object>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"voice_con\">\n" +
    "                <!-- 录音第一步 -->\n" +
    "                <dl class=\"voice_con_step1\" v-if=\"!isStep2\">\n" +
    "                    <dt>点击按钮开始录音</dt>\n" +
    "                    <dd class=\"btn-area\">\n" +
    "                        <span class=\"btn-s1\" @click=\"start\">开始录音</span>\n" +
    "                        <span class=\"btn-s2\" @click=\"close1\">取消</span>\n" +
    "\n" +
    "                        <span v-if=\"pending\" class=\"btn-pending\">发送中...</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <!-- 录音第二步 -->\n" +
    "                <dl class=\"voice_con_step2\" v-else>\n" +
    "                    <dt v-if=\"!isOver\" class=\"recorder-tip\">\n" +
    "                    <p></p>\n" +
    "                    <span>录音中…{{ time }}秒</span>\n" +
    "                    </dt>\n" +
    "                    <dt v-else>\n" +
    "                        完成录音{{ timeLimit }}秒，已停止录音，是否发送？\n" +
    "                    </dt>\n" +
    "                    <dd class=\"btn-area\">\n" +
    "                        <span class=\"btn-s3\" @click=\"end\">结束并发送</span>\n" +
    "                        <span class=\"btn-s2\" @click=\"close2\">取消</span>\n" +
    "\n" +
    "                        <span v-if=\"pending\" class=\"btn-pending\">发送中...</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 粘贴发图 -->\n" +
    "<send-paste></send-paste>\n" +
    "<template id=\"send_paste\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"sendPasteShow\">\n" +
    "        <div class=\"info_update send_paste\">\n" +
    "            <h4>发送图片</h4>\n" +
    "            <div class=\"send_paste_inner\">\n" +
    "                <img :src=\"imgSrc\" v-if=\"imgSrc\"/>\n" +
    "                <span class=\"loading\" v-else></span>\n" +
    "            </div>\n" +
    "            <div class=\"btn_foot\">\n" +
    "                <input type=\"button\" :value=\"sureDisable ? '发送中...' : '确定'\" class=\"btn_sure\" @click=\"send\"\n" +
    "                       :class=\"{'btn_disable':sureDisable}\" :disabled=\"sureDisable\"/>\n" +
    "                <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click=\"hide\" v-if=\"!sureDisable\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<errors-tip :device-id=\"wxData.localInfo.device_id\"></errors-tip>\n" +
    "<!-- 异常弹层 -->\n" +
    "<template id=\"errors_tip\">\n" +
    "    <div class=\"error-tip\" v-if=\"errorsTipShow\">\n" +
    "        <!-- net error -->\n" +
    "        <template v-if=\"errors.netErr\">\n" +
    "            <div class=\"net-err\">\n" +
    "                <dt>\n" +
    "                    <i></i>\n" +
    "                    检查网络状态\n" +
    "                </dt>\n" +
    "                <dd>\n" +
    "                    请确认您的电脑网络正常后 请点击按钮\n" +
    "                    <span @click=\"reload\">重新连接</span>\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "        <!-- phone error -->\n" +
    "        <template v-else>\n" +
    "            <!--cc-->\n" +
    "            <div class=\"cc-err new-err\" v-show=\"isss||iscc\">\n" +
    "                <!-- <dt>\n" +
    "                    <i></i>\n" +
    "                    你的微信处于掉线状态\n" +
    "                </dt> -->\n" +
    "                <dd>\n" +
    "                    请稍等，黑鸟自动恢复中( <span class=\"red-font\">{{ bTime }}秒</span> )\n" +
    "                    <!-- <span class=\"red-font\">{{ bTime }}秒</span> 后重新 <span class=\"red-font\">刷新浏览器</span> -->\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "            <!--ss-->\n" +
    "            <!-- <div class=\"ss-err\" v-show=\"iscc\">\n" +
    "               <dt>\n" +
    "                   <i></i>\n" +
    "                   你的微信处于掉线状态，请尝试如下步骤\n" +
    "               </dt>\n" +
    "               <dd>\n" +
    "                   1、<span class=\"red-font\">{{ bTime }}秒</span> 后尝试 <span class=\"red-font\">刷新浏览器</span></br>\n" +
    "                   2、请双击苹果手机的Home键，杀掉微信进程，再 <span class=\"red-font\">打开微信</span></br>\n" +
    "                   3、确认 <span class=\"red-font\">连接公司WiFi</span>\n" +
    "               </dd>\n" +
    "           </div> -->\n" +
    "\n" +
    "            <div class=\"cc-err new-err\" v-show=\"errDetail\">\n" +
    "                <dd>\n" +
    "                    黑鸟未能自动恢复，请手动点击按钮重启\n" +
    "                </dd>\n" +
    "                <p class=\"reset-err\" v-if=\"resetError.send\">正在发起重启</p>\n" +
    "                <p class=\"reset-err\" v-else :class=\"{'reset-err-i': resetError.show}\" @click=\"resetErr\">重启<span v-if=\"resetError.show\">( <em class=\"red-font\">{{ resetError.time }}秒</em>  )</span></p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"err-detail\" v-show=\"showLast\">\n" +
    "                <dt class=\"fon18\">\n" +
    "                    <i></i>\n" +
    "                    将微信账号复制后发到群里联系技术同学处理\n" +
    "                </dt>\n" +
    "                <dd>\n" +
    "                    微信账号 : {{ wechatId }}</br>\n" +
    "                    CRM账号：{{ crm}}\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--{{ deviceId }}-->\n" +
    "</template>\n" +
    "\n" +
    "\n" +
    "<!--版本升级-->\n" +
    "<update-wechat :client-version=\"wxData.clientVersion\" :cloud-version=\"wxData.cloudVersion\"></update-wechat>\n" +
    "<template id=\"update_wechat\">\n" +
    "    <div class=\"update_mask\" v-if=\"updataShow\">\n" +
    "        <div class=\"update_layer\">\n" +
    "            <h3>版本更新提示</h3>\n" +
    "            <p>发现新版的微信客户端，请更新客户端后才能继续使用。</p>\n" +
    "            <!--<p :clientVersion=\"wxData.clientVersion\">当前版本：{{clientVersion }}</p>-->\n" +
    "            <p>当前版本：{{ clientVersion }}</p>\n" +
    "            <p>最新版本：{{ cloudVersion }}</p>\n" +
    "            <div class=\"divs\" @click=\"onUpdate\" v-if=\"waiting\">立即升级</div>\n" +
    "            <div>升级中，请等待,后台更新中...</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--浏览器检测-->\n" +
    "<div class=\"update_mask2\">\n" +
    "    <div class=\"update_layer\">\n" +
    "        <h3>提示</h3>\n" +
    "        <p>请在chrome【谷歌】浏览器中使用聊天功能</p>\n" +
    "        <div class=\"divs\"><a href=\"https://www.google.com.hk/chrome/browser/desktop/index.html\" target=\"_blank\"\n" +
    "                             class=\"downlink\">下载 Chrome</a></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--退出托管-->\n" +
    "<logout :sel-list=\"wxData.userListPerson.slice()\" :sel-data=\"wxData.msgList\"></logout>\n" +
    "<!-- 选择联系人模板 -->\n" +
    "<template id=\"logout\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"logoutShow\">\n" +
    "        <div class=\"logout_sel ani-pops\">\n" +
    "            <h5>请选择托管账号<span @click=\"selHide\">&times;</span></h5>\n" +
    "            <div class=\"search\"><input type=\"text\" placeholder=\"搜索\" v-model=\"selFilter\"/></div>\n" +
    "            <div>\n" +
    "                <ul class=\"sel_list\">\n" +
    "                    <li v-for=\"x in selLists\" @click=\"selUser(x)\" track-by=\"$index\">\n" +
    "                        <img :src=\"selData[x].userInfo.img\"/>\n" +
    "                        <p>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</p>\n" +
    "                        <i :class=\"{'sel_seled': selSelect == x}\"></i>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"sel_foot clearfix\">\n" +
    "                <div>\n" +
    "                    <span class=\"sel_cancel\" @click=\"userLogout\">退出</span>\n" +
    "                    <span class=\"sel_sure sel_set\" :class=\"{'sel_nosure':this.selSelect==''}\" @click=\"userLogoutTrust\">退出并托管</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<fn-tab></fn-tab>\n" +
    "<!-- 复制到搜索框 -->\n" +
    "<template id=\"fn_tab\">\n" +
    "    <div class=\"fn_tab\" v-show=\"show\" :style=\"pos\" @click.stop=\"sendSelData\" tabindex=\"-1\" @blur=\"hide\">\n" +
    "        搜索\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<quick-tab></quick-tab>\n" +
    "<!--quick tab-->\n" +
    "<template id=\"quick_tab\">\n" +
    "    <ul class=\"quick_tab clearfix\" v-show=\"show\" :style=\"pos\" tabindex=\"-1\" @blur=\"hide\">\n" +
    "        <li @click=\"atUser\">@ TA</li>\n" +
    "        <li @click=\"privateChat\">私聊</li>\n" +
    "        <li @click=\"getChatList\">查看记录</li>\n" +
    "        <!--<li @click=\"delCutUser\" v-if=\"delShow.show\">删除</li>-->\n" +
    "        <li @click=\"delCutUser\">删除</li>\n" +
    "    </ul>\n" +
    "    <!--聊天记录-->\n" +
    "    <div class=\"weixin_mask\" v-if=\"showChatList\">\n" +
    "        <div class=\"group-user-chatlist\">\n" +
    "            <h3>\n" +
    "                <em @click=\"closeChatDetail\">&times;</em>\n" +
    "                <i></i>\n" +
    "            </h3>\n" +
    "            <h5><span>聊天记录</span></h5>\n" +
    "            <div class=\"chat-content\">\n" +
    "                <div class=\"chat-type\" class=\"clearfix\" v-for=\"x in chatListDetail\">\n" +
    "\n" +
    "                    <em class=\"chat-title\">{{x.name}} {{x.time}}</em>\n" +
    "                    <!--文字信息-->\n" +
    "                    <p v-if=\"x.cnt_type == 0\">{{ x.content }}</p>\n" +
    "                    <!--@人-->\n" +
    "                    <pre v-if=\"x.cnt_type == 3100\" class=\"mes_con\">{{{ x.content.content }}}</pre>\n" +
    "                    <!--followtime-->\n" +
    "                    <pre v-if=\"x.cnt_type == 4000\" class=\"mes_con\">{{{ 'Follow提醒内容：' + x.content }}}</pre>\n" +
    "                    <!--课前提醒-->\n" +
    "                    <pre v-if=\"x.cnt_type == 5000\" class=\"mes_con\">{{{ x.content.content }}}</pre>\n" +
    "                    <!-- 图片消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 1\" class=\"mes_con mes_img\">\n" +
    "                        <a rel=\"gallery\" :href=\"x.content.split(',')[1] || x.content\">\n" +
    "                            <img :src=\"x.content.split(',')[0] || x.content\" class=\"weichat_img\"/>\n" +
    "                        </a>\n" +
    "                    </p>\n" +
    "                    <!-- 图片上传消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 9999\" class=\"mes_con mes_img weichat_img_up\">\n" +
    "                        <!-- 真实url -->\n" +
    "                        <a rel=\"gallery\" :href=\"x.content[1]\">\n" +
    "                            <!-- base64 -->\n" +
    "                            <img :src=\"x.content[0]\" class=\"weichat_img\"/>\n" +
    "                        </a>\n" +
    "                    </p>\n" +
    "                    <!-- 语音消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 2\" class=\"mes_con mes_voice mes-history-voice\" @click=\"playVoice2(x.content)\"\n" +
    "                       :class=\"{'mes_voice_isplaying':x.content == voicePlay2.playVoiceSrc2 }\"></p>\n" +
    "                    <!-- 名片消息 -->\n" +
    "                    <div v-if=\"x.cnt_type == 42 && typeof x.content == 'object'\" class=\"mes_con mes_card\">\n" +
    "                        <div class=\"mes_con_t\">\n" +
    "                            <img :src=\"x.content._smallheadimgurl\" class=\"fl\"/>\n" +
    "                            <div class=\"mes_con_c fl\">\n" +
    "                                <h4>{{ x.content._nickname }}</h4>\n" +
    "                                <p>{{ x.content.alias }}</p>\n" +
    "                            </div>\n" +
    "                            <!--<em class=\"fl\"></em>-->\n" +
    "                        </div>\n" +
    "                        <p class=\"mes_con_b\">个人名片</p>\n" +
    "                    </div>\n" +
    "                    <!-- 兼容老的名片历史记录 -->\n" +
    "                    <pre class=\"mes_con\" v-if=\"x.cnt_type == 42 && typeof x.content == 'string'\">{{x.content | paser $index}}</pre>\n" +
    "                    <!-- 收文章消息 -->\n" +
    "                    <div v-if=\"x.cnt_type == 495\" class=\"mes_con mes-share-article\">\n" +
    "                        <div class=\"mes_con_box\">\n" +
    "                            <a :href=\"x.content.urlStr\" target=\"_blank\">\n" +
    "                                <div><img :src=\"x.content.thumbUrl\"/></div>\n" +
    "                                <div>\n" +
    "                                    <h4>{{ x.content.title }}</h4>\n" +
    "                                    <p>{{ x.content.desc }}</p>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- 文件消息 -->\n" +
    "                    <div v-if=\"x.cnt_type == 6000  && typeof x.content == 'object'\" class=\"mes_con mes_file\">\n" +
    "                        <div class=\"mes_con_t\">\n" +
    "                            <div class=\"mes_con_c fl\">\n" +
    "                                <a :href=\"x.content.url\" :title=\"x.content.title\"></a>\n" +
    "                                <p>{{ x.content.title}}</p>\n" +
    "                            </div>\n" +
    "                            <em class=\"fr\" :class=\"getFileClass(x.content.url)\"></em>\n" +
    "                        </div>\n" +
    "                        <p class=\"mes_con_b\">{{ x.content.size/1024 | _parseInt }}KB</p>\n" +
    "                    </div>\n" +
    "                    <!-- 视频消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 6001  && typeof x.content == 'object'\" class=\"mes_con mes-video\">\n" +
    "                        <video :src=\"x.content.url\" controls></video>\n" +
    "                        <!--<i></i>-->\n" +
    "                    </p>\n" +
    "                    <!-- 其他消息 -->\n" +
    "                    <pre v-if=\"contentType.types.indexOf((x.cnt_type + '')) == -1\"\n" +
    "                         class=\"mes_con\">{{{ x.content }}}</pre>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"voice_play\">\n" +
    "        <audio id=\"voiceMsgPlayer2\" preload=\"metadata\" :src=\"voicePlay2.voiceSrc2\" @playing=\"isPlaying\"\n" +
    "               @ended=\"isEnded\"></audio>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--群主转让-->\n" +
    "<change-owner></change-owner>\n" +
    "<template id=\"changeGroupOwner\">\n" +
    "    <div class=\"flex-mask z99\" v-if=\"show\">\n" +
    "        <div class=\"group-owner-change\" v-show=\"showlayer\">\n" +
    "            <h5>选择新群主</h5>\n" +
    "            <div class=\"search-owner\">\n" +
    "                <input type=\"text\" v-model=\"search\">\n" +
    "                <span></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <ul class=\"group-user-list\">\n" +
    "                    <li v-for=\"x in selLists\" @click=\"selUser(x.wechat_id,x)\" track-by=\"$index\" v-if=\"x.wechat_id.split('$')[1] != groupOwnner\">\n" +
    "                        <img :src=\"x.wechat_img\"/>\n" +
    "                        <p>{{ x.wechat_nick }}</p>\n" +
    "                        <i :class=\"{'sel': sel ==x.wechat_id }\"></i>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"new-owner-btn\">\n" +
    "                <span class=\"btn-global default\" :class=\"{'disable': sel == ''}\" @click=\"setNewOwner\">确定</span>\n" +
    "                <span class=\"btn-global greey\" @click=\"hideChangeOwner\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"change-owner-ok\" v-show=\"showOk\">转让成功</div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--群公告-->\n" +
    "<group-announce></group-announce>\n" +
    "<template id=\"groupAnnounce\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops group-announce-layer clearfix\">\n" +
    "            <h4>群公告</h4>\n" +
    "            <textarea placeholder=\"请在此处输入需要发布的公告内容\" v-model=\"annContent\"></textarea>\n" +
    "            <div class=\"btn_foot announce-pad\">\n" +
    "                <input type=\"button\" value=\"确定\" class=\"btn_sure\" :class=\"{'btn_disable':this.annContent == ''}\"\n" +
    "                       :disabled=\"this.annContent == ''\" @click.stop=\"sendAnnounce\"/>\n" +
    "                <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click.stop=\"hide\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--我的学员-->\n" +
    "<my-study></my-study>\n" +
    "<template id=\"myStudyLayer\">\n" +
    "    <div class=\"weixin-mask-low\" v-if=\"show\">\n" +
    "        <div class=\"study-box\">\n" +
    "            <div class=\"top-box\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\">\n" +
    "                <span class=\"fl\">查询时间：</span>\n" +
    "                <span class=\"fl\">\n" +
    "                    <div class=\"input-wrap\">\n" +
    "                        <input type=\"text\" class=\"input middle-input\"  onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\" id=\"studyStartTime\">\n" +
    "                    </div>\n" +
    "                </span>\n" +
    "                <span class=\"fl\">至</span>\n" +
    "                <span class=\"fl\">\n" +
    "                    <div class=\"input-wrap\">\n" +
    "                        <input type=\"text\" class=\"input middle-input\" onclick=\"layui.laydate({elem: this})\"  v-model=\"endTime\" id=\"studyEndTime\">\n" +
    "                    </div>\n" +
    "                </span>\n" +
    "                <span class=\"fl study-time-btn\" @click=\"checkType('')\">搜索</span>\n" +
    "                <span class=\"close-layer-btn-right\" @click=\"hideMyStudy\"><em></em></span>\n" +
    "            </div>\n" +
    "\n" +
    "                <div class=\"con-box\">\n" +
    "                    <div class=\"change-desk\" v-if=\"cc\">\n" +
    "                        <ul>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 1 }\" @click=\"checkType('classA')\">已体验</li>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 2 }\" @click=\"checkType('classB')\">已约课</li>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 4 }\" @click=\"checkType('classD')\">缺席与取消</li>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 3 }\" @click=\"checkType('classC')\">未约课</li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <template v-if=\"hasStudy\">\n" +
    "                        <table>\n" +
    "                            <thead>\n" +
    "                            <tr>\n" +
    "                                <th></th>\n" +
    "                                <th>名称</th>\n" +
    "                                <th>CRM</th>\n" +
    "                                <th>注册时间</th>\n" +
    "                                <template v-if=\"cc\">\n" +
    "                                    <th>体验课时间</th>\n" +
    "                                </template>\n" +
    "                                <template v-else>\n" +
    "                                    <th>Leads分配时间</th>\n" +
    "                                </template>\n" +
    "                                <th>手机</th>\n" +
    "                                <th>操作</th>\n" +
    "                            </tr>\n" +
    "                            </thead>\n" +
    "                            <tbody>\n" +
    "                            <tr v-for=\"x in curStudyList\">\n" +
    "                                <td class=\"sel-user\" :class=\"{'sel-wait':x.add_user_status == 1}\">\n" +
    "                                    <label v-if=\"x.is_friend == 0 && x.add_user_status == 0\" :class=\"{'cut-sel': cutSelUserList.indexOf(x.user_id) > -1 }\">\n" +
    "                                        <input type=\"checkbox\" class=\"set-style\" :value=\"x.user_id\" v-model=\"cutSelUserList\">\n" +
    "                                    </label>\n" +
    "                                </td>\n" +
    "                                <td>{{x.nick_name}}</td>\n" +
    "                                <td>{{x.user_id}}</td>\n" +
    "                                <td>{{x.add_time}}</td>\n" +
    "\n" +
    "                                <template v-if=\"cc\">\n" +
    "                                    <!--明后天-->\n" +
    "                                    <template v-if=\"x.date_type == 5\">\n" +
    "                                        <td class=\"class-a\">后天 {{ x.appoint_time | m_d_h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <template v-if=\"x.date_type == 4\">\n" +
    "                                        <td class=\"class-a\">明天 {{ x.appoint_time | h_m}}</td>\n" +
    "                                    </template>\n" +
    "                                    <!--今天-->\n" +
    "                                    <template v-if=\"x.date_type == 3\">\n" +
    "                                        <td class=\"class-b\">今天 {{ x.appoint_time | h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <!--昨天-->\n" +
    "                                    <template v-if=\"x.date_type == 2\">\n" +
    "                                        <td class=\"class-c\">昨天 {{ x.appoint_time | h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <template v-if=\" x.date_type == 1\">\n" +
    "                                        <td class=\"class-c\">前天 {{ x.appoint_time | h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <!--默认-->\n" +
    "                                    <template  v-if=\"x.date_type == 0\">\n" +
    "                                        <td>{{ x.appoint_time | m_d_h_m }}</td>\n" +
    "                                    </template>\n" +
    "\n" +
    "                                </template>\n" +
    "                                <template v-else>\n" +
    "                                    <td>{{x.dispatch_time}}</td>\n" +
    "                                </template>\n" +
    "\n" +
    "                                <td>{{x.mobile}}</td>\n" +
    "                                <td>\n" +
    "                                    <div>\n" +
    "                                        <template v-if=\"x.is_friend == 0\">\n" +
    "                                            <span class=\"mark\" @click=\"crmRemarkTable(x.user_id)\">\n" +
    "                                            <p class=\"mark-info\" v-if=\"x.remark_log\">\n" +
    "                                                {{ x.remark_log }}\n" +
    "                                            </p>\n" +
    "                                        </span>\n" +
    "                                            <span class=\"tel\" @click=\"telphone(x.user_id)\"></span>\n" +
    "                                            <span class=\"add\" @click=\"goAddFriend(x.mobile,x.user_id,'fromMyStudy')\">添加<em v-if=\"x.add_count > 0\">{{ x.add_count }}次</em></span>\n" +
    "                                            <span class=\"status\" v-show=\"x.add_user_status == 2\" title=\"通过该手机号无法搜索到学员微信，请电话联系学员\"></span>\n" +
    "                                        </template>\n" +
    "                                        <template v-else>\n" +
    "                                            <span class=\"chat\" @click=\"studyChat(x.wechat_id)\">开始聊天</span>\n" +
    "                                        </template>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </template>\n" +
    "                    <template v-else>\n" +
    "                        <h5>暂无学员信息</h5>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "            <div class=\"study-btn-style clearfix\">\n" +
    "                <template v-if=\"hasStudy\">\n" +
    "                    <template v-if=\"cutSelUserList.length\">\n" +
    "                        <div class=\"add-sel-list default\" @click=\"selStudyList\" >\n" +
    "                            批量添加\n" +
    "                            <span>({{ cutSelUserList.length }})</span>\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                    <template v-else>\n" +
    "                        <div class=\"add-sel-list greey\" v-else>\n" +
    "                            批量添加\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                    <page></page>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--我的好友-->\n" +
    "<my-friend></my-friend>\n" +
    "<template id=\"myFriend\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"myfriend-box friend-box\">\n" +
    "            <span class=\"close-layer-btn-right\" @click=\"hide\"><em></em></span>\n" +
    "            <h5><span>新的好友</span></h5>\n" +
    "            <div class=\"friend-box-in\">\n" +
    "                <template v-if=\"pending\">\n" +
    "                    <p class=\"none\">加载中...</p>\n" +
    "                </template>\n" +
    "                <template v-else>\n" +
    "                    <ul v-if=\"list.length != 0\">\n" +
    "                        <li v-for=\"x in list\">\n" +
    "                            <img :src=\"x.headimgurl\" class=\"fl\"/>\n" +
    "                            <div class=\"fl friend-tit\">\n" +
    "                                <h6 title=\"{{ x.nickname }}\">{{ x.nickname }}</h6>\n" +
    "                                <p title=\"对方请求添加你为好友：{{ x.content }}\">{{ x.content }}</p>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"fr friend-op\">\n" +
    "                                <template v-if=\"x.encryptusername != ''\">\n" +
    "                                    <em @click=\"accept(x.encryptusername)\" style=\"float: right\">接受</em>\n" +
    "                                    <!--<em v-if=\"false\" @click=\"ignore(x.encryptusername)\">忽略</em>-->\n" +
    "                                </template>\n" +
    "                                <template v-else>\n" +
    "                                    <span>已接受</span>\n" +
    "                                    <!--<span v-if=\"false\">已忽略</span>-->\n" +
    "                                </template>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <p v-else class=\"none\">暂无新的好友</p>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 批改作业 -->\n" +
    "<home-work v-ref:homework></home-work>\n" +
    "<!-- 批改作业 -->\n" +
    "<template id=\"homeWork\">\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreShow\">\n" +
    "        <div class=\"info_update info_update_homework\">\n" +
    "            <h4>是否添加分数</h4>\n" +
    "            <p class=\"score_tip\">该分数不会显示在批改后的图片上，黑鸟系统会将该分数存<br/>下来用于生成学生的分数曲线，该功能之后会上线。</p>\n" +
    "            <dl>\n" +
    "                <dd>\n" +
    "                    <input type=\"number\" placeholder=\"请在此处输入该同学的作业分数\" v-model=\"score\"/>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure' : _score == ''}\" @click=\"sendScore\">添加分数</span>\n" +
    "                    <a class=\"sel_force\" href=\"javascript:void(0);\" @click=\"sendScore(true)\"\n" +
    "                       v-if=\"_score == ''\">直接发送</a>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <span class=\"close-btn\" @click=\"hideScore\">x</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreAudioShow\">\n" +
    "        <div class=\"info_update info_update_homework\">\n" +
    "            <h4>评语</h4>\n" +
    "            <dl>\n" +
    "                <dd>\n" +
    "                    <textarea placeholder=\"请在此处输入评语\" v-model=\"audioText\"></textarea>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure' : _audioText == ''}\" @click=\"checkListAudio\">发送</span>&nbsp;&nbsp;&nbsp;\n" +
    "                    <span class=\"sel_cancel\" @click=\"scoreAudioHide\">取消</span>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"home-work\">\n" +
    "            <span class=\"home-work-close\" @click=\"hide\"></span>\n" +
    "            <h4>作业批改</h4>\n" +
    "            <div class=\"home-work-in\">\n" +
    "                <div class=\"home-work-time clearfix\">\n" +
    "                    <div class=\"home-work-time-in\">\n" +
    "                        <input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\"\n" +
    "                               id=\"_startTime\"/><span>至</span><input type=\"text\" onclick=\"layui.laydate({elem: this})\"\n" +
    "                                                                     v-model=\"endTime\" id=\"_endTime\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" @click=\"getHomeWork\" class=\"home-work-time-btn\">查询</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"home-work-con\">\n" +
    "                    <audio id=\"voiceMsgPlayer3\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\"\n" +
    "                           @ended=\"isEnded\"></audio>\n" +
    "                    <template v-if=\"pending\">\n" +
    "                        <p class=\"none\">加载中...</p>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <template v-else>\n" +
    "                        <p v-if=\"list.length == 0\" class=\"none\">暂无班级作业信息</p>\n" +
    "\n" +
    "                        <div class=\"home-work-list\" v-else>\n" +
    "\n" +
    "                            <dl v-for=\"(key, x) in list\" v-if=\"!!groupData[key]\">\n" +
    "                                <dt>\n" +
    "                                    <img :src=\"(groupData[key] && groupData[key].wechat_img) || groupheader\"/>\n" +
    "                                </dt>\n" +
    "\n" +
    "                                <dd>\n" +
    "                                    <h6>{{ (groupData[key] && groupData[key].wechat_nick) || key }}</h6>\n" +
    "\n" +
    "                                    <div class=\"home-work-list-in\">\n" +
    "\n" +
    "                                        <ul class=\"clearfix\" v-if=\"x.length > 0\">\n" +
    "                                            <li v-for=\"xx in x\" v-if=\"$key != 'length'\"\n" +
    "                                                @mouseenter=\"shList(0 ,key, $key);\" @mouseleave=\"shList(1 ,key, $key);\">\n" +
    "                                                <!-- 图片 -->\n" +
    "                                                <template v-if=\"xx.message_type == 1\">\n" +
    "                                                    <p class=\"mes_img\">\n" +
    "                                                        <img :src=\"xx.content.split(',')[0] || xx.content\"\n" +
    "                                                             :id=\"'edit_img' + $key\"/>\n" +
    "                                                    </p>\n" +
    "                                                    <span class=\"todo img-edit\" v-show=\"xx.showTool\"\n" +
    "                                                          @click=\"editList(key, $key);\"\n" +
    "                                                          :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 语音 -->\n" +
    "                                                <template v-if=\"xx.message_type == 2\">\n" +
    "                                                    <p class=\"mes_voice\" @click=\"playVoice(xx.content)\"\n" +
    "                                                       :class=\"{'mes_voice_isplaying':xx.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "\n" +
    "                                                    <span class=\"todo audio-edit\" v-show=\"xx.showTool\"\n" +
    "                                                          @click=\"editListAudio(key, $key);\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <div class=\"time\">\n" +
    "                                                    <i>{{ xx.add_time }}</i>\n" +
    "                                                </div>\n" +
    "\n" +
    "                                                <span class=\"done\" v-if=\"xx.status == 1\">\n" +
    "                                                    <p>已批改</p>\n" +
    "                                                    <em></em>\n" +
    "                                                </span>\n" +
    "\n" +
    "                                                <span class=\"del\" v-show=\"xx.showTool\"\n" +
    "                                                      @click=\"delList(key, $key)\">x</span>\n" +
    "                                            </li>\n" +
    "                                        </ul>\n" +
    "\n" +
    "                                        <p class=\"home-work-list-nodone\" v-else>这位同学的作业还没有提交，别忘了提醒他快点交作业哦～</p>\n" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip\"\n" +
    "                                           @click=\"homeWorkTip(key);\">作业提醒</a>\n" +
    "                                    </div>\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 批改作业单人 -->\n" +
    "<home-work-one></home-work-one>\n" +
    "<!-- 批改作业单人 -->\n" +
    "<template id=\"homeWorkOne\">\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreShow\">\n" +
    "        <div class=\"info_update info_update_homework\">\n" +
    "            <h4>是否添加分数</h4>\n" +
    "            <p class=\"score_tip\">该分数不会显示在批改后的图片上，黑鸟系统会将该分数存<br />下来用于生成学生的分数曲线，该功能之后会上线。</p>\n" +
    "            <dl>\n" +
    "                <dd>\n" +
    "                    <input type=\"number\" placeholder=\"请在此处输入该同学的作业分数\" v-model=\"score\" />\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure' : _score == ''}\" @click=\"sendScore\">添加分数</span>\n" +
    "                    <a class=\"sel_force\" href=\"javascript:void(0);\" @click=\"sendScore(true)\" v-if=\"_score == ''\">直接发送</a>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <span class=\"close-btn\" @click=\"hideScore\">x</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreAudioShow\">\n" +
    "        <div class=\"info_update info_update_homework\">\n" +
    "            <h4>评语</h4>\n" +
    "            <dl>\n" +
    "                <dd>\n" +
    "                    <textarea placeholder=\"请在此处输入评语\" v-model=\"audioText\"></textarea>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure' : _audioText == ''}\" @click=\"checkListAudio\">发送</span>&nbsp;&nbsp;&nbsp;\n" +
    "                    <span class=\"sel_cancel\" @click=\"scoreAudioHide\">取消</span>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"home-work\">\n" +
    "            <span class=\"home-work-close\" @click=\"hide\"></span>\n" +
    "            <h4>作业批改</h4>\n" +
    "            <div class=\"home-work-in\">\n" +
    "                <div class=\"home-work-time clearfix\">\n" +
    "                    <div class=\"home-work-time-in\">\n" +
    "                        <input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\" id=\"_startTime\" /><span>至</span><input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"endTime\" id=\"_endTime\" />\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" @click=\"getHomeWork\" class=\"home-work-time-btn\">查询</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"home-work-con\">\n" +
    "                    <audio id=\"voiceMsgPlayer3\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\" @ended=\"isEnded\"></audio>\n" +
    "                    <template v-if=\"pending\">\n" +
    "                        <p class=\"none\">加载中...</p>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <template v-else>\n" +
    "                        <p v-if=\"list.length == 0\" class=\"none\">暂无作业信息</p>\n" +
    "\n" +
    "                        <div class=\"home-work-list\" v-else>\n" +
    "\n" +
    "                            <dl v-for=\"(key, x) in list\" v-if=\"!!groupData[key]\">\n" +
    "                                <dt>\n" +
    "                                    <img :src=\"groupData[key].img\" />\n" +
    "                                </dt>\n" +
    "\n" +
    "                                <dd>\n" +
    "                                    <h6>{{ groupData[key].c_remark || groupData[key].nick }}</h6>\n" +
    "\n" +
    "                                    <div class=\"home-work-list-in\">\n" +
    "\n" +
    "                                        <ul class=\"clearfix\" v-if=\"x.length > 0\">\n" +
    "                                            <li v-for=\"xx in x\" v-if=\"$key != 'length'\" @mouseenter=\"shList(0 ,key, $key);\" @mouseleave=\"shList(1 ,key, $key);\">\n" +
    "                                                <!-- 图片 -->\n" +
    "                                                <template v-if=\"xx.message_type == 1\">\n" +
    "                                                    <p class=\"mes_img\" >\n" +
    "                                                        <img :src=\"xx.content.split(',')[0] || xx.content\" :id=\"'edit_img' + $key\" />\n" +
    "                                                    </p>\n" +
    "                                                    <span class=\"todo img-edit\" v-show=\"xx.showTool\" @click=\"editList(key, $key);\" :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 语音 -->\n" +
    "                                                <template v-if=\"xx.message_type == 2\">\n" +
    "                                                    <p class=\"mes_voice\" @click=\"playVoice(xx.content)\" :class=\"{'mes_voice_isplaying':xx.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "\n" +
    "                                                    <span class=\"todo audio-edit\" v-show=\"xx.showTool\" @click=\"editListAudio(key, $key);\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <div class=\"time\">\n" +
    "                                                    <i>{{ xx.add_time }}</i>\n" +
    "                                                </div>\n" +
    "\n" +
    "                                                <span class=\"done\" v-if=\"xx.status == 1\">\n" +
    "                                                    <p>已批改</p>\n" +
    "                                                    <em></em>\n" +
    "                                                </span>\n" +
    "\n" +
    "                                                <span class=\"del\" v-show=\"xx.showTool\" @click=\"delList(key, $key)\">x</span>\n" +
    "                                            </li>\n" +
    "                                        </ul>\n" +
    "\n" +
    "                                        <p class=\"home-work-list-nodone\" v-else>这位同学的作业还没有提交，别忘了提醒他快点交作业哦～</p>\n" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip\" @click=\"homeWorkTip(key);\">作业提醒</a>\n" +
    "                                    </div>\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 作业汇总 -->\n" +
    "<home-work-detail></home-work-detail>\n" +
    "<!-- 作业汇总 -->\n" +
    "<template id=\"homeWorkDetail\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"home-work-pop\" v-show=\"hwShow\">\n" +
    "            <span class=\"home-work-pop-close\" @click=\"hwHideFn\"></span>\n" +
    "            <iframe :src=\"hwSrc\"></iframe>\n" +
    "        </div>\n" +
    "        <div class=\"home-work\">\n" +
    "            <span class=\"home-work-close\" @click=\"hide\"></span>\n" +
    "            <h4>作业汇总</h4>\n" +
    "            <div class=\"home-work-in\">\n" +
    "                <div class=\"home-work-time clearfix\">\n" +
    "                    <div class=\"home-work-time-in\">\n" +
    "                        <input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\" id=\"_startTime_2\"/><span>至</span><input\n" +
    "                                type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"endTime\" id=\"_endTime_2\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" @click=\"getHomeWork\" class=\"home-work-time-btn\">查询</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"home-work-con\">\n" +
    "                    <audio id=\"voiceMsgPlayer4\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\"\n" +
    "                           @ended=\"isEnded\"></audio>\n" +
    "                    <template v-if=\"pending\">\n" +
    "                        <p class=\"none\">加载中...</p>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <template v-else>\n" +
    "                        <p v-if=\"list.length == 0\" class=\"none\">暂无作业汇总信息</p>\n" +
    "\n" +
    "                        <div class=\"home-work-list\" v-else>\n" +
    "                            <dl v-for=\"(key, x) in list\" v-if=\"!!groupData[key]\">\n" +
    "                                <dt>\n" +
    "                                    <img :src=\"(groupData[key] && groupData[key].wechat_img) || groupheader\"/>\n" +
    "                                </dt>\n" +
    "\n" +
    "                                <dd>\n" +
    "                                    <h6>{{ (groupData[key] && groupData[key].wechat_nick) || key }}</h6>\n" +
    "\n" +
    "                                    <div class=\"home-work-list-in\">\n" +
    "\n" +
    "                                        <ul class=\"clearfix\" v-if=\"x.length > 0\">\n" +
    "                                            <li v-for=\"xx in x\" v-if=\"$key != 'length'\">\n" +
    "                                                <template v-if=\"xx.message_type == 1\">\n" +
    "                                                    <p class=\"mes_img\">\n" +
    "                                                        <img :src=\"xx.content\"/>\n" +
    "                                                    </p>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <template v-if=\"xx.message_type == 2\">\n" +
    "                                                    <p class=\"mes_voice\" @click=\"playVoice(xx.content)\"\n" +
    "                                                       :class=\"{'mes_voice_isplaying':xx.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <span class=\"done\">\n" +
    "                                                    <p>已批改</p>\n" +
    "                                                    <em></em>\n" +
    "                                                </span>\n" +
    "\n" +
    "                                                <div class=\"time\">\n" +
    "                                                    <i>{{ xx.add_time }}</i>\n" +
    "                                                </div>\n" +
    "\n" +
    "                                            </li>\n" +
    "                                        </ul>\n" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip\" @click=\"preview(key);\">预览</a>\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip home-work-list-send\"\n" +
    "                                           @click=\"send(key);\">发送</a>\n" +
    "                                    </div>\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--设置自动发送-->\n" +
    "<auto-send></auto-send>\n" +
    "<template id=\"autoSend\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops set-auto-send\">\n" +
    "            <h4>设置自动发送内容</h4>\n" +
    "            <ul>\n" +
    "                <li v-if=\"this.setTime.walkhalf.text != ''\">\n" +
    "                    <span :class=\"{'sure-sel':this.setTime.walkhalf.val != 0}\" @click=\"setTimeCheck('walkhalf')\"></span>\n" +
    "                    <p>{{ setTime.walkhalf.text }}</p>\n" +
    "                </li>\n" +
    "                <li v-if=\"this.setTime.walkhour.text != ''\">\n" +
    "                    <span :class=\"{'sure-sel':this.setTime.walkhour.val != 0}\" @click=\"setTimeCheck('walkhour')\"></span>\n" +
    "                    <p>{{ setTime.walkhour.text }}</p>\n" +
    "                </li>\n" +
    "                <li v-if=\"this.setTime.walkcut.text != ''\">\n" +
    "                    <span :class=\"{'sure-sel':this.setTime.walkcut.val != 0}\" @click=\"setTimeCheck('walkcut')\"></span>\n" +
    "                    <p>{{ setTime.walkcut.text }}</p>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div class=\"btn-foot\">\n" +
    "                <span class=\"btn-ok\" @click=\"confirmBtn\">确定并完成设置</span>\n" +
    "                <span @click=\"conselBtn\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- loading -->\n" +
    "<div class=\"heck_loading\" v-show=\"loading.show\">\n" +
    "    <div class=\"heck_loading_in\">\n" +
    "        <div class=\"heck_loader load3\">\n" +
    "            <span class=\"loader\"></span>\n" +
    "        </div>\n" +
    "        <p>正在发送中...</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"edit-img\"></div>\n" +
    "\n" +
    "<!-- 分享到朋友圈 -->\n" +
    "<div class=\"update_mask\" v-if=\"shareArticle.show\" v-cloak>\n" +
    "    <div class=\"info_update ani-pops share-article\">\n" +
    "        <h4>分享到朋友圈</h4>\n" +
    "        <template v-if=\"shareArticle.title\">\n" +
    "            <textarea type=\"text\" placeholder=\"在此输入分享到朋友圈的话\" v-model=\"shareArticle.dig\"></textarea>\n" +
    "            <div class=\"article-style clearfix\">\n" +
    "                <dt><img :src=\"shareArticle.icon\"></dt>\n" +
    "                <dd>\n" +
    "                    <p>{{ shareArticle.title }}</p>\n" +
    "                    <p>{{ shareArticle.desc }}</p>\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "        <template v-if=\"shareArticle.videoUrl\">\n" +
    "            <div class=\"article-style clearfix\">\n" +
    "                <dt>\n" +
    "                    <video :src=\"shareArticle.videoUrl\"></video>\n" +
    "                    <span></span></dt>\n" +
    "                <dd>\n" +
    "                    <textarea class=\"dig\" type=\"text\" placeholder=\"在此输入分享到朋友圈的话\" v-model=\"shareArticle.dig\"></textarea>\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "\n" +
    "        <div class=\"btn-foot\">\n" +
    "            <span class=\"btn-ok\" @click=\"shareArticleBtn\">发表分享</span>\n" +
    "            <span @click=\"hideShareBtn\">取消</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--分页组件-->\n" +
    "<!--<page></page>-->\n" +
    "<template id=\"page\">\n" +
    "    <ul class=\"pagination page-study\">\n" +
    "        <li v-show=\"current != 1\" @click=\"current-- && goto(current)\"><a href=\"#\">上一页</a></li>\n" +
    "        <li v-for=\"index in pages\" @click=\"goto(index)\" :class=\"{'active':current == index}\" :key=\"index\">\n" +
    "            <a href=\"#\">{{index}}</a>\n" +
    "        </li>\n" +
    "        <li v-show=\"allpage != current && allpage != 0 \" @click=\"current++ && goto(current++)\"><a href=\"#\">下一页</a></li>\n" +
    "    </ul>\n" +
    "</template>\n" +
    "\n" +
    "<!--<template id=\"datalayer\">-->\n" +
    "    <!--<tr>-->\n" +
    "        <!--<td v-for=\"item in items\" v-bind:class=\"{'dp-last': month!= item.month, 'dp-today': cur == item.data, 'dp-select': sel == item.data}\">-->\n" +
    "            <!--<span @click=\"click(item)\">{{ item.day }}</span>-->\n" +
    "        <!--</td>-->\n" +
    "    <!--</tr>-->\n" +
    "<!--</template>-->\n" +
    "\n" +
    "<!--<template id=\"startTime\">-->\n" +
    "    <!--<div class=\"input-wrap\">-->\n" +
    "        <!--<input type=\"text\" class=\"input middle-input\" @focus=\"foc\" @blur=\"hide\" v-model=\"sel\" :value=\"curTime\" id=\"studyStartTime\">-->\n" +
    "    <!--</div>-->\n" +
    "    <!--<div class=\"dp\" v-show=\"show\">-->\n" +
    "        <!--<div class=\"dp-header\"><a class=\"dp-h-1\" @click=\"cy(-1)\">«</a><a class=\"dp-h-2\" @click=\"cm(-1)\">‹</a>-->\n" +
    "            <!--<span class=\"dp-ym\">{{y}}年 {{m}}月</span>-->\n" +
    "            <!--<a class=\"dp-h-3\" @click=\"cm(1)\">›</a><a class=\"dp-h-4\" @click=\"cy(1)\">»</a></div>-->\n" +
    "        <!--<table class=\"dp-table\">-->\n" +
    "            <!--<thead>-->\n" +
    "            <!--<tr>-->\n" +
    "                <!--<th><span>一</span></th>-->\n" +
    "                <!--<th><span>二</span></th>-->\n" +
    "                <!--<th><span>三</span></th>-->\n" +
    "                <!--<th><span>四</span></th>-->\n" +
    "                <!--<th><span>五</span></th>-->\n" +
    "                <!--<th><span>六</span></th>-->\n" +
    "                <!--<th><span>日</span></th>-->\n" +
    "            <!--</tr>-->\n" +
    "            <!--</thead>-->\n" +
    "            <!--<tbody>-->\n" +
    "            <!--<tr is=\"calendar-line\" v-for=\"cell in data\" :items=\"cell\" :month=\"m\" :cur=\"cur\" :sel=\"sel\"></tr>-->\n" +
    "            <!--</tbody>-->\n" +
    "        <!--</table>-->\n" +
    "\n" +
    "    <!--</div>-->\n" +
    "<!--</template>-->\n" +
    "<!--<template id=\"endTime\">-->\n" +
    "    <!--<div class=\"input-wrap\">-->\n" +
    "        <!--<input type=\"text\" class=\"input middle-input\" @focus=\"foc\" @blur=\"hide\" v-model=\"sel\" :value=\"curTime\" id=\"studyEndTime\">-->\n" +
    "    <!--</div>-->\n" +
    "    <!--<div class=\"dp\" v-show=\"show\">-->\n" +
    "        <!--<div class=\"dp-header\"><a class=\"dp-h-1\" @click=\"cy(-1)\">«</a><a class=\"dp-h-2\" @click=\"cm(-1)\">‹</a>-->\n" +
    "            <!--<span class=\"dp-ym\">{{y}}年 {{m}}月</span>-->\n" +
    "            <!--<a class=\"dp-h-3\" @click=\"cm(1)\">›</a><a class=\"dp-h-4\" @click=\"cy(1)\">»</a></div>-->\n" +
    "        <!--<table class=\"dp-table\">-->\n" +
    "            <!--<thead>-->\n" +
    "            <!--<tr>-->\n" +
    "                <!--<th><span>一</span></th>-->\n" +
    "                <!--<th><span>二</span></th>-->\n" +
    "                <!--<th><span>三</span></th>-->\n" +
    "                <!--<th><span>四</span></th>-->\n" +
    "                <!--<th><span>五</span></th>-->\n" +
    "                <!--<th><span>六</span></th>-->\n" +
    "                <!--<th><span>日</span></th>-->\n" +
    "            <!--</tr>-->\n" +
    "            <!--</thead>-->\n" +
    "            <!--<tbody>-->\n" +
    "            <!--<tr is=\"calendar-line-now\" v-for=\"cell in data\" :items=\"cell\" :month=\"m\" :cur=\"cur\" :sel=\"sel\"></tr>-->\n" +
    "            <!--</tbody>-->\n" +
    "        <!--</table>-->\n" +
    "\n" +
    "    <!--</div>-->\n" +
    "<!--</template>-->\n" +
    "\n" +
    "<!--个人信息二维码弹层-->\n" +
    "<div class=\"flex-mask z99\" v-show=\"personalInfo.personalMask\">\n" +
    "    <div class=\"net-err personal-info\">\n" +
    "        <span class=\"close-layer-btn-right\" @click=\"hidePersonalMask\"><em></em></span>\n" +
    "        <h5 class=\"yellow-title\">\n" +
    "            个人信息\n" +
    "        </h5>\n" +
    "        <div class=\"show-per-detail\">\n" +
    "            <div class=\"per-text clearfix\">\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <dt>昵称</dt>\n" +
    "                    <dd>{{ personalInfo.nick }}</dd>\n" +
    "                </div>\n" +
    "                <div class=\"show-copy\">\n" +
    "                    <dt>微信号</dt>\n" +
    "                    <dd class=\"copytext\" @click=\"copyWechatText\" id=\"wechatName\">\n" +
    "                        {{ personalInfo.wechat_username }}\n" +
    "                    </dd>\n" +
    "                    <em>鼠标点击复制微信号</em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"per-img clearfix\" @mouseover=\"showCopyBtn\"  @mouseleave=\"hideCopyBtn\">\n" +
    "                <span class=\"copy-success\" v-show=\"personalInfo.copyWechatImg\">复制成功</span>\n" +
    "                <img :src=personalInfo.qrcode_url />\n" +
    "                <span class=\"copy-img\" v-show=\"personalInfo.copyImgBtn\" @click=\"copyImgBtn\">右击【复制图片】</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--当前学员微信信息-->\n" +
    "<cut-user-detail></cut-user-detail>\n" +
    "<template id=\"cutUserDetail\">\n" +
    "    <div class=\"flex-mask z99\" v-show=\"show\">\n" +
    "        <div class=\"net-err personal-info cut-user-detail\">\n" +
    "            <span class=\"close-layer-btn-right\" @click=\"hideCutMask\"><em></em></span>\n" +
    "            <h5 class=\"yellow-title\">\n" +
    "                个人信息\n" +
    "            </h5>\n" +
    "            <div class=\"show-per-detail\">\n" +
    "                <div class=\"per-text\">\n" +
    "                    <div  class=\"jianju\">\n" +
    "                        <dt>昵称</dt>\n" +
    "                        <dd :title=\"details.nickname\">\n" +
    "                            <i>{{ details.nickname }}</i>\n" +
    "                            <span :class=\"{'meal':details.gender == 1,'femeal':details.gender == 2, 'no':details.gender == 0}\"></span>\n" +
    "                        </dd>\n" +
    "                    </div>\n" +
    "                    <div class=\"jianju\">\n" +
    "                        <dt>微信号</dt>\n" +
    "                        <dd :title=\"details.weixinhao\">{{ details.weixinhao }}</dd>\n" +
    "                    </div>\n" +
    "                    <div class=\"jianju\">\n" +
    "                        <dt>电话</dt>\n" +
    "                        <dd>\n" +
    "                            <p v-for=\"x in details.phonenumbers\">{{x}}</p>\n" +
    "                        </dd>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "\n" +
    "<!--被迫掉线-->\n" +
    "<div class=\"flex-mask repeat-enter-layer\"  v-show=\"wxData.repeatEnter\">\n" +
    "    <div class=\"net-err repeat-enter\">\n" +
    "        <dt><i></i></dt>\n" +
    "        <dd>你很可能重复打开了黑鸟</br>请确认只打开一个黑鸟窗口后重新刷新页面</dd>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--设置班级群-->\n" +
    "<div class=\"flex-mask z99\" v-show=\"classGroupInfo.show\">\n" +
    "    <div class=\"class-group-bind\">\n" +
    "        <div class=\"class-group-bind-tip\">是否设置该群为班级群</div>\n" +
    "        <div class=\"class-group-confirm\">\n" +
    "            <span class=\"btn confirm\" @click=\"confirmClassGroup('yes')\">确定</span>\n" +
    "            <span class=\"btn concel\" @click=\"confirmClassGroup('no')\">取消</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--黑鸟注意事项-->\n" +
    "<div class=\"flex-mask z99\" v-show=\"blackUseTip\">\n" +
    "    <div class=\"black-bird-tips\">\n" +
    "        <span class=\"close-layer-btn-right\"><em  @click=\"blackUseTips('hide')\" transition=\"trans1\"></em></span>\n" +
    "        <h5>重点注意事项</h5>\n" +
    "        <div class=\"tips-a\">\n" +
    "            1、 <span>绝不能</span>进行还原系统，抹机的操作；</br>\n" +
    "            2、 <span>绝不能</span>删除预先安装的app及修改配置；</br>\n" +
    "            3、 <span>绝不能</span>升级iOS系统；</br>\n" +
    "            4、 <span>不能</span>升级为苹果App Store中的微信，等待黑鸟微信的更新提示；</br>\n" +
    "            5、 尽量不要让手机重启，断电关机；</br>\n" +
    "            6、 如果使用Apple ID登陆了苹果App Store，确保<span>不要</span>开启“查找我的iPhone”。\n" +
    "        </div>\n" +
    "        <div class=\"tips-b\">\n" +
    "            温馨提醒：</br>\n" +
    "            1、 请每个人在群里的名片备注名字+所在组+座位号；</br>\n" +
    "            2、 遇到问题第一时间在群里：描述问题、提供微信ID、座位号；</br>\n" +
    "            3、 定期更新Google chrome浏览器至最新版本。\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<set-hw></set-hw>\n" +
    "<!-- 设置作业 -->\n" +
    "<template id=\"setHW\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops set-hw\">\n" +
    "            <h4>布置作业</h4>\n" +
    "            <dl>\n" +
    "                <dt>上传作业</dt>\n" +
    "                <dd class=\"set-hw-list\">\n" +
    "                    <span class=\"set-loading\" v-if=\"showLoading\">上传中...</span>\n" +
    "                    <ul>\n" +
    "                        <li v-for=\"x in list\">\n" +
    "                            <img :src=\"x\" />\n" +
    "                        </li>\n" +
    "                        <li class=\"set-hw-upload\" id=\"set-hw-upload\">\n" +
    "                            <em id=\"set-hw-upload-btn\"></em>\n" +
    "                            <p>\n" +
    "                                <span></span>\n" +
    "                                点击上传\n" +
    "                            </p>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>&nbsp;</dt>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':sel_nosure}\" @click=\"subHW\">布置</span>\n" +
    "                    <span class=\"sel_cancel\" @click=\"hide\">取消</span>\n" +
    "                    <div class=\"sending-hw\" v-if=\"sending\">发送中...</div>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--托管-->\n" +
    "<instead></instead>\n" +
    "<template id=\"instead\">\n" +
    "    <div class=\"weixin_mask weixin_mask_addFri\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops add_friend\">\n" +
    "            <h4>托管面板</h4>\n" +
    "            <dl>\n" +
    "                <dt>被托管账号</dt>\n" +
    "                <dd>\n" +
    "                    <input type=\"text\" placeholder=\"请输入被托管人员CRM\" v-model=\"crm\"/>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>&nbsp;</dt>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':crm == ''}\" @click=\"submitCrm\">托管</span>\n" +
    "                    <span class=\"sel_cancel\" @click=\"hide\">取消</span>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--发送课程链接-->\n" +
    "<send-class></send-class>\n" +
    "<template id=\"sendLink\">\n" +
    "    <div class=\"weixin_mask weixin_mask_addFri\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops add_friend\">\n" +
    "            <h4>发送课程链接</h4>\n" +
    "            <div class=\"send-class-link\">\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <span>课程名称：</span>\n" +
    "                    <p>{{className}}</p>\n" +
    "                </div>\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <span>教材链接：</span>\n" +
    "                    <p><a :href=\"classLink\" target=\"_blank\">{{classLink}}</a></p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"send-class-btn\">\n" +
    "                <span class=\"btn-global default\"  @click=\"sendLink\">确定</span>\n" +
    "                <span class=\"btn-global greey\" @click=\"hide\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--推荐学员-->\n" +
    "<recommend></recommend>\n" +
    "<template id=\"recommend\">\n" +
    "    <div class=\"flex-mask z99\" v-if=\"show\">\n" +
    "        <div class=\"recommend\">\n" +
    "            <h5 class=\"yellow-title\">推荐学员</h5>\n" +
    "            <div class=\"rec-input\">\n" +
    "                <label>被推荐人手机号*</label>\n" +
    "                <input type=\"tel\" placeholder=\"必填\" v-model=\"recMoble\">\n" +
    "            </div>\n" +
    "            <div class=\"rec-input\">\n" +
    "                <label>备注</label>\n" +
    "                <input type=\"text\" placeholder=\"选填\" v-model=\"des\">\n" +
    "            </div>\n" +
    "            <div class=\"rec-btn\">\n" +
    "                <span class=\"btn-global default\" :class=\"{'disable': recMoble == ''}\" @click=\"addRecomd\">确定</span>\n" +
    "                <span class=\"btn-global greey\" @click=\"hide\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<label-editor></label-editor>\n" +
    "<!-- 打标签 -->\n" +
    "<template id=\"labelEditor\">\n" +
    "    <div class=\"label-editor\" v-show=\"show\" :class=\"{'vis': showvis}\" style=\"display: none;\" :style=\"pos\" @blur=\"blurHide\" tabIndex=\"-1\">\n" +
    "        <!-- 系统标签 -->\n" +
    "        <ul v-if=\"sysList.length > 0\" class=\"is-sys\">\n" +
    "            <li v-for=\"x in sysList\" :title=\"x.tag_brief\">\n" +
    "                {{ x.tag_name }}\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <!-- 自定义标签 -->\n" +
    "        <template v-for=\"x in labelList\">\n" +
    "            <ul v-if=\"$key != 1\">\n" +
    "                <li v-for=\"xx in x\" :title=\"xx.tag_brief\" :class=\"{'sel' : labelData.indexOf(xx.id) > -1}\" @click=\"editLabel(xx)\">\n" +
    "                    <span></span>\n" +
    "                    {{ xx.tag_name }}\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </template>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--黑鸟小助手-->\n" +
    "<template id=\"helperSel\">\n" +
    "    <div class=\"helper-sel\" v-if=\"show\">\n" +
    "        <div class=\"block-con no-border\">\n" +
    "            <h5>选择类型</h5>\n" +
    "            <div class=\"con-list\">\n" +
    "                <ul>\n" +
    "                    <template v-for=\"x in userGroupList.default\">\n" +
    "                        <li @click=\"getGroup(x.id)\" :class=\"{'cut-sel': groupsSel.indexOf(x.id) > -1 }\">\n" +
    "                            <span>{{ x.name}}</span>\n" +
    "                        </li>\n" +
    "                    </template>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- <div class=\"block-con\" v-if=\"userGroupList.groups && userGroupList.groups.length > 0\">\n" +
    "            <h5>选择组</h5>\n" +
    "            <div class=\"con-list\">\n" +
    "                <ul>\n" +
    "                    <template v-for=\"x in userGroupList.groups\">\n" +
    "                        <li @click=\"getDetails(x.organization_alias)\" :class=\"{'cut-sel':x.organization_alias == userGroupList.curid.organization_alias }\" :title=\"x.group_id\">\n" +
    "                            <span>{{ x.group_name}}</span>\n" +
    "                        </li>\n" +
    "                    </template>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div> -->\n" +
    "\n" +
    "\n" +
    "       <!--  <div class=\"block-con\" v-if=\"userGroupList.details && userGroupList.details.length > 0\">\n" +
    "           <div class=\"con-list detail-user\">\n" +
    "               <ul id=\"selUser\">\n" +
    "                   <template v-for=\"x in userGroupList.details\">\n" +
    "                       <li @click=\"getUserList(x.admin_id)\" :class=\"{'cut-sels':list.indexOf(x.admin_id) > -1}\">\n" +
    "                           <span>{{ x.nick_name }}</span>\n" +
    "                       </li>\n" +
    "                   </template>\n" +
    "               </ul>\n" +
    "           </div>\n" +
    "       </div> -->\n" +
    "\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "\n" +
    "<!--语音播放-->\n" +
    "<div class=\"voice_play\">\n" +
    "    <audio id=\"voiceMsgPlayer\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\" @ended=\"isEnded\"></audio>\n" +
    "</div>\n" +
    "\n" +
    "<iframe src=\"helperIframe.html?admin_id=12345&type=2\"></iframe>"; 

window["html2js"]["html/weixin_heck/weixin_body.html2js.html"] = "<div class=\"clear-fix heck_center\" v-cloak>\n" +
    "    <div class=\"labels_wrap\" v-show=\"labelsWrap.show\" :class=\"{'vis': labelsWrap.showvis}\" style=\"display: none;\" :style=\"labelsWrap.pos\">\n" +
    "        <ul>\n" +
    "            <li v-for=\"x in labelsWrap.data\" :class=\"{'is-sys' : x.status == 1}\">{{ x.tag_name }}</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"user_list\">\n" +
    "        <span class=\"wx_mask\" v-if=\"setGroupChat.flag\"></span>\n" +
    "        <div class=\"user_head\">\n" +
    "            <div class=\"user_head_in clearfix\">\n" +
    "                <img :src=\"wxData.localInfo.img\" @click=\"showPersonalMask\"/>\n" +
    "                <p>{{ wxData.localInfo.admin_name }}</p>\n" +
    "                <a href=\"/CircleFriend/circleFriendList\" target=\"_blank\" class=\"friend_cecal\"\n" +
    "                   v-if=\"wxData.localInfo.is_trust != 1\" @click=\"sendCircleFriend\">\n" +
    "                    <i class=\"wx_counts more\" v-if=\"wxData.comment > 999\"></i><i class=\"wx_counts num\" v-if=\"(wxData.comment > 0) && (wxData.comment <= 999)\">{{ wxData.comment }}</i>\n" +
    "                </a>\n" +
    "                <div class=\"user_op\" tabindex=\"-1\" @blur=\"userOpHide\">\n" +
    "                    <span @click=\"userOpShow\">\n" +
    "                        <i></i>\n" +
    "                        <i></i>\n" +
    "                        <i></i>\n" +
    "                        <em class=\"wx_counts more\" v-if=\"newFriCount > 999\"></em><em class=\"wx_counts num\" v-if=\"(newFriCount > 0) && (newFriCount <= 999)\">{{ newFriCount }}</em>\n" +
    "                    </span>\n" +
    "                    <ul class=\"user_op_pop\" v-show=\"userOp.show\" transition=\"trans1\">\n" +
    "                        <li @click=\"blackUseTips('show')\">注意事项</li>\n" +
    "                        <li @click=\"myStudy\">我的学员</li>\n" +
    "                        <li @click=\"addFriend({type:'0'})\">添加好友</li>\n" +
    "                        <li @click=\"getMyFriend\">新的好友<i class=\"wx_counts more\" v-if=\"newFriCount > 999\"></i><i class=\"wx_counts num\" v-if=\"(newFriCount > 0) && (newFriCount <= 999)\">{{ newFriCount }}</i></li>\n" +
    "                        <li @click=\"getChat('getGroupChat', '0')\">群发个人</li>\n" +
    "                        <li @click=\"getChat('getGroupChat', '1')\">群发给群</li>\n" +
    "                        <li @click=\"getChat('getChat')\">发起群聊</li>\n" +
    "                        <li @click=\"updateInfo\">个人信息</li>\n" +
    "                        <li @click=\"logoutTrust\">托管</li>\n" +
    "                        <li @click=\"userLogoutTrustByWX\">中转</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "<!----->\n" +
    "            <div class=\"lable-search\">\n" +
    "                <!-- 分类 -->\n" +
    "                <user-types :local-info=\"wxData.localInfo\"></user-types>\n" +
    "                <!-- 搜索 -->\n" +
    "                <user-search :sel-list=\"userListByType.slice()\" :sel-data=\"wxData.msgList\" :local-info=\"wxData.localInfo\"></user-search>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"user_progress\" v-show=\"userProgress.isFirst\" style=\"display: none;\">\n" +
    "            <div class=\"user_progress_in\">\n" +
    "                <div class=\"sk-circle\">\n" +
    "                    <div class=\"sk-circle1 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle2 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle3 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle4 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle5 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle6 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle7 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle8 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle9 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle10 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle11 sk-child\"></div>\n" +
    "                    <div class=\"sk-circle12 sk-child\"></div>\n" +
    "                </div>\n" +
    "                列表加载中，请稍后...\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"user_lists\" style=\"display: none;\" @scroll=\"scrollShow($event, userListByType.length)\" v-show=\"!userProgress.isFirst\">\n" +
    "            <dl v-for=\"x in userListByType.slice(0, showLength.userListByType.start)\" track-by=\"$index\"\n" +
    "                :class=\"{'cur':x == wxData.curUserId, 'top' :  wxData.topList.indexOf(x) > -1 }\"\n" +
    "                @click=\"changeUser(x);\">\n" +
    "                <dt>\n" +
    "                    <!-- 头像 -->\n" +
    "                    <!--<img :src=\"wxData.msgList[x].isGroup ? wxData.localInfo.grouphead : wxData.msgList[x].userInfo.img\"/>-->\n" +
    "                    <!--屏蔽消息-->\n" +
    "                    <template v-if=\"wxData.msgList[x].isGroup\">\n" +
    "                        <template v-if=\"wxData.msgList[x].userInfo.mute_session\">\n" +
    "                            <img :src=\"wxData.localInfo.grouphead\"/>\n" +
    "                            <!--<img :src=\"wxData.localInfo.groupShield\"/>-->\n" +
    "                            <i></i>\n" +
    "                        </template>\n" +
    "                        <template v-else>\n" +
    "                            <img :src=\"wxData.localInfo.grouphead\"/>\n" +
    "                        </template>\n" +
    "                    </template>\n" +
    "                    <template v-else>\n" +
    "                        <img :src=\"wxData.msgList[x].userInfo.img\"/>\n" +
    "                    </template>\n" +
    "                    <!-- 消息数 -->\n" +
    "                    <span class=\"wx_counts more\" v-if=\"wxData.msgList[x].noRead > 999\"></span>\n" +
    "                    <!--屏蔽消息显示红点-->\n" +
    "                    <template v-if=\"wxData.msgList[x].userInfo.mute_session\">\n" +
    "                        <span class=\"wx_counts point\" v-if=\"wxData.msgList[x].noRead > 0\"></span>\n" +
    "                    </template>\n" +
    "                    <template v-else>\n" +
    "                        <!--正常显示消息-->\n" +
    "                        <span class=\"wx_counts num\" v-if=\"(wxData.msgList[x].noRead > 0) && (wxData.msgList[x].noRead <= 999)\">{{ wxData.msgList[x].noRead }}</span>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <!-- 消息数 -->\n" +
    "                </dt>\n" +
    "                <dd class=\"user_list_detail\">\n" +
    "                    <h6>{{ wxData.msgList[x].userInfo.c_remark || wxData.msgList[x].userInfo.nick }}</h6>\n" +
    "                    <p>\n" +
    "                        <span v-if=\"(wxData.msgList[x].at_fg >= 1 && wxData.msgList[x].atshow && wxData.msgList[x].lastMsg)\">[有人@我<i\n" +
    "                                    v-if=\"(wxData.msgList[x].at_fg == 2)\">们</i>]</span>{{{ wxData.msgList[x].lastMsg }}}\n" +
    "                    </p>\n" +
    "                </dd>\n" +
    "                <!-- 新标签 -->\n" +
    "                <template v-if=\"!wxData.msgList[x].isGroup && !isHelper(x)\">\n" +
    "                    <dd class=\"user_list_label\" @mouseenter=\"showLabelTab($event, getLabel(x))\" @mouseleave=\"hideLabelTab()\">\n" +
    "                        <ul v-if=\"getLabel(x).length != 0\">\n" +
    "                            <li v-for=\"label in getLabel(x)\" :class=\"{'is-sys' : label.status == 1}\">\n" +
    "                                {{ label.tag_short }}\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </dd>\n" +
    "                    <dd class=\"user_list_label_s\" @click=\"showLabelEdit($event, x);\" :class=\"{isOpen : x == showLabelEditor}\"></dd>\n" +
    "                </template>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"content_box\" :class=\"{'content_box_group':setGroupChat.flag}\">\n" +
    "        <user-sel :sel-labels=\"labels\" :sel-data=\"wxData.msgList\" :local-info=\"wxData.localInfo\"></user-sel>\n" +
    "        <div class=\"content_box_none\" v-if=\"!wxData.curUserId\">\n" +
    "            <span>未选择聊天</span><i></i>\n" +
    "        </div>\n" +
    "        <div class=\"content_inner\" v-else>\n" +
    "            <div class=\"content_text\">\n" +
    "                <!-- 昵称 -->\n" +
    "                <div class=\"content_title\">\n" +
    "                    <p class=\"content_tit\">\n" +
    "                        <!-- 备注 || 昵称 -->\n" +
    "                        <i>{{ wxData.msgList[wxData.curUserId].userInfo.c_remark ||\n" +
    "                            wxData.msgList[wxData.curUserId].userInfo.nick }}<span\n" +
    "                                    v-if=\"wxData.groupUserLists[wxData.curUserId] && wxData.groupUserLists[wxData.curUserId].length > 0\">({{wxData.groupUserLists[wxData.curUserId].length}})</span><em v-if=\"wxData.msgList[wxData.curUserId].isGroup\" @click=\"showGroupLayer\"  :class=\"contentGroupLayer.show ? 'up-arrow' : 'down-arrow'\"></em></i>\n" +
    "\n" +
    "                        <!-- 修改昵称 .isGroup群组  否则个人  v-if=\"wxData.msgList[wxData.curUserId].isGroup\"  -->\n" +
    "                        <!--<em class=\"content_title_edit\" @click=\"editNameShow(wxData.msgList[wxData.curUserId].isGroup, wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick )\"></em>-->\n" +
    "                    </p>\n" +
    "\n" +
    "                    <!--聊天窗口右侧菜单-->\n" +
    "                    <template v-if=\"wxData.msgList[wxData.curUserId].isGroup\">\n" +
    "                        <div class=\"user-menu\" v-if=\"!isHelper(wxData.curUserId)\" @click=\"userOptShow\" tabindex=\"-1\" @blur=\"userOptHide\">\n" +
    "                            <div class=\"user-menu-list\" v-show=\"userOpt.show\" transition=\"trans1\">\n" +
    "                                <ul>\n" +
    "                                    <!--<li @click=\"getChat('add_group_mem')\">添加</li>-->\n" +
    "                                    <!--<li @click=\"groupMenuSet('delIco')\" v-if=\"wxData.showOwnnerBtn\">删除</li>-->\n" +
    "                                    <li @click=\"groupMenuSet('announce')\" v-if=\"wxData.showOwnnerBtn\">群公告</li>\n" +
    "                                    <li @click=\"groupMenuSet('power')\" v-if=\"wxData.showOwnnerBtn\">群主管理权转让</li>\n" +
    "                                    <li @click=\"groupMenuSet('invite',wxData.msgList[wxData.curUserId].userInfo.allow_owner_approve_value)\" v-if=\"wxData.showOwnnerBtn\" style=\"display:none;\">\n" +
    "                                        {{wxData.msgList[wxData.curUserId].userInfo.allow_owner_approve_value ? '关闭' : '开启'}}群聊邀请确认\n" +
    "                                    </li>\n" +
    "                                    <li @click=\"editNameShow(wxData.msgList[wxData.curUserId].isGroup, wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick )\">修改群备注名 </li>\n" +
    "                                    <li @click=\"groupMenuSet('myNicker')\">修改群昵称</li>\n" +
    "                                    <template v-if=\"!wxData.msgList[wxData.curUserId].userInfo.mute_session\">\n" +
    "                                        <li @click=\"groupMenuSet('close')\">屏蔽群消息</li>\n" +
    "                                    </template>\n" +
    "                                    <template v-else>\n" +
    "                                        <li @click=\"groupMenuSet('open')\">开启群消息</li>\n" +
    "                                    </template>\n" +
    "\n" +
    "                                    <template v-if=\"!wxData.msgList[wxData.curUserId].userInfo.set_to_top\">\n" +
    "                                        <li @click=\"groupMenuSet('toTop')\">置顶</li>\n" +
    "                                    </template>\n" +
    "                                    <template v-else>\n" +
    "                                        <li @click=\"groupMenuSet('closeTop')\">取消置顶</li>\n" +
    "                                    </template>\n" +
    "                                    <li @click=\"groupMenuSet('quit')\" class=\"quit\">退出群聊</li>\n" +
    "                                </ul>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                    <template v-else>\n" +
    "                        <div class=\"user-menu\" v-if=\"!isHelper(wxData.curUserId)\" @click=\"userOptShow\" tabindex=\"-1\" @blur=\"userOptHide\">\n" +
    "                            <div class=\"user-menu-list\" v-show=\"userOpt.show\" transition=\"trans1\">\n" +
    "                                <ul>\n" +
    "                                    <li @click=\"editNameShow(wxData.msgList[wxData.curUserId].isGroup, wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick )\">\n" +
    "                                        修改备注\n" +
    "                                    </li>\n" +
    "                                    <li @click=\"showUserDetail(wxData.msgList[wxData.curUserId].userInfo.id)\">\n" +
    "                                        微信信息\n" +
    "                                    </li>\n" +
    "                                    <li @click=\"groupMenuSet('vip',wxData.msgList[wxData.curUserId].crmInfo.user_id)\">设置主要跟进人</li>\n" +
    "                                    <li @click=\"delFriend(wxData.msgList[wxData.curUserId].userInfo.id,wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick)\">\n" +
    "                                        删除联系人\n" +
    "                                    </li>\n" +
    "                                </ul>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <!--群列表层-->\n" +
    "                    <div class=\"content-group-show-layer\" v-if=\"wxData.msgList[wxData.curUserId].isGroup && contentGroupLayer.show\" transition=\"trans1\" >\n" +
    "                        <ul class=\"content-group-list\">\n" +
    "                            <li @click=\"getChat('add_group_mem')\">\n" +
    "                                <p></p>\n" +
    "                                <p>添加</p>\n" +
    "                            </li>\n" +
    "                            <!--<li @click=\"showGroupDelIcon\">-->\n" +
    "                            <li @click=\"groupMenuSet('delIco')\">\n" +
    "                                <p></p>\n" +
    "                                <p>删除</p>\n" +
    "                            </li>\n" +
    "                            <template v-if=\"contentGroupLayer.show\">\n" +
    "                                <li v-for=\"x in wxData.groupUserLists[wxData.curUserId]\">\n" +
    "                                    <p @click=\"quickTab($event,x,wxData.groupUserLists[wxData.curUserId])\">\n" +
    "                                        <img :src=\"x.wechat_img\" :title=\"x.wechat_nick\">\n" +
    "                                        <i v-show=\"contentGroupLayer.del\" @click=\"delGroupDetailUser(x)\">&minus;</i>\n" +
    "                                    </p>\n" +
    "                                    <p :title=\"x.wechat_nick\">{{x.wechat_nick}}</p>\n" +
    "                                </li>\n" +
    "                            </template>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <!-- 加人 -->\n" +
    "                    <!--<em class=\"content_title_add\" v-if=\"wxData.msgList[wxData.curUserId].isGroup\" @click=\"getChat('addUsers')\"></em>-->\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"content_message\" @mouseup=\"getSelCon\" @scroll=\"scrollFn\">\n" +
    "\n" +
    "                    <!-- 拉取历史记录 -->\n" +
    "                    <div class=\"get_history\">\n" +
    "                        <div v-show=\"!wxData.msgList[wxData.curUserId].historyMsg.isGetAll\">\n" +
    "                            <a href=\"javascript:void(0);\" @click=\"getHistoryFn\"\n" +
    "                               v-show=\"!historyMsg.isLoading\">查看历史纪录</a>\n" +
    "                            <span v-else>加载中...</span>\n" +
    "                        </div>\n" +
    "                        <p v-else>已拉取全部历史纪录</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- 消息 -->\n" +
    "                    <!-- x 为消息数组中数据 x.source代表元数据 -->\n" +
    "                    <dl v-for=\"x in wxData.msgList[wxData.curUserId].userMsg\"\n" +
    "                        :class=\"x.isCC ? 'mes_right' : 'mes_left'\">\n" +
    "                        <!--系统-->\n" +
    "                        <template v-if=\"x.cnt_type == 400\">\n" +
    "                            <dt class=\"mes_tips clearfix\" :title=\"x.content\">\n" +
    "                                <span class=\"del-friend\"></span>\n" +
    "                                <p class=\"addfriend clearfix\">\n" +
    "                                    【{{ x.name }}】开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。\n" +
    "                                    <span @click=\"addDelFriend\">申请好友></span>\n" +
    "                                </p>\n" +
    "                            </dt>\n" +
    "                        </template>\n" +
    "                        <template v-if=\"x.cnt_type == 4000\">\n" +
    "                            <dt class=\"mes_tips clearfix\" :title=\"x.content\">\n" +
    "                                <span class=\"follow\"></span>\n" +
    "                                <p class=\"follow clearfix\">{{ 'Follow提醒内容：' + x.content }}</p>\n" +
    "                            </dt>\n" +
    "                        </template>\n" +
    "                        <template v-if=\"x.cnt_type == 5000 || x.cnt_type == 10000\">\n" +
    "                            <dt class=\"mes_tips clearfix\">\n" +
    "                                <span></span>\n" +
    "                            <p class=\"follow greey clearfix\">\n" +
    "                                <span :title=\"x.content\">{{ x.content }}</span>\n" +
    "                                <a href=\"javascript:void(0);\" v-if=\"x.source.cust_type == 1\" class=\"sure_btn\" @click=\"checkTea(wxData.curUserId, wxData.msgList[wxData.curUserId]);\">核实老师是否缺席</a>\n" +
    "                            </p>\n" +
    "                            </dt>\n" +
    "                        </template>\n" +
    "                        <!--常规-->\n" +
    "                        <template v-else>\n" +
    "                            <dt @click=\"quickTab($event,x,wxData.msgList[wxData.curUserId].isGroup)\"\n" +
    "                                :class=\"x.cnt_type == 400 || x.cnt_type == 4000 || x.cnt_type == 5000 ? 'dn' : ''\">\n" +
    "                                <img :src=\"x.isCC ? wxData.localInfo.img : wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.groupheader : wxData.msgList[wxData.curUserId].userInfo.img\"/>\n" +
    "                            </dt>\n" +
    "                            <dd @mouseenter=\"mesBackShowFn(x.isCC && $index + 1 == wxData.msgList[wxData.curUserId].userMsg.length, 1)\" @mouseleave=\"mesBackShowFn(x.isCC && $index + 1 == wxData.msgList[wxData.curUserId].userMsg.length, 0)\">\n" +
    "                                <!-- 如果是跟小助手聊天 -->\n" +
    "                                <h6 v-if=\"isHelper(wxData.curUserId)\">{{ x.isCC ? wxData.localInfo.admin_name : wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick }} <span>{{ x.time }}</span></h6>\n" +
    "                                <h6 v-else :class=\"x.cnt_type == 400 || x.cnt_type == 4000 || x.cnt_type == 5000 ? 'dn' : ''\">{{ (x.c_remark ||\n" +
    "                                    x.name) ? (x.c_remark || x.name) : x.isCC ?\n" +
    "                                    wxData.localInfo.admin_name : (wxData.msgList[wxData.curUserId].userInfo.c_remark ||\n" +
    "                                    wxData.msgList[wxData.curUserId].userInfo.nick) }} <span>{{ x.time }}</span></h6>\n" +
    "                                <!-- 撤回 -->\n" +
    "                                <span class=\"mes_back\" v-if=\"x.isCC && $index + 1 == wxData.msgList[wxData.curUserId].userMsg.length && mesBackShow\">\n" +
    "                                    <em @click=\"mesBack\">撤回</em>\n" +
    "                                </span>\n" +
    "                                <!-- 消息内容 -->\n" +
    "                                <!-- 文本消息 -->\n" +
    "                                <pre v-if=\"x.cnt_type == 0\" class=\"mes_con\">{{{ x.content }}}</pre>\n" +
    "                                <!--@人消息-->\n" +
    "                                <pre v-if=\"x.cnt_type == 3100\" class=\"mes_con\">{{{ x.content.content }}}</pre>\n" +
    "                                <!-- 图片消息 -->\n" +
    "                                <p v-if=\"x.cnt_type == 1\" class=\"mes_con mes_img\">\n" +
    "                                    <a rel=\"gallery\" :href=\"x.content.split(',')[1] || x.content\">\n" +
    "                                        <img :src=\"x.content.split(',')[0] || x.content\" class=\"weichat_img\"/>\n" +
    "                                    </a>\n" +
    "                                </p>\n" +
    "                                <!-- 图片上传消息 -->\n" +
    "                                <p v-if=\"x.cnt_type == 9999\" class=\"mes_con mes_img weichat_img_up\">\n" +
    "                                    <!-- 真实url -->\n" +
    "                                    <a rel=\"gallery\" :href=\"x.content[1]\">\n" +
    "                                        <!-- base64 -->\n" +
    "                                        <img :src=\"x.content[0]\" class=\"weichat_img\"/>\n" +
    "                                    </a>\n" +
    "                                </p>\n" +
    "                                <!-- 语音消息 -->\n" +
    "                                <p v-if=\"x.cnt_type == 2\" class=\"mes_con mes_voice\" @click=\"playVoice(x.content)\"\n" +
    "                                   :class=\"{'mes_voice_isplaying':x.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "\n" +
    "                                <!-- 名片消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 42 && typeof x.content == 'object'\" class=\"mes_con mes_card\"\n" +
    "                                     @click=\"addFriend({wxAcc:x.content.wxid,type:'1'})\">\n" +
    "                                    <div class=\"mes_con_t\">\n" +
    "                                        <img :src=\"x.content._smallheadimgurl\" class=\"fl\"/>\n" +
    "                                        <div class=\"mes_con_c fl\">\n" +
    "                                            <h4 :title=\"x.content._nickname\">{{ x.content._nickname }}</h4>\n" +
    "                                            <p :title=\"x.content.alias\">{{ x.content.alias }}</p>\n" +
    "                                        </div>\n" +
    "                                        <em class=\"fl\"></em>\n" +
    "                                    </div>\n" +
    "                                    <p class=\"mes_con_b\">个人名片</p>\n" +
    "                                </div>\n" +
    "                                <!-- 兼容老的名片历史记录 -->\n" +
    "                                <pre class=\"mes_con\" v-if=\"x.cnt_type == 42 && typeof x.content == 'string'\">{{ x.content }}</pre>\n" +
    "\n" +
    "                                <!-- 发文章消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 3000\" class=\"mes_con mes_article\">\n" +
    "                                    <div class=\"mes_con_box\">\n" +
    "                                        <div><img :src=\"x.content.icon\"/></div>\n" +
    "                                        <div>\n" +
    "                                            <h4>{{ x.content.title }}</h4>\n" +
    "                                            <p>{{ x.content.introduction }}</p>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <p><a :href=\"x.content.link\" target=\"_blank\">{{ x.content.link }}</a></p>\n" +
    "                                </div>\n" +
    "                                <!-- 收文章消息 -->\n" +
    "                                <!-- 分享文章消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 495\" class=\"mes_con mes-share-article\" @mouseenter=\"showShareMenu(x,'show')\" @mouseleave=\"showShareMenu(x,'hide')\">\n" +
    "                                    <div class=\"share-menu\" v-if=\"x.content.urlStr == showShare\">\n" +
    "                                        <ul>\n" +
    "                                            <li @click=\"shareMenu(x.content,'article')\">分享到朋友圈</li>\n" +
    "                                            <li @click=\"shareMenu(x.content,'single')\">转发个人</li>\n" +
    "                                            <li @click=\"shareMenu(x.content,'group')\">转发给群</li>\n" +
    "                                        </ul>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"con-box\">\n" +
    "                                        <a :href=\"x.content.urlStr\" target=\"_blank\">\n" +
    "                                            <div>\n" +
    "                                                <h4>{{ x.content.title }}</h4>\n" +
    "                                                <p>{{ x.content.desc }}</p>\n" +
    "                                            </div>\n" +
    "                                            <div>\n" +
    "                                                <img :src=\"x.content.thumbUrl\"/>\n" +
    "                                            </div>\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <!-- 黑鸟小助手消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 3001\" class=\"mes_con mes_article\" @click=\"openHelperLink(x.content);\">\n" +
    "                                    <div class=\"mes_con_box\">\n" +
    "                                        <div><img :src=\"x.content.icon\"/></div>\n" +
    "                                        <div>\n" +
    "                                            <h4>{{ x.content.title }}</h4>\n" +
    "                                            <p>{{ x.content.introduction }}</p>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <p><a href=\"javascript:void(0);\">{{ x.content.link }}</a></p>\n" +
    "                                </div>\n" +
    "                                <!-- 群邀请 -->\n" +
    "                                <div v-if=\"x.cnt_type == 4950\" class=\"mes_con mes-share-article\">\n" +
    "                                    <div class=\"con-box\" @click=\"inviteGroupMem(x.content.localMsgId)\">\n" +
    "                                        <div>\n" +
    "                                            <h4>{{ x.content.title }}</h4>\n" +
    "                                            <p>{{ x.content.desc }}</p>\n" +
    "                                        </div>\n" +
    "                                        <div>\n" +
    "                                            <img :src=\"x.content.thumbUrl\"/>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <!-- 文件消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 6000  && typeof x.content == 'object'\"\n" +
    "                                     class=\"mes_con mes_file\">\n" +
    "                                    <div class=\"mes_con_t\">\n" +
    "                                        <div class=\"mes_con_c fl\">\n" +
    "                                            <a :href=\"x.content.url\" :title=\"x.content.title\"></a>\n" +
    "                                            <p>{{ x.content.title}}</p>\n" +
    "                                        </div>\n" +
    "                                        <em class=\"fr\" :class=\"getFileClass(x.content.url)\"></em>\n" +
    "                                    </div>\n" +
    "                                    <p class=\"mes_con_b\">{{ x.content.size/1024 | _parseInt }}KB</p>\n" +
    "                                </div>\n" +
    "                                <!-- 视频消息 -->\n" +
    "                                <div v-if=\"x.cnt_type == 6001\" class=\"mes_con mes-video mes-share-article\" @mouseenter=\"showShareMenu(x,'show')\" @mouseleave=\"showShareMenu(x,'hide')\">\n" +
    "                                    <div class=\"share-menu\" v-if=\"x.content.url == showShare\">\n" +
    "                                        <ul>\n" +
    "                                            <li @click=\"shareMenu(x.content,'video')\">分享到朋友圈</li>\n" +
    "                                            <li @click=\"shareMenu(x.content, 'videoSend', 'single')\">转发个人</li>\n" +
    "                                            <li @click=\"shareMenu(x.content, 'videoSend', 'group')\">转发给群</li>\n" +
    "                                        </ul>\n" +
    "                                    </div>\n" +
    "                                    <!-- <i @click=\"shareMenu(x.content,'video')\">分享到朋友圈</i> -->\n" +
    "                                    <video class=\"setVideo\" controls>\n" +
    "                                        <source :src=\"x.content.url\">\n" +
    "                                    </video>\n" +
    "                                    <!--<span>{{'0:09'}}</span>-->\n" +
    "                                    <!--<em @click=\"palyVideo\"></em>-->\n" +
    "                                </div>\n" +
    "                                <!-- 其他消息 -->\n" +
    "                                <pre v-if=\"contentType.types.indexOf((x.cnt_type + '')) == -1\" class=\"mes_con\">{{{ x.content }}}</pre>\n" +
    "                            </dd>\n" +
    "                        </template>\n" +
    "                    </dl>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"content_send\">\n" +
    "                <span class=\"content_message_tip\" @click=\"gotoBottom\"\n" +
    "                      v-if=\"wxData.msgList[wxData.curUserId].noRead != 0\">↓您有{{ wxData.msgList[wxData.curUserId].noRead }}条新消息</span>\n" +
    "                <div class=\"content_tips\" v-show=\"contentTip != ''\" transition=\"contentTip\" @mouseenter=\"contentTipShow\"\n" +
    "                     @mouseleave=\"contentTipHide\">\n" +
    "                    <p>{{ contentTip }}</p>\n" +
    "                    <!--<span @click=\"sendMsgForce\">强制发送</span>-->\n" +
    "                </div>\n" +
    "                <div class=\"send_progress\">\n" +
    "                    <i></i>\n" +
    "                </div>\n" +
    "                <chat-tools v-ref:chatTools></chat-tools>\n" +
    "                <textarea class=\"send_text\" v-model=\"wxData.msgList[wxData.curUserId].msgContent\"\n" +
    "                          @keyDown.enter=\"sendMsg\" @focus=\"clearAtUs\" placeholder=\"请在此输入\"></textarea>\n" +
    "                <div class=\"send_btn\" v-if=\"!setGroupChat.flag\">\n" +
    "                    <input type=\"button\" value=\"发送\" @click=\"sendMsg\"/>\n" +
    "                    <span>按下Shift+Enter换行</span>\n" +
    "                </div>\n" +
    "                <!-- 群发到群 -->\n" +
    "                <div class=\"send_btn send_btn_group\" v-else>\n" +
    "                    <input type=\"button\" value=\"取消\" @click=\"closeGroupChat\">\n" +
    "                    <input type=\"button\" class=\"group_send\"\n" +
    "                           :class=\"{'dis' : setGroupChat.list.length == 0 || wxData.msgList[wxData.curUserId].msgContent == ''}\"\n" +
    "                           value=\"开始群发({{setGroupChat.list.length}})\" @click=\"sendMsg\"/>\n" +
    "                    <span>按下Shift+Enter换行</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!--<div class=\"share-content\" style=\"display: none;\">-->\n" +
    "            <div class=\"share-content\" v-if=\"parentSend\">\n" +
    "                <div class=\"share-detail-box\">\n" +
    "                    <div class=\"details\">\n" +
    "                        <dt>\n" +
    "                            <img :src=\"temShareMsg.thumbUrl\">\n" +
    "                        </dt>\n" +
    "                        <dd>\n" +
    "                            <p>{{temShareMsg.title}}</p>\n" +
    "                            <p>{{temShareMsg.desc}}</p>\n" +
    "                            <p>\n" +
    "                                <a :href=\"temShareMsg.urlStr\">{{temShareMsg.urlStr}}</a>\n" +
    "                            </p>\n" +
    "                        </dd>\n" +
    "                    </div>\n" +
    "                    <div class=\"share-detail-tip\">\n" +
    "                        <textarea type=\"text\" placeholder=\"给朋友留言\" v-model=\"forwardText\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"share-btn\">\n" +
    "                    <span class=\"btn-global default\" :class=\"{'disable': setGroupChat.list.length == 0}\" @click=\"parentSendFn('send')\">开始发送({{setGroupChat.list.length}})</span>\n" +
    "                    <span class=\"btn-global greey\" @click=\"parentSendFn('hide')\">取消</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"user_message\">\n" +
    "        <span class=\"wx_mask\" v-if=\"setGroupChat.flag\"></span>\n" +
    "        <div v-if=\"!!wxData.curUserId\" class=\"user_mes_boxc\" :class=\"{'group-dalasi':wxData.msgList[wxData.curUserId].isGroup}\">\n" +
    "            <!--个人-->\n" +
    "            <template v-if=\"!wxData.msgList[wxData.curUserId].isGroup\">\n" +
    "                <div v-show=\"bindCrm.showBindCon\" class=\"user_mes_box\">\n" +
    "                    <!-- 绑定按钮 -->\n" +
    "                    <a href=\"javascript:void(0)\" class=\"user_bind\" @click=\"bindUser\" v-show=\"bindCrm.showBindBtn && !isHelper(wxData.curUserId)\">绑定用户</a>\n" +
    "                    <!-- 头像 -->\n" +
    "                    <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\" class=\"user_head\"/>\n" +
    "                </div>\n" +
    "                <div v-show=\"bindCrm.showBindInfo\" class=\"user_mes_conc\">\n" +
    "                    <!-- 解绑按钮 -->\n" +
    "                    <!--<a href=\"javascript:void(0)\" class=\"user_bind\" @click=\"unbindUser\">解除绑定</a>-->\n" +
    "                    <dl>\n" +
    "                        <dt class=\"user_mes_e\">\n" +
    "                            <div class=\"clearfix user_mes_c\">\n" +
    "                                <a :href=\"wxData.msgList[wxData.curUserId].crmInfo.user_login\" target=\"_blank\" @click=\"operationLog('5')\">\n" +
    "                                    <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\" class=\"img-set\"/>\n" +
    "                                </a>\n" +
    "                                <div class=\"user_mes_t\">\n" +
    "                                    <div class=\"user_mes_pp\">\n" +
    "                                        <span class=\"user_mes_enname\"\n" +
    "                                                  v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.nick_name\"\n" +
    "                                                  @keydown.enter.prevent  contenteditable=\"plaintext-only\"\n" +
    "                                                  @blur=\"enNameEdit($event,wxData.msgList[wxData.curUserId].crmInfo)\">{{ wxData.msgList[wxData.curUserId].crmInfo.nick_name }}</span>\n" +
    "                                        <div class=\"bind-btn-group\">\n" +
    "                                            <select class=\"user_mes_about\"\n" +
    "                                                    v-if=\"wxData.msgList[wxData.curUserId].crmInfo.member\"\n" +
    "                                                    v-model=\"wxData.msgList[wxData.curUserId].crmInfo.selectMember\"\n" +
    "                                                    @change=\"updateSelectMember(wxData.curUserId,wxData.msgList[wxData.curUserId].crmInfo)\">\n" +
    "                                                <option value=\"0\" v-if=\"wxData.msgList[wxData.curUserId].crmInfo.selectMember == 0\">\n" +
    "                                                    请选择\n" +
    "                                                </option>\n" +
    "                                                <option v-for=\"x in wxData.msgList[wxData.curUserId].crmInfo.member\" :value=\"$key\">\n" +
    "                                                    {{x}}\n" +
    "                                                </option>\n" +
    "                                            </select>\n" +
    "                                            <!--<div class=\"user-unbind\" @click=\"unbindUser\">解除绑定</div>-->\n" +
    "                                            <div class=\"bind-menu\">\n" +
    "                                                <div class=\"bind-menu-style\" @click=\"showBindMenuList\" tabindex=\"-1\" @blur=\"hideBindMenuList\"></div>\n" +
    "                                                <div class=\"bind-menu-group\" v-show=\"cutUserMenuList\" transition=\"trans1\">\n" +
    "                                                    <ul>\n" +
    "                                                        <li @click=\"setAutoSend\">设置自动发送</li>\n" +
    "                                                        <li @click=\"recommendUser\">推荐学员</li>\n" +
    "                                                        <li @click=\"introWechat('show')\">转介绍二维码</li>\n" +
    "                                                        <li @click=\"unbindUser\">解除绑定</li>\n" +
    "                                                    </ul>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"bind-user-detail\">\n" +
    "                                        <span class=\"show-wechat dn\" v-if=\"bindCrm.showBindInfo\">\n" +
    "                                            <div class=\"wechat-img\">\n" +
    "                                                <!--<img :src=\"bindGroupCtl.wechatCode\">-->\n" +
    "                                                <img src=\"http://static.51talk.com/static/images/html/www_new/common/guan-wx.png\">\n" +
    "                                            </div>\n" +
    "                                        </span>\n" +
    "                                        <span v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.sex\" class=\"sex\" \n" +
    "                                        :class=\"{'man':wxData.msgList[wxData.curUserId].crmInfo.sex=='man', 'women':wxData.msgList[wxData.curUserId].crmInfo.sex =='woman'}\"></span>\n" +
    "                                        <span v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.age\">{{ wxData.msgList[wxData.curUserId].crmInfo.age }}岁</span>\n" +
    "                                        <span v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.city\">{{ wxData.msgList[wxData.curUserId].crmInfo.city }}</span>\n" +
    "                                        <template v-if=\"wxData.msgList[wxData.curUserId].crmInfo.crmUserType && wxData.msgList[wxData.curUserId].crmInfo.crmUserType.length != 0\">\n" +
    "                                            <span class=\"lable\" v-for=\"x in wxData.msgList[wxData.curUserId].crmInfo.crmUserType\">{{ x }}</span>\n" +
    "                                        </template>\n" +
    "                                        <span class=\"lable\" v-if=\"!!wxData.msgList[wxData.curUserId].crmInfo.from_url\">{{ wxData.msgList[wxData.curUserId].crmInfo.from_url }}</span>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </dt>\n" +
    "                        <dd>\n" +
    "                            <div class=\"uer-bind-info\" v-if=\"wxData.msgList[wxData.curUserId].crmInfo.combo\">\n" +
    "                                <table>\n" +
    "                                    <tbody>\n" +
    "                                        <template v-if=\"true\">\n" +
    "                                            <tr>\n" +
    "                                                <td>电话</td>\n" +
    "                                                <td>\n" +
    "                                                    {{ wxData.msgList[wxData.curUserId].crmInfo.mobile || '暂无' }}\n" +
    "                                                </td>\n" +
    "                                                <td>\n" +
    "                                                    <i class=\"tel\" @click=\"handCall\"></i>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <template v-if=\"wxData.msgList[wxData.curUserId].crmInfo.combo && wxData.msgList[wxData.curUserId].crmInfo.combo.length > 0\">\n" +
    "                                                <tr>\n" +
    "                                                    <td>购买套餐</td>\n" +
    "                                                    <td colspan=\"2\">\n" +
    "                                                        <select v-model=\"wxData.msgList[wxData.curUserId].crmInfo.comboSel\" class=\"taocan\">\n" +
    "                                                            <option v-for=\"x in wxData.msgList[wxData.curUserId].crmInfo.combo\" :value=\"$index\">{{ x.name }}\n" +
    "                                                            </option>\n" +
    "                                                        </select>\n" +
    "                                                    </td>\n" +
    "                                                </tr>\n" +
    "                                                <tr>\n" +
    "                                                    <td>套餐期限</td>\n" +
    "                                                    <td colspan=\"2\">\n" +
    "                                                        <p>\n" +
    "                                                            {{ wxData.msgList[wxData.curUserId].crmInfo.combo[wxData.msgList[wxData.curUserId].crmInfo.comboSel].start_time | y_m_d }}\n" +
    "                                                            ~ {{ wxData.msgList[wxData.curUserId].crmInfo.combo[wxData.msgList[wxData.curUserId].crmInfo.comboSel].end_time | y_m_d }}\n" +
    "                                                        </p>\n" +
    "                                                    </td>\n" +
    "                                                </tr>\n" +
    "                                            </template>\n" +
    "                                            <template v-else>\n" +
    "                                                <tr>\n" +
    "                                                    <td>购买套餐</td>\n" +
    "                                                    <td colspan=\"2\">暂无</td>\n" +
    "                                                </tr>\n" +
    "                                                <tr>\n" +
    "                                                    <td>套餐期限</td>\n" +
    "                                                    <td colspan=\"2\">暂无</td>\n" +
    "                                                </tr>\n" +
    "                                            </template>\n" +
    "                                            <tr v-if=\"wxData.msgList[wxData.curUserId].crmInfo.last.start_time\">\n" +
    "                                                <td>最近上课</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <div>{{ wxData.msgList[wxData.curUserId].crmInfo.last.start_time | y_m_d_h_m }}</div>\n" +
    "                                                    <div :class=\"{'row-one':!showInfo.last,'row-two':showInfo.last}\">\n" +
    "                                                        <p :title=\"wxData.msgList[wxData.curUserId].crmInfo.last.course_name_cn + '' +  wxData.msgList[wxData.curUserId].crmInfo.last.unit_name_cn + '' + wxData.msgList[wxData.curUserId].crmInfo.last.lession_name_cn\">\n" +
    "                                                            {{ wxData.msgList[wxData.curUserId].crmInfo.last.course_name_cn + '' +\n" +
    "                                                            wxData.msgList[wxData.curUserId].crmInfo.last.unit_name_cn + '' +\n" +
    "                                                            wxData.msgList[wxData.curUserId].crmInfo.last.lession_name_cn }}\n" +
    "                                                        </p>\n" +
    "                                                        <em :class=\"{'down':!showInfo.last,'up':showInfo.last}\" @click=\"showInfoFn('last')\"></em>\n" +
    "                                                    </div>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <!--<tr v-if=\"wxData.msgList[wxData.curUserId].crmInfo.recent.start_time\">-->\n" +
    "                                            <tr>\n" +
    "                                                <td>最近预约</td>\n" +
    "                                                <td colspan=\"2\">\n" +
    "                                                    <div>{{ wxData.msgList[wxData.curUserId].crmInfo.recent.start_time }}</div>\n" +
    "                                                    <div :class=\"{'row-one':!showInfo.recent,'row-two':showInfo.recent}\">\n" +
    "                                                        <template v-if=\"wxData.msgList[wxData.curUserId].crmInfo.recent.length != 0\">\n" +
    "                                                            <p :title=\"wxData.msgList[wxData.curUserId].crmInfo.recent.course_name_cn + '' + wxData.msgList[wxData.curUserId].crmInfo.recent.unit_name_cn + '' + wxData.msgList[wxData.curUserId].crmInfo.recent.lession_name_cn\">\n" +
    "                                                                {{ wxData.msgList[wxData.curUserId].crmInfo.recent.course_name_cn + '' +\n" +
    "                                                                wxData.msgList[wxData.curUserId].crmInfo.recent.unit_name_cn + '' +\n" +
    "                                                                wxData.msgList[wxData.curUserId].crmInfo.recent.lession_name_cn }}\n" +
    "                                                            </p>\n" +
    "                                                            <i class=\"yuyue\" @click=\"sendClassLink\"></i>\n" +
    "                                                            <em :class=\"{'down':!showInfo.recent,'up':showInfo.recent}\" @click=\"showInfoFn('recent')\"></em>\n" +
    "                                                        </template>\n" +
    "                                                        <template v-else>\n" +
    "                                                            <p>暂无</p>\n" +
    "                                                        </template>\n" +
    "\n" +
    "                                                    </div>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                            <tr>\n" +
    "                                                <td>备注信息</td>\n" +
    "                                                <td>\n" +
    "                                                    <p :title=\"wxData.msgList[wxData.curUserId].crmInfo.remarkInfo.length > 0 ? wxData.msgList[wxData.curUserId].crmInfo.remarkInfo[0].content : ''\">\n" +
    "                                                        {{ wxData.msgList[wxData.curUserId].crmInfo.remarkInfo.length > 0 ? wxData.msgList[wxData.curUserId].crmInfo.remarkInfo[0].content : \"暂无\" }}\n" +
    "                                                    </p></td>\n" +
    "                                                <td>\n" +
    "                                                    <i class=\"beizhu\" @click=\"crmRemarkOpen(wxData.msgList[wxData.curUserId].crmInfo.user_id)\"></i>\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                        </template>\n" +
    "                                    </tbody>\n" +
    "                                </table>\n" +
    "                            </div>\n" +
    "                            <div class=\"user_info_link\">\n" +
    "                                <a target=\"_blank\" :href=\"wxData.msgList[wxData.curUserId].crmInfo.user_detail\"\n" +
    "                                   v-show=\"wxData.msgList[wxData.curUserId].crmInfo.user_detail\">查看详情</a>\n" +
    "                                <a href=\"javascript:void(0);\" v-if=\"wxData.msgList[wxData.curUserId].showHW != 999 && wxData.msgList[wxData.curUserId].showHW\" @click=\"homeWorkOneShow(wxData.curUserId)\">作业批改</a>\n" +
    "                            </div>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                </div>\n" +
    "            </template>\n" +
    "\n" +
    "            <!--群-->\n" +
    "            <template v-else>\n" +
    "                <!--达拉斯-->\n" +
    "                <template v-if=\"true\">\n" +
    "                    <div class=\"group-right-top-layer\" v-if=\"bindGroupCtl.groupType.dls\">\n" +
    "                        <div class=\"group-bind-row\">\n" +
    "                            <!--群头像-->\n" +
    "                            <div class=\"group-bind-img\">\n" +
    "                                <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\"/>\n" +
    "                            </div>\n" +
    "                            <div class=\"group-bind-con\">\n" +
    "                                <div class=\"group-bind-con-up\">\n" +
    "                                    <!--群名字-->\n" +
    "                                    <div class=\"group-name\">{{ wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick }}</div>\n" +
    "                                    <div class=\"bind-menu\">\n" +
    "                                        <!--绑定按钮-->\n" +
    "                                        <div class=\"group-bind-btn\" name=\"group-bind-btn\" v-show=\"bindGroupCtl.showBindGroup && (bindGroupCtl.userGroup == '7' || bindGroupCtl.userGroup == '9' || bindGroupCtl.userGroup == '10' || bindGroupCtl.userGroup == '11')\" @click=\"bindGroupBtn\">绑定商品</div>\n" +
    "                                        <div class=\"group-bind-btn\" name=\"group-unbind-btn\" v-show=\"bindGroupCtl.canselBindGroup && (bindGroupCtl.userGroup == '7' || bindGroupCtl.userGroup == '9' || bindGroupCtl.userGroup == '10' || bindGroupCtl.userGroup == '11')\" @click=\"unbindGroup\">解除绑定</div>\n" +
    "                                        <!--绑定后的菜单-->\n" +
    "                                        <div class=\"bind-menu-style\" name=\"bind-menu-style\" @click=\"groupBindMenu\" v-show=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                            <div class=\"bind-menu-group\" transition=\"trans1\" name=\"bind-menu-group\" v-show=\"bindGroupCtl.menu\">\n" +
    "                                                <ul>\n" +
    "                                                    <li name=\"setAutoSend\">\n" +
    "                                                        <a :href=\"bindGroupCtl.groupDetail.commodityUrl\" target=\"_blank\">商品详情</a>\n" +
    "                                                    </li>\n" +
    "                                                    <li name=\"recommendUser\" class=\"class-detail-layer\">\n" +
    "                                                        班级信息\n" +
    "                                                        <div class=\"class-detail-detail\">\n" +
    "                                                            <table>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>商品ID</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.commodityId}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>商品名称</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.name}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>中教班课</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.courseName}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>次卡套餐</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.comboName}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>上课周期</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.startClassTime}} ~\n" +
    "                                                                        {{bindGroupCtl.groupDetail.endClassTime}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                                <tr>\n" +
    "                                                                    <td>下次上课</td>\n" +
    "                                                                    <td>{{bindGroupCtl.groupDetail.newClassTime}}</td>\n" +
    "                                                                </tr>\n" +
    "                                                            </table>\n" +
    "                                                        </div>\n" +
    "                                                    </li>\n" +
    "                                                </ul>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"group-bind-con-down\">\n" +
    "                                    <!--群的二维码-->\n" +
    "                                    <div class=\"show-wechat\" v-if=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                        <div class=\"wechat-img\">\n" +
    "                                            <img :src=\"bindGroupCtl.wechatCode\">\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"group-bind-row-down\">\n" +
    "                            <!--如果绑定了-->\n" +
    "                            <template v-if=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                <a href=\"javascript:;\" @click=\"setHWShow(wxData.curUserId)\">布置作业</a>\n" +
    "                                <a href=\"javascript:;\" @click=\"homeWorkShow(wxData.curUserId)\">作业批改</a>\n" +
    "                                <a href=\"javascript:;\" @click=\"homeWorkShowDetail(wxData.curUserId)\">作业汇总</a>\n" +
    "                            </template>\n" +
    "                            <!--没有绑定-->\n" +
    "                            <template v-if=\"bindGroupCtl.showBindGroup && bindGroupCtl.userGroup == '7'\">\n" +
    "                                绑定后，批改作业相关功能才可以使用\n" +
    "                            </template>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </template>\n" +
    "                <template v-if=\"false\">\n" +
    "                    <div class=\"group_mes_box\" v-if=\"bindGroupCtl.groupType.dls\">\n" +
    "                        <div class=\"group-bind-head clearfix\">\n" +
    "                            <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\"/>\n" +
    "                            <p>{{ wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick }}</p>\n" +
    "                            <span v-show=\"bindGroupCtl.showBindGroup\" @click=\"bindGroupBtn\">绑定商品</span>\n" +
    "                            <span v-show=\"bindGroupCtl.canselBindGroup\" @click=\"unbindGroup\">取消绑定</span>\n" +
    "                        </div>\n" +
    "                        <div class=\"group_mes_con\">\n" +
    "                            <div class=\"group-bind-con\">\n" +
    "                                <div class=\"group-detail\">\n" +
    "                                    <!--没有绑定显示群二维码-->\n" +
    "                                    <div v-show=\"bindGroupCtl.showBindGroup\">\n" +
    "                                        <img class=\"single-img\" :src=\"bindGroupCtl.wechatCode\">\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <!--显示群绑定信息-->\n" +
    "                                    <div v-show=\"bindGroupCtl.canselBindGroup\">\n" +
    "                                        <div class=\"group-btn\">\n" +
    "                                            <a :href=\"bindGroupCtl.groupDetail.commodityUrl\" target=\"_blank\">商品详情</a>\n" +
    "                                            <a href=\"javascript:void(0);\" @click=\"setHWShow(wxData.curUserId)\">布置作业</a>\n" +
    "                                            <a href=\"javascript:void(0);\" @click=\"homeWorkShow(wxData.curUserId)\">作业批改</a>\n" +
    "                                            <a href=\"javascript:void(0);\" @click=\"homeWorkShowDetail(wxData.curUserId)\">作业汇总</a>\n" +
    "                                        </div>\n" +
    "                                        <p><em>商&nbsp;品&nbsp;I&nbsp;D：</em><i>{{bindGroupCtl.groupDetail.commodityId}}</i>\n" +
    "                                        </p>\n" +
    "                                        <p><em>商品名称：</em><i>{{bindGroupCtl.groupDetail.name}}</i></p>\n" +
    "                                        <p><em>中教班课：</em><i>{{bindGroupCtl.groupDetail.courseName}}</i></p>\n" +
    "                                        <p><em>次卡套餐：</em><i>{{bindGroupCtl.groupDetail.comboName}}</i></p>\n" +
    "                                        <p><em>上课周期：</em><i>{{bindGroupCtl.groupDetail.startClassTime}} ~\n" +
    "                                                {{bindGroupCtl.groupDetail.endClassTime}}</i></p>\n" +
    "                                        <p><em>下次上课：</em><i>{{bindGroupCtl.groupDetail.newClassTime}}</i></p>\n" +
    "                                        <h5><img :src=\"bindGroupCtl.wechatCode\"></h5>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </template>\n" +
    "                <!--CST-->\n" +
    "                <div class=\"group_mes_box\" v-if=\"bindGroupCtl.groupType.cst\">\n" +
    "                    <div class=\"group-bind-head clearfix\">\n" +
    "                        <img :src=\"wxData.msgList[wxData.curUserId].isGroup ? wxData.localInfo.grouphead : wxData.msgList[wxData.curUserId].userInfo.img\"/>\n" +
    "                        <p class=\"cst-title\">{{ wxData.msgList[wxData.curUserId].userInfo.c_remark || wxData.msgList[wxData.curUserId].userInfo.nick }}</p>\n" +
    "                        <span class=\"cst-bind-btn\" @click=\"setGroupToClass('bind')\" v-show=\"classGroupInfo.bindBtn\">设置为班级群</span>\n" +
    "                        <span class=\"cst-bind-btn\" @click=\"setGroupToClass('unbind')\" v-show=\"!classGroupInfo.bindBtn\">取消设置</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"cst-con\">\n" +
    "                        <template v-if=\"!classGroupInfo.bindBtn\">\n" +
    "                            <div class=\"cst-btn-list\">\n" +
    "                                <span @click=\"setHWShow(wxData.curUserId)\">布置作业</span>\n" +
    "                                <span @click=\"homeWorkShow(wxData.curUserId)\">作业批改</span>\n" +
    "                                <span @click=\"homeWorkShowDetail(wxData.curUserId)\">作业汇总</span>\n" +
    "                            </div>\n" +
    "                        </template>\n" +
    "                        <template v-if=\"classGroupInfo.bindBtn\">\n" +
    "                            绑定后，批改作业相关功能才可以使用\n" +
    "                        </template>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <!--其他-->\n" +
    "\n" +
    "            </template>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- 知识库 -->\n" +
    "        <quick-con :is-show=\"!!wxData.curUserId\" :is-group=\"wxData.curUserId && wxData.msgList[wxData.curUserId].isGroup\" v-ref:quickCon></quick-con>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- 绑定弹层 -->\n" +
    "<div class=\"weixin_bind_bom\" v-if=\"bindCrm.showBindPop\" v-cloak>\n" +
    "    <div class=\"weixin_bind\">\n" +
    "        <span class=\"close\" @click=\"hideBindPop\"><i>x</i></span>\n" +
    "        <h3>绑定用户</h3>\n" +
    "        <i class=\"border\"></i>\n" +
    "        <form action=\"#\" @submit.prevent=\"bindSearch\" autocomplete=\"off\">\n" +
    "            <p class=\"search\">\n" +
    "                <!-- 电话号码或ID号 -->\n" +
    "                <input type=\"text\" class=\"text_bind\" placeholder=\"请输入电话号码或ID号搜索\" v-model=\"bindCrm.searchKey\">\n" +
    "                <input type=\"submit\" class=\"text_bind_sub\"/>\n" +
    "            </p>\n" +
    "            <p class=\"result\">\n" +
    "                <input type=\"text\" placeholder=\"搜索结果\" readonly :value=\"bindCrmSearchResult\"/>\n" +
    "            </p>\n" +
    "            <p class=\"sub_bind\" :class=\"{'sub_bind_dis' : bindCrm.searchResult.id == ''}\">\n" +
    "                <a href=\"javascript:void(0)\" @click=\"bindCrmFn\">绑定</a>\n" +
    "            </p>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--群组绑定-->\n" +
    "<div class=\"update_mask\" v-if=\"bindGroupCtl.showbindLayer\">\n" +
    "    <div class=\"bind-group-box\">\n" +
    "        <h5>绑定商品</h5>\n" +
    "        <i></i>\n" +
    "        <div class=\"input-in\">\n" +
    "            <label>商品&nbsp;&nbsp;&nbsp;ID</label>\n" +
    "            <input type=\"text\" placeholder=\"请输入商品ID\" v-model=\"bindGroupCtl.searchKey\">\n" +
    "            <span @click=\"bindGroupSearch\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"input-in\">\n" +
    "            <label>商品名称</label>\n" +
    "            <input type=\"text\" placeholder=\"搜索结果\" readonly :value=\"bindGroupSearchResult\">\n" +
    "        </div>\n" +
    "        <div class=\"btn_foot\" style=\"text-align: right\">\n" +
    "            <input type=\"button\" value=\"确定\" class=\"btn_sure\"\n" +
    "                   :class=\"{'btn_disable':this.bindGroupCtl.searchResult.name == ''}\"\n" +
    "                   :disabled=\"this.bindGroupCtl.searchResult.name == ''\" @click=\"bindGroupFn\"/>\n" +
    "            <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click=\"hideBindGroupLayer\"/>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- 选择联系人弹层 -->\n" +
    "<!-- <user-sel :sel-labels=\"labels\" :sel-data=\"wxData.msgList\" :local-info=\"wxData.localInfo\"></user-sel> -->\n" +
    "\n" +
    "<!-- 选择联系人模板 -->\n" +
    "<template id=\"weixin_sel_bom\">\n" +
    "    <div class=\"weixin_sel_bom\" :class=\"{'weixin_sel_getGroupChat':isGetGroupChat}\" v-if=\"selShow\">\n" +
    "        <div class=\"weixin_sel\">\n" +
    "            <h5>{{ selTitle }}</h5>\n" +
    "            <div class=\"sel_con clearfix\" :class=\"{'sel_con_msg':isGetGroup}\">\n" +
    "                <div class=\"sel_con_l\">\n" +
    "                    <div class=\"sel_input\">\n" +
    "                        <select v-model=\"selLabel\">\n" +
    "                            <option value=\"\">全部</option>\n" +
    "                            <template v-for=\"x in localInfo.labelList\">\n" +
    "                                <option :value=\"xx.tag_name\" v-for=\"xx in x\">\n" +
    "                                    {{xx.tag_name}}\n" +
    "                                </option>\n" +
    "                            </template>\n" +
    "                        </select>\n" +
    "                        <input type=\"text\" placeholder=\"搜索\" v-model=\"selFilter\"/>\n" +
    "                    </div>\n" +
    "                    <!-- 全选 -->\n" +
    "                    <div class=\"sel_all\" @click=\"selUserAll\">\n" +
    "                        全选&nbsp;&nbsp;<i :class=\"{'sel_seled':isSelUserAll}\"></i>\n" +
    "                    </div>\n" +
    "                    <!-- 勾选列表 -->\n" +
    "                    <ul class=\"sel_list\">\n" +
    "                        <li v-for=\"x in selLists\" @click=\"selUser(x)\" track-by=\"$index\">\n" +
    "                            <img :src=\"selData[x].isGroup ? localInfo.grouphead : selData[x].userInfo.img\"/>\n" +
    "                            <p>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</p>\n" +
    "                            <i :class=\"{'sel_seled': selSelect.indexOf(x) > -1}\"></i>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"sel_con_r\">\n" +
    "                    <p class=\"sel_tip\">\n" +
    "                        <span v-show=\"selSelect.length == 0\">请勾选需要选择的联系人</span>\n" +
    "                        <span v-else>已选择了{{ selSelect.length }}个联系人</span>\n" +
    "                    </p>\n" +
    "                    <ul class=\"sel_list\">\n" +
    "                        <li v-for=\"x in selSelect\" track-by=\"$index\">\n" +
    "                            <img :src=\"selData[x].isGroup ? localInfo.grouphead : selData[x].userInfo.img\"/>\n" +
    "                            <p>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</p>\n" +
    "                            <i @click=\"selDel(x)\"></i>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <!-- 输入框 -->\n" +
    "                    <div class=\"sel_msg\" v-if=\"isGetGroup\">\n" +
    "                        <textarea v-model=\"inputMsg\" placeholder=\"请在此输入\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"sel_foot clearfix\">\n" +
    "                <!-- 操作 -->\n" +
    "                <div v-if=\"!isPending.flag\">\n" +
    "                    <span class=\"sel_cancel\" @click=\"selCancel\">取消</span>\n" +
    "                    <!-- 群发 -->\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':selSelect.length == 0 || inputMsgVal == ''}\"\n" +
    "                          @click=\"selSure\" v-if=\"isGetGroup\">\n" +
    "                        开始群发\n" +
    "                        <em v-show=\"selSelect.length != 0\">({{ selSelect.length }})</em>\n" +
    "                    </span>\n" +
    "                    <!-- 其他 -->\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':selSelect.length == 0}\" @click=\"selSure\" v-else>\n" +
    "                        确定\n" +
    "                        <em v-show=\"selSelect.length != 0\">({{ selSelect.length }})</em>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <!-- 操作等待 -->\n" +
    "                <div v-else>\n" +
    "                    <span class=\"sel_sure sel_nosure\" v-if=\"!isPending.isSure\">{{ isPending.text }}</span>\n" +
    "                    <span v-else class=\"sel_sure sel_isSure\">{{ isPending.sureText }}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 编辑名字弹层 -->\n" +
    "<edit-name></edit-name>\n" +
    "<!-- 编辑名字弹层模板 -->\n" +
    "<template id=\"weixin_edit\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"editShow\">\n" +
    "        <div class=\"weixin_edit ani-pops\">\n" +
    "            <h5>修改{{ isGroup ? (isNicker ? '群昵称': '群名称') : '备注' }}</h5>\n" +
    "            <input type=\"text\" v-model=\"editvalue\"/>\n" +
    "            <p v-if=\"!isGroup && !isNicker\">备注名包含学员手机号或CRM账号系统将会自动绑定 </p>\n" +
    "            <div class=\"sel_foot clearfix\">\n" +
    "                <span class=\"sel_cancel\" @click=\"selCancel\">取消</span>\n" +
    "                <span class=\"sel_sure\" :class=\"{'sel_nosure':editValue == ''}\" @click=\"selSure(isNicker ? 'nicker' : '')\">确定</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 知识库 -->\n" +
    "<template id=\"quick_con\">\n" +
    "    <div class=\"user_mes_content\" v-if=\"isShow\">\n" +
    "        <dl class=\"user_mes_con\">\n" +
    "            <dt class=\"clearfix\">\n" +
    "                <div class=\"user_mes_sel\" tabIndex=\"-1\" @blur=\"selHide\">\n" +
    "                    <span @click=\"selShow\">{{ tagSel.selName || '请选择标签' }}</span>\n" +
    "                    <ul v-show=\"tagSel.selShow\">\n" +
    "                        <li v-for=\"x in tagSel.selData\" @click=\"getTag(x)\">{{ x.name }}</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <input type=\"text\" v-model=\"inputData\" debounce=\"500\"/>\n" +
    "                <div class=\"system-label\" v-if=\"!isGroup\">\n" +
    "                    <template v-for=\"y in tagList\">\n" +
    "                        <i :class=\"{'active':y.id == labelId}\"  @click=\"getTag(y)\">{{ y.name }}</i>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "            </dt>\n" +
    "            <dd>\n" +
    "                <p v-show=\"conLists.length == 0\">暂无信息</p>\n" +
    "                <ul v-else :class=\"{'isSearch' : isSearch}\">\n" +
    "                    <li v-for=\"x in conLists\" @click=\"sendQuickCon(x.content)\">\n" +
    "                        <h4>{{{ x._content || x.content }}}</h4>\n" +
    "                        <p>{{{ x._content || x.content }}}</p>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </dd>\n" +
    "        </dl>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 搜索 -->\n" +
    "<template id=\"user_search\">\n" +
    "    <div class=\"user_search\">\n" +
    "        <input type=\"text\" placeholder=\"\" v-model=\"selFilter\" @blur=\"searchHide\"/>\n" +
    "        <div class=\"user_search_result\" v-show=\"showSel\" @mouseenter=\"cannotHide\" @mouseleave=\"canHide\">\n" +
    "            <ul v-show=\"userListFilter.length != 0\">\n" +
    "                <li v-for=\"x in userListFilter\" track-by=\"$index\" @click=\"searchReturn(x)\">\n" +
    "                    <img :src=\"selData[x].isGroup ? localInfo.grouphead : selData[x].userInfo.img\"/>\n" +
    "                    <h6>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</h6>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <p v-else>找不到匹配的结果</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 分类 -->\n" +
    "<template id=\"user_type\">\n" +
    "    <div class=\"user_type\">\n" +
    "        <ul>\n" +
    "            <li @click=\"setType('')\" :class=\"{cur: listType == ''}\">全部</li>\n" +
    "            <template v-for=\"x in selLabels\">\n" +
    "                <li v-for=\"xx in x\" @click=\"setType(xx)\" :class=\"{cur: listType == xx}\">{{ xx }}</li>\n" +
    "            </template>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<template id=\"user_types\">\n" +
    "    <div class=\"user_type\" tabIndex=\"-1\" @blur=\"hideFn\">\n" +
    "        <h4 @click=\"showFn\">{{ showType }}</h4>\n" +
    "        <div class=\"wx_sel\" v-show=\"show\" style=\"display: none;\" transition=\"trans1\">\n" +
    "            <ul>\n" +
    "                <li @click=\"setType('')\">全部</li>\n" +
    "            </ul>\n" +
    "            <ul>\n" +
    "                <li @click=\"setType('todayFocus')\">今日关注</li>\n" +
    "            </ul>\n" +
    "            <ul v-for=\"x in localInfo.labelList\">\n" +
    "                <li v-for=\"xx in x\" @click=\"setType(xx.tag_name)\">\n" +
    "                    {{ xx.tag_name }}\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--<info-update :local-info=\"wxData.localInfo\" :nick-name=\"wxData.localInfo.nick_name\" :user-group=\"wxData.localInfo.user_group\" :device-id=\"wxData.localInfo.device_id\" :rank-list=\"wxData.localInfo.rank_list\"></info-update>-->\n" +
    "<info-update :local-info=\"wxData.localInfo\" :nick-name=\"wxData.localInfo.nick_name\" :user-group=\"wxData.localInfo.user_group\" :device-id=\"wxData.localInfo.device_id\" ></info-update>\n" +
    "<!-- 补充个人信息 -->\n" +
    "<template id=\"info_update\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"updateShow || initShow\">\n" +
    "        <div class=\"info_update ani-pops\">\n" +
    "            <h4>个人信息</h4>\n" +
    "            <dl>\n" +
    "                <dt>微信英文名</dt>\n" +
    "                <dd>\n" +
    "                    <input type=\"text\" placeholder=\"请输入您在微信里的英文名\" v-model=\"nickName\" />\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>设备编号</dt>\n" +
    "                <dd>\n" +
    "                    <input type=\"text\" placeholder=\"请输入手机设备编号\" v-model=\"deviceId\"/>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>用户类型</dt>\n" +
    "                <dd>\n" +
    "                    <select v-model=\"userGroup\">\n" +
    "                        <option value=\"\">请选择您的用户类型</option>\n" +
    "                        <option v-for=\"x in localInfo.userGroupList\" :value=\"x.id\">{{ x.name }}</option>\n" +
    "                    </select>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <!---->\n" +
    "            <dl v-show=\"false\">\n" +
    "                <dt>上级账号</dt>\n" +
    "                <dd>\n" +
    "                    <!--<input type=\"text\" placeholder=\"请输入上级账号，多个账号请用逗号分隔\" v-model=\"rankList\"/>-->\n" +
    "                    <input type=\"text\" placeholder=\"请输入上级账号，多个账号请用逗号分隔\" />\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>&nbsp;</dt>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate,'sel_int':initShow}\" @click=\"updateInfoFn\">确定</span>\n" +
    "                    <span class=\"sel_cancel\" @click=\"updateHide\" v-if=\"!initShow\" >取消</span>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<add-friend :local-info=\"wxData.localInfo\" v-ref:addFriend></add-friend>\n" +
    "<!-- 增加好友 -->\n" +
    "<template id=\"add_friend\">\n" +
    "    <div class=\"weixin_mask weixin_mask_addFri\" v-if=\"addFriendShow\">\n" +
    "        <div class=\"info_update ani-pops add_friend\">\n" +
    "            <h4>添加好友</h4>\n" +
    "            <!-- 卡片 -->\n" +
    "            <template v-if=\"type == 1\">\n" +
    "                <dl>\n" +
    "                    <dt>添加账号</dt>\n" +
    "                    <dd>\n" +
    "                        <input type=\"text\" placeholder=\"请输入微信账号或手机号\" v-model=\"wxAcc\"/>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <dl>\n" +
    "                    <dt>个人介绍</dt>\n" +
    "                    <dd>\n" +
    "                        <input type=\"text\" placeholder=\"请输入您的个人介绍\" v-model=\"wxDes\"/>\n" +
    "                        <div class=\"too-long\" v-if=\"longStrTip\">字数超过50个字的字数限制，请精简一下</div>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <dl>\n" +
    "                    <dt>&nbsp;</dt>\n" +
    "                    <dd class=\"sel_foot\">\n" +
    "                        <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate}\" @click=\"addFriendFn\">添加</span>\n" +
    "                        <span class=\"sel_cancel\" @click=\"addFriendHide\">取消</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "            </template>\n" +
    "\n" +
    "            <!-- 搜索 -->\n" +
    "            <template v-else>\n" +
    "                <template v-if=\"!toNext\">\n" +
    "                    <dl>\n" +
    "                        <dt>添加账号</dt>\n" +
    "                        <dd>\n" +
    "                            <input type=\"text\" placeholder=\"请输入微信账号或手机号\" v-model=\"wxAcc\"/>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>&nbsp;</dt>\n" +
    "                        <dd class=\"sel_foot\">\n" +
    "                            <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate}\" @click=\"addFriendNext\">下一步</span>\n" +
    "                            <span class=\"sel_cancel\" @click=\"addFriendHide\">取消</span>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                </template>\n" +
    "\n" +
    "                <template v-else>\n" +
    "                    <dl class=\"add_friend_info\">\n" +
    "                        <dt>好友信息</dt>\n" +
    "                        <dd>\n" +
    "                            <div class=\"add_friend_info_in\">\n" +
    "                                <img :src=\"wechat_img\" v-if=\"!!wechat_img\"/>{{ wechat_nick }}\n" +
    "                            </div>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>个人介绍</dt>\n" +
    "                        <dd>\n" +
    "                            <input type=\"text\" placeholder=\"请输入您的个人介绍\" v-model=\"wxDes\"/>\n" +
    "                            <div class=\"too-long\" v-if=\"longStrTip\">字数超过50个字的字数限制，请精简一下</div>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>设置备注</dt>\n" +
    "                        <dd>\n" +
    "                            <input type=\"text\" placeholder=\"对该好友进行备注\" v-model=\"remark\"/>\n" +
    "                            <!--<input type=\"text\" placeholder=\"对该好友进行备注\" v-model=\"wechat_nick\"/>-->\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                    <dl>\n" +
    "                        <dt>&nbsp;</dt>\n" +
    "                        <dd class=\"sel_foot\">\n" +
    "                            <span class=\"sel_sure\" :class=\"{'sel_nosure':!canUpdate}\" @click=\"addFriendFn\">添加</span>\n" +
    "                            <span class=\"sel_cancel\" @click=\"addFriendHide\">取消</span>\n" +
    "                        </dd>\n" +
    "                    </dl>\n" +
    "                </template>\n" +
    "            </template>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<div class=\"mask-bg-layer  trans1-transition\" v-if=\"addDelFriendInfo.show\">\n" +
    "    <div class=\"add-del-friend\">\n" +
    "        <h5>发送验证</h5>\n" +
    "        <span class=\"title-tip\"></span>\n" +
    "        <div>\n" +
    "            <dt>验证申请</dt>\n" +
    "            <dd>\n" +
    "                <textarea v-model=\"addDelFriendInfo.msg\">你好，我是您在{{ addDelFriendInfo.nameTitle }}，以后我们都用微信进行沟通，麻烦通过一下。</textarea>\n" +
    "                <div class=\"check-btn\">\n" +
    "                    <span class=\"btn confirm\" @click=\"sendAddFriendBtn\">发送</span>\n" +
    "                    <span class=\"btn concel\" @click=\"hideSendfriendBtn\">取消</span>\n" +
    "                </div>\n" +
    "            </dd>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<template id=\"addDelFriend\"></template>\n" +
    "<!-- 聊天工具 -->\n" +
    "<template id=\"chat_tools\">\n" +
    "    <ul class=\"chat_tools clearfix\">\n" +
    "        <send-face></send-face>\n" +
    "        <send-img></send-img>\n" +
    "        <send-article></send-article>\n" +
    "        <send-file></send-file>\n" +
    "        <send-voice v-ref:sendVoice></send-voice>\n" +
    "    </ul>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 发送图片 -->\n" +
    "<template id=\"send_img\">\n" +
    "    <li class=\"send_img\" id=\"send_img\">\n" +
    "        <em id=\"send_img_btn\" title=\"发送图片\"></em>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 发送表情 -->\n" +
    "<template id=\"send_face\">\n" +
    "    <li class=\"send_face\" tabIndex=\"-1\" @blur=\"sendFaceHide\">\n" +
    "        <em @click=\"sendFaceShow\" title=\"表情\"></em>\n" +
    "        <div class=\"face_panel\" v-show=\"show\" transition=\"trans2\">\n" +
    "            <span class=\"face_panel_arr\"></span>\n" +
    "            <ul class=\"face_con\">\n" +
    "                <li v-for=\"x in faceData\" v-show=\"x.type == curType\">\n" +
    "                    <!-- qq表情 -->\n" +
    "                    <div v-if=\"x.type == 0\" class=\"face_qq clearfix\">\n" +
    "                        <span v-for=\"xx in x.data\" :title=\"xx.slice(1,-1)\" class=\"qqface\" :class=\"'qqface'+$index\"\n" +
    "                              @click=\"sendFace(x.type,xx)\"></span>\n" +
    "                    </div>\n" +
    "                    <div v-else>其他表情</div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <ul class=\"face_type\">\n" +
    "                <li v-for=\"x in faceData\" :class=\"{'cur':x.type == curType}\" @click=\"changType(x.type)\">{{ x.des }}</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 发送文章 -->\n" +
    "<template id=\"send_article\">\n" +
    "    <li class=\"send_article\">\n" +
    "        <em id=\"send_article_btn\" @click=\"show\" title=\"发送文章\"></em>\n" +
    "        <div class=\"weixin_mask\" v-if=\"articleListShow\">\n" +
    "            <div class=\"send_article_box ani-pops\">\n" +
    "                <h4><span>文章</span></h4>\n" +
    "                <div class=\"send_article_inner\">\n" +
    "                    <div class=\"top-flex\">\n" +
    "                        <!--分类渲染-->\n" +
    "                        <ul class=\"con-change clearfix\">\n" +
    "                            <li :class=\"{'cut-tab': $index+1 == articleCurrentPage }\" v-for=\"x in navlist\" @click=\"getArticle($index+1)\">\n" +
    "                                {{ x }}\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                        <!--搜索-->\n" +
    "                        <div class=\"search-article\">\n" +
    "                            <input type=\"text\" placeholder=\"请输入关键词\" @keyup.enter=\"searchArticle\" v-model=\"searchKey\" />\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!--等待状态-->\n" +
    "                    <span class=\"loading\" v-show=\"isLoading\"></span>\n" +
    "                    <!--文章列表-->\n" +
    "                    <ul class=\"con-show\" v-else>\n" +
    "                        <template v-if=\"articleListData && (articleListData.length > 0)\">\n" +
    "                            <li v-for=\"x in articleListData\" @click=\"cutAticle($index)\"\n" +
    "                                :class=\"{'select-li': $index == curArticleIndex }\" title=\"{{x.introduction}}\">\n" +
    "                                <div class=\"up_box clearfix\">\n" +
    "                                    <div>\n" +
    "                                        <p>{{{x.title | filterKey}}}</p>\n" +
    "                                        <p>{{{x.introduction | filterKey}}}</p>\n" +
    "                                    </div>\n" +
    "                                    <div><img :src=\"x.icon\"></div>\n" +
    "                                    <a :href=\"x.link\" target=\"_blank\" title=\"{{x.title}}\">查看</a>\n" +
    "                                </div>\n" +
    "                                <!-- <div class=\"down_box clearfix\" :class=\"{'sel-bor': $index == curArticleIndex }\">\n" +
    "                                    <a :href=\"x.link\" target=\"_blank\" title=\"{{x.title}}\">{{x.link}}</a>\n" +
    "                                </div> -->\n" +
    "                            </li>\n" +
    "                        </template>\n" +
    "                        <template v-else>\n" +
    "                            <li class=\"li-none\">此分类下暂无相关文章!</li>\n" +
    "                        </template>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <!--分页-->\n" +
    "                <!--<div class=\"pages clearfix\">-->\n" +
    "                <!--&lt;!&ndash;<em>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;<a href=\"javascript:;\" >上一页</a>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;</em>&ndash;&gt;-->\n" +
    "                <!--<em>-->\n" +
    "                <!--<a v-for=\"x in articlePageCount\" href=\"javascript:;\" :class=\"{'cut': (x + 1) == articleCurrentPage }\" @click=\"getArticle(x+1)\">{{ x + 1 }}</a>-->\n" +
    "                <!--</em>-->\n" +
    "                <!--&lt;!&ndash;<em>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;<a href=\"javascript:;\" >下一页</a>&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;</em>&ndash;&gt;-->\n" +
    "                <!--</div>-->\n" +
    "                <div class=\"btn_foot\">\n" +
    "                    <input type=\"button\" value=\"确定\" class=\"btn_sure\"\n" +
    "                           :class=\"{'btn_disable':this.curArticleIndex == null}\"\n" +
    "                           :disabled=\"this.curArticleIndex == null\" @click.stop=\"sendArticle('normal')\"/>\n" +
    "                    <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click.stop=\"hide\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<crm-remark></crm-remark>\n" +
    "<!-- crm备注 -->\n" +
    "<template id=\"crm_remark\">\n" +
    "    <div class=\"weixin-mask\" v-if=\"isshow\">\n" +
    "        <div class=\"send_article_box crm_remark ani-pops\">\n" +
    "            <div class=\"close-layer-btn-right\" @click=\"hide\">\n" +
    "                <em></em>\n" +
    "            </div>\n" +
    "            <h4><span>备注内容</span></h4>\n" +
    "            <div class=\"mark-info\">\n" +
    "                <span class=\"add_tip\" v-show=\"showTip\">\n" +
    "                    您提交的信息将在5分钟之后显示\n" +
    "                </span>\n" +
    "                <div class=\"add-info-scroll\">\n" +
    "                    <table>\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>序号</th>\n" +
    "                            <th>备注内容</th>\n" +
    "                            <th>备注时间</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tr v-for=\"x in remarks\">\n" +
    "                            <td>{{ $index + 1 }}</td>\n" +
    "                            <td>{{ x.content }}</td>\n" +
    "                            <td>{{ x.add_time }}</td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <!--<ul>-->\n" +
    "                <!--<li v-for=\"x in remarks\">-->\n" +
    "                <!--<span>{{ $index + 1 }}</span>-->\n" +
    "                <!--<p :title=\"x.content\">{{ x.content }}</p>-->\n" +
    "                <!--</li>-->\n" +
    "                <!--</ul>-->\n" +
    "                <div class=\"add_remark\">\n" +
    "                    <div>\n" +
    "                        <input type=\"text\" v-model=\"inputData\"/>\n" +
    "                        <span :class=\"{'dis': this._inputData == ''}\" @click=\"addRemark\">添加</span>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <span :class=\"{'choose-show': demo}\" @click=\"addRemarkTime\">添加提醒时间：</span>\n" +
    "                        <em><i>{{selYear}}</i>年</em>\n" +
    "                        <select class=\"selMonth\" v-model=\"selMonth\">\n" +
    "                            <option v-for=\"x in 12\">{{x+1}}</option>\n" +
    "                        </select>\n" +
    "                        月\n" +
    "                        <select class=\"selDay\" v-model=\"selDay\">\n" +
    "                            <option v-for=\"x in 31\">{{x+1}}</option>\n" +
    "                        </select>\n" +
    "                        日\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!--<div class=\"btn_foot\">-->\n" +
    "            <!--<input type=\"button\" class=\"btn_cancel\" value=\"关闭\"/>-->\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</template>\n" +
    "\n" +
    "<!--发送文件-->\n" +
    "<template id=\"send_file\">\n" +
    "    <li class=\"send_file\">\n" +
    "        <label title=\"发送文件\">\n" +
    "            <input type=\"file\" id=\"send_file_button\"/>\n" +
    "        </label>\n" +
    "        <!--<p class=\"show-tip\">发送文件需要电脑管理员权限，如果无法发送，请到OA填写IT工单：<a href=\"http://172.16.0.252:8080/WOListView.do\" target=\"_blank\">http://172.16.0.252:8080/WOListView.do</a>。<i></i>-->\n" +
    "        <!--</p>-->\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!--发送语音-->\n" +
    "<template id=\"send_voice\">\n" +
    "    <li class=\"send_voice\">\n" +
    "        <em id=\"send_voice_btn\" @click=\"open\" title=\"发送语音\"></em>\n" +
    "        <div class=\"weixin_mask\" v-if=\"creat\" :class=\"{'voice_open': show}\">\n" +
    "            <!-- 录音flash -->\n" +
    "            <div class=\"recorderAppOuter\" :class=\"{'recorderOpen' : recorderOpen}\">\n" +
    "                <dl class=\"recorderTip\">\n" +
    "                    <dt>录音设置：</dt>\n" +
    "                    <dd>\n" +
    "                        1.点击允许，并勾选记住<br />\n" +
    "                        2.点击关闭按钮<br />\n" +
    "                        3.点击开始录音\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <object type=\"application/x-shockwave-flash\" id=\"recorderApp\" class=\"recorderApp\" name=\"recorderApp\" width=\"0\" height=\"0\" data=\"/recorder/recorder.swf\"></object>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"voice_con\">\n" +
    "                <!-- 录音第一步 -->\n" +
    "                <dl class=\"voice_con_step1\" v-if=\"!isStep2\">\n" +
    "                    <dt>点击按钮开始录音</dt>\n" +
    "                    <dd class=\"btn-area\">\n" +
    "                        <span class=\"btn-s1\" @click=\"start\">开始录音</span>\n" +
    "                        <span class=\"btn-s2\" @click=\"close1\">取消</span>\n" +
    "\n" +
    "                        <span v-if=\"pending\" class=\"btn-pending\">发送中...</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "                <!-- 录音第二步 -->\n" +
    "                <dl class=\"voice_con_step2\" v-else>\n" +
    "                    <dt v-if=\"!isOver\" class=\"recorder-tip\">\n" +
    "                    <p></p>\n" +
    "                    <span>录音中…{{ time }}秒</span>\n" +
    "                    </dt>\n" +
    "                    <dt v-else>\n" +
    "                        完成录音{{ timeLimit }}秒，已停止录音，是否发送？\n" +
    "                    </dt>\n" +
    "                    <dd class=\"btn-area\">\n" +
    "                        <span class=\"btn-s3\" @click=\"end\">结束并发送</span>\n" +
    "                        <span class=\"btn-s2\" @click=\"close2\">取消</span>\n" +
    "\n" +
    "                        <span v-if=\"pending\" class=\"btn-pending\">发送中...</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 粘贴发图 -->\n" +
    "<send-paste></send-paste>\n" +
    "<template id=\"send_paste\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"sendPasteShow\">\n" +
    "        <div class=\"info_update send_paste\">\n" +
    "            <h4>发送图片</h4>\n" +
    "            <div class=\"send_paste_inner\">\n" +
    "                <img :src=\"imgSrc\" v-if=\"imgSrc\"/>\n" +
    "                <span class=\"loading\" v-else></span>\n" +
    "            </div>\n" +
    "            <div class=\"btn_foot\">\n" +
    "                <input type=\"button\" :value=\"sureDisable ? '发送中...' : '确定'\" class=\"btn_sure\" @click=\"send\"\n" +
    "                       :class=\"{'btn_disable':sureDisable}\" :disabled=\"sureDisable\"/>\n" +
    "                <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click=\"hide\" v-if=\"!sureDisable\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<errors-tip :device-id=\"wxData.localInfo.device_id\"></errors-tip>\n" +
    "<!-- 异常弹层 -->\n" +
    "<template id=\"errors_tip\">\n" +
    "    <div class=\"error-tip\" v-if=\"errorsTipShow\">\n" +
    "        <!-- net error -->\n" +
    "        <template v-if=\"errors.netErr\">\n" +
    "            <div class=\"net-err\">\n" +
    "                <dt>\n" +
    "                    <i></i>\n" +
    "                    检查网络状态\n" +
    "                </dt>\n" +
    "                <dd>\n" +
    "                    请确认您的电脑网络正常后 请点击按钮\n" +
    "                    <span @click=\"reload\">重新连接</span>\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "        <!-- phone error -->\n" +
    "        <template v-else>\n" +
    "            <!--cc-->\n" +
    "            <div class=\"cc-err new-err\" v-show=\"isss||iscc\">\n" +
    "                <!-- <dt>\n" +
    "                    <i></i>\n" +
    "                    你的微信处于掉线状态\n" +
    "                </dt> -->\n" +
    "                <dd>\n" +
    "                    请稍等，黑鸟自动恢复中( <span class=\"red-font\">{{ bTime }}秒</span> )\n" +
    "                    <!-- <span class=\"red-font\">{{ bTime }}秒</span> 后重新 <span class=\"red-font\">刷新浏览器</span> -->\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "            <!--ss-->\n" +
    "            <!-- <div class=\"ss-err\" v-show=\"iscc\">\n" +
    "               <dt>\n" +
    "                   <i></i>\n" +
    "                   你的微信处于掉线状态，请尝试如下步骤\n" +
    "               </dt>\n" +
    "               <dd>\n" +
    "                   1、<span class=\"red-font\">{{ bTime }}秒</span> 后尝试 <span class=\"red-font\">刷新浏览器</span></br>\n" +
    "                   2、请双击苹果手机的Home键，杀掉微信进程，再 <span class=\"red-font\">打开微信</span></br>\n" +
    "                   3、确认 <span class=\"red-font\">连接公司WiFi</span>\n" +
    "               </dd>\n" +
    "           </div> -->\n" +
    "\n" +
    "            <div class=\"cc-err new-err\" v-show=\"errDetail\">\n" +
    "                <template v-if=\"isKickOff\">\n" +
    "                    <p class=\"reset-err\" v-if=\"resetError.send\">正在发起登录</p>\n" +
    "                    <p class=\"reset-err\" v-else :class=\"{'reset-err-i': resetError.show}\" @click=\"resetErr\">重新登录<span v-if=\"resetError.show\">( <em class=\"red-font\">{{ resetError.time }}秒</em>  )</span></p>\n" +
    "                </template>\n" +
    "                <template v-else>\n" +
    "                    <dd>\n" +
    "                        黑鸟未能自动恢复，请手动点击按钮重启\n" +
    "                    </dd>\n" +
    "                    <p class=\"reset-err\" v-if=\"resetError.send\">正在发起重启</p>\n" +
    "                    <p class=\"reset-err\" v-else :class=\"{'reset-err-i': resetError.show}\" @click=\"resetErr\">重启<span v-if=\"resetError.show\">( <em class=\"red-font\">{{ resetError.time }}秒</em>  )</span></p>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"err-detail\" v-show=\"showLast\">\n" +
    "                <dt class=\"fon18\">\n" +
    "                    <i></i>\n" +
    "                    <!--将微信账号复制后发到群里联系技术同学处理-->\n" +
    "                    将微信账号复制后发给技术同学处理，<span style=\"color:#f00\">不要截图</span>\n" +
    "                </dt>\n" +
    "                <dd>\n" +
    "                    微信账号 : {{ wechatId }}</br>\n" +
    "                    手机编号 : {{ deviceId }}\n" +
    "                    <!-- CRM账号：{{ crm}} -->\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--{{ deviceId }}-->\n" +
    "</template>\n" +
    "\n" +
    "\n" +
    "<!--版本升级-->\n" +
    "<update-wechat :client-version=\"wxData.clientVersion\" :cloud-version=\"wxData.cloudVersion\"></update-wechat>\n" +
    "<template id=\"update_wechat\">\n" +
    "    <div class=\"update_mask\" v-if=\"updataShow\">\n" +
    "        <div class=\"update_layer\">\n" +
    "            <h3>版本更新提示</h3>\n" +
    "            <p>发现新版的微信客户端，请更新客户端后才能继续使用。</p>\n" +
    "            <!--<p :clientVersion=\"wxData.clientVersion\">当前版本：{{clientVersion }}</p>-->\n" +
    "            <p>当前版本：{{ clientVersion }}</p>\n" +
    "            <p>最新版本：{{ cloudVersion }}</p>\n" +
    "            <div class=\"divs\" @click=\"onUpdate\" v-if=\"waiting\">立即升级</div>\n" +
    "            <div>升级中，请等待,后台更新中...</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--浏览器检测-->\n" +
    "<div class=\"update_mask2\">\n" +
    "    <div class=\"update_layer\">\n" +
    "        <h3>提示</h3>\n" +
    "        <p>请在chrome【谷歌】浏览器中使用聊天功能</p>\n" +
    "        <div class=\"divs\"><a href=\"https://www.google.com.hk/chrome/browser/desktop/index.html\" target=\"_blank\"\n" +
    "                             class=\"downlink\">下载 Chrome</a></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--退出托管-->\n" +
    "<logout :sel-list=\"wxData.userListPerson.slice()\" :sel-data=\"wxData.msgList\"></logout>\n" +
    "<!-- 选择联系人模板 -->\n" +
    "<template id=\"logout\">\n" +
    "    <div class=\"flex-mask z99\" v-if=\"logoutShow\">\n" +
    "        <div class=\"logout-sel ani-pops\">\n" +
    "            <span @click=\"selHide\" class=\"close-layer-btn-right\"><em></em></span>\n" +
    "            <h5>请选择中转账号</h5>\n" +
    "            <div class=\"search\">\n" +
    "                <input type=\"text\" placeholder=\"\" v-model=\"selFilter\"/>\n" +
    "                <i></i>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <ul class=\"sel_list\">\n" +
    "                    <li v-for=\"x in selLists\" @click=\"selUser(x)\" track-by=\"$index\">\n" +
    "                        <img :src=\"selData[x].userInfo.img\"/>\n" +
    "                        <p>{{ selData[x].userInfo.c_remark || selData[x].userInfo.nick }}</p>\n" +
    "                        <i :class=\"{'sel_seled': selSelect == x}\"></i>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"logout-btn\">\n" +
    "                <span class=\"btn-global default\" :class=\"{'disable': selSelect==''}\" @click=\"userLogoutTrust\">退出并中转</span>\n" +
    "                <span class=\"btn-global greey\" @click=\"userLogout\">退出</span>\n" +
    "            </div>\n" +
    "            <div class=\"bottom-tips\">\n" +
    "                备注：选择你的私人微信，黑鸟可以把你工作微信收到的信息中转到私人微信\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<fn-tab></fn-tab>\n" +
    "<!-- 复制到搜索框 -->\n" +
    "<template id=\"fn_tab\">\n" +
    "    <div class=\"fn_tab\" v-show=\"show\" :style=\"pos\" @click.stop=\"sendSelData\" tabindex=\"-1\" @blur=\"hide\">\n" +
    "        搜索\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<quick-tab></quick-tab>\n" +
    "<!--quick tab-->\n" +
    "<template id=\"quick_tab\">\n" +
    "    <ul class=\"quick_tab clearfix\" v-show=\"show\" :style=\"pos\" tabindex=\"-1\" @blur=\"hide\">\n" +
    "        <li @click=\"atUser\">@ TA</li>\n" +
    "        <li @click=\"privateChat\">私聊</li>\n" +
    "        <li @click=\"getChatList\">查看记录</li>\n" +
    "        <!--<li @click=\"delCutUser\" v-if=\"delShow.show\">删除</li>-->\n" +
    "        <li @click=\"delCutUser\">删除</li>\n" +
    "    </ul>\n" +
    "    <!--聊天记录-->\n" +
    "    <div class=\"weixin_mask\" v-if=\"showChatList\">\n" +
    "        <div class=\"group-user-chatlist\">\n" +
    "            <h3>\n" +
    "                <em @click=\"closeChatDetail\">&times;</em>\n" +
    "                <i></i>\n" +
    "            </h3>\n" +
    "            <h5><span>聊天记录</span></h5>\n" +
    "            <div class=\"chat-content\">\n" +
    "                <div class=\"chat-type\" class=\"clearfix\" v-for=\"x in chatListDetail\">\n" +
    "\n" +
    "                    <em class=\"chat-title\">{{x.name}} {{x.time}}</em>\n" +
    "                    <!--文字信息-->\n" +
    "                    <p v-if=\"x.cnt_type == 0\">{{ x.content }}</p>\n" +
    "                    <!--@人-->\n" +
    "                    <pre v-if=\"x.cnt_type == 3100\" class=\"mes_con\">{{{ x.content.content }}}</pre>\n" +
    "                    <!--followtime-->\n" +
    "                    <pre v-if=\"x.cnt_type == 4000\" class=\"mes_con\">{{{ 'Follow提醒内容：' + x.content }}}</pre>\n" +
    "                    <!--课前提醒-->\n" +
    "                    <pre v-if=\"x.cnt_type == 5000\" class=\"mes_con\">{{{ x.content.content }}}</pre>\n" +
    "                    <!-- 图片消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 1\" class=\"mes_con mes_img\">\n" +
    "                        <a rel=\"gallery\" :href=\"x.content.split(',')[1] || x.content\">\n" +
    "                            <img :src=\"x.content.split(',')[0] || x.content\" class=\"weichat_img\"/>\n" +
    "                        </a>\n" +
    "                    </p>\n" +
    "                    <!-- 图片上传消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 9999\" class=\"mes_con mes_img weichat_img_up\">\n" +
    "                        <!-- 真实url -->\n" +
    "                        <a rel=\"gallery\" :href=\"x.content[1]\">\n" +
    "                            <!-- base64 -->\n" +
    "                            <img :src=\"x.content[0]\" class=\"weichat_img\"/>\n" +
    "                        </a>\n" +
    "                    </p>\n" +
    "                    <!-- 语音消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 2\" class=\"mes_con mes_voice mes-history-voice\" @click=\"playVoice2(x.content)\"\n" +
    "                       :class=\"{'mes_voice_isplaying':x.content == voicePlay2.playVoiceSrc2 }\"></p>\n" +
    "                    <!-- 名片消息 -->\n" +
    "                    <div v-if=\"x.cnt_type == 42 && typeof x.content == 'object'\" class=\"mes_con mes_card\">\n" +
    "                        <div class=\"mes_con_t\">\n" +
    "                            <img :src=\"x.content._smallheadimgurl\" class=\"fl\"/>\n" +
    "                            <div class=\"mes_con_c fl\">\n" +
    "                                <h4>{{ x.content._nickname }}</h4>\n" +
    "                                <p>{{ x.content.alias }}</p>\n" +
    "                            </div>\n" +
    "                            <!--<em class=\"fl\"></em>-->\n" +
    "                        </div>\n" +
    "                        <p class=\"mes_con_b\">个人名片</p>\n" +
    "                    </div>\n" +
    "                    <!-- 兼容老的名片历史记录 -->\n" +
    "                    <pre class=\"mes_con\" v-if=\"x.cnt_type == 42 && typeof x.content == 'string'\">{{x.content | paser $index}}</pre>\n" +
    "                    <!-- 收文章消息 -->\n" +
    "                    <div v-if=\"x.cnt_type == 495\" class=\"mes_con mes-share-article\">\n" +
    "                        <div class=\"mes_con_box\">\n" +
    "                            <a :href=\"x.content.urlStr\" target=\"_blank\">\n" +
    "                                <div><img :src=\"x.content.thumbUrl\"/></div>\n" +
    "                                <div>\n" +
    "                                    <h4>{{ x.content.title }}</h4>\n" +
    "                                    <p>{{ x.content.desc }}</p>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- 文件消息 -->\n" +
    "                    <div v-if=\"x.cnt_type == 6000  && typeof x.content == 'object'\" class=\"mes_con mes_file\">\n" +
    "                        <div class=\"mes_con_t\">\n" +
    "                            <div class=\"mes_con_c fl\">\n" +
    "                                <a :href=\"x.content.url\" :title=\"x.content.title\"></a>\n" +
    "                                <p>{{ x.content.title}}</p>\n" +
    "                            </div>\n" +
    "                            <em class=\"fr\" :class=\"getFileClass(x.content.url)\"></em>\n" +
    "                        </div>\n" +
    "                        <p class=\"mes_con_b\">{{ x.content.size/1024 | _parseInt }}KB</p>\n" +
    "                    </div>\n" +
    "                    <!-- 视频消息 -->\n" +
    "                    <p v-if=\"x.cnt_type == 6001  && typeof x.content == 'object'\" class=\"mes_con mes-video\">\n" +
    "                        <video :src=\"x.content.url\" controls></video>\n" +
    "                        <!--<i></i>-->\n" +
    "                    </p>\n" +
    "                    <!-- 其他消息 -->\n" +
    "                    <pre v-if=\"contentType.types.indexOf((x.cnt_type + '')) == -1\"\n" +
    "                         class=\"mes_con\">{{{ x.content }}}</pre>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"voice_play\">\n" +
    "        <audio id=\"voiceMsgPlayer2\" preload=\"metadata\" :src=\"voicePlay2.voiceSrc2\" @playing=\"isPlaying\"\n" +
    "               @ended=\"isEnded\"></audio>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--群主转让-->\n" +
    "<change-owner></change-owner>\n" +
    "<template id=\"changeGroupOwner\">\n" +
    "    <div class=\"flex-mask z99\" v-if=\"show\">\n" +
    "        <div class=\"group-owner-change\" v-show=\"showlayer\">\n" +
    "            <h5>选择新群主</h5>\n" +
    "            <div class=\"search-owner\">\n" +
    "                <input type=\"text\" v-model=\"search\">\n" +
    "                <span></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <ul class=\"group-user-list\">\n" +
    "                    <li v-for=\"x in selLists\" @click=\"selUser(x.wechat_id,x)\" track-by=\"$index\" v-if=\"x.wechat_id.split('$')[1] != groupOwnner\">\n" +
    "                        <img :src=\"x.wechat_img\"/>\n" +
    "                        <p>{{ x.wechat_nick }}</p>\n" +
    "                        <i :class=\"{'sel': sel ==x.wechat_id }\"></i>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"new-owner-btn\">\n" +
    "                <span class=\"btn-global default\" :class=\"{'disable': sel == ''}\" @click=\"setNewOwner\">确定</span>\n" +
    "                <span class=\"btn-global greey\" @click=\"hideChangeOwner\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"change-owner-ok\" v-show=\"showOk\">转让成功</div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--群公告-->\n" +
    "<group-announce></group-announce>\n" +
    "<template id=\"groupAnnounce\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops group-announce-layer clearfix\">\n" +
    "            <h4>群公告</h4>\n" +
    "            <textarea placeholder=\"请在此处输入需要发布的公告内容\" v-model=\"annContent\"></textarea>\n" +
    "            <div class=\"btn_foot announce-pad\">\n" +
    "                <input type=\"button\" value=\"确定\" class=\"btn_sure\" :class=\"{'btn_disable':this.annContent == ''}\"\n" +
    "                       :disabled=\"this.annContent == ''\" @click.stop=\"sendAnnounce\"/>\n" +
    "                <input type=\"button\" class=\"btn_cancel\" value=\"取消\" @click.stop=\"hide\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--我的学员-->\n" +
    "<my-study></my-study>\n" +
    "<template id=\"myStudyLayer\">\n" +
    "    <div class=\"weixin-mask-low\" v-if=\"show\">\n" +
    "        <div class=\"study-box\">\n" +
    "            <div class=\"top-box\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\">\n" +
    "                <span class=\"fl\">查询时间：</span>\n" +
    "                <span class=\"fl\">\n" +
    "                    <div class=\"input-wrap\">\n" +
    "                        <input type=\"text\" class=\"input middle-input\"  onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\" id=\"studyStartTime\">\n" +
    "                    </div>\n" +
    "                </span>\n" +
    "                <span class=\"fl\">至</span>\n" +
    "                <span class=\"fl\">\n" +
    "                    <div class=\"input-wrap\">\n" +
    "                        <input type=\"text\" class=\"input middle-input\" onclick=\"layui.laydate({elem: this})\"  v-model=\"endTime\" id=\"studyEndTime\">\n" +
    "                    </div>\n" +
    "                </span>\n" +
    "                <span class=\"fl study-time-btn\" @click=\"checkType('')\">搜索</span>\n" +
    "                <span class=\"close-layer-btn-right\" @click=\"hideMyStudy\"><em></em></span>\n" +
    "            </div>\n" +
    "\n" +
    "                <div class=\"con-box\">\n" +
    "                    <div class=\"change-desk\" v-if=\"cc\">\n" +
    "                        <ul>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 1 }\" @click=\"checkType('classA')\">已体验</li>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 2 }\" @click=\"checkType('classB')\">已约课</li>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 4 }\" @click=\"checkType('classD')\">缺席与取消</li>\n" +
    "                            <li :class=\"{ 'cut' : cutBtn.appoint_status == 3 }\" @click=\"checkType('classC')\">未约课</li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <template v-if=\"hasStudy\">\n" +
    "                        <table>\n" +
    "                            <thead>\n" +
    "                            <tr>\n" +
    "                                <th></th>\n" +
    "                                <th>名称</th>\n" +
    "                                <th>CRM</th>\n" +
    "                                <th>注册时间</th>\n" +
    "                                <template v-if=\"cc\">\n" +
    "                                    <th>体验课时间</th>\n" +
    "                                </template>\n" +
    "                                <template v-else>\n" +
    "                                    <th>Leads分配时间</th>\n" +
    "                                </template>\n" +
    "                                <th>手机</th>\n" +
    "                                <th>操作</th>\n" +
    "                            </tr>\n" +
    "                            </thead>\n" +
    "                            <tbody>\n" +
    "                            <tr v-for=\"x in curStudyList\">\n" +
    "                                <td class=\"sel-user\" :class=\"{'sel-wait':x.add_user_status == 1}\">\n" +
    "                                    <label v-if=\"x.is_friend == 0 && x.add_user_status == 0\" :class=\"{'cut-sel': cutSelUserList.indexOf(x.user_id) > -1 }\">\n" +
    "                                        <input type=\"checkbox\" class=\"set-style\" :value=\"x.user_id\" v-model=\"cutSelUserList\">\n" +
    "                                    </label>\n" +
    "                                </td>\n" +
    "                                <td>{{x.nick_name}}</td>\n" +
    "                                <td>{{x.user_id}}</td>\n" +
    "                                <td>{{x.add_time}}</td>\n" +
    "\n" +
    "                                <template v-if=\"cc\">\n" +
    "                                    <!--明后天-->\n" +
    "                                    <template v-if=\"x.date_type == 5\">\n" +
    "                                        <td class=\"class-a\">后天 {{ x.appoint_time | m_d_h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <template v-if=\"x.date_type == 4\">\n" +
    "                                        <td class=\"class-a\">明天 {{ x.appoint_time | h_m}}</td>\n" +
    "                                    </template>\n" +
    "                                    <!--今天-->\n" +
    "                                    <template v-if=\"x.date_type == 3\">\n" +
    "                                        <td class=\"class-b\">今天 {{ x.appoint_time | h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <!--昨天-->\n" +
    "                                    <template v-if=\"x.date_type == 2\">\n" +
    "                                        <td class=\"class-c\">昨天 {{ x.appoint_time | h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <template v-if=\" x.date_type == 1\">\n" +
    "                                        <td class=\"class-c\">前天 {{ x.appoint_time | h_m }}</td>\n" +
    "                                    </template>\n" +
    "                                    <!--默认-->\n" +
    "                                    <template  v-if=\"x.date_type == 0\">\n" +
    "                                        <td>{{ x.appoint_time | m_d_h_m }}</td>\n" +
    "                                    </template>\n" +
    "\n" +
    "                                </template>\n" +
    "                                <template v-else>\n" +
    "                                    <td>{{x.dispatch_time}}</td>\n" +
    "                                </template>\n" +
    "\n" +
    "                                <td>{{x.mobile}}</td>\n" +
    "                                <td>\n" +
    "                                    <div>\n" +
    "                                        <template v-if=\"x.is_friend == 0\">\n" +
    "                                            <span class=\"mark\" @click=\"crmRemarkTable(x.user_id)\">\n" +
    "                                                <p class=\"mark-info\" v-if=\"x.remark_log\">\n" +
    "                                                    {{ x.remark_log }}\n" +
    "                                                </p>\n" +
    "                                            </span>\n" +
    "                                            <span class=\"tel\" @click=\"telphone(x.user_id)\"></span>\n" +
    "                                            <span class=\"add\" @click=\"goAddFriend(x.mobile,x.user_id,'fromMyStudy',cutBtn.appoint_status)\">\n" +
    "                                                添加\n" +
    "                                                <em v-if=\"x.add_count > 0\">{{ x.add_count }}次</em>\n" +
    "                                            </span>\n" +
    "                                            <span class=\"status\" v-show=\"x.add_user_status == 2\" title=\"通过该手机号无法搜索到学员微信，请电话联系学员\"></span>\n" +
    "                                        </template>\n" +
    "                                        <template v-else>\n" +
    "                                            <span class=\"chat\" @click=\"studyChat(x.wechat_id)\">开始聊天</span>\n" +
    "                                        </template>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </template>\n" +
    "                    <template v-else>\n" +
    "                        <h5>暂无学员信息</h5>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "            <div class=\"study-btn-style clearfix\">\n" +
    "                <template v-if=\"hasStudy\">\n" +
    "                    <template v-if=\"cutSelUserList.length\">\n" +
    "                        <div class=\"add-sel-list default\" @click=\"selStudyList\" >\n" +
    "                            批量添加\n" +
    "                            <span>({{ cutSelUserList.length }})</span>\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                    <template v-else>\n" +
    "                        <div class=\"add-sel-list greey\" v-else>\n" +
    "                            批量添加\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                    <page></page>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--我的好友-->\n" +
    "<my-friend></my-friend>\n" +
    "<template id=\"myFriend\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"myfriend-box\">\n" +
    "            <span class=\"close-layer-btn-right\" @click=\"hide\"><em></em></span>\n" +
    "            <h5>新的好友</h5>\n" +
    "            <div class=\"friend-box-in\">\n" +
    "                <template v-if=\"pending\">\n" +
    "                    <p class=\"none\">加载中...</p>\n" +
    "                </template>\n" +
    "                <template v-else>\n" +
    "                    <ul v-if=\"list.length != 0\">\n" +
    "                        <li v-for=\"x in list\">\n" +
    "                            <img :src=\"x.headimgurl\" class=\"fl\"/>\n" +
    "                            <div class=\"fl friend-tit\">\n" +
    "                                <h6 title=\"{{ x.nickname }}\">{{ x.nickname }}</h6>\n" +
    "                                <p title=\"对方请求添加你为好友：{{ x.content }}\">{{ x.content }}</p>\n" +
    "                                <p>来源：{{ x.source }}</p>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"fr friend-op\">\n" +
    "                                <template v-if=\"x.encryptusername != ''\">\n" +
    "                                    <em @click=\"accept(x.encryptusername)\" style=\"float: right\">接受</em>\n" +
    "                                </template>\n" +
    "                                <template v-else>\n" +
    "                                    <span>已接受</span>\n" +
    "                                </template>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                    <p v-else class=\"none\">暂无新的好友</p>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 批改作业 -->\n" +
    "<home-work v-ref:homework></home-work>\n" +
    "<!-- 批改作业 -->\n" +
    "<template id=\"homeWork\">\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreShow\">\n" +
    "        <div class=\"info_update info_update_homework\">\n" +
    "            <h4>是否添加分数</h4>\n" +
    "            <p class=\"score_tip\">该分数不会显示在批改后的图片上，黑鸟系统会将该分数存<br/>下来用于生成学生的分数曲线，该功能之后会上线。</p>\n" +
    "            <dl>\n" +
    "                <dd>\n" +
    "                    <input type=\"number\" placeholder=\"请在此处输入该同学的作业分数\" v-model=\"score\"/>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure' : _score == ''}\" @click=\"sendScore\">添加分数</span>\n" +
    "                    <a class=\"sel_force\" href=\"javascript:void(0);\" @click=\"sendScore(true)\"\n" +
    "                       v-if=\"_score == ''\">直接发送</a>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <span class=\"close-btn\" @click=\"hideScore\">x</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreAudioShow\">\n" +
    "        <span id=\"paintConClose\" @click=\"scoreAudioHide\"></span>\n" +
    "        <span class=\"paintConPage paintConPageLeft\" id=\"paintConPageLeft\" @click=\"editGo('l');\"></span>\n" +
    "        <span class=\"paintConPage paintConPageRight\" id=\"paintConPageRight\" @click=\"editGo('r');\"></span>\n" +
    "        <div class=\"home-work-edit\">\n" +
    "            <div class=\"wx_pop hw_edit\" style=\"display: none;\" v-show=\"isReEdit\">\n" +
    "                <dl class=\"wx_pop_in wx_pop_alert\">\n" +
    "                    <dt>该学生作业已被批改，是否重新批改？</dt>\n" +
    "                    <dd>\n" +
    "                        <span class=\"wx_pop_sure\" @click=\"hideReEdit\">确定</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "            </div>\n" +
    "            <span id=\"paintConInfo\">{{ groupData[editKey].wechat_nick }}的作业</span>\n" +
    "            <div class=\"home-work-edit-con\">\n" +
    "                <!-- 语音 -->\n" +
    "                <template v-if=\"list[editKey][edit$Key].message_type == 2\">\n" +
    "                    <p class=\"mes_audio\" @click=\"playVoice(list[editKey][edit$Key].content)\" :class=\"{'mes_voice_isplaying':list[editKey][edit$Key].content == voicePlay.playVoiceSrc }\"></p>\n" +
    "                </template>\n" +
    "                <!-- 视频 -->\n" +
    "                <template v-if=\"list[editKey][edit$Key].message_type == 6001\">\n" +
    "                    <video :src=\"getJson(list[editKey][edit$Key].content).url\" controls></video>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "            <div class=\"home-work-edit-comment\">\n" +
    "                <textarea placeholder=\"请在此处输入评语\" v-model=\"audioText\"></textarea>\n" +
    "                <span :class=\"{'sel_nosure' : _audioText == ''}\" @click=\"checkListAudio\">发送</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"home-work\">\n" +
    "            <span class=\"home-work-close\" @click=\"hide\"></span>\n" +
    "            <h4>作业批改</h4>\n" +
    "            <div class=\"home-work-in\">\n" +
    "                <div class=\"home-work-time clearfix\">\n" +
    "                    <div class=\"home-work-time-in\">\n" +
    "                        <input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\"\n" +
    "                               id=\"_startTime\"/><span>至</span><input type=\"text\" onclick=\"layui.laydate({elem: this})\"\n" +
    "                                                                     v-model=\"endTime\" id=\"_endTime\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" @click=\"getHomeWork\" class=\"home-work-time-btn\">查询</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"home-work-con\">\n" +
    "                    <audio id=\"voiceMsgPlayer3\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\"\n" +
    "                           @ended=\"isEnded\"></audio>\n" +
    "                    <template v-if=\"pending\">\n" +
    "                        <p class=\"none\">加载中...</p>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <template v-else>\n" +
    "                        <p v-if=\"list.length == 0\" class=\"none\">暂无班级作业信息</p>\n" +
    "\n" +
    "                        <div class=\"home-work-list\" v-else>\n" +
    "\n" +
    "                            <dl v-for=\"(key, x) in list\" v-if=\"!!groupData[key]\">\n" +
    "                                <dt>\n" +
    "                                    <img :src=\"(groupData[key] && groupData[key].wechat_img) || groupheader\"/>\n" +
    "                                </dt>\n" +
    "\n" +
    "                                <dd>\n" +
    "                                    <h6>{{ (groupData[key] && groupData[key].wechat_nick) || key }}</h6>\n" +
    "\n" +
    "                                    <div class=\"home-work-list-in\">\n" +
    "\n" +
    "                                        <ul class=\"clearfix\" v-if=\"x.length > 0\">\n" +
    "                                            <li v-for=\"xx in x\" v-if=\"$key != 'length'\"\n" +
    "                                                @mouseenter=\"shList(0 ,key, $key);\" @mouseleave=\"shList(1 ,key, $key);\">\n" +
    "                                                <!-- 图片 -->\n" +
    "                                                <template v-if=\"xx.message_type == 1\">\n" +
    "                                                    <p class=\"mes_img\">\n" +
    "                                                        <img :src=\"xx.content.split(',')[0] || xx.content\"\n" +
    "                                                             :id=\"'edit_img' + $key\"/>\n" +
    "                                                    </p>\n" +
    "                                                    <span class=\"todo img-edit\" v-show=\"xx.showTool\"\n" +
    "                                                          @click=\"editList(key, $key, xx.message_type);\"\n" +
    "                                                          :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 语音 -->\n" +
    "                                                <template v-if=\"xx.message_type == 2\">\n" +
    "                                                    <p class=\"mes_voice\" @click=\"playVoice(xx.content)\"\n" +
    "                                                       :class=\"{'mes_voice_isplaying':xx.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "\n" +
    "                                                    <span class=\"todo audio-edit\" v-show=\"xx.showTool\"\n" +
    "                                                          @click=\"editList(key, $key, xx.message_type);\" :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 视频 -->\n" +
    "                                                <template v-if=\"xx.message_type == 6001\">\n" +
    "                                                    <p class=\"mes_video\">\n" +
    "                                                        <video :src=\"getJson(xx.content).url\"></video>\n" +
    "                                                    </p>\n" +
    "\n" +
    "                                                    <span class=\"todo audio-edit\" v-show=\"xx.showTool\"\n" +
    "                                                          @click=\"editList(key, $key, xx.message_type);\" :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <div class=\"time\">\n" +
    "                                                    <i>{{ xx.add_time }}</i>\n" +
    "                                                </div>\n" +
    "\n" +
    "                                                <span class=\"done\" v-if=\"xx.status == 1\">\n" +
    "                                                    <p>已批改</p>\n" +
    "                                                    <em></em>\n" +
    "                                                </span>\n" +
    "\n" +
    "                                                <span class=\"del\" v-show=\"xx.showTool\"\n" +
    "                                                      @click=\"delList(key, $key)\">x</span>\n" +
    "                                            </li>\n" +
    "                                        </ul>\n" +
    "\n" +
    "                                        <p class=\"home-work-list-nodone\" v-else>这位同学的作业还没有提交，别忘了提醒他快点交作业哦～</p>\n" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip\"\n" +
    "                                           @click=\"homeWorkTip(key);\">作业提醒</a>\n" +
    "                                    </div>\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 批改作业单人 -->\n" +
    "<home-work-one v-ref:homeworkone></home-work-one>\n" +
    "<!-- 批改作业单人 -->\n" +
    "<template id=\"homeWorkOne\">\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreShow\">\n" +
    "        <div class=\"info_update info_update_homework\">\n" +
    "            <h4>是否添加分数</h4>\n" +
    "            <p class=\"score_tip\">该分数不会显示在批改后的图片上，黑鸟系统会将该分数存<br/>下来用于生成学生的分数曲线，该功能之后会上线。</p>\n" +
    "            <dl>\n" +
    "                <dd>\n" +
    "                    <input type=\"number\" placeholder=\"请在此处输入该同学的作业分数\" v-model=\"score\"/>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure' : _score == ''}\" @click=\"sendScore\">添加分数</span>\n" +
    "                    <a class=\"sel_force\" href=\"javascript:void(0);\" @click=\"sendScore(true)\"\n" +
    "                       v-if=\"_score == ''\">直接发送</a>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <span class=\"close-btn\" @click=\"hideScore\">x</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"home-work-score\" v-if=\"scoreAudioShow\">\n" +
    "        <span id=\"paintConClose\" @click=\"scoreAudioHide\"></span>\n" +
    "        <span class=\"paintConPage paintConPageLeft\" id=\"paintConPageLeft\" @click=\"editGo('l');\"></span>\n" +
    "        <span class=\"paintConPage paintConPageRight\" id=\"paintConPageRight\" @click=\"editGo('r');\"></span>\n" +
    "        <div class=\"home-work-edit\">\n" +
    "            <div class=\"wx_pop hw_edit\" style=\"display: none;\" v-show=\"isReEdit\">\n" +
    "                <dl class=\"wx_pop_in wx_pop_alert\">\n" +
    "                    <dt>该学生作业已被批改，是否重新批改？</dt>\n" +
    "                    <dd>\n" +
    "                        <span class=\"wx_pop_sure\" @click=\"hideReEdit\">确定</span>\n" +
    "                    </dd>\n" +
    "                </dl>\n" +
    "            </div>\n" +
    "            <span id=\"paintConInfo\">{{ groupData[editKey].c_remark || groupData[editKey].nick }}的作业</span>\n" +
    "            <div class=\"home-work-edit-con\">\n" +
    "                <!-- 语音 -->\n" +
    "                <template v-if=\"list[editKey][edit$Key].message_type == 2\">\n" +
    "                    <p class=\"mes_audio\" @click=\"playVoice(list[editKey][edit$Key].content)\" :class=\"{'mes_voice_isplaying':list[editKey][edit$Key].content == voicePlay.playVoiceSrc }\"></p>\n" +
    "                </template>\n" +
    "                <!-- 视频 -->\n" +
    "                <template v-if=\"list[editKey][edit$Key].message_type == 6001\">\n" +
    "                    <video :src=\"getJson(list[editKey][edit$Key].content).url\" controls></video>\n" +
    "                </template>\n" +
    "            </div>\n" +
    "            <div class=\"home-work-edit-comment\">\n" +
    "                <textarea placeholder=\"请在此处输入评语\" v-model=\"audioText\"></textarea>\n" +
    "                <span :class=\"{'sel_nosure' : _audioText == ''}\" @click=\"checkListAudio\">发送</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"home-work\">\n" +
    "            <span class=\"home-work-close\" @click=\"hide\"></span>\n" +
    "            <h4>作业批改</h4>\n" +
    "            <div class=\"home-work-in\">\n" +
    "                <div class=\"home-work-time clearfix\">\n" +
    "                    <div class=\"home-work-time-in\">\n" +
    "                        <input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\" id=\"_startTime\" /><span>至</span><input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"endTime\" id=\"_endTime\" />\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" @click=\"getHomeWork\" class=\"home-work-time-btn\">查询</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"home-work-con\">\n" +
    "                    <audio id=\"voiceMsgPlayer3\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\" @ended=\"isEnded\"></audio>\n" +
    "                    <template v-if=\"pending\">\n" +
    "                        <p class=\"none\">加载中...</p>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <template v-else>\n" +
    "                        <p v-if=\"list.length == 0\" class=\"none\">暂无作业信息</p>\n" +
    "\n" +
    "                        <div class=\"home-work-list\" v-else>\n" +
    "\n" +
    "                            <dl v-for=\"(key, x) in list\" v-if=\"!!groupData[key]\">\n" +
    "                                <dt>\n" +
    "                                    <img :src=\"groupData[key].img\" />\n" +
    "                                </dt>\n" +
    "\n" +
    "                                <dd>\n" +
    "                                    <h6>{{ groupData[key].c_remark || groupData[key].nick }}</h6>\n" +
    "\n" +
    "                                    <div class=\"home-work-list-in\">\n" +
    "\n" +
    "                                        <ul class=\"clearfix\" v-if=\"x.length > 0\">\n" +
    "                                            <li v-for=\"xx in x\" v-if=\"$key != 'length'\" @mouseenter=\"shList(0 ,key, $key);\" @mouseleave=\"shList(1 ,key, $key);\">\n" +
    "                                                <!-- 图片 -->\n" +
    "                                                <template v-if=\"xx.message_type == 1\">\n" +
    "                                                    <p class=\"mes_img\" >\n" +
    "                                                        <img :src=\"xx.content.split(',')[0] || xx.content\" :id=\"'edit_img' + $key\" />\n" +
    "                                                    </p>\n" +
    "                                                    <span class=\"todo img-edit\" v-show=\"xx.showTool\" @click=\"editList(key, $key, xx.message_type);\" :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 语音 -->\n" +
    "                                                <template v-if=\"xx.message_type == 2\">\n" +
    "                                                    <p class=\"mes_voice\" @click=\"playVoice(xx.content)\" :class=\"{'mes_voice_isplaying':xx.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "\n" +
    "                                                    <span class=\"todo audio-edit\" v-show=\"xx.showTool\" @click=\"editList(key, $key, xx.message_type);\" :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 视频 -->\n" +
    "                                                <template v-if=\"xx.message_type == 6001\">\n" +
    "                                                    <p class=\"mes_video\">\n" +
    "                                                        <video :src=\"getJson(xx.content).url\"></video>\n" +
    "                                                    </p>\n" +
    "\n" +
    "                                                    <span class=\"todo audio-edit\" v-show=\"xx.showTool\"\n" +
    "                                                          @click=\"editList(key, $key, xx.message_type);\" :class=\"{'cur-edit' : $key == cur$key}\">批改</span>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <div class=\"time\">\n" +
    "                                                    <i>{{ xx.add_time }}</i>\n" +
    "                                                </div>\n" +
    "\n" +
    "                                                <span class=\"done\" v-if=\"xx.status == 1\">\n" +
    "                                                    <p>已批改</p>\n" +
    "                                                    <em></em>\n" +
    "                                                </span>\n" +
    "\n" +
    "                                                <span class=\"del\" v-show=\"xx.showTool\" @click=\"delList(key, $key)\">x</span>\n" +
    "                                            </li>\n" +
    "                                        </ul>\n" +
    "\n" +
    "                                        <p class=\"home-work-list-nodone\" v-else>这位同学的作业还没有提交，别忘了提醒他快点交作业哦～</p>\n" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip\" @click=\"homeWorkTip(key);\">作业提醒</a>\n" +
    "                                    </div>\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 作业汇总 -->\n" +
    "<home-work-detail></home-work-detail>\n" +
    "<!-- 作业汇总 -->\n" +
    "<template id=\"homeWorkDetail\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"isShow\">\n" +
    "        <div class=\"home-work-pop\" v-show=\"hwShow\">\n" +
    "            <span class=\"home-work-pop-close\" @click=\"hwHideFn\"></span>\n" +
    "            <iframe :src=\"hwSrc\"></iframe>\n" +
    "        </div>\n" +
    "        <div class=\"home-work\">\n" +
    "            <span class=\"home-work-close\" @click=\"hide\"></span>\n" +
    "            <h4>作业汇总</h4>\n" +
    "            <div class=\"home-work-in\">\n" +
    "                <div class=\"home-work-time clearfix\">\n" +
    "                    <div class=\"home-work-time-in\">\n" +
    "                        <input type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"startTime\" id=\"_startTime_2\"/><span>至</span><input\n" +
    "                                type=\"text\" onclick=\"layui.laydate({elem: this})\" v-model=\"endTime\" id=\"_endTime_2\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" @click=\"getHomeWork\" class=\"home-work-time-btn\">查询</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"home-work-con\">\n" +
    "                    <audio id=\"voiceMsgPlayer4\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\"\n" +
    "                           @ended=\"isEnded\"></audio>\n" +
    "                    <template v-if=\"pending\">\n" +
    "                        <p class=\"none\">加载中...</p>\n" +
    "                    </template>\n" +
    "\n" +
    "                    <template v-else>\n" +
    "                        <p v-if=\"list.length == 0\" class=\"none\">暂无作业汇总信息</p>\n" +
    "\n" +
    "                        <div class=\"home-work-list\" v-else>\n" +
    "                            <dl v-for=\"(key, x) in list\" v-if=\"!!groupData[key]\">\n" +
    "                                <dt>\n" +
    "                                    <img :src=\"(groupData[key] && groupData[key].wechat_img) || groupheader\"/>\n" +
    "                                </dt>\n" +
    "\n" +
    "                                <dd>\n" +
    "                                    <h6>{{ (groupData[key] && groupData[key].wechat_nick) || key }}</h6>\n" +
    "\n" +
    "                                    <div class=\"home-work-list-in\">\n" +
    "\n" +
    "                                        <ul class=\"clearfix\" v-if=\"x.length > 0\">\n" +
    "                                            <li v-for=\"xx in x\" v-if=\"$key != 'length'\">\n" +
    "                                                <!-- 图片 -->\n" +
    "                                                <template v-if=\"xx.message_type == 1\">\n" +
    "                                                    <p class=\"mes_img\">\n" +
    "                                                        <img :src=\"xx.content\"/>\n" +
    "                                                    </p>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 音频 -->\n" +
    "                                                <template v-if=\"xx.message_type == 2\">\n" +
    "                                                    <p class=\"mes_voice\" @click=\"playVoice(xx.content)\"\n" +
    "                                                       :class=\"{'mes_voice_isplaying':xx.content == voicePlay.playVoiceSrc }\"></p>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <!-- 视频 -->\n" +
    "                                                <template v-if=\"xx.message_type == 6001\">\n" +
    "                                                    <p class=\"mes_video\">\n" +
    "                                                        <video :src=\"getJson(xx.content).url\"></video>\n" +
    "                                                    </p>\n" +
    "                                                </template>\n" +
    "\n" +
    "                                                <span class=\"done\">\n" +
    "                                                    <p>已批改</p>\n" +
    "                                                    <em></em>\n" +
    "                                                </span>\n" +
    "\n" +
    "                                                <div class=\"time\">\n" +
    "                                                    <i>{{ xx.add_time }}</i>\n" +
    "                                                </div>\n" +
    "\n" +
    "                                            </li>\n" +
    "                                        </ul>\n" +
    "\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip\" @click=\"preview(key);\">预览</a>\n" +
    "                                        <a href=\"javascript:void(0);\" class=\"home-work-list-tip home-work-list-send\"\n" +
    "                                           @click=\"send(key);\">发送</a>\n" +
    "                                    </div>\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </template>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--设置自动发送-->\n" +
    "<auto-send></auto-send>\n" +
    "<template id=\"autoSend\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops set-auto-send\">\n" +
    "            <h4>设置自动发送内容</h4>\n" +
    "            <ul>\n" +
    "                <li v-if=\"this.setTime.walkhalf.text != ''\">\n" +
    "                    <span :class=\"{'sure-sel':this.setTime.walkhalf.val != 0}\" @click=\"setTimeCheck('walkhalf')\"></span>\n" +
    "                    <p>{{ setTime.walkhalf.text }}</p>\n" +
    "                </li>\n" +
    "                <li v-if=\"this.setTime.walkhour.text != ''\">\n" +
    "                    <span :class=\"{'sure-sel':this.setTime.walkhour.val != 0}\" @click=\"setTimeCheck('walkhour')\"></span>\n" +
    "                    <p>{{ setTime.walkhour.text }}</p>\n" +
    "                </li>\n" +
    "                <li v-if=\"this.setTime.walkcut.text != ''\">\n" +
    "                    <span :class=\"{'sure-sel':this.setTime.walkcut.val != 0}\" @click=\"setTimeCheck('walkcut')\"></span>\n" +
    "                    <p>{{ setTime.walkcut.text }}</p>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div class=\"btn-foot\">\n" +
    "                <span class=\"btn-ok\" @click=\"confirmBtn\">确定并完成设置</span>\n" +
    "                <span @click=\"conselBtn\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- loading -->\n" +
    "<div class=\"heck_loading\" v-show=\"loading.show\">\n" +
    "    <div class=\"heck_loading_in\">\n" +
    "        <div class=\"heck_loader load3\">\n" +
    "            <span class=\"loader\"></span>\n" +
    "        </div>\n" +
    "        <p>正在发送中...</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"edit-img\"></div>\n" +
    "\n" +
    "<!-- 分享到朋友圈 -->\n" +
    "<div class=\"flex-mask z99\" v-if=\"shareArticle.show\" v-cloak>\n" +
    "    <div class=\"info_update ani-pops share-article\">\n" +
    "        <h4>分享到朋友圈</h4>\n" +
    "        <template v-if=\"shareArticle.title\">\n" +
    "            <textarea type=\"text\" placeholder=\"在此输入分享到朋友圈的话\" v-model=\"shareArticle.dig\"></textarea>\n" +
    "            <div class=\"article-style clearfix\">\n" +
    "                <dt><img :src=\"shareArticle.icon\"></dt>\n" +
    "                <dd>\n" +
    "                    <p>{{ shareArticle.title }}</p>\n" +
    "                    <p>{{ shareArticle.desc }}</p>\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "        <template v-if=\"shareArticle.videoUrl\">\n" +
    "            <div class=\"article-style clearfix\">\n" +
    "                <dt>\n" +
    "                    <video :src=\"shareArticle.videoUrl\"></video>\n" +
    "                    <span></span></dt>\n" +
    "                <dd>\n" +
    "                    <textarea class=\"dig\" type=\"text\" placeholder=\"在此输入分享到朋友圈的话\" v-model=\"shareArticle.dig\"></textarea>\n" +
    "                </dd>\n" +
    "            </div>\n" +
    "        </template>\n" +
    "\n" +
    "        <div class=\"btn-foot\">\n" +
    "            <span class=\"btn-ok\" @click=\"shareArticleBtn\">发表分享</span>\n" +
    "            <span @click=\"hideShareBtn\">取消</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--分页组件-->\n" +
    "<!--<page></page>-->\n" +
    "<template id=\"page\">\n" +
    "    <ul class=\"pagination page-study\">\n" +
    "        <li v-show=\"current != 1\" @click=\"current-- && goto(current)\"><a href=\"#\">上一页</a></li>\n" +
    "        <li v-for=\"index in pages\" @click=\"goto(index)\" :class=\"{'active':current == index}\" :key=\"index\">\n" +
    "            <a href=\"#\">{{index}}</a>\n" +
    "        </li>\n" +
    "        <li v-show=\"allpage != current && allpage != 0 \" @click=\"current++ && goto(current++)\"><a href=\"#\">下一页</a></li>\n" +
    "    </ul>\n" +
    "</template>\n" +
    "\n" +
    "<!--个人信息二维码弹层-->\n" +
    "<div class=\"flex-mask z99\" v-show=\"personalInfo.personalMask\">\n" +
    "    <div class=\"net-err personal-info\">\n" +
    "        <span class=\"close-layer-btn-right\" @click=\"hidePersonalMask\"><em></em></span>\n" +
    "        <h5 class=\"yellow-title\">\n" +
    "            个人信息\n" +
    "        </h5>\n" +
    "        <div class=\"show-per-detail\">\n" +
    "            <div class=\"per-text clearfix\">\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <dt>昵称</dt>\n" +
    "                    <dd>{{ personalInfo.nick }}</dd>\n" +
    "                </div>\n" +
    "                <div class=\"show-copy\">\n" +
    "                    <dt>微信号</dt>\n" +
    "                    <dd class=\"copytext\" @click=\"copyWechatText\" id=\"wechatName\">\n" +
    "                        {{ personalInfo.wechat_username }}\n" +
    "                    </dd>\n" +
    "                    <em>鼠标点击复制微信号</em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"per-img clearfix\" @mouseover=\"showCopyBtn\"  @mouseleave=\"hideCopyBtn\">\n" +
    "                <span class=\"copy-success\" v-show=\"personalInfo.copyWechatImg\">复制成功</span>\n" +
    "                <img :src=personalInfo.qrcode_url />\n" +
    "                <span class=\"copy-img\" v-show=\"personalInfo.copyImgBtn\" @click=\"copyImgBtn\">右击【复制图片】</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--当前学员微信信息-->\n" +
    "<cut-user-detail></cut-user-detail>\n" +
    "<template id=\"cutUserDetail\">\n" +
    "    <div class=\"flex-mask z99\" v-show=\"show\">\n" +
    "        <div class=\"net-err personal-info cut-user-detail\">\n" +
    "            <span class=\"close-layer-btn-right\" @click=\"hideCutMask\"><em></em></span>\n" +
    "            <h5 class=\"yellow-title\">\n" +
    "                个人信息\n" +
    "            </h5>\n" +
    "            <div class=\"show-per-detail\">\n" +
    "                <div class=\"per-text\">\n" +
    "                    <div  class=\"jianju\">\n" +
    "                        <dt>昵称</dt>\n" +
    "                        <dd :title=\"details.nickname\">\n" +
    "                            <i>{{ details.nickname }}</i>\n" +
    "                            <span :class=\"{'meal':details.gender == 1,'femeal':details.gender == 2, 'no':details.gender == 0}\"></span>\n" +
    "                        </dd>\n" +
    "                    </div>\n" +
    "                    <div class=\"jianju\">\n" +
    "                        <dt>微信号</dt>\n" +
    "                        <dd :title=\"details.weixinhao\">{{ details.weixinhao }}</dd>\n" +
    "                    </div>\n" +
    "                    <div class=\"jianju\">\n" +
    "                        <dt>来源</dt>\n" +
    "                        <dd :title=\"details.source\">{{ details.source }}</dd>\n" +
    "                    </div>\n" +
    "                    <div class=\"jianju\">\n" +
    "                        <dt>电话</dt>\n" +
    "                        <dd>\n" +
    "                            <p v-for=\"x in details.phonenumbers\">{{x}}</p>\n" +
    "                        </dd>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--转介绍二维码-->\n" +
    "<div class=\"flex-mask z99\" v-show=\"introImg.show\">\n" +
    "    <div class=\"intro-wechat\">\n" +
    "        <span class=\"close-layer-btn-right\" @click=\"introWechat('close')\"><em></em></span>\n" +
    "        <h5 class=\"yellow-title\">\n" +
    "            转介绍二维码\n" +
    "        </h5>\n" +
    "        <div class=\"intro-wechat-img\">\n" +
    "            <img :src=\"introImg.img\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"intro-wechat-btn\">\n" +
    "            <span class=\"btn-global default\" @click=\"introWechatImg\">发送</span>\n" +
    "            <span class=\"btn-global greey\" @click=\"introWechat('close')\">取消</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<!--被迫掉线-->\n" +
    "<div class=\"flex-mask repeat-enter-layer\"  v-show=\"wxData.repeatEnter\">\n" +
    "    <div class=\"net-err repeat-enter\">\n" +
    "        <dt><i></i></dt>\n" +
    "        <dd>你很可能重复打开了黑鸟</br>请确认只打开一个黑鸟窗口后重新刷新页面</dd>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--设置班级群-->\n" +
    "<div class=\"flex-mask z99\" v-show=\"classGroupInfo.show\">\n" +
    "    <div class=\"class-group-bind\">\n" +
    "        <div class=\"class-group-bind-tip\">是否设置该群为班级群</div>\n" +
    "        <div class=\"class-group-confirm\">\n" +
    "            <span class=\"btn confirm\" @click=\"confirmClassGroup('yes')\">确定</span>\n" +
    "            <span class=\"btn concel\" @click=\"confirmClassGroup('no')\">取消</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--黑鸟注意事项-->\n" +
    "<div class=\"flex-mask z99\" v-show=\"blackUseTip\">\n" +
    "    <div class=\"black-bird-tips\">\n" +
    "        <span class=\"close-layer-btn-right\"><em  @click=\"blackUseTips('hide')\" transition=\"trans1\"></em></span>\n" +
    "        <h5>重点注意事项</h5>\n" +
    "        <div class=\"tips-a\">\n" +
    "            1、 <span>绝不能</span>进行还原系统，抹机的操作；</br>\n" +
    "            2、 <span>绝不能</span>删除预先安装的app及修改配置；</br>\n" +
    "            3、 <span>绝不能</span>升级iOS系统；</br>\n" +
    "            4、 <span>不能</span>升级为苹果App Store中的微信，等待黑鸟微信的更新提示；</br>\n" +
    "            5、 尽量不要让手机重启，断电关机；</br>\n" +
    "            6、 如果使用Apple ID登陆了苹果App Store，确保<span>不要</span>开启“查找我的iPhone”。\n" +
    "        </div>\n" +
    "        <div class=\"tips-b\">\n" +
    "            温馨提醒：</br>\n" +
    "            1、 请每个人在群里的名片备注名字+所在组+座位号；</br>\n" +
    "            2、 遇到问题第一时间在群里：描述问题、提供微信ID、座位号；</br>\n" +
    "            3、 定期更新Google chrome浏览器至最新版本。\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<set-hw></set-hw>\n" +
    "<!-- 设置作业 -->\n" +
    "<template id=\"setHW\">\n" +
    "    <div class=\"weixin_mask\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops set-hw\">\n" +
    "            <h4>布置作业</h4>\n" +
    "            <dl>\n" +
    "                <dt>上传作业</dt>\n" +
    "                <dd class=\"set-hw-list\">\n" +
    "                    <span class=\"set-loading\" v-if=\"showLoading\">上传中...</span>\n" +
    "                    <ul>\n" +
    "                        <li v-for=\"x in list\">\n" +
    "                            <img :src=\"x\" />\n" +
    "                        </li>\n" +
    "                        <li class=\"set-hw-upload\" id=\"set-hw-upload\">\n" +
    "                            <em id=\"set-hw-upload-btn\"></em>\n" +
    "                            <p>\n" +
    "                                <span></span>\n" +
    "                                点击上传\n" +
    "                            </p>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>&nbsp;</dt>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':sel_nosure}\" @click=\"subHW\">布置</span>\n" +
    "                    <span class=\"sel_cancel\" @click=\"hide\">取消</span>\n" +
    "                    <div class=\"sending-hw\" v-if=\"sending\">发送中...</div>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--托管-->\n" +
    "<instead></instead>\n" +
    "<template id=\"instead\">\n" +
    "    <div class=\"weixin_mask weixin_mask_addFri\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops add_friend\">\n" +
    "            <h4>托管面板</h4>\n" +
    "            <dl>\n" +
    "                <dt>被托管账号</dt>\n" +
    "                <dd>\n" +
    "                    <input type=\"text\" placeholder=\"请输入被托管人员CRM\" v-model=\"crm\"/>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <dl>\n" +
    "                <dt>&nbsp;</dt>\n" +
    "                <dd class=\"sel_foot\">\n" +
    "                    <span class=\"sel_sure\" :class=\"{'sel_nosure':crm == ''}\" @click=\"submitCrm\">托管</span>\n" +
    "                    <span class=\"sel_cancel\" @click=\"hide\">取消</span>\n" +
    "                </dd>\n" +
    "            </dl>\n" +
    "            <div class=\"bottom-tips\">备注：托管可以把你黑鸟里的学员交由其他人代为服务</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--发送课程链接-->\n" +
    "<send-class></send-class>\n" +
    "<template id=\"sendLink\">\n" +
    "    <div class=\"weixin_mask weixin_mask_addFri\" v-if=\"show\">\n" +
    "        <div class=\"info_update ani-pops add_friend\">\n" +
    "            <h4>发送课程链接</h4>\n" +
    "            <div class=\"send-class-link\">\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <span>课程名称：</span>\n" +
    "                    <p>{{className}}</p>\n" +
    "                </div>\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <span>教材链接：</span>\n" +
    "                    <p><a :href=\"classLink\" target=\"_blank\">{{classLink}}</a></p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"send-class-btn\">\n" +
    "                <span class=\"btn-global default\"  @click=\"sendLink\">确定</span>\n" +
    "                <span class=\"btn-global greey\" @click=\"hide\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--推荐学员-->\n" +
    "<recommend></recommend>\n" +
    "<template id=\"recommend\">\n" +
    "    <div class=\"flex-mask z99\" v-if=\"show\">\n" +
    "        <div class=\"recommend\">\n" +
    "            <h5 class=\"yellow-title\">推荐学员</h5>\n" +
    "            <div class=\"rec-input\">\n" +
    "                <label>被推荐人手机号*</label>\n" +
    "                <input type=\"tel\" placeholder=\"必填\" v-model=\"recMoble\">\n" +
    "            </div>\n" +
    "            <div class=\"rec-input\">\n" +
    "                <label>备注</label>\n" +
    "                <input type=\"text\" placeholder=\"选填\" v-model=\"des\">\n" +
    "            </div>\n" +
    "            <div class=\"rec-btn\">\n" +
    "                <span class=\"btn-global default\" :class=\"{'disable': recMoble == ''}\" @click=\"addRecomd\">确定</span>\n" +
    "                <span class=\"btn-global greey\" @click=\"hide\">取消</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<label-editor></label-editor>\n" +
    "<!-- 打标签 -->\n" +
    "<template id=\"labelEditor\">\n" +
    "    <div class=\"label-editor\" v-show=\"show\" :class=\"{'vis': showvis}\" style=\"display: none;\" :style=\"pos\" @blur=\"blurHide\" tabIndex=\"-1\">\n" +
    "        <!-- 系统标签 -->\n" +
    "        <ul v-if=\"sysList.length > 0\" class=\"is-sys\">\n" +
    "            <li v-for=\"x in sysList\" :title=\"x.tag_brief\">\n" +
    "                {{ x.tag_name }}\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <!-- 自定义标签 -->\n" +
    "        <template v-for=\"x in labelList\">\n" +
    "            <ul v-if=\"$key != 1\">\n" +
    "                <li v-for=\"xx in x\" :title=\"xx.tag_brief\" :class=\"{'sel' : labelData.indexOf(xx.id) > -1}\" @click=\"editLabel(xx)\">\n" +
    "                    <span></span>\n" +
    "                    {{ xx.tag_name }}\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </template>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!-- 小助手消息弹层 -->\n" +
    "<helper-link></helper-link>\n" +
    "<template id=\"helperLink\">\n" +
    "    <div class=\"weixin_mask helper-link\" v-if=\"show\">\n" +
    "        <div class=\"home-work\">\n" +
    "            <span class=\"home-work-close\" @click=\"close\"></span>\n" +
    "            <h4>{{ data.title }}</h4>\n" +
    "            <div class=\"home-work-in\">\n" +
    "                <iframe :src=\"data.link\" frameborder=\"0\">\n" +
    "\n" +
    "                </iframe>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</template>\n" +
    "\n" +
    "<!--语音播放-->\n" +
    "<div class=\"voice_play\">\n" +
    "    <audio id=\"voiceMsgPlayer\" preload=\"metadata\" :src=\"voicePlay.voiceSrc\" @playing=\"isPlaying\" @ended=\"isEnded\"></audio>\n" +
    "</div>"; 
// END 