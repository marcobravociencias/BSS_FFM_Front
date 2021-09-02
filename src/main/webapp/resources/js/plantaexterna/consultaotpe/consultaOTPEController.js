var app = angular.module('consultaOTPEApp', []);

app.controller('consultaOTPEController', ['$scope','$q', 'consultaService','genericService', '$filter', function ($scope,$q, consultaService, genericService, $filter) {
    $scope.filtrosGeneral = {};
    var tablaInspector;
    var tablaMasivo;
    var tablaDiario;
    var tablaMateriales;
    $scope.consultarCatalagosPI = function(){
        $q.all([
            genericService.consultarCatalogoIntervenciones()
        ]).then(function(results) {
        //    console.log("entra de cualquier manera")
            if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.filtrosGeneral.tipoOrdenes = $scope.realizarConversionAnidado(results[0].data.result)
						console.log("Tipo",$scope.filtrosGeneral.tipoOrdenes);
					} else {
						toastr.warning('No se encontraron  tipo ordenes');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
			}
			           

        }).catch(err => handleError(err));
    }
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
    $scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}
    $scope.iniciarTablaIns=function(){
        tablaInspector = $('#reporteInspectorTable').DataTable({
            "autoWidth": true,
			"paging": true,
			"lengthChange": false,
            "scrollX": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
        
    }
    $scope.iniciarTablaMasivo=function(){
        tablaMasivo=$('#reporteMasivoTable').DataTable({
            "autoWidth": true,
			"paging": true,
			"lengthChange": false,
            "scrollX": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
    }
    $scope.iniciarTablaDiario=function(){
        tablaDiario=$('#reporteDiarioTable').DataTable({
            "autoWidth": true,
			"paging": true,
			"lengthChange": false,
            "scrollX": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,			
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
    }
    $scope.initComponents=function(){
        $scope.consultarCatalagosPI();
        $('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: true
		});
		$('.datepicker').datepicker('update', new Date());

		console.log("Entra a inicializar elementos");					
		$('.nav-item').removeClass('active');
 		$('#otros_nav').addClass('active');
		$("#btn_mostrar_nav").hide(500);
   
        tablaDiario=$('#reporteDiarioTable').DataTable({
            "autoWidth": true,
			"paging": true,
			"lengthChange": false,
            "scrollX": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,			
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});

        tablaMasivo=$('#reporteMasivoTable').DataTable({
            "autoWidth": true,
			"paging": true,
			"lengthChange": false,
            "scrollX": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});

        tablaInspector = $('#reporteInspectorTable').DataTable({
            "autoWidth": true,
			"paging": true,
			"lengthChange": false,
            "scrollX": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
		
	}
    $scope.ocultar=function(){
        $("#navbar_reportes").hide('fade');
        $('#btn_mostrar_nav').show();
        $("#datos_tablas").attr("class","");
        $("#datos_tablas").addClass("col-sm-12 col-md-12"); 
    }
    $scope.mostrar=function(){

        $(this).hide();       
        $("#datos_tablas").attr('class','');
        $("#datos_tablas").addClass("col-sm-10");
        $("#navbar_reportes").show('fade');	
    }
    $(".elemento_link").click(function(){
        $(".elemento_link ").removeClass("active");
        $(this).addClass('active');
        switch($(this).attr('id')){
            case 'link_consulta_inspector':
                $("#texto_header_reportes").text("Consulta OT Inspector"); 
                $('#container_consulta_inspector').show();
				$('#container_consulta_masivo').hide();
				$('#container_consulta_diaria').hide();
                break;
            case 'link_consulta_masiva':
                $("#texto_header_reportes").text("Consulta OT Corte Masivo"); 
                $('#container_consulta_inspector').hide();
				$('#container_consulta_masivo').show();
				$('#container_consulta_diaria').hide();
                break;
            case 'link_consulta_diaria':
                $("#texto_header_reportes").text("Consulta OT Operacion Diaria"); 
                $('#container_consulta_inspector').hide();
				$('#container_consulta_masivo').hide();
				$('#container_consulta_diaria').show();
                break;

        }
    });
    $scope.consultarReporteDiario=function(){
        var tbodyDiario='';
        let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})

        let params = {
            idOrden: $.trim(document.getElementById('idotO').value),
            folioSistema: '',
            claveCliente: '',
            idSubTipoOrdenes: subIntTemp,
            idEstatus: {},
            idClusters: {},
            fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOtO').value),
            fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOtO').value),
            elementosPorPagina: 10
        }
    
        consultaService.consultarReporteInspector(params).then(function success(response){
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		    swal.showLoading();
            if (response.data.respuesta){
                console.log("Entra a busqueda", response);
                var resultDiario=resultOTDiarioData;
                
                angular.forEach(resultDiario,function(res,index){
                    tbodyDiario+=''
                    +'<tr>'
                    + '<td style="white-space:nowrap;">'+ (res.id_ot ? res.id_ot:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.nombre ? res.nombre:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.intervencion ? res.intervencion:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.subintervencion ? res.subintervencion:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.status ? res.status:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.estado ? res.estado:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.motivo ? res.motivo:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.fecha_agenda ? res.fecha_agenda:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.fecha_inicio ? res.fecha_inicio:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.fecha_fin ? res.fecha_fin:"-")+'</td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table"><span class="tooltiptext-text-table">Consulta historico</span><i class="cursorEfect fa fa-header abrir-historico" style="color: #0275d8 !important;" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table"><span class="tooltiptext-text-table">Consulta imagenes</span><i class="cursorEfect fa fa-photo" style="color: #f79050;" onclick="consultaImagenesOperaDiarias("80780","80780")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 80%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta conceptos</span><i class="cursorEfect fa fa-list-ul" style="color: #21bae7 !important;" onclick="consultaConceptosOPeracDiarias("80780")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta materiales</span><i class="cursorEfect fa fa-wrench abrir_materiales" style="color: #66ca8e !important;" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta evidencia fallas</span><i class="cursorEfect fa fa-times" style="color: #E8488E !important;" onclick="consultaEvidenciaFallasOperaDiarias("80780","TECNICO PE APP")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta comentarios</span><i class="cursorEfect fa fa-commenting" style="color: #a616e0 !important;" onclick="consultaComentariosDetalleDiario("80780","TECNICO PE APP")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta información OT</span><i class="cursorEfect fa fa-bars" style="color: #ff1f33 !important;" onclick="consultaDetalleDetencion("80780","TECNICO PE APP")" aria-hidden="true"></i></div></td>'
                   +'</tr>';
                });
                if (tablaDiario) {
                    tablaDiario.destroy();
                }
                $("#reporteDiarioTable tbody").empty()
                $("#tbody_reporteDiario").append(tbodyDiario);
                $scope.iniciarTablaDiario();
                swal.close();
            }
            
        });
    }
    $scope.consultarReporteMasivo=function(){
        var tbodyMas='';
        let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})

        let params = {
            idOrden: $.trim(document.getElementById('idotO').value),
            folioSistema: '',
            claveCliente: '',
            idSubTipoOrdenes: subIntTemp,
            idEstatus: {},
            idClusters: {},
            fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOtO').value),
            fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOtO').value),
            elementosPorPagina: 10
        }
    
        consultaService.consultarReporteMasivo(params).then(function success(response){
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		    swal.showLoading();
            if (response.data.respuesta){
                console.log("Entra a busqueda", response);
                var resultMasivo=resultOtMasivoData;
                
                angular.forEach(resultMasivo,function(res,index){
                    tbodyMas+=''
                    +'<tr>'
                    + '<td style="white-space:nowrap;">'+ (res.id_ot ? res.id_ot:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.ticket_sf ? res.ticket_sf:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.ticket_sd ? res.ticket_sd:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.tecnico ? res.tecnico:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.status ? res.status:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.estado ? res.estado:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.motivo ? res.motivo:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.fecha_asignacion ? res.fecha_asignacion:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.fecha_termino ? res.fecha_termino:"-")+'</td>'

                    + '<td style="white-space:nowrap;"><div class="tooltip-table"><span class="tooltiptext-text-table">Consulta historico</span><i class="cursorEfect fa fa-header abrir-historico" style="color: #0275d8 !important;" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table"><span class="tooltiptext-text-table">Consulta imagenes</span><i class="cursorEfect fa fa-photo" style="color: #f79050;" onclick="consultaImagenesOTCorteMasivo("80266")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 80%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta conceptos</span><i class="cursorEfect fa fa-list-ul" style="color: #21bae7 !important;" onclick="consultaConceptosCorteMasivo("80266","PENDIENTE ASIGNAR OPERADOR")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 84%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta materiales</span><i class="cursorEfect fa fa-wrench abrir_materiales" style="color: #66ca8e !important;" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta fallas</span><i class="cursorEfect fa fa-times" style="color: #E8488E !important;" onclick="consultarFallasCorte("80266")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta comentarios</span><i class="cursorEfect fa fa-commenting" style="color: #a616e0 !important;" onclick="consultaComentariosCorteMasivo("80266","null")" aria-hidden="true"></i></div></td>'
                    +'</tr>';
                });
                if (tablaMasivo) {
                    tablaMasivo.destroy();
                }
                $("#reporteMasivoTable tbody").empty()
                $("#tbody_reporteMasivo").append(tbodyMas);
                $scope.iniciarTablaMasivo();
                swal.close();
            }
            
        });
    }

    $scope.consultarReporteInspector=function(){
        var tbodyIns='';
        let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})

        let params = {
            idOrden: $.trim(document.getElementById('idotO').value),
            folioSistema: '',
            claveCliente: '',
            idSubTipoOrdenes: subIntTemp,
            idEstatus: {},
            idClusters: {},
            fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOtO').value),
            fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOtO').value),
            elementosPorPagina: 10
        }
    
        consultaService.consultarReporteDiario(params).then(function success(response){
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		    swal.showLoading();
            if (response.data.respuesta){
                console.log("Entra a busqueda", response);
                var resultInspector=resultInspectorData;
                
                angular.forEach(resultInspector,function(res,index){
                    tbodyIns+=''
                    +'<tr>'
                    + '<td style="white-space:nowrap;">'+ (res.idot ? res.idot:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.OtPadre ? res.OtPadre:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.nombre ? res.nombre:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.intervencion ? res.intervencion:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.subintervencion ? res.subintervencion:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.status ? res.status:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.estado ? res.estado:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.motivo ? res.motivo:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.fechaasignacion ? res.fechaasignacion:"-")+'</td>'
                    + '<td style="white-space:nowrap;">'+ (res.fechafin ? res.fechafin:"-")+'</td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table"><span class="tooltiptext-text-table">Consulta historico</span><i class="cursorEfect fa fa-header abrir-historico" style="color: #0275d8 !important;" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table"><span class="tooltiptext-text-table">Consulta imagenes</span><i class="cursorEfect fa fa-photo" style="color: #f79050;" onclick="consultaImagenesOT("80963")" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta falla</span><i class="cursorEfect fa fa-paste abrir_fallas" style="color: #ab66de !important;" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 84%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta materiales</span><i class="cursorEfect fa fa-wrench abrir_materiales" style="color: #66ca8e !important;" aria-hidden="true"></i></div></td>'
                    + '<td style="white-space:nowrap;"><div class="tooltip-table-accion"><span style="left: 89%; margin-top: 1em;" class="tooltiptext-text-table-accion">Consulta comentarios</span><i class="cursorEfect fa fa-commenting" style="color: #a616e0 !important;" onclick="consultaComentariosOTInspector("80963","ANDRES ALMONAZI RUIZ")" aria-hidden="true"></i></div></td>'
                    +'</tr>';
                });
                if (tablaInspector) {
                    tablaInspector.destroy();
                }
                $("#reporteInspectorTable tbody").empty()
                $("#tbody_inspector").append(tbodyIns);
                $scope.iniciarTablaIns();
                swal.close();
            }
            
        });

    }
    $(document.body).on('click','.abrir-historico',function(e){
        let params={

        }
        consultaService.consultarHistorico(params).then(function success(response){
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		    swal.showLoading();
            console.log("Ingresa a consulta");
            $scope.inicializarHistorico();
            $("#modalHistorico").modal('show');
            swal.close();
        })
        
    });
    $(document.body).on('click','.abrir_materiales', function(e){
        let params={

        }
        consultaService.consultarMateriales(params).then(function success(response){
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		    swal.showLoading();
            console.log("Entra a herramientas");
            $scope.inicializarMateriales();
            $("#modalHerramientas").modal('show');
            swal.close();
        })
        

    });
    $(document.body).on('click','.abrir_fallas',function(e){
        let params={}
        var headerTab='';
        var bodyTab='';
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
        consultaService.consultarFallas(params).then(function success(response){
            if(response.success){
                
                var resultFallas=consultaFalla.result;
                angular.forEach(resultFallas,function(res,index){
                   // headerTab=''+
                   // headerTab=''
                });
                
                $("#modalConsultaFallas").modal('show');
                swal.close();
            }
            
        })
        
    })
    $scope.inicializarHistorico=function(){
        $scope.historico=historicoData.result;
        console.log("Historico:",$scope.historico);
    }
    $scope.inicializarMateriales=function(){
        $scope.materiales=materialesData.result;
        $scope.general=generalesData;
        console.log("Materiales", $scope.materiales);
    }
   
   // $scope.iniciarTablaDiario();
  //  $scope.iniciarTablaIns();
  //  $scope.iniciarTablaMasivo();
    $scope.inicializarHistorico();
    $scope.initComponents();

}]);