const hogan = require('hogan.js')
const studentTemplate = `
    <p>
        Name: {{name}},
        Age: {{age}} years old
    </p>
`
const mainTemplage=`
   {{#students}}
        {{>student}}
   {{/students}} 
`
const context= {
    students:[{
        name:'Jane Narwhal',
        age:21
    },{
        name:'Rick LaRue',
        age:26
    }]
}
const template = hogan.compile(mainTemplage)
const partial = hogan.compile(studentTemplate)
const html = template.render(context,{student:partial})
console.log(html)