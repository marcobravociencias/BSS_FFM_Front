
<div class="row md-form" id="">
    <div class="column-style-consulta" id="fechaInicio" style="width: 11%;">	
        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
        type="text" id="fecha_inicio_asignada" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 11%;">
        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
        type="text" id="fecha_fin_asignada" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta columna-filtro-ind" style="width: 11%;">
        <label for="estatus_asignada" class="label-filter">Estatus</label>
        <div class="dropdown">
            <input id="estatusAsignada" readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
            type="text" id="estatus_asignada" class="input-filtro-coordInst form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="estatus_asignada">      
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusAsignada);pintarNombreEstatus(filtrosGeneral.estatusAsignada,'#estatusAsignada');" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusAsignada);pintarNombreEstatus(filtrosGeneral.estatusAsignada,'#estatusAsignada');" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>     
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in filtrosGeneral.estatusAsignada" class="element-menu-filter"  class="element-menu-filter">
                    <label  class="dropdown-item form-check-inputfiltro">
                        <input id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusAsignada);pintarNombreEstatus(filtrosGeneral.estatusAsignada,'#estatusAsignada');" ng-model="filtro.checkedOpcion" ng-true-value="true" ng-false-value="false"/>
                        <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                    </label>
                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusAsignada.html'" class="dropdown-menu"></ul>
                </li>
            </ul>
         </div>
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 11%;">
        <label for="inputPlaceholderEx" class="label-filter">Geografia</label>
        <input id="txtGeografiaAsignada" style="text-align: left;" readonly placeholder="Geografia" ng-click="mostrarArbol(2)" type="text" class="input-filtro-coordInst form-control form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="ot_asignadao" class="label-filter">OT</label>
        <input type="text" ng-model="objetoAsignada.ot" ng-change="limpiarCamposAsignada(1)" id="ot_asignada" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_asignada" class="label-filter">Folio</label>
        <input type="text" ng-model="objetoAsignada.folio" ng-change="limpiarCamposAsignada(2)" id="os_asignada" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">Clave cliente</label>
        <input type="text" ng-model="objetoAsignada.claveCliente" ng-change="limpiarCamposAsignada(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
        <button id="btn-asignada-salesforce" ng-click="consultarAsignada()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
</div>
<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tableAsignada" class="table">
            <thead id="thead_asignada">
                <tr>
                    <th>OT</th>
                    <th>OS</th>
                    <th>Cuenta</th>
                    <th>Cliente</th>
                    <th>Fecha actualizaci&oacute;n</th>
                    <th>Status</th>
                    <th>Estado</th>
                    <th>Motivo</th>
                    <th>Actualizar Reg</th>
                    <th style="text-align: center;">Acciones</th>
                </tr>
            </thead>
        </table>
    </div>
</div>