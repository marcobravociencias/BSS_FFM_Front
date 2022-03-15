<div class="col-12">
    <div class="row">
        <div class="col-md-2 search-form columna-filtro-ind-rep">
            <label class="span-consulta"><i class="fas fa-map-marked"></i> Geograf&iacute;a<i ng-if="!geografiaList.length" class="icono-noseleccion fas fa-exclamation-circle ml-2" title="No se encontr&oacute;o el catalogo de geograf&iacute;a"></i></label>
            <input id="geografia-seleccionada-inactivos" readonly placeholder="NO HAY SELECCI&Oacute;N" type="text"
                onclick="abrirModalGeografiaInactivos()" class=" input-filtro form-control form-control-sm"
                style="border-radius: .5em !important;">
        </div>
        <div class="col-md-1 search-form">
            <button id="btnBuscar" type="button" class="btn btn-primary btnTotal" ng-click="getVehiculosInactivos(true)">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </div>
</div>
<div class="content-fluid">
    <div class="table-responsive">
        <table id="vehiculoActivaTable" class="display table" cellspacing="0" width="100%">
            <thead id="thead_table">
                <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>A&ntilde;o</th>
                    <th>Geograf&iacute;a</th>
                    <th>Foto placa</th>
                    <th>Foto veh&iacute;culo</th>
                    <th>Estatus</th>
                    <th style="text-align: center;">Activar</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>