//**********************************************************************************************
// 最后更新日期：2019-3-2
//**********************************************************************************************

//自动收缩增值功能区
function autoshow() {
    if (getCookie_current('AddTaskFunction') == "none") {
        $("#function_div").hide();
        $("#showfont").html("<strong>点击展开↓</strong>");
    }
}
function chkshow() {
    if ($("#function_div").is(":hidden")) {
        $('#function_div').show(300);
        $("#showfont").html("<strong>点击收缩↑</strong>");
        SetCookie_current("AddTaskFunction", "block");
    } else {
        $("#function_div").hide(300);
        $("#showfont").html("<strong>点击展开↓</strong>");
        SetCookie_current("AddTaskFunction", "none");
    }
}
function chkshow2() {
    if ($("#keyword_div").is(":hidden")) {
        $('#keyword_div').show(300);
        $("#showfont2").html("<strong>点击收缩↑</strong>");
    } else {
        $("#keyword_div").hide(300);
        $("#showfont2").html("<strong>点击展开↓</strong>");
    }
}

//写cookies函数 
function SetCookie_current(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000); //此 cookie 将被保存 30 天 
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//取cookies函数 
function getCookie_current(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

var regPatrn = (document.all) ? /\r\n/mg : /\n/mg;
var product_count;    //统计商品地址数量
var is_async = true;
function CheckForm() {
    //if (document.myform.txtCategoryID.value == "0") { alert("请选择任务栏目！"); return false; }
    // if (getRV("rblShopName") == "") { alert('请选择掌柜名！'); return false; }
    if (!$('#rblShopName').length) { alert('请选择掌柜名！'); return false; }
    if (getValue('product_url') == '') { alert('商品网址不能为空!'); getObj('product_url').focus(); return false; }
    var str = getValue('product_url');
    product_count = 1;
    if (getObj("is_shop_cart") && getObj("is_shop_cart").checked) {
        arr_str = str.split(regPatrn);
        product_count = arr_str.length;
        if (arr_str.length < 3) { alert('购物车任务至少要发布3条商品地址!'); return false; }
        if (arr_str.length > 6) { alert('购物车任务一次最多只能发布6条商品地址!'); return false; }
    }

    if (getValue('price') == '' || IsPlusNumeric(getValue('price')) == false) { alert('任务担保价格必需填写数字!'); getObj('price').focus(); return false; }
    if (getValue('price') < 1 || getValue('price') > 3000) { alert('任务担保价格请输入1-3000元以内!'); getObj('price').focus(); return false; }

    if (getValue('point') == '' || IsPlusNumeric(getValue('point')) == false) { alert('发布点必须填写数字!'); getObj('point').focus(); return false; }

    if (getValue('sort_point') != "" && getValue('sort_point') != "0") {
        if (IsPlusNumeric(getValue('sort_point')) == false) { alert('追加发布点必须填写数字!'); getObj('sort_point').focus(); return false; }
        if (getValue('sort_point') < 0.3 || getValue('sort_point') > 10) { alert('追加发布点请输入0.3-10以内!\n\n不追加请保留空!'); getObj('sort_point').focus(); return false; }
    }

    if (getRV("xushi_type") == "") { alert("请选择是“虚拟”还是“实物”？"); getObj('xushi_type').focus(); return false; }

    if (getObj("txtShopSiteID")) {
        var ShopSiteID = getValue('txtShopSiteID');
        if (ShopSiteID == "1") {
            if (getRV("xushi_type") == '2') {
                if (getObj("is_shop_cart") && getObj("is_shop_cart").checked) {
                    alert('提示：\n\n搭配套餐任务，不可以使用购物车，反之购物车任务不可以使用搭配套餐！');
                    getObj('is_shop_cart').focus();
                    return false;
                }
                if (!/^https?:\/\/[^%\*\/\?]{2,20}\.((taobao)|(tmall)|(alitrip)|(fliggy)|(95095))\.com\/((meal_detail)|(mealDetail))\.htm.*?[\?\&](meal_?)?id=\d{8,12}/i.test(str)) {
                    alert('系统检测到你的商品网址不正确，套餐商品网址格式应为：\n\nhttp://detail.taobao.com/meal_detail.htm?meal_id=xxxxxxxx\n\n请在您的淘宝店铺首页打开商品然后再复制商品网址！');
                    getObj('product_url').focus();
                    return false;
                }
            } else if (!/^https?:\/\/[^%\*\/\?]{2,20}\.((taobao)|(tmall)|(alitrip)|(fliggy)|(95095))\.com\/((item2?)|(item_2)|(detail))\.htm.*?[\?\&](item_?)?id=\d{8,12}/i.test(str)) {
                alert('系统检测到你的商品网址不正确，商品网址格式应为：\n\nhttp://item.taobao.com/item.htm?id=xxxxx\nhttp://item.beta.taobao.com/item.htm?id=xxxxx\nhttp://item.lp.taobao.com/item.htm?item_id=xxxxx\nhttp://detail.tmall.com/item.htm?id=xxxxx\n\n请在您的淘宝店铺首页打开商品然后再复制商品网址！');
                getObj('product_url').focus();
                return false;
            }
        }
        else if (ShopSiteID == "2") {
            if (!/^https?:\/\/([^%\*\/\?]+)\.((1688)|(alibaba))\.com\/.*?\d{10,}/i.test(str)) {
                alert('系统检测到你的商品网址不正确，商品网址格式应为：\n\nhttps://detail.1688.com/offer/528435643xxx.html\n\n请在您的店铺首页打开商品然后再复制商品网址！');
                getObj('product_url').focus(); return false;
            }
        }
        else if (ShopSiteID == "3") {
            if (!/^https?:\/\/([^%\*\/\?]+)\.jd\.com\/.*?\d{6,}/i.test(str)) {
                alert('系统检测到你的商品网址不正确，商品网址格式应为：\n\nhttp://xxx.jd.com/xxxxx\n\n请在您的店铺首页打开商品然后再复制商品网址！');
                getObj('product_url').focus(); return false;
            }
        }
        else if (ShopSiteID == "4") {
            if (!/^https?:\/\/([^%\*\/\?]+)\.mogujie\.com\/detail\/\w+/i.test(str)) {
                alert('系统检测到你的商品网址不正确，商品网址格式应为：\n\nhttp://shop.mogujie.com/detail/xxxxxxx\n\n请在您的店铺首页打开商品然后再复制商品网址！');
                getObj('product_url').focus(); return false;
            }
        }
        else if (ShopSiteID == "5") {
            if (!/^https?:\/\/([^%\*\/\?]+)\.((yangkeduo)|(pinduoduo))\.com\/.*?\d{7,}/i.test(str)) {
                alert('系统检测到你的商品网址不正确，商品网址格式应为：\n\nhttp://mobile.yangkeduo.com/goods.html?goods_id=1723xxxxxx');
                getObj('product_url').focus(); return false;
            }
        }
    }

    if (DataLength(getValue('haoping_content')) > 255) { alert("好评内容不能超过255个字符！"); getObj('haoping_content').focus(); return false; }
    //if (getValue('haoping_content').indexOf('带字') >= 0 || getValue('haoping_content').indexOf('好评') >= 0 || getValue('haoping_content').indexOf('评分') >= 0 || getValue('haoping_content').indexOf('评价') >= 0 || getValue('haoping_content').indexOf('收藏') >= 0 || getValue('haoping_content').indexOf('请') >= 0) { alert('评价内容不允许含有“带字”、“好评”、“评价”、“评分”、“收藏”、“请”等字眼\n\n如果您是新手，为了保障您的利益，最好先请教客服人员或到论坛去学习了解下！'); getObj('haoping_content').focus(); return false; }

    if (DataLength(getValue('message_remind')) > 350) { alert("留言提醒内容不能超过350个字符！"); getObj('message_remind').focus(); return false; }
    //if (getValue('message_remind').indexOf('收藏') >= 0 || getValue('message_remind').indexOf('搜索') >= 0 || getValue('message_remind').indexOf('套餐') >= 0 || getValue('message_remind').indexOf('旺旺') >= 0 || getValue('message_remind').indexOf('旺聊') >= 0 || getValue('message_remind').indexOf('假聊') >= 0 || getValue('message_remind').indexOf('分享') >= 0) { alert('留言内容不允许含有“收藏”、“搜索”、“套餐”、“旺旺”、“旺聊”、“假聊”、“分享”等字眼\n\n如需要请选择增值功能区选项！'); getObj('message_remind').focus(); return false; }

    if (getObj("is_shai_tu").checked) {
        if (Trim(getValue('shaiTu_photoUrl')) == '' && Trim(getValue('shaiTu_photoUrl2')) == '' && Trim(getValue('shaiTu_photoUrl3')) == '') {
            alert('要求晒图的图片地址不能为空！如果不想启用\n\n请把前面的勾去掉即可。');
            getObj('shaiTu_photoUrl').focus(); return false;
        }
    }

    if (getObj("isAddHaoping").checked) {
        if (getValue('addHaoPingContent') == '') { alert('追加的好评内容不能为空！如果不想启用\n\n请把前面的勾去掉即可。'); getObj('addHaoPingContent').focus(); return false; }
        if (DataLength(getValue('addHaoPingContent')) >= 255) { alert("追加的好评内容不能超过255个字符！"); getObj('addHaoPingContent').focus(); return false; }
    }

    if (getValue('isRealExpress') == '1' || getValue('isRealExpress') == '2') {
        if ($('#haoping_limit').val() != '10') {
            alert('签收快递项与所选收货好评要求方式不符，请重新选择【收货好评时间】');
            getObj('haoping_limit').focus(); return false;
        }
        if (getRV("xushi_type") == '' || getRV("xushi_type") == '0') {
            alert('签收快递任务不能是虚拟任务哦，请重新选择【收货好评时间】');
            getObj('haoping_limit').focus(); return false;
        }
    } else {
        if ($('#haoping_limit').val() == '10') {
            alert('签收快递项与所选收货好评要求方式不符，请重新选择【收货好评时间】');
            getObj('haoping_limit').focus(); return false;
        }
    }

    if (getObj("isModAddress") && getObj("isModAddress").checked) {
        if (getValue('mod_address') == '') { alert('指定的收货地址不能为空！如果不想启用\n\n请把前面的勾去掉即可。'); getObj('isModAddress').focus(); return false; }
        if (DataLength(getValue('mod_address')) >= 255) { alert("收货地址不能超过255个字符！"); getObj('mod_address').focus(); return false; }
    }

    if (getObj("isLimitCity").checked) {
        if (getValue('Province') == '') { alert('请选择仅允许那个省份接手，如果不想限制\n\n请把前面的勾去掉即可。'); getObj('Province').focus(); return false; }
    }

    //if (getObj("isPlanAddDate").checked) {
    //    if (getValue('planAddDate') == '') { alert('计划发布时间没填写，如果不想计划发布\n\n请把前面的勾去掉即可。'); getObj('planAddDate').focus(); return false; }
    //}

    //if (getObj("isContinueAdd").checked) {
    //    if (getValue('continueAddNum') == '' || IsInteger(getValue('continueAddNum')) == false || IsIntegerInRange(getValue('continueAddNum'), 2, 200) == false) { alert('计划批量发布任务的“连续发布几条任务”请输入2到200的整数！\n\n如果不想批量发布，请把前面的勾去掉即可！'); getObj('continueAddNum').focus(); return false; }
    //}

    if ($(".into_store_type:checked").val() == '4') {
        if (getValue('lailuSearchPhoto_url') == '') { alert('请先上传二维码图片！'); getObj('lailuSearchPhoto_url').focus(); return false; }
    }

    var into_store_type = $(".into_store_type:checked").val();
    var total_num = 0, each_flag = false;
    $(".continueAddNum").each(function (index) {
        var num = $(this).val();
        if (/^\d+$/.test(num) == false) {
            alert('亲，请输入有效的数值！'); $(this).focus(); each_flag = true; return false;
        }
        if (num != '' && parseInt(num) > 0) {
            total_num += num;
            if (into_store_type != '0' && into_store_type != '4') {
                if ($(".search_key").eq(index).val() == '') {
                    alert('亲，请先填写关键词或把发布数量改为0'); $(".search_key").eq(index).focus(); each_flag = true; return false;
                }
            }
        }
    });
    if (each_flag) return false;
    $(".continueAddTime").each(function (index) {
        var num = $(this).val();
        if (/^\d+$/.test(num) == false) {
            alert('亲，请输入有效的数值！'); $(this).focus(); each_flag = true; return false;
        }
    });
    if (each_flag) return false;
    if (into_store_type != '0' && into_store_type != '4') {
        $(".search_key").each(function (index) {
            var key = $(this).val();
            var num = $(".continueAddNum").eq(index).val();
            if (key != '' && (num == '' || num == '0')) {
                alert("亲，关键词中的发布数量还没填写哦！"); $(".continueAddNum").eq(index).focus(); each_flag = true; return false;
            }
        });
        if (each_flag) return false;
    }
    if (total_num <= 0) {
        alert("亲，还没有填写任务数量哦！");
        $(".continueAddNum").eq(0).focus(); return false;
    }

    if (getObj("istpl").checked) {
        if (getValue('tplName') == '') { alert('任务模板名不能为空！\n\n如果不想保存模板，请把前面的勾去掉即可！'); getObj('tplName').focus(); return false; }
    }
    if (getObj("pay_password") && getValue('pay_password') == '') { alert('请输入二级密码！'); getObj('pay_password').focus(); return false; }

    ChangePoint(getObj("price"));
    $("#submit_btn").attr({ value: "提交中..", disabled: true });
    CountPoint();
    if (Confirm() == true) {
        if ($('#product_pic').val() == '') {
            is_async = false;
            GetTitle();
            is_async = true;
            if ($('#product_pic').val() == '') {
                alert('亲，请上传主图再提交！');
                $("#submit_btn").attr({ value: "确认提交", disabled: false });
                getObj('product_url').focus();
                return false;
            }
        }
        return chk_shopname();
    }
    $("#submit_btn").attr({ value: "确认提交", disabled: false });
    return false;
}

//获取某ID的数值
function getFloat(id) {
    var d = parseFloat(getValue(id));
    if (isNaN(d))
        return 0;
    else
        return d;
}

//计算某增值功能发布点
function getCalc(point, str) {
    if (str.indexOf('+') > 0)
        return point * parseFloat(str.split('+')[0]) + parseFloat(str.split('+')[1]);
    else
        return point * parseFloat(str);
}

//确认发布
function Confirm() {
    var userMoney = +$('#user_amount').text();
    var userPoint = +$('#user_point').text();
    var strPoint = getFloat('total_point');
    var strPrice = getFloat('total_price');
    var haoPing = $('#haoping_limit').val();
    var msg = '请确认以下信息：\n\n';
    var serviceCost = 0;
    if (getObj('service_cost') && getValue('service_cost') != '') {
        serviceCost = parseFloat(getValue('service_cost'));
    }
    //if (getObj('isContinueAdd').checked) {
    //    msg += '批量发布任务数量：' + getFloat('continueAddNum') + '条\n';
    //    if (serviceCost > 0) serviceCost *= getFloat('continueAddNum');
    //}
    var total_num = 0;
    $(".continueAddNum").each(function (index) {
        var val = parseInt($(this).val());
        if (val > 0) {
            total_num += val;
        }
    });
    if (total_num > 1) {
        msg += '发布任务数量共：' + total_num + '条\n';
        if (serviceCost > 0) serviceCost *= total_num;
    }
    msg += '收货好评时间：';
    if (haoPing == 1) msg += '马上好评';
    if (haoPing == 2) msg += '30分钟后好评';
    if (haoPing == 3) msg += '1天后好评';
    if (haoPing == 4) msg += '2天后好评';
    if (haoPing == 5) msg += '3天后好评';
    if (haoPing == 6) msg += '4天后好评';
    if (haoPing == 7) msg += '5天后好评';
    if (haoPing == 8) msg += '6天后好评';
    if (haoPing == 9) msg += '7天后好评';
    if (haoPing == 10) msg += '物流显示签收后好评';
    if (parseInt(getValue('pay_type')) < 3) {
        if (strPrice > parseFloat(userMoney)) {
            alert('抱歉！您账号的余额不足，请充值后再来发布！\n\n当前您账号余额：' + parseFloat(userMoney) + ' 元\n\n任务担保总价格：' + strPrice + ' 元');
            // $("#update_amount, #update_point").fadeIn(500);
            // return false;
        }
    }
    if (strPoint.toFixed(2) > parseFloat(userPoint)) {
        alert('抱歉！您账号的发布点不够，请购买发布点后再来发布！\n\n当前您账号发布点：' + parseFloat(userPoint) + ' 点\n\n任务总消耗发布点：' + strPoint.toFixed(2) + ' 点');
        // $("#update_amount, #update_point").fadeIn(500);
        // return false;
    }
    var tmpMsg = '';
    if (serviceCost > 0) {
        strPrice -= serviceCost;
        tmpMsg = '平台服务费共：' + serviceCost.toFixed(2) + ' 元\n';
    }
    return confirm(msg + '\n商品总下单价格：' + strPrice.toFixed(2) + ' 元\n' + tmpMsg + '共支出发布点：' + strPoint.toFixed(2) + ' 点');
}

//统计所需发布点
function CountPoint() {
    var basePoint = +$('#point').val();
    var totalPoint = basePoint;
    if ($('#is_shai_tu').is(':checked')) {
        var p = $('#is_shai_tu').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#isAddHaoping').is(':checked')) {
        var option = $("#addHaopingDay option:selected");
        var p = option.data('value');
        totalPoint += (+p);
    }
    if ($('#is_after_sales').is(':checked')) {
        var p = $('#is_after_sales').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#isCollect').is(':checked')) {
        var p = $('#isCollect').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#is_delay_buy').is(':checked')) {
        var option = $("#delay_buy_day option:selected");
        var p = option.data('value');
        totalPoint += (+p);
    }
    if ($('#ask_everyone').is(':checked')) {
        var p = $('#ask_everyone').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#product_share').is(':checked')) {
        var p = $('#product_share').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#is_credit_payment').is(':checked')) {
        var p = $('#is_credit_payment').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#is_huabei_limit').is(':checked')) {
        var p = $('#is_huabei_limit').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#is_maihao_limit').is(':checked')) {
        var option = $("#maihao_limit option:selected");
        var p = option.data('value');
        totalPoint += (+p);
    }
    if ($('#is_taoqizhi_limit').is(':checked')) {
        var option = $("#taoqizhi_limit option:selected");
        var p = option.data('value');
        totalPoint += (+p);
    }
    if ($('#is_limit_buy').is(':checked')) {
        var option = $("#limit_buy option:selected");
        var p = option.data('value');
        totalPoint += (+p);
    }
    if ($('#isLimitCity').is(':checked') && !!$('#Province').val()) {
        var p = $('#isLimitCity').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#limit_sex').val() != 0) {
        var p = $('#limit_sex').closest("td").find('font').text();
        totalPoint += (+p);
    }
    if ($('#limit_age').val() != 0) {
        var p = $('#limit_age').closest("td").find('font').text();
        totalPoint += (+p);
    }

    $('#show_total_point').html(totalPoint.toFixed(2));
    $('#total_point').val(totalPoint.toFixed(2));
    return;

}

function ChangePoint(obj) {
    var v = +obj.value;
    var service_cost = +getValue('service_cost');
    if (v) {
        var totalPrice = v + service_cost
        $('#show_total_price').html(totalPrice.toFixed(2));
        setValue('total_price', totalPrice.toFixed(2));
    }
}

function getTemplate(obj) {
    if (obj.value == '0') return;
    var url = window.location.href;
    if (url.indexOf('tid=') > 0) {
        url = url.replace(/tid=(\d+)?/i, "tid=" + obj.value);
    } else if (/\/add-\d+-\d+/i.test(url)) {
        url = url.replace(/\/(add-\d+-)(\d+)?/i, "/$1" + obj.value);
    } else if (/\/add-\d+/i.test(url)) {
        url = url.replace(/\/(add-\d+)/i, "/$1-" + obj.value);
    } else if (/\/add\.htm/i.test(url)) {
        url = url.replace(/\/add/i, "/add-0-" + obj.value);
    }
    else if (url.indexOf('.aspx') > 0) {
        url += "&tid=" + obj.value;
    }
    else {
        alert("任务模板URL规则未能识别，无法切换！");
        return;
    }
    window.location.href = url;
}

function changeCategory(obj) {
    var platform_type = $('#platform_type').val();
    var value = obj.value;
    if (value == platform_type) {
        return;
    }
    var url = 'add';
    if (value == 1) {
        url = 'add-18'
    }
    window.location.href = url;
}

function checkType(n) {
    $('#isRealExpress_tr').hide();
    $('#isRealExpress').val('0');
    switch (n) {
        case 0:
            if (getRV("xushi_type") == '0')
                getObj('haoping_limit').selectedIndex = 1;
            return;
        case 1:
            if (getRV("xushi_type") == '1' || getRV("xushi_type") == '2')
                getObj('haoping_limit').selectedIndex = 0;
            break;
    }
    var id = $('#haoping_limit').val();
    if (getRV("xushi_type") == '0') {
        if (id == '0' || id == '2' || id == '3') {
            alert('建议需要发快递的实物任务好评时间最好选择大于2天以上好评！');
            $('#haoping_limit').focus();
        }
    }
    if (id == '1') {
        if (getRV("xushi_type") == '' || getRV("xushi_type") == '0') {
            alert('要求物流显示签收后才能收货好评的任务，任务类型只能是实物或搭配套餐任务哦！');
            $("input[name=xushi_type]:eq(1)").attr("checked", true);
            $('#haoping_limit').focus();
        }
        $('#isRealExpress_tr').show();
        $('#isRealExpress_tr').find("a").removeClass("radioCurr").eq(0).addClass("radioCurr");
        $('#isRealExpress').val('1');
    }
}

function chkShopCart() {
    if (getObj("is_shop_cart") && getObj("is_shop_cart").checked) {
        getObj("UrlChange").innerHTML = '<textarea style="width:500px;height:140px" rows="5" class="textbox" name="product_url" id="product_url" onblur=\'ChangePoint(getObj("price"));ShortUrl();GetTitle()\'></textarea>&nbsp;<span class="tips" style="display:inline-block;height:50px;line-height:24px">购物车任务每行一个地址，回车换行<br />至少3条地址起，最多发布6条</span>';
    }
    else { getObj("UrlChange").innerHTML = '<input name="product_url" type="text" maxlength="200" class="w500" id="product_url" value="" onblur=\'ChangePoint(getObj("price"));ShortUrl();GetTitle()\' />&nbsp;<span class="tips">安全起见请尽量发布不同商品地址</span>'; }
}

function ChangeMultiple() {
    if (!getObj('Province').multiple) {
        getObj('Province').multiple = "multiple";
        getObj('Province').style.height = "300px";
        getObj('Province').title = "按住Ctrl或Shifl键加单击选项，可多选！";
        $('#City').hide();
        $('#Multiple_tips').show();
    } else {
        getObj('Province').multiple = false;
        getObj('Province').style.height = "28px";
        getObj('Province').title = "";
        $('#City').show();
        $('#Multiple_tips').hide();
    }
}

function ChangeIntoStoreItem() {
    var into_store_type = $(".into_store_type:checked").val();
    if (into_store_type == "3" || into_store_type == "4") {
        if ($("#is_app_buy").val() == "0") {
            alert("亲，" + (into_store_type == "3" ? "淘口令" : "扫二维码") + "下单必需是手机单哦！");
            if ($(".newRadio").eq(0).find("a[disabled]").length == 1) {
                $(".into_store_type[value='" + $("#into_store_type_original_value").val() + "']").icheck('checked');
                if (event.preventDefault) {
                    event.preventDefault();
                }
                else {
                    event.returnValue = false;
                }
                return;
            } else {
                $(".newRadio").eq(0).find("a").eq(1).click();
            }
        }
    }
    if (into_store_type == "0" || into_store_type == "3" || into_store_type == "4") {
        $(".search_key_box").each(function (i) {
            if (i > 0)
                $(this).remove();
        });
    }
    if ($('.search_key_box').size() <= 1) $(".search_key_index").text('');
    $('.keyword_box, .keyword_box_title, .search_key_box, .search_key_box_one, .search_photo_box, .search_sort, .search_sort_and_area').show();
    $('.search_key').attr('placeholder', '请填写关键词').removeClass('wide500').addClass('wide');
    $('.search_key, .search_tips').removeAttr('ignore');
    $('.search_photo_url').attr('ignore', 'ignore');
    $("#into_store_type_original_value").val($(".into_store_type:checked").val());
    switch (into_store_type) {
        case "0":
            $('.search_key_box_one, .keyword_box_title, .search_photo_box').hide();
            $('.search_key, .search_tips, .search_photo_url').attr('ignore', 'ignore');
            break;
        case "2":
        case "5":
            $('.search_key_dt').html('搜索宝贝关键词');
            if (into_store_type == '2') {
                $('.search_photo_dt').html('宝贝链接位置截图：');
            }
            else if (into_store_type == '5') {
                $('.search_photo_dt').html('直通车宝贝位置截图：')
            }
            break;
        case "1":
            $('.search_key_dt').html('搜索店铺关键词');
            $('.search_photo_dt').html('店铺链接位置截图：');
            break;
        case "3":
            if ($('.search_key').val().indexOf('《') == -1 && $('.search_key').val().indexOf('￥') == -1) {
                $('.search_key').val('');
            }
            $('.search_key_dt').html('淘口令内容');
            $('.search_key').attr('placeholder', '请填写口令').removeClass('wide').addClass('wide500');
            $('.search_photo_box, .keyword_box_title, .search_sort_and_area').hide();
            $('.search_tips').attr('ignore', 'ignore');
            break;
        case "4":
            $('.search_key_box_one, .keyword_box_title').hide();
            $('.search_key').val('');
            $('.search_key, .search_tips').attr('ignore', 'ignore');
            $('.search_photo_url').removeAttr('ignore');
            $('.search_photo_dt').html('二维码图片：');
            break;
        case "6":
            $('.search_key_dt').html('网站地址');
            $('.search_key').attr('placeholder', 'http://');
            $('.search_photo_dt').html('宝贝链接位置截图：');
            $('.search_sort, .keyword_box_title').hide();
            break;
    }
}

var chk_username_Tips;
function chk_username() {
    var obj = document.getElementById("user_name_msg");
    var str = document.getElementById("limit_user_name").value;
    if (chk_username_Tips == null) chk_username_Tips = obj.innerHTML;
    if (str == '') { obj.innerHTML = chk_username_Tips; return; }
    $.ajax({
        type: "get",
        url: "/tools/task_ajax.ashx?action=check_jieshou_username&username=" + encodeURIComponent(str) + "&_t=" + Math.random() * 1000,
        cache: false,
        dataType: "json",
        success: function (d) {
            if (d != null) {
                if (d.status == 'y') {
                    obj.innerHTML = '<img src="/style/images/accept.png" border="0" align="absmiddle" /> ' + d.info;
                }
                else {
                    obj.innerHTML = '<img src="/style/images/error.gif" border="0" align="absmiddle" /> ' + d.info;
                }
            }
        }
    });
}

function chk_shopname() {
    return true;
    var ShopName = getRV("rblShopName");
    var ShopSiteID = getValue('txtShopSiteID');
    var Url = getValue('product_url');
    if (Url == '') return;
    if (Url.indexOf("alitrip") != -1) { return true; }
    var ajaxchk;
    var ajaxstr;
    $.ajax({
        type: "post",
        url: "/tools/task_ajax.ashx?action=check_shopname",
        data: "shopname=" + encodeURIComponent(ShopName) + "&shopsite_id=" + ShopSiteID + "&url=" + Url.replace(/&/g, "%26").replace(regPatrn, "|") + "&_t=" + Math.random() * 1000,
        cache: false,
        dataType: "json",
        async: false,
        success: function (d) {
            if (d != null) {
                ajaxchk = d.status;
                ajaxstr = d.info;
            }
        }
    });
    if (ajaxchk == 'y') {
        return true;
    } else {
        if (ajaxstr == null) {
            alert("抱歉！系统检验超时，请重新提交！");
        } else {
            alert(ajaxstr);
        }
        $("#submit_btn").attr({ value: "再提交一次", disabled: false });
        return false;
    }
}

function GetTitle() {
    var CheckUrl = false;
    var ShopSiteID = getValue('txtShopSiteID');
    var Url = getValue('product_url');
    if (Url == '') return;
    if (getValue('title').length > 3 && $('#product_pic_img').attr('src').indexOf('noimg.png') == -1) return;
    if (ShopSiteID == "1") {
        if (/^https?:\/\/([^%\*\/\?]+)\.((taobao)|(tmall)|(alitrip)|(fliggy)|(95095))\.com\//i.test(Url)) { CheckUrl = true; }
    }
    else if (ShopSiteID == "2") {
        if (/^https?:\/\/([^%\*\/\?]+)\.((1688)|(alibaba))\.com\/.*?\d{10,}/i.test(Url)) { CheckUrl = true; }
    }
    else if (ShopSiteID == "3") {
        if (/^https?:\/\/([^%\*\/\?]+)\.jd\.com\/.*?\d{6,}/i.test(Url)) { CheckUrl = true; }
    }
    else if (ShopSiteID == "4") {
        if (/^https?:\/\/([^%\*\/\?]+)\.mogujie\.com\/detail\/\w+/i.test(Url)) { CheckUrl = true; }
    }
    else if (ShopSiteID == "5") {
        if (/^https?:\/\/([^%\*\/\?]+)\.((yangkeduo)|(pinduoduo))\.com\/.*?\d{7,}/i.test(Url)) { CheckUrl = true; }
    }
    if (CheckUrl) {
        $.ajax({
            type: "post",
            url: Url,
            // url: "/tools/task_ajax.ashx?action=get_product_title_pic",
            // data: "shopsite_id=" + ShopSiteID + "&url=" + Url.replace(/&/g, "%26").replace(regPatrn, "|") + "&_t=" + Math.random() * 1000,
            cache: false,
            dataType: "jsonp",
            jsonp: 'callback',
            async: is_async || true,
            success: function (d) {
                if (d != null) {
                    if (d.status == 'y') {
                        setValue('title', d.title);
                        setValue('product_pic', d.pic);
                        getObj('product_pic_img').src = d.pic;
                    }
                }
            }
        });
    }
}

function ShortUrl() {
    var Url = Trim(getValue('product_url'));
    if (Url == '') return;
    var ShopSiteID = getValue('txtShopSiteID');
    if (getObj("is_shop_cart") && getObj("is_shop_cart").checked) {
        var arr_str = Url.split(regPatrn);
        var tmpUrl, itemUrl;
        Url = '';
        var rn = (document.all) ? "\r\n" : "\n";
        for (var i = 0; i < arr_str.length; i++) {
            if (Trim(arr_str[i]) != '') {
                tmpUrl = Trim(arr_str[i]);
                itemUrl = /^(https?:\/\/[^%\*\/\?]+\.((taobao)|(tmall)|(alitrip)|(fliggy)|(95095))\.com\/.+?\?).*?(((meal_)?|(item_)?|(item)?)id=\d{8,12}(&seller_id=\d+)?)/ig;
                if (itemUrl.test(tmpUrl)) {
                    tmpUrl = RegExp.$1 + RegExp.$8;
                }
                if (Url == '') {
                    Url = tmpUrl;
                } else {
                    Url += rn + tmpUrl;
                }
            }
        }
        if (Url != '') setValue('product_url', Url);
    } else {
        if (ShopSiteID == "1") {
            var itemUrl = /^(https?:\/\/[^%\*\/\?]+\.((taobao)|(tmall)|(alitrip)|(fliggy)|(95095))\.com\/.+?\?).*?(((meal_)?|(item_)?|(item)?)id=\d{8,12}(&seller_id=\d+)?)/ig;
            if (itemUrl.test(Url)) {
                Url = RegExp.$1 + RegExp.$8;
                setValue('product_url', Url);
                return;
            }
        }
        else if (ShopSiteID == "3") {
            var itemUrl = /^(https?:\/\/[^%\*\/\?]+\.(jd)\.com\/\d{8,12}\.html)/i;
            if (itemUrl.test(Url)) {
                Url = RegExp.$1;
                setValue('product_url', Url);
                return;
            }
        }
        else if (ShopSiteID == "5") {
            var itemUrl = /^(\d{7,12})$/i;
            if (itemUrl.test(Url)) {
                Url = "http://mobile.yangkeduo.com/goods.html?goods_id=" + RegExp.$1;
                setValue('product_url', Url);
                return;
            }
        }
    }
}

function ChangeRadio(obj, n) {
    $(obj).parent().find("a").removeClass("radioCurr").eq(n).addClass("radioCurr");
    $(obj).parent().find("input[type='hidden']").val(n + 1);
    if (Fabu_HongbaoDaifu_LimitShangBaoJieShou) {
        if (n + 1 == 3) {   //3远程代付
            $('#isShangBao').prop({ checked: true, title: '远程代付，平台强制启用只允许加入商保会员接手' }).icheck('checked');
        }
        else {
            $('#isShangBao').prop({ checked: false, title: '勾上才启用' }).icheck('unchecked');
        }
    }
    ChangePoint(getObj("price"));
    CountPoint();
}

function ChangeRadioItem(obj, n, type) {
    $(obj).parent().find("a").removeClass("radioCurr").eq(n).addClass("radioCurr");
    if (type == "checkbox") {
        $(obj).parent().find("input[type='checkbox']").prop("checked", n == 0 ? false : true);
    } else {
        if (type == '') {
            $(obj).parent().find("input[type='hidden']").val(n + 1);
        } else {
            $(obj).parent().find("input[type='hidden']").val(type);
        }
    }
    CountPoint();
}

function chkTipsShow() {
    if (getCookie_current('AddTaskToggleTips') == "show") {
        $("#tips_btn").val("隐藏功能注解").removeClass("red").addClass("green");
        $('.tips').show();
    }
    var objWidth = $('.AddTask').offset().left + 1060;
    $('#tips_btn').css({ left: objWidth + "px" }).show();
}
$(window).resize(winResize);
function winResize() {
    var objWidth = $('.AddTask').offset().left + 1060;
    $('#tips_btn').css({ left: objWidth + "px" }).show();
}
function toggleTips() {
    if (getCookie_current('AddTaskToggleTips') == "show") {
        $("#tips_btn").val("显示功能注解").removeClass("green").addClass("red");
        $('.tips').hide();
        SetCookie_current("AddTaskToggleTips", "hide");
    } else {
        $("#tips_btn").val("隐藏功能注解").removeClass("red").addClass("green");
        $('.tips').show();
        SetCookie_current("AddTaskToggleTips", "show");
    }
}

function search_del_link(id) {
    $('#' + id).parent().parent().parent().remove();
    $(".search_key_index").each(function (i) {
        $(this).text(i + 1);
    });
}

$(function () {
    chkTipsShow();
    $("input").icheck();
    ChangeIntoStoreItem();

    if (getValue("price") != '') {
        ChangePoint(getObj("price"));
        CountPoint();
        $("#count_price").html("总计 " + getValue("price") + " 元").show();
    }
    $(".AddTask input[type=checkbox], input[type=radio], select").click(function () {
        ChangePoint(getObj("price"));
        CountPoint();
    });
    $("#single_price, #buy_number").keyup(function () {
        var single_price = $("#single_price").val();
        single_price = single_price.replace(/[^\d.]/g, '');
        $("#single_price").val(single_price);
        if ($(this).attr("id") == "single_price") $('#show_price').val(single_price);
        var buy_number = $("#buy_number").val();
        buy_number = buy_number.replace(/[^\d]/g, '');
        $("#buy_number").val(buy_number);

        if (buy_number == '' || parseInt(buy_number) <= 0) {
            buy_number = 1;
            $("#buy_number").val('1');
        }
        if (single_price == '' || parseFloat(single_price) <= 0) {
            return;
        }
        var count_price = parseFloat(single_price) * buy_number;
        if (count_price.toString().indexOf('.') > -1) {
            count_price = count_price.toFixed(2);
        }
        $("#price").val(count_price);
        $("#count_price").html("总计 " + count_price + " 元").show();
        ChangePoint(getObj("price"));
        CountPoint();
    });
    $(".AddTask input[type=text]").blur(function () {
        ChangePoint(getObj("price"));
        CountPoint();
    });
    $(".into_store_type").click(function () {
        ChangeIntoStoreItem();
    });
    $(".search_add_link").click(function () {
        if (typeof (Fabu_SetKeywordNum) == "undefined") Fabu_SetKeywordNum = 5;
        if ($(".search_key_box").size() >= Fabu_SetKeywordNum) {
            alert("抱歉，您最多只能设置" + Fabu_SetKeywordNum + "个搜索关键词！");
            return;
        }
        var el = $(".search_key_box").eq(0).clone(true);
        var tmpId = "search_del_link_" + Math.random().toString().replace('.', '');
        el.find(".search_add_link").before('<a class="red" id="' + tmpId + '" href="javascript:;" onclick="search_del_link(\'' + tmpId + '\')">- 删除</a>');
        el.find(".search_add_link").remove();
        el.find(".search_key, .search_tips").val('');
        el.find(".continueAddNum, .continueAddTime").val('0');
        $(".search_photo_box").before(el);
        $(".search_key_index").each(function (i) {
            $(this).text(i + 1);
        });
    });
    //$(".search_key").blur(function () {
    //    if (($(".into_store_type:checked").val() == "2" || $(".into_store_type:checked").val() == "5") && $(this).val().length > 10) {
    //        alert("温馨提示：\n亲，平台建议搜索关键词最好是10个字以内，你确定需要这么多字吗？");
    //        return false;
    //    }
    //});
});
