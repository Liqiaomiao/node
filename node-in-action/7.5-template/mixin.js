const pug = require('pug')
const fs = require('fs')
const path = require('path')
const templagtename = path.join(__dirname,'/templates/mixin.pug')
const templateFile = fs.readFileSync(templagtename)

const students = {
    students:[
        { name: 'Rick LaRue', age: 23 },
        { name: 'Sarah Cathands', age: 25 },
        { name: 'Bob Dobbs', age: 37 }
    ]
};
const tempFun = pug.compile(templateFile,{filename:templagtename})
console.log(tempFun(students));