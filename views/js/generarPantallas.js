const arreglo = [];
setSteps(["serie", "Tipo", "Subtipo", "Dimensión","Tipo vidrio","tipos","Ceja"]);
setLayouts([""]);

generateStepper();

const mainContainerSerie = document.getElementById('main-serie');
const mainContainerTipo = document.getElementById('main-tipo');
const maincontainerSubTipo = document.getElementById('main-subtipo');
const maincontainerDimension = document.getElementById('main-dimension');

let ruta = '';

function requestListener() {
    let ventana = JSON.parse(this.responseText);
    cargarSeries(ventana);
}

function cargarSeries(ventana) {
    let temporal = '';
    let i = 0;
    ventana.tipos.forEach((serie) => {
        temporal += `<div class="col-3 borde text-center">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <input type="radio" name="cosa" id="cosa${i}" value="${serie.nombre}" onChange='cargarTipo(${JSON.stringify(serie)})'>
        <label for="cosa${i}">${serie.nombre}</label>
      </div>`;
      i++;
    });
    arreglo.push(temporal);
    setLayouts(arreglo);
    generateStepper();
    //onClick="setActiveStep(2)"

}

function cargarTipo(serie){
    let temporal = '';
    agregarARuta(serie.nombre,true);
    let i = 0;

    serie.tipo.forEach((tipo) =>{
        temporal += `<div class="col-3 borde text-center">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <input  type="radio" name="cosa" id="cosa${i}" value="${tipo.nombre}" onChange='cargarSubTipo(${JSON.stringify(tipo)},${JSON.stringify(serie)});'>
        <label for="cosa${i}">${tipo.nombre}</label>
      </div>`;
      i++;
    });

    arreglo.push(temporal);
    setLayouts(arreglo);
    generateStepper();
} 

function cargarSubTipo(tipo,serie){
    let temporal = '';
    agregarARuta(tipo.nombre,true);
    let i = 0;

    tipo.subtipo.forEach((subtipo) => {
        temporal += `<div class="col-3 borde text-center">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <input type="radio" name="cosa" id="cosa${i}" value="${subtipo.nombre}" onChange='cargarDimension(${JSON.stringify(subtipo)},${JSON.stringify(serie)});'>
        <label for="cosa${i}">${subtipo.nombre}</label>
      </div>`;
      i++;
    });

    arreglo.push(temporal);
    setLayouts(arreglo);
    generateStepper();
}


function cargarDimension(subtipo,serie){
    agregarARuta(subtipo.nombre,true);
    let i = 0;
    let tableString = '';

    tableString += `<div class="col-4"></div><div class="col-4"><table style = " border: 1px solid"><tr><th></th><th>Ancho</th><th>Alto</th></tr>`;
    subtipo.dimensiones.forEach((dimension) => {
        tableString += `<tr><td>${dimension.nombre}</td><td>${dimension.ancho}</td><td>${dimension.alto}</td></tr>`;
        console.log(dimension);
    });

    tableString += `</table></div><div class="col-4"></div>`;
    
    tableString += `</br><div class="col-12">
    <input class="col-4" type="text" placeholder="Alto"/>
    <input class="col-4" type="text" placeholder="Ancho"/>
    <button onClick = 'cargarTipoVidrio(${JSON.stringify(serie)})' class="col-3" type="button" title="Next">Siguiente</button>
    </div>`;
    
    arreglo.push(tableString);
    setLayouts(arreglo);
    generateStepper();


}

function cargarTipoVidrio(serie){
    let temporal = '';
    let i = 0;
    serie.tipoVidrio.forEach((tipoVidrio) => {
        temporal += `<div class="col-3 borde text-center">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <input type="radio" name="cosa" id="cosa${i}" value="${tipoVidrio.nombre}" onChange='cargarSubTipoVidrio(${JSON.stringify(tipoVidrio)},${JSON.stringify(serie)});'>
        <label for="cosa${i}">${tipoVidrio.nombre}</label>
      </div>`;
      i++;
    });
    arreglo.push(temporal);
    setLayouts(arreglo);
    generateStepper();
}

function cargarSubTipoVidrio(tipoVidrio, serie){
    let temporal = '';
    let i = 0;
    tipoVidrio.tipos.forEach((subtipo) => {
        temporal += `<div class="col-3 borde text-center">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <input type="radio" name="cosa" id="cosa${i}" value="${subtipo.nombre}" onChange='cargarCeja(${JSON.stringify(serie)});'>
        <label for="cosa${i}">${subtipo.nombre}</label>
      </div>`;
      i++;
    });
    arreglo.push(temporal);
    setLayouts(arreglo);
    generateStepper();
}


function cargarCeja(serie){
    let temporal = '';
    let i = 0;
    serie.ceja.forEach((ceja) => {
        temporal += `<div class="col-3 borde text-center">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <input type="radio" name="cosa" id="cosa${i}" value="${ceja.nombre}" onChange='cargarCeja(${JSON.stringify(serie)});'>
        <label for="cosa${i}">${ceja.nombre}</label>
      </div>`;
      i++;    
    });
    arreglo.push(temporal);
    setLayouts(arreglo);
    generateStepper();
}




function agregarARuta(text, agregar) {
    if (agregar) {
        ruta += `/${text}`;
    } else {
        
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
