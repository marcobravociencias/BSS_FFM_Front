var app = angular.module('vistaChecklistApp', []);

app.controller('vistaChecklistController', ['$scope', '$q', 'vistaChecklistService', '$filter', function ($scope, $q, vistaChecklistService, $filter) {
    let evidenciasTable;
    $scope.listaEvidencias = [];
    $scope.detalleEvidencia = [];
    $scope.nGeografia = '';
    $scope.listaGeografia = [];

    evidenciasTable = $('#evidenciasTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
    });

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'es',
        todayHighlight: true,
        clearBtn: false
    });
    $('.datepicker').datepicker('update', new Date());

    $('#searchTextGeneral').on('keyup', function () {
        evidenciasTable.search(this.value).draw();
    })

    $(".checkbox-evidencia").on('change', function(){
        $(".radio-evidencias").prop("checked", false);
    })

    $('#searchGeoConsulta').on('keyup', function () {
        $("#jstreeConsulta").jstree("search", this.value);
    })

    $("#modalDetalle").on("hidden.bs.modal", function () {
        $(".radio-evidencias").prop("checked", false);
        $(".checkbox-evidencia").prop("checked", false);
    })


    $scope.obtenerNivelUltimoJerarquia = function () {
        return $scope.listaGeografia.sort(compareGeneric)[0].nivel
    }

    $scope.getInformacionGeneral = function () {
        $q.all([
            vistaChecklistService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloVistaChecklist" }),
            vistaChecklistService.consultarGeografiaChecklist(),
        ]).then(function (results) {
            if (results[0].data.result && results[0].data.respuesta) {
                $scope.nGeografia = results[0].data.result.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.N_FILTRO_GEOGRAFIA) : null;
            } else {
                mostrarMensajeErrorAlert(results[0].data.resultDescripcion)
            }
            if (results[1].data.result && results[1].data.respuesta) {
                if (results[1].data.result) {
                    if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {
                        let listGeo = [];

                        if ($scope.nGeografia) {
                            listGeo = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
                        } else {
                            listGeo = results[1].data.result.geografia;
                        }
                        $scope.listaGeografia = listGeo;
                        let geografia = listGeo;
                        geografia.map((e) => {
                            e.parent = e.padre == null ? "#" : e.padre;
                            e.text = e.nombre;
                            e.icon = "fa fa-globe";
                            e.state = {
                                opened: true,
                                selected: true,
                            }
                            return e
                        })
                        $('#jstreeConsulta').bind('loaded.jstree', function (e, data) {
                            $scope.consultaEvidencias();
                        }).jstree({
                            'plugins': ["wholerow", "checkbox", "search"],
                            'core': {
                                'data': geografia,
                                'themes': {
                                    'name': 'proton',
                                    'responsive': true,
                                    "icons": false
                                }
                            },
                            "search": {
                                "case_sensitive": false,
                                "show_only_matches": true
                            }
                        });

                    } else {
                        mostrarMensajeWarningValidacion('No existen geografias actualmente')
                    }
                } else {
                    mostrarMensajeErrorAlert(results[1].data.result.mensaje)
                }
            } else {
                mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
            }

        }).catch(err => handleError(err));
    }

    $scope.getInformacionGeneral();

    $scope.consultaEvidencias = function () {


        let arraRow = [];
        let params = {

        }
        /*
        vistaChecklistService.consultarEvidencias(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        */
        $scope.listaEvidencias = listaEvidencia.result;
        $.each($scope.listaEvidencias, function (i, elemento) {
            let row = [];
            row[0] = elemento.ot ? elemento.ot : '-';
            row[1] = elemento.os ? elemento.os : '-';
            row[2] = elemento.distrito_name ? elemento.distrito_name : '-';
            row[3] = elemento.num_cuenta ? elemento.num_cuenta : '-';
            row[4] = elemento.cliente ? elemento.cliente : '-';
            row[5] = elemento.direccion ? elemento.direccion : '-';
            row[6] = elemento.referencias ? elemento.referencias : '-';
            row[7] = elemento.tecnico ? elemento.tecnico : '-';
            row[8] = elemento.estatus ? elemento.estatus : '-';
            row[9] = '<i class="fas fa-bars icon-table" title="Detalle" onclick="consultaDetalle(' + "'" + elemento.ot + "'" + ')"></i>';
            arraRow.push(row);
        })
        /*
    } else {
        toastr.warning('No se encontró ningún valor');
    }
} else {
    toastr.warning(response.data.resultDescripcion);
}
} else {
toastr.error('Ha ocurrido un error en la consulta');
}
})
*/
        if (evidenciasTable) {
            evidenciasTable.destroy();
        }
        evidenciasTable = $('#evidenciasTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": false,
            "autoWidth": true,
            "data": arraRow,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

    }


    consultaDetalle = function (id) {
       
        /*
        let params = {

        }

        vistaChecklistService.consultarDetalleEvidencias(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        */
                            $scope.detalleEvidencia = detalleEvidencias.result;
                            console.log($scope.detalleEvidencia);
                            $("#modalDetalle").modal('show');
                        /*

                    } else {
                        toastr.warning('No se encontró ningún valor');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta');
            }
        })
        */

    }

    $scope.abrirModalGeografia = function () {
        $("#modalGeografia").modal('show');
    }

    $scope.seleciconarTodas = function(isSelected){
        if(isSelected == '1'){
            $(".checkbox-evidencia").prop("checked", true);
        }else{
            $(".checkbox-evidencia").prop("checked", false);
            $(".checkbox-evidencia").addClass("rechazada-check");
        }
    }



}])