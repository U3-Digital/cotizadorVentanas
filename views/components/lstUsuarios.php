<?php
session_start();

require_once "../../controllers/controllerUsuario.php";
require_once "../../models/modelUsuario.php";
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
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>

<script src="../../lib/vendor/datatables/jquery.dataTables.js"></script>
<script src="../../lib/vendor/datatables/dataTables.bootstrap4.js"></script>

<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="../../lib/vendor/bootstrap/css/bootstrap.css" type="text/css" />
<link rel="stylesheet" href="../css/style.css" type="text/css" />
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
<meta name="viewport" content="width=device-width, initial-scale=1" />

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
        <div class="row justify-content-center">
          <div class="col">
            <div class="card">
              <div class="card-header border-0">
                <h4>Usuarios</h4>
              </div>
              <div class="card-body">
                <table class="table bg-white table-bordered table-hover">
                  <thead>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </thead>
                  <tbody id="cuerpo-tabla">
                    <?php
                        $controller = new ControllerUsuario;
                        $controller -> ctrlistarUsuarios();
                        $controller -> ctrBorrarUsuario();
                    ?>
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
</body>

</html>