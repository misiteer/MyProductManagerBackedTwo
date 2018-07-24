let mongoose = require('mongoose');
let config = require('./config');
mongoose.connect(`mongodb://127.0.0.1/${config.DB}`)

let db = mongoose.connection;

//监听对数据库的连接的失败事件
db.on('error', err=>{
    console.log(err.toString());
});
//成功事件
db.once('open',()=>{
    console.log('mongodb connect successfully~!');
});