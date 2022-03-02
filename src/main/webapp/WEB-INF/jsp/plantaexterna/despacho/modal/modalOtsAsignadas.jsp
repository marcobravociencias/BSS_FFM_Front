<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalOtsAsignadas">
    <div class="modal-dialog" style="min-width: 60% !important; max-width: 60% !important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ots Asignadas</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="min-height: 300px; max-height: 300px; overflow: auto;">
                <div class="content-asignada-modal" ng-show="mostrarOtsAsignadas">
                    <div class="row">
                        <div class="offset-9 col-3">
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm input-search-asignadas"
                                    id="searchOt" placeholder="Buscar OT"><button ng-click="buscarOtModal()"
                                    style="height: 2.25em;box-shadow: none;"
                                    class="btn btn-sm btn-primary waves-effect waves-light ripple-surface btn-total"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-left:0.5em;">
                        <div class="col-4 fc-event  evento-ot-asignada ot-asignada-modal content-ot-asigna cardot-{{otAsignada.idOrden}}"
                            ng-click="selectOtReasignar(otAsignada.idOrden)"
                            ng-repeat="otAsignada in listOtsAsiganadasMoreTemp" .
                            style="border-left: 0.5em solid {{otAsignada.colorOverEstatus}}; top: 0px;">
                            <div class="fc-content">
                                <div class="fc-title" style="position: relative;">
                                    <div class="container-asignada">
                                        <div class="content-text-otasignada">
                                            <h5 class="cliente-asignada">{{otAsignada.descipcionTipoOrden}}</h5>
                                        </div>
                                        <div class="content-text-otasignada">
                                            <div class="izquierda-icon">
                                                <i class="fas fa-map-marker-alt  icon-tipoot-operacion"></i>
                                            </div>
                                            <b
                                                class="os-content-asignada">{{otAsignada.descripcionGeografia}}</b>&nbsp;&nbsp;
                                        </div>
                                        <div class="content-text-otasignada">
                                            <div class="izquierda-icon">
                                                <i class="fas fa-tools  icon-tipoot-operacion"
                                                    style="color:{{otAsignada.colorOverEstatus}}"></i>
                                            </div>
                                            <b class="orden-content">OT:{{otAsignada.idOrden}}</b>&nbsp;&nbsp;
                                        </div>
                                        <div class="content-text-otasignada asignada-descripcion">
                                            <b class="orden-content"
                                                style="font-weight: bold">{{otAsignada.descripcionSubtipoOrden}}</b>&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="fc-bg"></div>
                        </div>
                    </div>
                </div>
                <div class="content-operarios-modal" ng-show="!mostrarOtsAsignadas">
                    <div class="row">
                        <div class="offset-9 col-3">
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm input-search-asignadas"
                                    id="searchTecnicoOt" placeholder="Buscar T&eacute;cnico"><button
                                    ng-click="buscarTecnicoModal('searchTecnicoOt')"
                                    style="height: 2.25em;box-shadow: none;"
                                    class="btn btn-sm btn-primary waves-effect waves-light ripple-surface btn-total"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-left:0.5em;">
                        <div class="col-4 fc-cell-text evento-ot-asignada ot-asignada-modal content-ot-oper cardoper-{{tecnico.idTecnico}}"
                            ng-click="seleccionOperarioReasignar(tecnico.idTecnico, false)"
                            ng-repeat="tecnico in listadoTecnicosAsigna">
                            <div class="row">
                                <div class="col-2">
                                    <img style="border:.3em solid {{tecnico.color}}; width: 4em; height: 4em;margin-top:1em"
                                        class="efecto imagen_operario_foto"
                                        src="{{(tecnico.urlFotoPerfil != undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil : './resources/img/plantainterna/despacho/tecnicootasignada.png')}}">
                                </div>
                                <div class="offset-1 col-8 text-justify info-modal-operario">
                                    <div class="conteo-content-ots">
                                    </div>
                                    <div class="row">
                                        <h5 title="{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}"
                                            class="big-text nombre_tecnico">
                                            {{tecnico.nombre}} {{tecnico.apellidoPaterno}} </h5>
                                    </div>
                                    <div class="row">
                                        <small class="numero_empleado_telefono">
                                            <i style="color:#4991e1;" class="fa fa-user"></i>
                                            {{tecnico.usuarioFFM}}
                                        </small>
                                    </div>
                                    <div class="row">
                                        <small class="numero_empleado_telefono">
                                            <i style="color:#4991e1;" class="fa fa-phone"></i>
                                            {{tecnico.numContacto}}
                                        </small>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" ng-show="isSelectedOt && !mostrarOtsAsignadas" style="height: 2.6em;"
                    class="btn btn-sm btn-primary ripple-surface" ng-click="regrearAsignaOt()"><i
                        class="fas fa-angle-left" aria-hidden="true"></i> Regresar</button>
                <button type="button" ng-show="mostrarOtsAsignadas" style="height: 2.6em;" ng-disabled="!isSelectedOt"
                    class="btn btn-sm btn-primary ripple-surface" ng-click="reasignarTecnicoModal()"><i
                        class="fa fa-user" aria-hidden="true"></i> Seleccionar t&eacute;cnico</button>
                <button type="button" ng-show="!mostrarOtsAsignadas" style="height: 2.6em;" ng-disabled="!isSelectedTec"
                    class="btn btn-sm btn-primary ripple-surface" ng-click="reasignarTecnicoOt()"><i
                        class="fas fa-people-arrows" aria-hidden="true"></i> Reasignar</button>
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>