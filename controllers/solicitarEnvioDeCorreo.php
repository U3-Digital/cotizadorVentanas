<?php
  require "./controllerCotizaciones.php";
  require "../models/modelCotizaciones.php";

  $id = $_POST["id"];
  $correo = $_POST["correo"];

  $controller = new CotizacionesController();
  $respuesta = $controller-> ctrConsultarVentanasCotizacion($id);
  $ventanas = json_decode($respuesta["ventana"],true);
  $html= '
  <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
    <thead>
        <tr>
            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Tipo ventana</th>
            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Tipo vidrio</th>
            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Dimensión</th>
            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Color</th>
            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Precio</th>
            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Cantidad</th>
            <th scope="col" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px">Total</th>
        </tr>
    </thead>
    <tbody>';
  $total = 0;

  foreach ($ventanas as $row => $item) {
    $total += $item["total"];
    $html .= '
        <tr>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["subtipoVentana"].'${ventana.subtipoVentana}</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["tipoVidrio"].' '.$item["tipoVidrio"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"> '.$item["dimensionAlto"].'x'.$item["dimensionAncho"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["colorPrincipal"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["precio"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["numeroVentanas"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["total"].'</td>
        </tr>
    ';
  }
  $html .= '</tbody>
        </table><hr>
        <div style= "text-align: justify; -moz-text-align-last: right; text-align-last: right;">
        <p><b>Total: </b>'.$total.'</p>
        </div>
  ';
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From: ventas@skyviewfenster.com.mx' . "\r\n";

  $sujeto = "Cotización";

  if(mail($correo,$sujeto,$html,$headers)){
      print_r("success");
  }else{
      print_r("error");
  }
?>