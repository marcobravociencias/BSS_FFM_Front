<div class="row">
    <div class="col-4">
        <div class="row input-group">
            <label class="label-filter">Folio</label>
                <input type="text" id="folio" name="folio" ng-model="informacionClienteDetalle.folioSistema" disabled class="form-control-sm input-filtro-disponibilidad">
        </div>

        <div class="row input-group">
            <label class="label-filter">Geograf&iacute;a</label>
            <input type="text" id="geografia-form" ng-model="informacionClienteDetalle.geografiaDetalle" disabled class=" form-control-sm   input-filtro-disponibilidad " >
        </div>
        <div class="row input-group">
            <label  class="label-filter">Subtipo ordenes</label>
            <input type="text" id="subtipoordenes-form" ng-model="informacionClienteDetalle.subtipoOrdenes"  disabled class=" form-control-sm   input-filtro-disponibilidad " >
        </div>
        
        <div class="row input-group" >
            <label  class="label-filter">Hora estimada</label>
            <input type="text" id="horaestimada-form"  readonly class="form-control-sm  input-filtro-disponibilidad" ng-model="informacionClienteDetalle.horaestimada">
        </div>
        <div class="row input-group" >
            <label class="label-filter">Turno</label>
            <input type="text" id="turno-form" ng-model="informacionClienteDetalle.turno" disabled class="form-control-sm  input-filtro-disponibilidad">
        </div>
    </div>
    <div class="col-8">
        <div id="calendar_disponibilidad">
        </div>
    </div>
</div>

