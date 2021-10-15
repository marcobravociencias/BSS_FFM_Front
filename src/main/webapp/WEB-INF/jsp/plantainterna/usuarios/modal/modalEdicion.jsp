<div class="modal fade bd-example-modal-lg" style="padding-top: 2em;" id="modalEdicionUsuario" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="min-width: 95% !important; max-width: 95% !important;">
        <div class="modal-content">
            <div class="blue-gradient style_modal_header modal-header modal_header_bg" style="color: #fff;">
                <h5 style="font-weight: bold;" class="modal-title header-title">Modificar usuario</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click=""></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <ul class="nav nav-pills mb-3" id="pills-tab-mod" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="pills-informacion-tab-mod" data-toggle="pill" href="#pills-informacion-mod" role="tab" aria-controls="pills-informacion-mod" aria-selected="true">Informaci&oacute;n</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-intervencion-tab-mod" data-toggle="pill" href="#pills-intervencion-mod" role="tab" aria-controls="pills-intervencion-mod" aria-selected="false">Intervenciones</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-arbol-tab-mod" data-toggle="pill" href="#pills-arbol-mod" role="tab" aria-controls="pills-arbol" aria-selected="false">&Aacute;rbol</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-accesos-tab-mod" data-toggle="pill" href="#pills-accesos-mod" ng-show="mostrarAccesos" role="tab" aria-controls="pills-accesos-mod" aria-selected="false">Accesos</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-tecnico-tab-mod" data-toggle="pill" href="#pills-tecnico-mod" ng-show="mostrarTecnicos" role="tab" aria-controls="pills-tecnico-mod" aria-selected="false">T&eacute;cnico</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-confirmar-tab-mod" data-toggle="pill" ng-click="mostrarConfirmacionModificacion()" href="#pills-confirmar-mod" role="tab" aria-controls="pills-confirmar-mod" aria-selected="false">Confirmar Usuario</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent-mod">
                        <div class="tab-pane fade show active" id="pills-informacion-mod" role="tabpanel" aria-labelledby="pills-informacion-tab-mod">
                            <jsp:include page="./../content/informacionMod.jsp"></jsp:include> 
                        </div>
                        <div class="tab-pane fade" id="pills-intervencion-mod" role="tabpanel" aria-labelledby="pills-intervencion-tab-mod">
                            <jsp:include page="./../content/intervencionesMod.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade" id="pills-arbol-mod" role="tabpanel" aria-labelledby="pills-arbol-tab-mod">
                            <jsp:include page="./../content/arbolMod.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade show" id="pills-accesos-mod" role="tabpanel" aria-labelledby="pills-accesos-tab-mod">
                            <jsp:include page="./../content/accesosMod.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade" id="pills-tecnico-mod" role="tabpanel" aria-labelledby="pills-tecnico-tab-mod">
                            <jsp:include page="./../content/tecnicoMod.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade" id="pills-confirmar-mod" role="tabpanel" aria-labelledby="pills-confirmar-tab-mod">
                            <jsp:include page="./../content/confirmacionMod.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>	
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-cerrar-modal" data-mdb-dismiss="modal" aria-label="Close">Cerrar</button>
            </div>
        </div>
    </div>
</div>