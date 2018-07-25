const Storage = require('../storage/index'),
    express = require('express'),
    Router = express.Router()

Router.get("/search/:city/:type/:price_from/:price_to", function (req, res) {
    var city = ""
    var type = ""
    var price = [0,0]
    if (req.params.city != "Escoge una ciudad") {
        city = req.params.city
    }
    if (req.params.type != "Escoge un tipo") {
        type = req.params.type
    }
    if (req.params.price_from != "0" && req.params.price_to != "0") {
        price = [parseInt(req.params.price_from) , parseInt(req.params.price_to)] 
    }

    
    console.log("*************************")
    console.log(JSON.stringify(city))
    console.log(JSON.stringify(type))
    console.log(JSON.stringify(price))
    console.log("-------------------------")


    Storage.getData()
        .then(function (data) {
            var jsonDatos = data
            if (city != "") {
                jsonDatos = filtrarDatosPorCiudad(jsonDatos, city)
            }

            if (type != "") {
                jsonDatos = filtrarDatosPorTipo(jsonDatos, type)
            }

            if (req.params.price_from != "0" && req.params.price_to != "0") {
                jsonDatos = filtrarDatosPorRango(jsonDatos, price)
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
        var precio_s = datos[i].Precio.split("$")[1]
        var precio = parseInt(precio_s.split(",")[0] + precio_s.split(",")[1])
        if(precio>=rango[0] && precio<=rango[1]){
            output.push(datos[i])
        }
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