<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalSkillsSeleccionadas">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Skills seleccionadas</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" 
                    ng-click="cerrarModalSkillsSeleccionadas()"
                    >
                </button>
            </div>
            <div class="modal-header">
				<h5>TÉCNICO: {{tecnicoSeleccionado}}</h5>
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="scrollGeneral">
						<table class="table">
							<tbody>
								<tr ng-repeat="intervencionModal in listadoIntervencionesSeleccionadas | orderBy:'nombre' track by $index">
									<td>{{$index +1}} </td>
									<td>{{intervencionModal.nombre}}</td>
								</tr>
							</tbody>
						</table>
	                </div>
				</div>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal" ng-click="cerrarModalSkillsSeleccionadas()">
                    CERRAR
                </button>
           </div>
        </div>
    </div>
</div>