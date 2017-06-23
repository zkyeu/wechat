
define(function(require,exports,module){ 
      var mb=null;
      $().ready(function(){
          mb=new MusicBox();
          mb.init();
      });
});
