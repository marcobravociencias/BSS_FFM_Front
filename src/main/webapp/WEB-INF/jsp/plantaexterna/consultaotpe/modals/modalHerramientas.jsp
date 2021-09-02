<div class="modal fade" tabindex="-1" aria-hidden="true" id="modalHerramientas">
    <div class="modal-dialog modal-lg">
      <div class="modal-content" >
      <div class="modal-header" ng-repeat="gral in general">
        <h5 class="modal-title" id="exampleModalLabel">T&eacute;cnico: <span ng-bind="gral.nombre"></span></h5>
        <button
        type="button"
        class="btn-close"
        data-mdb-dismiss="modal"
        aria-label="Close"
        ></button>
      </div>
      <div class="modal-body" style=" max-height: 300px; overflow: auto;">
        <div class="container-fluid contenedor-consultaOT">
            <div class="content-fluid">   
            <table id="materialesTable" class="display table table-hover">
                <thead id="theadMateriales">
                    <tr>
                        <th>SKU</th>
                        <th>Descripci&oacute;n</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Unidad de medida</th>
                    </tr>
                </thead>
                <tbody id="tbodyMateriales">
                    <tr ng-repeat="mat in materiales">
                        <td><span ng-bind="mat.sku"></span></td>
                        <td><span ng-bind="mat.descripcion"></span></td>
                        <td><span ng-bind="mat.tipo"></span></td>
                        <td><span ng-bind="mat.cantidad"></span></td>
                        <td><span ng-bind="mat.unidadMedida"></span></td>
                    </tr>
                </tbody>
                
            </table>
        </div>
  
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
        Cerrar
        </button>
      </div>
      </div>
    </div>
    </div>