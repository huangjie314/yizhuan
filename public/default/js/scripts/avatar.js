!function () {
  var avatarApp = new Vue({
    el: '#avatarApp',
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
      last_login_ip: ''
    },
    computed: {
      userLevel: function () {
        return this.level ? 'vip会员' : '普通会员'
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
            } else {
              myAlert(res.message);
            }
          }.bind(this),
          error: function (error) {
            myAlert(error);
          }
        })
      },
    },
  })
  $(function () {
    var avatar = '';
    $('#upload-box').uploadImg(function (that, result) {
      $('#target, #preview').attr('src', result);
      avatar = result;
    })
    $('#btnSubmit').on('click', function () {
      Util.ajax({
        url: '/api/user/uploadAvatar',
        type: 'PUT',
        certificate: true,
        data: {
          avatar: $('#preview').attr('src')
        },
        success: function (res) {
          myAlert(res.message);
          if (res.status == '1') {
            avatarApp.avatar = avatar;
          }
        }
      })
    })
  })
}()

