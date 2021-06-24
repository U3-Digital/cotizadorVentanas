const precioDolar = 19.95;
const precioVidrioBase = 25.33875;
const precioUnidadTMullion = 11.77;
const constanteTMullion = 0.8771929825;

const regexAncho = /An/gmi;
const regexAlto = /Al/gmi;
const regexPrecioVidrioBase = /PV/gmi;
const regexPrecioVidrio = /PV2/gmi;
const TMullion = /T-Mullion/gmi;

const formulaEjemplo = '((An / 3 + Al) * PV) * 3 + (T-Mullion) * 2';

function analizadorLexico(formula) {
  let stringFinal = formula;

  stringFinal = stringFinal.replaceAll(regexAncho, 'rutaVentana.dimensionAncho');
  stringFinal = stringFinal.replaceAll(regexAlto, 'rutaVentana.dimensionAlto');
  stringFinal = stringFinal.replaceAll(regexPrecioVidrioBase, `determinarPrecioVidrio('Básica', 'Fija', 'Sencillo Claro')`);
  stringFinal = stringFinal.replaceAll(regexPrecioVidrio, `determinarPrecioVidrio()`);
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