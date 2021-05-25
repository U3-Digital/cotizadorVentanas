<?php

class CotizacionesController {

  public function ctrBorrarCotizacion() {
    if (isset($_GET["idBorrar"])) {
      $idBorrar = $_GET["idBorrar"];
      $resultado = CotizacionesModel::mdlBorrarCotizacion($idBorrar);
      
      if ($resultado === "success") {
        echo "<script>
        Swal.fire({
          title: 'Cotización borrada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd'
        }).then((value) => {
          window.location.href = 'lstCotizaciones.php';
        });
        </script>";
      } else {
        echo "<script>
        Swal.fire({
          title: 'Error al borrar la cotizacion',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd'
        }).then((value) => {
          window.location.href = 'lstCotizaciones.php';
        });
        </script>";
      }
    }
  }

  public function ctrAgregarCotizacion($datosController) {
    $resultado = CotizacionesModel::mdlAgregarCotizacion($datosController);
    return $resultado;
  }

  public function ctrListarCotizaciones() {
    $cotizaciones = CotizacionesModel::mdlListarCotizaciones();

    foreach ($cotizaciones as $cotizacion) {
      $ventana = json_decode($cotizacion["ventana"], true);

      $subcolor = "";

      if (isset($ventana["colorSubcolor"])) {
        $subcolor = $ventana["colorSubcolor"];
      }

      echo '
        <tr>
          <td>' . $cotizacion["cliente"] . '</td>
          <td>' . $ventana["dimensionAncho"] . "x" . $ventana["dimensionAlto"] . '</td>
          <td>' . $ventana["tipoVidrio"] . ' ' . $ventana["subtipoVidrio"] . '</td>
          <td>' . $ventana["tipoVentana"] . ' ' . $ventana["subtipoVentana"] . '</td>
          <td>' . $ventana["colorPrincipal"] . ' ' . $subcolor .'</td>
          <td>' . $ventana["numeroVentanas"] . '</td>
          <td>' . $ventana["precio"] . '</td>
          <td>' . $ventana["total"] . '</td>
          <td>
            <button class="btn btn-danger" onclick="borrarCotizacion(' . $cotizacion["idCotizacion"] . ')"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      ';
    }

    if (sizeof($cotizaciones) === 0) {
      echo '<tr>
        <td colspan="9" class="text-center">No se encontraron cotizaciones</td>
      </tr>';
    }
  }
}