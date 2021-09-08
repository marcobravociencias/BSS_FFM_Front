<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modalProductos" aria-hidden="true">
    <div class="modal-dialog modal-lg cascading-modal" style="min-width: 50% !important; margin-top: 5%;">
        <div class="modal-content" >
            <div class="modal-header blue-gradient modal_header_bg" style="color: #fff;">
                <h5 style="font-weight: bold;margin: 0 auto;" class="modal-title header-title">Productos</h5>
                <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="min-height: 400px; max-height: 400px; overflow: auto;">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="row text-center">
                                <table class="display table table-hover">
                                    <thead>
                                        <tr>
                                            <th class="head-productos text-center">Producto</th>
                                            <th class="head-productos text-center">Precio</th>
                                            <th class="head-productos text-center">Cantidad</th>
                                            <th class="head-productos text-center">Incluido</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="producto in listaProductos">
                                            <td ng-bind="producto.descripcion"></td>
                                            <td ng-bind="producto.precio"></td>
                                            <td ng-bind="producto.cantidad"></td>
                                            <td><input type="checkbox" disabled readonly ng-model="producto.incluido" ng-true-value="'1'" ng-false-value="'0'"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="display: flex !important;">                                
                
            </div>
        </div>
    </div>
</div>	