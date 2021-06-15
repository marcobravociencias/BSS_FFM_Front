<div class="col-12">
    <div class="row">
        <div class="col-5">
            <h6 class="text-center titulo-opciones">FFM TOTALPLAY EMPRESARIAL *</h6>
            <hr/>
            <div class="col-12">
                <div class="row">
                    <div  id="tree_arbol_empresarial_mod" class="jstree-proton-3 proton-demo">											
					</div>
                </div>
            </div>
        </div>
        <div class="offset-2 col-5">
            <h6 class="text-center titulo-opciones">SELECCI&Oacute;N *</h6>
            <hr/>
            <div class="col-12">
                <div class="row">
                    <div class="col-6">
                        <span class="text-head-table-arbol"><li class="fa fa-crosshairs"></li>&nbsp;Ciudades:</span>
                    </div>
                    <div class="col-6" ng-show="mostrarDistritoRegistro">
                        <span class="text-head-table-arbol"><li class="fa fa-cubes"></li>&nbsp;Distritos:</span>
                    </div>
                </div>
                <div class="row padding_resumen_ciudades" ng-repeat="ciudad in arbolTable">
                    <div class="col-6">
                        <span class="text-body-table-arbol" ng-bind="ciudad.nombreCiudad"></span>
                    </div>
                    <div class="col-6" ng-show="mostrarDistritoRegistro">
                        <li class="item_ciudad_resum text-body-table-arbol" ng-repeat="distrito in ciudad.distritos" ng-bind="distrito.nombreDistrito"></li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>