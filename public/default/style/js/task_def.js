//==================================================
// 目前仅已接发任务页面用到
// 最后更新：2016-10-25
//==================================================

//弹出一个Dialog窗口 基于artdialog插件========================
function jsDialog(title, content, callback, obj, align) {
    //防止打开多个对话框
    if (dialog.get('dialogBox')) {
        dialog.get('dialogBox').close().remove();
    }
    var d = dialog({
        id: 'dialogBox',
        title: title,
        content: content,
        okValue: '确定',
        ok: function () {
            callback();
            return false;
        },
        cancelValue: '取消',
        cancel: function () { }
    });
    if (obj) {
        d.align = align ? align : "left";
        d.show(obj);
    } else {
        d.show();
    }
    return false;
}

//URL加上参数param
function RewriteUrl(url, param) {
    if (param == '') return url;
    if (url.indexOf(".aspx") > 0) {
        url += "&param=" + param;
    } else if (url.indexOf(".htm") > 0) {
        url = url.replace(".htm", "-" + param + ".htm");
    }
    return url;
}

function CheckAddTime(url) {
    var AddTime = $("#AddTime").val();
    if (AddTime == '') {
        alert('请输入分钟数！');
        $("#AddTime").focus();
        return false;
    }
    if (AddTime != '' && AddTime < 2 || AddTime > 30) { alert('请输入最小2到30之间的整数！'); return false; }
    if (AddTime != '') { location.href = RewriteUrl(url, AddTime); }
    return false;
}
//任务加时
function TaskAddTime(url, obj) {
    jsDialog("支付加时", "请输入您想给接手方延迟支付的时间，单位为分钟（默认为10分钟）<br /><br />加时时间：<input name='AddTime' id='AddTime' style='width:100px;' value='10' title='请输入最小2到30之间的整数！'> 分钟", function () { CheckAddTime(url) }, obj);
}

//任务追加发布点
function TaskAddPoint(url, obj) {
    jsDialog("任务追加发布点", "在现有发布点基础上再增加些发布点给接手人，增加越多任务越靠前，超容易被接手！<br /><br />追加发布点：<input name='AddPoint' id='AddPoint' style='width:50px;' value='1' title='请输入最小0.5到10之间的数字！'> 点 &nbsp; （可取值范围0.5到10数字）", function () { CheckAddPoint(url) }, obj, "top");
}
function CheckAddPoint(url) {
    var AddPoint = $("#AddPoint").val();
    if (AddPoint == '') {
        alert('请输入追加发布点！');
        $("#AddPoint").focus();
        return false;
    }
    if (AddPoint != '' && AddPoint < 0.5 || AddPoint > 10) { alert('请输入最小0.5到10之间的数字！'); return false; }
    if (AddPoint != '') { location.href = RewriteUrl(url, AddPoint); }
    return false;
}

//任务绑定买号倒计时
var _iidd = 1;
function CheckTime(t) {
    if (t < 0) t = 0;
    var id = "iidd_" + (_iidd++);
    var str = "<span class='red' id='" + id + "'>" + parseInt(t / 60) + "分" + t % 60 + "秒</span>";
    document.write(str);
    var uptime = function () {
        t = t - 1;
        if (t <= 0) {
            window.clearInterval(tt_0);
            t = 0;
            //			location.reload();
        }
        document.getElementById(id).innerHTML = parseInt(t / 60) + "分" + t % 60 + "秒";
    }
    var tt_0 = window.setInterval(uptime, 1000);
}

//任务收货倒计时
var _hhiidd = 1;
function CheckTimeHour(t) {
    if (t < 0) t = 0;
    var id = "hhiidd_" + (_hhiidd++);
    var str;
    if (parseInt(t / 60 / 60 / 24) > 1)
        str = "<span class='red' id='" + id + "'>" + parseInt(t / 60 / 60 / 24) + "天后</span>";
    else
        str = "<span class='red' id='" + id + "'>" + parseInt(t / 60 / 60) + "小时</span>";
    document.write(str);
    var uptime = function () {
        t = t - 1;
        if (t <= 0) {
            window.clearInterval(tt_0);
            t = 0;
        }
        if (parseInt(t / 60 / 60 / 24) > 1)
            document.getElementById(id).innerHTML = parseInt(t / 60 / 60 / 24) + "天后";
        else
            document.getElementById(id).innerHTML = parseInt(t / 60 / 60) + "小时";
    }
    var tt_0 = window.setInterval(uptime, 1000);
}


