<div class="container">
    <div class="row">
      <div class="col-4">
        <img  style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="tecnicoConsultaMateriales.urlFotoPerfil"   src="{{tecnicoConsultaMateriales.urlFotoPerfil}}" height="180"  class="img-recoleccion" alt="">
        <img  style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="!tecnicoConsultaMateriales.urlFotoPerfil"  src="${pageContext.request.contextPath}/resources/img/plantainterna/despacho/tecnicootasignada.png" height="180"  class="img-recoleccion" alt="">                
      </div>
      <div class="col-4">
          <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Estatus t&eacute;cnico</span></div>
            <div class="container-text-content-detalle">
              <span style=" border-bottom: 0.2em solid {{tecnicoConsultaMateriales.color}};
                            font-weight: bold;
                            color: {{tecnicoConsultaMateriales.color}};"
                   class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.descipcionEstatusTecnico || 'Sin dato'"></span>
            </div>
        </div>
          <div class="container-fluid vehiculo-content">
              <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Nombre</span></div>
              <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.nombre+' '+tecnicoConsultaMateriales.apellidoPaterno+' '+tecnicoConsultaMateriales.apellidoMaterno || 'Sin dato'"></span>
              </div>
          </div>
        
          <div class="container-fluid vehiculo-content">
              <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. empleado</span></div>
              <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"  ng-bind="tecnicoConsultaMateriales.numeroEmpleado || 'Sin dato'"></span>
              </div>
          </div>
          <div class="container-fluid vehiculo-content">
              <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Usuario FFM</span></div>
              <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.usuarioFFM || 'Sin dato'"></span>
              </div>
          </div>

          <div class="container-fluid vehiculo-content">
              <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. contacto</span></div>
              <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.numContacto || 'Sin dato'"></span>
              </div>
          </div>
         <div class="container-fluid vehiculo-content">
            <div class="divider-materiales-centroalmacen">

            </div>
         </div>

         <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Centro</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.centro || 'Sin dato'"></span>
            </div>
        </div>

        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Almacen</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaMateriales.almacen || 'Sin dato'"></span>
            </div>
        </div>                  
      </div>
      <div class="col-4">
          <img class="img-sap-recoleccion" src="${pageContext.request.contextPath}/resources/img/logotipos/SAP.svg"  alt="" loading="lazy" />   
          
          <div class="container-estatus-sap">                  
             <div class="blob online-sap-materiales-icon"></div>
    
             <span class="span-online-sap"> SAP en l&iacute;nea</span>
          </div>
          <div ng-show="true == false" class="container-estatus-sap">    
              <div class="blob oflline-sap-materiales-icon"></div>              
              <span class="span-offline-sap"> SAP fuera de l&iacute;nea </span>
          </div> 
      </div>
    </div>
    <div class="row">                   
        <div class="col-12">
          <div class="nav nav-tabs text-center"  id="tabs-recoleccion-sap" role="tablist" aria-orientation="vertical" >
            <a class="nav-link active" id="v-tabs-consulta-recoleccion-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-recoleccion" role="tab" aria-controls="v-tabs-consulta-recoleccion" aria-selected="true" >Consulta Recolecci&oacute;n</a>              
          </div>
          <div class="tab-content" id="v-tabs-tabContent">
            <div class="tab-pane fade show active" id="v-tabs-consulta-recoleccion" role="tabpanel" aria-labelledby="v-tabs-consulta-recoleccion-tab" >
                <table id="table-recoleccion-temp" class="table table-recoleccion table-sm ">
                    <thead>
                      <tr>
                        <th scope="col">Sku</th>
                        <th scope="col">Desc.</th>
                        <th scope="col">Lote</th>
                        <th scope="col">Cant.</th>
                        <th scope="col">Medida</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Familia</th>
                        <th scope="col">Categor&iacute;a</th>
                        <th scope="col">Grupo</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    </div>	
</div>