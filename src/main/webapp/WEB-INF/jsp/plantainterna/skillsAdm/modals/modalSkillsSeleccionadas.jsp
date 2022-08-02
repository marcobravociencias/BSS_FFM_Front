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
                    ng-click="cerrarModalSkillsSeleccionadas()" >
                </button>
            </div>
			<div class="modal-body">
                <div class="container">
                	<div class="row">
                		<div class="col-md-12">
                			<h5 class="header-table-tecnico-select">{{tecnicoSeleccionado}}</h5>
                		</div>
                	</div>
                	<div class="row">
	                	<div class="col-md-12 scrollGeneral">
	                		<table class="table table-sm table-intervenciones-skills">
			                    <tbody>
			                        <tr class="intervencion-tecnico" ng-repeat="intervencionModal in listadoIntervencionesSeleccionadas | orderBy:'nombre' track by $index">
			                            <td>{{$index +1}} </td>
			                            <td>{{intervencionModal.text}}</td>
			                        </tr>
			                    </tbody>
			                </table>
	                	</div>
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