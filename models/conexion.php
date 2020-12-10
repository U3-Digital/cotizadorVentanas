<?php

class Conexion {
    public static function conectar() {

        $servername = "127.0.0.1";
        $username = "root";
        $password = "";
        $dbname = "cotizador";

        try {
            $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            
            $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {

        }
        return $conexion;
    }
}
