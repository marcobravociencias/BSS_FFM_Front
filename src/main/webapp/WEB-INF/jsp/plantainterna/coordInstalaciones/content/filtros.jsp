<script type="text/ng-template" id="filtroEstatusPendiente.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusPendiente);pintarNombreEstatus(filtrosGeneral.estatusPendiente,'#estatusPendiente');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusPendiente.html'" class="dropdown-menu"></ul>
    </li>
</script>
<script type="text/ng-template" id="filtroEstatusAsignada.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusAsignada);pintarNombreEstatus(filtrosGeneral.estatusAsignada,'#estatusAsignada');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusAsignada.html'" class="dropdown-menu"></ul>
    </li>
</script>
<script type="text/ng-template" id="filtroEstatusDetenida.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusDetenida);pintarNombreEstatus(filtrosGeneral.estatusDetenida,'#estatusDetenida');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusDetenida.html'" class="dropdown-menu"></ul>
    </li>
</script>
<script type="text/ng-template" id="filtroEstatusTerminada.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusTerminada);pintarNombreEstatus(filtrosGeneral.estatusTerminada,'#estatusTerminada');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusTerminada.html'" class="dropdown-menu"></ul>
    </li>
</script>
<script type="text/ng-template" id="filtroEstatusCancelada.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusCancelada);pintarNombreEstatus(filtrosGeneral.estatusCancelada,'#estatusCancelada');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusCancelada.html'" class="dropdown-menu"></ul>
    </li>
</script>
<script type="text/ng-template" id="filtroEstatusCalendarizada.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusCalendarizada);pintarNombreEstatus(filtrosGeneral.estatusCalendarizada,'#estatusCalendarizada');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusCalendarizada.html'" class="dropdown-menu"></ul>
    </li>
</script>
<script type="text/ng-template" id="filtroEstatusGestoria.html">
    <li ng-repeat="filtro in filtro.children " class="element-menu-filter"  class="element-menu-filter">
        <label  class="dropdown-item form-check-inputfiltro">
            <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusGestoria);pintarNombreEstatus(filtrosGeneral.estatusGestoria,'#estatusGestoria');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
            <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
        </label>
        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatusGestoria.html'" class="dropdown-menu"></ul>
    </li>
</script>