
<div class="row md-form" id="">
    
    <div class="column-style-consulta columna-filtro-ind" style="width: 11%;">
        <label for="estatus_asignada" class="label-filter">Vertical / Celula</label>
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
  
    <div class="column-style-consulta" style="width: 11%;">
        <label for="ot_asignadao" class="label-filter">EIM</label>
        <input type="text" ng-model="objetoAsignada.ot" ng-change="limpiarCamposAsignada(1)" id="ot_asignada" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_asignada" class="label-filter">Cliente</label>
        <input type="text" ng-model="objetoAsignada.folio" ng-change="limpiarCamposAsignada(2)" id="os_asignada" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">Tipo de Sitio</label>
        <input type="text" ng-model="objetoAsignada.claveCliente" ng-change="limpiarCamposAsignada(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
     <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">COT / CSP</label>
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
        <table id="tablePendientesPorImplementar" class="table">
            <thead id="thead_PendientesPorImplementar">
                <tr>
                    <th></th>
                    <th data-idColumn="0" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Vertical</th>
                    <th data-idColumn="1" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Celula</th>
                    <th data-idColumn="2" data-isNumber="true" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">EIM</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Cliente</th>
                    <th data-idColumn="4" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">COT</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">CSP</th>
                    <th data-idColumn="6" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">OT</th>
                    <th data-idColumn="7" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Cuenta</th>
                    <th data-idColumn="8" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Fecha Venta</th>
                    <th data-idColumn="9" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Tipo de Venta</th>
                    <th data-idColumn="10" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Tipo de Servicio</th>
                    <th data-idColumn="11" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Monto</th>
                    <th data-idColumn="12" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Estatus</th>
                    <th data-idColumn="13" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Fecha Compromiso</th>
                    <th data-idColumn="14" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Cuadrilla</th>
                    <th data-idColumn="15" data-isNumber="false" data-typeTable="reporteAsignada" class="orderColumnTable orderColumnAscTable">Tipo de sitio</th>
                    
                </tr>
            </thead>
        </table>
    </div>
</div>