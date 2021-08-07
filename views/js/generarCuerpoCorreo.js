const rutaImagen = 'https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big-176x55.png';
let totalCorreo = 0;
function generarCorreo(cotizacion) {
  console.log(cotizacion);
  let cuerpo = '';

  cuerpo += estiloCorreo;

  cuerpo += generarCuerpo(cotizacion);

  return cuerpo;
}

const estiloCorreo = `
  <style>
    * {
      font-family: 'Arial', sans-serif;
      font-size: 14px;
    }

    @page {
      size: A4;
      margin: 0;
    }


    table { width: 200mm;}

    p {
      margin: 0;
    }
    .borde {
      border: 1px solid red;
    }
    .cell-border {
      padding-bottom: 5px;
      padding-top: 5px;
      border-width: 0px 0px 1px 0px;
      border-style: solid;
      border-color: #BBBBBB;
    }
  </style>
`;

function generarCuerpo(cotizacion) {
  // return `
  //   <body>
  //     <div>
  //       <table>
  //         <thead>
  //           <tr>
  //             <td style="width: 100%">
  //               <div>
  //                 <img src="${rutaImagen}" alt="SkyView logo" style="height: 10mm; width: 32mm;">
  //                 <span style="margin-left: 130mm;">${cotizacion.fecha}</span>
  //                 <h2>Sky View Fenster</h2>
  //                 <span>Cotización para: <b>${cotizacion.cliente}</b></span>
  //                 <hr>
  //               </div>
  //             </td>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <td>
  //               <div style="width: 30mm; display: inline">
  //                 <span><b>Tipo de ventana</b></span>
  //               </div>
  //               <div style="width: 50mm; display: inline">
  //                 <span><b>Tipo de vidrio</b></span>
  //               </div>
  //               <div style="width: 30mm; display: inline">
  //                 <span><b>Dimensiones</b></span>
  //               </div>
  //               <div style="width: 20mm; display: inline">
  //                 <span><b>Color</b></span>
  //               </div>
  //               <div style="width: 30mm; display: inline">
  //                 <span><b>Precio</b></span>
  //               </div>
  //               <div style="width: 20mm; display: inline">
  //                 <span><b>Cantidad</b></span>
  //               </div>
  //               <div style="width: 20mm; display: inline">
  //                 <span><b>Total</b></span>
  //               </div>
  //             </td>
  //           </tr>
  //           ${generarVentanas(cotizacion.ventana)}
  //         </tbody>
  //         <tfoot>
  //           <tr>
  //             <td>
  //               <hr>
  //               <div style="margin-left: 165mm">
  //                 <span>Total: <b>$${totalCorreo.toFixed(2)}</b></span>
  //               </div>
  //             </td>
  //           </tr>
  //         </tfoot>
  //       </table>
  //     </div>
  //   </body>
  // `;

  return `
    <body>
      <div style="border: 1px solid gray;">
        <table>
          <thead>
            <tr>
              <td style="width: 100%">
                <div style="text-align: center">
                  <span>Sky View Fenster</span>
                  <br>
                  <span><small>REKD820121H39</small></span>
                </div>
                <br>
                <div>
                  <div style="display: inline; width: 98mm; border: 1px solid red;">
                    <span style="font-size: 20px; color: blue;">Cotización</span>
                    <br>
                    <br>
                    <div style="display: block; border: 1px solid gray;">
                      <div style="background-color: blue; text-align: center; padding-top: 1mm; padding-bottom: 1mm">
                        <span style="color: white;">Cliente</span>
                      </div>
                      <div>
                        <div style="margin: 1mm">${cotizacion.cliente}</div>
                        <div style="margin: 1mm">${cotizacion.cliente}</div>
                        <div style="margin: 1mm">${cotizacion.cliente}</div>
                        <div style="margin: 1mm">${cotizacion.cliente}</div>
                        <div style="margin: 1mm">${cotizacion.cliente}</div>
                      </div>
                    </div>
                  </div>
                  <div style="display: inline; width: 98mm;">
                    <div style="border: 1px solid red; width: 96mm; display: block;">
                      <div style="background-color: blue; text-align: center; padding-top: 1mm; padding-bottom: 1mm; width: 30mm; display: inline; margin-left: 33mm">
                        <span style="color: white; display: block; width: 30mm">Fecha</span>
                      </div>
                      <div style="width: 30mm; display: inline; text-align: center; padding-top: 1mm; padding-bottom: 1mm; background-color: blue">
                        <span style="color: white">Folio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody></tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>
    </body>
  `
}

function generarVentanas(ventanas) {
  let resultado = '';
  ventanas.forEach((ventana) => {
    totalCorreo += ventana.total;
    if (ventana.serie) {
      resultado += `
        <tr>
          <td>
            <div style="width: 30mm; display: inline;" class="cell-border">
              <span>${ventana.subtipoVentana}</span>
            </div>
            <div style="width: 50mm; display: inline;" class="cell-border">
              <span>${ventana.tipoVidrio} - ${ventana.subtipoVidrio}</span>
            </div>
            <div style="width: 30mm; display: inline;" class="cell-border">
              <span>${ventana.dimensionAncho}" x ${ventana.dimensionAlto}"</span>
            </div>
            <div style="width: 20mm; display: inline;" class="cell-border">
              <span>${ventana.colorPrincipal}</span>
            </div>
            <div style="width: 30mm; display: inline;" class="cell-border">
              <span>$${ventana.precio}</span>
            </div>
            <div style="width: 20mm; display: inline;" class="cell-border">
              <span>${ventana.numeroVentanas}</span>
            </div>
            <div style="width: 20mm; display: inline;" class="cell-border">
              <span>$${ventana.total}</span>
            </div>
          </td>
        </tr>
      `;
    } else {
      resultado += `
      <tr>
        <td>
          <div style="width: 30mm; display: inline;">
          </div>
          <div style="width: 50mm; display: inline;">
          </div>
          <div style="width: 30mm; display: inline;">
          </div>
          <div style="width: 20mm; display: inline;" class="cell-border">
            <span>${ventana.colorSubcolor}</span>
          </div>
          <div style="width: 30mm; display: inline;" class="cell-border">
            <span>$${ventana.precio}</span>
          </div>
          <div style="width: 20mm; display: inline;" class="cell-border">
            <span>${ventana.numeroVentanas}</span>
          </div>
          <div style="width: 20mm; display: inline;" class="cell-border">
            <span>$${ventana.total}</span>
          </div>
        </td>
      </tr>`;
    }
  });
  return resultado;
}

/* <thead>
            <tr>
              <th>
                <div>
                  <br>
                  <div style="margin-top: 4mm; margin-bottom: 6mm;">
                    <p>${generarFecha()}</p>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody></tbody> */