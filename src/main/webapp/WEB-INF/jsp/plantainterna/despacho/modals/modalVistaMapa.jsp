<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalVistaMapa">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container" style="margin: 0;">
                    <div class="row">
                        <div class="col-3 content-tecnicos">
                            <div class="title-tecnicos">
                                <span>T&Eacute;CNICOS</span>
                            </div>
                            <div class="form-group" style="margin-bottom: 0 !important;">
                                <input type="text" class="form-control form-control-sm search-tecnico" ng-model="search.nombreCompleto"
                                    placeholder="Buscar t&eacute;cnicos...">
                            </div>
                            <div class="content-list-tecnicos">
                                <div ng-repeat="user in listadoTecnicosGeneral | filter:search.nombreCompleto">
                                    <div class="content-tecnico"   id="{{user.idTecnico}}" ng-click="detalleTecnicoRuta(user.id)">
                                        <div class="row">
                                            <div class="col-3">
                                                <img style="border:.2em solid {{user.color}}"
                                                    class="efecto imagen_operario_foto" src="{{user.urlFotoPerfil ? user.urlFotoPerfil : './resources/img/plantainterna/despacho/tecnicootasignada.png'}}">
                                            </div>
                                            <div class="col-9 text-justify">
                                                <div class="conteo-content-ots">
                                                </div>
                                                <div class="row">
                                                    <h5 title="{{user.nombreCompleto}}" class="big-text nombre_tecnico" style="height: 25px;">
                                                        {{user.nombreCompleto}}</h5>
                                                </div>
                                                <div class="row">
                                                    <small class="numero_empleado_telefono" style="color: red !important">
                                                        {{user.cantidadOts}} OTS
                                                    </small>
                                                </div>
                                                <div class="row">
                                                    <small class="numero_empleado_telefono">
                                                        <i style="color:#4991e1;" class="fa fa-user"></i>
                                                        {{user.usuarioFFM}}
                                                        <i style="color:#4991e1; margin-left: 5px;"
                                                            class="fa fa-phone"></i>
                                                        {{user.numContacto}}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-9">
                            <div id="mapa-vista-general" class="mapa-cotizacion-despacho"
                                style="width:100%;height:100%; border-radius: 10px;">
                            </div>

                            <div  class="card div-contenedor-kmz-buttons">
                                <div class="card-header"> 
                                    <span class="title-tipoot">FILTROS MAPA</span> 
                                    <span ng-click="objectVistaMapaCOnfig.isOpenOpciones=false" ng-show="objectVistaMapaCOnfig.isOpenOpciones" class="icono-accion-card fa fa-minus"></span>
                                    <span ng-click="objectVistaMapaCOnfig.isOpenOpciones=true" ng-show="!objectVistaMapaCOnfig.isOpenOpciones" class="icono-accion-card fa fa-plus"></span>
                                </div>
                                <div  ng-show="objectVistaMapaCOnfig.isOpenOpciones" class="card-body">
                                  <form class="form-body-filter">
                                    <div ng-repeat="kmzConfig in objectVistaMapaCOnfig.listadoKmz track by $index" class="form-check form-check-vistamapa">
                                      <input ng-change="setMapaKmlVistaMapa($index,kmzConfig)" ng-model="kmzConfig.isOpenOpciones"  type="checkbox" class="form-check-input ">
                                      <label class="form-check-label label-form " for="ocultarmostrarlables" ng-bind="kmzConfig.text"></label>
                                    </div>                                
                                  </form>
                                  <!--div class="content-ocultarmostrar">
                                    <span class="fa fa-chevron-down icono-ocultarmostrar"></span>
                                    <span class="text-ocultarmostrar">Ocultar tipos ots</span>
                                  </div>
                                  <ul class="listado-intervenciones list-group list-group-flush">
                                  </ul-->
                                </div>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>