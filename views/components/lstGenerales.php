<?php
require_once "./controllers/controllerGenerales.php";
require_once "./models/modelGenerales.php";

$controllerGenerales = new GeneralesController();
?>

<div class="row justify-content-center">
  <div class="col">
    <div class="card">
      <div class="card-header border-0">
        <h4>Generales</h4>
      </div>
      <div class="card-body">
        <?php
          $controllerGenerales -> ctrListarGenerales();
          $controllerGenerales -> ctrActualizarCampo();
        ?>
      </div>
    </div>
  </div>
</div>