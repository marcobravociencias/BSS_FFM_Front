    
<div  ng-show="showCuenta" class="header-back-title col-2">
    <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
    <div  ng-click="regresarHome()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-home"></span>
    </div>
</div>
<div  ng-show="showCuenta" class="header-back-title col-10">
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img class="imgcuenta img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/cuenta.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">Cuenta :</span>
            <span class="title-regresar-generic"  ng-bind="detalle.nombre"></span>
        </div>   
    </div>          
</div>


<div ng-show="showCuenta" class="col-12 separador-according">

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
                    <div class="col-6 "><span class="content-first-title-head">Raz&oacute;n social:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.razonSocial}}" ng-bind="detalle.razonSocial"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Folio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.folioCuenta}}" ng-bind="detalle.folioCuenta"></span></div>
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
                    <div class="col-6 "><span class="content-first-title-head">RFC:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.rfc}}" ng-bind="detalle.rfc"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Sector:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.sector}}" ng-bind="detalle.sector"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de persona:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoPersona}}" ng-bind="detalle.tipoPersona"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Monto facturaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.montoFacturacion}}" ng-bind="detalle.montoFacturacion"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Telefono:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.telefono}}" ng-bind="detalle.telefono"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Top 5000:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="detalle.top5000" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
            <div class="col-4">
                
            </div>
        </div>
    </div>

    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Contacto principal</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.contactoPrincipal.nombre}}" ng-bind="detalle.contactoPrincipal.nombre !== undefined ? detalle.contactoPrincipal.nombre : 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Celular:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.contactoPrincipal.celular}}" ng-bind="detalle.contactoPrincipal.celular !== undefined ? detalle.contactoPrincipal.celular : 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Telefono:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.contactoPrincipal.telefono}}" ng-bind="detalle.contactoPrincipal.telefono !== undefined ? detalle.contactoPrincipal.telefono : 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Email:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.contactoPrincipal.email}}" ng-bind="detalle.contactoPrincipal.email !== undefined ? detalle.contactoPrincipal.email : 'Sin informaci&oacute;n'"></span></div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Domicilio de la cuenta</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.estado}}" ng-bind="detalle.domicilioCuenta.estado"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ciudad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.ciudad}}" ng-bind="detalle.domicilioCuenta.ciudad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Municipio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.municipio}}" ng-bind="detalle.domicilioCuenta.municipio"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Codigo postal:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.cp}}" ng-bind="detalle.domicilioCuenta.cp"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Colonia:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.colonia}}" ng-bind="detalle.domicilioCuenta.colonia"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Calle:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.calle}}" ng-bind="detalle.domicilioCuenta.calle"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero exterior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.numExterior}}" ng-bind="detalle.domicilioCuenta.numExterior"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero interior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.domicilioCuenta.numInterior}}" ng-bind="detalle.domicilioCuenta.numInterior"></span></div>
                </div>
            </div>
            <div class="col-4">
                
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" id="accordionCfCuenta">
                <div class="card car-detalle">
                    <div class="card-header style-head-card"  id="headingUnfiled">
                        <div class="col-12" style="margin-top: -.5em;">
                            <a class="asd">
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Cuentas facturas</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div id="collapseCfCuenta" >
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-4">
                                        <span class="text-head-table">Cuenta factura</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Nombre</span>
                                    </div>                               
                                    <div class="col-4">
                                        <span class="text-head-table">Folio de venta</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="cf in detalle.cuentasFacturas | limitTo: limitCuentaFacturaCu" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">                                  
                                    <div class="col-4">
                                        <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cf.id, cf.keyObject)">
                                            <span class="text-table" ng-bind="cf.numCuentaFactura"></span>
                                        </a>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="cf.nombre"></span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="cf.folioVenta"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.cuentasFacturas.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosCuentaFacturaCu()">
                                            <span ng-show="limitCuentaFacturaCu === 10">Mostrar mas...</span>
                                            <span ng-show="limitCuentaFacturaCu !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.cuentasFacturas.length === 0">
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
    
    <div class="row">
        <div class="col-12 separador-according">
            <div class="accordion md-accordion accordion-blocks" id="accordionOpCuenta">
                <div class="card car-detalle">
                    <div class="card-header style-head-card"  id="headingUnfiled">
                        <div class="col-12" style="margin-top: -.5em;">
                            <a class="asd" >
                                <h5 class="mt-1 mb-0">
                                    <span class="header-according">Oportunidades</span>
                                <!--i class="fas fa-angle-down rotate-icon"></i-->
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div id="collapseOpCuenta" >
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-4">
                                        <span class="text-head-table">Numero de oportunidad</span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-head-table">Nombre</span>
                                    </div>                                  
                                    <div class="col-4">
                                        <span class="text-head-table">Fecha cierre</span>
                                    </div>
                                </div>
                                <div class="row" ng-repeat="oportunidad in detalle.oportinidades | limitTo: limitOportunidadCu" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                                    <div class="col-4">
                                        <a href="" class="link-consultardetalle " ng-click="consultarDetalleObjectosSF(oportunidad.id, oportunidad.keyObject)">
                                            <span class="text-table" ng-bind="oportunidad.numeroOportunidad"></span>
                                        </a>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="oportunidad.nombre"></span>
                                    </div>
                                    <div class="col-4">
                                        <span class="text-table" ng-bind="oportunidad.fechaCierre"></span>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.oportinidades.length > 10">
                                    <div class="col-12">
                                        <a class="style-link" href="" ng-click="mostrarMasMenosOportunidadCu()">
                                            <span ng-show="limitOportunidadCu === 10">Mostrar mas...</span>
                                            <span ng-show="limitOportunidadCu !== 10">Mostrar menos...</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row" ng-show="detalle.oportinidades.length === 0">
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
                        <span class="content-first-title-head-answer" ng-show="detalle.propietarioCuenta.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.propietarioCuenta.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.propietarioCuenta)" title="{{detalle.propietarioCuenta.nombre}}" ng-bind="detalle.propietarioCuenta.nombre"></span>
                    </div>
                </div>
            </div>
        </div>
    </div> 

    <br>
    
</div>