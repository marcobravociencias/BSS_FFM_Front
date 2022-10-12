
<div class="row md-form" id="">
    
    <!--div class="column-style-consulta columna-filtro-ind" style="width: 11%;">
        <label for="estatus_asignada" class="label-filter">Vertical</label>
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
        <label for="ot_asignadao" class="label-filter">Celula</label>
        <input type="text" ng-model="objetoCelula.dCelula" ng-change="limpiarCamposAsignada(0)" id="dCelula" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div-->
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Vertical</label>
        <input list="pVerticales" type="text" id="iVertical" placeholder="Vertical"
            class="form-control input-filtro-coordInst form-control-sm">
        <datalist id="pVerticales">
            <option value="Carriers">
            <option value="Gobierno Federal">
                   <option value="Estatre&aacute;gicas I">
            <option value="Estatre&aacute;gicas II">
            <option value="Estatre&aacute;gicas III">
            <option value="Estatre&aacute;gicas IV">
        </datalist>
    </div>
    <div class="column-style-consulta" style="width: 11%;">
               <label for="ot_asignadao" class="label-filter">Celula</label>
               <input list="pCelulas"  ng-model="objetoCelula.dCelula" ng-change="limpiarCamposAsignada(0)" id="dCelula"  placeholder="Celula" class="form-control input-filtro-coordInst form-control-sm">
               <datalist id="pCelulas">
                   <option value="Carriers">
                   <option value="Gobierno Federal">
                   <option value="Gobierno Federal">
                   <option value="Finanaciero">
                   <option value="Educacio&aacute;n">
                   <option value="Retail y Hospitalidad">
                   <option value="Noreste">
                   <option value="Noroeste">
                   <option value="Occidente">
                   <option value="Toluca">
                   <option value="CDMX">
                   <option value="Bajio">
               </datalist>
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="ot_asignadao" class="label-filter">EIM</label>
        <input type="text" ng-model="objetoCelula.otdEim" ng-change="limpiarCamposAsignada(1)" id="dEim" placeholder="Ej: Nombre EIM"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_asignada" class="label-filter">Cliente</label>
        <input type="text" ng-model="objetoCelula.dCliente" ng-change="limpiarCamposAsignada(2)" id="dCliente" placeholder="Ej: Audi"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">Tipo de Sitio</label>
        <input type="text" ng-model="objetoCelula.dTipoSitio" ng-change="limpiarCamposAsignada(3)" id="dTipoSitio" placeholder="Ej: Tipo de Sitio"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
     <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">CSP</label>
        <input type="text" ng-model="objetoCelula.dCsp" ng-change="limpiarCamposAsignada(4)" id="dCsp" placeholder="Ej: CSP#######"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
     <div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">COT</label>
        <input type="text" ng-model="objetoCelula.dCot" ng-change="limpiarCamposAsignada(5)" id="dCot" placeholder="COT#######"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
        <button id="btn-asignada-salesforce" ng-click="consultarDependencia()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
</div>
<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tableDependencia" class="table">
            <thead id="thead_dependencia">
                <tr>
                    
                    <th class="detail">
                            <div class="fht-cell" style="width: 20px;"></div>
                    </th>
                    <th>Folio</th>
                    <th>Cotizaci&oacute;n</th>
                    <th>Idbrm</th>
                    <th>Cuenta Factura</th>
                    <th>Tipo de Cuadrilla</th>
                    <th>Tipo de Dependencia</th>
                    <th>N&uacute;m OS</th>
                  
                </tr>
            </thead>
        </table>
    </div>
</div>