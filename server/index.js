const bodyParser = require('body-parser'),
        http = require('http'),
        path = require('path'),
        express = require('express')

const browser = require('./browser/index')

const port = process.env.PORT || 8180,
        app = express(),
        Server = http.createServer(app)

app.set('port', port)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', browser)

Server.listen(port, function () {
        console.log("Server is running on port: " + port)
        console.log(__dirname)
});