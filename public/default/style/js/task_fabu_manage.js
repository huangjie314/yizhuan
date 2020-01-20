$(function () {
    $(".preview").preview({ width: 300, height: 300 });
    $('.list_content img, .list_content span, .list_content a').tipsy();
    $('.td_center_jf').hover(function () { $(this).find('.view_require').show(); }, function () { $(this).find('.view_require').hide(); });
    //自动刷新
    function TaskAutoRefresh() {
        if ($('#AutoRefresh').prop("checked")) {
            setCookie("Fa_AutoRefresh", "yes");
            window.location.reload();
        } else {
            setCookie("Fa_AutoRefresh", "");
        }
        window.setTimeout(TaskAutoRefresh, 3000);
    }
    if (getCookie("Fa_AutoRefresh") == "yes") {
        $('#AutoRefresh').prop("checked", true);
    }
    window.setTimeout(TaskAutoRefresh, 3000);

    $(".trade_no").focus(function () {
        var obj = $(this).siblings(".editSubmit");
        obj.show();
        setTimeout(function () {
            obj.hide(500);
        }, 4000);
    });

    $(".editSubmit").click(function () {
        var tips_obj = $(this).siblings(".trade_no");
        var trade_no = tips_obj.val();
        if (trade_no == '' || trade_no.length < 10) {
            var d = dialog({ content: '亲，请输入正确的订单号！', align: 'top' }).show(this);
            setTimeout(function () {
                d.close().remove();
            }, 2500);
            return;
        }
        var real_money = $(this).siblings(".real_money").val();
        if (real_money == '' || real_money < 1) {
            var d = dialog({ content: '亲，请输入正确的实付金额！', align: 'top' }).show(this);
            setTimeout(function () {
                d.close().remove();
            }, 2500);
            return;
        }
        if (!confirm("亲，确定要修改吗？\n（请按订单付款金额填写，如果买家写错了你有权纠正）")) return;
        $.ajax({
            type: "POST",
            url: "/tools/task_ajax.ashx?action=task_submit_trade_no",
            dataType: "json",
            data: {
                "id": $(this).attr("item_id"),
                "trade_no": trade_no,
                "real_money": real_money
            },
            timeout: 20000,
            success: function (data, textStatus) {
                if (data.status == 1) {
                    var tipdialog = dialog({ content: data.msg }).show();
                    setTimeout(function () {
                        tipdialog.close().remove();
                        location.reload();
                    }, 2500);
                } else {
                    dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
                }
                return;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                dialog({ title: '提示', content: '出错状态：' + textStatus + '；提示：' + errorThrown, ok: function () { } }).showModal();
                return;
            }
        });
    });

    var t, d;
    $(".buyer_nick_name").hover(
        function () {
            var that = this;
            t = setTimeout(function () {
                d = dialog({
                    id: 'dialogBox', width: "240px", url: "/tasks/shop_account_info.aspx?uid=" + $(that).attr("user_id") + "&shop_site_id=" + $(that).attr("shop_site_id") +
                        "&account=" + encodeURIComponent($(that).html()), align: 'right'
                }).show(that);
            }, 400);
        }, function () {
            if (dialog.get('dialogBox')) {
                dialog.get('dialogBox').close().remove();
            }
            clearTimeout(t);
        }
    );
    winResize();
});

$(window).resize(winResize);
function winResize() {
    var objWidth = ($(this).outerWidth() - 1200) / 2 + 1220;
    if ($(".task_list").size() == 0) {
        $('.batch_action').css({ left: objWidth + "px", top: "329px" });
    } else {
        $('.batch_action').css({ left: objWidth + "px" });
    }
}

