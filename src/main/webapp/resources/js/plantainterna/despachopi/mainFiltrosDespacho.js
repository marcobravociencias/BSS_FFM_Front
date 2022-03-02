app.filtrosDespachoPrincipal=function($scope,misProyectosManagService){
    
    $scope.seleccionarTodos=function(paramFiltroParent){
        paramFiltroParent.map(function(e){
            e.checkedOpcion=true
        })

        paramFiltroParent.map(function(e){
            e.children.map(function(j){
                j.checkedOpcion=true
                return j
            })
        }) 
    }

    $scope.seleccionarTodosRecursivo = function(array) {
        array.map(function(e){
            e.checkedOpcion = true;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.seleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.deseleccionarTodos=function(paramFiltroParent){
        paramFiltroParent.map(function(e){
            e.checkedOpcion=false
        })
        paramFiltroParent.map(function(e){
            e.children.map(function(j){
                j.checkedOpcion=false
                return j
            })
        }) 
    }

    $scope.deseleccionarTodosRecursivo = function(array) {
        array.map(function(e){
            e.checkedOpcion = false;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.deseleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.setCheckFiltroGeneric=function( filtroParent){
        console.log( filtroParent.checkedOpcion)
        console.log("#####---------")
        console.log(  filtroParent.children )

         filtroParent.checkedOpcion=! filtroParent.checkedOpcion
         filtroParent.children.map(function(e){
            e.checkedOpcion= filtroParent.checkedOpcion
            return e
        })
        console.log("#####")
        console.log(  filtroParent.children )
        console.log( filtroParent.checkedOpcion)
    }
    $scope.setCheckSubFiltroGeneric=function(subFiltro,parentFiltro){
        subFiltro.checkedOpcion=!subFiltro.checkedOpcion
        let cantidadSubfiltros=parentFiltro.children.length        
        let cantidadChecked=parentFiltro.children.filter(function(e){return e.checkedOpcion}).length
        parentFiltro.checkedOpcion= cantidadSubfiltros !== cantidadChecked ? false :true
    }   

    $scope.setCheckFiltroGenericV2 = function(filtro, principalArray) {
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

}
