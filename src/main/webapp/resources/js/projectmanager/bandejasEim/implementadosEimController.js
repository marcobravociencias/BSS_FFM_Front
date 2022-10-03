app.implementadosEim = function ($scope, bandejasEimService, $q, genericService) {
    $scope.listaImplementadosEim = [];
    $scope.infoOtDetalle = {};
    $scope.permisosModal = [];

    var implementadosTable = $('#implementadosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "searching": false,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font,
        "aoColumnDefs": [
            { "aTargets": [5], "bSortable": false }
        ]
    });

    var tableMaterialesDespacho = $('#table-materiales-ot').DataTable({
        "processing": false,
        "serverSide": false,
        "scrollX": false,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "pageLength": 10,
        "bAutoWidth": false,
        "columns": [null, null, null, null, null, null, null, null, null, null, null, null, null],
        "language": idioma_espanol_not_font
    });


    $('#searchGeo-6').on('keyup', function () {
        $("#jstreeGeografia-6").jstree("search", this.value);
    })

    $("#modalGeografiaEim").on("hidden.bs.modal", function () {
        $scope.getTextGeografia('jstreeGeografia-' + $scope.vistaCoordinacion, 'cluster-implementados');
    })

    $scope.abrirModalGeografia = function (type) {
        $("#jstreeGeografia-" + type).jstree("search", '');
        $("#searchGeo-" + type).val('');
        $("#modalGeografiaEim").modal('show');
        setTimeout(function () {
            $("#searchGeo-" + type).focus();
        }, 750);
    }

    $scope.consultarImplementados = function () {
        let clustersparam = [];
        let arrayRow = [];

        clustersparam = $("#jstreeGeografia-6").jstree("get_selected", true).filter(e => e.original.nivel == $scope.nivelArbolImplementados).map(e => parseInt(e.id));

        let params = {
            geografias: clustersparam
        };
        if (!swal.isVisible()) {
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
        }

        /*bandejasEimService.consultarImplementadosEim(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $scope.listaImplementadosEim = response.data.result.implementados;*/

        swal.close();
        $scope.listaImplementadosEim = JsonImplementados;
        $scope.listaImplementadosEim.forEach((impl, index) => {
            let array = [];
            array[0] = '<a id="mostrar-segundo-nivel-' + impl.id + '" class="option-mas-implementados segundo-nivel-table-implementados" tag-position="' + impl.id + '" tag-hide="false"><i id="icono-implementados-' + impl.id + '" class="icono-implementados fas fa-angle-down" aria-hidden="true"></i></a>';
            array[1] = '<input type="checkbox" class="checkbox-impl" id="check-impl-' + impl.id + '" onclick="getSelectedImpl(' + impl.id + ')"/>';
            array[2] = impl.folio ? impl.folio : 'Sin Informaci&oacute;n';
            array[3] = impl.cotizacion ? impl.cotizacion : 'Sin Informaci&oacute;n';
            array[4] = impl.idbrm ? impl.idbrm : 'Sin Informaci&oacute;n';
            array[5] = impl.cuentaFactura ? impl.cuentaFactura : 'Sin Informaci&oacute;n';
            array[6] = impl.tipoCuadrilla ? impl.tipoCuadrilla : 'Sin Informaci&oacute;n';
            array[7] = impl.NumOs ? impl.NumOs : 'Sin Informaci&oacute;n';
            array[8] = impl.estatusOs ? impl.estatusOs : 'Sin Informaci&oacute;n';
            arrayRow.push(array)
        })
        implementadosTable = $('#implementadosTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "pageLength": 10,
            "bDestroy": true,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "data": arrayRow
        });
        /*} else {
            toastr.warning('No se encontraron datos');
        }
    } else {
        toastr.warning(response.data.resultDescripcion);
    }
} else {
    toastr.warning(response.data.resultDescripcion);
}
}).catch(err => handleError(err));*/
    }

    $scope.listSelectedImpl = [];
    getSelectedImpl = function (id) {
        let idx = $scope.listSelectedImpl.find((e) => e == id);
        if (idx) {
            let listTemp = $scope.listSelectedImpl.filter((e) => { return e != id });
            $scope.listSelectedImpl = listTemp ? listTemp : [];
        } else {
            $scope.listSelectedImpl.push(id);
        }
    }

    $scope.setTextFiltro = function () {
        $('#filtro-estatus-implementados').val($scope.listaSeleccionSelectGral($scope.filtroImplementados.veticalCelula, $scope.nivelVerticalCelulaImpl));
        $('#filtro-vertical-celula-implementados').val($scope.listaSeleccionSelectGral($scope.filtroImplementados.estatus, $scope.nivelEstatusImpl));
    }

    $scope.seleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = true;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.seleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.deseleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = false;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.deseleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
        if (filtro.children !== undefined && filtro.children.length > 0) {
            if (filtro.checkedOpcion) {
                $scope.deseleccionarTodosRecursivo(filtro.children, true);
            } else {
                $scope.seleccionarTodosRecursivo(filtro.children, true);
            }
        }
        filtro.checkedOpcion = !filtro.checkedOpcion;
        $scope.checkPadre(filtro.idPadre, principalArray, principalArray);
    }

    $scope.checkPadre = function (idPadre, array, principalArray) {
        array.map(function (e) {
            if (e.id === idPadre) {
                e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
                $scope.checkPadre(e.idPadre, principalArray, principalArray);
            } else {
                if (e.children !== undefined && e.children.length > 0) {
                    $scope.checkPadre(idPadre, e.children, principalArray);
                }
            }
        });
    }

    pintarTablaSecundaria = function (id) {
        let detalleImplementados = $scope.listaImplementadosEim.find((e) => e.id == id);

        let tableHTML = '<div class="details-container">' +
            '<table id="table_implementados_nivel2" class="table" cellspacing="0" style="width:100%">' +
            '<thead id="thead_implementados_nivel2">' +
            '<tr>' +
            '<th>N&uacute;m OT</th>' +
            '<th>Categoria</th>' +
            '<th>Subcategor&iacute;a</th>' +
            '<th>Fecha de creaci&oacute;n</th>' +
            '<th>T&eacute;cnico asignado</th>' +
            '<th>Solicitante</th>' +
            '<th>Auxiliar</th>' +
            '<th>Distrito</th>' +
            '<th>Estatus</th>' +
            '<th>Hora de llegada</th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        if (detalleImplementados.detalle.length) {
            detalleImplementados.detalle.forEach(dtl => {
                tableHTML += "<tr>" +
                    "<td>" + ((dtl != undefined && dtl.numOt) ? dtl.numOt : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.categoria) ? dtl.categoria : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.subcategoria) ? dtl.subcategoria : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.fechaCreacion) ? dtl.fechaCreacion : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.tecnicoAsignado) ? dtl.tecnicoAsignado : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.solicitante) ? dtl.solicitante : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.auxiliar) ? dtl.auxiliar : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.distrito) ? dtl.distrito : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.estatus) ? dtl.estatus : 'Sin dato') + "</td>" +
                    "<td>" + ((dtl != undefined && dtl.horaLlegada) ? dtl.horaLlegada : 'Sin dato') + "</td>" +
                    '<td><span class="icon-table-detalle fas fa-image" style="background: #5bc8e5;" onclick="consultaImagenesOT(' + dtl.numOt + ', ' + dtl.cuenta + ')"></td>' +
                    '<td><span class="icon-table-detalle fas fa-bars" style="background: var(--btn-color-detalle-tabla);" onclick="abrirModalDetalle(' + dtl.numOt + ', ' + dtl.flujo + ')"></td>' +
                    '</tr>';
            })

            tableHTML += '</tbody></table>' +
                '</div>';
        } else {
            tableHTML = '<div class="details-container no-data-implementados-detalle">No se encontraron datos</div>'
        }
        return tableHTML;
    }

    abrirModalDetalle = function (id, flujo) {
        $scope.idOtModal = id;
        $scope.movimientos = [];
        $scope.comentariosOrdenTrabajo = [];
        $scope.tecnicoConsultaMateriales = [];
        let params = {
            idOt: id
        }
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
        swal.showLoading();
        bandejasEimService.consultaInfoDetalleOt(JSON.stringify(params)).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.orden) {
                        $scope.infoOtDetalle = response.data.result.orden;
                        $scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_CO_FLUJO_" + flujo).split(",")
                        $('#modal-detalle-ot').modal('show');
                        $("#v-tabs-tab-detalle-ot .nav-link").removeClass("active");
                        $("#informacion-ot").addClass("active");
                        $(".contenedor_detalle").removeClass("show active");
                        $("#content-ot").addClass("show active");
                        swal.close();
                    } else {
                        swal.close();
                        mostrarMensajeErrorAlert(response.data.result.mensaje)
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            } else {
                swal.close();
                mostrarMensajeErrorAlert("Error del servidor");
            }
        }).catch(err => handleError(err));
    }

    $scope.consultaHistoricoOt = function () {
        if (!$scope.movimientos.length) {
            let params = {
                idOt: $scope.idOtModal
            }
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            genericService.consultarHistoricoDespachoOT(params).then(function (result) {
                if (result.data !== undefined) {
                    if (result.data.respuesta) {
                        if (result.data.result !== undefined) {
                            jsonm = result.data;
                            if (result.data.result.detalle != undefined && result.data.result.detalle.length > 0) {
                                $scope.movimientos = result.data.result.detalle//.reverse()
                                swal.close();
                            } else {
                                swal.close();
                                mostrarMensajeErrorAlert(response.data.result.resultDescription)
                            }
                        } else {
                            swal.close();
                            mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        }
                    } else {
                        swal.close();
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert("Error del servidor");
                }
            }).catch(err => handleError(err));
        }
    }

    $scope.consultaChat = function () {
        if (!$scope.comentariosOrdenTrabajo.length) {
            let params = {
                idOt: $scope.idOtModal
            }
            if (!swal.isVisible()) {
                swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
                swal.showLoading();
            }
            genericService.consultarComentariosDespachoOT(params).then(function success(response) {
                swal.close()
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalle) {
                                $scope.comentariosOrdenTrabajo = response.data.result.detalle;
                                angular.forEach($scope.comentariosOrdenTrabajo, function (comentario, index) {
                                    comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
                                });
                                swal.close();
                            } else {
                                toastr.warning(response.data.result.mensaje);
                            }
                        } else {
                            toastr.warning('No se encontraron comentarios');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err));
        }
    }

    $scope.addComentariosConsultaOt = function () {
        if ($scope.comentarioConsultaOT.trim() !== '' && !/^\s/.test($scope.comentarioConsultaOT)) {
            let params = {
                idOrden: $scope.idOtModal,
                comentario: $scope.comentarioConsultaOT,
                origenSistema: 1
            }
            swal({ text: 'Espere un momento ...', allowOutsideClick: false });
            swal.showLoading();
            genericService.agregarComentariosOt(params).then(function success(response) {
                swal.close();
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        $scope.comentariosOrdenTrabajo = [];
                        $scope.comentarioConsultaOT = '';
                        document.getElementById('comentarioConsultaOt').value = '';
                        $(".chat-area").scrollTop(0);
                        $scope.consultaChat();
                    } else {
                        toastr.error(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))
        } else {
            $scope.comentarioConsultaOT = '';
            document.getElementById('comentarioConsultaOt').value = '';
            toastr.warning('Intoducir un comentario.');
        }
    }

    function transformarTextPrecio(num) {
        if ((num && num != '' && num != '0')) {
            return (Math.round(parseFloat(num) * 100) / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        } else {
            return parseFloat('0.00').toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        }
    }

    $scope.consultaMaterialesOT = function () {
        if (!$scope.tecnicoConsultaMateriales.length) {
            $scope.isTecnicoConsultaMateriales = false;
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            $scope.tecnicoConsultaMateriales = {}
            let arrayRow = [];
            bandejasEimService.consultaMaterialOt(JSON.stringify({ idOrden: $scope.idOtModal })).then(function success(response) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.detalleGeneral != undefined) {
                            if (response.data.result.detalleGeneral.detalleMateriales) {
                                $scope.isTecnicoConsultaMateriales = true;
                                $scope.tecnicoConsultaMateriales = response.data.result.detalleGeneral
                                $scope.tecnicoConsultaMateriales.nombreCommpleto = $scope.tecnicoConsultaMateriales.nombre + ' ' + $scope.tecnicoConsultaMateriales.apellidoPaterno + ' ' + $scope.tecnicoConsultaMateriales.apellidoMaterno
                                let tempArrayResult = angular.copy(response.data.result.detalleGeneral.detalleMateriales);
                                angular.forEach(tempArrayResult, function (elem, index) {
                                    let array = [];
                                    array[0] = elem.sku && elem.sku !== '' ? elem.sku : 'Sin informaci&oacute;n';
                                    array[1] = elem.descripcion && elem.descripcion !== '' ? elem.descripcion : 'Sin informaci&oacute;n';
                                    array[2] = elem.tipo && elem.tipo !== '' ? elem.tipo : 'Sin informaci&oacute;n';
                                    array[3] = elem.grupo && elem.grupo !== '' ? elem.grupo : 'Sin informaci&oacute;n';
                                    array[4] = elem.lote && elem.lote !== '' ? elem.lote : 'Sin informaci&oacute;n';
                                    array[5] = elem.numSerie && elem.numSerie !== '' ? elem.numSerie : 'Sin informaci&oacute;n';
                                    array[6] = elem.familia && elem.familia !== '' ? elem.familia : 'Sin informaci&oacute;n';
                                    array[7] = elem.docSap && elem.docSap !== '' ? elem.docSap : 'Sin informaci&oacute;n';
                                    array[8] = transformarTextPrecio(elem.precio);
                                    array[9] = elem.cantidad && elem.cantidad !== '' ? elem.cantidad : 'Sin informaci&oacute;n';
                                    array[10] = transformarTextPrecio(elem.costo);
                                    array[11] = elem.unidad && elem.unidad !== '' ? elem.unidad : 'Sin informaci&oacute;n';
                                    array[12] = elem.comentariosSap && elem.comentariosSap !== '' ? elem.comentariosSap : 'Sin informaci&oacute;n';
                                    arrayRow.push(array)
                                })
                                swal.close()
                            } else {
                                mostrarMensajeInformativo("No se encontraron datos de materiales");
                                swal.close()
                            }
                        } else {
                            mostrarMensajeInformativo("No se encontraron datos de materiales")
                            swal.close()
                        }
                    } else {
                        mostrarMensajeInformativo(response.data.result.description);
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert('Ha ocurrido un error en la consulta de los datos');
                    swal.close()
                }
                tableMaterialesDespacho = $('#table-materiales-ot').DataTable({
                    "processing": false,
                    "serverSide": false,
                    "scrollX": false,
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "bDestroy": true,
                    "ordering": true,
                    "pageLength": 10,
                    "data": arrayRow,
                    "bAutoWidth": false,
                    "columns": [null, null, null, null, null, null, null, null, null, null, null, null, null],
                    "language": idioma_espanol_not_font
                });
            }).catch(err => handleError(err));
        }
    }


    $(document.body).on("click", ".segundo-nivel-table-implementados", function () {
        let tr = $(this).closest('tr')
        row = implementadosTable.row(tr)
        let index = Number($(this).attr('tag-position'))
        if ($(this).attr('tag-hide') === 'false') {
            $(this).attr('tag-hide', 'true')
            document.getElementById('icono-implementados-' + index).classList.remove('fa-angle-down')
            document.getElementById('icono-implementados-' + index).classList.add('fa-angle-up')
            let dataTable = pintarTablaSecundaria(index)
            row.child(dataTable).show();
        } else {
            $(this).attr('tag-hide', 'false')
            document.getElementById('icono-implementados-' + index).classList.add('fa-angle-down')
            document.getElementById('icono-implementados-' + index).classList.remove('fa-angle-up')
            row.child.hide();
            tr.removeClass('shown');
        }
    });


    var JsonImplementados = [
        {
            id: 1,
            folio: "CSP12345",
            cotizacion: "COT87345",
            idbrm: "876543",
            cuentaFactura: "Gonzalez Vela Asociados",
            tipoCuadrilla: "Residencial",
            NumOs: "8765434",
            estatusOs: "En proceso",
            detalle: [
                {
                    id: 1,
                    numOt: "529",
                    cuenta: "0100000185",
                    flujo: 1,
                    categoria: "Servicios administrativos",
                    subcategoria: "Factibilidad",
                    fechaCreacion: "05/04/2022",
                    tecnicoAsignado: "Juan Lopez Hernandez",
                    solicitante: "Juan Luis Guerra",
                    auxiliar: "Pedro Garcia Morales",
                    distrito: "Guadalajara",
                    estatus: "En transito",
                    horaLlegada: "12:40"
                },
                {
                    id: 2,
                    numOt: "549",
                    cuenta: "01900074577",
                    flujo: 1,
                    categoria: "Servicios administrativos",
                    subcategoria: "Factibilidad",
                    fechaCreacion: "05/04/2022",
                    tecnicoAsignado: "Juan Lopez Hernandez",
                    solicitante: "Juan Luis Guerra",
                    auxiliar: "Pedro Garcia Morales",
                    distrito: "Guadalajara",
                    estatus: "En transito",
                    horaLlegada: "12:40"
                }
            ]
        },
        {
            id: 2,
            folio: "CSP12345",
            cotizacion: "COT87345",
            idbrm: "876543",
            cuentaFactura: "Gonzalez Vela Asociados",
            tipoCuadrilla: "Residencial",
            NumOs: "8765434",
            estatusOs: "En proceso",
            detalle: [
                {
                    id: 1,
                    numOt: "604",
                    cuenta: "0190023124",
                    flujo: 1,
                    categoria: "Servicios administrativos",
                    subcategoria: "Factibilidad",
                    fechaCreacion: "05/04/2022",
                    tecnicoAsignado: "Juan Lopez Hernandez",
                    solicitante: "Juan Luis Guerra",
                    auxiliar: "Pedro Garcia Morales",
                    distrito: "Guadalajara",
                    estatus: "En transito",
                    horaLlegada: "12:40"
                },
                {
                    id: 2,
                    numOt: "549",
                    cuenta: "01900074577",
                    flujo: 1,
                    categoria: "Servicios administrativos",
                    subcategoria: "Factibilidad",
                    fechaCreacion: "05/04/2022",
                    tecnicoAsignado: "Juan Lopez Hernandez",
                    solicitante: "Juan Luis Guerra",
                    auxiliar: "Pedro Garcia Morales",
                    distrito: "Guadalajara",
                    estatus: "En transito",
                    horaLlegada: "12:40"
                }
            ]
        },
        {
            id: 3,
            folio: "CSP1267455",
            cotizacion: "COT8745645",
            idbrm: "754645",
            cuentaFactura: "Salud General Asociados",
            tipoCuadrilla: "Empresarial",
            NumOs: "87677564",
            estatusOs: "En proceso",
            detalle: []
        },
        {
            id: 4,
            folio: "CSP1267455",
            cotizacion: "COT8745645",
            idbrm: "754645",
            cuentaFactura: "Salud General Asociados",
            tipoCuadrilla: "Empresarial",
            NumOs: "87677564",
            estatusOs: "En proceso",
            detalle: []
        }
    ]

};