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

const formulaEjemplo = '((An / 3 + Al) * PV) * 3 + (T-Mullion) * 2 + PV2';

function analizadorLexico(formula) {
  let stringFinal = formula;

  stringFinal = stringFinal.replaceAll(regexAncho, 'rutaVentana.dimensionAncho');
  stringFinal = stringFinal.replaceAll(regexAncho2, 'rutaVentana.dimensionAncho2');
  stringFinal = stringFinal.replaceAll(regexAlto, 'rutaVentana.dimensionAlto');
  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio('Básica', 'Fija', 'Sencillo Claro')`);
  stringFinal = stringFinal.replaceAll(regexPrecioVidrio2, `determinarPrecioVidrio('Básica', 'Fija', 'Sencillo Claro')`)
  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio()`);
  stringFinal = stringFinal.replaceAll(TMullion, `(rutaVentana.dimensionAncho / ${constanteTMullion}) * ${precioUnidadTMullion}`);

  rutaVentana = {
    dimensionAncho: 48,
    dimensionAlto: 48,
    precioVidrio: precioVidrioBase,
  };

  stringFinal = `const total = ${stringFinal}; return total.toFixed(2);`;
  console.log(stringFinal);

  console.log(new Function(stringFinal)());
}

analizadorLexico(formulaEjemplo);