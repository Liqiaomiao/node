const pg = require('pg')
const db = new pg.Client({database:'articles'})
db.connect((err,client)=>{
    if(err) throw err;
    console.log('Conneted to database',db.database)
    db.end()
})