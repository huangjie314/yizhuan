
$(function () {
  avatarApp = {}
  //初始化表单
  AjaxInitForm('#infoForm', '#btnSubmit', 1, null, null, {
    data: function () {
      return {
        sex: $('[name="rblSex"]:checked').val(),
        qq: $('#txtQQ').val(),
        email: $('#txtEmail').val(),
        province: $('#txtProvince').val(),
        city: $('#txtCity').val(),
        area: $('#txtArea').val(),
        birthday: $('#txtBirthday').val(),
        phone: $('#txtTelphone').val(),
        address: $('#txtAddress').val(),
        signature: $('#txtSign').val(),
      }
    },
    type: 'POST',
  });
  //初始化地区
  new PCAS("txtProvince=" + $('#txtProvince').data('value') + ",请选择省份", "txtCity=" + $('#txtCity').data('value') + ",请选择城市", "txtArea=" + $('#txtArea').data('value') + ",请选择地区")

});


