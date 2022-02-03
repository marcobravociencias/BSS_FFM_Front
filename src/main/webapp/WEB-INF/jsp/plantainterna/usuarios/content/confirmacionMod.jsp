<div class="col-12">
	<div class="header-confirmar-usuario">
    	<h5 class="text-center encabezado-confirmacion">DATOS AGREGADOS</h5>
	</div>
	<div class="body-confirmar-usuario">
		<div class="col-12">
			<div class="row">
			
				<div class="col-3">
                	<div id="cardFotoUsuarioMod" class="card cardFotoUsuario">
						<div class="card-body">
							<div class="top-title-ot">
                                <div class="content-top-element bars-content">
                                	<div class="row">
										<div class="col-md-9">
											<div class="custom-file">
												<input type="file" class="custom-file-input" id="fileFotoUsuarioMod" ng-model="fileFotoUsuarioMod" ng-on-change="cargarFotoUsuarioMod($event)" accept="image/*" />
												<label class="custom-file-label etiquetaFotoUsuario" title="Subir fotograf&iacute;a" for="fileFotoUsuarioMod">Cargar fotograf&iacute;a</label>
											</div>
										</div>
										<div class="col-md-3">
											<button id="btnIniciarCamaraMod" class="botonIniciarCamara" title="Tomar fotograf&iacute;a"><i class="fas fa-camera"></i></button>
										</div>
									</div>
									<div style="text-align: center; margin-top: 5px;">
										<img alt="Usuario" src="./resources/img/plantainterna/despacho/tecnicootasignada.png" class="" id="imgFotoUsuarioMod" />
									</div>
								</div>                        
							</div>
						</div>
						<div id="contenedorFootCardOtsPendienteConsulta" class="card-footer">               
							<div class="row">
								<div class="col-md-12">
									<div class="content_text">
										<div ng-if="fileFotoUsuarioMod" class="file-delete" style="text-align: center;">
											<span class="txtPieFoto">{{fileFotoUsuarioMod.nombre}} </span><i class="fa fa-trash iconoEliminarFoto" ng-click="eliminarFotoUsuarioMod()"></i>
										</div>
										<div ng-if="!fileFotoUsuarioMod" class="file-delete" style="text-align: center;">
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
						<label class="titulos-confirmacion">* Nombre: <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.nombre"></span></label>
					</div>
                    <div class="row" style="margin-top: 1em !important;">
                    	<label class="titulos-confirmacion">* Usuario: <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.usuario"></span></label>
					</div>
                    <div class="row" style="margin-top: 1em !important;">
                    	<label class="titulos-confirmacion">* Puesto empleado: <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.puesto"></span></label>
					</div>
                    <div class="row" style="margin-top: 1em !important;">
                    	<label class="titulos-confirmacion">* Correo electr&oacute;nico: <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.correo"></span></label>
					</div>
					<div class="row" style="margin-top: 1em !important;">
                    	<label class="titulos-confirmacion">* Fecha ingreso: <span class="respuesta-confirmacion" ng-bind="confirmacionModificacion.fechaIngreso"></span></label>
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
								<input type="radio" class="radioOpcCiudadNatal" ng-model="detalleUsuario.ciudadNatal" ng-value="ciudad.id" ng-click="asignarCiudadNatalMod()">&nbsp;{{ciudad.nombre}}
								</label>
							</div>
						</div>
						<span ng-if="listaCiudadesSelecionadasMod.length < 1" class="respuesta-confirmacion ciudadNatal">Sin asignar</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="modalTomarFotoUsuarioMod" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Fotograf&iacute;a del usuario</h5>
				<button id="btnCerrarCamModalTomarFotoUsuarioMod" type="button" class="btn-close" ng-click="cerrarModalTomarFotoUsuarioMod()"></button>
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row" style="text-align: center;">
						<div class="video-wrap">
						    <video id="videoMod" width="270" height="203" playsinline autoplay></video>
						</div>
						<canvas id="canvasMod" width="594" height="420" style="display: none;"></canvas>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnTomarFotoMod" type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" ng-click="obtenerFotoTomadaMod()">CAPTURAR <i class="fas fa-camera"></i></button>
			</div>
		</div>
	</div>
</div>

<script>

	async function iniciarCamaraMod() {
		swal({html: '<strong>Accediendo a la cámara...</strong>',allowOutsideClick: false});
		swal.showLoading();
		try{
			stream = await navigator.mediaDevices.getUserMedia({'audio':false, 'video':true});
			handleSuccessMod(stream);
			$("#modalTomarFotoUsuarioMod").modal({ backdrop: 'static', keyboard: false });
			$("#modalTomarFotoUsuarioMod").modal('show');
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

	function handleSuccessMod(stream) {
		window.stream = stream;
		videoMod.srcObject = stream;
	}

	btnIniciarCamaraMod.addEventListener("click", function() {
		iniciarCamaraMod();
	});

	//Tomar foto
	var context = document.getElementById('canvasMod').getContext('2d');
	btnTomarFotoMod.addEventListener("click", function() {
		context.drawImage(videoMod, 0, 0, 594, 420);
	    var imgMod = document.getElementById('canvasMod').toDataURL();
	    document.getElementById("imgFotoUsuarioMod").src = "" + imgMod;
	    stream.getTracks()[0].stop();
	});

	btnCerrarCamModalTomarFotoUsuarioMod.addEventListener("click", function() {
		stream.getTracks()[0].stop();
	});

</script>