<div class="container-fluid content-alertas" ng-show="!vistaDespacho">
    <div class="row">
        <div class="col-12 header-alertas">
            <i class="fa fa-times icon-exit-header-alertas" ng-click="cerrarAlertas()"></i>
        </div>
    </div>
    <div class="row">
        <div class="col-3">
            <div class="card cards-alertas">
                <div class="card-header card-header-alerta-principal">
                    <span class="titulo-alerta-modal">OTS</span>
                </div>
                <div class="card-body card-body-alerta-principal">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group">
                                <input id="buscador-alertas-ot" ng-keyup="buscarOtAlertaKeyUpOt($event)" type="text"
                                    class="form-control buscadorOT" placeholder="OT/OS">

                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary btnBuscadorOTAlerta" type="button"
                                        id="button-addon2"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="scrollTablaAlertasPI">
                        <table id="table-alertas-pi">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6" ng-show="!vistaAuditoriaEvidencia">
            <div class="card cards-alertas">
                <div class="card-header card-header-principal card-header-alerta-principal">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas active" id="pills-mapa-tab" data-toggle="pill"
                                href="#pills-mapa" role="tab" aria-controls="pills-mapa" aria-selected="true">Mapa</a>
                        </li>
                        <!--li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-imagenes-tab" data-toggle="pill" href="#pills-imagenes" role="tab" ng-click="consultarEvidenciaAlertas()" aria-controls="pills-imagenes" aria-selected="false">Im&aacute;genes</a>
                        </li-->
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-historico-tab" data-toggle="pill"
                                href="#pills-historico" role="tab" ng-click="consultarHistoricoAlerta()"
                                aria-controls="pills-historico" aria-selected="false">Hist&oacute;rico</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-chat-tab" data-toggle="pill"
                                href="#pills-chat" role="tab" ng-click="consultarChatAlerta()"
                                aria-controls="pills-chat" aria-selected="false">Comentarios</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-chat-tab" data-toggle="pill"
                                href="#pills-detalle" role="tab" ng-click="abirDetalle()" aria-controls="pills-detalle"
                                aria-selected="false">Detalle</a>
                        </li>
                        <li class="nav-item" role="presentation" ng-show="tipoAlertaValidacion">
                            <a ng-click="consultarDetalleOtPE();" class="nav-link options-alertas"
                                id="pills-orden-detenida-alertas-tab" data-toggle="pill"
                                href="#pills-orden-detenida-alertas" role="tab"
                                aria-controls="pills-orden-detenida-alertas" aria-selected="false">Orden detenida</a>
                        </li>
                        <li class="nav-item" role="presentation" ng-show="tipoAlertaValidacion">
                            <a ng-click="consultarDetalleOtPE();" class="nav-link options-alertas"
                                id="pills-detalle-detencion-alertas-tab" data-toggle="pill"
                                href="#pills-detalle-detencion-alertas" role="tab" ng-click=""
                                aria-controls="pills-detalle-detencion-alertas" aria-selected="false">Detalle
                                detenci&oacute;n</a>
                        </li>
                        <span ng-click="consultarEvidenciaAlertas()" class="fa fa-picture-o icon-color-comments img-menu-evidencia" title="Evidencia"></span>
                    </ul>
                </div>
                <div class="card-body card-body-alerta-principal" id="v-tabs-tabsContent-alertas">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-mapa" role="tabpanel"
                            aria-labelledby="pills-mapa-tab">
                            <div id="mapAlerta" class="contenido-card"
                                style="width:100%;height:100%; border-radius: 10px;"></div>
                        </div>
                        <div class="tab-pane fade" id="pills-imagenes" role="tabpanel"
                            aria-labelledby="pills-imagenes-tab">
                            <!--div id="categorias_div" class="container row justify-content-center  text-center "
                                style="margin-top: 1em;">
                                <div class="content_category">
                                    <b class="badge accent-3" id="alerta-p-i">3</b>
                                    <button type="button" class="btn btn-sm  btn-blue-grey waves-effect waves-light">
                                        <i class="fa fa-truck"></i>
                                    </button>
                                </div>
                                <div class="content_category">
                                    <b class="badge accent-3" id="alerta-p-i">3</b>
                                    <button type="button"
                                        class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light">
                                        <i class="fa fa-truck"></i>
                                    </button>
                                </div>
                                <div class="content_category">
                                    <button type="button"
                                        class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light">
                                        <i class="fa fa-truck"></i>
                                    </button>
                                </div>
                                <div class="content_category">
                                    <b class="badge accent-3" id="alerta-p-i">23</b>
                                    <button type="button"
                                        class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light">
                                        <i class="fa fa-truck"></i>
                                    </button>
                                </div>
                                <div class="content_category">
                                    <button type="button"
                                        class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light">
                                        <i class="fa fa-truck"></i>
                                    </button>
                                </div>
                                <div class="content_category">
                                    <b class="badge accent-3" id="alerta-p-i">13</b>
                                    <button type="button"
                                        class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light">
                                        <i class="fa fa-truck"></i>
                                    </button>
                                </div>
                            </div>
                            <br />
                            <div class="col-12 magnific-all">
                                <div id="not_info_evidencia"
                                    class="row h-100 justify-content-center align-items-center "
                                    style="height: 200px !important;">
                                    <h5 id="text_sin_imagenes" style="color:#abafae; padding-top: 9em; ">No se
                                        encontr&oacute; evidencia</h5>
                                </div>
                                <div style="margin-bottom: 1em;" id="contenido_imagenes"
                                    class="row justify-content-center ">
                                </div>
                            </div-->
                        </div>

                        <div class="tab-pane fade" id="pills-historico" role="tabpanel"
                            aria-labelledby="pills-historico-tab">
                            <div class="container">
                                <div ng-if="!listaHistoricoAlerta.length" style="text-align: center; margin-top: 2em;">
                                    <span style="font-size: 12px !important;color:grey; font-weight: lighter;"
                                        class="timeline__day">
                                        <span class="timeline__month">
                                            <i class="fa fa-exclamation-circle warning-nodata"></i>
                                        </span>
                                        NO SE ENCONTRARON DATOS
                                    </span>
                                </div>
                                <div class="row" ng-repeat="elementHistorico in listaHistoricoAlerta">
                                    <div class="col-2 line-time-new">
                                        <div style="background-color:white;" class="timeline__date">
                                            <span class="timeline__day timeline-day-alertasDespacho">OT</span>
                                            <span class="timeline-month-alertasDespacho timeline__month">
                                                <i ng-if="elementHistorico.idEstatusOrden==1"
                                                    class="pendiente-historico  fas fa-pause circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==2"
                                                    class="asignacion-historico fas fa-arrow-right circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==3"
                                                    class="detencion-historico far fa-hand-paper circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==4"
                                                    class="terminar-historico fas fa-check circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==5"
                                                    class="cancelado-historico fas fa-times circle-statushistorico-histo"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div id="content-historial-{{$index}}" class="col-10" style="display: grid;">
                                        <div class="card-historico card text-center historico-alertas-div">
                                            <div class="card-body">
                                                <i ng-if="elementHistorico.idEstatusOrden==1"
                                                    class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==2"
                                                    class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==3"
                                                    class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==4"
                                                    class="terminar-historico fas fa-check circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==5"
                                                    class="cancelado-historico fas fa-times circle-statushistorico"></i>

                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Estatus:</span>
                                                    <span class="content-titlehistorico"
                                                        ng-bind="elementHistorico.descripcionEstatusOrden || 'SIN DATO'"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Estado:</span>
                                                    <span class="content-titlehistorico"
                                                        ng-bind="elementHistorico.descripcionEstadoOrden || 'SIN DATO'"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Motivo:</span>
                                                    <span class="content-titlehistorico"
                                                        ng-bind="elementHistorico.descripcionMotivoOrden  || 'SIN DATO'"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Despacho:</span>
                                                    <span class="content-titlehistorico"
                                                        ng-bind="elementHistorico.nombreUsuarioDespacho || 'SIN DATO'"></span>
                                                    <p class="footer-card-historico-alerta"
                                                        ng-bind="elementHistorico.fecha+' '+elementHistorico.hora"></p>
                                                </div>
                                            </div>
                                            <div class="card-footer text-muted">
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Usuario:</span>
                                                    <span class="content-titlehistorico"
                                                        ng-bind="elementHistorico.nombreUsuario  || 'SIN DATO'"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab"
                            style="overflow-y: hidden;">
                            <div class="col-12">
                                <div class="container-mensajes-parent">
                                    <div class="chat-content-area">
                                        <div class="chat-header">
                                        </div>
                                        <div class="chat-area" style="overflow-y: scroll; height: 50vh;">
                                            <div ng-if="!listaComentariosAlerta.length"
                                                style="text-align: center; margin-top: 2em;">
                                                <span
                                                    style="font-size: 12px !important;color:grey; font-weight: lighter;"
                                                    class="timeline__day">
                                                    <span class="timeline__month">
                                                        <i class="fa fa-exclamation-circle warning-nodata"></i>
                                                    </span>
                                                    NO SE ENCONTRARON COMENTARIOS
                                                </span>
                                            </div>

                                            <div class="chats" ng-repeat="comentario in listaComentariosAlerta">
                                                <div class="chat" ng-if="comentario.origenSistema === 2">
                                                    <!-- APP-->
                                                    <div class="chat-avatar">
                                                        <a class="avatar"><i
                                                                class="img-comentarios-chat android-mensaje fab fa-android"
                                                                style="margin-top: 1em;"></i></a>
                                                    </div>
                                                    <div class="chat-body">
                                                        <span class="text-fecha-comentario"
                                                            ng-bind="comentario.fechaComentario"></span>
                                                        <div class="chat-text">
                                                            <span ng-bind="comentario.comentario"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="chat chat-right" ng-if="comentario.origenSistema !== 2">
                                                    <div class="chat-body">
                                                        <span class="text-fecha-comentario"
                                                            ng-bind="comentario.fechaComentario"></span>
                                                        <div class="chat-text">
                                                            <span ng-bind="comentario.comentario"></span>
                                                        </div>
                                                    </div>
                                                    <div class="chat-avatar">
                                                        <a class="avatar">
                                                            <i class="img-comentarios-chat web-mensaje fas fa-desktop"
                                                                style="margin-top: 1em;"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-chat-fotter">

                                            <!--div class="col-6">
                                                <input id="comentarioOt" placeholder="Escribe el mensaje aqu&iacute; ..." type="text" class="input-mensaje-chat form-control form-control-sm input-comentario-ot" ng-model="comentarioAlerta">
                                            </div>
                                            <div class="col-3" style="left: 200px;height: 50px;">
                                                <button class="btn btn-primary btn-enviar-comentario-ot" ng-click="agregarComentario()">Enviar</button>
                                            </div-->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12" style="margin-top: .5em;">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control input-comentario-alerta"
                                        placeholder="Escribe el mensaje aqu&iacute; ..." ng-model="comentarioAlerta">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary btn-enviar-comentario-ot btn-AgregarComentario"
                                            ng-click="agregarComentario()" type="button" id="button-addon2"
                                            style="color: white!important;">Enviar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="pills-detalle" role="tabpanel" aria-labelledby="pills-detalle">
                            <div class="row">
                                <div class="card-header card-header-principal">
                                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link options-alertas active" id="pills-detalle-alerta-tab"
                                                data-toggle="pill" href="#pills-detalle-alerta" role="tab"
                                                aria-controls="pills-detalle-alerta" aria-selected="true">Alerta</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link options-alertas" style="width: 155px;" id="pills-ot-tab"
                                                data-toggle="pill" href="#pills-OT" role="tab" aria-controls="pills-OT"
                                                aria-selected="false">Orden de Trabajo</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link options-alertas" id="pills-tecnico-tab"
                                                data-toggle="pill" href="#pills-tecnico" role="tab"
                                                aria-controls="pills-tecnico" aria-selected="false">T&eacute;cnico</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="tab-content" id="pills-detalle-tabContent">

                                    <div class="tab-pane fade show active" id="pills-detalle-alerta" role="tabpanel"
                                        aria-labelledby="pills-detalle-alerta-tab">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Alerta</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.alerta.descripcionAlerta || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Tipo Alerta</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.alerta.descripcionSubtipoAlerta || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Fecha</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.alerta.fechaRegistro || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Hora</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.alerta.horaRegistro || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Tiempo trascurrido</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.alerta.tiempoTranscurrido || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6 col-map-datlle">
                                                <div id="mapDetalleAlerta" class="contenido-card"
                                                    style="width:100%;height:100%; border-radius: 10px;"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="pills-OT" role="tabpanel"
                                        aria-labelledby="pills-ot-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">OT</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.id || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">OS</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.folioSistema || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Cliente</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.nombreCliente || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Cuenta</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.claveCliente || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Tipo orden</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.tipoOrden || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Intervenci&oacute;n</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.descIntervencion || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Subintervenci&oacute;n</span>
                                                    </div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.descSubIntervencion || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Direcci&oacute;n</span></div>
                                                    <div class="container-text-long-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.orden.direccion || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-6 col-map-datlle">
                                                <div id="mapaDetalleOrden" class="contenido-card"
                                                    style="width:100%;height:100%; border-radius: 10px;"></div>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="pills-tecnico" role="tabpanel"
                                        aria-labelledby="pills-tecnico-tab">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="container-img-tecnico-detalle-alerta">
                                                    <img class="efecto imagen_tecnico_detalle_alerta"
                                                        ng-src="{{objectDetalleAlerta.tecnico.urlFotoPerfil}}" />
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">T&eacute;cnico</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.tecnico.nombre || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">N&uacute;mero empleado</span>
                                                    </div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.tecnico.numEmpleado || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                                <div class="container-fluid vehiculo-content">
                                                    <div class="container-text-title-detalle"><span
                                                            class="text-tile-vehiculo">Tel&eacute;fono</span></div>
                                                    <div class="container-text-content-detalle"><span
                                                            class="text-content-vehiculo"
                                                            title="{{infoOtDetalle.Id_ot}}"
                                                            ng-bind="objectDetalleAlerta.tecnico.telefonoContacto || 'Sin dato'"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6 col-map-datlle">
                                                <div id="mapDetalleTecnico" class="contenido-card"
                                                    style="width:100%;height:100%; border-radius: 10px;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-orden-detenida-alertas" role="tabpanel"
                            aria-labelledby="pills-orden-detenida-alertas-tab" style="overflow-x: hidden;">
                            <jsp:include page="./../contents/div-info-general-detalle-ot-pe.jsp"></jsp:include>
                        </div>
                        <div ng-if="!detencionVistaModal" class="tab-pane fade" id="pills-detalle-detencion-alertas"
                            role="tabpanel" aria-labelledby="pills-detalle-detencion-alertas-tab"
                            style="overflow-x: hidden;">
                            <jsp:include page="./../contents/div-info-detalle-detencion-ot-pe.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-3" ng-show="!vistaAuditoriaEvidencia">
            <div class="card cards-alertas">
                <div class="card-header card-header-alerta-principal">
                    <div class="row">
                        <div class="col-10 contenedor-titulo-acciones-alerta">
                            <span id="idTituloAccionesAlertas" class="titulo-alerta-modal">OPCIONES</span>
                        </div>
                        <div class="col-2 text-right">
                            <i class="fa fa-times icon-cancelar-opcion" ng-click="cerrarCamposAccionAlerta()"
                                ng-show="!opcionesAcciones"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body card-body-alerta-principal">
                    <div ng-show="!permisoAtenderAlertas">
                        <div class="row contenedor-not-permiso-atender-alertas">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <i class="icon-not-permiso-atender-alertas fas fa-user-lock fa-2x"></i>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <b class="text-not-permiso-atender-alertas">No cuentas con el permiso de atender
                                            alertas.</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ng-show="permisoAtenderAlertas">
                        <div class="row" ng-show="alertaSeleccionadaPENDIENTE">
                            <div class="col-12">
                                <div class="card card-alertas-seleccion">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12 text-center">
                                                <h4>Selecciona una OT</h4>
                                                <span><i class="fa fa-quote-left"></i> Para poder visualizar las
                                                    opciones que tiene cada una de ellas.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" ng-show="opcionesAcciones">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6 text-center">
                                        <span class="text-primary-alerta">OT: </span><span class="text-secundary-alerta"
                                            ng-bind="alertaSeleccionadaObject.IdOT"></span>
                                    </div>
                                    <div class="col-6 text-center">
                                        <span class="text-primary-alerta">OS: </span><span class="text-secundary-alerta"
                                            ng-bind="alertaSeleccionadaObject.os"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12" style="margin-top: 1em;" ng-repeat="opcion in listaOpcionesAlerta">
                                <button type="button" class="btn btn-outline- btn-opciones-alerta"
                                    style="color: {{opcion.hexaColor}}; border: 3px solid {{opcion.hexaColor}};"
                                    ng-click="mostrarAccionAlerta(opcion)" ng-bind="opcion.descripcion"></button>
                            </div>
                        </div>

                        <div class="row" ng-repeat="opcion in listaOpcionesAlerta" ng-show="opcion.checkedOpcion">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12" ng-repeat="campo in opcion.campos" ng-switch
                                        on="campo.tipoCampo">

                                        <div class="form-group contenedorCamposOpcion" ng-switch-when="select">
                                            <!-- <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o"></i> -->
                                            <label class="etiquetaFormOpcion" for="fecha-reagendamiento-alerta"
                                                ng-if="campo.esVisible == '1'">{{campo.nombreEtiqueta}}</label>
                                            <select id="{{campo.nombreParamentro+''+opcion.id}}"
                                                class="form-control form-control-sm txtFormOpcion {{campo.esVisible == '0' ? 'desabilitarCampoOpcionAlerta' : ''}} {{campo.nombreParamentro}} validarCampoAccionAlerta"
                                                ng-switch on="campo.nombreParamentro"
                                                ng-click="cambioOpcionSelectAccionAlerta(campo, opcion)">
                                                <option ng-if="campo.valorDefecto == 'NA'" disabled selected>NO HAY
                                                    SELECCI&Oacute;N</option>
                                                <option ng-switch-when="idTurno"
                                                    ng-repeat="turno in filtrosGeneral.turnosdisponibles"
                                                    value="{{turno.id}}">{{turno.nombre}}</option>
                                                <option ng-switch-when="idEstatus"
                                                    ng-repeat="status in listaStatusAlertaAccion" value="{{status.id}}">
                                                    {{status.nombre}}</option>
                                                <option ng-switch-when="idEstado"
                                                    ng-repeat="estado in listaEstadosAlertaAccion"
                                                    value="{{estado.id}}">{{estado.nombre}}</option>
                                                <option ng-switch-when="idMotivo"
                                                    ng-repeat="motivo in listaMotivosAlertaAccion"
                                                    value="{{motivo.id}}">{{motivo.nombre}}</option>
                                            </select>
                                        </div>

                                        <div class="form-group contenedorCamposOpcion" ng-switch-when="selectpicker">
                                            <!-- <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o"></i> -->
                                            <label class="etiquetaFormOpcion"
                                                for="fecha-reagendamiento-alerta">{{campo.nombreEtiqueta}}</label>
                                            <input id="{{campo.nombreParamentro+''+opcion.id}}" type="text" readonly
                                                placeholder="Selecciona fecha"
                                                class="datepicker campoFecha form-control form-control-sm {{campo.nombreParamentro}} validarCampoAccionAlerta"
                                                ng-model="terminarAlerta.fecha" />
                                        </div>
                                        <div class="form-group contenedorCamposOpcion" ng-switch-when="textarea">
                                            <!-- <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o"></i> -->
                                            <label class="etiquetaFormOpcion"
                                                for="fecha-reagendamiento-alerta">{{campo.nombreEtiqueta}}</label>
                                            <textarea
                                                class="form-control form-control-sm txtFormOpcion {{campo.nombreParamentro}} validarCampoAccionAlerta"
                                                style=" resize: none" ng-model="terminarAlerta.comentario"
                                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                                id="{{campo.nombreParamentro+''+opcion.id}}" rows="3"
                                                ng-keyup="contadorTextArea(campo.nombreParamentro+''+opcion.id)"></textarea>
                                            <label style="float: right;"
                                                class="etiquetaFormOpcion etiquetaContador">{{contadorCaracteresTextArea}}
                                                - 50</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button class="btn btn-primary btnAccionCamposOpcion" style="width: 100%"
                                            ng-click="guardarAccionAlerta(opcion)">{{opcion.descripcion}}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-9" id="alertaAuditoriaEvidencia" ng-show="vistaAuditoriaEvidencia">
            <div class="card cards-alertas" id="displayContent" style="display: none;">
                <div class="card-header card-header-alerta-principal">
                    <div class="row">
                        <div class="col-12 contenedor-titulo-acciones-alerta">
                            <span id="idTituloAccionesAlertas" class="titulo-alerta-modal">EVIDENCIA</span>
                        </div>

                    </div>
                </div>
                <div class="card-body card-body-alerta-principal" ng-show="detalleEvidencia.evidencias.length">
                    <div class="row content-filters">
                        <div class="col-4 content-select offset-1">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input radio-evidencias" type="radio" name="inlineRadioOptions"
                                    id="aceptar" ng-click="seleciconarTodas('1')" value="option1">
                                <label class="form-check-label" for="aceptar">Aceptar todas</i></label>
                            </div>
                            <div class="form-check form-check-inline radio-evidencias">
                                <input class="form-check-input radio-evidencias" type="radio" name="inlineRadioOptions"
                                    id="rechazar" ng-click="seleciconarTodas('0')" value="option2">
                                <label class="form-check-label" for="rechazar">Rechazar todas</label>
                            </div>
                        </div>
                        <div class="row col-5 content-total">
                            <div class="col-4" style="padding: 0;">
                                <span>Total evidencia: <strong ng-bind="detalleEvidencia.evidencias.length"></strong></span>
                            </div>
                            <div class="col-4" style="padding-right: 0;">
                                <span>Aceptadas: <strong ng-bind="listaTotal.aceptadas || 0"></strong></span>
                            </div>
                            <div class="col-4" style="padding-right: 0;">
                                <span>Rechazadas: <strong ng-bind="listaTotal.rechazadas || 0"></strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="content-evidencia">
                        <div class="col-2 pl-0">
                            <div class="col-12 content_category content_category_0">
                                <div id="categoria_img_0" class="tipo_evidencia" ng-click="getEvidenciasImagenesAlerta(0)">
                                    <div class="total-imagen-evidencia">
                                        <span ng-bind="detalleEvidencia.evidencias.length"></span>
                                    </div>
                                    <span class="label-tipo">TODOS</span>
                                </div>
                            </div>
                            <div class="col-12 content_category content_category_{{tipo.id}}"
                                ng-repeat="tipo in detalleEvidencia.tipos" ng-click="getEvidenciasImagenesAlerta(tipo.id)">
                                <div id="categoria_img_{{tipo.id}}" class="tipo_evidencia">
                                    <div class="total-imagen-evidencia">
                                        <span ng-bind="tipo.imagenes.length"></span>
                                    </div>
                                    <span class="label-tipo">{{tipo.descripcion}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-8" style="height: 50vh; overflow-y: auto;direction: rtl;text-align: center;">
                            <div class="imagen_content_evidencia" ng-repeat="img in listImagenesTipo">
                                <div class="imagen_content">
                                    <div class="form-check">
                                        <input type="checkbox" ng-click="changeSelect($event)"
                                            ng-class="{'rechazada-check':img.idEstatus == 3}" id="check_{{img.id}}"
                                            class="form-check-input checkbox-evidencia">
                                    </div>
                                    <div class="contenedor_img_evidencia">
                                        <a href="{{img.url ? img.url : './resources/img/generic/not_found.png'}}"
                                            class="magnific item imgtipo_{{img.idCatEvidencia}}"
                                            data-title="{{img.tipo}}">
                                            <img class="z-depth-1 img_evidencia"
                                                ng-src="{{img.url ? img.url : './resources/img/generic/not_found.png'}}"
                                                width="180" height="130" />
                                        </a>
                                        <div class="middle_img_evidencia">
                                            <div class="text_img_evidencia">{{img.tipo}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 p-0">
                            <div class="content-img">
                                <img id="fotoTecnico" src="" alt="Foto" width="70" height="70" class="imgFoto"
                                    ng-click="showImage(detalleEvidencia.idUsuario)">
                            </div>
                            <div class="content-info mt-2" style="text-align: center;">
                                <div class="container-text-content-detalle"><span class="text-content ng-binding"
                                        ng-bind="detalleEvidencia.nombreCompleto || 'Sin dato'"></span>
                                </div>
                                <div class="container-text-content-detalle"><i
                                        class="icon-user-detalle fas fa-hashtag"></i><span
                                        class="text-content ng-binding"
                                        ng-bind="detalleEvidencia.numeroEmpleado || 'Sin dato'"></span>
                                </div>
                                <div class="container-text-content-detalle"><i
                                        class="icon-user-detalle fas fa-id-badge"></i><span
                                        class="text-content ng-binding"
                                        ng-bind="detalleEvidencia.usuario || 'Sin dato'"></span>
                                </div>
                                <div class="container-text-content-detalle"><i
                                        class="icon-user-detalle fas fa-phone-alt"></i><span
                                        class="text-content ng-binding"
                                        ng-bind="detalleEvidencia.numeroCelular || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body card-body-alerta-principal" ng-show="!detalleEvidencia.evidencias.length">
                    <div class="message-nodata">
                        <span> <i class="icono-noseleccion fas fa-exclamation-circle mr-2"></i>No se encontraron
                            evidencias</span>
                    </div>
                </div>
                <div class="col-12 row" style="margin-top: -4em; padding: 1em;"
                    ng-show="detalleEvidencia.evidencias.length">
                    <div class="col-3 offset-7" style="text-align: right;">
                        <!--span class="text-content text-external-link">Descargar carta aceptaci&oacute;n</span-->
                    </div>
                    <div class="col-2" style="text-align: right; padding-right: 0;">
                        <button type="button" class="btn btn-primary btn-guardar ripple-surface"
                            ng-click="guardarEvidencia()">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
</div>