var app = angular.module('disponibilidadV2App', []);

app.controller('disponibilidadV2Controller', ['$scope', 'disponibilidadV2Service', 'genericService', '$q', function ($scope, disponibilidadV2Service, genericService, $q) {
    
    $scope.listaIntervenciones = [];

    $scope.consultarCatalogos = function () {
        $scope.arrayTurnosDisponibilidad = []
        let params = {
            moduloAccionesUsuario: 'moduloDisponibilidad'
        }
        $q.all([
            genericService.consultarConfiguracionDespachoDespacho(params),
            genericService.consultarCatalogoIntervenciones(),
            genericService.consulCatalogoGeografia()
        ]).then(result => {
            if (result[0].data.respuesta) {
                let resultConf= result[0].data.result
            }

            if (result[1].data.respuesta) {
                if (result[1].data.result) {
                    let intervencionesArray = [];
                    //PENDIENTE
                    $scope.listaIntervenciones = result[1].data.result.filter(elemento => { return elemento.nivel === 2 && elemento.aplicaDisponibilidad === 1});
                    /*
                    if ($scope.nIntervencion) {
                        intervencionesArray = result[1].data.result.filter(elemento => { return elemento.nivel <= 4 && elemento.aplicaDisponibilidad === 1});
                    } else {
                        intervencionesArray = result[1].data.result;
                    }
                    */
                }
            }

            if (result[1].data.respuesta) {
                if (result[1].data.result) {
                    let intervencionesArray = [];
                    if ($scope.nIntervencion) {
                        intervencionesArray = result[1].data.result.filter(elemento => { return elemento.nivel <= $scope.nIntervencion && elemento.aplicaDisponibilidad === 1});
                    } else {
                        intervencionesArray = result[1].data.result;
                    }
                    if (intervencionesArray.length === 0) {
                        $scope.banderaErrorIntervencion = true;
                        $scope.banderaErrorGeneral = true;
                    }

                    if (intervencionesArray.length > 0) {
                        intervencionesArray.map((e) => {
                            if (e.nivel === 1) {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.aplicaDisponibilidad = e.aplicaDisponibilidad
                            } else {
                                e.parent = e.idPadre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.aplicaDisponibilidad = e.aplicaDisponibilidad
                            }
                            return e
                        })
                        console.log(intervencionesArray)
                        //let arrayInterven = intervencionesArray.filter(elemento =>{ return elemento.aplicaDisponibilidad === 1 })
                        $scope.arrayIntervencion = intervencionesArray;

                        $('#jstreeIntervencion')
                        .bind('loaded.jstree', function (e, data) {
                        }).jstree({
                            'plugins': ["wholerow", 'search'],
                            'search': {
    							"case_sensitive": false,
    							"show_only_matches": true
    						},
                            'core': {
                                'data': intervencionesArray,
                                'themes': {
                                    'name': 'proton',
                                    'responsive': true,
                                    "icons": false
                                }
                            },
                        });
                    } else {
                        $scope.banderaErrorIntervencion = true;
                        $scope.banderaErrorGeneral = true;
                    }
                } else {
                    mostrarMensajeErrorAlert('No existen intervenciones actualmente');
                    $scope.banderaErrorIntervencion = true;
                    $scope.banderaErrorGeneral = true;
                }
            } else {
                mostrarMensajeErrorAlert(result[1].data.resultDescripcion)
                $scope.banderaErrorIntervencion = true;
                $scope.banderaErrorGeneral = true;
            }
        });
    };
    $scope.consultarCatalogos();

    $scope.consultarDisponibilidadV2 = function() {

    }

}]);