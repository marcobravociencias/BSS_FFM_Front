<div class="col-12">

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
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.nombre"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Usuario:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.usuario"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Puesto del empleado:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.puesto"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row">
                                    <label class="titulos-confirmacion">* Correo electr&oacute;nico:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.correo"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Fecha ingreso:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.fechaIngreso"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                            	<div class="row">
                                	<div class="col-md-12">
                                    	<div class="input-group input-group-sm content-seach-group">
                                        	<input type="text" class="form-control buscadorGenerico" ng-model="buscarCiudadMod" placeholder="Buscar ciudad"> 
                                        	<span class="fa fa-search iconoBusqueda"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Ciudad natal:</label>
                                </div>
                                	<div id="contenedorconfirmacionModificacion" class="scrollListaCiudadNatalMod">
	                                    <div class="row" ng-repeat="ciudad in listaCiudadNatalMod | filter:buscarCiudadMod track by $index" ng-if="ciudad.nombre != null">
	                                        <div class="col-12">
	                                            <label class="respuesta-confirmacion ciudadNatalMod">
	                                                <input type="radio" ng-model="detalleUsuario.ciudadNatal" ng-value="ciudad.id" ng-click="asignarCiudadNatalMod()">
	                                                {{ciudad.nombre}}
	                                            </label>
	                                        </div>
	                                    </div>
	                                    <span ng-if="listaCiudadesSelecionadasMod.length < 1" class="respuesta-confirmacion ciudadNatal">
											Sin asignar
										</span>
									</div>
                            </div>
                        </div>
                    </div>
                </div>
</div>