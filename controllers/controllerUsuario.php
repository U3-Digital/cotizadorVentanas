<?php

    class ControllerUsuario{
        public static function ctrCrearUsuario(){
            if(isset($_POST["cajaNombres"])){
                $password = password_hash($_POST["cajaPassword"],PASSWORD_DEFAULT);
                $datosController = array(
                    "nombreUsuario" => $_POST["cajaNombres"].' '.$_POST["cajaApellidos"],
                    "usuario" => $_POST["cajaNombres"],
                    "password" => $password,
                    "email" => $_POST["cajaEmail"],
                    "rol" => $_POST["selectRol"],
                    "activo" => $_POST["selectActivo"]
                );
                $respuesta = ModelUsuario::mdlCrearUsuario($datosController);

                if ($respuesta === "success") {
                    echo "
                    <script>
                      Swal.fire({
                        title: 'Usuario agregado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#F73164'
                      }).then((value) => {
                        window.location.href = 'inicio.php?action=lstUsuarios';
                      });
                    </script>
                    ";
                } else {
                    echo "
                    <script>
                      Swal.fire({
                        title: 'Error al agregar el usuario',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#F73164'
                      });
                    </script>
                    ";
                }

            }
        }

        public static function ctrlistarUsuarios(){
            $respuesta = ModelUsuario::mdlListarUsuarios();
            foreach ($respuesta as $row => $item){
                echo'
                    <tr>
                        <td>'.$item["nombre"].'</td>
                        <td>'. $item["email"].'</td>
                        <td>'. ($item["rol"] == 0 ? ("Administrador") : ("Usuairo")) .'</td>
                        <td>'. ($item["activo"] == "S" ? ("activo") : ("inactivo")).'</td>
                        <td>
                            <a href="inicio.php?action=uptUsuario&idEditar='.$item["id"].'"><button class="btn btn-warning"><i class="fas fa-pencil-alt"></i></button></a>
                            <a href="inicio.php?action=lstUsuarios&idBorrar='.$item["id"].'"><button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></a>
                        </td>
                    </tr>
                ';
            }
        }

        public static function ctrBorrarUsuario(){
            if (isset($_GET["idBorrar"])) {
                $idBorrar = $_GET["idBorrar"];
                
          
                $respuesta = ModelUsuario::mdlBorrarUsuario($idBorrar);
          
                if ($respuesta === "success") {
                  echo "
                    <script>
                      Swal.fire({
                        title: 'Usuario eliminado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#F73164'
                      }).then((value) => {
                        window.location.href = 'inicio.php?action=lstUsuarios';
                      });
                    </script>
                  ";
                } else {
                  echo "
                    <script>
                      Swal.fire({
                        title: 'Error al borrar el usuario',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#F73164'
                      });
                    </script>
                  ";
                }
              }    
        }

        public static function ctrActualizaUsuario($id){
            if(isset($_POST['actualizar'])){
                $password = "";
                if($_POST["cajaPassword"] != ""){
                    $password = password_hash($_POST["cajaPassword"],PASSWORD_DEFAULT);
                }
                $datosController = array(
                    "nombreUsuario" => $_POST["cajaNombres"],
                    "usuario" => $_POST["cajaNombres"],
                    "password" => $password,
                    "email" => $_POST["cajaEmail"],
                    "rol" => $_POST["selectRol"],
                    "activo" => $_POST["selectActivo"],
                    "id" => $id
                );
                $respuesta = ModelUsuario::mdlActualizarUsuario($datosController);
                if ($respuesta === "success") {
                  echo "
                  <script>
                    Swal.fire({
                      title: 'Usuario actualizado exitosamente',
                      icon: 'success',
                      confirmButtonText: 'Aceptar',
                      confirmButtonColor: '#F73164'
                    }).then((value) => {
                      window.location.href = 'inicio.php?action=lstUsuarios';
                    });
                  </script>
                  ";
                } else {
                    echo "
                    <script>
                      Swal.fire({
                        title: 'Error al actualizar el usuario',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#F73164'
                      });
                    </script>
                    ";
                }
              }
        }

        public static function ctrBuscarUsuario($id){
            
            $respuesta = ModelUsuario::mdlBuscarUsuario($id);
            $rol = $respuesta["rol"] == 0 ? ("selected") : (""); 
            $estado = $respuesta["activo"] == "S" ? ("selected") : ("");

            echo'
            <div class="card-body">
            <div class="row">
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="cajaNombres">Nombre:</label>
                                <input class="form-control" type="text" required placeholder="Nombre(s)" id="cajaNombres" name="cajaNombres" value="'.$respuesta["nombre"].'">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="cajaEmail">Correo electrónico:</label>
                                <input class="form-control" type="email" required
                                placeholder="Correo electrónico" id="cajaEmail" name="cajaEmail" value="'.$respuesta["email"].'">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="cajaPassword">Contraseña:</label>
                                <input class="form-control" type="password" 
                                placeholder="Contraseña" id="cajaPassword" name="cajaPassword">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <img class="img-profile" src="./img/user.png" alt="Seleccionar foto de perfil">
                    <input name="inputFile" type="file" hidden>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="selectRol">Rol:</label>
                        <select required class="form-control" id="selectRol" name="selectRol" >
                            <option value="" selected>Rol</option>
                            <option value="0" '.$rol.'>Administrador</option>
                            <option value="1">Usuario</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="selectActivo">Activo:</label>
                        <select required class="form-control" id="selectActivo" name="selectActivo" value="'.$respuesta["activo"].'">
                            <option value="" selected>Activo</option>
                            <option value="S" '.$estado.' >Sí</option>
                            <option value="N">No</option>
                        </select>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
<!-- 
                <div class="col-md-4">
                </div> -->

                <div class="col-md-12 text-center">
                    <button type="submit"  class="btn btn-primary" style="min-width: 10em;"  name="actualizar" id="actualizar" value="Actualizar">Actualizar</button>
                </div>
            </div>
        </div>  
            ';
        }
    }

    
?>