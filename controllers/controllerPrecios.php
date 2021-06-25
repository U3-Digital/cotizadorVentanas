<?php
    class preciosController{
        public function ctrBuscarPrecio($abuscar){
            $resultado = preciosModel::mdlBuscarPrecio($abuscar);
            
        }
    }
?>