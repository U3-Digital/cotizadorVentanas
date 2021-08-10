<?php
require_once "./controllers/controllerPrecios.php";
require_once "./models/modelPrecios.php";

$preciosController = new PreciosController();
?>
<div class="row justify-content-center">
  <div class="col">
    <div class="card">
      <div class="card-header border-0">
        <h4>Precios</h4>
      </div>
      <div class="card-body">
        <table class="table display" id="tablaPrecios">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Precio por pulgada (dlls)</th>
            </tr>
          </thead>
          <tbody>
            <?php
            $preciosController->ctrListarPrecios();
            ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


<?php
// $preciosController = new PreciosController();
// $preciosController -> ctrListarPrecios();
?>
<script>
  $(document).ready(() => {
    $('#tablaPrecios').DataTable({
      ordering: false
    });
  });

  function mostrarCajaPrecio(idSpan, idText) {

    let timerIdentifier;

    const input = document.getElementById(idText);

    input.addEventListener('keyup', () => {
      clearTimeout(timerIdentifier);
      timerIdentifier = setTimeout(cambiarPrecio, 1000);
    });

    input.addEventListener('keydown', () => {
      clearTimeout(timerIdentifier);
    });


    let descripcionPrecio = '';

    document.getElementById(idSpan).style.display = 'none';
    input.style.display = 'block';
    input.focus();
    // console.log(document.getElementsByClassName('form-control'));
    const elementsText = document.getElementsByClassName('texto');
    const elementsTd = document.getElementsByClassName('descripcion');

    for (let i = 0; i < elementsText.length; i++) {
      const element = elementsText[i];
      if (element.id != idText) {
        element.style.display = 'none';
        element.onkeyup = undefined;
      } else {
        descripcionPrecio = elementsTd[i].innerText;
      }
    }

    const elementsSpan = document.getElementsByClassName('spanTexto');

    for (let i = 0; i < elementsSpan.length; i++) {
      const element = elementsSpan[i];
      if (element.id != idSpan) {
        element.style.display = 'inline';
      }
    }

    function cambiarPrecio() {
      document.getElementById(idSpan).innerText = input.value;

      const formData = new FormData();
      formData.set('nuevoPrecio', input.value);
      formData.set('descripcion', descripcionPrecio);
      $.ajax({
        url: './controllers/cambiarPrecio.php',
        type: 'POST',
        data: formData,
        success: (response) => {
          if (response == 'success') {
            Swal.fire({
              title: 'Precio actualizado exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007BFF'
            });
          } else {
            Swal.fire({
              title: 'Error al actualizar el precio',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007BFF'
            });
          }
          input.style.display = 'none';
          document.getElementById(idSpan).style.display = 'inline';


        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {

        },
        cache: false,
        contentType: false,
        processData: false
      });
    }

  }
</script>
