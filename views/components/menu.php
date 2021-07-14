<div class="d-flex flex-column flex-shrink-0 p-3 bg-light menu" style="width: 280px;" style="flex: 1 1 auto;">

  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
      <a href="inicio.php?action=" class="nav-link" aria-current="page">
        <i class="fas fa-home"></i>
        Cotizador
      </a>
    </li>

    <?php
      if($_SESSION["rol"] == 0){
        echo '
        <hr style="border-top: 1px solid #DDDDDD; width: 95%">
        <li>
          <a href="inicio.php?action=agregarUsuario" class="nav-link link-dark">
          <i class="fas fa-user"></i>
            Agregar usuario
          </a>
        </li>
        <li>
          <a href="inicio.php?action=lstUsuarios" class="nav-link link-dark">
          <i class="fas fa-list"></i>
            Manejar usuarios
          </a>
        </li>
        ';
      }
    ?>
    <hr style="border-top: 1px solid #DDDDDD; width: 95%">
    <li>
      <a href="inicio.php?action=lstCotizaciones" class="nav-link link-dark">
        <i class="fas fa-list"></i>
        Lista de cotizaciones
      </a>
    </li>
    <?php
      if($_SESSION["rol"] == 0){
        echo'
        <hr style="border-top: 1px solid #DDDDDD; width: 95%">
        <li>
          <a href="inicio.php?action=lstPrecios" class="nav-link link-dark">
            <i class="fas fa-list"></i>
            Lista de precios
          </a>
        </li>
        <li>
          <a href="inicio.php?action=lstGenerales" class="nav-link link-dark">
            <i class="fas fa-list"></i>
            Generales
          </a>
        </li>
        ';  
      
      }
    ?>
    
  </ul>
</div>