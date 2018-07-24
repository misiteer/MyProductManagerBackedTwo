//写下面五个字段
let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "用户名不能是空的哦~~"]
    },
    password: {
        type: String,
        required: [true, "密码不能是空的哦~~"]
    },
    age:{
        type: Number,
        min: [0, "年龄不能比0小哦~~"],
        max: [120, "年龄不能超过120哦~~"],
        default: 10
    },
    role: {
        type: Number,
        default: 0  // 0表示商家用户, 100表示超级管理员
    },
    created: {
        type: Date,
        //显示时间戳  单位是毫秒类型
        default: Date.now()
    }
});

module.exports = mongoose.model('users', schema)