<?php
require_once "controllers/controllerIngreso.php";
require_once "models/modelIngreso.php";
?>
<!DOCTYPE html>
<html dir="ltr" lang="en-US">

<head>

  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="author" content="U3Digital" />
  <!-- <link rel="shortcut icon" href="favicon.ico" /> -->

  <!-- Stylesheets
	============================================= -->
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
  <link rel="stylesheet" href="views/css/style.css" type="text/css" />
  <link rel="stylesheet" type="text/css" href="lib\vendor\adminlte\dist\css\adminlte.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Document Title
	============================================= -->
  <title>Cotizador</title>

</head>

<body>
  <div class="section nopadding nomargin" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; background-image: url('Assets/fondo.jpg'); background-size: cover;"></div>
  <div class="container h-100">
    <div class="row h-100 justify-content-center">
      <div class="col-md-6 col-lg-6 col-xl-6 col-10 my-auto">
        <div class="card p-3">
          <div class="card-header text-center border-0">
            <h4><b>Ingreso al sistema</b></h4>
          </div>
          <div class="card-body">
            <form method="POST">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="nombreUsuario">Nombre de usuario</label>
                    <input type="text" id="nombreUsuario" name="nombreUsuario" class="form-control" required>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="passwordUsuario">Contraseña:</label>
                    <input type="password" id="passwordUsuario" name="passwordUsuario" class="form-control" required>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text-center">
                  <button type="submit" class="btn btn-primary btn-block">Aceptar</button>
                </div>
              </div>

              <?php
              $ingreso = new ControllerIngreso();
              $ingreso->ctrIngresar();
              ?>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- External JavaScripts
	============================================= -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

</body>

</html>