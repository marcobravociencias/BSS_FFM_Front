<div class="col-12">
    <div class="row">
        <div class="col-5 content_tecnicos">
            <div class="row">
                <div class="col-md-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="checkbox" ng-model="allTecnicosDisponibles" ng-true-value="true" ng-false-value="false" ng-click="checkAllTecnicosDisponibles()" aria-label="Checkbox for following text input">
                            </div>
                        </div>
                        <input type="text" class="form-control" ng-model="filterTecnicoDisponible.nombre" placeholder="Buscar..." aria-label="Text input with checkbox">
                    </div>
                </div>
            </div>
            <ul class="list_group_privilegios">
               
                    
                <div class="row_child row cursor-option div-tecnicos" ng-class="$index === 0 ? 'border-0' : 'border-tecnico'" ng-repeat="tecnico in listaTecnicosDisponibles | filter: filterTecnicoDisponible" ng-click="checkTecnicoDisponible(tecnico)">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-2">
                                <img class="img-tecnico" ng-src="${pageContext.request.contextPath}/resources/img/estructura/tecnico3.png"/>
                            </div>
                            <div class="col-8 text-left crop-text-col padding-tecnico">
                                <span class="text-privilegio" title="{{tecnico.nombre}}" ng-bind="tecnico.nombre"></span>
                            </div>
                            <div class="col-2">
                                <i ng-show="tecnico.check === 1" class="fa fa-check check-privilegio"></i>
                            </div>
                        </div>
                    </div>
                </div>
                   
            </ul>
        </div>
        <div class="col-2">
            <br/>
            <br/>
            <br/>
            <div class="row justify-content-center" >
                <label class="cursorEfect" for="ciudad_select_inserta" ng-click="asignarTecnicos()"><p class="title_campos"><i class="fa-2x fa fa-chevron-right"></i></p></label>
            </div>
            <br/>
            <br/>
            <br/>
            <div class="row justify-content-center" >
                <label class="cursorEfect" for="ciudad_select_inserta" ng-click="removerTecnico()"><p class="title_campos"><i class="fa-2x fa fa-chevron-left"></i></p></label>
            </div>
        </div>
        <div class="col-5 content_tecnicos">
            <div class="row">
                <div class="col-md-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="checkbox" ng-model="allTecnicosAsignados" ng-true-value="true" ng-false-value="false" ng-click="checkAllTecnicosAsignados()"  aria-label="Checkbox for following text input">
                            </div>
                        </div>
                        <input type="text" class="form-control" ng-model="filterTecnicoAsignado.nombre" placeholder="Buscar..." aria-label="Text input with checkbox">
                    </div>
                </div>
            </div>
            <ul class="list_group_privilegios">
                <div class="row_child row cursor-option div-tecnicos" ng-class="$index === 0 ? 'border-0' : 'border-tecnico'" ng-repeat="tecnico in listaTecnicosAsignados | filter: filterTecnicoAsignado" ng-click="checkTecnicoAsignado(tecnico)">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-2">
                                <img class="img-tecnico" ng-src="${pageContext.request.contextPath}/resources/img/estructura/tecnico3.png"/>
                            </div>
                            <div class="col-8 text-left crop-text-col padding-tecnico">
                                <span class="text-privilegio" title="{{tecnico.nombre}}" ng-bind="tecnico.nombre"></span>
                            </div>
                            <div class="col-2">
                                <i ng-show="tecnico.check === 1" class="fa fa-check check-privilegio"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</div>