<?php
class PreciosController {
  public function ctrBuscarPrecio($abuscar) {
    $resultado = PreciosModel::mdlBuscarPrecio($abuscar);
    return $resultado;
  }

  public function ctrListarPrecios() {
    $precios = PreciosModel::mdlListarPrecios();
    $i = 0;
    foreach ($precios as $precio) {
      echo "
        <tr>
          <td class=\"descripcion\">" . $precio["descripcion"] . "</td>
          <td>
            <span id=\"span-" . $i . "\" class=\"spanTexto\" style=\"cursor: pointer;\" onclick=\"mostrarCajaPrecio('span-" . $i . "', 'caja-" . $i . "')\">
              " . $precio["precio"] . "
            </span>
            <input id=\"caja-" . $i . "\" type=\"number\" class=\"form-control texto\" style=\"display: none;\" value=\"" . $precio["precio"] . "\">
          </td>
        </tr>
      ";
      $i++;
      // print_r($precio["descripcion"] . " " . $precio["precio"] . "<br>");
    }
  }

  public function ctrActualizarPrecio($datosController) {
    $respuesta = PreciosModel::mdlActualizarPrecio($datosController);
    return $respuesta;
  }
}
