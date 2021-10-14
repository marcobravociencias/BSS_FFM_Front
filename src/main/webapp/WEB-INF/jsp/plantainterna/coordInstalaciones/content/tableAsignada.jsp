
<div class="row md-form" id="">
    <div class="column-style-consulta" id="fechaInicio" style="width: 10%;">	
        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
        type="text" id="fecha_inicio_asignada" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 10%;">
        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
        type="text" id="fecha_fin_asignada" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta columna-filtro-ind" style="width: 10%;">
        <label for="intervencion_asignada" class="label-filter">Estatus</label>
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
            type="text" id="intervencion_asignada" class="input-filtro-coordInst form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodos(listaEstatusAsignada)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodos(listaEstatusAsignada)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>     
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in listaEstatusAsignada" class="element-menu-filter"  class="element-menu-filter">
                    <label  class="dropdown-item form-check-inputfiltro">
                        <input id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.check" ng-true-value="true" ng-false-value="false"/>
                        <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                    </label>
                </li>
            </ul>
         </div>
    </div>
    <div class="column-style-consulta columna-filtro-ind" style="width: 10%;">
        <label for="selectMotivoCalendarizado" class="label-filter">Estado</label>
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" 
            placeholder="Seleccione..." type="text" id="selectMotivoCalendarizado" class="input-filtro-coordInst form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">      
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodos(listaEstadoAsignada)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodos(listaEstadoAsignada)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>     
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtroE in listaEstadoAsignada" class="element-menu-filter"  class="element-menu-filter">
                    <label  class="dropdown-item form-check-inputfiltro">
                        <input id="filtrotext-{{filtroE.id}}" class="form-check-input" type="checkbox" ng-model="filtroE.check" ng-true-value="true" ng-false-value="false"/>
                        <span  for="filtrotext-{{filtroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtroE.nombre"></span>
                    </label>
                </li>
            </ul>
         </div>
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 10%;">
        <label for="inputPlaceholderEx" class="label-filter">Geografia</label>
        <input style="text-align: left;" readonly placeholder="Geografia" ng-click="mostrarArbol(2)" type="text" class="input-filtro-coordInst form-control form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 10%;">
        <label for="ot_asignadao" class="label-filter">OT</label>
        <input type="text" id="ot_asignada" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 10%;">
        <label for="os_asignada" class="label-filter">Folio</label>
        <input type="text" id="os_asignada" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
        <button id="btn-asignada-salesforce"  
        ng-click="consultarAsignada()" 
        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
        <i class="fa fa-search" ></i></button>
    </div>
    <div class="col-12 table-responsive" style="margin-top: 1em;">
        <table id="tableAsignada" class="display table table-hover " cellspacing="0" width="100%">
            <thead id="thead_asignada">
                <tr>
                    <th>OT</th>
                    <th>OS</th>
                    <th>Cuenta</th>
                    <th>Cliente</th>
                    <th>Fecha actualizaci&oacute;n</th>
                    <th>Status</th>
                    <th>Estado</th>
                    <th>Descripci&oacute;n</th>
                    <th>Actualizar Reg</th>
                    <th>Paquete</th>
                    <th>Acciones</th>
                    <th><i class="fa fa-bars" id="modalDetalleOT"></i></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>