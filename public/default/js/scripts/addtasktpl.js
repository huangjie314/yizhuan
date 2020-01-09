!function () {
  var avatarApp = new Vue({
    el: '#tplApp',
    data: {
      platform_type: '',
      page: 1,
      limit: 10,
      templates: [
        {
          "name": "下单",
          "goods_url": "111",
          "order_price": "11.00",
          "order_points": "16.90",
          "goods_good_comment_rule": 1,
          "created_at": "2019-11-30 18:57:33",
          "shop": {
            "id": 1,
            "name": "1239"
          }
        }
      ]
    },
    computed: {

    },
    created() {
      this.getTaskTpl();
    },
    mounted() {

    },
    methods: {
      getTaskTpl: function () {
        Util.ajax({
          url: '/api/template/list',
          type: 'POST',
          certificate: true,
          data: {
            page: this.page,
            limit: this.limit,
            platform_type: this.platform_type
          },
          success: function (res) {
            if (res.status === 1) {
              var templates = res.data.templates;
              this.templates = templates;
            } else {
              myAlert(res.message);
            }
          }.bind(this),
        })
      },
      deleteTpl: function (id) {
        if (confirm('您确定要删除吗？')) {
          Util.ajax({
            url: '/api/template/delete/' + id,
            type: 'POST',
            certificate: true,
            success: function (res) {
              if (res.status === 1) {
                location.reload();
              } else {
                myAlert(res.message);
              }
            }.bind(this),
          })
        }

      }
    },
  })
}()


