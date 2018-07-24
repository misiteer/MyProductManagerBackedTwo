//通过index文件来实现动态切换

let config = null;

// 默认是不成立的，所以会走开发环境的配置 node_env:意思是给node配置环境
if (process.env.NODE_ENV==='production'){
    //引入prod.js   就是把prod对象赋值给了config
    config = require('./prod')
}else {
    config = require('./dev')
}

//把取到的config导出给外界
module.exports = config;