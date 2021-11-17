<!-- <div class="modal fade bd-example-modal-lg" style="padding-top: 2em;" id="modalEdicionUsuario" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"> -->
<!--     <div class="modal-dialog modal-lg" style="min-width: 95% !important; max-width: 95% !important;"> -->
<!--         <div class="modal-content"> -->
        
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalEdicionUsuario" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
<!--             <div class="blue-gradient style_modal_header modal-header modal_header_bg" style="color: #fff;"> -->
<!--                 <h5 style="font-weight: bold;" class="modal-title header-title">Modificar usuario</h5> -->
<!--                 <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click="cerrarModalEdicionUsuario()"></button> -->
<!--             </div> -->
			<div class="modal-header">
                <h5 class="modal-title">Modificar usuario</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click="cerrarModalEdicionUsuario()"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <ul class="nav nav-pills mb-3" id="pills-tab-mod" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="pills-informacion-tab-mod" ng-click="ocultarBotonMod()" data-toggle="pill" href="#pills-informacion-mod" role="tab" aria-controls="pills-informacion-mod" aria-selected="true">Informaci&oacute;n</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-intervencion-tab-mod" ng-click="ocultarBotonMod()" data-toggle="pill" href="#pills-intervencion-mod" role="tab" aria-controls="pills-intervencion-mod" aria-selected="false">Intervenciones</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-arbol-tab-mod" ng-click="ocultarBotonMod()" data-toggle="pill" href="#pills-arbol-mod" role="tab" aria-controls="pills-arbol" aria-selected="false">&Aacute;rbol</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-accesos-tab-mod" ng-click="ocultarBotonMod()" data-toggle="pill" href="#pills-accesos-mod" ng-show="mostrarAccesosMod" role="tab" aria-controls="pills-accesos-mod" aria-selected="false">Accesos</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-tecnico-tab-mod" ng-click="revisionTecnicosDespachosMod()" data-toggle="pill" href="#pills-tecnico-mod" ng-show="mostrarTecnicosMod" role="tab" aria-controls="pills-tecnico-mod" aria-selected="false">T&eacute;cnicos</a>
                        </li>
                        <li class="nav-item" role="presentation">
                        	<a class="nav-link" id="pills-despacho-tab-mod" ng-click="revisionTecnicosDespachosMod()" data-toggle="pill" href="#pills-despacho-mod" ng-show="mostrarDespachoMod" role="tab" aria-controls="pills-despacho-mod" aria-selected="false">Despachos</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-confirmar-tab-mod" data-toggle="pill" ng-click="cargarInfoConfirmacionModificacion()" href="#pills-confirmar-mod" role="tab" aria-controls="pills-confirmar-mod" aria-selected="false">Confirmar Usuario</a>
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
                        <div class="tab-pane fade" id="pills-confirmar-mod" role="tabpanel" aria-labelledby="pills-confirmar-tab-mod">
                            <jsp:include page="./../content/confirmacionMod.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>	
            
            <div class="modal-footer">
            	<button type="button" class="btn btn-sm btn-primary" ng-click="modificarUsuario()" ng-show="verBtnModificar" style="padding: 0.6em 2em 0.6em 2em;">MODIFICAR</button>
                <button type="button" class="btn btn-sm btn-cerrar-modal" ng-click="cerrarModalEdicionUsuario()" data-mdb-dismiss="modal" aria-label="Close">Cerrar</button>
            </div>
        </div>
    </div>
</div>