define("weixinRecorder", ["recorder"], function(require, exports, module){
/*    var $recorderOuter = $('<div class="recorderAppOuter"></div>');
    var $recorder = $('<object type="application/x-shockwave-flash" id="recorderApp" class="recorderApp" name="recorderApp" width="0" height="0" data="/recorder/recorder.swf"></object>');
    $recorderOuter.append($recorder).appendTo("body");*/

    /*var $recorderBtn = $("#record");

    var $recorderStopBtn = $("#stop");

    var $recorderWrap = $(".recorder-wrap");

    var $time = $("#time");

    var audioName =  "audio";

    var interVal;

    $recorderBtn.on("click", function(){
        FWRecorder.record(audioName, 'audio.wav');
    });

    $recorderStopBtn.on("click", function(){
        FWRecorder.stopRecording(audioName);
    });*/
    
    var RecorderCom;
    
    var getRecorderCom = function(){
        if(RecorderCom) return RecorderCom;
        try{
            RecorderCom = window.wxHeck.wxInit.$refs.chattools.$refs.sendvoice;
        }catch(e){
            RecorderCom = void 0;
        }
        return RecorderCom;
    }

    window.fwr_event_handler = function fwr_event_handler() {
        console.log(arguments);
        var name, $controls;
        switch (arguments[0]) {
          case "ready":
            FWRecorder.connect("recorderApp", 0);
            break;

          case "no_microphone_found":
            alert("请接入麦克风！");
            break;

          case "microphone_user_request":
            getRecorderCom().recorderOpen = true;
            FWRecorder.showPermissionWindow({
                permanent : true
            });
            break;

          case "microphone_connected":
            FWRecorder.isReady = true;
            // $uploadStatus.css({'color': '#000'});
            break;

          case "permission_panel_closed":
            FWRecorder.defaultSize();
            getRecorderCom().recorderOpen = false;
            break;

          case "microphone_activity":
            // $('#activity_level').text(arguments[1]);
            break;
            
            // 录音中
          case "recording":
            FWRecorder.hide();
            getRecorderCom().startRecord();
            /*$recorderWrap.addClass("recording");
            interVal = setInterval(function(){
                $time.html("录音中" + Math.ceil(FWRecorder.duration(audioName)) + "s");
            }, 100)*/
            break;

            // 录音结束
          case "recording_stopped":
            var duration = arguments[2];
            FWRecorder.show();
            /*clearInterval(interVal);
            $recorderWrap.removeClass("recording");
            $time.html("录音完成" + Math.ceil(duration) + "s");*/
            // FWRecorder.playBack(audioName);
            // $("body").append('<audio controls src="'+ FWRecorder.getBase64(audioName) +'"></audio>');
            // $("body").append('<audio controls src="'+ URL.createObjectURL(FWRecorder.getBlob(audioName)) +'"></audio>');
            /*var $p;
            $.ajax({
                beforeSend : function(){
                    $p = $("<p>上传中...</p>").appendTo("body");
                },
                url : "/UploadFile/uploadRecorder",
                type : "post",
                dataType : "json",
                data : {
                    file_base64 : FWRecorder.getBase64(audioName)
                },
                success : function(r){
                    if(r.status != 10000) return alert(r.message);
                    $p.html("<audio src="+ r.message +" controls></audio>");
                },
                complete : function(){

                }
            });*/
            break;

          case "microphone_level":
            $level.css({width: arguments[1] * 50 + '%'});
            break;

          case "observing_level":
            $showLevelButton.hide();
            $hideLevelButton.show();
            break;

          case "observing_level_stopped":
            $showLevelButton.show();
            $hideLevelButton.hide();
            $level.css({width: 0});
            break;

          case "playing":
            name = arguments[1];
            $controls = controlsEl(name);
            setControlsClass($controls, CLASS_PLAYING);
            break;

          case "playback_started":
            name = arguments[1];
            var latency = arguments[2];
            break;

          case "stopped":
            name = arguments[1];
            $controls = controlsEl(name);
            setControlsClass($controls, CLASS_PLAYBACK_READY);
            break;

          case "playing_paused":
            name = arguments[1];
            $controls = controlsEl(name);
            setControlsClass($controls, CLASS_PLAYBACK_PAUSED);
            break;

          case "save_pressed":
            FWRecorder.updateForm();
            break;

          case "saving":
            name = arguments[1];
            break;

          case "saved":
            name = arguments[1];
            var data = $.parseJSON(arguments[2]);
            if (data.saved) {
              $('#upload_status').css({'color': '#0F0'}).text(name + " was saved");
            } else {
              $('#upload_status').css({'color': '#F00'}).text(name + " was not saved");
            }
            break;

          case "save_failed":
            name = arguments[1];
            var errorMessage = arguments[2];
            $uploadStatus.css({'color': '#F00'}).text(name + " failed: " + errorMessage);
            break;

          case "save_progress":
            name = arguments[1];
            var bytesLoaded = arguments[2];
            var bytesTotal = arguments[3];
            $uploadStatus.css({'color': '#000'}).text(name + " progress: " + bytesLoaded + " / " + bytesTotal);
            break;
        }
    };

});