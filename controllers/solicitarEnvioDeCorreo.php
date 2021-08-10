<?php
require '../vendor/autoload.php';

// require '../vendor/spipu/html2pdf/src/Html2Pdf.php';
// use Spipu\Html2Pdf\Html2Pdf;

require_once '../vendor/tecnickcom/tcpdf/tcpdf.php';

require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST["correo"])) {

  $cuerpoCorreo = $_POST["cuerpoCorreo"];
  // $PDF = new Html2Pdf('P', 'A4', 'es');
  // $PDF -> writeHTML($cuerpoCorreo);
  // $PDF -> output(__DIR__ . "cotizacion.pdf", "F");

  $PDF = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

  $PDF -> SetCreator(PDF_CREATOR);
  $PDF -> SetAuthor('Sky View Fenster');
  $PDF -> SetTitle('holi');
  $PDF -> SetSubject('Subject');
  $PDF -> SetKeywords('HOLA');

  $PDF -> setPrintHeader(false);
  $PDF -> setPrintFooter(false);

  $PDF -> SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  $PDF -> SetMargins(10, 10, 10);
  $PDF -> SetAutoPageBreak(true, 10);
  $tagvs = array(
    'p' => array(
      0 => array(
        'h' => 0, 
        'n' => 0), 
      1 => array(
        'h' => 0, 
        'n' => 0)
      ),
    'div' => array(
      0 => array(
        'h' => 0,
        'n' => 0),
      1 => array(
        'h' => 0,
        'n' => 0)
      )
    ); 
  $PDF -> setHtmlVSpace($tagvs);

  $PDF -> setImageScale(PDF_IMAGE_SCALE_RATIO);

  $PDF -> SetFont('helvetica', '', 12);

  $PDF -> AddPage();


  $PDF -> writeHTML($cuerpoCorreo, true, false, true, false, '');
  $PDF -> Output(__DIR__ . 'cotizacion.pdf', 'F');


  $recipient = $_POST["correo"];
  $subject = "Cotización de Sky View Fenster";

  $mail = new PHPMailer();

  $mail -> setFrom('info@skyviewfenster.com', 'Sky View Fenster');
  $mail -> addAddress($recipient);
  
  $mail -> isHTML(true);
  $mail -> CharSet = 'UTF-8';

  $mail -> Subject = $subject;
  $mail -> addAttachment(__DIR__ . "cotizacion.pdf", 'cotizacion.pdf');

  $mail -> Body = 'Le hacemos llegar la cotización que solicitó con nosotros. Quedamos a sus órdenaes para las dudas o correcciones necesarias. <br> Atte. Sky View Fenster <a href="https://skyviewfenster.com.mx/">/skyviewfenster.com.mx</a>. Este es un mensaje automático. Favor de no responder a este correo';
  $mail -> AltBody = 'Le hacemos llegar la cotización que solicitó con nosotros. Quedamos a sus órdenaes para las dudas o correcciones necesarias. Atte. Sky View Fenster. Este es un mensaje automático. Favor de no responder a este correo';

  if ($mail -> send()) {
    print_r("{ \"ok\": true }");
  } else {
    print_r("{\"ok\": false }");
  }


} else {
  print_r("{\"success\": false}");
}

/*   require "./controllerCotizaciones.php";
  require "../models/modelCotizaciones.php";

  $id = $_POST["id"];
  $correo = $_POST["correo"];

  $controller = new CotizacionesController();
  $respuesta = $controller-> ctrConsultarVentanasCotizacion($id);
  $ventanas = json_decode($respuesta["ventana"],true);
  $html= '
  <img alt="" style="display:block;max-width:100%;margin-right:auto;width:122px;height:37px" height="37" src="https://skyviewfenster.com.mx/wp-content/uploads/2021/04/cropped-sky-view-big-176x55.png" class="CToWUd">
  <p>Cliente: <span><b>'.$respuesta["cliente"].'</b></span></p>
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
    <tbody>';
  $total = 0;

  foreach ($ventanas as $row => $item) {
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