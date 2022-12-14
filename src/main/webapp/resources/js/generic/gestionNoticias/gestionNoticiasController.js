var app = angular.module('gestionNoticiasApp', []);
var dataTableConsultaNoticias;
var objectTempAccion;

app.controller('gestionNoticiasController', ['$scope', '$q', '$filter', 'gestionNoticiasService', function ($scope, $q, $filter, gestionNoticiasService) {

	app.edicionNoticiaController($scope, gestionNoticiasService)

	$scope.isSeleccionGeografia = false;
	$scope.saveObjCopy = {}
	$scope.saveObj = {}
	$scope.fileDecargaNotica = {}
	$scope.fileDecargaNoticaCopy = {}

	$scope.noticiasCarrusel = [];
	$scope.verVistaTabla = true;
	$scope.crearNoticiaContent = false;

	$scope.saveObj.tituloPrincipal;
	$scope.saveObj.tituloSecundario;
	$scope.saveObj.urlLinkExterno;

	$scope.configPermisoAccionConsultaNoticias = false;
	$scope.configPermisoAccionCreaNoticia = false;
	$scope.configPermisoAccionEditaNoticia = false;
	$scope.configPermisoAccionEliminaNoticia = false;

	angular.element(document).ready(function () {
		$("#idBody").removeAttr("style");

		$('#fecha-inicio-crearnoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#fecha-inicio-crearnoticia').datepicker('update', new Date());


		$('#fecha-fin-crearnoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#fecha-fin-crearnoticia').datepicker('update', new Date());


		$('#filtro_fecha_inicio_consultanoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#filtro_fecha_inicio_consultanoticia').datepicker('update', new Date());


		$('#filtro_fecha_fin_consultanoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#filtro_fecha_fin_consultanoticia').datepicker('update', new Date());
		$('#modal-geografia-creacion').on('hidden.bs.modal', function () {
			$scope.isSeleccionGeografia = false;
			let clustersparam = $("#jstre-content-geofrafia").jstree("get_selected", true)
				.filter(e => e.original.nivel == $scope.nivelGeografia)
				.map(e => parseInt(e.id))

			if (clustersparam.length > 0) {
				$scope.isSeleccionGeografia = true;
			}
			$scope.$apply()
		});
		$('#modal-geografia-creacion').on('shown.bs.modal', function () {
			$("#searchGeo").focus();
		});
		$('#modal-geografia-consulta').on('shown.bs.modal', function () {
			$("#searchGeoConsulta").focus();
		});
	});

	function compareGeneric(a, b) {
		let niveluno = a.nivel;
		let niveldos = b.nivel;
		if (niveluno > niveldos) {
			return -1
		} else if (niveluno < niveldos) {
			return 1
		}
		return 0
	}

	$scope.obtenerNivelUltimoJerarquia = function () {
		return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
	}
	
	$scope.abrirModalGeografiaCreacion = function () {
		$('#searchGeo').val('');
		$("#jstre-content-geofrafia").jstree("search", '');
		$("#modal-geografia-creacion").modal('show')
	}
	$('#searchGeo').on('keyup', function () {
		$("#jstre-content-geofrafia").jstree("search", this.value);
	})
	$scope.eliminarArchivoDescarga = function () {
		$scope.fileDecargaNotica = {}
		$("#cargarArchivoDescarga").val('');
	}
	$scope.cargarArchivoDescarga = function (e) {
		$scope.fileDecargaNotica = {}
		if (e.target.files[0]) {
			let nombreArchivo = e.target.files[0].name;
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				$scope.fileDecargaNotica = {
					"archivo": base64[1],
					"nombre": nombreArchivo
				};
				$scope.$apply();
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}
	$scope.triggerArchivoDescarga = function () {
		$("#cargarArchivoDescarga").click();
	}


	$scope.fileCargaArchivoNoticia = {}
	$scope.removerImagenCreacion = function () {
		$scope.fileCargaArchivoNoticia = {}
		$("#archivoCrearNoticia").val('');
	}

	$scope.triggerInputFile = function () {
		$("#archivoCrearNoticia").click();
	}
	$scope.cargarFotoNoticiaRegistro = function (e) {
		$scope.fileCargaArchivoNoticia = {}
		if (e.target.files[0]) {
			let nombreArchivo = e.target.files[0].name;
			let reader = new FileReader();
			var archivoCargado = nombreArchivo.split(".");
			var extensionArchivo = archivoCargado[archivoCargado.length - 1].toLowerCase();
			if (extensionArchivo == "png" || extensionArchivo == "jpg" || extensionArchivo == "jpeg" || extensionArchivo == "gif" ||
				extensionArchivo == "tiff" || extensionArchivo == "psd" || extensionArchivo == "bmp" || extensionArchivo == "svg") {
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = function () {
					let base64 = reader.result.toString().split(",");
					$scope.fileCargaArchivoNoticia = {
						"archivo": base64[1],
						"nombre": nombreArchivo
					};
					$scope.$apply();
				};
				reader.onerror = function (error) {
					console.log('Error: ', error);
				};
			} else {
				swal("Formato no v??lido", "Asegurate de seleccionar un archivo en formato de imagen.", "warning");
			}
		}
	}



	$scope.listaGeografias = []

	$scope.initConsultaMetodo = function () {
		let paramsConfiguracionDespacho = {
			moduloAccionesUsuario: 'noticiasAppFFM'
		};

		swal({ text: 'Cargando ...', allowOutsideClick: false });
		swal.showLoading();
		$q.all([
			gestionNoticiasService.consultaGeografias(),
			gestionNoticiasService.consultarConfiguracionDespachoDespacho(paramsConfiguracionDespacho),

		]).then(function (results) {
			$scope.listadogeografiacopy = results[0].data.result.geografia
			let resultConf = results[1].data.result
			if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
				let llavesResult = results[1].data.result.MODULO_ACCIONES_USUARIO.llaves;
				$scope.nivelGeografia = llavesResult.N_FILTRO_GEOGRAFIA ? llavesResult.N_FILTRO_GEOGRAFIA : undefined
				$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
				validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
				validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
			}

			if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
				$scope.configPermisoAccionConsultaNoticias = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarNoticias" })[0] != undefined);
				$scope.configPermisoAccionCreaNoticia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionCreacionNoticias" })[0] != undefined);
				$scope.configPermisoAccionEditaNoticia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionEdicionNoticias" })[0] != undefined);
				$scope.configPermisoAccionEliminaNoticia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionEliminarNoticias" })[0] != undefined);
				objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
				objectTempAccion.inicializarBotonAccionesRecientes();
			}

		
			if(!$scope.configPermisoAccionConsultaNoticias && $scope.configPermisoAccionCreaNoticia){
				$scope.abrirModalCrearNoticia();
			}

			$(".text-accion-nopermiso").css('display','block');

			if (results[0].data.result.geografia.length > 0) {
				let listGeografias = [];
				if ($scope.nivelGeografia != undefined) {
					$scope.nivelGeografia = parseInt($scope.nivelGeografia)
					results[0].data.result.geografia.forEach(elemento => {
						if (elemento.nivel <= $scope.nivelGeografia) {
							listGeografias.push(elemento);
							$scope.listaGeografias.push(elemento);
						}
					});
				} else {
					listGeografias = results[0].data.result.geografia;
					$scope.listaGeografias = results[0].data.result.geografia;
					$scope.nivelGeografia = parseInt($scope.obtenerNivelUltimoJerarquia())
				}
				let geografia = angular.copy(listGeografias);
				let geografiaConsulta = angular.copy(listGeografias)

				geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
				geografia.map((e) => {
					e.parent = e.padre == null ? 0 : e.padre;
					e.text = e.nombre;
					e.icon = "fa fa-globe";
					e.state = {
						opened: true,
						selected: false,
					}
					return e
				})

				geografiaConsulta.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
				geografiaConsulta.map((e) => {
					e.parent = e.padre == null ? 0 : e.padre;
					e.text = e.nombre;
					e.icon = "fa fa-globe";
					e.state = {
						opened: true,
						selected: true,
					}
					return e
				})
				$('#jstre-content-geofrafia').bind('loaded.jstree', function (e, data) {
					$(this).jstree("open_all");
				}).jstree({
					'plugins': ['search', 'checkbox', 'wholerow'],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons": false
						}
					}
				});

				$('#jstre-content-geofrafia-edicon').bind('loaded.jstree', function (e, data) {
				}).jstree({
					'plugins': ['search', 'checkbox', 'wholerow'],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaConsulta,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons": false
						}
					}
				});
				if ($scope.configPermisoAccionConsultaNoticias || $scope.configPermisoAccionCreaNoticia) {
					$('#jstre-content-geofrafia-consulta').bind('loaded.jstree', function (e, data) {
						$(this).jstree("open_all");
						setTimeout(function () {
							$scope.consultarNoticias();
						}, 1000)
					}).jstree({
						'plugins': ['search', 'checkbox', 'wholerow'],
						'search': {
							"case_sensitive": false,
							"show_only_matches": true
						},
						'core': {
							'data': geografiaConsulta,
							'themes': {
								'name': 'proton',
								'responsive': true,
								"icons": false
							}
						}
					});
				}else{
					swal.close();
				}

			} else {
				toastr.warning('??No existen geograf??as actualmente!');
			}

		});
	}

	$scope.initConsultaMetodo()
	$scope.isHideOverflowNoticias = false
	abrirImagenSize = function (instanciaThis) {
		$("#full-image").attr("src", $(instanciaThis).attr("src"));
		$('#image-viewer').show();
		$scope.isHideOverflowNoticias = true
		$scope.$apply()
	}
	$scope.cerrarGestionNotica = function () {
		$('#image-viewer').hide();
		$scope.isHideOverflowNoticias = false
	}
	$scope.consultarNoticias = function () {

		if (!swal.isVisible()) {
			swal({ text: 'Consultando noticias ...', allowOutsideClick: false });
			swal.showLoading();
		}

		if (dataTableConsultaNoticias != undefined) {
			dataTableConsultaNoticias.destroy()
			$('#datatable-noticias tbody').empty();
		}
		$scope.searconsultaDatatableValue = ''
		$q.all([
			gestionNoticiasService.consultarNoticiasGeneric()
		]).then(function (results) {
			if (results[0].data != undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result != undefined && results[0].data.result.noticias) {
						$scope.litadoNoticiasTemp = results[0].data.result.noticias
						let arratNoticias = results[0].data.result.noticias;
						$scope.noticiasCarrusel = results[0].data.result.noticias;

						angular.forEach(arratNoticias, function (el, index) {
							el.fechaInicio = el.fechaInicio.substring(0, el.fechaInicio.indexOf(" "))
							el.fechaExpiracion = el.fechaExpiracion.substring(0, el.fechaExpiracion.indexOf(" "))

							let iconPermanente = ``;

							if (el.permanente)
								iconPermanente = `
									<div class="content-success-generic">
										<i class="icono-success-generic fas fa-check"></i>                                        
									</div>`

							let htmlDescarga = '';
							if (el.urlArchivo) {
								htmlDescarga = `
									<a href="${el.urlArchivo}" download>
										<span class="descarga-archivo"> ${el.nombreArchivo} </span> 
									</a>
								`
							}

							let htmlLinkExterno = '';
							if (el.urlArchivo) {
								htmlLinkExterno = `
									<span onclick="window.open( '${el.urlLinkExterno}', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');" class="consultaLinkExterno"> ${el.urlLinkExterno} </span>
								`
							}

							let buttonEditar = `<button onclick="abrirModalEdicion( ${index} )" type="button" class="btn btn-sm btn-primary btn-editar-noticia ">
													<i class="fas fa-pencil-alt"></i>					
							  					</button>`;
							let buttonEditarNoPermiso = `<button type="button" class="btn btn-sm btn-primary btn-editar-noticia " title="No tienes permisos para editar" style="cursor:no-drop;opacity:0.3 !important;padding:2.3px 10.7px">
												  <i class="fas fa-unlock"></i>					
												</button>`;
							if (!$scope.configPermisoAccionEditaNoticia) {
								buttonEditar = buttonEditarNoPermiso;
							}
							let buttonEliminar = `<button onclick="abrirModalEliminar( ${index} )" type="button" class="btn btn-sm btn-eliminar-noticia ">
													<i class="fas fa-trash-alt"></i>					
							  					</button>`;
							let buttonEliminarNoPermiso = `<button type="button" class="btn btn-sm btn-eliminar-noticia " title="No tienes permisos para eliminar" style="cursor:no-drop;opacity:0.3 !important;padding:2.3px 10.7px">
												  <i class="fas fa-unlock"></i>					
												</button>`;
							if (!$scope.configPermisoAccionEliminaNoticia) {
								buttonEliminar = buttonEliminarNoPermiso;
							}
							let tableelemetn = `
							<tr>
								<td> 	<img   onclick="abrirImagenSize(this)"  class="banner-file-noticias hover-overlay" src="${el.urlBanner}">  </td>
								<td> 	${htmlDescarga} </td>
								<td>  	<span class="consultaTituloPrinc text-tooltip-parent"> ${el.tituloPrincipal} </span> </td>
								<td>  	<span class="consultaTituloSecund text-tooltip-parent"> ${el.tituloSecundario}  </span> </td>
								<td>  	<span class="text-tooltip-parent"> ${htmlLinkExterno}</span> </td>
								<td>  	${iconPermanente} </td>
								<td>  	<span class="consultaFechaNoticia text-tooltip-parent"> ${el.permanente ? 'NA' : el.fechaInicio}</span>  </td>
								<td>  	<span class="consultaFechaNoticia text-tooltip-parent"> ${el.permanente ? 'NA' : el.fechaExpiracion} </span>   </td>
								<td>  	
								<div class="tooltip-btn"> 
											<span class="tooltiptext-btn"> ${el.detalle}
											</span>
											<span class="consultaDetalleNoticia"> ${el.detalle}  </span>
											</div> 
								</td>
								<td>  	`+ buttonEditar +` `+ buttonEliminar +` 
								</td>

							</tr>	
							`
							$("#datatable-noticias tbody").append(tableelemetn)
						})

						$scope.initDatatableNoticias()
					} else {
						swal.close()
						$scope.initDatatableNoticias()

					}
				} else {
					swal.close()
					$scope.initDatatableNoticias()

				}
			} else {
				swal.close()
				$scope.initDatatableNoticias()
			}
		});
	}
	$scope.initDatatableNoticias = function () {
		dataTableConsultaNoticias = $('#datatable-noticias').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": true,
			"ordering": true,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
			"aoColumnDefs": [
				{ "aTargets": [9], "bSortable": false }
			]
		})
		swal.close()
	}
	$scope.searchDatatableNoticia = function (event) {
		if (dataTableConsultaNoticias != undefined)
			dataTableConsultaNoticias.search($scope.searconsultaDatatableValue).draw()
	}



	$scope.registrarNoticia = function () {

		if (!$scope.validarRegistroNoticia()) {

			if ($scope.mostrarFechasDefinidas) {
				$('#fecha-inicio-crearnoticia').datepicker('update', new Date());
				$('#fecha-fin-crearnoticia').datepicker('update', new Date());
			}

			let arrayDataInicio = document.getElementById('fecha-inicio-crearnoticia').value.split('/');
			let arrayDataFin = document.getElementById('fecha-fin-crearnoticia').value.split('/');

			let formatFechaInicio = arrayDataInicio[2] + "-" + arrayDataInicio[1] + "-" + arrayDataInicio[0]
			let formatFechaFin = arrayDataFin[2] + "-" + arrayDataFin[1] + "-" + arrayDataFin[0]

			$scope.saveObj.archivoBanner = $scope.fileCargaArchivoNoticia.archivo ? $scope.fileCargaArchivoNoticia.archivo : '';
			$scope.saveObj.nombreBanner = $scope.fileCargaArchivoNoticia.nombre ? $scope.fileCargaArchivoNoticia.nombre : '';

			$scope.saveObj.archivoArchivo = $scope.fileDecargaNotica.archivo ? $scope.fileDecargaNotica.archivo : '';
			$scope.saveObj.nombreArchivo = $scope.fileDecargaNotica.nombre ? $scope.fileDecargaNotica.nombre : '';

			$scope.saveObj.fechaInicio = formatFechaInicio;
			$scope.saveObj.fechaExpiracion = formatFechaFin;

			$scope.saveObj.permanente = $scope.mostrarFechasDefinidas ? 1 : 0;

			$scope.saveObj.urlLinkExterno = $scope.saveObj.urlLinkExterno ? $scope.saveObj.urlLinkExterno : ''
			$scope.saveObj.detalle = $scope.saveObj.detalle ? $scope.saveObj.detalle : ''

			let selectedElements = $("#jstre-content-geofrafia").jstree("get_selected", true);

			//si se selecciona todo solo enviar 1
			if (selectedElements.length >= $scope.listaGeografias.length) {
				geografiaEnvio = [1]
			} else {
				geografiaEnvio = selectedElements.filter(e => e.original.nivel == $scope.nivelGeografia)
					.map(e => parseInt(e.id))
			}

			$scope.saveObj.idGeografias = geografiaEnvio;
			$scope.saveObj.soloImagen = $scope.soloImagenCheck == true ? 1 : 0;
			swal({ text: 'Guardando registro...', allowOutsideClick: false });
			swal.showLoading();
			let tituloAccion = "Crear noticia";
			let mensajeEnvio = 'Ha ocurrido un error al crear la noticia: ' + $scope.saveObj.tituloPrincipal + ' / ' + $scope.saveObj.tituloSecundario;
			gestionNoticiasService.registrarNoticia($scope.saveObj).then((result) => {
				swal.close()
				if (result.data !== undefined) {
					if (result.data.respuesta) {
						mensajeEnvio = "Se ha creado la noticia: " + $scope.editObj.tituloPrincipal + ' / ' + $scope.editObj.tituloSecundario;
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
						toastr.success(result.data.result.description);
						$scope.limpiarFormularioCrearNotica();
						$scope.consultarNoticias();
					} else {
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						toastr.warning(result.data.resultDescripcion)
					}
				} else {
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
					toastr.warning(result.data.resultDescripcion)
				}
			}).catch((err) => handleError(err));
		}
	}


	$scope.limpiarFormularioCrearNotica = function () {
		$scope.saveObj = {}
		$scope.removerImagenCreacion()
		$scope.eliminarArchivoDescarga()
		$('#fecha-inicio-crearnoticia').datepicker('update', new Date());
		$('#fecha-fin-crearnoticia').datepicker('update', new Date());
	}


	$scope.validarRegistroNoticia = function () {

		let isErrorRegistro = false;
		let textErrorRegistro = ""

		if (!$scope.fileCargaArchivoNoticia.archivo) {
			textErrorRegistro += '<li>Selecciona una imagen para el banner</li>';
			isErrorRegistro = true
		}

		if(!$scope.soloImagenCheck){
			if (!$scope.saveObj.tituloPrincipal) {
				textErrorRegistro += '<li>Captura t??tulo principal</li>';
				isErrorRegistro = true
			}

			if (!$scope.saveObj.tituloSecundario) {
				textErrorRegistro += '<li>Captura t??tulo secundario</li>';
				isErrorRegistro = true
			}
		}

		if (!$scope.saveObj.detalle) {
			textErrorRegistro += '<li>Captura detalle</li>';
			isErrorRegistro = true
		}

		let clustersparam = $("#jstre-content-geofrafia").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nivelGeografia)
			.map(e => parseInt(e.id))
		if (clustersparam <= 0) {
			isErrorRegistro = true
			textErrorRegistro += '<li>Selecciona un dato de la geografias</li>';
		}
		if (!$scope.mostrarFechasDefinidas) {
			if (document.getElementById('fecha-inicio-crearnoticia').value.trim() != "" && document.getElementById('fecha-fin-crearnoticia').value.trim() != "") {
				var inicio = document.getElementById('fecha-inicio-crearnoticia').value.split('/');
				var fin = document.getElementById('fecha-fin-crearnoticia').value.split('/');
				var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
				var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
				if (date_inicio > date_fin) {
					isErrorRegistro = true
					textErrorRegistro += '<li>La fecha inicial no tiene que ser mayor a la final</li>';
				}
			}
		}

		if (isErrorRegistro)
			toastr.info(textErrorRegistro)

		return isErrorRegistro;
	}
	/** Funciones de consultas   */
	$scope.filtroConsulta = {}
	$scope.abrirModalGeografiaConsulta = function () {
		$('#searchGeoConsulta').val('');
		$("#jstre-content-geofrafia-consulta").jstree("search", '');
		$("#modal-geografia-consulta").modal('show')
	}

	$('#searchGeoConsulta').on('keyup', function () {
		$("#jstre-content-geofrafia-consulta").jstree("search", this.value);
	});

	$scope.cambiarVistaConsultaNoticias = function () {
		$scope.verVistaTabla = !$scope.verVistaTabla;
	}

	$scope.abrirModalCrearNoticia = function () {
		$scope.soloImagenCheck = false;
		$scope.crearNoticiaContent = true;
	}

	$scope.masZoomImagenRegistro = function () {
		$("#imgNoticiaRegistro").css("object-fit", "cover");
	}

	$scope.menosZoomImagenRegistro = function () {
		$("#imgNoticiaRegistro").css("object-fit", "contain");
	}

	$scope.desplazarDerechaCarruselImgNoticiasRegistro = function () {
		$('#carruselImgNoticiasRegistro').animate({ scrollLeft: '+=100' }, 150);
	}

	$scope.desplazarIzqCarruselImgNoticiasRegistro = function () {
		$('#carruselImgNoticiasRegistro').animate({ scrollLeft: '-=100' }, 150);
	}

	$scope.regresarInicioCarruselImgNoticiasRegistro = function () {
		$('#carruselImgNoticiasRegistro').animate({ scrollLeft: '=0' }, 150);
	}
	
	$scope.cambiarTipoDeRegistroNoticia = function() {
		if($scope.soloImagenCheck){
			$("#tituloPrincipal").val("NA");
			$("#tituloSecundario").val("NA");
			$scope.saveObj.tituloPrincipal = "NA";
			$scope.saveObj.tituloSecundario = "NA";
		}else{
			$("#tituloPrincipal").val("");
			$("#tituloSecundario").val("");
			$scope.saveObj.tituloPrincipal = "";
			$scope.saveObj.tituloSecundario = "";
		}
	}

}]);

