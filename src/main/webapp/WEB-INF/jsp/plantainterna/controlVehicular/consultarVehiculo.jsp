<div class="col-12">
    <div class="row">
        <div class="col-md-2 search-form columna-filtro-ind-rep">
            <input readonly placeholder="Geograf&iacute;a" type="text" onclick="abrirModalGeografiaBuscar()"
                class=" input-filtro form-control form-control-sm" style="border-radius: .5em !important;">
        </div>
        <div class="col-md-1 search-form">
            <button id="btnBuscar" type="button" class="btn btn-primary btnTotal" ng-click="getVehiculos()">
                <i class="fa fa-search"></i>
            </button>
        </div>
        <div class="col-md-7 search-form form-group" style="padding-left: 3em;">
            <ul class="nav nav-tabs" id="tabContadoresVehiculos" role="tablist">
                <li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('todos')">
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
        <div class="col-md-2 form-group" style="margin-bottom: 0; margin-top: 1.5em;">
            <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;"
                class="search-filtro form-control form-control-sm mt-0" id="searchText"><i
                class="fa fa-search icon-search" style="margin-top: -1.5em;"></i>
        </div>
    </div>

</div>
<div class="container-fluid contenedor">
    <div class="content-fluid">
        <table id="vehiculoTable" class="display table" cellspacing="0" width="100%">
            <thead id="thead_table">
                <tr>
                    <th>PLACA</th>
                    <th>TIPO</th>
                    <th>MARCA</th>
                    <th>MODELO</th>
                    <th>A&Ntilde;O</th>
                    <th>COLOR</th>
                    <th>COMBUSTIBLE</th>
                    <th>N&Uacute;M. SERIE</th>
                    <th>GEOGRAF&Iacute;A</th>
                    <th>FOTO PLACA</th>
                    <th>FOTO VEH&Iacute;CULO</th>
                    <th>ESTATUS</th>
                    <th>EDITAR</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>