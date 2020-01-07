const pug = require('pug')
const template = 'strong #{message}'
const template2 = `ul.hreflist
    li#hrefitem1 :a(href='http://nodejs.org/') Node.js homepage
    li:a(href='http://npmjs.org/') Npm homepage
    li:a(href='http://nodebits.org/') Nodebites blog`
const context = {
    message: 'hello template!'
}

const fn = pug.compile(template)
const fn2 = pug.compile(template2)
console.log(fn(context));
console.log(fn2())