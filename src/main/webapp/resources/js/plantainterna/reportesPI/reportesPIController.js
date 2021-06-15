var app = angular.module('reportesPIApp', []);

app.controller('reportesController', ['$scope','reportesPIService','$filter', function($scope, reportesPIService, $filter) {
	var reporteTabla;
	var reporteOTPI;
	var reporteCoord;
	var reporteTecAux;
	var reporteOrdTerm;
	var reporteOrdInt;
	
	$scope.iniciarTablaOrdInt= function(data){
		if(reporteOrdInt){
			reporteOrdInt.destroy();
		}
		let viewTable4=[];
		$scope.viewTable4=[];
		angular.forEach(data,function(elemento,index){
            let  array=[];
            array[0] = elemento.id_ot ? elemento.id_ot : '';
			array[1] = elemento.os ? elemento.os : '';
			array[2] = elemento.paquete ? elemento.paquete : '';
			array[3] = elemento.ciudad ? elemento.ciudad : '';
			array[4] = elemento.distrito ? elemento.distrito : '';
			array[5] = elemento.tiempo_integrador ? elemento.tiempo_integrador : '';
            $scope.viewTable4.push(array);
        });
		
		reporteOrdInt = $('#table_ordenes_integrador').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": $scope.viewTable4,
			"columns": [{
                "title": "OT"
        
            }, {
                "title": "OS"
        
            }, {
                "title": "Paquete"
        
            }, {
                "title": "Ciudad"
        
            }, {
                "title": "Distrito"
        
            }, {
                "title": "Tiempo con Integrador"
        
            }]
		});
		
	}
	
	
	
	$scope.iniciarTablaOrdTerm= function(data){
		if(reporteOrdTerm){
			reporteOrdTerm.destroy();
		}
		let viewTable4=[];
		$scope.viewTable4=[];
		angular.forEach(data,function(elemento,index){
            let  array=[];
            array[0] = elemento.id_ot ? elemento.id_ot : '';
			array[1] = elemento.os ? elemento.os : '';
			array[2] = elemento.cliente ? elemento.cliente : '';
			array[3] = elemento.paquete ? elemento.paquete : '';
			array[4] = elemento.ciudad ? elemento.ciudad : '';
			array[5] = elemento.distrito ? elemento.distrito : '';
            $scope.viewTable4.push(array);
        });
		
		reporteOrdTerm = $('#table_ordenes_terminadas').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": $scope.viewTable4,
			"columns": [{
                "title": "OT"
        
            }, {
                "title": "OS"
        
            }, {
                "title": "Cliente"
        
            }, {
                "title": "Paquete"
        
            }, {
                "title": "Ciudad"
        
            }, {
                "title": "Distrito"
        
            }]
		});
		
	}
	
	$scope.iniciarTablaTecAux= function(data){
		if(reporteTecAux){
			reporteTecAux.destroy();
		}
		let viewTable4=[];
		$scope.viewTable4=[];
		angular.forEach(data,function(elemento,index){
            let  array=[];
            array[0] = elemento.ot ? elemento.ot : '';
			array[1] = elemento.os ? elemento.os : '';
			array[2] = elemento.no_empleado ? elemento.no_empleado : '';
			array[3] = elemento.cliente ? elemento.cliente : '';
			array[4] = elemento.date_schedule ? elemento.date_schedule : '';
			array[5] = elemento.fecha_recibido ? elemento.fecha_recibido : '';
			array[6] = elemento.distrito ? elemento.distrito : '';
			array[7] = elemento.intervencion ? elemento.intervencion : '';
            $scope.viewTable4.push(array);
        });
		
		reporteTecAux = $('#table_tecnico_aux').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": $scope.viewTable4,
			"columns": [{
                "title": "OT"
        
            }, {
                "title": "OS"
        
            }, {
                "title": "No. Empleado"
        
            }, {
                "title": "Nombre Tecnico"
        
            }, {
                "title": "Fecha Asignacion"
        
            }, {
                "title": "Fecha Termino"
        
            }, {
                "title": "Distrito"
        
            }, {
                "title": "Intervencion"
        
            }]
		});
		
	}
	
	$scope.iniciarTablaCoord= function(data){
		if(reporteCoord){
			reporteCoord.destroy();
		}
		let viewTable3=[];
		$scope.viewTable3=[];
		angular.forEach(data,function(elemento,index){
            let  array=[];
            array[0] = elemento.empleado ? elemento.empleado : '';
			array[1] = elemento.nombre ? elemento.nombre : '';
			array[2] = elemento.empresa ? elemento.empresa : '';
			array[3] = elemento.pendientes ? elemento.pendientes : '';
			array[4] = elemento.asignadas ? elemento.asignadas : '';
			array[5] = elemento.detenidas ? elemento.detenidas : '';
			array[6] = elemento.terminadas ? elemento.terminadas : '';
			array[7] = elemento.canceladas ? elemento.canceladas : '';
			array[8] = elemento.total ? elemento.total : '';
            $scope.viewTable3.push(array);
        });
		
		reporteCoord = $('#table_coordinador').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": $scope.viewTable3,
			"columns": [{
                "title": "No. Empleado"
        
            }, {
                "title": "Nombre"
        
            }, {
                "title": "Empresa"
        
            }, {
                "title": "Ordenes Pendientes"
        
            }, {
                "title": "Ordenes Asignadas"
        
            }, {
                "title": "Ordenes Detenidas"
        
            }, {
                "title": "Ordenes Terminadas"
        
            }, {
                "title": "Ordenes Canceladas/Rechazadas"
        
            }, {
                "title": "Total Ordenes"
        
            }]
		});
		
	}
	
	$scope.iniciarTablaOTPI= function(data){
		if(reporteOTPI){
			
			reporteOTPI.destroy();
		}
		let viewTable2=[];
		$scope.viewTable2=[];
		angular.forEach(data,function(elemento,index){
            let  array=[];
            array[0] = elemento.ot ? elemento.ot : '';
			array[1] = elemento.os ? elemento.os : '';
			array[2] = elemento.intervencion ? elemento.intervencion : '';
			array[3] = elemento.cuenta ? elemento.cuenta : '';
			array[4] = elemento.tipo_orden ? elemento.tipo_orden : '';
			array[5] = elemento.cliente ? elemento.cliente : '';
			array[6] = elemento.paquete ? elemento.paquete : '';
			array[7] = elemento.canal_venta ? elemento.canal_venta : '';
			array[8] = elemento.ciudad ? elemento.ciudad : '';
			array[9] = elemento.distrito ? elemento.distrito : '';
            $scope.viewTable2.push(array);
        });
		
		reporteOTPI = $('#table_ot_pi').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": $scope.viewTable2,
			"columns": [{
                "title": "OT"
        
            }, {
                "title": "OS"
        
            }, {
                "title": "Intervencion"
        
            }, {
                "title": "Cuenta"
        
            }, {
                "title": "Tipo Orden"
        
            }, {
                "title": "Cliente"
        
            }, {
                "title": "Paquete"
        
            }, {
                "title": "Canal Venta"
        
            }, {
                "title": "Ciudad"
        
            }, {
                "title": "Distrito"
        
            }]
		});
	}
	
	
	$scope.iniciarTabla = function (data) {
	if (reporteTabla) {
			reporteTabla.destroy();
		}

		let viewTable = [];
		 $scope.viewTable = [];
	        angular.forEach(data,function(elemento,index){
	            let  array=[];
	            array[0] = elemento.empleado ? elemento.empleado : '';
				array[1] = elemento.nombre ? elemento.nombre : '';
				array[2] = elemento.empresa ? elemento.empresa : '';
				array[3] = elemento.jefe_INMEDIATO ? elemento.jefe_INMEDIATO : '';
				array[4] = elemento.pendientes ? elemento.pendientes : '';
				array[5] = elemento.asignadas ? elemento.asignadas : '';
				array[6] = elemento.detenidas ? elemento.detenidas : '';
				array[7] = elemento.terminadas ? elemento.terminadas : '';
				array[8] = elemento.canceladas ? elemento.canceladas : '';
				array[9] = elemento.totales ? elemento.totales : '';
	            $scope.viewTable.push(array);
	        });
		
	       // reporteTabla.destroy();
		reporteTabla = $('#table_reporte_tecnicos').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": $scope.viewTable,
			"columns": [{
                "title": "No. Empleado"
        
            }, {
                "title": "Nombre"
        
            }, {
                "title": "Empresa"
        
            }, {
                "title": "Jefe Inmediato"
        
            }, {
                "title": "Ordenes Pendientes"
        
            }, {
                "title": "Ordenes Asignadas"
        
            }, {
                "title": "Ordenes Detenidas"
        
            }, {
                "title": "Ordenes Terminadas"
        
            }, {
                "title": "Ordenes Canceladas/Rechazadas"
        
            }, {
                "title": "Total &Oacute;rdenes"
        
            }]
		});
	}
	
	$scope.consultarReporteOTPI= function(){
		let params={
				id_ot:"", 
				cuenta:"", 
				os:"", 
				intervencion:"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243", 
				canal_venta:"", 
				fecha_inicio:"10/05/2021", 
				fecha_fin:"26/05/2021", 
				distrito:"805,209,217,785,589,588,1977,590,596,595,823,827,848,598,830,851,825,832,846,852,597,828,831,850,157,573,600,790,788,819,574,576,791,575,792,782,789",  
				start:"1",
				end:"10"
		}
		console.log(params);
		reportesPIService.consultarReporteOTSPI(params).then(function success(response) {
			console.log(response);
			if (response.data.respuesta) {
				$scope.iniciarTablaOTPI(response.data.result);
			//	swal.close();
			} else {
				//swal.close();
				mostrarMensajeErrorAlert(response.data.resultDescripcion);
			}
		});
		
	}
	$scope.consultaReporte = function () {
	let params = {
			
			os: "",
			intervencion:"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
			fecha_inicio: "30/12/2020",
			fecha_fin: "26/05/2021",
			distrito: "805,209,217,785,589,588,1977,590,596,595,823,827,848,598,830,851,825,832,846,852,597,828,831,850,157,573,600,790,788,819,574,576,791,575,792,782,789",
			ot:"",
			operario:"",
			start:"1",
			end:"10",
			numero_empleado:"",
			empresa:"",
			jefe_inmediato:"",
			nivel:"1"
		}

		/*if (!swal.isVisible()) {
			swal({ text: 'Espera un momento...', allowOutsideClick: false });
			swal.showLoading();
		}*/
		console.log(params);
		reportesPIService.consultarReporteTecnicoF(params).then(function success(response) {
			console.log(response);
			if (response.data.respuesta) {
				$scope.iniciarTabla(response.data.result);
			//	swal.close();
			} else {
				//swal.close();
				mostrarMensajeErrorAlert(response.data.resultDescripcion);
			}
		});

	}
	$scope.consultarReporteCoord= function(){
		let params={
				 os:"",
				 intervencion:"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,1805,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
				 fecha_inicio:"26/04/2021",
				 fecha_fin:"27/05/2021",
				 distrito:"805,209,217,785,589,588,1977,590,596,595,823,827,848,598,830,851,825,832,846,852,597,828,831,850,157,573,600,790,788,819,574,576,791,575,792,782,789",
				 ot:"",
				 despacho_nombre:"",
				 start:"1",
				 end:"10",
				 numero_empleado:"",
				 nivel:"1"
		}
		console.log(params);
		reportesPIService.consultarReporteCoordinadorF(params).then(function success(response) {
			console.log(response);
			if (response.data.respuesta) {
				$scope.iniciarTablaCoord(response.data.result);
			//	swal.close();
			} else {
				//swal.close();
				mostrarMensajeErrorAlert(response.data.resultDescripcion);
			}
		});
		
	}
	
	$scope.consultaReporteTecAx = function () {
		let params = {
				
				id_ot:"", 
				intervencion:"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,1805,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",  
				distrito:"805,209,217,785,589,588,1977,590,596,595,823,827,848,598,830,851,825,832,846,852,597,828,831,850,157,573,600,790,788,819,574,576,791,575,792,782,789", 
				fecha_agendamiento:"11/05/2021", 
				fecha_termino:"28/05/2021", 
				no_empleado:"",
				start:"1",
				end:"10"
			}

			/*if (!swal.isVisible()) {
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
			}*/
			console.log(params);
			reportesPIService.consultarReporteTecnicoAuxF(params).then(function success(response) {
				console.log(response);
				if (response.data.respuesta) {
					$scope.iniciarTablaTecAux(response.data.result);
				//	swal.close();
				} else {
					//swal.close();
					//mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			});

		}
	
	$scope.consultaReporteOrdTer = function () {
		let params = {
				
				intervencion:"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,1805,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243", 
				fecha_agendamiento:"28/09/2020", 
				fecha_termino:"28/05/2021",
				start:"1",
				end:"10"
			}

			/*if (!swal.isVisible()) {
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
			}*/
			console.log(params);
			reportesPIService.consultarReporteOrdenesTermi(params).then(function success(response) {
				console.log(response);
				if (response.data.respuesta) {
					$scope.iniciarTablaOrdTerm(response.data.result);
				//	swal.close();
				} else {
					//swal.close();
					//mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			});

		}
	
	$scope.consultaReporteOrdInte = function () {
		let params = {
				intervencion:"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,1805,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243", 
				fecha_termino:"28/05/2021",
				fecha_agenda_pi:"26/04/2021",
				start:"1",
				end:"10"
			}

			/*if (!swal.isVisible()) {
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
			}*/
			console.log(params);
			reportesPIService.consultarReporteOrdenesInt(params).then(function success(response) {
				console.log(response);
				if (response.data.respuesta) {
					$scope.iniciarTablaOrdInt(response.data.result);
				//	swal.close();
				} else {
					//swal.close();
					//mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			});

		}
	
	$scope.consultarReporteCoord();
	$scope.consultaReporteTecAx();
	$scope.consultaReporte();
	$scope.consultarReporteOTPI();
	$scope.consultaReporteOrdTer();
	$scope.consultaReporteOrdInte();
	
	
	  
	}]);