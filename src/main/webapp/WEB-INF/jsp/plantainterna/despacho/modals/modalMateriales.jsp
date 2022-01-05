<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalMaterialesOperario">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Materiales operario</h5>
                <button type="button" class="btn-close"  data-mdb-dismiss="modal" aria-label="Close" ></button>
            </div>
			<div class="modal-body">
				<div class="container">
              <div class="row">
                <div class="col-4">
                  <img  style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="tecnicoConsultaMateriales.urlFotoPerfil"   src="{{tecnicoConsultaMateriales.urlFotoPerfil}}" height="180"  class="img-tecnico-materiales" alt="">
                  <img  style="border: 0.3em {{tecnicoConsultaMateriales.color}} solid;" ng-if="!tecnicoConsultaMateriales.urlFotoPerfil"  src="${pageContext.request.contextPath}/resources/img/plantainterna/despacho/tecnicootasignada.png" height="180"  class="img-tecnico-materiales" alt="">                
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
                  <div class="container-fluid vehiculo-content">
                      <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Total materiales</span></div>
                      <div class="container-text-content-detalle"><span class="text-content-vehiculo total-materiales ng-binding" ng-bind="totalMaterialesModal || 'Sin dato'"></span>
                      </div>
                  </div>               
                </div>
                <div class="col-4">
                    <img class="img-sap-materiales" src="${pageContext.request.contextPath}/resources/img/logotipos/SAP.svg"  alt="" loading="lazy" />   
                    
                    <div ng-show="tecnicoConsultaMateriales.centro === 'ONLINE'" class="container-estatus-sap">                  
                       <div class="blob online-sap-materiales-icon"></div>
              
                       <span class="span-online-sap"> SAP en l&iacute;nea</span>
                    </div>
                    <div ng-show="tecnicoConsultaMateriales.centro.trim() === 'OFFLINE'" class="container-estatus-sap">    
                        <div class="blob oflline-sap-materiales-icon"></div>              
                        <span class="span-offline-sap"> SAP fuera de l&iacute;nea </span>
                    </div> 
                    <div ng-show="tecnicoConsultaMateriales.centro.trim() === 'NOCONF'" class="container-estatus-sap">    
                      <span class="span-noconfi-sap"> Sin configuraci&oacute;n  </span>
                    </div> 
                    <div ng-show="tecnicoConsultaMateriales.centro.trim() === 'NA'" class="container-estatus-sap">    
                      <span class="span-na-sap"> No aplica</span>
                  </div> 
                </div>
              </div>
              <div class="row">                   
                  <div class="col-12">
                    <div class="nav nav-tabs text-center"  id="tabs-materiales-sap" role="tablist" aria-orientation="vertical" >
                      <a class="nav-link active" id="v-tabs-consulta-materiales-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-materiales" role="tab" aria-controls="v-tabs-consulta-materiales" aria-selected="true" >Consulta Materiales</a>
                      <!--a class="nav-link" id="v-tabs-consulta-traspasos-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-traspasos" role="tab" aria-controls="v-tabs-consulta-traspasos" aria-selected="false" >Consulta traspasos</a-->                    
                    </div>
                    <div class="tab-content" id="v-tabs-tabContent">
                      <div class="tab-pane fade show active" id="v-tabs-consulta-materiales" role="tabpanel" aria-labelledby="v-tabs-consulta-materiales-tab" >
                          <table id="table-materiales-temp" class="table table-materiales table-sm ">
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
                      <div class="tab-pane fade" id="v-tabs-consulta-traspasos" role="tabpanel" aria-labelledby="v-tabs-consulta-traspasos-tab">
                          <table class="table table-materiales table-sm ">
                              <thead>
                                <tr>
                                  <th scope="col">Id material</th>
                                  <th scope="col">Cantidad</th>
                                  <th scope="col">Id traspaso</th>
                                  <th scope="col">Serie</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr ng-repeat="material in objectMateriales.arrayTraspasos track by $index" class="">
                                  <td> <span class="text-materiales" ng-bind="material.id"></span> </td>
                                  <td> <span class="text-materiales" ng-bind="material.cantidad"></span> </td>
                                  <td> <span class="text-materiales" ng-bind="material.idTraspaso"></span> </td>
                                  <td> <span class="text-materiales" ng-bind="material.serie"></span> </td>
                                </tr>
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
              </div>	
				</div>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn cerrar-modal-btn btn-cerrar-modal btn-ligh" data-mdb-dismiss="modal">
                    Cerrar
                </button>
           </div>
        </div>
    </div>
</div>