const arreglo = [`<div class="d-flex text-center justify-content-center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,];
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
let total = 0;
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
const etiquetaTotal = document.getElementById('total');
const cajaNombreCliente = document.getElementById('cajaNombreCliente');

let serieBasica = {};
let seriePremium = {};
let seriePlus = {};
let seriePD10 = {}


function requestListener() {
    let ventana = JSON.parse(this.responseText);
    cargarSeries(ventana);
}

function requestListenerSeries(){
    let series = JSON.parse(this.responseText);
    cargarSeries(series);
}

function requestListenerBasica(){
    serieBasica = JSON.parse(this.responseText);
}

function requestListenerPremium(){
    seriePremium = JSON.parse(this.responseText);
}

function requestListenerPlus(){
    seriePlus = JSON.parse(this.responseText);
}

function requestListenerPD10(){
    seriePD10 = JSON.parse(this.responseText)
}

function cargarSeries(ventana) {
    let temporal = '';
    let i = 0;

    temporal = '<div class="row justify-content-center">';
    ventana.tipos.forEach((serie) => {        
        temporal += `<div class="col-md-2 col-lg-2 col-10 text-center selectable">
        <img src="${serie.img}" alt="placeholder">
        <div class="form-check">
            <input class="form-check-input" type="radio" value="${serie.nombre}" onChange='cargarTipo(${JSON.stringify(determinarTipo(serie.nombre))});'>
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

function determinarTipo(nombreTipo) {
  let serie;
  switch(nombreTipo) {
    case 'Básica':
      serie = serieBasica;
      break;
    case 'Plus':
      serie = seriePlus;
      break;
    case 'Premium':
      serie = seriePremium;
      break;
    case 'PD10':
      serie = seriePD10;
      break;
    default:
      break;
  }

  return serie;
}

function cargarTipo(serie){
    let temporal = '';
    agregarARuta(serie.nombre, "serie");
    let i = 0;
    temporal = '<div class="row justify-content-center">';
    serie.tipo.forEach((tipo) => {
        temporal += `<div class="col-md-2 col-lg-2 col-10 text-center selectable">
        <img src="${tipo.img}" alt="placeholder">
        <div class="form-check">
            <input class="form-check-input" type="radio" value="${tipo.nombre}" onChange='cargarSubtipo(${JSON.stringify(tipo)}, ${JSON.stringify(serie)}, ${JSON.stringify(serie)});'>
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
    temporal = '<div class="row justify-content-center">';
    tipo.subtipo.forEach((subtipo) => {
        temporal += `<div class="col-md-2 col-lg-2 col-10 text-center selectable">
        <img src="${subtipo.img}" alt="placeholder">
        <div class="form-check">
            <input class="form-check-input" type="radio" value="${subtipo.nombre}" onChange='cargarDimension(${JSON.stringify(subtipo)}, ${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
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
    let maximoAlto = 0;
    let minimoAlto = 0;
    let maximoAncho = 0;
    let minimoAncho = 0;


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
        if(dimension.nombre == "Máximo"){
            if (dimension.ancho > maximoAncho){
                maximoAncho = dimension.ancho;
            }
            if(dimension.alto > maximoAlto){
                maximoAlto = dimension.alto;
            }
        }else{
            if(dimension.alto < minimoAlto || minimoAlto == 0){
                minimoAlto = dimension.alto;
            }
            if(dimension.ancho < minimoAncho || minimoAncho == 0){
                minimoAncho = dimension.ancho;
            }
        }
    });

    tableString += `</tbody></table></div></div>`;
    
    tableString += `</br>
    <div class="row justify-content-center">
        <div class="col-sm-12 col-md-4 col-lg-3">
            <input class="form-control" type="text" id="text-field-ancho" placeholder="Ancho"/>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-3">
            <input class="form-control" type="text" id="text-field-alto" placeholder="Alto"/>
        </div>
        <br>
        <div class="col-sm-12 col-md-4 col-lg-3">
            <button onClick='verificarDimensiones(${JSON.stringify(serie)}, ${JSON.stringify(ventana)}, ${maximoAlto}, ${maximoAncho}, ${minimoAlto}, ${minimoAncho})' class="btn btn-block btn-primary" type="button" title="Next">Siguiente</button>
        </div>
    </div>`;
    
    arreglo[3] = tableString;
    setLayouts(arreglo);
    generateStepper(3);

}

function verificarDimensiones(serie,ventana,maxalto,maxancho,minalto,minancho){
    const textFieldAncho = document.getElementById('text-field-ancho');
    const textFieldAlto = document.getElementById('text-field-alto');

    if (textFieldAlto.value == "" || textFieldAncho.value == "") {
        alert("favor de rellenar las casillas");
    } else {
        if (textFieldAncho.value > maxancho || textFieldAncho.value < minancho || textFieldAlto.value > maxalto || textFieldAlto.value < minalto) {
            alert("favor de colocar dimensiones validas");
        } else {
            const dimension = `${textFieldAlto.value}/-/${textFieldAncho.value}`
            agregarARuta(dimension,"dimension");
            cargarTipoVidrio(serie,ventana);
        }
    }    
}

function cargarTipoVidrio(serie, ventana){
    let temporal = '';
    let i = 0;
    temporal = '<div class="row justify-content-center">';
    serie.tipoVidrio.forEach((tipoVidrio) => {
        temporal += `<div class="col-md-2 col-lg-2 col-10 text-center selectable">
        <img src="${tipoVidrio.img}" alt="placeholder">
        <div class="form-check">
            <input class="form-check-input" type="radio" value="${tipoVidrio.nombre}" onChange='cargarSubtipoVidrio(${JSON.stringify(tipoVidrio)}, ${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
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
    temporal = '<div class="row justify-content-center">';
    tipoVidrio.tipos.forEach((subtipo) => {
        temporal += `<div class="col-md-2 col-lg-2 col-10 text-center selectable">
        <img src="${subtipo.img}" alt="placeholder">
        <div class="form-check">
            <input class="form-check-input" type="radio" value="${subtipo.nombre}" onChange='cargarCeja(${JSON.stringify(serie)}, ${JSON.stringify(subtipo)}, ${JSON.stringify(ventana)});'>
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
    console.log(subtipo);
    agregarARuta(subtipo.nombre, "subtipoVidrio");
    calcularTotal();
    let temporal = '';
    let i = 0;
    temporal = '<div class="row justify-content-center">';
    serie.ceja.forEach((ceja) => {
        temporal += `<div class="col-md-2 col-lg-2 col-10 text-center selectable">
        <img src="${ceja.img}" alt="placeholder">
        <div class="form-check">
            <input class="form-check-input" type="radio" value="${ceja.nombre}" onChange='cargarColores(${JSON.stringify(serie)}, ${JSON.stringify(ceja)}, ${JSON.stringify(ventana)});'>
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
    window.addEventListener('resize', () => {
      console.log('jaa');
    });
    
    temporal = '<div class="row justify-content-center">';
    ventana.colores.forEach((color) => {
        temporal += `<div class="col-md-2 col-lg-2 col-10 text-center selectable">
        <img src="${color.img}" alt="placeholder">
        <div class="form-check">
            <input class="form-check-input" type="radio" value="${color.nombre}" onChange='agregarARuta("${color.nombre}", "colorPrincipal");'>
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
    </div><br>`;
    i = 0;
    temporal += '<form><div class="row justify-content-center" id="container-colores">'; 
    ventana.colores[0].color.forEach((subcolor) => {
        temporal += `<div class="col-md-2 col-lg-2 col-3 text-center subcolor">
            <img src="../../img/${subcolor.nombre}.png" alt="placeholder"  style="width: 100%;">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="subcolor" value="${subcolor.nombre}" onChange='agregarARuta("${subcolor.nombre}", "subcolor");'>
                <label class="form-check-label" for="cosa${i}">${subcolor.nombre}</label>
            </div>
        </div>`;
        i++;      
    });
    temporal += '</div></form>';

    arreglo[7] = temporal;
    setLayouts(arreglo);
    generateStepper(7);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);

}

function cargarSubcolores(color) {
  // console.log(w);
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

// setTimeout(() => {
//   calcularTotal();
// }, 1000);


function determinarPrecioVidrio(serie, tipoVidrio, ventana) {
  console.log(serie, tipoVidrio, ventana);
  return 25.33875;
}


function calcularTotal() {

  const rutaPrueba = {
    ceja: 'Sin ceja',
    colorPrincipal: 'Blanco',
    colorSubcolor: 'Rojo Caliente',
    dimensionAlto: '48',
    dimensionAncho: '48',
    serie: 'Básica',
    subtipoVentana: 'Fija',
    subtipoVidrio: 'Claro',
    tipoVentana: 'Fijo Serie 40',
    tipoVidrio: 'Vidrio sencillo',
    ladoColor: 'Interior'
  };

  let precioPulgada = 0;
  let dimensionAlto = 0;
  let dimensionAncho = 0;
  total = 0;
  
  switch (rutaVentana.serie) {
    case 'Básica':
      precioPulgada = encontrarPrecio(serieBasica, rutaVentana);
      dimensionAlto = Number.parseInt(rutaVentana.dimensionAlto);
      dimensionAncho = Number.parseInt(rutaVentana.dimensionAncho);

      total = precioPulgada * (dimensionAlto + dimensionAncho);
      console.log(total);

      if (rutaVentana.colorPrincipal && rutaVentana.colorSubcolor) {
        serieBasica.colores.forEach((color) => {
          if (color.nombre === rutaVentana.colorPrincipal) {
            color.color.forEach((subcolor) => {
              if (subcolor.nombre === rutaVentana.colorSubcolor) {
                if (rutaVentana.ladoColor === 'Interior') {
                  total += subcolor.precioInterior;
                } else {
                  total += subcolor.precioExterior;
                }
              }
            })
          }
        });
      }
      console.log(total);

      etiquetaTotal.innerHTML = `$${total.toFixed(2)}`;

      break;
    case 'Plus': 
      precioPulgada = encontrarPrecio(seriePlus, rutaVentana);
      dimensionAlto = Number.parseInt(rutaVentana.dimensionAlto);
      dimensionAncho = Number.parseInt(rutaVentana.dimensionAncho);

      total = precioPulgada * (dimensionAlto + dimensionAncho);
      console.log(total);

      if (rutaVentana.colorPrincipal && rutaVentana.colorSubcolor) {
        seriePlus.colores.forEach((color) => {
          if (color.nombre === rutaVentana.colorPrincipal) {
            color.color.forEach((subcolor) => {
              if (subcolor.nombre === rutaVentana.colorSubcolor) {
                if (rutaVentana.ladoColor === 'Interior') {
                  total += subcolor.precioInterior;
                } else {
                  total += subcolor.precioExterior;
                }
              }
            });
          }
        });
      }

      console.log(total);
      etiquetaTotal.innerHTML = `$${total.toFixed(2)}`;

      break;
    case 'Premium':
      precioPulgada = encontrarPrecio(seriePremium, rutaVentana);
      dimensionAlto = Number.parseInt(rutaVentana.dimensionAlto);
      dimensionAncho = Number.parseInt(rutaVentana.dimensionAncho);

      total = precioPulgada * (dimensionAlto + dimensionAncho);

      console.log(total);

      if (rutaVentana.colorPrincipal && rutaVentana.colorSubcolor) {
        seriePremium.colores.forEach((color) => {
          if (color.nombre === rutaVentana.colorPrincipal) {
            color.color.forEach((subcolor) => {
              if (subcolor.nombre === rutaVentana.colorSubcolor) {
                if (rutaVentana.ladoColor === 'Interior') {
                  total += subcolor.precioInterior;
                } else {
                  total += subcolor.precioExterior;
                }
              }
            });
          }
        });
      }

      console.log(total);
      etiquetaTotal.innerHTML = `$${total.toFixed(2)}`;

      break;
    default:
      console.log('nada');
      break;
  }
}

function encontrarPrecio(serie, ruta) {
  let precioPulgada = 0;
  serie.tipoVidrio.forEach((tipoVidrio) => {
    // console.log(tipoVidrio);
    if (tipoVidrio.nombre === ruta.tipoVidrio) {
      tipoVidrio.tipos.forEach((tipo) => {
        
        if (tipo.nombre === ruta.subtipoVidrio) {
          tipo.precio.forEach((precio) => {
            
            if (precio.tipo === formatearString(ruta.tipoVentana)) {
              precio.tipos.forEach((subtipo) => {
                
                if (Object.keys(subtipo)[0] === formatearString(ruta.subtipoVentana)) {
                  precioPulgada = subtipo[formatearString(ruta.subtipoVentana)];                  
                }
              });
            }
          });
        }
      });
    }
  });
  
  return precioPulgada;
}

function formatearString(tipoVentana) {
  tipoVentana = tipoVentana.toLowerCase();
  tipoVentana = tipoVentana.replaceAll(' ', '');
  return tipoVentana;
}

function insertarCotizacion() {

  const formData = new FormData();
  formData.set('cliente', cajaNombreCliente.value);
  formData.set('ventana', JSON.stringify(rutaVentana));

  $.ajax({
    url: '../../controllers/agregarCotizacion.php',
    type: 'POST',
    data: formData,
    success: (data) => {
      if (data == 'success') {
        Swal.fire({
          title: 'Cotización agregada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd'
        });
      } else {
        Swal.fire({
          title: 'Error al agregar la cotización',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd'
        });
      }
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log('Completado');
    },
    cache: false,
    contentType: false,
    processData: false
  });
}

function agregarCotizacion() {
    console.log(rutaVentana);
    nombrePersona = document.getElementById("cajaNombreCliente").value;

    console.log(nombrePersona);
    if(nombrePersona == ""){
      Swal.fire({
        title: 'Favor de colocar el nombre del cliente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }
  

    rutaVentana.numeroVentanas = inputNumeroDeVentanas.value
    rutaVentana.precio = total;
    rutaVentana.total = rutaVentana.numeroVentanas * total;
    rutaVentana.total = Number.parseFloat(rutaVentana.total.toFixed(2));

    insertarCotizacion();
    
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

    for (let i = 1  ; i < 8; i++) {
        arreglo[i] = `<p>Para mostrar este paso es necesario que completes los pasos anteriores</p>`;
    }
    inputNumeroDeVentanas.value = "1";

    setLayouts(arreglo);
    generateStepper(0);
    cargarTabla();
    etiquetaTotal.innerText = '$0';
    total = 0;
    cajaNombreCliente.value = '';
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
                    arreglo[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
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
                    arreglo[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
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
                    arreglo[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
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
                    arreglo[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
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
                    arreglo[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
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
                    arreglo[i] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
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

                arreglo[7] = `<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`;
                
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
            calcularTotal();

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

/*const request = new XMLHttpRequest();
request.addEventListener("load", requestListener);
request.open("GET", "../js/ventana.json");
request.send();*/



const requestBasica = new XMLHttpRequest();
requestBasica.addEventListener("load",requestListenerBasica);
requestBasica.open("GET","../js/basica.json");
requestBasica.send();

const requestPlus = new XMLHttpRequest();
requestPlus.addEventListener("load",requestListenerPlus);
requestPlus.open("GET","../js/plus.json");
requestPlus.send();

const requestPremium = new XMLHttpRequest();
requestPremium.addEventListener("load",requestListenerPremium);
requestPremium.open("GET","../js/premium.json");
requestPremium.send();

const requestPD10 = new XMLHttpRequest();
requestPD10.addEventListener("load",requestListenerPD10);
requestPD10.open("GET","../js/pd10.json");
requestPD10.send();

setTimeout(() => {

  const requestSeries = new XMLHttpRequest();
  requestSeries.addEventListener("load",requestListenerSeries);
  requestSeries.open("GET","../js/series.json");
  requestSeries.send();
    
}, 1000);