const redis = require('redis')
const bcrypt = require('bcrypt')
const db = redis.createClient()

class User {
    constructor (obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
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
        db.set(`user:id:${this.name}`, id, (err) => {  // 用名称索引用户id
            if (err) return cb(err)
            db.hmset(`user:${id}`, this, err => { // 用redis 存储当前类的属性
                cb(err)
            })
        })
    }

    hashPassword (cb) {
        bcrypt.genSalt(12, (err, salt) => { // 生成有12个字符的盐
            if (err) return cb(err)
            this.salt = salt // 设定盐以便保存
            bcrypt.hash(this.pass,salt,(err,hash)=>{
                if(err)return cb(err)
                this.pass = hash; // 设定hash以便保存
                cb()
            })
        })


    }
}
module.exports = User

