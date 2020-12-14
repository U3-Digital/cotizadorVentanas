const arreglo = [`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`,];
setSteps(["Serie", "Tipo", "Subtipo", "Dimensiones","Tipo vidrio","Subtipo vidrio","Ceja","Color"]);
setLayouts(arreglo);

generateStepper(0);

let ruta  = {
    serie: "",
    tipoVentana: "",
    subTipoVentana: "",
    dimension: {
        ancho: "",
        alto: ""
    },
    tipoVidrio: "",
    subTipoVidrio: "",
    ceja: "",
    color: {
        principal: "",
        subColor: ""
    }
};

const rutaVentana = Object.create(ruta);

const detailsContainerSerie = document.getElementById('details-container-serie');
const detailsContainerTipoVentana = document.getElementById('details-container-tipo-ventana');
const detailsContainerSubtipoVentana = document.getElementById('details-container-subtipo-ventana');
const detailsContainerDimensiones = document.getElementById('details-container-dimensiones');
const detailsContainerTipoVidrio  = document.getElementById('details-container-tipo-vidrio');
const detailsContainerSubtipoVidrio = document.getElementById('details-container-subtipo-vidrio');
const detailsContainerCejas = document.getElementById('details-container-ceja');
const detailsContainerColor = document.getElementById('details-container-color');


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
        tableString += `<tr><td>${dimension.nombre}</td><td>${dimension.ancho}</td><td>${dimension.alto}</td></tr>`;
        console.log(dimension);
    });

    tableString += `</tbody></table></div></div>`;
    
    tableString += `</br>
    <div class="row justify-content-center">
        <div class="col-sm-12 col-md-4 col-lg-3">
            <input class="form-control" type="text" placeholder="Alto"/>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-3">
            <input class="form-control" type="text" placeholder="Ancho"/>
        </div>
        <br>
        <div class="col-sm-12 col-md-4 col-lg-3">
            <button onClick='cargarTipoVidrio(${JSON.stringify(serie)},${JSON.stringify(ventana)})' class="btn btn-block btn-primary" type="button" title="Next">Siguiente</button>
        </div>
    </div>`;
    
    arreglo[3] = tableString;
    setLayouts(arreglo);
    generateStepper(3);


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
            <input class="form-check-input" type="checkbox"  id="agregarColores" onChange='cargarSubcolores(${JSON.stringify(ventana.colores[0])});'>
            <label class="form-check-label" for="agregarColores">Pintar</label>
        </div>
    </div>`;
    temporal += '<div class="row" id="container-colores"></div>'
    
    arreglo[7] = temporal;
    setLayouts(arreglo);
    generateStepper(7)
}

function cargarSubcolores(color) {
   const checkbox = document.getElementById('agregarColores');
   const containerColores = document.getElementById('container-colores');
   let temporal = '';
   let i = 0;
   if (checkbox.checked) {
        temporal = '<div class="row justify-content-center">';  
        color.color.forEach((subcolor)=>{
            temporal += `<div class="col-3 text-center selectable">
                <img src="https://via.placeholder.com/300" alt="placeholder" style="width: 100%">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="cosa" id="cosa${i}" value="${subcolor}" onChange='agregarARuta("${subcolor}", "subcolor");'>
                    <label class="form-check-label" for="cosa${i}">${subcolor}</label>
                </div>
            </div>`;
            i++;      
        });
        temporal += '</div>';
        containerColores.innerHTML += temporal;
   }
}



function agregarARuta(text, propiedad) {
    switch (propiedad) {
        case "serie":
            if (rutaVentana.serie) {
                delete rutaVentana.serie;
                delete rutaVentana.tipoVentana;
                delete rutaVentana.subtipoVentana;
                delete rutaVentana.dimension;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.color;
                

                detailsContainerSerie.innerHTML = `<p>Serie: <span>Aún no se selecciona una Serie</span></p>`;
                detailsContainerTipoVentana.innerHTML = `<p>Tipo ventana: <span>Aún no se selecciona un tipo</span></p>`;
                detailsContainerSubtipoVentana.innerHTML = `<p>Subtipo ventana: <span>Aún no se selecciona un subtipo</span></p>`;
                detailsContainerDimensiones.innerHTML = `<p>Dimensiones: <span>Aún no se asignan dimensiones</span></p>`;
                detailsContainerTipoVidrio.innerHTML = `<p>Tipo Vidirio: <span>Aún no se selecciona un tipo de vidrio</span></p>`;
                detailsContainerSubtipoVidrio.innerHTML = `<p>Subtipo: <span>Aún no se selecciona un subtipo de vidrio</span></p>`;
                detailsContainerCejas.innerHTML = `<p>Ceja: <span>Aún no se selecciona una ceja</span></p>`;
                detailsContainerColor.innerHTML = `<p>Color: <span>Aún no se selecciona un color</span></p>`;

                for (let i = 1; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }
            rutaVentana.serie = text;
            detailsContainerSerie.innerHTML = `<p>Serie: <span>${text}</span></p>`;
            break;
        case "tipoVentana":

            if (rutaVentana.tipoVentana) {
                delete rutaVentana.tipoVentana;
                delete rutaVentana.subtipoVentana;
                delete rutaVentana.dimension;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.color;

                detailsContainerTipoVentana.innerHTML = `<p>Tipo ventana: <span>Aún no se selecciona un tipo</span></p>`;
                detailsContainerSubtipoVentana.innerHTML = `<p>Subtipo ventana: <span>Aún no se selecciona un subtipo</span></p>`;
                detailsContainerDimensiones.innerHTML = `<p>Dimensiones: <span>Aún no se asignan dimensiones</span></p>`;
                detailsContainerTipoVidrio.innerHTML = `<p>Tipo Vidirio: <span>Aún no se selecciona un tipo de vidrio</span></p>`;
                detailsContainerSubtipoVidrio.innerHTML = `<p>Subtipo: <span>Aún no se selecciona un subtipo de vidrio</span></p>`;
                detailsContainerCejas.innerHTML = `<p>Ceja: <span>Aún no se selecciona una ceja</span></p>`;
                detailsContainerColor.innerHTML = `<p>Color: <span>Aún no se selecciona un color</span></p>`;

                for (let i = 2; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.tipoVentana = text;
            detailsContainerTipoVentana.innerHTML = `<p>Tipo ventana: <span>${text}</span></p>`;
            break;
        case "subtipoVentana":
            
            if (rutaVentana.subtipoVentana) {
                delete rutaVentana.subtipoVentana;
                delete rutaVentana.dimension;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.color;

                detailsContainerSubtipoVentana.innerHTML = `<p>Subtipo ventana: <span>Aún no se selecciona un subtipo</span></p>`;
                detailsContainerDimensiones.innerHTML = `<p>Dimensiones: <span>Aún no se asignan dimensiones</span></p>`;
                detailsContainerTipoVidrio.innerHTML = `<p>Tipo Vidirio: <span>Aún no se selecciona un tipo de vidrio</span></p>`;
                detailsContainerSubtipoVidrio.innerHTML = `<p>Subtipo: <span>Aún no se selecciona un subtipo de vidrio</span></p>`;
                detailsContainerCejas.innerHTML = `<p>Ceja: <span>Aún no se selecciona una ceja</span></p>`;
                detailsContainerColor.innerHTML = `<p>Color: <span>Aún no se selecciona un color</span></p>`;

                for (let i = 3; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.subtipoVentana = text;
            detailsContainerSubtipoVentana.innerHTML = `<p>Subtipo ventana: <span>${text}</span></p>`
            break;
        case "dimension":

            if (rutaVentana.dimension) {
                delete rutaVentana.dimension;
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.color;

                detailsContainerDimensiones.innerHTML = `<p>Dimensiones: <span>Aún no se asignan dimensiones</span></p>`;
                detailsContainerTipoVidrio.innerHTML = `<p>Tipo Vidirio: <span>Aún no se selecciona un tipo de vidrio</span></p>`;
                detailsContainerSubtipoVidrio.innerHTML = `<p>Subtipo: <span>Aún no se selecciona un subtipo de vidrio</span></p>`;
                detailsContainerCejas.innerHTML = `<p>Ceja: <span>Aún no se selecciona una ceja</span></p>`;
                detailsContainerColor.innerHTML = `<p>Color: <span>Aún no se selecciona un color</span></p>`;

                for (let i = 4; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.dimension.ancho = "10";
            rutaVentana.dimension.alto = "45";
            detailsContainerDimensiones.innerHTML = `<p>Ancho: <span>${text}</span> Alto: <span>${text}</span></p>`;
            break;
        case "tipoVidrio":

            if (rutaVentana.tipoVidrio) {
                delete rutaVentana.tipoVidrio;
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.color;

                detailsContainerTipoVidrio.innerHTML = `<p>Tipo Vidirio: <span>Aún no se selecciona un tipo de vidrio</span></p>`;
                detailsContainerSubtipoVidrio.innerHTML = `<p>Subtipo: <span>Aún no se selecciona un subtipo de vidrio</span></p>`;
                detailsContainerCejas.innerHTML = `<p>Ceja: <span>Aún no se selecciona una ceja</span></p>`;
                detailsContainerColor.innerHTML = `<p>Color: <span>Aún no se selecciona un color</span></p>`;

                for (let i = 5; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.tipoVidrio = text;
            detailsContainerTipoVidrio.innerHTML = `<p>Tipo Vidirio: <span>${text}</span></p>`;
            break;
        case "subtipoVidrio":

            if (rutaVentana.subtipoVidrio) {
                delete rutaVentana.subtipoVdrio;
                delete rutaVentana.ceja;
                delete rutaVentana.color;

                detailsContainerSubtipoVidrio.innerHTML = `<p>Subtipo: <span>Aún no se selecciona un subtipo de vidrio</span></p>`;
                detailsContainerCejas.innerHTML = `<p>Ceja: <span>Aún no se selecciona una ceja</span></p>`;
                detailsContainerColor.innerHTML = `<p>Color: <span>Aún no se selecciona un color</span></p>`;

                for (let i = 6; i < 8; i++) {
                    arreglo[i] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                }
            }

            rutaVentana.subtipoVidrio = text;
            detailsContainerSubtipoVidrio.innerHTML = `<p>Subtipo: <span>${text}</span></p>`
            break;
        case "ceja":

            if (rutaVentana.ceja) {
                delete rutaVentana.ceja;
                delete rutaVentana.color;

                detailsContainerCejas.innerHTML = `<p>Ceja: <span>Aún no se selecciona una ceja</span></p>`;
                detailsContainerColor.innerHTML = `<p>Color: <span>Aún no se selecciona un color</span></p>`;

                arreglo[7] = `<p>Para mostarar este paso es necesario que completes lo pasos anteriores</p>`;
                
            }

            rutaVentana.ceja = text;
            detailsContainerCejas.innerHTML = `<p>Ceja: <span>${text}</span></p>`
            break;
        case "colorPrincipal":

            if (rutaVentana.color) {
                delete rutaVentana.color;
            }

            rutaVentana.color.principal = text;
            break;
        case "subcolor":
            rutaVentana.color.subcolor = text;
            break;
        default:
            break;
    }      

    console.log(rutaVentana);
}

function cargarPantalla(objeto) {
    console.log(objeto);
}

const request = new XMLHttpRequest();
request.addEventListener("load", requestListener);
request.open("GET", "../js/ventana.json");
request.send();
