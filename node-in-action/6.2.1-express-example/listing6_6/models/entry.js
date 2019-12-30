const redis = require('redis')
const db = redis.createClient() // 创建reids客户端实例
class Entry{
    constructor (obj){
        for(let key in obj){ // 循环遍历传入对象中的键
            this[key] = obj[key]
        }
    }
    static getRange(from,to,cb){
        db.lrange('entries',from,to,(err,items)=>{ // 用来获取消息记录的Redis lrang 函数
            if(err)return cb(err);
            let entries=[];
            items.forEach(item=>{
                entries.push(JSON.parse(item));
            })
            cb(null,entries)
        })
    }
    save(cb){
        const entryJSON = JSON.stringify(this); // 将保存的消息转换成json字符串
        console.log('saving',entryJSON)
        db.lpush( // 将json字符串保存到redis 列表中
            'entries',
            entryJSON,
            (err)=>{
                if(err){
                    return cb(err)
                }
                cb()
            }
        )
    }
}
module.exports = Entry