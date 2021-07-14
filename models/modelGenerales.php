<?php

require "conexion.php";

class GeneralesModel {
  public static function mdlActualizarCampo($datosController) {
    $statement = Conexion::conectar() -> prepare("UPDATE `generales` SET `precio_dolar` = :precioDolar, `incremento` = :incremento WHERE `id` = :id;");

    $statement -> bindParam(":precioDolar", $datosController["precioDolar"], PDO::PARAM_STR);
    $statement -> bindParam(":incremento", $datosController["incremento"], PDO::PARAM_STR);
    $statement -> bindParam(":id", $datosController["id"], PDO::PARAM_INT);

    if ($statement -> execute()) {
      return "success";
    } else {
      return "error";
    }
  }

  public static function mdlListarGenerales() {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `generales`;");

    $statement -> execute();
    return $statement -> fetchAll();
  }
}