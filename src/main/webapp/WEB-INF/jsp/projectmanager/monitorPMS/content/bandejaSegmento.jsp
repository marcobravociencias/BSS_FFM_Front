<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row filtro-monitor-pm">
            <div class="col-3" style="margin-bottom: 0; margin-top: .5em; width: 16em;">
                <input type="text" autocomplete="off" class="search-detalle-filtro form-control form-control-sm mt-0">
             </div>
             <div class="col-2" style="margin-bottom: 0; margin-top: .5em; width: 6em;">
                <button type="button" class="btn btn-sm btn-encabezado">
                    Aplicar
                </button>
             </div>
             <div class="col-2" style="margin-bottom: 0; width: 3em;">
                <button id="refrescar-detalle" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" >
                    <i class="fas fa-redo"></i>
                </button>  
             </div>
             <div class="col-2" style="margin-bottom: 0;">
                <button id="refrescar-detalle" type="button" class="btn btn-sm btn-primary waves-effect waves-light" >
                    <i class="fas fa-filter"></i>
                </button>  
             </div>
       </div>
       <div class="row col-12" style="padding-right: 0px;" >
            <div class="col-12" id="container-filtro-segmento">
                <jsp:include page="filtroSegmento.jsp"></jsp:include>
            </div>
       </div>
    </div>
    <div class="content-table">
        <div class="content-fluid table-responsive">
            <table id="segmento-table" class="display table" cellspacing="0" width="100%">
                <thead id="theadSinSegmento">
                    <th ng-repeat="item in encabezadosSegmentoList" ng-if="item.vista">{{item.titulo}}</th>
                </thead>
            </table>
        </div>
    </div>
</div>