<div ng-show="!isTecnicoConsultaMateriales" style="text-align: center; margin-top: 2em;">
    <span style="font-size: 12px !important;color:grey; font-weight: lighter;">
        <span>
            <i class="fa fa-exclamation-circle warning-nodata"></i>
        </span>
        NO SE ENCONTRARON DATOS
    </span>
</div>
<div class="container" ng-show="isTecnicoConsultaMateriales">
    <div ng-if="isTecnicoConsultaMateriales" class="row">
        <div class="col-4">
            <img style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="tecnicoConsultaMateriales.fotoPerfil" src="{{tecnicoConsultaMateriales.fotoPerfil}}" height="180" class="img-tecnico-materiales" alt="">
            <img style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="!tecnicoConsultaMateriales.fotoPerfil" src="${pageContext.request.contextPath}/resources/img/plantainterna/despacho/tecnicootasignada.png" height="180" class="img-tecnico-materiales" alt="">
        </div>
        <div class="col-4">
            <div class="container-fluid vehiculo-content">
                <div class="container-title-detail">
                    <span class="text-tile-vehiculo">T&eacute;cnico</span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="divider-materiales-centroalmacen"></div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Nombre</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.nombreCommpleto || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Num. empleado</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.numEmpleado || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Usuario FFM</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.usuario || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Centro</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.centro || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Almacen</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.almacen || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Clave cliente</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.claveCliente || 'Sin dato'"></span>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="container-fluid vehiculo-content">
                <div class="container-title-detail">
                    <span class="text-tile-vehiculo">Orden</span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="divider-materiales-centroalmacen"></div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Id orden</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.idOrden || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Folio</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.folioSistema || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Fecha registro</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding"
                        ng-bind="tecnicoConsultaMateriales.fechaRegistro || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Num. ticket</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.numTicket || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Latitud</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.latitud || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle">
                    <span class="text-tile-vehiculo">Longitud</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.longitud || 'Sin dato'"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table id="table-materiales-ot" class="table table-materiales table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th scope="col">Sku</th>
                            <th scope="col">Desc.</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Lote</th>
                            <th scope="col">Serie</th>
                            <th scope="col">Familia</th>
                            <th scope="col">Doc sap</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cant.</th>
                            <th scope="col">Costo</th>
                            <th scope="col">Unidad</th>
                            <th scope="col">Comentarios</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>