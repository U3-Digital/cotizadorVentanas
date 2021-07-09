<?php

require "./controllerPrecios.php";
require "../models/modelPrecios.php";

$datosController = array(
  "descripcion" => $_POST["descripcion"],
  "nuevoPrecio" => $_POST["nuevoPrecio"]
);

$controllerPrecios = new PreciosController();
$respuesta = $controllerPrecios -> ctrActualizarPrecio($datosController);

print_r($respuesta);