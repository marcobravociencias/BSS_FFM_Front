var app = angular.module('inspectorIncidenciaApp', []);

app.controller('inspectorIncidenciaController', ['$scope', '$q', 'inspectorIncidenciaService', function ($scope, $q, inspectorIncidenciaService) {

    $scope.filtrosInspector = {};

    $scope.initInspectorIncidencia = function(){
        $('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: true
		});
		$('.datepicker').datepicker('update', new Date());
    }
    $scope.initInspectorIncidencia();

    $scope.initMapa = function(){
        map = new google.maps.Map(document.getElementById('mapaInspectorIncidencia'), {
            center : {
                lat : parseFloat( 19.4326 ),
                lng : parseFloat( -99.1332 )
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_TOP             
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },streetViewControlOptions :{
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            mapTypeControl: true,
            zoom :  12 ,
            disableDoubleClickZoom: true
        });
    }

    $scope.initCatalogos = function(){
        $scope.filtrosInspector.fallas = arrayFallas.data.result;
        $scope.filtrosInspector.statusFallas = arrayStatusFallas.data.result;
        $scope.filtrosInspector.coloresStatus = arrayColoresStatus.data.result[3];
        console.log("FILTROSSS***********");
        console.log($scope.filtrosInspector);
        console.log("********************");
    }
    $scope.initCatalogos();
    
    $scope.consultarCatalogosInspectorIncidencia = function(){
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
        $q.all([
            inspectorIncidenciaService.consultarFallasInspectorIncidencia(),
            inspectorIncidenciaService.consultarStatusFallasInspectorIncidencia(),
            inspectorIncidenciaService.systemColor()
        ]).then(function (results) {
            if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.filtrosInspector.fallas = results[0].data.result
					} else {
						toastr.warning('No se encontraron datos de Fallas');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de Fallas');
			}
            if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						$scope.filtrosInspector.statusFallas = results[1].data.result
					} else {
						toastr.warning('No se encontraron statusFallas');
					}
				} else {
					toastr.warning(results[1].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de estatus fallas');
			}
            if (results[2].data !== undefined) {
				if (results[2].data.respuesta) {
					if (results[2].data.result) {
						$scope.filtrosInspector.colorStatus = results[2].data.result[3]
					} else {
						toastr.warning('No se encontraron statusFallas');
					}
				} else {
					toastr.warning(results[2].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de estatus fallas');
			}
        }).catch(err => handleError(err));
    }

    $scope.initMapa();
}]);