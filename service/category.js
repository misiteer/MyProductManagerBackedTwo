let Category = require('../model/category');
let config = require('../config');

/**
 * category: {name: "服装"}
 * @param category
 * @returns {Promise<void>}
 */
async function addCategory(category) {
    return await Category.create(category)
}

/**
 * 分页查询分类的数据
 * @param page
 * @returns {Promise<void>}
 */
async function getCategorysByPage(page = 1) {
    return await Category.find().skip(config.PageCount * (page - 1)).limit(config.PageCount)
        .sort("created").select("-__v")
}

/**
 * 判断id是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isIdExist(id) {
    let c = await Category.findOne({_id: id});
    if (!c) {
        throw Error(`id为【${id}】的分类不存在`)
    }
}

/**
 * update: {name: "家电"}
 * @param update
 * @returns {Promise<void>}
 */
async function updateCategory(id, update) {
    //判断id是否存在
    await isIdExist(id)

    // res: {n: 1, nModify:1 , ok:1}
    let res = await Category.updateOne({_id: id}, update);
    if (res.n < 1) {
        throw Error("更新失败")
    }
}

/**
 * 删除分类
 * @param id
 * @returns {Promise<void>}
 */
async function deleteCategory(id) {
    //判断id是否存在
    await isIdExist(id)

    let res = await Category.deleteOne({_id: id});
    if (res.n < 1) {
        throw Error("删除失败")
    }
}

module.exports = {
    addCategory,
    getCategorysByPage,
    updateCategory,
    deleteCategory
}