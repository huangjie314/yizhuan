function getTelTpl(service_phone) {
    return (
        '<p style="font-size:26px; margin-bottom:30px; color:#f50; line-height:0;">' + service_phone + '</p>' +
        '<p>客服热线：' + service_phone + '</p>'
    )
}
function getCriterionTpl(service_criterion) {
    var arr = service_criterion.split(/<br\/>/);
    var str = '<dt class="kefu-tit">服务准则：</dt>'
    for (var i = 0; i < arr.length; i++) {
        str += '<dd>' + arr[i] + '</dd>'
    }
    return str;
}
function getNotice(posts) {
    var str = ''
    for (var i = 0; i < posts.length; i++) {
        str += '<li><a href="../../service/show.html?id=' + posts[i].id + '" target="_blank" title="' + posts[i].title + '" >' + posts[i].title + '</a></li >'
    }
    return str;
}
$(function () {
    Util.ajax({
        url: '/api/config/contacts',
        certificate: true,
        type: 'POST',
        success: function (res) {
            if (res.status == 1) {
                var contacts = res.data.contacts;
                $('#tell').find('.hotline pf_lcon').html(getTelTpl(contacts.service_phone));
                $('#tell').find('dl').html(getCriterionTpl(contacts.service_criterion));
            }
        }
    })
    Util.ajax({
        url: '/api/post/notice',
        certificate: true,
        type: 'POST',
        success: function (res) {
            if (res.status == 1) {
                var posts = res.data.posts;
                $('.onright').find('.pf_lcon > ul').html(getNotice(posts))
            }
        }
    })
    //右侧栏切换选项卡
    $(".icon-all>li>a").each(function (j) {
        $(this).click(function () {
            if ($(".onright").eq(j).css("right") == "40px") {
                $(".onright").eq(j).css("right", "-250px");
            }
            else {
                $(".onright").css("right", "-250px");
                $(".onright").eq(j).css("right", "40px");
            }
        });
    });
    //监控滚动 显示/隐藏TOP
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $(".icon-all2 .icon-all-4").fadeIn("slow");
        } else {
            $(".icon-all2 .icon-all-4").fadeOut("slow");
        }
    });
    //TOP点击
    $(".icon-all2 .icon-all-4").click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    //右上关闭
    $(".icon-all .close").click(function () {
        $(this).parent().css("right", "-250px");
    });
    //底部关闭/隐藏右侧栏
    $(".icon-all2 .icon-all-5").click(function () {
        $(".fixd-right").css({ "right": "-50px" });
        $(".icon-all>li>div").css({ "right": "-260px" });
        $(".yincang").css({ "width": "70px" });
    });
    //显示右侧栏
    $(".yincang").click(function () {
        $(this).css({ "width": "0" });
        $(".fixd-right").show(10).css({ "right": "0px" });
    });
    $(window).resize(function () {
        if (document.documentElement.clientWidth < 1280) {
            $(".icon-all2 .icon-all-5").click();
        }
    });
    if (document.documentElement.clientWidth < 1280) {
        $(".fixd-right").hide();
        $(".icon-all2 .icon-all-5").click();
    }
});