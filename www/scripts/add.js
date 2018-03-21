const app = new Vue({
  el: "#app",
  data: {
    // 要添加的学生
    student: {}
  },
  methods: {
    // 添加学生
    addStudent() {
      $.post('/api/add', this.student)
        .done((res) => {
          // alert(res.message);
          // 加弹窗 删除成功
          $("#message")
             .find(".modal-body")
             .html(res.message)
             .end()
             .modal('show');
          // this.student: {}
          $('#message').on('hidden.bs.modal', (e) => {
            // 跳转首页
            location.href = 'index.html'            
          })

        })
        
    }
  }
})
