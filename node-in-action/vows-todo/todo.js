let Todo = function () {
    this.todo = []
}

Todo.prototype.add = function (list) {

    this.todo.push(list)
    console.log('this.todo',this.todo);
}
module.exports = Todo
