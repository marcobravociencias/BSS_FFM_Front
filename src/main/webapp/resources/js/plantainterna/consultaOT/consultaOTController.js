var app = angular.module('consultaOTApp', []);

app.controller('consultaOTController', ['$scope', '$q', 'consultaOTService', 'genericService', function ($scope, $q, consultaOTService, genericService) {

	$("#moduloConsultaOt").addClass('active')

	$scope.all_cluster = [];
	let otTabla;
	let is_consulta_info_ot = false;
	let is_consulta_comentarios = false;
	let is_consulta_historico = false;
	let is_consulta_soluciones = false;
	let is_consulta_corte_individual = false;
	let is_consulta_cambio_equipo = false;
	let is_consulta_reubicacion = false;
	let is_consulta_cambio_plan = false;
	let is_consulta_potencia = false;
	let is_consulta_equipos = false;
	let is_consulta_dispositivos = false;
	let is_consulta_ip = false;
	let is_consulta_informacion_Red = false;
	let is_consulta_actividad_tecnico = false;
	let datatable_Equipos;
	let datatable_Dispositivos;
	let dataTable_IP;
	$scope.filtrosGeneral = {};
	$scope.movimientos = [];
	$scope.comentarioConsultaOT = '';
	$scope.elementosRegistro;
	$scope.detalleSoporteObj = {};
	$scope.detallePagoObj = {};
	let isConsultaDetalleSoporte = false;
	let isConsultaDetallePago = false;
	$scope.evidenciaDetalleEquipoV = '';
	$scope.evidenciaDetalleEquipoN = '';
	let isConsultaDispositivo = false
	$scope.dispositivosArrayTemp = [];
	$scope.listadoConsultaOtsDisponibles = [];
	$scope.listEvidenciaImagenes = {};
	$scope.listImagenesTipo = [];

	let dispositivoOtTable = $('#table_dispositovos_ot').DataTable({
		"paging": true,
		"lengthChange": false,
		"info": true,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"autoWidth": true,
		"language": idioma_espanol_not_font,

	});

	$scope.consultaOT = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		$scope.elementosRegistro = 0;

		// let intervencion = $scope.filtrosGeneral.tipoOrdenes.filter(e => e.checkedOpcion).map(e => e.id)
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})

		let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
			.map(e => parseInt(e.id))
		let selectedElms = $('#jstree').jstree("get_selected", true);


		let estatusOrdenes = []
		angular.forEach($scope.filtrosGeneral.estatusdisponibles, (e, i) => {
			estatusOrdenes.push(e.id);
		})


		$.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}


		if ($.trim(document.getElementById('idot').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (estatusOrdenes.length === 0) {
			errorMensaje += '<li>Seleccione estatus.</li>';
			isValido = false
		}

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {
			if (otTabla) {
				otTabla.destroy();
			}
			let params = {
				idOrden: $.trim(document.getElementById('idot').value),
				folioSistema: $.trim(document.getElementById('idos').value),
				claveCliente: $.trim(document.getElementById('cuenta').value),
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOt').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOt').value),
				elementosPorPagina: 10
			}

			console.log(otTabla.page.info())

			console.log(params);

			otTabla = $('#otTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"ordering": false,
				"pageLength": 10,
				"ajax": {
					"url": "req/consultaOT",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}

					},
					"dataSrc": function (json) {
						$scope.elementosRegistro = json.registrosTotales
						$scope.listadoConsultaOtsDisponibles = [];
						if (json.result != undefined && json.result.ordenes != undefined)
							$scope.listadoConsultaOtsDisponibles = json.result.ordenes;

						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr)
					},
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}



	}

	$scope.realizarConversionAnidado = function (array) {
		let arrayCopy = [];
		angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {
			elemento.checkedOpcion = true;
			elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
			elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
			elemento.children.map(e => { e.checkedOpcion = true; return e; })
			arrayCopy.push(elemento)
		})
		return arrayCopy;
	}

	$scope.banderaErrorEstatus = false;
	$scope.banderaErrorIntervencion = false;
	$scope.banderaErrorGeografia = false;

	$scope.consultarCatalagosPI = function () {
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$q.all([
			genericService.consultarCatalogoIntervenciones(),
			genericService.consulCatalogoGeografia(),
			genericService.consultarCatalogoEstatusDespachoPI(),
			consultaOTService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloConsultaOt" }),

		]).then(function (results) {
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.filtrosGeneral.tipoOrdenes = $scope.realizarConversionAnidado(results[0].data.result)
					} else {
						toastr.warning('No se encontraron  tipo ordenes');
						$scope.banderaErrorIntervencion = true;
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
					$scope.banderaErrorIntervencion = true;
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
				$scope.banderaErrorIntervencion = true;
			}
			if (results[2].data !== undefined) {
				if (results[2].data.respuesta) {
					if (results[2].data.result) {
						$scope.filtrosGeneral.estatusdisponibles = $scope.realizarConversionAnidado(results[2].data.result)
					} else {
						toastr.info('No se encontraron catalogo de estatus');
						$scope.banderaErrorEstatus = true;
						swal.close();
					}
				} else {
					toastr.warning(results[2].data.resultDescripcion);
					$scope.banderaErrorEstatus = true;
					swal.close();
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de catalogo de estatus');
				$scope.banderaErrorEstatus = true;
				swal.close();
			}
			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						if (results[1].data.result.geografia) {
							$scope.listadogeografiacopy = results[1].data.result.geografia
							geografia = results[1].data.result.geografia
							geografia.map((e) => {
								e.parent = e.padre == undefined ? "#" : e.padre;
								e.text = e.nombre;
								e.icon = "fa fa-globe";
								e.state = {
									opened: false,
									selected: true,
								}
								return e
							})
							$('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
								// $scope.consultarCatalogoEstatusTecnico()
								// $scope.consultarConteoAlertasPI()
								// $scope.consultarOrdenesTrabajoAsignadasDespacho()
								// $scope.consultarOtsPendientes()
								// $scope.consultarTecnicosDisponibiles()
								// $scope.consultarCatalogosAcciones();
								$scope.consultaOT()
							}).jstree({
								'plugins': ["wholerow", "checkbox", 'search'],
								'core': {
									'data': geografia,
									'themes': {
										'name': 'proton',
										'responsive': true,
										"icons": false
									}
								}
							});
						} else {
							swal.close();
							toastr.warning('No se encontraron datos para la geografia');
							$scope.banderaErrorGeografia = true;
						}
					} else {
						swal.close();
						toastr.warning('No se encontraron datos para la geografia');
						$scope.banderaErrorGeografia = true;
					}
				} else {
					swal.close();
					toastr.warning(results[1].data.resultDescripcion);
					$scope.banderaErrorGeografia = true;
				}
			} else {
				swal.close();
				toastr.error('Ha ocurrido un error en la consulta de geografia')
				$scope.banderaErrorGeografia = true;;
			}

			if (results[3].data !== undefined) {
				if (results[3].data.respuesta) {
					if (results[3].data.result) {
						$scope.elementosConfigGeneral = new Map(Object.entries(results[3].data.result))
					} else {
						swal.close();
						toastr.warning('No se encontraron datos para la geografia');
						$scope.banderaErrorGeografia = true;
					}
				} else {
					swal.close();
					toastr.warning(results[3].data.resultDescripcion);
					$scope.banderaErrorGeografia = true;
				}
			} else {
				swal.close();
				toastr.error('Ha ocurrido un error en la consulta de geografia')
				$scope.banderaErrorGeografia = true;;
			}



		}).catch(err => handleError(err));
	}

	$scope.realizarConversionAnidado = function (array) {
		let arrayCopy = []
		angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {

			elemento.checkedOpcion = true;
			elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
			elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
			elemento.children.map(e => { e.checkedOpcion = true; return e; })

			angular.forEach(elemento.children, function (elementoJ, indexJ) {
				elementoJ.checkedOpcion = true;
				elementoJ.children = array.filter(e => e.nivel == 3 && e.idPadre == elementoJ.id)
				elementoJ.children = (elementoJ.children !== undefined && elementoJ.children.length > 0) ? elementoJ.children : []
				elementoJ.children.map(e => { e.checkedOpcion = true; return e; })
			})

			arrayCopy.push(elemento)
		})
		return arrayCopy;
	}

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

	$scope.seleccionarTodos = function (paramFiltroParent) {
		paramFiltroParent.map(function (e) {
			e.checkedOpcion = true
		})

		paramFiltroParent.map(function (e) {
			e.children.map(function (j) {
				j.checkedOpcion = true
				return j
			})
		})
	}

	$scope.deseleccionarTodos = function (paramFiltroParent) {
		paramFiltroParent.map(function (e) {
			e.checkedOpcion = false
		})
		paramFiltroParent.map(function (e) {
			e.children.map(function (j) {
				j.checkedOpcion = false
				return j
			})
		})
	}

	$scope.setCheckFiltroGeneric = function (filtroParent) {
		console.log(filtroParent.checkedOpcion)
		console.log("#####---------")
		console.log(filtroParent.children)

		filtroParent.checkedOpcion = !filtroParent.checkedOpcion
		filtroParent.children.map(function (e) {
			e.checkedOpcion = filtroParent.checkedOpcion
			return e
		})
		console.log("#####")
		console.log(filtroParent.children)
		console.log(filtroParent.checkedOpcion)
	}

	$scope.setCheckSubFiltroGeneric = function (subFiltro, parentFiltro) {
		subFiltro.checkedOpcion = !subFiltro.checkedOpcion
		let cantidadSubfiltros = parentFiltro.children.length
		let cantidadChecked = parentFiltro.children.filter(function (e) { return e.checkedOpcion }).length
		parentFiltro.checkedOpcion = cantidadSubfiltros !== cantidadChecked ? false : true
	}

	$scope.setCheckIntervencion = function (elementoInt) {
		console.log(elementoInt.checkedOpcion)
		console.log("#####---------")
		console.log(elementoInt.subfiltros)

		elementoInt.checkedOpcion = !elementoInt.checkedOpcion
		elementoInt.subfiltros.map(function (e) {
			e.checkedOpcion = elementoInt.checkedOpcion
			return e
		})
		console.log("#####")
		console.log(elementoInt.subfiltros)
		console.log(elementoInt.checkedOpcion)
	}

	$scope.setCheckSubIntervencion = function (subInt, intervencion) {
		subInt.checkedOpcion = !subInt.checkedOpcion
		let cantidadSubfiltros = intervencion.subfiltros.length
		let cantidadChecked = intervencion.subfiltros.filter(function (e) { return e.checkedOpcion }).length
		intervencion.checkedOpcion = cantidadSubfiltros !== cantidadChecked ? false : true
	}

	$scope.iniciarConsultaOt = function () {
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: true
		});
		$('.datepicker').datepicker('update', new Date());

		otTabla = $('#otTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});

		$scope.consultarCatalagosPI();
	}

	$scope.iniciarConsultaOt();


	document.getElementById('cluster').addEventListener('click', function () {
		$('#modalCluster').modal('show');
	});


	consultaImagenesOT = function (ot, cuenta) {
		let params = {
			orden: ot,
		}
		$('.idoti').text(ot);
		$('.cuenta').text(cuenta);
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$scope.listEvidenciaImagenes = {};
		consultaOTService.consultaImagenesOt(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {

					if (response.data.result === null) {
						$('#modal-imagen-ot').modal('show');
						swal.close();
					}

					if (response.data.result.evidencias) {
						$scope.listEvidenciaImagenes.imagenes = response.data.result.evidencias;
						$scope.listEvidenciaImagenes.tipos = [];
						$scope.listImagenesTipo = response.data.result.evidencias;
						let listaTipos = [];

						var count_cantidad_por_tipo = groupBy(response.data.result.evidencias, 'idCatEvidencia');
						response.data.result.evidencias.map(function (e) {
							let isExist = listaTipos.find((t) => e.idCatEvidencia == t.id)
							if (!isExist) {
								let imagenes = [];
								if (count_cantidad_por_tipo[e.idCatEvidencia].length) {
									imagenes = count_cantidad_por_tipo[e.idCatEvidencia]
								}
								listaTipos.push(
									{
										id: e.idCatEvidencia,
										descripcion: e.tipoEvidencia,
										imagenes: imagenes
									}
								)
							}
						});
						$scope.listEvidenciaImagenes.tipos = listaTipos;
						is_consultar_evidencia = true;
						$('#modal-imagen-ot').modal('show');
						setTimeout(function () {
							$("#categoria_img_0").click();
							$("#categoria_img_0").addClass("tipo-evidencia-selected");
						}, 100);
						swal.close();
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.result.resultDescription)
					}

				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			} else {
				swal.close();
				mostrarMensajeErrorAlert("Error del servidor");
			}
		}).catch(err => handleError(err));

	}


	$scope.getEvidenciasImagenes = function (tipo) {
		$scope.listImagenesTipo = [];
		if (tipo.toString() === '0') {
			$scope.listImagenesTipo = $scope.listEvidenciaImagenes.imagenes;
		} else {
			$scope.listEvidenciaImagenes.tipos.map(function (e) {
				if (e.id.toString() === tipo.toString()) {
					$scope.listImagenesTipo = e.imagenes;
					return false;
				}
			});
		}
		$(".tipo_evidencia").removeClass("tipo-evidencia-selected");
		$("#categoria_img_" + tipo).addClass("tipo-evidencia-selected");
	}


	$(document.body).on("click", ".btn_categoria_img", function () {
		var id_categoria = $.trim($(this).attr('attr_id_cat'));

		if (id_categoria === '') {
			$(".magnific.item").show();
			$('.imagen_content:hidden').show(400);
			setTimeout(function () { mostarImagenesCategoria(); }, 500);

		} else {
			if ($(".imagen_content:visible").length > 0) {
				$(".imagen_content:visible").hide(150, "linear", function () {

					$(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
					$(".magnific.item.imgtipo_" + id_categoria + "").show();

					$('.content_img_' + id_categoria).show(200);
					//Manda function magnific popup
					mostarImagenesCategoria();
				});
			} else {
				$(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
				$(".magnific.item.imgtipo_" + id_categoria + "").show();

				$('.content_img_' + id_categoria).show(200);
				//Manda function magnific popup
				mostarImagenesCategoria();
			}

		}

	});

	let groupBy = function (xs, key) {
		return xs.reduce(function (rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	};

	mostarImagenesCategoria = function () {
		var $imageLinks = $('.magnific.item:visible');
		var items = [];

		$imageLinks.each(function (index, elemento) {
			var $item = $(this);
			var magItem = {
				src: $item.attr('href'),
				type: 'image'
			};
			magItem.title = $item.data('title');
			items.push(magItem);
		});
		$imageLinks.magnificPopup({
			mainClass: 'mfp-fade',
			items: items,
			gallery: {
				enabled: true,
				tPrev: $(this).data('prev-text'),
				tNext: $(this).data('next-text')
			},
			type: 'image',
			callbacks: {
				beforeOpen: function () {
					var index = $imageLinks.index(this.st.el);
					if (-1 !== index) {
						this.goTo(index);

					}
					//  $('#imagenOT').modal('hide');
				},

				open: function () {
					// Disabling focus enforcement by magnific
					$.magnificPopup.instance._onFocusIn = function (e) { };

				}
			}

		});
	}

	mostarImagenesCarousel = function () {
		var $imageLinks = $('.imagen-carousel-evidencia');
		var items = [];
		$imageLinks.each(function (index, elemento) {
			var $item = $(this);
			var magItem = {
				src: $item.attr('src'),
				type: 'image'
			};
			magItem.title = $item.data('title');
			items.push(magItem);
		});
		$imageLinks.magnificPopup({
			mainClass: 'mfp-fade',
			items: items,
			gallery: {
				enabled: true,
				tPrev: $(this).data('prev-text'),
				tNext: $(this).data('next-text')
			},
			type: 'image',
			callbacks: {
				beforeOpen: function () {
					var index = $imageLinks.index(this.st.el);
					if (-1 !== index) {
						this.goTo(index);
					}
				},
				open: function () {
					// Disabling focus enforcement by magnific
					$.magnificPopup.instance._onFocusIn = function (e) { };
				}
			}
		});
	}

	$(document.body).on("click", ".carousel-item", function () {
		$(".item-carousel").show();
		$('.carousel-inner:hidden').show(400);
		setTimeout(function () { mostarImagenesCarousel(); }, 500);
	});

	$scope.closeModal = function () {
		$('#modal-imagen-ot').modal('hide');
	}

	$scope.datoOt;
	$scope.datoInt;
	$scope.datoSubInt;
	consultaDetalleOt = function (indexOtConsulta) {
		$scope.infoOtDetalle = {};
		//$("#modal-detalle-ot").removeClass('contenedor_detalle');
		//getDetalleOTGeneric(idOT);
		let otConsultaTemp = $scope.listadoConsultaOtsDisponibles[indexOtConsulta]
		$('#content-ot').show();

		$('#content-comentarios').hide();
		$('#content-historico').hide();
		$('#content-soluciones').hide();
		$('#content_acciones').hide();
		$('#content_cambio_equipo').hide();
		$('#content_reubicacion').hide();
		$('#content_cambio_plan').hide();
		$("#content_informacion_red").hide();
		$("#content_actividad").hide();
		$("#content_recoleccion_materiales").hide()
		$('#content_trayectoria').hide();
		$('#content-postVenta').hide();
		$('#content-pagos').hide();
		$('#content-dispositivos').hide();
		$('#modal-detalle-ot .itemGeneral').removeClass('active');
		$('#modal-detalle-ot .itemGeneral:first').addClass('active');

		is_consulta_info_trayectoria = false;
		$scope.consultaDetalleOtGeneric(otConsultaTemp);
	}

	$scope.consultaDetalleOtGeneric = function (ordenObject) {
		$scope.datoOt = ordenObject.idOrden
		let params = {
			Id_ot: ordenObject.idOrden
		}
		swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		consultaOTService.consultaInfoDetalle(JSON.stringify(params)).then(function success(response) {
			console.log(response);
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result.orden) {
						$scope.infoOtDetalle = response.data.result.orden
						is_consulta_info_ot = true;
						//$scope.permisosModal=$scope.elementosConfigGeneral.get("MODAL_FLUJO_"+ ordenObject.idFlujo ).split(",")
						$scope.permisosModal = [
							"tabHistoricoDespacho",
							"tabComentariosDespacho",
							"tabDetalleSoporte",
							"tabConsultaPagos",
							"tabConsultaDispositivos"
						]
						console.log("#permisos ,orden ", $scope.permisosModal);
						$('#modal-detalle-ot').modal('show');
						swal.close();

					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.result.mensaje)
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			} else {
				swal.close();
				mostrarMensajeErrorAlert("Error del servidor");
			}
		}).catch(err => handleError(err));
	}

	consultaMaterialesOT = function (position) {
		let params = {
			orden: $scope.listadoConsultaOtsDisponibles[position],
		}
		swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		consultaOTService.consultaMaterialOt(JSON.stringify(params)).then(function success(response) {
			console.log(response);

		}).catch(err => handleError(err));
	}

	$scope.cerrarModalMaterial = function () {
		$('#modal-material-ot').modal('hide');
	}

	$scope.consultaChat = function () {
		if (!is_consulta_comentarios) {
			let params = {
				idOt: $scope.datoOt
			}

			if (!swal.isVisible()) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
			}


			genericService.consultarComentariosDespachoOT(params).then(function success(response) {
				swal.close()
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result) {
							if (response.data.result.detalle) {
								$scope.comentariosOrdenTrabajo = response.data.result.detalle;
								angular.forEach($scope.comentariosOrdenTrabajo, function (comentario, index) {
									comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
								});
								is_consulta_comentarios = true;
								swal.close();
							} else {
								toastr.warning(response.data.result.mensaje);
							}
						} else {
							toastr.warning('No se encontraron comentarios');
						}
					} else {
						toastr.warning(response.data.resultDescripcion);
					}
				} else {
					toastr.warning(response.data.resultDescripcion);
				}
			}).catch(err => handleError(err));

			/*
			consultaOTService.consultaComentarios(JSON.stringify(params)).then(function success(response) {
				response = arrayChat;
				if (response.data !== undefined) {
					// if (response.data.respuesta) {
					if (response.data.success) {
						if (response.data.result.result === '0') {
							var content_chat = "";
							$.each(response.data.result.Comentario, function (index, valor) {
								if (valor.Origen == "FFM APP") {
									content_chat += '' +
										'<div class="chat">' +
										'	<div class="chat-avatar">' +
										'		<a class="avatar">' +
										'			<i class="img-comentarios-chat android-mensaje fab fa-android"></i>' +
										'		</a>' +
										'	</div>' +
										'	<div class="chat-body">' +
										'		<div class="chat-body">' +
										'			<div class="chat-text">' +
										'				<p> ' + valor.Comentario + ' </p>' +
										'			</div>' +
										'		</div>' +
										'	</div>' +
										'</div>';
								} else {
									content_chat += '' +
										'<div class="chat chat-right">' +
										'	<div class="chat-body">' +
										'		<div class="chat-body">' +
										'			<div class="chat-text">' +
										'				<p> ' + valor.Comentario + ' </p>' +
										'			</div>' +
										'		</div>' +
										'	</div>' +
										'	<div class="chat-avatar">' +
										'		<a class="avatar">' +
										'			<i class="img-comentarios-chat web-mensaje fas fa-desktop"></i>' +
										'		</a>' +
										'	</div>' +
										'</div>';
								}
							});
							$('.contenedor_detalle #content-chat-ot').empty().append(content_chat);
							
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.result.resultDescription)
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert("Error del servidor");
				}
			}).catch(err => handleError(err));*/
		}
	}

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.consultaHistoricoOt = function () {
		if (!is_consulta_historico) {
			let params = {
				idOt: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();


			genericService.consultarHistoricoDespachoOT(params).then(function (result) {
				console.log(result);
				if (result.data !== undefined) {
					if (result.data.respuesta) {
						if (result.data.result !== undefined) {
							jsonm = result.data;
							$scope.movimientos = result.data.result.detalle;
							is_consulta_historico = true;
							swal.close();
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.result.resultDescription)
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert("Error del servidor");
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.consultaActividadTecnico = function () {
		if (!is_consulta_actividad_tecnico) {
			let params = {
				ID_OT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaActividad(JSON.stringify(params)).then(function success(response) {
				response = arrayEvidenciaOt;
				console.log(response);
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result.result === '0') {
							var vista_img_actividad_tecnico = ""
							$("#contenido_tabs_img_evidencia").empty()
							$("#nombre_actividad_tecnico").text(response.data.result.Nombre_encargado);
							$("#descripcion_actividad_tec").text(response.data.result.Descripcion);
							$("#fecha_actividad_tecnico").text(response.data.result.Fecha);
							if (response.data.result.Imagenes != null || response.data.result.Imagenes !== undefined && response.data.result.Imagenes.length > 0) {
								var arregloImgActividad = response.data.result.Imagenes;
								$.each(arregloImgActividad, function (index, element) {
									vista_img_actividad_tecnico = retornaFormatoSliderActividadTecnico(arregloImgActividad, index)
								})
							} else {
								vista_img_actividad_tecnico = '<h6  style="color:#abafae;text-align:center; padding: 3em;">' +
									'SIN IMAGENES PARA ESTA OT' +
									'</h6>';
							}
							$("#contenido_tabs_img_evidencia").append(vista_img_actividad_tecnico);
							is_consulta_actividad_tecnico = true;
							swal.close();
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.result.resultDescription)
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert("Error del servidor");
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.consultaInfoTrayectoria = function () {
		if (!is_consulta_info_trayectoria) {
			$('#table_info_trayectoria').dataTable().fnDestroy();
			$('#table_info_trayectoria tbody').empty();
			let params = {
				idot: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaTrayectoria(JSON.stringify(params)).then(function success(response) {
				console.log(response);
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						var ltlng = [];
						var ubicaciones = [];
						ubicaciones = response.data.result;
						$.each(ubicaciones, function (index, element) {
							$("#table_info_trayectoria tbody").append("<tr>" +
								"<td>" + element.numEmpleado + "</td>" +
								"<td>" + element.empleado + "</td>" +
								"<td>" + element.estado + "</td>" +
								"<td>" + element.fecha + "</td>" +
								"<td>" + element.motivo + "</td>" +
								"<td>" + element.status + "</td>" +
								'<td onclick="mostrarUbicacion(' + '\'' + element.latitud + '\', \'' + element.longitud + '\')" style="cursor:pointer;">' + '<div class="text-center"><button type="button" class="btn btn-informacion" onclick="mostrarUbicacion(' + '\'' + element.latitud + '\', \'' + element.longitud + '\')"><i class="fa fa-eye"></i></button></div>' + "</td>" +
								"</tr>");
							var elemento = {};

							if (element.Latitud !== 'NA' && element.Longitud !== 'NA') {
								elemento.lat = parseFloat(element.latitud);
								elemento.lng = parseFloat(element.longitud);
								ltlng.push(elemento);
							}
						})
						is_consulta_info_trayectoria = true;

						$('#table_info_trayectoria').DataTable({
							"paging": true,
							"ordering": false,
							"searching": false,
							"info": true,
							"sDom": '<"top"fl>rt<"bottom"pi><"clear">',
							"language": idioma_espanol_not_font
						});

						swal.close();
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert("Error del servidor");
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.consultaInformacionRed = function () {
		if (!is_consulta_informacion_Red) {

			$("#tableInfoRedEquipo tbody").empty()
			if (datatable_Equipos !== undefined) {
				datatable_Equipos.destroy()
			}
			$("#tableInfoDispositivos tbody").empty();
			if (datatable_Dispositivos !== undefined) {
				datatable_Dispositivos.destroy();
			}

			$("#dataTable_IP tbody").empty();
			if (dataTable_IP !== undefined) {
				dataTable_IP.destroy()
			}
			let params = {
				ID_OT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaInfoRed(JSON.stringify(params)).then(function success(response) {
				console.log(response);
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result.result === '0') {
							if (!(response.data.result.Equipos === undefined && response.data.result.Dispositivos === undefined && response.data.result.Telefonia === undefined && response.data.result.IP === undefined)) {
								$("#list_telefonia").empty().append(RetornaformatoPintaTelefonia(jsonResponse.result.Telefonia));
								if (!(response.data.result.Equipos === undefined)) {
									$("#tableInfoRedEquipo tbody").empty().append(RetornaFormatoPintaEquipos(response.data.result.Equipos));
									datatable_Equipos = $('#tableInfoRedEquipo').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"flp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_equipos = true;
										}
									});
								} else {
									$("#tableInfoRedEquipo tbody").empty()
									datatable_Equipos = $('#tableInfoRedEquipo').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"i<"clear">>rt<"bottom"flp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_equipos = true;
										}
									});
								}
								//Dispositivos
								if (!(response.data.result.Dispositivos === undefined || response.data.result.Dispositivos === 'undefined')) {
									$("#tableInfoDispositivos tbody").empty().append(RetornaformatoPintaDispositivos(jsonResponse.result.Dispositivos));
									datatable_Dispositivos = $('#tableInfoDispositivos').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_dispositivos = true;
										}
									});
								} else {
									$("#tableInfoDispositivos tbody").empty()
									datatable_Dispositivos = $('#tableInfoDispositivos').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_dispositivos = true;
										}
									});
								}


								//IP
								if (!(response.data.result.IP === undefined)) {
									$("#tableInfoIP tbody").empty().append(RetornaFormatoPintaIP(jsonResponse.result.IP));
									dataTable_IP = $('#tableInfoIP').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_ip = true;
										}
									})
								} else {
									$("#tableInfoIP tbody").empty()
									dataTable_IP = $('#tableInfoIP').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_ip = true;
										}
									});
								}
							} else {
								$("#tableInfoRedEquipo tbody").empty()
								datatable_Equipos = $('#tableInfoRedEquipo').DataTable({
									"processing": true,
									"ordering": false,
									"pageLength": 1,
									"bInfo": false,
									"bFilter": true,
									"bAutoWidth": false,
									"columnDefs": [{
										"width": "3%",
										"targets": 0
									}],
									"dom": '<"top"i<"clear">>rt<"bottom"flp<"clear">>',
									"language": espanol_instalaciones,
									"columns": [null],
									"lengthChange": false,
									"fnInitComplete": function (oSettings, json) {
										is_consulta_equipos = true;
									}
								});

								$("#tableInfoDispositivos tbody").empty()
								datatable_Dispositivos = $('#tableInfoDispositivos').DataTable({
									"processing": true,
									"ordering": false,
									"pageLength": 1,
									"bInfo": false,
									"bFilter": true,
									"bAutoWidth": false,
									"columnDefs": [{
										"width": "3%",
										"targets": 0
									}],
									"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
									"language": espanol_instalaciones,
									"columns": [null],
									"lengthChange": false,
									"fnInitComplete": function (oSettings, json) {
										is_consulta_dispositivos = true;
									}
								});

								$("#tableInfoIP tbody").empty()
								dataTable_IP = $('#tableInfoIP').DataTable({
									"processing": true,
									"ordering": false,
									"pageLength": 1,
									"bInfo": false,
									"bFilter": true,
									"bAutoWidth": false,
									"columnDefs": [{
										"width": "3%",
										"targets": 0
									}],
									"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
									"language": espanol_instalaciones,
									"columns": [null],
									"lengthChange": false,
									"fnInitComplete": function (oSettings, json) {
										is_consulta_ip = true;
									}
								});

								mostrarMensajeWarningValidacion("No se encontro informacion de red")
							}
							is_consulta_informacion_Red = true;
							swal.close();
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.result.resultDescription)
						}

					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert("Error del servidor");
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.consultaCambioEquipo = function () {
		if (!is_consulta_info_trayectoria) {
			$('#table_info_trayectoria').dataTable().fnDestroy();
			$('#table_info_trayectoria tbody').empty();
			let params = {
				Id_OT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultarcambioDeEquipo(JSON.stringify(params)).then(function success(response) {
				console.log(response);
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result.result === '0') {
							$("#headers_tab_cambio_equipo").empty();
							$('#content_cambio_equipo_tabs').empty();
							var header_tabs_cambio_equipo = "";
							var content_tabs_cambio_equipo = "";
							var contenido_imagenes = "";

							if (response.data.result.CambioEquipo !== undefined) {
								$('#num_equipo').html(response.data.result.CambioEquipo.NumEmpleado);
								$('#empleado').html(response.data.result.CambioEquipo.Empleado);
								if (response.data.result.CambioEquipo.Elemento !== undefined) {
									$.each(response.data.result.CambioEquipo.Elemento, function (index, elemento) {

										header_tabs_cambio_equipo += '' +
											'<li class="nav-item">' +
											'<a class="nav-link ' + ((index === 0) ? "active" : "") + ' " id="header_tab_' + index + '" data-toggle="tab" href="#content_tab_' + index + '" role="tab" aria-controls="content_tab_' + index + '" aria-selected="true">Equipo No.' + (index + 1) + '</a>';
										'</li>';

										content_tabs_cambio_equipo += '' +
											'<div class="tab-pane fade ' + ((index === 0) ? "show active" : "") + ' " id="content_tab_' + index + '" role="tabpanel" aria-labelledby="home-tab">' +
											'<br/>' +
											'<div class="row">' +
											'<div class="col-10 offset-1">' +
											'' + retornarFormatoCamposCambioEquipo(elemento) + ' ' +
											'</div>' +
											'<div class="col-12">' +
											'<br>' +
											'</div>' +
											'</div>' +
											'<br>' +
											'</div>';
									});
									$("#headers_tab_cambio_equipo").append(header_tabs_cambio_equipo);
									$("#content_cambio_equipo_tabs").append(content_tabs_cambio_equipo);
									is_consulta_cambio_equipo = true;
									swal.close();
								} else {
									swal.close();
									mostrarMensajeWarningValidacion('Sin informaci\u00f3n');
								}
							} else {
								swal.close();
								mostrarMensajeWarningValidacion('Sin informaci\u00f3n')
							}
						} else {
							swal.close();
							mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert("Error del servidor");
				}
			}).catch(err => handleError(err));
		}
	}



	document.getElementById('comentarios').addEventListener('click', function () {
		$("#informacion-ot").removeClass('active')
		$("#info_historico").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$('#pagos-Ot').removeClass('active');
		$('#dispositivo-Ot').removeClass('active');
		$('.contenedor_detalle').hide();

		$('#comentarios').addClass('active');
		$('#content-comentarios').show();
		$scope.consultaChat();
	});

	document.getElementById('informacion-ot').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#info_historico").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$('#pagos-Ot').removeClass('active');
		$('#dispositivo-Ot').removeClass('active');
		$('.contenedor_detalle').hide();

		$('#informacion-ot').addClass('active');
		$('#content-ot').show();
		$scope.consultaDetalleOtGeneric($scope.datoOt);
	});

	document.getElementById('info_historico').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#informacion-ot").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$('#pagos-Ot').removeClass('active');
		$('#dispositivo-Ot').removeClass('active');
		$('.contenedor_detalle').hide();

		$('#info_historico').addClass('active');
		$('#content-historico').show();
		$scope.consultaHistoricoOt();
	});

	document.getElementById('postVenta').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#info_historico").removeClass('active')
		$("#informacion-ot").removeClass('active')
		$('#pagos-Ot').removeClass('active');
		$('#dispositivo-Ot').removeClass('active');
		$('.contenedor_detalle').hide();

		$('#postVenta').addClass('active');
		$('#content-postVenta').show();
		$scope.consultarPostVentaOt();

	});

	document.getElementById('pagos-Ot').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#informacion-ot").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$('#info_historico').removeClass('active');
		$('#dispositivo-Ot').removeClass('active');
		$('.contenedor_detalle').hide();

		$('#pagos-Ot').addClass('active');
		$('#content-pagos').show();
		$scope.consultaPagosOt();
	});

	document.getElementById('dispositivo-Ot').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#informacion-ot").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$('#info_historico').removeClass('active');
		$('.contenedor_detalle').hide();
		$('#pagos-Ot').removeClass('active');

		$('#dispositivo-Ot').addClass('active');
		$('#content-dispositivos').show();
		$scope.consultarDispositivosOt();
	});


	/* document.getElementById('acciones').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#informacion-ot").removeClass('active')
		$("#info_historico").removeClass('active')
		$('.contenedor_detalle').hide();

		$('#acciones').addClass('active');
		$("#content_acciones").show();
		// $scope.consultaInformacionRed()
	}); */

	$('#modal-detalle-ot').on('hidden.bs.modal', function () {
		limpiarVariablesModalDetalle();
		$("#informacion-ot").addClass('active')
		$("#info_historico").removeClass('active')
		$("#comentarios").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$("#pagos-Ot").removeClass('active')
		$("#dispositivo-Ot").removeClass('active')
	})

	limpiarVariablesModalDetalle = function () {
		is_consulta_info_ot = false;
		is_consulta_comentarios = false;
		is_consulta_historico = false;
		is_consulta_soluciones = false;
		is_consulta_corte_individual = false;
		is_consulta_cambio_equipo = false;
		is_consulta_reubicacion = false;
		is_consulta_cambio_plan = false;
		is_consulta_potencia = false;
		is_consulta_equipos = false;
		is_consulta_dispositivos = false;
		is_consulta_ip = false;
		is_consulta_informacion_Red = false;
		is_consulta_actividad_tecnico = false;
		isConsultaDetalleSoporte = false
		isConsultaDetallePago = false
		isConsultaDispositivo = false
		$("#info_historico").removeClass('active')
		$("#comentarios").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$("#pagos-Ot").removeClass('active')
		$("#dispositivo-Ot").removeClass('active')
		$("#informacion-ot").addClass('active')
	}

	$scope.closeModalDetalle = function () {
		$('#modal-detalle-ot').modal('hide')
		$("#info_historico").removeClass('active')
		$("#comentarios").removeClass('active')
		$("#acciones").removeClass('active')
		$("#postVenta").removeClass('active')
		$("#pagos-Ot").removeClass('active')
		$("#informacion-ot").addClass('active')
	}


	$('.drop-down-filters').on("click.bs.dropdown", function (e) {
		e.stopPropagation();
	});

	validarFecha = function () {
		if (document.getElementById('filtro_fecha_inicio_consultaOt').value.trim() != "" && document.getElementById('filtro_fecha_fin_consultaOt').value.trim() != "") {
			var inicio = document.getElementById('filtro_fecha_inicio_consultaOt').value.split('/');
			var fin = document.getElementById('filtro_fecha_fin_consultaOt').value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}

	$scope.seleccionTodosEstatus = function (paramFiltroParent, banderaChecked) {
		paramFiltroParent.map(function (e) {
			e.checkedOpcion = banderaChecked
			e.children.map(function (j) {
				j.checkedOpcion = banderaChecked
				j.children.map(function (k) {
					k.checkedOpcion = banderaChecked
					return k
				})
				return j
			})
		})
	}

	$scope.checkFiltroEstatus = function (filtro) {
		filtro.checkedOpcion = !filtro.checkedOpcion
		filtro.children.map(function (e) {
			e.checkedOpcion = filtro.checkedOpcion
			if (e.children != undefined && e.children.length > 0) {
				e.children.map(function (j) {
					j.checkedOpcion = filtro.checkedOpcion
					if (j.children != undefined && j.children.length > 0) {
						j.children.map(function (k) {
							k.checkedOpcion = filtro.checkedOpcion
							return k
						})
					}
					return j
				})
			}
		})
	}

	$scope.addComentariosConsultaOt = function () {
		if ($scope.comentarioConsultaOT.trim() !== '' && !/^\s/.test($scope.comentarioConsultaOT)) {

			let params = {
				idOrden: $scope.datoOt,
				comentario: $scope.comentarioConsultaOT,
				origenSistema: 1
			}

			swal({ text: 'Espere un momento ...', allowOutsideClick: false });
			swal.showLoading();

			genericService.agregarComentariosOt(params).then(function success(response) {
				swal.close();
				console.log(response);
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						console.log("############## Comentario agregado")
						$scope.comentarioConsultaOT = '';
						document.getElementById('comentarioConsultaOt').value = '';
						is_consulta_comentarios = false;
						$(".chat-area").scrollTop(0);
						$scope.consultaChat();
					} else {
						toastr.error(response.data.resultDescripcion);
					}
				} else {
					toastr.error(response.data.resultDescripcion);
				}
			}).catch(err => handleError(err))

		} else {
			$scope.comentarioConsultaOT = '';
			document.getElementById('comentarioConsultaOt').value = '';
			toastr.warning('Intoducir un comentario.');
		}
	}

	$scope.descargarReporteConsultaOt = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;

		// let intervencion = $scope.filtrosGeneral.tipoOrdenes.filter(e => e.checkedOpcion).map(e => e.id)
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})

		let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
			.map(e => parseInt(e.id))
		let selectedElms = $('#jstree').jstree("get_selected", true);


		let estatusOrdenes = []
		angular.forEach($scope.filtrosGeneral.estatusdisponibles, (e, i) => {
			estatusOrdenes.push(e.id);
		})


		$.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}


		if ($.trim(document.getElementById('idot').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (estatusOrdenes.length === 0) {
			errorMensaje += '<li>Seleccione estatus.</li>';
			isValido = false
		}

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {
			let params = {
				idOrden: $.trim(document.getElementById('idot').value) !== '' ? $.trim(document.getElementById('idot').value) : null,
				folioSistema: $.trim(document.getElementById('idos').value) !== '' ? $.trim(document.getElementById('idos').value) : null,
				claveCliente: $.trim(document.getElementById('cuenta').value) !== '' ? $.trim(document.getElementById('cuenta').value) : null,
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOt').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOt').value),
				elementosPorPagina: $scope.elementosRegistro,
				pagina: 1
			}
			console.log(params);

			consultaOTService.consultaReporteConsultaOt(JSON.stringify(params)).then((result) => {
				console.log(result.data)
				if (result.data.respuesta) {
					if (result.data.result) {
						const data = JSON.parse(result.data.result).ordenes
						console.log(JSON.parse(result.data.result))
						const fileName = 'Resporte Consulta Ot'
						const exportType = 'xls'

						window.exportFromJSON({ data, fileName, exportType })
					} else {
						mostrarMensajeWarningValidacion('No hay datos en el reporte.')
					}
				} else {
					mostrarMensajeErrorAlert('Ocurrio un erro.')
				}
			}).catch(err => handleError(err))

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	$scope.detalleSoporteList = [];
	$scope.consultarPostVentaOt = function () {
		if (!isConsultaDetalleSoporte) {
			$scope.detalleSoporteList = []
			let params = {
				orden: $scope.datoOt
				//orden: 123050
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaPostVentaOt(JSON.stringify(params)).then((result) => {
				swal.close()
				console.log(result)
				isConsultaDetalleSoporte = true
				if (result.data.respuesta) {
					if (result.data.result.detalleSoporte.length > 0) {
						$scope.detalleSoporteList = result.data.result.detalleSoporte

						setTimeout(() => {
							$scope.detalleSoporteList.forEach((elemento, ind) => {
								let html_tmp = "";
								elemento.detalleCambioEquipo.forEach((detalle, index) => {

									if (detalle.evidencias && detalle.evidencias.length) {
										contenido_imagenes = retornarFormatoSliders(detalle.evidencias, index);

									} else {
										contenido_imagenes = '<h4 id="texto_not_arboles" style="color:#abafae; text-align:center">' +
											'	SIN IMAGENES PARA ESTA FALLA' +
											'</h4>';
									}


									html_tmp += '' +
										'<tr>' +
										'	<td>' +
										'		<div class="row">' +
										'			<div class="col-md-6 colInformacionTabla">' +
										'				<div class="row textFallaOT">' +
										'					<div class="col-md-5">' +
										'						<b  class="title_span_1"> Tipo equipo:</b>' +
										'		        	</div>				               ' +
										'		        	<div class="col-md-7">' +
										'		        		<span id="ot_fallas"  class="content_text" >' + detalle.descTipoEquipo + '</span>' +
										'		        	</div>' +
										'				</div>' +
										'				<div class="row textFallaOT">' +
										'					<div class="col-md-5">' +
										'						<b  class="title_span_1"> Modelo anterior:</b>' +
										'		        	</div>				               ' +
										'		        	<div class="col-md-7">' +
										'		        		<span id="tipo_falla_corte"  class="content_text" > ' + detalle.descModeloViejo + ' </span>' +
										'		        	</div>' +
										'				</div>' +
										'				<div class="row textFallaOT">' +
										'					<div class="col-md-5">' +
										'						<b  class="title_span_1"> Modelo nuevo:</b>	 ' +
										'		        	</div>				               ' +
										'		        	<div class="col-md-7">' +
										'		        		<span id="tecnico_falla"  class="content_text" > ' + detalle.descModeloNuevo + ' </span>' +
										'		        	</div>' +
										'				</div>' +
										'				<div class="row textFallaOT">' +
										'					<div class="col-md-5">' +
										'						<b  class="title_span_1"> N&uacute;m. serie equipo anterior:</b>' +
										'		        	</div>				               ' +
										'		        	<div class="col-md-7">' +
										'		        		<span id="status_falla_corte"  class="content_text" > ' + detalle.numSerieModeloViejo + ' </span>' +
										'		        	</div>' +
										'				</div>' +
										'				<div class="row">' +
										'					<div class="col-md-5">' +
										'						<b  class="title_span_1">N&uacute;mero serie equipo nuevo:</b>' +
										'		        	</div>				               ' +
										'		        	<div class="col-md-7">' +
										'		        		<span id="comentarios_falla"  class="content_text" > ' + detalle.numSerieModeloNuevo + ' </span>' +
										'		        	</div>' +
										'				</div>' +
										'			</div>' +
										'			<div class="col-md-6">' +
										'					<div class="class-12">' +
										contenido_imagenes +
										'					</div>' +
										'			</div>' +
										'		</div>' +
										'	</tr>' +
										'</td>';


								})
								
								console.log(ind);
								console.log($('#tablaOTDetalle' + ind));
								//$('#tablaOTDetalle' + elemento.idFalla).destroy();
								$('#tablaOTDetalle' + ind + ' tbody').empty().append(html_tmp);
								$('#tablaOTDetalle' + ind).DataTable({
									"processing": false,
									"ordering": false,
									"pageLength": 1,
									"pagingType": "numbers",
									"info": false,
									"bInfo": false,
									"bFilter": false,
									"bAutoWidth": false,
									"language": idioma_espanol_not_font,
									"columns": [null],
									"lengthChange": false,
									"fnDrawCallback": function (oSettings) {
										$(".carousel-item").click();
									}

								});

							})
						}, 1000);
					} else {
						mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n')
					}
				} else {
					mostrarMensajeErrorAlert(result.data.resultDescripcion)
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.consultaPagosOt = function () {
		if (!isConsultaDetallePago) {
			let params = {
				orden: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaPagosOt(JSON.stringify(params)).then((result) => {
				swal.close()
				console.log(result)
				isConsultaDetallePago = true
				if (result.data.respuesta) {
					if (result.data.result) {
						$scope.detallePagoObj = result.data.result.detallePago
					} else {
						mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n')
					}
				} else {
					mostrarMensajeErrorAlert(result.data.resultDescripcion)
				}
			}).catch(err => handleError(err));
		}
	}

	angular.element(document).ready(function () {
		$("#idBody").removeAttr("style");
	});


	$scope.camposFiltro = {};

	$scope.limpiarCamposFiltro = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.camposFiltro.idos = "";
				$scope.camposFiltro.cuenta = "";
				break;
			case 2:
				$scope.camposFiltro.idot = "";
				$scope.camposFiltro.cuenta = "";
				break;
			case 3:
				$scope.camposFiltro.idot = "";
				$scope.camposFiltro.idos = "";
				break;
			default:
				break;
		}
	}

	retornarFormatoSliders = function (imagen, contador) {
		var imgs_blocks = "";
		var indicators_carousel = "";

		imagen.forEach((img, index) => {
			indicators_carousel += ' <li class="' + ((index === 0) ? 'active' : '') + '" data-target="#carouselExampleIndicators' + contador + '" data-slide-to="' + index + '" ></li>';

			if (img.urlEvidencia === "") {
				imgs_blocks += '' +
					'      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + ' ">' +
					'        <img data-title="' + img.nombreArchivo + '" class="d-block img-fluid imagen-carousel-evidencia" style="width:100%; min-width: 100%; height: 100% !important;" src="' + contex_project + '/resources/img/generic/not_found.png" alt="First slide" />' +
					'      </div>';
			} else {
				imgs_blocks += '' +
					'      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + '">' +
					'        <img data-title="' + img.nombreArchivo + '" class="d-block img-fluid imagen-carousel-evidencia" style="width:100%; min-width: 100%; height: 100% !important;" class="d-block w-100" src="' + img.urlEvidencia + '" alt="First slide" />' +
					'      </div>';
			}
		})


		return '' +
			'  <div id="carouselExampleIndicators' + contador + '" class="carousel_componente carousel slide" data-ride="carousel">' +
			'    <ol class="carousel-indicators">' +
			'     	' + indicators_carousel + ' ' +
			'    </ol>' +
			'    <div class="carousel-inner" role="listbox">' +
			'			' + imgs_blocks + ' ' +
			'    </div>' +
			'    <a class="carousel-control-prev" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="prev">' +
			'      <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
			'      <span class="sr-only">Previous</span>' +
			'    </a>' +
			'    <a class="carousel-control-next" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="next">' +
			'      <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
			'      <span class="sr-only">Next</span>' +
			'    </a>' +
			'  </div>';
	}

	$scope.pintarTablaDispositivoOt = function () {
		if (dispositivoOtTable) {
			dispositivoOtTable.destroy();
		}

		let arrayRow = [];
		$scope.dispositivosArrayTemp.forEach((dispositivo, index) => {
			let array = [];

			array[0] = '<a id="mostrar-segundo-nivel-' + index + '" class="option-mas-dispositivo segundo-nivel-table-dispositivo" tag-position="' + index + '" tag-hide="false"><i id="icono-dispositivo-' + index + '" class="icono-dispositivo-consulta-ot icon-color-table-dispositivo-ot fa fa-plus" aria-hidden="true"></i></a>';
			array[1] = dispositivo.nombreDispositivo ? dispositivo.nombreDispositivo : 'Sin dato';
			array[2] = dispositivo.modelo ? dispositivo.modelo : 'Sin dato'
			array[3] = dispositivo.serie ? dispositivo.serie : 'Sin dato'
			array[4] = dispositivo.mac ? dispositivo.mac : 'Sin dato'

			arrayRow.push(array)
		})

		dispositivoOtTable = $('#table_dispositovos_ot').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": arrayRow
		});
	}


	$scope.consultarDispositivosOt = function () {
		if (!isConsultaDispositivo) {
			let params = {
				//orden: 92070//$scope.datoOt}
				orden: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultarDispositivosOrden(params).then((result) => {
				swal.close()
				console.log(result)
				isConsultaDispositivo = true
				if (result.data) {
					if (result.data.respuesta) {
						if (result.data.result) {
							$scope.dispositivosArrayTemp = result.data.result.dispositivos
							$scope.pintarTablaDispositivoOt();
						} else {
							mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n')
						}
					} else {
						mostrarMensajeWarningValidacion(result.data.resultDescripcion)
					}
				} else {
					mostrarMensajeErrorAlert('Error de servidor.')
				}
			}).catch(err => handleError(err));
		}
	}

	$(document.body).on("click", ".segundo-nivel-table-dispositivo", function () {
		let tr = $(this).closest('tr')
		row = dispositivoOtTable.row(tr)
		let index = Number($(this).attr('tag-position'))
		if ($(this).attr('tag-hide') === 'false') {
			$(this).attr('tag-hide', 'true')
			document.getElementById('icono-dispositivo-' + index).classList.remove('fa-plus')
			document.getElementById('icono-dispositivo-' + index).classList.add('fa-window-minimize')
			let dataTable = pintarTablaSecundaria(index)
			row.child(dataTable).show();
		} else {
			$(this).attr('tag-hide', 'false')
			document.getElementById('icono-dispositivo-' + index).classList.add('fa-plus')
			document.getElementById('icono-dispositivo-' + index).classList.remove('fa-window-minimize')
			row.child.hide();
			tr.removeClass('shown');
		}

	});

	pintarTablaSecundaria = function (position) {
		let dispositivo = $scope.dispositivosArrayTemp[position]
		let arrayDetalleRed = [];
		arrayDetalleRed.push(dispositivo.detalleRed)
		let tableHTML = '<div class="details-container">' +
			'<table id="table_dispositovos_ot_nivel2" class="table table-hover table-bordered" cellspacing="0" style="width:100%">' +
			'<thead id="thead_dispositivo_consulta_ot_nivel2">' +
			'<tr>' +
			'<th>NOMBRE OLT</th>' +
			'<th>TIPO APROVISIONAMIENTO</th>' +
			'<th>FRAME</th>' +
			'<th>SLOT</th>' +
			'<th>PUERTO</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>';

		arrayDetalleRed.forEach(detalle => {
			tableHTML += "<tr>" +
				"<td>" + ((detalle != undefined && detalle.nombreOlt) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.tipoAprovisionamiento) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.frame) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.slot) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.puerto) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"</tr>";

		})
		tableHTML += '</tbody></table>' +
			'</div>';

		console.log(tableHTML)
		return tableHTML;
	}
}])
