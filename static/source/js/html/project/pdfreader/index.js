window.onload= function(){

  var pdfLocation = $('#pdfUrl').val();
  PDFObject.embed(pdfLocation, "#test");
  
  var audiolist =document.getElementById('playList').children;
  var audioLength = audiolist.length;
  function removeClass(){
      for(var i=0;i<audioLength;i++){
          audiolist[i].className="";
      }
  }
  
  for(var i=0;i<audioLength;i++){
    var audio = audiolist[i];
    audio.addEventListener("click",function(){
      removeClass();
      this.className="playing";
      var src  = this.getAttribute("media");
      var Audio = document.getElementById('audio');
      Audio.src = src;
      Audio.play();
    },false);
  }
  var media = document.getElementById('audio');
  media.addEventListener("ended",function(){
        removeClass();
  },false)

}