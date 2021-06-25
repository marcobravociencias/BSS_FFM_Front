<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
    id="modal-detalle-ot" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" style="color: grey;">Detalle de la Orden <span id="ot-asignada"></span></h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div style="padding-left: 0;" class="col-2">
                            <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-detalle-ot" role="tablist" aria-orientation="vertical" >
                                <li class="nav-link active" id="informacion-ot">Informaci&oacute;n</li>
                                <li class="nav-link" id="info_historico">Hist&oacute;rico</li>
                                <li class="nav-link" id="comentarios">Mensajer&iacute;a</li>
                                <li class="nav-link" id="acciones">Acciones</li>
                            </div>
                        </div>
                        <div class="col-10">
                            <div class="contenedor_detalle row" id="content-ot">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">OT</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-ot"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">OS</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-os"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Cuenta</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-cuenta"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Cliente</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-cliente"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Contacto</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-contacto"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Fecha</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-fecha"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Estatus</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-estatus"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Estado</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-estado"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Motivo</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-motivo"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Latitud</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-latitud"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Longitud</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-longitud"></span> </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Cuidad</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-ciudad"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Estado</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-estado"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Municipio</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-municipio"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Colonia</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-colonia"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Calle</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-calle"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Num. interior</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-numero-interior"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Num. exterior</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-numero-exterior"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">C&oacute;digo Postal</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-direccion-codigo-postal"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Referencia</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-referencia"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Entre calles</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-calles"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Tel&eacute;fono</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-telefono1"></span> </div>
                                        </div>
                                        <div class="container-fluid ot-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-ot">Tel. contacto</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-ot" id="ota-telefono2"></span> </div>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <br>
                            </div>
                            <div class="contenedor_detalle row" id="content-comentarios">
                                <div class="container">
                                    <jsp:include page="../contentTap/modalChat.jsp"></jsp:include>
                                </div>
                            </div>
                            <div class="contenedor_detalle row" id="content-historico">
                                <div class="container">
                                    <jsp:include page="../contentTap/modalHistorico.jsp"></jsp:include>
                                </div>
                            </div>
                            <div class="contenedor_detalle row" id="content_acciones">
                                <div class="col-12">
                                    <div class="container">
                                        <ul class="nav nav-tabs mb-3 nav-fill " id="ex1" role="tablist">
                                            <li class="nav-item" role="presentation" id="accion1">
                                                <a class="nav-link active" data-mdb-toggle="tab"  href="#accion-rescate-ot" >Rescate</a>
                                            </li>
                                            <li class="nav-item" role="presentation" id="accion2">
                                                <a class="nav-link" data-mdb-toggle="tab" href="#accion-reagendar-ot" >Reagendar</a>
                                            </li>
                                            <li class="nav-item" role="presentation" id="accion3">
                                                <a class="nav-link" data-mdb-toggle="tab" href="#accion-calendarizar-ot" >Calendarizar</a>
                                            </li>
                                            <li class="nav-item" role="presentation" id="accion4">
                                                <a class="nav-link" data-mdb-toggle="tab" href="#accion-terminar-ot" >Terminar</a>
                                            </li>        
                                            <li class="nav-item" role="presentation" id="accion5">
                                                <a class="nav-link" data-mdb-toggle="tab" href="#accion-desasignar-ot" >Desasignar</a>
                                            </li>
                                        </ul>
                                        <!-- Tabs navs -->
                                        
                                        <!-- Tabs content -->
                                        <div class="tab-content" id="ex1-content">
                                            <div class="tab-pane fade show active" id="accion-rescate-ot" >
                                                <div class="container container-accion">
                                       
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="id-status-tecnico">Motivo:</label>
                                                                <select class="form-control" ng-model="elementoRescate.motivo" ng-options="motivo.Descripcion for motivo in listadoMotivosRescate">
                                                                    <option value="">Seleccione ...</option>
                                                                </select>                                               
                                                              </div>
                                                        </div>
                                                    </div>		
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <label for="exampleTextarea">Comentario:</label>
                                                                <textarea class="form-control" style=" resize: none" ng-model="elementoRescate.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"  rows="3"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="text-align: right;">
                                                        <div class="col-12">
                                                            <button ng-click="enviarRescateOt()" class="btn  btn-primary">Rescate</button>
                                                        </div>
                                                    </div>
                                                </div>                                     
                                            </div>
                                            <div class="tab-pane fade" id="accion-reagendar-ot" >
                                                <div class="container container-accion">
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="fecha-reagendamiento">Fecha reagendamiento:</label>
                                                                <input type="text" ng-model="elementReagendaOT.fechaReagendamiento" id="fecha-reagendamiento" class="form-control ">                                 
                                                              </div>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="id-turno-reagenda">Turno:</label>
                                                                <select class="form-control" id="id-turno-reagenda" ng-model="elementReagendaOT.turno" ng-options="turno.descripcion for turno in listadoTurnosAcciones">
                                                                    <option value="">Seleccione ...</option>
                                                                </select>                                               
                                                              </div>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="id-motivo-reagenda">Motivo:</label>
                                                                <select class="form-control" id="id-motivo-reagenda" ng-model="elementReagendaOT.motivo" ng-options="motivo.Descripcion for motivo in listadoMotivosReagenda">
                                                                    <option value="">Seleccione ...</option>
                                                                </select>                                               
                                                              </div>
                                                        </div>
                                                    </div>		
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <label for="exampleTextarea">Comentario:</label>
                                                                <textarea class="form-control" style=" resize: none" ng-model="elementReagendaOT.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="text-align: right;">
                                                        <div class="col-12">
                                                            <button ng-click="enviarReagendamiento()"  class="btn  btn-primary">Reagendar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="accion-calendarizar-ot" >
                                                <div class="container container-accion">
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="fecha-calendarizado">Fecha calendarizado:</label>
                                                                <input type="text" id="fecha-calendarizado" ng-model="elementCalendarizado.fechaCalendarizado" class="form-control ">                                 
                                                              </div>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="id-turno-calendarizado">Turno:</label>
                                                                <select class="form-control" id="id-turno-calendarizado" ng-model="elementCalendarizado.turno" ng-options="turno.descripcion for turno in listadoTurnosAcciones">
                                                                    <option value="">Seleccione ...</option>
                                                                </select>                                               
                                                              </div>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="id-motivo-calendarizado">Motivo:</label>
                                                                <select class="form-control" id="id-motivo-calendarizado" ng-model="elementCalendarizado.motivo" ng-options="motivo.Descripcion for motivo in listadoMotivosCalendarizado">
                                                                    <option value="">Seleccione ...</option>
                                                                </select>                                               
                                                              </div>
                                                        </div>
                                                    </div>		
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <label for="exampleTextarea">Comentario:</label>
                                                                <textarea class="form-control" style=" resize: none" ng-model="elementReagendaOT.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="text-align: right;">
                                                        <div class="col-12">
                                                            <button ng-click="enviarCalendarizado()"  class="btn  btn-primary">Reagendar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="accion-terminar-ot" >
                                                <div class="container container-accion">
                                              
        
                                                    <div class="row align-items-center">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                                <label for="id-estado-terminar">Estado:</label>
                                                                <select class="form-control" id="id-estado-terminar" ng-model="elementTerminar.estado" ng-options="estado.Descripcion for estado in listadoEstadosTerminado">
                                                                    <option value="">Seleccione ...</option>
                                                                </select>                                               
                                                              </div>
                                                        </div>
                                                    </div>		
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <label for="exampleTextarea">Comentario:</label>
                                                                <textarea class="form-control" style=" resize: none" ng-model="elementTerminar.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="text-align: right;">
                                                        <div class="col-12">
                                                            <button ng-click="enviarTerminadoOT()"  class="btn  btn-primary">Terminar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="accion-desasignar-ot" >
                                                <div class="container container-accion">                                                                                	
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <label for="exampleTextarea">Comentario:</label>
                                                                <textarea class="form-control" style=" resize: none" ng-model="elementoDesasigna.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="text-align: right;">
                                                        <div class="col-12">
                                                            <button ng-click="enviarDesasignacion()"  class="btn  btn-primary">Desasigna</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <!-- Tabs content -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>