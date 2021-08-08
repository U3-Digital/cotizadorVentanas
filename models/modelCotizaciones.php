<?php

require_once "conexion.php";

class CotizacionesModel {
  public static function mdlBuscarVentanasDeCotizacion($id){
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `cotizaciones` WHERE idCotizacion = :idCotizacion;");
    
    $statement -> bindParam(":idCotizacion", $id, PDO::PARAM_INT);

    $statement -> execute();

    return $statement -> fetch();
  }

  public static function mdlAgregarCotizacion($datosModel) {
    $statement = Conexion::conectar() -> prepare("INSERT INTO `cotizaciones` VALUES (NULL, :ventana, :cliente, :direccion, :codigoPostal, :RFC, now());");

    $statement -> bindParam(":ventana", $datosModel["ventanas"], PDO::PARAM_STR);
    $statement -> bindParam(":cliente", $datosModel["cliente"], PDO::PARAM_STR);
    $statement -> bindParam(":direccion", $datosModel["direccion"], PDO::PARAM_STR);
    $statement -> bindParam(":codigoPostal", $datosModel["codigoPostal"], PDO::PARAM_STR);
    $statement -> bindParam(":RFC", $datosModel["RFC"], PDO::PARAM_STR);

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

  public static function mdlBuscarCotizacionPorId($idCotizacion) {
    $statement = Conexion::conectar() -> prepare("SELECT * FROM `cotizaciones` WHERE `idCotizacion` = :idCotizacion");

    $statement -> bindParam(":idCotizacion", $idCotizacion, PDO::PARAM_INT);

    if ($statement -> execute()) {
      return $statement -> fetch();
    } else {
      return "error";
    }
  }

  public static function mdlBuscarUltimaCotizacion() {
    $statement = Conexion::conectar() -> prepare("SELECT MAX(`idCotizacion`) as id FROM `cotizaciones`;");
    
    $statement -> execute();
    return $statement -> fetch();
  }
}
