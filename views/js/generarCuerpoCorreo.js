function generarCorreo(cotizacion) {
  let cuerpo = '';

  cuerpo += estiloCorreo;

  cuerpo += generarCuerpo(cotizacion);

  return cuerpo;
}

const estiloCorreo = `
  <style>
    * {
      font-family: 'Arial', sans-serif;
      font-size: 16px;
    }

    @page: {
      size: A4;
      margin: 0;
    }

    .borde: {
      border: 1px solid red;
    }
  </style>
`;

function generarCuerpo(cotizacion) {
  console.log(cotizacion);
  return `
  <body>
    <div class="borde">
      a
    </div>
  </body>
  `;
}