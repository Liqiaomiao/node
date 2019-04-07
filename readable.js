const { Readable } = require('stream')
const moment = require('moment')
class LReadable extends Readable {
    constructor(opts){
        super(opts)
        this.count = 0;

    }
    _read(size) {
        console.log('called at', moment().format('mm:ss'));
        this.push('alaallllala\n')
        this.count++

        if(this.count>3){
            this.push(null)
        }
    }
}
const rs = new LReadable()
rs.on('data',(data)=>{
    console.log(data.toString());
    rs.pause();
    setTimeout(()=>{
        rs.resume()
    },1000)
})
rs.on('end',()=>{
    console.log('end');
})