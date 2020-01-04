const redis = require('redis')
const bcrypt = require('bcrypt')
const db = redis.createClient()

class User {
    constructor (obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    static getByName (name, cb) { // 根据名称查找用户ID
        User.getId(name, (err, id) => {
            if (err) return cb(err)
            User.get(id, cb)
        })
    }

    static getId (name, cb) {
        db.get(`user:id:${ name }`, cb)
    }

    static get (id, cb) { // 用ID抓取用户
        db.hgetall(`user:${ id }`, (err, user) => {
            if (err) return cb(err)
            cb(null, new User(user))
        })
    }

    static authenticate (name, pass, cb) { // 用户名和密码认证
        User.getByName(name, (err, user) => {
            if (err) return cb(err)
            if (!user.id) return cb() // 用户不存在
            bcrypt.hash(pass, user.salt, (err, hash) => { // 对给出的密码做哈希处理
                if (err) return cb(err)
                if (hash === user.pass) return cb(null, user) // 匹配发现项
                cb() // 密码无效
            })
        })
    }

    save (cb) {
        if (this.id) {
            this.update(cb)
        } else {
            db.incr('user:ids', (err, id) => {
                if (err) return cb(err)
                this.id = id;
                this.hashPassword(err => {
                    if (err) return cb(err)
                    this.update(cb)
                })
            })
        }
    }

    update (cb) {
        const id = this.id
        db.set(`user:id:${ this.name }`, id, (err) => {  // 用名称索引用户id
            if (err) return cb(err)
            db.hmset(`user:${ id }`, this, err => { // 用redis 存储当前类的属性
                cb(err)
            })
        })
    }

    hashPassword (cb) {
        bcrypt.genSalt(12, (err, salt) => { // 生成有12个字符的盐
            if (err) return cb(err)
            this.salt = salt // 设定盐以便保存
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return cb(err)
                this.pass = hash; // 设定hash以便保存
                cb()
            })
        })


    }

    toJSON () {
        return {
            id: this.id,
            name: this.name
        }
    }
}

module.exports = User

