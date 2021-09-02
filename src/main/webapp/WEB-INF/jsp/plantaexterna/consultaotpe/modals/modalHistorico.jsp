<div class="modal fade" tabindex="-1" aria-hidden="true" id="modalHistorico">
    <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Hist&oacute;rico</h5>
        <button
        type="button"
        class="btn-close"
        data-mdb-dismiss="modal"
        aria-label="Close"
        ></button>
      </div>
      <div class="modal-body" style=" max-height: 300px; overflow: auto;">
        <div class="historico col-md-12">    
            <div class="page">
              <div class="page_demo">
                <div class="main-container page_container">
                  <div class="timeline" id="content-historic"> 
                    <div class="timeline_group" ng-repeat="historicoData in historico">
                        <div class="timeline_box">
                            <div style="background-color:white;"  class="timeline_date">
                                <span  style="font-size: 15px !important;color:grey;" class="timeline_day">OT</span>
                                <span  style="font-size: 12px !important;" class="timeline_month">
                                    <i style="width: 25px; height: 25px; font-size: 2em;" alt="PENDIENTE" ng-class="{'fa fa-pause-circle pend': historicoData.idstatus==1,'fa fa-arrow-circle-right asig': historicoData.idstatus==2,'fa fa-hand-paper-o deten': historicoData.idstatus==3,'fa fa-check-circle term': historicoData.idstatus==4,'fa fa-times-circle cancel': historicoData.idstatus==5}"></i>
                                </span>
                            </div>
                            <div class="timeline_post">
                                <div class="timeline_content">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="col-md-12">
                                                        <b  class="title_span"> OT:</b>
                                                        <span id="ot_detalle" class="content_text" ng-bind="historicoData.idot"></span>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <b class="title_span"> Estado:</b>
                                                        <span id="ot_detalle" class="content_text" ng-bind="historicoData.estado"></span>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <b class="title_span"> Descripci&oacute;n:</b>
                                                        <span id="ot_detalle" class="content_text" ng-bind="historicoData.descripcion"></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="col-md-12">
                                                        <b class="title_span"> Motivo:</b>
                                                        <span id="ot_detalle" class="content_text" ng-bind="historicoData.motivo"></span>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <b class="title_span"> Fecha:</b>
                                                        <span id="ot_detalle" class="content_text" ng-bind="historicoData.fecha"></span>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <b class="title_span"> Hora:</b>
                                                        <span id="ot_detalle" class="content_text" ng-bind="historicoData.hora"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                    </div>  
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
        Cerrar
        </button>
      </div>
      </div>
    </div>
    </div>