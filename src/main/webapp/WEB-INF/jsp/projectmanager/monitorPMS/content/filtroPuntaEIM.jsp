<div class="content-fluid">
    <div class="container-noticia-elemento">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" id="puntaEIMBandeja-tab" data-toggle="tab" href="#columnasPuntaEIM" role="tab" aria-controls="detalle" aria-selected="true">Columnas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="puntaEIMFiltrado-tab" data-toggle="tab" href="#filtradoPorPuntaEIM" role="tab" aria-controls="asignarTicket" aria-selected="false">Filtrar por</a>
            </li>
            <div class="col-4 col-btn-cerrar-filtro">
                <button type="button" class="close" ng-click="openfiltro()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="columnasPuntaEIM" role="tabpanel" aria-labelledby="detalleTicket-tab">
                <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
                <div class="row container-columnas-filtro">
                    <div class="container-fluid filtro-content">
                        <div class="container-text-title-detalle"><span class="text-tile-filtro">TODOS</span></div>
                        <div class="container-text-content-filtro form-check form-switch">
                            <input id="checkTodoColumna" class="form-check-input" type="checkbox" ng-click="aplicarTodoColumna()">
                        </div>
                    </div>
                    <div class="container-fluid filtro-content" ng-repeat="filter in encabezadosList track by $index" ng-if="$index != 0 && $index != 1 && $index != 2">
                        <div class="container-text-title-detalle"><span class="text-tile-filtro">{{filter.titulo.toUpperCase()}}</span></div>
                        <div class="container-text-content-filtro form-check form-switch">
                            <input class="form-check-input" type="checkbox" ng-model="filter.vista" ng-click="quitarCheckTodoColumna()">
                        </div>
                    </div>
                    
                </div>
                <div class="row container-btn-filtro">
                    <div class="col-12">
                        <button type="button" class="btn btn-sm btn-encabezado" ng-click="aplicarFiltro()">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade show" id="filtradoPorPuntaEIM" role="tabpanel" aria-labelledby="detalleTicket-tab">
                <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
                <div class="row container-columnas-filtro">
                    <div class="container-fluid filtro-content" ng-repeat="filter in filtroPorList" ng-if="$index != 0 && $index != 1 && $index != 2 && filter.vista">
                        <div class="container-text-title-detalle"><span class="text-tile-filtro">{{filter.titulo.toUpperCase()}}</span></div>
                        <div class="container-text-content-filtro-por form-check form-switch">
                            <input type="text" id="eimSearch{{$index}}" class="form-control form-control-sm">
                        </div>
                    </div>
                    
                </div>
                <div class="row container-btn-filtro">
                    <div class="col-12">
                        <button type="button" class="btn btn-sm btn-encabezado" ng-click="aplicarFiltroPorEIM()">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>