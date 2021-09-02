<div  ng-show="showCotizacion" class="header-back-title col-2">
    <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
    <div  ng-click="regresarHome()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-home"></span>
    </div>
</div>
<div  ng-show="showCotizacion" class="header-back-title col-10">
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img class="img-cotizacion img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/cotizacion.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">Cotizaci&oacute;n:</span>
            <span class="title-regresar-generic"  ng-bind="detalle.nombre"></span>
        </div>   
    </div>          
</div>

<div  ng-show="showCotizacion" class="col-12 separador-according">

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
                    <div class="col-6 "><span class="content-first-title-head">Inicio del proyecto:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.inicioProyecto}}" ng-bind="detalle.inicioProyecto"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Puntas totales:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.puntasTotales}}" ng-bind="detalle.puntasTotales"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de contizaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoCotizacion}}" ng-bind="detalle.tipoCotizacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de contizaci&oacute;n PM:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoCotizacionPm}}" ng-bind="detalle.tipoCotizacionPm"></span></div>
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
                    <div class="col-6 "><span class="content-first-title-head">Segmento gerencia:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.segmentoGerencia}}" ng-bind="detalle.segmentoGerencia"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Segmento facturaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.segmentoFacturacion}}" ng-bind="detalle.segmentoFacturacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plazo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plazo}}" ng-bind="detalle.plazo"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Propietario Oportunidad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.propietarioOportunidad}}" ng-bind="detalle.propietarioOportunidad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plaza:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plaza}}" ng-bind="detalle.plaza"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Regi&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.region}}" ng-bind="detalle.region"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Vigencia de cotizaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.vigenciaCotizacion}}" ng-bind="detalle.vigenciaCotizacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cotizaci&oacute;n principal:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="detalle.cotizacionPrincipal" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Top 5000:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="detalle.top5mil" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Resumen de cotizaci&oacute;n</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Subtotal de renta:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.resumenCotizacion.subtotalRenta}}" ng-bind="detalle.resumenCotizacion.subtotalRenta"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Total adicionales:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.resumenCotizacion.totalAdicionales}}" ng-bind="detalle.resumenCotizacion.totalAdicionales"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Total incluidos:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.resumenCotizacion.totalIncluidos}}" ng-bind="detalle.resumenCotizacion.totalIncluidos"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Total renta con descuento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.resumenCotizacion.totalRentaConDescuento}}" ng-bind="detalle.resumenCotizacion.totalRentaConDescuento"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Total renta con impuesto:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.resumenCotizacion.totalRentaConImpuesto}}" ng-bind="detalle.resumenCotizacion.totalRentaConImpuesto"></span></div>
                </div>
            </div>
            <div class="col-4">
                
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" id="accordionCotSitioDeta">
                <div class="card car-detalle">
                    <div class="card-header style-head-card"  id="headingUnfiled">
                        <div class="col-12 colTitulo" style="margin-top: -.5em;">
                            <a class="asd" >
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Cot sitio</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div id="collapseCotSitioDeta" >
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-4">
                                        <span class="text-head-table">Nombre</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Subtotal</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Total</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="cotSitio in detalle.arrCotSitio | limitTo: limitCotSitioCot" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                    <div class="col-4">
                                        <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cotSitio.id, cotSitio.keyObject)">
                                            <span class="text-table" ng-bind="cotSitio.nombre"></span>
                                        </a>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="cotSitio.subtotalRenta"></span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="cotSitio.totalRentaConImpuesto"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.arrCotSitio.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosCotSitioCot()">
                                            <span ng-show="limitCotSitioCot === 10">Mostrar mas...</span>
                                            <span ng-show="limitCotSitioCot !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.arrCotSitio.length === 0">
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
            <div class="accordion md-accordion accordion-blocks" id="accordionCotSitioPlanCot" >
                <div class="card car-detalle">
                    <div class="card-header style-head-card" >
                        <div class="col-12 colTitulo" style="margin-top: -.5em;">
                            <a class="asd" >
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Cot sitio plan</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div id="collapseCotSitioPlanCot" >
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6">
                                        <span class="text-head-table">Nombre</span>
                                    </div>
                                    <div class="col-6">
                                        <span class="text-head-table">Nombre plan</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="cotSitioPlan in detalle.arrCotSitioPlan | limitTo: limitCotSitioPlanCot" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                    <div class="col-6">
                                        <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cotSitioPlan.id, cotSitioPlan.keyObject)">
                                            <span class="text-table" ng-bind="cotSitioPlan.nombre"></span>
                                        </a>
                                    </div>
                                    <div class="col-6">
                                        <span class="text-table" ng-bind="cotSitioPlan.nombrePlan"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.arrCotSitioPlan.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosCotSitioPlanCot()">
                                            <span ng-show="limitCotSitioPlanCot === 10">Mostrar mas...</span>
                                            <span ng-show="limitCotSitioPlanCot !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.arrCotSitioPlan.length === 0">
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
    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Informaci&oacute;n general</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Creado por:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-show="detalle.creadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.creadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.creadoPor)" title="{{detalle.creadoPor.nombre}}" ng-bind="detalle.creadoPor.nombre"></span> 
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">&Uacute;ltima modifica:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-show="detalle.modificadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.modificadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.modificadoPor)" title="{{detalle.modificadoPor.nombre}}" ng-bind="detalle.modificadoPor.nombre"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Propietario del contacto:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-show="detalle.propietario.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.propietario.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.propietario)" title="{{detalle.propietario.nombre}}" ng-bind="detalle.propietario.nombre"></span>
                    </div>
                </div>
            </div>
        </div>
    </div> 

    <br>
</div>