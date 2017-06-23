define(function(require,exports,module){
   (function ($) {
        'use strict';

        $.jqPaginator = function (el, options) {
            if(!(this instanceof $.jqPaginator)){
                return new $.jqPaginator(el, options);
            }

            var self = this;

            self.$container = $(el);

            self.$container.data('jqPaginator', self);

            self.init = function () {

                if (options.first || options.prev || options.next || options.last || options.page) {
                    options = $.extend({}, {
                        first: '',
                        prev: '',
                        next: '',
                        last: '',
                        page: ''
                    }, options);
                }

                self.options = $.extend({}, $.jqPaginator.defaultOptions, options);

                self.verify();

                self.extendJquery();

                self.render();

                self.fireEvent(this.options.currentPage, 'init');
            };

            self.verify = function () {
                var opts = self.options;

                if (!self.isNumber(opts.totalPages)) {
                    throw new Error('[jqPaginator] type error: totalPages');
                }

                if (!self.isNumber(opts.totalCounts)) {
                    throw new Error('[jqPaginator] type error: totalCounts');
                }

                if (!self.isNumber(opts.pageSize)) {
                    throw new Error('[jqPaginator] type error: pageSize');
                }

                if (!self.isNumber(opts.currentPage)) {
                    throw new Error('[jqPaginator] type error: currentPage');
                }

                if (!self.isNumber(opts.visiblePages)) {
                    throw new Error('[jqPaginator] type error: visiblePages');
                }

                if (!opts.totalPages && !opts.totalCounts) {
                    throw new Error('[jqPaginator] totalCounts or totalPages is required');
                }

                if (!opts.totalPages && !opts.totalCounts) {
                    throw new Error('[jqPaginator] totalCounts or totalPages is required');
                }

                if (!opts.totalPages && opts.totalCounts && !opts.pageSize) {
                    throw new Error('[jqPaginator] pageSize is required');
                }

                if (opts.totalCounts && opts.pageSize) {
                    opts.totalPages = Math.ceil(opts.totalCounts / opts.pageSize);
                }

                if (opts.currentPage < 1 || opts.currentPage > opts.totalPages) {
                    throw new Error('[jqPaginator] currentPage is incorrect');
                }

                if (opts.totalPages < 1) {
                    throw new Error('[jqPaginator] totalPages cannot be less currentPage');
                }
            };

            self.extendJquery = function () {
                $.fn.jqPaginatorHTML = function (s) {
                    return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html();
                };
            };

            self.render = function () {
                self.renderHtml();
                self.setStatus();
                self.bindEvents();
            };

            self.renderHtml = function () {
                var html = [];

                var pages = self.getPages();
                for (var i = 0, j = pages.length; i < j; i++) {
                    html.push(self.buildItem('page', pages[i]));
                }

                self.isEnable('prev') && html.unshift(self.buildItem('prev', self.options.currentPage - 1));
                self.isEnable('first') && html.unshift(self.buildItem('first', 1));
                self.isEnable('statistics') && html.unshift(self.buildItem('statistics'));
                self.isEnable('next') && html.push(self.buildItem('next', self.options.currentPage + 1));
                self.isEnable('last') && html.push(self.buildItem('last', self.options.totalPages));

                if (self.options.wrapper) {
                    self.$container.html($(self.options.wrapper).html(html.join('')).jqPaginatorHTML());
                } else {
                    self.$container.html(html.join(''));
                }
            };

            self.buildItem = function (type, pageData) {
                var html = self.options[type]
                    .replace(/{{page}}/g, pageData)
                    .replace(/{{totalPages}}/g, self.options.totalPages)
                    .replace(/{{totalCounts}}/g, self.options.totalCounts);

                return $(html).attr({
                    'jp-role': type,
                    'jp-data': pageData
                }).jqPaginatorHTML();
            };

            self.setStatus = function () {
                var options = self.options;

                if (!self.isEnable('first') || options.currentPage === 1) {
                    $('[jp-role=first]', self.$container).addClass(options.disableClass);
                }
                if (!self.isEnable('prev') || options.currentPage === 1) {
                    $('[jp-role=prev]', self.$container).addClass(options.disableClass);
                }
                if (!self.isEnable('next') || options.currentPage >= options.totalPages) {
                    $('[jp-role=next]', self.$container).addClass(options.disableClass);
                }
                if (!self.isEnable('last') || options.currentPage >= options.totalPages) {
                    $('[jp-role=last]', self.$container).addClass(options.disableClass);
                }

                $('[jp-role=page]', self.$container).removeClass(options.activeClass);
                $('[jp-role=page][jp-data=' + options.currentPage + ']', self.$container).addClass(options.activeClass);
            };

            self.getPages = function () {
                var pages = [],
                    visiblePages = self.options.visiblePages,
                    currentPage = self.options.currentPage,
                    totalPages = self.options.totalPages;

                if (visiblePages > totalPages) {
                    visiblePages = totalPages;
                }

                var half = Math.floor(visiblePages / 2);
                var start = currentPage - half + 1 - visiblePages % 2;
                var end = currentPage + half;

                if (start < 1) {
                    start = 1;
                    end = visiblePages;
                }
                if (end > totalPages) {
                    end = totalPages;
                    start = 1 + totalPages - visiblePages;
                }

                var itPage = start;
                while (itPage <= end) {
                    pages.push(itPage);
                    itPage++;
                }

                return pages;
            };

            self.isNumber = function (value) {
                var type = typeof value;
                return type === 'number' || type === 'undefined';
            };

            self.isEnable = function (type) {
                return self.options[type] && typeof self.options[type] === 'string';
            };

            self.switchPage = function (pageIndex) {
                self.options.currentPage = pageIndex;
                self.render();
            };

            self.fireEvent = function (pageIndex, type) {
                return (typeof self.options.onPageChange !== 'function') || (self.options.onPageChange(pageIndex, type) !== false);
            };

            self.callMethod = function (method, options) {
                switch (method) {
                    case 'option':
                        self.options = $.extend({}, self.options, options);
                        self.verify();
                        self.render();
                        break;
                    case 'destroy':
                        self.$container.empty();
                        self.$container.removeData('jqPaginator');
                        break;
                    default :
                        throw new Error('[jqPaginator] method "' + method + '" does not exist');
                }

                return self.$container;
            };

            self.bindEvents = function () {
                var opts = self.options;

                self.$container.off();
                self.$container.on('click', '[jp-role]', function () {
                    var $el = $(this);
                    if ($el.hasClass(opts.disableClass) || $el.hasClass(opts.activeClass)) {
                        return;
                    }

                    var pageIndex = +$el.attr('jp-data');
                    if (self.fireEvent(pageIndex, 'change')) {
                        self.switchPage(pageIndex);
                    }
                });
            };

            self.init();

            return self.$container;
        };

        $.jqPaginator.defaultOptions = {
            wrapper: '',
            first: '<li class="first"><a href="javascript:;">First</a></li>',
            prev: '<li class="prev"><a href="javascript:;">Previous</a></li>',
            next: '<li class="next"><a href="javascript:;">Next</a></li>',
            last: '<li class="last"><a href="javascript:;">Last</a></li>',
            page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
            totalPages: 0,
            totalCounts: 0,
            pageSize: 0,
            currentPage: 1,
            visiblePages: 7,
            disableClass: 'disabled',
            activeClass: 'active',
            onPageChange: null
        };

        $.fn.jqPaginator = function () {
            var self = this,
                args = Array.prototype.slice.call(arguments);

            if (typeof args[0] === 'string') {
                var $instance = $(self).data('jqPaginator');
                if (!$instance) {
                    throw new Error('[jqPaginator] the element is not instantiated');
                } else {
                    return $instance.callMethod(args[0], args[1]);
                }
            } else {
                return new $.jqPaginator(this, args[0]);
            }
        };
    })(jQuery);



  // function CourseList(options,size){
  //       this.size = size || 2;
  //       this.update = false;
  //       this.options = options;
  //       var self = this;
  //   }
  // CourseList.prototype.sendData = function(options){
  //       $.ajax(options);
  //   }
  // CourseList.prototype.pagination = function(){
  //   var This = this;
  //   this.$pagination = $('#pagination');
  //   this.$pagination.jqPaginator({
  //       totalCounts: 2,//设置分页的总条目数
  //       pageSize: This.size,
  //       visiblePages: 2,//设置最多显示的页码数
  //       prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
  //       next: '<li class="next"><a href="javascript:;">下一页</a></li>',
  //       page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
  //       onPageChange: function (num, type) {
  //           if(This.update){
  //               This.config.data.page = num;
  //               This.sendData(This.config);
  //           }
            
  //       }
  //   });
  // }
  // module.exports = CourseList;

  var if_firstime = true; //分页组件第一次加载为true，后面false
  /*  
    分页组件展示  
    total_pages: 总页数； 
    visible_pages： 让组件展示5页； 
    current_page: 当前页 
  */
  // function display_pages(total_pages, visible_pages, current_page){  
  //   if(!visible_pages){  
  //       visible_pages = 5;  
  //   }  
  //   if(!current_page){  
  //       current_page = 1;  
  //   }  
  
  //   $.jqPaginator('#pagination', {  
  //       totalPages: total_pages,  
  //       visiblePages: visible_pages,  
  //       currentPage: current_page,  
  //       prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',  
  //       next: '<li class="next"><a href="javascript:;">下一页</a></li>',  
  //       page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
  //       onPageChange: function (page, type) {  
  //           // alert(type + '：' + page);  
  //           if(if_firstime){  
  //               if_firstime = false;  
  //           }else if(!if_firstime){  
  //               changePage(page);  
  //           }  
              
  //       }  
  //   });  
  // }  

  $('#pagination').jqPaginator({
    totalPages: 10,
    visiblePages: 10,
    currentPage: 1,
    prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
    next: '<li class="next"><a href="javascript:;">下一页</a></li>',
    page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
    onPageChange: function (num) {
        $('#text').html('当前第' + num + '页');
    }
  });

  $("#courseList li").each(function(){
    var cRateLen=$(this).find(".c-rate i").text();
    $(this).find(".speed i").css("width",cRateLen);
  });
});
