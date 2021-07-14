<?php

require_once "./controllers/controllerUsuario.php";
require_once "./models/modelUsuario.php";

?>
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
            $controller->ctrlistarUsuarios();
            $controller->ctrBorrarUsuario();
            ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</div>

</div>