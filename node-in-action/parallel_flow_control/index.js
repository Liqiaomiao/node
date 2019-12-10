const fs = require('fs')
const tasks = []
const wordCounts = {} //{string:number}
const filesDir = './text'
let completedTasks = 0
function checkIfComplete() {
    /*
    when all tasks have completed,
    list each word used in the files and 
    the number of times it was used
    */
    completedTasks++
    if (completedTasks === tasks.length) {
        console.log('all done', wordCounts)
    }

}
function addWordCount(word) {
    wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1
}
function countWordsInText(text) {
    // split sort word
    const words = text
        .toString()
        .toLowerCase()
        .split(/\W+/) // \W+ 空格、回车
        .sort()
    words.filter(word => word)
        .forEach(word => addWordCount(word))
}
fs.readdir(filesDir, (err, files) => { // 1.gets a list of the files in the text directory=>files
    if (err) throw err;
    files.forEach(file => {
        /*  
            2.defines a task to handle each file. Each task includes a call to a function
            that will asynchromnously read the file and then count the file's word usage
        */
        const task = ((filepath) => {
            return () => {
                fs.readFile(filepath, (err, text) => {
                    if (err) throw err;
                    countWordsInText(text) // count the file's word
                    checkIfComplete() // check if 
                })
            }
        })(`${filesDir}/${file}`)
        tasks.push(task) // 3.add each task to an array of functions to call in parallel
    })
    tasks.forEach(task => task())// 4.starts executing every task in parallel
})