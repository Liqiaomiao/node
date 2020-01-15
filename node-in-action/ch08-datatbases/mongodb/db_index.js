const express = require('express')
const app = express()
const db = require('./db')
const assert = require('assert')
db().then(()=>{
    db.Article.getTimesTamp('5e1d281694f37d248fd544cf');
    db.Article.create({title:'An article'}).then(()=>{
        db.Article.all().then(articles=>{
            console.log(articles);
            const article1 = articles[0]
            db.Article.find(article1._id).then(data=>{
                // assert.equal(data._id,article1._id) // error ObjectID 表面上看起来可能像字符串一样，但实际上是对象
                console.log(data._id.equals(article1._id)); // true 因为 转为字符串
                console.log(String(data._id) === String(article1._id)); // true 因为 转为字符串
            }).catch(err=>{
                console.log(err);
            })

        })
    })
    db.Article.find('5e1d281694f37d248fd544cf').then(data=>{ // 5e1d281694f37d248fd544cf 为已知id
        console.log('find by id',data);
    })
}).catch(err=>{
    console.log(err);
})