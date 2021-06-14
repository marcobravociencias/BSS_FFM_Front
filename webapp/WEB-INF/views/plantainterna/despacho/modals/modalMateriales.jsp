<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalMaterialesOperario">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Materiales operario</h5>
                <button type="button" class="btn-close"  data-mdb-dismiss="modal" aria-label="Close" ></button>
            </div>
			<div class="modal-body">
				<div class="container">
                    <div class="row">
                        <div class="col-3">
                          <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab" role="tablist" aria-orientation="vertical" >
                            <a class="nav-link active" id="v-tabs-consulta-materiales-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-materiales" role="tab" aria-controls="v-tabs-consulta-materiales" aria-selected="true" >Consulta Materiales</a>
                            <a class="nav-link" id="v-tabs-consulta-traspasos-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-traspasos" role="tab" aria-controls="v-tabs-consulta-traspasos" aria-selected="false" >Consulta traspasos</a>                    
                          </div>
                        </div>                      
                        <div class="col-9">
                          <div class="tab-content" id="v-tabs-tabContent">
                            <div class="tab-pane fade show active" id="v-tabs-consulta-materiales" role="tabpanel" aria-labelledby="v-tabs-consulta-materiales-tab" >
                                <table class="table table-materiales table-sm ">
                                    <thead>
                                      <tr>
                                        <th scope="col">Descripci&oacute;n</th>
                                        <th scope="col">Lote</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Unidad</th>
                                        <th scope="col">Familia</th>
                                        <th scope="col">Manejo</th>

                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr class="" ng-repeat="material in objectMateriales.arrayMateriales track by $index">
                                        <td> <span class="text-materiales" ng-bind="material.descripcion"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.lote"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.cantidad"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.precio"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.unidad"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.familia"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.manejo"></span> </td>
                                      </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="v-tabs-consulta-traspasos" role="tabpanel" aria-labelledby="v-tabs-consulta-traspasos-tab">
                                <table class="table table-materiales table-sm ">
                                    <thead>
                                      <tr>
                                        <th scope="col">Id material</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Id traspaso</th>
                                        <th scope="col">Serie</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr ng-repeat="material in objectMateriales.arrayTraspasos track by $index" class="">
                                        <td> <span class="text-materiales" ng-bind="material.id"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.cantidad"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.idTraspaso"></span> </td>
                                        <td> <span class="text-materiales" ng-bind="material.serie"></span> </td>
                                      </tr>
                                    </tbody>
                                </table>
                            </div>
                          </div>
                        </div>
                    </div>	
				</div>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cerrar
                </button>
           </div>
        </div>
    </div>
</div>