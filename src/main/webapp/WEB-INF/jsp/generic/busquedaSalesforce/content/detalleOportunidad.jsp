
<div class="col-12">
    <div class="row header-detalle">
        <div  ng-show="showOportunidad" class="header-back-title col-2">
            <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-undo"></span>
            </div>
            <div  ng-click="abrirVentanaNoticias()" ng-show="banderaNoticiasOportunidad" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-newspaper-o"></span>
            </div>
            <div  ng-click="regresarHome()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-home"></span>
            </div>
        </div>
        <div  ng-show="showOportunidad" class="header-back-title col-10">
            <div class="alinear-derecha">
                <div class="iconsf-container">
                    <img class="img-oportunidad img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/oportunidad.png" alt="">
                </div>      
                <div class="textcontainer-header">
                    <span class="text-title-elementoh">Oportunidad:</span>
                    <span class="title-regresar-generic"  ng-bind="detalle.nombre"></span>
                </div>   
            </div>          
        </div>
    </div>
</div>

<div  ng-show="showOportunidad" class="col-12 separador-according">
   
    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Informaci&oacute;n general</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4" style="overflow: hidden;">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombre}}" ng-bind="detalle.nombre"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">N&uacute;mero:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.numeroOportunidad}}" ng-bind="detalle.numeroOportunidad"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Etapa:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.etapa}}" ng-bind="detalle.etapa"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Origen prospecto:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.origenProspecto}}" ng-bind="detalle.origenProspecto"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Segmento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.segmento}}" ng-bind="detalle.segmento"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Segmento facturaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.segmentoFacturacion}}" ng-bind="detalle.segmentoFacturacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Tipo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipo}}" ng-bind="detalle.tipo"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Subtipo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.subTipo}}" ng-bind="detalle.subTipo"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Plaza:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plaza}}" ng-bind="detalle.plaza"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Plazo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plazo}}" ng-bind="detalle.plazo"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Monto de facturaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.montoFacturacion}}" ng-bind="detalle.montoFacturacion"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Fecha cierre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaCierre}}" ng-bind="detalle.fechaCierre"></span></div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Datos de la cuenta</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col">
                        <a href="" class="link-consultardetalle " ng-click="consultarDetalleObjectosSF(detalle.datosCuenta.id, detalle.datosCuenta.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.datosCuenta.nombre}}" ng-bind="detalle.datosCuenta.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-4"><span class="content-first-title-head">Raz&oacute;n social:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.datosCuenta.razonSocial}}" ng-bind="detalle.datosCuenta.razonSocial"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">RFC:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.datosCuenta.rfc}}" ng-bind="detalle.datosCuenta.rfc"></span></div>
                </div>
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-4"><span class="content-first-title-head">Top 5000:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="detalle.datosCuenta.top5000" ng-true-value="'true'" ng-false-value="'false'">
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
                        <span class="content-first-title-head-answer" ng-show="detalle.modificadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.modificadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.modificadoPor)" title="{{detalle.modificadoPor.nombre}}" ng-bind="detalle.modificadoPor.nombre"></span>
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
                        <span class="content-first-title-head-answer" ng-show="detalle.propietarioCuenta.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.propietarioCuenta.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.propietarioCuenta)" title="{{detalle.propietarioCuenta.nombre}}" ng-bind="detalle.propietarioCuenta.nombre"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br>
</div>
