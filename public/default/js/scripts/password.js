
$(function () {
  //初始化表单
  AjaxInitForm('#pwdForm', '#btnSubmit', 1, null, function () {
    Util.login();
  }, {
      data: function () {
        return {
          old_password: $('#txtOldPassword').val(),
          password: $('#txtPassword').val(),
          confirm_password: $('#txtPassword1').val(),
        }
      },
      type: 'POST',
    });
});

