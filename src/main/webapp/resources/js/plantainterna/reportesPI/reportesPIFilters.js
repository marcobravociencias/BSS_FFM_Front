app.filtroReportes=function($scope,misProyectosManagService){
    $scope.seleccionarTodosRecursivo = function(array, isBtn) {
        array.map(function(e){
            e.checkedOpcion = true;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.seleccionarTodosRecursivo(e.children);
            }
        });
        if(!isBtn){
			$scope.setTextFiltro();
		}
    }

    $scope.deseleccionarTodosRecursivo = function(array, isBtn) {
        array.map(function(e){
            e.checkedOpcion = false;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.deseleccionarTodosRecursivo(e.children);
            }
        });
        if(!isBtn){
			$scope.setTextFiltro();
		}
    }

    $scope.setCheckFiltroGenericV2 = function(filtro, principalArray) {
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

    $scope.checkPadre = function(idPadre, array, principalArray) {
        array.map(function(e){
            if (e.id === idPadre) {
                e.checkedOpcion = e.children.length === e.children.filter(function(e){return e.checkedOpcion}).length;
                $scope.checkPadre(e.idPadre, principalArray, principalArray);
            } else {
                if (e.children !== undefined && e.children.length > 0) {
                    $scope.checkPadre(idPadre, e.children, principalArray);
                }
            }
        });
    }

    $scope.obtenerElementosSeleccionadosFiltro = function(array, nivel) {
        let arrayReturn = [];
        angular.forEach(array,function(elemento,index){
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                arrayReturn.push(elemento.id);
            } else {
                arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
            }
        });
        return arrayReturn;
    }

	
}