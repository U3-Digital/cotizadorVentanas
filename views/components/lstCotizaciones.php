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
  <link rel="stylesheet" href="../css/style.css" type="text/css" />
  <link rel="stylesheet" href="../../lib/vendor/sweetalert2/sweetalert2.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
  <script src="../../lib/vendor/sweetalert2/sweetalert2.min.js"></script>
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
                    <th scope="col">Tamaño</th>
                    <th scope="col">Vidrio</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Pintura</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Total</th>
                    <th scope="col">Borrar</th>
                  </thead>
                  <tbody>
                    <?php
                      $controllerCotizaciones = new CotizacionesController();
                      $controllerCotizaciones -> ctlListarCotizaciones();
                      // $controllerCotizaciones
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
</body>
</html>