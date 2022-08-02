<div class="container-fluid p-0" id="container_logs_usuario">
    <div class="col-12">
        <div class="row">    
            <div class="col-2 form-group columna-filtro-ind-rep">
                <label class="span-consulta"><i class="fas fa-calendar"></i> Fecha inicio</label>
                <input readonly type="text" placeholder="Fecha inicio"  id="filtro_fecha_inicio" class="datepicker input-filtro form-control form-control-sm" style="border-radius: .5em !important;" />
            </div>
            <div class="col-2 form-group columna-filtro-ind-rep">
                <label class="span-consulta"><i class="fas fa-calendar"></i> Fecha fin</label>
                <input readonly type="text" placeholder="Fecha fin"  id="filtro_fecha_fin" class="datepicker input-filtro form-control form-control-sm" style="border-radius: .5em !important;" />
            </div>    
            <div class="col-md-2 form-group columna-filtro-ind-rep">
                <label class="span-consulta"><i class="fas fa-map-marked"></i> Geograf&iacute;a <i ng-if="!listaGeografia.length" class="icono-noseleccion fas fa-exclamation-circle ml-2" title="No se encontr&oacute; el catalogo de geograf&iacute;a"></i></label>
                <input readonly placeholder="NO HAY SELECCI&Oacute;N" type="text"
                    ng-click="abrirModalGeografiaBuscar()" id="inputSearchGeoGeneral"
                    class="input-filtro form-control form-control-sm" style="border-radius: .5em !important;">
            </div>
            <div class="col-md-1 search-form">
                <button id="btnBuscar" type="button" class="btn btn-primary btnTotal"
                    ng-click="consultarLogs()" style="margin-top: 2.3em;">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-md-1 column-style-consulta mt-4" style="margin-left: -2em;" ng-if="configPermisoAccionDescargaLogsGeneral">
                <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer" ng-click="descargaReporteLogGeneral()">
            </div>
        </div>
    </div>

    <div class="content-fluid">
        <div class="table-responsive">
            <table id="logsGeneralTable" class="display table" cellspacing="0" width="100%">
                <thead id="thead_table">
                    <tr>
                        <th>M&oacute;dulo</th>
                        <th>Acci&oacute;n</th>
                        <th>Estatus</th>
                        <th>Mensaje</th>
                        <th>Comentarios</th>
                        <th>Fecha registro</th>
                        <th>Nombre</th>
                        <th>#Empleado</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>