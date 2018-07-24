let router = require('express').Router();
let userService = require('../service/user');

//获取用户信息
router.get('/:username', async(req, res)=>{
    let user = await userService.getUserInfo(req.params.username);
    res.success(user)
});

//注册
router.post('/register', async (req, res)=>{
    //注册的结果
    let user = await userService.registerUser(req.body);
    res.success(user)
});

//登录
router.post('/login', async (req, res)=>{
    let token = await userService.loginUser(req.body);
    //登录之后返回一个token
    res.success({
        token
    })
});

router.delete('/:username', async (req, res)=>{
    await userService.deleteUser(req.params.username)
    res.success()
});

module.exports = router;