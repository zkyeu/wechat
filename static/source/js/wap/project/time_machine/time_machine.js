/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-12-28 12:10:30
 * @liyang 1.0.0
 */
define(function(require,exports,module){
    function Animate() {
        this.page_1 = document.querySelector('.page-01');
        this.childName = document.querySelector('.hidden-name').value;
        this.headImg = document.querySelector('.head');
        this.showChildName = document.querySelector('.child-name');
        this.explodeDom = document.querySelector('.photo-show01');
        this.imageRotateDom = document.querySelector('.photo-show02');
    }


    $.extend(Animate.prototype, {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            setStyle(this.page_1, 'transform', 'perspective(800px) rotateX(0deg)');
            setStyle(this.headImg, 'transform', 'scale(1)');
            this.textShdow(this.childName, this.showChildName);
            this.imageExplode(this.explodeDom, 4, 4);
            this.imageRotate_1(this.imageRotateDom, 4, 4);
        },

        textShdow: function(str, obj) {
            var timer = null;
            var count = 0;
            for(var i = 0; i < str.length; i++) {
                var oSpan = document.createElement('span');
                oSpan.innerHTML = str.charAt(i);
                obj.appendChild(oSpan);
            }
            var allLength = obj.children.length;
            timer = setInterval(function() {
                obj.children[count].className='on';
                count++;
                if(count == allLength) {
                    clearInterval(timer);
                }
            }, 100);
        },

        imageExplode: function(obj, r, c) {
            for(var i = 0; i < r; i++) {
                for(var j = 0; j < c; j++) {
                    var oSpan = document.createElement('span');
                    oSpan.style.width = obj.offsetWidth/c+'px';
                    oSpan.style.height = obj.offsetHeight/r+'px';
                    oSpan.style.float = 'left';
                    obj.appendChild(oSpan);
                    oSpan.style.backgroundPosition='-'+j*oSpan.offsetWidth+'px -'+i*oSpan.offsetHeight+'px';
                }
            }
            var oExplode = obj;
            var aSpan = obj.children;

            setTimeout(function() {
                for(var i = 0; i < aSpan.length; i++) {
                    aSpan[i].style.transition = '1s all ease';
                    var spancX = aSpan[i].offsetWidth/2+aSpan[i].offsetLeft;
                    var spancY = aSpan[i].offsetHeight/2+aSpan[i].offsetTop;
                    console.log(aSpan[i].offsetWidth/2,aSpan[i].offsetTop, spancY);
                    var objX = oExplode.offsetWidth/2;
                    var objY = oExplode.offsetHeight/2;
                    setStyle(aSpan[i], 'transform', 'perspective(800px) translateX('+(spancX-objX)+'px) translateY('+(spancY-objY)+'px) rotateX('+rnd(0,180)+'deg) rotateY('+rnd(0,180)+'deg) translateZ(100px)');
                    aSpan[i].style.opacity=0;
                }
            }, 500);
        },

        imageRotate_1: function(obj, r, c) {

            for(var i = 0; i < r; i++) { 
                for(var j = 0; j < c; j++) {
                    var oSpan = document.createElement('span');
                    oSpan.style.width = obj.offsetWidth/c + 'px';
                    oSpan.style.height = obj.offsetHeight/r + 'px';
                    // oSpan.style.float = 'left';
                   
                    oSpan.style.backgroundPosition='-'+j*oSpan.offsetWidth+'px -'+i*oSpan.offsetHeight+'px';
                    // oSpan.style.position = 'absolute';
                    oSpan.style.left = j*oSpan.offsetWidth+'px';
                    oSpan.style.top = i*oSpan.offsetHeight+'px';
                    oSpan.style.backgroundPosition='-'+j*oSpan.offsetWidth+'px -'+i*oSpan.offsetHeight+'px';
                    obj.appendChild(oSpan);
                    oSpan.innerHTML='<em class="front"></em><em class="back"></em>';
                    // oSpan.children[0].style.position = 'absolute';
                    // oSpan.children[1].style.position = 'absolute';
                    // oSpan.children[0].style.left = '0';
                    // oSpan.children[1].style.left = '0';
                    // oSpan.children[0].style.top = '0';
                    // oSpan.children[1].style.top = '0';
                    // oSpan.children[0].style.height = '100%';
                    // oSpan.children[0].style.width = '100%';
                    // oSpan.children[1].style.width = '100%';
                    // oSpan.children[1].style.height = '100%';
                    oSpan.children[0].style.backgroundPosition='-'+j*oSpan.offsetWidth+'px -'+i*oSpan.offsetHeight+'px';
                    oSpan.children[1].style.backgroundPosition='-'+j*oSpan.offsetWidth+'px -'+i*oSpan.offsetHeight+'px';

                    // setStyle(oSpan.children[0], 'transform', 'translateZ(0.1px)');
                    // setStyle(oSpan.children[1], 'transform', 'translateZ(-0.1px) scale(-1,1)');
                } 
            }

            var aSpan = obj.children;
            obj.onclick = function() {
                for(var i = 0; i < aSpan.length; i++) {
                    aSpan[i].style.transition = '1s all ease';
                    setStyle(aSpan[i], 'transform', 'perspective(800px) rotateY(180deg)');
                }
            }
        },

        imageRotate_2: function(obj, r, c) {

        }

    });

    function rnd(n, m) {
        return Math.floor(Math.random()*(m+1-n)+n);
    }

    function setStyle(obj, name, value) {
        var str = name.charAt(0).toUpperCase()+name.substring(1);
        obj.style['Webkit'+str]=value;
        obj.style['Moz'+str]=value;
        obj.style['O'+str]=value;
        obj.style['ms'+str]=value;
        obj.style[name]=value;
    }

    function Page() {
    }

    $.extend(Page.prototype, {
        init: function() {
            var animate = new Animate();
            animate.init();
        }
    })

    var page = new Page();  
    page.init();
});

