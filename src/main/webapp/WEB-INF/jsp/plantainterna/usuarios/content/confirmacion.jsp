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
                                    <label class="titulos-confirmacion">* Contrase&nacute;a:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.contrasena"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Fecha ingreso:</label>
                                    <div class="input-group mb-3">
                                        <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.fechaIngreso"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                            	<div class="row">
                                	<div class="col-md-12">
                                    	<div class="input-group input-group-sm content-seach-group">
                                        	<input type="text" class="form-control buscadorGenerico" ng-model="buscarCiudad" placeholder="Buscar ciudad"> 
                                        	<span class="fa fa-search iconoBusqueda"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="titulos-confirmacion">* Ciudad natal:</label>
                                </div>
                                <form name="myForm">
                                	<div id="contenedorConfirmacionRegistro" class="scrollListaCiudadNatal">
	                                    <div class="row" ng-repeat="ciudad in listaCiudadNatalRegistro | filter:buscarCiudad track by $index">
	                                        <div class="col-12">
	                                            <label class="respuesta-confirmacion ciudadNatal">
	                                                <input type="radio" ng-model="informacionRegistro.ciudadNatal" ng-value="ciudad.id" ng-click="asignarCiudadNatalRegistro()">
	                                                {{ciudad.nombre}}
	                                            </label>
	                                        </div>
	                                    </div>
	                                    <span ng-if="listaGeografiasSeleccionadas == ''" class="respuesta-confirmacion ciudadNatal">
											Sin asignar
										</span>
									</div>
								
                                </form>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div style="text-align: right; margin: 1em 0 0 0;">
                            <input type="button" class="btn btn-primary" ng-click="guardarUsuario()" value="GUARDAR">
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>