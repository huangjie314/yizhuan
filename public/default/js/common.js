/* 
*时间：2017-4-8
*需要结合jquery和Validform和artdialog一起使用
----------------------------------------------------------*/

/*检测浏览器方法
------------------------------------------------*/
var pageurl = window.location.search;
if (pageurl == '?m2w') {
    addCookie('m2wcookie', '1', 0);
}
if (getCookie('m2wcookie') != '1' && browserRedirect()) {
    //location.href = 'http://m.你的域名.com/';    //移动手机站域名暂时没启用
}
/*工具类方法
------------------------------------------------*/
//检测是否移动设备来访
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {
        return false;
    }
}
//写Cookie
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    str += "; path=/";
    document.cookie = str;
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}
//四舍五入函数
function ForDight(Dight, How) {
    Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
    return Dight;
}
//只允许输入数字
function checkNumber(e) {
    var keynum = window.event ? e.keyCode : e.which;
    if ((48 <= keynum && keynum <= 57) || (96 <= keynum && keynum <= 105) || keynum == 8) {
        return true;
    } else {
        return false;
    }
}
//只允许输入小数
function checkForFloat(obj, e) {
    var isOK = false;
    var key = window.event ? e.keyCode : e.which;
    if ((key > 95 && key < 106) || //小键盘上的0到9  
        (key > 47 && key < 60) ||  //大键盘上的0到9  
        (key == 110 && obj.value.indexOf(".") < 0) || //小键盘上的.而且以前没有输入.  
        (key == 190 && obj.value.indexOf(".") < 0) || //大键盘上的.而且以前没有输入.  
        key == 8 || key == 9 || key == 46 || key == 37 || key == 39) {
        isOK = true;
    } else {
        if (window.event) { //IE
            e.returnValue = false;   //event.returnValue=false 效果相同.    
        } else { //Firefox 
            e.preventDefault();
        }
    }
    return isOK;
}
//复制文本
//针对低版本ie 非IE不支持
function copyText(txt) {
    var isIE = /msie/.test(navigator.userAgent.toLowerCase());
    if (isIE) {
        window.clipboardData.setData("Text", txt);
        dialog_show("复制成功，可以通过粘贴来发送！");
    } else {
        dialog_show('抱歉！复制失败，请你手工复制！');
    }
    function dialog_show(tip) {
        var d = dialog({ content: tip }).show();
        setTimeout(function () {
            d.close().remove();
        }, 2000);
    }
}

