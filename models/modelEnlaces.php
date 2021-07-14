<?php

class EnlacesModel {
  public static function mdlEnlaces($enlaces) {
    $module = "";
    $listaEnlaces = ["agregarUsuario", "lstCotizaciones", "lstGenerales", "lstPrecios", "lstUsuarios", "uptUsuario", "salir"];

    if ($enlaces === "") {
      return "./views/components/cotizador.php";
    } else if (in_array($enlaces, $listaEnlaces)) {
      $module = "./views/components/" . $enlaces . ".php";
    }
    return $module;
  }
}