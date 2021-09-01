<?php
session_start();

if(!isset($_SESSION["nombre"])){
  echo "<script>window.location.href = '../../index.php'; </script>";
}

require_once "./controllers/controllerEnlaces.php";
require_once "./models/modelEnlaces.php";

?>

<!DOCTYPE html>
<html>

<head dir="ltr" lang="en-US">

  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="author" content="CMStudio" />
  <link rel="shortcut icon" href="favicon.ico" />

  <!-- Stylesheets
	============================================= -->
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="./lib/vendor/bootstrap/css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous">
  <link rel="stylesheet" href="./views/css/styleStepper.css">
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>

  <script src="./lib/vendor/datatables/jquery.dataTables.js"></script>
  <script src="./lib/vendor/datatables/dataTables.bootstrap4.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
  <link rel="stylesheet" href="./views/css/style.css" type="text/css" />


  <title>Cotizador</title>
</head>

<body>
  <div style="display: flex; flex-flow: column; height: 100%">
    <?php
    include './views/components/topbar.php';
    ?>

    <div class="d-flex" style="flex-grow: 1; flex-direction: row;">
      <?php
      include "./views/components/menu.php";
      ?>

      <div class="m-4 w-100 d-flex" style="flex-grow: 1; flex-direction: column;">
        <?php 
          $enlacesController = new EnlacesController();
          $enlacesController -> ctrEnlaces();
        #include "./stepper.php"; 
        ?>
        
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <script src="./views/js/generarCuerpoCorreo.js"></script>
    <script src="./views/js/letras.js"></script>

    <script>
      const cuerpoTabla = document.getElementById('cuerpo-tabla');
      const cajaNombreCliente = document.getElementById('cajaNombreCliente');

      async function enviarCorreo() {
        console.log(cotizaciones.length);
        if(cotizaciones.length === 0) {
          Swal.fire({
            title: 'No hay ninguna cotizacion para enviar',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d6efd'
          });
          return;
        }
        console.log(!cajaNombreCliente.value);
        if (!cajaNombreCliente.value) {
          Swal.fire({
            title: 'No hay ningún nombre para el cliente',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d6efd'
          });
          return;
        }

        const direccion = document.getElementById('cajaDireccionCliente').value;
        const codigoPostal = document.getElementById('cajaCodigoPostalCliente').value;
        const RFC = document.getElementById('cajaRFCCliente').value;

        const folio = await ( await fetch('./controllers/consultarUltimaCotizacion.php', {
          method: 'GET'
        })).json();

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
            const cotizacion = {
              cliente: cajaNombreCliente.value,
              direccion,
              codigoPostal,
              RFC,
              fecha: generarFecha(),
              ventana: cotizaciones,
              idCotizacion: folio.id + 1
            };
            
            const cuerpoCorreo = generarCorreo(cotizacion);

            const formCorreo = new FormData();
            formCorreo.append('correo', correo);
            formCorreo.append('cuerpoCorreo', cuerpoCorreo)


            fetch('./controllers/solicitarEnvioDeCorreo.php', {
              method: 'POST',
              body: formCorreo
            }).then((response) => response.json()).then((data) => {
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
            })
          },
          allowOutsideClick: () => !Swal.isLoading()
        })
      }

      async function generaPdf () {
        
        if (!cajaNombreCliente.value) {
          Swal.fire({
            title: 'Rellene los datos faltantes',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d6efd'
          });
          return;
        }

        const direccion = document.getElementById('cajaDireccionCliente').value;
        const codigoPostal = document.getElementById('cajaCodigoPostalCliente').value;
        const RFC = document.getElementById('cajaRFCCliente').value;

        const formatter = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        });

        let totalCotizacion = 0;

        const folio = await ( await fetch('./controllers/consultarUltimaCotizacion.php', {
          method: 'GET'
        })).json();

        const cotizacion = {
          fecha: generarFecha(),
          ventanas: cotizaciones,
          cliente: cajaNombreCliente.value,
          direccion,
          codigoPostal,
          RFC,
          idCotizacion: folio.id + 1
        };

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
                              ${generarVentanas(cotizacion.ventanas)}
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
                  Debo(emos) y pagare(emos) incondicionalmente por este pagaré a la orden de DAVID REMPEL KLASSEN Y MAYRA LETICIA ARAGÓN VÁZQUEZ en esta ciudad o en cualquier otro luger que se me(nos) requiera el pago a elección del acreedor la cantidad de: ${(totalCotizacion * 1.16).toFixed(2)}, valor recibido a mí(nuestra) entera satisfacción, este pagaré está sujeto a la condición de que que, al no pagarse a su vencimiento hastsa el día de su liquidación, causará intereses moratorios al tipo de 3% mensual pagadero en esta ciudad juntamente con el principal.
                </div>
              </div>
            </body>
          `;
        }

        function generarVentanas(ventanas) {
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
      }

      function cargarTabla() {
        cuerpoTabla.innerHTML = '';
        let i = 0;
        let totalFinal = 0;
        let labelTotal = document.getElementById('totalCotizaciones');
        const formatter = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        });

        cotizaciones.forEach((cotizacion) => {
          console.log(cotizacion);
          //console.log(cotizacion);
          cuerpoTabla.innerHTML +=
            `<tr>
            <td>${cotizacion.dimensionAlto ? (`${cotizacion.dimensionAlto}" x ${cotizacion.dimensionAncho}"`) :('')} </td>
            <td>${cotizacion.tipoVidrio ? (`${cotizacion.tipoVidrio} ${cotizacion.subtipoVidrio}`) : ('') }</td>
            <td>${cotizacion.tipoVentana ? (`${cotizacion.tipoVentana} - ${cotizacion.subtipoVentana}`) : ('')} ${cotizacion.ceja ? ('-' + cotizacion.ceja) : ''}</td>
            <td>${cotizacion.colorPrincipal ? (`${cotizacion.colorPrincipal}`) : ('')} ${cotizacion.colorSubcolor ? cotizacion.colorSubcolor : ''}</td>
            <td>
              <input class="form-control" id="cantidad-${i}" type="number" value="${cotizacion.numeroVentanas ? (`${cotizacion.numeroVentanas}`) : ('1')}"  onchange="cambiarCantidadDeIndex(event)" onkeyup="cambiarCantidadDeIndex(event)">
            </td>
            <td>${formatter.format(cotizacion.precio)}</td>
            <td>
              <input class="form-control" id="descuento-${i}" type="number" value="0" onchange="cambiarDescuentoDeIndex(event)" onkeyup="cambiarDescuentoDeIndex(event)" step="0.01">
            </td>
            <td id="total-${i}">${formatter.format(cotizacion.total)}</td>
            <td class="text-center">
              ${ cotizacion.tipoVentana ? `<button index="${i}" onclick="borrarCotizacion(event)" class="btn btn-danger fas fa-trash"></button>` : '' }
            </td>
        </tr>
        `;
          totalFinal += cotizacion.total;
          i++;
        });
        
        labelTotal.innerHTML = `${formatter.format(totalFinal)}`;
      }

      function recalcularTotal() {
        let t = 0;
        cotizaciones.forEach((cotizacion) => {
          t += cotizacion.totalDescuento;
        });

        const formatter = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        });

        document.getElementById('totalCotizaciones').innerHTML = `${formatter.format(t)}`;
      }

      
      function generarFecha() {
        const fecha = new Date(Date.now());

        let fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1 < 10 ? '0' : ''}${fecha.getMonth() + 1}-${fecha.getDate() < 10 ? '0': '' }${fecha.getDate()}`;
        
        return fechaFormateada;
        
      }

      function cambiarDescuentoDeIndex(event) {
        const index = event.target.id.split('-')[1];
        const value = event.target.value;

        if (!value) {
          event.target.value = 0;
        } if (value > 100) {
          event.target.value = 100;
        } else if (value < 0) {
          event.target.value = 0;
        }

        const formatter = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        });

        if (value) {
          cotizaciones[index].descuento = value;
          // cotizaciones[index].totalDescuento = cotizaciones[index].total - (cotizaciones[index].total * value) / 100;
          calcularTotalDeCotizacion(index);

        }
      }

      function cambiarCantidadDeIndex(event) {
        const index = event.target.id.split('-')[1];
        const value = event.target.value;

        if (value.includes('.')) {
          event.target.value = value.split('.')[0];
        }

        const formatter = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        });

        if (value) {
          if (value > 0) {
            cotizaciones[index].numeroVentanas = value;
          } else {
            cotizaciones[index].numeroVentanas = 1;
            event.target.value = 1;
          }
          calcularTotalDeCotizacion(index);
        }
      }

      function calcularTotalDeCotizacion(index) {

        const formatter = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        });

        cotizaciones[index].totalDescuento = (cotizaciones[index].numeroVentanas * cotizaciones[index].precio);
        cotizaciones[index].totalDescuento = cotizaciones[index].totalDescuento - (cotizaciones[index].totalDescuento * cotizaciones[index].descuento) / 100;

        document.getElementById(`total-${index}`).innerHTML = formatter.format(cotizaciones[index].totalDescuento);
        recalcularTotal();
      }

      function borrarCotizacion(event) {
        const index = event.target.getAttribute('index');
        const cotizacion = cotizaciones[index];
        if (cotizacion.colorSubcolor) {
          cotizaciones.splice(index, 2);
        } else {
          cotizaciones.splice(index, 1);
        }
        // console.log(cotizaciones[index]);
        cargarTabla();
      }

    </script>
</body>

</html>