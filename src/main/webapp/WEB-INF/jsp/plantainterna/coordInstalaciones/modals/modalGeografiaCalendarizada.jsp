<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal-geografia-calendarizada">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> &Aacute;rbol geograf&iacute;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group input-group-sm content-seach-group">
                                <input id="searchGeografiaCalendarizada" type="text" class="form-control buscadorGenerico"
                                    placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaFiltroCalendarizada()">
                                <span class="fa fa-search iconoBusqueda"></span>
                            </div>
                        </div>
                        <br>
                        <br>
                        <div class="col-md-12 col-conteiner-arbol">
                            <div class="container-treegeofria">
                                <div id="jstree-calendarizar" class="proton-demo"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>