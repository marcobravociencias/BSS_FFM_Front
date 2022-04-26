<div class="row md-form" id="filtros_config">
    <div class="col-2 input-filtro-content">  
        <label for="filtro_folio_ticket" class="label-filter"><i class="fas fa-ticket-alt"></i> Folio sistema</label>
        <input type="text" id="filtro_folio_ticket" ng-change="filtroBusqueda.cuenta = ''" ng-model="filtroBusqueda.folio" placeholder="Ej:293870" class="input-filtro-ticket form-control form-control-sm" />
    </div>
    <div class="col-2 input-filtro-content">  
        <label for="filtro_clave_ticket" class="label-filter"><i class="fa fa-user"></i> Cuenta</label>
        <input type="text" id="filtro_clave_ticket" placeholder="Ej:2300023000" ng-change="filtroBusqueda.folio = ''" ng-model="filtroBusqueda.cuenta" class="input-filtro-ticket form-control form-control-sm" />
    </div>
    <div class="col-2 columna-filtro-ind input-filtro-content">  
        <label for="filtro_fecha_inicio_ticket" class="label-filter"><i class="fa fa-calendar"></i> Tipo fecha</label>
        <select class="input-filtro form-control form-control-sm input-filtro-ticket" id="tipo_reporte" ng-model="filtroBusqueda.tipoFechaConsulta">
            <option value="" >Seleccione...</option>
            <option value="creacion" selected>Creaci&oacute;n</option>
            <option value="cierre">Cierre</option>
            <option value="asignacion">Asignacion</option>
        </select>
    </div>
    <div class="col-2 columna-filtro-ind input-filtro-content">  
        <label for="filtro_fecha_inicio_ticket" class="label-filter"><i class="fa fa-calendar"></i> Fecha inicial</label>
        <input readonly type="text" id="filtro_fecha_inicio_ticket" class="datepicker input-filtro-ticket form-control form-control-sm" />
    </div>
    <div class="col-2 columna-filtro-ind input-filtro-content">
        <label for="filtro_fecha_fin_ticket" class="label-filter"><i class="fa fa-calendar"></i> Fecha final</label>
        <input readonly type="text" id="filtro_fecha_fin_ticket" class="datepicker input-filtro-ticket form-control form-control-sm" />
    </div>
    <div class="col-2 columna-filtro-ind input-filtro-content">
        <label class="label-filter"><i class="fas fa-map-marked"></i> Geograf&iacute;a<i ng-if="!listadoGeografiaSoporte.length" class="icono-noseleccion fas fa-exclamation-circle ml-2" title="No se encontr&oacute;o el catalogo de geograf&iacute;a"></i></label>
        <input id="txtGeografiasConsulta" type="text" class="input-filtro-status form-control form-control-sm"
            ng-click="abrirModalGeografiaConsulta()" 
            placeholder="NO HAY SELECCI&Oacute;N" readonly autocomplete="off">
    </div>
    <div class="col-1">
        <button id="btn_buscar" type="button" class="btn btn-sm btn-primary waves-effect waves-light btnTicket" ng-click="consultarTicketsSoporte()">
            <i class="fa fa-search"></i>
        </button>
    </div>
</div>
<div class="row filter-content">

    <!--div class="row col-9 filter-tab" style="margin-top: 0.5em;">
        <div class="col-2 user-info-content user-filter" style="margin-top: 0; ">
            <span ng-click="searchBy('todos')" id="spanTodos">
                <i class="fa fa-filter" id="filterTodos"></i>
                Todos
            </span>
        </div>
        <div class="col-2 user-info-content user-filter" style="margin-top: 0; ">
            <span ng-click="searchBy('Abierto')" id="spanAbierto">
                <i class="fa fa-filter" id="filterAbierto"></i>
                Abierto {{contadores.abierto ? contadores.abierto : '0'}}
            </span>
        </div>
        <div class="col-2 user-info-content user-filter" style="margin-top: 0;">
            <span ng-click="searchBy('Cerrado')" id="spanCerrado">
                <i class="fa fa-filter" id="filterCerrado"></i>
                Cerrado {{contadores.cerrado ? contadores.cerrado : '0'}}
            </span>
        </div>
        <div class="col-2 user-info-content user-filter" style="margin-top: 0;">
            <span ng-click="searchBy('Escalado')" id="spanEscalado">
                <i class="fa fa-filter" id="filterEscalado"></i>
                Escalado {{contadores.escalado ? contadores.escalado : '0'}}
            </span>
        </div>
        <div class="col-2 user-info-content user-filter" style="margin-top: 0;">
            <span ng-click="searchBy('Pendiente')" id="spanPendiente">
                <i class="fa fa-filter" id="filterPendiente"></i>
                Pendiente {{contadores.pendiente ? contadores.pendiente : '0'}}
            </span>
        </div>
        <div class="col-2 user-info-content user-filter" style="margin-top: 0;">
            <span ng-click="searchBy('Cancelado')" id="spanCancelado">
                <i class="fa fa-filter" id="filterCancelado"></i>
                Cancelado {{contadores.cancelado ? contadores.cancelado : '0'}}
            </span>
        </div>
    </div-->
</div>
<div class="row" >
    <div style="padding: 0" class="col-12">
        <div class="table-responsive"> 
            <table class="display table" width="100%" id="tableTicketSoporte">
                <thead id="thead_ticketSoporte">
                    <tr>
                        <th>OT</th>
                        <th>OT Soporte</th>
                        <th>Cuenta</th>
                        <th>Folio</th>
                        <th>Cliente</th>
                        <th>Falla</th>
                        <th>Categoria</th>
                        <th>Subcategoria</th>
                        <th>Estatus</th>
                        <th>Fecha creaci&oacute;n</th>
                        <th style="width: 100px !important;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    
</div>