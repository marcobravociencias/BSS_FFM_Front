<div class="col-12">
    <div class="row">
        <div class="col-md-2 search-form columna-filtro-ind-rep">
            <label class="span-consulta"><i class="fas fa-map-marked"></i> Geograf&iacute;a</label>
            <input id="geografia-seleccionada-consulta" readonly placeholder="Geograf&iacute;a" type="text"
                onclick="abrirModalGeografiaBuscar()" class=" input-filtro form-control form-control-sm"
                style="border-radius: .5em !important;">
        </div>
        <div class="col-md-1 search-form">
            <button id="btnBuscar" type="button" class="btn btn-primary btnTotal" ng-click="getVehiculos()">
                <i class="fa fa-search"></i>
            </button>
        </div>
        <div class="col-md-9 search-form form-group" style="padding-left: 3em;">
            <ul class="nav nav-tabs" id="tabContadoresVehiculos" role="tablist">
                <li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('todos')" id="todosVehiculos">
                    <label class="nav-link active etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#"
                        style="padding-right: 0;" role="tab">Todos <i class="fas fa-th-list"></i>
                        <p class="contadoresEstadosVehiculos">{{countTodos}}</p>
                    </label>
                </li>
                <li class="nav-item contenedorContadoresEstadosVehiculos"
                    ng-click="busquedaVehiculosEstado('asignado')">
                    <label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#"
                        style="padding-right: 0;" role="tab">Asignados <i class="fas fa-car"></i>
                        <p class="contadoresEstadosVehiculos">{{countAsignados}}</p>
                    </label>
                </li>
                <li class="nav-item contenedorContadoresEstadosVehiculos"
                    ng-click="busquedaVehiculosEstado('disponible')">
                    <label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#"
                        style="padding-right: 0;" role="tab">Disponibles <i class="fas fa-car-side"></i>
                        <p class="contadoresEstadosVehiculos">{{countDisponibles}}</p>
                    </label>
                </li>
                <li class="nav-item contenedorContadoresEstadosVehiculos"
                    ng-click="busquedaVehiculosEstado('no disponible')">
                    <label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#" role="tab"
                        style="padding-right: 0;">No
                        disponibles <i class="fas fa-tools"></i>
                        <p class="contadoresEstadosVehiculos">{{countNoDisponibles}}</p>
                    </label>
                </li>
                <li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('baja')">
                    <label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#"
                        style="padding-right: 0;" role="tab">Bajas
                        <i class="fas fa-times"></i>
                        <p class="contadoresEstadosVehiculos">{{countBajas}}</p>
                    </label>
                </li>
            </ul>
        </div>
    </div>

</div>
<div class="content-fluid">
    <div class="table-responsive">
        <table id="vehiculoTable" class="display table" cellspacing="0" width="100%">
            <thead id="thead_table">
                <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>A&ntilde;o</th>
                    <th>N&uacute;m. serie</th>
                    <th>Geograf&iacute;a</th>
                    <th>Foto placa</th>
                    <th>Foto veh&iacute;culo</th>
                    <th>Estatus</th>
                    <th style="text-align: center;">Editar</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>