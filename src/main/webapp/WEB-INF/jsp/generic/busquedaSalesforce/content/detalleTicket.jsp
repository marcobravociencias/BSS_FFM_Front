<!--div class="row">
    <div ng-show="isAbiertoOSNoticias">
        noticiasGeneralesTicket
    </div>
</div-->

<div class="col-12">
    <div class="row header-detalle">
        <div  ng-show="showTicket" class="header-back-title col-2">
            <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-undo"></span>
            </div>
            <!--div  ng-click="abrirVentanaNoticias()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-newspaper-o"></span>
            </div-->
            <div  ng-click="regresarHome()" class="container-regresar-button text-center">
                <span class="regresar-elemento fa fa-home"></span>
            </div>
        </div>
        <div  ng-show="showTicket" class="header-back-title col-10">
            <div class="alinear-derecha">
                <div class="iconsf-container">
                    <img class="img-tickets img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/tickets.png" alt="">
                </div>      
                <div class="textcontainer-header">
                    <span class="text-title-elementoh">Ticket:</span>
                    <span class="title-regresar-generic"  ng-bind="detalle.asunto"></span>
                </div>   
            </div>          
        </div>
    </div>
</div>


<div ng-show="showTicket"class="col-12 separador-according">


    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Informaci&oacute;n general</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-2 "><span class="content-first-title-head">Asunto:</span></div>
                    <div class="col-10 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.asunto}}" ng-bind="detalle.asunto"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nivel 1:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nivel1}}" ng-bind="detalle.nivel1"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nivel 2:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nivel2}}" ng-bind="detalle.nivel2"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nivel 3:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nivel3}}" ng-bind="detalle.nivel3"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero de caso:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.caseNumber}}" ng-bind="detalle.caseNumber"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Folio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.folioSd}}" ng-bind="detalle.folioSd"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha de creaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.createdDate}}" ng-bind="detalle.createdDate"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Primera fecha de agendamiento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.primerFechaAgendamiento}}" ng-bind="detalle.primerFechaAgendamiento"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha agendamiento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaAgendamiento}}" ng-bind="detalle.fechaAgendamiento"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estatus:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.status}}" ng-bind="detalle.status"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Origen:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.origin}}" ng-bind="detalle.origin"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Motivo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.motivo}}" ng-bind="detalle.motivo"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Soluci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.solucionOT}}" ng-bind="detalle.solucionOT"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">OS:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="!detalle.detalleOs.nombre">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleOs.nombre" ng-click="consultarDetalleObjectosSF(detalle.detalleOs.id, detalle.detalleOs.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleOs.nombre}}" ng-bind="detalle.detalleOs.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuenta factura:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCuentaFactura.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle"  ng-if="detalle.detalleCuentaFactura.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCuentaFactura.id, detalle.detalleCuentaFactura.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCuentaFactura.nombre}}" ng-bind="detalle.detalleCuentaFactura.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
          
        </div>

   
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12"><span class="content-first-title-head">Descripci&oacute;n:</span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12 crop-text-col"><span class="content-first-title-head-answer normal-texto-largo" title="{{detalle.description}}" ng-bind="detalle.description"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12"><span class="content-first-title-head">Comentarios:</span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12 crop-text-col"><span class="content-first-title-head-answer normal-texto-largo" title="{{detalle.comentariosSd}}" ng-bind="detalle.comentariosSd"></span></div>
                </div>
            </div>
        </div>
    </div>


    <jsp:include page="perfiles.jsp"></jsp:include>

    <br>
</div>