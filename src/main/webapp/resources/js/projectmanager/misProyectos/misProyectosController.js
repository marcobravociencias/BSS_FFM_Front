var app = angular.module('misProyectosApp', []);

app.controller('misProyectosController', ['$scope', '$q', 'misProyectosService', 'genericService', function ($scope, $q, misProyectosService, genericService) {
    app.graficaController($scope,$q,misProyectosService);

    moment.locale('es-mx');
    $scope.nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];

    $scope.consultarProyectosPM = function() {

        /*
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
        */

        $scope.listaProyectosGrafica = $scope.resultProyectos.result.Proyectos;
        $scope.inicializarGrafica();
    }
    $scope.consultarProyectosPM();

    $scope.idProyectoSelected = '';
    $scope.mostrarPuntas = function(proyecto) {
        console.log(":: mostrarPuntas ::");
        console.log(proyecto);
        if (proyecto.Id_cuenta !== $scope.idProyectoSelected) {
            $scope.idProyectoSelected = proyecto.Id_cuenta;
            $scope.inicializarGraficaPuntas(proyecto);
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
            $scope.inicializarGraficaPlanes(punta);
        } else {
            $scope.idPuntaSelected = '';
            $scope.idPlanSelected = '';
        }
    }

    $scope.listaActividades = [];
    $scope.idPlanSelected = '';
    $scope.consultarActividadesPMS = function(csp) {
        if (csp.Id_csp !== $scope.idPlanSelected) {
            $scope.params = {};
            misProyectosService.consultarActividadesPMS($scope.params).then((result) => {
                $scope.listaActividades = $scope.resultActividades.result.Actividades;
                $scope.idPlanSelected = csp.Id_csp;
                $scope.inicializarGraficaActividades();
            }).catch(err => handleError(err));
        } else {
            $scope.idPlanSelected = '';
        }
        
    }


}]);