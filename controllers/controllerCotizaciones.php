<?php

class CotizacionesController {
  public function ctlListarCotizaciones() {
    $cotizaciones = CotizacionesModel::mdlListarCotizaciones();

    $cotizaciones = array("0" => "", "1" => "");

    foreach ($cotizaciones as $cotizacion) {
      echo '
        <tr>
          <td>' . $cotizacion["cliente"] . '</td>
          <td>Pedic</td>
          <td>Pedic</td>
          <td>Pedic</td>
          <td>Pedic</td>
          <td>Pedic</td>
          <td>Pedic</td>
          <td>Pedic</td>
          <td>Pedic</td>
        </tr>
      ';
    }
  }
}