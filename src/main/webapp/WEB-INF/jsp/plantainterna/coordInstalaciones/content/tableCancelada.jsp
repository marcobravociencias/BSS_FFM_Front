
<div class="row md-form" id="">
    <div class="column-style-consulta" id="fechaInicio" style="width: 11%;">	
        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
        type="text" id="fecha_inicio_cancelada" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 11%;">
        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
        type="text" id="fecha_fin_cancelada" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta columna-filtro-ind" style="width: 11%;">
        <label for="intervencion_cancelada" class="label-filter">Estatus</label>
        <div class="dropdown">
            <input id="estatusCancelada" readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
            type="text" id="intervencion_cancelada" class="input-filtro-coordInst form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusCancelada);pintarNombreEstatus(filtrosGeneral.estatusCancelada,'#estatusCancelada');" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusCancelada);pintarNombreEstatus(filtrosGeneral.estatusCancelada,'#estatusCancelada');" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>     
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in filtrosGeneral.estatusCancelada" class="element-menu-filter"  class="element-menu-filter">
                    <label  class="dropdown-item form-check-inputfiltro">
                        <input id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusCancelada);pintarNombreEstatus(filtrosGeneral.estatusCancelada,'#estatusCancelada');" ng-model="filtro.checkedOpcion" ng-true-value="true" ng-false-value="false"/>
                        <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                    </label>
                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusCancelada.html'" class="dropdown-menu"></ul>
                </li>
            </ul>
         </div>
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 11%;">
        <label for="inputPlaceholderEx" class="label-filter">Geografia</label>
        <input id="txtGeografiaCancelada" style="text-align: left;" readonly placeholder="Geografia" ng-click="mostrarArbol(5)" type="text" class="input-filtro-coordInst form-control form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="ot_cancelada" class="label-filter">OT</label>
        <input type="text" ng-model="objetoCancelada.ot" ng-change="limpiarCamposCancelada(1)" id="ot_cancelada" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_cancelada" class="label-filter">Folio</label>
        <input type="text" ng-model="objetoCancelada.folio" ng-change="limpiarCamposCancelada(2)" id="os_cancelada" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">Clave cliente</label>
        <input type="text" ng-model="objetoCancelada.claveCliente" ng-change="limpiarCamposCancelada(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
        <button id="btn-cancelada-salesforce" ng-click="consultarCancelada()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
        <i class="fa fa-search" ></i>
    </button>
    </div>
</div>
<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tableCancelada" class="table">
            <thead id="thead_cancelada">
                <tr>
                    <th data-idColumn="0" data-isNumber="true" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">OT</th>
                    <th data-idColumn="1" data-isNumber="false" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">OS</th>
                    <th data-idColumn="2" data-isNumber="true" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">Cuenta</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">Cliente</th>
                    <th data-idColumn="4" data-isNumber="false" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">Fecha actualizaci&oacute;n</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">Status</th>
                    <th data-idColumn="6" data-isNumber="false" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">Estado</th>
                    <th data-idColumn="7" data-isNumber="false" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">Motivo</th>
                    <th data-idColumn="8" data-isNumber="false" data-typeTable="reporteCancelada" class="orderColumnTable orderColumnAscTable">Actualizar Reg</th>
                    <th style="text-align: center;">Acciones</th>
                </tr>
            </thead>
        </table>
    </div>
</div>