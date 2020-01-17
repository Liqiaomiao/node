const memdb = require('..');
const assert = require('assert');
describe('memb', () => {
    beforeEach((done)=>{
        memdb.clear()
    })
    describe('synchronous .save(doc)', () => {
        it('should have the document', (done) => {
            const pet = {name: 'Tobi'}
            memdb.save(pet)
            const ret = memdb.first({name: 'Tobi'})
            assert(pet == ret)
            done()
        })
    })
    describe('synchronous .saveSync(doc)', () => {
        it('should have the document', () => {
            const pet = {name: 'Tobi'}
            memdb.saveSync(pet)
            const ret = memdb.first({name: 'Tobi'})
            assert(pet == ret)
        })
    })
    describe('.first(obj)', () => {
        it('should return the first matching doc', () => {
            const tobi = {name: 'tobi'}
            const loki = {name: 'loki'}
            memdb.saveSync(tobi)
            console.log('get db =======',memdb.getdb())
            memdb.saveSync(loki)

            let ret = memdb.first({name: 'tobi'})

            assert(ret == tobi)
            ret = memdb.first({name: 'loki'})
            assert(ret == loki)
        })

        it('should return null when no doc matches', () => {
            const ret = memdb.first({name: 'hello'})
            assert(ret == null)
        })
    })

})