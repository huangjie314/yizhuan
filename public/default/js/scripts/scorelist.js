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
      real_name_authentication: '',

      "integrals": [
        {
          "value": "1.00",
          "type": 0,
          "integral": "1.00",
          "remark": "每天登录获得积分",
          "created_at": "2019-11-15 21:35:32"
        },
        {
          "value": "1.00",
          "type": 0,
          "integral": "2.00",
          "remark": "每天登录获得积分",
          "created_at": "2019-11-16 21:44:07"
        }
      ],
      page: 1,
      limit: 10

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
      this.getScoreList();
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
              this.real_name_authentication = info.real_name_authentication;

            } else {
              myAlert(res.message);
            }
          }.bind(this),
          error: function (error) {
            console.log(error);
          }
        })
      },
      getScoreList: function () {
        var self = this;
        Util.ajax({
          url: '/api/user/integral',
          dataType: 'POST',
          certificate: true,
          data: {
            page: self.page,
            limit: self.limit
          },
          success: function (res) {
            if (res.status === 1) {
              self.integrals = res.data.integrals;
            }
          }
        })
      }

    },
  })
}()

