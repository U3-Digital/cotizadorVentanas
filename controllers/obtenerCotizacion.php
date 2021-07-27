<?php 
  require "./controllerCotizaciones.php";
  require "../models/modelCotizaciones.php";
  $id = $_POST["id"];
  $controller = new CotizacionesController();
  $respuesta = $controller-> ctrConsultarVentanasCotizacion($id);
  print_r(json_encode($respuesta));
?>