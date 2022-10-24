<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-detalle-lider" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title modal-title-consulta-ot" style="color: grey;">Solicitud de L&iacute;der T&eacute;cnico y Torre de Control</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        
                        <div class="col-md-6" style="width: 11%;">
                            <label for="" class="label-filter">L&iacute;der T&eacute;cnico</label>

                         
                                <div class="form-group">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                </div>
                                <select style="border-left:.4em solid" class="select-status-tecnico form-control" id="id-tecnico" ng-model="selectedLiderTecnico" ng-options="estatus.liderTecnico for estatus in resultSolicituLiderTecnico">
                                    <option value="">Seleccione ...</option>
							    </select>  
                              

                            
                            
                        </div>
                        <div class="col-md-6" style="width: 11%;">
                                   <label for="ot_asignadao" class="label-filter">Torre de control</label>
                                   <div class="form-row">
                                    <div class="form-group">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                    </div>
                                    </div>
                        </div>


                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" ng-click="asignarLider()"
                    class="btn btn-primary btn-guardar ripple-surface" style="height: 2.75em; padding: 0.5em 2em;">
                    Asignar
                </button>
            </div>
        </div>
    </div>
</div>