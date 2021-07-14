<?php

require_once "./controllers/controllerUsuario.php";
require_once "./models/modelUsuario.php";

$idEdita = $_GET["idEditar"];
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
