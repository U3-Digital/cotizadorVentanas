<?php

class ControllerIngreso {
    public static function ctrIngresar() {
        if (isset($_POST["nombreUsuario"])) {
            $datosController = array(
                "nombreUsuario" => $_POST["nombreUsuario"],
                "passwordUsuario" => $_POST["passwordUsuario"]
            );
        

            $respuesta = ModelIngreso::mdlIngresar($datosController);
            if ($_POST["nombreUsuario"] === $respuesta["email"] && password_verify($_POST["passwordUsuario"], $respuesta["password"]) && $respuesta["activo"] === "S") {
                session_start();

                $_SESSION["validar"] = true;
                $_SESSION["email"] = $respuesta["email"];
                $_SESSION["nombre"] = $respuesta["nombre"];
                $_SESSION["rol"] = $respuesta["rol"];

                //header("location:inicio.php?action=");
            }
        }
    }
}
