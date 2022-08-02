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
            <div class="container-fluid detalle-ot-content">
                <div class="container-title-detail">
                    <span class="text-title-detalle-ot">T&eacute;cnico</span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="divider-materiales-centroalmacen"></div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Nombre</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.nombreCommpleto || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.nombreCommpleto || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Num. empleado</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.numEmpleado || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.numEmpleado || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Usuario FFM</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.usuario || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.usuario || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Centro</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.centro || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.centro || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Almacen</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.almacen || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.almacen || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Clave cliente</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.claveCliente || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.claveCliente || 'Sin dato'"></span>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="container-fluid detalle-ot-content">
                <div class="container-title-detail">
                    <span class="text-title-detalle-ot">Orden</span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="divider-materiales-centroalmacen"></div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Id orden</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.idOrden || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.idOrden || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Folio</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.folioSistema || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.folioSistema || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Fecha registro</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.fechaRegistro || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.fechaRegistro || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Num. ticket</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.numTicket || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.numTicket || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Latitud</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.latitud || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.latitud || 'Sin dato'"></span>
                </div>
            </div>
            <div class="container-fluid detalle-ot-content">
                <div class="container-text-title-detalle">
                    <span class="text-title-detalle-ot">Longitud</span>
                </div>
                <div class="container-text-content-detalle">
                    <span class="text-content-detalle-ot ng-binding" title="{{tecnicoConsultaMateriales.longitud || 'Sin dato'}}" ng-bind="tecnicoConsultaMateriales.longitud || 'Sin dato'"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table id="tableMaterialesDetalleOT" class="display table table-hover" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>Sku</th>
                            <th>Desc.</th>
                            <th>Tipo</th>
                            <th>Grupo</th>
                            <th>Lote</th>
                            <th>Serie</th>
                            <th>Familia</th>
                            <th>Doc sap</th>
                            <th>Precio</th>
                            <th>Cant.</th>
                            <th>Costo</th>
                            <th>Unidad</th>
                            <th>Comentarios</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>