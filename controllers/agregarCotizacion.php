<?php
  require "./controllerCotizaciones.php";
  require "../models/modelCotizaciones.php";

$datosController = array(
  "ventanas" => $_POST["ventanas"],
  "cliente" => $_POST["cliente"],
  "direccion" => $_POST["direccion"],
  "codigoPostal" => $_POST["codigoPostal"],
  "RFC" => $_POST["RFC"]
);
$controller = new CotizacionesController();
$respuesta = $controller -> ctrAgregarCotizacion($datosController);

print_r($respuesta);