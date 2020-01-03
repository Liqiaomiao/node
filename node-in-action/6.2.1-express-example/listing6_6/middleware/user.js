const User = require('../models/user');
module.exports = (req, res, next) => {
    const uid = req.session.uid; // 从会话中去除已登录的用户的ID
    if (!uid) return next();
    User.get(uid, (err, user) => { // 从Redis中取出已登录用户的数据
        if (err) return next();
        req.user = res.locals.user = user; // 将用户数据输出到响应对象中， 存储在req中，后续的中间件和路由可以用这个属性访问它。
        next()
    })
}