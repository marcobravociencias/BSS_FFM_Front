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
                <button id="btnBuscar" type="button" class="btn btn-primary btnTotal"
                    ng-click="consultarTecnicosPagos()" style="margin-top: 2.3em;">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="content-fluid">
        <div class="table-responsive">
            <table id="pagosTecnicosTable" class="display table" cellspacing="0" width="100%">
                <thead id="thead_table">
                    <tr>
                        <th>Foto</th>
                        <th>N&uacute;m. empleado</th>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Ciudad origen</th>
                        <th>Liberar pagos</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>