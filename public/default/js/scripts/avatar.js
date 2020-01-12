
$(function () {
  $('#upload-box').uploadImg(function (that, result) {
    $('#target, #preview').attr('src', result);
    avatar = result;
  })
  $('#btnSubmit').on('click', function () {
    Util.ajax({
      url: '/api/user/uploadAvatar',
      type: 'POST',
      certificate: true,
      data: {
        avatar: $('#preview').attr('src')
      },
      success: function (res) {
        myAlert(res.message);
        if (res.status == 1) {
          $('.u-img img').attr('src', res.data.avatar);
        }
      }
    })
  })
})


