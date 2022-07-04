app.evidenciaController = function ($scope, evidenciaService) {
	console.log("Carga");
    consultaImagenesOT = function (ot, cuenta) {
		console.log("entra");
		let params = {
			orden: ot,
		}
		$('.idoti').text(ot);
        if (cuenta) {

        } else {

        }
		$('.cuenta').text(cuenta);
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$scope.listEvidenciaImagenes = {};
		evidenciaService.consultaImagenesOt(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.evidencias) {
							$scope.listEvidenciaImagenes.imagenes = response.data.result.evidencias;
							$scope.listEvidenciaImagenes.tipos = [];
							$scope.listImagenesTipo = response.data.result.evidencias;
							let listaTipos = [];

							var count_cantidad_por_tipo = groupBy(response.data.result.evidencias, 'idclasificacion');
							response.data.result.evidencias.map(function (e) {
								let isExist = listaTipos.find((t) => e.idclasificacion == t.id)
								if (!isExist) {
									let imagenes = [];
									if (count_cantidad_por_tipo[e.idclasificacion].length) {
										imagenes = count_cantidad_por_tipo[e.idclasificacion]
									}
									listaTipos.push(
										{
											id: e.idclasificacion,
											descripcion: e.clasificacion,
											imagenes: imagenes
										}
									)
								}
							});
							$scope.listEvidenciaImagenes.tipos = listaTipos;
							is_consultar_evidencia = true;
                            $scope.mostrarEvidencia = true;
							$('#modal-imagen-ot').modal('show');//POR SI LLEGA A HABER UN MODAL
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
						mostrarMensajeInformativo("No se encontraron evidencias")
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

	$scope.consultaImagenesOT = function (ot, cuenta) {
		console.log(ot);
		console.log("entra");
		let params = {
			orden: ot,
		}
		$('.idoti').text(ot);
        if (cuenta) {

        } else {

        }
		$('.cuenta').text(cuenta);
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$scope.listEvidenciaImagenes = {};
		evidenciaService.consultaImagenesOt(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.evidencias) {
							$scope.listEvidenciaImagenes.imagenes = response.data.result.evidencias;
							$scope.listEvidenciaImagenes.tipos = [];
							$scope.listImagenesTipo = response.data.result.evidencias;
							let listaTipos = [];

							var count_cantidad_por_tipo = groupBy(response.data.result.evidencias, 'idclasificacion');
							response.data.result.evidencias.map(function (e) {
								let isExist = listaTipos.find((t) => e.idclasificacion == t.id)
								if (!isExist) {
									let imagenes = [];
									if (count_cantidad_por_tipo[e.idclasificacion].length) {
										imagenes = count_cantidad_por_tipo[e.idclasificacion]
									}
									listaTipos.push(
										{
											id: e.idclasificacion,
											descripcion: e.clasificacion,
											imagenes: imagenes
										}
									)
								}
							});
							$scope.listEvidenciaImagenes.tipos = listaTipos;
							is_consultar_evidencia = true;
                            $scope.mostrarEvidencia = true;
							$('#modal-imagen-ot').modal('show');//POR SI LLEGA A HABER UN MODAL
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
						mostrarMensajeInformativo("No se encontraron evidencias")
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

}