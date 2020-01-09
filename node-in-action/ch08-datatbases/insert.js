const pg = require('pg')
const db = new pg.Client({database:'articles'})
const body = 'hello world'
db.connect((err,client)=>{
    if(err) throw err;
    db.query(`
    INSERT INTO snippets (body) VALUES(
        '${body}'
    )
    RETURNING id
`,(err,result)=>{
        if(err)throw err;
        const id = result.rows[0].id;
        console.log('Inserted row width id %s',id)
    })
})
