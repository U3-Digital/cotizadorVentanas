<?php

require_once "./controllerCotizaciones.php";
require_once "../models/modelCotizaciones.php";

$controllerCotizaciones = new CotizacionesController();
$resultado = $controllerCotizaciones -> ctrBuscarUltimaCotizacion();

if ($resultado) {
  print_r("{\"id\": $resultado}");
} else {
  print_r("{\"id\": 0}");
}

