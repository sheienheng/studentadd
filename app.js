const express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  app = express();

app.use(express.static('www'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 引入路由  学生管理
app.use(require("./routers/student.js"));

app.listen(3000, () => {
  console.log('服务器正常起动');
})
