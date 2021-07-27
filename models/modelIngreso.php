<?php

require_once "conexion.php";

class ModelIngreso {
    public static function mdlIngresar($datosModel) {
        $statement = Conexion::conectar() -> prepare("SELECT * FROM `usuarios` WHERE `email` = :nombreUsuario");

        $statement -> bindParam(":nombreUsuario", $datosModel["nombreUsuario"], PDO::PARAM_STR);
        $statement -> execute();

        return $statement -> fetch();
    }

    
}
