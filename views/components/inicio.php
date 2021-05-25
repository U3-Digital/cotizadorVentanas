<?php
session_start();
if(!isset($_SESSION["nombre"])){
  echo "<script>window.location.href = '../../index.php'; </script>";
}
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
  <link rel="stylesheet" href="../../lib/vendor/bootstrap/css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" type="text/css" href="../../lib\vendor\adminlte\dist\css\adminlte.min.css">
  <link rel="stylesheet" type="text/css" href="../css/sb-admin.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/styleStepper.css">
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>

  <script src="../../lib/vendor/datatables/jquery.dataTables.js"></script>
  <script src="../../lib/vendor/datatables/dataTables.bootstrap4.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/style.css" type="text/css" />


  <title>Cotizador</title>
</head>

<body>
  <div style="display: flex; flex-flow: column; height: 100%">
    <?php
    include './topbar.php';

    ?>

    <div class="d-flex" style="flex-grow: 1; flex-direction: row;">

      <?php
      include "./menu.php";


      ?>

      <div class="m-4 w-100 d-flex" style="flex-grow: 1; flex-direction: column;">
        <?php include "./stepper.php"; ?>
        <div class="row justify-content-center">
          <div class="col">
            <div class="card">
              <div class="card-header border-0">
                <h4>Cotización</h4>
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
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- <div class="container-fluid borde"></div> -->




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

    <script>
      const cuerpoTabla = document.getElementById('cuerpo-tabla');
      function cargarTabla() {
        cuerpoTabla.innerHTML = '';
        let i = 0;
        cotizaciones.forEach((cotizacion) => {
          console.log(cotizacion);
          cuerpoTabla.innerHTML +=
            `<tr>
            <td>${cotizacion.dimensionAlto}" x ${cotizacion.dimensionAncho}"</td>
            <td>${cotizacion.tipoVidrio} ${cotizacion.subTipoVidrio}</td>
            <td>${cotizacion.tipoVentana} ${cotizacion.subTipoVentana}</td>
            <td>${cotizacion.colorPrincipal} ${cotizacion.colorSubcolor ? cotizacion.colorSubcolor : ''}</td>
            <td>${cotizacion.numeroVentanas}</td>
            <td>${cotizacion.precio}</td>
            <td>${cotizacion.total}</td>
        </tr>
        `;
          i++;
        });
      }

      function borrarCotizacion(index) {
        cotizaciones.splice(index, 1);
        cargarTabla();
      }
    </script>
</body>

</html>