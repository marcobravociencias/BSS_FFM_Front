<div class="row">
    <div class="col-4">
        <!--div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">Tipo intervenci&oacute;n</label>
            <select id="compania_select" ng-model="infoBasica.intervencion" ng-change="filtrarSubIntervencion(infoBasica.intervencion);" ng-options="intervencion.nombre for intervencion in listaIntervencion" class="form-control-sm input-filtro-disponibilidad " placeholder="Compañia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">Subintervenci&oacute;n</label>
            <select id="compania_select" ng-model="infoBasica.subIntervencion" ng-change="validarModalGeografia()" ng-options="subInter.nombre for subInter in listaSubIntervencion" class="form-control-sm input-filtro-disponibilidad " placeholder="Compa&ntilde;ia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div-->
        <div class="row input-group">
            <label for="compania_select" class="label-filter">Folio</label>
            <div class="input-group mb-1" style="padding: 0;">
                <input style="width: 90%;" type="text" id="folio" name="folio" ng-model="infoBasica.folio" class="form-control-sm input-filtro-disponibilidad-folio" placeholder="Sin folio">
                <div   style="width: 10%;" class="input-group-append btn-buscar-generica" ng-click="consultarInformacionFolio()">
                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                </div>
            </div>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label for="compania_select" class="label-filter">OS</label>
            <select id="compania_select" class="form-control-sm input-filtro-disponibilidad " placeholder="Compañia" required>
                <option value="">Seleccione ...</option>
            </select>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label class="label-filter">Canal de venta</label>
            <input type="text" id="distrito-form" ng-model="infoBasica.canalVenta" ng-click="mostrarModalCanalVentas()" readonly class=" form-control-sm   input-filtro-disponibilidad " placeholder="Selecciona canal de venta">
            <i ng-class="{'show-validate':isValForm && !infoBasica.canalVenta}" class="fas fa-info-circle icon-validate-form"></i>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label class="label-filter">Paquete</label>
            <input type="text" id="distrito-form" ng-model="infoBasica.paquete" ng-click="mostrarModalPaquete()" readonly class=" form-control-sm   input-filtro-disponibilidad " placeholder="Selecciona paquete">
            <i ng-class="{'show-validate':isValForm && !infoBasica.paquete}" class="fas fa-info-circle icon-validate-form"></i>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label class="label-filter">Geograf&iacute;a</label>
            <input type="text" id="distrito-form" ng-model="infoBasica.distrito" ng-click="mostrarModalArbol()" readonly class=" form-control-sm   input-filtro-disponibilidad " placeholder="Selecciona geograf&iacute;a">
            <i ng-class="{'show-validate':isValForm && !infoBasica.distrito}" class="fas fa-info-circle icon-validate-form-rigth"></i>
        </div>
        <div class="row input-group columna-filtro-ind">
            <label  class="label-filter">Subtipo ordenes</label>
            <input type="text" id="subtipoordenes-form" ng-model="infoBasica.tiposubtipoordentext" ng-click="mostrarModalSubtipoOrdenes()" readonly class=" form-control-sm   input-filtro-disponibilidad " placeholder="Selecciona sutipo de orden">
            <i ng-class="{'show-validate':isValForm && !infoBasica.tiposubtipoordentext}" class="fas fa-info-circle icon-validate-form-rigth"></i>
        </div>
        
        <div class="row input-group columna-filtro-ind" >
            <label  class="label-filter">Hora estimada</label>
            <input type="text" id="horaestimada-form"  readonly class="form-control-sm  input-filtro-disponibilidad" placeholder="Hora estimada">
            <i ng-class="{'show-validate':isValForm && !infoBasica.horaEstimada}" class="fas fa-info-circle icon-validate-form-rigth"></i>
        </div>
        <div class="row input-group columna-filtro-ind" >
            <label class="label-filter">Turno</label>
            <input type="text" id="turno-form" ng-model="infoBasica.turno" readonly class="form-control-sm  input-filtro-disponibilidad" placeholder="Turno">
            <i ng-class="{'show-validate':isValForm && !infoBasica.turno}" class="fas fa-info-circle icon-validate-form-rigth"></i>
        </div>
    </div>
    <div class="col-8">
        <div id="calendar_disponibilidad">
        </div>
    </div>
</div>

