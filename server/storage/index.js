var fs = require('fs'),
    path = require('path')

module.exports = {
    getData: function(){
        var dataPath = __dirname + path.join('/data/data.json')
        // console.log(dataPath)
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', function (err, readData){
                if(err) throw err
                resolve(JSON.parse(readData))
            })
        })
    }
}