function IsGetTask() {
    return confirm("您确定要接手此任务吗？");
}

function IsDelTask(p) {
    return confirm("删除该任务将返还您扣押在平台任务的担保金和" + p + "%任务发布点\n\n您确定要删除吗？");
}

function IsPauseTask() {
    return confirm("您确定要暂停该任务吗？\n\n暂停后将不会显示在任务大厅！");
}

function IsRefreshTask(obj) {
    var p = 0;	//如果刷新发布时间要扣发布点的话，把0改成多少点即可
    var m;
    if (p > 0)
        m = "\n\n但是每刷新一次需要额外扣除 " + p + " 个发布点，";
    else
        m = "(此项服务免费)";
    if (confirm("刷新任务发布时间可提高任务排名靠前！" + m + "\n\n您确定要刷新吗？")) {
        if (p > 0) obj.href = RewriteUrl(obj.href, p);
        return true;
    }
    else {
        return false;
    }
}

function IsRejectTask(i) {
    if (i < 3)
        return confirm("您确定要取消该任务的接手人吗？\n\n将任务恢复到“等待接手”状态吗？");
    else
        return confirm("您已取消" + i + "个该任务的接手人了，再取消接手人需要额外支付发布点；\n\n您确定要取消吗？");
}

function IsQuitTask() {
    return confirm("您确定要退出该任务吗？");
}

function IsPayTask(plat, times) {
    if (times == 9)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为7天后好评任务，请在发布人发货后7天后再确认收货和好评");
    else if (times == 8)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为6天后好评任务，请在发布人发货后6天后再确认收货和好评");
    else if (times == 7)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为5天后好评任务，请在发布人发货后5天后再确认收货和好评");
    else if (times == 6)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为4天后好评任务，请在发布人发货后4天后再确认收货和好评");
    else if (times == 5)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为3天后好评任务，请在发布人发货后3天后再确认收货和好评");
    else if (times == 4)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为2天后好评任务，请在发布人发货后2天后再确认收货和好评");
    else if (times == 3)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为1天后好评任务，请在发布人发货后1天后再确认收货和好评");
    else if (times == 2)
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！\n\n【注意】该任务为30分钟后好评任务，请在发布人发货后30分钟后再确认收货和好评");
    else
        return confirm("请确保在" + plat + "上已经拍下发布方指定的宝贝并且支付后，才可以回到平台点击“已经支付”按钮，否则一经投诉将做封号处理！");
}

function IsUnpayTask(plat) {
    return confirm("如果你刚才误点击【已经支付】按钮，或者确认" + plat + "还没支付成功，或者不打算完成此任务，可以点击此按钮。\n\n确认返回后，任务将返回到“已绑定买号，等待您购买并支付”状态！");
}

function IsBuyUserVerify() {
    return confirm("您确定允许接手方查看该任务的商品地址吗？");
}

function IsSendTask(n) {
    return confirm("您确认已经完成发货了吗？\n\n发货后请留意接手方是否已好评并及时给对方审核，如果接手方已经好评你却没审核或申诉行为，\n\n系统将会在好评后" + n + "小时自动审核并返款。");
}

function CheckModHPTime(url) {
    var ModTime = $("#ModTime").val();
    if (ModTime == '') {
        alert('请输入小时数！');
        $("#ModTime").focus();
        return false;
    }
    if (ModTime != '' && ModTime < 0 || ModTime > 72) { alert('请输入0到72的整数！'); return false; }
    if (ModTime != '') { location.href = RewriteUrl(url, ModTime); }
    return false;
}
//提前收货
function IsModHPTime(url, obj) {
    jsDialog("提前收货", "<b>您确定要提前允许接手方收货吗？<br><br>为了您网店安全，平台建议实物商品尽量超过48小时收货。提前收货，平台不退还任务发布点。</b><br><br>请输入你想给接手方提前收货时间，单位为小时，想立即收货请输入 0<br><br>&nbsp; &nbsp; &nbsp; 提前时间：<input name='ModTime' id='ModTime' style='width:100px;' value='12'> 小时", function () { CheckModHPTime(url) }, obj);
}

