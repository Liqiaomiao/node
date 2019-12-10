const async = require('async')
const exec = require('child_process').exec
function downloadNodeVersion(version, destination, callback) { // downloads node source code for given version
    const url = `http://nodejs.org/dist/v${version}/node-v${version}.tar.gz`
    const filepath = `${destination}/${version}.tgz`
    exec(`curl ${url} > ${filepath}`, callback) // dowloads node and change .tar.gz type to .tgz
}
async.series([// executes series of tasks in sequence
    callback => {
        async.parallel([ // executes downloads in parallel
            callback => {
                console.log('Dowloading Node v4.4.7...')
                downloadNodeVersion('4.4.7', '/tmp', callback)
            },
            callback => {
                console.log('Downloading Node v6.3.0...')
                downloadNodeVersion('6.3.0', '/tmp', callback)
            }
        ], callback)
    },
    callback => { // create archive file
        console.log('Creating archive of downloaded files...')
        exec(
            'tar cvf node_distors.tar /tmp/4.4.7.tgz /tmp/6.3.0.tgz',
            err => {
                if (err) throw err;
                console.log('All done!')
                callback()
            }
        )
    }
])