const pug = require('pug')
const template = `h3.contacts-header My Contacts
    if contacts.length
    each contact in contacts
        - var fullName = contact.firstName + ' '+ contact.lastName
        div.contact-box
            p=fullName
            if contact.isEditable
                p: a(href='eidt/'+ contact.id) Edit Record
            p
                case contact.status
                    when 'Active'
                        strong User is active in the system
                        `
const context = {
    contacts:[
        {
            firstName:'liu',
            lastName: 'andy',
            isEditable: true,
            id: 1,
            status: 'Active'
        }
    ]
}
const fn = pug.compile(template)
console.log(fn(context));