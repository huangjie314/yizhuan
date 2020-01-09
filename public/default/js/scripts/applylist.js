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

      evaluates: [],
      evaluates_type: 1,
      page: 1,
      limit: 20
    },
    computed: {
      userLevel: function () {
        return this.level ? 'vip会员' : '普通会员'
      }
    },
    created() {
      this.evaluates_type = $('#type').val();
      this.getUserInfo();
      this.getEvaluateList();
    },
    filters: {
      getType: function (val) {
        var map = {
          0: '好评',
          1: '中评',
          2: '差评'
        }
        return map[val];
      },
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
          }.bind(this)
        })
      },
      getEvaluateList: function () {
        Util.ajax({
          url: '/api/appeal/list',
          type: 'POST',
          certificate: true,
          data: {
            type: this.evaluates_type,
            page: this.page,
            limit: this.limit
          },
          success: function (res) {
            if (res.status === 1) {
              var evaluates = res.data.evaluates;
              this.evaluates = evaluates;
            } else {
              myAlert(res.message);
            }
          }.bind(this)
        })
      }
    },
  })
}()

function ExecPostBack(checkValue) {
  if (arguments.length == 1) {
    ExecDelete('/tools/submit_ajax.ashx?action=appeal_delete', checkValue, '#turl');
  }
}