function dialogOpen(tit, id, callname) {
    var url = "";
    switch (callname) {
        case "view_search":
            tit = "搜索进店方式说明";
            url = "1.html?id=" + id;
            break;
        case "view_product_url_app":    //手机购物车或购物车任务
            tit = tit;
            url = "/tasks/dialog/view_product_url.aspx?id=" + id;
            break;
        case "upload_pic":
            tit = "查看任务操作凭证";
            url = "2.html?id=" + id;
            break;
        case "task_detail":
            tit = "任务详细浏览";
            url = "/tasks/dialog/task_detail.aspx?id=" + id;
            break;
        case "express_info":
            tit = "填写发货的物流信息";
            url = "/tasks/dialog/fabu_express_info.aspx?id=" + id;
            break;
        case "pingjia":
            tit = "给对方本次交易满意度评价";
            url = "pingjia.html?id=" + id;
            break;
        case "task_require":
            tit = "任务具体要求";
            url = "/tasks/dialog/task_require.aspx?id=" + id;
            break;
        case "view_verify_pic":
            tit = "审核买号信息";
            url = "3.html?id=" + id;
            break;
    }
    dialog({
        title: tit,
        url: url,
        okValue: ' 关 闭 ',
        ok: function () { },
        onclose: function () {
            if (this.returnValue) {
                location.reload();
            }
        }
    }).show();
    return false;
}

//批量操作
$(function () {
    $("#select_doing, #select_all").click(function () {
        var that = $(this);
        var flagName = that.attr("data-flag");
        var original = that.attr("data-original");
        var isShow = (that.attr("data-flag") == "doing" || that.attr("data-flag") == "all");
        if (isShow) {
            that.attr("data-flag", original).attr("data-original", flagName).text("× 取消选中");
        } else {
            that.attr("data-flag", original).attr("data-original", flagName).text("√ " + ((flagName == "doing" || flagName == "cancel") ? "选进行中的" : "选中全部"));
        }
        if ($(".task_status").size() == 0) {
            var d = dialog({ content: '亲，木有任务哦！' }).show();
            setTimeout(function () {
                d.close().remove();
            }, 2000);
            return;
        }
        var is_selected = false;
        $(".task_status").each(function () {
            var status = $(this).val();
            var condition = (flagName == "doing") ? (status > 1 && status < 5) : status < 5;
            if (condition) {
                is_selected = true;
                var checkbox = $(this).siblings(":checkbox");
                checkbox.prop("checked", isShow);
                isShow ? checkbox.show() : checkbox.hide();
            }
        });
        if (!is_selected) {
            var d = dialog({ content: '亲，木有符合条件的任务哦！' }).show();
            setTimeout(function () {
                d.close().remove();
            }, 2000);
        }
    });

    $(".batch_action_button").click(function () {
        if ($(".task_status").size() == 0) {
            var d = dialog({ content: '亲，木有任务哦！' }).show();
            setTimeout(function () {
                d.close().remove();
            }, 2000);
            return;
        }
        if ($("#task_list_wrap input:checkbox:checked").size() == 0) {
            var d = dialog({ content: '亲，请选中任务再操作！' }).show();
            setTimeout(function () {
                d.close().remove();
            }, 2000);
            return;
        }
        var ids = "";
        var action = $(this).attr("data-type");
        $(".task_status").each(function () {
            var status = $(this).val();
            var flag = (action != "task_batch_delete") ? (status > 1 && status < 5) : status == 0;
            if (flag) {
                var checkboxValue = $(this).siblings(":checkbox");
                if (checkboxValue.prop("checked") == true) {
                    var id = checkboxValue.val();
                    if (id) {
                        ids += id + ',';
                    }
                }
            }
        });
        if (ids == "") {
            var d = dialog({ content: '亲，木有符合条件的任务哦！' }).show();
            setTimeout(function () {
                d.close().remove();
            }, 2000);
            return;
        }
        $.ajax({
            type: "POST",
            url: "/tools/task_ajax.ashx?action=" + action,
            dataType: "json",
            data: {
                "ids": ids
            },
            timeout: 20000,
            success: function (data, textStatus) {
                if (data.status == 1) {
                    var tipdialog = dialog({ content: data.msg }).show();
                    setTimeout(function () {
                        tipdialog.close().remove();
                        location.reload();
                    }, 2500);
                } else {
                    dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
                }
                return;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                dialog({ title: '提示', content: '出错状态：' + textStatus + '；提示：' + errorThrown, ok: function () { } }).showModal();
                return;
            }
        });

    });

    $("#export_task").click(function ExportOption() {
        var d = dialog({
            title: '导出任务',
            url: "/tasks/export_task.aspx",
            cancelValue: '关 闭',
            cancel: function () {
                d.close().remove();
            }
        });
        d.width(880).showModal();
        return false;
    });
});