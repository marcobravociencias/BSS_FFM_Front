var app = angular.module('misProyectosApp', []);

app.controller('misProyectosController', ['$scope', '$q', 'misProyectosService', 'genericService', function ($scope, $q, misProyectosService, genericService) {
    app.graficaController($scope,$q,misProyectosService);

    $scope.consultarProyectosPM = function() {

        $scope.params = {};
        $scope.params.bandeja = "PMS";
        $q.all([
    		misProyectosService.consultarProyectosPMS($scope.params)
        ]).then(function(results) {
            console.log($scope.resultProyectos);
            results[0].data = $scope.resultProyectos;
            console.log(results);

            $scope.listaProyectosGrafica = results[0].data.result.Proyectos;

            $scope.inicializarGrafica();
        });
    }
    $scope.consultarProyectosPM();

    $scope.idProyectoSelected = '';
    $scope.mostrarPuntas = function(proyecto) {
        console.log(":: mostrarPuntas ::");
        console.log(proyecto);
        if (proyecto.Id_cuenta !== $scope.idProyectoSelected) {
            $scope.idProyectoSelected = proyecto.Id_cuenta;
        } else {
            $scope.idProyectoSelected = '';
            $scope.idPuntaSelected = '';
            $scope.idPlanSelected = '';
        }
    }

    $scope.idPuntaSelected = '';
    $scope.mostrarPlanes = function(punta) {
        console.log(":: mostrarPlanes ::");
        console.log(punta);
        if (punta.Id_cuenta !== $scope.idPuntaSelected) {
            $scope.idPuntaSelected = punta.Id_cuenta;
        } else {
            $scope.idPuntaSelected = '';
            $scope.idPlanSelected = '';
        }
    }

    $scope.listaActividades = [];
    $scope.idPlanSelected = '';
    $scope.consultarActividadesPMS = function(csp) {
        console.log(":: consultarActividadesPMS ::");
        console.log(csp);
        if (csp.Id_csp !== $scope.idPlanSelected) {
            $scope.params = {};
            misProyectosService.consultarActividadesPMS($scope.params).then((result) => {
                console.log("Entra jeje");
                $scope.listaActividades = $scope.resultActividades.result.Actividades;
                $scope.idPlanSelected = csp.Id_csp;
            }).catch((err) => handleError(err));
        } else {
            $scope.idPlanSelected = '';
        }
        
    }


}]);