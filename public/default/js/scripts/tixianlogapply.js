!function () {
  $(function () {
    //初始化表单
    AjaxInitForm('#user_tixian_form', '#btnSubmit', 1, null, null, {
      data: function () {
        return {
          type: $('#type').val(),
          money: $('#money').val(),
          code_type: $('#code_type').val(),
          code_image: $('#verify_photo6').val(),
        }
      },
      type: 'POST',
      extraCheck: alipayLinkClick
    });

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

    $('#list').on('click', '.tixian-type-tab', function (e) {
      $(this).addClass('selected').siblings().removeClass('selected');
      $('#type').val($(this).data('value'));
    })
    $('#list').on('click', '.apply-type-tab', function (e) {
      $(this).addClass('selected').siblings().removeClass('selected');
      $('#code_type').val($(this).data('value'));
    })
  });


}()
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

function alipayLinkClick() {
  var money = $("#money");
  var commission = +$('#commission').text();
  var balance = +$('#balance').text();
  var type = +$('#type').val();
  if (money.val() <= 0 || money.val() == "") {
    alert('请输入大于0的数字，谢谢！');
    money.focus();
    return false;
  }
  if (type == 0 && money.val() > balance) {
    alert('账户余额不足');
    money.focus();
    return false
  } else if (type == 1 && money.val() > commission) {
    alert('账户佣金不足');
    money.focus();
    return false
  }
  return true;
}
