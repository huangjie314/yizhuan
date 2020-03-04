var avatarApp = null;

$(function () {
  $('#uploadImage').uploadImg(function (that, result) {
    Util.ajax({
      url: '/api/tools/uploadImage',
      type: 'POST',
      certificate: false,
      data: {
        image: result,
      },
      success: function (res) {
        myAlert(res.message);
        if (res.status === 1) {
          $('#product_pic_img').attr('src', res.data.image);
          $('#product_pic').val(res.data.image);
        }
      }
    })
  })
  $('.shaitu-btn').uploadImg(function (that, result) {
    Util.ajax({
      url: '/api/tools/uploadImage',
      type: 'POST',
      certificate: false,
      data: {
        image: result,
      },
      success: function (res) {
        myAlert(res.message);
        if (res.status === 1) {
          that.siblings('input').val(res.data.image);
        }
      }
    })
  })
  $('.linkPos').uploadImg(function (that, result) {
    Util.ajax({
      url: '/api/tools/uploadImage',
      type: 'POST',
      certificate: false,
      data: {
        image: result,
      },
      success: function (res) {
        myAlert(res.message);
        if (res.status === 1) {
          that.siblings('#lailuSearchPhoto_url').val(res.data.image);
        }
      }
    })
  })
  new PCAS("Province,请选择省份", "City,请选择城市");
  $(window).scroll(function () {
    if (!/msie [678]\.0/i.test(window.navigator.userAgent.toLowerCase())) {
      ($(this).scrollTop() > 300) ? $("#bottomBar").fadeIn() : $("#bottomBar").fadeOut();
    }
  });
  $("#closeBottomBar").click(function () {
    $("#bottomBar").fadeOut();
  });
  //表单提交
  $('#submit_btn').click(function () {
    var valid = CheckFormFun();
    if (!valid) return false;
    Util.ajax({
      url: '/api/order/add',
      certificate: true,
      type: 'POST',
      beforeSend: function () {
        $("#submit_btn").attr({ value: "提交中..", disabled: true });
      },
      complete: function () {
        $("#submit_btn").attr({ value: "确认提交", disabled: false });
      },
      data: {
        platform_type: $('#ddlCategoryID').val(),
        order_type: $('#is_app_buy').val(),
        shop_id: $('[name="rblShopName"]:checked').val(),
        shop_name: $('[name="rblShopName"]:checked')[0].title,
        goods_url: $('#product_url').val(),
        goods_title: $('#title').val(),
        goods_image: $('#product_pic_img').attr('src'),
        pay_type: $('#pay_type').val(),
        goods_price: $('#single_price').val(),
        order_goods_number: $('#buy_number').val(),
        search_show_goods_price: $('#show_price').val(),
        buy_assign_attribute: $('#spec_property').val(),
        search_show_pay_numbers: $('#pay_user_number').val(),
        is_need_change_price: $('#is_mod_price').is(":checked") ? 1 : 0,
        goods_type: $('[name="xushi_type"]:checked').val(),
        goods_good_comment_rule: $('#haoping_limit').val(),
        express_type: $('#isRealExpress').val(),
        assign_goods_comment_content: $('#haoping_content').val(),
        platform_message_tips: $('#message_remind').val(),
        place_order_type: $('[name="lailuSearchItem"]:checked').val(),
        goods_tips_content: getGoodTipsCotent(),
        is_need_three_shops: $('#is_hbsj').is(':checked') ? $('#hbsj').val() : 0,
        is_need_in_shop_browse: $('#is_view_product').is(':checked') ? 1 : 0,
        is_need_stop_before_buy: $('#is_page_stay').is(':checked') ? 1 : 0,
        is_need_full_browse: $('#is_page_down').is(':checked') ? 1 : 0,
        good_comment_images: getShaitu(),
        append_good_comment: $('#addHaopingDay').val() + ',' + $('#addHaoPingContent').val(),
        is_need_delete_order_after_good_comment: $('#is_after_sales').is(':checked') ? 1 : 0,
        is_need_collection_shop_and_goods: $('#isCollect').is(':checked') ? 1 : 0,
        is_need_add_carts_next_days_buy: $('#is_delay_buy').is(':checked') ? $('#delay_buy_day').val() : 0,
        is_need_ask_question: $('#ask_everyone').is(':checked') ? 1 : 0,
        ask_question_content: $('#ask_everyone_content').val(),
        is_need_share_goods: $('#product_share').is(':checked') ? 1 : 0,
        is_can_hb_and_credit_card_pay: $('#is_credit_payment').is(':checked') ? 1 : 0,
        is_need_user_account_opening_hb_and_bt: $('#is_huabei_limit').is(':checked') ? 1 : 0,
        user_account_level: $('#is_maihao_limit').is(':checked') ? $('#maihao_limit').val() : 0,
        user_account_value: $('#is_taoqizhi_limit').is(':checked') ? $('#taoqizhi_limit').val() : 0,
        is_need_chats_before_pay: $('#is_chat').is(':checked') ? 1 : 0,
        is_need_examine_account: $('#is_verific').is(':checked') ? 1 : 0,
        limit_user_accept_order_number: $('#is_limit_buy').is(':checked') ? $('#limit_buy').val() : 0,
        order_limit_province: $('#isLimitCity').is(':checked') ? $('#Province').val() : 0,
        order_limit_sex: $('#limit_sex').val(),
        order_limit_age: $('#limit_age').val(),
        template_name: $('#istpl').is(':checked') ? $('#tplName').val() : 0,
        order_price: $('#total_price').val(),
        order_points: $('#total_point').val(),
      },
      success: function (res) {
        if (res.status == 1) {
          myAlert(res.message, function () {
            location.reload();
          })
        } else {
          myAlert(res.message);
        }
      }
    })
  })

  // 付款方式
  $('#newRadio').on('click', 'a', function (e) {
    var _this = $(this);
    var pay_type = $('#pay_type');
    var type = _this.data('type');
    _this.siblings('a').removeClass('radioCurr');
    _this.addClass('radioCurr');
    pay_type.val(type);
  })
  // 快递签收方式
  $('#isRealExpressItem').on('click', 'a', function (e) {
    var _this = $(this);
    var pay_type = $('#isRealExpress');
    var type = _this.data('type');
    _this.siblings('a').removeClass('radioCurr');
    _this.addClass('radioCurr');
    pay_type.val(type);
  })
});


