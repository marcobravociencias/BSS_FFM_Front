

        <div class="content-fluid container-filtros-oportunidad contenedor-oportunidad" ng-show="showTable">
            <div class="row col-12" id="filtros_config">
                <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                    <label for="fecha_oportunidad" class="label-filter">Fecha</label>
                    <input readonly type="text" id="fecha_oportunidad" class="datepicker input-filtro-oportunidad form-control form-control-sm" style="width: 100px;" />
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="idot" class="label-filter">No. Oportunidad</label>
                    <input type="text" id="idot" placeholder="Ej: 65434" ng-model="camposFiltro.oportunidad" ng-change="limpiarCamposFiltro(1)" class="form-control input-filtro-oportunidad form-control-sm">
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="idos" class="label-filter">Nombre cliente</label>
                    <input type="text" id="idos" placeholder="Ej: 23214" ng-model="camposFiltro.nombreCliente" ng-change="limpiarCamposFiltro(2)" class="form-control input-filtro-oportunidad form-control-sm">
                </div>
                <div class="col-1 div-btn-busqueda" style="width: 65px;">
                    <button id="btn_consultar_oportunidades" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" ng-click="consultarTablas()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <div id="" class="col-1 column-style-consulta" ng-if="configPermisoAccionDescargaReporteOrdenes" style="margin-top: 23px; width: 20px !important;">
                    <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer" ng-click="descargarReporteConsultaOt()">
                </div>
            </div>
            <!--div class="col-12">
                <div class="row">
                    <div class="col-1 content-contador contadores_border_right form-group" style="margin-left:20%;">
                        <span class="valor_contador" ng-bind="contadorGeneral.numOportunidad"></span>
                        <br>
                        <span class="contadores_general">Oportunidades</span>
                    </div>
                    <div class="col-1 content-contador contadores_border_right form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.numCsp"></span>
                        <br>
                        <span class="contadores_general">CSP</span>
                    </div>
                    <div class="col-1 content-contador contadores_border_right form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.numImplementadas"></span>
                        <br>
                        <span class="contadores_general">CSP Implementadas</span>
                    </div>
                    <div class="col-1 content-contador contadores_border_right form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.numCanceladas"></span>
                        <br>
                        <span class="contadores_general">CSP Canceladas</span>
                    </div>
                    <div class="col-1 content-contador form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.avance +'%'"></span>
                        <br>
                        <span class="contadores_general">Avance</span>
                        
                    </div>
                </div>
            </div-->
            <div class="col-12" id="contentContadoresPrincipal">
                <ul class="nav nav-tabs" id="tabContadorOportunidades" role="tablist">
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(1)">
                        <label class="nav-link active label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numOportunidad ? contadorGeneral.numOportunidad : '0'"></p>
                            Oportunidades
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(2)">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numCsp ? contadorGeneral.numCsp : '0'"></p>
                            CSP
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(3)">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numImplementadas ? contadorGeneral.numImplementadas : '0'"></p>
                            CSP Implementadas
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(4)">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numCanceladas ? contadorGeneral.numCanceladas : '0'"></p>
                            CSP Canceladas
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" >
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.avance ? contadorGeneral.avance +'%' : '0%'"></p>
                            Avance
                        </label>
                    </li>
                </ul>
            </div>

            <div class="row row-content-principal">
                <div class="col-md-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" >
                            <a class="nav-link " id="opcion-estatus-tab" data-toggle="tab"
                                href="#opcion-estatus" role="tab" aria-controls="opcion-estatus"
                                aria-selected="true">Estatus Oportunidades</a>
                        </li>
                        <li class="nav-item" >
                            <a class="nav-link active" id="opcion-solicitudes-tab" data-toggle="tab"
                                href="#opcion-solicitudes" role="tab" aria-controls="opcion-solicitudes"
                                aria-selected="false">CSP's con Solicitudes de Torre de Control y Lider Tecnico</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade "  id="opcion-estatus"
                            role="tabpanel" aria-labelledby="opcion-estatus-tab">
            <!--inicio tabla-->
            <div class="content-fluid">
                <div class="table-responsive">
                    <table id="oportunidadTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_oportunidad">
                            <tr>
                                <th>No. Oportunidad</th>
                                <th>Nombre del cliente</th>
                                <th>EIM asignado</th>
                                <th>Fecha de cierre</th>
                                <th>Check list</th>
                                <th>Num. de CSP's</th>
                                <th>Implementadas</th>
                                <th>Canceladas</th>
                                <th>Avance</th>
                                <th><img style="height: 16px;" src="./resources/img/iconsistema/icon_residencial.svg" alt=""></th>
                                <th><img style="height: 16px;" src="./resources/img/iconsistema/icon_empresarial.svg" alt=""></th>
                                <th>Lider tecnico</th>
                                <th>Torre de Control</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--inicio tabla-->
        </div>
        <div class="tab-pane fade show active" 
            id="opcion-solicitudes" role="tabpanel" aria-labelledby="opcion-solicitudes-tab">
            <div class="content-fluid">
                <div class="table-responsive">
                    <table id="solicitudTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_solicitud">
                            <tr>
                                <th>CSP</th>
                                <th>COT</th>
                                <th>No. Oportunidad</th>
                                <th>Nombre del cliente</th>
                                <th>EIM asignado</th>
                                <th>Lider Tecnico / Torre de Control</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


        </div>
        <div class="content-fluid container-filtros-oportunidad contenedor-oportunidad" ng-show="!showTable">
           
            <div class="col-12">
                <i ng-click="regresarPaginaPrincipal()" class="fa fa-chevron-circle-left fa-lg icon_regresar_principal"></i>
                <span class="detalle_oportunidad_estatic">Detalle de la oportunidad</span>
                <span class="detalle_oportunidad_dinamic" ng-bind="objectOportunidad.nombreCliente + ' /'"></span>
                <span class="detalle_oportunidad_estatic">Cotizaci&oacute;n</span>
                <span class="detalle_oportunidad_dinamic" ng-bind="objectOportunidad.cotizacion + ' /'"></span>
                <span class="detalle_oportunidad_estatic">CSP ASOCIADOS</span>
                <span class="detalle_oportunidad_dinamic" ng-bind="contadorDetalleOportunidad.numCsp"></span>
            </div>
            <br>
            <div class="col-12" id="contentContadores">
                <ul class="nav nav-tabs" id="tabContadorDetalleOportunidades" role="tablist">
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('todos')">
                        <label class="nav-link active label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorDetalleOportunidad.numCsp"></p>
                            CSP
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('asignado')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Enviados a Infra
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('disponible')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Recibidos de Infra
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('no disponible')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Implementados
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad" ng-click="busquedaVehiculosEstado('baja')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Calendarizados
                        </label>
                    </li>
                </ul>
            </div>
            <hr style="margin-top: .1em;">
            <div class="content-fluid">
                <div class="table-responsive">
                    <table id="table_detalle_oportunidad" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_detalle_oportunidad">
                            <tr>
                                <th>Check</th>
                                <th>Folio</th>
                                <th>Cotizaci&oacute;n</th>
                                <th>Idbrm</th>
                                <th>Cuenta Factura</th>
                                <th>Estatus CSP</th>
                                <th>Estatus OS</th>
                                <th>N&uacute;m OS</th>
                                <th>Plaza Com.</th>
                                <th>Agendar</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
        
        <jsp:include page="/WEB-INF/jsp/generic/busquedaSalesforce/mainBusquedaSalesforce.jsp"></jsp:include>
       
        <div class="container" ng-show="vistaAgendamiento">
            <div class="content-fluid container-filtros-oportunidad contenedor-oportunidad">
                <div class="col-12">
                    <jsp:include page="/WEB-INF/jsp/generic/agendamiento/mainAgendamiento.jsp"></jsp:include>
                </div>
            </div>
        </div>