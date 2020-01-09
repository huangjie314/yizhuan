!function () {
  var indexApp = new Vue({
    el: '#list',
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
      buy_points: [],

      messages: [],
      msgType: 0,
      limit: 40,
      page: 1
    },
    computed: {
      userLevel: function () {
        return this.level ? 'vip会员' : '普通会员'
      }
    },
    created() {
      this.getUserInfo();
      this.getMessageList();
    },
    filters: {
      formatContent: function (str) {
        if (str.length > 20) {
          return str.slice(0, 20) + '....'
        } else {
          return str
        }
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
      getMessageList: function () {
        Util.ajax({
          url: '/api/message/get',
          type: 'POST',
          certificate: true,
          data: {
            type: this.msgType,
            page: this.page,
            limit: this.limit
          },
          success: function (res) {
            if (res.status === 1) {
              var messages = res.data.messages;
              this.messages = messages;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
        })
      },
      handleDel: function (id) {
        ExecPostBack(id)
      },
    }
  })
  $(function () {
    $('#list').on('click', '.u-tab-head a', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
      indexApp.msgType = $(this).data('type');
      indexApp.getMessageList();
    })
  })
}()
function ExecPostBack(checkValue) {
  if (arguments.length == 1) {
    ExecDelete('api/message/delete', checkValue, '#turl');
  } else {
    var valueArr = '';
    $("input[name='checkId']:checked").each(function (i) {
      valueArr += $(this).val();
      if (i < $("input[name='checkId']:checked").length - 1) {
        valueArr += ","
      }
    });
    ExecDelete('api/message/delete', valueArr, '#turl');
  }
}