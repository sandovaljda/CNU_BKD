const   Storage = require('../storage/index'),
        express = require('express'),
        Router = express.Router()

Router.get('/clicked', function(req, res){
    Storage.getData()    
        .then(function(data){
            // console.log(data)
            res.json(data)
        }).catch(function(error){
            console.log('error')
            res.sendStatus(500).json(error)
        })
})

module.exports = Router