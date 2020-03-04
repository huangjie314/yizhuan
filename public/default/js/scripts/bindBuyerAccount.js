
$(function () {
  //初始化表单
  AjaxInitForm('#bindForm', '#btnSubmit', 1, null, null, {
    data: function () {
      return {
        platform_type: $('#ddlShopSite').val(),
        buy_name: $('#txtShopName').val(),
        is_real_name: $('#isRealname').val(),
        hb_bt: $('#is_huabei').val(),
        sex: $('[name="sex"]:checked').val(),
        age: $('#age').val(),
        level: $('#xinyu').val(),
        value: $('#taoqizhi').val(),
        image_1: $('#verify_photo2').val(),
        image_2: $('#verify_photo4').val(),
        image_3: $('#verify_photo5').val(),
      }
    },
    type: 'POST',
  });

  $('#bindForm a').lightBox();

  // $(".upload-box").InitUploader({ btntext: "上传截图", sendurl: "/tools/upload_ajax.ashx?action=UpLoadFile" });   //(ViewBag.siteConfig.weburl)
  $('.upload-box').uploadImg(function (that, result) {
    that.siblings(".upload-path").val(result);
  })
  createImg();
  bindClickEvent();


  //删除
  $(".btnDelete").click(function () {
    if (confirm('亲，您确定要删除吗？\n\n删除后将不能再次添加此号哦，请慎重考虑！')) {
      var id = $(this).data('id');
      Util.ajax({
        url: '/api/bind/account/delete/' + id,
        type: 'POST',
        certificate: true,
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
    }
  });
  // 更新
  $('.btnUpdate').click(function () {
    var id = $(this).data('id');
    Util.ajax({
      url: '/api/bind/account/update/' + id,
      type: 'POST',
      certificate: true,
      success: function (res) {
        if (res.status == 1) {
          myAlert(res.message, function () {
            location.reload();
          })
        } else {
          myAlert(res.message);
        }
      },
      error: function (err) {
        console.log(err);
      }
    })
  })



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
  // var clipboard = new Clipboard('#randomCode');
  // clipboard.on('success', function () {
  //   var d = dialog({ content: '复制成功！' }).show();
  //   setTimeout(function () { d.close().remove(); }, 1500);
  // });
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


