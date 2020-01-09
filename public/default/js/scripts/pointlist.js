!function () {
  var avatarApp = new Vue({
    el: '#listApp',
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
      mobile_authentication: 1,
      bank_authentication: 0,
      video_authentication: 0,

      pointsList: [] // 资金明细
    },
    computed: {
      userLevel: function () {
        var str = '';
        if (this.type == 1) {
          str = '商户会员'
        } else {
          str = this.level ? 'vip会员' : '普通会员'
        }
        return str
      },
      formatMobile: function () {
        return this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      },
    },
    created() {
      this.getUserInfo();
      this.getMoneyList();
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
              this.mobile_authentication = info.mobile_authentication;
              this.bank_authentication = info.bank_authentication;
              this.video_authentication = info.video_authentication;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
        })
      },
      getMoneyList: function () {
        Util.ajax({
          url: '/api/user/point',
          type: 'POST',
          certificate: true,
          data: {
            page: 1,
            limit: 10
          },
          success: function (res) {
            if (res.status === 1) {
              var points = res.data.points;
              this.pointsList = points;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
        })
      }
    },
  })
  $(function () {
    $(".log_nav").each(function () {
      var url_href = $(this).attr("href");
      var url_path = location.pathname;
      if (url_path.indexOf('-') != -1) {
        url_path = url_path.substring(0, url_path.indexOf('-'));
      }
      if (url_href.indexOf(url_path) != -1) {
        if (location.search != "") {
          if (url_href.indexOf(location.search) != -1) {
            $(this).addClass("selected");
          }
        } else {
          $(this).addClass("selected");
        }
      }
    });
  });
}()

