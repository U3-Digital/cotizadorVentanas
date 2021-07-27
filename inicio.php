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
  <!-- <link rel="shortcut icon" href="favicon.ico" /> -->

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
        <!-- <br>
        <div class="row justify-content-center">
          <div class="col">
            <div class="card">
              <div class="card-header border-0">
                <h4>Cotización</h4>
              </div>
              <div class="row mx-4 mt-4">
                <input type="text" name="cajaNombreCliente" id="cajaNombreCliente" class="form-control" placeholder="Nombre del cliente">
              </div>
              <div class="card-body">
                <table class="table bg-white table-bordered table-hover">
                  <thead>
                    <th scope="col">Tamaño</th>
                    <th scope="col">Vidrio</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Pintura</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Total</th>
                  </thead>
                  <tbody id="cuerpo-tabla">
                  </tbody>
                </table>
                <div class="row" id="container-save-cotizacion" hidden>
                  <div class="col-4"></div>
                  <div class="col-md-4 col-lg-4 col-xl-4 col-4">
                    <button class="btn btn-block btn-primary" onclick="enviarCorreo()"> <i class="fas fa-paper-plane"></i>&nbsp;Enviar cotizacion por correo</button>
                  </div>
                  <div class="col-4">
                    <button class="btn btn-block btn-primary" onclick="insertarCotizacion()">Guardar Cotizacion</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        
      </div>
    </div>

    <!-- <div class="container-fluid borde"></div> -->




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

    <script>
      const cuerpoTabla = document.getElementById('cuerpo-tabla');

      function enviarCorreo(){
        console.log(cotizaciones.length);
        if(cotizaciones.length == 0){
          Swal.fire({
            title: 'No hay ninguna cotizacion para enviar',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d6efd'
          });
          return;
        }

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
            const formData = new FormData();
            formData.set('correo', correo);
            formData.set('cotizaciones', JSON.stringify(cotizaciones));
            formData.set('nombre',document.getElementById("cajaNombreCliente").value);
            $.ajax({
              url: './controllers/enviarCorreo.php',
              type: 'POST',
              data: formData,
              success: (data) => {
                console.log(data);
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
                console.log('Completado');
              },
              cache: false,
              contentType: false,
              processData: false
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        })
      }

      function generaPdf(){
        let html = `
        <img alt="" style="display:block;max-width:100%;margin-right:auto;width:122px;height:37px" height="37" src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big-176x55.png" class="CToWUd">
          <p>Cliente: <span><b>${document.getElementById("cajaNombreCliente").value}</b></span></p>
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
        cotizaciones.map(cotizacion => {
          total += cotizacion.total;
          if(!cotizacion.subTipoVentana && cotizacion.colorSubcolor){
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
        </div>`

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
        cotizaciones.forEach((cotizacion) => {
          //console.log(cotizacion);

          cuerpoTabla.innerHTML +=
            `<tr>
            <td>${cotizacion.dimensionAlto ? (`${cotizacion.dimensionAlto}" x ${cotizacion.dimensionAncho}"`) :('')} </td>
            <td>${cotizacion.tipoVidrio ? (`${cotizacion.tipoVidrio} ${cotizacion.subTipoVidrio}`) : ('') }</td>
            <td>${cotizacion.tipoVentana ? (`${cotizacion.tipoVentana} ${cotizacion.subTipoVentana}`) : ('')} </td>
            <td>${cotizacion.colorPrincipal ? (`${cotizacion.colorPrincipal}`) : ('')} ${cotizacion.colorSubcolor ? cotizacion.colorSubcolor : ''}</td>
            <td>${cotizacion.numeroVentanas ? (`${cotizacion.numeroVentanas}`) : ('1')}</td>
            <td>${cotizacion.precio}</td>
            <td>${cotizacion.total}</td>
        </tr>
        `;
          totalFinal += cotizacion.total;
          i++;
        });
        const formatter = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        });
        
        labelTotal.innerHTML = `${formatter.format(totalFinal)}`;
      }

      
    </script>
</body>

</html>