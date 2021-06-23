const precioDolar = 19.95;
const precioVidrioBase = 25.33875;
const precioUnidadTMullion = 11.77;
const constanteTMullion = 0.8771929825;

const regexAncho = /An/gmi;
const regexAlto = /Al/gmi;
const regextPrecioVidrioBase = /PV/gmi;
const TMullion = /T-Mullion/gmi;

const formulaEjemplo = '((An / 3 + Al) * PV) * 3 + (T-Mullion) * 2';

function analizadorLexico(formula) {
  let stringFinal = formula;

  stringFinal = stringFinal.replaceAll(regexAncho, 'rutaVentana.dimensionAncho');
  stringFinal = stringFinal.replaceAll(regexAlto, 'rutaVentana.dimensionAlto');
  stringFinal = stringFinal.replaceAll(regextPrecioVidrioBase, `rutaVentana.precioVidrio`);
  stringFinal = stringFinal.replaceAll(TMullion, `(rutaVentana.dimensionAncho / ${constanteTMullion}) * ${precioUnidadTMullion}`);


  rutaVentana = {
    dimensionAncho: 48,
    dimensionAlto: 48,
    precioVidrio: precioVidrioBase,
  };

  stringFinal = `const total = ${stringFinal}; return total.toFixed(2);`;
  console.log(stringFinal);

  // new Function
  console.log(new Function(stringFinal)());
  console.log();
}

analizadorLexico(formulaEjemplo);