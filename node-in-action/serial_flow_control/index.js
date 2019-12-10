const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const configFileName = './rss_feeds.txt'
function checkForRssFile() {
    fs.exists(configFileName, (exists) => {
        if (!exists) {
            return next(new Error(`missing rss file:${configFileName}`))
        }
        next(null, configFileName)
    })
}
function readRSSFile(configFileName) {
    fs.readFile(configFileName, (err, feedList) => {
        if (err) return next(err)
        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split('\n')
        const random = Math.floor(Math.random() * feedList.length)
        next(null, feedList[random])

    })
}
function downloadRSSFeed(feedUrl) {
    request({ url: feedUrl }, (err, res, body) => {
        if (err) return next(err)
        if (res.statusCode != 200) {
            return next(new Error('abnormal response status code'))
        }
        next(null, body)
    })
}
function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.length) return next(new Error('no rss items found'))
    const item = handler.dom.shift();
    console.log(item)
}
const tasks = [
    checkForRssFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
]
function next(error, result) {
    if (error) throw error
    const currentTask = tasks.shift()
    currentTask && currentTask(result)
}
next()