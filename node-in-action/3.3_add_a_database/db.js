const sqlites3 = require('sqlite3').verbose()
const dbName = 'later.sqlited'
const db = new sqlites3.Database(dbName) // connects to a database file

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
        (id integer primary key,title,content TEXT)
    `
    db.run(sql) // creates an 'articles' table if there isn't one
})

class Article {
    // fetches all articles
    static all(cb) {
        db.all('SELECT * FROM articles', cb)
    }
    // selects a specific article
    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb)
    }
   // inserts a article
    static create(data, cb) {
        const sql = 'INSERT INTO articles(title,content) VALUES (?,?)'; // specifies parameters with question marks
        db.run(sql, data.title, data.content, cb)
    }
    // delete a article
    static delete(id,cb){
        if(!id) return cb(new Error('please provide an id'))
        db.run('DELETE FROM articles WHERE id=?',id,cb)
    }

}
module.exports.Article = Article
