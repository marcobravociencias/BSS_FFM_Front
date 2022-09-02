<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
    id="modal-valida-ot" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header" style="border-bottom: none;">
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body p-0">
                <div class="container p-0">
                    <div class="title-tranferidas">
                        <p>La OT <span style="font-weight: bold; color: #000 !important;" ng-bind="datoOt"></span> tiene <span ng-bind="listaOrdenesTransferidas.length" style="color: red;"></span> orden(es) transferidas.</p>
                        <p>&iquest;Desea transferir una nueva orden?</p>
                    </div>
                    <div class="content-fluid">
                        <div class="table-responsive">
                            <table id="transferidasTable" class="display table" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>OS</th>
                                        <th>Cliente</th>
                                        <th>Usuario</th>
                                        <th>Fecha agenda</th>
                                        <th>Tipo</th>
                                        <th>Subtipo</th>
                                        <th>Estado</th>
                                        <th>Estatus</th>
                                        <th>Geograf&iacute;a</th>
                                        <th>Motivo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ripple-surface btn-transferir" ng-click="consultaDetalleTraspasoGen(datoOt)"
					data-mdb-dismiss="modal">
					Transferir
				</button>
				<button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
					data-mdb-dismiss="modal">
					Cancelar
				</button>
			</div>
		</div>
        </div>
    </div>
</div>