//引入db
require('./db')

// 在这里写 process.env.NODE_ENV = 'production'的时候就会顶替掉下面的config.PORT就把开发环境4000变为了线上环境80

// 引入异常捕获处理
require('express-async-errors')  // 放到最前面引入
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
//3
let config = require('./config');

let app = express();

// 注册日志中间件  log中间件
app.use(morgan('combined'));
// 注册body-parser中间件
app.use(bodyParser.json());

// 注册自定义的中间件
app.use(require('./middleware/res_md'));
app.use(require('./middleware/token_md'));
app.use(require('./middleware/permission_md'));

// 注册路由
app.use("/user", require('./router/user'));
app.use("/category",require('./router/category'));
app.use("/product", require('./router/product'));
app.use("/order", require('./router/order'));

// 注册异常处理中间件  固定写法
app.use((err, req, res, next) => {
    res.fail(err.toString());
});

//3. config.PORT开发环境是4000
app.listen(config.PORT);