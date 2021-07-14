<div class="row w-100 mt-1">
  <div class="col-md-12 col-lg-8 col-12">
    <div class="multisteps-form">
      <!--progress bar-->
      <div class="row">
        <div class="col-12 col-lg-12 ml-auto mr-auto mb-4">
          <div id="multisteps-progress" class="multisteps-form__progress">

          </div>
        </div>
      </div>
      <!--form panels-->
      <div class="row">
        <div class="col-12 col-lg-11 m-auto">
          <div id="steps-container" class="multisteps-form__form">

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-12 col-lg-4 col-12" style="margin-top: 4.3rem!important;">
    <div class="card">
      <div class="card-header border-0">
        <h4>Detalles</h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr>
              <td style="width: 200px;" class="pl-3 pt-1 pb-1">Serie</td>
              <td id="details-container-serie" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Tipo de ventana</td>
              <td id="details-container-tipo-ventana" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Subtipo de ventana</td>
              <td id="details-container-subtipo-ventana" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Dimensiones</td>
              <td id="details-container-dimensiones" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Tipo de vidrio</td>
              <td id="details-container-tipo-vidrio" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Subtipo de vidrio</td>
              <td id="details-container-subtipo-vidrio" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Ceja</td>
              <td id="details-container-ceja" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr>
              <td class="pl-3 pt-1 pb-1">Color</td>
              <td id="details-container-color" class="pl-3 pt-1 pb-1"></td>
            </tr>
            <tr id="details-container-subcolor">
            </tr>
          </tbody>
        </table>
        
        <div class="row ml-3 mt-3">
          <div class="col-6 text-center"><h5>Total</h5></div> 
          <div class="col-6 text-center"><h5 id="total">$0</h5></div> 
        </div>
        <br>
        <div class="row" id="container-add-numero-ventanas" hidden>
          <div class="col-6">
            <input type="number" name="input-no-ventanas" min="1" max="10" id="input-no-ventanas" class="form-control" placeholder="No. de ventanas" value="1">
          </div>
          <div class="col-6">
            <button class="btn btn-block btn-primary" onclick="agregarCotizacion()">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="./views/js/stepper.js"></script>
<script src="./views/js/generarPantallas.js"></script>
<script src="./views/js/script.js"></script>
<script src="./views/js/calcularPrecio.js"></script>