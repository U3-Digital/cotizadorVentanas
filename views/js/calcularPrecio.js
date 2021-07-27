const precioUnidadTMullionBasica = 11.77;
const constanteTMullionBasica = 0.8771929825;

const precioUnidadTMullionPlus = 2974.48;
const constanteTMullionPlus = 110;

const precioUnidadTMullionPremium = 28.65;
const constanteTMullionPremium = 0.8771929825;

const regexAncho = /\bAn\b/gmi;
const regexAncho2 = /\bAn2\b/gmi;
const regexAncho3 = /\bAn3\b/gmi;

const regexAlto = /\bAl\b/gmi;
const regexAlto2 = /\bAl2\b/gmi;
const regexAlto3 = /\bAl3\b/gmi;

const regexPrecioVidrioBase = /\bPV\b/gmi;
const regexPrecioVidrio2 = /\bPV2\b/gmi;
const regexPrecioVidrio3 = /\bPV3\b/gmi;

const TMullion = /\bT-Mullion\b/gmi;

function calcularPrecio() {

  let formulaInicial = obtenerFormulaVentana(rutaVentana.serie, rutaVentana);
  const stringEjecutable = analizadorLexico(formulaInicial);
  //console.log(stringEjecutable); 
  total = Number.parseFloat(new Function(stringEjecutable)());
  //console.log(total);
  total = total.toFixed(2);
  rutaVentana.total = total;

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  const t = formatter.format(total);
  etiquetaTotal.innerHTML = `${t}`;

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

  const serie = rutaVentana.serie;

  let tMullion = 0;

  switch (serie) {
    case 'Básica': {
      tMullion = medida / constanteTMullionBasica * precioUnidadTMullionBasica;
    }
    break;
    case 'Plus': {
      tMullion = (medida / constanteTMullionPlus).toFixed(2) * precioUnidadTMullionPlus;
    }
    break;
    case 'Premium': {
      tMullion = (medida / constanteTMullionPremium).toFixed(2) * precioUnidadTMullionPremium;
    }
    break;
  }

  return tMullion;
}

function analizadorLexico(formula) {
  let stringFinal = formula;


  stringFinal = stringFinal.replaceAll(regexAncho, 'Number.parseInt(rutaVentana.dimensionAncho)');
  stringFinal = stringFinal.replaceAll(regexAncho2, 'Number.parseInt(rutaVentana.dimensionAncho2)');
  stringFinal = stringFinal.replaceAll(regexAncho3, 'Number.parseInt(rutaVentana.dimensionAncho3)');

  stringFinal = stringFinal.replaceAll(regexAlto, 'Number.parseInt(rutaVentana.dimensionAlto)');
  stringFinal = stringFinal.replaceAll(regexAlto2, 'Number.parseInt(rutaVentana.dimensionAlto2)');
  stringFinal = stringFinal.replaceAll(regexAlto3, 'Number.parseInt(rutaVentana.dimensionAlto3)');

  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio(rutaVentana.serie, obtenerSubtipoVentanaParaPrecioVidrio(rutaVentana.serie, rutaVentana.subtipoVentana, 0), rutaVentana.tipoVidrio + " " + rutaVentana.subtipoVidrio)`);
  stringFinal = stringFinal.replaceAll(regexPrecioVidrio2, `determinarPrecioVidrio(rutaVentana.serie, obtenerSubtipoVentanaParaPrecioVidrio(rutaVentana.serie, rutaVentana.subtipoVentana, 1), rutaVentana.tipoVidrio + " " + rutaVentana.subtipoVidrio)`);
  stringFinal = stringFinal.replaceAll(regexPrecioVidrio3, `determinarPrecioVidrio(rutaVentana.serie, obtenerSubtipoVentanaParaPrecioVidrio(rutaVentana.serie, rutaVentana.subtipoVentana, 2), rutaVentana.tipoVidrio + " " + rutaVentana.subtipoVidrio)`)

  stringFinal = `const total = ${stringFinal}; return total.toFixed(2);`;

  return stringFinal;
}
