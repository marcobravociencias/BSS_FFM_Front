app.bandejaDetalleController = function ($scope, monitorPMSServices) {
  let bandejaDetalleTable;
  $scope.list = []
  $scope.isCansultaDetalle = false;
  $scope.datelleList = []
  $scope.searchdetallebandeja = '';
  $scope.filtroPorDetalle = [];
  $scope.tituloDetalleList = [
    {
      titulo: "",
      estatu: false,
      vista: true,
    },
    {
      titulo: "Nuevo segmento",
      estatu: false,
      vista: true,
    },
    {
      titulo: "Cliente",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Comentarios",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Cuadrilla",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Cuenta factura",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Estatus bandeja",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Estatus OS",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Fecha agendamiento",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Fecha comprometida",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Fecha instalacion",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Fecha venta",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Folio COT",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Folio CSP",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Gerencia",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Medio acceso",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Mes comprometido",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Mes instalacion",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Monto",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Nombre paquete",
      estatu: true,
      vista: true,
    },
    {
      titulo: "PM",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Vendedor",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Num. oportunidad",
      estatu: true,
      vista: true,
    },
    {
      titulo: "OS",
      estatu: true,
      vista: true,
    },
    {
      titulo: "OT",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Plaza",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Region",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Segmento",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Semana comprometida",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Semana instalacion",
      estatu: true,
      vista: true,
    },
    {
      titulo: "Tipo venta",
      estatu: true,
      vista: true,
    },
  ]



  $scope.llenarTablaDetalleBandeja = function () {
    if (bandejaDetalleTable)
        bandejaDetalleTable.destroy();


    $('#bandejaDetalleTable tbody').empty()
    $('#detalleThead').empty();


    setTimeout(function () {

      $scope.list = [];
      let arreTempResultDetalle = [];
      angular.forEach(arrayDetalle.result.detallePmo, elem => {
        arre = [];
        arre[0] = validarUndefined(elem.top5000) === 'true' ? '<i class="top-cincomil fa fa-star"></i>' : '<i class="top-cincomil-no fa fa-star"></i>';
        arre[1] = validarUndefined(elem.segmentoCliente);
        arre[2] = validarUndefined(elem.cliente);
        arre[3] = validarUndefined(elem.comentarios);
        arre[4] = validarUndefined(elem.cuadrilla);
        arre[5] = validarUndefined(elem.cuentaFactura);
        arre[6] = validarUndefined(elem.estatusBandeja);
        arre[7] = validarUndefined(elem.estatusOs);
        arre[8] = validarUndefined(elem.fechaAgendamiento);
        arre[9] = validarUndefined(elem.fechaComprometida);
        arre[10] = validarUndefined(elem.fechaInstalacion);
        arre[11] = validarUndefined(elem.fechaVenta);
        arre[12] = validarUndefined(elem.folioCotizacion);
        arre[13] = validarUndefined(elem.folioCsp);
        arre[14] = validarUndefined(elem.gerencia);
        arre[15] = validarUndefined(elem.medioAcceso);
        arre[16] = validarUndefined(elem.mesComprometida);
        arre[17] = validarUndefined(elem.mesInstalacion);
        arre[18] = validarUndefined(elem.monto);
        arre[19] = validarUndefined(elem.nombrePaquete);
        arre[20] = validarUndefined(elem.nombrePm);
        arre[21] = validarUndefined(elem.nombreVendedor);
        arre[22] = validarUndefined(elem.numeroOportunidad);
        arre[23] = validarUndefined(elem.ordenServicio);
        arre[24] = validarUndefined(elem.ot);
        arre[25] = validarUndefined(elem.plaza);
        arre[26] = validarUndefined(elem.region);
        arre[27] = validarUndefined(elem.segmento);
        arre[28] = validarUndefined(elem.semanaComprometida);
        arre[29] = validarUndefined(elem.semanaInstalacion);
        arre[30] = validarUndefined(elem.tipoVenta);
        arreTempResultDetalle.push(arre);
      });


      angular.forEach(arreTempResultDetalle, function (elemento, index) {
        let arrtemp = [];
        angular.forEach($scope.tituloDetalleList, function (head, ind) {
          if (head.vista) {
            arrtemp.push(elemento[ind]);
          }
        });
        $scope.list.push(arrtemp);
      });

      let contenTheadDetalle = '';
      $scope.tituloDetalleList.forEach(function (elemento, index) {
        if (elemento.vista) {
          contenTheadDetalle += `<th> ${elemento.titulo} </th>`;
        }
      });
      console.log(contenTheadDetalle);

      $scope.filtroPorDetalle = $scope.tituloDetalleList.filter(function (elemento) { return elemento.vista === true });
      localStorage.setItem('filtroDetalle', JSON.stringify($scope.tituloDetalleList));
      if (!localStorage.getItem('expire')) {
        $scope.getSessionExp();
      }

      $('#detalleThead').append(`<tr> ${contenTheadDetalle} </tr>`);
      bandejaDetalleTable = $('#bandejaDetalleTable').DataTable({
        processing: false,
        ordering: false,
        scrollX: false,
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: false,
        pageLength: 10,
        data: $scope.list,
        language: idioma_espanol_not_font,
        sDom: '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        dom: 'Bfrtip'
      });

    }, 100);
    swal.close()
  }

  $scope.consultarDetalleList = function () {
    $scope.list = []
    $scope.isCansultaDetalle = true
    let params = {}
    swal({ text: 'Cargando datos ...', allowOutsideClick: false });
    swal.showLoading();
    $scope.datelleList = arrayDetalle.result.detallePmo
    //$scope.$apply()
    $scope.llenarTablaDetalleBandeja()
    /*  monitorPMSServices.consultarBandejaDetalle(params).then(result => {

     }).catch(err => handleError(err)); */
  }

  $scope.getSessionExp = function () {
    let fecha = new Date();
    //fecha.setDate(fecha.getDate() + 1);
    let fechaP = fecha.toISOString().split('T')[0]
    let fechaActual = new Date(fechaP);
    localStorage.setItem('expire', fechaActual.getTime());
  }

  $scope.aplicarFiltrarPorDetalle = function () {
    angular.forEach($scope.filtroPorDetalle, (elemento, index) => {
      if (index !== 0) {
        bandejaDetalleTable.column(index).search($('#detalleSearch' + index).val().trim());
      }
    });
    bandejaDetalleTable.draw();
    $scope.mostrarfiltroDetalle = false;
  }

  $scope.aplicarFiltroDetalle = function () {
    $scope.mostrarfiltroDetalle = false;
    swal({ text: "Cargando datos ...", allowOutsideClick: false });
    swal.showLoading();
    setTimeout(function () {
      $scope.llenarTablaDetalleBandeja();
    }, 100)
  }

  $scope.quitarCheckTodoColumnaDetalle = function () {
    document.getElementById('checkTodoColumnaDetalle').checked = false;
  }

  $scope.aplicarTodoColumnaDetalle = function () {
    if (document.getElementById("checkTodoColumnaDetalle").checked) {
      $scope.tituloDetalleList.forEach((elemento, index) => {
        if (index !== 0 && index !== 1) {
          elemento.vista = true;
        }
      });
    } else {
      $scope.tituloDetalleList.forEach((elemento, index) => {
        if (index !== 0 && index !== 1) {
          elemento.vista = false;
        }
      });
    }
  }

  $scope.buscarDatatable = function () {
    console.log("searchdetallebandeja", $scope.searchdetallebandeja)
    bandejaDetalleTable.search($scope.searchdetallebandeja).draw();
  }
  $scope.primerPeticionDetalle = function () {
    $scope.mostrarfiltroDetalle = false;
    if (!$scope.isConsultaDetalle) {
      if (localStorage.getItem('filtroDetalle')) {
        document.getElementById('checkTodoColumnaDetalle').checked = false;
        $scope.tituloDetalleList = JSON.parse(localStorage.getItem('filtroDetalle'));
        $scope.filtroPorDetalle = $scope.tituloDetalleList.filter(function (elemento) { return elemento.vista === true });
        if ($scope.filtroPorDetalle.length === $scope.tituloDetalleList.length) {
          document.getElementById('checkTodoColumnaDetalle').checked = true;
        } else {
          document.getElementById('checkTodoColumnaDetalle').checked = false;
        }
      } else {
        document.getElementById('checkTodoColumnaDetalle').checked = true;
        $scope.filtroPorDetalle = $scope.tituloDetalleList;
      }
      $scope.consultarDetalleList();
    }
  }

  $scope.openfiltroDetalle = function () {
    if ($scope.mostrarfiltroDetalle) {
      $scope.mostrarfiltroDetalle = false;
    } else {
      $scope.mostrarfiltroDetalle = true;
    }
  }

  validarUndefined = function(el) {
    return el === undefined || !el ? "Sin informaci&oacute;n" : el;
  }
  $scope.primerPeticionDetalle()
}