let Product = require('../model/product');
let config = require('../config');

//添加商品
async function addProduct(product) {
    return await Product.create(product)
}

//分页获取商品数据
async function getProductsByPage(page = 1) {
    return await Product.find().skip( (page-1)*config.PageCount ).limit(config.PageCount)
        .sort("created").select("-__v")
}

async function isIdExist(id) {
    let p = await Product.findOne({_id: id});
    if(!p){
        throw Error(`id为${id}的商品不存在`)
    }
}

//根据id更新商品的内容
async function updateProduct(id, update) {
    await isIdExist(id);
    let res = await Product.updateOne({_id: id}, update)
    if (res.n<1){
        throw Error("更新失败啦")
    }
}

//删除商品
async function deleteProduct(id) {
    await isIdExist(id)
    let res = await Product.deleteOne({_id: id})
    if (res.n< 1){
        throw Error("删除失败啦")
    }
}

async function getProductById(id) {
    await isIdExist(id)
    return await Product.findOne({_id: id});
}

module.exports = {
    addProduct,
    getProductsByPage,
    updateProduct,
    deleteProduct,
    getProductById
}