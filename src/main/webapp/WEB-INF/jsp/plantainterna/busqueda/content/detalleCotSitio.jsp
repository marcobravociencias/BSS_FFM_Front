    
<div  ng-show="showCotSitio" class="header-back-title col-2">
    <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
    <div  ng-click="regresarHome()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-home"></span>
    </div>
</div>
<div  ng-show="showCotSitio" class="header-back-title col-10">
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img class="img-cotsitio img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/cotsitio.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">COT SITIO:</span>
            <span class="title-regresar-generic"  ng-bind="detalle.nombre"></span>
        </div>   
    </div>          
</div>



<div  ng-show="showCotSitio" class="col-12 separador-according">
   

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
                    <div class="col-6 "><span class="content-first-title-head">Subtotal:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.subtotalRenta}}" ng-bind="detalle.subtotalRenta"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Total:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.totalRentaConImpuesto}}" ng-bind="detalle.totalRentaConImpuesto"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plaza:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plaza}}" ng-bind="detalle.plaza"></span></div>
                </div>
            </div>
            <div class="col-8">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-3 "><span class="content-first-title-head">Direcci&oacute;n:</span></div>
                    <div class="col-9 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.direccionSitio}}" ng-bind="detalle.direccionSitio"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cotizaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCotizacion.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleCotizacion.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCotizacion.id, detalle.detalleCotizacion.keyObject, detalle.detalleCotizacion.nombre)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCotizacion.nombre}}" ng-bind="detalle.detalleCotizacion.nombre"></span>
                        </a>
                    </div>
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
                    <div class="col-6 "><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.nombre}}" ng-bind="detalle.detalleSitio.nombre"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nombre del sitio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.nombreSitio}}" ng-bind="detalle.detalleSitio.nombreSitio"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cobertura:</span></div>
                    <div class="col-6 crop-text-col">
                        <input type="checkbox" disabled readonly ng-model="detalle.detalleSitio.cobertura" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de cobertura:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.tipoCobertura}}" ng-bind="detalle.detalleSitio.tipoCobertura"></span></div>
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
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero interior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.numeroInterior}}" ng-bind="detalle.detalleSitio.numeroInterior"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
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
            <div class="col-4">
                
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" id="accordionCotSitioPlanDeta" >
                <div class="card car-detalle">
                    <div class="card-header style-head-card" role="tab" id="headingUnfiled">
                        <div class="col-12 colTitulo" style="margin-top: -.5em;">
                            <a class="asd" >
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Cot sitio plan</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div id="collapseCotSitioPlanDeta">
                        <div class="card-body card-body-tabla">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-4">
                                        <span class="text-head-table">Nombre</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Nombre plan</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Fecha cierre</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="cotSitioPlan in detalle.cotSitioPlanes | limitTo: limitCotSitioPlanCs" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                    <div class="col-4">
                                        <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cotSitioPlan.id, cotSitioPlan.keyObject, cotSitioPlan.nombre)">
                                            <span class="text-table" ng-bind="cotSitioPlan.nombre"></span>
                                        </a>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="cotSitioPlan.nombrePlan"></span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="cotSitioPlan.Fecha_cierre"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.cotSitioPlanes.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosCotSitioPlanCs()">
                                            <span ng-show="limitCotSitioPlanCs === 10">Mostrar mas...</span>
                                            <span ng-show="limitCotSitioPlanCs !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.cotSitioPlanes.length === 0">
                                    <div class="col-12 ">
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
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Creado por:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-show="detalle.creadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.creadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.creadoPor)" title="{{detalle.creadoPor.nombre}}" ng-bind="detalle.creadoPor.nombre"></span> 
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">&Uacute;ltima modifica:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-show="detalle.editadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.editadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.editadoPor)" title="{{detalle.editadoPor.nombre}}" ng-bind="detalle.editadoPor.nombre"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
            </div>
            <div class="col-4">
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
