const precioDolar = 19.95;
const precioVidrioBase = 25.33875;
const precioUnidadTMullion = 11.77;
const constanteTMullion = 0.8771929825;

const regexAncho = /\bAn\b/gmi;
const regexAncho2 = /\bAn2\b/gmi;
const regexAlto = /\bAl\b/gmi;
const regexAlto2 = /\bAl2\b/gmi;
const regexPrecioVidrioBase = /\bPV\b/gmi;
const regexPrecioVidrio2 = /\bPV2\b/gmi;
const TMullion = /\bT-Mullion\b/gmi;

// const formulaEjemplo = '(An + Al) * PV';

function calcularPrecio() {

  let formulaInicial = obtenerFormulaVentana(rutaVentana.serie, rutaVentana);
  const stringEjecutable = analizadorLexico(formulaInicial);
  console.log(stringEjecutable); 
  total = Number.parseFloat(new Function(stringEjecutable)());
  console.log(total);
  etiquetaTotal.innerHTML = `${total.toFixed(2)}`;
}

// setTimeout(() => {
  // const cosa = obtenerSubtipoVentanaParaPrecioVidrio('Básica', 'Corrediza OX-O', 0);
  // const cosa2 = obtenerSubtipoVentanaParaPrecioVidrio('Básica', 'Corrediza OX-O', 1);
  // console.log(cosa, cosa2);
  // calcularPrecio();
// }, 3000);

function reemplazo(serie, formula) {
  console.log(formula);
  const elementos = formula.split(' ');

  // Quitar los & y reemplazarlos por +/*  */
  elementos.forEach((elemento, index, arreglo) => {
    if (elemento === '&') {
      arreglo[index] = '+';
    }
  });

  elementos.forEach((elemento, index, arreglo) => {
    const formula = obtenerFormulaVentana(serie, elemento);
    if (formula) {
      arreglo[index] = formula;
    }

  });

  console.log(elementos.join(' '));

  // const resultado = obtenerFormulaVentana(serie, formula);
  // if (resultado) {
  //   return true;
  // } else {
  //   return false;
  // }
}


function obtenerFormulaVentana(serie, ruta) {
  let formula = '';
  switch (serie) {
    case 'Básica': {
      const tipo = serieBasica.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      const subtipo = tipo.subtipo.filter((sub) => sub.nombre === ruta.subtipoVentana)[0];
      formula = subtipo.formula;
    }
      break;
    case 'Plus': {
      const tipo = seriePlus.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      const subtipo = tipo.subtipo.filter((sub) => sub.nombre === ruta.subtipoVentana)[0];
      formula = subtipo.formula;
    }
      break;
    case 'Premium': {
      const tipo = seriePremium.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      const subtipo = tipo.subtipo.filter((sub) => sub.nombre === ruta.subtipoVentana)[0];
      formula = subtipo.formula;
    }
      break;
    case 'PD10': {
      const tipo = seriePD10.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      const subtipo = tipo.subtipo.filter((sub) => sub.nombre === ruta.subtipoVentana)[0];
      formula = subtipo.formula;
    }
      break;
    default:
      break;
  }

  return formula;
}

function obtenerSubtipoVentanaParaPrecioVidrio(serie, ventana, posicion) {
  let subtipoVentana = '';

  switch (serie) {
    case 'Básica': {
      let encontrado = false;

      for (let i = 0; i < serieBasica.tipo.length; i++) {
        const tipo = serieBasica.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === ventana) {
            subtipoVentana = subtipo.extra.preciosVidrio[posicion];
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
            subtipoVentana = subtipo.extra.preciosVidrio[posicion];
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
            subtipoVentana = subtipo.extra.preciosVidrio[posicion];
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
            subtipoVentana = subtipo.extra.preciosVidrio[posicion];
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

  return subtipoVentana;
}

function calcularTMullion(medida) {
  return medida / constanteTMullion * precioUnidadTMullion;
}

function analizadorLexico(formula) {
  let stringFinal = formula;


  stringFinal = stringFinal.replaceAll(regexAncho, 'Number.parseInt(rutaVentana.dimensionAncho)');
  stringFinal = stringFinal.replaceAll(regexAncho2, 'Number.parseInt(rutaVentana.dimensionAncho2)');
  stringFinal = stringFinal.replaceAll(regexAlto, 'Number.parseInt(rutaVentana.dimensionAlto)');
  stringFinal = stringFinal.replaceAll(regexAlto2, 'Number.parseInt(rutaVentana.dimensionAlto2)');
  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio(rutaVentana.serie, obtenerSubtipoVentanaParaPrecioVidrio(rutaVentana.serie, rutaVentana.subtipoVentana, 0), rutaVentana.tipoVidrio + " " + rutaVentana.subtipoVidrio)`);
  stringFinal = stringFinal.replaceAll(regexPrecioVidrio2, `determinarPrecioVidrio(rutaVentana.serie, obtenerSubtipoVentanaParaPrecioVidrio(rutaVentana.serie, rutaVentana.subtipoVentana, 1), rutaVentana.tipoVidrio + " " + rutaVentana.subtipoVidrio)`)
  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio()`);
  // stringFinal = stringFinal.replaceAll(TMullion, `calcularTMullion()`);

  stringFinal = `const total = ${stringFinal}; return total.toFixed(2);`;

  return stringFinal;
}