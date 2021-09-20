var app = angular.module('despachoCentralApp', []);

let jsonListaStatus = [{"id":"1", "nombre":"ASIGNADAS"}, {"id":"2", "nombre":"TERMINADA"}, {"id":"3", "nombre":"CANCELADA"}, {"id":"4", "nombre":"PENDIENTE"}];
let jsonListaEstados = [{"id":"1", "nombre":"EN PAUSA"}, {"id":"2", "nombre":"EN ESPERA"}, {"id":"3", "nombre":"EN SITIO"}, {"id":"4", "nombre":"EN TRABAJO"}, {"id":"5", "nombre":"EN TRÁNSITO"}, {"id":"6", "nombre":"PROGRAMADA PERO NO INICIADA"}, {"id":"7", "nombre":"BÚSQUEDA DE FALLA"}, {"id":"8", "nombre":"FALLA LOCALIZADA"}, {"id":"9", "nombre":"EN REPARACIÓN"}];
let jsonListaGeografias = [{id: 5, nombre: "BAJIO", nivel: 1, padre: null},{id: 1, nombre: "CENTRO", nivel: 1, padre: null},{id: 8, nombre: "COLOMBIA", nivel: 1, padre: null},{id: 4, nombre: "NORESTE", nivel: 1, padre: null},{id: 3, nombre: "NORTE", nivel: 1, padre: null},{id: 6, nombre: "OCCIDENTE", nivel: 1, padre: null},{id: 2, nombre: "ORIENTE", nivel: 1, padre: null},{id: 134, nombre: "AGUASCALIENTES", nivel: 2, padre: "6"},{id: 137, nombre: "BOGOTA C", nivel: 2, padre: "8"},{id: 109, nombre: "CANCUN", nivel: 2, padre: "2"},{id: 129, nombre: "CELAYA", nivel: 2, padre: "5"},{id: 118, nombre: "CHIHUAHUA", nivel: 2, padre: "3"},{id: 100, nombre: "CIUDAD DE MEXICO-CENTRO", nivel: 2, padre: "1"},{id: 103, nombre: "CIUDAD DE MEXICO-NORTE", nivel: 2, padre: "1"},{id: 102, nombre: "CIUDAD DE MEXICO-ORIENTE", nivel: 2, padre: "1"},{id: 119, nombre: "CIUDAD JUAREZ", nivel: 2, padre: "3"},{id: 113, nombre: "COATZA / MINA", nivel: 2, padre: "2"},{id: 112, nombre: "CORDOBA / ORIZABA", nivel: 2, padre: "2"},{id: 105, nombre: "CUERNAVACA", nivel: 2, padre: "2"},{id: 121, nombre: "CULIACAN", nivel: 2, padre: "3"},{id: 135, nombre: "GUADALAJARA C", nivel: 2, padre: "6"},{id: 122, nombre: "HERMOSILLO", nivel: 2, padre: "3"},{id: 133, nombre: "IRAPUATO", nivel: 2, padre: "5"},{id: 128, nombre: "LA LAGUNA", nivel: 2, padre: "4"},{id: 130, nombre: "LEON", nivel: 2, padre: "5"},{id: 123, nombre: "MAZATLAN", nivel: 2, padre: "3"},{id: 110, nombre: "MERIDA", nivel: 2, padre: "2"},{id: 120, nombre: "MEXICALI", nivel: 2, padre: "3"},{id: 125, nombre: "MONTERREY", nivel: 2, padre: "4"},{id: 132, nombre: "MORELIA", nivel: 2, padre: "5"},{id: 111, nombre: "PACHUCA", nivel: 2, padre: "2"},{id: 116, nombre: "POZA RICA", nivel: 2, padre: "2"},{id: 106, nombre: "PUEBLA", nivel: 2, padre: "2"},{id: 136, nombre: "PUERTO VALLARTA", nivel: 2, padre: "6"},{id: 131, nombre: "QUERETARO", nivel: 2, padre: "5"},{id: 127, nombre: "SALTILLO", nivel: 2, padre: "4"},{id: 126, nombre: "SAN LUIS POTOSI", nivel: 2, padre: "4"},{id: 117, nombre: "TIJUANA", nivel: 2, padre: "3"},{id: 101, nombre: "TOLUCA", nivel: 2, padre: "1"},{id: 114, nombre: "TUXTLA", nivel: 2, padre: "2"},{id: 107, nombre: "VERACRUZ", nivel: 2, padre: "2"},{id: 115, nombre: "VILLAHERMOSA", nivel: 2, padre: "2"},{id: 108, nombre: "XALAPA", nivel: 2, padre: "2"},{id: 1000, nombre: "AEROPUERTO D", nivel: 3, padre: "102"},{id: 1001, nombre: "AGUASCALIENTES D", nivel: 3, padre: "134"},{id: 1002, nombre: "ARAGON D", nivel: 3, padre: "102"},{id: 1003, nombre: "AZCAPOTZALCO D", nivel: 3, padre: "100"},{id: 1004, nombre: "BOGOTA D", nivel: 3, padre: "137"},{id: 1005, nombre: "CANCUN D", nivel: 3, padre: "109"},{id: 1006, nombre: "CELAYA D", nivel: 3, padre: "129"},{id: 1007, nombre: "CHIHUAHUA D", nivel: 3, padre: "118"},{id: 1008, nombre: "COACALCO D", nivel: 3, padre: "103"},{id: 1009, nombre: "COATZA / MINA D", nivel: 3, padre: "113"},{id: 1010, nombre: "CONDESA D", nivel: 3, padre: "100"},{id: 1011, nombre: "CONSTITUCION D", nivel: 3, padre: "102"},{id: 1012, nombre: "CORDOBA / ORIZABA D", nivel: 3, padre: "112"},{id: 1013, nombre: "CUERNAVACA D", nivel: 3, padre: "105"},{id: 1014, nombre: "CULIACAN D", nivel: 3, padre: "121"},{id: 1015, nombre: "DELICIAS D", nivel: 3, padre: "118"},{id: 1017, nombre: "ECATEPEC D", nivel: 3, padre: "102"},{id: 1018, nombre: "GDL BARRANCA", nivel: 3, padre: "135"},{id: 1019, nombre: "GDL CHAPULTEPEC", nivel: 3, padre: "135"},{id: 1020, nombre: "GDL COLOMOS", nivel: 3, padre: "135"},{id: 1021, nombre: "GDL ESTADIO", nivel: 3, padre: "135"},{id: 1022, nombre: "GDL LA PRIMAVERA", nivel: 3, padre: "135"},{id: 1023, nombre: "GDL LAZARO CARDENAS", nivel: 3, padre: "135"},{id: 1024, nombre: "GDL LOPEZ MATEOS", nivel: 3, padre: "135"},{id: 1025, nombre: "GUADALUPE TEPEYAC D", nivel: 3, padre: "100"},{id: 1026, nombre: "HERMOSILLO D", nivel: 3, padre: "122"},{id: 1027, nombre: "HUEHUETOCA D", nivel: 3, padre: "103"},{id: 1028, nombre: "IRAPUATO D", nivel: 3, padre: "133"},{id: 1029, nombre: "IZTAPALAPA D", nivel: 3, padre: "102"},{id: 1030, nombre: "JUAREZ NORTE", nivel: 3, padre: "119"},{id: 1031, nombre: "JUAREZ SUR", nivel: 3, padre: "119"},{id: 1032, nombre: "LA LAGUNA D", nivel: 3, padre: "128"},{id: 1033, nombre: "LAS AGUILAS D", nivel: 3, padre: "100"},{id: 1034, nombre: "LEON D1 CERRO GORDO", nivel: 3, padre: "130"},{id: 1035, nombre: "LEON D2 DELTA", nivel: 3, padre: "130"},{id: 1036, nombre: "LOS MOCHIS D", nivel: 3, padre: "121"},{id: 1037, nombre: "LOS REYES D", nivel: 3, padre: "102"},{id: 1038, nombre: "MANIZALES D", nivel: 3, padre: "137"},{id: 1039, nombre: "MAZATLAN D", nivel: 3, padre: "123"},{id: 1040, nombre: "MERIDA I", nivel: 3, padre: "110"},{id: 1041, nombre: "MERIDA II", nivel: 3, padre: "110"},{id: 1042, nombre: "MEXICALI D", nivel: 3, padre: "120"},{id: 1043, nombre: "MORELIA D", nivel: 3, padre: "132"},{id: 1044, nombre: "MTY CERRO DE LA SILLA", nivel: 3, padre: "125"},{id: 1045, nombre: "MTY GARCIA", nivel: 3, padre: "125"},{id: 1046, nombre: "MTY MITRAS", nivel: 3, padre: "125"},{id: 1047, nombre: "MTY SANTA LUCIA", nivel: 3, padre: "125"},{id: 1048, nombre: "MTY SENDERO DIVISORIO", nivel: 3, padre: "125"},{id: 1049, nombre: "MTY SIERRA MADRE", nivel: 3, padre: "125"},{id: 1050, nombre: "NAUCALPAN D", nivel: 3, padre: "100"},{id: 1051, nombre: "NEZA 2 D", nivel: 3, padre: "102"},{id: 1052, nombre: "NEZA D", nivel: 3, padre: "102"},{id: 1053, nombre: "NICOLAS ROMERO D", nivel: 3, padre: "103"},{id: 1054, nombre: "PACHUCA D", nivel: 3, padre: "111"},{id: 1055, nombre: "PEDREGAL D", nivel: 3, padre: "100"},{id: 1056, nombre: "POLANCO D", nivel: 3, padre: "100"},{id: 1057, nombre: "PORTALES D", nivel: 3, padre: "100"},{id: 1058, nombre: "POZA RICA D", nivel: 3, padre: "116"},{id: 1059, nombre: "PROYECTO CIUDAD DIGITAL", nivel: 3, padre: "100"},{id: 1060, nombre: "PUEBLA I D", nivel: 3, padre: "106"},{id: 1061, nombre: "PUEBLA II D", nivel: 3, padre: "106"},{id: 1062, nombre: "PUEBLA III D", nivel: 3, padre: "106"},{id: 1063, nombre: "PUERTO VALLARTA D", nivel: 3, padre: "136"},{id: 1064, nombre: "QUERETARO D", nivel: 3, padre: "131"},{id: 1065, nombre: "SALAMANCA D", nivel: 3, padre: "133"},{id: 1066, nombre: "SALTILLO D", nivel: 3, padre: "127"},{id: 1067, nombre: "SAN LUIS POTOSI D", nivel: 3, padre: "126"},{id: 1068, nombre: "SANTA FE D", nivel: 3, padre: "100"},{id: 1069, nombre: "TECAMAC D", nivel: 3, padre: "102"},{id: 1070, nombre: "TEXCOCO D", nivel: 3, padre: "102"},{id: 1071, nombre: "TIJUANA D CERRO COLORADO", nivel: 3, padre: "117"},{id: 1072, nombre: "TIJUANA D FRONTERA", nivel: 3, padre: "117"},{id: 1073, nombre: "TIJUANA D PLAYA", nivel: 3, padre: "117"},{id: 1074, nombre: "TIJUANA D TECATE", nivel: 3, padre: "117"},{id: 1075, nombre: "TLALNEPANTLA D", nivel: 3, padre: "100"},{id: 1076, nombre: "TLALPAN D", nivel: 3, padre: "100"},{id: 1077, nombre: "TOLUCA 1", nivel: 3, padre: "101"},{id: 1078, nombre: "TOLUCA 2", nivel: 3, padre: "101"},{id: 1079, nombre: "TULTEPEC D", nivel: 3, padre: "103"},{id: 1080, nombre: "TULTITLAN D", nivel: 3, padre: "103"},{id: 1081, nombre: "TUXTLA D", nivel: 3, padre: "114"},{id: 1082, nombre: "VERACRUZ D", nivel: 3, padre: "107"},{id: 1083, nombre: "VILLAHERMOSA D", nivel: 3, padre: "115"},{id: 1084, nombre: "VILLAVICENCIO D", nivel: 3, padre: "137"},{id: 1085, nombre: "XALAPA D", nivel: 3, padre: "108"},{id: 1086, nombre: "XOCHIMILCO D", nivel: 3, padre: "100"},{id: 2141, nombre: "ACAPULCO G", nivel: 4, padre: "1013"},{id: 2105, nombre: "AGUASCALIENTES 1 G", nivel: 4, padre: "1001"},{id: 2104, nombre: "AGUASCALIENTES 2 G", nivel: 4, padre: "1001"},{id: 2198, nombre: "AMPL HUEHUETOCA G", nivel: 4, padre: "1027"},{id: 2148, nombre: "ATIZAPAN G", nivel: 4, padre: "1050"},{id: 2174, nombre: "BOGOTA G", nivel: 4, padre: "1004"},{id: 2001, nombre: "CANCUN 2G", nivel: 4, padre: "1005"},{id: 2002, nombre: "CANCUN G", nivel: 4, padre: "1005"},{id: 2106, nombre: "CELAYA G", nivel: 4, padre: "1006"},{id: 2142, nombre: "CENTRO 2 D", nivel: 4, padre: "1057"},{id: 2143, nombre: "CENTRO 2_A", nivel: 4, padre: "1057"},{id: 2144, nombre: "CENTRO 2_B", nivel: 4, padre: "1057"},{id: 2145, nombre: "CENTRO 2_C", nivel: 4, padre: "1057"},{id: 2086, nombre: "CENTRO D12", nivel: 4, padre: "1033"},{id: 2012, nombre: "CENTRO D14", nivel: 4, padre: "1076"},{id: 2013, nombre: "CENTRO D14_B", nivel: 4, padre: "1076"},{id: 2011, nombre: "CENTRO D14_C", nivel: 4, padre: "1076"},{id: 2015, nombre: "CENTRO D15 A G", nivel: 4, padre: "1086"},{id: 2016, nombre: "CENTRO D15 B G", nivel: 4, padre: "1086"},{id: 2014, nombre: "CENTRO D15 C G", nivel: 4, padre: "1086"},{id: 2164, nombre: "CENTRO D8_A", nivel: 4, padre: "1068"},{id: 2165, nombre: "CENTRO D8_B", nivel: 4, padre: "1068"},{id: 2167, nombre: "CENTRO D8_C", nivel: 4, padre: "1068"},{id: 2166, nombre: "CENTRO D8_D", nivel: 4, padre: "1068"},{id: 2096, nombre: "CHICHUAHUA G PROV", nivel: 4, padre: "1007"},{id: 2097, nombre: "CHIHUAHUA G", nivel: 4, padre: "1007"},{id: 2195, nombre: "CIUDAD DIGITAL", nivel: 4, padre: "1059"},{id: 2088, nombre: "COATZACOALCOS G", nivel: 4, padre: "1009"},{id: 2171, nombre: "CORDOBA G", nivel: 4, padre: "1012"},{id: 2007, nombre: "COYOACAN G", nivel: 4, padre: "1010"},{id: 2140, nombre: "CUERNAVACA 1 G", nivel: 4, padre: "1013"},{id: 2139, nombre: "CUERNAVACA 2 G", nivel: 4, padre: "1013"},{id: 2138, nombre: "CUERNAVACA PROV", nivel: 4, padre: "1013"},{id: 2056, nombre: "CULIACAN G", nivel: 4, padre: "1014"},{id: 2194, nombre: "DELICIAS G", nivel: 4, padre: "1015"},{id: 2079, nombre: "DISTRITO 2", nivel: 4, padre: "1069"},{id: 2072, nombre: "DISTRITO 24", nivel: 4, padre: "1037"},{id: 2071, nombre: "DISTRITO 3", nivel: 4, padre: "1017"},{id: 2053, nombre: "DISTRITO 4", nivel: 4, padre: "1002"},{id: 2054, nombre: "DISTRITO 4_B", nivel: 4, padre: "1002"},{id: 2187, nombre: "DISTRITO 5 A", nivel: 4, padre: "1000"},{id: 2058, nombre: "DISTRITO 6_A", nivel: 4, padre: "1029"},{id: 2059, nombre: "DISTRITO 6_B", nivel: 4, padre: "1029"},{id: 2083, nombre: "ENSENADA G", nivel: 4, padre: "1073"},{id: 2185, nombre: "G TOLUCA 1 A", nivel: 4, padre: "1077"},{id: 2182, nombre: "G TOLUCA 1 B", nivel: 4, padre: "1077"},{id: 2183, nombre: "G TOLUCA 1 C", nivel: 4, padre: "1077"},{id: 2184, nombre: "G TOLUCA 1 D", nivel: 4, padre: "1077"},{id: 2051, nombre: "G TOLUCA 2 A", nivel: 4, padre: "1078"},{id: 2052, nombre: "G TOLUCA 2 B", nivel: 4, padre: "1078"},{id: 2036, nombre: "GDL BARRANCA G", nivel: 4, padre: "1018"},{id: 2062, nombre: "GDL CHAPULTEPEC G NORTE", nivel: 4, padre: "1019"},{id: 2061, nombre: "GDL CHAPULTEPEC G SUR", nivel: 4, padre: "1019"},{id: 2026, nombre: "GDL COLOMOS G A", nivel: 4, padre: "1020"},{id: 2024, nombre: "GDL COLOMOS G B", nivel: 4, padre: "1020"},{id: 2025, nombre: "GDL COLOMOS G C", nivel: 4, padre: "1020"},{id: 2027, nombre: "GDL COLOMOS G PROV CON AA", nivel: 4, padre: "1020"},{id: 2082, nombre: "GDL ESTADIO G", nivel: 4, padre: "1021"},{id: 2150, nombre: "GDL LA PRIMAVERA G A", nivel: 4, padre: "1022"},{id: 2153, nombre: "GDL LA PRIMAVERA G B", nivel: 4, padre: "1022"},{id: 2152, nombre: "GDL LA PRIMAVERA G C", nivel: 4, padre: "1022"},{id: 2151, nombre: "GDL LA PRIMAVERA G D", nivel: 4, padre: "1022"},{id: 2136, nombre: "GDL LAZARO CARDENAS G A", nivel: 4, padre: "1023"},{id: 2137, nombre: "GDL LAZARO CARDENAS G B", nivel: 4, padre: "1023"},{id: 2135, nombre: "GDL LAZARO CARDENAS TEPATITLAN", nivel: 4, padre: "1023"},{id: 2029, nombre: "GDL LOPEZ MATEOS G", nivel: 4, padre: "1024"},{id: 2030, nombre: "GDL LOPEZ MATEOS G CHAPALA", nivel: 4, padre: "1024"},{id: 2028, nombre: "GDL LOPEZ MATEOS G PROV CON AA", nivel: 4, padre: "1024"},{id: 2009, nombre: "HERMOSILLO A G", nivel: 4, padre: "1026"},{id: 2010, nombre: "HERMOSILLO B G", nivel: 4, padre: "1026"},{id: 2199, nombre: "HUEHUETOCA G", nivel: 4, padre: "1027"}];
let jsonListaOTs = [
	{"id":"1","ot":"OT1","ts":"TS","tsd":"TSD","nc":"N.C.","distrito":"DISTRITO","tiempoActiva":"00:10:00","estado":"ESTADO","fechaCorte":"20-09-2021","detalle":"DETALLE","accion":"ACCIÓN"},
	{"id":"2","ot":"OT2","ts":"TS","tsd":"TSD","nc":"N.C.","distrito":"DISTRITO","tiempoActiva":"00:10:00","estado":"ESTADO","fechaCorte":"20-09-2021","detalle":"DETALLE","accion":"ACCIÓN"}
	];

