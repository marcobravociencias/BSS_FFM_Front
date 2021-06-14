app.filtrosDespachoPrincipal=function($scope,misProyectosManagService){
    $scope.seleccionarTodos=function(){
        $scope.filtrosGeneral.General_filtros.filtros.map(function(e){
            e.checkedOpcion=true
        })

        $scope.filtrosGeneral.General_filtros.filtros.map(function(e){
            e.subfiltros.map(function(j){
                j.checkedOpcion=true
                return j
            })
        }) 
    }
    $scope.deseleccionarTodos=function(){
        $scope.filtrosGeneral.General_filtros.filtros.map(function(e){
            e.checkedOpcion=false
        })
        $scope.filtrosGeneral.General_filtros.filtros.map(function(e){
            e.subfiltros.map(function(j){
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
    $scope.setCheckSubIntervencion=function(subInt,intervencion){
        subInt.checkedOpcion=!subInt.checkedOpcion


        let cantidadSubfiltros=intervencion.subfiltros.length
        let cantidadChecked=intervencion.subfiltros.filter(function(e){return e.checkedOpcion}).length
        intervencion.checkedOpcion=cantidadSubfiltros !== cantidadChecked ? false :true
    }   
}
