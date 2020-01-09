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
      last_login_time: '',
      last_login_ip: '',
      real_name_authentication: '',
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
    computed: {
      userLevel: function () {
        var str = '';
        if (this.type == 0) {
          str = this.level ? 'vip会员' : '普通会员'
        } else {
          str = this.level ? 'vip商家' : '普通商家'
        }
        return str
      }
    },
    created() {
      this.getUserInfo();
      this.capitalConfig();
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
            } else {
              myAlert(res.message);
            }
          }.bind(this),
          error: function (error) {
            myAlert(error);
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
    AjaxInitForm('#user_exchange_form', '#btnSubmit', 1, null, null, {
      data: function () {
        return {
          type: $('#exType-tab .selected').data('value'),
          value: $('#exPoint').val()
        }
      }
    });
    $("#exType-tab a").bind("click", function () {
      $(".formula").hide();
      $(".formula").eq($("#exType-tab a").index($(this))).show();
      $("#exType-tab a").removeClass("selected");
      $(this).addClass("selected");
      $("#exType").val($(this).attr("data-value"));
    })
  })
}()