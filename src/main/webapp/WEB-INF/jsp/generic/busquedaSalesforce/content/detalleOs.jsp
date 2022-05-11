<!--div class="row">
    <div ng-show="isAbiertoOSNoticias">
        noticiasGeneralesOs
    </div>
</div-->
<div class="col-12">
    <div class="row header-detalle">
        <div  ng-show="showOs" class="header-back-title col-4">
            <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-undo"></span>
            </div>
            <!--div  ng-click="abrirVentanaNoticias()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-newspaper-o"></span>
            </div-->
            <div  ng-click="regresarHome()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-home"></span>
            </div>
        </div>
        <div  ng-show="showOs" class="header-back-title col-8">
            <div class="alinear-derecha">
                <div class="textcontainer-header" style="padding: 1em;">
                    <!--a class="style-link" href="" ng-click="mostrarDetalleActivarDesdeOs()">
                        <span style="font-size: 15px;">Activar</span>
                    </a-->
                </div> 
                <div class="iconsf-container">
                    <img class="img-os img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/os.png" alt="">
                </div>      
                <div class="textcontainer-header">
                    <span class="text-title-elementoh">OS:</span>
                    <span class="title-regresar-generic"  ng-bind="detalle.nombre"></span>
                </div>   
            </div>          
        </div>
    </div>
</div>

<div ng-show="showOs" class="col-12 ">
    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Informaci&oacute;n general</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombre}}" ng-bind="detalle.nombre"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Propietario:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.propietarioOportunidad}}" ng-bind="detalle.propietarioOportunidad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estatus:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.estatus}}" ng-bind="detalle.estatus"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Motivo de cancelaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.motivoCancelacion}}" ng-bind="detalle.motivoCancelacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Canal de venta:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.canalVenta}}" ng-bind="detalle.canalVenta"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha agendada:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaAgendada}}" ng-bind="detalle.fechaAgendada"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ts completado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tscompletado}}" ng-bind="detalle.tscompletado"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ts confirmado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tsconfirmado}}" ng-bind="detalle.tsconfirmado"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">OS confirmado:</span></div>
                    <div class="col-6 crop-text-col">
                        <input type="checkbox" disabled readonly ng-model="detalle.osConfirmada" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Turno:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.turnoAg}}" ng-bind="detalle.turnoAg"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de orden:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoOrden}}" ng-bind="detalle.tipoOrden"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cot sitio plan:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCotSitioPlan.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href=""class="link-consultardetalle" ng-if="detalle.detalleCotSitioPlan.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCotSitioPlan.id, detalle.detalleCotSitioPlan.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCotSitioPlan.nombre}}" ng-bind="detalle.detalleCotSitioPlan.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cotizaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCotizacion.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href=""class="link-consultardetalle" ng-if="detalle.detalleCotizacion.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCotizacion.id, detalle.detalleCotizacion.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCotizacion.nombre}}" ng-bind="detalle.detalleCotizacion.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuenta factura:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCuentaFactura.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleCuentaFactura.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCuentaFactura.id, detalle.detalleCuentaFactura.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCuentaFactura.nombre}}" ng-bind="detalle.detalleCuentaFactura.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Oporturnidad:</span></div>
                    <div class="col-6 crop-text-col" style="overflow: hidden;">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleOportunidad.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleOportunidad.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleOportunidad.id, detalle.detalleOportunidad.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleOportunidad.nombre}}" ng-bind="detalle.detalleOportunidad.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>

        </div>


        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12"><span class="content-first-title-head">Comentarios:</span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12 crop-text-col"><span class="content-first-title-head-answer  normal-texto-largo" title="{{detalle.comentariosOs}}" ng-bind="detalle.comentariosOs"></span></div>
                </div>
            </div>
        </div>
    </div>


    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Detalle del sitio</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cluster:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.cluster}}" ng-bind="detalle.detalleSitio.cluster"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.estado}}" ng-bind="detalle.detalleSitio.estado"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Zona:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.zona}}" ng-bind="detalle.detalleSitio.zona"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plaza:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.plaza}}" ng-bind="detalle.detalleSitio.plaza"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Distrito:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.distrito}}" ng-bind="detalle.detalleSitio.distrito"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Delegaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.delegacionMunicipio}}" ng-bind="detalle.detalleSitio.delegacionMunicipio"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Regi&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.region}}" ng-bind="detalle.detalleSitio.region"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ciudad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.ciudad}}" ng-bind="detalle.detalleSitio.ciudad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Codigo postal:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.codigoPostal}}" ng-bind="detalle.detalleSitio.codigoPostal"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Colonia:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.colonia}}" ng-bind="detalle.detalleSitio.colonia"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Calle:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.calle}}" ng-bind="detalle.detalleSitio.calle"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero exterior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.numeroExterior}}" ng-bind="detalle.detalleSitio.numeroExterior"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero interior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.numeroInterior}}" ng-bind="detalle.detalleSitio.numeroInterior"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Latitud:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.latitude}}" ng-bind="detalle.detalleSitio.latitude"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Longitud:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.longitude}}" ng-bind="detalle.detalleSitio.longitude"></span></div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="perfiles.jsp"></jsp:include>
</div>