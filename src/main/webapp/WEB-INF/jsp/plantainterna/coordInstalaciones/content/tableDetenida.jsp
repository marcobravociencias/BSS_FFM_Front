
<div class="row md-form" id="">
    <div class="column-style-consulta" id="fechaInicio" style="width: 11%;">	
        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
        type="text" id="fecha_inicio_detenida" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 11%;">
        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
        type="text" id="fecha_fin_detenida" class="datepicker input-filtro-coordInst form-control form-control-sm">
        
    </div>
    <div class="column-style-consulta columna-filtro-ind" style="width: 11%;">
        <label for="intervencion_detenida" class="label-filter">Estatus</label>
        <div class="dropdown">
            <input id="estatusDetenida" readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
            type="text" id="intervencion_detenida" class="input-filtro-coordInst form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusDetenida);pintarNombreEstatus(filtrosGeneral.estatusDetenida,'#estatusDetenida');" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusDetenida);pintarNombreEstatus(filtrosGeneral.estatusDetenida,'#estatusDetenida');" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>     
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in filtrosGeneral.estatusDetenida" class="element-menu-filter"  class="element-menu-filter">
                    <label  class="dropdown-item form-check-inputfiltro">
                        <input id="filtrotext-{{filtro.id}}" class="form-check-input" ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusDetenida);pintarNombreEstatus(filtrosGeneral.estatusDetenida,'#estatusDetenida');" type="checkbox" ng-model="filtro.checkedOpcion" ng-true-value="true" ng-false-value="false"/>
                        <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                    </label>
                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusDetenida.html'" class="dropdown-menu"></ul>
                </li>
            </ul>
         </div>
    </div>
    <div class="column-style-consulta" id="fechaFin" style="width: 11%;">
        <label for="inputPlaceholderEx" class="label-filter">Geografia</label>
        <input id="txtGeografiaDetenida" style="text-align: left;" readonly placeholder="Geografia" ng-click="mostrarArbol(3)" type="text" class="input-filtro-coordInst form-control form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="ot_detenida" class="label-filter">OT</label>
        <input type="text" ng-model="objetoDetenida.ot" ng-change="limpiarCamposDetenida(1)" id="ot_detenida" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_detenida" class="label-filter">Folio</label>
        <input type="text" ng-model="objetoDetenida.folio" ng-change="limpiarCamposDetenida(2)" id="os_detenida" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">Clave cliente</label>
        <input type="text" ng-model="objetoDetenida.claveCliente" ng-change="limpiarCamposDetenida(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
        <button id="btn-detenida-salesforce" ng-click="consultarDetenida()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
        <i class="fa fa-search" ></i>
    </button>
    </div>
</div>
<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tableDetenida" class="table">
            <thead id="thead_detenida">
                <tr>
                    <th data-idColumn="0" data-isNumber="true" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">OT</th>
                    <th data-idColumn="1" data-isNumber="false" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">OS</th>
                    <th data-idColumn="2" data-isNumber="true" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">Cuenta</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">Cliente</th>
                    <th data-idColumn="4" data-isNumber="false" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">Fecha actualizaci&oacute;n</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">Status</th>
                    <th data-idColumn="6" data-isNumber="false" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">Estado</th>
                    <th data-idColumn="7" data-isNumber="false" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">Motivo</th>
                    <th data-idColumn="8" data-isNumber="false" data-typeTable="reporteDetenida" class="orderColumnTable orderColumnAscTable">Actualizar Reg</th>
                    <th style="text-align: center;">Acciones</th>
                </tr>
            </thead>
        </table>
    </div>
</div>