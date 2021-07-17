var app = angular.module('consultaOTApp', []);

app.controller('consultaOTController', ['$scope', '$q', 'consultaOTService', 'genericService', function ($scope, $q, consultaOTService, genericService) {

	$("#li-consultaot-navbar").addClass('active')

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

	

	$scope.iniciarTabla = function (data) {
		if (otTabla) {
			otTabla.destroy();
		}

		let viewTable = [];
		data.forEach(elemento => {
			let array = [];

			array[0] = elemento.ot ? elemento.ot : '';
			array[1] = elemento.os ? elemento.os : '';
			array[2] = elemento.cuenta ? elemento.cuenta : '';
			array[3] = elemento.ticket ? elemento.ticket : '';
			array[4] = elemento.ciudad ? elemento.ciudad : '';
			array[5] = elemento.distrito ? elemento.distrito : '';
			array[6] = elemento.creacion ? elemento.creacion : '';
			array[7] = elemento.agenda ? elemento.agenda : '';
			array[8] = elemento.turno ? elemento.turno : '';
			array[9] = elemento.tipo ? elemento.tipo : '';
			array[10] = elemento.operario.trim() ? elemento.operario : 'SIN OPERARIO';
			array[11] = elemento.status ? elemento.status : '';
			array[12] = elemento.estado ? elemento.estado : '';
			array[13] = elemento.usuario_crea.trim() ? elemento.usuario_crea : 'SIN INFORMACION'
			// array[14] = '<div class="tooltip-btn"><span onclick="consultaMaterialesOT(\'' + elemento.ot + '\'' + ',\'' + elemento.operario.trim() + '\')" class="btn-floating btn-option btn-sm btn-default waves-effect waves-light"><th><i class="icono_cons_bg fa fa-wrench" aria-hidden="true"></i></th></span></div>';
			// array[15] = '<div class="tooltip-btn"><span onclick="consultaImagenesOT(\'' + elemento.ot + '\'' + ',\'' + elemento.id_tipo + '\')" class="btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light"><i class="icono_cons_bg fa fa-picture-o" aria-hidden="true"></i></span></div>'
			array[14] = '<div class="tooltip-btn"><span onclick="consultaDetalleOt(\'' + elemento.ot + '\'' + ',\'' + elemento.id_tipo + '\'' + ',\'' + elemento.id_subtipo + '\'' + ',\'' + elemento.operario.trim() + '\'' + ',\'' + elemento.equipo + '\')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><i class="icono_cons_bg fa fa-bars" aria-hidden="true"></i></span></div>'

			viewTable.push(array);
		});

		otTabla = $('#otTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"recordsTotal": 100,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": viewTable,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
		});
		console.log(otTabla.page.info())
	}

	$scope.validarFecha = function () {
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

	$scope.consultaOT = function () {
		if (otTabla) {
			otTabla.destroy();
		}

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

		// $(".dropdown-menu").filter(":checked").each(function () {
		// 	intervencion.push($(this).val());
		// });
		$.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}

		// intervencion = "48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243";
		if ($.trim(document.getElementById('idot').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot').value)))) {
				mostrarMensajeWarningValidacion('Introduce un n&uacute;mero correcto de OT');
				return false;
			}
		}

		if ($.trim(document.getElementById('cuenta').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta').value)))) {
				mostrarMensajeWarningValidacion("Introduce un n&uacute;mero correcto de cuenta");
				return false;
			}
		}

		// if (intervencion == '') {
		// 	mostrarMensajeWarningValidacion("Selecciona intervenciones");
		// 	return false;
		// }
		if (clusters == '') {
			mostrarMensajeWarningValidacion("Selecciona Cluster");
			return false;
		}
		if (document.getElementById('fecha_inicio') == '') {
			mostrarMensajeWarningValidacion("Introduce Fecha Inicial");
			return false;
		}
		if (document.getElementById('fecha_fin') == '') {
			mostrarMensajeWarningValidacion("Selecciona Fecha Final");
			return false;
		}

		if (!$scope.validarFecha()) {
			$('.datepicker').datepicker('update', new Date());
			mostrarMensajeWarningValidacion("La fecha inicial no tiene que ser mayor a la final.");
			return false;
		}

		/* let params = {
			ot: $.trim(document.getElementById('idot').value),
			os: $.trim(document.getElementById('idos').value),
			cuenta: $.trim(document.getElementById('cuenta').value),
			fecha_inicio: $.trim(document.getElementById('filtro_fecha_inicio_consultaOt').value),
			fecha_fin: $.trim(document.getElementById('filtro_fecha_fin_consultaOt').value),
			intervencion: intervencion.toString(),
			distrito: clusters.toString()
		} */

		let params = {
			idOrden: $.trim(document.getElementById('idot').value),
			folioSistema: $.trim(document.getElementById('idos').value),
			claveCliente: $.trim(document.getElementById('cuenta').value),
			idSubTipoOrdenes: [].concat(subIntTemp, [0]),
			idEstatus: "1,2",
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
					swal({ text: 'Cargando registros...', allowOutsideClick: false });
					swal.showLoading();
				},
				"dataSrc": function (json) {
					return json.data;
				},
				"error":function(xhr, error, thrown){
					handleError(xhr)
				}, 
				"complete": function () {
					swal.close()
				}
			},
			"columns": [null, null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});

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

	$scope.consultarCatalagosPI = function () {
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$q.all([
			genericService.consultarCatalogoIntervenciones(),
			genericService.consulCatalogoGeografia()
		]).then(function (results) {
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.filtrosGeneral.tipoOrdenes = $scope.realizarConversionAnidado(results[0].data.result)
					} else {
						toastr.warning('No se encontraron  tipo ordenes');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
			}

			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						if (results[1].data.result.geografia) {
							swal.close();
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

							}).jstree({
								'plugins': ["wholerow", "checkbox"],
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
						}
					} else {
						swal.close();
						toastr.warning('No se encontraron datos para la geografia');
					}
				} else {
					swal.close();
					toastr.warning(results[2].data.resultDescripcion);
				}
			} else {
				swal.close();
				toastr.error('Ha ocurrido un error en la consulta de turnos');
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


	consultaImagenesOT = function (ot, int) {
		let params = {
			Id_ot: ot,
			Id_tipo_img: '',
			Propietario: '1'
		}
		$('.idoti').text(ot);
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		consultaOTService.consultaImagenesOt(JSON.stringify(params)).then(function success(response) {
			response = arrayConsultaImagen;
			console.log(response);
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result.result === '0') {
						$("#categorias_div").empty();
						$("#contenido_imagenes").empty();
						if (response.data.result.Imagen !== undefined && response.data.result.Imagen !== null && response.data.result.Imagen.length > 0) {
							var _HTML_TIPO = '' +
								'<div class="content_category col-2">' +
								'	<b class="badge accent-3" id="alerta-p-i">0</b>' +
								'	<button type="button" id="categoria_img_0" class=" btn_categoria_img categoria_img btn btn-sm btn-fluid btn-outline-blue-grey waves-effect waves-light">' +
								'	 TODAS ' +
								'	</button>' +
								'</div>';
							var clase_btn = "";


							$.each(response.data.result.Tipo, function (index, elemento) {
								_HTML_TIPO += '' +
									'<div class="content_category col-2">' +
									'	<b class="badge accent-3" id="alerta-p-i">0</b>' +
									'	<button attr_id_cat="' + elemento.ID_Tipo + '" type="button" id="categoria_img_' + elemento.ID_Tipo + '" class=" btn_categoria_img categoria_img btn btn-sm btn-fluid  btn-outline-blue-grey waves-effect waves-light">' +
									'	 ' + elemento.Descripcion + ' ' +
									'	</button>' +
									'</div>';
							});
							$("#categorias_div").append(_HTML_TIPO);


							var count_cantidad_por_tipo = groupBy(response.data.result.Imagen, 'tipo_imagen');

							Object.keys(count_cantidad_por_tipo).forEach(function (key) {
								value = count_cantidad_por_tipo[key];
								$("#categoria_img_" + key).parent().find('.badge').text(count_cantidad_por_tipo[key].length);
							});

							$("#categoria_img_0").parent().find('.badge').text(response.data.result.Imagen.length);

							var _HTML_IMG = "";
							var URL_IMG = "";
							$.each(response.data.result.Imagen, function (index, elemento) {
								if (elemento.Path_imagen === "") {
									URL_IMG = '' +
										'<a href="' + contex_project + '/resources/img/generic/not_found.png" class="magnific item imgtipo_' + elemento.Tipo_imagen + '" data-title="' + elemento.Nombre_imagen + '">' +
										'	<img class="z-depth-1 img_evidencia"  src="' + contex_project + '/resources/img/generic/not_found.png" width="180" height="130" />' +
										' </a>';
								} else {
									URL_IMG = '' +
										'<a href="data:image/png;base64,' + elemento.Path_imagen + '"" class="magnific item imgtipo_' + elemento.Tipo_imagen + '" data-title="' + elemento.Nombre_imagen + '">' +
										'	<img class="z-depth-1 img_evidencia"  src="data:image/png;base64,' + elemento.Path_imagen + '""  width="180" height="130" />' +
										'</a>';
								}
								_HTML_IMG += '' +
									'	<div class="imagen_content content_img_' + elemento.Tipo_imagen + '  col-md-2">' +
									'     <div class="contenedor_img_evidencia">' +
									'		' + URL_IMG + ' ' +
									'       <div class="middle_img_evidencia">' +
									'         <div class="text_img_evidencia">' + elemento.Nombre_imagen + '  </div>' +
									'       </div>' +
									'     </div>' +
									'   </div>';
							});

							$("#contenido_imagenes").append(_HTML_IMG);
							$(".btn_categoria_img:first ").click().trigger('click')

							//mostrar contenido evidencia
							$("#parent_imagenes").show();
							$("#not_info_evidencia").hide();
						} else {
							limpiarImagenesEvidencia();
							$("#header_categoria_eviden").html('<h5 style="color:#767676" class="text-center">No se encontr\u00F3 evidencia</h5>');

						}
						is_consultar_evidencia = true;
						$('#modal-imagen-ot').modal('show');
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

	limpiarImagenesEvidencia = function () {
		$("#categorias_div .content_category").not(":first").remove();
		$("#contenido_imagenes").empty();

		$("#parent_imagenes").hide();
		$("#not_info_evidencia").show();
	}

	$(document.body).on("click", ".btn_categoria_img", function () {

		if ($(this).hasClass('btn-blue-grey')) return false;

		var id_categoria = $.trim($(this).attr('attr_id_cat'));
		var texto_btn_categoria = $.trim($(this).text());

		if (id_categoria === '') {
			$(".btn_categoria_img").removeClass('btn-blue-grey').addClass('btn-outline-blue-grey');
			$("#categoria_img_0").removeClass('btn-outline-blue-grey').addClass('btn-blue-grey');
			$(".magnific.item").show();
			$('.imagen_content:hidden').show(400);
			setTimeout(function () { mostarImagenesCategoria(); }, 500);

		} else {
			$(".btn_categoria_img").removeClass('btn-blue-grey').addClass('btn-outline-blue-grey');
			$("#categoria_img_" + id_categoria).removeClass('btn-outline-blue-grey').addClass('btn-blue-grey');


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

	$scope.closeModal = function () {
		$('#modal-imagen-ot').modal('hide');
	}

	$scope.datoOt;
	$scope.datoInt;
	$scope.datoSubInt;
	consultaDetalleOt = function (ot, tipo, subtipo, operario, equipo) {
		$("#modal-detalle-ot").removeClass('contenedor_detalle');
		//getDetalleOTGeneric(idOT);
		$scope.consultaDetalleOtGeneric(ot);
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
		$('#modal-detalle-ot .itemGeneral').removeClass('active');
		$('#modal-detalle-ot .itemGeneral:first').addClass('active');
		$scope.datoOt = ot;
		$scope.datoInt = tipo;
		$scope.datoSubInt = subtipo;
		is_consulta_info_trayectoria = false;
		if ($scope.datoInt == "55" && $scope.datoInt == "111" || $scope.datoInt == '106' && $scope.datoSubInt == '107') {
			$("#info_soluciones").show();
		} else {
			$("#info_soluciones").hide();
		}

		//sustitur por el nuevo
		if ($scope.datoInt == '112' && $scope.datoSubInt == '115') {
			$("#corte_individual").show();
		} else {
			$("#corte_individual").hide();
		}

		if ($scope.datoInt == '106' && $scope.datoSubInt == '107') {
			$("#info_cambio_plan").show();
		} else {
			$("#info_cambio_plan").hide();
		}

		if ($scope.datoInt == '108' && $scope.datoSubInt == '109' || $scope.datoInt == '108' && $scope.datoSubInt == '110') {
			$("#info_reubicacion").show();
		} else {
			$("#info_reubicacion").hide();
		}

		if (equipo != 'null') {
			$("#info_cambio_equipo").show();
		} else {
			$("#info_cambio_equipo").hide();
		}

		if ($scope.datoInt == '141') {
			$("#atividad_tecnico").show();
		} else {
			$("#atividad_tecnico").hide();
		}
		if ([276, 260, 263, 261, 278, 275, 277, 259, 262, 274, 265, 264, 258, 141].includes(parseInt($scope.datoInt))) {
			$("#atividad_tecnico").show();
		} else {
			$("#atividad_tecnico").hide();
		}
		if ($scope.datoInt == '48' || $scope.datoInt == '95' || $scope.datoInt == '125') {
			$("#info_red").show();
		} else {
			$("#info_red").hide()
		}
	}

	$scope.consultaDetalleOtGeneric = function (ot) {
		if (!is_consulta_info_ot) {
			let params = {
				Id_ot: ot
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaInfoDetalle(JSON.stringify(params)).then(function success(response) {
				response = arrayDetalleOt;
				console.log(response);
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result.result === '0') {
							if (response.data.result.DatosGeneralesOT.OT !== undefined) {
								console.log(response.data.result.DatosGeneralesOT);
								console.log(response.data.result.DatosGeneralesOT.OT.Direccion.Ciudad);
								$('#ota-ot').html(response.data.result.DatosGeneralesOT.OT.Id_ot);
								$('#ota-os').html(response.data.result.DatosGeneralesOT.OT.Folio_os);
								$('#ota-cuenta').html(response.data.result.DatosGeneralesOT.OT.Num_cuenta);
								$('#ota-cliente').html(response.data.result.DatosGeneralesOT.OT.Nombre_cliente);
								$('#ota-contacto').html(response.data.result.DatosGeneralesOT.OT.Nombre_contacto);
								$('#ota-fecha').html(response.data.result.DatosGeneralesOT.OT.Fecha_agenda);
								$('#ota-estatus').html(response.data.result.DatosGeneralesOT.OT.Status);
								$('#ota-estado').html(response.data.result.DatosGeneralesOT.OT.Estado);
								$('#ota-motivo').html(response.data.result.DatosGeneralesOT.OT.Motivo);
								$('#ota-direccion-latitud').html(response.data.result.DatosGeneralesOT.OT.Direccion.Latitud);
								$('#ota-direccion-longitud').html(response.data.result.DatosGeneralesOT.OT.Direccion.Longitud);;
								$('#ota-direccion-ciudad').html(response.data.result.DatosGeneralesOT.OT.Direccion.Ciudad);
								$('#ota-direccion-estado').html(response.data.result.DatosGeneralesOT.OT.Direccion.Estado);
								$('#ota-direccion-municipio').html(response.data.result.DatosGeneralesOT.OT.Direccion.Municipio);
								$('#ota-direccion-colonia').html(response.data.result.DatosGeneralesOT.OT.Direccion.Colonia);
								$('#ota-direccion-calle').html(response.data.result.DatosGeneralesOT.OT.Direccion.Calle);
								$('#ota-direccion-numero-interior').html(response.data.result.DatosGeneralesOT.OT.Direccion.Numero_interior);
								$('#ota-direccion-numero-exterior').html(response.data.result.DatosGeneralesOT.OT.Direccion.Numero_exterior);
								$('#ota-direccion-codigo-postal').html(response.data.result.DatosGeneralesOT.OT.Direccion.Codigo_postal);
								$('#ota-referencia').html(response.data.result.DatosGeneralesOT.OT.Referencias_urbanas);
								$('#ota-calles').html(response.data.result.DatosGeneralesOT.OT.Entre_calles);
								$('#ota-telefono1').html(response.data.result.DatosGeneralesOT.OT.Telefono_empresa);
								$('#ota-ext').html(response.data.result.DatosGeneralesOT.OT.Extension);
								$('#ota-telefono2').html(response.data.result.DatosGeneralesOT.OT.Telefono_contacto);
								$('#modal-detalle-ot').modal('show');
								is_consulta_info_ot = true;
							} else {
								mostrarMensajeWarningValidacion("No se encontr\u00F3 informaci\u00F3n para la OT");
							}
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
	}

	consultaMaterialesOT = function (ot, operario) {
		let params = {
			Id_OT: ot,
			id_propietario: '1'
		}
		swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		consultaOTService.consultaMaterialOt(JSON.stringify(params)).then(function success(response) {
			console.log(response);
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result !== undefined) {
						if (response.data.result !== null) {
							if (response.data.result.Materiales !== undefined && !response.data.result.Materiales.length) {
								var content = '';
								$.each(response.data.result.Materiales.Material, function (index, mat) {
									content += '<tr>';
									content += '<td>' + mat.Description + '</td>';
									content += '<td>' + mat.SKU + '</td>';
									content += '<td>' + mat.Type + '</td>';
									content += '<td>' + mat.Unit + '</td>';
									content += '</tr>';
								});
							} else {

								if ($.isEmptyObject(response.data.result)) {
									content += '<tr><td style="text-align: center;" colspan="10">' + 'Sin informacion' + '</td></tr>';
								}
								$.each(response.data.result, function (index, mat) {
									content += '<tr>';
									content += '<td>' + mat.descripcion + '</td>';
									content += '<td>' + mat.sku + '</td>';
									content += '<td>' + mat.cantidad + '</td>';
									content += '<td>' + mat.unidad_medida + '</td>';
									content += '</tr>';
								});
							}
						} else {
							content += '<tr><td style="text-align: center;" colspan="10">' + 'Sin informacion' + '</td></tr>';
						}
						$('.idotm').text(ot);
						$('.operariom').text(operario);
						$('#contentmateriales').html(content);
						$('#modal-material-ot').modal('show');
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

	$scope.cerrarModalMaterial = function () {
		$('#modal-material-ot').modal('hide');
	}

	$scope.consultaChat = function () {
		if (!is_consulta_comentarios) {
			let params = {
				IdOT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
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
							is_consulta_comentarios = true;
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

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.consultaHistoricoOt = function () {
		if (!is_consulta_historico) {
			let params = {
				IdOT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaHistorico(JSON.stringify(params)).then(function success(response) {
				response = arrayHistorico;
				console.log(response);
				if (response.data !== undefined) {
					// if (response.data.respuesta) {
					if (response.data.success) {
						if (response.data.result.result === '0') {
							// var content = '';
							// var img_sta = '';
							jsonm = response.data;
							$scope.movimientos = response.data.result.Movimientos.Trackin;
							if (response.data.result.Movimientos !== undefined && response.data.result.Movimientos.Trackin.length > 0) {
								is_consulta_historico = true;
							} else {
								mostrarMensajeWarningValidacion("No se encontraron resultados");
							}
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
		$('.contenedor_detalle').hide();

		$('#comentarios').addClass('active');
		$('#content-comentarios').show();
		$scope.consultaChat();
	});

	document.getElementById('informacion-ot').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#info_historico").removeClass('active')
		$("#acciones").removeClass('active')
		$('.contenedor_detalle').hide();

		$('#informacion-ot').addClass('active');
		$('#content-ot').show();
		$scope.consultaDetalleOtGeneric($scope.datoOt);
	});

	document.getElementById('info_historico').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#informacion-ot").removeClass('active')
		$("#acciones").removeClass('active')
		$('.contenedor_detalle').hide();

		$('#info_historico').addClass('active');
		$('#content-historico').show();
		$scope.consultaHistoricoOt();
	});


	document.getElementById('acciones').addEventListener('click', function () {
		$("#comentarios").removeClass('active')
		$("#informacion-ot").removeClass('active')
		$("#info_historico").removeClass('active')
		$('.contenedor_detalle').hide();

		$('#acciones').addClass('active');
		$("#content_acciones").show();
		// $scope.consultaInformacionRed()
	});

	$('#modal-detalle-ot').on('hidden.bs.modal', function () {
		limpiarVariablesModalDetalle();
		$("#informacion-ot").addClass('active')
		$("#info_historico").removeClass('active')
		$("#comentarios").removeClass('active')
		$("#acciones").removeClass('active')
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
		$("#info_historico").removeClass('active')
		$("#comentarios").removeClass('active')
		$("#acciones").removeClass('active')
		$("#informacion-ot").addClass('active')
	}

	$scope.closeModalDetalle = function () {
		$('#modal-detalle-ot').modal('hide')
		$("#info_historico").removeClass('active')
		$("#comentarios").removeClass('active')
		$("#acciones").removeClass('active')
		$("#informacion-ot").addClass('active')
	}


}])
