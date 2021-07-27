<?php
    require_once "conexion.php";

    class ModelUsuario{
        public static function mdlCrearUsuario($datosModel){
            $statement = Conexion::conectar() -> prepare("INSERT INTO `usuarios` VALUES (NULL, :usuario, :password, :nombre, :email, :rol, :activo)");

            $statement -> bindParam(":usuario", $datosModel["usuario"], PDO::PARAM_STR);
            $statement -> bindParam(":password", $datosModel["password"], PDO::PARAM_STR);
            $statement -> bindParam(":nombre", $datosModel["nombreUsuario"], PDO::PARAM_STR);
            $statement -> bindParam(":email", $datosModel["email"], PDO::PARAM_STR);
            $statement -> bindParam(":rol", $datosModel["rol"], PDO::PARAM_INT);
            $statement -> bindParam(":activo", $datosModel["activo"], PDO::PARAM_STR);

            if($statement -> execute()){
                return "success";
            }else{
                return "error";
            }

           
        }
        public static function mdlListarUsuarios(){
            $statement = Conexion::conectar() -> prepare("SELECT * FROM `usuarios`");

            $statement -> execute();

            return $statement -> fetchAll();
        }
        public static function mdlBorrarUsuario($idBorrar){
            $statement = Conexion::conectar() -> prepare("DELETE FROM `usuarios` WHERE id = :idUsuario");

            $statement -> bindParam(":idUsuario", $idBorrar, PDO::PARAM_INT);


            if($statement -> execute()){
                return "success";
            }else{
                return "error";
            }
        }

        public static function mdlBuscarUsuario($id){
            $statement = Conexion::conectar() -> prepare("SELECT * FROM `usuarios` WHERE id= :id");

            $statement -> bindParam(":id", $id, PDO::PARAM_INT);

            $statement -> execute();

            return $statement -> fetch();
        }
        public static function mdlActualizarUsuario($datosModel){
            if($datosModel["password"] == ""){

                $statement =  Conexion::conectar() -> prepare ("UPDATE `usuarios` SET `nombre`= :nombre,`email`= :email,`rol`= :rol,`activo`= :activo WHERE id= :id");

                
                $statement -> bindParam(":nombre", $datosModel["nombreUsuario"], PDO::PARAM_STR);
                $statement -> bindParam(":email", $datosModel["email"], PDO::PARAM_STR);
                $statement -> bindParam(":rol", $datosModel["rol"], PDO::PARAM_INT);
                $statement -> bindParam(":activo", $datosModel["activo"], PDO::PARAM_STR);
                $statement -> bindParam(":id", $datosModel["id"], PDO::PARAM_INT);
                if($statement -> execute()){
                    return "success";
                }else{
                    return "error";
                }

            } else {

                $statement =  Conexion::conectar() -> prepare ("UPDATE `usuarios` SET `nombre`= :nombre, `password` = :password, `email`= :email,`rol`= :rol,`activo`= :activo WHERE id= :id");

                $statement -> bindParam(":password", $datosModel["password"], PDO::PARAM_STR);
                $statement -> bindParam(":nombre", $datosModel["nombreUsuario"], PDO::PARAM_STR);
                $statement -> bindParam(":email", $datosModel["email"], PDO::PARAM_STR);
                $statement -> bindParam(":rol", $datosModel["rol"], PDO::PARAM_INT);
                $statement -> bindParam(":activo", $datosModel["activo"], PDO::PARAM_STR);
                $statement -> bindParam(":id", $datosModel["id"], PDO::PARAM_INT);

                if ($statement -> execute()) {
                    return "success";
                } else {
                    return "error";
                }

            }
        }
    }
?>