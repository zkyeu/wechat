define(function(require,exports){
    var ToggleCourse = require('up_class_m');
    new ToggleCourse('toggleCourse',{url: '/ajax/getUserTableDate'});

    var evaEv = require('up_class_evaluate');
    evaEv('my-s-evaluate');
})
