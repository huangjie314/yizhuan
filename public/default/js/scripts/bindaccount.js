

$(function () {

  $('.mtable').on('click', '.operation', function () {
    var type = $(this).data('type');
    var id = $(this).closest('tr').data('id');
    if (type == 'del') {
      if (!confirm('亲，您确定要删除吗？\n\n删除后将不能再次添加此号哦，请慎重考虑！')) {
        return false;
      }
    }
    Util.ajax({
      url: '/api/bind/shop/' + type + '/' + id,
      type: 'POST',
      certificate: true,
      success: function (res) {
        myTipInfo(res.message);
        if (res.status === 1) {
          location.reload();
        }
      }
    })
  })

  $('#upload-box').uploadImg(function (that, result) {
    $('#target, #preview').attr('src', result);
  })
  //初始化表单
  AjaxInitForm('#bindForm', '#btnSubmit', 1, null, null, {
    data: function () {
      return {
        platform_type: $('#ddlShopSite').val(),
        shop_name: $('#txtShopName').val(),
        shop_image: $('#verify_photo6').val(),
        shop_account: $('#txtAccount').val(),
        is_real_name: avatarApp.real_name_authentication
      }
    },
    type: 'POST',
  });

  $('#bindForm a').lightBox();
  $('.upload-box').uploadImg(function (that, result) {
    Util.ajax({
      url: '/api/tools/uploadImage',
      type: 'POST',
      data: {
        image: result
      },
      success: function (res) {
        if (res.status == 1) {
          that.siblings(".upload-path").val(res.data.image);
        } else {
          myAlert(res.message);
        }
      }
    })
  })
  createImg();
  bindClickEvent();

  //删除
  // $(".btnDelete").click(function () {
  //   return confirm('亲，您确定要删除吗？\n\n删除后将不能再次添加此号哦，请慎重考虑！');
  // });

  //更新
  $(".btnUpdate").click(function () {
    var str = "";
    var site_id = $(this).attr("site_id");
    if (site_id && site_id != '') {
      var sex = $(this).attr("sex");
      var age = $(this).attr("age");
      str = '性别：<select name="update_sex" id="update_sex" class="select">';
      str += '<option value="1"' + (sex == '1' ? ' selected="selected"' : '') + '>男</option>';
      str += '<option value="2"' + (sex == '2' ? ' selected="selected"' : '') + '>女</option>';
      str += '</select><br> <br>';

      str += '年龄：<select name="update_age" id="update_age" class="select">';
      //str += '<option value="1"' + (age == '1' ? ' selected="selected"' : '') + '>20岁以下</option>';
      str += '<option value="2"' + (age == '2' ? ' selected="selected"' : '') + '>18-25岁</option>';
      str += '<option value="3"' + (age == '3' ? ' selected="selected"' : '') + '>26-35岁</option>';
      str += '<option value="4"' + (age == '4' ? ' selected="selected"' : '') + '>35岁以上</option>';
      //str += '<option value="5"' + (age == '5' ? ' selected="selected"' : '') + '>41岁以上</option>';
      str += '</select><br> <br>';

      var obj = $('#ddlShopSite>option[value="' + site_id + '"]');
      var bind_type = obj.attr("bind_type");
      var flag = '', auto = '';
      if (bind_type == '1' || bind_type == '2') {
        flag = " disabled";
        auto = '<option value="">自动识别</option>';
      }
      if (site_id == '1' || site_id == '2') {
        str += '信用等级：<select name="update_xinyu" id="update_xinyu"' + flag + ' class="select">' + auto + tao_opt + '</select><br> <br>';
      } else if (site_id == '3') {
        str += '会员等级：<select name="update_xinyu" id="update_xinyu"' + flag + ' class="select">' + auto + jd_opt + '</select><br> <br>';
      }
      if (flag == '') {
        str += '是否实名：<select name="update_isRealname" id="update_isRealname" class="select">' + realname_opt + '</select><br> <br>';
      }
    }
    str += "采集方式：<label><input name='port' id='port' type='radio' value='0' checked /> 默认</label> &nbsp; <label><input name='port' id='port' type='radio' value='1' /> 接口</label>";
    //防止打开多个对话框
    if (dialog.get('dialogBox')) {
      dialog.get('dialogBox').close().remove();
    }
    var d = dialog({
      id: 'dialogBox',
      title: "更新账号信息",
      content: str,
      padding: '30px',
      align: 'left',
      okValue: '确定',
      ok: function () {
        var value = {
          port: $("input[name='port']:checked").val(), xinyu: $('#update_xinyu>option:selected').val(), realname: $('#update_isRealname>option:selected').val(),
          sex: $('#update_sex>option:selected').val(), age: $('#update_age>option:selected').val()
        };
        this.close(value);
        this.remove();
      },
      cancelValue: '取消',
      cancel: function () { }
    });
    var _href = "/tools/submit_ajax.ashx?action=update_shopname_account&id=" + $(this).attr("item_id");
    d.addEventListener('close', function () {
      if (this.returnValue != null && this.returnValue != '') {
        $.ajax({
          type: "POST",
          url: _href,
          data: { "update_param": JSON.stringify(this.returnValue) },
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
    });
    d.show(this);
    return false;
  });
});
//上传图片事件处理
function createImg() {
  $(".upload-path").each(function (index) {
    if ($(this).val().length > 10) {
      $(this).before("<img src='" + $(this).val() + "' width=150 height=150 align='absmiddle' class='preview upload-image' style='cursor:pointer' title='点击看大图' /><br>");
    } else {
      $(this).before("<img src='/default/style/images/waipic3.png' width=150 height=150 align='absmiddle' class='preview upload-image' style='cursor:pointer' /><br>");
    }
  });
}
function bindClickEvent() {
  $(".preview").click(function () {
    if ($(this).attr("src").indexOf("waipic3.png") > 0) {
      $(this).siblings(".upload-box").click();
    } else {
      window.open($(this).attr("src"));
    }
  });
}

$(function () {
  var clipboard = new Clipboard('#randomCode');
  clipboard.on('success', function () {
    var d = dialog({ content: '复制成功！' }).show();
    setTimeout(function () { d.close().remove(); }, 1500);
  });
  // $("#ddlShopSite").change(function () {
  //   location.href = $('#ddlShopSite option:selected').attr('url');
  // });

  //核对店铺
  $("#btnCheck").click(function () {
    var url = $("#txtProductUrl").val();
    var sid = $('#ddlShopSite option:selected').val();
    if (sid == "" || url == "") { alert("亲，请先输入商品地址再核对！"); return; }
    if (url.indexOf("http") > -1) {
      $.ajax({
        type: "POST",
        url: "/tools/submit_ajax.ashx?action=verify_shopname",
        data: { "url": url, "sid": sid },
        dataType: "json",
        timeout: 20000,
        success: function (data, textStatus) {
          if (data.status == 1) {
            $("#btnSubmit").val(" 确定提交 ").attr("disabled", false);
            $("#txtAccount").val(data.wangwang);
            $("#txtShopName").val(data.shopname);
            var d = dialog({ content: data.msg }).show();
            setTimeout(function () {
              d.close().remove();
            }, 1500);
          } else {
            dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          dialog({ title: '提示', content: "状态：" + textStatus + "；出错提示：" + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        }
      });
    } else {
      alert("亲，请输入正确商品地址（http开头的网址）再核对！");
    }
  });
});

//激活掌柜
function dialogOpen(title, id) {
  var d = dialog({
    title: title,
    width: 620,
    url: '/tasks/dialog/activate_shop.aspx?id=' + id,
    okValue: ' 关 闭 ',
    ok: function () { }
  }).show();
  return false;
}



