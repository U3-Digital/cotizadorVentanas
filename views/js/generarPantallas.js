const arreglo = [`<div class="d-flex text-center justify-content-center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,`<p>Para mostrar este paso es necesario que completes lo pasos anteriores</p>`,];
setSteps(["Serie", "Tipo", "Subtipo", "Dimensiones","Tipo vidrio","Subtipo vidrio","Ceja","Color"]);
setLayouts(arreglo);

generateStepper(0);
let pintura = {
  colorSubcolor: "",
  precio: 0,
  total: 0,
  numeroVentanas: 0,
  precioInterior: 0,
  precioExterior: 0
};
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
let rutaPintura = Object.create(pintura);
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

let serieBasica = {};
let seriePremium = {};
let seriePlus = {};
let seriePD10 = {}


/* function requestListener() {
    let ventana = JSON.parse(this.responseText);
    cargarSeries(ventana);
}
 */
function requestListenerSeries() {
    let series = JSON.parse(this.responseText);
    cargarSeries(series);
}

function requestListenerBasica() {
    const t0 = performance.now();
    serieBasica = JSON.parse(this.responseText);
    const t1 = performance.now();
    //console.log(t1 - t0);
}

function requestListenerPremium() {
    const t0 = performance.now();
    seriePremium = JSON.parse(this.responseText);
    const t1 = performance.now();
    //console.log(t1 - t0);
}

function requestListenerPlus() {
  const t0 = performance.now();
  seriePlus = JSON.parse(this.responseText);
  const t1 = performance.now();
  //console.log(t1 - t0);
}

function requestListenerPD10() {
  const t0 = performance.now();
  seriePD10 = JSON.parse(this.responseText);
  const t1 = performance.now();
  //console.log(t1 - t0);
}

function cargarSeries(ventana) {
    let temporal = '';
    let i = 0;

    temporal = '<div class="row justify-content-center">';
    ventana.tipos.forEach((serie) => {        
        temporal += `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarTipo(${JSON.stringify(determinarTipo(serie.nombre))});'>
        <img src="${serie.img}" alt="placeholder">
        <div class="my-2">
            <label class="form-check-label">${serie.nombre}</label>
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
        temporal += `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarSubtipo(${JSON.stringify(tipo)}, ${JSON.stringify(serie)}, ${JSON.stringify(serie)});'>
        <img src="${tipo.img}" alt="placeholder">
        <div class="my-2">
            <label class="form-check-label">${tipo.nombre}</label>
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
        temporal += `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarDimension(${JSON.stringify(subtipo)}, ${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
        <img src="${subtipo.img}" alt="placeholder">
        <div class="my-2">
            <label class="form-check-label">${subtipo.nombre}</label>
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

    tableString += `
      <div class="row">
        <div class="col text-center">
          <table class="table">
            <thead>
              <tr>
                <th></th>`;
    for (let i = subtipo.dimensiones.length - 1; i >= 0; i--) {
      tableString += `<th>${subtipo.dimensiones[i].nombre}<th>`;
    }

    const anchos = [];
    const altos = [];

    subtipo.dimensiones.forEach((dimension) => {
      anchos.push(dimension.ancho);
      altos.push(dimension.alto);
    });

    anchos.sort((a, b) => a - b);
    altos.sort((a, b) => a - b);

    maximoAlto = altos[altos.length - 1];
    minimoAlto = altos[0];

    maximoAncho = anchos[anchos.length - 1];
    minimoAncho = anchos[0]; 
          
    tableString += `
              </tr>
            </thead>
            <tbody>
              `;
    tableString += `<tr><td>Ancho</td>
    `;
    anchos.forEach((ancho) => {
      tableString += `<td>${ancho}<td>`;
    });
    tableString += `</tr>`;

    tableString += `<tr><td>Alto</td>
    `;
    altos.forEach((alto) => {
      tableString += `<td>${alto}<td>`;
    });
    tableString += `</tr>`;
    
            
    tableString += `
            </tbody>
          </table>
        </div>
      </div>
    `;
    
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

function tieneExtras(serie, ventana) {
  let extras;
  switch (serie) {
    case 'Básica': {
      let encontrado = false;
      for (let i = 0; i < serieBasica.tipo.length; i++) {
        const tipo = serieBasica.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    case 'Plus': {
      let encontrado = false;
      for (let i = 0; i < seriePlus.tipo.length; i++) {
        const tipo = seriePlus.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    case 'Premium': {
      let encontrado = false;
      for (let i = 0; i < seriePremium.tipo.length; i++) {
        const tipo = seriePremium.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    case 'PD10': {
      let encontrado = false;
      for (let i = 0; i < seriePD10.tipo.length; i++) {
        const tipo = seriePD10.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    default:
      break;
  }
  return extras; 
}

function tieneExtras2(serie, ventana) {
  let extras;
  switch (serie) {
    case 'Básica': {
      let encontrado = false;
      for (let i = 0; i < serieBasica.tipo.length; i++) {
        const tipo = serieBasica.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo2) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    case 'Plus': {
      let encontrado = false;
      for (let i = 0; i < seriePlus.tipo.length; i++) {
        const tipo = seriePlus.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo2) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    case 'Premium': {
      let encontrado = false;
      for (let i = 0; i < seriePremium.tipo.length; i++) {
        const tipo = seriePremium.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo2) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    case 'PD10': {
      let encontrado = false;
      for (let i = 0; i < seriePD10.tipo.length; i++) {
        const tipo = seriePD10.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            if (subtipo.extra.titulo2) {
              extras = subtipo.extra;
            }
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }
    }
      break;
    default:
      break;
  }
  return extras; 
}

function miniAnalizadorLexico(formula) {
  let stringFinal = formula;

  const regexAlto = /\bAl\b/gmi;
  const regexAncho = /\bAn\b/gmi;

  stringFinal = stringFinal.replaceAll(regexAncho, 'Number.parseInt(rutaVentana.dimensionAncho)');
  stringFinal = stringFinal.replaceAll(regexAlto, 'Number.parseInt(rutaVentana.dimensionAlto)');

  stringFinal = `const calculo = ${stringFinal}; return calculo`;

  return new Function(stringFinal)();
}

async function verificarDimensiones(serie, ventana, maxalto, maxancho, minalto, minancho) {

    const textFieldAncho = document.getElementById('text-field-ancho');
    const textFieldAlto = document.getElementById('text-field-alto');
  
    if (textFieldAlto.value == "" || textFieldAncho.value == "") {
        alert("Favor de rellenar las casillas");
    } else {
      if (textFieldAncho.value > maxancho || textFieldAncho.value < minancho || textFieldAlto.value > maxalto || textFieldAlto.value < minalto) {
        alert("Favor de colocar dimensiones válidas");
      } else {
        const dimension = `${textFieldAlto.value}/-/${textFieldAncho.value}`;

        agregarARuta(dimension,"dimension");

        const extras = tieneExtras(serie.nombre, rutaVentana.subtipoVentana);
        const extras2 = tieneExtras2(serie.nombre, rutaVentana.subtipoVentana);
/* html: `
              <span style="display: inline-block">Mínimo: ${extras.minimo}</span>
              <span style="display: inline-block">Máximo: ${miniAnalizadorLexico(extras.formulaMaximo)}</span>
            `, */
        if (extras) {
          const { value: dimension } = await Swal.fire({
            title: extras.titulo,
            icon: 'info',
            inputLabel: `Mínimo: ${extras.minimo} | Máximo: ${miniAnalizadorLexico(extras.formulaMaximo)}`,
            input: 'number',
            inputAttributes: {
              min: Number.parseFloat(extras.minimo),
              max: Number.parseFloat(miniAnalizadorLexico(extras.formulaMaximo))
            },
            inputValidator: (value) => {
              value = Number.parseFloat(value);
              if (!value) {
                return 'Inserte una dimensión válida';
              }

              if (value < Number.parseFloat(extras.minimo)) {
                return 'Inserte una dimensión válida';
              }

              if (value > Number.parseFloat(miniAnalizadorLexico(extras.formulaMaximo))) {
                return 'Inserte una dimensión válida';
              }
            },
            validationMessage: 'Inserte una dimensión válida',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#007BFF',
            reverseButtons: true,
            allowOutsideClick: false
          });
          
          if (extras.titulo.toLowerCase().includes('alto')) {
            rutaVentana.dimensionAlto2 = dimension;
          } else if (extras.titulo.toLowerCase().includes('ancho')) {
            rutaVentana.dimensionAncho2 = dimension;
          }
          if (extras2) {
            const { value: dimension2 } = await Swal.fire({
              title: extras2.titulo2,
              icon: 'info',
              inputLabel: `Mínimo: ${extras2.minimo2} | Máximo: ${miniAnalizadorLexico(extras2.formulaMaximo2)}`,
              input: 'number',
              inputAttributes: {
                min: Number.parseFloat(extras2.minimo2),
                max: Number.parseFloat(miniAnalizadorLexico(extras2.formulaMaximo2))
              },
              inputValidator: (value) => {
                value = Number.parseFloat(value);
                if (!value) {
                  return 'Inserte una dimension válida';
                }

                if (value < Number.parseFloat(extras2.minimo2)) {
                  return 'Inserte una dimension válida';
                }

                if (value > Number.parseFloat(miniAnalizadorLexico(extras2.formulaMaximo2))) {
                  return 'Inserte una dimension válida';
                }
              },
              validationMessage: 'Inserte una dimension válida',
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007BFF',
              reverseButtons: true,
              allowOutsideClick: false
            });

            if (extras2.titulo2.toLowerCase().includes('alto')) {
              rutaVentana.dimensionAlto3 = dimension2;
            } else if (extras2.titulo2.toLowerCase().includes('ancho')) {
              rutaVentana.dimensionAncho3 = dimension2;
            }

            cargarTipoVidrio(serie, ventana);
          } else {
            cargarTipoVidrio(serie, ventana);
          }

        } else {
          cargarTipoVidrio(serie,ventana);
        }
      }
    } 
  // }

     
}

function cargarTipoVidrio(serie, ventana) {
    let temporal = '';
    let i = 0;
    temporal = '<div class="row justify-content-center">';
    serie.tipoVidrio.forEach((tipoVidrio) => {
        temporal += `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarSubtipoVidrio(${JSON.stringify(tipoVidrio)}, ${JSON.stringify(serie)}, ${JSON.stringify(ventana)});'>
        <img src="${tipoVidrio.img}" alt="placeholder">
        <div class="my-2">
            <label class="form-check-label">${tipoVidrio.nombre}</label>
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
        temporal += `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarCeja(${JSON.stringify(serie)}, ${JSON.stringify(subtipo)}, ${JSON.stringify(ventana)});'>
        <img src="${subtipo.img}" alt="placeholder">
        <div class="my-2">
            <label class="form-check-label">${subtipo.nombre}</label>
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
    // obtenerFormulaVentana(rutaVentana);
    // analizadorLexico(obtenerFormulaVentana());
    calcularPrecio();
    let total = parseFloat(rutaVentana.total);
    if(isNaN(total)){
      Swal.fire({
        title: "Ocurrió un error al calcular el valor de la ventana",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd'
      })
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
      document.getElementById('total').innerHTML = "$0";
      setLayouts(arreglo);
      generateStepper(0);
    }else{
      let temporal = '';
      let i = 0;
      temporal = '<div class="row justify-content-center">';
      serie.ceja.forEach((ceja) => {
          temporal += `<div class="col-md-3 col-lg-3 col-6 text-center selectable" onclick='cargarColores(${JSON.stringify(serie)}, ${JSON.stringify(ceja)}, ${JSON.stringify(ventana)});'>
          <img src="${ceja.img}" alt="placeholder">
          <div class="my-2">
              <label class="form-check-label">${ceja.nombre}</label>
          </div>
        </div>`;
        i++;    
      });
      temporal += '</div>';
      arreglo[6] = temporal;
      setLayouts(arreglo);
      generateStepper(6);
    }
    
}


function cargarColores(serie, ceja, ventana){
    agregarARuta(ceja.nombre, "ceja");
    let temporal = '';
    let temporal2 = '';
    let i = 0;
    window.addEventListener('resize', () => {
      //console.log('jaa');
    });
    
    temporal = '<div class="row justify-content-center">';
    ventana.colores.forEach((color, index) => {
        temporal += `<div class="col-md-3 col-lg-3 col-6 text-center selectable" id="color-${index}" onclick='agregarARuta("${color.nombre}", "colorPrincipal"); markAsActive(${index})'>
        <img src="${color.img}" alt="placeholder">
        <div class="my-2">
            <label class="form-check-label">${color.nombre}</label>
        </div>
      </div>`;
    });
    temporal += '</div></br>';
    temporal += 
    `<div class="row">
        <div class="col-12 text-center">
            <input class="form-check-input" type="checkbox"  id="agregarColores" checked onChange='cargarSubcolores(${JSON.stringify(ventana.colores[0])});'>
            <label class="form-check-label" id="pintarInteriorCheck" for="agregarColores">Pintar</label>
        </div>
    </div><br>`;
    i = 0;
    temporal += `<form><div class="row justify-content-center" id="container-colores">
    <div class="col-12 mb-5 text-center">
      <input class="form-check-input" type="checkbox" id="pintarInterior" onChange=""/>
      <label class="form-check-label" for="pintarInterior">Pintar interior</label>
    </div>`; 
    ventana.colores[0].color.forEach((subcolor) => {
        temporal += `<div class="col-md-2 col-lg-2 col-3 text-center subcolor">
            <img src="./img/${subcolor.nombre}.png" alt="placeholder"  style="width: 100%;">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="subcolor" value="${subcolor.nombre}" onChange='agregarColorTotal(${JSON.stringify(subcolor)}),agregarARuta("${subcolor.nombre}", "subcolor")'>
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



function agregarColorTotal(subcolor) {
  rutaPintura.colorSubcolor = subcolor.nombre;
  rutaPintura.precioInterior = subcolor.precioInterior;
  rutaPintura.precioExterior = subcolor.precioExterior;
  
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

function markAsActive(index) {
  if (index === 0) {
    document.getElementById('color-0').classList.add('c-active');
    document.getElementById('color-1').classList.remove('c-active');    
  } else {
    document.getElementById('color-0').classList.remove('c-active');
    document.getElementById('color-1').classList.add('c-active');    
  }
}

function determinarPrecioVidrio(serie, tipoVidrio, ventana) {
  // console.log(rutaVentana);
  let strdescripcion = '';
  let vidrio = ventana;
  let multiplicador = 1 * 1.05;
  
  if (serie === "Básica") {
    strdescripcion += tipoVidrio + " ";
    strdescripcion += "(serie 40)";
    if (vidrio == 'Vidrio Doble Claro' || vidrio == 'Vidrio Doble Claro con Marginal' || vidrio == 'Vidrio Doble Claro con Cuadricula' || vidrio == 'Vidrio Doble Claro/ Baño' || vidrio == 'Vidrio Doble Claro/ Baño con Marginal' || vidrio == 'Vidrio Doble Claro/ Baño con Cuadricula') {
      multiplicador = multiplicador * 1.08
    }
  } else {
    strdescripcion += tipoVidrio;
  }
  if (ventana.includes("Sencillo")) {
    ventana = ventana.replace("Sencillo","");
  }
  if(ventana.includes(" con marginal ")){
    ventana = ventana.replace(" con marginal "," ");
  }
  if(ventana.includes(" con Marginal ")){
    ventana = ventana.replace(" con Marginal "," ");
  }
  if(ventana.includes(" con cuadrícula ")){
    ventana = ventana.replace(" con cuadrícula "," ");
    ventana = ventana.replace(" con cuadrícula", " con marginal");
  }else if (ventana.includes(" con cuadricula ")){
    ventana = ventana.replace(" con cuadricula "," ");
    ventana = ventana.replace(" con cuadricula", " con marginal");
  }
  if(ventana.includes(" con Cuadrícula ")){
    ventana = ventana.replace(" con Cuadrícula "," ");
    ventana = ventana.replace(" con Cuadrícula", " con marginal");
  }else if(ventana.includes(" con Cuadricula ")){
    ventana = ventana.replace(" con Cuadricula "," ");
    ventana = ventana.replace(" con Cuadricula", " con marginal");
  }

  if(ventana.includes("Ultra Fino")){
    ventana = ventana.replace("Ultra Fino", "UF");
  }
  if(ventana.includes("Tapis")){
    ventana = ventana.replace(" Tapis", "");
  }

  if(ventana.includes("Baño")){
    ventana = ventana.replace("Baño", "Bano");
  }

  strdescripcion += "-";
  strdescripcion += ventana;
  
  console.log(strdescripcion);

  const formData = new FormData();
  formData.set('ventana', strdescripcion);
  let total = 0;
  $.ajax({
    url: './controllers/consultarPrecios.php',
    type: 'POST',
    async: false,
    data: formData,
    success: (data) => {
      
      let info = JSON.parse(data);
      const incremento = info.incremento/100;
      // console.log(multiplicador);
      // console.log(info.precio);
      total = parseFloat(info.precio) * multiplicador * incremento *parseFloat(info.precio_dolar) * 1.03 * 1.1; 
      //console.log(total);
      
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
  
  return total;
}


/* function calcularTotal() {

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
} */

// function encontrarPrecio(serie, ruta) {
//   let precioPulgada = 0;
//   serie.tipoVidrio.forEach((tipoVidrio) => {
//     // console.log(tipoVidrio);
//     if (tipoVidrio.nombre === ruta.tipoVidrio) {
//       tipoVidrio.tipos.forEach((tipo) => {
        
//         if (tipo.nombre === ruta.subtipoVidrio) {
//           tipo.precio.forEach((precio) => {
            
//             if (precio.tipo === formatearString(ruta.tipoVentana)) {
//               precio.tipos.forEach((subtipo) => {
                
//                 if (Object.keys(subtipo)[0] === formatearString(ruta.subtipoVentana)) {
//                   precioPulgada = subtipo[formatearString(ruta.subtipoVentana)];                  
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   });
  
//   return precioPulgada;
// }

// function formatearString(tipoVentana) {
//   tipoVentana = tipoVentana.toLowerCase();
//   tipoVentana = tipoVentana.replaceAll(' ', '');
//   return tipoVentana;
// }

function insertarCotizacion() {
  const cajaNombreCliente = document.getElementById('cajaNombreCliente');
  const cajaDireccionCliente = document.getElementById('cajaDireccionCliente');
  const cajaCodigoPostalCliente = document.getElementById('cajaCodigoPostalCliente');
  const cajaRFCCliente = document.getElementById('cajaRFCCliente');

  if(cajaNombreCliente.value == ""){
    Swal.fire({
      title: "Favor de introducir el nombre del cliente",
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd'
    })
    return;
  }
  const formData = new FormData();
  formData.set('cliente', cajaNombreCliente.value);
  formData.set('ventanas', JSON.stringify(cotizaciones));
  formData.set('direccion', cajaDireccionCliente.value);
  formData.set('codigoPostal', cajaCodigoPostalCliente.value),
  formData.set('RFC', cajaRFCCliente.value);
  $.ajax({
    url: './controllers/agregarCotizacion.php',
    type: 'POST',
    data: formData,
    success: (data) => {
      console.log(data);
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
    },
    cache: false,
    contentType: false,
    processData: false
  });
}

function agregarCotizacion() {
    if (document.getElementById('agregarColores').checked && !rutaVentana.colorSubcolor) {
      Swal.fire({
        title: "Favor de elegir un color para pintar la ventana",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }
  
    const containerSaveCotizacion = document.getElementById('container-save-cotizacion');
    rutaVentana.numeroVentanas = inputNumeroDeVentanas.value
    rutaVentana.precio = total;
    rutaVentana.total = rutaVentana.numeroVentanas * total;
    rutaVentana.total = Number.parseFloat(rutaVentana.total.toFixed(2));
    rutaVentana.descuento = 0;
    rutaVentana.totalDescuento = rutaVentana.total;
    containerSaveCotizacion.hidden = false;
    //console.log(rutaVentana);
    //console.log(cotizaciones);
    if (rutaVentana.colorSubcolor) {

    }

    cotizaciones.push(rutaVentana);
    if (rutaPintura.precioInterior !== 0) {
      if (document.getElementById('pintarInterior').checked) {
        rutaPintura.precio = rutaPintura.precioInterior;
      } else {
        rutaPintura.precio = rutaPintura.precioExterior;
      }
      rutaPintura.descuento = 0;
      rutaPintura.totalDescuento = rutaPintura.precio;
      rutaPintura.numeroVentanas = rutaVentana.numeroVentanas;
      rutaPintura.total = rutaPintura.precio * rutaPintura.numeroVentanas;
      cotizaciones.push(rutaPintura);
      rutaPintura = Object.create(pintura);
    }else{
      console.log("no cambio");
    }
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
requestBasica.open("GET","./views/js/basica.json");
requestBasica.send();

const requestPlus = new XMLHttpRequest();
requestPlus.addEventListener("load",requestListenerPlus);
requestPlus.open("GET","./views/js/plus.json");
requestPlus.send();

const requestPremium = new XMLHttpRequest();
requestPremium.addEventListener("load",requestListenerPremium);
requestPremium.open("GET","./views/js/premium.json");
requestPremium.send();

const requestPD10 = new XMLHttpRequest();
requestPD10.addEventListener("load",requestListenerPD10);
requestPD10.open("GET","./views/js/pd10.json");
requestPD10.send();

setTimeout(() => {

  const requestSeries = new XMLHttpRequest();
  requestSeries.addEventListener("load",requestListenerSeries);
  requestSeries.open("GET","./views/js/series.json");
  requestSeries.send();
    
}, 100);