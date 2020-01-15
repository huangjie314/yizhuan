
$(function () {
  if (window.clipboardData && /MSIE [5-8]+./.test(navigator.userAgent)) {
    //针对ie5-8
    $('#tenpay_copy_btn, #alipay_copy_btn, #bank_copy_btn, #banknick_copy_btn, #weixin_copy_btn').bind("click", function () {
      var copy_obj = $(this).attr("data-clipboard-target");
      window.clipboardData.setData("Text", $(copy_obj).val());
      dialogTips('复制成功！');
    });
  } else {
    var clip = new Clipboard('#tenpay_copy_btn, #alipay_copy_btn, #bank_copy_btn, #banknick_copy_btn, #weixin_copy_btn');
    clip.on('success', function (e) {
      dialogTips('复制成功！');
    });
  }

  // $(".upload-box").InitUploader({ btntext: "上传付款截图", sendurl: "../tools/upload_ajax.ashx?action=UpLoadFile" });
  $(".upload-box").uploadImg(function (that, result) {
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
          myAlert(res.message)
        }
      }
    })
  })
  createImg();
  bindClickEvent();
  AjaxInitForm('#myform2', '#btnSubmit1', 1, null, null, {
    data: function () {
      return {
        money: $('#amount').val(),
        pay_image: $('#pay_photo_url').val(),
        bank_name: $('#bank_name').val(),
        real_name: $('#user_real_name').val(),
        bank_card: $('#recharge_no').val(),
      }
    },
    type: 'POST'
  });
});

//上传图片事件处理
function createImg() {
  $(".upload-path").each(function (index) {
    if ($(this).val().length > 10) {
      $(this).before("<img src='" + $(this).val() + "' align='absmiddle'width=150 height=150 class='preview upload-image' />");
    } else {
      $(this).before("<img src='/default/style/images/waipic3.png' align='absmiddle' width=150 height=150 class='preview upload-image' />");
    }
  });
}
function bindClickEvent() {
  $(".preview").click(function () {
    if ($(this).attr("src").indexOf("waipic3.png") > 0) {
      $(this).siblings(".upload-box").click();
    } else {
      window.open($(this).siblings(".upload-path").val())
    }
  });
}


function dialogTips(msg) {
  var d = parent.dialog({ content: msg }).show();
  setTimeout(function () {
    d.close().remove();
  }, 2000);
}

function openUrl(url) {
  try {
    window.open(url);
  } catch (e) {
    prompt('请你使用 Ctrl+C 或右键点击复制到剪贴板，再到浏览器打开。', url)
  }
  return false;
}