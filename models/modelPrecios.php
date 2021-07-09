<?php
require_once "conexion.php";

class PreciosModel {
  public static function mdlBuscarPrecio($abuscar) {
    $statement = Conexion::conectar()->prepare("SELECT *,(SELECT precio_dolar FROM `generales` WHERE id = 1) as precio_dolar, (SELECT incremento FROM `generales` WHERE id = 1) as incremento FROM `precios` WHERE `descripcion` =  :descripcion");

    $statement->bindParam(":descripcion", $abuscar, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetch();
  }

  public static function mdlListarPrecios() {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `precios`;");

    $statement -> execute();
    return $statement -> fetchAll();
  }

  public static function mdlActualizarPrecio($datosModel) {
    $statement = Conexion::conectar() -> prepare("UPDATE `precios` SET `precio` = :precio WHERE `descripcion` = :descripcion;");

    $statement -> bindParam(":precio", $datosModel["nuevoPrecio"], PDO::PARAM_STR);
    $statement -> bindParam(":descripcion", $datosModel["descripcion"], PDO::PARAM_STR);

    if ($statement -> execute()) {
      return "success";
    } else {
      return "error";
    }
  }
}
