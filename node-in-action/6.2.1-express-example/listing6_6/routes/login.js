const User = require('../models/user')
exports.form = (req, res) => {
    res.render('login', { title: 'login' })
}
exports.submit = (req, res,next) => {
    const data = req.body.user
    User.authenticate(data.name,data.pass,(err,user)=>{ // 检查凭证
        if(err) return next(err);
        if(user){
            res.session.uid = user.id; // 为认证存储uid;
            res.redirect('/')
        }else {
            res.error('Sorry! invalid credentials.')
            res.redirect('back')
        }
    })
}
exports.logout = (req, res) => {
    req.session.destory(err=>{
        if(err)throw err;
        res.redirect('/')
    })
}