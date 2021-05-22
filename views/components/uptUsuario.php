<?php
session_start();

require_once "../../controllers/controllerUsuario.php";
require_once "../../models/modelUsuario.php";
if(!isset($_SESSION["nombre"])){
    echo "<script>window.location.href = '../../index.php'; </script>";
}
$idEdita= $_GET["idEditar"];
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
    include './topbar.php';

    ?>

    <div class="d-flex" style="flex-grow: 1;">
    <?php
      include "./menu.php"

      ?>
<div class="content-wrapper p-5">
    <div class="container-fluid">
        <ol class="breadcrumb ">
            <li class="breadcrumb-item">
                <a href="#">Administrador</a>
            </li>
            <li class="breadcrumb-item">Registro de usuario</li>
        </ol>


        <div class="row ">
            <div class="col-md-12">

                <div class="card">
                    <form method="POST" name="forma">
                        <?php 

                        $controller = new ControllerUsuario();
                        
                        $controller -> ctrBuscarUsuario($idEdita);

                        $controller -> ctrActualizaUsuario($idEdita);

                        ?>

                    </form>

                </div>

            </div>
        </div>

    </div>
</div>

</div>
  </div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="../../lib/vendor/bootstrap/js/bootstrap.js"></script>

</body>
</html>