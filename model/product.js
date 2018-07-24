const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "商品名称不能是空的"]
    },
    price:{
        type: String,
        required: [true, "商品价格不能是空的"]
    },
    stock: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    isOnSale: {
        type: Boolean,
        default: true   //表示默认是上架状态
    },
    category: {
        type:  mongoose.Schema.Types.ObjectId,
        required: [true, "商品的分类不能是空的"]
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('products',schema);