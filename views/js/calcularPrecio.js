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
  console.log(stringFinal);
  console.log(rutaVentana);

  console.log(new Function(stringFinal)());
}

// analizadorLexico(formulaEjemplo);