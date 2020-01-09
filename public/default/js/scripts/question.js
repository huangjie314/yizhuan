!function () {
  var avatarApp = new Vue({
    el: '#proinfoApp',
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
      real_name_authentication: '',
      mobile_authentication: 1,
      bank_authentication: 0,
      video_authentication: 0,
    },
    computed: {
      userLevel: function () {
        return this.level ? 'vip会员' : '普通会员'
      },
      formatMobile: function () {
        return this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    },
    created() {
      this.getUserInfo();
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

    },
  })
  $(function () {
    var verifyCode = new GVerify("captcha_img");
    $('#txtCode').blur(function () {
      var parent = $(this).parent();
      var checktip = parent.find('.Validform_checktip');
      if (checktip.hasClass('Validform_right')) {
        extraCheck();
      }
    })
    function extraCheck() {
      var textCode = $('#txtCode');
      var parent = textCode.parent();
      var checktip = parent.find('.Validform_checktip');
      var res = verifyCode.validate(textCode.val());
      if (!res) {
        textCode.addClass('Validform_error');
        if (checktip.length) {
          checktip.removeClass('Validform_right').addClass('Validform_wrong');
          checktip.html('输入验证码不正确');
        } else {
          parent.append('<span class="Validform_checktip Validform_wrong">输入验证码不正确！</span>')
        }
        return false;
      } else {
        textCode.removeClass('Validform_error');
        return true;
      }
    }
    //初始化表单
    AjaxInitForm('#pwdForm', '#btnSubmit', 1, null, null, {
      data: function () {
        return {
          pay_password: $('#txtPayPassword').val(),
          old_secret_question: $('#select_old_question').val(),
          old_secret_answer: $('#txtOldAnswer').val(),
          secret_question: $('#select_new_question').val(),
          secret_answer: $('#txtNewAnswer').val(),
        }
      },
      type: 'PUT',
      extraCheck: function () {
        var textCode = $('#txtCode');
        var parent = textCode.parent();
        var checktip = parent.find('.Validform_checktip');
        var res = verifyCode.validate(textCode.val());
        if (!res) {
          textCode.addClass('Validform_error');
          if (checktip.length) {
            checktip.removeClass('Validform_right').addClass('Validform_wrong');
            checktip.html('输入验证码不正确');
          } else {
            parent.append('<span class="Validform_checktip Validform_wrong">输入验证码不正确！</span>')
          }
          return false;
        } else {
          textCode.removeClass('Validform_error');
          return true;
        }
      }
    });
  });
}()

