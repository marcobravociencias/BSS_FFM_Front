<div class="col-12">
    <div class="row header-privilegios">
        <div class="col-4 columna_padre" ng-repeat="privilegio in privilegiosPrincipal">
            <div class="row_child row">
                <div class="col-2 div_izquierdo_permiso" ng-class="'bg-color' + privilegio.color">
                    <img ng-src="${pageContext.request.contextPath}/resources/img/estructura/{{privilegio.img}}"/>
                </div>
                <div class="col-10 div_derecho_permiso">
                    <span class="text-privilegio-principal" ng-bind="privilegio.nombre"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-5 content_privilegios">
            <div class="row">
                <div class="col-12 padding-select-all text-right">
                    <span class="span-seleccion-all">Seleccionar todos</span>
                    <input type="checkbox" ng-click="selectAllDisponible()" ng-model="allDisponible" ng-true-value="true" ng-false-value="false">
                </div>
            </div>
            <ul class="list_group_privilegios">
                <li class="columna_padre" ng-repeat="privilegio in privilegiosDisponibles">
                    
                    <div class="row_child row cursor-option" ng-click="checkDisponibilidad($index)">
                        <div class="col-2 div_izquierdo_permiso" ng-class="'bg-color' + privilegio.color">
                            <img ng-src="${pageContext.request.contextPath}/resources/img/estructura/{{privilegio.img}}"/>
                        </div>
                        <div class="col-10 div_derecho_permiso_privilegios">
                            <div class="row">
                                <div class="col-10">
                                    <span class="text-privilegio" ng-bind="privilegio.nombre"></span>
                                </div>
                                <div class="col-2">
                                    <i ng-show="privilegio.check === 1" class="fa fa-check check-privilegio"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </li>
            </ul>
        </div>
        <div class="col-2">
            <br/>
            <br/>
            <br/>
            <div class="row justify-content-center" >
                <label tag_accion="asignar" class="cursorEfect" for="ciudad_select_inserta" ng-click="asignarPrivilegios()"><p class="title_campos"><i class="fa-2x fa fa-chevron-right"></i></p></label>
            </div>
            <br/>
            <br/>
            <br/>
            <div class="row justify-content-center" >
                <label tag_accion="desasignar" class="cursorEfect" for="ciudad_select_inserta" ng-click="removerPrivilegios()"><p class="title_campos"><i class="fa-2x fa fa-chevron-left"></i></p></label>
            </div>
        </div>
        <div class="col-5 content_privilegios">
            <div class="row">
                <div class="col-12 padding-select-all text-right">
                    <span class="span-seleccion-all">Seleccionar todos</span>
                    <input type="checkbox" ng-click="selectAllAsignados()" ng-model="allAsignado" ng-true-value="true" ng-false-value="false">
                </div>
            </div>
            <ul class="list_group_privilegios">
                <li class="columna_padre" ng-repeat="privilegio in privilegiosAsignados">
                    
                    <div class="row_child row cursor-option" ng-click="checkAsignado($index)">
                        <div class="col-2 div_izquierdo_permiso" ng-class="'bg-color' + privilegio.color">
                            <img ng-src="${pageContext.request.contextPath}/resources/img/estructura/{{privilegio.img}}"/>
                        </div>
                        <div class="col-10 div_derecho_permiso_privilegios">
                            <div class="row">
                                <div class="col-10">
                                    <span class="text-privilegio" ng-bind="privilegio.nombre"></span>
                                </div>
                                <div class="col-2">
                                    <i ng-show="privilegio.check === 1" class="fa fa-check check-privilegio"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </li>
            </ul>
        </div>
    </div>
</div>