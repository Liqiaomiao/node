function parseField (field) {
    return field
        .split(/\[|\]/)
        .filter(s=>s)
}
function getField (req,field) {
    let val = req.body
    field.forEach((prop,index)=>{
        val = val[prop]
        console.log(prop, index);
    })
    return val
}
exports.required = (field)=>{
    field = parseField(field)
    return (req,res,next)=>{
        if(getField(req,field)){
            next()
        }else{
            res.status(500)
            res.redirect('back')
        }
    }
}
exports.lengthAbove = (field,len)=>{
    field = parseField(field)
    return (req,res,next)=>{
        if(getField(req,field).length>len){
            next()
        }else{
            res.status(500)
            res.redirect('back')
        }
    }
}