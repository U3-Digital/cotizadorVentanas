<?php

class EnlacesController {
  public function ctrEnlaces() {
    if (isset($_GET["action"])) {
      $enlaces = $_GET["action"];
    } else {
      $enlaces = "";
    }

    $respuesta = EnlacesModel::mdlEnlaces($enlaces);
    if ($respuesta) {
      include $respuesta;
    }
  }
}