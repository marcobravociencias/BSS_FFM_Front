<div class="row">
    <div class="col-2 offset-1 icons-filter disponible" onclick="filterByStatus(1)">
        <i class="fas fa-car-side"></i>
        <span class="disponible" ng-bind="countDisponibles"></span><span class="disponible">&nbsp;Disponibles</span>
    </div>
    <div class="col-2 icons-filter asignado" onclick="filterByStatus(2)">
        <i class="fas fa-car"></i>
        <span class="asignadoStyle" ng-bind="countAsignados"></span><span class="asignadoStyle">&nbsp;Asignados</span>
    </div>
    <div class="col-2 icons-filter noDisponible" onclick="filterByStatus(3)">
        <i class="fas fa-wrench"></i>
        <span class="servicioStyle" ng-bind="countNoDisponibles"></span><span class="servicioStyle">&nbsp;No Disponibles</span>
    </div>
    <div class="col-2 search-form">
        <input placeholder="Buscar" type="text" autocomplete="off" class="search-filtro form-control form-control-sm"
            id="searchText">
    </div>
    <div class="col-2 search-form">
        <input readonly placeholder="Geograf&iacute;a" type="text" onclick="abrirModalGeografiaBuscar()"
            class="search-filtro form-control form-control-sm">
    </div>
    <div class="col-1">
        <button id="btnBuscar" type="button" class="btn btn-primary btnTotal" ng-click="getVehiculos()">
            <i class="fa fa-search"></i>
        </button>
    </div>
</div>
<div class="container-fluid contenedor">
    <div class="content-fluid">
        <table id="vehiculoTable" class="display table table-hover table-striped" cellspacing="0" width="100%">
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