app.controller('despachoCentralController', ['$scope', '$q', '$filter', function ($scope, $q, $filter) {
	$("#moduloDespachoCentral").addClass('active');
	let tablaOTs;
	$scope.listaStatus = jsonListaStatus;
	$scope.listaEstados = jsonListaEstados;
	$scope.listaGeografias = jsonListaGeografias;
	$scope.listaOTs = [];
	
	$scope.cargarInformacion = function() {
		//SELECT STATUS
		$("#status_select_consulta").empty();
        angular.forEach($scope.listaStatus,(element,index) => {
            $("#status_select_consulta").append("<option value='"+element.id+"'>"+element.nombre+"</option>");
        });
        $('#status_select_consulta').selectpicker("refresh");
        
      //SELECT ESTADO
		$("#estado_select_consulta").empty();
        angular.forEach($scope.listaEstados,(element,index) => {
            $("#estado_select_consulta").append("<option value='"+element.id+"'>"+element.nombre+"</option>");
        });
        $('#estado_select_consulta').selectpicker("refresh");
	}
	$scope.cargarInformacion();
	
	$scope.abrirModalArbolGeografiaConsulta = function() {
		
		let geografias = $scope.listaGeografias;
		geografias.map((e)=>{
            //e.parent = e.padre == undefined ? "#" : e.padre;
            e.parent = e.padre == null ? "#" : e.padre;
            e.text= e.nombre;
            e.icon= "fa fa-globe";
            return e
        })       
        $('#arbolGeografiaConsulta').bind('loaded.jstree', function(e, data) {
			$(this).jstree("open_all");
        }).jstree({
        	'plugins': ['search', 'checkbox'],
			'core': {
				'data': geografias,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons":false        
                }
            }
		});
		$('#arbolGeografiaConsulta').jstree(true).get_selected();
		$("#modalArbolGeografiaConsulta").modal('show');
	}
	
	$scope.consultarOTs = function() {
		$scope.listaOTs = jsonListaOTs;
		
		tablaOTs = $("#table_corte_masivo").DataTable({
			"processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": true,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"data": jsonListaOTs,
			"columns": [
	        	{ data: "ot" },
	        	{ data: "ts" },
	        	{ data: "tsd" },
	        	{ data: "nc" },
	        	{ data: "distrito" },
	        	{ data: "tiempoActiva" },
	        	{ data: "estado" },
	        	{ data: "fechaCorte" },
	        	{ data: "detalle" },
	        	{ data: "accion" }
	        ],
			"language": idioma_espanol_not_font
		});
	}
	
}]);