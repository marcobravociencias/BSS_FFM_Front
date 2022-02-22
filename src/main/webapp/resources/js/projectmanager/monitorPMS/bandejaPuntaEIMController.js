app.bandejaPuntaEIMController = function ($scope, monitorPMSServices) {
  let puntasSinEimTabla;
  $scope.listPuntaSEIM = [];
  $scope.searchPuntaEIM = "";
  $scope.isConsultaPuntasSinEIM = false
  $scope.mostrarfiltro = false;
  $scope.filtroPorList = [];
  $scope.encabezadosList = [
    {
      titulo: '',
      estatu: false,
      vista: true
    },
    {
      titulo: '',
      estatu: false,
      vista: true
    },
    {
      titulo: 'Nuevo segmento',
      estatu: false,
      vista: true
    },
    {
      titulo: 'Folio cotizacion',
      estatu: true,
      vista: true
    },
    {
      titulo: 'Oportunidad',
      estatu: true,
      vista: true
    },
    {
      titulo: 'Plazo',
      estatu: true,
      vista: true
    },
    {
      titulo: 'Vigencia de cotizacion',
      estatu: true,
      vista: true
    },
    {
      titulo: 'Fecha',
      estatu: true,
      vista: true
    },
    {
      titulo: 'Nombre del vendedor',
      estatu: true,
      vista: true
    },

    {
      titulo: 'Region de venta',
      estatu: true,
      vista: true
    },
    {
      titulo: 'Plaza de venta',
      estatu: true,
      vista: true
    }
  ];
  $scope.infoPuntaSinEimList = [];


  $scope.peticionPuntasEIM = function () {
    $scope.mostrarfiltro = false;
    if (!$scope.isConsultaPuntasSinEIM) {
      if (localStorage.getItem('filtroEim')) {
        $scope.encabezadosList = JSON.parse(localStorage.getItem('filtroEim'));
        $scope.filtroPorList = $scope.encabezadosList.filter(function (elemento) { return elemento.vista === true });
        if ($scope.filtroPorList.length === $scope.encabezadosList.length) {
          document.getElementById('checkTodoColumna').checked = true;
        } else {
          document.getElementById('checkTodoColumna').checked = false;
        }
      } else {
        document.getElementById('checkTodoColumna').checked = true;
        $scope.filtroPorList = $scope.encabezadosList;
      }
      // $scope.$apply()
      $scope.consultaPuntasSinEIM();
    }
  };

  $scope.consultaPuntasSinEIM = function () {
    $scope.listPuntaSEIM = [];
    $scope.isConsultaPuntasSinEIM = true
    if (!swal.isVisible()) {
      swal({ text: "Cargando datos ...", allowOutsideClick: false });
      swal.showLoading();
    }
    $scope.aplicarFiltradoTable()

    /*       monitorService.consultarInformacionPuntasEIM().then(
            function success(response) {
              console.log(response);
              if (response.data !== undefined) {
                if (response.data.success) {
                  if (response.data.result.result === "0") {
                    $scope.infoPuntaSinEimList = response.data.result.cotSinEim;
                    $scope.aplicarFiltradoTable($scope.infoPuntaSinEimList);
                  } else {
                    mostrarMensajeWarning("No se encontro informaci\u00f3n");
                    swal.close();
                  }
                } else {
                  mostrarMensajeWarning("No se encontro informaci\u00f3n");
                  swal.close();
                }
              } else {
                swal.close();
              }
            },
            function error(response) {
              swal.close();
            }
          ); */
  };

  $scope.searchAsignarEim = {};
  $(document).ready(function () {
    prueba = function (folioCotizacion) {
      $scope.folioCotAsignar = folioCotizacion;
      $("#modalAsignarEim").modal('show');
      $scope.listaAsignarEim.map(function (e) {
        e.check = '0';
      });
      $scope.comentAsignarEim = "";
      $scope.searchAsignarEim.nombreEim = "";
      $scope.$apply();
    }
  });

  function validarUndefined(el) {
    return el === undefined || !el ? "Sin informaci&oacute;n" : el;
  }


  $scope.aplicarFiltradoTable = function () {
    if (puntasSinEimTabla)
      puntasSinEimTabla.destroy();

    setTimeout(function () {

      $("#puntasSinEimTable tbody").empty()
      $('#theadPuntasSinEim').empty()

      $scope.listPuntaSEIM = []
      let arreTempResult = [];
      angular.forEach($scope.infoPuntaSinEimList, (elem, index) => {
        arre = [];
        arre[0] = '<i class="iconHand fa fa-handshake-o" onclick="prueba(\'' + validarUndefined(elem.folioCotizacion) + '\')"></i>';
        arre[1] = validarUndefined(elem.top5000) === 'true' ? '<i class="top-cincomil fa fa-star"></i>' : '<i class="top-cincomil-no fa fa-star"></i>';
        arre[2] = validarUndefined(elem.segmentoCliente);
        arre[3] = validarUndefined(elem.folioCotizacion);
        arre[4] = validarUndefined(elem.numeroOportunidad);
        arre[5] = validarUndefined(elem.plazo);
        arre[6] = validarUndefined(elem.vigenciaCotizacion);
        arre[7] = validarUndefined(elem.fechcaCerradaGanada);
        arre[8] = validarUndefined(elem.nombreVendedor);
        arre[9] = validarUndefined(elem.regionVenta);
        arre[10] = validarUndefined(elem.plazaVenta);
        arreTempResult.push(arre)
      });



      angular.forEach(arreTempResult, function (elemento, index) {
        let arrtemp = [];
        angular.forEach($scope.encabezadosList, function (head, i) {
          if (head.vista) {
            arrtemp.push(elemento[i])
          }
        })
        $scope.listPuntaSEIM.push(arrtemp)
      })


      let contenthead = '';
      $scope.encabezadosList.forEach(function (elemento, index) {
        if (elemento.vista) {
          contenthead += `<th> ${elemento.titulo} </th>`;
        }
      });
      console.log(contenthead);




      $('#theadPuntasSinEim').append(`<tr> ${contenthead} </tr>`);
      puntasSinEimTabla = $("#puntasSinEimTable").DataTable({
        processing: false,
        ordering: false,
        scrollX: false,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: false,
        pageLength: 10,
        data: $scope.listPuntaSEIM,
        language: idioma_espanol_not_font,
        sDom: '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        dom: 'Bfrtip'
      });
    }, 1000);
    $scope.mostrarfiltro = false;
    swal.close()
  }

  $scope.buscarPuntas = function () {
    console.log("searchPuntaEIM", $scope.searchPuntaEIM)
    puntasSinEimTabla.search($scope.searchPuntaEIM).draw();
  }

  $scope.openfiltro = function () {
    if ($scope.mostrarfiltro) {
      $scope.mostrarfiltro = false;
    } else {
      $scope.mostrarfiltro = true;
    }
  }

  $scope.aplicarFiltro = function () {
    $scope.filtroPorList = [];
    swal({ text: "Cargando datos ...", allowOutsideClick: false });
    swal.showLoading();
    $scope.encabezadosList.forEach((element, index) => {
      if (index !== 0 && index !== 1 && index !== 2) {
        if (element.vista) {
          element.estatu = true;
        } else {
          element.estatu = false;
        }
      }
    });
    $scope.filtroPorList = $scope.encabezadosList.filter(function (elemento) { return elemento.vista === true });
    localStorage.setItem('filtroEim', JSON.stringify($scope.encabezadosList));
    if (!localStorage.getItem('expire')) {
      $scope.getSessionExp();
    }
    $scope.aplicarFiltradoTable()
  }

  $scope.aplicarFiltroPorEIM = function () {
    angular.forEach($scope.filtroPorList, (elemento, index) => {
      if (index !== 0 && index !== 1 && index !== 2) {
        puntasSinEimTabla.column(index).search($('#eimSearch' + index).val().trim());
      }
    });
    puntasSinEimTabla.draw();
    $scope.mostrarfiltro = false;
  }

  $scope.aplicarTodoColumna = function () {
    if (document.getElementById('checkTodoColumna').checked) {
      $scope.encabezadosList.forEach((elemento, index) => {
        if (index !== 0 && index !== 1 && index !== 2) {
          elemento.vista = true;
        }
      });
    } else {
      $scope.encabezadosList.forEach((elemento, index) => {
        if (index !== 0 && index !== 1 && index !== 2) {
          elemento.vista = false;
        }
      });
    }
  }

  $scope.quitarCheckTodoColumna = function () {
    document.getElementById('checkTodoColumna').checked = false;
  }

  $scope.quitarCheckFiltrarPor = function () {
    document.getElementById('checkTodoFiltrarPor').checked = false;
  }

  $scope.getSessionExp = function () {
    let fecha = new Date();
    //fecha.setDate(fecha.getDate() + 1);
    let fechaP = fecha.toISOString().split('T')[0]
    let fechaActual = new Date(fechaP);
    localStorage.setItem('expire', fechaActual.getTime());
  }


  $scope.checkAsignarEim = function (element) {
    $scope.listaAsignarEim.map(function (e) {
      e.check = '0';
    });
    $scope.listaAsignarEim[$scope.listaAsignarEim.indexOf(element)].check = '1';
  }

  $scope.asignarEim = function () {
    $scope.listaAsignarEim.map(function (e) {
      if (e.check === '1') {
        $scope.eimAsignado = e;
      }
    });
    console.log($scope.eimAsignado);
    console.log($scope.comentAsignarEim);
  }

  $scope.eimAsignado = {};
  $scope.actualizaCotizacion = function () {
    $scope.eimAsignado = {};
    $scope.listaAsignarEim.map(function (e) {
      if (e.check === '1') {
        $scope.eimAsignado = e;
      }
    });
    var mensaje = "";
    var bandera = true;
    if ($scope.comentAsignarEim === "") {
      mensaje += "<li>Ingrese un comentario</li>";
      bandera = false;
    }
    if (!$scope.eimAsignado.id) {
      mensaje += "<li>Seleccione un EIM</li>";
      bandera = false;
    }

    if (bandera) {
      swal({ text: 'Cargando datos ...', allowOutsideClick: false });
      swal.showLoading();

      console.log($scope.eimAsignado);

      var params = new FormData();
      //params.append("params.idUser", '14922');
      params.append("params.nameCotizacion", $scope.folioCotAsignar);
      params.append("params.idPm", $scope.eimAsignado.id);
      params.append("params.comentarios", $scope.comentAsignarEim);

      monitorService.actualizaCotizacionPMO(params).then(function success(response) {
        console.log(response);
        if (response.data !== undefined) {
          if (response.data.success) {
            if (response.data.result.result === '0') {
              $("#modalAsignarEim").modal('hide');
              $scope.consultaPuntasSinEIM();
              //swal.close()
            } else {
              mostrarMensajeWarning("No se encontro informaci\u00f3n");
              swal.close();
            }
          } else {
            mostrarMensajeWarning("No se encontro informaci\u00f3n");
            swal.close();
          }
        } else {
          swal.close();
        }
      }, function error(response) {
        swal.close()
      });
    } else {
      mostrarMensajeWarning(mensaje);
    }


  }

}