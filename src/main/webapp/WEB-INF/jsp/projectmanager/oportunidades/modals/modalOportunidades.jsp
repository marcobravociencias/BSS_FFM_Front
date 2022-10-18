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
                            <label for="" class="label-filter">Vertical</label>

                         
                                <div class="form-group">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                </div>
                                        <input list="pVerticales" type="text" id="iVertical" placeholder="Vertical"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    <datalist id="pVerticales">
                                        <option value="Carriers">
                                        <option value="Gobierno Federal">
                                            <option value="Estatre&aacute;gicas I">
                                        <option value="Estatre&aacute;gicas II">
                                        <option value="Estatre&aacute;gicas III">
                                        <option value="Estatre&aacute;gicas IV">
                                    </datalist>
                              

                            
                            
                        </div>
                        <div class="col-md-6" style="width: 11%;">
                                   <label for="ot_asignadao" class="label-filter">Celula</label>
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