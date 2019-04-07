const koa = require('koa');
const app = new koa();
/*let mw1= async (ctx,next)=>{
    try {
        console.log(1);
        await next()
        console.log(2);
    }catch (e) {
        console.log(e);
    }
}*/
let mw1 = async (ctx, next) => {
    console.log(1);
    await next()
    console.log(2);
}
let mw2= async (ctx,next)=>{
    try {
        console.log(3);
        await next()
        throw new Error('error from mw2')
        console.log(4);

    }catch (e) {
        console.log(e);
    }
}
app.use(mw1)
app.use(mw2)
app.on('error',(e)=>{
    console.log('error',e);
})
app.listen(8089)