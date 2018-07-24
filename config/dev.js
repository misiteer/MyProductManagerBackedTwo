//这是放开发环境的配置
//导出去
module.exports = {
    PORT: 4000,
    DB: 'product-manager-test',
    TokenExpire: 1000 * 3600,  //1小时
    //为了验证一下token过期不能登录的问题  这里改为5秒
    // TokenExpire: 5000,
    TokenKey: "product-test",  //一般来说key是可以配置的
    PageCount: 10
}