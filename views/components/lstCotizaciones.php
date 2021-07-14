<?php
require_once "./controllers/controllerCotizaciones.php";
require_once "./models/modelCotizaciones.php";

?>

<div class="row justify-content-center">
          <div class="col">
            <div class="card">
              <div class="card-header border-0">
                <h4>Cotizaciones</h4>
              </div>
              <div class="card-body">
                <table class="table bg-white table-bordererd table-hover">
                  <thead>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                  </thead>
                  <tbody>
                    <?php
                      $controllerCotizaciones = new CotizacionesController();
                      $controllerCotizaciones -> ctrListarCotizaciones();
                      $controllerCotizaciones -> ctrBorrarCotizacion();
                    ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  <script>
    function enviarCotizacion(idCotizacion) {
      Swal.fire({
          title: 'Correo del cliente',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          showLoaderOnConfirm: true,
          preConfirm: (correo) => {
            const formData = new FormData();
            formData.set('id', idCotizacion);
            formData.set('correo',correo);
            $.ajax({
              url: './controllers/solicitarEnvioDeCorreo.php',
              type: 'POST',
              data: formData,
              success: (data) => {
                if (data == 'success') {
                  Swal.fire({
                    title: 'Correo enviado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                  });
                } else {
                  Swal.fire({
                    title: 'Error al enviar la cotización',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                  });
                }
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
          },
          allowOutsideClick: () => !Swal.isLoading()
        })
      
    }
    function borrarCotizacion(idCotizacion) {
      Swal.fire({
        title: '¿Está seguro de que desea borrar esta cotización?',
        text: 'Esta acción no podrá ser revertida',
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#0d6efd',
        confirmButtonColor: '#dc3545'
      }).then((value) => {
        if (value.isConfirmed) {
          window.location.href = `lstCotizaciones.php?idBorrar=${idCotizacion}`;
        }
      });
    }

    function mirarCotizacion(idCotizacion){
      
      const formData = new FormData();
      formData.set('id', idCotizacion);
      $.ajax({
        url: './controllers/consultarVentanasCotizacion.php',
        type: 'POST',
        data: formData,
        success: (data) => {
          const ventanas = JSON.parse(JSON.parse(data).ventana);
          console.log(ventanas);
          /*
            <div class=\"row mt-4\">
              <div class=\"col\">
                <h3>Cotizacion</h3>
                <p>Favor de guardar la siguiente información tomando una captura de pantalla</p>
                <p>Nombre: <span style=\"color: #7E9680\"><b>" . $datosController["nombre"] . "</b></span></p>
                <p>Número de boleto: <span style=\"color: #7E9680\"><b>" . $this -> generarNumeroReal(str_split(strval($noBoleto))) . "</b></span></p>
                <p>Oportunidades:</p>
                " . $this -> generarOportunidades($noBoleto) . "
                <p>Costo del boleto: <b>$<span>" . $sorteo["costoBoleto"] . "</span></b></p>
                <hr>
                <p>Debes realizar tu pago y enviar tu comprobante por WhatsApp</p>
                <p>Efrén Olivas Miranda</p>
                <p><img style=\"height: 14px\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/1920px-BBVA_2019.svg.pn\g\">&nbsp;Tarjeta: 4152 3138 0752 3639</p>
                <p>Zayra Yvonne García Loya</p>
                <p><img style=\"height: 14px\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/1920px-BBVA_2019.svg.pn\g\">&nbsp;Tarjeta: 4152 3137 0599 6150</p>
              </div> 
            </div>
          */
          let total = 0;
          let html = `
            <div class=\"row mt-4\">
              <div class=\"col\">
                <h3>Cotizacion</h3>
          `;
          ventanas.map(ventana => {
            console.log(ventana);
            total += ventana.total;
            html += `
              <p>Tipo de ventana: <span><b>${ventana.subtipoVentana}</b></span></p>
              <p>Tipo de vidrio: <span><b>${ventana.tipoVidrio} ${ventana.subtipoVidrio}</b></span></p>
              <p>dimensión: <span><b>${ventana.dimensionAlto} x ${ventana.dimensionAncho}</b></span></p>
              <p>Color: <span><b>${ventana.colorPrincipal}</b></span> ${ventana.colorSubcolor ? (` Subcolor: <span><b>${ventana.colorSubcolor}</b></span>`) :("")}</p>
              <p>Total: <span><b>${ventana.total}</b></span></p>
              <hr>
            `;
          });

          html += `
            <p>Total cotización: <span ><b>${total}</b></span></p>
            </div> 
          </div>
          `;

          Swal.fire({
            html: html,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#007BFF'
          });
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
  </script>
