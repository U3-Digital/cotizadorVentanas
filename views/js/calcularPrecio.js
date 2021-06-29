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

const formulaEjemplo = '(An + Al) * PV';

function calcularPrecio() {
  const rutaPrueba = {
    dimensionAncho: 24,
    dimensionAlto: 24,
    serie: 'Básica',
    subtipoVentana: 'Corrediza',
    subtipoVidrio: 'Claro',
    tipoVentana: 'Corrediza',
    tipoVidrio: 'Vidrio sencillo'
  }

  let formulaInicial = obtenerFormulaVentana(rutaPrueba.serie, rutaPrueba.subtipoVentana);
  
  if (!formulaInicial.includes("&")) {
    const stringEjecutable = analizadorLexico(formulaInicial);
    console.log(stringEjecutable);
    // TODO Ejecutar strings
  } else {
    console.log('hola');
  }

}

setTimeout(() => {
  calcularPrecio();
}, 3000);

function obtenerFormulaVentana(serie, nombre) {
  let formula = '';
  switch (serie) {
    case 'Básica': {
      let encontrado = false;

      for (let i = 0; i < serieBasica.tipo.length; i++) {
        const tipo = serieBasica.tipo[i];
        for (let j = 0; j < tipo.subtipo.length; j++) {
          const subtipo = tipo.subtipo[j];
          if (subtipo.nombre === nombre) {
            formula = subtipo.formula;
            encontrado = true;
            break;
          }
        }
        if (encontrado) {
          break;
        }
      }

      // const tipo = serieBasica.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      // const subtipo = tipo.subtipo.filter((sb) => sb.nombre === ruta.subtipoVentana)[0];
      // formula = subtipo.formula;
    }
      break;
    case 'Plus': {
      // const tipo = seriePlus.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      // const subtipo = tipo.subtipo.filter((sb) => sb.nombre === ruta.subtipoVentana)[0];
      // formula = subtipo.formula;
    }
      break;
    case 'Premium': {
      // const tipo = seriePremium.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      // const subtipo = tipo.subtipo.filter((sb) => sb.nombre === ruta.subtipoVentana)[0];
      // formula = subtipo.formula;
    }
      break;
    case 'PD10': {
      // const tipo = seriePD10.tipo.filter((t) => t.nombre === ruta.tipoVentana)[0];
      // const subtipo = tipo.subtipo.filter((sb) => sb.nombre === ruta.subtipoVentana)[0];
      // formula = subtipo.formula;
    }
      break;
    default:
      break;
  }

  return formula;
}


function analizadorLexico(formula) {
  let stringFinal = formula;


  stringFinal = stringFinal.replaceAll(regexAncho, 'Number.parseInt(rutaVentana.dimensionAncho)');
  stringFinal = stringFinal.replaceAll(regexAncho2, 'Number.parseInt(rutaVentana.dimensionAncho2)');
  stringFinal = stringFinal.replaceAll(regexAlto, 'Number.parseInt(rutaVentana.dimensionAlto)');
  stringFinal = stringFinal.replaceAll(regexAncho2, 'Number.parseInt(rutaVentana.dimensionAncho2)');
  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio(rutaVentana.serie, rutaVentana.subtipoVentana, rutaVentana.tipoVidrio + " " + rutaVentana.subtipoVidrio)`);
  stringFinal = stringFinal.replaceAll(regexPrecioVidrio2, `determinarPrecioVidrio(rutaVentana.serie2, rutaVentana.subtipoVentana2, rutaVentana.tipoVidrio2 + " " + rutaVentana.subtipoVidrio2)`)
  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio()`);
  stringFinal = stringFinal.replaceAll(TMullion, `(rutaVentana.dimensionAncho / ${constanteTMullion}) * ${precioUnidadTMullion}`);

  stringFinal = `const total = ${stringFinal}; return total.toFixed(2);`;

  return stringFinal;
}

// analizadorLexico(formulaEjemplo);