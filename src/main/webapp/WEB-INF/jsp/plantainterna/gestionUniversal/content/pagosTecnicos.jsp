<div class="container-fluid" id="container_pagos_tecnicos">
    <div class="col-12">
        <div class="row">
            <div class="col-md-2 search-form columna-filtro-ind-rep">
                <label class="span-consulta"><i class="fas fa-map-marked"></i> Geograf&iacute;a</label>
                <input readonly placeholder="NO HAY SELECCI&Oacute;N" type="text" ng-click="abrirModalGeografiaBuscar()"
                    id="inputSearchGeoTecnico" class=" input-filtro form-control form-control-sm"
                    style="border-radius: .5em !important;">
            </div>
            <div class="col-md-1 search-form">
                <button id="btnBuscar" type="button" class="btn btn-primary btnTotal" ng-click="consultarTecnicosPagos()" style="margin-top: 2.2em;">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-2 offset-7 form-group">
                <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;"
                    class="search-filtro form-control form-control-sm mt-0" id="searchTextGeneral"><i
                    class="fa fa-search icon-search" style="margin-top: -1.5em;"></i>
            </div>
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
                    <th>CIUDAD ORIGEN</th>
                    <th>PAGOS</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>