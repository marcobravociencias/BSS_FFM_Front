<script type="text/ng-template" id="filtroIntervencion.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.tipoOrdenes); pintarNombreEstatus(filtrosGeneral.estatusdisponibles,'#filtro-estatus-substatus');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroIntervencion.html'" class="dropdown-menu"></ul>
    </li>
</script>
<script type="text/ng-template" id="filtroEstatus.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponibles); pintarNombreEstatus(filtrosGeneral.tipoOrdenes,'#filtro-intervencion');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatus.html'" class="dropdown-menu"></ul>
    </li>
</script>