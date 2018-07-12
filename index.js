const   bodyParser = require('body-parser'),
        http = require('http'),
        fs = require('fs'),
        path = require('path'),
        express = require('express')
        
const   port = process.env.PORT || 8180,
        app = express(),
        Server = http.createServer(app)

app.get("/", function(req, res){

    console.log(getData()
        .then(function(data){
            res.json(data)
        }).catch(function(error){
            res.sendStatus(500).json(error)
        })
    )
});

Server.listen(port, function(){
    console.log("Server is running on port: " + port)
});


function getData(){
        var dataPath = __dirname + path.join('/data.json')
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', function (err, readData){
                if(err){
                    reject(err)
                }
                resolve(JSON.parse(readData))
            })
        })
    }

