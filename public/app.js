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

function setSearch() {
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
        if (this.customSearch == false) {
            this.customSearch = true
        } else {
            this.customSearch = false
        }
        $('#personalizada').toggleClass('invisible')
    })
}

setSearch()

console.log('Client-side code running');

const button = document.getElementById('buscar');
button.addEventListener('click', function (e) {

    console.log('button was clicked');
    fetch('/clicked', { method: 'GET' })
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