<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalRegistrosLocalizados">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" > Registros localizados</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" >
                </button>
            </div>
			<div class="modal-body">
				<div class="container">
                    <div class="row align-items-center">
						<div class="col-12">
                            <table id="table-ots-terminadas" class="table table-materiales table-sm table-responsive">
                                <thead class="thead-default">
                                    <tr>
                                        <th class="th-head-terminadas">OT</th>
                                        <th class="th-head-terminadas">Folio</th>
                                        <th class="th-head-terminadas">Clave Cliente</th>
                                        <th class="th-head-terminadas">Cliente</th>
                                        <th class="th-head-terminadas">Ciudad</th>
                                        <th class="th-head-terminadas">Cluster</th>
                                        <th class="th-head-terminadas">Fecha</th>
                                        <th class="th-head-terminadas">Estado</th>
                                        <th class="th-head-terminadas">Estatus</th>
                                        <th class="th-head-terminadas">Motivo</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr ng-repeat="ot in listadoArrayOtsLocalizacio track by $index">
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.idOrden"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.folioSistema"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.claveCliente"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.nombreCliente"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.ciudad"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.cluster"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.fechaAgenda"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.descripcionEstado"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.descripcionEstatus"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.descripcionMotivo"></h5> </td>
                                    </tr>
                                </tbody>
                            </table>
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