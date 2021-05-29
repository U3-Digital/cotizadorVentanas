<?php
    $correo = $_POST["correo"];
    $cotizaciones = json_decode($_POST["cotizaciones"],true);
    $texto = "<html>
    <head>
    <title>Cotización</title>
    </head>
    <body>
        <p>Cotizaciones</p>
            <table>
            <tr>
                <th>Tamaño</th>
                <th>Vidrio</th>
                <th>Tipo</th>
                <th>Pintura</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
            </tr>
    ";
    foreach ($cotizaciones as $row => $item) {
        $texto .= '
        <tr><td>'.$item["dimensionAlto"].'x'.$item["dimensionAncho"].'</td>
        <td>'.$item["tipoVidrio"].'</td>
        <td>'.$item["tipoVentana"].'</td>
        <td>'.$item["colorPrincipal"].'</td>
        <td>'.$item["numeroVentanas"].'</td>
        <td>'.$item["precio"].'</td>
        <td>'.$item["total"].'</td>
        </tr>

        ';
    }

    $texto .= '</table></body></html>';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";


    $headers .= 'From: <webmaster@example.com>' . "\r\n";

    $sujeto = "Cotización";

    //mail($correo,$sujeto,$texto,$headers);
    print_r($texto);
?>