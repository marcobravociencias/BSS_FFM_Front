<div  class="container-fluid container-filtros-consultaot" style="padding-left: 0px; margin-left: 0px;">
    <div style="padding-left: 0;padding-right: 0;" class="content-fluid">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-1 column-style-consulta borderFilterR borderAlignR" style="width: 95px !important;" id="borderAlign">
                <input type="text" placeholder="OT" id="idotO"
                class="form-control input-filtro-consultaOT form-control-sm">
            </div>
            <div class="col-md-1 column-style-consulta borderFilterR" style="width: 95px !important;">
                <input type="text" placeholder="OS" id="idosO"
                class="form-control input-filtro-consultaOT form-control-sm" >
            </div>
            <div class="col-md-1 column-style-consulta borderFilterR" style="width: 95px !important;">
                <input type="text" placeholder="CUENTA" id="cuentaO"
                class="form-control input-filtro-consultaOT form-control-sm">
            </div>
            <div class="col-md-1 column-style-consulta borderFilterR" style="width: 95px !important;">
                <input type="text" placeholder="VENTA" id="ventaO"
                class="form-control input-filtro-consultaOT form-control-sm">
            </div>
            <div class="col-lg-2 column-style-consulta columna-filtro-indRR borderFilterR" style="width: 150px !important;">
                <div class="dropdown">
                    <input readonly data-toggle="dropdown" aria-expanded="false" placeholder="Intervenci&oacute;n" type="text" id="filtro-intervencionO" class="input-filtro-consultaOT form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodos(filtrosGeneral.tipoOrdenes)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodos(filtrosGeneral.tipoOrdenes)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>     
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"  class="element-menu-filter">
                            <label  class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                            </label>
                             <ul  class="dropdown-menu">                     
                                <li  ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                    <label  class="dropdown-item form-check-inputfiltro">
                                        <input ng-click=setCheckSubFiltroGeneric(subfiltro,filtro) id="subfiltrotext-{{subfiltro.id}}" class="form-check-input" type="checkbox" ng-model="subfiltro.checkedOpcion" ng-checked="subfiltro.checkedOpcion"    />
                                        <span  for="subfiltrotext-{{subfiltro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltro.nombre"></span>
                                    </label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                 </div>
            </div>
                <div class="col-lg-2 column-style-consulta columna-filtro-indRR borderFilterR" style="width: 150px !important;">
                    <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="clusterO"
                    class="input-filtro-consultaOT form-control form-control-sm" ng-click="abrirModalGeografiaRep()"/>
                </div>
                <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 150px !important;">
                    <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_consultaOtO"
                    class="datepicker input-filtro-consultaOT form-control form-control-sm" />
                </div>
                <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 150px !important;">
                    <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_consultaOtO"
                    class="datepicker input-filtro-consultaOT form-control form-control-sm"/>
                </div>
                <div class="col-1 div-btn-busqueda borderFilterR" style="width: 35px;">
                    <button id="btn_consultar_ordenes" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light"
                    style="margin-top: 0; margin: 0 !important;" ng-click="consultarReporteOrdenes()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            
        </div>
    </div>
</div>
<div class="container-fluid contenedor-consultaOT" style="margin-left: 0px;">
    <div class="content-fluid">
        <table id="reporteOrdenesTable" class="display table table-hover" cellspacing="0" width="100%">
            <thead id="thead_reporteOrdenes">
                <tr>
                    <th>OT</th>
                    <!-- <th>OS</th> -->
                    <th>CLIENTE</th>
                    <th>CUENTA</th>
                    <!-- <th>TICKET</th> -->
                    <th>CIUDAD</th>
                    <!-- <th>DISTRITO</th>
                    <th>CREACION</th> -->
                    <th>FECHA AGENDA</th>
                    <!-- <th>TURNO</th> -->
                    <th>MOTIVO</th>
                    <!-- <th>OPERARIO</th> -->
                    <th>STATUS</th>
                    <th>ESTADO</th>
                    <!-- <th>USUARIO CREA</th> -->
                    <!-- <th><i class="fa fa-wrench" id="herramienta"></i></th>
                    <th><i class="fa fa-picture-o" id="muestra_IMG"></i></th> 
                    <th><i class="fa fa-bars" id="modalDetalleOT"></i></th>-->
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>

