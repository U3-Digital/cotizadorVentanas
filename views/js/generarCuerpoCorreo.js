const rutaImagen = 'https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big-176x55.png';
let totalCorreo = 0;
function generarCorreo(cotizacion) {
  console.log(cotizacion);
  let cuerpo = '';

  // cuerpo += estiloCorreo;

  cuerpo += generarCuerpo(cotizacion);
  totalCorreo = 0;
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

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

 return `
  <div style="border: 1px solid gray; text-align: center; font-family: helvetica">
    <span>Sky View Fenster</span>
    <br>
    <span>REKD820121H39</span>
    <div>
      <table style="width: 100%" style="padding-top: 10px">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 50%; text-align: start;">
              <span style="font-family: helvetica; color: #2171FF; font-size: 22px; font-weight: bold">Cotización</span>
            </td>
            <td style="width: 50%;">
              <table style="width: 100%;">
                <thead>
                  <tr>
                    <th></th>
                    <th style="background-color: #2171FF; width: 30%; text-align: center; color: white; font-weight: bold; font-size: 13px">Fecha</th>
                    <th style="background-color: #2171FF; width: 30%; text-align: center; color: white; font-weight: bold; font-size: 13px">Folio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>${cotizacion.fecha}</td>
                    <td>${cotizacion.idCotizacion}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table style="width: 100%" style="padding-top: 2px; padding-bottom: 2px; font-size: 13px; border: 1px solid gray; font-weight: bold;">
                <thead>
                  <tr>
                    <th style="background-color: #2171FF; width: 100%; text-align: center; color: white">Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align: left; font-weight: normal">${cotizacion.cliente}</td>
                  </tr>
                  <tr>
                    <td style="text-align: left; font-weight: normal">${cotizacion.direccion}</td>
                  </tr>
                  <tr>
                    <td style="text-align: left; font-weight: normal">${cotizacion.codigoPostal}</td>
                  </tr>
                  <tr>
                    <td style="text-align: left; font-weight: normal">${cotizacion.RFC}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <img src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big.png">
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <br>
              <table style="width: 100%">
                <thead>
                  <tr>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px">Vigencia</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px">Condiciones</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px">Contado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td style="font-size: 13px">Contado</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <br>
              <table style="width: 100%">
                <thead>
                  <tr>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Tipo de ventana</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Tipo de vidrio</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Dimensiones</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Color</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Precio</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Cantidad</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Descuento</th>
                    <th style="background-color: #2171FF; text-align: center; color: white; font-weight: bold; font-size: 13px;">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  ${generarVentanasCorreo(cotizacion.ventana)}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="border: 1px solid gray;">
      <table style="width: 100%;">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: start; font-size: 13px; width: 50%; height: 80px; padding: 4px">
              <div>
                ${NumeroALetras(totalCorreo * 1.16)[0].toUpperCase()}${NumeroALetras(totalCorreo * 1.16).substr(1)}
              </div>
            </td>
            <td style="text-align: start; font-size: 13px; width: 25%">
              <p>Subtotal</p>
              <p>IVA</p>
              <br/>
              <p>Total</p>
            </td>
            <td style="text-align: right; font-size: 13px; width: 25%">
              <p>${formatter.format((totalCorreo).toFixed(2))}</p>
              <p>${formatter.format((totalCorreo * 0.16).toFixed(2))}</p>
              <br/>
              <p>${formatter.format((totalCorreo * 1.16).toFixed(2))}</p>
            </td>
          </tr>
          <tr>
            <td colspan="3" style="font-size: 10px; text-align: left;">Debo(emos) y pagare(emos) incondicionalmente por este pagaré a la orden de DAVID REMPEL KLASSEN Y MAYRA LETICIA ARAGÓN VÁZQUEZ en esta ciudad o en cualquier otro luger que se me(nos) requiera el pago a elección del acreedor la cantidad de: ${formatter.format((totalCorreo * 1.16).toFixed(2))}, valor recibido a mí(nuestra) entera satisfacción, este pagaré está sujeto a la condición de que que, al no pagarse a su vencimiento hasta el día de su liquidación, causará intereses moratorios al tipo de 3% mensual pagadero en esta ciudad juntamente con el principal.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`;

}

function generarVentanasCorreo(ventanas) {
  let resultado = '';
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });
  ventanas.forEach((ventana, index) => {
    totalCorreo += ventana.totalDescuento;
    if (ventana.serie) {
      resultado += `
        <tr style="${index % 2 === 0 ? 'background-color: #DDDDDD;' : ''}">
          <td style="font-size: 13px">${ventana.serie} - ${ventana.tipoVentana} - ${ventana.subtipoVentana} - ${ventana.ceja}</td>
          <td style="font-size: 13px">${ventana.tipoVidrio} - ${ventana.subtipoVidrio}</td>
          <td style="font-size: 13px">${ventana.dimensionAncho}" x ${ventana.dimensionAlto}"</td>
          <td style="font-size: 13px">${ventana.colorPrincipal}</td>
          <td style="font-size: 13px">${formatter.format(ventana.precio)}</td>
          <td style="font-size: 13px">${ventana.numeroVentanas}</td>
          <td style="font-size: 13px">${ventana.descuento}%</td>
          <td style="font-size: 13px">${formatter.format(ventana.totalDescuento)}</td>
        </tr>
      `;
    } else {
      resultado += `
        <tr>
          <td style="font-size: 13px"></td>
          <td style="font-size: 13px"></td>
          <td style="font-size: 13px"></td>
          <td style="font-size: 13px">${ventana.colorSubcolor}</td>
          <td style="font-size: 13px">${formatter.format(ventana.precio)}</td>
          <td style="font-size: 13px">${ventana.numeroVentanas}</td>
          <td style="font-size: 13px">${ventana.descuento}%</td>
          <td style="font-size: 13px">${formatter.format(ventana.totalDescuento)}</td>
        </tr>
      `;
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