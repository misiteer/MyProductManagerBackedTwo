//这是放线上环境的配置
module.exports = {
    PORT: 80,  //线上环境多用80端口
    DB: 'product-manager',
    TokenExpire: 1000 * 3600 * 24 * 7,  //一周时间
    TokenKey: "product-manager",
    PageCount: 10
}
