const pg = require('pg')
const db = new pg.Client({
    database:'articles'
})
const id = 1;
const body = 'greetings, world';
db.connect((err,client)=>{
    if(err) throw err;
    db.query(`
    UPDATE snippets SET body=(
        '${body}'
       ) WHERE id=${id};
   `,(err,result)=>{
        if (err) throw  err;
        console.log('Update %s rows.',result.rowCount)
    })
})
