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
                <h5 class="header-table-tecnico-select"><span> T&eacute;cnico: </span> {{tecnicoSeleccionado}}</h5>
                <table class="table table-sm table-intervenciones-skills">
                    <tbody>
                        <tr class="intervencion-tecnico" ng-repeat="intervencionModal in listadoIntervencionesSeleccionadas | orderBy:'nombre' track by $index">
                            <td>{{$index +1}} </td>
                            <td>{{intervencionModal.nombre}}</td>
                        </tr>
                    </tbody>
                </table>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal" ng-click="cerrarModalSkillsSeleccionadas()">
                    CERRAR
                </button>
           </div>
        </div>
    </div>
</div>