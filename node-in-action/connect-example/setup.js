function setUp (format) {
    const regexp = /:(\w+)/g;
    return function (req,res,next) {
        const str = format.replace(regexp,(match, property)=>{
            console.log(match, property);
            return req[property]
        })
        console.log(str);
        next()
    }
}
module.exports = setUp