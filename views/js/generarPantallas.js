const mainContainer = document.getElementById('main');
let ruta = '';

function requestListener() {
    let ventana = JSON.parse(this.responseText);
    cargarSeries(ventana);
}

function cargarSeries(ventana) {
    mainContainer.innerHTML = '';
    let i = 0;
    ventana.tipos.forEach((tipo) => {
        mainContainer.innerHTML += `<div class="col-3 borde text-center">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <input type="radio" name="cosa" id="cosa${i}" value="${tipo.nombre}" onChange="">
        <label for="cosa${i}">${tipo.nombre}</label>
      </div>`;
      i++;
    });
}

function agregarARuta(text, agregar) {
    if (agregar) {
        ruta += `/${text}`;
        cargarPantalla(cargar);
    } else {
        cargarPantalla(cargar);
    }
    console.log(ruta);
}

function cargarPantalla(objeto) {
    console.log(objeto);
}

const request = new XMLHttpRequest();
request.addEventListener("load", requestListener);
request.open("GET", "../js/ventana.json");
request.send();
