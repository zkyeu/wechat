define(function(require,exports){
	var $delet = $(".delet");
	var $add_stu_confirm = $(".add_stu_confirm");
	var h = document.body.scrollHeight;
	var $close_confirm = $(".close_confirm");
	var $agent_close_confirm = $(".agent_close_confirm");
	var $add_confirm = $(".add_confirm");
	var $agent_add_confirm = $(".agent_add_confirm");
	var $stu_add = $(".stu_add");
	var $agent_stu_add = $(".agent_stu_add");
	var $add_s = $(".add_s");
	var $add_sure = $(".add_sure");
	var $agent_add_sure = $(".agent_add_sure");
	var $stu_error = $(".stu_error");
	var $textarea = $add_confirm.find("textarea");
	var $agent_textarea = $agent_add_confirm.find("textarea");
	var checkAll = $('#checkAll');
	var deleteFrom = $('#deleteFrom');
	
	showError = function(flag,t){
		$stu_error.css("visibility", (flag ? "hidden" : "visible") ).find("span").html( (flag ? "" : t) );
	},
	testreg = new RegExp("(^[\u4E00-\u9FA5\u4dae]{2,10}$)"),
	agent_testreg = new RegExp("(^[\u4E00-\u9FA5\u4dae]{2,10}&1[0-9]{10}$)");
	closefn = function(){
		$add_stu_confirm.hide();
		$add_confirm.hide();
		$textarea.val("");
		showError(true);
	}
	agentclosefn = function(){
		$add_stu_confirm.hide();
		$agent_add_confirm.hide();
		$agent_textarea.val("");
		showError(true);
	}
//删除信息
	$delet.click(function(){
		var self = $(this)
		if(confirm("确认删除？")){
			window.location.assign(self.attr("_url"));
		}
		
	});
	$add_stu_confirm.css({'height':h});
//关闭弹窗
	$close_confirm.click(closefn);
	$agent_close_confirm.click(agentclosefn);
//点击添加学生
	$stu_add.click(function(){
		$add_stu_confirm.show();
		$add_confirm.show();
	});
// 代理商添加另外添加弹窗
	$agent_stu_add.click(function(){
		$add_stu_confirm.show();
		$agent_add_confirm.show();
	});
//空白页添加学生
	$add_s.click(function(){
		$add_stu_confirm.show();
		$add_confirm.show();
	});
//点击确定
	$add_sure.click(function(){
		var self = $(this),
			form = self.closest("form"),
			textarea = form.find("textarea"),
			name = form.find("[name=name]");
		var $text_val = textarea.val();
		if($text_val == ""){
			return showError(false,"请输入学生姓名");
		}

		var $text_val_arr = $text_val.split("\n"),
			result = [],
			flag = true;
		$($text_val_arr).each(function(i,v){
			if(v == "") return true;
			if(!testreg.test( v.replace(/\s/g,""))){
				showError(false,"请输入正确学生姓名");
				flag = false;
				return false;	
			}
			result.push(v);
		});

		if(flag) showError(true),name.val(encodeURIComponent(result.join(","))),form.get(0).submit();
	});

// 代理商添加另外添加弹窗

    //agent_testreg = new RegExp("(^[\\u4e00-\\u9fa5]{2,10}&1[0-9]{10}$)")
    var agent_test1 = new RegExp("(^[\\u4e00-\\u9fa5]{2,10}$)");
    var agent_test2 = new RegExp("(^1[0-9]{10}$)");
    var agent_test3 = new RegExp("(^[\\u4e00-\\u9fa5]{2,10}&1[0-9]{10})");
	$agent_add_sure.click(function(){
		var self = $(this),
			form = self.closest("form"),
			textarea = form.find("textarea"),
			name = form.find("[name=name]");
		var $text_val = textarea.val();
		if($text_val == ""){
			return showError(false,"请输入学生姓名以及手机号");
		}

		var $text_val_arr = $text_val.split("\n"),
			result = [],
			flag = true;
		$($text_val_arr).each(function(i,v){
			if(v == "") return true;
			var _v = v.replace(/\s/g,"");
			console.log(_v);
			console.log(_v.indexOf("&"));
			if(_v.indexOf("&")==-1) {
				showError(false,'"'+_v+'"'+"有错，汉字和手机号需要通过“&”符号连接");
				flag = false;
				return false;
			}

			var Chinese = _v.split("&")[0];
			console.log(Chinese);
			if(!agent_test1.test(Chinese)){
		    	showError(false,'"'+_v+'"'+"有错，请输入正确学生姓名");
				flag = false;
				return false;
			}
			var number = _v.split("&")[1];
			//console.log(number[i]);

			if(!agent_test2.test(number)){
		    	showError(false,'"'+_v+'"'+"有错，请输入正确手机号");
				flag = false;
				return false;
			}

			var index = $text_val.indexOf(number);
			if(index != -1 && index != $text_val.lastIndexOf(number)){
		    	showError(false,'"'+_v+'"'+"手机号有重复");
				flag = false;
				return false;
			}

			result.push(v);
		});

		if(flag) showError(true),name.val(encodeURIComponent(result.join(","))),form.get(0).submit();
	});

	checkAll.on('click',function(){
		$(this).parents('table').find('.check-s').prop('checked',this.checked);
		if(this.checked){
			impIdFn.call($(this));
		}else{
			$('#imp-id').val('');
		}
	});
	function impIdFn(){
		var impId = "";
		var length = $(this).parents('table').find('.check-s').length;
		this.parents('table').find('.check-s').each(function(i){
			if(this.checked){
				var splitChar = i == length-1 ? "" : ",";
				impId += $(this).val()+splitChar;
			}
			
		});
		$('#imp-id').val(impId);
	}
	$('table').on('click', '.check-s',function(){
		if(!this.checked){
			checkAll.prop('checked',false);

		}
		impIdFn.call($(this));
		
	});
	
	$('#deleteBtn').on('click',function(){
		var allFalg = true;
		$('table').find('.check-s').each(function(i){
			if(this.checked){
				allFalg = false;
			}
		});
		if(allFalg == true){
			$.confirm({msg: "请选择要删除的学生！"});
		}else{
			$.confirm({msg: "确认删除选中的学生名单？",type:'confirm',fnSure:function(){
				deleteFrom.submit();
			}});
			allFalg = false;
		}
	});



	 //confirm弹层
    $.extend({
        confirm: function(option) {
            var msg = option.msg,
                type = option.type || 'alert',
                sSure = option.sureText || "确定",
                sCancel = option.cancelText || "取消",
                isReverse = option.isReverse || false,
                fnCancel = option.fnCancel || function(){},
                fnSure = option.fnSure || function(){},
                addClass = option.addClass || "";
            if ($("#m-confirm").length) {
                $("#m-confirm").show().find(".bd p:first").html(msg).end().find(".jsSure").html(sSure).end().find(".jsCancel").html(sCancel);
            } else {
                var sConfirm = '<div class="m-alert '+addClass+'" id="m-confirm" style="display:block;">' +
                        '<div class="in">' +
                        '<div class="hd">' +
                        '<a class="close" href="javascript:;" title="关闭"></a>' +
                        '<h4>温馨提示</h4>' +
                        '</div>' +
                        '<div class="bd">' +
                        '<p class="f-tac">'+msg+'</p>' +
                        '</div>' +
                        '<div class="ft f-tac">' +
                        '<span class="u-btn jsCancel">' + sCancel + '</span>' +
                        '<i>&nbsp;&nbsp;</i>' +
                        '<span class="u-btn jsSure" id="sureId">' + sSure + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                $("body").append(sConfirm);
            }

            if(type == 'alert'){
                
                $("#m-confirm").find(".ft i").hide();
                $("#m-confirm").find(".jsCancel").hide();
            }else{
                
                var oI=$("#m-confirm").find(".ft i");
                $("#m-confirm").find(".jsCancel").show();
                oI.show();

                if(!isReverse){
                    oI.after($("#m-confirm").find(".jsSure"));
                    oI.before($("#m-confirm").find(".jsCancel"));
                }else{
                    oI.after($("#m-confirm").find(".jsCancel"));
                    oI.before($("#m-confirm").find(".jsSure"));
                }
            }
            
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnCancel && fnCancel.call(this);
            });
            $("#m-confirm").find(".jsSure").unbind("click").bind("click", function () {
                $("#m-confirm").hide();
                fnSure && fnSure();
            });
        },
        jsInputOk: function (){
            $('body').on('focus','.jsInputOk',function(){
                $(this).next().next().hide();
            }).on('blur','.jsInputOk',function(){
                var val = $.trim($(this).val());
                if(val == ''){
                    $(this).next().next().show();
                }
                if($(this).hasClass("tel")){
                    if(!reRule.tel.re.test(val)){
                        $(this).next().next().show();
                    }
                }
                if($(this).hasClass("email")){
                    if(!reRule.email.re.test(val)){
                        $(this).next().next().show();
                    }
                }
                if($(this).hasClass("telemailword")){
                    if(!reRule.telemailword.re.test(val)){
                        $(this).next().next().show();
                    }
                }
            })
        },
        createInput: function(obj) {
            var str = '<div class="info-content"><div class="label"><span>' 
                + obj.label 
                + '</span></div><div class="info-txt"><input class="txt jsBlank" type="text" name="'
                + obj.name
                + '" placeholder="'
                + obj.holder
                + '"/><p class="err-tips"><i class="err-icon"></i><span>'
                + obj.tip
                + '</span></p></div></div>';
            return str;
        },
        createOption: function (obj){
            var str = '';
            for (key in obj)
                str += '<option value="' + obj[key] + '">' + key + '</option>'
            return str;
        },
        createSelect: function(obj){
            var str = '<div class="info-content"><div class="label"><span>' 
                + obj.label 
                + '</span></div><div class="info-txt"><select name="'
                + obj.name
                + '" class="txt jsChange" >';

            str += $.createOption(obj.select);
            str += '</select><p class="err-tips"><i class="err-icon"></i><span>'
                +  obj.holder
                +  '</span></p></div></div>';
            return str;
        },
        createR: function(obj){
            var str = '';
            for(var prop in obj){
                str += '<strong><span class="tenIcon check-icon" data-id="'
                    + obj[prop]
                    + '"></span><span>'
                    + prop
                    + '</span></strong>';
            }
            return str;
        },
        createRadio: function(obj){
            var str = '<div class="info-content"><div class="label"><span>'
                + obj.label
                + '</span></div><div class="info-txt"><div class="sexSel">';

            str += $.createR(obj.radio);
            str += '</div><input type="hidden" name="'
                + obj.name
                + '"><p class="err-tips"><i class="err-icon"></i><span>'
                + obj.tip
                + '</span></p></div></div>';
            return str;
        }
    });


});

