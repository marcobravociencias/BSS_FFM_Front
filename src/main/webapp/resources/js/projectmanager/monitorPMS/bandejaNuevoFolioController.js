app.bandejaNuevoFolioController = function($scope,monitorPMSServices){
    let tableBandejaNuevoFolio;
    $scope.listNuevoFolio = []
    $scope.isConsultaNuevosFolios = false
    $scope.searchNuevoFolio = ""
    $scope.mostrarfiltroNuevoFolio = false;
    $scope.nuevoFolioList = [];
    $scope.filtroPorFolio = [];
	$scope.encabezadosNuevoFolioList = [
		{
			titulo: '',
			estatu: false,
			vista: true
		},
		{
			titulo: 'Nuevo segmento',
			estatu: false,
			vista: true
		},
		{
			titulo: 'Oportunidad',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Plazo',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Vigencia cotizacion',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Cotizacion',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Nombre PM',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Id Cotizacion',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Folio Cotizacion',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Facturacion Potencial',
			estatu: true,
			vista: true
		},
		{
			titulo: '#Oportunidad',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Nombre vendedor',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Segmento',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Gerencia',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Region',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Plaza',
			estatu: true,
			vista: true
		}
	  ];
		
	$scope.primerPeticionNuevosFolios = function () {
		$scope.mostrarfiltroNuevoFolio = false;
		if (!$scope.isConsultaNuevosFolios) {
			if (localStorage.getItem('filtroFolio')) {
				$scope.encabezadosNuevoFolioList = JSON.parse(localStorage.getItem('filtroFolio'));
				$scope.filtroPorFolio = $scope.encabezadosNuevoFolioList.filter(function(elemento){ return elemento.vista === true });
				if ($scope.filtroPorFolio.length === $scope.encabezadosNuevoFolioList.length) {
					document.getElementById('checkTodoColumnaNuevoFolio').checked = false;
				} else {
					document.getElementById('checkTodoColumnaNuevoFolio').checked = true;
				}
			} else {
				document.getElementById('checkTodoColumnaNuevoFolio').checked = true;
				$scope.filtroPorFolio = $scope.encabezadosNuevoFolioList;
			}	
			$scope.consultarBandejaNuevoFolio()
		}
	}

	$scope.openfiltroNuevoFolio = function () {
		if ($scope.mostrarfiltroNuevoFolio) {
			$scope.mostrarfiltroNuevoFolio = false;
		} else {
			$scope.mostrarfiltroNuevoFolio = true;
		}
	}
	
	$scope.buscarDatoNuevoFolio=function(){
		tableBandejaNuevoFolio.search($scope.searchNuevoFolio).draw()
	}
	
	$scope.consultarBandejaNuevoFolio = function () {
		$scope.listNuevoFolio = []
		$scope.isConsultaNuevosFolios = true
		swal({ text: 'Cargando datos ...', allowOutsideClick: false });
		swal.showLoading();
		var params = new FormData();
        params.append("params.idPmFFM", "14922");
        params.append("params.idPuesto", "9");
        $scope.llenarTablaNuevoFolio();
		/*monitorService.consultarNuevosFolios(params).then(function success(response) {
			console.log(response);
			if (response.data !== undefined) {
				if (response.data.success) {
					if (response.data.result.result === '0') {
						$scope.nuevoFolioList = response.data.result.foliosNuevos;
						$scope.llenarTablaNuevoFolio();
					} else {
						mostrarMensajeWarning("No se encontro informaci\u00f3n");
						swal.close();
					}
				} else {
					mostrarMensajeWarning("No se encontro informaci\u00f3n");
					swal.close();
				}
			} else {
				swal.close();
			}
		}, function error(response) {
			swal.close()
		});*/
	}
	
  /*   tableBandejaNuevoFolio = $("#nuevo_folio-table").DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "scrollX": true,
        "info": false,
        "autoWidth": true,
        "data": $scope.listNuevoFolio,
        "language": idioma_espanol_not_font,
        "sDom" : '<"top">rt<"bottom"lp><"bottom"r><"clear">',
    }) */
    
    function validarUndefinedNF(el){
        return el===undefined || !el? "Sin informacion":el;
  
    }
    
	$scope.llenarTablaNuevoFolio = function () {
		if (tableBandejaNuevoFolio)
			tableBandejaNuevoFolio.destroy()

		setTimeout(() => {

			$("#nuevo_folio-table tbody").empty()
			$('#theadNuevoFolio').empty();


			let arreTempNF = [];
			$scope.listNuevoFolio = [];
			angular.forEach($scope.nuevoFolioList, elem => {
				arreNF = [];
				arreNF[0] = validarUndefinedNF(elem.top5000) === 'true' ? '<i class="top-cincomil fa fa-star"></i>' : '<i class="top-cincomil-no fa fa-star"></i>'
				arreNF[1] = validarUndefinedNF(elem.segmentoCliente)
				arreNF[2] = validarUndefinedNF(elem.nombreOportunidad)
				arreNF[3] = validarUndefinedNF(elem.plazo)
				arreNF[4] = validarUndefinedNF(elem.vigenciaCotizacion)
				arreNF[5] = validarUndefinedNF(elem.tipoCotizacion)
				arreNF[6] = validarUndefinedNF(elem.nombrePm)
				arreNF[7] = validarUndefinedNF(elem.idCotizacion)
				arreNF[8] = validarUndefinedNF(elem.folioCotizacion)
				arreNF[9] = validarUndefinedNF(elem.facturacionPotencial)
				arreNF[10] = validarUndefinedNF(elem.numOportunidad)
				arreNF[11] = validarUndefinedNF(elem.nombreVendedor)
				arreNF[12] = validarUndefinedNF(elem.segmento)
				arreNF[13] = validarUndefinedNF(elem.gerencia)
				arreNF[14] = validarUndefinedNF(elem.region)
				arreNF[15] = validarUndefinedNF(elem.plaza)
				arreTempNF.push(arreNF)
			})

			angular.forEach(arreTempNF, function (elemento, index) {
				let arrtemp = [];
				angular.forEach($scope.encabezadosNuevoFolioList, function (head, i) {
					if (head.vista) {
						arrtemp.push(elemento[i])
					}
				})
				$scope.listNuevoFolio.push(arrtemp)
			})


			let contenTheadFolio = '';
			$scope.encabezadosNuevoFolioList.forEach(function (elemento, index) {
				if (elemento.vista) {
					contenTheadFolio += `<th> ${elemento.titulo} </th>`;
				}
			});
			console.log(contenTheadFolio);

			$('#theadNuevoFolio').append(`<tr> ${contenTheadFolio} </tr>`);
			tableBandejaNuevoFolio = $('#nuevo_folio-table').DataTable({
				processing: false,
                ordering: false,
                scrollX: false,
                paging: true,
                lengthChange: false,
                searching: false,
                ordering: false,
                pageLength: 10,
                data: $scope.listNuevoFolio,
                language: idioma_espanol_not_font,
                sDom: '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                dom: 'Bfrtip'
			});
		}, 1000);
        swal.close()
	}

	$scope.aplicarTodoColumnaNuevoFolio = function () {
		if (document.getElementById('checkTodoColumnaNuevoFolio').checked) {
			$scope.encabezadosNuevoFolioList.forEach((elemento, index) => {
				if (index !== 0 && index !== 1) {
					elemento.vista = true;
				}
			});
		} else {
			$scope.encabezadosNuevoFolioList.forEach((elemento, index) => {
				if (index !== 0 && index !== 1) {
					elemento.vista = false;
				}
			});
		}
	}


	$scope.quitarCheckTodoColumnanuevoFolio = function () {
		document.getElementById('checkTodoColumnaNuevoFolio').checked = false;
	}

	$scope.aplicarFiltroNuevoFolio = function () {
		swal({ text: "Cargando datos ...", allowOutsideClick: false });
		swal.showLoading();
		$scope.mostrarfiltroNuevoFolio = false;

		setTimeout(() => {
			$scope.encabezadosNuevoFolioList.forEach((element, index) => {
				if (index !== 0 && index !== 1) {
					if (element.vista) {
						element.estatu = true;
					} else {
						element.estatu = false;
					}
				}
			});
			$scope.filtroPorFolio = $scope.encabezadosNuevoFolioList.filter(function(elemento){ return elemento.vista === true });
			localStorage.setItem('filtroFolio', JSON.stringify($scope.encabezadosNuevoFolioList));
			if (!localStorage.getItem('expire')) {
				$scope.getSessionExp();
			}
			$scope.llenarTablaNuevoFolio()
		}, 100);
	}

	$scope.aplicarFiltroPorFolio = function(){
		angular.forEach($scope.filtroPorFolio, (elemento, index) =>{
			if (index !== 0 && index !== 1) {
				tableBandejaNuevoFolio.column(index).search($('#folioSearch'+index).val().trim());
			}
		});
		$scope.mostrarfiltroNuevoFolio = false;
		tableBandejaNuevoFolio.draw();
	}

	
	$scope.getSessionExp = function(){
		let fecha = new Date();
		//fecha.setDate(fecha.getDate() + 1);
		let fechaP = fecha.toISOString().split('T')[0]
		let fechaActual = new Date(fechaP);
		localStorage.setItem('expire', fechaActual.getTime());
	}

}