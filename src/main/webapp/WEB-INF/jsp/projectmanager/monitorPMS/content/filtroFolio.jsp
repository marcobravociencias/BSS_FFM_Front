<div class="content-fluid">
    <div class="container-noticia-elemento">
        <ul class="nav nav-tabs" id="myTab">
            <li class="nav-item">
                <a class="nav-link active" id="folioBandeja-tab" data-toggle="tab" href="#columnasFolio" role="tab" aria-controls="detalle" aria-selected="true">Columnas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="folioFiltrado-tab" data-toggle="tab" href="#filtradoPorFolio" role="tab" aria-controls="asignarTicket" aria-selected="false">Filtrar por</a>
            </li>
            <div class="col-4 col-btn-cerrar-filtro">
                <button type="button" class="close" ng-click="openfiltroNuevoFolio()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="columnasFolio" role="tabpanel" aria-labelledby="detalleTicket-tab">
                <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
                <div class="row container-columnas-filtro">
                    <div class="container-fluid filtro-content">
                        <div class="container-text-title-detalle"><span class="text-tile-filtro">TODOS</span></div>
                        <div class="container-text-content-filtro form-check form-switch">
                            <input id="checkTodoColumnaNuevoFolio" class="form-check-input" type="checkbox" ng-click="aplicarTodoColumnaNuevoFolio()">
                        </div>
                    </div>
                    <div class="container-fluid filtro-content" ng-repeat="filter in encabezadosNuevoFolioList track by $index" ng-if="$index != 0 && $index != 1">
                        <div class="container-text-title-detalle"><span class="text-tile-filtro">{{filter.titulo.toUpperCase()}}</span></div>
                        <div class="container-text-content-filtro form-check form-switch">
                            <input class="form-check-input" type="checkbox" ng-model="filter.vista" ng-click="quitarCheckTodoColumnanuevoFolio()">
                        </div>
                    </div>
                    
                </div>
                <div class="row container-btn-filtro">
                    <div class="col-12">
                        <button type="button" class="btn btn-sm btn-encabezado" ng-click="aplicarFiltroNuevoFolio()">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade show" id="filtradoPorFolio" role="tabpanel" aria-labelledby="detalleTicket-tab">
                <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
                <div class="row container-columnas-filtro">
                    <div class="container-fluid filtro-content" ng-repeat="filter in filtroPorFolio" ng-if="$index != 0 && $index != 1 && filter.vista">
                        <div class="container-text-title-detalle"><span class="text-tile-filtro">{{filter.titulo.toUpperCase()}}</span></div>
                        <div class="container-text-content-filtro-por form-check form-switch">
                            <input type="text" id="folioSearch{{$index}}" class="form-control form-control-sm">
                        </div>
                    </div>
                    
                </div>
                <div class="row container-btn-filtro">
                    <div class="col-12">
                        <button type="button" class="btn btn-sm btn-encabezado" ng-click="aplicarFiltroPorFolio()">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>