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
          <span class="text-title-detalle-ot">T&eacute;cnico</span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="divider-materiales-centroalmacen">
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-title-detalle-ot">Nombre</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-detalle-ot" title="{{tecnicoConsultaRecoleccion.nombre+' '+tecnicoConsultaRecoleccion.apellidoPaterno+' '+tecnicoConsultaRecoleccion.apellidoMaterno || 'Sin dato'}}" ng-bind="tecnicoConsultaRecoleccion.nombre+' '+tecnicoConsultaRecoleccion.apellidoPaterno+' '+tecnicoConsultaRecoleccion.apellidoMaterno || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-title-detalle-ot">Num. empleado</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-detalle-ot" title="{{tecnicoConsultaRecoleccion.numeroEmpleado || 'Sin dato'}}" ng-bind="tecnicoConsultaRecoleccion.numeroEmpleado || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-title-detalle-ot">Usuario FFM</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-detalle-ot" title="{{tecnicoConsultaRecoleccion.usuarioFFM || 'Sin dato'}}" ng-bind="tecnicoConsultaRecoleccion.usuarioFFM || 'Sin dato'"></span>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="container-fluid vehiculo-content">
        <div class="container-title-detail">
          <span class="text-title-detalle-ot">Orden</span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="divider-materiales-centroalmacen">
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-title-detalle-ot">Id orden</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-detalle-ot" title="{{tecnicoConsultaRecoleccion.idOrden || 'Sin dato'}}" ng-bind="tecnicoConsultaRecoleccion.idOrden || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-title-detalle-ot">Folio</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-detalle-ot" title="{{tecnicoConsultaRecoleccion.folioSistema || 'Sin dato'}}" ng-bind="tecnicoConsultaRecoleccion.folioSistema || 'Sin dato'"></span>
        </div>
      </div>
      <div class="container-fluid vehiculo-content">
        <div class="container-text-title-detalle">
          <span class="text-title-detalle-ot">Clave cliente</span>
        </div>
        <div class="container-text-content-detalle">
          <span class="text-content-detalle-ot" title="{{tecnicoConsultaRecoleccion.claveCliente || 'Sin dato'}}" ng-bind="tecnicoConsultaRecoleccion.claveCliente || 'Sin dato'"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table id="tableRecoleccionDetalleOT" class="display table table-hover">
          <thead>
            <tr>
              <th>Sku</th>
              <th>Descripci&oacute;n</th>
              <th>Centro</th>
              <th>Almac&eacute;n</th>
              <th>Recuperado</th>
              <th>Adicional</th>
              <th>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>