<?php
require_once "./controllerCotizaciones.php";
require_once "../models/modelCotizaciones.php";

if (isset($_POST["idCotizacion"])) {

  $idCotizacion = $_POST["idCotizacion"];

  $controllerCotizacion = new CotizacionesController();

  $cotizacion = $controllerCotizacion -> ctrBuscarCotizacionPorId($idCotizacion);
  
  $ventana = json_decode($cotizacion["ventana"], true);

  $cotizacion[1] = $ventana;
  $cotizacion["ventana"] = $ventana;

  print_r(json_encode($cotizacion));

} else {
  print_r("{}");

}