function getShaitu() {
  var image = [
    $('#shaiTu_photoUrl').val(),
    $('#shaiTu_photoUrl2').val(),
    $('#shaiTu_photoUrl3').val(),
    $('#shaiTu_photoUrl4').val(),
    $('#shaiTu_photoUrl5').val(),
  ]
  var filterImage = image.filter(cur => {
    return !!cur
  })
  return filterImage.join(',');
}
function getGoodTipsCotent() {
  var lailuSearchKey = $('[name="lailuSearchKey"]');
  var lailuSearchTips = $('[name="lailuSearchTips"]');
  var lailuSearchPhoto_url = $('[name="lailuSearchPhoto_url"]');
  var size = lailuSearchKey.length;
  var arr = []
  for (var i = 0; i < size; i++) {
    arr.push(
      lailuSearchKey.val() + ',' + lailuSearchTips.val() + ',' + lailuSearchPhoto_url.val()
    )
  }
  return arr.join('|');
}
function CheckFormFun() {
  if (!$('#rblShopName').length || !$('[name="rblShopName"]:checked').length) { alert('请选择掌柜名！'); return false; }
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

  if (DataLength(getValue('message_remind')) > 350) { alert("留言提醒内容不能超过350个字符！"); getObj('message_remind').focus(); return false; }

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

  if ($(".into_store_type:checked").val() == '4') {
    if (getValue('lailuSearchPhoto_url') == '') { alert('请先上传二维码图片！'); getObj('lailuSearchPhoto_url').focus(); return false; }
  }

  var into_store_type = $(".into_store_type:checked").val();
  // var total_num = 0, each_flag = false;
  var total_num = 1, each_flag = false;
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
  CountPoint();
  if (Confirm() == true) {
    if ($('#product_pic').val() == '') {
      GetTitle();
      alert('亲，请上传主图再提交！');
      getObj('product_url').focus();
      return false;
    }
    return chk_shopname();
  }
  return false;
}

