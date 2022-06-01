var app = angular.module('vistaChecklistApp', []);

app.controller('vistaChecklistController', ['$scope', '$q', 'vistaChecklistService', '$filter', function ($scope, $q, vistaChecklistService, $filter) {
    let evidenciasTable;
    $scope.listaEvidencias = [];
    $scope.detalleEvidencia = [];
    $scope.nGeografia = '';
    $scope.listaGeografia = [];
    $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };

    evidenciasTable = $('#evidenciasTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font
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

    $('#searchGeoConsulta').on('keyup', function () {
        $("#jstreeConsulta").jstree("search", this.value);
    })

    $("#modalDetalle").on("hidden.bs.modal", function () {
        $(".radio-evidencias").prop("checked", false);
        $(".checkbox-evidencia").prop("checked", false);
        $(".checkbox-evidencia").removeClass("rechazada-check");
        $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };
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
            row[6] = elemento.tecnico ? elemento.tecnico : '-';
            row[7] = elemento.estatus ? elemento.estatus : '-';
            row[8] = '<i class="fas fa-bars icon-table" title="Detalle" onclick="consultaDetalle(' + "'" + elemento.ot + "'" + ')"></i>';
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

        evidenciasTable = $('#evidenciasTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "bDestroy": true,
            "info": true,
            "scrollX": false,
            "data": arraRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font
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
        $scope.detalleEvidencia = detalleEvidencias.result.evidencias;
        $scope.$apply();
        console.log($scope.detalleEvidencia);
        $("#modalDetalle").modal('show');
        $scope.applyMagnific();
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

    $scope.seleciconarTodas = function (isSelected) {
        if (isSelected == '1') {
            $(".checkbox-evidencia").prop("checked", true);
            $(".checkbox-evidencia").removeClass("rechazada-check");
            $scope.listaTotal.aceptadas = $scope.detalleEvidencia.length;
            $scope.listaTotal.rechazadas = 0;
        } else {
            $(".checkbox-evidencia").prop("checked", false);
            $(".checkbox-evidencia").addClass("rechazada-check");
            $scope.listaTotal.rechazadas = $scope.detalleEvidencia.length;
            $scope.listaTotal.aceptadas = 0;
        }
    }

    $scope.changeSelect = function (element) {
        $(".radio-evidencias").prop("checked", false);
        let id = element.target.id;
        if ($("#" + id).is(":checked")) {
            $("#" + id).removeClass("rechazada-check");
            $scope.listaTotal.rechazadas = $scope.listaTotal.rechazadas !== 0 ? $scope.listaTotal.rechazadas - 1 : 0;
            $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas + 1;
        } else {
            $("#" + id).addClass("rechazada-check");
            $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas !== 0 ? $scope.listaTotal.aceptadas - 1 : 0;
            $scope.listaTotal.rechazadas = $(".rechazada-check").length;
        }
    }

    $scope.guardarEvidencia = function () {
        let aceptadas = [];
        let rechazadas = [];
        
        $.each($scope.detalleEvidencia, function (i, elemento) {
            if ($("#check_" + elemento.idEvidencia).is(":checked")) {
                aceptadas.push(elemento.idEvidencia);
            }
        });
        
        $.each($(".rechazada-check"), function (i, elemento) {
            let id = (elemento.id).split("_")[1];
            rechazadas.push(id);
        });
        console.log(aceptadas);
        console.log(rechazadas);
    }

    $scope.applyMagnific = function () {
        var id_categoria = $.trim($(this).attr('attr_id_cat'));

        if (id_categoria === '') {
            $(".magnific.item").show();
            $('.imagen_content:hidden').show(400);
            setTimeout(function () { mostarImagenesCategoria(); }, 500);

        } else {
            if ($(".imagen_content:visible").length > 0) {
                $(".imagen_content:visible").hide(150, "linear", function () {

                    $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                    $(".magnific.item.imgtipo_" + id_categoria + "").show();

                    $('.content_img_' + id_categoria).show(200);
                    //Manda function magnific popup
                    mostarImagenesCategoria();
                });
            } else {
                $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                $(".magnific.item.imgtipo_" + id_categoria + "").show();

                $('.content_img_' + id_categoria).show(200);
                //Manda function magnific popup
                mostarImagenesCategoria();
            }

        }

    };

    mostarImagenesCategoria = function () {
        var $imageLinks = $('.magnific.item:visible');
        var items = [];

        $imageLinks.each(function (index, elemento) {
            var $item = $(this);
            var magItem = {
                src: $item.attr('href'),
                type: 'image'
            };
            magItem.title = $item.data('title');
            items.push(magItem);
        });
        $imageLinks.magnificPopup({
            mainClass: 'mfp-fade',
            items: items,
            gallery: {
                enabled: true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image',
            callbacks: {
                beforeOpen: function () {
                    var index = $imageLinks.index(this.st.el);
                    if (-1 !== index) {
                        this.goTo(index);

                    }
                    //  $('#imagenOT').modal('hide');
                },

                open: function () {
                    // Disabling focus enforcement by magnific
                    $.magnificPopup.instance._onFocusIn = function (e) { };

                }
            }

        });
    }

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
        $("#moduloChecklist").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });

}])