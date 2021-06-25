<?php
    require_once "conexion.php";

    class preciosModel{
        public static function mdlBuscarPrecio($abuscar){
            $statement = Conexion::conectar() -> prepare("SELECT * FROM `precios` WHERE `descripcion` = :descripcion");

            $statement -> bindParam(":descripcion", $abuscar, PDO::PARAM_STR);
            $statement -> execute();
            return $statement-> fetch();
        }
    }
?>