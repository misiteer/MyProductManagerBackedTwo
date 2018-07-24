let categoryService = require('../service/category');
let router = require('express').Router();

router.get("/", async (req, res)=>{
    //在express官网查询, 找到query是用来请求的
    let categorys = await categoryService.getCategorysByPage(req.query.page)
res.success(categorys)
});

//增加
router.post('/', async (req, res)=>{
    let c = await categoryService.addCategory(req.body)
res.success(c)
});

//更新
router.put('/:id', async (req, res)=>{
    await categoryService.updateCategory(req.params.id, req.body)
    res.success()
})

//删除
router.delete('/:id', async (req, res)=>{
    await categoryService.deleteCategory(req.params.id)
    res.success()
});

module.exports = router