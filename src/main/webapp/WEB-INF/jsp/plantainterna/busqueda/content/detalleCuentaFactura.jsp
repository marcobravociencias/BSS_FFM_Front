    
<div  ng-show="showCuentaFactura" class="header-back-title col-3">
    <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
    <div  ng-click="regresarHome()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-home"></span>
    </div>
</div>
<div  ng-show="showCuentaFactura" class="header-back-title col-9">
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img class="imgcuentasfactura img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/cotsitio.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">Cuenta factura:</span>
            <span class="title-regresar-generic"  ng-bind="detalle.nombre || 'Sin informaci&oacute;n'"></span>
        </div>   
    </div>          
</div>
<div ng-show="showCuentaFactura"  class="col-12">
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
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombre}}" ng-bind="detalle.nombre || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Responsable comercial:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombreResponsableComercial}}" ng-bind="detalle.nombreResponsableComercial || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Email:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.email}}" ng-bind="detalle.email || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Email facturaci&oacute;n 1:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.emailFacturacion1}}" ng-bind="detalle.emailFacturacion1 || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Email facturaci&oacute;n 2:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.emailFacturacion2}}" ng-bind="detalle.emailFacturacion2 || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Facebook:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.facebook}}" ng-bind="detalle.facebook || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Twitter:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.twitter}}" ng-bind="detalle.twitter || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Linkedin:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.linkedin}}" ng-bind="detalle.linkedin || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Celular:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.celular}}" ng-bind="detalle.celular || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Telefono:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.telefonoPrincipal}}" ng-bind="detalle.telefonoPrincipal || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuenta factura:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.numCuentaFactura}}" ng-bind="detalle.numCuentaFactura || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plazo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plazo}}" ng-bind="detalle.plazo || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Portabilidad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.portabilidad}}" ng-bind="detalle.portabilidad || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Folio de venta:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.folioVenta}}" ng-bind="detalle.folioVenta || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">RFC:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.rfc}}" ng-bind="detalle.rfc || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plan post venta:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.planPostVenta}}" ng-bind="detalle.planPostVenta || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plan servicio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.planServicio}}" ng-bind="detalle.planServicio || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de facturaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoFacturacion}}" ng-bind="detalle.tipoFacturacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de pago:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoPago}}" ng-bind="detalle.tipoPago || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Forma de pago:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.formaPago}}" ng-bind="detalle.formaPago || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Renta mensual PL:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.rentaMensualPL}}" ng-bind="detalle.rentaMensualPL || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Renta mensual PP:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.rentaMensualPP}}" ng-bind="detalle.rentaMensualPP || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha de activaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaActivacion}}" ng-bind="detalle.fechaActivacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha vencimiento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaVencimiento}}" ng-bind="detalle.fechaVencimiento || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Activada:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="detalle.activada" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
        </div>
    </div>


    
    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Detalle de cuenta</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <div class="col-4 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="!detalle.detalleCuenta.nombre">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleCuenta.nombre" ng-click="consultarDetalleObjectosSF(detalle.detalleCuenta.id, detalle.detalleCuenta.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCuenta.nombre}}" ng-bind="detalle.detalleCuenta.nombre || 'Sin informaci&oacute;n'"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Detalle geogr&aacute;fico de la instalaci&oacute;n</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cluster:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.clusterInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.clusterInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Zona:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.zonaInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.zonaInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plaza:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.plazaInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.plazaInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Regi&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.regionInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.regionInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Distrito:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.distritoInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.distritoInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.estadoInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.estadoInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Delegaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.delegacionInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.delegacionInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Codigo postal:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.cpInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.cpInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ciudad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.ciudadInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.ciudadInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Colonia:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.coloniaInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.coloniaInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Calle:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.calleInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.calleInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero exterior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.numeroExteriorInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.numeroExteriorInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero interior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.numeroInteriorInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.numeroInteriorInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Latitud:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.latitudeInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.latitudeInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Longitud:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleGeograficoInstalacion.longitudeInstalacion}}" ng-bind="detalle.detalleGeograficoInstalacion.longitudeInstalacion || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" id="accordionOsCuentaFactura" role="tablist" aria-multiselectable="true">
                <div class="card car-detalle">
                    <div class="card-header style-head-card" role="tab" >
                        <div class="col-12" style="margin-top: -.5em;">
                            <a class="asd" >
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">OS</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div id="collapseOsCuentaFactura" >
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-3">
                                        <span class="text-head-table">Nombre</span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-head-table">Estatus</span>
                                    </div>
                                    <div class="col-2">
                                        <span class="text-head-table">Fecha agendada</span>
                                    </div>
                                    <div class="col-2">
                                        <span class="text-head-table">Turno</span>
                                    </div>
                                    <div class="col-2">
                                        <span class="text-head-table">Confirmada</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="os in detalle.os | limitTo: limitOsCf" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                    <div class="col-3">
                                        <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(os.id, os.keyObject)">
                                            <span class="text-table" ng-bind="os.nombre"></span>
                                        </a>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-table" ng-bind="os.estatus"></span>
                                    </div>
                                    <div class="col-2">
                                        <span class="text-table" ng-bind="os.fechaAgendada"></span>
                                    </div>
                                    <div class="col-2">
                                        <span class="text-table" ng-bind="os.turnoAg"></span>
                                    </div>
                                    <div class="col-2">
                                        <input type="checkbox" disabled readonly ng-model="os.osConfirmada" ng-true-value="'true'" ng-false-value="'false'">
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.os.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosOsCf()">
                                            <span ng-show="limitOsCf === 10">Mostrar mas...</span>
                                            <span ng-show="limitOsCf !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.os.length === 0">
                                    <div class="col-12 text-center">
                                        <span class="text-table">No se encontro informaci&oacute;n</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" id="accordionTkCuentaFactura" >
                <div class="card car-detalle">
                    <div class="card-header style-head-card" role="tab">
                        <div class="col-12" style="margin-top: -.5em;">
                            <a class="asd">
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Tickets</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div id="collapseTkCuentaFactura" class="  detalle-table-resumen">
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-3">
                                        <span class="text-head-table">N&uacute;mero</span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-head-table">Nombre</span>
                                    </div>                                      
                                    <div class="col-3">
                                        <span class="text-head-table">Fecha creaci&oacute;n</span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-head-table">Estatus</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="ticket in detalle.tickets | limitTo: limitTicketCf" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                    <div class="col-3">
                                        <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(ticket.id, ticket.keyObject)">
                                            <span class="text-table" ng-bind="ticket.caseNumber"></span>
                                        </a>

                                    </div>
                                    <div class="col-3">
                                            <span class="text-table" ng-bind="ticket.nivel1"></span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-table" ng-bind="ticket.createdDate"></span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-table" ng-bind="ticket.status"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.tickets.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosTicketCf()">
                                            <span ng-show="limitTicketCf === 10">Mostrar mas...</span>
                                            <span ng-show="limitTicketCf !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.tickets.length === 0">
                                    <div class="col-12 text-center">
                                        <span class="text-table">No se encontro informaci&oacute;n</span>
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
<div ng-show="showCuentaFactura" class="col-12">
    <jsp:include page="perfiles.jsp"></jsp:include>

    <!-- detalle nota -->
   <!--  <div class="card-header style_card_header_detallepro-sub separador-according" ng-click="consultarResumenAndServicios(detalle.numCuentaFactura)">
        <div class="row">
            <div class="col-md-6">
                <p class="mb-0 header-according-sub">Detalle de la nota</p>
            </div>
            <div class="col-md-6 text-right">
                <i class="fa fa-chevron-down" ng-class="mostrarNotaCF ? 'fa-rotate-270' : ''"></i>
            </div>
        </div>
    </div> -->

    <div class="col-md-12" ng-show="mostrarNotaCF">
        <div class="card-header style_card_header_detallepro separador-according">
            <div class="row">
                <div class="col-md-12 colTitulo">
                    <p class="mb-0 header-according">Informaci&oacute;n de la facturaci&oacute;n</p>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Nombre paquete:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.InfoFacturacion.nombrePaquete}}" ng-bind="resumenService.InfoFacturacion.nombrePaquete !== undefined ? resumenService.InfoFacturacion.nombrePaquete : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Descripci&oacute;n negocio:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.InfoFacturacion.descripcionNegocio}}" ng-bind="resumenService.InfoFacturacion.descripcionNegocio !== undefined ? resumenService.InfoFacturacion.descripcionNegocio : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Tipo de contrato:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.InfoFacturacion.tipoContrato}}" ng-bind="resumenService.InfoFacturacion.tipoContrato !== undefined ? resumenService.InfoFacturacion.tipoContrato : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Tipo de regimen:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.InfoFacturacion.tipoRegimen}}" ng-bind="resumenService.InfoFacturacion.tipoRegimen !== undefined ? resumenService.InfoFacturacion.tipoRegimen : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Fecha de activaci&oacute;n:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.InfoFacturacion.fechaActivacionBrm}}" ng-bind="resumenService.InfoFacturacion.fechaActivacionBrm !== undefined ? resumenService.InfoFacturacion.fechaActivacionBrm : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Renta:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.InfoFacturacion.estatus}}" ng-bind="resumenService.InfoFacturacion.estatus !== undefined ? resumenService.InfoFacturacion.estatus : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Estatus:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.InfoFacturacion.renta}}" ng-bind="resumenService.InfoFacturacion.renta !== undefined ? resumenService.InfoFacturacion.renta : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-header style_card_header_detallepro separador-according">
            <div class="row">
                <div class="col-md-12 colTitulo">
                    <p class="mb-0 header-according">Direcci&oacute;n de la facturaci&oacute;n</p>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-2 "><span class="content-first-title-head">Compa&ntilde;ia:</span></div>
                        <div class="col-10 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.compania}}" ng-bind="resumenService.DireccionFacturacion.compania !== undefined ? resumenService.DireccionFacturacion.compania : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Nombre:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.nombre}}" ng-bind="resumenService.DireccionFacturacion.nombre !== undefined ? resumenService.DireccionFacturacion.nombre : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Apellido paterno:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.apellidoPaerno}}" ng-bind="resumenService.DireccionFacturacion.apellidoPaerno !== undefined ? resumenService.DireccionFacturacion.apellidoPaerno : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Apellido materno:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.apellidoMaterno}}" ng-bind="resumenService.DireccionFacturacion.apellidoMaterno !== undefined ? resumenService.DireccionFacturacion.apellidoMaterno : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">RFC:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.rfc}}" ng-bind="resumenService.DireccionFacturacion.rfc !== undefined ? resumenService.DireccionFacturacion.rfc : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Ciudad:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.ciudad}}" ng-bind="resumenService.DireccionFacturacion.ciudad !== undefined ? resumenService.DireccionFacturacion.ciudad : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Colonia:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.colonia}}" ng-bind="resumenService.DireccionFacturacion.colonia !== undefined ? resumenService.DireccionFacturacion.colonia : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Delegaci&oacute;n:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.delegacion}}" ng-bind="resumenService.DireccionFacturacion.delegacion !== undefined ? resumenService.DireccionFacturacion.delegacion : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Estado:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.estado}}" ng-bind="resumenService.DireccionFacturacion.estado !== undefined ? resumenService.DireccionFacturacion.estado : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">CP:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionFacturacion.cp}}" ng-bind="resumenService.DireccionFacturacion.cp !== undefined ? resumenService.DireccionFacturacion.cp : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-header style_card_header_detallepro separador-according">
            <div class="row">
                <div class="col-md-12 colTitulo">
                    <p class="mb-0 header-according">Direcci&oacute;n de la instalaci&oacute;n</p>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-2 "><span class="content-first-title-head">Compa&ntilde;ia:</span></div>
                        <div class="col-10 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.compania}}" ng-bind="resumenService.DireccionInstalacion.compania !== undefined ? resumenService.DireccionInstalacion.compania : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Nombre:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.nombre}}" ng-bind="resumenService.DireccionInstalacion.nombre !== undefined ? resumenService.DireccionInstalacion.nombre : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Apellido paterno:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.apellidoPaerno}}" ng-bind="resumenService.DireccionInstalacion.apellidoPaerno !== undefined ? resumenService.DireccionInstalacion.apellidoPaerno : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Apellido materno:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.apellidoMaterno}}" ng-bind="resumenService.DireccionInstalacion.apellidoMaterno !== undefined ? resumenService.DireccionInstalacion.apellidoMaterno : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">RFC:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.rfc}}" ng-bind="resumenService.DireccionInstalacion.rfc !== undefined ? resumenService.DireccionInstalacion.rfc : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Ciudad:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.ciudad}}" ng-bind="resumenService.DireccionInstalacion.ciudad !== undefined ? resumenService.DireccionInstalacion.ciudad : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Colonia:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.colonia}}" ng-bind="resumenService.DireccionInstalacion.colonia !== undefined ? resumenService.DireccionInstalacion.colonia : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Delegaci&oacute;n:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.delegacion}}" ng-bind="resumenService.DireccionInstalacion.delegacion !== undefined ? resumenService.DireccionInstalacion.delegacion : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Estado:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.estado}}" ng-bind="resumenService.DireccionInstalacion.estado !== undefined ? resumenService.DireccionInstalacion.estado : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">CP:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.DireccionInstalacion.cp}}" ng-bind="resumenService.DireccionInstalacion.cp !== undefined ? resumenService.DireccionInstalacion.cp : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-header style_card_header_detallepro separador-according">
            <div class="row">
                <div class="col-md-12 colTitulo">
                    <p class="mb-0 header-according">Resumen de facturaci&oacute;n</p>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Periodo:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.ResumenFacturacion.periodo}}" ng-bind="resumenService.ResumenFacturacion.periodo !== undefined ? resumenService.ResumenFacturacion.periodo : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Renta:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.ResumenFacturacion.renta}}" ng-bind="resumenService.ResumenFacturacion.renta !== undefined ? resumenService.ResumenFacturacion.renta : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Cargo bonificaciones:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.ResumenFacturacion.cargoBonificaciones}}" ng-bind="resumenService.ResumenFacturacion.cargoBonificaciones !== undefined ? resumenService.ResumenFacturacion.cargoBonificaciones : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Otros cargos:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.ResumenFacturacion.otrosCargos}}" ng-bind="resumenService.ResumenFacturacion.otrosCargos !== undefined ? resumenService.ResumenFacturacion.otrosCargos : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Subtotal:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.ResumenFacturacion.subTotal}}" ng-bind="resumenService.ResumenFacturacion.subTotal !== undefined ? resumenService.ResumenFacturacion.subTotal : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Total factura:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.ResumenFacturacion.totalFactura}}" ng-bind="resumenService.ResumenFacturacion.totalFactura !== undefined ? resumenService.ResumenFacturacion.totalFactura : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="col-12 row style_detalle_todos">
                        <div class="col-6 "><span class="content-first-title-head">Ajuste redondeo:</span></div>
                        <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{resumenService.ResumenFacturacion.ajusteRedondeo}}" ng-bind="resumenService.ResumenFacturacion.ajusteRedondeo !== undefined ? resumenService.ResumenFacturacion.ajusteRedondeo : 'Sin informaci&oacute;n'"></span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 separador-according">
                <div class="accordion md-accordion accordion-blocks" id="accordionTkCuentaFactura" >
                    <div class="card car-detalle">
                        <div class="card-header style-head-card" role="tab">
                            <div class="col-12" style="margin-top: -.5em;">
                                <a class="asd">
                                    <h5 class="mt-1 mb-0">
                                        <span class="header-according">Servicio de internet</span>
                                    <!--i class="fas fa-angle-down rotate-icon"></i-->
                                    </h5>
                                </a>
                            </div>
                        </div>
                        <div class="detalle-table-resumen">
                            <div class="card-body">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-2">
                                            <span class="text-head-table">Tipo de servicio</span>
                                        </div>
                                        <div class="col-3">
                                            <span class="text-head-table">N&uacute;mero de serie</span>
                                        </div>                                      
                                        <div class="col-3">
                                            <span class="text-head-table">Mac</span>
                                        </div>
                                        <div class="col-2 text-center">
                                            <span class="text-head-table">Incluido</span>
                                        </div>
                                        <div class="col-2 text-center">
                                            <span class="text-head-table">Productos</span>
                                        </div>
                                    </div>
                                    <div class="row" ng-repeat="servicio in serviciosFacturado.InfoInternet.Internet | limitTo: limitInternetCf" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="servicio.tipoServicio"></span>
                                        </div>
                                        <div class="col-3">
                                            <span class="text-table" ng-bind="servicio.numeroSerie"></span>
                                        </div>
                                        <div class="col-3">
                                            <span class="text-table" ng-bind="servicio.mac"></span>
                                        </div>
                                        <div class="col-2 text-center">
                                            <input type="checkbox" disabled readonly ng-model="servicio.incluido" ng-true-value="'1'" ng-false-value="'0'">
                                        </div>
                                        <div class="col-2 text-center">
                                            <i ng-click="consultarProductos(servicio)" class="fa fa-bars icon-actividad-acciones" style="cursor: pointer;"></i>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="serviciosFacturado.InfoInternet.Internet.length > 10">
                                        <div class="col-12">
                                            <a class="style-link" href="" ng-click="mostrarMasMenosInternetCf()">
                                                <span ng-show="limitInternetCf === 10">Mostrar mas...</span>
                                                <span ng-show="limitInternetCf !== 10">Mostrar menos...</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="serviciosFacturado.InfoInternet.Internet === undefined || serviciosFacturado.InfoInternet.Internet.length === 0">
                                        <div class="col-12 text-center">
                                            <span class="text-table">No se encontro informaci&oacute;n</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 separador-according">
                <div class="accordion md-accordion accordion-blocks" id="accordionTkCuentaFactura" >
                    <div class="card car-detalle">
                        <div class="card-header style-head-card" role="tab">
                            <div class="col-12" style="margin-top: -.5em;">
                                <a class="asd">
                                    <h5 class="mt-1 mb-0">
                                        <span class="header-according">Servicio de telefonia</span>
                                    <!--i class="fas fa-angle-down rotate-icon"></i-->
                                    </h5>
                                </a>
                            </div>
                        </div>
                        <div id="collapseTkCuentaFactura" class="  detalle-table-resumen">
                            <div class="card-body">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5">
                                            <span class="text-head-table">Tipo de servicio</span>
                                        </div>
                                        <div class="col-5">
                                            <span class="text-head-table">DN</span>
                                        </div>        
                                        <div class="col-2 text-center">
                                            <span class="text-head-table">Productos</span>
                                        </div>                                
                                    </div>
                                    <div class="row" ng-repeat="servicio in serviciosFacturado.InfoTelefonia.DNs | limitTo: limitTelefoniaCf" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                        <div class="col-5">
                                            <span class="text-table" ng-bind="servicio.tipoServicio"></span>
                                        </div>
                                        <div class="col-5">
                                                <span class="text-table" ng-bind="servicio.dn"></span>
                                        </div>
                                        <div class="col-2 text-center">
                                            <i ng-click="consultarProductos(servicio)" class="fa fa-bars icon-actividad-acciones" style="cursor: pointer;"></i>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="serviciosFacturado.InfoTelefonia.DNs.length > 10">
                                        <div class="col-12">
                                            <a class="style-link" href="" ng-click="mostrarMasMenosTelefoniaCf()">
                                                <span ng-show="limitTelefoniaCf === 10">Mostrar mas...</span>
                                                <span ng-show="limitTelefoniaCf !== 10">Mostrar menos...</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="serviciosFacturado.InfoTelefonia.DNs === undefined || serviciosFacturado.InfoTelefonia.DNs.length === 0">
                                        <div class="col-12 text-center">
                                            <span class="text-table">No se encontro informaci&oacute;n</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 separador-according">
                <div class="accordion md-accordion accordion-blocks" id="accordionTkCuentaFactura" >
                    <div class="card car-detalle">
                        <div class="card-header style-head-card" role="tab">
                            <div class="col-12" style="margin-top: -.5em;">
                                <a class="asd">
                                    <h5 class="mt-1 mb-0">
                                        <span class="header-according">Servicio de TV</span>
                                    <!--i class="fas fa-angle-down rotate-icon"></i-->
                                    </h5>
                                </a>
                            </div>
                        </div>
                        <div id="collapseTkCuentaFactura" class="detalle-table-resumen">
                            <div class="card-body">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-2">
                                            <span class="text-head-table">Tipo de servicio</span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-head-table">Modelo</span>
                                        </div>        
                                        <div class="col-2">
                                            <span class="text-head-table">N&uacute;mero de serie</span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-head-table">MAC</span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-head-table">Incluido</span>
                                        </div>        
                                        <div class="col-2">
                                            <span class="text-head-table">Productos</span>
                                        </div>                                
                                    </div>
                                    <div class="row" ng-repeat="servicio in serviciosFacturado.InfoTelevision.Television | limitTo: limitTvCf" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="servicio.tipoServicio"></span>
                                        </div>
                                        <div class="col-2">
                                                <span class="text-table" ng-bind="servicio.modelo"></span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="servicio.numSerie"></span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="servicio.mac"></span>
                                        </div>
                                        <div class="col-2">
                                            <input type="checkbox" disabled readonly ng-model="servicio.incluido" ng-true-value="'1'" ng-false-value="'0'">
                                        </div>
                                        <div class="col-2">
                                            <i ng-click="consultarProductos(servicio)" class="fa fa-bars icon-actividad-acciones" style="cursor: pointer;"></i>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="serviciosFacturado.InfoTelevision.Television.length > 10">
                                        <div class="col-12">
                                            <a class="style-link" href="" ng-click="mostrarMasMenosTvCf()">
                                                <span ng-show="limitTvCf === 10">Mostrar mas...</span>
                                                <span ng-show="limitTvCf !== 10">Mostrar menos...</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="serviciosFacturado.InfoTelevision.Television === undefined || serviciosFacturado.InfoTelevision.Television.length === 0">
                                        <div class="col-12 text-center">
                                            <span class="text-table">No se encontro informaci&oacute;n</span>
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

    <!-- ips -->
   <!--  <div class="card-header style_card_header_detallepro-sub separador-according" ng-click="consultarIps(detalle.numCuentaFactura)">
        <div class="row">
            <div class="col-md-6">
                <p class="mb-0 header-according-sub">Consulta de IPS</p>
            </div>
            <div class="col-md-6 text-right">
                <i class="fa fa-chevron-down" ng-class="mostrarIps ? 'fa-rotate-270' : ''"></i>
            </div>
        </div>
    </div> -->

    <div class="col-md-12" ng-show="mostrarIps">
        <div class="row">
            <div class="col-12 separador-according">
                <div class="accordion md-accordion accordion-blocks" id="accordionTkCuentaFactura" >
                    <div class="card car-detalle">
                        <div class="card-header style-head-card" role="tab">
                            <div class="col-12" style="margin-top: -.5em;">
                                <a class="asd">
                                    <h5 class="mt-1 mb-0">
                                        <span class="header-according">IPS</span>
                                    <!--i class="fas fa-angle-down rotate-icon"></i-->
                                    </h5>
                                </a>
                            </div>
                        </div>
                        <div id="collapseTkCuentaFactura" class="detalle-table-resumen">
                            <div class="card-body">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-2">
                                            <span class="text-head-table">Ip</span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-head-table">Gateway</span>
                                        </div>        
                                        <div class="col-2">
                                            <span class="text-head-table">Mascara</span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-head-table">Dns1</span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-head-table">Dns2</span>
                                        </div>        
                                        <div class="col-2">
                                            <span class="text-head-table">SubServicio</span>
                                        </div>                                
                                    </div>
                                    <div class="row" ng-repeat="ip in arregloIps | limitTo: limitIps" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="ip.ip"></span>
                                        </div>
                                        <div class="col-2">
                                                <span class="text-table" ng-bind="ip.gateway"></span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="ip.mascara"></span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="ip.dns1"></span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="ip.dns2"></span>
                                        </div>
                                        <div class="col-2">
                                            <span class="text-table" ng-bind="ip.subServicio"></span>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="arregloIps.length > 10">
                                        <div class="col-12">
                                            <a class="style-link" href="" ng-click="mostrarMasMenosIps()">
                                                <span ng-show="limitIps === 10">Mostrar mas...</span>
                                                <span ng-show="limitIps !== 10">Mostrar menos...</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="arregloIps === undefined || arregloIps.length === 0">
                                        <div class="col-12 text-center">
                                            <span class="text-table">No se encontro informaci&oacute;n</span>
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
    
    <br>
</div>

