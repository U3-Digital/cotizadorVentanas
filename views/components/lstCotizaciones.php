<?php
require_once "./controllers/controllerCotizaciones.php";
require_once "./models/modelCotizaciones.php";

?>

<div class="row justify-content-center">
          <div class="col">
            <div class="card">
              <div class="card-header border-0">
                <h4>Cotizaciones</h4>
              </div>
              <div class="card-body">
                <table class="table bg-white table-bordererd table-hover">
                  <thead>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                  </thead>
                  <tbody>
                    <?php
                      $controllerCotizaciones = new CotizacionesController();
                      $controllerCotizaciones -> ctrListarCotizaciones();
                      $controllerCotizaciones -> ctrBorrarCotizacion();
                    ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  <script>
    function generaaPDF(cotizacion){
      const formData = new FormData();
      formData.set('id',cotizacion);
      $.ajax({
              url: './controllers/obtenerCotizacion.php',
              type: 'POST',
              data: formData,
              success: (data) => {
                const cotizacion = JSON.parse(data);

                cotizacion.ventana = JSON.parse(cotizacion.ventana);
                let totalCotizacion = 0;

                const formatter = new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN'
                });

                function generarPDF(cotizacion) {
                  let pdf = '';
                  pdf += generarCuerpo(cotizacion);
                  return pdf;
                }

                function generarCuerpo(cotizacion) {
                  const estilo = `
                  <style>
                    * {
                      font-family: Arial;
                    }

                    .flex {
                      display: flex;
                    }

                    .flex-col {
                      flex-direction: column;
                    }

                    .flex-row-reverse {
                      flex-direction: row-reverse;
                    }

                    .justify-center {
                      justify-content: center;
                    }

                    .items-center {
                      align-items: center;
                    }

                    .text-center {
                      text-align: center;
                    }

                    .block {
                      display: block;
                    }

                    .border {
                      border: 1px solid gray;
                    }

                    .borde {
                      border: 1px solid red;
                    }

                    @page {
                      size: auto;
                      margin: 5mm;
                    }

                    @media print {
                      * {
                        -webkit-print-color-adjust: exact;
                      }

                      .footer {
                        position: static;
                        bottom: 20px;
                        left: 0px;
                        width: 100%;
                      }
                    }

                  </style>
                `;

                  return `
                    ${estilo}
                    <body style="position: relative; margin: 0;" class="border">
                      <div>
                        <table style="width: 100%; margin-bottom: 20px">
                          <thead>
                            <tr>
                              <td>
                                <div class="flex justify-center flex-col items-center">
                                  <span style="font-size: 16px">Sky View Fenster</span>
                                  <span><small>REKD820121H39</small></span>
                                </div>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="flex">
                                  <div class="flex flex-col" style="width: 50%">
                                    <span style="font-size: 22px; font-weight: bolder; color: #2171FF; margin-bottom: 1em">Cotización</span>
                                    <table class="border">
                                      <thead style="background-color: #2171FF;">
                                        <tr>
                                          <th>
                                            <div style="color: white; padding-top: 2px; padding-bottom: 2px">Cliente</div>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>${cotizacion.cliente}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.direccion}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.codigoPostal}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.RFC}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div class="flex flex-col" style="width: 50%">
                                    <div class="flex flex-row-reverse">
                                      <table style="width: 66%">
                                        <thead>
                                          <tr style="background-color: #2171FF;">
                                            <th style="color: white; padding-top: 2px; padding: 4px">Fecha</th>
                                            <th style="color: white; padding-top: 2px; padding: 4px">Folio</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td class="text-center">${cotizacion.fecha}</td>
                                            <td class="text-center">${cotizacion.idCotizacion}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div style="margin-bottom: auto; padding: 1em;">
                                      <img src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big.png" style="width: 100%;">
                                    </div>
                                  </div>
                                </div>
                                <div style="margin-top: 1em">
                                  <table style="width: 100%">
                                    <thead>
                                      <tr>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Vigencia
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Condiciones
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Vendedor
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td></td>
                                        <td class="text-center">Contado</td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <br>
                                  <table style="width: 100%">
                                    <thead>
                                      <tr>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Tipo de ventana
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Tipo de vidrio
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Dimensiones
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Color
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Precio
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Cantidad
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Descuento
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Importe
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      ${generarVentanas2(cotizacion.ventana)}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="footer flex flex-col">
                        <div class="flex">
                          <div class="border" style="width: 60%; font-size: 14px; padding: 1em; word-wrap: break-word;">${NumeroALetras(totalCotizacion * 1.16)[0].toUpperCase()}${NumeroALetras(totalCotizacion * 1.16).substr(1)}</div>
                          <div class="border flex flex-col" style="width: 20%; padding: 1em;">
                            <span>Subtotal</span>
                            <span>IVA</span>
                            <br>
                            <span>Total</span>
                          </div>
                          <div class="border flex flex-col" style="width: 20%; padding: 1em; align-items: end">
                            <span style="margin-left: auto">${formatter.format((totalCotizacion).toFixed(2))}</span>
                            <span style="margin-left: auto">${formatter.format((totalCotizacion * 0.16).toFixed(2))}</span>
                            <br>
                            <span style="margin-left: auto"><b>${formatter.format((totalCotizacion * 1.16).toFixed(2))}</b></span>
                          </div>
                        </div>
                        <div class="border" style="font-size: 12px; word-wrap: break-word; padding: 1em">
                          Debo(emos) y pagare(emos) incondicionalmente por este pagaré a la orden de DAVID REMPEL KLASSEN Y MAYRA LETICIA ARAGÓN VÁZQUEZ en esta ciudad o en cualquier otro luger que se me(nos) requiera el pago a elección del acreedor la cantidad de: ${formatter.format((totalCotizacion * 1.16).toFixed(2))}, valor recibido a mí(nuestra) entera satisfacción, este pagaré está sujeto a la condición de que que, al no pagarse a su vencimiento hastsa el día de su liquidación, causará intereses moratorios al tipo de 3% mensual pagadero en esta ciudad juntamente con el principal.
                        </div>
                      </div>
                    </body>
                  `;
                }

                function generarVentanas2(ventanas) {
                  let resultado = '';
                  const formatter = new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN'
                  });
                  ventanas.forEach((ventana) => {
                    totalCotizacion += ventana.totalDescuento;

                    if (ventana.serie) {
                      resultado += `
                        <tr style="font-size: 14px">
                          <td class="text-center">
                            ${ventana.serie} - ${ventana.tipoVentana} - ${ventana.subtipoVentana} - ${ventana.ceja}
                          </td>
                          <td class="text-center">
                            ${ventana.tipoVidrio} - ${ventana.subtipoVidrio}
                          </td>
                          <td class="text-center">
                            ${ventana.dimensionAncho}" x ${ventana.dimensionAlto}"
                          </td>
                          <td class="text-center">
                            ${ventana.colorPrincipal}
                          </td>
                          <td class="text-center">
                            ${formatter.format(ventana.precio)}
                          </td>
                          <td class="text-center">
                            ${ventana.numeroVentanas}
                          </td>
                          <td class="text-center">
                            ${ventana.descuento}%
                          </td>
                          <td class="text-center">
                            ${formatter.format(ventana.totalDescuento)}
                          </td>
                        </tr>
                      `;
                    } else {
                      resultado += `
                        <tr style="font-size: 14px">
                          <td class="text-center">
                          </td>
                          <td class="text-center">
                          </td>
                          <td class="text-center">
                          </td>
                          <td class="text-center">
                            Pintura 
                            ${ventana.colorSubcolor}
                          </td>
                          <td class="text-center">
                            ${formatter.format(ventana.precio)}
                          </td>
                          <td class="text-center">
                            ${ventana.numeroVentanas}
                          </td>
                          <td class="text-center">
                            ${ventana.descuento}%
                          </td>
                          <td class="text-center">
                           ${formatter.format(ventana.totalDescuento)}
                          </td>
                        </tr>`;
                    }
                  });

                  return resultado;
                }

                const html = generarPDF(cotizacion);

                const ventana = window.open('', 'impresion',`width=${window.innerWidth - 50}, height=${window.innerHeight - 10}`);
                ventana.document.write(html);
                ventana.document.close();
                ventana.onload = function () {
                  setTimeout(() => {
                    ventana.print();
                  }, 300);
                };
                ventana.addEventListener("afterprint", () => {
                  ventana.close();
                });
              },
              error: (error) => {
                console.log(error);
              },
              complete: () => {
              },
              cache: false,
              contentType: false,
              processData: false
            });
    }
    function enviarCotizacion(idCotizacion) {
      Swal.fire({
          title: 'Correo del cliente',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          showLoaderOnConfirm: true,
          preConfirm: (correo) => {
            /* const formData = new FormData();
            formData.set('id', idCotizacion);
            formData.set('correo', correo);
            formData.set('cuerpoCorreo', ) */
            const formData = new FormData();
            formData.append('idCotizacion', idCotizacion);

            fetch('./controllers/consultarCotizacion.php', {
              method: 'POST',
              body: formData
            }).then((response) => response.json()).then((data) => {
              const cuerpoCorreo = generarCorreo(data);
            
              const formCorreo = new FormData();
              formCorreo.append('correo', correo);
              formCorreo.append('cuerpoCorreo', cuerpoCorreo);


              fetch('./controllers/solicitarEnvioDeCorreo.php', {
                method: 'POST',
                body: formCorreo,
              }).then((response) => {
                return response.json();
              }).then((data) => {
                if (data.ok) {
                  Swal.fire({
                    title: 'Correo enviado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                  });
                } else {
                  Swal.fire({
                    title: 'Error al enviar el correo',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                  });
                }
              });
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        })
      
    }
    function borrarCotizacion(idCotizacion) {
      Swal.fire({
        title: '¿Está seguro de que desea borrar esta cotización?',
        text: 'Esta acción no podrá ser revertida',
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#0d6efd',
        confirmButtonColor: '#dc3545'
      }).then((value) => {
        if (value.isConfirmed) {
          window.location.href = `inicio.php?action=lstCotizaciones&idBorrar=${idCotizacion}`;
        }
      });
    }

    function mirarCotizacion(idCotizacion){
      
      const formData = new FormData();
      formData.set('id', idCotizacion);
      $.ajax({
        url: './controllers/consultarVentanasCotizacion.php',
        type: 'POST',
        data: formData,
        success: (data) => {
          let totalCotizacion = 0;

          const cotizacion = JSON.parse(data);
          cotizacion.ventana = JSON.parse(cotizacion.ventana);

          const formatter = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
          });

          function generarPDF(cotizacion) {
                  let pdf = '';
                  pdf += generarCuerpo(cotizacion);
                  return pdf;
                }

                function generarCuerpo(cotizacion) {
                  const estilo = `
                  <style>
                    * {
                      font-family: Arial;
                    }

                    .flex {
                      display: flex;
                    }

                    .flex-col {
                      flex-direction: column;
                    }

                    .flex-row-reverse {
                      flex-direction: row-reverse;
                    }

                    .justify-center {
                      justify-content: center;
                    }

                    .items-center {
                      align-items: center;
                    }

                    .text-center {
                      text-align: center;
                    }

                    .block {
                      display: block;
                    }

                    .border {
                      border: 1px solid gray;
                    }

                    .borde {
                      border: 1px solid red;
                    }

                    @page {
                      size: auto;
                      margin: 5mm;
                    }

                    @media print {
                      * {
                        -webkit-print-color-adjust: exact;
                      }

                      .footer {
                        position: static;
                        bottom: 20px;
                        left: 0px;
                        width: 100%;
                      }
                    }

                  </style>
                `;

                  return `
                    ${estilo}
                    <body style="position: relative; margin: 2em;" class="border">
                      <div>
                        <table style="width: 100%; margin-bottom: 20px">
                          <thead>
                            <tr>
                              <td>
                                <div class="flex justify-center flex-col items-center">
                                  <span style="font-size: 16px">Sky View Fenster</span>
                                  <span><small>REKD820121H39</small></span>
                                </div>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="flex">
                                  <div class="flex flex-col" style="width: 50%">
                                    <span style="font-size: 22px; font-weight: bolder; color: #2171FF; margin-bottom: 1em">Cotización</span>
                                    <table class="border">
                                      <thead style="background-color: #2171FF;">
                                        <tr>
                                          <th>
                                            <div style="color: white; padding-top: 2px; padding-bottom: 2px">Cliente</div>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>${cotizacion.cliente}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.direccion}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.codigoPostal}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.RFC}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div class="flex flex-col" style="width: 50%">
                                    <div class="flex flex-row-reverse">
                                      <table style="width: 66%">
                                        <thead>
                                          <tr style="background-color: #2171FF;">
                                            <th style="color: white; padding-top: 2px; padding: 4px">Fecha</th>
                                            <th style="color: white; padding-top: 2px; padding: 4px">Folio</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td class="text-center">${cotizacion.fecha}</td>
                                            <td class="text-center">${cotizacion.idCotizacion}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div style="margin-bottom: auto; padding: 1em;">
                                      <img src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big.png" style="width: 100%;">
                                    </div>
                                  </div>
                                </div>
                                <div style="margin-top: 1em">
                                  <table style="width: 100%">
                                    <thead>
                                      <tr>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Vigencia
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Condiciones
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Vendedor
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td></td>
                                        <td class="text-center">Contado</td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <br>
                                  <table style="width: 100%">
                                    <thead>
                                      <tr>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Tipo de ventana
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Tipo de vidrio
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Dimensiones
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Color
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Precio
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Cantidad
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Descuento
                                        </th>
                                        <th style="background-color: #2171FF; color: white; padding: 4px">
                                          Importe
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      ${generarVentanas2(cotizacion.ventana)}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="footer flex flex-col">
                        <div class="flex">
                          <div class="border" style="width: 60%; font-size: 14px; padding: 1em; word-wrap: break-word;">${NumeroALetras(totalCotizacion * 1.16)[0].toUpperCase()}${NumeroALetras(totalCotizacion * 1.16).substr(1)}</div>
                          <div class="border flex flex-col" style="width: 20%; padding: 1em;">
                            <span>Subtotal</span>
                            <span>IVA</span>
                            <br>
                            <span>Total</span>
                          </div>
                          <div class="border flex flex-col" style="width: 20%; padding: 1em; align-items: end">
                            <span style="margin-left: auto">${formatter.format((totalCotizacion).toFixed(2))}</span>
                            <span style="margin-left: auto">${formatter.format((totalCotizacion * 0.16).toFixed(2))}</span>
                            <br>
                            <span style="margin-left: auto"><b>${formatter.format((totalCotizacion * 1.16).toFixed(2))}</b></span>
                          </div>
                        </div>
                        <div class="border" style="font-size: 12px; word-wrap: break-word; padding: 1em">
                          Debo(emos) y pagare(emos) incondicionalmente por este pagaré a la orden de DAVID REMPEL KLASSEN Y MAYRA LETICIA ARAGÓN VÁZQUEZ en esta ciudad o en cualquier otro luger que se me(nos) requiera el pago a elección del acreedor la cantidad de: ${formatter.format((totalCotizacion * 1.16).toFixed(2))}, valor recibido a mí(nuestra) entera satisfacción, este pagaré está sujeto a la condición de que que, al no pagarse a su vencimiento hastsa el día de su liquidación, causará intereses moratorios al tipo de 3% mensual pagadero en esta ciudad juntamente con el principal.
                        </div>
                      </div>
                    </body>
                  `;
                }

                function generarVentanas2(ventanas) {
                  let resultado = '';
                  const formatter = new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN'
                  });
                  ventanas.forEach((ventana) => {
                    console.log(ventana.totalDescuento);
                    totalCotizacion += ventana.totalDescuento;

                    if (ventana.serie) {
                      resultado += `
                        <tr style="font-size: 14px">
                          <td class="text-center">
                            ${ventana.serie} - ${ventana.tipoVentana} - ${ventana.subtipoVentana} - ${ventana.ceja}
                          </td>
                          <td class="text-center">
                            ${ventana.tipoVidrio} - ${ventana.subtipoVidrio}
                          </td>
                          <td class="text-center">
                            ${ventana.dimensionAncho}" x ${ventana.dimensionAlto}"
                          </td>
                          <td class="text-center">
                            ${ventana.colorPrincipal}
                          </td>
                          <td class="text-center">
                            ${formatter.format(ventana.precio)}
                          </td>
                          <td class="text-center">
                            ${ventana.numeroVentanas}
                          </td>
                          <td class="text-center">
                            ${ventana.descuento}%
                          </td>
                          <td class="text-center">
                            ${formatter.format(ventana.totalDescuento)}
                          </td>
                        </tr>
                      `;
                    } else {
                      resultado += `
                        <tr style="font-size: 14px">
                          <td class="text-center">
                          </td>
                          <td class="text-center">
                          </td>
                          <td class="text-center">
                          </td>
                          <td class="text-center">
                            Pintura 
                            ${ventana.colorSubcolor}
                          </td>
                          <td class="text-center">
                            ${formatter.format(ventana.precio)}
                          </td>
                          <td class="text-center">
                            ${ventana.numeroVentanas}
                          </td>
                          <td class="text-center">
                            ${ventana.descuento}%
                          </td>
                          <td class="text-center">
                           ${formatter.format(ventana.totalDescuento)}
                          </td>
                        </tr>`;
                    }
                  });

                  return resultado;
                }

                const html = generarPDF(cotizacion);

                const ventana = window.open('', 'impresion',`width=${window.innerWidth - 200}, height=${window.innerHeight - 100}`);
                ventana.document.write(html);
                ventana.document.close();
                ventana.onload = function () {
                  setTimeout(() => {
                  }, 300);
                };
                ventana.addEventListener("afterprint", () => {
                  ventana.close();
                });
            
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
        },
        cache: false,
        contentType: false,
        processData: false
      });
    }
  </script>
