<div class="row mt-2">
    <div class="col-5">
        <span class="" style="font-weight: bold;">Cuenta: {{elementoCSP.infoSitio.numeroCuenta}}</span>
    </div>
    <div class="col-5">
        <span class="" style="font-weight: bold;">Cliente: {{elementoCSP.cuentaFacturaSf.nombreCuentaFactura}}</span>
    </div>
    <div class="col-2 pr-0">
        <button ng-click="isAgendamiento = false" type="button" class="btn-close" style="float: right; padding: 0.5em;"></button>
    </div>
    <div class="divider-agendamiento"></div>
</div>
<div class="row mt-3">
    <div class="col-4">
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Paquete: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento" title="{{elementoCSP.dpPlan.nameDpPlan ? elementoCSP.dpPlan.nameDpPlan : 'Sin dato'}}" ng-bind="elementoCSP.dpPlan.nameDpPlan || 'Sin dato'" ></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">CSP: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento"  ng-bind="elementoCSP.name || 'Sin dato'" ></span>
            </div>
        </div>
        <br>
        <div class="container-fluid agendamiento-content">
            <div class="">
                <span class="text-tile-agendamiento">Direcci&oacute;n de la Instalaci&oacute;n</span>
            </div>
        </div>
        <div class="">
            <div class="divider-agendamiento"></div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Regi&oacute;n: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento"  ng-bind="elementoCSP.infoSitio.plazaC || 'Sin dato'" ></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Ciudad: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento"  ng-bind="elementoCSP.infoSitio.ciudadInstalacionC || 'Sin dato'"></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Distrito: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento"  ng-bind="elementoCSP.infoSitio.distritoInstalacionC || 'Sin dato'"></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Cl&uacute;ster: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento" ng-bind="elementoCSP.infoSitio.clusterInstalacionC || 'Sin dato'" ></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Direcci&oacute;n: </span>
            </div>
            <div class="container-text-direccion ">
                <span class="text-content-agendamiento" ng-bind="elementoCSP.direccionSitio || 'Sin dato'" ></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="">
                <span class="text-tile-agendamiento">Entre calles: </span>
            </div>
        </div>
        <div class="">
            <textarea class="form-control textarea-agendamiento" id="entreCallesAgendamiento" rows="2" id=""></textarea>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="">
                <span class="text-tile-agendamiento">Referencias: </span>
            </div>
        </div>
        <div class="">
            <textarea class="form-control textarea-agendamiento" id="referenciasAgendamiento" rows="2" id=""></textarea>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="container-fluid agendamiento-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-agendamiento">Latitud: </span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-agendamiento">{{elementoCSP.latitud}}</span>
                    </div>
                </div>
                <div class="container-fluid agendamiento-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-agendamiento">Longitud: </span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-agendamiento">{{elementoCSP.longitud}}</span>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="container-fluid agendamiento-content">
            <div class="">
                <span class="text-tile-agendamiento">Informaci&oacute;n del Contacto</span>
            </div>
            <i ng-show="idContactoSelected" title="contacto seleccionado" class="selected-contacto-agenda far fa-check-circle"></i>
            <i ng-show="!idContactoSelected"  title="sin selecci&oacute;n de contacto" class="not-selected-contacto fas fa-exclamation-circle"></i>
        </div>
        <div class="">
            <div class="divider-agendamiento mb-2"></div>
        </div>
        <div style="margin-bottom: 0;" class="container-fluid agendamiento-content form-group">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Contacto: </span>
            </div>
            <div class="container-text-content-detalle">
                <select ng-model="idContactoSelected" ng-change="colocarContactoSeleccionado()" class="form-control form-control-sm custom-select selectContactoAgendamiento" id="contactoAgendamiento" name="contactoAgendamiento" style="font-size: .8em;"
                        ng-options="contactoAg.id as contactoAg.nombreCompleto for  contactoAg in listContactosAgendamiento"  >
                    <option  value="">Seleccione ...</option>
                </select>
            </div>
        </div>
        <div class="container-fluid agendamiento-content content-link-agrega-contacto" >
            <b class="text-agrega-contacto" ng-click="abrirModalRegistroContacto()" >Agregar contacto</b>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Email: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento" ng-if="!contactoSelected">Sin informaci&oacute;n</span>
                <span class="text-content-agendamiento" ng-if="contactoSelected" ng-bind="contactoSelected.email || 'Sin info'"></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Celular: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento" ng-if="!contactoSelected">Sin informaci&oacute;n</span>
                <span class="text-content-agendamiento" ng-if="contactoSelected"  ng-bind="contactoSelected.mobilePhone || 'Sin info'"></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Tel. fijo: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento" ng-if="!contactoSelected">Sin informaci&oacute;n</span>
                <span class="text-content-agendamiento" ng-if="contactoSelected"  ng-bind="contactoSelected.telefono  ||'Sin info'"></span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Ext.: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento" ng-if="!contactoSelected">Sin informaci&oacute;n</span>
                <span class="text-content-agendamiento" ng-if="contactoSelected"  ng-bind="contactoSelected.extensionC || 'Sin info'"> </span>
            </div>
        </div>
        <div class="container-fluid agendamiento-content">
            <div class="container-text-title-detalle">
                <span class="text-tile-agendamiento">Sexo: </span>
            </div>
            <div class="container-text-content-detalle">
                <span class="text-content-agendamiento" ng-if="!contactoSelected">Sin informaci&oacute;n</span>
                <span class="text-content-agendamiento" ng-if="contactoSelected"  ng-bind="contactoSelected.sexoC || 'Sin info'"></span>
            </div>
        </div>
    </div>
    <div class="col-8">
        <div class="col-md-12">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="opcion-calendarioAgendamiento-tab" data-toggle="tab" href="#opcion-calendarioAgendamiento" role="tab" aria-controls="opcion-calendarioAgendamiento" aria-selected="true">Disponibilidad</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="opcion-factibilidad-tab" data-toggle="tab" href="#opcion-factibilidad" role="tab" aria-controls="opcion-factibilidad" aria-selected="false">Factibilidad</a>
                </li>
            </ul>
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="opcion-calendarioAgendamiento" role="tabpanel" aria-labelledby="opcion-calendarioAgendamiento-tab">
                    <div id="calendar_agendamiento"></div>
                </div>
                <div class="tab-pane fade" id="opcion-factibilidad" role="tabpanel" aria-labelledby="opcion-factibilidad-tab">
                    <div class="row">
                        <div class="col-12" style="text-align: right;">
                            <strong class="color_titulos_resumen" ng-if="!isFactibilidad">
                                <i class="fa fa-exclamation icon-factibilidad" style="background: orange; padding: 0.6em 0.75em !important;"></i>
                                No has actualizado la factibilidad
                            </strong>
                            <strong class="color_titulos_resumen" ng-if="isFactibilidad">
                                <i class="fa fa-check icon-factibilidad" style="background: green;"></i>
                                Factibilidad actualizada
                            </strong>
                        </div>
            
                    </div>
                    <input id="search-input-place" class="controls" type="text" placeholder="Buscar lugar en mapa..." style="font-size: 16px;">
                    <div id="mapa-ubicacion"></div>
                    <div class="content-info-mapa" id="info-factibilidad">
                        <div style="bottom:0; left:0 ;" class="card  div-contenedor-info-factibilidad">
                            <div class="card-header" style="border-bottom: none; text-align: left;">
                                <span class="title-tipoot-map-filtros" ng-show="!flagConsultandoFactibilidad && flagRespuestaFactibilidad">
                                    <i class="far fa-check-circle icon-informacion-fac" style="color: green;"></i>
                                    Factibilidad
                                </span>
                                <span class="title-tipoot-map-filtros" ng-show="!flagConsultandoFactibilidad && !flagRespuestaFactibilidad">
                                    <i class="fa fa-exclamation-circle icon-informacion-fac" style="color: orange;"></i>
                                    Factibilidad
                                </span>
                                <div ng-if="flagConsultandoFactibilidad" class="spinner-border spinner-cargando-info" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <span class="title-tipoot-map-filtros" ng-show="flagConsultandoFactibilidad">
                                    Cargando...
                                </span>
                                <span
                                    class="icono-hideoptions-mapa-ubicacion icono-accion-card icono-ocultar-mostrar-map fa fa-minus">&nbsp;</span>
                            </div>
                            <div class="card-body" style="padding: 0;" ng-if="infoFactibilidad.factibilidad !== '0'">
                                <div ng-show="!flagConsultandoFactibilidad" style="text-align: left;" class="info_ot_detail">
                                    <div class="col-md-12">
                                        <b class="title_span_detalle"> Regi&oacute;n:</b>
                                        <span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.region ? infoFactibilidad.region : 'Sin info'"> </span>
                                    </div>
                                    <div class="col-md-12">
                                        <b class="title_span_detalle"> Ciudad:</b>
                                        <span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.ciudad ? infoFactibilidad.ciudad : 'Sin info'"> </span>
                                    </div>
                                    <div class="col-md-12">
                                        <b class="title_span_detalle"> Distrito:</b>
                                        <span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.distrito ? infoFactibilidad.distrito : 'Sin info'"> </span>
                                    </div>
                                    <div class="col-md-12">
                                        <b class="title_span_detalle"> Cl&uacute;ster:</b>
                                        <span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.cluster ? infoFactibilidad.cluster : 'Sin info'"> </span>
                                    </div>
                                    <div class="content-actualizar">
                                        <hr style="margin: 0.5rem 0;">
                                        <button title="Actualizar factibilidad" ng-disabled="!flagRespuestaFactibilidad" ng-click="actualizarFactibilidadBandejas()" class="btn boton-factibilidad ripple-surface">
                                            <i class="fa fa-redo"></i>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="card-body" style="padding: 0;" ng-if="infoFactibilidad.factibilidad === '0'">
                                <div style="text-align: center;font-size: 0.9em;" class="info_ot_detail">
                                    <span>
                                        No se encontr&oacute; factibilidad </br> Selecciona otra ubicaci&oacute;n
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row ">
                <div class="col-6 mt-3">
                    <div class="">
                        <span class="text-tile-agendamiento">Fecha de agendamiento: </span>
                        <span class="text-content-agendamiento" ng-if="!isFechaSelected">Sin selecci&oacute;n </span>
                        <span class="text-content-agendamiento" ng-if="isFechaSelected">{{elementoCSP.fechaAgendamiento}}</span>
                    </div>
                    <div class="">
                        <span class="text-tile-agendamiento">Turno: </span>
                        <span class="text-content-agendamiento" ng-if="!isFechaSelected">Sin selecci&oacute;n </span>
                        <span class="text-content-agendamiento" ng-if="isFechaSelected">{{elementoCSP.turnoAgendamiento}}</span>
                    </div>
                </div>
                <div class="col-6">
                    <span class="text-tile-agendamiento">Comentarios </span>
                    <textarea class="form-control textarea-agendamiento" id="comentariosAgendamiento" rows="2" id=""></textarea>

                </div>
            </div>
            <button type="button" class="btn-aceptar-agendamiento btn btn-sm ripple-surface mt-2" ng-click="agendarCSPBandejas()" style="float: right;">
                Agendar
            </button>
        </div>
    </div>
    <pre>{{ elementoCSP.infoSitio | json}}</pre>

</div>