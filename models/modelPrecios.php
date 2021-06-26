<?php
    require_once "conexion.php";

    class preciosModel{
        public static function mdlBuscarPrecio($abuscar){
            $statement = Conexion::conectar() -> prepare("SELECT *,(SELECT precio_dolar FROM `generales` WHERE id = 1) as precio_dolar, (SELECT incremento FROM `generales` WHERE id = 1) as incremento FROM `precios` WHERE `descripcion` =  :descripcion");

            $statement -> bindParam(":descripcion", $abuscar, PDO::PARAM_STR);
            $statement -> execute();
            return $statement-> fetch();
        }
    }
?>