<?php

class GeneralesController {
  public function uptActualizarCampo() {
    print_r($_POST);
  }

  public function ctrListarGenerales() {
    $generales = GeneralesModel::mdlListarGenerales();

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
              <input type="number" id="cajaPrecioDolar" name="cajaPrecioDolar" class="form-control" value="' . $general["precio_dolar"] . '">
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-12">
            <div class="form-group">
              <label>Incremento</label>
              <input type="number" id="cajaIncremento" name="cajaIncremento" class="form-control" value="' . $general["incremento"] . '">
            </div>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 col-12">
            <button class="btn btn-primary btn-block" type="submit"><i class="fas fa-redo"></i>&nbsp;Actualizar</button>
          </div>
        </div>
        </form>
      ';
    }

  }
}