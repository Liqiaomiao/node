/*
* mkdir watch done
* node watcher.js
* cd watch
* touch HELLO.TXT
* see the magic 😁
* */
const fs = require('fs')
const events = require('events')
const path = require('path')

class Watcher extends events.EventEmitter {
    constructor (watchDir, processDir) {
        super()
        this.watchDir = watchDir
        this.processDir = processDir
    }

    watch () {
        fs.readdir(this.watchDir, (err, files) => {
            if (err) throw err;
            for (let index in files) {
                this.emit('process', files[index])
            }
        })
    }

    start () {
        fs.watchFile(this.watchDir, () => {
            this.watch()
        })
    }
}

const watchDir = path.resolve(__dirname, 'watch')
const processDir = path.resolve(__dirname, 'done')
const watcher = new Watcher(watchDir, processDir)
watcher.on('process', (file) => {
    const watchFile = `${ watchDir }/${ file }`
    const processFile = `${ processDir }/${ file.toLowerCase() }`
    fs.rename(watchFile, processFile, (err) => {
        if (err) throw err

    })
})
watcher.start()