  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalEdicionUsuario" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
			<div class="modal-header">
                <h5 class="modal-title modal-title-usuariosPI">Modificar usuario</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click="cerrarModalEdicionUsuario()"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <ul class="nav nav-pills mb-3" id="pills-tab-mod" role="tablist">
                        <li class="nav-item tabPrimerOpcionRegistro" role="presentation" ng-show="tabInformacionMod">
                            <a class="nav-link active linkOpcionesRegistro" id="pills-informacion-tab-mod" data-toggle="pill" href="#pills-informacion-mod" role="tab" aria-controls="pills-informacion-mod" aria-selected="true">Informaci&oacute;n</a>
                        </li>
                        <li class="nav-item tabOpcionesRegistro" role="presentation" ng-show="tabIntervencionesMod">
                            <a class="nav-link linkOpcionesRegistro" id="pills-intervencion-tab-mod" data-toggle="pill" href="#pills-intervencion-mod" role="tab" aria-controls="pills-intervencion-mod" aria-selected="false">Intervenciones</a>
                        </li>
                        <li class="nav-item tabOpcionesRegistro" role="presentation" ng-show="tabArbolMod">
                            <a class="nav-link linkOpcionesRegistro" id="pills-arbol-tab-mod" data-toggle="pill" href="#pills-arbol-mod" role="tab" aria-controls="pills-arbol" aria-selected="false">&Aacute;rbol</a>
                        </li>
                        <li class="nav-item tabOpcionesRegistro" role="presentation" ng-show="tabAccesosMod">
                            <a class="nav-link linkOpcionesRegistro" id="pills-accesos-tab-mod" data-toggle="pill" href="#pills-accesos-mod" ng-show="mostrarAccesosMod" role="tab" aria-controls="pills-accesos-mod" aria-selected="false">Accesos</a>
                        </li>
                        <li class="nav-item tabOpcionesRegistro" role="presentation" ng-show="tabTecnicosMod">
                            <a class="nav-link linkOpcionesRegistro" id="pills-tecnico-tab-mod" ng-click="revisionTecnicosDespachosMod()" data-toggle="pill" href="#pills-tecnico-mod" ng-show="mostrarTecnicosMod" role="tab" aria-controls="pills-tecnico-mod" aria-selected="false">T&eacute;cnicos</a>
                        </li>
                        <li class="nav-item tabOpcionesRegistro" role="presentation" ng-show="tabDespachosMod">
                        	<a class="nav-link linkOpcionesRegistro" id="pills-despacho-tab-mod" ng-click="revisionTecnicosDespachosMod()" data-toggle="pill" href="#pills-despacho-mod" ng-show="mostrarDespachoMod" role="tab" aria-controls="pills-despacho-mod" aria-selected="false">Despachos</a>
                        </li>
                        <li class="nav-item tabOpcionesRegistro" role="presentation" ng-show="tabPerfilesMod">
                        	<a class="nav-link linkOpcionesRegistro" id="pills-perfiles-tab-mod" data-toggle="pill" href="#pills-perfiles-mod" role="tab" aria-controls="pills-perfiles-mod" aria-selected="false">Perfiles</a>
                        </li>
                        <li class="nav-item tabOpcionesRegistro" role="presentation" ng-show="tabConfirmacionMod">
                            <a class="nav-link linkOpcionesRegistro" id="pills-confirmar-tab-mod" data-toggle="pill" ng-click="cargarInfoConfirmacionModificacion()" href="#pills-confirmar-mod" role="tab" aria-controls="pills-confirmar-mod" aria-selected="false">Confirmar Usuario</a>
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
                        <div class="tab-pane fade" id="pills-despacho-mod" role="tabpanel" aria-labelledby="pills-despacho-tab-mod">
                        	<jsp:include page="./../content/despachoMod.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade" id="pills-perfiles-mod" role="tabpanel" aria-labelledby="pills-perfiles-tab-mod">
                        	<jsp:include page="./../content/perfilesMod.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade" id="pills-confirmar-mod" role="tabpanel" aria-labelledby="pills-confirmar-tab-mod">
                            <jsp:include page="./../content/confirmacionMod.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>	
            
            <div class="modal-footer">
            	<button type="button" id="btnModalModificarUsuario" class="btn btn-sm btn-primary" ng-click="modificarUsuario()" style="padding: 0.6em 2em 0.6em 2em;" ng-show="!existeUsuarioValidacionMod">MODIFICAR</button>
                <div class="txtMensajeAlertaValidaciones" ng-show="existeUsuarioValidacionMod">
                	<span><i class="fas fa-warning"></i>&nbsp; Revise la informaci&oacute;n ingresada, existen datos duplicados.</span>
                </div>
                <button type="button" class="btn btn-sm btn-cerrar-modal" ng-click="cerrarModalEdicionUsuario()" data-mdb-dismiss="modal" aria-label="Close">Cerrar</button>
            </div>
        </div>
    </div>
</div>