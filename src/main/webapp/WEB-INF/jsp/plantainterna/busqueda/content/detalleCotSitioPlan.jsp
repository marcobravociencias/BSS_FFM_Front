<div  ng-show="showCotSitioPlan" class="header-back-title col-2">
    <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
    <div  ng-click="regresarHome()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-home"></span>
    </div>
</div>
<div  ng-show="showCotSitioPlan" class="header-back-title col-10">
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img class="img-csp img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/csp.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">Cot sitio plan:</span>
            <span class="title-regresar-generic"  ng-bind="detalle.nombreCsp || 'Sin informaci&oacute;n'"></span>
        </div>   
    </div>          
</div>

<div  ng-show="showCotSitioPlan" class="col-12 separador-according">

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
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombreCsp}}" ng-bind="detalle.nombreCsp || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Paquete:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.paquete}}" ng-bind="detalle.paquete || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Acceso principal:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.accesoPrincipal}}" ng-bind="detalle.accesoPrincipal || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de oportunidad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoOportunidad}}" ng-bind="detalle.tipoOportunidad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de plan:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoPlan}}" ng-bind="detalle.tipoPlan"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de registro:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoRegistroCf}}" ng-bind="detalle.tipoRegistroCf"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuenta comercial:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombreCuentaComercial}}" ng-bind="detalle.nombreCuentaComercial"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nombre de oportunidad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombreOportunidad}}" ng-bind="detalle.nombreOportunidad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de cotizaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoCotizacionPM}}" ng-bind="detalle.tipoCotizacionPM"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estatus de activaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.estatusActivacion}}" ng-bind="detalle.estatusActivacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Oportunidad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.oportunidadTipo}}" ng-bind="detalle.oportunidadTipo"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Sobreprecio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.sobrePrecio}}" ng-bind="detalle.sobrePrecio"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuadrilla:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.cuandrilla}}" ng-bind="detalle.cuandrilla || 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha de aprovisionamiento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaAprovisionamiento}}" ng-bind="detalle.fechaAprovisionamiento"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha cierre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaCierre}}" ng-bind="detalle.fechaCierre"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">aprovisionamiento TE:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="detalle.aprovisionamientoTe" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">COT SITIO:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCotSitio.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleCotSitio.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCotSitio.id, detalle.detalleCotSitio.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCotSitio.nombre}}" ng-bind="detalle.detalleCotSitio.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">OS:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="!detalle.detalleOs.nombre">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleOs.nombre" ng-click="consultarDetalleObjectosSF(detalle.detalleOs.id, detalle.detalleOs.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleOs.nombre}}" ng-bind="detalle.detalleOs.nombre || 'Sin informaci&oacute;n'"></span>
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
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleCotizacion.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCotizacion.id, detalle.detalleCotizacion.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCotizacion.nombre}}" ng-bind="detalle.detalleCotizacion.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuenta Factura:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCuentaFactura.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle"  ng-if="detalle.detalleCuentaFactura.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCuentaFactura.id, detalle.detalleCuentaFactura.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCuentaFactura.nombre}}" ng-bind="detalle.detalleCuentaFactura.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <jsp:include page="perfiles.jsp"></jsp:include>

    <div class="card-header style_card_header_detallepro-sub separador-according" ng-click="consultarProductosSF(detalle.Nombre_csp)">
        <div class="row">
            <div class="col-md-6 colTitulo">
                <p class="mb-0 header-according-sub">Nota de tintoreria</p>
            </div>
            <div class="col-md-6 text-right">
                <i class="fa fa-chevron-down" ng-class="mostrarTintoreria ? 'fa-rotate-270' : ''"></i>
            </div>
        </div>
    </div>
    <div class="col-12" ng-show="mostrarTintoreria">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Folio CSP:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{responseServicios.Folio_cotsitio_plan}}" ng-bind="responseServicios.Folio_cotsitio_plan"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Sitio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{responseServicios.Sitio}}" ng-bind="responseServicios.Sitio"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nombre plan:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{responseServicios.Nombre_plan}}" ng-bind="responseServicios.Nombre_plan"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Medio de acceso:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{responseServicios.MedioAcceso}}" ng-bind="responseServicios.MedioAcceso"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Num. DNS:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{responseServicios.Num_dns}}" ng-bind="responseServicios.Num_dns"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Monto Primer pago:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{responseServicios.Monto_primerpago}}" ng-bind="responseServicios.Monto_primerpago"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Aplica cobro:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="responseServicios.Aplica_cobro_pr" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row" ng-show="mostrarTintoreria">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" >
                <div class="card car-detalle">
                    <div class="card-header style-head-card">
                        <div class="col-12" style="margin-top: -.5em;">
                            <a class="asd">
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Servicios</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-4">
                                        <span class="text-head-table">Nombre del servicio</span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-head-table">Tipo de servicio</span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-head-table">Incluido</span>
                                    </div>                               
                                    <div class="col-2 text-center">
                                        <span class="text-head-table">Detalle</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="servicio in responseServicios.Servicios.Servicio | limitTo: limitServiciosCsp" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">                                  
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="servicio.Nombre_servicio"></span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-table" ng-bind="servicio.Tipo_servicio"></span>
                                    </div>
                                    <div class="col-3">
                                        <span class="text-table" ng-bind="servicio.Servicio_Incluido"></span>
                                    </div>
                                    <div class="col-2 text-center detalle_table">
                                        <button ng-if="servicio.Id_dpplan_servicio !== undefined" type="button" ng-click="consultarDetalleServicio(servicio)" class="btn_detalle_servicio btn btn-info btn-rounded btn-sm my-0 waves-effect waves-light">
                                            <i class="fa fa-eye"></i>
                                        </button>
                                        <span ng-if="servicio.Id_dpplan_servicio === undefined">Sin detalle</span>
                                    </div>
                                </div>
                                <div class="row" ng-show="responseServicios.Servicios.Servicio.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosServicioCsp()">
                                            <span ng-show="limitServiciosCsp === 10">Mostrar mas...</span>
                                            <span ng-show="limitServiciosCsp !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="responseServicios.Servicios.Servicio.length === 0">
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

    <div class="row" ng-show="mostrarTintoreria">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" >
                <div class="card car-detalle">
                    <div class="card-header style-head-card">
                        <div class="col-12" style="margin-top: -.5em;">
                            <a class="asd">
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Productos</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-4">
                                        <span class="text-head-table">Folio</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Nombre del producto</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Tipo de producto</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="producto in responseServicios.Productos.Producto | limitTo: limitProductosCsp" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">                                  
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="producto.FolioProducto"></span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="producto.Nombre_producto"></span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="producto.Tipo_producto"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="responseServicios.Productos.Producto.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosProductoCsp()">
                                            <span ng-show="limitProductosCsp === 10">Mostrar mas...</span>
                                            <span ng-show="limitProductosCsp !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="responseServicios.Productos.Producto.length === 0">
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

    <div class="row" ng-show="mostrarTintoreria">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" >
                <div class="card car-detalle">
                    <div class="card-header style-head-card">
                        <div class="col-12" style="margin-top: -.5em;">
                            <a class="asd">
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Promociones</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6">
                                        <span class="text-head-table">Folio</span>
                                    </div>
                                    <div class="col-6">
                                        <span class="text-head-table">Nombre de la promoci&oacute;n</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="promocion in responseServicios.Promociones.Promocion | limitTo: limitPromocionesCsp" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">                                  
                                    <div class="col-6">
                                        <span class="text-table" ng-bind="promocion.FolioPromocion"></span>
                                    </div>
                                    <div class="col-6">
                                        <span class="text-table" ng-bind="promocion.Nombre_promocion"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="responseServicios.Promociones.Promocion.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosPromocionesCsp()">
                                            <span ng-show="limitPromocionesCsp === 10">Mostrar mas...</span>
                                            <span ng-show="limitPromocionesCsp !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="responseServicios.Promociones.Promocion === undefined || responseServicios.Promociones.Promocion.length === 0">
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

    <br>
</div>