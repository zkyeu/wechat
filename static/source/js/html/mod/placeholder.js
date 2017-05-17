/**
 *
 * @authors Saturday (zhouling@51talk.com)
 * @date    2014-11-13 18:53:30
 * @version 1.0.0
 */
define("placeholder",[],function(require,exports,module){
    if("placeholder" in document.createElement("input")) return;
    var defaultColor="#ccc";
    $(":input").each(function(){
        var oInput=$(this);
        var placeholder=oInput.attr("placeholder");
        if(!placeholder) return true;
        if(this.type.toLowerCase()=="textarea"){
            var oSpan=$('<textarea>');
        }else{
            var oSpan=$('<input>');
        }
        oSpan.addClass(oInput.attr("class")).val(placeholder).css("color",defaultColor);
        oInput.after(oSpan);
        oSpan.focus(function(){
            oSpan.hide();
            oInput.show().focus();
        });
        oInput.blur(function(){
            if(this.value==""){
                oInput.hide();
                oSpan.show();
            }
        });
        if(this.value==""){
            oSpan.show();
            oInput.hide();
        }else{
            oSpan.hide();
        }
    });
});

