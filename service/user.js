let User = require('../model/user');
//这是自己封装的一个库  发现只有老师的名字可以成功
let crypto = require('lxj-crypto');
let config = require('../config');

// 1. 获取用户信息
async function getUserInfo(usenname) {
    let res = await User.findOne({
        username: usenname
    }).select("-__v -password");
    if (!res){
        throw Error(`用户名为${username}的用户不从在哦~~`)
    }
    return res;
}

//2. 根据username来判断用户是否从在
async function isUserExist(username) {
    let res = await User.findOne({username: username});
    if (!res) {
        throw Error(`用户名为${username}的用户不存在`)
    }
}

//3. 删除用户
async function deleteUser(username) {
    await isUserExist(username)

    //res : {n:1, mModify:1, ok: 1}
    let res = await User.deleteOne({username:username});
    if (res.n < 1){
        throw Error("删除失败啦~~")
    }
}

//4. 注册  user: {username: xxx, password:xx, age: 11, role: 100}
async function registerUser(user) {
    let res = await User.findOne({username:user.username});
    if (res){
        throw Error(`用户名为${user.username}的用户已经存在了哦~~`)
    }

    //对密码进行加密  使用username作为随机数对password进行哈希加密
    user.password = crypto.sha1Hmac(user.password, user.username);
    user.role = 0;  //它默认是客户
    user.created = Date.now();

    //库存的操作
    res = await User.create(user);
    res.password = ''
    return res
}

//用户登录的操作 user: {username: xxx, password: 'xxx'}
async function loginUser(user) {
    // 对密码进行加密
    user.password = crypto.sha1Hmac(user.password, user.username)

    //查询数据库是否存在
    let res = await User.findOne({username: user.username, password: user.password});
    if (!res){
        throw Error("用户名或者密码是错的哦~~")
    }

    //给用户生成一个token, 可以用aes算法生成
    //那么走到这里就说明用户名和密码验证成功了, 需要生产token返回给客户端, 以后客户端的header中带上这个token
    let tokenData = {
        username: user.username,
        expire: Date.now() + config.TokenExpire
    };

    let token = crypto.aesEncrypt(JSON.stringify(tokenData), config.TokenKey);
    return token
}


//导出结果
module.exports = {
    registerUser,
    getUserInfo,
    deleteUser,
    loginUser
}