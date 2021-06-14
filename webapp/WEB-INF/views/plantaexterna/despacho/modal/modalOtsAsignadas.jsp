<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalOtsAsignadas">
    <div class="modal-dialog" style="min-width: 60% !important; max-width: 60% !important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ots Asignadas</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="min-height: 300px; max-height: 300px; overflow: auto;">
                <div class="col-12" ng-show="mostrarOtsAsignadas">
                    <div class="row">
                        <div class="offset-8 col-4">
                            <div class="input-group">
                                <input type="text" class="form-control input-search-despacho" ng-model="filtroOtAsignadaModal.idot" placeholder="Buscar OT" aria-describedby="button-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-4 ui-draggable fc-event efecto ui-draggable-handle" id="otAsignada{{ot.idot}}" ng-repeat="ot in listaOtsAsignadas | filter: filtroOtAsignadaModal">
                            <div class="ot-asignada-event">
                                <div class="header-otpendeinte">
                                    <div class="row">
                                        <div class="col-7 crop-text-col" style="padding-right: 0;">
                                            <h5 class="title-ot-asignada" title="{{ot.nivel_uno}}"
                                                ng-bind="ot.nivel_uno"></h5>
                                        </div>
                                        <div class="col-5" style="padding-left: 0;">
                                            <i class="icon-ot-asignada fa fa-share" title="Reasignar" ng-click="mostrarTecnicosReasignacion(ot)"></i>
                                            <i class="icon-ot-asignada fa fa-header"></i>
                                            <i class="icon-ot-asignada fa fa-commenting"></i>
                                            <i class="icon-ot-asignada fa fa-bars"></i>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <span class="text-secundario-prin">Ciudad: </span>
                                            <span class="text-secundario-sec" ng-bind="ot.ciudad"></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <span class="text-secundario-prin">Distrito: </span>
                                            <span class="text-secundario-sec" ng-bind="ot.distrito"></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-4 crop-text-col" style="padding-right: 0;">
                                            <span class="text-secundario-prin">Zona: </span>
                                            <span class="text-secundario-sec" ng-bind="ot.zona"
                                                title="{{ot.zona}}"></span>
                                        </div>
                                        <div class="col-6 crop-text-col" style="padding-right: 0;">
                                            <span class="text-secundario-prin">Cluster: </span>
                                            <span class="text-secundario-sec" ng-bind="ot.cluster_text"></span>
                                        </div>
                                        <div class="col-2">

                                        </div>
                                    </div>

                                </div>
                                <div class="footer-ot-asignada">
                                    <div class="content-footer">
                                        <b class="text-secundario-prin">OT: </b>
                                        <span class="text-secundario-sec" ng-bind="ot.idot"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12" ng-show="!mostrarOtsAsignadas">
                    <div class="row">
                        <div class="col-12">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4" ng-repeat="operario in listaOperariosReasignacion">
                            <div class="operario-asignacion">
                                <div class="row">
                                    <div class="col-3" >
                                        <div class="text-center">
                                            <img src="${pageContext.request.contextPath}/resources/img/alertas/tecnico.png" class="img-fluid z-depth-1 rounded-circle img-operario-asignacion"
                                                alt="Responsive image">
                                        </div>
                                    </div>
                                    <div class="col-9 content-operario">
                                        <div class="row">
                                            <div class="col-12 crop-text-col">
                                                <span class="text-nombre-tecnico" title="{{operario.nombre}}" ng-bind="operario.nombre"></span>
                                            </div>
                                            <div class="col-12">
                                                <i class="fa fa-user icon-primary-tecnico">&nbsp;</i><span ng-bind="operario.nempleado" class="text-num-tecnico"></span>
                                                <i class="fa fa-phone icon-primary-tecnico">&nbsp;</i><span ng-bind="operario.telefono" class="text-num-tecnico"></span>
                                            </div>
                                            <!--div>
                                                <i class="fa fa-eye con-tecnico icon-tecnico-secundary">&nbsp;</i>
                                                <i class="fa fa-info-circle icon-tecnico-secundary">&nbsp;</i>
                                                <i class="fa fa-map icon-tecnico-secundary">&nbsp;</i>
                                            </div-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>