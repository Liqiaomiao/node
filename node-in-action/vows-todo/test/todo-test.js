const vows = require('vows')
const assert = require('assert')
const Todo = require('./../todo.js')
vows.describe('Todo')
    .addBatch({ // 批次
    'when adding an item':{ // 情境
        topic() { // 主题
            let todo =  new Todo()
            todo.add('sss')
            return todo.todo
        },
        'it should exist in my todos':function (err,todo){ // 誓约
            assert.ifError(err);
            assert.equal(todo.length,1)
        }
    }
}).run()