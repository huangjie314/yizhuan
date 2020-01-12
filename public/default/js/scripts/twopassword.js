
$(function () {
  //初始化表单
  AjaxInitForm('#pwdForm', '#btnSubmit', 1, null, null, {
    data: function () {
      return {
        mobile: $('#txtMobile').val(),
        old_pay_password: $('#txtOldPassword').val(),
        pay_password: $('#txtPassword').val(),
        confirm_pay_password: $('#txtPassword1').val(),
        code: $('#txtCode').val()
      }
    },
    type: 'POST',
  });
});