//切换验证码
function ToggleCode(obj, codeurl) {
    $(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
    return false;
}
//全选取消按钮函数，调用样式如：
function checkAll(chkobj) {
    if ($(chkobj).text() == "全选") {
        $(chkobj).text("取消");
        $(".checkall").prop("checked", true);
    } else {
        $(chkobj).text("全选");
        $(".checkall").prop("checked", false);
    }
}
//Tab控制选项卡
function tabs(tabObj, event) {
    //绑定事件
    var tabItem = $(tabObj).find(".tab-head ul li a");
    tabItem.bind(event, function () {
        //设置点击后的切换样式
        tabItem.removeClass("selected");
        $(this).addClass("selected");
        //设置点击后的切换内容
        var tabNum = tabItem.parent().index($(this).parent());
        $(tabObj).find(".tab-content").hide();
        $(tabObj).find(".tab-content").eq(tabNum).show();
    });
}

//显示浮动窗口
function showWindow(obj) {
    var tit = $(obj).attr("title");
    var box = $(obj).html();
    dialog({
        width: 500,
        title: tit,
        content: box,
        okValue: '确定',
        ok: function () { }
    }).showModal();
}

/*页面级通用方法
------------------------------------------------*/
//智能浮动层函数
$.fn.smartFloat = function () {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        var w = element.innerWidth();
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        width: w,
                        position: "fixed",
                        top: 55
                    });
                } else {
                    element.css({
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
//搜索查询
function SiteSearch(send_url, divTgs, channel_name) {
    var strwhere = "";
    if (channel_name !== undefined) {
        strwhere = "&channel_name=" + channel_name
    }
    var str = $.trim($(divTgs).val());
    if (str.length > 0 && str != "输入问题关键词查询") {
        window.location.href = send_url + "?keyword=" + encodeURI($(divTgs).val()) + strwhere;
    }
    return false;
}
//链接下载
function downLink(point, linkurl) {
    if (point > 0) {
        dialog({
            title: '提示',
            content: "下载需扣除" + point + "个积分<br />重复下载不扣积分，需要继续吗？",
            okValue: '确定',
            ok: function () {
                window.location.href = linkurl;
            },
            cancelValue: '取消',
            cancel: function () { }
        }).showModal();
    } else {
        window.location.href = linkurl;
    }
    return false;
}
//计算积分兑换
function numConvert(obj) {
    var maxAmount = parseFloat($("#hideAmount").val()); //总金额
    var pointCashrate = parseFloat($("#hideCashrate").val()); //兑换比例
    var currAmount = parseFloat($(obj).val()); //需要转换的金额
    if (currAmount > maxAmount) {
        currAmount = maxAmount;
        $(obj).val(maxAmount);
    }
    var convertPoint = currAmount * pointCashrate;
    $("#convertPoint").text(convertPoint);
}

//执行删除操作
function ExecDelete(sendUrl, checkValue, urlObj) {
    //检查传输的值
    if (!checkValue) {
        dialog({ title: '提示', content: '对不起，请选中您要操作的记录！', okValue: '确定', ok: function () { } }).showModal();
        return false;
    }
    dialog({
        title: '提示',
        content: '删除记录后不可恢复，您确定吗？',
        okValue: '确定',
        ok: function () {
            Util.ajax({
                type: "DELETE",
                url: sendUrl,
                dataType: "json",
                certificate: true,
                data: {
                    "id": checkValue
                },
                timeout: 20000,
                success: function (data, textStatus) {
                    if (data.status == 1) {
                        var tipdialog = dialog({ content: data.message }).show();
                        setTimeout(function () {
                            tipdialog.close().remove();
                            if ($(urlObj)) {
                                location.href = $(urlObj).val();
                            } else {
                                location.reload();
                            }
                        }, 2000);
                    } else {
                        dialog({ title: '提示', content: data.message, okValue: '确定', ok: function () { } }).showModal();
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
}

//单击执行AJAX请求操作
function clickSubmit(sendUrl) {
    $.ajax({
        type: "POST",
        url: sendUrl,
        dataType: "json",
        timeout: 20000,
        success: function (data, textStatus) {
            if (data.status == 1) {
                var d = dialog({ content: data.msg }).show();
                setTimeout(function () {
                    d.close().remove();
                    location.reload();
                }, 2000);
            } else {
                dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialog({ title: '提示', content: "状态：" + textStatus + "；出错提示：" + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        }
    });
}

//=====================发送站内信息=====================
function sendMsg(user_name) {
    dialog({
        title: '给对方发送站内消息',
        content: "对方登录后可以看到您发的消息(最多可输入255个字符)<br><br><textarea name='message' id='message' class='textarea' style='width:340px; height:80px'></textarea>",
        okValue: '确定',
        ok: function () {
            if ($("#message").val() == '') {
                alert('请先填写发送的内容!');
                return false;
            }
            $.ajax({
                url: "/tools/submit_ajax.ashx?action=send_message",
                type: "POST",
                dataType: "json",
                data: {
                    "user_name": user_name,
                    "message": $("#message").val()
                },
                timeout: 20000,
                success: function (data, textStatus) {
                    if (data.status == 1) {
                        var d = dialog({ content: data.msg }).show();
                        setTimeout(function () {
                            d.close().remove();
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
    return false;
}

//=====================发送验证邮件=====================
function sendEmail(username, sendurl) {
    if (username == "") {
        dialog({ title: '提示', content: '对不起，用户名不允许为空！', okValue: '确定', ok: function () { } }).showModal();
        return false;
    }
    //提交
    $.ajax({
        url: sendurl,
        type: "POST",
        timeout: 60000,
        data: { "username": username },
        dataType: "json",
        success: function (data, type) {
            if (data.status == 1) {
                var d = dialog({ content: data.msg }).show();
                setTimeout(function () {
                    d.close().remove();
                }, 2000);
            } else {
                dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialog({ title: '提示', content: "状态：" + textStatus + "；出错提示：" + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        }
    });
}

//=====================发送手机短信验证码=====================
var wait = 60; //计算变量
function sendSMS(btnObj, valObj, sendUrl, type) {
    if ($(valObj).val() == "") {
        dialog({ title: '提示', content: '请填写手机号码后再获取！', okValue: '确定', ok: function () { } }).showModal();
        return false;
    }
    if ($(valObj).hasClass('Validform_error') || !/^\d{11,11}$/.test($(valObj).val())) {
        var d = dialog({ content: "抱歉，你的手机号码有误或不可用！" }).show();
        setTimeout(function () {
            d.close().remove();
        }, 3000);
        $(valObj).focus();
        return false;
    }
    var type = type ? type : $('#txtType').val()
    //执行发送短信AJAX请求
    Util.ajax({
        url: "/api/sendCode",
        type: "POST",
        timeout: 60000,
        data: { "type": type, "mobile": $(valObj).val() },
        dataType: "json",
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            $(btnObj).unbind("click").removeAttr("onclick"); //移除按钮事件
        },
        success: function (data, type) {
            if (data.status == 1) {
                wait = 60; //赋值时间
                time(); //调用计算器
                var d = dialog({ content: data.message }).show();
                setTimeout(function () {
                    d.close().remove();
                }, 3000);
            } else {
                recover();
                dialog({ title: '提示', content: data.message, okValue: '确定', ok: function () { } }).showModal();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            recover();
            dialog({ title: '提示', content: "状态：" + textStatus + "；出错提示：" + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        }
    });
    //恢复绑定
    var btnText = $(btnObj).is('input') ? $(btnObj).val() : $(btnObj).text();    //取得按钮或A连接的原始名
    function recover() {
        if ($(btnObj).is('input')) {
            $(btnObj).removeClass("btn-gray");
            $(btnObj).val(btnText);
        } else {
            $(btnObj).removeClass("gray");
            $(btnObj).text(btnText);
        }
        $(btnObj).bind("click", function () {
            sendSMS(btnObj, valObj, sendUrl, type); //重新绑定事件
        });
    }
    //倒计时计算器
    function time() {
        if (wait == 0) {
            recover();
        } else {
            if ($(btnObj).is('input')) {
                $(btnObj).addClass("btn-gray");
                $(btnObj).val("重新发送(" + wait + ")");
            } else {
                $(btnObj).addClass("gray");
                $(btnObj).text("重新发送(" + wait + ")");
            }
            wait--;
            setTimeout(function () {
                time(btnObj);
            }, 1000);
        }
    }
}

/*表单AJAX提交封装(包含验证)
------------------------------------------------*/
function AjaxInitForm(formObj, btnObj, isDialog, urlObj, callback, opts) {
    var argNum = arguments.length; //参数个数
    $(formObj).Validform({
        btnSubmit: btnObj,
        tiptype: 3,
        callback: function (form) {
            if (opts.extraCheck && !opts.extraCheck()) {
                return false;
            }
            var ajaxSubmit = function () {
                //AJAX提交表单
                Util.ajax({
                    url: $(formObj).attr("url"),
                    type: opts.type || 'POST',
                    certificate: true,
                    beforeSend: formRequest,
                    data: opts.data && opts.data(),
                    success: formResponse,
                    error: formError,
                })
            };
            var _confirm = $(btnObj).attr("confirm");
            if (_confirm && _confirm != '') {
                //防止打开多个对话框
                if (dialog.get('dialogBox')) {
                    dialog.get('dialogBox').close().remove();
                }
                dialog({
                    id: 'dialogBox',
                    title: '提示',
                    content: _confirm,
                    okValue: '确定',
                    ok: function () { ajaxSubmit(); },
                    cancelValue: '取消',
                    cancel: function () { }
                }).show();
            }
            else {
                ajaxSubmit();
            }
            return false;
        }
    });

    //表单提交前
    function formRequest(formData, jqForm, options) {
        $(btnObj).prop("disabled", true);
        $(btnObj).val("提交中...");
    }

    //表单提交后
    function formResponse(data, textStatus) {
        if (data.status == 1) {
            $(btnObj).val("提交成功");
            //是否提示，默认不提示
            if (isDialog == 1) {
                var d = dialog({ content: data.message }).show();
                setTimeout(function () {
                    d.close().remove();
                    if (callback) {
                        callback();
                    } else {
                        location.reload();
                    }
                    // if (argNum == 5) {
                    //     callback();
                    // } else if (data.url) {
                    //     location.href = data.url;
                    // } else if ($(urlObj).length > 0 && $(urlObj).val() != "") {
                    //     location.href = $(urlObj).val();
                    // } else {
                    //     location.reload();
                    // }
                }, 2000);
            } else {
                if (callback) {
                    callback();
                } else {
                    location.reload();
                }
                // if (argNum == 5) {
                //     callback();
                // } else if (data.url) {
                //     location.href = data.url;
                // } else if ($(urlObj)) {
                //     location.href = $(urlObj).val();
                // } else {
                //     location.reload();
                // }
            }
        } else {
            dialog({
                title: '提示', content: data.message, okValue: '确定', ok: function () {
                    // if (data.message == "对不起，验证码超时或已过期！") {
                    //     if ($(".send").children("img").length > 0 && $(".send").children("img").eq(0).attr("src").indexOf("verify_code") > 0) {
                    //         $(".send").click();
                    //     }
                    // }
                }
            }).showModal();
            $(btnObj).prop("disabled", false);
            $(btnObj).val("再次提交");
        }
    }
    //表单提交出错
    function formError(XMLHttpRequest, textStatus, errorThrown) {
        dialog({ title: '提示', content: '状态：' + textStatus + '；出错提示：' + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        $(btnObj).prop("disabled", false);
        $(btnObj).val("再次提交");
    }
}

function myAlert(message, callback) {
    dialog({
        title: '提示', content: message.toString(), okValue: '确定', ok: function () {
            callback && callback()
        }
    }).showModal();
}
//显示评论AJAX分页列表
function AjaxPageList(listDiv, pageDiv, pageSize, pageCount, sendUrl, defaultAvatar) {
    //pageIndex -页面索引初始值
    //pageSize -每页显示条数初始化
    //pageCount -取得总页数
    InitComment(0);//初始化评论数据
    $(pageDiv).pagination(pageCount, {
        callback: pageselectCallback,
        prev_text: "« 上一页",
        next_text: "下一页 »",
        items_per_page: pageSize,
        num_display_entries: 3,
        current_page: 0,
        num_edge_entries: 5,
        link_to: "javascript:;"
    });

    //分页点击事件
    function pageselectCallback(page_id, jq) {
        InitComment(page_id);
    }
    //请求评论数据
    function InitComment(page_id) {
        page_id++;
        $.ajax({
            type: "POST",
            dataType: "json",
            url: sendUrl + "&page_size=" + pageSize + "&page_index=" + page_id,
            beforeSend: function (XMLHttpRequest) {
                $(listDiv).html('<p style="line-height:35px;">正在狠努力加载，请稍候...</p>');
            },
            success: function (data) {
                var strHtml = '';
                for (var i in data) {
                    strHtml += '<li>' +
                        '<div class="avatar">';
                    if (typeof (data[i].avatar) != "undefined" && data[i].avatar.length > 0) {
                        strHtml += '<img src="' + data[i].avatar + '" />';
                    } else {
                        strHtml += '<img src="' + defaultAvatar + '" />';
                    }
                    strHtml += '</div>' +
                        '<div class="inner">' +
                        '<p>' + unescape(data[i].content) + '</p>' +
                        '<div class="meta">' +
                        '<span class="blue">' + data[i].user_name + '</span>\n' +
                        '<span class="time">' + data[i].add_time + '</span>' +
                        '</div>' +
                        '</div>';
                    if (data[i].is_reply == 1) {
                        strHtml += '<div class="answer">' +
                            '<div class="meta">' +
                            '<span class="right time">' + data[i].reply_time + '</span>' +
                            '<span class="blue">管理员回复：</span>' +
                            '</div>' +
                            '<p>' + unescape(data[i].reply_content) + '</p>' +
                            '</div>';
                    }
                    strHtml += '</li>';
                }
                $(listDiv).html(strHtml);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $(listDiv).html('<p style="line-height:35px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>');
            }
        });
    }
}

//初始化视频播放器需配合ckplayer.js使用
function initCKPlayer(boxId, videoSrc, playerSrc) {
    var flashvars = {
        f: videoSrc,
        c: 0,
        loaded: 'loadedHandler'
    };
    var video = [videoSrc];
    CKobject.embed(playerSrc, boxId, 'video_v1', '100%', '100%', false, flashvars, video);
}

//切换用户身份
function changeUserType(userType) {
    if (userType == 0) {
        dialog({ title: "提示：", content: "普通会员(买家)身份不可以直接切换为商家，请去购买“买家转商家卡”，谢谢！" }).showModal();
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/tools/submit_ajax.ashx?action=change_user_type",
        dataType: "json",
        timeout: 20000,
        success: function (data, textStatus) {
            if (data.status == 1) {
                var d = dialog({ content: data.msg }).show();
                setTimeout(function () {
                    d.close().remove();
                    location.href = "/user/center/index.html";
                }, 1000);
            } else {
                dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialog({ title: '提示', content: "状态：" + textStatus + "；出错提示：" + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        }
    });
}


window.Util = {
    baseURL: 'http://localhost:3000',
    __dirname: '/',
    ajax: function (opts) {
        opts = opts || {};
        if (!opts.data) {
            opts.data = {};
        }
        if (opts.certificate) {
            opts.data['token'] = Util.getCookie('token');
        }
        $.ajax({
            url: this.baseURL + opts.url,    //请求的url地址
            dataType: opts.dataType || "json",   //返回格式为json
            async: opts.async || true,//请求是否异步，默认为异步，这也是ajax重要特性
            data: opts.data || {},    //参数值
            type: opts.type || "GET",   //请求方式
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
            beforeSend: function (XMLHttpRequest) {
                //请求前的处理
                opts.beforeSend && opts.beforeSend(XMLHttpRequest);
            },
            success: function (req, textStatus) {
                // || req.status === 20001
                if (req.status == 10006) {
                    Util.setCookie('token', null);
                    Util.login();
                    // myAlert(req.message, function () {

                    // })
                } else {
                    //请求成功时处理
                    opts.success && opts.success(req, textStatus);
                }

            },
            complete: function () {
                //请求完成的处理
                opts.complete && opts.complete();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //请求出错处理
                opts.error && opts.error(XMLHttpRequest, textStatus, errorThrown);
                console.log(textStatus);
            }
        });
    },
    //写Cookie
    setCookie: function (name, value, options) {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        var HttpOnly = options.HttpOnly ? '; HttpOnly' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure, HttpOnly].join('');
    },

    //读Cookie
    getCookie: function (objName) {//获取指定名称的cookie的值
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) return unescape(temp[1]);
        }
        return "";
    },
    /**
     * 退出
     */
    logOut: function () {
        Util.ajax({
            url: '/api/user/logout',
            certificate: true,
            type: 'PUT',
            success: function (res) {
                if (res.status === 1) {
                    Util.setCookie('token', null);
                    Util.login();
                }
            }
        })
    },

    /**
    * 登录
    */
    login: function () {
        window.location.replace('/login');
    },

    getToken: function () {
        return Util.getCookie('token');
    },

    getUrlSearch: function (param) {
        var search = location.search;
        var reg = new RegExp("[\\?\\&]" + param + "=([^&]*)(&|$)");
        var match = reg.exec(search);
        if (match) {
            return match[1];
        }
    },

    getReturnURL: function () {
        var search = location.search;
        var match = /^\?returnurl=(.*)$/.exec(search);
        if (match) {
            return match[1];
        }
    }
}

// !function permission() {
//     var pathname = window.location.pathname;
//     var match = /\/([^\/]*)(?=.html)/.exec(pathname)[1];
//     var whitelist = [
//         'login',
//         'register',
//         'registerbuyer',
//         'registerseller',
//         'repassword',
//         'repaypassword',
//         'requestion',
//         'search',
//         'service',
//         'about',
//         'contact'
//     ]
//     if (!whitelist.includes(match) && !Util.getCookie('token')) {
//         Util.login();
//     }
// }()

$.fn.uploadImg = function (callback) {
    $(this).click(function (e) {
        var that = $(this);
        var form = document.createElement('form');
        form.method = "post";
        form.enctype = 'multipart/form-data';
        const file = document.createElement('input')
        file.type = 'file';
        file.name = "file"
        file.accept = "image/png,image/gif,image/jpeg"
        form.appendChild(file);
        form.style.display = 'none';
        document.body.appendChild(form);
        file.onchange = function () {
            var files = this.files;
            if (files.length !== 1) {
                return false
            }
            files = files.item(0);
            var reader = new FileReader();
            reader.onload = function () {
                var dom = that.siblings(".upload-image");
                dom && dom.attr('src', this.result);
                callback && callback(that, this.result);
            }
            reader.readAsDataURL(files);
            this.value = null;
            this.onchange = null;
        }
        file.click();
    })
}

$(function () {
    // if ($('#topbarWrap').length) {
    //     try {
    //         var tapbar = new Vue({
    //             el: '#topbarWrap',
    //             data: {
    //                 username: '***********',
    //                 total_msg: 0
    //             },
    //             created() {
    //                 this.getInfo();
    //             },
    //             methods: {
    //                 getInfo: function () {
    //                     Util.ajax({
    //                         type: "POST",
    //                         url: "/api/user/info",
    //                         certificate: true,
    //                         dataType: "json",
    //                         timeout: 20000,
    //                         success: function (data, textStatus) {
    //                             var info = data.data.info;
    //                             this.username = info.username;
    //                             this.total_msg = info.newest_message_count;
    //                         }.bind(this)
    //                     });
    //                 }
    //             },
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    $('#topbar').on('click', '.logout', function (e) {
        e.preventDefault();
        Util.logOut();
    })
    //绑定开启异地登录限制点击事件
    $("#checkLoginCity").click(function () {
        var obj = this;
        $.ajax({
            type: "get",
            url: "/tools/submit_ajax.ashx",
            data: { action: "check_login_city", value: $(this).prop("checked") },
            dataType: "json",
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                dialog({
                    title: '提示',
                    content: '设置超时，请稍候再试！错误信息：' + XMLHttpRequest + "  = " + errorThrown,
                    align: 'left',
                    okValue: '确定',
                    ok: function () { }
                }).show(obj);
            },
            success: function (data, textStatus) {
                if (data.status == 1) {
                    var d = dialog({ content: data.msg, align: 'left' }).show(obj);
                    setTimeout(function () {
                        d.close().remove();
                    }, 1500);
                } else {
                    dialog({
                        title: '提示',
                        content: '错误提示：' + data.msg,
                        align: 'left',
                        okValue: '确定',
                        ok: function () { }
                    }).show(obj);
                }
            }
        });
    });

    if (getCookie("member_tips") == '') {
        addCookie("member_tips", "1", 24)
        dialog({
            title: '新手会员提醒信息',
            url: 'html/member_tips.html',
            okValue: ' 关 闭 ',
            ok: function () { }
        }).show();
    }
    //记录点击菜单展开或收缩状态
    $(".m-sidecont dt").click(function () {
        var dd = $(this).siblings("dd");
        if (dd.is(":hidden")) {
            dd.show("fast");
            $(this).find("i").removeClass("ihide");
            addCookie("member_center_menu_" + $(".m-sidecont dt").index(this), "black", 72);
        }
        else {
            dd.hide("fast");
            $(this).find("i").addClass("ihide");
            addCookie("member_center_menu_" + $(".m-sidecont dt").index(this), "none", 72);
        }
    });
    //根据cookie记录的菜单展开或收缩的状态遍历设置一次
    $(".m-sidecont dt").each(function (index, element) {
        var _display = getCookie("member_center_menu_" + index);
        if (_display == "none") {
            $(this).siblings("dd").hide();
            $(this).find("i").addClass("ihide");
        }
        else {
            $(this).siblings("dd").show();
        }
    });
    $("#j_topNavMenuHover").hover(function () {
        $(this).addClass("top-nm-hover");
    },
        function () {
            $(this).removeClass("top-nm-hover");
        }
    );
    //账户设置子导航
    $(".m_SubMenuHover").hover(function () {
        $(this).find(".nav-sub").show().stop().animate({ opacity: 1, marginTop: "5px" }, 300);
    },
        function () {
            $(this).find(".nav-sub").stop().animate({ opacity: 0, marginTop: "-15px" }, 300, null, function () {
                $(this).hide();
            });
        }
    );
})