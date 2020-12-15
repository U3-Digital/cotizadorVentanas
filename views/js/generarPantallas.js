const arreglo = [`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,];
setSteps(["Serie", "Tipo", "Subtipo", "Dimensiones","Tipo vidrio","Subtipo vidrio","Ceja","Color"]);
setLayouts(arreglo);

generateStepper(0);

let ruta  = {
    serie: "",
    tipoVentana: "",
    subTipoVentana: "",
    dimensionAncho: "",
    dimensionAlto: "",
    tipoVidrio: "",
    subTipoVidrio: "",
    ceja: "",
    colorPrincipal: "",
    colorSecundario: "",
    numeroVentanas: 1
};
let cotizaciones = [];
let rutaVentana = Object.create(ruta);

const detailsContainerSerie = document.getElementById('details-container-serie');
const detailsContainerTipoVentana = document.getElementById('details-container-tipo-ventana');
const detailsContainerSubtipoVentana = document.getElementById('details-container-subtipo-ventana');
const detailsContainerDimensiones = document.getElementById('details-container-dimensiones');
const detailsContainerTipoVidrio  = document.getElementById('details-container-tipo-vidrio');
const detailsContainerSubtipoVidrio = document.getElementById('details-container-subtipo-vidrio');
const detailsContainerCejas = document.getElementById('details-container-ceja');
const detailsContainerColor = document.getElementById('details-container-color');
const detailContainerSubColor = document.getElementById('details-container-subcolor');
const containerAddNumeroVentana = document.getElementById('container-add-numero-ventanas');
const inputNumeroDeVentanas = document.getElementById('input-no-ventanas');



function requestListener() {
    let ventana = JSON.parse(this.responseText);
    cargarSeries(ventana);
}

function cargarSeries(ventana) {
    let temporal = '';
    let i = 0;
    temporal = '<div class="row">';
    ventana.tipos.forEach((serie) => {
        
        temporal += `<div class="col-3 text-center selectable">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${serie.nombre}" onChange='cargarTipo(${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
            <label class="form-check-label" for="cosa${i}">${serie.nombre}</label>
        </div>
      </div>`;
      i++;
    });
    temporal += '</div>';
    arreglo[0] = temporal;
    setLayouts(arreglo);
    generateStepper(0);
    //onClick="setActiveStep(2)"

}

function cargarTipo(serie,ventana){
    let temporal = '';
    agregarARuta(serie.nombre, "serie");
    let i = 0;
    temporal = '<div class="row">';
    serie.tipo.forEach((tipo) =>{
        temporal += `<div class="col-3 text-center selectable">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${tipo.nombre}" onChange='cargarSubtipo(${JSON.stringify(tipo)}, ${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
            <label class="form-check-label" for="cosa${i}">${tipo.nombre}</label>
        </div>
      </div>`;
      i++;
    });
    temporal += '</div>';  
    arreglo[1] = temporal;
    setLayouts(arreglo);
    generateStepper(1);
} 

function cargarSubtipo(tipo,serie,ventana){
    let temporal = '';
    agregarARuta(tipo.nombre, "tipoVentana");
    let i = 0;
    temporal = '<div class="row">';
    tipo.subtipo.forEach((subtipo) => {
        temporal += `<div class="col-3 text-center selectable">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${subtipo.nombre}" onChange='cargarDimension(${JSON.stringify(subtipo)}, ${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
            <label class="form-check-label" for="cosa${i}">${subtipo.nombre}</label>
        </div>
      </div>`;
      i++;
    });
    temporal += '</div>';
    arreglo[2] = temporal;
    setLayouts(arreglo);
    generateStepper(2);
}


function cargarDimension(subtipo, serie, ventana){
    agregarARuta(subtipo.nombre, "subtipoVentana");
    let i = 0;
    let tableString = '';
    
    tableString += 
    `
    <div class="row">
    <div class="col-12 text-center">
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Ancho</th>
                    <th>Alto</th>
                </tr>
            </thead>
            <tbody>`;
    subtipo.dimensiones.forEach((dimension) => {
        tableString += `<tr><td>${dimension.nombre}</td><td>${dimension.ancho}</tds><td>${dimension.alto}</td></tr>`;
    });

    tableString += `</tbody></table></div></div>`;
    
    tableString += `</br>
    <div class="row justify-content-center">
        <div class="col-sm-12 col-md-4 col-lg-3">
            <input class="form-control" type="text" id="text-field-alto" placeholder="Alto"/>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-3">
            <input class="form-control" type="text" id="text-field-ancho" placeholder="Ancho"/>
        </div>
        <br>
        <div class="col-sm-12 col-md-4 col-lg-3">
            <button onClick='verificarDimensiones(${JSON.stringify(serie)},${JSON.stringify(ventana)})' class="btn btn-block btn-primary" type="button" title="Next">Siguiente</button>
        </div>
    </div>`;
    
    arreglo[3] = tableString;
    setLayouts(arreglo);
    generateStepper(3);


}

function verificarDimensiones(serie,ventana){
    const textFieldAncho = document.getElementById('text-field-ancho');
    const textFieldAlto = document.getElementById('text-field-alto');

    const dimension = `${textFieldAlto.value}/-/${textFieldAncho.value}`
    agregarARuta(dimension,"dimension");

    cargarTipoVidrio(serie,ventana);
}

function cargarTipoVidrio(serie, ventana){
    let temporal = '';
    let i = 0;
    temporal = '<div class="row">';
    serie.tipoVidrio.forEach((tipoVidrio) => {
        temporal += `<div class="col-3 text-center selectable">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${tipoVidrio.nombre}" onChange='cargarSubtipoVidrio(${JSON.stringify(tipoVidrio)}, ${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
            <label class="form-check-label" for="cosa${i}">${tipoVidrio.nombre}</label>
        </div>
      </div>`;
      i++;
    });
    temporal += '</div>';
    arreglo[4] = temporal;
    setLayouts(arreglo);
    generateStepper(4);
}

function cargarSubtipoVidrio(tipoVidrio, serie, ventana){
    agregarARuta(tipoVidrio.nombre, "tipoVidrio")
    let temporal = '';
    let i = 0;
    temporal = '<div class="row">';
    tipoVidrio.tipos.forEach((subtipo) => {
        temporal += `<div class="col-3 text-center selectable">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${subtipo.nombre}" onChange='cargarCeja(${JSON.stringify(serie)}, ${JSON.stringify(subtipo)}, ${JSON.stringify(ventana)});'>
            <label class="form-check-label" for="cosa${i}">${subtipo.nombre}</label>
        </div>
      </div>`;
      i++;
    });
    temporal += '</div>';
    arreglo[5] = temporal;
    setLayouts(arreglo);
    generateStepper(5);
}


function cargarCeja(serie, subtipo, ventana){
    agregarARuta(subtipo.nombre, "subtipoVidrio");
    let temporal = '';
    let i = 0;
    temporal = '<div class="row">';
    serie.ceja.forEach((ceja) => {
        temporal += `<div class="col-3 text-center selectable">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${ceja.nombre}" onChange='cargarColores(${JSON.stringify(serie)}, ${JSON.stringify(ceja)}, ${JSON.stringify(ventana)});'>
            <label class="form-check-label" for="cosa${i}">${ceja.nombre}</label>
        </div>
      </div>`;
      i++;    
    });
    temporal += '</div>';
    arreglo[6] = temporal;
    setLayouts(arreglo);
    generateStepper(6);
}


function cargarColores(serie, ceja, ventana){
    agregarARuta(ceja.nombre, "ceja");
    let temporal = '';
    let temporal2 = '';
    let i = 0;

    temporal = '<div class="row justify-content-center">';
    ventana.colores.forEach((color)=>{
        temporal += `<div class="col-3 text-center selectable">
        <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${color.nombre}" onChange='agregarARuta("${color.nombre}", "colorPrincipal");'>
            <label class="form-check-label" for="cosa${i}">${color.nombre}</label>
        </div>
      </div>`;
    });
    temporal += '</div></br>';
    temporal += 
    `<div class="row">
        <div class="col-12 text-center">
            <input class="form-check-input" type="checkbox"  id="agregarColores" checked onChange='cargarSubcolores(${JSON.stringify(ventana.colores[0])});'>
            <label class="form-check-label" for="agregarColores">Pintar</label>
        </div>
    </div>`;
    i = 0;
    temporal += '<div class="row justify-content-center" id="container-colores">'; 
    ventana.colores[0].color.forEach((subcolor)=>{
        temporal += `<div class="col-2 text-center selectable">
            <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${subcolor}" onChange='agregarARuta("${subcolor}", "subcolor");'>
                <label class="form-check-label" for="cosa${i}">${subcolor}</label>
            </div>
        </div>`;
        i++;      
    });
    temporal += '</div>';

    arreglo[7] = temporal;
    setLayouts(arreglo);
    generateStepper(7)
}

function cargarSubcolores(color) {
    const containerColores = document.getElementById('container-colores');
    const checkbox = document.getElementById('agregarColores');

    if (checkbox.checked) {
        containerColores.hidden = false;
        detailContainerSubColor.hidden = false;
        detailContainerSubColor.innerHTML = `<td class="pl-3 pt-1 pb-1">Subcolor</td><td class="pl-3 pt-1 pb-1">Aún no se selecciona un subcolor</td>`;
    }else{
       detailContainerSubColor.hidden = true;  
       containerColores.hidden = true;
       agregarARuta("","eliminaSubcolor");
    }
}

function agregarCotizacion(){
    rutaVentana.numeroVentanas = inputNumeroDeVentanas.value
    cotizaciones.push(rutaVentana);
    rutaVentana = Object.create(ruta);

    containerAddNumeroVentana.hidden = true

    detailsContainerSerie.innerHTML = ``;
    detailsContainerTipoVentana.innerHTML = ``;
    detailsContainerSubtipoVentana.innerHTML = ``;
    detailsContainerDimensiones.innerHTML = ``;
    detailsContainerTipoVidrio.innerHTML = ``;
    detailsContainerSubtipoVidrio.innerHTML = ``;
    detailsContainerCejas.innerHTML = ``;
    detailsContainerColor.innerHTML = ``;
    detailContainerSubColor.innerHTML = ``;

    for (let i = 1; i < 8; i++) {
        arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
    }

    generateStepper(0);
    cargarTabla();

}

function agregarARuta(text, propiedad) {
    switch (propiedad) {
        case "serie":
            if (rutaVentana.serie) {
                delete rutaVentana.serie;
                delete rutaVentana.tipoVentana;
                delete rutaVentana.subtipoVentana;
                delete rutaVentana.dimensionAlto;
                delete rutaVentana.dimensionAncho;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.colorPrincipal;
                delete rutaVentana.colorSecundario;
                containerAddNumeroVentana.hidden = true

                detailsContainerSerie.innerHTML = ``;
                detailsContainerTipoVentana.innerHTML = ``;
                detailsContainerSubtipoVentana.innerHTML = ``;
                detailsContainerDimensiones.innerHTML = ``;
                detailsContainerTipoVidrio.innerHTML = ``;
                detailsContainerSubtipoVidrio.innerHTML = ``;
                detailsContainerCejas.innerHTML = ``;
                detailsContainerColor.innerHTML = ``;
                detailContainerSubColor.innerHTML = ``;

                for (let i = 1; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }
            rutaVentana.serie = text;
            detailsContainerSerie.innerHTML = `${text}`;
            break;
        case "tipoVentana":

            if (rutaVentana.tipoVentana) {
                delete rutaVentana.tipoVentana;
                delete rutaVentana.subtipoVentana;
                delete rutaVentana.dimensionAlto;
                delete rutaVentana.dimensionAncho;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.colorPrincipal;
                delete rutaVentana.colorSecundario;
                containerAddNumeroVentana.hidden = true

                detailsContainerTipoVentana.innerHTML = `Aún no se selecciona un tipo`;
                detailsContainerSubtipoVentana.innerHTML = `Aún no se selecciona un subtipo`;
                detailsContainerDimensiones.innerHTML = `Aún no se asignan dimensiones`;
                detailsContainerTipoVidrio.innerHTML = `Aún no se selecciona un tipo de vidrio`;
                detailsContainerSubtipoVidrio.innerHTML = `Aún no se selecciona un subtipo de vidrio`;
                detailsContainerCejas.innerHTML = `Aún no se selecciona una ceja`;
                detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
                detailContainerSubColor.innerHTML = ``;

                for (let i = 2; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.tipoVentana = text;
            detailsContainerTipoVentana.innerHTML = `${text}`;
            break;
        case "subtipoVentana":
            
            if (rutaVentana.subtipoVentana) {
                delete rutaVentana.subtipoVentana;
                delete rutaVentana.dimensionAlto;
                delete rutaVentana.dimensionAncho;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.colorPrincipal;
                delete rutaVentana.colorSecundario;
                containerAddNumeroVentana.hidden = true

                detailsContainerSubtipoVentana.innerHTML = `Aún no se selecciona un subtipo`;
                detailsContainerDimensiones.innerHTML = `Aún no se asignan dimensiones`;
                detailsContainerTipoVidrio.innerHTML = `Aún no se selecciona un tipo de vidrio`;
                detailsContainerSubtipoVidrio.innerHTML = `Aún no se selecciona un subtipo de vidrio`;
                detailsContainerCejas.innerHTML = `Aún no se selecciona una ceja`;
                detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
                detailContainerSubColor.innerHTML = ``;

                for (let i = 3; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.subtipoVentana = text;
            detailsContainerSubtipoVentana.innerHTML = `${text}`;
            break;
        case "dimension":

            if (rutaVentana.dimension) {
                delete rutaVentana.dimensionAlto;
                delete rutaVentana.dimensionAncho;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.colorPrincipal;
                delete rutaVentana.colorSecundario;
                containerAddNumeroVentana.hidden = true

                detailsContainerDimensiones.innerHTML = `Aún no se asignan dimensiones`;
                detailsContainerTipoVidrio.innerHTML = `Aún no se selecciona un tipo de vidrio`;
                detailsContainerSubtipoVidrio.innerHTML = `Aún no se selecciona un subtipo de vidrio`;
                detailsContainerCejas.innerHTML = `Aún no se selecciona una ceja`;
                detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
                detailContainerSubColor.innerHTML = ``;

                for (let i = 4; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            const dimensiones = text.split("/-/");

            rutaVentana.dimensionAncho = dimensiones[1];
            rutaVentana.dimensionAlto = dimensiones[0];
            detailsContainerDimensiones.innerHTML = `Ancho: ${dimensiones[1]} Alto: ${dimensiones[0]}`;
            break;
        case "tipoVidrio":

            if (rutaVentana.tipoVidrio) {
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.colorPrincipal;
                delete rutaVentana.colorSecundario;
                containerAddNumeroVentana.hidden = true

                detailsContainerTipoVidrio.innerHTML = `Aún no se selecciona un tipo de vidrio`;
                detailsContainerSubtipoVidrio.innerHTML = `Aún no se selecciona un subtipo de vidrio`;
                detailsContainerCejas.innerHTML = `Aún no se selecciona una ceja`;
                detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
                detailContainerSubColor.innerHTML = ``;

                for (let i = 5; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.tipoVidrio = text;
            detailsContainerTipoVidrio.innerHTML = `${text}`;
            break;
        case "subtipoVidrio":

            if (rutaVentana.subtipoVidrio) {
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.colorPrincipal;
                delete rutaVentana.colorSecundario;

                detailsContainerSubtipoVidrio.innerHTML = `Aún no se selecciona un subtipo de vidrio`;
                detailsContainerCejas.innerHTML = `Aún no se selecciona una ceja`;
                detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
                detailContainerSubColor.innerHTML = ``;
                containerAddNumeroVentana.hidden = true


                for (let i = 6; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.subtipoVidrio = text;
            detailsContainerSubtipoVidrio.innerHTML = `${text}`;
            break;
        case "ceja":

            if (rutaVentana.ceja) {
                delete rutaVentana.ceja;
                delete rutaVentana.colorPrincipal;
                delete rutaVentana.colorSecundario;
                containerAddNumeroVentana.hidden = true

                detailsContainerCejas.innerHTML = `Aún no se selecciona una ceja`;
                detailsContainerColor.innerHTML = `Aún no se selecciona un color`;
                detailContainerSubColor.innerHTML = ``;

                arreglo[7] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                
            }

            rutaVentana.ceja = text;
            detailsContainerCejas.innerHTML = `${text}`;

            break;
        case "colorPrincipal":

            if (rutaVentana.color) {
                delete rutaVentana.color;
            }

            rutaVentana.colorPrincipal = text;
            detailsContainerColor.innerHTML = `${text}`;
            containerAddNumeroVentana.hidden = false
            break;
        case "subcolor":
            rutaVentana.colorSubcolor = text;
            detailContainerSubColor.innerHTML = `<td>Subcolor</td><td>${text}</td>`;
            break;
        case "eliminaSubcolor":
            delete rutaVentana.colorSubcolor;
            break;
        default:
            break;
    }      
}



function cargarPantalla(objeto) {
    console.log(objeto);
}

const request = new XMLHttpRequest();
request.addEventListener("load", requestListener);
request.open("GET", "../js/ventana.json");
request.send();
