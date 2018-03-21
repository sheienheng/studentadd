const app = new Vue({
  el: "#app",
  data: {
    // 要添加的学生
    student: {}
  },
  methods: {
    // 修改学生
    eidtStudent() {
      $.post('/api/edit', this.student)
        .done((res) => {
          // alert(res.message);
          // this.student: {}
          // location.href = 'index.html';
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
    },
    getStudent(id){
    	$.get('/api/edit/'+id)
    	.done((res)=>{
    		console.log(res);
    		// 获取学生信息
    		this.student = res.student;
    	})
    }
  },
  created:function(){
    // 从地址栏中获取参数
  	let id = (/id=([^\&]+)/.exec(location.href)[1]);
  	this.getStudent(id);
  }
})
