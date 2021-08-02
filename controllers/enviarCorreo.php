<?php


/*     $correo = $_POST["correo"];
    $cotizaciones = json_decode($_POST["cotizaciones"],true);
    $nombreCliente = $_POST["nombre"];

    $html= '
        <img alt="" style="display:block;max-width:100%;margin-right:auto;width:122px;height:37px" height="37" src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big-176x55.png" class="CToWUd">
        <p>Cliente: <span><b>'.$nombreCliente.'</b></span></p>
        <p>Adjuntamos su cotización</p>
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
            <tbody>
    ';
    $total = 0;

  foreach ($cotizaciones as $row => $item) {
    $total += $item["total"];
    if(!isset($item["subtipoVentana"]) && isset($item["colorSubcolor"])){
      $html .= '
        <tr>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"></td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"></td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"> </td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["colorSubcolor"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["precio"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["numeroVentanas"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["total"].'</td>
        </tr>
      ';
    }else{
      $html .= '
        <tr>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["subtipoVentana"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["tipoVidrio"].' '.$item["tipoVidrio"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"> '.$item["dimensionAlto"].'x'.$item["dimensionAncho"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["colorPrincipal"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["precio"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["numeroVentanas"].'</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">'.$item["total"].'</td>
        </tr>
      ';
    }
    
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
    } */