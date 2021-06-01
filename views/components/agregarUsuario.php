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

<head>

  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="author" content="U3Digital" />
  <!-- <link rel="shortcut icon" href="favicon.ico" /> -->

  <!-- Stylesheets
============================================= -->
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="../../lib/vendor/bootstrap/css/bootstrap.css" type="text/css" />
  
  <link rel="stylesheet" href="../css/style.css" type="text/css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-10">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="cajaNombres">Nombre:</label>
                              <input class="form-control" type="text" required placeholder="Nombre(s)" id="cajaNombres" name="cajaNombres">
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="cajaApellidos">Apellidos:</label>
                              <input class="form-control" type="text" required placeholder="Apellidos" id="cajaApellidos" name="cajaApellidos">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="cajaEmail">Correo electrónico:</label>
                              <input class="form-control" type="email" required placeholder="Correo electrónico" id="cajaEmail" name="cajaEmail">
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="cajaPassword">Contraseña:</label>
                              <input class="form-control" type="password" required placeholder="Contraseña" id="cajaPassword" name="cajaPassword">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <img class="img-profile" src="../../img/user.png" alt="Seleccionar foto de perfil">
                        <input name="inputFile" type="file" hidden>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-5">
                        <div class="form-group">
                          <label for="selectRol">Rol:</label>
                          <select required class="form-control" id="selectRol" name="selectRol">
                            <option value="" selected>Rol</option>
                            <option value="0">Administrador</option>
                            <option value="1">Usuario</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-5">
                        <div class="form-group">
                          <label for="selectActivo">Activo:</label>
                          <select required class="form-control" id="selectActivo" name="selectActivo">
                            <option value="" selected>Activo</option>
                            <option value="S">Sí</option>
                            <option value="N">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <!-- 
                                <div class="col-md-4">
                                </div> -->

                      <div class="col-md-12 text-center">
                        <button type="submit" name="submit" class="btn btn-primary" style="min-width: 10em;" value="aceptar">Aceptar</button>
                      </div>
                    </div>
                  </div>

                  <?php

                  $controller = new ControllerUsuario();

                  // print_r($_POST);

                  $controller->ctrCrearUsuario();

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