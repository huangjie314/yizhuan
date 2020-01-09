!function () {
  var statusMap = {
    '0': '审核中',
    "1": '已打款',
    "2": '已驳回'
  }
  var codeType = {
    '0': '支付宝',
    "1": '微信',
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

      orders: [],
      page: 1,
      limit: 50,
      cashType: ''
    },
    created() {
      this.getUserInfo();
      this.cashList();
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
      filterCodeType: function (val) {
        return codeType[val]
      },
      filterType: function (val) {
        if (val == 0) {
          return '余额'
        } else {
          return '佣金'
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
      cashList: function () {
        Util.ajax({
          url: '/api/cash/list',
          type: 'POST',
          certificate: true,
          data: {
            page: this.page,
            limit: this.limit,
            type: this.cashType
          },
          success: function (res) {
            if (res.status === 1) {
              var orders = res.data.orders;
              this.orders = orders;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
          error: function (error) {
            console.log(error);
          }
        })
      }
    },
  })

  $(function () {
    $('#list').on('click', '#user_tixian_list a', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
      scoreApp.cashType = $(this).data('type');
      scoreApp.cashList();
    })
  });

}()

