<div class="container" style="width: 80%;">
    <div class="row align-items-center">
        <div class="col-12">
            <div class="form-group input-acciones-select">
                <label class="label-acciones" for="id-status-tecnico">Estatus:</label>
                <select class="input-acciones form-control-sm form-control" ng-model="estatus.id"
                    ng-options="estatus.nombre for estatus in listadoDictamen.estatus">
                    <option value="">Seleccione ...</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row align-items-center">
        <div class="col-6">
            <div class="form-group input-acciones-select">
                <label class="label-acciones" for="id-status-tecnico">Estado:</label>
                <select class="input-acciones form-control-sm form-control" ng-model="estado.id"
                    ng-options="estado.nombre for estado in listadoDictamen.estados">
                    <option value="">Seleccione ...</option>
                </select>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group input-acciones-select">
                <label class="label-acciones" for="id-status-tecnico">Coordenadas nuevo domicilio:</label>
                <select class="input-acciones form-control-sm form-control" ng-model="coordenada.id"
                    ng-options="coordenada.nombre for coordenada in  listadoDictamen.coordenadas">
                    <option value="">Seleccione ...</option>
                </select>
            </div>
        </div>

    </div>
    <div class="row align-items-center">
        <div class="col-6">
            <div class="form-group input-acciones-select">
                <label class="label-acciones" for="id-status-tecnico">Distancia:</label>
                <select class="input-acciones form-control-sm form-control" ng-model="distancia.id"
                    ng-options="distancia.nombre for distancia in  listadoDictamen.distancias">
                    <option value="">Seleccione ...</option>
                </select>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group input-acciones-select">
                <label class="label-acciones" for="id-status-tecnico">Tiempo de entrega:</label>
                <select class="input-acciones form-control-sm form-control" ng-model="tiempo.id"
                    ng-options="tiempo.nombre for tiempo in listadoDictamen.tiempos">
                    <option value="">Seleccione ...</option>
                </select>
            </div>
        </div>

    </div>
    <div class="row align-items-center">
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
</div>
<div class="content-map">
    <input id="search-input-place" class="controls" type="text" placeholder="B&uacute;scar lugar en mapa"
        style="font-size: 16px;">
    <div id="content-mapa-dictamen"></div>
</div>