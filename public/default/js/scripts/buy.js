

function buy(money, point) {
  var d = dialog({
    title: '提示',
    content: '亲，您确定要购买此卡吗？',
    okValue: '确定',
    ok: function () {
      Util.ajax({
        url: "/api/user/buyPoints",
        type: "POST",
        certificate: true,
        dataType: "json",
        data: {
          point: point,
          money: money
        },
        timeout: 20000,
        success: function (data, textStatus) {
          if (data.status == 1) {
            var tipdialog = dialog({ content: data.message }).show();
            setTimeout(function () {
              tipdialog.close().remove();
              if (data.url) {
                location.href = data.url;
              } else {
                location.reload();
              }
            }, 2000);
          } else {
            dialog({ title: '提示', content: data.message, okValue: '确定', ok: function () { } }).showModal();
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          dialog({ title: '提示', content: '状态：' + textStatus + '；出错提示：' + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        }
      });

    },
    cancelValue: '取消',
    cancel: function () { }
  });
  d.show();
  return false;
}
$(function () {
  tabs('#oauthTabs', 'click');
  $(".cards_list img").tipsy({ gravity: 's' });
});

