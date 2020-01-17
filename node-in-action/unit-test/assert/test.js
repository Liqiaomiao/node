const Todo = require('./todo')
const todo = new Todo()
const assert = require('assert')
let testsCompleted = 0
const deleteTest = ()=> {
    todo.add('Delete Me')
    assert.equal(todo.length,1,'1 item shoule exist')
    todo.deleteAll()
    assert.equal(todo.length,0,'no items should exist')
    testsCompleted++
}
const addTest = ()=>{
    todo.deleteAll()
    todo.add('Delete Me')
    assert.notEqual(todo.length,0,'1 item shoule exist');
    testsCompleted++
}
const doAsyncTest= (cb)=>{
    todo.doAsycn(value=>{
        console.log('async test value',value);
        assert.ok(value,'callback should be passed true')
        testsCompleted++
        cb();
    })

}
const throwsTest=(cb)=>{
    assert.throws(todo.add,/requires/);
}
deleteTest()
addTest()
throwsTest()
doAsyncTest(()=>{
    console.log(`Completed ${testsCompleted} tests`);
})