
<div class="content-fluid">
    <div class="row md-form" id="filtros_config">
        <div class="col-2 column-style-consulta">
            <label for="idot" class="label-filter">T&iacute;tulo princ.</label>
            <input type="text" id="idot" placeholder="Ej: Paquete total " ng-model="camposFiltro.idot"  ng-change="limpiarCamposFiltro(1)"
            class="form-control input-filtro-noticias form-control-sm">
        </div>
        <div class="col-1 column-style-consulta columna-filtro-ind">
            <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i><label for="cluster" class="label-filter">Geograf&iacute;a</label>
            <input ng-click="abrirModalGeografiaConsulta()"  readonly placeholder="Seleccione..." type="text" id="cluster"
            class="input-filtro-noticias form-control form-control-sm">
        </div>
        <div ng-class="{'inactiveFechaConsulta':filtroConsulta.permanente}" class="col-1 columna-filtro-ind" >
            <label for="filtro_fecha_inicio_consultanoticia" class="label-filter">Fecha inicial</label>
            <input ng-disabled="filtroConsulta.permanente" readonly  placeholder="Fecha inicial"  type="text" id="filtro_fecha_inicio_consultanoticia"    class="datepicker input-filtro-noticias form-control form-control-sm"  />
        </div>
        <div ng-class="{'inactiveFechaConsulta':filtroConsulta.permanente}" class="col-1 columna-filtro-ind">
            <label for="filtro_fecha_fin_consultanoticia" class="label-filter">Fecha final</label>
            <input ng-disabled="filtroConsulta.permanente" readonly placeholder="Fecha final" type="text" id="filtro_fecha_fin_consultanoticia" class="datepicker input-filtro-noticias form-control form-control-sm"  />
        </div>
        <div class="col-1 columna-filtro-ind">
            <label for="filtro_fecha_fin_permanente" class="label-filter">Permanente</label>
            <div class="form-check form-switch">
                <input ng-model="filtroConsulta.permanente" class="form-check-input" type="checkbox" role="switch" id="filtro_fecha_fin_permanente" />
                </div>
        </div>
        <div class="col-1 div-btn-busqueda">
            <button id="btn_consultar_ordenes" type="button"  class="btn btn-sm  btn-primary  waves-effect waves-light"  ng-click="consultarNoticias()">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </div>
    <div class="row md-form" id="busqueda_noticias">
        <div class="col-12">
            <table id="datatable-noticias" class="table table-sm table-hover ">
                <thead >
                    <tr>
                        <th>Banner</th>
                        <th>Descarga</th>          
                        <th>T&iacute;tulo princ.</th>
                        <th>T&iacute;tulo secund.</th>
                        <th>Link externo</th>
                        <th>Permanente</th>
                        <th>Inicio</th>
                        <th>Expiraci&oacute;n</th>
                        <th>Detalle</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                </tbody>    
            </table>
        </div>     
    </div>
</div>

