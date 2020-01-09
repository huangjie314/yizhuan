!function () {

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
      commission: '0.00',
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
        var str = '';
        if (this.type == 0) {
          str = this.level ? 'vip会员' : '普通会员'
        } else {
          str = this.level ? 'vip商家' : '商家会员'
        }
        return str
      },
      formatMobile: function () {
        return this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    },
    filters: {

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
      $(this).before("<img src='../../style/images/waipic3.png' width=150 height=150 align='absmiddle' class='preview upload-image' style='cursor:pointer' /><br>");
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
  if (money.val() <= 0 || money.val() == "") {
    alert('请输入大于0的数字，谢谢！');
    money.focus();
    return false;
  }
  return true;
}
