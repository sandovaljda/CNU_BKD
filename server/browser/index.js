const Storage = require('../storage/index'),
    express = require('express'),
    Router = express.Router()

Router.get('/search', function (req, res) {
    console.log("*************************")
    console.log(req)
    console.log("*************************")
    Storage.getData()
        .then(function (data) {
            res.json(data)
        }).catch(function (error) {
            console.log('error')
            res.sendStatus(500).json(error)
        })
})

Router.get('/custome', function (req, res) {
    Storage.getData()
        .then(function (data) {
            var ciudades = []
            ciudades.push(data[0].Ciudad)
            for (var i = 1; i < data.length; i++) {
                var item = data[i].Ciudad
                var nuevo = true
                var j = 0
                for (var j = 0; j < ciudades.length; j++) {
                    if (ciudades[j] == item) {
                        nuevo = false
                        break
                    }
                }
                if (nuevo) {
                    ciudades.push(item)
                }
            }
            console.log(ciudades)

            var tipos = []
            tipos.push(data[0].Tipo)
            for (var i = 1; i < data.length; i++) {
                var item = data[i].Tipo
                var nuevo = true
                var j = 0
                for (var j = 0; j < tipos.length; j++) {
                    if (tipos[j] == item) {
                        nuevo = false
                        break
                    }
                }
                if (nuevo) {
                    tipos.push(item)
                }
            }
            console.log(tipos)

            var jsonDatos = {
                "ciudades": ciudades,
                "tipos": tipos
            }
            res.json(jsonDatos)
        }).catch(function (error) {
            console.log('error')
            res.sendStatus(500).json(error)
        })
})
module.exports = Router