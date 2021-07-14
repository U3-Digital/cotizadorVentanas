<?php
include "./views/components/stepper.php";
?>
<br>
<div class="row justify-content-center">
  <div class="col">
    <div class="card">
      <div class="card-header border-0">
        <h4>Cotización</h4>
      </div>
      <div class="row mx-4 mt-4">
        <input type="text" name="cajaNombreCliente" id="cajaNombreCliente" class="form-control" placeholder="Nombre del cliente">
      </div>
      <div class="card-body">
        <table class="table bg-white table-bordered table-hover">
          <thead>
            <th scope="col">Tamaño</th>
            <th scope="col">Vidrio</th>
            <th scope="col">Tipo</th>
            <th scope="col">Pintura</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Total</th>
          </thead>
          <tbody id="cuerpo-tabla">
          </tbody>
        </table>
        <div class="row d-flex flex-row-reverse">
            <div class="mr-4"><h5>Total: <b id="totalCotizaciones">$0</b></h5></div>
        </div>
        <div class="row" id="container-save-cotizacion" hidden>
          <div class="col-4"></div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-4">
            <button class="btn btn-block btn-primary" onclick="enviarCorreo()"> <i class="fas fa-paper-plane"></i>&nbsp;Enviar cotizacion por correo</button>
          </div>
          <div class="col-4">
            <button class="btn btn-block btn-primary" onclick="insertarCotizacion()">Guardar Cotizacion</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>