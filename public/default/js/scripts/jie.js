!function () {
  var faApp = new Vue({
    el: '#faApp',
    data: {
      username: '',
      type: 0,
      level: 0,
      money: '0.00',
      publishing_point: '0.00',
      commission: 0,
      collection_point: '0.00',
      integral: '0.00',
      real_name: '',
      flow_point: '0.00',
      last_login_time: '',
      last_login_ip: '',
      order_info: {},

      orders: [],
      platform_type: ['所有任务区', '淘宝天猫', '京东'],
      selctedPlat: -1,
      status: '',
      goods_type: '', // 1虚拟 0实物
      shop_name: '',
      accept_user: '',
      user_account: ''
    },
    computed: {
      userLevel: function () {
        var str = '';
        if (this.type == 0) {
          str = this.level ? 'vip会员' : '普通会员'
        } else {
          str = this.level ? 'vip商家' : '商家会员'
        }
        return str
      }
    },
    filters: {
      filterGoodTitle: function (text) {
        return text.slice(0, 8) + '...'
      },
      getUsername: function (accept) {
        if (accept) {
          var username = accept.username;
          return username.slice(0, 1) + '****' + username.slice(-1);
        } else {
          return null;
        }
      },
      getAccount: function (account) {
        if (account) {
          return account.name
        } else {
          return null;
        }
      },

    },
    created() {
      this.getUserInfo();
      this.getTaskLists();
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
              this.commission = info.commission;
              this.collection_point = info.collection_point;
              this.integral = info.integral;
              this.real_name = info.real_name;
              this.flow_point = info.flow_point;
              this.last_login_time = info.last_login_time;
              this.last_login_ip = info.last_login_ip;
              this.order_info = info.order_info;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
        })
      },
      getTaskLists: function () {
        Util.ajax({
          url: '/api/order/list',
          type: 'POST',
          certificate: true,
          data: {
            page: this.page,
            limit: this.limit,
            status: this.status,
            order_sn: '',
            goods_type: this.goods_type,
            shop_name: this.shop_name,
            accept_user: this.accept_user,
            user_account: this.user_account
          },
          success: function (res) {
            if (res.status === 1) {
              var orders = res.data.orders;
              this.orders = orders;
            } else {
              myAlert(res.message);
            }
          }.bind(this)
        })
      },
      // 追评时间
      filerApendTime: function (time) {
        var time = new Date(time).getTime();
        var now = new Date().getTime();
        var s = Math.floor((now - time) / 1000);
        return CheckTimeHour(s);
      },
      // 支付时间
      filterZhifuTime: function (time) {
        var time = new Date(time).getTime();
        var now = new Date().getTime();
        var s = Math.floor((now - time) / 1000);
        return CheckTime(s);
      },
      // 删除任务
      deleteTask: function (id) {
        if (IsDelTask(100)) {
          Util.ajax({
            url: '/api/order/delete/' + id,
            type: 'DELETE',
            certificate: true,
            success: function (res) {
              if (res.status === 1) {
                location.reload();
              } else {
                myAlert(res.message);
              }
            }.bind(this)
          })
        }
      },
      // 发货
      fahuo: function (id) {
        if (IsSendTask(12)) {
          Util.ajax({
            url: '/api/order/delivery/' + id,
            type: 'PUT',
            certificate: true,
            success: function (res) {
              if (res.status === 1) {
                myAlert(res.message, function () {
                  location.reload();
                })
              } else {
                myAlert(res.message);
              }
            }.bind(this)
          })
        }
      },
      // 取消订单
      rejectTask: function (id) {
        if (IsRejectTask(0)) {
          Util.ajax({
            url: '/api/order/cancelAccept/' + id,
            type: 'PUT',
            certificate: true,
            success: function (res) {
              if (res.status === 1) {
                location.reload();
              } else {
                myAlert(res.message);
              }
            }.bind(this)
          })
        }
      },
      //handleDialogOpen
      handleDialogOpen: function (tit, id, callname) {
        dialogOpen(tit, id, callname);
      },
      // 提前收货
      tiqianShouhuo: function (type, id) {
        if (type == 0) {
          return IsModHPTime('/api/order/receiveHours/' + id);
        } else if (type == 1) {
          return IsDelayHPTime('/api/order/receiveHours/' + id);
        }
      },
      // 审核返款
      examineRebate: function (id, platform_type) {
        var str = platform_type == 0 ? '淘宝天猫' : '京东';
        if (IsConfirmTask(str)) {
          Util.ajax({
            url: '/api/order/examineRebate/' + id,
            type: 'PUT',
            certificate: true,
            success: function (res) {
              if (res.status === 1) {
                myAlert(res.message, function () {
                  location.reload();
                });
              } else {
                myAlert(res.message);
              }
            }.bind(this)
          })
        }
      },
      // 审核订单追评
      examineAppendEvaluate: function (id) {
        Util.ajax({
          url: '/api/order/examineAppendEvaluate/' + id,
          type: 'PUT',
          certificate: true,
          success: function (res) {
            if (res.status === 1) {
              myAlert(res.message, function () {
                location.reload();
              });
            } else {
              myAlert(res.message);
            }
          }.bind(this)
        })
      },
    },
  })
  $(function () {
    $('#faApp').on('click', '#orderFields > a', function (e) {
      e.preventDefault();
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      var status = $(this).data('status');
      var goodtype = $(this).data('goodtype');
      if (status != undefined) {
        faApp.status = status;
      }
      if (goodtype != undefined) {
        faApp.goods_type = goodtype;
      }
      faApp.getTaskLists();
    })
    $('#faApp').on('click', '#ibtnSubmit', function (e) {
      var txtKeyWord = $('#txtKeyWord').val();
      var SearchType = $('#ddlSearchType').val();
      if (SearchType == 1) {
        faApp.order_sn = txtKeyWord;
      } else if (SearchType == 2) {
        faApp.shop_name = txtKeyWord;
      } else if (SearchType == 3) {
        faApp.accept_user = txtKeyWord;
      } else if (SearchType == 4) {
        faApp.user_account = txtKeyWord;
      }
    })
  })
}()

