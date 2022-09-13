<div class="content-dictamen">
    <div class="row col-12">
        <div class="col-5">
            <div class="align-items-center">
                <div class="col-12">
                    <div class="form-group input-acciones-select">
                        <label class="label-acciones" for="id-status-tecnico">Estatus:</label>
                        <select class="input-acciones form-control-sm form-control" ng-model="objectDictamen.estatus"
                            ng-options="estatus.descripcion for estatus in listadoDictamen.estatus">
                            <option value="" disabled>Seleccione ...</option>
                        </select>
                    </div>
                </div>
                <div class="col-12"
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
            <div class="align-items-center"
                ng-if="objectDictamen.estatus && (objectDictamen.estatus.descripcion == 'Terminada' || objectDictamen.estatus.descripcion == 'Pendiente')">
                <div class="col-12">
                    <div class="form-group input-acciones-select">
                        <label class="label-acciones" for="id-status-tecnico">Distancia:</label>
                        <select class="input-acciones form-control-sm form-control" ng-model="objectDictamen.distancia"
                            ng-options="distancia.descripcion for distancia in  listadoDictamen.distancias">
                            <option value="" disabled>Seleccione ...</option>
                        </select>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group input-acciones-select">
                        <label class="label-acciones" for="id-status-tecnico">Tiempo de entrega:</label>
                        <select class="input-acciones form-control-sm form-control" ng-model="objectDictamen.tiempo"
                            ng-options="tiempo.descripcion for tiempo in listadoDictamen.tiempos">
                            <option value="" disabled>Seleccione ...</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="align-items-center">
                <div class="col-12">
                    <div class="form-group">
                        <label class="label-acciones">Comentario:</label>
                        <textarea class="input-acciones form-control-sm form-control" style=" resize: none"
                            ng-model="objectDictamen.comentario"
                            placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="2"></textarea>
                    </div>
                </div>
            </div>
            <div class="col-12" style="text-align: right;"
                ng-if="accionesUserConfigText.indexOf('accionActualizaDictamenOt') !== -1">
                <button ng-click="guardarDictamen()" class="btn btn-modalAcciones btn-primary">Guardar</button>
            </div>
            <div ng-if="accionesUserConfigText.indexOf('accionActualizaDictamenOt') === -1"
                class="text-accion-nopermiso">
                <i class="icon-not-permiso fas fa-user-lock"></i>
                <b class="text-not-permiso">No tienes permiso para actualizar el dictamen</b>
            </div>
        </div>
        <div class="content-map col-7"
            ng-show="objectDictamen.estatus && (objectDictamen.estatus.descripcion == 'Terminada' || objectDictamen.estatus.descripcion == 'Pendiente')">
            <input id="search-input-place" class="controls" type="text" placeholder="B&uacute;scar lugar en mapa"
                style="font-size: 16px;">
            <div class="row align-items-center"
                ng-if="objectDictamen.estatus && (objectDictamen.estatus.descripcion == 'Terminada' || objectDictamen.estatus.descripcion == 'Pendiente')">
                <div class="col-6">
                    <label class="label-dictamen" style="font-weight: bold;">Latitud:</label>
                    <span class="label-dictamen"
                        ng-bind="objectDictamen.latitud ? objectDictamen.latitud : 'Seleccione en mapa'"></span>
                </div>
                <div class="col-6">
                    <label class="label-dictamen" style="font-weight: bold;">Longitud:</label>
                    <span class="label-dictamen"
                        ng-bind="objectDictamen.longitud ? objectDictamen.longitud : 'Seleccione en mapa'"></span>
                </div>

            </div>
            <div id="content-mapa-dictamen"></div>
        </div>
    </div>


</div>