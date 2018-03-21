// 导入express模块
var express = require("express");
var Student = require("../db/db.js");

// 生成路由
var router = express.Router();

// 一个学生信息  接口
router.get('/api/edit/:id', (req, res) => {
  var id = req.params.id;
  // 查找对应要修改学生的信息
  Student.findById(id, function(err, data) {
    if (!err) {
      if (data) {
        // 数据处理
        var data = data.toObject();
        data.id = data._id.toString();
        delete data._id;
        console.log(data)

        res.json({
          student: data
        });
      }
    }
  });
});

// 获取学生信息   接口
router.get('/api/students', (req, res) => {
  var name = req.query.name? req.query.name.trim() :"";
  var isMale = req.query.isMale?req.query.isMale:'' ;
  var phone = req.query.phone ? req.query.phone.trim() :"";
  //声明一个过虑对象
  var filter = {};
  if (name == ""){}else{
    filter.name = new RegExp(name)
  }
  if(isMale == ""){}else{
    filter.isMale = isMale;
  }
  if(phone == ""){}else{
    filter.phone = new RegExp(phone);
  }
  console.log(filter)
  // 查找搜索相关 学生数据
  Student.find(filter)
    .exec(function(err, data) {
      if (!err) {
        // 所有学生的数组
        var students = data.map(function(elem) {
          // 把每个学生的和数据不相关去掉
          elem = elem.toObject();
          // 把id转化成字符串
          elem.id = elem._id.toString();
          delete elem._id;
          return elem;
        });
        res.json({
          students: students
        })
      }
    });
});

// 学生信息添加 接口
router.post('/api/add', (req, res) => {
  console.log(req.body);
  var student = req.body;
  student.ip = req.ip;
  student.createTime = new Date().getTime();
  student.updateTime = student.createTime;
  // 插入数据库
  new Student(student).save((err) => {
    if (!err) {
      var message = "添加" + student.name + "信息成功！";
      res.status(200).json({ code: "success", message: message })
    } else {
      res.status(200).json({ code: "error", message: "添加数据失败！" })
    }
  });

});

// 学生信息删除 接口
router.post('/api/del', (req, res) => {
  // req.body
  var id = req.body.id;
  console.log(id)
  Student.findByIdAndRemove(id, function(err) {
    if (!err) {
      var message = "删除" + req.body.name + "信息成功！"
      res.status(200).json({ code: "success", message: message })
    } else {
      res.status(200).json({ code: "success", message: "删除学生信息失败！" })
    }
  });
});

// 学生信息修改 接口
router.post('/api/edit', (req, res) => {
  var student = req.body;
  student.updateTime = new Date().getTime();
  var id = student.id;
  delete student.id;
  Student.findByIdAndUpdate(id, student, function(err) {
    if (!err) {
      var message = "更新" + student.name + "同学的信息成功！"
      res.status(200).json({ code: "success", message: message })
    } else {
      res.status(200).json({ code: "error", message: "更新同学的信息失败！" })
    }
  })
});

module.exports = router;
