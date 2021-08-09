<div class="row">
    <div class="col-4">
        <div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">Tipo intervenci&oacute;n</label>
            <select id="compania_select" ng-model="infoBasica.intervencion" ng-change="filtrarSubIntervencion(infoBasica.intervencion)" ng-options="intervencion.Descripcion for intervencion in listaIntervencion" class="form-control-sm input-filtro-disponibilidad form-control" placeholder="Compañia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">Subintervenci&oacute;n</label>
            <select id="compania_select" ng-model="infoBasica.subIntervencion" ng-options="subInter.Descripcion for subInter in listaSubIntervencion" class="form-control-sm input-filtro-disponibilidad form-control" placeholder="Compañia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div>
        <div class="row input-group">
            <label for="compania_select" class="label-filter">Folio</label>
            <div class="input-group mb-3" style="padding: 0;">
                <input type="text" ng-model="infoBasica.folio" class="form-control" placeholder="Sin folio">
                <div class="input-group-append" ng-click="consultarInformacionFolio()">
                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                </div>
            </div>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">OS</label>
            <select id="compania_select" class="form-control-sm input-filtro-disponibilidad form-control" placeholder="Compañia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">Canal de venta</label>
            <select id="compania_select" ng-model="infoBasica.canalVenta" ng-options="canal.Canal_Venta for canal in listaCanalVenta" class="form-control-sm input-filtro-disponibilidad form-control" placeholder="Compañia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">Paquete</label>
            <select id="compania_select" ng-model="infoBasica.paquete" ng-options="paquete.Nombre_Paquete for paquete in listaPaquete" class="form-control-sm input-filtro-disponibilidad form-control" placeholder="Compañia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div>
        <div class="row input-group">
            <label for="compania_select" class="label-filter">Distrito</label>
            <input type="text" ng-model="infoBasica.folio" ng-click="mostrarModalArbol()" readonly class="form-control" placeholder="Sin folio">
        </div>
        <div class="row input-group" >
            <label for="compania_select" class="label-filter">Turno</label>
            <span ng-bind="infoBasica.turno"></span>
        </div>
    </div>
    <div class="col-8">
        <div id="calendar_disponibilidad">
        </div>
    </div>
</div>