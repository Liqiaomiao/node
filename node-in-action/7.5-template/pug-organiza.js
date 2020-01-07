const pug = require('pug')
const fs = require('fs')
const templagteFile = './templates/page.pug'
const iterTemplate = fs.readFileSync(templagteFile)
const context = {
    messages:[
        'you have logged in successfully',
        'welocom back'
    ]
}
const iterFn = pug.compile(iterTemplate,{filename:templagteFile})
console.log(iterFn(context));