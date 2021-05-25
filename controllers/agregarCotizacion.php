<?php
  require "./controllerCotizaciones.php";
  require "../models/modelCotizaciones.php";

$datosController = array(
  "ventana" => $_POST["ventana"],
  "cliente" => $_POST["cliente"]
);

$controller = new CotizacionesController();
$respuesta = $controller -> ctrAgregarCotizacion($datosController);

print_r($respuesta);