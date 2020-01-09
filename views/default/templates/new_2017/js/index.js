$(function () {
    //顶部右侧鼠标移到向下弹出导航
    $("#topbar_nav li").hover(function () {
        $("div", this).slideDown(240);
        $(this).children("a:first").addClass("hov");
    }, function () {
        $("div", this).slideUp(240);
        $(this).children("a:first").removeClass("hov");
    });
    
    //试客文摘鼠标移动
    var $medul = $(".medianav li");
    $medul.mouseover(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var medul_div = $medul.index(this);
        $(".morder_a >a").eq(medul_div).show().siblings().hide();
        $("#newmedia >div").eq(medul_div).show().siblings().hide();
    });
    
    //主导航菜单智能浮动
    $(".mainnav").smartFloat();
    //帮助中心导航菜单智能浮动
    $(".mainnav-help").smartFloat();
});

//智能浮动层函数 需要先引入jquery
$.fn.smartFloat = function () {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        var w = element.innerWidth();
        var min_width = 1200;   //导航最小宽
        if (w < min_width) w = element.width(min_width);
        $(window).resize(function () {
            setTimeout(function () {
                var ww = $(window).width();
                if (ww > min_width) {
                    w = element.width(ww);
                }
                else {
                    w = element.width(min_width);
                }
            }, 100);
        });
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        width: w,
                        position: "fixed",
                        top: 0
                    });
                } else {
                    element.css({
                        width: '100%',
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
};

// 加入收藏 兼容360和IE6
function AddFavorite(sTitle, sURL) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("请使用Ctrl+D或者鼠标右键点击添加到收藏!");
        }
    }
}