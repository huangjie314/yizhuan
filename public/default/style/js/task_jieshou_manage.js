$(function () {
    $(".preview").preview({ width: 300, height: 300 });
    $('.list_content img, .list_content span, .list_content a').tipsy();
    $('.td_center_jf').hover(function () { $(this).find('.view_require').show(); }, function () { $(this).find('.view_require').hide(); });
    //自动刷新
    function TaskAutoRefresh() {
        if ($('#AutoRefresh').prop("checked")) {
            setCookie("Jie_AutoRefresh", "yes");
            window.location.reload();
        } else {
            setCookie("Jie_AutoRefresh", "");
        }
        window.setTimeout(TaskAutoRefresh, 10000);
    }
    if (getCookie("Jie_AutoRefresh") == "yes") {
        $('#AutoRefresh').prop("checked", true);
    }
    window.setTimeout(TaskAutoRefresh, 10000);

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
        if (!confirm("亲，确定要修改吗？\n（请如实填写，乱写会封号的）")) return;
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

function dialogOpen(tit, id, callname) {
    var url = "";
    switch (callname) {
        case "write_trade_no":
            tit = "已经支付，请填写订单号";
            url = "/tasks/dialog/write_trade_no.aspx?id=" + id;
            break;
        case "view_search":
            tit = "下单流程";
            url = "/tasks/dialog/search_lailu_detail.aspx?id=" + id + "&type=2";
            break;
        case "view_product_url_app":    //手机购物车或购物车任务
            tit = tit;
            url = "/tasks/dialog/view_product_url.aspx?id=" + id + "&type=2";
            break;
        case "upload_pic":
            tit = "上传任务操作凭证";
            url = "/tasks/dialog/upload_task_pic.aspx?id=" + id + "&type=2";
            break;
        case "task_detail":
            tit = "任务详细浏览";
            url = "/tasks/dialog/task_detail.aspx?id=" + id;
            break;
        case "bind_nickname":
            tit = "绑定任务接手买号";
            url = "/tasks/dialog/bind_jieshou_account.aspx?id=" + id;
            break;
        case "express_addr":
            tit = "填写你的快递收货地址";
            url = "/tasks/dialog/jieshou_express_addr.aspx?id=" + id;
            break;
        case "haoping":
            tit = "收货带字好评内容";
            url = "/tasks/dialog/jieshou_haoping.aspx?id=" + id;
            break;
        case "upload_haoping_pic":
            tit = "上传好评截图";
            url = "/tasks/dialog/upload_haoping_pic.aspx?id=" + id;
            break;
        case "addhaoping":
            tit = "追加评论内容";
            url = "/tasks/dialog/jieshou_haoping.aspx?id=" + id + "&action=addhaoping";
            break;
        case "pingjia":
            tit = "给对方本次交易满意度评价";
            url = "/tasks/dialog/pingjia.aspx?id=" + id + "&type=2";
            break;
        case "task_require":
            tit = "任务具体要求";
            url = "/tasks/dialog/task_require.aspx?id=" + id;
            break;
        case "upload_verify_pic":
            url = "/tasks/dialog/upload_verify_pic.aspx?id=" + id;
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

//编辑任务标注
function editMemo(id, n) {
    var d = dialog({
        title: '编辑任务备注信息',
        content: "备注信息仅自己可见。(最多可输入255个字符)<br><br><textarea name='message' id='message' style='width:340px;height:80px'></textarea>",
        okValue: '确定',
        ok: function () {
            if ($("#message").val() == '') {
                alert('请先填写内容!');
                return false;
            }
            $.ajax({
                type: "POST",
                url: "/tools/task_ajax.ashx?action=edit_task_memo",
                dataType: "json",
                data: {
                    "id": id,
                    "message": $("#message").val()
                },
                timeout: 20000,
                success: function (data, textStatus) {
                    if (data.status == 1) {
                        var tipdialog = dialog({ content: data.msg }).show();
                        setTimeout(function () {
                            tipdialog.close().remove();
                            location.reload();
                        }, 2000);
                    } else {
                        dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dialog({ title: '提示', content: '状态：' + textStatus + '；出错提示：' + errorThrown, okValue: '确定', ok: function () { } }).showModal();
                }
            });
        },
        cancelValue: '取消',
        cancel: function () { }
    }).showModal();
    if (n == 1) {
        $.get("/tools/task_ajax.ashx?action=get_task_memo", {
            id: id
        },
            function (data) {
                if (data.status == 1) {
                    $("#message").val(decodeURIComponent(data.msg));
                } else {
                    var tipdialog = dialog({ content: data.msg }).show();
                    setTimeout(function () {
                        tipdialog.close().remove();
                    }, 2000);
                }
            }, "json");
    }
    return false;
}