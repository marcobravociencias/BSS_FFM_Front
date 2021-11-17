app.filtroReportes=function($scope,misProyectosManagService){
    $scope.seleccionarTodos=function(paramFiltroParent){
        console.log(paramFiltroParent);
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
    $scope.deseleccionarTodos=function(paramFiltroParent){
        console.log(paramFiltroParent);
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

    $scope.setCheckIntervencion=function(elementoInt){
        console.log(elementoInt.checkedOpcion)
        console.log("#####---------")
        console.log( elementoInt.subfiltros )

        elementoInt.checkedOpcion=!elementoInt.checkedOpcion
        elementoInt.subfiltros.map(function(e){
            e.checkedOpcion=elementoInt.checkedOpcion
            return e
        })
        console.log("#####")
        console.log( elementoInt.subfiltros )
        console.log(elementoInt.checkedOpcion)
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
    
  
	
}