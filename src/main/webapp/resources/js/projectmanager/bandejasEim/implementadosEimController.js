app.implementadosEim = function ($scope, bandejasEimService, $q, genericService) {

    var implementadosTable = $('#implementadosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "searching": false,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font,
        "aoColumnDefs": [
            { "aTargets": [5], "bSortable": false }
        ]
    });

    

    $scope.abrirModalGeografiaImplementados = function(){

    }

    $scope.consultarImplementados = function(){

    }

    $scope.setTextFiltro = function () {
		$('#filtro-estatus-implementados').val($scope.listaSeleccionSelectGral($scope.filtroImplementados.veticalCelula, $scope.nivelVerticalCelulaImpl));
		$('#filtro-vertical-celula-implementados').val($scope.listaSeleccionSelectGral($scope.filtroImplementados.estatus, $scope.nivelEstatusImpl));
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
				$scope.deseleccionarTodosRecursivo(filtro.children, true);
			} else {
				$scope.seleccionarTodosRecursivo(filtro.children, true);
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

};