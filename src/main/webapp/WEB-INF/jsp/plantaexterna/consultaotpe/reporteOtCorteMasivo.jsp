<div  class="container-fluid container-filtros-consultaot" style="padding-left: 0px;">
    <div style="padding-left: 0;padding-right: 0;" class="content-fluid">
        <div class="row md-form" id="filtros_config">

            <div class="col-md-2 column-style-consulta borderFilterR borderAlignR" style="width: 150px !important;" id="borderAlign">
                <input type="text" placeholder="OT" id="idotO"
                class="form-control input-filtro-consultaOT form-control-sm">
            </div>

            <div class="col-md-2 column-style-consulta borderFilterR borderAlignR" style="width: 150px !important;" id="borderAlign">
                <input type="text" placeholder="Ticket SF" id="ticketSf"
                class="form-control input-filtro-consultaOT form-control-sm">
            </div>

            <div class="col-md-2 column-style-consulta borderFilterR borderAlignR" style="width: 150px !important;" id="borderAlign">
                <input type="text" placeholder="Ticket SD" id="ticketSd"
                class="form-control input-filtro-consultaOT form-control-sm">
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 150px !important;">
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_consultaOtO"
                class="datepicker input-filtro-consultaOT form-control form-control-sm" />
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 150px !important;">
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_consultaOtO"
                class="datepicker input-filtro-consultaOT form-control form-control-sm"/>
            </div>
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 35px;">
                <button id="btn_consultar_ordenes" type="button"
                class="btn btn-sm  btn-primary  waves-effect waves-light"
                style="margin-top: 0; margin-left: 15px !important;" ng-click="consultarReporteMasivo()">
                <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
</div>
<div align="right" style="margin-top: 10px;" class="col-10 offset-2 info_color" id="colores_estados_insp">
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-header" style="color: #4cb4f4" aria-hidden="true"></i><small> Hist&oacute;rico de OT</small></div>
    
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-picture-o" style="color: #f79050" aria-hidden="true"></i><small> Im&aacute;genes de Ubicaci&oacute;n</small></div>
        
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-server" style="color: #21bae7 " aria-hidden="true"></i><small> Conceptos</small></div>
        
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa-sm fa fa-wrench" style="color: #66ca8e" aria-hidden="true"></i><small> Materiales</small></div>
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa fa-times " style="color: #E8488E" aria-hidden="true"></i><small> Evidencias fallas </small></div>
    
    <div style="margin-right:15px;" class="contenido_color">
        <i class="fa fa-commenting" style="color: #a616e0" aria-hidden="true"></i><small> Comentarios </small></div>
</div>
<div class="container-fluid contenedor-consultaOT">
    <div class="content-fluid">
        <table id="reporteMasivoTable" class="display table table-hover" cellspacing="0" width="100%">
            <thead id="thead_reporteMasivo">
                <tr>
                    <th>OT</th>
                    <th>Ticket SF</th>
                    <th>Ticket SD</th>
                    <th>T&eacute;cnico</th>
                    <th>Status</th>
                    <th>Estado</th>
                    <th>Motivo</th>
                    <th>Fecha de creaci&oacute;n</th>
                    <th>Fecha Termino</th>
                    <th><i class="fa fa-header"></i></th>
                    <th><i class="fa fa-picture-o"></i></th>
                    <th><i class="fa fa-server"></i></th>
                    <th><i class="fa fa-wrench"></i></th>
                    <th><i class="fa fa-times"></i></th>
                    <th><i class="fa fa-commenting"></i></th>
                </tr>
            </thead>
            <tbody id="tbody_reporteMasivo">
            </tbody>
        </table>
    </div>
</div>