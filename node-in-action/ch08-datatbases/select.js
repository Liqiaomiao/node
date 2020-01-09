const pg = require('pg')
const db = new pg.Client({
    database:'articles'
})
db.connect((err,result)=>{
    if(err) throw err;
    db.query(`
        SELECT * FROM snippets ORDER BY id
    `,(err,result)=>{
        if(err) throw err;
        console.log(result.rows);
    })
})