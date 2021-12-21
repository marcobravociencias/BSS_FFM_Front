<div class="container-fluid" id="container_pagos_tecnicos">
    <div class="row filter-content">
        <div class="col-2 form-group columna-filtro-ind-rep">
            <input readonly placeholder="Geograf&iacute;a" type="text" ng-click="abrirModalGeografiaBuscar()"
                class="search-filtro input-filtro form-control form-control-sm" style="border-radius: .5em !important;">
        </div>
        <div class="col-1">
            <button id="btnBuscar" type="button" class="btn btn-primary btnTotal" ng-click="consultarTecnicosPagos()">
                <i class="fa fa-search"></i>
            </button>
        </div>
        <div class="col-2 offset-7 form-group">
            <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;"
                class="search-filtro form-control form-control-sm mt-0" id="searchTextGeneral"><i
                class="fa fa-search icon-search"></i>
        </div>
    </div>
    <div class="content-fluid" style="margin-top: 0.7em;">
        <table id="pagosTecnicosTable" class="display table" cellspacing="0" width="100%">
            <thead id="thead_pagos_tecnicos">
                <tr>
                    <th>FOTO</th>
                    <th>#EMPLEADO</th>
                    <th>USUARIO</th>
                    <th>NOMBRE</th>
                    <th>UBICACI&Oacute;N</th>
                    <th>FECHA ACTUALIZACI&Oacute;N</th>
                    <th>PAGOS</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>