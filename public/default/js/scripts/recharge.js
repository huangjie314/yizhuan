!function () {
  var statusMap = {
    '0': '审核中',
    "1": '已打款',
    "2": '已驳回'
  }
  var scoreApp = new Vue({
    el: '#list',
    data: {
      username: '',
      type: 0,
      level: 0,
      mobile: '',
      sex: '',
      money: '0.00',
      publishing_point: '0.00',
      avatar: '../../templates/main/images/user-avatar.png',
      commission: 0,
      collection_point: '0.00',
      integral: '0.00',
      real_name: '',
      flow_point: '0.00',
      last_login_time: '',
      last_login_ip: '',
      real_name_authentication: '',
      birthday: '',
      qq: '',
      email: '',
      phone: '',
      province: '',
      city: '',
      area: '',
      address: '',
      signature: '',
      real_name_authentication: 0,
      mobile_authentication: 1,
      bank_authentication: 0,
      video_authentication: 0,

      capital: {},
      exchange_points: {
        min: 1,
        proportion: 0.95
      },
      exchange_integral: {
        min: 100,
        proportion: 0.02
      }

    },
    created() {
      this.getUserInfo();
      this.capitalConfig();
    },
    computed: {
      userLevel: function () {
        return this.level ? 'vip会员' : '普通会员'
      },
      formatMobile: function () {
        return this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    },
    filters: {
      filterType: function (val) {
        if (val == 0) {
          return '网银汇款'
        }
      },
      filterStatus: function (val) {
        return statusMap[val];
      }
    },
    methods: {
      getUserInfo: function () {
        Util.ajax({
          url: '/api/user/info',
          type: 'POST',
          certificate: true,
          success: function (res) {
            if (res.status === 1) {
              var info = res.data.info;
              this.mobile = info.mobile;
              this.sex = info.sex;
              this.username = info.username;
              this.type = info.type;
              this.level = info.level;
              this.money = info.money;
              this.publishing_point = info.publishing_point;
              if (info.avatar) {
                this.avatar = info.avatar;
              }
              this.commission = info.commission;
              this.collection_point = info.collection_point;
              this.integral = info.integral;
              this.real_name = info.real_name;
              this.flow_point = info.flow_point;
              this.last_login_time = info.last_login_time;
              this.last_login_ip = info.last_login_ip;
              this.real_name_authentication = info.real_name_authentication;
              this.birthday = info.birthday;
              this.qq = info.qq;
              this.email = info.email;
              this.phone = info.phone;
              this.province = info.province;
              this.city = info.city;
              this.area = info.area;
              this.address = info.address;
              this.signature = info.signature;
              this.real_name_authentication = info.real_name_authentication;
              this.mobile_authentication = info.mobile_authentication;
              this.bank_authentication = info.bank_authentication;
              this.video_authentication = info.video_authentication;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
          error: function (error) {
            console.log(error);
          }
        })
      },
      capitalConfig: function () {
        Util.ajax({
          url: '/api/config/capital',
          type: 'POST',
          certificate: true,
          success: function (res) {
            if (res.status === 1) {
              var capital = res.data.capital;
              this.capital = capital;
              this.exchange_points = capital.exchange_points;
              this.exchange_integral = capital.exchange_integral;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
          error: function (error) {
            myAlert(error);
          }
        })
      }
    },
  })
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
        $(this).before("<img src='../../style/images/waipic3.png' align='absmiddle' width=150 height=150 class='preview upload-image' />");
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
}()

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