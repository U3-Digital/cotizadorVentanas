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
    function generaPDF(cotizacion){
      const formData = new FormData();
      formData.set('id',cotizacion);
      $.ajax({
              url: './controllers/obtenerCotizacion.php',
              type: 'POST',
              data: formData,
              success: (data) => {
                const cotizacion = JSON.parse(data);

                let totalCotizacion = 0;

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
                                          <td>${cotizacion.cliente}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.cliente}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.cliente}</td>
                                        </tr>
                                        <tr>
                                          <td>${cotizacion.cliente}</td>
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
                                      ${generarVentanas(cotizacion.ventana)}
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
                            <span style="margin-left: auto">$${(totalCotizacion).toFixed(2)}</span>
                            <span style="margin-left: auto">$${(totalCotizacion * 0.16).toFixed(2)}</span>
                            <br>
                            <span style="margin-left: auto"><b>$${(totalCotizacion * 1.16).toFixed(2)}</b></span>
                          </div>
                        </div>
                        <div class="border" style="font-size: 12px; word-wrap: break-word; padding: 1em">
                          Debo(emos) y pagare(emos) incondicionalmente por este pagaré a la orden de DAVID REMPEL KLASSEN Y MAYRA LETICIA ARAGÓN VÁZQUEZ en esta ciudad o en cualquier otro luger que se me(nos) requiera el pago a elección del acreedor la cantidad de: ${(totalCotizacion * 1.16).toFixed(2)}, valor recibido a mí(nuestra) entera satisfacción, este pagaré está sujeto a la condición de que que, al no pagarse a su vencimiento hastsa el día de su liquidación, causará intereses moratorios al tipo de 3% mensual pagadero en esta ciudad juntamente con el principal.
                        </div>
                      </div>
                    </body>
                  `;
                }

                function generarVentanas(ventana) {
                  let resultado = '';
                  ventanas.forEach((ventana) => {
                    totalCotizacion += ventana.total;

                    if (ventana.serie) {
                      resultado += `
                        <tr style="font-size: 14px">
                          <td class="text-center">
                            ${ventana.serie} - ${ventana.subtipoVentana} - ${ventana.subtipoVentana} - ${ventana.ceja}
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
                            $${ventana.precio}
                          </td>
                          <td class="text-center">
                            ${ventana.numeroVentanas}
                          </td>
                          <td class="text-center">
                            ${ventana.descuento}
                          </td>
                          <td class="text-center">
                            $${ventana.total}
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
                            $${ventana.precio}
                          </td>
                          <td class="text-center">
                            ${ventana.numeroVentanas}
                          </td>
                          <td class="text-center">
                          </td>
                          <td class="text-center">
                           $${ventana.total}
                          </td>
                        </tr>`;
                    }
                  });

                  return resultado;
                }

                const html = generarPDF(cotizacion);

               /*  let html = `
                  <img alt="" style="display:block;max-width:100%;margin-right:auto;width:122px;height:37px" height="37" src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big-176x55.png" class="CToWUd">
                  <p>Cliente: <span><b>${cotizacion.cliente}</b></span></p>
                  <p>Adjuntamos su cotización</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                    <thead>
                        <tr>
                            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Tipo ventana</th>
                            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Tipo vidrio</th>
                            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Dimensión</th>
                            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Color</th>
                            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Precio</th>
                            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Cantidad</th>
                            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                let total=0;
                ventanas.map(cotizacion => {
                  total += cotizacion.total;
                  if(!cotizacion.subtipoVentana && cotizacion.colorSubcolor){
                    html += `
                      <tr>
                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"></td>
                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"></td>
                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"> </td>
                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.colorSubcolor}</td>
                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.precio}</td>
                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.numeroVentanas}</td>
                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.total}</td>
                      </tr>
                    `;
                  }else{
                    html += `
                      <tr>
                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.tipoVentana} </td>
                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.tipoVidrio}</td>
                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.dimensionAlto} x ${cotizacion.dimensionAncho}</td>
                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.colorPrincipal}</td>
                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.precio}</td>
                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.numeroVentanas}</td>
                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">${cotizacion.total}</td>
                      </tr>
                    `;
                  }
                })
                html += `
                </tbody>
                </table><hr>
                <div style= "text-align: justify; -moz-text-align-last: right; text-align-last: right;">
                <p><b>Total: </b>${total}</p>
                </div>`; */


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
              console.log(cuerpoCorreo);
            
              const formCorreo = new FormData();
              formCorreo.append('correo', correo);
              formCorreo.append('cuerpoCorreo', cuerpoCorreo);


              fetch('./controllers/solicitarEnvioDeCorreo.php', {
                method: 'POST',
                body: formCorreo,
              }).then((response) => {
                console.log(response);
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

            /* $.ajax({
              url: './controllers/solicitarEnvioDeCorreo.php',
              type: 'POST',
              data: formData,
              success: (data) => {
                if (data == 'success') {
                  Swal.fire({
                    title: 'Correo enviado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                  });
                } else {
                  Swal.fire({
                    title: 'Error al enviar la cotización',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                  });
                }
              },
              error: (error) => {
                console.log(error);
              },
              complete: () => {
              },
              cache: false,
              contentType: false,
              processData: false
            }); */
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
          const ventanas = JSON.parse(JSON.parse(data).ventana);
          /*
            <div class=\"row mt-4\">
              <div class=\"col\">
                <h3>Cotizacion</h3>
                <p>Favor de guardar la siguiente información tomando una captura de pantalla</p>
                <p>Nombre: <span style=\"color: #7E9680\"><b>" . $datosController["nombre"] . "</b></span></p>
                <p>Número de boleto: <span style=\"color: #7E9680\"><b>" . $this -> generarNumeroReal(str_split(strval($noBoleto))) . "</b></span></p>
                <p>Oportunidades:</p>
                " . $this -> generarOportunidades($noBoleto) . "
                <p>Costo del boleto: <b>$<span>" . $sorteo["costoBoleto"] . "</span></b></p>
                <hr>
                <p>Debes realizar tu pago y enviar tu comprobante por WhatsApp</p>
                <p>Efrén Olivas Miranda</p>
                <p><img style=\"height: 14px\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/1920px-BBVA_2019.svg.pn\g\">&nbsp;Tarjeta: 4152 3138 0752 3639</p>
                <p>Zayra Yvonne García Loya</p>
                <p><img style=\"height: 14px\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/1920px-BBVA_2019.svg.pn\g\">&nbsp;Tarjeta: 4152 3137 0599 6150</p>
              </div> 
            </div>
          */
          let total = 0;
          let html = `
            <div class=\"row mt-4\">
              <div class=\"col\">
                <h3>Cotizacion</h3>
          `;
          ventanas.map(ventana => {
            total += ventana.total;
            if(!ventana.subtipoVentana && ventana.colorSubcolor){
              html += `
                <p>Pintura: <span><b>${ventana.colorSubcolor}</b></span></p>
                <p>Total: <span><b>${ventana.total}</b></span></p>
                <hr>
              `
            }else{  
              html += `
                <p>Tipo de ventana: <span><b>${ventana.subtipoVentana}</b></span></p>
                <p>Tipo de vidrio: <span><b>${ventana.tipoVidrio} ${ventana.subtipoVidrio}</b></span></p>
                <p>dimensión: <span><b>${ventana.dimensionAlto} x ${ventana.dimensionAncho}</b></span></p>
                <p>Color: <span><b>${ventana.colorPrincipal}</b></span> ${ventana.colorSubcolor ? (` Subcolor: <span><b>${ventana.colorSubcolor}</b></span>`) :("")}</p>
                <p>Total: <span><b>${ventana.total}</b></span></p>
                <hr>
              `;
            }
            
          });

          html += `
            <p>Total cotización: <span ><b>${total}</b></span></p>
            </div> 
          </div>
          `;

          Swal.fire({
            html: html,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#007BFF'
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
