//给客户端返回操作成功的信息
function success(res, data) {
    res.send({
        code: 0,
        data: data,
        msg: "操作成功"
    });
}

//那这当然是失败的信息啦
function fail(res, msg) {
    res.send({
        code: -1,
        msg: msg
    })
}

//导出失败和成功的信息
module.exports = {
    success, fail
}