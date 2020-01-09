
!function () {
  var ageMap = {
    '0': '18~25岁',
    '1': '26~35岁',
    '2': '35岁以上'
  }
  var statusMap = {
    0: '待审核',
    1: '审核通过',
    2: '审核不通过'
  }
  var listApp = new Vue({
    el: '#listApp',
    data: {
      accounts: [],

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
      bank_authentication: 0,
      video_authentication: 0,
      real_name_authentication: 0,
      mobile_authentication: 1
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
      filterSex: function (sex) {
        return sex == 1 ? '男' : '女';
      },
      filterAge: function (age) {
        return ageMap[age];
      },
      filterStatus: function (status) {
        return statusMap[status];
      }
    },
    created() {
      this.getList();
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
              this.type = info.type;
              this.username = info.username;
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
              this.bank_authentication = info.bank_authentication;
              this.video_authentication = info.video_authentication;
              this.real_name_authentication = info.real_name_authentication;
              this.mobile_authentication = info.mobile_authentication;
            } else {
              myAlert(res.message);
            }
          }.bind(this)
        })
      },
      getList: function () {
        Util.ajax({
          url: '/api/account/list',
          type: 'POST',
          certificate: true,
          success: function (res) {
            if (res.status === 1) {
              this.accounts = res.data.accounts;
            }
          }.bind(this),
          error: function (err) {
            console.log(err);
          }
        })
      },
      handleUpdate: function (idx) {
        var accounts = this.accounts[idx];
        Util.ajax({
          url: '/api/account/update/' + accounts.id,
          type: 'PUT',
          certificate: true,
          data: {
            sex: accounts.sex,
            age: accounts.age,
            is_real_name: accounts.is_real_name,
            level: accounts.level
          },
          success: function (res) {
            if (res.status == 1) {
              myAlert(res.message, function () {
                location.reload();
              })
            } else {
              myAlert(res.message);
            }
          },
          error: function (err) {
            console.log(err);
          }
        })
      },
      handelDel: function (idx) {
        var accounts = this.accounts[idx];
        Util.ajax({
          url: '/api/account/delete/' + accounts.id,
          type: 'DELETE',
          certificate: true,
          success: function (res) {
            if (res.status == 1) {
              myAlert(res.message, function () {
                location.reload();
              })
            } else {
              myAlert(res.message);
            }
          }
        })
      }
    },
  })

  $(function () {

  });
}()

