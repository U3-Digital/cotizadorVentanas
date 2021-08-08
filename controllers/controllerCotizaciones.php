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
          window.location.href = 'inicio.php?action=lstCotizaciones';
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
          window.location.href = 'inicio.php?action=lstCotizaciones';
        });
        </script>";
      }
    }
  }
  public function ctrConsultarVentanasCotizacion($idConsulta){
    $resultado = CotizacionesModel::mdlBuscarVentanasDeCotizacion($idConsulta);
    return $resultado;
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
          <td>' . $cotizacion["fecha"] .'</td>
          <td>
            <button class="btn btn-success" onclick="mirarCotizacion(' . $cotizacion["idCotizacion"] . ')"><i class="fas fa-eye"></i></button>
            <button class="btn btn-danger" onclick="borrarCotizacion(' . $cotizacion["idCotizacion"] . ')"><i class="fas fa-trash"></i></button>
            <button class="btn btn-info" onclick="enviarCotizacion(' . $cotizacion["idCotizacion"] . ')"><i class="fas fa-paper-plane"></i></button>
            <button class="btn btn-secondary" onclick="generaaPDF(' . $cotizacion["idCotizacion"] . ')"><i class="fas fa-print"></i></button>
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

  public function ctrBuscarCotizacionPorId($idCotizacion) {
    $resultado = CotizacionesModel::mdlBuscarCotizacionPorId($idCotizacion);
    return $resultado;
  }

  public function ctrBuscarUltimaCotizacion() {
    $resultado = CotizacionesModel::mdlBuscarUltimaCotizacion();
    return $resultado["id"];
  }
}