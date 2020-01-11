const knex = require('knex')
// const sqlites3 = require('sqlite3').verbose()
const pg = require('pg')
// const db = knex({
//     client: 'sqlite3',
//     connection: {
//         filename:'tldr.sqlite'
//     },
//     useNullAsDefault:true
// })
const db = knex({
    client: 'pg',
    connection: {
        database: 'articles'
    }
})
module.exports = ()=>{
    return db.schema.hasTable('articles').then((flag)=>{
        if(!flag){
            console.log(knex);
            return db.schema.createTable('articles', function(t) {
                t.increments('id').primary();
                t.string('title' );
                t.text('content');
            });
        }
    })
}
module.exports.Article = {
    all(){
        return db('articles').orderBy('title');
    },
    find(id){
        return db('articles').where({id}).first()
    },
    create(data){
        return db('articles').insert(data)
    },
    delete(id){
        return db('articles').del().where({id})
    }
}