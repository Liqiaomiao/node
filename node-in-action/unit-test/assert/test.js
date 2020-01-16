const Todo = require('./todo')
const todo = new Todo()
const assert = require('assert')
let testsCompleted = 0
function deleteTest() {
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
addTest()