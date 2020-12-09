<?php

class Conexion{

	public function conectar(){

		$link = new PDO("mysql:host=localhost;dbname=sistema","root","12345678");
		return $link;

	}

}