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
                        	<div class="col-3">
                        		<div id="cardFotoUsuarioRegistro" class="card cardFotoUsuario">
			                        <div class="card-body">
			                            <div class="top-title-ot">
			                                <div class="content-top-element bars-content">
			                                    <div class="row">
						                        	<div class="col-md-3">
						                        		<div class="custom-file">
								                            <input type="file" class="custom-file-input" id="fileFotoUsuario" ng-model="fileFotoUsuario" ng-on-change="cargarFotoUsuarioRegistro($event)" accept="image/*" />
								                            <label class="custom-file-label etiquetaFotoUsuario" title="Subir fotograf&iacute;a" for="fileFotoUsuario"></label>
								                        </div>
						                        	</div>
						                        	<div id="contenedorBtnIniciarCamara" class="col-md-3 offset-6">
						                        		<button id="btnIniciarCamara" class="botonIniciarCamara" title="Tomar fotograf&iacute;a"><i class="fas fa-camera"></i></button>
						                        	</div>		                        	
						                        </div>
						                        <div style="text-align: center; margin-top: 5px;">
						                            <img alt="Usuario" ng-src="./resources/img/plantainterna/despacho/tecnicootasignada.png" class="" id="imgFotoUsuario" />
						                        </div>
			                                </div>                        
			                            </div>
			                        </div>
			                        
			                        <div id="contenedorFootCardOtsPendienteConsulta" class="card-footer">               
										<div class="row">
											<div class="col-md-12">
												<div class="content_text">
													<div ng-if="fileFotoUsuario" class="file-delete" style="text-align: center;">
						                            	<span class="txtPieFoto">{{fileFotoUsuario.nombre}} </span><i class="fa fa-trash iconoEliminarFoto" ng-click="eliminarFotoUsuarioRegistro()"></i>
							                        </div>
							                        <div ng-if="!fileFotoUsuario" class="file-delete" style="text-align: center;">
							                        	<span class="txtPieFoto">Sin fotograf&iacute;a </span>
							                        </div>
												</div>
											</div>
										</div>                
									</div>
			                        
			                    </div>
                        	</div>
                        	
                            <div class="col-5" style="padding-left: 2em;">
                            	<div class="row">
                                    <label class="titulos-confirmacion">* Nombre: <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.nombre"></span></label>
                                </div>
                                <div class="row" style="margin-top: 1em !important;">
                                    <label class="titulos-confirmacion">* Usuario: <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.usuario"></span></label>
                                </div>
                                <div class="row" style="margin-top: 1em !important;">
                                    <label class="titulos-confirmacion">* Puesto empleado: <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.puesto"></span></label>
                                </div>
                                <div class="row" style="margin-top: 1em !important;">
                                    <label class="titulos-confirmacion">* Correo electr&oacute;nico: <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.correo"></span></label>
                                </div>
                                <div class="row" style="margin-top: 1em !important;">
                                    <label class="titulos-confirmacion">* Contrase&ntilde;a: <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.contrasena"></span></label>
                                </div>
                                <div class="row" style="margin-top: 1em !important;">
                                    <label class="titulos-confirmacion">* Fecha ingreso: <span class="respuesta-confirmacion" ng-bind="confirmacionRegistro.fechaIngreso"></span></label>
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
	                                                <input type="radio" class="radioOpcCiudadNatal" ng-model="informacionRegistro.ciudadNatal" ng-value="ciudad.id" ng-click="asignarCiudadNatalRegistro()">&nbsp;{{ciudad.nombre}}
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
                    <div class="row" ng-show="!existeUsuarioValidacion">
                        <div style="text-align: right; margin: 1em 0 0 0;">
                            <input type="button" class="btn btn-primary" ng-click="guardarUsuario()" value="GUARDAR">
                        </div> 
                    </div>
                    <div class="row" style="margin-top: 1em; text-align: right;" ng-show="existeUsuarioValidacion">
					    <div class="col-md-12">
							<div class="message-password-warning">
								<span><i class="fas fa-warning"></i>&nbsp; Revise la informaci&oacute;n ingresada, existen datos duplicados.</span>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
        
    </div>
</div>

<div id="modalTomarFotoUsuario" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Fotograf&iacute;a del usuario</h5>
				<button id="btnCerrarCamModalTomarFotoUsuario" type="button" class="btn-close" ng-click="cerrarModalTomarFotoUsuario()"></button>
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row" style="text-align: center;">
						<div class="video-wrap">
						    <video id="video" width="270" height="203" playsinline autoplay></video>
						</div>
						<canvas id="canvas" width="594" height="420" style="display: none;"></canvas>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnTomarFoto" type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" ng-click="obtenerFotoTomada()">CAPTURAR <i class="fas fa-camera"></i></button>
			</div>
		</div>
	</div>
</div>

<script>

	var stream;

	async function iniciarCamara() {
		swal({html: '<strong>Accediendo a la cámara...</strong>',allowOutsideClick: false});
		swal.showLoading();
		try{
			stream = await navigator.mediaDevices.getUserMedia({'audio':false, 'video':true});
			handleSuccess(stream);
			$("#modalTomarFotoUsuario").modal({ backdrop: 'static', keyboard: false });
			$("#modalTomarFotoUsuario").modal('show');
			swal.close();
		} catch (e) {
			console.log(e.toString());
			swal.close();
        	swal({
		        title: "No fue posible acceder a la cámara",
		        text: "Esto se debe a que tu equipo de cómputo no cuenta con web cam o tu navegador no tiene habilitado el permiso de acceso a la cámara.",
		        imageUrl: './resources/img/plantainterna/usuario/accesoCamWeb.PNG',
		        imageWidth: 300,
		        imageHeight: 100,
		        type: "warning",
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Entendido',
		      }).then(function (isConfirm) {
	    	      
		      });
		}
	}

	function handleSuccess(stream) {
		window.stream = stream;
	  	video.srcObject = stream;
	}

	btnIniciarCamara.addEventListener("click", function() {
		iniciarCamara();
	});

	//Tomar foto
	var contextRegistro = document.getElementById('canvas').getContext('2d');
	btnTomarFoto.addEventListener("click", function() {
		contextRegistro.drawImage(video, 0, 0, 594, 420);
	    var img = canvas.toDataURL();
	    document.getElementById("imgFotoUsuario").src = "" + img;
	    stream.getTracks()[0].stop();
	});

	btnCerrarCamModalTomarFotoUsuario.addEventListener("click", function() {
		stream.getTracks()[0].stop();
	});

</script>