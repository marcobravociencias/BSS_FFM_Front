<div class="col-12">
    <div class="row">
        <div class="col-12">
            <div class="content-confirmar-usuario">
                <div class="header-confirmar-usuario">
                    <h5 class="text-center encabezado-confirmacion">DATOS AGREGADOS</h5>
                </div>
                <div class="body-confirmar-usuario">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-4">
                                <div class="row">
                                    <label class="titulos-confirmacion">* Nombre:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.nombre"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Usuario:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.usuario"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Puesto del empleado:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.puesto"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row">
                                    <label class="titulos-confirmacion">* Correo electr&oacute;nico:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.correo"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Contrasena:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.contrasena"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Fecha Ingreso:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.fechaIngreso"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row">
                                    <input type="text" class="form-control" ng-model="filterTecnicoDisponible.nombre" placeholder="Buscar..." aria-label="Text input with checkbox">
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Ciudad Natal:</label>
                                </div>
                                <form name="myForm">
                                    <div class="row" ng-repeat="ciudad in listaGeografiasSeleccionadas">
                                        <div class="col-12">
                                            <label class="respuesta-confirmacion">
                                                <input type="radio" ng-model="ciudadNatal.id" ng-value="ciudad.id">
                                                {{ciudad.nombre}}
                                            </label>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>