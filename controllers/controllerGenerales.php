<?php

class GeneralesController {
  public function ctrActualizarCampo() {
    if (isset($_POST["id"])) {
      $datosController = array(
        "id" => $_POST["id"],
        "precioDolar" => $_POST["cajaPrecioDolar"],
        "incremento" => $_POST["cajaIncremento"]
      );

      $respuesta = GeneralesModel::mdlActualizarCampo($datosController);
      if ($respuesta === "success") {
        echo "
          <script>
            Swal.fire({
              title: 'Actualización exitosa',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0d6efd'  
            }).then(() => {
              window.location.href = 'inicio.php?action=lstGenerales';  
            });
          </script>
        ";
      } else {
        echo "
          <script>
            Swal.fire({
              title: 'Error al actualizar',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0d6efd'  
            });
          </script>
        ";
      }
    }
  }

  public function ctrListarGenerales() {
    $generales = GeneralesModel::mdlListarGenerales();

    $i = 0;
    foreach ($generales as $general) {
      echo '
      <form method="POST">
        <div class="row">
          <div class="col-md-2 col-lg-2 col-xl-2 col-12 d-flex align-items-center justify-content-center">
            <span>' . $general["id"] . '</span>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-12">
            <div class="form-group">
              <label>Precio del dólar</label>
              <input type="number" id="cajaPrecioDolar" name="cajaPrecioDolar" class="form-control" value="' . $general["precio_dolar"] . '" step="0.01">
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-12">
            <div class="form-group">
              <label>Incremento</label>
              <input type="number" id="cajaIncremento" name="cajaIncremento" class="form-control" value="' . $general["incremento"] . '">
            </div>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 col-12 d-flex align-items-center">
            <button class="btn btn-primary btn-block mt-3" type="submit"><i class="fas fa-redo"></i>&nbsp;Actualizar</button>
          </div>
        </div>
        <input id="id" name="id" type="text" value="' . $general["id"] . '" hidden/>
        </form>
      ';
      $i++;
    }
  }
}