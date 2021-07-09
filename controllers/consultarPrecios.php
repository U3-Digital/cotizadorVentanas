<?php 
    require_once "./controllerPrecios.php";
    require_once "../models/modelPrecios.php";
    $str_ventana = $_POST["ventana"];

    $cosa = new PreciosController();
    $resultado = $cosa -> ctrBuscarPrecio($str_ventana);

    print_r(json_encode($resultado));
?>