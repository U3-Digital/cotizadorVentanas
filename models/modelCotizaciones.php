<?php

require_once "conexion.php";

class CotizacionesModel {
  public static function mdlAgregarCotizacion($datosModel) {
    $statement = Conexion::conectar() -> prepare("INSERT INTO `cotizaciones` VALUES (NULL, :ventana, :cliente, :fecha);");

    $statement -> bindParam(":ventana", $datosModel["ventana"], PDO::PARAM_STR);
    $statement -> bindParam(":cliente", $datosModel["cliente"], PDO::PARAM_STR);
    $statement -> bindParam(":fecha", $datosModel["fecha"], PDO::PARAM_STR);

    if ($statement -> execute()) {
      return "success";
    } else {
      return "error";
    }
  }

  public static function mdlListarCotizaciones() {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `cotizaciones`;");
    
    $statement -> execute();

    return $statement -> fetchAll();
  }

  public static function mdlBorrarCotizacion($idBorrar) {
    $statement = Conexion::conectar() -> prepare("DELETE FROM `cotizaciones` WHERE `idCotizacion` = :idCotizacion;");

    $statement -> bindParam(":idCotizacion", $idBorrar, PDO::PARAM_INT);
    
    if ($statement -> execute()) {
      return "success";
    } else {
      return "error";
    }
  }
}
