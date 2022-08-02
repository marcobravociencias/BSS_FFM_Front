<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            
            <div class="col-md-2 columna-filtro-indRR borderFilterR" style="margin-left: 0.5em;">
                <label class="label-filter">Geograf&iacute;a</label>
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster-tecnicos" class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep('tecnicos')" />
            </div>

            <div class="col-md-1 div-btn-busqueda borderFilterR" style="width: 55px;">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar"
                    style="margin-top: 2.5em;height: 28px;" ng-click="consultarTecnicosTiposOrdenes()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            
            <div class="col-md-1 download-file" ng-if="configPermisoAccionGenerarReporteTecnicosTiposOrdenes">
                <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                    style="cursor:pointer;margin-top: 1.5em;" ng-click="generarReporteTecnicosTiposOrdenes()">
            </div>
        </div>
    </div>
    <div class="content-fluid">
        <div ng-show="isTablaTecnicos">
            <table id="tableTecnicosTiposOrdenes" class="display nowrap table" cellspacing="0" width="100%">
                <thead id="headTecnicosTiposOrdenes">
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div ng-show="!isTablaTecnicos" class="imagen-no-results">
			<img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
			<br>
			<span class="span-no-result">No se encontraron resultados</span>
		</div>
    </div>
</div>