<div class="row">
    <div class="col-4">
        <div class="row input-group">
            <label class="label-filter">Folio</label>
                <input type="text" id="folio" name="folio" ng-model="infoBasica.folio" disabled class="form-control-sm input-filtro-disponibilidad">
        </div>
        <div class="row input-group">
            <label class="label-filter">OS</label>
            <input type="text" id="os-form" ng-model="infoBasica.os" disabled class=" form-control-sm   input-filtro-disponibilidad " >

        </div>
        <div class="row input-group">
            <label class="label-filter">Canal de venta</label>
            <input type="text" id="canal-form" ng-model="infoBasica.canalVenta" disabled class=" form-control-sm   input-filtro-disponibilidad ">
        </div>
        <div class="row input-group">
            <label class="label-filter">Paquete</label>
            <input type="text" id="paquete-form" ng-model="infoBasica.paquete" disabled class=" form-control-sm   input-filtro-disponibilidad " >
        </div>
        <div class="row input-group">
            <label class="label-filter">Geograf&iacute;a</label>
            <input type="text" id="geografia-form" ng-model="infoBasica.distrito" disabled class=" form-control-sm   input-filtro-disponibilidad " >
        </div>
        <div class="row input-group">
            <label  class="label-filter">Subtipo ordenes</label>
            <input type="text" id="subtipoordenes-form" ng-model="infoBasica.tiposubtipoordentext"  disabled class=" form-control-sm   input-filtro-disponibilidad " >
        </div>
        
        <div class="row input-group" >
            <label  class="label-filter">Hora estimada</label>
            <input type="text" id="horaestimada-form"  disabled class="form-control-sm  input-filtro-disponibilidad">
        </div>
        <div class="row input-group" >
            <label class="label-filter">Turno</label>
            <input type="text" id="turno-form" ng-model="infoBasica.turno" disabled class="form-control-sm  input-filtro-disponibilidad">
        </div>
    </div>
    <div class="col-8">
        <div id="calendar_disponibilidad">
        </div>
    </div>
</div>

