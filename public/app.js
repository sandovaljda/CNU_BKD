var prefer = false

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
})

// function setSearch() {
//     let busqueda = $('#checkPersonalizada')
//     busqueda.on('change', (e) => {
//         if (this.customSearch == false) {
//             this.customSearch = true
//         } else {
//             this.customSearch = false
//         }
//         $('#personalizada').toggleClass('invisible')
//     })
// }

// setSearch()

function getSelectedOption(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}

console.log('Client-side code running');

const button = document.getElementById('buscar');
button.addEventListener('click', (e) => {
    console.log('button was clicked');
    var check = document.getElementById('checkPersonalizada')
    var ciudad = "Escoge una ciudad"
    var tipo = "Escoge un tipo"
    var precio = "undefined"
    if (check.checked == true) {
        ciudad = getSelectedOption('ciudad')
        tipo = getSelectedOption('tipo')
        precio = document.getElementById('rangoPrecio').text
    }

    var data = {
        "ciudad": ciudad,
        "tipo": tipo,
        "precio": precio
    };

    fetch(`/search/${data.ciudad}/${data.tipo}/${data.precio}`, { method: 'GET' })
        .then(function (response) {
            if (response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function (data) {
            console.log(data)
            html = ""
            for (var i = 0; i < data.length; i++) {
                var item = data[i]
                html += `<div class="card horizontal">
                                <div class="card-image">
                                    <img src="./img/home.jpg">
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <div>
                                            <b>Direccion: </b><p>${item.Direccion}</p>
                                        </div>
                                        <div>
                                            <b>Ciudad: </b><p>${item.Ciudad}</p>
                                        </div>
                                        <div>
                                            <b>Teléfono: </b><p>${item.Telefono}</p>
                                        </div>
                                        <div>
                                            <b>Código postal: </b><p>${item.Codigo_Postal}</p>
                                        </div>
                                        <div>
                                            <b>Precio: </b><p>${item.Precio}</p>
                                        </div>
                                        <div>
                                            <b>Tipo: </b><p>${item.Tipo}</p>
                                        </div>
                                    </div>
                                    <div class="card-action right-align">
                                        <a href="#">Ver más</a>
                                    </div>
                                </div>
                            </div>`
            }

            $("#lista").html(html);
        })
        .catch(function (error) {
            console.log(error);
        });
});

const check = document.getElementById('checkPersonalizada')
check.addEventListener('click', function () {
    if (check.checked == true) {
        console.log('check activado')
        prefer = true
        fetch('/custome', { method: 'GET' })
            .then(function (response) {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(function (data) {
                console.log(data)
                var listaCiudad = document.getElementById("ciudad");
                var cities = data.ciudades
                for (var i = 0; i < cities.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = i
                    opt.text = cities[i];
                    listaCiudad.add(opt);
                }
                $('#ciudad').show()

                var listaTipo = document.getElementById("tipo");
                var types = data.tipos
                for (var i = 0; i < types.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = i
                    opt.text = types[i];
                    listaTipo.add(opt);
                }
                $('#tipo').show()
            })
            .catch(function (error) {
                console.log(error);
            });
        $('#personalizada').show();
    } else {
        console.log('check desactivado')
        document.getElementById("ciudad").innerHTML = "<option value='' selected>Escoge una ciudad</option>";
        document.getElementById("tipo").innerHTML = "<option value='' selected>Escoge un tipo</option>";
        $('#personalizada').hide()
        prefer = false
    }
});