//copyright c by hsktms.com 2017-7-14 v1.0.1
/*由于大图地址一般是在<img src="" 或 <a href="" 属性中，本插件支持img 和a 标签，图片仅支持png,gif,jpg,bmp四种格式的图片。用法是：目标.preview();或目标.preview({width: 300, height: 300});
例如1：<img src="xx.jpg">
$(".preview").preview();  img标签(默认是取img的src)
例如2：<a href="xx.jpg">图片</a>
$("a").preview({img:false});  a标签
例如3：<a title="我就是图片">图片</a>
$("a").preview();  只显示title 默认所有都支持显示title,如果不显示留空即可
*/
(function ($) {
    $.fn.preview = function (options) {
        var xOffset = 10;
        var yOffset = 20;
        var w = $(window).width();
        options = $.extend({}, $.fn.preview.defaults, options);
        return $(this).each(function () {
            var opts = $.fn.preview.elementOptions(this, options);
            $(this).hover(function (e) {
                var src = $(this).attr(opts.img ? "src" : "href");
                if (typeof src != 'string' || src == '') src = $(this).attr("href");
                if ($(this).attr('title') || typeof ($(this).attr('original-title')) != 'string') {
                    $(this).attr('original-title', $(this).attr('title') || '').removeAttr('title');
                }
                var title;
                if (typeof opts.title == 'string') {
                    title = $(this).attr(opts.title == 'title' ? 'original-title' : opts.title);
                } else if (typeof opts.title == 'function') {
                    title = opts.title.call(this);
                }
                var html = "<div id='jq_preview'><div>";
                if (src && /.png$|.gif$|.jpg$|.jpeg$|.bmp$/.test(src)) {
                    html += "<img src='" + src + "'";
                    if (opts.width > 0) html += " width='" + opts.width + "'";
                    if (opts.height > 0) html += " height='" + opts.height + "'";
                    html+=" />";
                }
                if (typeof title == 'string' && title != '') {
                    html += "<p>" + title + "</p>";
                }
                html += "</div></div>";
                if (src || title) {
                    $("body").append(html);
                    $("#jq_preview").css({
                        position: "absolute",
                        padding: "3px",
                        //border: "1px solid #ACDAFF",
                        backgroundColor: "#EBF5FF",
                        color: "#406899",
                        top: (e.pageY - yOffset) + "px",
                        webkitBoxShadow: "0 0 6px #57a0ff",
                        _mozBoxShadow: "0 0 6px #57a0ff",
                        boxShadow: "0 0 6px #57a0ff",
                        borderRadius: "3px",
                        visibility: 'hidden',
                        zIndex: 1000
                    });
                    if (opts.fade) {
                        $("#jq_preview").css({ opacity: 0, visibility: 'visible' }).animate({ opacity: 1.0 });
                    } else {
                        $("#jq_preview").css({ visibility: 'visible' });
                    }
                    $("#jq_preview > div").css({
                        backgroundColor: "white",
                        padding: "3px",
                        borderRadius: "3px"
                    });
                    $("#jq_preview > div > p").css({
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "8px 0 3px",
                        backgroundColor: "#EBF5FF",
                        margin: "0"
                    });
                    if (e.pageX < w / 2) {
                        $("#jq_preview").css({
                            left: e.pageX + xOffset + "px",
                            right: "auto"
                        }).fadeIn("fast");
                    } else {
                        $("#jq_preview").css("right", (w - e.pageX + yOffset) + "px").css("left", "auto").fadeIn("fast");
                    }
                }
            }, function () {
                $("#jq_preview").remove();
            }).mousemove(function (e) {
                $("#jq_preview").css("top", (e.pageY - xOffset) + "px")
                if (e.pageX < w / 2) {
                    $("#jq_preview").css("left", (e.pageX + yOffset) + "px").css("right", "auto");
                } else {
                    $("#jq_preview").css("right", (w - e.pageX + yOffset) + "px").css("left", "auto");
                }
            });
        });
    };
    $.fn.preview.elementOptions = function (ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    $.fn.preview.defaults = {
        img: true,
        width: 0,
        height: 0,
        fade: false,
        title: 'title'
    };
})(jQuery);