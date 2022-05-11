<script type="text/ng-template" id="filtroFalla.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro, filtrosInspector.fallas); pintarNombreEstatus(filtrosInspector.fallas,'#txtFalla');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.descripcion"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroFalla.html'" class="dropdown-menu"></ul>
    </li>
</script>