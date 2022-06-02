<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalOtsTrabajadas">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" > OTS Trabajadas</h5>
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
                                        <th class="th-head-terminadas">OS</th>
                                        <th class="th-head-terminadas">Cuenta</th>
                                        <th class="th-head-terminadas">Status</th>
                                        <th class="th-head-terminadas">Estado</th>
                                        <th class="th-head-terminadas">Motivo</th>
                                        <th class="th-head-terminadas">Intervención</th>
                                        <th class="th-head-terminadas">Paquete</th>
                                        <th class="th-head-terminadas">Fecha agenda</th>
                                        <th class="th-head-terminadas">Fecha termino</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr ng-repeat="ot in listadoOtsTrabajadasModal track by $index">
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Id_ot"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Folio_os"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Num_cuenta"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Desc_status"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Desc_estado"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Desc_motivo"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Desc_intervencion"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Paquete"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Fecha_agenda"></h5> </td>
                                        <td> <h5 class="descripcion-td-termin" ng-bind="ot.Fecha_termino"></h5> </td>
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