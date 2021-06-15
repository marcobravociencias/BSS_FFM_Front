var app = angular.module('despachoApp', []);
var detalleTable;
var tableOrdenes;

app.controller('despachoController', ['$scope', 'despachoService', '$filter', function ($scope, despachoService, $filter) {
    console.log("IniciaControllador");

    $scope.isCargaOtsPendientes = true;
    $scope.isCargaOtsAsignadas = true;
    $scope.listaIntervenciones = [];
    $scope.listaClusterService = [];
    $scope.listaOrdenesPendientes = [];
    $scope.mostrarOtsAsignadas = true;

    $scope.consultarFiltrosPE = function() {
        $scope.params = {};
        $scope.params.id_modulo = "2";
        despachoService.consultarFiltrosPE($scope.params).then(function success(response) {
            console.log(response);
            $scope.listaIntervenciones = response.data.result.listFilterIntervencion ? response.data.result.listFilterIntervencion : [];
            $scope.listaClusterService = response.data.result.listArbolFilter ? response.data.result.listArbolFilter : [];
            $scope.listaIntervenciones.map(function(inter) {
                inter.check = true;
                inter.listadoSubInter.map(function(sub) {
                    sub.check = true;
                })
                return inter;
            })
            //$scope.iniciarIntervencionFilter();
            $scope.mostrarArbolCluster();
        }, function error(response) {
            swal.close()
        });
    }
    $scope.consultarFiltrosPE();

    $scope.consultarOrdenesPendientesPE = function() {
        $scope.params = {};
        $scope.params.id_modulo = "2";
        despachoService.consultarOrdenesPendientesPE($scope.params).then(function success(response) {
            console.log(response);
            $scope.listaOrdenesPendientes = response.data.result;
            //$scope.initTableOrdenesPendientes();
            
        }, function error(response) {
            swal.close()
        });
    }
    $scope.consultarOrdenesPendientesPE();

    $scope.initTableOrdenesPendientes = function() {
        console.log($scope.listaOrdenesPendientes);
        /*
        $scope.viewTable = [];
        angular.forEach(listaOrdenes,function(value,key){
            let  arra=[];
            arra[0] = '<div class="col-12 text-center"><i class="fa fa-star star-top-5000"></i></div>';

            $scope.viewTable.push(arra);
        });
        */

        if(tableOrdenes) {
            tableOrdenes.destroy();
        }

        $('.ot-pendiente-event').each(function(index) {	
            console.log(index);
            let otpendiente=$scope.listaOrdenesPendientes[index]   
            $(this).data('event', {
                objectevent: otpendiente ,
                stick: true 			
            });		
            $(this).draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0 
            });
	    });	

        tableOrdenes=$('#tableOTpendiente').DataTable({
            info: false,
            pageLength : 4,
            language: {
                   zeroRecords: "No se encontraron OT\u00B4s",
                   infoEmpty: "No se encontro la OT",
                   infoFiltered: "(OT no encontrada)",
                   paginate: {
                       first:      '<i class="fa fa-fast-backward"></i>',
                       last:       '<i class="fa fa-fast-forward"></i>',
                       next:       ' ',
                       previous:   ' '
                   }
               }
        });

        $('#filterPendiente').keyup( function() {
            console.log("Gg");
            tableOrdenes.draw();
        });

        
    }

    $scope.iniciarIntervencionFilter = function() {

    }

    $scope.mostrarArbolCluster = function() {

        var tree_data = [];
        var icon_check = '';
        //$('#'+idArbol+'').jstree('destroy');

        angular.forEach($scope.listaClusterService,(elem,index) => {
            if (elem.idPadre !== "-1") {
                switch (elem.nivel ){
                    case '0':
                        icon_check='fa fa-building';
                        break;
                    case '1':
                        icon_check='fa fa-globe';
                        break;
                    case '2':
                        icon_check='fa fa-crosshairs';
                        break;
                    case '3':
                        icon_check='fa fa-cubes';
                        break;
                    case '4':
                        icon_check='fa fa-cube';
                        break;					
                }
    
                tree_data.push({
                    id: elem.id,
                    parent: ((elem.idPadre=='nulo' || elem.idPadre=='NULO' || elem.idPadre=='' || elem.idPadre=='null' || elem.idPadre=="-1")?'#':elem.idPadre),
                    nivel:elem.nivel,
                    text: elem.descripcion,
                    icon: icon_check		
                });
                
            }
        });

        console.log(tree_data);
        $("#tree_arbol_cluster").bind('loaded.jstree', function(e, data) {	  

        }).jstree({ 
            core : {
                data : tree_data,
                themes: {
                      name: 'proton',
                      responsive: true
                },
                animation: 100
            },
            plugins : ['checkbox'] 
        });
    }

    $scope.mostrarModalCluster = function() {
        $("#modalClusterFilter").modal('show');
    }

    $scope.listaOperarios = [];
    $scope.consultarOperariosPE = function() {
        $scope.params = {};
        $scope.params.intervencion = "30,97,119,127,153";
        despachoService.consultarOperariosPE($scope.params).then(function success(response) {
            console.log(response);
            $scope.listaOperarios = response.data.result ? response.data.result : [];
            $scope.listaOperariosReasignacion = angular.copy($scope.listaOperarios);
            $scope.consultarOrdenesAsignadasPE();
        }, function error(response) {
            swal.close()
        });
    }
    $scope.consultarOperariosPE();

    $scope.listaOrdenesAsignadas = [];
    $scope.consultarOrdenesAsignadasPE = function() {
        $scope.params = {};
        $scope.params.intervencion = "30,97,119,127,153";
        despachoService.consultarOrdenesAsignadasPE($scope.params).then(function success(response) {
            console.log(response);
            $scope.listaOrdenesAsignadas = response.data.result ? response.data.result : [];
            $scope.asignarOrdenesAsig();
        }, function error(response) {
            swal.close()
        });
    }

    $scope.asignarOrdenesAsig = function() {
        angular.forEach($scope.listaOperarios,function(operario,key){
            operario.ordenesAsignadas = [];
            angular.forEach($scope.listaOrdenesAsignadas,function(orden,key){
                if(operario.nempleado === orden.nempleado) {
                    operario.ordenesAsignadas.push(orden);
                }
            });
        });
    }

    $scope.listaOtsAsignadas = [];
    $scope.mostrarModalOtsAsignadas = function(lista) {
        console.log(lista);
        $scope.mostrarOtsAsignadas = true;
        $scope.listaOtsAsignadas = lista;
        $("#modalOtsAsignadas").modal('show');
    }

    $scope.mostrarTecnicosReasignacion = function(ot) {
        console.log(ot);
        $scope.mostrarOtsAsignadas = false;
    }

    $scope.consultarDetalleOTInspector = function(ot) {
        $scope.params = {};
        $scope.params.id_modulo = "2";
        despachoService.consultarDetalleOTInspector($scope.params).then(function success(response) {
            console.log(response);
           
            swal.close()
        }, function error(response) {
            swal.close()
        });
    }

    $scope.consultarOtsTrabajadasInspector = function(operario) {
        $scope.params = {};
        $scope.params.id_modulo = "2";
        despachoService.consultarOtsTrabajadasInspector($scope.params).then(function success(response) {
            console.log(response);
            
            swal.close()
        }, function error(response) {
            swal.close()
        });
    }
    

    $(document).ready(function(){
        $('#fecha-inicial-filter').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true
        });
        $('#fecha-inicial-filter').datepicker('update',new Date());

        $('#fecha-final-filter').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true
        });
        $('#fecha-final-filter').datepicker('update',new Date());

        
    });
}]);

app.directive('doneOtsPendientes', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            console.log("directive inciializando")
            scope.$parent.initTableOrdenesPendientes()
        }
    };
});