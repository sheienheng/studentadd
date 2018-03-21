// 导入express模块
var express = require("express");
var fs = require("fs");
var db = require("../db/db.js");

// 生成路由
var router = express.Router();

// 网站首页路由
router.get('/index', (req, res) => {
  // 读取一个目录
  db.Question.find()
    .populate("createUser")
    .populate({
      path: 'answers',
      populate: {
        path: 'createUser',
        select: '-password'
      }
    })
    .exec(function(err, data) {
      // console.dir(data[0].toObject());
      var data = data.map(function(elem) {
        elem = elem.toObject();
        elem.id = elem._id.toString();
        delete elem._id;
        return elem
      });
      data.reverse();
      // console.log(questions);
      res.json({
        title: "首页-问答系统",
        privateJs: "index",
        data: data
      })

      // res.render("index", {
      //   title: "首页-问答系统",
      //   privateJs: "index",
      //   data: data
      // })
    });

  // files所有的文件名数组

})

module.exports = router;
