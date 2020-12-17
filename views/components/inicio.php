<?php
session_start();
/* if(!$_SESSION["validar"]){

	// print_r($_SESSION);
	header("location:../../index.php");
	exit();
}
 */

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
  <link rel="stylesheet" href="../../lib/vendor/sweetalert2/sweetalert2.min.css">
  <link rel="stylesheet" href="../css/styleStepper.css">
  <script src="../../lib/vendor/sweetalert2/sweetalert2.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>

  <script src="../../lib/vendor/datatables/jquery.dataTables.js"></script>
  <script src="../../lib/vendor/datatables/dataTables.bootstrap4.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/style.css" type="text/css" />


  <title>Cotizador</title>
</head>

<body class="">
  <?
    include './topbar.php';
  ?>
  <div class="container-fluid">
    
    <?php
    include './stepper.php';
    ?>
    <br>
    <br><br><br>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-8 col-12">
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
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Total</th>
                <th scope="col" style="width: 7em;" class="text-center">Borrar</th>
              </thead>
              <tbody id="cuerpo-tabla">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
  <script src="../../lib/vendor/bootstrap/js/bootstrap.js"></script>
  <!-- <script type="text/javascript" src="../../lib/vendor/adminlte/dist/js/adminlte.js"></script> -->
  <script type="text/javascript" src="../js/sb-admin.min.js"></script>

  <script>
    const cuerpoTabla = document.getElementById('cuerpo-tabla');

    function cargarTabla() {
      cuerpoTabla.innerHTML = '';
      let i = 0;
      cotizaciones.forEach((cotizacion) => {
        cuerpoTabla.innerHTML += 
        `<tr>
            <td>${cotizacion.dimensionAlto}" x ${cotizacion.dimensionAncho}"</td>
            <td>${cotizacion.tipoVidrio} ${cotizacion.subTipoVidrio}</td>
            <td>${cotizacion.tipoVentana} ${cotizacion.subTipoVentana}</td>
            <td>${cotizacion.numeroVentanas}</td>
            <td>$0</td>
            <td>$0</td>
            <td class="text-center"><button class="btn btn-danger" onclick="borrarCotizacion(${i});"><i class="fas fa-trash"></i></button></td>
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