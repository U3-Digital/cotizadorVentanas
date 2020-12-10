<?php

class ControllerIngreso {
    public function ctrIngresar() {
        if (isset($_POST["nombreUsuario"])) {
            header("location:views/components/inicio.php");
        }
    }
}
