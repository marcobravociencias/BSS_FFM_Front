<div class="row">
    <div class="offset-1 col-3">
        <h6 class="text-center titulo-opciones">PROPIETARIOS*</h6>
        <hr/>
        <div class="col-12 opcion-propietario" ng-class="propietario.id === idPropietarioSelectMod ? 'intervencion-selected' : ''" ng-repeat="propietario in listaClasificacionSesionMod" ng-click="mostrarIntervencionesMod(propietario)">
           
            <div class="row">
                <div class="col-1">
                </div>
                <div class="col-8">
                    <span ng-bind="propietario.descripcion"></span>
                </div>
                <div class="col-2 text-center">
                    <i class="fa fa-check icon-check-intervencion" ng-show="propietario.id === idPropietarioSelectMod"></i>
                </div>
            </div>
           
        </div>
    </div>
    <div class="offset-2 col-5">
        <h6 class="text-center titulo-opciones">INTERVENCIONES*</h6>
        <hr/>
        <div class="col-12 opcion-propietario intervencion-selected" ng-click="seleccionarIntervencionMod($index)" ng-repeat="intervencion in listaIntervencionesSelectMod">
           
            <div class="row">
                <div class="col-1 border-propietario-intervencion">
                </div>
                <div class="col-8">
                    <span ng-bind="intervencion.descripcion"></span>
                </div>
                <div class="col-2 text-center">
                    <i class="fa fa-check icon-check-intervencion" ng-show="intervencion.select === '1'"></i>
                </div>
            </div>
           
        </div>
    </div>
</div>