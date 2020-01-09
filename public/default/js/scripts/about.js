!function () {
  var app = new Vue({
    el: '#app',
    data: {
      service_time: '',
      service_phone: '',
      about_us: '',
      service_criterion: '',
      address: '',
      name: '',
      email: '1635873999@qq.com',
      posts: [], // 文章列表
      categories: [], // 文章分类,
      post: {},
      prevInfo: {},
      nextInfo: {},
    },
    created() {
      this.getContactInfo();
      this.getPostList();
      this.getCategory();
      this.getPostDetail();
    },
    filters: {
      formatTime: function (time) {
        return time.slice(2, 10);
      }
    },
    methods: {
      getContactInfo: function () {
        var _this = this;
        Util.ajax({
          url: '/api/config/contacts',
          certificate: true,
          type: 'POST',
          success: function (res) {
            if (res.status == 1) {
              var contacts = res.data.contacts;
              _this.service_time = contacts.service_time;
              _this.service_phone = contacts.service_phone;
              _this.about_us = contacts.about_us;
              _this.service_criterion = contacts.service_criterion;
              _this.address = contacts.address;
              _this.name = contacts.name;
              _this.email = contacts.email;
            }
          }
        })
      },
      // 文章列表
      getPostList: function () {
        var _this = this;
        Util.ajax({
          url: '/api/post/list',
          certificate: true,
          data: {
            category_id: ''
          },
          type: 'POST',
          success: function (res) {
            if (res.status == 1) {
              var posts = res.data.posts;
              _this.posts = posts;
            }
          }
        })
      },
      // 文章分类
      getCategory: function () {
        var _this = this;
        Util.ajax({
          url: '/api/post/category',
          certificate: true,
          type: 'POST',
          success: function (res) {
            if (res.status == 1) {
              var categories = res.data.categories;
              _this.categories = categories;
            }
          }
        })
      },
      // 文章详情
      getPostDetail: function () {
        var _this = this;
        Util.ajax({
          url: '/api/post/detail/' + Util.getUrlSearch('id'),
          certificate: true,
          type: 'POST',
          success: function (res) {
            if (res.status == 1) {
              var data = res.data;
              if (data.post) {
                _this.post = data.post;
              }
              _this.prevInfo = data.prevInfo;
              _this.nextInfo = data.nextInfo;
            }
          }
        })
      },
      show(id) {
        location.href = 'service/show.html?id=' + id
      },
      // 跳文章列表
      goPostList(id) {
        location.href = 'service/6.html?id=' + id
      },
    }
  })
}()