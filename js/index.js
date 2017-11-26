(function($) {
    $.fn.extend({
        slider: function(options) {
            var _that = this,
                main = null,
                start = null,
                stop = null,
                init = null,
                next = null,
                prev = null,
                timeout = null,
                elems = {},
                defaults = {
                    speed: 1000,
                    delay: 3000
                };
            options = $.extend(defaults, options);
            init = function() {
                elems._index = 1;
                elems.sliderDiv = _that.children("div");
                elems.btn = _that.children("span");
                _that.hover(function() {
                    stop();
                    clearInterval(timeout);
                }, function() {
                    timeout = setInterval(function() { start(1); }, options.delay + options.speed);
                });
                elems.btn.on("click", function() {
                    if (elems.btn.index($(this))) prev();
                    else next();
                });
            };
            start = function(direction) {
                elems.sliderDiv.eq(elems._index - 1).fadeIn(options.speed);
                elems.sliderDiv.not(":eq(" + (elems._index - 1) + ")").fadeOut(options.speed);
                direction ? elems._index++ : elems._index--;
                elems._index > 6 && (elems._index = 1);
                elems._index < 1 && (elems._index = 6);
            };
            stop = function() {
                elems.sliderDiv.stop(true, true);
                clearInterval(timeout);
            };
            next = function() {
                stop();
                start(1);
            };
            prev = function() {
                stop();
                start(0);
            };
            main = function() {
                init();
                timeout = setInterval(function() { start(1); }, options.delay + options.speed);
            };
            main();
        },
        pullDown: function(options) {
            var _that = this,
                init = null,
                main = null,
                elems = {},
                defaults = {};
            options = $.extend(defaults, options);
            init = function() {
                // console.log(_that.children("li"));
                _that.children("li").hover(function() {
                    console.log(1);
                    $(this).children(".pulldown").css("display", "block");
                }, function() {
                    $(this).children(".pulldown").css("display", "none");
                });
            }
            init();
        },
        tabs: function(options) {
            var _that = this,
                init = null,
                main = null,
                elems = {},
                defaults = {};
            options = $.extend(defaults, options);
            init = function() {
                _that.children("ul").children("li").on("mouseenter", function() {
                    $(this).css({
                        // "background": "url(./img/bg_li_news.gif) no-repeat 0 -180px",
                        "position": "relative",
                        "left": "-5px",
                        "z-index": "999"
                    }).siblings().css("position", "")
                    _that.children("a").css("display", "none");
                    _that.children("a").eq(_that.children("ul").children("li").index($(this))).css("display", "block");
                });
            }
            init();
        }
    })
})(jQuery)