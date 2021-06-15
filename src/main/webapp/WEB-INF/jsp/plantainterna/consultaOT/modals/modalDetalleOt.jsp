<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-detalle-ot" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-acciones">
          <div class="modal-content">
              <div class="modal-header style_modal_header blue-gradient modal_header_bg" style="color: #fff;">
                  <h5 class="modal-title">INFORMACI&Oacute;N OT <span id="ot-asignada"></span></h5>
                  <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close" ng-click="closeModalDetalle()">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body" >
                  <div class="row">
                      <div class="col-2">
                          <ul class="list-group">
                            <li class="list-group-item efecto itemGeneral active" id="informacion-ot">Detalle OT</li>
                            <li class="list-group-item efecto itemGeneral" id="comentarios">Comentarios</li>
                            <li class="list-group-item efecto itemGeneral" id="info_historico">Historico</li>
                            <li class="list-group-item efecto itemGeneral" id="info_soluciones">Soluciones</li>
                            <li class="list-group-item efecto itemGeneral" id="corte_individual">Corte Individual</li>  
                            <li class="list-group-item efecto itemGeneral" id="info_cambio_equipo">Cambio de equipo</li>  
                            <li class="list-group-item efecto itemGeneral" id="info_reubicacion">Reubicacion</li> 
                            <li class="list-group-item efecto itemGeneral" id="info_red">Informaci&oacute;n red</li>
                            <li class="list-group-item efecto itemGeneral" id="atividad_tecnico">Evidencia</li>      
                            <li class="list-group-item efecto itemGeneral" id="trayectoria">geolocalizaci&oacute;n</li>      
                      <!--	  <li class="list-group-item efecto itemGeneral" id="consulta_recolecciones">Recolecciones</li>      
                          <li class="list-group-item efecto itemGeneral" id="info_cambio_plan">Cambio plan</li>  	-->
                  </ul>
                      </div>
                      <div class="col-10">
                          <div class="contenedor_detalle row" id="content-ot">
                              <div class="col-12">
                                  <h4 class="text-center">INFORMACI&Oacute;N OT</h4>
                                  <hr>
                              </div>
                              <div class="container">
  
                                  <div class="info_ot_detail row justify-content-center">
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> OT:</b> &nbsp;
                                          <span id="ota-ot" class="content_info_ot"> </span>	
                                      </div>
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> CUENTA:</b> &nbsp;
                                          <span id="ota-cuenta" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                                  <div class="info_ot_detail row justify-content-center">
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot">OS:</b> &nbsp;
                                          <span id="ota-os" class="content_info_ot"> </span>	
                                      </div>
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> CLIENTE:</b> &nbsp;
                                          <span id="ota-cliente" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                                  <div class="info_ot_detail row justify-content-center">
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> ESTADO DE LA OT:</b> &nbsp;
                                          <span id="ota-estado" class="content_info_ot"> </span>	
                                      </div>
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> CONTACTO:</b> &nbsp;
                                          <span id="ota-contacto" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                                  <div class="info_ot_detail row justify-content-center">
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot">HORA:</b> &nbsp;
                                          <span id="ota-fecha" class="ota-paquete"> </span>	
                                      </div>
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot">REFERENCIA:</b> &nbsp;
                                          <span id="ota-referencia" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                                  <div class="info_ot_detail row justify-content-center">
  
                                  </div>
                                  <div class="info_ot_detail row justify-content-center">
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot">SUB-INTERVENCI&Oacute;N:</b> &nbsp;
                                          <span id="ota-subtipo" class="content_info_ot"> </span>	
                                      </div>
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> ENTRE CALLES:</b> &nbsp; 
                                          <span id="ota-calles" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                                  <div class="info_ot_detail row justify-content-center">
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot">PAQUETE:</b> &nbsp; 
                                          <span id="ota-paquete" class="content_info_ot"> </span>	
                                      </div>
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> TEL&Eacute;FONO:</b> &nbsp;
                                          <span id="ota-telefono1" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                                  <div class="info_ot_detail row">
                                      <div class="col-md-6">
                                          <b class="title_span title_info_ot"> TEL&Eacute;FONO CONTACTO:</b> &nbsp;
                                          <span id="ota-telefono2" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                                  <div class="info_ot_detail row ">
                                      <div class="col-md-12">
  
                                          <b class="title_span title_info_ot"> DIRECCI&Oacute;N:</b> &nbsp;
                                          <span id="ota-direccion" class="content_info_ot"> </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="contenedor_detalle row" id="content-comentarios">
                              <div class="col-12">
                                  <h4 class="text-center">COMENTARIOS</h4>
                                  <hr>
                              </div>
                              <div class="container">
                                 <jsp:include page="../contentTap/modalChat.jsp"></jsp:include>
                              </div>
                          </div>
                          <div class="contenedor_detalle row" id="content-historico">
                              <div class="col-12">
                                  <h4 class="text-center">HISTORICO</h4>
                                  <hr>
                              </div>
                              <div class="container">
                                  <jsp:include page="../contentTap/modalHistorico.jsp"></jsp:include>
                              </div>
                          </div>
                            <div class="contenedor_detalle row" id="content-soluciones">
                                  <div class="col-12">
                                      <h4 class="text-center">Soluciones</h4>
                                      <hr>
                                  </div>
                                      <div class="container-fluid">
                                          <input type="text" style="display:none;" id="Falla">
                                          <input type="text" style="display:none;" id="Descripci&oacute;n Falla">
                                          <input type="text" style="display:none;" id="Comentarios">
                                        <div  class="row">
                                          <div id="contenido_fallas_tabs" class="col-md-12">
                                              <ul id="headers_tab" class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item">
                                                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">#1</a>
                                                </li>
                                                <li class="nav-item">
                                                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">#2</a>
                                                </li>
                                                <li class="nav-item">
                                                  <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">#3</a>
                                                </li>
                                              </ul>
                                              <div id="content_tabs" class="tab-content" id="myTabContent">
                                                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                              </div>			
                          <div class="contenedor_detalle row" id="content_corte_individual">
                              <div class="col-12">
                                  <h4 class="text-center">Corte individual</h4>
                                  <hr>
                              </div>
                              <div class="container">
                                  <%-- <jsp:include page="../contentTap/corteIndividual.jsp"></jsp:include> --%>
                              </div>
                          </div>		
                          <div class="contenedor_detalle row" id="content_cambio_equipo">
                              <div class="col-12">
                                  <h4 class="text-center">Cambio Equipo</h4>
                                  <hr>
                              </div>
                              <div class="container">
                                  <jsp:include page="../contentTap/cambioEquipo.jsp"></jsp:include>
                              </div>
                          </div>	
                          <div class="contenedor_detalle row" id="content_reubicacion">
                              <div class="col-12">
                                  <h4 class="text-center">Reubicacion</h4>
                                  <hr>
                              </div>
                              <div class="container">
                                  <%-- <jsp:include page="../contentTap/reubicacion.jsp"></jsp:include> --%>
                              </div>
                          </div>		
                          <div class="contenedor_detalle row" id="content_cambio_plan">
                              <div class="col-12">
                                  <h4 class="text-center">Cambio Plan</h4>
                                  <hr>
                              </div>
                              <div class="container">
                                  <%-- <jsp:include page="../contentTap/cambio_plan.jsp"></jsp:include> --%>
                              </div>
                          </div>		
                          <div class="contenedor_detalle row" id="content_informacion_red">
                              <div class="col-12 content_style_info_red">
                                  <h4 class="text-center">INFORMACI&Oacute;N RED</h4><hr>
                                  <div class="container">
                                      <jsp:include page="../contentTap/informacionRed.jsp"></jsp:include>
                                  </div>
                              </div>
                          </div>
                          <div class="contenedor_detalle row" id="content_actividad">
                              <div class="col-12">
                                  <h4 class="text-center">Evidencia</h4><hr>
                                  <div class="container">
                                      <jsp:include page="../contentTap/actividadTecnico.jsp"></jsp:include>
                                  </div>
                              </div>
                          </div>
                          <div class="contenedor_detalle row" id="content_trayectoria">
                              <div class="col-12">
                                  <h4 class="text-center">Geolocalizaci&oacute;n</h4><hr>
                                  <div class="container">
                                      <jsp:include page="../contentTap/geolocalizacion.jsp"></jsp:include>
                                  </div>
                              </div>
                          </div>
                          <div class="contenedor_detalle row" id="content_recoleccion_materiales">
                              <div class="col-12">
                                  <h4 class="text-center">Recoleccion</h4><hr>
                                  <div class="container">
                                      <%-- <jsp:include page="../contentTap/consultaRecolecciones.jsp"></jsp:include> --%>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" id="btnCerrar" class="btn btn-blue-grey close-modal btn_cerrar_modal" data-dismiss="modal" ng-click="closeModalDetalle()">Cerrar</button>
              </div>
          </div>
      </div>
  </div>