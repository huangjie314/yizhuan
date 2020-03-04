
$(function () {
  AjaxInitForm('#user_exchange_form', '#btnSubmit', 1, null, null, {
    data: function () {
      return {
        type: $('#exType-tab .selected').data('value'),
        value: $('#exPoint').val()
      }
    },
    type: 'POST',
    extraCheck: alipayLinkClick
  });
  $("#exType-tab a").bind("click", function () {
    $(".formula").hide();
    $(".formula").eq($("#exType-tab a").index($(this))).show();
    $("#exType-tab a").removeClass("selected");
    $(this).addClass("selected");
    $("#exType").val($(this).attr("data-value"));
  })
})

function alipayLinkClick() {
  var curIntegral = +$('#curIntegral').text();
  var curPublishPoint = +$('#curPublishPoint').text();
  var minPublishPoint = +$('#minPublishPoint').val();
  var minIntegral = +$('#minIntegral').val();
  var type = $('#exType-tab .selected').data('value');
  var exPoint = +$('#exPoint').val();
  if (type == 0) {
    if (exPoint < minPublishPoint) {
      alert('不好意思，发布点' + minPublishPoint + '点起兑换');
      $('#exPoint').focus();
      return false;
    }
    if (exPoint > curPublishPoint) {
      alert('不好意思，发布点不足');
      $('#exPoint').focus();
      return false;
    }
  } else if (type == 1) {
    if (exPoint < minIntegral) {
      alert('不好意思，积分' + minIntegral + '分起兑换');
      $('#exPoint').focus();
      return false;
    }
    if (exPoint > curIntegral) {
      alert('不好意思，积分点不足');
      $('#exPoint').focus();
      return false;
    }
  }

  return true;
}