function changeDelayDay(e, url, n) {
    var Point = new Array();
    Point[1] = 2;   //延迟1天 默认扣2个点
    Point[2] = 4;   //延迟2天 默认扣4个点
    $('#DelayPoint').html(Point[e.options[e.selectedIndex].value]);
    if (n == 1) {
        location.href = RewriteUrl(url, e.options[e.selectedIndex].value + ',' + Point[e.options[e.selectedIndex].value]);
        return true;
    }
}
//延迟收货
function IsDelayHPTime(url, obj) {
    jsDialog("延迟收货", "<b>您确定要为该任务延迟收货吗？<br><br>如果物流快递未能在规定时间内签收等类似原因，可为对方延迟收货时间。</b><br><br>&nbsp; &nbsp; &nbsp; 请选择延迟天数：<select name='DelayTime' id='DelayTime' style='width:60px;' onchange='changeDelayDay(this," + url + ",0)'><option value=1>1天</option><option value=2>2天</option></select> &nbsp; 额外扣 <span id='DelayPoint' class='red'>2</span> 个发布点</span>", function () { changeDelayDay(document.getElementById('DelayTime'), url, 1); }, obj);
}

function IsConfirmTask(sitename) {
    return confirm("确认审核后，您的该任务担保金与发布点将转入到接手方账户。\n\n请您确认" + sitename + "已经收到接手方的任务同等金额，且已经收到对方好评！\n\n如果接手方没按你要求完成好评，你可以申诉他。");
}

//订单无效，驳回订单
function IsReject(url, obj) {
    jsDialog("订单无效，驳回订单", "请输入驳回原因：<input name='rejectContent' id='rejectContent' class='input wide300' style='width:300px;' value=''><br>（驳回后买家可以纠正或重新下单）", function () { DoReject(url); }, obj, "left");
}
function DoReject(url) {
    var rejectContent = $("#rejectContent").val();
    if (rejectContent == '') {
        alert('请输入驳回原因！');
        $("#rejectContent").focus();
        return false;
    }
    location.href = RewriteUrl(url, rejectContent);
    return false;
}

function IsGradeTask(h, sitename) {
    if (h <= 0)
        return confirm("您确认在" + sitename + "上已经按照任务要求进行好评了吗？请真实提交，否则一经投诉将严惩！\n\n确认已经收货并好评后等待发布方审核，您就可以获得该任务发布点和任务担保金。\n\n任务好评后，可以联系发布方QQ催一下放款，如果发布方超过规定时间还没主动放款，可以联系平台客服投诉！");
    else
        return confirm("抱歉！该任务还没到规定收货与好评时间。请耐心等待！");
}

//打开商品地址
function openPrdUrl(url, obj) {
    //var isIe = /MSIE [5-9]+./.test(navigator.userAgent);
    //仅限IE内核可open，因为弹窗不带来路，其他有可能带来路
    if (window.clipboardData) {
        try {
            window.open(url);
            return false;
        } catch (e) { }
    }
    if (prompt('请你使用 Ctrl+C 或右键点击复制到剪贴板，再到浏览器打开。', url)) {
        //alert("您已经成功复制了网址，请粘贴到浏览器的地址栏，然后打开");
    }
    return false;
}

///////////   以下暂时没用的  ////////////////////
///////////////////////////////////////////////

function IsReceiveTask(sitename, isStr, isIP) {
    if (isIP == 1) {
        alert("为了发布人的安全，请您更换IP后再进行确认收货");
        return false;
    }
    if (isStr && confirm("该任务为带字好评，请务必【复制好评内容】给对方带字的评价")) {
        return confirm("请再次检查" + sitename + "上已经确认收货了，并且已经提交了好评\n\n如果提交不属实将视为放弃申诉权\n\n");
    } else {
        return confirm("请再次检查" + sitename + "上已经确认收货了，并且已经提交了好评\n\n如果提交不属实将视为放弃申诉权\n\n");
    }
}

function changeIPTip(sitename) {
    alert("为了您和发布人的安全，请您先更换IP然后清空Cookies；\n\n再使用查询的买号登录" + sitename + "去确认收货和提交好评");
}