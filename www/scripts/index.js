const app = new Vue({
	el:"#app",
	data:{
		// 学生列表
		students:[],
		searchParams:{
		}
	},
	methods:{
		// 获取学生列表
		getStudents(searchParams){
			// 接口地址是相对index.html
			$.get('/api/students',searchParams)
			.done((res)=>{
				console.log(res);
				this.students = res.students;
			})
		},
		// 删除学生
		removeStudent(id,name){
			var isTure =  confirm("你确定要删除 "+ name +" 吗？");
			if(isTure){
				$.post('/api/del/',{id})
				.done((res)=>{
					// alert(res.message);
					console.log('111111')

					// 加弹窗 删除成功
           $("#message")
             .find(".modal-body")
             .html("删除学生" + name + "信息成功！")
             .end()
             .modal('show');

           $('#message').on('hidden.bs.modal', (e) => {
             // 重新获取学生信息
             this.getStudents(this.searchParams);
           })
				})
			}
		},
		// 编辑页面
		goTo(id){
			// 跳转页面
			// 把id传过去
			location.href='edit.html?id='+id;
		}
	},
	created:function(){
		this.getStudents(this.searchParams);
	},
	mounted:function(){

	}

})