var app = angular.module('auditoriaTecnicoApp', []);

app.controller('auditoriaTecnicoController', ['$scope', '$q', 'auditoriaTecnicoService', 'genericService', function ($scope, $q, auditoriaTecnicoService, genericService) {

    let tableAuditoriaTecnico;
    let tableDetalleAuditoria;
    $scope.listAuditoriasTecnico = [];
    $scope.supervisor = {};
    $scope.listDetalleAuditoria = [];
    $scope.isDetalle = false;
    $scope.auditoriaDetalle = {};
    $scope.preguntasQuery1 = [];
    $scope.preguntasQuery2 = [];
    $scope.listCalificacion = [];
    $scope.listPreguntas1 = [];
    $scope.listPreguntas2 = [];
    $scope.listPreguntas3 = [];
    $scope.listPreguntas4 = [];
    $scope.listPreguntas5 = [];
    $scope.listPreguntas6 = [];
    $scope.listPreguntas7 = [];
    $scope.listPreguntas8 = [];
    $scope.listPreguntas12 = [];
    $scope.contadores = {};
    $scope.nivelGeografia = '';

    document.getElementById('cluster').addEventListener('click', function () {
        $('#modalGeografia').modal('show');
        setTimeout(function () {
            $("#searchGeoVistaAuditoria").focus();
        }, 750);
    });

    $('#searchGeoVistaAuditoria').on('keyup', function () {
        $("#jstree-proton-3").jstree("search", this.value);
    })

    $scope.realizarConversionAnidado = function (array) {
        let arrayCopy = [];
        angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {
            elemento.checkedOpcion = true;
            elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
            elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
            elemento.children.map(e => { e.checkedOpcion = true; return e; })
            arrayCopy.push(elemento)
        })
        return arrayCopy;
    }

    function compareGeneric(a, b) {
        let niveluno = a.nivel;
        let niveldos = b.nivel;
        if (niveluno > niveldos) {
            return -1
        } else if (niveluno < niveldos) {
            return 1
        }
        return 0
    }

    $scope.obtenerNivelUltimoJerarquia = function () {
        return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
    }

    $scope.consultarGeografiaVistaAuditoria = function () {
        genericService.consulCatalogoGeografia().then(function success(response) {
            console.log(response);
            $scope.listadogeografiacopy = response.data.result.geografia
            geografia = response.data.result.geografia
            $scope.nivelGeografia = 3;
            if (!$scope.nivelGeografia)
                $scope.nivelGeografia = $scope.obtenerNivelUltimoJerarquia()

            geografia = geografia.filter((e) => e.nivel <= $scope.nivelGeografia)
            geografia.map((e) => {
                e.parent = e.padre == undefined ? "#" : e.padre;
                e.text = e.nombre;
                e.state = {
                    selected: true,
                }
                return e
            })
            $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {

            }).jstree({
                'plugins': ["wholerow", "checkbox", 'search'],
                'search': {
                    "case_sensitive": false,
                    "show_only_matches": true
                },
                'core': {
                    'data': geografia,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        'icons': false
                    }
                }
            });
        });
    }

    $scope.initAuditoriaTecnico = function () {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('.datepicker').datepicker('update', new Date());
        tableAuditoriaTecnico = $('#tableAuditoriaTecnico').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": false,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

        });
        tableDetalleAuditoria = $('#tableDetalleAuditoria').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": false,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

        });
        $scope.consultarGeografiaVistaAuditoria();
    }

    $scope.initAuditoriaTecnico();

    $scope.changeView = function () {
        if ($scope.isDetalle) {
            $scope.isDetalle = false;
        }
    }

    $scope.insertSombraIndex = function (data) {
        index = 0;
        data.map(pregunta => {
            if (index % 2 == 0) {
                pregunta.sombra = true;
            } else {
                pregunta.sombra = false;
            }
            index = index + 1;
            return pregunta;
        });
    }


    consultarModalDetalleAuditoria = function (index) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading()
        $scope.auditoriaDetalle = $scope.listDetalleAuditoria[index];
        $scope.listPreguntas11 = [];
        if ($scope.auditoriaDetalle) {
            $scope.preguntasQuery1 = auditoriaDetalle.data.result.preguntasQuery1;
            $scope.preguntasQuery2 = auditoriaDetalle.data.result.preguntaQuery2;
            $scope.listCalificacion = auditoriaDetalle.data.result.calificacionCliente;
            $scope.listPreguntas1 = $scope.preguntasQuery1.filter(pr => Object.keys(pr).some(a => pr[a].toString().toLowerCase().includes("vestido de poste")));
            $scope.listPreguntas2 = $scope.preguntasQuery1.filter(pr2 => Object.keys(pr2).some(a => pr2[a].toString().toLowerCase().includes("trabajos en cierre de 2do nivel")));
            $scope.listPreguntas3 = $scope.preguntasQuery1.filter(pr3 => Object.keys(pr3).some(a => pr3[a].toString().toLowerCase().includes("1.3")));
            $scope.listPreguntas4 = $scope.preguntasQuery1.filter(pr4 => Object.keys(pr4).some(a => pr4[a].toString().toLowerCase().includes("ingreso de acometida")));
            $scope.listPreguntas5 = $scope.preguntasQuery1.filter(pr5 => Object.keys(pr5).some(a => pr5[a].toString().toLowerCase().includes("roseta empresarial")));
            $scope.listPreguntas6 = $scope.preguntasQuery1.filter(pr6 => Object.keys(pr6).some(a => pr6[a].toString().toLowerCase().includes("armado de conectores")));
            $scope.listPreguntas7 = $scope.preguntasQuery1.filter(pr7 => Object.keys(pr7).some(a => pr7[a].toString().toLowerCase().includes("1.7")));
            $scope.listPreguntas8 = $scope.preguntasQuery1.filter(pr8 => Object.keys(pr8).some(a => pr8[a].toString().toLowerCase().includes("1.8")));
            $scope.listPreguntas12 = $scope.preguntasQuery1.filter(pr8 => Object.keys(pr8).some(a => pr8[a].toString().toLowerCase().includes("prestación con cliente")));
            $scope.listPreguntas10 = $scope.preguntasQuery2.filter(pr10 => Object.keys(pr10).some(a => pr10[a].toString().toLowerCase().includes("1.12")));
            $scope.listPreguntas11 = $scope.preguntasQuery2.filter(pr11 => Object.keys(pr11).some(a => pr11[a].toString().toLowerCase().includes("1.11")));

            $scope.insertSombraIndex($scope.listPreguntas1);
            $scope.insertSombraIndex($scope.listPreguntas2);
            $scope.insertSombraIndex($scope.listPreguntas3);
            $scope.insertSombraIndex($scope.listPreguntas4);
            $scope.insertSombraIndex($scope.listPreguntas5);
            $scope.insertSombraIndex($scope.listPreguntas6);
            $scope.insertSombraIndex($scope.listPreguntas7);
            $scope.insertSombraIndex($scope.listPreguntas8);
            $scope.insertSombraIndex($scope.listPreguntas10);
            $scope.insertSombraIndex($scope.listPreguntas11);
            $scope.insertSombraIndex($scope.listPreguntas12);

            $scope.$apply();
            $("#modalDetalleAuditoria").modal('toggle');
            swal.close();
        }
    }

    consultarDetalleAuditoria = function (elemento) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.contadores.aprobado = 0;
        $scope.contadores.desaprobado = 0;
        $scope.supervisor = $scope.listAuditoriasTecnico[elemento];
        let arrayDetalleRow = [];
        if (tableDetalleAuditoria) {
            tableDetalleAuditoria.destroy();
        }
        $scope.listDetalleAuditoria = arrayDetalleAuditoriaTecnico.data.result;
        $.each($scope.listDetalleAuditoria, function (i, elemento) {
            let rowDetalle = [];
            rowDetalle[0] = elemento.folio !== undefined ? elemento.folio : 'Sin informaci&oacute;n';
            rowDetalle[1] = elemento.os !== undefined ? elemento.os : 'Sin informaci&oacute;n';
            rowDetalle[2] = elemento.fecha !== undefined ? elemento.fecha : 'Sin informaci&oacute;n';
            rowDetalle[3] = elemento.tecnico !== undefined ? elemento.tecnico : 'Sin informaci&oacute;n';
            rowDetalle[4] = elemento.estatus == 'APROBADO' ?
                '<span class="content-success-generic">' +
                '<i class="icono-success-generic fas fa-check"></i>' +
                '</span>' : '<span class="content-error-generic">' +
                '<i class="icono-error-generic fas fa-times"></i>' +
                '</span>';
            rowDetalle[5] = '<a class="icon-table" id="detalleAuditoria' + elemento.folio + '" onclick="consultarModalDetalleAuditoria(' + i + ')">' +
                '<i class="fas fa-bars" style="background-color: #58b3bf" title="Detalle"></i>' +
                '</a>';
            arrayDetalleRow.push(rowDetalle);

            if (elemento.estatus === 'APROBADO') {
                $scope.contadores.aprobado += 1;
            }

            if (elemento.estatus === 'DESAPROBADO') {
                $scope.contadores.desaprobado += 1;
            }
        });
        tableDetalleAuditoria = $('#tableDetalleAuditoria').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": false,
            "data": arrayDetalleRow,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });
        $scope.isDetalle = true;
        $scope.$apply();
        swal.close();
    }

    $scope.validarFecha = function (idFechaInicio, idFechaFin) {
        var inicio = document.getElementById(idFechaInicio).value.split('/');
        var fin = document.getElementById(idFechaFin).value.split('/');
        var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
        var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
        if (date_inicio <= date_fin) {
            return true;
        } else {
            return false;
        }
    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    $scope.consultarAuditoriasTecnico = function () {
        let mensajeError = '';
        let isValid = true;
        $scope.changeView();

        let ultimonivel;
        if ($scope.nivelGeografia) {
            ultimonivel = $scope.nivelGeografia
        } else {
            ultimonivel = $scope.obtenerNivelUltimoJerarquia();
        }
        let clusters = $("#jstree-proton-3").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id))

        if (clusters.length === 0) {
            mensajeError += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!$scope.validarFecha('filtro_fecha_inicio_auditoria', 'filtro_fecha_fin_auditoria')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }

        if (isValid) {
            let params = {
                fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_auditoria').value),
                fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_auditoria').value),
                region: '',
                ciudad: '',
                distrito: '',
            }
            if (!swal.isVisible()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
            }
            let arrayRow = [];
            if (tableAuditoriaTecnico) {
                tableAuditoriaTecnico.destroy();
            }
            $scope.listAuditoriasTecnico = arrayListAuditoriasTecnico.data.result;
            $.each($scope.listAuditoriasTecnico, function (i, elemento) {
                let row = [];
                row[0] = elemento.empleado !== undefined ? elemento.empleado : 'Sin informaci&oacute;n';
                row[1] = elemento.supervisor !== undefined ? elemento.supervisor : 'Sin informaci&oacute;n';
                row[2] = elemento.distrito !== undefined ? elemento.distrito : 'Sin informaci&oacute;n';
                row[3] = elemento.region !== undefined ? elemento.region : 'Sin informaci&oacute;n';
                row[4] = elemento.aprobacion_cuadrillas !== undefined ? elemento.aprobacion_cuadrillas : 'Sin informaci&oacute;n';
                row[5] = '<a class="icon-table" id="detalleAuditoria' + elemento.id_supervisor + '" onclick="consultarDetalleAuditoria(' + i + ')"  >' +
                    '<i class="fas fa-bars" style="background-color: #58b3bf" title="Detalle"></i>' +
                    '</a>';
                arrayRow.push(row);
            });
            tableAuditoriaTecnico = $('#tableAuditoriaTecnico').DataTable({
                "paging": true,
                "lengthChange": false,
                "ordering": false,
                "pageLength": 10,
                "info": false,
                "data": arrayRow,
                "autoWidth": true,
                "language": idioma_espanol_not_font,
                "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
            });
            swal.close();
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }
}]);