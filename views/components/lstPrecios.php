<?php
session_start();

require_once "../../controllers/controllerPrecios.php";
require_once "../../models/modelPrecios.php";

if (!isset($_SESSION["nombre"])) {
  echo "<script>window.location.href = '../../index.php';</script>";
}

$preciosController = new PreciosController();
?>

<!DOCTYPE html>
<html lang="en">
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
                <h4>Precios</h4>
              </div>
              <div class="card-body">
                <table class="table display" id="tablaPrecios">
                  <thead>
                    <tr>
                      <th>Descripción</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                      $preciosController -> ctrListarPrecios();
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

  <?php
    // $preciosController = new PreciosController();
    // $preciosController -> ctrListarPrecios();
  ?>
  <script>
  $(document).ready(() => {
    $('#tablaPrecios').DataTable({
      ordering: false
    });
  });

  function mostrarCajaPrecio(idSpan, idText) {

    let timerIdentifier;

    const input = document.getElementById(idText);

    input.addEventListener('keyup', () => {
      clearTimeout(timerIdentifier);
      timerIdentifier = setTimeout(cambiarPrecio, 1000);
    });

    input.addEventListener('keydown', () => {
      clearTimeout(timerIdentifier);
    });


    let descripcionPrecio = '';

    document.getElementById(idSpan).style.display = 'none';
    input.style.display = 'block';
    input.focus();
    // console.log(document.getElementsByClassName('form-control'));
    const elementsText = document.getElementsByClassName('texto');
    const elementsTd = document.getElementsByClassName('descripcion');

    for (let i = 0; i < elementsText.length; i++) {
      const element = elementsText[i];
      if (element.id != idText) {
        element.style.display = 'none';
        element.onkeyup = undefined;
      } else {
        descripcionPrecio = elementsTd[i].innerText;
      }
    }

    const elementsSpan = document.getElementsByClassName('spanTexto');

    for (let i = 0; i < elementsSpan.length; i++) {
      const element = elementsSpan[i];
      if (element.id != idSpan) {
        element.style.display = 'inline';
      }
    }
    
    function cambiarPrecio() {
      document.getElementById(idSpan).innerText = input.value;

      const formData = new FormData();      
      formData.set('nuevoPrecio', input.value);
      formData.set('descripcion', descripcionPrecio);
      $.ajax({
        url: '../../controllers/cambiarPrecio.php',
        type: 'POST',
        data: formData,
        success: (response) => {
          if (response == 'success') {
            Swal.fire({
              title: 'Precio actualizado exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007BFF'
            });
          } else {
            Swal.fire({
              title: 'Error al actualizar el precio',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007BFF'
            });
          }
          input.style.display = 'none';
          document.getElementById(idSpan).style.display = 'inline';

         
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

  }
</script>
</body>
</html>