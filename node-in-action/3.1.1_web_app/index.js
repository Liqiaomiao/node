const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// process.env.PORT => PORT=4444 node index.js
app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(port, () => {
    console.log(`Express web app available at localhost:${port}`)
})