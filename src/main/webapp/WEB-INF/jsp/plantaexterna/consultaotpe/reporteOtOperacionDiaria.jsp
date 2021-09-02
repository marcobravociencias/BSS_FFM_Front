<div  class="container-fluid container-filtros-consultaot" style="padding-left: 0px;">
    <div style="padding-left: 0;padding-right: 0;" class="content-fluid">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 150px !important;">
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_consultaOtO"
                class="datepicker input-filtro-consultaOT form-control form-control-sm" />
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 150px !important;">
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_consultaOtO"
                class="datepicker input-filtro-consultaOT form-control form-control-sm"/>
            </div>
            <div class="col-md-2 column-style-consulta borderFilterR borderAlignR" style="width: 150px !important;" id="borderAlign">
                <input type="text" placeholder="OT" id="idotO"
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
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 35px;">
                <button id="btn_consultar_ordenes" type="button"
                class="btn btn-sm  btn-primary  waves-effect waves-light"
                style="margin-top: 0; margin-left: 20 !important;" ng-click="consultarReporteDiario()">
                <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
</div>

<div align="right" style="margin-top: 10px;" class="col-10 offset-2 info_color" id="colores_estados_insp">
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-header" style="color: #4cb4f4" aria-hidden="true"></i><small> Hist&oacute;rico de OT</small></div>
    
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-picture-o" style="color: #f79050" aria-hidden="true"></i><small> Im&aacute;genes de Ubicaci&oacute;n</small></div>
        
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-server" style="color: #21bae7 " aria-hidden="true"></i><small> Conceptos</small></div>
        
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-wrench" style="color: #66ca8e" aria-hidden="true"></i><small> Materiales</small></div>
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa fa-times " style="color: #E8488E" aria-hidden="true"></i><small> Evidencias fallas </small></div>
    
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa fa-commenting" style="color: #a616e0" aria-hidden="true"></i><small> Comentarios </small></div>
        
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa fa-bars " style="color: #ff1f33" aria-hidden="true"></i><small> Informacion OT </small></div>
</div>

<div class="container-fluid contenedor-consultaOT">
    <div class="content-fluid">
        <table id="reporteDiarioTable" class="display table table-hover" cellspacing="0" width="100%">
            <thead id="thead_reporteDiario">
                <tr>
                    <th>OT</th>
                    <th>Nombre</th>
                    <th>Intervenci&oacute;n</th>
                    <th>Sub Intervenci&oacute;n</th>
                    <th>Status</th>
                    <th>Estado</th>
                    <th>Motivo</th>
                    <th>Fecha Agenda</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th><i class="fa fa-header"></i></th>
                    <th><i class="fa fa-picture-o"></i></th>
                    <th><i class="fa fa-server"></i></th>
                    <th><i class="fa fa-wrench"></i></th>
                    <th><i class="fa fa-times"></i></th>
                    <th><i class="fa fa-commenting"></i></th>
                    <th><i class="fa fa-bars"></i></th>
                </tr>
            </thead>
            <tbody id="tbody_reporteDiario"></tbody>
        </table>
    </div>
</div>