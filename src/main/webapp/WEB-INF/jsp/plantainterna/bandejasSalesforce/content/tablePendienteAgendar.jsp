<div class="content-fluid">
    <div class="row md-form" id="">
        <div class="col-2 columna-filtro-ind" id="fechaPendientesAgendar" style="width: 110px; padding-right: 0px !important;">
            <label for="inputPlaceholderEx" class="label-filter">Fecha</label>
            <input style="text-align: left;" readonly placeholder="Fecha" type="text" id="fecha_pendientes_agendar" class="datepicker input-filtro-bandejaSF form-control form-control-sm">
        </div>
        <div class="col-2 column-style-bandejaSF columna-filtro-ind" id="">
            <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i>
            <label for="inputPlaceholderEx" class="label-filter">Geograf&iacute;a</label>
            <input style="text-align: left;" readonly placeholder="Seleccione..." id="txtGeografiasConsultaAgendar" ng-click="abrirModalGeografiaConsulta('pendientesAgendar')" type="text" class="input-filtro-bandejaSF form-control form-control-sm">
        </div>
        <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
            <button id="btn_consultar_pendientesAgendar" ng-click="consultarPendientesAgendarBandejas()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                <i class="fa fa-search" ></i>
            </button>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12 table-responsive" style="padding: 0;">
        <table id="tablePendientesAgendar" class="display table table-hover " cellspacing="0" width="100%">
            <thead id="thead_pendientesAgendar">
                <tr>
                    <th>CSP</th>
                    <th>CS</th>
                    <th>Cotizaci&oacute;n</th>
                    <th>Cuenta</th>
                    <th>Cliente</th>
                    <th>Paquete</th>
                    <th>Cuadrilla</th>
                    <th>Geograf&iacute;a</th>
                    <th>OS</th>
                    <th>Estatus OS</th>
                    <th>Fecha Creaci&oacute;n</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>