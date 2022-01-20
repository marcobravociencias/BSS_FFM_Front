app.graficaController = function ($scope, $q, misProyectosService) {

    $scope.lineaTiempo = {};

    $scope.inicializarGrafica = function() {
        //Se itera la lista de proyectos para obtener la fecha inicio y fecha fin de la grafica
        $scope.heightCalendar = 50;
        $scope.lineaTiempo.fechaInicio = moment(moment().format('MM')+"-"+moment().format('DD')+"-"+moment().format('YYYY'));
        $scope.lineaTiempo.fechaFin = moment(moment().format('MM')+"-"+moment().format('DD')+"-"+moment().format('YYYY'));
        $scope.lineaTiempo.fechaActual = moment(moment().format('MM')+"-"+moment().format('DD')+"-"+moment().format('YYYY'));
        $scope.lineaTiempo.fechaActualFormat = $scope.lineaTiempo.fechaActual.format('DD');
        $scope.listaProyectosGrafica.map(function(proyecto, index) {
            //obtener fecha incio
            proyecto.fechaInicioReal = moment(proyecto.fechaInicioReal);
            proyecto.fechaInicioPlaneada = moment(proyecto.fechaInicioPlaneada);
            proyecto.fechaInicioFormat = proyecto.fechaInicioPlaneada.format('L');
            
            if (proyecto.fechaInicioPlaneada <= $scope.lineaTiempo.fechaInicio) {
                $scope.lineaTiempo.fechaInicio = proyecto.fechaInicioPlaneada;
            }
            //obtener fecha fin
            proyecto.fechaFinReal = moment(proyecto.fechaFinReal);
            proyecto.fechaFinPlaneada = moment(proyecto.fechaFinPlaneada);
            proyecto.fechaFinFormat = proyecto.fechaFinReal.format('L');
            if (proyecto.fechaFinPlaneada >= $scope.lineaTiempo.fechaFin) {
                $scope.lineaTiempo.fechaFin = proyecto.fechaFinPlaneada;
            }
        });
        //obtener el total de dias
        $scope.lineaTiempo.dias = $scope.lineaTiempo.fechaFin.diff($scope.lineaTiempo.fechaInicio, 'days')+1;
        //CALCULAR GRAFICA DE MIS PROYECTOS
        $scope.listaProyectosGrafica.map(function(proyecto, index) {
            //dias inicio del proyecto
            proyecto.diasInicio = proyecto.fechaInicioPlaneada.diff($scope.lineaTiempo.fechaInicio, 'days');
            //dias del proyecto
            proyecto.diasProyecto = proyecto.fechaFinReal.diff(proyecto.fechaInicioPlaneada, 'days');
            if (proyecto.diasProyecto === 0) {
                proyecto.diasProyecto = 1;
            }
            //dias fin proyecto
            proyecto.diasFin = $scope.lineaTiempo.fechaFin.diff(proyecto.fechaFinReal, 'days');
            //calcular porcentajes
            proyecto.porcentajeInicio = (proyecto.diasInicio * 100 / $scope.lineaTiempo.dias);
            proyecto.porcentajeProyecto = (proyecto.diasProyecto * 100 / $scope.lineaTiempo.dias);
            proyecto.porcentajeFIn = (proyecto.diasFin * 100 / $scope.lineaTiempo.dias);
            console.log(proyecto);
        });

        //CALCULAR EL DIA ACTUAL
        $scope.lineaTiempo.diaActual = ($scope.lineaTiempo.fechaActual.diff($scope.lineaTiempo.fechaInicio, 'days') * 100 / $scope.lineaTiempo.dias);

        //Porcentaje que tendra cada dia en el calendario
        $scope.widthCalendar = 0;
        var fechaInicio = angular.copy($scope.lineaTiempo.fechaInicio);
        $scope.lineaTiempo.calendarioDias = [];
        $scope.lineaTiempo.calendarioMeses = [];
        $scope.calendarioMesValidacion = [];
        $scope.lineaTiempo.porcentajeDia = (100 / $scope.lineaTiempo.dias);
        $scope.lineaTiempo.calendarioDias.push({dia: fechaInicio.format('DD')});
        $scope.lineaTiempo.calendarioMeses.push({mes: $scope.nombreMeses[parseInt(fechaInicio.format('M'))-1]+" "+fechaInicio.format('YYYY')});
        $scope.calendarioMesValidacion.push(fechaInicio.format('M')+"-"+fechaInicio.format('YYYY'));
        var counthDays = 0;
        for (var i = 1; i < $scope.lineaTiempo.dias; i++) {
            $scope.dia = {};
            counthDays++;
            
            //moment().add(29, 'days').format('D')
            $scope.dia.dia = fechaInicio.add(1, 'days').format('DD');
            $scope.lineaTiempo.calendarioDias.push($scope.dia);
            if (fechaInicio.format('DD') === "01" && !$scope.calendarioMesValidacion.includes((fechaInicio.format('M')+"-"+fechaInicio.format('YYYY')))) {
                console.log("INGRESA NUEVO MES");
                $scope.lineaTiempo.calendarioMeses[$scope.lineaTiempo.calendarioMeses.length - 1].porcentaje = counthDays * 100 / $scope.lineaTiempo.dias;
                $scope.lineaTiempo.calendarioMeses[$scope.lineaTiempo.calendarioMeses.length - 1].dias = counthDays;
                $scope.lineaTiempo.calendarioMeses.push({mes: $scope.nombreMeses[parseInt(fechaInicio.format('M'))-1]+" "+fechaInicio.format('YYYY')});
                $scope.calendarioMesValidacion.push(fechaInicio.format('M')+"-"+fechaInicio.format('YYYY'));
                counthDays = 0;
                $scope.widthCalendar = $scope.widthCalendar + 1200;
            }
        }
        $scope.lineaTiempo.calendarioMeses[$scope.lineaTiempo.calendarioMeses.length - 1].porcentaje = counthDays * 100 / $scope.lineaTiempo.dias;
        $scope.lineaTiempo.calendarioMeses[$scope.lineaTiempo.calendarioMeses.length - 1].dias = counthDays;
        $scope.widthCalendar = $scope.widthCalendar + 1200;
    }

    $scope.inicializarGraficaPuntas = function(proyecto) {
        //CALCULAR GRAFICA DE MIS PUNTAS

        proyecto.Puntas.map(function(punta) {
            punta.fechaInicioPlaneada = moment(punta.fechaInicioPlaneada);
            punta.fechaInicioReal = moment(punta.fechaInicioReal);
            punta.fechaFinPlaneada = moment(punta.fechaFinPlaneada);
            punta.fechaFinReal = moment(punta.fechaFinReal);
            punta.fechaInicioFormat = punta.fechaInicioPlaneada.format('L');
            punta.fechaFinFormat = punta.fechaFinReal.format('L');
            //Calcular los dias de inicio de la punta
            punta.diasInicio = punta.fechaInicioPlaneada.diff($scope.lineaTiempo.fechaInicio, 'days');
            //calcular los dias de la punta
            punta.diasPunta = punta.fechaFinReal.diff(punta.fechaInicioPlaneada, 'days');
            //calcular los dias fin de la punta
            punta.diasFin = punta.diasFin = $scope.lineaTiempo.fechaFin.diff(punta.fechaFinReal, 'days');
            //calcular porcentajes
            punta.porcentajeInicio = (punta.diasInicio * 100 / $scope.lineaTiempo.dias);
            punta.porcentajePunta = (punta.diasPunta * 100 / $scope.lineaTiempo.dias);
            punta.porcentajeFIn = (punta.diasFin * 100 / $scope.lineaTiempo.dias);
            console.log(punta);
        });
    }

    $scope.inicializarGraficaPlanes = function(punta) {

        punta.Planes.map(function(plan) {
            plan.fechaInicioPlaneada = moment(plan.fechaInicioPlaneada);
            plan.fechaInicioReal = moment(plan.fechaInicioReal);
            plan.fechaFinPlaneada = moment(plan.fechaFinPlaneada);
            plan.fechaFinReal = moment(plan.fechaFinReal);
            plan.fechaInicioFormat = plan.fechaInicioPlaneada.format('L');
            plan.fechaFinFormat = plan.fechaFinReal.format('L');

            plan.diasInicio = plan.fechaInicioPlaneada.diff($scope.lineaTiempo.fechaInicio, 'days');
            plan.diasPlan = plan.fechaFinReal.diff(plan.fechaInicioPlaneada, 'days');
            plan.diasFin = $scope.lineaTiempo.fechaFin.diff(plan.fechaFinReal, 'days');

            plan.porcentajeInicio = (plan.diasInicio * 100 / $scope.lineaTiempo.dias);
            plan.porcentajePlan = (plan.diasPlan * 100 / $scope.lineaTiempo.dias);
            plan.porcentajeFIn = (plan.diasFin * 100 / $scope.lineaTiempo.dias);
            
            plan.valor = isNaN(plan.diasPlan) ? false : true;
            console.log(plan);
        });
    }

    $scope.inicializarGraficaActividades = function() {
        $scope.listaActividades.map(function(actividad){
            actividad.Fecha_inicio_planeada = moment(actividad.Fecha_inicio_planeada);
            actividad.Fecha_inicio_real = moment(actividad.Fecha_inicio_real);
            actividad.Fecha_fin_planeada = moment(actividad.Fecha_fin_planeada);
            actividad.Fecha_fin_real = moment(actividad.Fecha_fin_real);
            actividad.fechaInicioFormatPlaneada = actividad.Fecha_inicio_planeada.format('L');
            actividad.fechaFinFormatReal = actividad.Fecha_fin_real.format('L');
            //DIAS PLANEADA
            actividad.diasInicioPlaneada = actividad.Fecha_inicio_planeada.diff($scope.lineaTiempo.fechaInicio, 'days');
            actividad.diasActividadPlaneada = actividad.Fecha_fin_real.diff(actividad.Fecha_inicio_planeada, 'days');
            actividad.diasFinPlaneada = $scope.lineaTiempo.fechaFin.diff(actividad.Fecha_fin_real, 'days');
            //DIAS REAL
            actividad.diasInicioReal = actividad.Fecha_inicio_real.diff($scope.lineaTiempo.fechaInicio, 'days');
            actividad.diasActividadReal = actividad.Fecha_fin_real.diff(actividad.Fecha_inicio_real, 'days');
            actividad.diasFinReal = $scope.lineaTiempo.fechaFin.diff(actividad.Fecha_fin_real, 'days');
            actividad.porcentajeInicioPlaneada = (actividad.diasInicioPlaneada * 100 / $scope.lineaTiempo.dias);
            actividad.porcentajeActividadPlaneada = (actividad.diasActividadPlaneada * 100 / $scope.lineaTiempo.dias);
            actividad.porcentajeFinPlaneada = (actividad.diasFinPlaneada * 100 / $scope.lineaTiempo.dias);
            actividad.porcentajeInicioReal = (actividad.diasInicioReal * 100 / $scope.lineaTiempo.dias);
            actividad.porcentajeActividadReal = (actividad.diasActividadReal * 100 / $scope.lineaTiempo.dias);
            actividad.porcentajeFinReal = (actividad.diasFinReal * 100 / $scope.lineaTiempo.dias);
            actividad.valor = isNaN(actividad.diasActividadPlaneada) ? false : true;
            console.log(actividad);
        });
    }

    $scope.resultProyectos = 
    {
        "success": true,
        "result": {
            "result": "0",
            "resultDescripcion": "Operacion_exitosa",
            "version": "1.2",
            "Num_total_planes": "11",
            "Num_en_tiempo": "0",
            "Num_en_riesgo": "0",
            "Num_fuera_tiempo": "0",
            "Num_pendientes": "30",
            "OS_pendientes": "30",
            "Num_confirmado": "0",
            "Num_proceso": "0",
            "Num_restcate": "0",
            "Num_Cancelado": "0",
            "Num_detenida": "0",
            "Num_gestoria": "0",
            "Num_suspendido": "0",
            "Num_completado": "0",
            "Num_calendarizado": "0",
            "Num_otro": "0",
            "totalPuntas": "30",
            "totalPuntasPorInstalar": "30",
            "totalPuntasCalendarizado": "0",
            "totalPuntasDetenido": "0",
            "totalPuntasDevueltoVentas": "0",
            "totalPuntasCancelado": "0",
            "totalPuntasInstalado": "0",
            "Proyectos": [{
                "Id_cuenta": "0018A00000iXrXkQAK",
                "Nombre_cliente": "Test Troncales",
                "Es_Top_5000": "false",
                "Segmento": "Pequenas",
                "Sector": "Servicios",
                "Nombre_contacto": "Testtroncalestest",
                "Tel_contacto": "5500000012",
                "Num_fuera_tiempo": "0",
                "Num_en_riesgo": "0",
                "Num_en_tiempo": "0",
                "Num_pendientes": "30",
                "OS_pendientes": "30",
                "Num_confirmado": "0",
                "Num_proceso": "0",
                "Num_restcate": "0",
                "Num_Cancelado": "0",
                "Num_detenida": "0",
                "Num_gestoria": "0",
                "Num_suspendido": "0",
                "Num_completado": "0",
                "Num_calendarizado": "0",
                "Num_otro": "0",
                "totalPuntas": "30",
                "totalPuntasPorInstalar": "30",
                "totalPuntasCalendarizado": "0",
                "totalPuntasDetenido": "0",
                "totalPuntasDevueltoVentas": "0",
                "totalPuntasCancelado": "0",
                "totalPuntasInstalado": "0",
                "fechaInicioPlaneada": "12-12-2021",
                "fechaFinPlaneada": "01-20-2022",
                "fechaInicioReal": "12-12-2021",
                "fechaFinReal": "01-20-2022",
                "fechaActual": "12-28-2021",
                "porcentajeAvance": "70",
                "porcentajeEsperado": "",
                "semaforo": "#FF0000",
                "informacionCliente": {
                    "razonSocial": "Test Troncales",
                    "rfc": "XXX000001XX8",
                    "top5000": "false",
                    "ciudad": "CDMX",
                    "estado": "Ciudad de México",
                    "delegacionMunicipio": "Coyoacán",
                    "colonia": "La Otra Banda",
                    "calle": "Avenida San Jerónimo",
                    "numeroExterior": "252",
                    "numeroInterior": "10",
                    "codigoPostal": "04519",
                    "phone": "5500000012",
                    "montoPotencial": "De $1,000 a $30,000",
                    "contactoPrincipalNombreCompleto": "TestTroncalesTest",
                    "contactoPrincipalPhone": "5500000012",
                    "contactoPrincipalEmail": "testtroncales@test.com"
                },
                "Puntas": [{
                    "Id_cuenta": "0018A00000iXrXkQAK",
                    "Id_cotizacion": "a068A000003w05mQAA",
                    "Folio_cotizacion": "COT4095673",
                    "Id_oportunidad": "0068A00000B5cc4QAB",
                    "Numero_oportunidad": "04043899",
                    "Id_cot_sitio": "a128A000003P6kyQAC",
                    "Nombre_cot_sitio": "CS5004641",
                    "Id_sitio": "a018A000005ULsyQAG",
                    "Folio_sitio": "SIT-4016791",
                    "Nombre_sitio": "Sit1-TestTroncales",
                    "esVenta": "true",
                    "Fecha_cierre": "23/12/2021",
                    "Plazo": "36",
                    "Nombre_responsable_sitio": "Marco Hernandez Miron",
                    "Longitud": "19.334342",
                    "Latitud": "-99.19896299999999",
                    "Plaza": "Ciudad De Mexico",
                    "Direccion_sitio": "Avenida San Jerónimo, 112 , La Otra Banda, Ciudad De México, 04519",
                    "esNueva": "false",
                    "fechaInicioPlaneada": "12-12-2021",
                    "fechaFinPlaneada": "01-18-2022",
                    "fechaInicioReal": "12-12-2021",
                    "fechaFinReal": "01-18-2022",
                    "fechaActual": "12-28-2021",
                    "porcentajeAvance": "60",
                    "porcentajeEsperado": "",
                    "semaforo": "#FF0000",
                    "Num_fuera_tiempo": "0",
                    "Num_en_riesgo": "0",
                    "Num_en_tiempo": "0",
                    "Num_pendientes": "10",
                    "OS_pendientes": "10",
                    "Num_confirmado": "0",
                    "Num_proceso": "0",
                    "Num_restcate": "0",
                    "Num_Cancelado": "0",
                    "Num_detenida": "0",
                    "Num_gestoria": "0",
                    "Num_suspendido": "0",
                    "Num_completado": "0",
                    "Num_calendarizado": "0",
                    "Num_otro": "0",
                    "Num_total": "11",
                    "totalPuntas": "10",
                    "totalPuntasPorInstalar": "10",
                    "totalPuntasCalendarizado": "0",
                    "totalPuntasDetenido": "0",
                    "totalPuntasDevueltoVentas": "0",
                    "totalPuntasCancelado": "0",
                    "totalPuntasInstalado": "0",
                    "estatusPlaneacion": "0",
                    "enTiempo": "",
                    "informacionContrato": {
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999"
                    },
                    "Planes": [{
                        "idVendedor": "0058A000003F6ZjQAK",
                        "idDetallePlaneacion": "1422",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rcQAC",
                        "Folio_CSP": "CSP5701933",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGofUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000446",
                        "fechaInicioPlaneada": "12-12-2021",
                        "fechaFinPlaneada": "01-18-2022",
                        "fechaInicioReal": "12-12-2021",
                        "fechaFinReal": "01-18-2022",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "50",
                        "porcentajeEsperado": "",
                        "semaforo": "#FF0000",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701933",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000446",
                            "cuadrillaFFM": "Empresarial"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rdQAC",
                        "Folio_CSP": "CSP5701934",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGogUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000447",
                        "fechaInicioPlaneada": "",
                        "fechaInicioPlaneada": "12-12-2021",
                        "fechaFinPlaneada": "01-25-2022",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701934",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000447",
                            "cuadrillaFFM": "Empresarial"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3raQAC",
                        "Folio_CSP": "CSP5701931",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGodUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000444",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701931",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000444",
                            "cuadrillaFFM": "Empresarial"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rbQAC",
                        "Folio_CSP": "CSP5701932",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGoeUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000445",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701932",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000445",
                            "cuadrillaFFM": "Empresarial"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rZQAS",
                        "Folio_CSP": "CSP5701930",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGocUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000443",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701930",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000443",
                            "cuadrillaFFM": "Empresarial"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rXQAS",
                        "Folio_CSP": "CSP5701928",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGoaUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000441",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701928",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000441",
                            "cuadrillaFFM": "Empresarial",
                            "estatusActivacion": "En proceso"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerEstatusActivacion": "En proceso",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rYQAS",
                        "Folio_CSP": "CSP5701929",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGobUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000442",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701929",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000442",
                            "cuadrillaFFM": "Empresarial"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rVQAS",
                        "Folio_CSP": "CSP5701926",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGoYUAU",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000439",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701926",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000439",
                            "cuadrillaFFM": "Empresarial",
                            "estatusActivacion": "En proceso"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerEstatusActivacion": "En proceso",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3rWQAS",
                        "Folio_CSP": "CSP5701927",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGoZUAU",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000440",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701927",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000440",
                            "cuadrillaFFM": "Empresarial",
                            "estatusActivacion": "En proceso"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerEstatusActivacion": "En proceso",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }, {
                        "idVendedor": "0058A000003F6ZjQAK",
                        "Id_cuenta": "0018A00000iXrXkQAK",
                        "Id_cot_sitio": "a128A000003P6kyQAC",
                        "Id_csp": "a118A000001G3reQAC",
                        "Folio_CSP": "CSP5701935",
                        "Paquete": "Troncal SIP 10x30 Empresarial TE",
                        "esVenta": "true",
                        "tipoImplementacion": "Nueva",
                        "Canal_venta": "Sin espesificar",
                        "BannerFamiliaPlan": "Troncales SIP Empresarial TE",
                        "Tipo_cuadrilla": "Empresarial",
                        "Tipo_acceso": "FIBRA",
                        "Unidad_negocio": "2",
                        "Tipo_intervencion": "48",
                        "Subtipo_intervencion": "49",
                        "Region": "MEGACENTRO",
                        "Ciudad": "CIUDAD DE MEXICO",
                        "Distrito": "SUR",
                        "Cluster": "PEDREGAL",
                        "Calle": "Avenida San Jerónimo",
                        "Colonia": "La Otra Banda",
                        "Estado": "Ciudad de México",
                        "Municipio": "Ciudad de México",
                        "Num_exterior": "112",
                        "Latitud": "19.334342",
                        "Longitud": "-99.19896299999999",
                        "CP": "04519",
                        "Telefono_contacto": "5500000012",
                        "Id_cuenta_factura": "a0G8A000004cGohUAE",
                        "Status_OS": "Pendiente",
                        "statusCsp": "Por instalar",
                        "tipoPlan": "P",
                        "Numero_cuentaFactura": "0200000448",
                        "fechaInicioPlaneada": "",
                        "fechaFinPlaneada": "",
                        "fechaInicioReal": "",
                        "fechaFinReal": "",
                        "fechaActual": "12-28-2021",
                        "porcentajeAvance": "0.0",
                        "porcentajeEsperado": "0.0",
                        "semaforo": "",
                        "PlaneacionCerrada": "false",
                        "implementacionterminada": "false",
                        "estatusPlaneacion": "0",
                        "enTiempo": "",
                        "informacionServicio": {
                            "folioCsp": "CSP5701935",
                            "familiaPlan": "Troncales SIP Empresarial TE",
                            "nombrePlan": "Troncal SIP 10x30 Empresarial TE",
                            "tipoOportunidad": "Nueva",
                            "tipoRegistro": "IP",
                            "acessoPrincipal": "FIBRA",
                            "TipoCotizacionPm": "Planes",
                            "cuentaFactura": "0200000448",
                            "cuadrillaFFM": "Empresarial"
                        },
                        "folioCotSitio": "CS5004641",
                        "direccionSitio": "",
                        "plaza": "CIUDAD DE MEXICO",
                        "subtotalRenta": "20990.0",
                        "totalRentaConImpuesto": "25078.9",
                        "tipoOportunidad": "Planes",
                        "folioCotizacion": "COT4095673",
                        "nombreSitio": "Sit1-TestTroncales",
                        "folioSitio": "SIT-4016791",
                        "tipoCobertura": "Sólo fibra",
                        "latitude": "19.334342",
                        "longitude": "-99.19896299999999",
                        "BannerTipoCotizacionPM": "Planes",
                        "BannerTipo_de_registro_CF": "IP"
                    }],
                    "listStatusOS": ["Pendiente", "Pendiente", "Pendiente", "Pendiente", "Pendiente", "Pendiente", "Pendiente", "Pendiente", "Pendiente", "Pendiente"],
                    "listStatusCSP": ["Por instalar", "Por instalar", "Por instalar", "Por instalar", "Por instalar", "Por instalar", "Por instalar", "Por instalar", "Por instalar", "Por instalar"],
                    "listSemaforo": ["", "", "", "", "", "", "", "", "", ""]
                }],
                "Num_total": "11"
            }]
        }
    }

    $scope.resultActividades = 
    {
        "success": true,
        "result": {
            "result": "0",
            "resultDescripcion": "Operacion_exitosa",
            "Version": "1.2",
            "Num_en_tiempo": "0",
            "Num_en_riesgo": "0",
            "Num_fuera_tiempo": "0",
            "Num_pendientes": "4",
            "Actividades": [{
                "Id_actividad": "3665",
                "orden": "1",
                "Id_tipo_actividad": "1",
                "Nombre_actividad": "Validacion Con El Cliente Y Generacion Del Plana De Trabajo",
                "Nombre_responsable": "",
                "Porcentaje": "50",
                "Fecha_inicio_planeada": "12-23-2021",
                "Fecha_fin_planeada": "01-03-2022",
                "Fecha_inicio_real": "12-23-2021",
                "Fecha_fin_real": "01-03-2022",
                "Id_dependencia": "",
                "Fecha_creacion": "2021-12-28 00:00:00",
                "Se_puede_eliminar": "false",
                "semaforo": "#5DC62F",
                "Tiene_Ot": "false",
                "Id_implementacion": "1422",
                "Id_csp": "a118A000001G3rcQAC",
                "hoy": "12-30-2021",
                "planeacionCerrada": "0",
                "planTermindo": "1",
                "enTiempo": "false"
            }, {
                "Id_actividad": "3666",
                "orden": "2",
                "Id_tipo_actividad": "2",
                "Nombre_actividad": "Implementacion Del Servicio",
                "Nombre_responsable": "",
                "Porcentaje": "0",
                "Fecha_inicio_planeada": "",
                "Fecha_fin_planeada": "",
                "Fecha_inicio_real": "",
                "Fecha_fin_real": "",
                "Id_dependencia": "3665",
                "Fecha_creacion": "2021-12-28 00:00:00",
                "Se_puede_eliminar": "false",
                "Tiene_Ot": "true",
                "Id_implementacion": "1422",
                "Id_csp": "a118A000001G3rcQAC",
                "hoy": "12-30-2021",
                "planeacionCerrada": "0",
                "planTermindo": "1",
                "enTiempo": "false"
            }, {
                "Id_actividad": "3667",
                "orden": "3",
                "Id_tipo_actividad": "3",
                "Nombre_actividad": "Pruebas Del Servicio",
                "Nombre_responsable": "",
                "Porcentaje": "0",
                "Fecha_inicio_planeada": "",
                "Fecha_fin_planeada": "",
                "Fecha_inicio_real": "",
                "Fecha_fin_real": "",
                "Id_dependencia": "3666",
                "Fecha_creacion": "2021-12-28 00:00:00",
                "Se_puede_eliminar": "false",
                "Tiene_Ot": "false",
                "Id_implementacion": "1422",
                "Id_csp": "a118A000001G3rcQAC",
                "hoy": "12-30-2021",
                "planeacionCerrada": "0",
                "planTermindo": "1",
                "enTiempo": "false"
            }, {
                "Id_actividad": "3668",
                "orden": "4",
                "Id_tipo_actividad": "4",
                "Nombre_actividad": "Entrega Del Servicio",
                "Nombre_responsable": "",
                "Porcentaje": "0",
                "Fecha_inicio_planeada": "",
                "Fecha_fin_planeada": "",
                "Fecha_inicio_real": "",
                "Fecha_fin_real": "",
                "Id_dependencia": "3667",
                "Fecha_creacion": "2021-12-28 00:00:00",
                "Se_puede_eliminar": "false",
                "Tiene_Ot": "false",
                "Id_implementacion": "1422",
                "Id_csp": "a118A000001G3rcQAC",
                "hoy": "12-30-2021",
                "planeacionCerrada": "0",
                "planTermindo": "1",
                "enTiempo": "false"
            }],
            "dependencia": "SIN DEPENDENCIA",
            "idDependencia": "0"
        }
    };
    
};

