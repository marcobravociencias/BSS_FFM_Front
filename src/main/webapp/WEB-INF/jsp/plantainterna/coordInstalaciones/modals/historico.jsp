<div class="historico col-md-12">    
    <div class="page">
      <div class="page_demo">
        <div class="main-container page_container">
          <div class="timeline" id="content-historic"> 
            <div class="timeline_group" ng-repeat="historicoData in historico.Trackin">
                <div class="timeline_box">
                    <div style="background-color:white;"  class="timeline_date">
                        <span  style="font-size: 15px !important;color:grey;" class="timeline_day">OT</span>
                        <span  style="font-size: 12px !important;" class="timeline_month">
                            <i style="width: 25px; height: 25px; font-size: 2em;" alt="PENDIENTE" ng-class="{'fa fa-pause-circle pend': historicoData.Id_Estatus==1,'fa fa-arrow-circle-right asig': historicoData.Id_Estatus==2,'fa fa-hand-paper-o deten': historicoData.Id_Estatus==3,'fa fa-check-circle term': historicoData.Id_Estatus==4,'fa fa-times-circle cancel': historicoData.Id_Estatus==5}"></i>
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
                                                <span id="ot_detalle" class="content_text" ng-bind="historicoData.OT"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <b class="title_span"> Estado:</b>
                                                <span id="ot_detalle" class="content_text" ng-bind="historicoData.EstadoDescripcion"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <b class="title_span"> Descripci&oacute;n:</b>
                                                <span id="ot_detalle" class="content_text" ng-bind="historicoData.Descripcion"></span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="col-md-12">
                                                <b class="title_span"> Motivo:</b>
                                                <span id="ot_detalle" class="content_text" ng-bind="historicoData.MotivoDescripcion"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <b class="title_span"> Fecha:</b>
                                                <span id="ot_detalle" class="content_text" ng-bind="historicoData.FechaModificacion"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <b class="title_span"> Hora:</b>
                                                <span id="ot_detalle" class="content_text" ng-bind="historicoData.HoraModificacion"></span>
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