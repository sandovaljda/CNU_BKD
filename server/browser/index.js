const Storage = require('../storage/index'),
    express = require('express'),
    Router = express.Router()

Router.get("/search/:city/:type/:price", function (req, res) {
    console.log("*************************")
    console.log(JSON.stringify(req.params.city))
    console.log(JSON.stringify(req.params.type))
    console.log(JSON.stringify(req.params.price))
    console.log("-------------------------")
    var city = ""
    var type = ""
    var price = req.params.price
    if (req.params.city != "Escoge una ciudad") {
        city = req.params.city
    }
    if (req.params.type != "Escoge un tipo") {
        type = req.params.type
    }
    // price = req.params.price
    Storage.getData()
        .then(function (data) {
            var jsonDatos = data
            if (city != "") {
                jsonDatos = filtrarDatosPorCiudad(jsonDatos, city)
            }

            if (type != "") {
                jsonDatos = filtrarDatosPorTipo(jsonDatos, type)
            }

            if (price != "undefined") {
                jsonDatos = filtrarDatosPorRango(jsonDatos, type)
            }

            res.json(jsonDatos)
        }).catch(function (error) {
            console.log('error')
            res.sendStatus(500).json(error)
        })
})

function filtrarDatosPorCiudad(datos, city) {
    var output = new Array()
    for (var i = 0; i < datos.length; i++) {
        if (datos[i].Ciudad == city) {
            output.push(datos[i])
        }
    }
    return output
}

function filtrarDatosPorTipo(datos, type) {
    var output = new Array()
    for (var i = 0; i < datos.length; i++) {
        if (datos[i].Tipo == type) {
            output.push(datos[i])
        }
    }
    return output
}

function filtrarDatosPorRango(datos, rango) {
    var output = new Array()
    for (var i = 0; i < datos.length; i++) {

    }

    return output
}

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