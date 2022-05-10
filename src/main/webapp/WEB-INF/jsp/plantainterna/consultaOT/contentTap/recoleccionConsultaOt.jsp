<div ng-show="!isTecnicoConsultaRecoleccion" style="text-align: center; margin-top: 2em;">
  <span style="font-size: 12px !important;color:grey; font-weight: lighter;">
      <span>
          <i class="fa fa-exclamation-circle warning-nodata"></i>
      </span>
      NO SE ENCONTRARON DATOS
  </span>
</div>
<div ng-show="isTecnicoConsultaRecoleccion" class="container" style="padding-left: 0;">
  <div class="row">
    <div class="col-3">
      <img style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="tecnicoConsultaRecoleccion.urlFotoPerfil" src="{{tecnicoConsultaRecoleccion.urlFoto}}" height="180" class="img-recoleccion" alt="">
      <img style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="!tecnicoConsultaRecoleccion.urlFotoPerfil" src="${pageContext.request.contextPath}/resources/img/plantainterna/despacho/tecnicootasignada.png" height="180" class="img-recoleccion" alt="">
    </div>
    <div class="col-4">
      <div class="container-fluid vehiculo-content">
        <div class="container-title-detail">
          <span class="text-tile-vehiculo">T&eacute;cnico</span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="divider-materiales-centroalmacen">
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-tile-vehiculo">Nombre</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaRecoleccion.nombre+' '+tecnicoConsultaRecoleccion.apellidoPaterno+' '+tecnicoConsultaRecoleccion.apellidoMaterno || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-tile-vehiculo">Num. empleado</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaRecoleccion.numeroEmpleado || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-tile-vehiculo">Usuario FFM</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaRecoleccion.usuarioFFM || 'Sin dato'"></span>
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
        <div class="divider-materiales-centroalmacen">
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-tile-vehiculo">Id orden</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaRecoleccion.idOrden || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-tile-vehiculo">Folio</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaRecoleccion.folioSistema || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-tile-vehiculo">Clave cliente</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaRecoleccion.claveCliente || 'Sin dato'"></span>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 1em;">
      <div class="col-12">
        <table id="table-recoleccion-temp" class="table table-recoleccion table-sm">
          <thead>
            <tr>
              <th scope="col">Sku</th>
              <th scope="col">Descripci&oacute;n</th>
              <th scope="col">Centro</th>
              <th scope="col">Almac&eacute;n</th>
              <th scope="col">Recuperado</th>
              <th scope="col">Adicional</th>
              <th scope="col">Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>