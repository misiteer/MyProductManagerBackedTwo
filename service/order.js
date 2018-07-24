let Order = require('../model/order');
let productService = require('../service/product');
let Big = require('big.js');
let config = require('../config');

//order : {productId: 'ccccc',  count: 2}
async function addOrder(order) {
    //1. 判断productId是否存在
    let p = await productService.getProductById(order.productId);

    //2. 如果库存小于订单的数量就报异常
    if(p.stock < order.count){
        throw Error("商品库存不够")
    }

    //3. 给order的字段进行复制
    order.productName = p.name;
    order.productPrice = p.price;

    //这个Big的库需要装的
    order.totalPrice = Big(order.productPrice).times(order.count)

    let o = await Order.create(order);

    //4. 减库存  调用Service里的更新操作
    await productService.updateProduct(p._id, {stock: p.stock-order.count})

    return o;
}

//分页获取订单的信息
async function getOrdersByPage(page = 1) {
    return await Order.find().skip((page-1)*config.PageCount).limit(config.PageCount)
        .sort("created").select("-__v")
}

module.exports = {
    addOrder,
    getOrdersByPage
}