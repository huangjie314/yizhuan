!function () {
  var indexApp = new Vue({
    el: '#indexApp',
    data: {
      username: '',
      type: 0,
      level: 0,
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
      mobile_authentication: 1,
      bank_authentication: 0,
      video_authentication: 0,
      order_info: {},
      user_appeal: {},
      buy_points: []
    },
    computed: {
      userLevel: function () {
        return this.level ? 'vip会员' : '普通会员'
      }
    },
    created() {
      this.getUserInfo();
      this.getCapitalConfig();
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
              this.mobile_authentication = info.mobile_authentication;
              this.bank_authentication = info.bank_authentication;
              this.video_authentication = info.video_authentication;
              this.order_info = info.order_info;
              this.user_appeal = info.user_appeal;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
        })
      },
      getCapitalConfig: function () {
        Util.ajax({
          url: '/api/config/capital',
          type: 'POST',
          certificate: true,
          success: function (res) {
            if (res.status === 1) {
              var capital = res.data.capital;
              this.buy_points = capital.buy_points;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
        })
      },
      buy: function (money, point) {
        var d = dialog({
          title: '提示',
          content: '亲，您确定要购买此卡吗？',
          okValue: '确定',
          ok: function () {
            Util.ajax({
              type: "PUT",
              url: "/api/user/buyPoint",
              certificate: true,
              dataType: "json",
              data: {
                point: point,
                money: money
              },
              timeout: 20000,
              success: function (data, textStatus) {
                if (data.status == 1) {
                  var tipdialog = dialog({ content: data.msg }).show();
                  setTimeout(function () {
                    tipdialog.close().remove();
                    if (data.url) {
                      location.href = data.url;
                    } else {
                      location.reload();
                    }
                  }, 2000);
                } else {
                  dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
                }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                dialog({ title: '提示', content: '状态：' + textStatus + '；出错提示：' + errorThrown, okValue: '确定', ok: function () { } }).showModal();
              }
            });

          },
          cancelValue: '取消',
          cancel: function () { }
        });
        d.show();
        return false;
      }
    },
  })
  $(function () {
    tabs('#oauthTabs', 'click');
    $(".cards_list img").tipsy({ gravity: 's' });
  });
}()
