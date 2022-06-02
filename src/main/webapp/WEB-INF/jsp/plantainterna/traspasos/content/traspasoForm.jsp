<div class="wizard-v1-content">
    <button ng-click="isTraspaso=false" type="button" class="btn-close" style="float: right; padding: 0.5em;"></button>

    <div class="wizard-form">
        <div class="form-register" id="form-register" action="#" method="post" novalidate="novalidate">
            <div id="form-total" role="application" class="wizard clearfix">
                <div class="steps clearfix">
                    <ul role="tablist">
                       
                        <li role="tab" id="wizzard-1" class="tab-step-wizar first" aria-disabled="false" aria-selected="true" ng-click="mostrarTab(1)">
                            <a id="form-total-t-0" href="" aria-controls="form-total-p-0">
                                <div class="title">
                                    <span class="step-icon"><i class="fa fa-info"></i></span>
                                    <span class="step-text">Informaci&oacute;n cliente</span>
                                </div>
                            </a>
                        </li>

                        <li role="tab"  id="wizzard-2" class="tab-step-wizar" aria-disabled="false" aria-selected="false" style="padding-right: 2px !important;" 
                            ng-click="mostrarTab(2);abrirOpcionUbicacion();">
                            <a id="form-total-t-1" href="" aria-controls="form-total-p-1">
                                <div class="title">
                                    <span class="step-icon"><i class="fa fa-map-marker-alt"></i></span>
                                    <span class="step-text">Ubicaci&oacute;n</span>
                                </div>
                            </a>
                        </li>									
                        <li role="tab" id="wizzard-3" class="tab-step-wizar" aria-disabled="false"  style="margin-left: 85px !important; padding-right: 35px !important;" aria-selected="false" ng-click="mostrarTab(3)">
                            <a id="form-total-t-2" href="" aria-controls="form-total-p-2">
                                <span class="current-info audible"> </span>
                                <div class="title">
                                    <span class="step-icon"><i class="fas fa-calendar-check"></i></span>
                                    <span class="step-text">Disponibilidad</span>
                                </div>
                            </a>
                        </li>
                        <li role="tab" id="wizzard-4" class="tab-step-wizar last " aria-disabled="false" aria-selected="false" style="margin-left: 30px !important;" ng-click="mostrarTab(4)">
                            <a id="form-total-t-3" href="" aria-controls="form-total-p-3">
                                <div class="title">
                                    <span class="step-icon"><i class="fa fa-list-alt"></i></span>
                                    <span class="step-text">Resumen</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <form name="guardadoForm" >
            <div class="contenedor-steps">
                <div class="content-steps text-center border border-light p-5" style="padding: 1em!important;" ng-show="elementTab === 1">
                    <jsp:include page="./../contentForm/informacionCliente.jsp"></jsp:include>			
                </div>
                <div class="content-steps text-center border border-light p-5" style="padding: 1em!important;" ng-show="elementTab === 2">
                    <jsp:include page="./../contentForm/ubicacion.jsp"></jsp:include>
                </div>	
                <div class="content-steps text-center border border-light p-5" style="padding: 1em!important; border-color: white!important;" ng-show="elementTab === 3">
                    <jsp:include page="./../contentForm/disponibilidad.jsp"></jsp:include>					
                </div>					
                <div class="content-steps text-center border border-light p-5" style="padding: 1em!important;" ng-show="elementTab === 4">
                    <jsp:include page="./../contentForm/resumen.jsp"></jsp:include>	
                </div>
            </div>
        </form>
    </div>
</div>