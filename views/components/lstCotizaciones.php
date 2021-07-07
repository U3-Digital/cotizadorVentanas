<?php
session_start();
require_once "../../controllers/controllerCotizaciones.php";
require_once "../../models/modelCotizaciones.php";

if (!isset($_SESSION["nombre"])) {
  echo "<script>window.location.href = '../../index.php'; </script>";
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="author" content="U3Digital" />
  <!-- <link rel="shortcut icon" href="favicon.ico" /> -->

  <!-- Stylesheets
============================================= -->
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="../../lib/vendor/bootstrap/css/bootstrap.css" type="text/css" />

  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  

  <link rel="stylesheet" href="../css/style.css" type="text/css" />
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Document Title
============================================= -->
  <title>Cotizador</title>
</head>
<body>
  <div style="display: flex; flex-flow: column; height: 100%">
    <?php
      include "./topbar.php";
    ?>

    <div class="d-flex" style="flex-grow: 1">
      <?php
        include "./menu.php";
      ?>
      <div class="m-4 w-100 d-flex" style="flex-grow: 1; flex-direction: column;">
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
    </div>

  </div>
  <script>
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
          window.location.href = `lstCotizaciones.php?idBorrar=${idCotizacion}`;
        }
      });
    }

    function mirarCotizacion(idCotizacion){
      const formData = new FormData();
      formData.set('id', idCotizacion);
      $.ajax({
        url: '../../controllers/consultarVentanasCotizacion.php',
        type: 'POST',
        data: formData,
        success: (data) => {
          const ventanas = JSON.parse(JSON.parse(data).ventana);
          console.log(ventanas);
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
</body>
</html>