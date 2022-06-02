var app = angular.module('vistaChecklistApp', []);

app.controller('vistaChecklistController', ['$scope', '$q', 'vistaChecklistService', '$filter', 'genericService', function ($scope, $q, vistaChecklistService, $filter, genericService) {
    let evidenciasTable;
    $scope.listaEvidencias = [];
    $scope.detalleEvidencia = [];
    $scope.nGeografia = '';
    $scope.listaGeografia = [];
    $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };
    $scope.nInterveciones = '';
    $scope.arrayIntervenciones = []
    $scope.banderaErrorIntervencion = false
    $scope.banderaErrorEstatus = false
    $scope.arrayEstatus = []
    $scope.nFiltroEstatus = ''
    $scope.respaldoArrayEstatus = []
    $scope.camposFiltro = {
        idot: '',
        idos: ''
    }

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    evidenciasTable = $('#evidenciasTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font
    });

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'es',
        todayHighlight: true,
        clearBtn: false
    });
    $('.datepicker').datepicker('update', new Date());

    $('#searchTextGeneral').on('keyup', function () {
        evidenciasTable.search(this.value).draw();
    })

    $('#searchGeoConsulta').on('keyup', function () {
        $("#jstreeConsulta").jstree("search", this.value);
    })

    $("#modalDetalle").on("hidden.bs.modal", function () {
        $(".radio-evidencias").prop("checked", false);
        $(".checkbox-evidencia").prop("checked", false);
        $(".checkbox-evidencia").removeClass("rechazada-check");
        $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };
    })


    $scope.obtenerNivelUltimoJerarquia = function (data) {
        return data.sort(compareGeneric)[0].nivel
    }

    $scope.respaldoIntervecionesArray = [];
    $scope.getInformacionGeneral = function () {
        $q.all([
            vistaChecklistService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloVistaChecklist" }),
            vistaChecklistService.consultarGeografiaChecklist(),
            genericService.consultarCatalogoIntervenciones(),
            genericService.consultarCatalogoEstatusDespachoPI()
        ]).then(function (results) {
            if (results[0].data.result && results[0].data.respuesta) {
                $scope.nGeografia =  5////results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_GEOGRAFIA) : null;
                $scope.nInterveciones = null //results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_INTERVENCIONES ? Number(results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_INTERVENCIONES) : null;
                $scope.nfiltroestatusDisponbiles = null //results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_ARRAY ? results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_ARRAY  : null;
                $scope.nFiltroEstatus = null//results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_PENDIENTES ? Number(results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_PENDIENTES)  : null;
            } else {
                mostrarMensajeErrorAlert(results[0].data.resultDescripcion)
            }
            if (results[1].data.result && results[1].data.respuesta) {
                if (results[1].data.result) {
                    if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {
                        let listGeo = [];

                        if ($scope.nGeografia) {
                            listGeo = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
                        } else {
                            listGeo = results[1].data.result.geografia;
                        }
                        $scope.listaGeografia = listGeo;
                        let geografia = listGeo;
                        geografia.map((e) => {
                            e.parent = e.padre == null ? "#" : e.padre;
                            e.text = e.nombre;
                            e.icon = "fa fa-globe";
                            e.state = {
                                opened: true,
                                selected: true,
                            }
                            return e
                        })
                        $('#jstreeConsulta').bind('loaded.jstree', function (e, data) {
                            $scope.consultaEvidencias();
                        }).jstree({
                            'plugins': ["wholerow", "checkbox", "search"],
                            'core': {
                                'data': geografia,
                                'themes': {
                                    'name': 'proton',
                                    'responsive': true,
                                    "icons": false
                                }
                            },
                            "search": {
                                "case_sensitive": false,
                                "show_only_matches": true
                            }
                        });

                    } else {
                        mostrarMensajeWarningValidacion('No existen geografias actualmente')
                    }
                } else {
                    mostrarMensajeErrorAlert(results[1].data.result.mensaje)
                }
            } else {
                mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
            }
            if (results[2].data.result && results[2].data.respuesta) {
                if (results[2].data.result) {
                    $scope.respaldoIntervecionesArray = results[2].data.result
                    if ($scope.nInterveciones) {
                        $scope.arrayIntervenciones = $scope.conversionAnidadaRecursiva($scope.respaldoIntervecionesArray,1, $scope.nInterveciones)
                    } else {
                        let ultimoNivel = $scope.obtenerNivelUltimoJerarquia(results[2].data.result)
                        $scope.arrayIntervenciones = $scope.conversionAnidadaRecursiva($scope.respaldoIntervecionesArray,1, ultimoNivel)
                    }
                    
                   
                } else {
                    mostrarMensajeWarningValidacion('No existen intervenciones actualmente')
                    $scope.banderaErrorIntervencion = true
                }
            } else {
                mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
            }

            if (results[3].data.result && results[3].data.respuesta) {
                if (results[3].data.result) {
                    $scope.respaldoArrayEstatus = results[3].data.result
                    if( $scope.nfiltroestatusDisponbiles != undefined  &&  $scope.nfiltroestatusDisponbiles ){
                        let tempSlice=$scope.nfiltroestatusDisponbiles.split(",").map(e=>parseInt(e));
                        let tempArray=[]
                        angular.forEach( tempSlice , function(  elm , index ){
                            let elemEstatus=angular.copy(results[3].data.result.find( e => e.id == elm ) )
                            if( !elemEstatus != undefined )
                                tempArray.push(  elemEstatus )
                        });
                        $scope.arrayEstatus = tempArray
                    } else{
                        let ultimoNivel = $scope.obtenerNivelUltimoJerarquia(results[3].data.result)
                        $scope.arrayEstatus = $scope.conversionAnidadaRecursiva(results[3].data.result,1, ultimoNivel)
                    }
                } else {
                    mostrarMensajeWarningValidacion('No existen estatus actualmente')
                    $scope.banderaErrorEstatus = true
                }
            } else {
                mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
            }
            

        }).catch(err => handleError(err));
    }

    $scope.getInformacionGeneral();

    $scope.consultaEvidencias = function () {


        let arraRow = [];
        let params = {

        }
        /*
        vistaChecklistService.consultarEvidencias(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        */
        $scope.listaEvidencias = listaEvidencia.result;
        $.each($scope.listaEvidencias, function (i, elemento) {
            let row = [];
            row[0] = elemento.ot ? elemento.ot : '-';
            row[1] = elemento.os ? elemento.os : '-';
            row[2] = elemento.distrito_name ? elemento.distrito_name : '-';
            row[3] = elemento.num_cuenta ? elemento.num_cuenta : '-';
            row[4] = elemento.cliente ? elemento.cliente : '-';
            row[5] = elemento.direccion ? elemento.direccion : '-';
            row[6] = elemento.tecnico ? elemento.tecnico : '-';
            row[7] = elemento.estatus ? elemento.estatus : '-';
            row[8] = '<i class="fas fa-bars icon-table" title="Detalle" onclick="consultaDetalle(' + "'" + elemento.ot + "'" + ')"></i>';
            arraRow.push(row);
        })
        /*
    } else {
        toastr.warning('No se encontró ningún valor');
    }
} else {
    toastr.warning(response.data.resultDescripcion);
}
} else {
toastr.error('Ha ocurrido un error en la consulta');
}
})
*/

        evidenciasTable = $('#evidenciasTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "bDestroy": true,
            "info": true,
            "scrollX": false,
            "data": arraRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });

    }


    consultaDetalle = function (id) {

        /*
        let params = {

        }

        vistaChecklistService.consultarDetalleEvidencias(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        */
        $scope.detalleEvidencia = detalleEvidencias.result.evidencias;
        $scope.$apply();
        console.log($scope.detalleEvidencia);
        $("#modalDetalle").modal('show');
        $scope.applyMagnific();
        /*

    } else {
        toastr.warning('No se encontró ningún valor');
    }
} else {
    toastr.warning(response.data.resultDescripcion);
}
} else {
toastr.error('Ha ocurrido un error en la consulta');
}
})
*/

    }

    $scope.abrirModalGeografia = function () {
        $("#modalGeografia").modal('show');
    }

    $scope.seleciconarTodas = function (isSelected) {
        if (isSelected == '1') {
            $(".checkbox-evidencia").prop("checked", true);
            $(".checkbox-evidencia").removeClass("rechazada-check");
            $scope.listaTotal.aceptadas = $scope.detalleEvidencia.length;
            $scope.listaTotal.rechazadas = 0;
        } else {
            $(".checkbox-evidencia").prop("checked", false);
            $(".checkbox-evidencia").addClass("rechazada-check");
            $scope.listaTotal.rechazadas = $scope.detalleEvidencia.length;
            $scope.listaTotal.aceptadas = 0;
        }
    }

    $scope.changeSelect = function (element) {
        $(".radio-evidencias").prop("checked", false);
        let id = element.target.id;
        if ($("#" + id).is(":checked")) {
            $("#" + id).removeClass("rechazada-check");
            $scope.listaTotal.rechazadas = $scope.listaTotal.rechazadas !== 0 ? $scope.listaTotal.rechazadas - 1 : 0;
            $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas + 1;
        } else {
            $("#" + id).addClass("rechazada-check");
            $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas !== 0 ? $scope.listaTotal.aceptadas - 1 : 0;
            $scope.listaTotal.rechazadas = $(".rechazada-check").length;
        }
    }

    $scope.guardarEvidencia = function () {
        let aceptadas = [];
        let rechazadas = [];
        
        $.each($scope.detalleEvidencia, function (i, elemento) {
            if ($("#check_" + elemento.idEvidencia).is(":checked")) {
                aceptadas.push(elemento.idEvidencia);
            }
        });
        
        $.each($(".rechazada-check"), function (i, elemento) {
            let id = (elemento.id).split("_")[1];
            rechazadas.push(id);
        });
        console.log(aceptadas);
        console.log(rechazadas);
    }

    $scope.applyMagnific = function () {
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

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
        $("#moduloChecklist").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });

    $scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
		let arrayReturn = [];
		angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
			let elemento = angular.copy(elem);
			elemento.checkedOpcion = true;
			if (nivelInit < maxNivel) {
				elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => e2.idPadre === elemento.id);
				elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
			}
			arrayReturn.push(elemento)
		});
		return arrayReturn;
	}

    $scope.seleccionarTodosRecursivo = function (array) {
		array.map(function (e) {
			e.checkedOpcion = true;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.seleccionarTodosRecursivo(e.children);
			}
		});
	}

	$scope.deseleccionarTodosRecursivo = function (array) {
		array.map(function (e) {
			e.checkedOpcion = false;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.deseleccionarTodosRecursivo(e.children);
			}
		});
	}

    $scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
		if (filtro.children !== undefined && filtro.children.length > 0) {
			if (filtro.checkedOpcion) {
				$scope.deseleccionarTodosRecursivo(filtro.children);
			} else {
				$scope.seleccionarTodosRecursivo(filtro.children);
			}
		}
		filtro.checkedOpcion = !filtro.checkedOpcion;
		$scope.checkPadre(filtro.idPadre, principalArray, principalArray);
	}

    $scope.checkPadre = function (idPadre, array, principalArray) {
		array.map(function (e) {
			if (e.id === idPadre) {
				e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
				$scope.checkPadre(e.idPadre, principalArray, principalArray);
			} else {
				if (e.children !== undefined && e.children.length > 0) {
					$scope.checkPadre(idPadre, e.children, principalArray);
				}
			}
		});
	}

    $scope.pintarNombreEstatus = function (array, input) {
		let textoEstatus = $scope.mostrarNombresEstatus(array);
		$(input).val(textoEstatus);
		if (textoEstatus.length > 0) {
			$(input).css("border-bottom", "2px solid #d9d9d9");
		}
	}

    $scope.mostrarNombresEstatus = function (array) {
		let arrayNombre = [];
		angular.forEach(array, function (elemento, index) {
			if (elemento.checkedOpcion) {
				arrayNombre.push(elemento.nombre);
			}
			if (elemento.children !== undefined && elemento.children.length > 0) {
				arrayNombre = arrayNombre.concat($scope.mostrarNombresEstatus(elemento.children));
			}
		});
		return arrayNombre;
	}

    $scope.obtenerUltimoNivelFiltros = function (array) {
		return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
	}

    $scope.listaSeleccionSelectGral = function (array, nivel) {
		let arrayReturn = "";
		angular.forEach(array, function (elemento, index) {
			if (elemento.nivel == nivel && elemento.checkedOpcion) {
				if (arrayReturn !== "") {
					arrayReturn += ',';
				}
				arrayReturn += elemento.nombre.toUpperCase();
			} else {
				arrayReturn = arrayReturn.concat($scope.listaSeleccionSelectGral(elemento.children, nivel));
			}
		});
		return arrayReturn;

	}

    $scope.limpiarCamposFiltro = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.camposFiltro.idos = "";
				break;
			case 2:
				$scope.camposFiltro.idot = "";
				break;
			case 3:
				$scope.camposFiltro.idot = "";
				$scope.camposFiltro.idos = "";
				break;
			default:
				break;
		}
	}

    $scope.buscarCheckList = function(){
        
        let intervenciones = []
        if ($scope.nInterveciones) {
            intervenciones = $scope.obtenerElementosSeleccionadosFiltro($scope.arrayIntervenciones, $scope.nInterveciones);
        } else{
            let ultimoNivel = $scope.obtenerNivelUltimoJerarquia($scope.respaldoIntervecionesArray)
            intervenciones =  $scope.obtenerElementosSeleccionadosFiltro($scope.arrayIntervenciones, ultimoNivel);
        }
        

        let estatusDisponiblesCheck = [];
        if ($scope.nFiltroEstatus) {
            estatusDisponiblesCheck = $scope.obtenerElementosSeleccionadosFiltro($scope.arrayEstatus, $scope.nFiltroEstatus);
        } else {
            let ultimoNivelEstatus = $scope.obtenerNivelUltimoJerarquia($scope.respaldoArrayEstatus)
            estatusDisponiblesCheck = $scope.obtenerElementosSeleccionadosFiltro($scope.arrayEstatus, ultimoNivelEstatus);
        }
       

        let clustersparam = []
        if ($scope.nGeografia) {
            clustersparam = $("#jstreeConsulta").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nGeografia)
            .map(e => parseInt(e.id))
        } else{
            let nivelBusquedaArbol = $scope.obtenerNivelUltimoJerarquia($scope.listaGeografia)
            clustersparam = $("#jstreeConsulta").jstree("get_selected", true)
                .filter(e => e.original.nivel == nivelBusquedaArbol)
                .map(e => parseInt(e.id))
        }
        let params = {
            ot: $scope.camposFiltro.idot,
            os: $scope.camposFiltro.idos,
            intervecion: intervenciones,
            estatus: estatusDisponiblesCheck,
            cluster: clustersparam,
            fechaInicio: document.getElementById('filtro_fecha_inicio').value,
            fechaFin: document.getElementById('filtro_fecha_fin').value
        }

        console.log(params)
       
    }

    $scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
        let arrayReturn = [];
        angular.forEach(array, function (elemento, index) {
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                arrayReturn.push(elemento.id);
            } else {
                arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
            }
        });
        return arrayReturn;
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

}])