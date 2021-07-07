<?php
  require "./controllerCotizaciones.php";
  require "../models/modelCotizaciones.php";

$datosController = array(
  "ventanas" => $_POST["ventanas"],
  "cliente" => $_POST["cliente"]
);
$controller = new CotizacionesController();
$respuesta = $controller -> ctrAgregarCotizacion($datosController);

print_r($respuesta);