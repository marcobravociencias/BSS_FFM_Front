<div class="container content-dictamen" style="width: 80%;">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-6">
                <div class="form-group input-acciones-select">
                    <label class="label-acciones" for="id-status-tecnico">Estatus:</label>
                    <select class="input-acciones form-control-sm form-control" ng-model="objectDictamen.estatus"
                        ng-options="estatus.descripcion for estatus in listadoDictamen.estatus">
                        <option value="" disabled>Seleccione ...</option>
                    </select>
                </div>
            </div>
            <div class="col-6"
                ng-if="objectDictamen.estatus && (objectDictamen.estatus.descripcion == 'Terminada' || objectDictamen.estatus.descripcion == 'Pendiente')">
                <div class="form-group input-acciones-select">
                    <label class="label-acciones" for="id-status-tecnico">Estado:</label>
                    <select class="input-acciones form-control-sm form-control" ng-model="objectDictamen.estado"
                        ng-options="estado.descripcion for estado in listadoDictamen.estados">
                        <option value="" disabled>Seleccione ...</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row align-items-center"
            ng-if="objectDictamen.estatus && (objectDictamen.estatus.descripcion == 'Terminada' || objectDictamen.estatus.descripcion == 'Pendiente')">
            <div class="col-6">
                <div class="form-group input-acciones-select">
                    <label class="label-acciones" for="id-status-tecnico">Distancia:</label>
                    <select class="input-acciones form-control-sm form-control" ng-model="objectDictamen.distancia"
                        ng-options="distancia.descripcion for distancia in  listadoDictamen.distancias">
                        <option value="" disabled>Seleccione ...</option>
                    </select>
                </div>
            </div>
            <div class="col-6">
                <div class="form-group input-acciones-select">
                    <label class="label-acciones" for="id-status-tecnico">Tiempo de entrega:</label>
                    <select class="input-acciones form-control-sm form-control" ng-model="objectDictamen.tiempo"
                        ng-options="tiempo.descripcion for tiempo in listadoDictamen.tiempos">
                        <option value="" disabled>Seleccione ...</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row align-items-center"
            ng-if="objectDictamen.estatus && (objectDictamen.estatus.descripcion == 'Terminada' || objectDictamen.estatus.descripcion == 'Pendiente')">
            <div class="col-6">
                <div class="form-group">
                    <label class="label-acciones">Latitud:</label>
                    <input class="input-acciones form-control-sm form-control" placeholder="Selecciona en mapa"
                        ng-model="objectDictamen.latitud" readonly title="Selecciona en mapa">
                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label class="label-acciones">Longitud:</label>
                    <input class="input-acciones form-control-sm form-control" placeholder="Selecciona en mapa"
                        ng-model="objectDictamen.longitud" readonly title="Selecciona en mapa">
                </div>
            </div>

        </div>
        <div class="row align-items-center">
            <div class="col-12">
                <div class="form-group">
                    <label class="label-acciones">Comentario:</label>
                    <textarea class="input-acciones form-control-sm form-control" style=" resize: none"
                        ng-model="objectDictamen.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                        rows="2"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="content-map"
        ng-show="objectDictamen.estatus && (objectDictamen.estatus.descripcion == 'Terminada' || objectDictamen.estatus.descripcion == 'Pendiente')">
        <input id="search-input-place" class="controls" type="text" placeholder="B&uacute;scar lugar en mapa"
            style="font-size: 16px;">
        <div id="content-mapa-dictamen"></div>
    </div>
    <div class="col-12" style="text-align: right;" ng-if="accionesUserConfigText.indexOf('accionActualizaDictamenOt') !== -1" >
        <button ng-click="guardarDictamen()" class="btn btn-modalAcciones btn-primary">Guardar</button>
    </div>
    <div ng-if="accionesUserConfigText.indexOf('accionActualizaDictamenOt') === -1" class="text-accion-nopermiso">
        <i class="icon-not-permiso fas fa-user-lock"></i>
        <b class="text-not-permiso">No tienes permiso para actualizar el dictamen</b>
    </div>
</div>