<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalleOt">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Informaci&oacute;n de la orden</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div style="padding-left: 0;" class="col-2">
                            <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-detalle-ot" role="tablist"
                                aria-orientation="vertical">
                                <!--a class="nav-link active" id="v-tabs-consulta-detalleot-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-detalleot" role="tab"
                                    aria-controls="v-tabs-consulta-detalleot-tab"
                                    aria-selected="true">Informaci&oacute;n</a>
                                <a ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1" class="nav-link "
                                    id="v-tabs-consulta-historico-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-historico" role="tab" ng-click="consultarHistorial()"
                                    aria-controls="v-tabs-consulta-historico-tab"
                                    aria-selected="true">Hist&oacute;rico</a>
                                <a ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1" class="nav-link"
                                    id="v-tabs-consulta-mensajeria-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-mensajeria" role="tab" ng-click="consultarComentarios();"
                                    aria-controls="v-tabs-consulta-mensajeria-tab" aria-selected="false">Comentarios</a-->
                                <a class="nav-link active" id="v-tabs-consulta-acciones-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-acciones" role="tab"
                                    aria-controls="v-tabs-consulta-acciones-tab" aria-selected="false">Acciones</a>
                                <!--a ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1"
                                    class="nav-link" id="v-tabs-consulta-paquete-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-paquete" ng-click="obtenerPaquete()" role="tab"
                                    aria-controls="v-tabs-consulta-paquete-tab" aria-selected="false">Paquete</a-->
                            </div>
                        </div>
                        <div class="col-10">
                            <div class="tab-content" id="v-tabs-tabContent">
                                <!--div class="tab-pane fade show active" id="v-tabs-consulta-detalleot" role="tabpanel" aria-labelledby="v-tabs-consulta-detalleot-tab">
                                    Detalle ot
                                </div>
                                <div ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1" class="tab-pane fade " id="v-tabs-consulta-historico" role="tabpanel"
                                    aria-labelledby="v-tabs-consulta-historico-tab">
                                    Historico
                                </div>
                                <div ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1" class="tab-pane fade" id="v-tabs-consulta-mensajeria" role="tabpanel"
                                    aria-labelledby="v-tabs-consulta-mensajeria-tab">
                                    Comentarios
                                </div-->
                                <div class="tab-pane fade show active" id="v-tabs-consulta-acciones" role="tabpanel"
                                    aria-labelledby="v-tabs-consulta-acciones-tab">
                                    <ul class="nav nav-tabs mb-3 nav-fill tabs-acciones-modal" id="ex1" role="tablist">
                                        <li class="nav-item" role="presentation" ng-show="vistaCoordinacion !== 1">
                                            <a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1 }"
                                                id="opcion-reagendar" class="nav-link active" data-mdb-toggle="tab"
                                                href="#accion-reagendar-ot">Reagendar</a>
                                        </li>
                                        <li class="nav-item" role="presentation" ng-show="vistaCoordinacion !== 7">
                                            <a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusGestoriaModal') !== -1 }"
                                                id="opcion-plaza" class="nav-link" data-mdb-toggle="tab"
                                                href="#accion-plaza-comercial-ot">Plaza comercial</a>
                                        </li>
                                        <li class="nav-item" role="presentation" ng-show="vistaCoordinacion !== 6">
                                            <a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1 }"
                                                id="opcion-calendarizar" class="nav-link" data-mdb-toggle="tab"
                                                href="#accion-calendarizar-ot">Calendarizar</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="ex1-content">
                                        <div class="tab-pane fade show active" id="accion-reagendar-ot">
                                            <div class="container container-accion">
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="fecha-reagendamiento">Fecha
                                                                reagendamiento:</label>
                                                            <input type="text"
                                                                ng-model="elementReagendaOT.fechaReagendamiento"
                                                                id="fecha-reagendamiento" class="form-control" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-turno-reagenda">Turno:</label>
                                                            <select class="form-control" id="id-turno-reagenda"
                                                                ng-model="elementReagendaOT.turno"
                                                                ng-options="turno.nombre for turno in listadoTurnosAcciones">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-motivo-reagenda">Motivo:</label>
                                                            <select class="form-control" id="id-motivo-reagenda"
                                                                ng-model="elementReagendaOT.motivo"
                                                                ng-options="motivo.nombre for motivo in listadoMotivosReagenda">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label for="exampleTextarea">Comentario:</label>
                                                            <textarea class="form-control" style=" resize: none"
                                                                ng-model="elementReagendaOT.comentario"
                                                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                                                rows="3"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <button ng-show="accionesUserConfigText.indexOf('accionReagendaOT') !== -1" ng-click="cambioStatus('reagendamiento')"
                                                            class="btn  btn-primary">Reagendar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="accion-calendarizar-ot">
                                            <div class="container container-accion">
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="fecha-calendarizado">Fecha
                                                                calendarizado:</label>
                                                            <input type="text" id="fecha-calendarizado"
                                                                ng-model="elementCalendarizado.fechaCalendarizado"
                                                                class="form-control " readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-turno-calendarizado">Turno:</label>
                                                            <select class="form-control" id="id-turno-calendarizado"
                                                                ng-model="elementCalendarizado.turno"
                                                                ng-options="turno.nombre for turno in listadoTurnosAcciones">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-motivo-calendarizado">Motivo:</label>
                                                            <select class="form-control" id="id-motivo-calendarizado"
                                                                ng-model="elementCalendarizado.motivo"
                                                                ng-options="motivo.nombre for motivo in listadoMotivosCalendarizado">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label for="exampleTextarea">Comentario:</label>
                                                            <textarea class="form-control" style=" resize: none"
                                                                ng-model="elementCalendarizado.comentario"
                                                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                                                rows="3"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <button ng-click="cambioStatus('calendariza')" class="btn btn-primary">Calendarizar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="accion-plaza-comercial-ot">
                                            <div class="container container-accion">
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-turno-calendarizado">Estado:</label>
                                                            <select class="form-control" id="id-estado-plaza-comercial"
                                                                ng-model="elementoPlazaComercial.estado"
                                                                ng-options="turno.nombre for turno in listadoEstadoGestoria">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-motivo-calendarizado">Motivo:</label>
                                                            <select class="form-control" id="id-motivo-calendarizado"
                                                                ng-model="elementoPlazaComercial.motivo"
                                                                ng-options="motivo.nombre for motivo in listadoMotivosGestaria">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label for="exampleTextarea">Comentario:</label>
                                                            <textarea class="form-control" style=" resize: none"
                                                                ng-model="elementoPlazaComercial.comentario"
                                                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                                                rows="3"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <button ng-click="cambioStatus('gestoria')" class="btn  btn-primary">Plaza</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--div ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1" class="tab-pane fade" id="v-tabs-consulta-paquete" role="tabpanel"
                                    aria-labelledby="v-tabs-consulta-paquete-tab">
                                    Paquete
                                </div-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>