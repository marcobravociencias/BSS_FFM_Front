<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalActualizarDisponibilidadV2">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Actualizar Disponibilidad&nbsp;
                    <span id="fechaActualizarDispv2"></span>
                </h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body mt-2 pt-0">
                <div class="col-12 mb-2">
                    <div class="row">
                        <div class="col-6">
                            <div class="container-fluid dispv2-content">
                                <div class="container-text-title-detalle-dispv2">
                                    <span class="text-title-dispv2">Geograf&iacute;a:</span>
                                </div>
                            </div>
                            <div class="container-fluid dispv2-content">
                                <div class="container-text-content-detalle-dispv2">
                                    <span class="text-content-dispv2" id="geografiaActualizarDispv2"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="container-fluid dispv2-content">
                                <div class="container-text-title-detalle-dispv2">
                                    <span class="text-title-dispv2">Intervenci&oacute;n:</span>
                                </div>
                            </div>
                            <div class="container-fluid dispv2-content">
                                <div class="container-text-content-detalle-dispv2">
                                    <span class="text-content-dispv2" id="intervencionActualizarDispv2"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 pl-0 pr-0">
                    <div class="row" ng-if="listTurnosUsuarioDispV2.length == 3">
                        <div class="col-4" ng-repeat="turno in listTurnosUsuarioDispV2">
                            <div class="form-control-sm">
                                <label class="title_campos_v2">
                                    <i class=" fa-lg fa fa-sort-numeric-asc"></i>{{turno.nombre}}
                                </label>
                                <input id="turno_{{turno.id}}" type="text" class="form-control form-control-sm input-filtro-disponibilidadv2" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5">
                            </div>
                        </div>
                    </div>
                    <div class="row" ng-if="listTurnosUsuarioDispV2.length == 2">
                        <div class="col-6" ng-repeat="turno in listTurnosUsuarioDispV2">
                            <div class="form-control-sm">
                                <label class="title_campos_v2">
                                    <i class=" fa-lg fa fa-sort-numeric-asc"></i>{{turno.nombre}}
                                </label>
                                <input id="turno_{{turno.id}}" type="text" class="form-control form-control-sm input-filtro-disponibilidadv2" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5">
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="col-12 pl-0 pr-0 mt-2">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-control-sm">
                                <label class="title_campos_v2">
                                    <i class=" fa-lg fa fa-calendar"></i>Fecha Inicio
                                </label>
                                <input readonly type="text" id="fechaInicio_actualizar_Dispv2" class="datepicker input-filtro-dispv2 form-control form-control-sm" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-control-sm">
                                <label class="title_campos_v2">
                                    <i class=" fa-lg fa fa-calendar"></i>Fecha Fin
                                </label>
                                <input readonly type="text" id="fechaFin_actualizar_Dispv2" class="datepicker input-filtro-dispv2 form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="col-12 mt-3 pl-0 pr-0 mb-4">
                    <div class="form-control-sm">
                        <label class="title_campos_v2">
                            <i class=" fa-lg fa fa-lock"></i>&nbsp;Estatus
                        </label>
                        <div class="custom-control custom-radio col-6">
                            <input type="radio" class="custom-control-input" value="true" id="check_activo_actv2" name="checkEstatusDispV2">
                            <label class="custom-control-label" for="check_activo_actv2">Activo</label>
                        </div>
                        <div class="custom-control custom-radio col-6">
                            <input type="radio" class="custom-control-input" value="false" id="check_inactivo_actv2" name="checkEstatusDispV2">
                            <label class="custom-control-label" for="check_inactivo_actv2">Inactivo</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" ng-click="actualizarDisponibilidadv2()" class="btn-aceptar-modal btn btn-sm ripple-surface">
                    <i class="fa fa-edit" aria-hidden="true"></i> Actualizar d&iacute;a
                </button>
            </div>
        </div>
    </div>
</div>