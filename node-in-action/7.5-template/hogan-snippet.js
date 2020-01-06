const hogan = require('hogan.js')
const templateSource = '{{message}}'
const context = {message: 'Hello temolate!'}
const template = hogan.compile(templateSource)
console.log(template.render(context));