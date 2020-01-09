!function () {
  var avatarApp = new Vue({
    el: '#spreadApp',
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
      identity: '',
      real_name_authentication: 0,
      mobile_authentication: 1,
      bank_authentication: 0,
      video_authentication: 0,

      invitationConfig: {
        first_level: "1",
        second_level: "0.5"
      },
      invitationUrl: "http://api.cn/m/Register.html?u=15750783791",
      qrCode: "/qr_code/a7f68c6713ab3680d96534d16d841cd2.png"
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
      this.getConfig();
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
              this.identity = info.identity;
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
      getConfig: function () {
        Util.ajax({
          url: '/api/user/invitation',
          type: 'POST',
          certificate: true,
          data: {
            platform_type: 'web'
          },
          success: function (res) {
            if (res.status == 1) {
              var data = res.data;
              this.invitationConfig = data.invitationConfig;
              this.invitationUrl = data.invitationUrl;
              this.qrCode = data.qrCode;
            }
          }.bind(this)
        })
      }

    },
  })
  $(function () {
    if (window.clipboardData && /MSIE [5-8]+./.test(navigator.userAgent)) {
      //针对ie5-8
      $('.btnspread').bind("click", function () {
        var copy_obj = $(this).attr("data-clipboard-target");
        window.clipboardData.setData("Text", $(copy_obj).val());
        dialogTips('复制成功！');
      });
    } else {
      var clip = new Clipboard('.btnspread');
      clip.on('success', function (e) {
        dialogTips('复制成功！');
      });
    }
  });
  function dialogTips(msg) {
    var d = parent.dialog({ content: msg }).show();
    setTimeout(function () {
      d.close().remove();
    }, 2000);
  };

}()

