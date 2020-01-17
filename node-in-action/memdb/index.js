const db = []
exports.saveSync = (doc) => {
    db.push(doc)
}
exports.getdb = ()=>{
    return db
}
exports.clear = ()=>{
   db.length=  0
}
exports.first = (obj) => {
    const arr = db.filter((doc)=>{
        for(let key in obj ){
            if(doc[key]!=obj[key]){
                return false
            }
            return  true
        }
    })
    return arr.shift()
}