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

              mypcas && mypcas.SetValue(info.province, info.city, info.area);
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
    //初始化表单
    AjaxInitForm('#infoForm', '#btnSubmit', 1, null, null, {
      data: function () {
        return {
          sex: avatarApp.sex,
          qq: avatarApp.qq,
          email: avatarApp.email,
          province: $('#txtProvince').val(),
          city: $('#txtCity').val(),
          area: $('#txtArea').val(),
          birthday: avatarApp.birthday,
          phone: avatarApp.phone,
          address: avatarApp.address,
          signature: avatarApp.signature,
        }
      },
      type: 'PUT',
    });
    //初始化地区
    var provice = '所属城市', txtCity = '所属城市', txtArea = '所属地区';
    if (avatarApp.provice) {
      provice = avatarApp.provice;
    }
    if (avatarApp.city) {
      txtCity = avatarApp.city;
    }
    if (avatarApp.area) {
      txtArea = avatarApp.area;
    }
    mypcas = new PCAS("txtProvince," + provice + "", "txtCity," + txtCity + "", "txtArea," + txtArea + "");
  });
}()

