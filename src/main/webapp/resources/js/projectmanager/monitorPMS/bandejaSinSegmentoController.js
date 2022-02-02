app.bandejaSinSegmentoController=function($scope,monitorPMSServices){
    let tableBandejaSinSegmento;
	$scope.listSinSeg=[]
	$scope.isConsultaSinSeg=false;
	$scope.searchSinSeg=''
	$scope.mostrarfiltroSinSegmento = false;
	$scope.segmentoList = [];
	$scope.filtroPorSegmentoList = [];
	$scope.encabezadosSegmentoList = [
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
			titulo: 'Folio cotizacion',
			estatu: true,
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
			titulo: 'Fecha',
			estatu: true,
			vista: true
		},
		{
			titulo: 'tipo cotizacion',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Fecturacion potencial',
			estatu: true,
			vista: true
		},
		{
			titulo: 'Nombre vendedor',
			estatu: true,
			vista: true
		}
	];
		
	$scope.primerPeticionSinSeg=function(){
		$scope.mostrarfiltroSinSegmento = false;
		if(!$scope.isConsultaSinSeg){
			if (localStorage.getItem('filtroSegmento')) {
				$scope.encabezadosSegmentoList = JSON.parse(localStorage.getItem('filtroSegmento'));
				$scope.filtroPorSegmentoList = $scope.encabezadosSegmentoList.filter(function(elemento){ return elemento.vista === true });
				if ($scope.filtroPorSegmentoList.length === $scope.encabezadosSegmentoList.length) {
					document.getElementById('checkTodoColumnaSinSegmento').checked = true;
				} else {
					document.getElementById('checkTodoColumnaSinSegmento').checked = false;
				}
			} else {
				document.getElementById('checkTodoColumnaSinSegmento').checked = true;
				$scope.filtroPorSegmentoList = $scope.encabezadosSegmentoList;
			}
			$scope.consultarsinSegmentoBandeja()
		}
	}
	
	$scope.buscarDatoSinSeg=function(tab){
		tableBandejaSinSegmento.search($scope.searchSinSeg).draw()
	}
	
	$scope.consultarsinSegmentoBandeja = function(){
		$scope.listSinSeg=[]
		$scope.isConsultaSinSeg=true
		swal({text: 'Cargando datos ...', allowOutsideClick: false});
        swal.showLoading();
        $scope.llenarTablaSinsegmento()
       /* monitorService.consultarsinSegmento().then(function success(response){
        	console.log(response);
        	if(response.data !== undefined){
        		if(response.data.success){
        			if(response.data.result.result === '0'){
						$scope.segmentoList = response.data.result.cotSinSegmento;
        				$scope.llenarTablaSinsegmento();
        			}else{
        				mostrarMensajeWarning("No se encontro informaci\u00f3n");
                        swal.close();
        			}
        		}else{
        			mostrarMensajeWarning("No se encontro informaci\u00f3n");
	                swal.close();
        		}
        	}else {
                swal.close();
            }
        }, function error(response) {
            swal.close()
        });*/       
	}

	$scope.openfiltroSinSegmento = function () {
		if ($scope.mostrarfiltroSinSegmento) {
			$scope.mostrarfiltroSinSegmento = false;
		} else {
			$scope.mostrarfiltroSinSegmento = true;
		}
	}
	
    /* tableBandejaSinSegmento = $("#segmento-table").DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "scrollX": true,
        "info": false,
        "autoWidth": true,
        "data": $scope.listSinSeg,
        "language": idioma_espanol_not_font,
        "sDom" : '<"top">rt<"bottom"lp><"bottom"r><"clear">',
    }) */
    
    function validarUndefinedSinSeg(el){
        return el===undefined || !el? "Sin informacion":el;
    }
    
    $scope.llenarTablaSinsegmento=function(){
		if(tableBandejaSinSegmento)
        	tableBandejaSinSegmento.destroy()

		setTimeout(function () {

			$("#segmento-table tbody").empty();
			$('#theadSinSegmento').empty();

			$scope.listSinSeg=[]
			let arreTempResultSegmento= [];
			angular.forEach($scope.segmentoList, (elem) => {
				arreSinSeg = [];
				arreSinSeg[0] = validarUndefinedSinSeg(elem.top5000) === "true" ? '<i class="top-cincomil fa fa-star"></i>' : '<i class="top-cincomil-no fa fa-star"></i>';
				arreSinSeg[1] = validarUndefinedSinSeg(elem.segmentoCliente);
				arreSinSeg[2] = validarUndefinedSinSeg(elem.folioCotizacion);
				arreSinSeg[3] = validarUndefinedSinSeg(elem.numeroOportunidad);
				arreSinSeg[4] = validarUndefinedSinSeg(elem.plazo);
				arreSinSeg[5] = validarUndefinedSinSeg(elem.vigenciaCotizacion);
				arreSinSeg[6] = validarUndefinedSinSeg(elem.fechcaCerradaGanada);
				arreSinSeg[7] = validarUndefinedSinSeg(elem.tipoCotizacion);
				arreSinSeg[8] = validarUndefinedSinSeg(elem.facturacionPotencial);
				arreSinSeg[9] = validarUndefinedSinSeg(elem.nombreVendedor);
				arreTempResultSegmento.push(arreSinSeg);
			});

			angular.forEach(arreTempResultSegmento, function (elemento, index) {
				let arrtemp = [];
				angular.forEach($scope.encabezadosSegmentoList, function (head, i) {
					if (head.vista) {
						arrtemp.push(elemento[i])
					}
				})
				$scope.listSinSeg.push(arrtemp)
			})

			let contenTheadSegmento = '';
			$scope.encabezadosSegmentoList.forEach(function (elemento, index) {
				if (elemento.vista) {
					contenTheadSegmento += `<th> ${elemento.titulo} </th>`;
				}
			});
			console.log(contenTheadSegmento);

			$('#theadSinSegmento').append(`<tr> ${contenTheadSegmento} </tr>`);
            tableBandejaSinSegmento = $("#segmento-table").DataTable({
                processing: false,
                ordering: false,
                scrollX: false,
                paging: true,
                lengthChange: false,
                searching: false,
                ordering: false,
                pageLength: 10,
                data: $scope.listSinSeg,
                language: idioma_espanol_not_font,
                sDom: '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                dom: 'Bfrtip'
            });
    	}, 1000);
        swal.close()
	}
	
	$scope.aplicarTodoColumnaSinSegmento = function() {
		if (document.getElementById('checkTodoColumnaSinSegmento').checked) {
		  $scope.encabezadosSegmentoList.forEach((elemento, index) =>{
			if (index !== 0 && index !== 1) {
			  elemento.vista = true;
			}
		  });
		} else{
		  $scope.encabezadosSegmentoList.forEach((elemento, index) =>{
			if (index !== 0 && index !== 1) {
			  elemento.vista = false;
			}
		  });
		}
	}

	$scope.quitarCheckTodoColumnaSinSegmento = function(){
		document.getElementById('checkTodoColumnaSinSegmento').checked = false;
	}

	$scope.aplicarFiltroSinSegmento = function(){
		swal({ text: "Cargando datos ...", allowOutsideClick: false });
		swal.showLoading();
		$scope.mostrarfiltroSinSegmento = false;

		setTimeout(function () {
			$scope.encabezadosSegmentoList.forEach((element, index) => {
				if (index !== 0 && index !== 1) {
					if (element.vista) {
						element.estatu = true;
					} else {
						element.estatu = false;
					}
				}
			});
			$scope.filtroPorSegmentoList = $scope.encabezadosSegmentoList.filter(function(elemento){ return elemento.vista === true });
			localStorage.setItem('filtroSegmento', JSON.stringify($scope.encabezadosSegmentoList));
			if (!localStorage.getItem('expire')) {
				$scope.getSessionExp();
			}
			$scope.llenarTablaSinsegmento()
		}, 100);
	}

	$scope.aplicarFiltroPorSegmento = function(){
		angular.forEach($scope.filtroPorSegmentoList, (elemento,index) =>{
			if (index !== 0 && index !== 1) {
				tableBandejaSinSegmento.column(index).search($('#segmentoSearch'+index).val().trim());
			}
		});
		$scope.mostrarfiltroSinSegmento = false;
		tableBandejaSinSegmento.draw();
	}

	$scope.getSessionExp = function(){
		let fecha = new Date();
		//fecha.setDate(fecha.getDate() + 1);
		let fechaP = fecha.toISOString().split('T')[0]
		let fechaActual = new Date(fechaP);
		localStorage.setItem('expire', fechaActual.getTime());
	}

}