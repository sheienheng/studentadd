// 加载模块
const mongoose = require("mongoose");
// 用es6中的Promise来取代 mongoose里集成的已经过时的
// promise
mongoose.Promise = Promise;
// 连接数据库
mongoose.connect("mongodb://localhost/h11-student");
const db = mongoose.connection;
// 是否打开数据库成功
db.on("open", () => {
  console.log("打开数据库成功！");
});

// students集合
const Student = mongoose.model("students", {
  name: String,
  isMale: Boolean,
  age:Number,
  phone: String,
  email: String,
  description: String,
  ip: String,
  createTime:Number,
  updateTime:Number
});

// 导出一个构造方法
module.exports = Student;
