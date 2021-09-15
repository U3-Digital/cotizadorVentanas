<?php

class Conexion {
  public static function conectar() {

    $servername = "127.0.0.1";
    $username = "root";
    $password = "12345678";
    $dbname = "cotizador";

    // $servername = "mysql1007.mochahost.com";
    // $username = "rickurbi_skyview";
    // $password = "NmAIt&jZ2dd1";
    // $dbname = "rickurbi_skyview";
    

    try {
      $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      echo "";
      $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $exception) {
      print_r($exception);
    }
    return $conexion;
  }
}
