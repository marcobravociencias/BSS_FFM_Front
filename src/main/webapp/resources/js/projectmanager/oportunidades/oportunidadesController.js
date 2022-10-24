var app = angular.module('oportunidadApp', []);

app.controller('oportunidadController', ['$scope', '$q', 'oportunidadesService', 'genericService', 'busquedaSalesforceService', 'agendamientoService','evidenciaService','consultaOTService', function ($scope, $q, oportunidadesService, genericService, busquedaSalesforceService, agendamientoService, evidenciaService,consultaOTService) {
	app.evidenciaController($scope, evidenciaService)
	
	app.busquedaSalesforce($scope, busquedaSalesforceService)
    app.agendamientoController($scope, agendamientoService, $q)
    $("#idBody").removeAttr("style");
    $scope.showTable = true;
	$scope.initOportunidades = true;

    var tableSolicitud;
    var tableOportunidad;
    var tableDetalleOportunidad;

	var tableimplementacion;

	let is_consulta_comentarios = false;
	let is_consulta_historico = false;
	let isConsultaMateriales = false;

    $scope.listaOportunidades = [];
    
    $scope.contadorGeneral = {};
    $scope.camposFiltro = {};



	$scope.geografia = [{
		"id": 5.0,
		"nombre": "BAJIOS",
		"nivel": 1.0,
		"padre": null
	}, {
		"id": 1.0,
		"nombre": "CENTRO",
		"nivel": 1.0,
		"padre": null
	}, {
		"id": 4.0,
		"nombre": "NORESTE",
		"nivel": 1.0,
		"padre": null
	}, {
		"id": 3.0,
		"nombre": "NORTE",
		"nivel": 1.0,
		"padre": null
	}, {
		"id": 6.0,
		"nombre": "OCCIDENTE",
		"nivel": 1.0,
		"padre": null
	}, {
		"id": 2.0,
		"nombre": "ORIENTE",
		"nivel": 1.0,
		"padre": null
	}, {
		"id": 134.0,
		"nombre": "AGUASCALIENTES",
		"nivel": 2.0,
		"padre": "6"
	}, {
		"id": 109.0,
		"nombre": "CANCUN",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 129.0,
		"nombre": "CELAYA",
		"nivel": 2.0,
		"padre": "5"
	}, {
		"id": 118.0,
		"nombre": "CHIHUAHUA",
		"nivel": 2.0,
		"padre": "3"
	}, {
		"id": 100.0,
		"nombre": "CIUDAD DE MEXICO-CENTRO",
		"nivel": 2.0,
		"padre": "1"
	}, {
		"id": 103.0,
		"nombre": "CIUDAD DE MEXICO-NORTE",
		"nivel": 2.0,
		"padre": "1"
	}, {
		"id": 102.0,
		"nombre": "CIUDAD DE MEXICO-ORIENTE",
		"nivel": 2.0,
		"padre": "1"
	}, {
		"id": 119.0,
		"nombre": "CIUDAD JUAREZ",
		"nivel": 2.0,
		"padre": "3"
	}, {
		"id": 113.0,
		"nombre": "COATZA / MINA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 112.0,
		"nombre": "CORDOBA / ORIZABA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 105.0,
		"nombre": "CUERNAVACA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 121.0,
		"nombre": "CULIACAN",
		"nivel": 2.0,
		"padre": "3"
	}, {
		"id": 135.0,
		"nombre": "GUADALAJARA C",
		"nivel": 2.0,
		"padre": "6"
	}, {
		"id": 122.0,
		"nombre": "HERMOSILLO",
		"nivel": 2.0,
		"padre": "3"
	}, {
		"id": 133.0,
		"nombre": "IRAPUATO",
		"nivel": 2.0,
		"padre": "5"
	}, {
		"id": 128.0,
		"nombre": "LA LAGUNA",
		"nivel": 2.0,
		"padre": "4"
	}, {
		"id": 130.0,
		"nombre": "LEON",
		"nivel": 2.0,
		"padre": "5"
	}, {
		"id": 123.0,
		"nombre": "MAZATLAN",
		"nivel": 2.0,
		"padre": "3"
	}, {
		"id": 110.0,
		"nombre": "MERIDA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 120.0,
		"nombre": "MEXICALI",
		"nivel": 2.0,
		"padre": "3"
	}, {
		"id": 125.0,
		"nombre": "MONTERREY",
		"nivel": 2.0,
		"padre": "4"
	}, {
		"id": 132.0,
		"nombre": "MORELIA",
		"nivel": 2.0,
		"padre": "5"
	}, {
		"id": 111.0,
		"nombre": "PACHUCA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 116.0,
		"nombre": "POZA RICA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 106.0,
		"nombre": "PUEBLA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 136.0,
		"nombre": "PUERTO VALLARTA",
		"nivel": 2.0,
		"padre": "6"
	}, {
		"id": 131.0,
		"nombre": "QUERETARO",
		"nivel": 2.0,
		"padre": "5"
	}, {
		"id": 127.0,
		"nombre": "SALTILLO",
		"nivel": 2.0,
		"padre": "4"
	}, {
		"id": 126.0,
		"nombre": "SAN LUIS POTOSI",
		"nivel": 2.0,
		"padre": "4"
	}, {
		"id": 117.0,
		"nombre": "TIJUANA",
		"nivel": 2.0,
		"padre": "3"
	}, {
		"id": 101.0,
		"nombre": "TOLUCA",
		"nivel": 2.0,
		"padre": "1"
	}, {
		"id": 114.0,
		"nombre": "TUXTLA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 107.0,
		"nombre": "VERACRUZ",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 115.0,
		"nombre": "VILLAHERMOSA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 108.0,
		"nombre": "XALAPA",
		"nivel": 2.0,
		"padre": "2"
	}, {
		"id": 1000.0,
		"nombre": "AEROPUERTO D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1001.0,
		"nombre": "AGUASCALIENTES D",
		"nivel": 3.0,
		"padre": "134"
	}, {
		"id": 1002.0,
		"nombre": "ARAGON D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1003.0,
		"nombre": "AZCAPOTZALCO D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1005.0,
		"nombre": "CANCUN D",
		"nivel": 3.0,
		"padre": "109"
	}, {
		"id": 1006.0,
		"nombre": "CELAYA D",
		"nivel": 3.0,
		"padre": "129"
	}, {
		"id": 1007.0,
		"nombre": "CHIHUAHUA D",
		"nivel": 3.0,
		"padre": "118"
	}, {
		"id": 1008.0,
		"nombre": "COACALCO D",
		"nivel": 3.0,
		"padre": "103"
	}, {
		"id": 1009.0,
		"nombre": "COATZA / MINA D",
		"nivel": 3.0,
		"padre": "113"
	}, {
		"id": 1010.0,
		"nombre": "CONDESA D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1011.0,
		"nombre": "CONSTITUCION D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1012.0,
		"nombre": "CORDOBA / ORIZABA D",
		"nivel": 3.0,
		"padre": "112"
	}, {
		"id": 1013.0,
		"nombre": "CUERNAVACA D",
		"nivel": 3.0,
		"padre": "105"
	}, {
		"id": 1014.0,
		"nombre": "CULIACAN D",
		"nivel": 3.0,
		"padre": "121"
	}, {
		"id": 1015.0,
		"nombre": "DELICIAS D",
		"nivel": 3.0,
		"padre": "118"
	}, {
		"id": 1017.0,
		"nombre": "ECATEPEC D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1018.0,
		"nombre": "GDL BARRANCA",
		"nivel": 3.0,
		"padre": "135"
	}, {
		"id": 1019.0,
		"nombre": "GDL CHAPULTEPEC",
		"nivel": 3.0,
		"padre": "135"
	}, {
		"id": 1020.0,
		"nombre": "GDL COLOMOS",
		"nivel": 3.0,
		"padre": "135"
	}, {
		"id": 1021.0,
		"nombre": "GDL ESTADIO",
		"nivel": 3.0,
		"padre": "135"
	}, {
		"id": 1022.0,
		"nombre": "GDL LA PRIMAVERA",
		"nivel": 3.0,
		"padre": "135"
	}, {
		"id": 1023.0,
		"nombre": "GDL LAZARO CARDENAS",
		"nivel": 3.0,
		"padre": "135"
	}, {
		"id": 1024.0,
		"nombre": "GDL LOPEZ MATEOS",
		"nivel": 3.0,
		"padre": "135"
	}, {
		"id": 1025.0,
		"nombre": "GUADALUPE TEPEYAC D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1026.0,
		"nombre": "HERMOSILLO D",
		"nivel": 3.0,
		"padre": "122"
	}, {
		"id": 1027.0,
		"nombre": "HUEHUETOCA D",
		"nivel": 3.0,
		"padre": "103"
	}, {
		"id": 1028.0,
		"nombre": "IRAPUATO D",
		"nivel": 3.0,
		"padre": "133"
	}, {
		"id": 1029.0,
		"nombre": "IZTAPALAPA D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1030.0,
		"nombre": "JUAREZ NORTE",
		"nivel": 3.0,
		"padre": "119"
	}, {
		"id": 1031.0,
		"nombre": "JUAREZ SUR",
		"nivel": 3.0,
		"padre": "119"
	}, {
		"id": 1032.0,
		"nombre": "LA LAGUNA D",
		"nivel": 3.0,
		"padre": "128"
	}, {
		"id": 1033.0,
		"nombre": "LAS AGUILAS D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1034.0,
		"nombre": "LEON D1 CERRO GORDO",
		"nivel": 3.0,
		"padre": "130"
	}, {
		"id": 1035.0,
		"nombre": "LEON D2 DELTA",
		"nivel": 3.0,
		"padre": "130"
	}, {
		"id": 1036.0,
		"nombre": "LOS MOCHIS D",
		"nivel": 3.0,
		"padre": "121"
	}, {
		"id": 1037.0,
		"nombre": "LOS REYES D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1039.0,
		"nombre": "MAZATLAN D",
		"nivel": 3.0,
		"padre": "123"
	}, {
		"id": 1040.0,
		"nombre": "MERIDA I",
		"nivel": 3.0,
		"padre": "110"
	}, {
		"id": 1041.0,
		"nombre": "MERIDA II",
		"nivel": 3.0,
		"padre": "110"
	}, {
		"id": 1042.0,
		"nombre": "MEXICALI D",
		"nivel": 3.0,
		"padre": "120"
	}, {
		"id": 1043.0,
		"nombre": "MORELIA D",
		"nivel": 3.0,
		"padre": "132"
	}, {
		"id": 1044.0,
		"nombre": "MTY CERRO DE LA SILLA",
		"nivel": 3.0,
		"padre": "125"
	}, {
		"id": 1045.0,
		"nombre": "MTY GARCIA",
		"nivel": 3.0,
		"padre": "125"
	}, {
		"id": 1046.0,
		"nombre": "MTY MITRAS",
		"nivel": 3.0,
		"padre": "125"
	}, {
		"id": 1047.0,
		"nombre": "MTY SANTA LUCIA",
		"nivel": 3.0,
		"padre": "125"
	}, {
		"id": 1048.0,
		"nombre": "MTY SENDERO DIVISORIO",
		"nivel": 3.0,
		"padre": "125"
	}, {
		"id": 1049.0,
		"nombre": "MTY SIERRA MADRE",
		"nivel": 3.0,
		"padre": "125"
	}, {
		"id": 1050.0,
		"nombre": "NAUCALPAN D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1051.0,
		"nombre": "NEZA 2 D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1052.0,
		"nombre": "NEZA D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1053.0,
		"nombre": "NICOLAS ROMERO D",
		"nivel": 3.0,
		"padre": "103"
	}, {
		"id": 1054.0,
		"nombre": "PACHUCA D",
		"nivel": 3.0,
		"padre": "111"
	}, {
		"id": 1055.0,
		"nombre": "PEDREGAL D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1056.0,
		"nombre": "POLANCO D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1057.0,
		"nombre": "PORTALES D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1058.0,
		"nombre": "POZA RICA D",
		"nivel": 3.0,
		"padre": "116"
	}, {
		"id": 1059.0,
		"nombre": "PROYECTO CIUDAD DIGITAL",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1060.0,
		"nombre": "PUEBLA I D",
		"nivel": 3.0,
		"padre": "106"
	}, {
		"id": 1061.0,
		"nombre": "PUEBLA II D",
		"nivel": 3.0,
		"padre": "106"
	}, {
		"id": 1062.0,
		"nombre": "PUEBLA III D",
		"nivel": 3.0,
		"padre": "106"
	}, {
		"id": 1063.0,
		"nombre": "PUERTO VALLARTA D",
		"nivel": 3.0,
		"padre": "136"
	}, {
		"id": 1064.0,
		"nombre": "QUERETARO D",
		"nivel": 3.0,
		"padre": "131"
	}, {
		"id": 1065.0,
		"nombre": "SALAMANCA D",
		"nivel": 3.0,
		"padre": "133"
	}, {
		"id": 1066.0,
		"nombre": "SALTILLO D",
		"nivel": 3.0,
		"padre": "127"
	}, {
		"id": 1067.0,
		"nombre": "SAN LUIS POTOSI D",
		"nivel": 3.0,
		"padre": "126"
	}, {
		"id": 1068.0,
		"nombre": "SANTA FE D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1069.0,
		"nombre": "TECAMAC D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1070.0,
		"nombre": "TEXCOCO D",
		"nivel": 3.0,
		"padre": "102"
	}, {
		"id": 1071.0,
		"nombre": "TIJUANA D CERRO COLORADO",
		"nivel": 3.0,
		"padre": "117"
	}, {
		"id": 1072.0,
		"nombre": "TIJUANA D FRONTERA",
		"nivel": 3.0,
		"padre": "117"
	}, {
		"id": 1073.0,
		"nombre": "TIJUANA D PLAYA",
		"nivel": 3.0,
		"padre": "117"
	}, {
		"id": 1074.0,
		"nombre": "TIJUANA D TECATE",
		"nivel": 3.0,
		"padre": "117"
	}, {
		"id": 1075.0,
		"nombre": "TLALNEPANTLA D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1076.0,
		"nombre": "TLALPAN D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 1077.0,
		"nombre": "TOLUCA 1",
		"nivel": 3.0,
		"padre": "101"
	}, {
		"id": 1078.0,
		"nombre": "TOLUCA 2",
		"nivel": 3.0,
		"padre": "101"
	}, {
		"id": 1079.0,
		"nombre": "TULTEPEC D",
		"nivel": 3.0,
		"padre": "103"
	}, {
		"id": 1080.0,
		"nombre": "TULTITLAN D",
		"nivel": 3.0,
		"padre": "103"
	}, {
		"id": 1081.0,
		"nombre": "TUXTLA D",
		"nivel": 3.0,
		"padre": "114"
	}, {
		"id": 1082.0,
		"nombre": "VERACRUZ D",
		"nivel": 3.0,
		"padre": "107"
	}, {
		"id": 1083.0,
		"nombre": "VILLAHERMOSA D",
		"nivel": 3.0,
		"padre": "115"
	}, {
		"id": 1085.0,
		"nombre": "XALAPA D",
		"nivel": 3.0,
		"padre": "108"
	}, {
		"id": 1086.0,
		"nombre": "XOCHIMILCO D",
		"nivel": 3.0,
		"padre": "100"
	}, {
		"id": 2141.0,
		"nombre": "ACAPULCO G",
		"nivel": 4.0,
		"padre": "1013"
	}, {
		"id": 2105.0,
		"nombre": "AGUASCALIENTES 1 G",
		"nivel": 4.0,
		"padre": "1001"
	}, {
		"id": 2104.0,
		"nombre": "AGUASCALIENTES 2 G",
		"nivel": 4.0,
		"padre": "1001"
	}, {
		"id": 2198.0,
		"nombre": "AMPL HUEHUETOCA G",
		"nivel": 4.0,
		"padre": "1027"
	}, {
		"id": 2148.0,
		"nombre": "ATIZAPAN G",
		"nivel": 4.0,
		"padre": "1050"
	}, {
		"id": 2001.0,
		"nombre": "CANCUN 2G",
		"nivel": 4.0,
		"padre": "1005"
	}, {
		"id": 2002.0,
		"nombre": "CANCUN G",
		"nivel": 4.0,
		"padre": "1005"
	}, {
		"id": 2106.0,
		"nombre": "CELAYA G",
		"nivel": 4.0,
		"padre": "1006"
	}, {
		"id": 2142.0,
		"nombre": "CENTRO 2 D",
		"nivel": 4.0,
		"padre": "1057"
	}, {
		"id": 2143.0,
		"nombre": "CENTRO 2_A",
		"nivel": 4.0,
		"padre": "1057"
	}, {
		"id": 2144.0,
		"nombre": "CENTRO 2_B",
		"nivel": 4.0,
		"padre": "1057"
	}, {
		"id": 2145.0,
		"nombre": "CENTRO 2_C",
		"nivel": 4.0,
		"padre": "1057"
	}, {
		"id": 2086.0,
		"nombre": "CENTRO D12",
		"nivel": 4.0,
		"padre": "1033"
	}, {
		"id": 2012.0,
		"nombre": "CENTRO D14",
		"nivel": 4.0,
		"padre": "1076"
	}, {
		"id": 2013.0,
		"nombre": "CENTRO D14_B",
		"nivel": 4.0,
		"padre": "1076"
	}, {
		"id": 2011.0,
		"nombre": "CENTRO D14_C",
		"nivel": 4.0,
		"padre": "1076"
	}, {
		"id": 2015.0,
		"nombre": "CENTRO D15 A G",
		"nivel": 4.0,
		"padre": "1086"
	}, {
		"id": 2016.0,
		"nombre": "CENTRO D15 B G",
		"nivel": 4.0,
		"padre": "1086"
	}, {
		"id": 2014.0,
		"nombre": "CENTRO D15 C G",
		"nivel": 4.0,
		"padre": "1086"
	}, {
		"id": 2164.0,
		"nombre": "CENTRO D8_A",
		"nivel": 4.0,
		"padre": "1068"
	}, {
		"id": 2165.0,
		"nombre": "CENTRO D8_B",
		"nivel": 4.0,
		"padre": "1068"
	}, {
		"id": 2167.0,
		"nombre": "CENTRO D8_C",
		"nivel": 4.0,
		"padre": "1068"
	}, {
		"id": 2166.0,
		"nombre": "CENTRO D8_D",
		"nivel": 4.0,
		"padre": "1068"
	}, {
		"id": 2096.0,
		"nombre": "CHICHUAHUA G PROV",
		"nivel": 4.0,
		"padre": "1007"
	}, {
		"id": 2097.0,
		"nombre": "CHIHUAHUA G",
		"nivel": 4.0,
		"padre": "1007"
	}, {
		"id": 2195.0,
		"nombre": "CIUDAD DIGITAL",
		"nivel": 4.0,
		"padre": "1059"
	}, {
		"id": 2088.0,
		"nombre": "COATZACOALCOS G",
		"nivel": 4.0,
		"padre": "1009"
	}, {
		"id": 2171.0,
		"nombre": "CORDOBA G",
		"nivel": 4.0,
		"padre": "1012"
	}, {
		"id": 2007.0,
		"nombre": "COYOACAN G",
		"nivel": 4.0,
		"padre": "1010"
	}, {
		"id": 2140.0,
		"nombre": "CUERNAVACA 1 G",
		"nivel": 4.0,
		"padre": "1013"
	}, {
		"id": 2139.0,
		"nombre": "CUERNAVACA 2 G",
		"nivel": 4.0,
		"padre": "1013"
	}, {
		"id": 2138.0,
		"nombre": "CUERNAVACA PROV",
		"nivel": 4.0,
		"padre": "1013"
	}, {
		"id": 2056.0,
		"nombre": "CULIACAN G",
		"nivel": 4.0,
		"padre": "1014"
	}, {
		"id": 2194.0,
		"nombre": "DELICIAS G",
		"nivel": 4.0,
		"padre": "1015"
	}, {
		"id": 2079.0,
		"nombre": "DISTRITO 2",
		"nivel": 4.0,
		"padre": "1069"
	}, {
		"id": 2072.0,
		"nombre": "DISTRITO 24",
		"nivel": 4.0,
		"padre": "1037"
	}, {
		"id": 2071.0,
		"nombre": "DISTRITO 3",
		"nivel": 4.0,
		"padre": "1017"
	}, {
		"id": 2053.0,
		"nombre": "DISTRITO 4",
		"nivel": 4.0,
		"padre": "1002"
	}, {
		"id": 2054.0,
		"nombre": "DISTRITO 4_B",
		"nivel": 4.0,
		"padre": "1002"
	}, {
		"id": 2187.0,
		"nombre": "DISTRITO 5 A",
		"nivel": 4.0,
		"padre": "1000"
	}, {
		"id": 2058.0,
		"nombre": "DISTRITO 6_A",
		"nivel": 4.0,
		"padre": "1029"
	}, {
		"id": 2059.0,
		"nombre": "DISTRITO 6_B",
		"nivel": 4.0,
		"padre": "1029"
	}, {
		"id": 2083.0,
		"nombre": "ENSENADA G",
		"nivel": 4.0,
		"padre": "1073"
	}, {
		"id": 2185.0,
		"nombre": "G TOLUCA 1 A",
		"nivel": 4.0,
		"padre": "1077"
	}, {
		"id": 2182.0,
		"nombre": "G TOLUCA 1 B",
		"nivel": 4.0,
		"padre": "1077"
	}, {
		"id": 2183.0,
		"nombre": "G TOLUCA 1 C",
		"nivel": 4.0,
		"padre": "1077"
	}, {
		"id": 2184.0,
		"nombre": "G TOLUCA 1 D",
		"nivel": 4.0,
		"padre": "1077"
	}, {
		"id": 2051.0,
		"nombre": "G TOLUCA 2 A",
		"nivel": 4.0,
		"padre": "1078"
	}, {
		"id": 2052.0,
		"nombre": "G TOLUCA 2 B",
		"nivel": 4.0,
		"padre": "1078"
	}, {
		"id": 2036.0,
		"nombre": "GDL BARRANCA G",
		"nivel": 4.0,
		"padre": "1018"
	}, {
		"id": 2062.0,
		"nombre": "GDL CHAPULTEPEC G NORTE",
		"nivel": 4.0,
		"padre": "1019"
	}, {
		"id": 2061.0,
		"nombre": "GDL CHAPULTEPEC G SUR",
		"nivel": 4.0,
		"padre": "1019"
	}, {
		"id": 2026.0,
		"nombre": "GDL COLOMOS G A",
		"nivel": 4.0,
		"padre": "1020"
	}, {
		"id": 2024.0,
		"nombre": "GDL COLOMOS G B",
		"nivel": 4.0,
		"padre": "1020"
	}, {
		"id": 2025.0,
		"nombre": "GDL COLOMOS G C",
		"nivel": 4.0,
		"padre": "1020"
	}, {
		"id": 2027.0,
		"nombre": "GDL COLOMOS G PROV CON AA",
		"nivel": 4.0,
		"padre": "1020"
	}, {
		"id": 2082.0,
		"nombre": "GDL ESTADIO G",
		"nivel": 4.0,
		"padre": "1021"
	}, {
		"id": 2150.0,
		"nombre": "GDL LA PRIMAVERA G A",
		"nivel": 4.0,
		"padre": "1022"
	}, {
		"id": 2153.0,
		"nombre": "GDL LA PRIMAVERA G B",
		"nivel": 4.0,
		"padre": "1022"
	}, {
		"id": 2152.0,
		"nombre": "GDL LA PRIMAVERA G C",
		"nivel": 4.0,
		"padre": "1022"
	}, {
		"id": 2151.0,
		"nombre": "GDL LA PRIMAVERA G D",
		"nivel": 4.0,
		"padre": "1022"
	}, {
		"id": 2136.0,
		"nombre": "GDL LAZARO CARDENAS G A",
		"nivel": 4.0,
		"padre": "1023"
	}, {
		"id": 2137.0,
		"nombre": "GDL LAZARO CARDENAS G B",
		"nivel": 4.0,
		"padre": "1023"
	}, {
		"id": 2135.0,
		"nombre": "GDL LAZARO CARDENAS TEPATITLAN",
		"nivel": 4.0,
		"padre": "1023"
	}, {
		"id": 2029.0,
		"nombre": "GDL LOPEZ MATEOS G",
		"nivel": 4.0,
		"padre": "1024"
	}, {
		"id": 2030.0,
		"nombre": "GDL LOPEZ MATEOS G CHAPALA",
		"nivel": 4.0,
		"padre": "1024"
	}, {
		"id": 2028.0,
		"nombre": "GDL LOPEZ MATEOS G PROV CON AA",
		"nivel": 4.0,
		"padre": "1024"
	}, {
		"id": 2009.0,
		"nombre": "HERMOSILLO A G",
		"nivel": 4.0,
		"padre": "1026"
	}, {
		"id": 2010.0,
		"nombre": "HERMOSILLO B G",
		"nivel": 4.0,
		"padre": "1026"
	}, {
		"id": 2199.0,
		"nombre": "HUEHUETOCA G",
		"nivel": 4.0,
		"padre": "1027"
	}, {
		"id": 2066.0,
		"nombre": "IRAPUATO G",
		"nivel": 4.0,
		"padre": "1028"
	}, {
		"id": 2060.0,
		"nombre": "IZTAPALAPA PROV",
		"nivel": 4.0,
		"padre": "1029"
	}, {
		"id": 2163.0,
		"nombre": "JUAREZ NORTE 1",
		"nivel": 4.0,
		"padre": "1030"
	}, {
		"id": 2162.0,
		"nombre": "JUAREZ NORTE 2",
		"nivel": 4.0,
		"padre": "1030"
	}, {
		"id": 2099.0,
		"nombre": "JUAREZ SUR 1",
		"nivel": 4.0,
		"padre": "1031"
	}, {
		"id": 2100.0,
		"nombre": "JUAREZ SUR 2",
		"nivel": 4.0,
		"padre": "1031"
	}, {
		"id": 2098.0,
		"nombre": "JUAREZ SUR 3",
		"nivel": 4.0,
		"padre": "1031"
	}, {
		"id": 2192.0,
		"nombre": "LA FLORESTA G",
		"nivel": 4.0,
		"padre": "1054"
	}, {
		"id": 2077.0,
		"nombre": "LA LAGUNA GOMEZ",
		"nivel": 4.0,
		"padre": "1032"
	}, {
		"id": 2078.0,
		"nombre": "LA LAGUNA TORREON",
		"nivel": 4.0,
		"padre": "1032"
	}, {
		"id": 2091.0,
		"nombre": "LEON G1 A",
		"nivel": 4.0,
		"padre": "1034"
	}, {
		"id": 2092.0,
		"nombre": "LEON G1 B",
		"nivel": 4.0,
		"padre": "1034"
	}, {
		"id": 2090.0,
		"nombre": "LEON G1 C",
		"nivel": 4.0,
		"padre": "1034"
	}, {
		"id": 2089.0,
		"nombre": "LEON G1 PROV CON AA",
		"nivel": 4.0,
		"padre": "1034"
	}, {
		"id": 2111.0,
		"nombre": "LEON G2 A",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2114.0,
		"nombre": "LEON G2 B",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2112.0,
		"nombre": "LEON G2 C",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2113.0,
		"nombre": "LEON G2 D",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2115.0,
		"nombre": "LEON G2 E",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2109.0,
		"nombre": "LEON G2 GUANAJUATO",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2108.0,
		"nombre": "LEON G2 PROV CON AA",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2110.0,
		"nombre": "LEON G2 SILAO",
		"nivel": 4.0,
		"padre": "1035"
	}, {
		"id": 2205.0,
		"nombre": "LOS MOCHIS G",
		"nivel": 4.0,
		"padre": "1036"
	}, {
		"id": 2039.0,
		"nombre": "MAZATLAN G",
		"nivel": 4.0,
		"padre": "1039"
	}, {
		"id": 2004.0,
		"nombre": "MERIDA 1 G",
		"nivel": 4.0,
		"padre": "1040"
	}, {
		"id": 2003.0,
		"nombre": "MERIDA 2 G",
		"nivel": 4.0,
		"padre": "1040"
	}, {
		"id": 2204.0,
		"nombre": "MERIDA 3 G",
		"nivel": 4.0,
		"padre": "1041"
	}, {
		"id": 2203.0,
		"nombre": "MERIDA 4 G",
		"nivel": 4.0,
		"padre": "1041"
	}, {
		"id": 2173.0,
		"nombre": "MEXICALI G",
		"nivel": 4.0,
		"padre": "1042"
	}, {
		"id": 2087.0,
		"nombre": "MINATITLAN G",
		"nivel": 4.0,
		"padre": "1009"
	}, {
		"id": 2042.0,
		"nombre": "MIRAMONTES G",
		"nivel": 4.0,
		"padre": "1055"
	}, {
		"id": 2063.0,
		"nombre": "MORELIA G",
		"nivel": 4.0,
		"padre": "1043"
	}, {
		"id": 2080.0,
		"nombre": "MTY CERRO DE LA SILLA A",
		"nivel": 4.0,
		"padre": "1044"
	}, {
		"id": 2081.0,
		"nombre": "MTY CERRO DE LA SILLA B",
		"nivel": 4.0,
		"padre": "1044"
	}, {
		"id": 2196.0,
		"nombre": "MTY GARCIA A",
		"nivel": 4.0,
		"padre": "1045"
	}, {
		"id": 2197.0,
		"nombre": "MTY GARCIA B",
		"nivel": 4.0,
		"padre": "1045"
	}, {
		"id": 2103.0,
		"nombre": "MTY MITRAS A",
		"nivel": 4.0,
		"padre": "1046"
	}, {
		"id": 2101.0,
		"nombre": "MTY MITRAS B",
		"nivel": 4.0,
		"padre": "1046"
	}, {
		"id": 2050.0,
		"nombre": "MTY SANTA LUCIA A",
		"nivel": 4.0,
		"padre": "1047"
	}, {
		"id": 2049.0,
		"nombre": "MTY SANTA LUCIA B",
		"nivel": 4.0,
		"padre": "1047"
	}, {
		"id": 2022.0,
		"nombre": "MTY SENDERO DIVISORIO A",
		"nivel": 4.0,
		"padre": "1048"
	}, {
		"id": 2023.0,
		"nombre": "MTY SENDERO DIVISORIO B",
		"nivel": 4.0,
		"padre": "1048"
	}, {
		"id": 2021.0,
		"nombre": "MTY SENDERO DIVISORIO C",
		"nivel": 4.0,
		"padre": "1048"
	}, {
		"id": 2074.0,
		"nombre": "MTY SIERRA MADRE A",
		"nivel": 4.0,
		"padre": "1049"
	}, {
		"id": 2073.0,
		"nombre": "MTY SIERRA MADRE B",
		"nivel": 4.0,
		"padre": "1049"
	}, {
		"id": 2005.0,
		"nombre": "NAPOLES G",
		"nivel": 4.0,
		"padre": "1010"
	}, {
		"id": 2006.0,
		"nombre": "NARVARTE G",
		"nivel": 4.0,
		"padre": "1010"
	}, {
		"id": 2149.0,
		"nombre": "NAUCALPAN G",
		"nivel": 4.0,
		"padre": "1050"
	}, {
		"id": 2146.0,
		"nombre": "NEZA 1 G",
		"nivel": 4.0,
		"padre": "1052"
	}, {
		"id": 2055.0,
		"nombre": "NEZA 2 G",
		"nivel": 4.0,
		"padre": "1051"
	}, {
		"id": 2047.0,
		"nombre": "NORESTE CENTRO G",
		"nivel": 4.0,
		"padre": "1003"
	}, {
		"id": 2045.0,
		"nombre": "NORESTE NORTE G",
		"nivel": 4.0,
		"padre": "1003"
	}, {
		"id": 2046.0,
		"nombre": "NORESTE SUR G",
		"nivel": 4.0,
		"padre": "1003"
	}, {
		"id": 2017.0,
		"nombre": "NORTE D 16 VALLEJO",
		"nivel": 4.0,
		"padre": "1025"
	}, {
		"id": 2018.0,
		"nombre": "NORTE D 16 ZACATENCO",
		"nivel": 4.0,
		"padre": "1025"
	}, {
		"id": 2067.0,
		"nombre": "NORTE D01 A",
		"nivel": 4.0,
		"padre": "1008"
	}, {
		"id": 2070.0,
		"nombre": "NORTE D01 B",
		"nivel": 4.0,
		"padre": "1008"
	}, {
		"id": 2069.0,
		"nombre": "NORTE D01 C",
		"nivel": 4.0,
		"padre": "1008"
	}, {
		"id": 2068.0,
		"nombre": "NORTE D01 D",
		"nivel": 4.0,
		"padre": "1008"
	}, {
		"id": 2019.0,
		"nombre": "NORTE D17_A",
		"nivel": 4.0,
		"padre": "1075"
	}, {
		"id": 2020.0,
		"nombre": "NORTE D17_B",
		"nivel": 4.0,
		"padre": "1075"
	}, {
		"id": 2170.0,
		"nombre": "NORTE D21_A",
		"nivel": 4.0,
		"padre": "1080"
	}, {
		"id": 2168.0,
		"nombre": "NORTE D21_B",
		"nivel": 4.0,
		"padre": "1080"
	}, {
		"id": 2169.0,
		"nombre": "NORTE D21_C",
		"nivel": 4.0,
		"padre": "1080"
	}, {
		"id": 2177.0,
		"nombre": "NORTE D22 A G",
		"nivel": 4.0,
		"padre": "1079"
	}, {
		"id": 2178.0,
		"nombre": "NORTE D22 B G",
		"nivel": 4.0,
		"padre": "1079"
	}, {
		"id": 2176.0,
		"nombre": "NORTE D22 C G",
		"nivel": 4.0,
		"padre": "1079"
	}, {
		"id": 2175.0,
		"nombre": "NORTE D22 D G",
		"nivel": 4.0,
		"padre": "1079"
	}, {
		"id": 2188.0,
		"nombre": "NORTE D23 A",
		"nivel": 4.0,
		"padre": "1053"
	}, {
		"id": 2065.0,
		"nombre": "ORIENTE D 26",
		"nivel": 4.0,
		"padre": "1011"
	}, {
		"id": 2172.0,
		"nombre": "ORIZABA G",
		"nivel": 4.0,
		"padre": "1012"
	}, {
		"id": 2191.0,
		"nombre": "PACHUCA CENTRO G",
		"nivel": 4.0,
		"padre": "1054"
	}, {
		"id": 2189.0,
		"nombre": "PACHUCA NORTE G",
		"nivel": 4.0,
		"padre": "1054"
	}, {
		"id": 2190.0,
		"nombre": "PACHUCA SUR G",
		"nivel": 4.0,
		"padre": "1054"
	}, {
		"id": 2057.0,
		"nombre": "POLANCO G",
		"nivel": 4.0,
		"padre": "1056"
	}, {
		"id": 2037.0,
		"nombre": "POZA RICA G",
		"nivel": 4.0,
		"padre": "1058"
	}, {
		"id": 2048.0,
		"nombre": "PROV AZCAPO",
		"nivel": 4.0,
		"padre": "1003"
	}, {
		"id": 2126.0,
		"nombre": "PUEBLA I-A",
		"nivel": 4.0,
		"padre": "1060"
	}, {
		"id": 2127.0,
		"nombre": "PUEBLA I-B",
		"nivel": 4.0,
		"padre": "1060"
	}, {
		"id": 2128.0,
		"nombre": "PUEBLA I-C",
		"nivel": 4.0,
		"padre": "1060"
	}, {
		"id": 2125.0,
		"nombre": "PUEBLA I-D",
		"nivel": 4.0,
		"padre": "1060"
	}, {
		"id": 2124.0,
		"nombre": "PUEBLA I-E",
		"nivel": 4.0,
		"padre": "1060"
	}, {
		"id": 2033.0,
		"nombre": "PUEBLA II-A",
		"nivel": 4.0,
		"padre": "1061"
	}, {
		"id": 2034.0,
		"nombre": "PUEBLA II-B",
		"nivel": 4.0,
		"padre": "1061"
	}, {
		"id": 2040.0,
		"nombre": "PUEBLA lll-A",
		"nivel": 4.0,
		"padre": "1062"
	}, {
		"id": 2041.0,
		"nombre": "PUEBLA lll-B",
		"nivel": 4.0,
		"padre": "1062"
	}, {
		"id": 2031.0,
		"nombre": "PUERTO VALLARTA NORTE G",
		"nivel": 4.0,
		"padre": "1063"
	}, {
		"id": 2032.0,
		"nombre": "PUERTO VALLARTA SUR G",
		"nivel": 4.0,
		"padre": "1063"
	}, {
		"id": 2075.0,
		"nombre": "Prov Saltillo B",
		"nivel": 4.0,
		"padre": "1066"
	}, {
		"id": 2038.0,
		"nombre": "Provisional EXP",
		"nivel": 4.0,
		"padre": "1039"
	}, {
		"id": 2206.0,
		"nombre": "Provisional Exp",
		"nivel": 4.0,
		"padre": "1014"
	}, {
		"id": 2102.0,
		"nombre": "Provisional Todo",
		"nivel": 4.0,
		"padre": "1046"
	}, {
		"id": 2119.0,
		"nombre": "QUERETARO G A",
		"nivel": 4.0,
		"padre": "1064"
	}, {
		"id": 2117.0,
		"nombre": "QUERETARO G B",
		"nivel": 4.0,
		"padre": "1064"
	}, {
		"id": 2116.0,
		"nombre": "QUERETARO G C",
		"nivel": 4.0,
		"padre": "1064"
	}, {
		"id": 2008.0,
		"nombre": "ROMA G",
		"nivel": 4.0,
		"padre": "1010"
	}, {
		"id": 2084.0,
		"nombre": "ROSARITO G1",
		"nivel": 4.0,
		"padre": "1073"
	}, {
		"id": 2180.0,
		"nombre": "SALAMANCA G",
		"nivel": 4.0,
		"padre": "1065"
	}, {
		"id": 2179.0,
		"nombre": "SALAMANCA G PROV SIN AA",
		"nivel": 4.0,
		"padre": "1065"
	}, {
		"id": 2076.0,
		"nombre": "SALTILLO G",
		"nivel": 4.0,
		"padre": "1066"
	}, {
		"id": 2044.0,
		"nombre": "SAN JERONIMO",
		"nivel": 4.0,
		"padre": "1055"
	}, {
		"id": 2118.0,
		"nombre": "SAN JUAN DEL RIO G",
		"nivel": 4.0,
		"padre": "1064"
	}, {
		"id": 2122.0,
		"nombre": "SAN LUIS ORIENTE",
		"nivel": 4.0,
		"padre": "1067"
	}, {
		"id": 2120.0,
		"nombre": "SAN LUIS ORIENTE A",
		"nivel": 4.0,
		"padre": "1067"
	}, {
		"id": 2121.0,
		"nombre": "SAN LUIS ORIENTE B",
		"nivel": 4.0,
		"padre": "1067"
	}, {
		"id": 2123.0,
		"nombre": "SAN LUIS PONIENTE",
		"nivel": 4.0,
		"padre": "1067"
	}, {
		"id": 2107.0,
		"nombre": "SAN MIGUEL ALLENDE G",
		"nivel": 4.0,
		"padre": "1006"
	}, {
		"id": 2043.0,
		"nombre": "SANTA URSULA",
		"nivel": 4.0,
		"padre": "1055"
	}, {
		"id": 2200.0,
		"nombre": "TEPEJI G",
		"nivel": 4.0,
		"padre": "1027"
	}, {
		"id": 2035.0,
		"nombre": "TEXCOCO G",
		"nivel": 4.0,
		"padre": "1070"
	}, {
		"id": 2093.0,
		"nombre": "TIJUANA D01 A",
		"nivel": 4.0,
		"padre": "1072"
	}, {
		"id": 2095.0,
		"nombre": "TIJUANA D01 B",
		"nivel": 4.0,
		"padre": "1072"
	}, {
		"id": 2094.0,
		"nombre": "TIJUANA D01 C",
		"nivel": 4.0,
		"padre": "1072"
	}, {
		"id": 2156.0,
		"nombre": "TIJUANA D02 A",
		"nivel": 4.0,
		"padre": "1071"
	}, {
		"id": 2154.0,
		"nombre": "TIJUANA D02 B",
		"nivel": 4.0,
		"padre": "1071"
	}, {
		"id": 2155.0,
		"nombre": "TIJUANA D02 C",
		"nivel": 4.0,
		"padre": "1071"
	}, {
		"id": 2159.0,
		"nombre": "TIJUANA D04 A",
		"nivel": 4.0,
		"padre": "1074"
	}, {
		"id": 2161.0,
		"nombre": "TIJUANA D04 B",
		"nivel": 4.0,
		"padre": "1074"
	}, {
		"id": 2158.0,
		"nombre": "TIJUANA D04 C",
		"nivel": 4.0,
		"padre": "1074"
	}, {
		"id": 2160.0,
		"nombre": "TIJUANA D04 D",
		"nivel": 4.0,
		"padre": "1074"
	}, {
		"id": 2085.0,
		"nombre": "TIJUANA G",
		"nivel": 4.0,
		"padre": "1073"
	}, {
		"id": 2181.0,
		"nombre": "TOLUCA PROVISIONAL1",
		"nivel": 4.0,
		"padre": "1077"
	}, {
		"id": 2157.0,
		"nombre": "TUXTLA G",
		"nivel": 4.0,
		"padre": "1081"
	}, {
		"id": 2186.0,
		"nombre": "VALLE DE BRAVO G",
		"nivel": 4.0,
		"padre": "1077"
	}, {
		"id": 2131.0,
		"nombre": "VERACRUZ 1 G",
		"nivel": 4.0,
		"padre": "1082"
	}, {
		"id": 2130.0,
		"nombre": "VERACRUZ 2 G",
		"nivel": 4.0,
		"padre": "1082"
	}, {
		"id": 2132.0,
		"nombre": "VERACRUZ 3 G",
		"nivel": 4.0,
		"padre": "1082"
	}, {
		"id": 2129.0,
		"nombre": "VERACRUZ 4 G",
		"nivel": 4.0,
		"padre": "1082"
	}, {
		"id": 2064.0,
		"nombre": "VILLAHERMOSA G",
		"nivel": 4.0,
		"padre": "1083"
	}, {
		"id": 2133.0,
		"nombre": "XALAPA NORTE G",
		"nivel": 4.0,
		"padre": "1085"
	}, {
		"id": 2134.0,
		"nombre": "XALAPA SUR G",
		"nivel": 4.0,
		"padre": "1085"
	}, {
		"id": 2147.0,
		"nombre": "ZOMEYUCAN G",
		"nivel": 4.0,
		"padre": "1050"
	}, {
		"id": 3559.0,
		"nombre": "ACAPULCO CENTRO",
		"nivel": 5.0,
		"padre": "2141"
	}, {
		"id": 3279.0,
		"nombre": "ACUITLAPILCO",
		"nivel": 5.0,
		"padre": "2072"
	}, {
		"id": 3684.0,
		"nombre": "AGRICOLA ORIENTAL",
		"nivel": 5.0,
		"padre": "2187"
	}, {
		"id": 3573.0,
		"nombre": "AGUA AZUL",
		"nivel": 5.0,
		"padre": "2146"
	}, {
		"id": 3372.0,
		"nombre": "AGUA CALIENTE",
		"nivel": 5.0,
		"padre": "2094"
	}, {
		"id": 3503.0,
		"nombre": "AGUA SANTA",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3322.0,
		"nombre": "ALCAHUACAN",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3612.0,
		"nombre": "ALDAMA",
		"nivel": 5.0,
		"padre": "2162"
	}, {
		"id": 3186.0,
		"nombre": "ALMOLOYA",
		"nivel": 5.0,
		"padre": "2052"
	}, {
		"id": 3370.0,
		"nombre": "ALTAMIRA",
		"nivel": 5.0,
		"padre": "2093"
	}, {
		"id": 3687.0,
		"nombre": "AMPLIACION AGRICOLA ORIENTAL",
		"nivel": 5.0,
		"padre": "2187"
	}, {
		"id": 3508.0,
		"nombre": "AMPLIACION AGUA SANTA",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3507.0,
		"nombre": "AMPLIACION AGUA SANTA 2",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3512.0,
		"nombre": "AMPLIACION AGUA SANTA 3",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3513.0,
		"nombre": "AMPLIACION AGUA SANTA 4",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3271.0,
		"nombre": "AMPLIACION ALCAHUACAN",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3611.0,
		"nombre": "AMPLIACION ALDAMA",
		"nivel": 5.0,
		"padre": "2162"
	}, {
		"id": 3403.0,
		"nombre": "AMPLIACION ANAHUAC",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3165.0,
		"nombre": "AMPLIACION ANZURES 2",
		"nivel": 5.0,
		"padre": "2046"
	}, {
		"id": 3078.0,
		"nombre": "AMPLIACION APODACA",
		"nivel": 5.0,
		"padre": "2022"
	}, {
		"id": 3191.0,
		"nombre": "AMPLIACION ARAGON 1",
		"nivel": 5.0,
		"padre": "2054"
	}, {
		"id": 3402.0,
		"nombre": "AMPLIACION ARCOS DEL SOL",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3154.0,
		"nombre": "AMPLIACION ARCOS DEL SUR",
		"nivel": 5.0,
		"padre": "2041"
	}, {
		"id": 3570.0,
		"nombre": "AMPLIACION ASTURIAS",
		"nivel": 5.0,
		"padre": "2145"
	}, {
		"id": 3653.0,
		"nombre": "AMPLIACION AVIACION",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3132.0,
		"nombre": "AMPLIACION BARRANCA",
		"nivel": 5.0,
		"padre": "2036"
	}, {
		"id": 3490.0,
		"nombre": "AMPLIACION BOCA DEL RIO",
		"nivel": 5.0,
		"padre": "2130"
	}, {
		"id": 3228.0,
		"nombre": "AMPLIACION BOCANEGRA",
		"nivel": 5.0,
		"padre": "2063"
	}, {
		"id": 3518.0,
		"nombre": "AMPLIACION CAFETALES",
		"nivel": 5.0,
		"padre": "2134"
	}, {
		"id": 3357.0,
		"nombre": "AMPLIACION CANADA DEL REFUGIO",
		"nivel": 5.0,
		"padre": "2089"
	}, {
		"id": 3640.0,
		"nombre": "AMPLIACION CARTAGENA",
		"nivel": 5.0,
		"padre": "2169"
	}, {
		"id": 3037.0,
		"nombre": "AMPLIACION CENTENARIO 1A",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3040.0,
		"nombre": "AMPLIACION CENTENARIO 2A",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3038.0,
		"nombre": "AMPLIACION CENTENARIO 2B",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3041.0,
		"nombre": "AMPLIACION CENTENARIO 2C",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3218.0,
		"nombre": "AMPLIACION CERRO DE LA ESTRELLA",
		"nivel": 5.0,
		"padre": "2058"
	}, {
		"id": 3223.0,
		"nombre": "AMPLIACION CERRO DE LA ESTRELLA 2",
		"nivel": 5.0,
		"padre": "2060"
	}, {
		"id": 3219.0,
		"nombre": "AMPLIACION CERRO DE LA ESTRELLA 3",
		"nivel": 5.0,
		"padre": "2058"
	}, {
		"id": 3127.0,
		"nombre": "AMPLIACION CHINCONCUAC 1",
		"nivel": 5.0,
		"padre": "2035"
	}, {
		"id": 3130.0,
		"nombre": "AMPLIACION CHINCONCUAC 2",
		"nivel": 5.0,
		"padre": "2035"
	}, {
		"id": 3255.0,
		"nombre": "AMPLIACION CIBELES",
		"nivel": 5.0,
		"padre": "2066"
	}, {
		"id": 3256.0,
		"nombre": "AMPLIACION CIBELES 2",
		"nivel": 5.0,
		"padre": "2066"
	}, {
		"id": 3168.0,
		"nombre": "AMPLIACION CLAVERIA",
		"nivel": 5.0,
		"padre": "2047"
	}, {
		"id": 3259.0,
		"nombre": "AMPLIACION COACALCO",
		"nivel": 5.0,
		"padre": "2067"
	}, {
		"id": 3053.0,
		"nombre": "AMPLIACION COAPA",
		"nivel": 5.0,
		"padre": "2015"
	}, {
		"id": 3557.0,
		"nombre": "AMPLIACION COSTA AZUL",
		"nivel": 5.0,
		"padre": "2141"
	}, {
		"id": 3500.0,
		"nombre": "AMPLIACION COSTA VERDE",
		"nivel": 5.0,
		"padre": "2132"
	}, {
		"id": 3499.0,
		"nombre": "AMPLIACION COYOL 1",
		"nivel": 5.0,
		"padre": "2132"
	}, {
		"id": 3501.0,
		"nombre": "AMPLIACION COYOL 2",
		"nivel": 5.0,
		"padre": "2132"
	}, {
		"id": 3630.0,
		"nombre": "AMPLIACION CUAJIMALPA",
		"nivel": 5.0,
		"padre": "2166"
	}, {
		"id": 3626.0,
		"nombre": "AMPLIACION CUAJIMALPA 2",
		"nivel": 5.0,
		"padre": "2165"
	}, {
		"id": 3544.0,
		"nombre": "AMPLIACION CUERNAVACA 2",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3531.0,
		"nombre": "AMPLIACION CUERNAVACA 3_1",
		"nivel": 5.0,
		"padre": "2138"
	}, {
		"id": 3532.0,
		"nombre": "AMPLIACION CUERNAVACA 3_2",
		"nivel": 5.0,
		"padre": "2138"
	}, {
		"id": 3415.0,
		"nombre": "AMPLIACION CUMBRES",
		"nivel": 5.0,
		"padre": "2103"
	}, {
		"id": 3404.0,
		"nombre": "AMPLIACION CUMBRES (FASE 2)",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3517.0,
		"nombre": "AMPLIACION EL TREBOL",
		"nivel": 5.0,
		"padre": "2134"
	}, {
		"id": 3077.0,
		"nombre": "AMPLIACION ENRAMADA",
		"nivel": 5.0,
		"padre": "2022"
	}, {
		"id": 3600.0,
		"nombre": "AMPLIACION ESTADIO",
		"nivel": 5.0,
		"padre": "2157"
	}, {
		"id": 3463.0,
		"nombre": "AMPLIACION FERROCARRILERA",
		"nivel": 5.0,
		"padre": "2122"
	}, {
		"id": 3506.0,
		"nombre": "AMPLIACION FRAMBOYANES",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3509.0,
		"nombre": "AMPLIACION FRAMBOYANES 2",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3511.0,
		"nombre": "AMPLIACION FRAMBOYANES 3",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3082.0,
		"nombre": "AMPLIACION GENERAL ESCOBEDO",
		"nivel": 5.0,
		"padre": "2023"
	}, {
		"id": 3652.0,
		"nombre": "AMPLIACION GONZALEZ ORTEGA",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3650.0,
		"nombre": "AMPLIACION HACIENDA REAL",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3323.0,
		"nombre": "AMPLIACION HEROES TECAMAC I",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3726.0,
		"nombre": "AMPLIACION HUEHUETOCA",
		"nivel": 5.0,
		"padre": "2198"
	}, {
		"id": 3468.0,
		"nombre": "AMPLIACION HUERTA REAL",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3198.0,
		"nombre": "AMPLIACION HUMAYA",
		"nivel": 5.0,
		"padre": "2206"
	}, {
		"id": 3332.0,
		"nombre": "AMPLIACION INDEPENDENCIA",
		"nivel": 5.0,
		"padre": "2082"
	}, {
		"id": 3139.0,
		"nombre": "AMPLIACION INSURGENTES 2",
		"nivel": 5.0,
		"padre": "2037"
	}, {
		"id": 3638.0,
		"nombre": "AMPLIACION IZCALLI 2",
		"nivel": 5.0,
		"padre": "2168"
	}, {
		"id": 3566.0,
		"nombre": "AMPLIACION IZTACALCO",
		"nivel": 5.0,
		"padre": "2144"
	}, {
		"id": 3360.0,
		"nombre": "AMPLIACION JARDINES DE SAN FRANCISCO",
		"nivel": 5.0,
		"padre": "2090"
	}, {
		"id": 3359.0,
		"nombre": "AMPLIACION JARDINES DE SAN FRANCISCO 2",
		"nivel": 5.0,
		"padre": "2090"
	}, {
		"id": 3150.0,
		"nombre": "AMPLIACION JARDINES DE SANTIAGO",
		"nivel": 5.0,
		"padre": "2041"
	}, {
		"id": 3153.0,
		"nombre": "AMPLIACION JARDINES DE SANTIAGO 2",
		"nivel": 5.0,
		"padre": "2041"
	}, {
		"id": 3456.0,
		"nombre": "AMPLIACION JURICA",
		"nivel": 5.0,
		"padre": "2119"
	}, {
		"id": 3007.0,
		"nombre": "AMPLIACION KABAH",
		"nivel": 5.0,
		"padre": "2002"
	}, {
		"id": 3012.0,
		"nombre": "AMPLIACION KUKULCAN",
		"nivel": 5.0,
		"padre": "2003"
	}, {
		"id": 3013.0,
		"nombre": "AMPLIACION KUKULCAN 2",
		"nivel": 5.0,
		"padre": "2003"
	}, {
		"id": 3205.0,
		"nombre": "AMPLIACION LA CAMPINA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3292.0,
		"nombre": "AMPLIACION LA NOGALERA",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3241.0,
		"nombre": "AMPLIACION LAGUNA 1",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3236.0,
		"nombre": "AMPLIACION LAGUNA 2",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3237.0,
		"nombre": "AMPLIACION LAGUNA 3",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3238.0,
		"nombre": "AMPLIACION LAGUNA 4",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3239.0,
		"nombre": "AMPLIACION LAGUNA 5",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3243.0,
		"nombre": "AMPLIACION LAGUNA 7",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3244.0,
		"nombre": "AMPLIACION LAGUNA 8",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3242.0,
		"nombre": "AMPLIACION LAGUNA 9",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3298.0,
		"nombre": "AMPLIACION LANDIN 1",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3296.0,
		"nombre": "AMPLIACION LANDIN 2",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3288.0,
		"nombre": "AMPLIACION LANDIN 3",
		"nivel": 5.0,
		"padre": "2075"
	}, {
		"id": 3304.0,
		"nombre": "AMPLIACION LANDIN 4",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3589.0,
		"nombre": "AMPLIACION LAS HUERTAS",
		"nivel": 5.0,
		"padre": "2149"
	}, {
		"id": 3588.0,
		"nombre": "AMPLIACION LAS HUERTAS 2",
		"nivel": 5.0,
		"padre": "2149"
	}, {
		"id": 3527.0,
		"nombre": "AMPLIACION LAS JUNTAS",
		"nivel": 5.0,
		"padre": "2137"
	}, {
		"id": 3526.0,
		"nombre": "AMPLIACION LAS PINTAS",
		"nivel": 5.0,
		"padre": "2137"
	}, {
		"id": 3169.0,
		"nombre": "AMPLIACION LEGARIA",
		"nivel": 5.0,
		"padre": "2048"
	}, {
		"id": 3673.0,
		"nombre": "AMPLIACION LERMA",
		"nivel": 5.0,
		"padre": "2182"
	}, {
		"id": 3674.0,
		"nombre": "AMPLIACION LERMA 2",
		"nivel": 5.0,
		"padre": "2182"
	}, {
		"id": 3478.0,
		"nombre": "AMPLIACION LOMAS DE ANGELOPOLIS",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3480.0,
		"nombre": "AMPLIACION LOMAS DE ANGELOPOLIS 2",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3494.0,
		"nombre": "AMPLIACION LOMAS DEL RIO",
		"nivel": 5.0,
		"padre": "2131"
	}, {
		"id": 3587.0,
		"nombre": "AMPLIACION LOMAS VERDES",
		"nivel": 5.0,
		"padre": "2149"
	}, {
		"id": 3121.0,
		"nombre": "AMPLIACION LOS FRAILES",
		"nivel": 5.0,
		"padre": "2034"
	}, {
		"id": 3441.0,
		"nombre": "AMPLIACION LOS FRESNOS",
		"nivel": 5.0,
		"padre": "2113"
	}, {
		"id": 3442.0,
		"nombre": "AMPLIACION LOS NARANJOS",
		"nivel": 5.0,
		"padre": "2114"
	}, {
		"id": 3576.0,
		"nombre": "AMPLIACION LOS REYES ACAQUILPAN",
		"nivel": 5.0,
		"padre": "2146"
	}, {
		"id": 3115.0,
		"nombre": "AMPLIACION MALECON 1",
		"nivel": 5.0,
		"padre": "2032"
	}, {
		"id": 3114.0,
		"nombre": "AMPLIACION MALECON 2",
		"nivel": 5.0,
		"padre": "2032"
	}, {
		"id": 3721.0,
		"nombre": "AMPLIACION MANUEL CLOUTHIER",
		"nivel": 5.0,
		"padre": "2197"
	}, {
		"id": 3410.0,
		"nombre": "AMPLIACION MANUEL CLOUTHIER (FASE 2)",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3378.0,
		"nombre": "AMPLIACION MARMOL",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3663.0,
		"nombre": "AMPLIACION MELCHOR OCAMPO 1",
		"nivel": 5.0,
		"padre": "2176"
	}, {
		"id": 3666.0,
		"nombre": "AMPLIACION MELCHOR OCAMPO 2",
		"nivel": 5.0,
		"padre": "2178"
	}, {
		"id": 3645.0,
		"nombre": "AMPLIACION MENDOZA",
		"nivel": 5.0,
		"padre": "2172"
	}, {
		"id": 3417.0,
		"nombre": "AMPLIACION MEXIQUITO",
		"nivel": 5.0,
		"padre": "2104"
	}, {
		"id": 3302.0,
		"nombre": "AMPLIACION MIRASIERRA 2",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3467.0,
		"nombre": "AMPLIACION MORALES CAMPESTRE",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3469.0,
		"nombre": "AMPLIACION MORALES CAMPESTRE 2",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3207.0,
		"nombre": "AMPLIACION NAKAYAMA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3695.0,
		"nombre": "AMPLIACION NICOLAS ROMERO 1",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3694.0,
		"nombre": "AMPLIACION NICOLAS ROMERO 2",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3696.0,
		"nombre": "AMPLIACION NICOLAS ROMERO 3",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3698.0,
		"nombre": "AMPLIACION NICOLAS ROMERO 4",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3289.0,
		"nombre": "AMPLIACION NUEVA AURORA",
		"nivel": 5.0,
		"padre": "2075"
	}, {
		"id": 3286.0,
		"nombre": "AMPLIACION OBISPADO",
		"nivel": 5.0,
		"padre": "2074"
	}, {
		"id": 3405.0,
		"nombre": "AMPLIACION OBISPADO (FASE 2)",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3546.0,
		"nombre": "AMPLIACION OCOTEPEC",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3552.0,
		"nombre": "AMPLIACION OCOTEPEC 2",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3554.0,
		"nombre": "AMPLIACION OCOTEPEC 3",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3555.0,
		"nombre": "AMPLIACION OCOTEPEC 4",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3553.0,
		"nombre": "AMPLIACION OCOTEPEC 5",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3034.0,
		"nombre": "AMPLIACION OLIVARES",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3177.0,
		"nombre": "AMPLIACION PASEO DE LOS ANGELES",
		"nivel": 5.0,
		"padre": "2050"
	}, {
		"id": 3088.0,
		"nombre": "AMPLIACION PATRIA",
		"nivel": 5.0,
		"padre": "2024"
	}, {
		"id": 3060.0,
		"nombre": "AMPLIACION PELICANO 1",
		"nivel": 5.0,
		"padre": "2018"
	}, {
		"id": 3064.0,
		"nombre": "AMPLIACION PELICANO 1_1",
		"nivel": 5.0,
		"padre": "2018"
	}, {
		"id": 3686.0,
		"nombre": "AMPLIACION PELICANO 2",
		"nivel": 5.0,
		"padre": "2187"
	}, {
		"id": 3338.0,
		"nombre": "AMPLIACION PLAYA HERMOSA 1",
		"nivel": 5.0,
		"padre": "2083"
	}, {
		"id": 3339.0,
		"nombre": "AMPLIACION PLAYA HERMOSA 2",
		"nivel": 5.0,
		"padre": "2083"
	}, {
		"id": 3649.0,
		"nombre": "AMPLIACION PUEBLO NUEVO",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3629.0,
		"nombre": "AMPLIACION PUEBLO SANTA FE 1",
		"nivel": 5.0,
		"padre": "2166"
	}, {
		"id": 3401.0,
		"nombre": "AMPLIACION QUINTO CENTENARIO (FASE 2)",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3295.0,
		"nombre": "AMPLIACION RAMOS ARIZPE",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3444.0,
		"nombre": "AMPLIACION REAL DE JEREZ",
		"nivel": 5.0,
		"padre": "2115"
	}, {
		"id": 3446.0,
		"nombre": "AMPLIACION REAL DE JEREZ 2",
		"nivel": 5.0,
		"padre": "2115"
	}, {
		"id": 3434.0,
		"nombre": "AMPLIACION REAL DE JEREZ 4",
		"nivel": 5.0,
		"padre": "2108"
	}, {
		"id": 3209.0,
		"nombre": "AMPLIACION REAL DE MINA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3407.0,
		"nombre": "AMPLIACION REAL DE PALMAS",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3510.0,
		"nombre": "AMPLIACION REVOLUCION",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3376.0,
		"nombre": "AMPLIACION ROBINSON",
		"nivel": 5.0,
		"padre": "2096"
	}, {
		"id": 3343.0,
		"nombre": "AMPLIACION ROSAMAR 1",
		"nivel": 5.0,
		"padre": "2084"
	}, {
		"id": 3346.0,
		"nombre": "AMPLIACION ROSAMAR 2",
		"nivel": 5.0,
		"padre": "2084"
	}, {
		"id": 3345.0,
		"nombre": "AMPLIACION ROSAMAR_3",
		"nivel": 5.0,
		"padre": "2084"
	}, {
		"id": 3602.0,
		"nombre": "AMPLIACION SABINITO",
		"nivel": 5.0,
		"padre": "2157"
	}, {
		"id": 3033.0,
		"nombre": "AMPLIACION SAHUARO",
		"nivel": 5.0,
		"padre": "2009"
	}, {
		"id": 3303.0,
		"nombre": "AMPLIACION SALTILLO 2000_3",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3453.0,
		"nombre": "AMPLIACION SAN CAYETANO 1",
		"nivel": 5.0,
		"padre": "2118"
	}, {
		"id": 3454.0,
		"nombre": "AMPLIACION SAN CAYETANO 2",
		"nivel": 5.0,
		"padre": "2118"
	}, {
		"id": 3265.0,
		"nombre": "AMPLIACION SAN CRISTOBAL",
		"nivel": 5.0,
		"padre": "2070"
	}, {
		"id": 3181.0,
		"nombre": "AMPLIACION SAN FELIPE",
		"nivel": 5.0,
		"padre": "2051"
	}, {
		"id": 3535.0,
		"nombre": "AMPLIACION SAN JOSE CUMBRES",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3539.0,
		"nombre": "AMPLIACION SAN JOSE CUMBRES 2",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3533.0,
		"nombre": "AMPLIACION SAN JOSE CUMBRES 3",
		"nivel": 5.0,
		"padre": "2138"
	}, {
		"id": 3697.0,
		"nombre": "AMPLIACION SAN JUAN TLIHUACA",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3250.0,
		"nombre": "AMPLIACION SAN LORENZO TEZONCO",
		"nivel": 5.0,
		"padre": "2065"
	}, {
		"id": 3367.0,
		"nombre": "AMPLIACION SAN MARCOS",
		"nivel": 5.0,
		"padre": "2091"
	}, {
		"id": 3677.0,
		"nombre": "AMPLIACION SAN MATEO ATENCO",
		"nivel": 5.0,
		"padre": "2183"
	}, {
		"id": 3634.0,
		"nombre": "AMPLIACION SAN MIGUEL CHAPULTEPEC",
		"nivel": 5.0,
		"padre": "2167"
	}, {
		"id": 3056.0,
		"nombre": "AMPLIACION SAN MIGUEL XICALCO",
		"nivel": 5.0,
		"padre": "2016"
	}, {
		"id": 3046.0,
		"nombre": "AMPLIACION SAN NICOLAS",
		"nivel": 5.0,
		"padre": "2012"
	}, {
		"id": 3263.0,
		"nombre": "AMPLIACION SAN PABLO DE LAS SALINAS II",
		"nivel": 5.0,
		"padre": "2069"
	}, {
		"id": 3101.0,
		"nombre": "AMPLIACION SANTA ANITA 1",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3725.0,
		"nombre": "AMPLIACION SANTA CATARINA",
		"nivel": 5.0,
		"padre": "2197"
	}, {
		"id": 3368.0,
		"nombre": "AMPLIACION SANTA CECILIA",
		"nivel": 5.0,
		"padre": "2092"
	}, {
		"id": 3050.0,
		"nombre": "AMPLIACION SANTA CRUZ ACALPIXCA",
		"nivel": 5.0,
		"padre": "2014"
	}, {
		"id": 3107.0,
		"nombre": "AMPLIACION SANTA MARIA 1",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3073.0,
		"nombre": "AMPLIACION SATELITE 2 (ECHEGARAY)",
		"nivel": 5.0,
		"padre": "2020"
	}, {
		"id": 3670.0,
		"nombre": "AMPLIACION SAUCES",
		"nivel": 5.0,
		"padre": "2181"
	}, {
		"id": 3084.0,
		"nombre": "AMPLIACION SOLARES",
		"nivel": 5.0,
		"padre": "2024"
	}, {
		"id": 3095.0,
		"nombre": "AMPLIACION SOLARES (FASE 2)",
		"nivel": 5.0,
		"padre": "2027"
	}, {
		"id": 3461.0,
		"nombre": "AMPLIACION SOLEDAD",
		"nivel": 5.0,
		"padre": "2120"
	}, {
		"id": 3459.0,
		"nombre": "AMPLIACION SOLEDAD 2",
		"nivel": 5.0,
		"padre": "2120"
	}, {
		"id": 3493.0,
		"nombre": "AMPLIACION TARIMOYA",
		"nivel": 5.0,
		"padre": "2131"
	}, {
		"id": 3495.0,
		"nombre": "AMPLIACION TARIMOYA 2",
		"nivel": 5.0,
		"padre": "2131"
	}, {
		"id": 3545.0,
		"nombre": "AMPLIACION TEJALPA",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3541.0,
		"nombre": "AMPLIACION TEMIXCO 2",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3257.0,
		"nombre": "AMPLIACION TENERIAS",
		"nivel": 5.0,
		"padre": "2066"
	}, {
		"id": 3254.0,
		"nombre": "AMPLIACION TENERIAS 3",
		"nivel": 5.0,
		"padre": "2066"
	}, {
		"id": 3693.0,
		"nombre": "AMPLIACION TEPALCAPA",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3699.0,
		"nombre": "AMPLIACION TEPOJACO 2",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3096.0,
		"nombre": "AMPLIACION TESISTAN",
		"nivel": 5.0,
		"padre": "2027"
	}, {
		"id": 3129.0,
		"nombre": "AMPLIACION TEXCOCO 1",
		"nivel": 5.0,
		"padre": "2035"
	}, {
		"id": 3126.0,
		"nombre": "AMPLIACION TEXCOCO 2",
		"nivel": 5.0,
		"padre": "2035"
	}, {
		"id": 3128.0,
		"nombre": "AMPLIACION TEXCOCO 3",
		"nivel": 5.0,
		"padre": "2035"
	}, {
		"id": 3208.0,
		"nombre": "AMPLIACION TIERRA BLANCA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3199.0,
		"nombre": "AMPLIACION TIERRA BLANCA 2",
		"nivel": 5.0,
		"padre": "2206"
	}, {
		"id": 3416.0,
		"nombre": "AMPLIACION TIERRA BUENA",
		"nivel": 5.0,
		"padre": "2104"
	}, {
		"id": 3521.0,
		"nombre": "AMPLIACION TONALA",
		"nivel": 5.0,
		"padre": "2136"
	}, {
		"id": 3520.0,
		"nombre": "AMPLIACION TONALA II",
		"nivel": 5.0,
		"padre": "2136"
	}, {
		"id": 3711.0,
		"nombre": "AMPLIACION TULANCINGO 1",
		"nivel": 5.0,
		"padre": "2192"
	}, {
		"id": 3709.0,
		"nombre": "AMPLIACION TULANCINGO 2",
		"nivel": 5.0,
		"padre": "2192"
	}, {
		"id": 3712.0,
		"nombre": "AMPLIACION TULANCINGO 3",
		"nivel": 5.0,
		"padre": "2192"
	}, {
		"id": 3710.0,
		"nombre": "AMPLIACION TULANCINGO 4",
		"nivel": 5.0,
		"padre": "2192"
	}, {
		"id": 3272.0,
		"nombre": "AMPLIACION TULPETLAC 1",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3273.0,
		"nombre": "AMPLIACION TULPETLAC 2",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3474.0,
		"nombre": "AMPLIACION UDLA",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3475.0,
		"nombre": "AMPLIACION UDLA 2",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3476.0,
		"nombre": "AMPLIACION UDLA 3",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3477.0,
		"nombre": "AMPLIACION UDLA 4",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3482.0,
		"nombre": "AMPLIACION UDLA 5",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3479.0,
		"nombre": "AMPLIACION UDLA 6",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3481.0,
		"nombre": "AMPLIACION UDLA 7",
		"nivel": 5.0,
		"padre": "2124"
	}, {
		"id": 3016.0,
		"nombre": "AMPLIACION UMAN",
		"nivel": 5.0,
		"padre": "2004"
	}, {
		"id": 3137.0,
		"nombre": "AMPLIACION VALDIVIA",
		"nivel": 5.0,
		"padre": "2037"
	}, {
		"id": 3138.0,
		"nombre": "AMPLIACION VALDIVIA 2",
		"nivel": 5.0,
		"padre": "2037"
	}, {
		"id": 3406.0,
		"nombre": "AMPLIACION VALLE DE HUAJUCO",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3173.0,
		"nombre": "AMPLIACION VALLE DE HUINALA",
		"nivel": 5.0,
		"padre": "2049"
	}, {
		"id": 3667.0,
		"nombre": "AMPLIACION VALLE DE SANTIAGO",
		"nivel": 5.0,
		"padre": "2179"
	}, {
		"id": 3337.0,
		"nombre": "AMPLIACION VALLE VERDE",
		"nivel": 5.0,
		"padre": "2083"
	}, {
		"id": 3123.0,
		"nombre": "AMPLIACION VALSEQUILLO",
		"nivel": 5.0,
		"padre": "2034"
	}, {
		"id": 3294.0,
		"nombre": "AMPLIACION VENUSTIANO CARRANZA",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3305.0,
		"nombre": "AMPLIACION VENUSTIANO CARRANZA 2",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3414.0,
		"nombre": "AMPLIACION VILLA MITRAS",
		"nivel": 5.0,
		"padre": "2103"
	}, {
		"id": 3399.0,
		"nombre": "AMPLIACION VILLA MITRAS (FASE 2)",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3140.0,
		"nombre": "AMPLIACION VILLA VERDE",
		"nivel": 5.0,
		"padre": "2038"
	}, {
		"id": 3141.0,
		"nombre": "AMPLIACION VILLA VERDE 2",
		"nivel": 5.0,
		"padre": "2038"
	}, {
		"id": 3700.0,
		"nombre": "AMPLIACION VILLAS DEL ALAMO",
		"nivel": 5.0,
		"padre": "2189"
	}, {
		"id": 3701.0,
		"nombre": "AMPLIACION VILLAS DEL ALAMO 2",
		"nivel": 5.0,
		"padre": "2189"
	}, {
		"id": 3540.0,
		"nombre": "AMPLIACION XOCHITEPEC",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3543.0,
		"nombre": "AMPLIACION XOCHITEPEC 2",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3542.0,
		"nombre": "AMPLIACION XOCHITEPEC 3",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3327.0,
		"nombre": "AMPLIACION ZERTUCHE",
		"nivel": 5.0,
		"padre": "2081"
	}, {
		"id": 3400.0,
		"nombre": "AMPLIACION ZERTUCHE (FASE 2)",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3187.0,
		"nombre": "AMPLIACION ZINACANTEPEC 1",
		"nivel": 5.0,
		"padre": "2052"
	}, {
		"id": 3185.0,
		"nombre": "AMPLIACION ZINACANTEPEC 2",
		"nivel": 5.0,
		"padre": "2052"
	}, {
		"id": 3188.0,
		"nombre": "AMPLIACION ZINACANTEPEC 3",
		"nivel": 5.0,
		"padre": "2052"
	}, {
		"id": 3175.0,
		"nombre": "ANAHUAC",
		"nivel": 5.0,
		"padre": "2050"
	}, {
		"id": 3210.0,
		"nombre": "ANZURES 1",
		"nivel": 5.0,
		"padre": "2057"
	}, {
		"id": 3163.0,
		"nombre": "ANZURES 2",
		"nivel": 5.0,
		"padre": "2046"
	}, {
		"id": 3562.0,
		"nombre": "APATLACO",
		"nivel": 5.0,
		"padre": "2142"
	}, {
		"id": 3075.0,
		"nombre": "APODACA",
		"nivel": 5.0,
		"padre": "2022"
	}, {
		"id": 3485.0,
		"nombre": "AQUILES SERDAN",
		"nivel": 5.0,
		"padre": "2127"
	}, {
		"id": 3192.0,
		"nombre": "ARAGON 1",
		"nivel": 5.0,
		"padre": "2054"
	}, {
		"id": 3193.0,
		"nombre": "ARAGON 2",
		"nivel": 5.0,
		"padre": "2054"
	}, {
		"id": 3068.0,
		"nombre": "ARBOLEDAS",
		"nivel": 5.0,
		"padre": "2020"
	}, {
		"id": 3225.0,
		"nombre": "ARCOS DE VALLARTA",
		"nivel": 5.0,
		"padre": "2061"
	}, {
		"id": 3719.0,
		"nombre": "ARCOS DEL SOL",
		"nivel": 5.0,
		"padre": "2196"
	}, {
		"id": 3149.0,
		"nombre": "ARCOS DEL SUR",
		"nivel": 5.0,
		"padre": "2041"
	}, {
		"id": 3398.0,
		"nombre": "ARGENTINA",
		"nivel": 5.0,
		"padre": "2101"
	}, {
		"id": 3514.0,
		"nombre": "ARROYO BLANCO",
		"nivel": 5.0,
		"padre": "2134"
	}, {
		"id": 3569.0,
		"nombre": "ASTURIAS",
		"nivel": 5.0,
		"padre": "2145"
	}, {
		"id": 3197.0,
		"nombre": "ATLACOMULCO",
		"nivel": 5.0,
		"padre": "2055"
	}, {
		"id": 3655.0,
		"nombre": "AVIACION",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3161.0,
		"nombre": "AZCAPOTZALCO",
		"nivel": 5.0,
		"padre": "2045"
	}, {
		"id": 3581.0,
		"nombre": "BELLAVISTA",
		"nivel": 5.0,
		"padre": "2148"
	}, {
		"id": 3574.0,
		"nombre": "BENITO JUAREZ 1",
		"nivel": 5.0,
		"padre": "2146"
	}, {
		"id": 3575.0,
		"nombre": "BENITO JUAREZ 2",
		"nivel": 5.0,
		"padre": "2146"
	}, {
		"id": 3042.0,
		"nombre": "BERNABE",
		"nivel": 5.0,
		"padre": "2011"
	}, {
		"id": 3492.0,
		"nombre": "BOCA DEL RIO",
		"nivel": 5.0,
		"padre": "2130"
	}, {
		"id": 3229.0,
		"nombre": "BOCANEGRA",
		"nivel": 5.0,
		"padre": "2063"
	}, {
		"id": 3009.0,
		"nombre": "BOJORQUEZ",
		"nivel": 5.0,
		"padre": "2003"
	}, {
		"id": 3470.0,
		"nombre": "BOLIVAR",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3620.0,
		"nombre": "BOSQUE REAL",
		"nivel": 5.0,
		"padre": "2164"
	}, {
		"id": 3311.0,
		"nombre": "BOSQUE URBANO",
		"nivel": 5.0,
		"padre": "2078"
	}, {
		"id": 3424.0,
		"nombre": "BOSQUES",
		"nivel": 5.0,
		"padre": "2105"
	}, {
		"id": 3117.0,
		"nombre": "BOSQUES AMALUCAN",
		"nivel": 5.0,
		"padre": "2033"
	}, {
		"id": 3628.0,
		"nombre": "BOSQUES DE LAS LOMAS",
		"nivel": 5.0,
		"padre": "2166"
	}, {
		"id": 3355.0,
		"nombre": "BRISAS DEL GOLFO",
		"nivel": 5.0,
		"padre": "2088"
	}, {
		"id": 3110.0,
		"nombre": "BUCERIAS",
		"nivel": 5.0,
		"padre": "2031"
	}, {
		"id": 3389.0,
		"nombre": "BUENOS AIRES",
		"nivel": 5.0,
		"padre": "2098"
	}, {
		"id": 3363.0,
		"nombre": "BUGANBILIAS_LEON",
		"nivel": 5.0,
		"padre": "2091"
	}, {
		"id": 3194.0,
		"nombre": "CABEZA DE JUAREZ",
		"nivel": 5.0,
		"padre": "2055"
	}, {
		"id": 3330.0,
		"nombre": "CADEREYTA",
		"nivel": 5.0,
		"padre": "2081"
	}, {
		"id": 3516.0,
		"nombre": "CAFETALES",
		"nivel": 5.0,
		"padre": "2134"
	}, {
		"id": 3483.0,
		"nombre": "CALERAS",
		"nivel": 5.0,
		"padre": "2125"
	}, {
		"id": 3380.0,
		"nombre": "CAMPANARIO",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3447.0,
		"nombre": "CAMPESTRE",
		"nivel": 5.0,
		"padre": "2116"
	}, {
		"id": 3381.0,
		"nombre": "CAMPO BELLO",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3364.0,
		"nombre": "CANADA DEL REFUGIO",
		"nivel": 5.0,
		"padre": "2091"
	}, {
		"id": 3282.0,
		"nombre": "CANTERAS",
		"nivel": 5.0,
		"padre": "2073"
	}, {
		"id": 3613.0,
		"nombre": "CARLOS AMAYA",
		"nivel": 5.0,
		"padre": "2162"
	}, {
		"id": 3491.0,
		"nombre": "CARRANZA",
		"nivel": 5.0,
		"padre": "2130"
	}, {
		"id": 3281.0,
		"nombre": "CARRETERA NACIONAL",
		"nivel": 5.0,
		"padre": "2073"
	}, {
		"id": 3642.0,
		"nombre": "CARTAGENA",
		"nivel": 5.0,
		"padre": "2170"
	}, {
		"id": 3014.0,
		"nombre": "CAUCEL",
		"nivel": 5.0,
		"padre": "2004"
	}, {
		"id": 3362.0,
		"nombre": "CAÑADA DEL REFUGIO",
		"nivel": 5.0,
		"padre": "2091"
	}, {
		"id": 3427.0,
		"nombre": "CELAYA 1",
		"nivel": 5.0,
		"padre": "2106"
	}, {
		"id": 3428.0,
		"nombre": "CELAYA 2",
		"nivel": 5.0,
		"padre": "2106"
	}, {
		"id": 3429.0,
		"nombre": "CELAYA 3",
		"nivel": 5.0,
		"padre": "2106"
	}, {
		"id": 3036.0,
		"nombre": "CENTENARIO 1",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3035.0,
		"nombre": "CENTENARIO 2",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3608.0,
		"nombre": "CERRO COLORADO",
		"nivel": 5.0,
		"padre": "2160"
	}, {
		"id": 3215.0,
		"nombre": "CERRO DE LA ESTRELLA",
		"nivel": 5.0,
		"padre": "2058"
	}, {
		"id": 3324.0,
		"nombre": "CERRO DE LA SILLA",
		"nivel": 5.0,
		"padre": "2080"
	}, {
		"id": 3274.0,
		"nombre": "CERRO GORDO",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3166.0,
		"nombre": "CEYLAN",
		"nivel": 5.0,
		"padre": "2047"
	}, {
		"id": 3269.0,
		"nombre": "CHAMIZAL",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3109.0,
		"nombre": "CHAPALA",
		"nivel": 5.0,
		"padre": "2030"
	}, {
		"id": 3002.0,
		"nombre": "CHEMUYIL",
		"nivel": 5.0,
		"padre": "2002"
	}, {
		"id": 3382.0,
		"nombre": "CHIHUAHUA",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3275.0,
		"nombre": "CHIMALHUACAN",
		"nivel": 5.0,
		"padre": "2072"
	}, {
		"id": 3125.0,
		"nombre": "CHINCONCUAC",
		"nivel": 5.0,
		"padre": "2035"
	}, {
		"id": 3287.0,
		"nombre": "CHIPINQUE",
		"nivel": 5.0,
		"padre": "2074"
	}, {
		"id": 3253.0,
		"nombre": "CIBELES",
		"nivel": 5.0,
		"padre": "2066"
	}, {
		"id": 3266.0,
		"nombre": "CIUDAD AZTECA",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3584.0,
		"nombre": "CIUDAD BRISA",
		"nivel": 5.0,
		"padre": "2149"
	}, {
		"id": 3167.0,
		"nombre": "CLAVERIA",
		"nivel": 5.0,
		"padre": "2047"
	}, {
		"id": 3258.0,
		"nombre": "COACALCO",
		"nivel": 5.0,
		"padre": "2067"
	}, {
		"id": 3051.0,
		"nombre": "COAPA",
		"nivel": 5.0,
		"padre": "2015"
	}, {
		"id": 3449.0,
		"nombre": "COLINAS DEL PARQUE",
		"nivel": 5.0,
		"padre": "2117"
	}, {
		"id": 3026.0,
		"nombre": "CONDESA",
		"nivel": 5.0,
		"padre": "2008"
	}, {
		"id": 3245.0,
		"nombre": "CONSTITUCION DE 1917",
		"nivel": 5.0,
		"padre": "2065"
	}, {
		"id": 3383.0,
		"nombre": "CONSTITUYENTES",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3558.0,
		"nombre": "COSTA AZUL",
		"nivel": 5.0,
		"padre": "2141"
	}, {
		"id": 3489.0,
		"nombre": "COSTA VERDE",
		"nivel": 5.0,
		"padre": "2129"
	}, {
		"id": 3025.0,
		"nombre": "COYOACAN / SAN ANGEL",
		"nivel": 5.0,
		"padre": "2007"
	}, {
		"id": 3022.0,
		"nombre": "COYOACAN 1",
		"nivel": 5.0,
		"padre": "2007"
	}, {
		"id": 3159.0,
		"nombre": "COYOACAN 2",
		"nivel": 5.0,
		"padre": "2044"
	}, {
		"id": 3502.0,
		"nombre": "COYOL",
		"nivel": 5.0,
		"padre": "2132"
	}, {
		"id": 3623.0,
		"nombre": "CUAJIMALPA",
		"nivel": 5.0,
		"padre": "2165"
	}, {
		"id": 3665.0,
		"nombre": "CUAUTITLAN",
		"nivel": 5.0,
		"padre": "2178"
	}, {
		"id": 3230.0,
		"nombre": "CUAUTLA",
		"nivel": 5.0,
		"padre": "2063"
	}, {
		"id": 3488.0,
		"nombre": "CUAUTLANCINGO",
		"nivel": 5.0,
		"padre": "2128"
	}, {
		"id": 3547.0,
		"nombre": "CUERNAVACA 1",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3548.0,
		"nombre": "CUERNAVACA 2",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3549.0,
		"nombre": "CUERNAVACA 3",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3216.0,
		"nombre": "CULHUACAN",
		"nivel": 5.0,
		"padre": "2058"
	}, {
		"id": 3412.0,
		"nombre": "CUMBRES",
		"nivel": 5.0,
		"padre": "2103"
	}, {
		"id": 3352.0,
		"nombre": "CUMBRES SANTA FE - BASALTO",
		"nivel": 5.0,
		"padre": "2086"
	}, {
		"id": 3017.0,
		"nombre": "DEL VALLE",
		"nivel": 5.0,
		"padre": "2005"
	}, {
		"id": 3019.0,
		"nombre": "DEL VALLE / NAPOLES",
		"nivel": 5.0,
		"padre": "2005"
	}, {
		"id": 3285.0,
		"nombre": "DEL VALLE MTY",
		"nivel": 5.0,
		"padre": "2074"
	}, {
		"id": 3354.0,
		"nombre": "DIAZ ORDAZ",
		"nivel": 5.0,
		"padre": "2087"
	}, {
		"id": 3717.0,
		"nombre": "DIGITAL",
		"nivel": 5.0,
		"padre": "2195"
	}, {
		"id": 3718.0,
		"nombre": "DOMINIO CUMBRES",
		"nivel": 5.0,
		"padre": "2196"
	}, {
		"id": 3003.0,
		"nombre": "DONCELES",
		"nivel": 5.0,
		"padre": "2002"
	}, {
		"id": 3610.0,
		"nombre": "DOS MIL",
		"nivel": 5.0,
		"padre": "2161"
	}, {
		"id": 3174.0,
		"nombre": "DULCES NOMBRES",
		"nivel": 5.0,
		"padre": "2049"
	}, {
		"id": 3682.0,
		"nombre": "EDUARDO MOLINA",
		"nivel": 5.0,
		"padre": "2187"
	}, {
		"id": 3145.0,
		"nombre": "EL CID",
		"nivel": 5.0,
		"padre": "2039"
	}, {
		"id": 3425.0,
		"nombre": "EL COBANO",
		"nivel": 5.0,
		"padre": "2105"
	}, {
		"id": 3224.0,
		"nombre": "EL ROSARIO",
		"nivel": 5.0,
		"padre": "2061"
	}, {
		"id": 3276.0,
		"nombre": "EL SALADO",
		"nivel": 5.0,
		"padre": "2072"
	}, {
		"id": 3515.0,
		"nombre": "EL TREBOL",
		"nivel": 5.0,
		"padre": "2134"
	}, {
		"id": 3615.0,
		"nombre": "EL VERGEL",
		"nivel": 5.0,
		"padre": "2163"
	}, {
		"id": 3133.0,
		"nombre": "EL ZALATE",
		"nivel": 5.0,
		"padre": "2036"
	}, {
		"id": 3076.0,
		"nombre": "ENRAMADA",
		"nivel": 5.0,
		"padre": "2022"
	}, {
		"id": 3027.0,
		"nombre": "ESCANDON",
		"nivel": 5.0,
		"padre": "2008"
	}, {
		"id": 3277.0,
		"nombre": "ESPERANZA",
		"nivel": 5.0,
		"padre": "2072"
	}, {
		"id": 3601.0,
		"nombre": "ESTADIO",
		"nivel": 5.0,
		"padre": "2157"
	}, {
		"id": 11732.0,
		"nombre": "Ejemplo",
		"nivel": 5.0,
		"padre": "2134"
	}, {
		"id": 3669.0,
		"nombre": "FAJA DE ORO",
		"nivel": 5.0,
		"padre": "2180"
	}, {
		"id": 3314.0,
		"nombre": "FERROCARRIL LAGUNA",
		"nivel": 5.0,
		"padre": "2078"
	}, {
		"id": 3464.0,
		"nombre": "FERROCARRILERA",
		"nivel": 5.0,
		"padre": "2122"
	}, {
		"id": 3599.0,
		"nombre": "FLAMINGOS",
		"nivel": 5.0,
		"padre": "2157"
	}, {
		"id": 3607.0,
		"nombre": "FONTANA",
		"nivel": 5.0,
		"padre": "2159"
	}, {
		"id": 3644.0,
		"nombre": "FORTIN",
		"nivel": 5.0,
		"padre": "2171"
	}, {
		"id": 3504.0,
		"nombre": "FRAMBOYANES",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3734.0,
		"nombre": "FRANCISCO MONTEBELLO",
		"nivel": 5.0,
		"padre": "2204"
	}, {
		"id": 3639.0,
		"nombre": "FUENTES DEL VALLE",
		"nivel": 5.0,
		"padre": "2169"
	}, {
		"id": 3374.0,
		"nombre": "FUNDADORES",
		"nivel": 5.0,
		"padre": "2095"
	}, {
		"id": 3457.0,
		"nombre": "GALINDAS",
		"nivel": 5.0,
		"padre": "2119"
	}, {
		"id": 3080.0,
		"nombre": "GENERAL ESCOBEDO",
		"nivel": 5.0,
		"padre": "2023"
	}, {
		"id": 3391.0,
		"nombre": "GOMEZ MORIN",
		"nivel": 5.0,
		"padre": "2099"
	}, {
		"id": 3654.0,
		"nombre": "GONZALEZ ORTEGA",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3361.0,
		"nombre": "GRAN JARDIN",
		"nivel": 5.0,
		"padre": "2091"
	}, {
		"id": 3217.0,
		"nombre": "GRANJAS ESMERALDA",
		"nivel": 5.0,
		"padre": "2058"
	}, {
		"id": 3189.0,
		"nombre": "GRANJAS INDEPENDENCIA",
		"nivel": 5.0,
		"padre": "2053"
	}, {
		"id": 3426.0,
		"nombre": "GREMIAL",
		"nivel": 5.0,
		"padre": "2105"
	}, {
		"id": 3227.0,
		"nombre": "GUADALAJARA",
		"nivel": 5.0,
		"padre": "2062"
	}, {
		"id": 3530.0,
		"nombre": "GUADALAJARA II",
		"nivel": 5.0,
		"padre": "2137"
	}, {
		"id": 3325.0,
		"nombre": "GUADALUPE",
		"nivel": 5.0,
		"padre": "2080"
	}, {
		"id": 3681.0,
		"nombre": "GUADALUPE DEL MORAL",
		"nivel": 5.0,
		"padre": "2187"
	}, {
		"id": 3435.0,
		"nombre": "GUANAJUATO CAPITAL",
		"nivel": 5.0,
		"padre": "2109"
	}, {
		"id": 3421.0,
		"nombre": "HACIENDA",
		"nivel": 5.0,
		"padre": "2104"
	}, {
		"id": 3651.0,
		"nombre": "HACIENDA REAL",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3099.0,
		"nombre": "HACIENDA SANTA FE",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3097.0,
		"nombre": "HACIENDA SANTA FE (FASE 2)",
		"nivel": 5.0,
		"padre": "2028"
	}, {
		"id": 3234.0,
		"nombre": "HEROES",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3318.0,
		"nombre": "HEROES TECAMAC I",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3316.0,
		"nombre": "HEROES TECAMAC II",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3214.0,
		"nombre": "HERRADURA",
		"nivel": 5.0,
		"padre": "2057"
	}, {
		"id": 3118.0,
		"nombre": "HISTORIADORES",
		"nivel": 5.0,
		"padre": "2033"
	}, {
		"id": 3727.0,
		"nombre": "HUEHUETOCA",
		"nivel": 5.0,
		"padre": "2199"
	}, {
		"id": 3471.0,
		"nombre": "HUERTA REAL",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3203.0,
		"nombre": "HUMAYA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3685.0,
		"nombre": "IGNACIO ZARAGOZA",
		"nivel": 5.0,
		"padre": "2187"
	}, {
		"id": 3334.0,
		"nombre": "INDEPENDENCIA",
		"nivel": 5.0,
		"padre": "2082"
	}, {
		"id": 3312.0,
		"nombre": "INFANTERIA",
		"nivel": 5.0,
		"padre": "2078"
	}, {
		"id": 3135.0,
		"nombre": "INSURGENTES",
		"nivel": 5.0,
		"padre": "2037"
	}, {
		"id": 3048.0,
		"nombre": "INSURGENTES CUICUILCO",
		"nivel": 5.0,
		"padre": "2013"
	}, {
		"id": 3144.0,
		"nombre": "ISLA LA PIEDRA",
		"nivel": 5.0,
		"padre": "2039"
	}, {
		"id": 3066.0,
		"nombre": "IXTACALA",
		"nivel": 5.0,
		"padre": "2019"
	}, {
		"id": 3247.0,
		"nombre": "IXTLAHUACA",
		"nivel": 5.0,
		"padre": "2065"
	}, {
		"id": 3635.0,
		"nombre": "IZCALLI 1",
		"nivel": 5.0,
		"padre": "2168"
	}, {
		"id": 3636.0,
		"nombre": "IZCALLI 2",
		"nivel": 5.0,
		"padre": "2168"
	}, {
		"id": 3567.0,
		"nombre": "IZTACALCO",
		"nivel": 5.0,
		"padre": "2144"
	}, {
		"id": 3430.0,
		"nombre": "JACARANDAS",
		"nivel": 5.0,
		"padre": "2106"
	}, {
		"id": 3321.0,
		"nombre": "JARDINES DE MORELOS",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3358.0,
		"nombre": "JARDINES DE SAN FRANCISCO",
		"nivel": 5.0,
		"padre": "2090"
	}, {
		"id": 3151.0,
		"nombre": "JARDINES DE SANTIAGO",
		"nivel": 5.0,
		"padre": "2041"
	}, {
		"id": 3618.0,
		"nombre": "JESUS DEL MONTE",
		"nivel": 5.0,
		"padre": "2164"
	}, {
		"id": 3423.0,
		"nombre": "JESUS MARIA",
		"nivel": 5.0,
		"padre": "2105"
	}, {
		"id": 3536.0,
		"nombre": "JIUTEPEC",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3458.0,
		"nombre": "JURICA",
		"nivel": 5.0,
		"padre": "2119"
	}, {
		"id": 3379.0,
		"nombre": "JUVENTUD",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3377.0,
		"nombre": "JUVENTUD (FASE 2)",
		"nivel": 5.0,
		"padre": "2096"
	}, {
		"id": 3008.0,
		"nombre": "KABAH",
		"nivel": 5.0,
		"padre": "2002"
	}, {
		"id": 3079.0,
		"nombre": "KATAVIA",
		"nivel": 5.0,
		"padre": "2023"
	}, {
		"id": 3011.0,
		"nombre": "KUKULCAN",
		"nivel": 5.0,
		"padre": "2003"
	}, {
		"id": 3200.0,
		"nombre": "LA CAMPINA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3722.0,
		"nombre": "LA FAMA",
		"nivel": 5.0,
		"padre": "2197"
	}, {
		"id": 3408.0,
		"nombre": "LA FAMA (FASE 2)",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3708.0,
		"nombre": "LA FLORESTA",
		"nivel": 5.0,
		"padre": "2192"
	}, {
		"id": 3067.0,
		"nombre": "LA HACIENDA",
		"nivel": 5.0,
		"padre": "2020"
	}, {
		"id": 3291.0,
		"nombre": "LA NOGALERA",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3315.0,
		"nombre": "LA ROSITA",
		"nivel": 5.0,
		"padre": "2078"
	}, {
		"id": 3103.0,
		"nombre": "LA TIJERA",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3487.0,
		"nombre": "LA VISTA",
		"nivel": 5.0,
		"padre": "2127"
	}, {
		"id": 3397.0,
		"nombre": "LAGRANGE",
		"nivel": 5.0,
		"padre": "2101"
	}, {
		"id": 3240.0,
		"nombre": "LAGUNA",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3290.0,
		"nombre": "LANDIN",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3349.0,
		"nombre": "LAS AGUILAS/CENTENARIO",
		"nivel": 5.0,
		"padre": "2086"
	}, {
		"id": 3582.0,
		"nombre": "LAS ALAMEDAS",
		"nivel": 5.0,
		"padre": "2148"
	}, {
		"id": 3231.0,
		"nombre": "LAS AMERICAS",
		"nivel": 5.0,
		"padre": "2063"
	}, {
		"id": 3071.0,
		"nombre": "LAS ARMAS",
		"nivel": 5.0,
		"padre": "2020"
	}, {
		"id": 3702.0,
		"nombre": "LAS CRUCES",
		"nivel": 5.0,
		"padre": "2189"
	}, {
		"id": 3590.0,
		"nombre": "LAS HUERTAS",
		"nivel": 5.0,
		"padre": "2149"
	}, {
		"id": 3525.0,
		"nombre": "LAS JUNTAS",
		"nivel": 5.0,
		"padre": "2137"
	}, {
		"id": 3462.0,
		"nombre": "LAS MERCEDES",
		"nivel": 5.0,
		"padre": "2121"
	}, {
		"id": 3528.0,
		"nombre": "LAS PINTAS",
		"nivel": 5.0,
		"padre": "2137"
	}, {
		"id": 3420.0,
		"nombre": "LAZARO CARDENAS",
		"nivel": 5.0,
		"padre": "2104"
	}, {
		"id": 3164.0,
		"nombre": "LEGARIA",
		"nivel": 5.0,
		"padre": "2046"
	}, {
		"id": 3307.0,
		"nombre": "LERDO",
		"nivel": 5.0,
		"padre": "2077"
	}, {
		"id": 3671.0,
		"nombre": "LERMA",
		"nivel": 5.0,
		"padre": "2182"
	}, {
		"id": 3134.0,
		"nombre": "LIBERTAD",
		"nivel": 5.0,
		"padre": "2036"
	}, {
		"id": 3057.0,
		"nombre": "LINDAVISTA",
		"nivel": 5.0,
		"padre": "2017"
	}, {
		"id": 3104.0,
		"nombre": "LOMA BONITA",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3619.0,
		"nombre": "LOMAS COUNTRY CLUB",
		"nivel": 5.0,
		"padre": "2164"
	}, {
		"id": 3486.0,
		"nombre": "LOMAS DE ANGELOPOLIS",
		"nivel": 5.0,
		"padre": "2127"
	}, {
		"id": 3211.0,
		"nombre": "LOMAS DE CHAPULTEPEC",
		"nivel": 5.0,
		"padre": "2057"
	}, {
		"id": 3392.0,
		"nombre": "LOMAS DE MORELOS",
		"nivel": 5.0,
		"padre": "2099"
	}, {
		"id": 3609.0,
		"nombre": "LOMAS DE VIRREY",
		"nivel": 5.0,
		"padre": "2160"
	}, {
		"id": 3090.0,
		"nombre": "LOMAS DE ZAPOPAN",
		"nivel": 5.0,
		"padre": "2025"
	}, {
		"id": 3498.0,
		"nombre": "LOMAS DEL RIO",
		"nivel": 5.0,
		"padre": "2131"
	}, {
		"id": 3585.0,
		"nombre": "LOMAS VERDES",
		"nivel": 5.0,
		"padre": "2149"
	}, {
		"id": 3306.0,
		"nombre": "LOS ANGELES",
		"nivel": 5.0,
		"padre": "2077"
	}, {
		"id": 3394.0,
		"nombre": "LOS CIPRESES",
		"nivel": 5.0,
		"padre": "2100"
	}, {
		"id": 3331.0,
		"nombre": "LOS ENCINOS",
		"nivel": 5.0,
		"padre": "2081"
	}, {
		"id": 3122.0,
		"nombre": "LOS FRAILES",
		"nivel": 5.0,
		"padre": "2034"
	}, {
		"id": 3439.0,
		"nombre": "LOS FRESNOS",
		"nivel": 5.0,
		"padre": "2113"
	}, {
		"id": 3119.0,
		"nombre": "LOS FUERTES",
		"nivel": 5.0,
		"padre": "2033"
	}, {
		"id": 3443.0,
		"nombre": "LOS NARANJOS",
		"nivel": 5.0,
		"padre": "2114"
	}, {
		"id": 3572.0,
		"nombre": "LOS REYES ACAQUILPAN",
		"nivel": 5.0,
		"padre": "2146"
	}, {
		"id": 3606.0,
		"nombre": "MAGISTERIAL",
		"nivel": 5.0,
		"padre": "2159"
	}, {
		"id": 3116.0,
		"nombre": "MALECON",
		"nivel": 5.0,
		"padre": "2032"
	}, {
		"id": 3676.0,
		"nombre": "MALINALCO",
		"nivel": 5.0,
		"padre": "2183"
	}, {
		"id": 3232.0,
		"nombre": "MANANTIALES",
		"nivel": 5.0,
		"padre": "2063"
	}, {
		"id": 3723.0,
		"nombre": "MANUEL CLOUTHIER",
		"nivel": 5.0,
		"padre": "2197"
	}, {
		"id": 3195.0,
		"nombre": "MARAVILLAS",
		"nivel": 5.0,
		"padre": "2055"
	}, {
		"id": 3113.0,
		"nombre": "MARINA",
		"nivel": 5.0,
		"padre": "2032"
	}, {
		"id": 3384.0,
		"nombre": "MARMOL",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3605.0,
		"nombre": "MATAMOROS",
		"nivel": 5.0,
		"padre": "2158"
	}, {
		"id": 3736.0,
		"nombre": "MAVIRI",
		"nivel": 5.0,
		"padre": "2205"
	}, {
		"id": 3010.0,
		"nombre": "MAYAPAN",
		"nivel": 5.0,
		"padre": "2003"
	}, {
		"id": 3147.0,
		"nombre": "MAYORAZGO",
		"nivel": 5.0,
		"padre": "2040"
	}, {
		"id": 3616.0,
		"nombre": "MAYORCA",
		"nivel": 5.0,
		"padre": "2163"
	}, {
		"id": 3661.0,
		"nombre": "MELCHOR OCAMPO",
		"nivel": 5.0,
		"padre": "2175"
	}, {
		"id": 3647.0,
		"nombre": "MENDOZA",
		"nivel": 5.0,
		"padre": "2172"
	}, {
		"id": 3179.0,
		"nombre": "METEPEC",
		"nivel": 5.0,
		"padre": "2051"
	}, {
		"id": 3419.0,
		"nombre": "MEXIQUITO",
		"nivel": 5.0,
		"padre": "2104"
	}, {
		"id": 3226.0,
		"nombre": "MEZQUITAN",
		"nivel": 5.0,
		"padre": "2062"
	}, {
		"id": 3353.0,
		"nombre": "MIGUEL ALEMAN",
		"nivel": 5.0,
		"padre": "2087"
	}, {
		"id": 3438.0,
		"nombre": "MIGUEL HIDALGO",
		"nivel": 5.0,
		"padre": "2112"
	}, {
		"id": 3705.0,
		"nombre": "MINERAL DE LA REFORMA",
		"nivel": 5.0,
		"padre": "2190"
	}, {
		"id": 3385.0,
		"nombre": "MIRADOR",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3176.0,
		"nombre": "MIRAFLORES",
		"nivel": 5.0,
		"padre": "2050"
	}, {
		"id": 3155.0,
		"nombre": "MIRAMONTES",
		"nivel": 5.0,
		"padre": "2042"
	}, {
		"id": 3293.0,
		"nombre": "MIRASIERRA",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3221.0,
		"nombre": "MIRASOLES",
		"nivel": 5.0,
		"padre": "2059"
	}, {
		"id": 3529.0,
		"nombre": "MIRAVALLE",
		"nivel": 5.0,
		"padre": "2137"
	}, {
		"id": 3021.0,
		"nombre": "MIXCOAC/PORTALES",
		"nivel": 5.0,
		"padre": "2007"
	}, {
		"id": 3733.0,
		"nombre": "MONTEJO",
		"nivel": 5.0,
		"padre": "2203"
	}, {
		"id": 3472.0,
		"nombre": "MORALES CAMPESTRE",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3583.0,
		"nombre": "MUNDO E",
		"nivel": 5.0,
		"padre": "2148"
	}, {
		"id": 3308.0,
		"nombre": "MUSEO ACERTIJO",
		"nivel": 5.0,
		"padre": "2077"
	}, {
		"id": 3313.0,
		"nombre": "MUSEO DE LA LAGUNA",
		"nivel": 5.0,
		"padre": "2078"
	}, {
		"id": 3202.0,
		"nombre": "NAKAYAMA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3018.0,
		"nombre": "NAPOLES",
		"nivel": 5.0,
		"padre": "2005"
	}, {
		"id": 3020.0,
		"nombre": "NARVARTE",
		"nivel": 5.0,
		"padre": "2006"
	}, {
		"id": 3280.0,
		"nombre": "NATIVITAS",
		"nivel": 5.0,
		"padre": "2072"
	}, {
		"id": 3688.0,
		"nombre": "NICOLAS ROMERO",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3617.0,
		"nombre": "NOGALES",
		"nivel": 5.0,
		"padre": "2163"
	}, {
		"id": 3299.0,
		"nombre": "NUEVA AURORA",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3004.0,
		"nombre": "NUEVO CALAKMUL",
		"nivel": 5.0,
		"padre": "2002"
	}, {
		"id": 3204.0,
		"nombre": "NUEVO CULIACAN",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3111.0,
		"nombre": "NUEVO VALLARTA",
		"nivel": 5.0,
		"padre": "2031"
	}, {
		"id": 3393.0,
		"nombre": "OASIS",
		"nivel": 5.0,
		"padre": "2099"
	}, {
		"id": 3284.0,
		"nombre": "OBISPADO",
		"nivel": 5.0,
		"padre": "2074"
	}, {
		"id": 3336.0,
		"nombre": "OBLATOS",
		"nivel": 5.0,
		"padre": "2082"
	}, {
		"id": 3632.0,
		"nombre": "OBSERVATORIO",
		"nivel": 5.0,
		"padre": "2167"
	}, {
		"id": 3683.0,
		"nombre": "OCEANIA",
		"nivel": 5.0,
		"padre": "2187"
	}, {
		"id": 3551.0,
		"nombre": "OCOTEPEC",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3320.0,
		"nombre": "OJO DE AGUA",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3039.0,
		"nombre": "OLIVARES",
		"nivel": 5.0,
		"padre": "2010"
	}, {
		"id": 3595.0,
		"nombre": "OTAY",
		"nivel": 5.0,
		"padre": "2154"
	}, {
		"id": 3319.0,
		"nombre": "OZUMBILLA",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3707.0,
		"nombre": "PACHUCA CENTRO",
		"nivel": 5.0,
		"padre": "2191"
	}, {
		"id": 3597.0,
		"nombre": "PACIFICO",
		"nivel": 5.0,
		"padre": "2155"
	}, {
		"id": 3249.0,
		"nombre": "PALMITAS",
		"nivel": 5.0,
		"padre": "2065"
	}, {
		"id": 3440.0,
		"nombre": "PALOMARES",
		"nivel": 5.0,
		"padre": "2113"
	}, {
		"id": 3196.0,
		"nombre": "PANTITLAN",
		"nivel": 5.0,
		"padre": "2055"
	}, {
		"id": 3450.0,
		"nombre": "PARQUE DEL ALAMO",
		"nivel": 5.0,
		"padre": "2117"
	}, {
		"id": 3310.0,
		"nombre": "PARQUE INDUSTRIAL",
		"nivel": 5.0,
		"padre": "2077"
	}, {
		"id": 3431.0,
		"nombre": "PARQUE VERDE",
		"nivel": 5.0,
		"padre": "2106"
	}, {
		"id": 3183.0,
		"nombre": "PARQUES NACIONALES",
		"nivel": 5.0,
		"padre": "2052"
	}, {
		"id": 3170.0,
		"nombre": "PASEO DE LOS ANGELES",
		"nivel": 5.0,
		"padre": "2049"
	}, {
		"id": 3592.0,
		"nombre": "PATRIA",
		"nivel": 5.0,
		"padre": "2151"
	}, {
		"id": 3596.0,
		"nombre": "PATRIA NUEVA",
		"nivel": 5.0,
		"padre": "2154"
	}, {
		"id": 3160.0,
		"nombre": "PEDREGAL",
		"nivel": 5.0,
		"padre": "2044"
	}, {
		"id": 3061.0,
		"nombre": "PELICANO 1",
		"nivel": 5.0,
		"padre": "2018"
	}, {
		"id": 3058.0,
		"nombre": "PELICANO 2",
		"nivel": 5.0,
		"padre": "2017"
	}, {
		"id": 3365.0,
		"nombre": "PENITAS",
		"nivel": 5.0,
		"padre": "2091"
	}, {
		"id": 3235.0,
		"nombre": "PENSIONES",
		"nivel": 5.0,
		"padre": "2064"
	}, {
		"id": 3451.0,
		"nombre": "PENUELAS",
		"nivel": 5.0,
		"padre": "2117"
	}, {
		"id": 3356.0,
		"nombre": "PETROLERA",
		"nivel": 5.0,
		"padre": "2088"
	}, {
		"id": 3146.0,
		"nombre": "PIEDRAS BLANCAS",
		"nivel": 5.0,
		"padre": "2039"
	}, {
		"id": 3732.0,
		"nombre": "PINO",
		"nivel": 5.0,
		"padre": "2203"
	}, {
		"id": 3001.0,
		"nombre": "PLAYA CENTRO",
		"nivel": 5.0,
		"padre": "2001"
	}, {
		"id": 3340.0,
		"nombre": "PLAYA HERMOSA",
		"nivel": 5.0,
		"padre": "2083"
	}, {
		"id": 3496.0,
		"nombre": "PLAYA LINDA",
		"nivel": 5.0,
		"padre": "2131"
	}, {
		"id": 3371.0,
		"nombre": "PLAYAS TIJUANA",
		"nivel": 5.0,
		"padre": "2093"
	}, {
		"id": 3735.0,
		"nombre": "PLAZA DORADA",
		"nivel": 5.0,
		"padre": "2204"
	}, {
		"id": 3212.0,
		"nombre": "POLANCO 1",
		"nivel": 5.0,
		"padre": "2057"
	}, {
		"id": 3563.0,
		"nombre": "PORTALES",
		"nivel": 5.0,
		"padre": "2143"
	}, {
		"id": 3233.0,
		"nombre": "PORTALES DE MORELIA",
		"nivel": 5.0,
		"padre": "2063"
	}, {
		"id": 3564.0,
		"nombre": "PORTALES NORTE",
		"nivel": 5.0,
		"padre": "2143"
	}, {
		"id": 3560.0,
		"nombre": "PRADO CHURUBUSCO",
		"nivel": 5.0,
		"padre": "2142"
	}, {
		"id": 3267.0,
		"nombre": "PRADOS XALOSTOC",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3692.0,
		"nombre": "PRESA DE GUADALUPE",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3633.0,
		"nombre": "PRESIDENTES",
		"nivel": 5.0,
		"padre": "2167"
	}, {
		"id": 3326.0,
		"nombre": "PROGRESO",
		"nivel": 5.0,
		"padre": "2080"
	}, {
		"id": 3106.0,
		"nombre": "PROVENZA",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3091.0,
		"nombre": "PROVIDENCIA",
		"nivel": 5.0,
		"padre": "2025"
	}, {
		"id": 3148.0,
		"nombre": "PUEBLA CENTRO",
		"nivel": 5.0,
		"padre": "2040"
	}, {
		"id": 3621.0,
		"nombre": "PUEBLO DE BOSQUE REAL",
		"nivel": 5.0,
		"padre": "2164"
	}, {
		"id": 3622.0,
		"nombre": "PUEBLO DE LA HERRADURA",
		"nivel": 5.0,
		"padre": "2164"
	}, {
		"id": 3656.0,
		"nombre": "PUEBLO NUEVO",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3631.0,
		"nombre": "PUEBLO SANTA FE 1",
		"nivel": 5.0,
		"padre": "2167"
	}, {
		"id": 3348.0,
		"nombre": "PUEBLO SANTA FE 2",
		"nivel": 5.0,
		"padre": "2086"
	}, {
		"id": 3087.0,
		"nombre": "PUERTA DE HIERRO",
		"nivel": 5.0,
		"padre": "2024"
	}, {
		"id": 3100.0,
		"nombre": "PUERTA SUR",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3098.0,
		"nombre": "PUERTA SUR (FASE 2)",
		"nivel": 5.0,
		"padre": "2028"
	}, {
		"id": 3006.0,
		"nombre": "PUERTO CANCUN",
		"nivel": 5.0,
		"padre": "2002"
	}, {
		"id": 3556.0,
		"nombre": "PUNTA DIAMANTE",
		"nivel": 5.0,
		"padre": "2141"
	}, {
		"id": 3112.0,
		"nombre": "PUNTA MITA",
		"nivel": 5.0,
		"padre": "2031"
	}, {
		"id": 3388.0,
		"nombre": "QUINTAS CAROLINA",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3081.0,
		"nombre": "QUINTO CENTENARIO",
		"nivel": 5.0,
		"padre": "2023"
	}, {
		"id": 3297.0,
		"nombre": "RAMOS ARIZPE",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3465.0,
		"nombre": "RANCHO BLANCO",
		"nivel": 5.0,
		"padre": "2122"
	}, {
		"id": 3445.0,
		"nombre": "REAL DE JEREZ",
		"nivel": 5.0,
		"padre": "2115"
	}, {
		"id": 3201.0,
		"nombre": "REAL DE MINA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3074.0,
		"nombre": "REAL DE PALMAS",
		"nivel": 5.0,
		"padre": "2021"
	}, {
		"id": 3086.0,
		"nombre": "REAL DE TESISTAN",
		"nivel": 5.0,
		"padre": "2024"
	}, {
		"id": 3373.0,
		"nombre": "REFUGIO",
		"nivel": 5.0,
		"padre": "2094"
	}, {
		"id": 3505.0,
		"nombre": "REVOLUCION",
		"nivel": 5.0,
		"padre": "2133"
	}, {
		"id": 3571.0,
		"nombre": "REY NEZA",
		"nivel": 5.0,
		"padre": "2146"
	}, {
		"id": 3083.0,
		"nombre": "RINCONADA COLONIAL",
		"nivel": 5.0,
		"padre": "2023"
	}, {
		"id": 3643.0,
		"nombre": "RIO BLANCO",
		"nivel": 5.0,
		"padre": "2171"
	}, {
		"id": 3455.0,
		"nombre": "RIO SAN JUAN",
		"nivel": 5.0,
		"padre": "2118"
	}, {
		"id": 3387.0,
		"nombre": "ROBINSON",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3028.0,
		"nombre": "ROMA 1",
		"nivel": 5.0,
		"padre": "2008"
	}, {
		"id": 3568.0,
		"nombre": "ROMA 2",
		"nivel": 5.0,
		"padre": "2145"
	}, {
		"id": 3344.0,
		"nombre": "ROSAMAR",
		"nivel": 5.0,
		"padre": "2084"
	}, {
		"id": 3598.0,
		"nombre": "ROSAS MAGALLON",
		"nivel": 5.0,
		"padre": "2156"
	}, {
		"id": 3603.0,
		"nombre": "SABINITO",
		"nivel": 5.0,
		"padre": "2157"
	}, {
		"id": 3032.0,
		"nombre": "SAHUARO",
		"nivel": 5.0,
		"padre": "2009"
	}, {
		"id": 3300.0,
		"nombre": "SALTILLO 2000",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3375.0,
		"nombre": "SALVATIERRA",
		"nivel": 5.0,
		"padre": "2095"
	}, {
		"id": 3023.0,
		"nombre": "SAN ANGEL",
		"nivel": 5.0,
		"padre": "2007"
	}, {
		"id": 3704.0,
		"nombre": "SAN ANTONIO",
		"nivel": 5.0,
		"padre": "2190"
	}, {
		"id": 3351.0,
		"nombre": "SAN BARTOLO AMEYALCO",
		"nivel": 5.0,
		"padre": "2086"
	}, {
		"id": 3152.0,
		"nombre": "SAN BERNABE",
		"nivel": 5.0,
		"padre": "2041"
	}, {
		"id": 3452.0,
		"nombre": "SAN CAYETANO",
		"nivel": 5.0,
		"padre": "2118"
	}, {
		"id": 3264.0,
		"nombre": "SAN CRISTOBAL",
		"nivel": 5.0,
		"padre": "2070"
	}, {
		"id": 3178.0,
		"nombre": "SAN FELIPE",
		"nivel": 5.0,
		"padre": "2051"
	}, {
		"id": 3047.0,
		"nombre": "SAN FERNANDO 1",
		"nivel": 5.0,
		"padre": "2013"
	}, {
		"id": 3045.0,
		"nombre": "SAN FERNANDO 2",
		"nivel": 5.0,
		"padre": "2012"
	}, {
		"id": 3043.0,
		"nombre": "SAN FERNANDO 3",
		"nivel": 5.0,
		"padre": "2012"
	}, {
		"id": 3158.0,
		"nombre": "SAN JERONIMO",
		"nivel": 5.0,
		"padre": "2044"
	}, {
		"id": 3537.0,
		"nombre": "SAN JOSE CUMBRES",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3579.0,
		"nombre": "SAN JOSE DE LOS LEONES I",
		"nivel": 5.0,
		"padre": "2147"
	}, {
		"id": 3580.0,
		"nombre": "SAN JOSE DE LOS LEONES II",
		"nivel": 5.0,
		"padre": "2147"
	}, {
		"id": 3641.0,
		"nombre": "SAN JOSE DEL JARAL",
		"nivel": 5.0,
		"padre": "2170"
	}, {
		"id": 3024.0,
		"nombre": "SAN JOSE INSURGENTES",
		"nivel": 5.0,
		"padre": "2007"
	}, {
		"id": 3689.0,
		"nombre": "SAN JUAN TLIHUACA",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3625.0,
		"nombre": "SAN LORENZO",
		"nivel": 5.0,
		"padre": "2165"
	}, {
		"id": 3220.0,
		"nombre": "SAN LORENZO TEZONCO",
		"nivel": 5.0,
		"padre": "2059"
	}, {
		"id": 3366.0,
		"nombre": "SAN MARCOS",
		"nivel": 5.0,
		"padre": "2091"
	}, {
		"id": 3675.0,
		"nombre": "SAN MATEO ATENCO",
		"nivel": 5.0,
		"padre": "2183"
	}, {
		"id": 3433.0,
		"nombre": "SAN MIGUEL",
		"nivel": 5.0,
		"padre": "2107"
	}, {
		"id": 3029.0,
		"nombre": "SAN MIGUEL CHAPULTEPEC",
		"nivel": 5.0,
		"padre": "2008"
	}, {
		"id": 3054.0,
		"nombre": "SAN MIGUEL XICALCO",
		"nivel": 5.0,
		"padre": "2016"
	}, {
		"id": 3044.0,
		"nombre": "SAN NICOLAS",
		"nivel": 5.0,
		"padre": "2012"
	}, {
		"id": 3260.0,
		"nombre": "SAN PABLO DE LAS SALINAS I",
		"nivel": 5.0,
		"padre": "2068"
	}, {
		"id": 3261.0,
		"nombre": "SAN PABLO DE LAS SALINAS II",
		"nivel": 5.0,
		"padre": "2068"
	}, {
		"id": 3716.0,
		"nombre": "SAN PEDRO",
		"nivel": 5.0,
		"padre": "2194"
	}, {
		"id": 3162.0,
		"nombre": "SAN PEDRO XALPA",
		"nivel": 5.0,
		"padre": "2045"
	}, {
		"id": 3171.0,
		"nombre": "SAN RAFAEL",
		"nivel": 5.0,
		"padre": "2049"
	}, {
		"id": 3329.0,
		"nombre": "SAN ROQUE",
		"nivel": 5.0,
		"padre": "2081"
	}, {
		"id": 3594.0,
		"nombre": "SANTA ANA",
		"nivel": 5.0,
		"padre": "2153"
	}, {
		"id": 3591.0,
		"nombre": "SANTA ANA II",
		"nivel": 5.0,
		"padre": "2150"
	}, {
		"id": 3102.0,
		"nombre": "SANTA ANITA",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3724.0,
		"nombre": "SANTA CATARINA",
		"nivel": 5.0,
		"padre": "2197"
	}, {
		"id": 3369.0,
		"nombre": "SANTA CECILIA",
		"nivel": 5.0,
		"padre": "2092"
	}, {
		"id": 3268.0,
		"nombre": "SANTA CLARA",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3049.0,
		"nombre": "SANTA CRUZ ACALPIXCA",
		"nivel": 5.0,
		"padre": "2014"
	}, {
		"id": 3624.0,
		"nombre": "SANTA FE",
		"nivel": 5.0,
		"padre": "2165"
	}, {
		"id": 3342.0,
		"nombre": "SANTA FE TIJUANA",
		"nivel": 5.0,
		"padre": "2084"
	}, {
		"id": 3646.0,
		"nombre": "SANTA GERTRUDIS",
		"nivel": 5.0,
		"padre": "2172"
	}, {
		"id": 3105.0,
		"nombre": "SANTA MARIA",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3248.0,
		"nombre": "SANTA MARIA ACATITLA",
		"nivel": 5.0,
		"padre": "2065"
	}, {
		"id": 3246.0,
		"nombre": "SANTA MARTHA ACATITLA SUR",
		"nivel": 5.0,
		"padre": "2065"
	}, {
		"id": 3069.0,
		"nombre": "SANTA MONICA",
		"nivel": 5.0,
		"padre": "2020"
	}, {
		"id": 3317.0,
		"nombre": "SANTA ROSA",
		"nivel": 5.0,
		"padre": "2079"
	}, {
		"id": 3156.0,
		"nombre": "SANTA URSULA 1",
		"nivel": 5.0,
		"padre": "2042"
	}, {
		"id": 3157.0,
		"nombre": "SANTA URSULA 2",
		"nivel": 5.0,
		"padre": "2043"
	}, {
		"id": 3614.0,
		"nombre": "SANTO DOMINGO",
		"nivel": 5.0,
		"padre": "2162"
	}, {
		"id": 3432.0,
		"nombre": "SANTOS DEGOLLADO",
		"nivel": 5.0,
		"padre": "2106"
	}, {
		"id": 3586.0,
		"nombre": "SATELITE",
		"nivel": 5.0,
		"padre": "2149"
	}, {
		"id": 3072.0,
		"nombre": "SATELITE 2 (ECHEGARAY)",
		"nivel": 5.0,
		"padre": "2020"
	}, {
		"id": 3672.0,
		"nombre": "SAUCES",
		"nivel": 5.0,
		"padre": "2182"
	}, {
		"id": 3466.0,
		"nombre": "SAUCITO",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3436.0,
		"nombre": "SILAO",
		"nivel": 5.0,
		"padre": "2110"
	}, {
		"id": 3089.0,
		"nombre": "SOLARES",
		"nivel": 5.0,
		"padre": "2024"
	}, {
		"id": 3460.0,
		"nombre": "SOLEDAD",
		"nivel": 5.0,
		"padre": "2120"
	}, {
		"id": 3335.0,
		"nombre": "TABACHINES",
		"nivel": 5.0,
		"padre": "2082"
	}, {
		"id": 3333.0,
		"nombre": "TABACHINES II",
		"nivel": 5.0,
		"padre": "2082"
	}, {
		"id": 3497.0,
		"nombre": "TARIMOYA",
		"nivel": 5.0,
		"padre": "2131"
	}, {
		"id": 3561.0,
		"nombre": "TAXQUENA",
		"nivel": 5.0,
		"padre": "2142"
	}, {
		"id": 3706.0,
		"nombre": "TEC PACHUCA",
		"nivel": 5.0,
		"padre": "2190"
	}, {
		"id": 3213.0,
		"nombre": "TECAMACHALCO",
		"nivel": 5.0,
		"padre": "2057"
	}, {
		"id": 3550.0,
		"nombre": "TEJALPA",
		"nivel": 5.0,
		"padre": "2140"
	}, {
		"id": 3538.0,
		"nombre": "TEMIXCO",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3252.0,
		"nombre": "TENERIAS",
		"nivel": 5.0,
		"padre": "2066"
	}, {
		"id": 3691.0,
		"nombre": "TEPALCAPA",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3519.0,
		"nombre": "TEPATITLAN",
		"nivel": 5.0,
		"padre": "2135"
	}, {
		"id": 3728.0,
		"nombre": "TEPEJI",
		"nivel": 5.0,
		"padre": "2200"
	}, {
		"id": 3055.0,
		"nombre": "TEPEPAN",
		"nivel": 5.0,
		"padre": "2016"
	}, {
		"id": 3637.0,
		"nombre": "TEPETLIXPAN",
		"nivel": 5.0,
		"padre": "2168"
	}, {
		"id": 3473.0,
		"nombre": "TEPEYAC",
		"nivel": 5.0,
		"padre": "2123"
	}, {
		"id": 3690.0,
		"nombre": "TEPOJACO",
		"nivel": 5.0,
		"padre": "2188"
	}, {
		"id": 3448.0,
		"nombre": "TERRANOVA",
		"nivel": 5.0,
		"padre": "2116"
	}, {
		"id": 3093.0,
		"nombre": "TESISTAN",
		"nivel": 5.0,
		"padre": "2026"
	}, {
		"id": 3124.0,
		"nombre": "TEXCOCO",
		"nivel": 5.0,
		"padre": "2035"
	}, {
		"id": 3390.0,
		"nombre": "THOMPSON",
		"nivel": 5.0,
		"padre": "2098"
	}, {
		"id": 3062.0,
		"nombre": "TICOMAN",
		"nivel": 5.0,
		"padre": "2018"
	}, {
		"id": 3206.0,
		"nombre": "TIERRA BLANCA",
		"nivel": 5.0,
		"padre": "2056"
	}, {
		"id": 3418.0,
		"nombre": "TIERRA BUENA",
		"nivel": 5.0,
		"padre": "2104"
	}, {
		"id": 3395.0,
		"nombre": "TIERRA NUEVA",
		"nivel": 5.0,
		"padre": "2100"
	}, {
		"id": 3222.0,
		"nombre": "TLAHUAC",
		"nivel": 5.0,
		"padre": "2059"
	}, {
		"id": 3108.0,
		"nombre": "TLAJOMULCO DE ZUNIGA",
		"nivel": 5.0,
		"padre": "2029"
	}, {
		"id": 3065.0,
		"nombre": "TLALNEPANTLA",
		"nivel": 5.0,
		"padre": "2019"
	}, {
		"id": 3522.0,
		"nombre": "TLAQUEPAQUE",
		"nivel": 5.0,
		"padre": "2136"
	}, {
		"id": 3524.0,
		"nombre": "TLAQUEPAQUE II",
		"nivel": 5.0,
		"padre": "2136"
	}, {
		"id": 3577.0,
		"nombre": "TLATILCO",
		"nivel": 5.0,
		"padre": "2147"
	}, {
		"id": 3190.0,
		"nombre": "TOLOTZIN",
		"nivel": 5.0,
		"padre": "2053"
	}, {
		"id": 3678.0,
		"nombre": "TOLUCA 1 CENTRO",
		"nivel": 5.0,
		"padre": "2184"
	}, {
		"id": 3184.0,
		"nombre": "TOLUCA CU",
		"nivel": 5.0,
		"padre": "2052"
	}, {
		"id": 3180.0,
		"nombre": "TOLUCA SAN CARLOS",
		"nivel": 5.0,
		"padre": "2051"
	}, {
		"id": 3350.0,
		"nombre": "TOLUCA-LEONES",
		"nivel": 5.0,
		"padre": "2086"
	}, {
		"id": 3523.0,
		"nombre": "TONALA",
		"nivel": 5.0,
		"padre": "2136"
	}, {
		"id": 3411.0,
		"nombre": "TOPOCHICO",
		"nivel": 5.0,
		"padre": "2103"
	}, {
		"id": 3737.0,
		"nombre": "TOPOLOBAMPO",
		"nivel": 5.0,
		"padre": "2205"
	}, {
		"id": 3005.0,
		"nombre": "TORREMOLINOS",
		"nivel": 5.0,
		"padre": "2002"
	}, {
		"id": 3679.0,
		"nombre": "TOTOLTEPEC",
		"nivel": 5.0,
		"padre": "2185"
	}, {
		"id": 3270.0,
		"nombre": "TULPETLAC",
		"nivel": 5.0,
		"padre": "2071"
	}, {
		"id": 3662.0,
		"nombre": "TULTEPEC",
		"nivel": 5.0,
		"padre": "2176"
	}, {
		"id": 3664.0,
		"nombre": "TULTITLAN",
		"nivel": 5.0,
		"padre": "2177"
	}, {
		"id": 3648.0,
		"nombre": "UABC",
		"nivel": 5.0,
		"padre": "2173"
	}, {
		"id": 3484.0,
		"nombre": "UDLA",
		"nivel": 5.0,
		"padre": "2126"
	}, {
		"id": 3015.0,
		"nombre": "UMAN",
		"nivel": 5.0,
		"padre": "2004"
	}, {
		"id": 3309.0,
		"nombre": "UNIDAD DEPORTIVA",
		"nivel": 5.0,
		"padre": "2077"
	}, {
		"id": 3720.0,
		"nombre": "UNION LAZARO CARDENAS",
		"nivel": 5.0,
		"padre": "2196"
	}, {
		"id": 3396.0,
		"nombre": "UNIVERSIDAD",
		"nivel": 5.0,
		"padre": "2101"
	}, {
		"id": 3136.0,
		"nombre": "VALDIVIA",
		"nivel": 5.0,
		"padre": "2037"
	}, {
		"id": 3593.0,
		"nombre": "VALLARTA",
		"nivel": 5.0,
		"padre": "2152"
	}, {
		"id": 3680.0,
		"nombre": "VALLE DE BRAVO",
		"nivel": 5.0,
		"padre": "2186"
	}, {
		"id": 3283.0,
		"nombre": "VALLE DE HUAJUCO",
		"nivel": 5.0,
		"padre": "2073"
	}, {
		"id": 3172.0,
		"nombre": "VALLE DE HUINALA",
		"nivel": 5.0,
		"padre": "2049"
	}, {
		"id": 3094.0,
		"nombre": "VALLE DE LOS MOLINOS",
		"nivel": 5.0,
		"padre": "2026"
	}, {
		"id": 3668.0,
		"nombre": "VALLE DE SANTIAGO",
		"nivel": 5.0,
		"padre": "2180"
	}, {
		"id": 3031.0,
		"nombre": "VALLE DEL PORTAL",
		"nivel": 5.0,
		"padre": "2009"
	}, {
		"id": 3070.0,
		"nombre": "VALLE DORADO",
		"nivel": 5.0,
		"padre": "2020"
	}, {
		"id": 3409.0,
		"nombre": "VALLE PONIENTE",
		"nivel": 5.0,
		"padre": "2102"
	}, {
		"id": 3341.0,
		"nombre": "VALLE VERDE",
		"nivel": 5.0,
		"padre": "2083"
	}, {
		"id": 3059.0,
		"nombre": "VALLEJO",
		"nivel": 5.0,
		"padre": "2017"
	}, {
		"id": 3120.0,
		"nombre": "VALSEQUILLO",
		"nivel": 5.0,
		"padre": "2034"
	}, {
		"id": 3143.0,
		"nombre": "VENADOS",
		"nivel": 5.0,
		"padre": "2039"
	}, {
		"id": 3301.0,
		"nombre": "VENUSTIANO CARRANZA",
		"nivel": 5.0,
		"padre": "2076"
	}, {
		"id": 3565.0,
		"nombre": "VERTIZ NARVARTE",
		"nivel": 5.0,
		"padre": "2144"
	}, {
		"id": 3262.0,
		"nombre": "VILLA DE LAS FLORES",
		"nivel": 5.0,
		"padre": "2069"
	}, {
		"id": 3437.0,
		"nombre": "VILLA DEL CARMEN",
		"nivel": 5.0,
		"padre": "2111"
	}, {
		"id": 3386.0,
		"nombre": "VILLA JUAREZ",
		"nivel": 5.0,
		"padre": "2097"
	}, {
		"id": 3413.0,
		"nombre": "VILLA MITRAS",
		"nivel": 5.0,
		"padre": "2103"
	}, {
		"id": 3030.0,
		"nombre": "VILLA SONORA",
		"nivel": 5.0,
		"padre": "2009"
	}, {
		"id": 3142.0,
		"nombre": "VILLA VERDE",
		"nivel": 5.0,
		"padre": "2039"
	}, {
		"id": 3085.0,
		"nombre": "VILLA VERONA",
		"nivel": 5.0,
		"padre": "2024"
	}, {
		"id": 3422.0,
		"nombre": "VILLAS",
		"nivel": 5.0,
		"padre": "2105"
	}, {
		"id": 3703.0,
		"nombre": "VILLAS DEL ALAMO",
		"nivel": 5.0,
		"padre": "2189"
	}, {
		"id": 3627.0,
		"nombre": "VISTA HERMOSA",
		"nivel": 5.0,
		"padre": "2166"
	}, {
		"id": 3604.0,
		"nombre": "XAMAIPAK",
		"nivel": 5.0,
		"padre": "2157"
	}, {
		"id": 3278.0,
		"nombre": "XOCHIACA",
		"nivel": 5.0,
		"padre": "2072"
	}, {
		"id": 3052.0,
		"nombre": "XOCHIMILCO",
		"nivel": 5.0,
		"padre": "2015"
	}, {
		"id": 3534.0,
		"nombre": "XOCHITEPEC",
		"nivel": 5.0,
		"padre": "2139"
	}, {
		"id": 3063.0,
		"nombre": "ZACATENCO",
		"nivel": 5.0,
		"padre": "2018"
	}, {
		"id": 3131.0,
		"nombre": "ZALATE II",
		"nivel": 5.0,
		"padre": "2036"
	}, {
		"id": 3347.0,
		"nombre": "ZAPATA",
		"nivel": 5.0,
		"padre": "2085"
	}, {
		"id": 3092.0,
		"nombre": "ZAPOPAN",
		"nivel": 5.0,
		"padre": "2025"
	}, {
		"id": 3328.0,
		"nombre": "ZERTUCHE",
		"nivel": 5.0,
		"padre": "2081"
	}, {
		"id": 3182.0,
		"nombre": "ZINACANTEPEC",
		"nivel": 5.0,
		"padre": "2052"
	}, {
		"id": 3578.0,
		"nombre": "ZOMEYUCAN",
		"nivel": 5.0,
		"padre": "2147"
	}, {
		"id": 3251.0,
		"nombre": "ZOOLOGICO",
		"nivel": 5.0,
		"padre": "2066"
	}];

	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];


	$scope.filtrosGeneral = {};
	var tableCspSinEim = undefined;
	var tablePendientesPorImplementar = undefined;
	$scope.nombreBandeja = "";

	$scope.nivelArbol = 0;
	$scope.tempReporteCspSinEim = [];
	$scope.listadogeografiacopy = [];
	$scope.filtroGeografia = {};
	$scope.data = {};
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

	$scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
		return list.sort(compareGeneric)[0].nivel
	}

		$scope.ordenarGeografia = function (lista, filtro) {
		
		let listaGeografiaTemp = lista.filter(e => e.nivel <= parseInt(filtro));

		let geografia = angular.copy(listaGeografiaTemp);
		geografia.map((e) => {
			e.parent = e.padre == null ? '#' : e.padre;
			e.text = e.nombre;
			e.icon = "fa fa-globe";
			e.state = {
				opened: false,
				selected: true,
			}
			return e
		})

		return geografia
	}

	$scope.getTextGeografia = function (idJsTree, idInput) {
		var geografias = $('#' + idJsTree).jstree("get_selected", true);
		let textoGeografias = [];
		angular.forEach(geografias, (geografia, index) => {
			textoGeografias.push(geografia.text);
		});
	}


	$scope.consultarCatalogos = function () {
		
			
					
							console.log('Entrando a la funcion catalogos')

							$scope.listadogeografiacopy = $scope.geografia;

							$scope.nivelArbolCspSinEim = $scope.nivelArbolCspSinEim ? $scope.nivelArbolCspSinEim : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.geografia);
							$scope.nivelArbolValidacion = $scope.nivelArbolValidacion ? $scope.nivelArbolValidacion : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.geografia);
							
							$scope.nivelArbolPendientesPorImplementar = $scope.nivelArbolPendientesPorImplementar ? $scope.nivelArbolPendientesPorImplementar : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.geografia);
							$scope.nivelArbolDependencia = $scope.nivelArbolDependencia ? $scope.nivelArbolDependencia : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.geografia);
							$scope.nivelArbolImplementacion = $scope.nivelArbolImplementacion ? $scope.nivelArbolImplementacion : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.geografia);
							
							$scope.nivelArbolImplementados = $scope.nivelArbolImplementados ? $scope.nivelArbolImplementados : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.geografia);
							
							
								let geografia1 = $scope.ordenarGeografia($scope.geografia, $scope.nivelArbolCspSinEim);
								$scope.filtroGeografia.cspSinEim = angular.copy(geografia1);
									console.log(geografia1)
								 geografia1 = $scope.ordenarGeografia($scope.geografia, $scope.nivelArbolImplementacion);
								$scope.filtroGeografia.implementacion = angular.copy(geografia1);
							
								console.log(geografia1)
							
			
		
	}
	$scope.consultarCatalogos();

	$scope.obtenerUltimoNivelFiltros = function (array) {
		return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
	}

	$scope.mostrarFiltros = function () {
		//PENDIENTE
		$scope.listaEstatusPendiente = $scope.filtrosCatalogo.filter(e => { return e.id === 1 });
		$scope.listaEstatusPendiente.map((es) => {
			es.estados = $scope.filtrosCatalogo.filter(e => { return e.idPadre === es.id });
		});
		$scope.listadoMotivosReagenda = $scope.filtrosCatalogo.filter(e => { return e.idPadre === 201 })
	}

	$scope.guardarArbol = function (type) {
		let arbolActual = $("#jstreeGeografia-" + type).jstree("get_selected", true)
			.map(e => parseInt(e.id));

		switch (type+"") {
			case '1':
				$scope.filtroGeografia.cspSinEim.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case '2':
				$scope.filtroGeografia.implementacion.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
		}

	}

	$scope.banderaCspSinEim = false;
	$scope.banderaPendientesPorImplementar = false;
	$scope.banderaValidacionLider = false;
	$scope.banderaDependencia = false;
	$scope.banderaImplementacion = false;
	$scope.banderaImplementados = false;

	$scope.cambiarVista = function (opcion) {
		let geografiaReporte = [];
		
		if (opcion === 1) {
			geografiaReporte = angular.copy($scope.filtroGeografia.cspSinEim);
			if (!$scope.banderaCspSinEim) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
			}
			$scope.nombreBandeja = "Home Oportunidades";
		}
		if (opcion === 2) {
			geografiaReporte = angular.copy($scope.filtroGeografia.implementacion);
			if (!$scope.banderaImplementacion) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
			}
			swal.close();
			$scope.nombreBandeja = "EN IMPLEMENTACIÓN";
		}

		
		if (geografiaReporte) {
			$scope.guardarArbol($scope.vistaCoordinacion);
			let isJsTree = $('#jstreeGeografia-' + $scope.vistaCoordinacion).jstree('is_loaded')[0] ? true : false;
			if (!isJsTree) {
				$('#jstreeGeografia-' + $scope.vistaCoordinacion).jstree('destroy');
			}

			$scope.vistaCoordinacion = opcion;

			$('#jstreeGeografia-' + opcion).bind('loaded.jstree', function (e, data) {
				switch (opcion) {
					case 1:
						$scope.getTextGeografia('jstreeGeografia-1', 'cluster-cspSinEim');
						if (!$scope.banderaCspSinEim) {
							$scope.banderaCspSinEim = true;
							//$scope.consultarSinEimPm();
							$scope.initOportunidades()
						}
						break;
					case 2:
						$scope.getTextGeografia('jstreeGeografia-2', 'cluster-implementacion');
						if (!$scope.banderaImplementacion) {
							$scope.banderaImplementacion = true;
							$scope.consultarImplementacion();
						}
						break;
				}

			}).jstree({
				'plugins': ["wholerow", "checkbox", "search"],
				'core': {
					'data': geografiaReporte,
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
		}
	}

	$scope.cambiarVista(1)











    $scope.tablaSolicitudArray = [
        {
            id: 13123213213,
            csp: "CSP13230413",
            cot: "COT378899",
            numOportunidad: "8636353555",
            nombreCliente: "Juan Garcia Lopez",
            eimAsignado: "Manuel Flores Hernandes",
            lider: "<a href=>Asignar"
        },
        {
            id: 13123213213,
            csp: "CSP13230413",
            cot: "COT378899",
            numOportunidad: "8636353555",
            nombreCliente: "Juan Garcia Lopez",
            eimAsignado: "Manuel Flores Hernandes"
        },
        {
            id: 13123213213,
            csp: "CSP13230413",
            cot: "COT378899",
            numOportunidad: "8636353555",
            nombreCliente: "Juan Garcia Lopez",
            eimAsignado: "Manuel Flores Hernandes"
        }
    ];

    $scope.initOportunidades = function() {

        $('#fecha_oportunidad').datepicker({
            format: "dd/mm/yyyy",
            startView: "months", 
            minViewMode: "months",
            language: 'es'
        });
        $('#fecha_oportunidad').datepicker('update', new Date());

        tableOportunidad = $('#oportunidadTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });

        tableSolicitud = $('#solicitudTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });

		

        $q.all([
            genericService.consultarConfiguracionDespachoDespacho({ moduloAccionesUsuario: 'moduloOportunidades' })
        ]).then(function(results) {
            $scope.configPermisoAccionConsultaOportunidad = true;
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.elementosConfigGeneral = new Map(Object.entries(results[0].data.result))
                        let resultConf = results[0].data.result;
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            let permisosResult = results[0].data.result.MODULO_ACCIONES_USUARIO;

                            // $scope.nGeografia = parseInt(llavesResult.N_FILTRO_GEOGRAFIA_GESTION_TICKETS)
                            // $scope.nIntervencion = parseInt(llavesResult.N_FILTRO_TIPO_ORDEN_GESTION_TICKETS)
                            // $scope.nPuestoIngeniero = llavesResult.N_PUESTO_INGENIERO ? parseInt(llavesResult.N_PUESTO_INGENIERO) : 1;
                            // $scope.nGeografiaConsultaTickets = llavesResult.N_FILTRO_GEOGRAFIA_CONSULTA;
                            // $scope.nGeografiaConsultaUsuario = llavesResult.N_FILTRO_GEOGRAFIA_TIPO_USUARIO;

                            if (permisosResult != undefined && permisosResult.permisos != undefined && permisosResult.permisos.length > 0) {
                                $scope.configPermisoAccionConsultaOportunidad = (permisosResult.permisos.filter(e => { return e.clave == "accionConsultaOportunidades" })[0] != undefined);
                            }

                            
                        }
                        let arrayDefaultKmzElemts = results[0].data.result.KEY_DEFAULT_KMZ ? results[0].data.result.KEY_DEFAULT_KMZ.split(",") : null;
            GenericMapa.prototype.callPrototypeMapa(results[0].data.result, arrayDefaultKmzElemts);
                        $scope.initMapaAgendamiento();
                        
                        $scope.GEOGRAFIA_DOS_AGENDA = "cluster";
                        $scope.GEOGRAFIA_UNO_AGENDA= "ciudad";
                        
                    }
                }
                if ($scope.configPermisoAccionConsultaOportunidad) {
                    $scope.consultarOportunidades();
					$scope.consultarSolicitudes();
                }
            }
        })
    }
    
    $scope.consultarOportunidades = function() {
        
		if(!$scope.initOportunidades){
			// $scope.params = {
			// 	numeroOportunidad: $scope.camposFiltro.oportunidad ? $scope.camposFiltro.oportunidad : "",
			// 	nombreCliente: $scope.camposFiltro.nombreCliente ? $scope.camposFiltro.nombreCliente : "",
			// 	fechaInicio: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').startOf('month').format('YYYY-MM-DD'),
			// 	fechaFin: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').endOf('month').format('YYYY-MM-DD')
			// };
			$scope.params = {
				numeroOportunidad: $scope.camposFiltro.oportunidad ? $scope.camposFiltro.oportunidad : "",
				nombreCliente: $scope.camposFiltro.nombreCliente ? $scope.camposFiltro.nombreCliente : "",
				fechaInicio: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
				fechaFin: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').format('YYYY-MM-DD')
			};
		} else {
			$scope.params = {
				numeroOportunidad: "",
				nombreCliente: "",
				fechaInicio: "",
				fechaFin: ""
			};
		}
       
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		oportunidadesService.consultarOportunidades($scope.params).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.oportunidades) {
                            $scope.listaOportunidades = response.data.result.oportunidades;

                            $scope.contadorGeneral = {};
                            $scope.contadorGeneral.numOportunidad = 0;
                            $scope.contadorGeneral.numCsp = 0;
                            $scope.contadorGeneral.numImplementadas = 0;
                            $scope.contadorGeneral.numCanceladas = 0;
                            $scope.contadorGeneral.avance = 0;

                            angular.forEach($scope.listaOportunidades, function (elemento, index) {
                                $scope.contadorGeneral.numOportunidad++;
                                $scope.contadorGeneral.numCsp = $scope.contadorGeneral.numCsp + elemento.contadores.total;
                                $scope.contadorGeneral.numImplementadas = $scope.contadorGeneral.numImplementadas + elemento.contadores.implementados;
                                $scope.contadorGeneral.numCanceladas = $scope.contadorGeneral.numCanceladas + elemento.contadores.cancelados;
                                $scope.contadorGeneral.avance = (100 / $scope.contadorGeneral.numCsp) * $scope.contadorGeneral.numImplementadas;
                            });

                            $scope.mostrarTablaOportunidades($scope.listaOportunidades);
                        } else {
                            $scope.listaOportunidades = [];
                            $scope.contadorGeneral = {};
                            $scope.mostrarTablaOportunidades([]);
                        }
						$scope.initOportunidades = false;
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

    $scope.mostrarTablaOportunidades = function(array) {
        if (tableOportunidad) {
            tableOportunidad.destroy();
        }
        let arrayRow = [];

        angular.forEach(array, function (elemento, index) {
            let row = [];
            row[0] = elemento.numOportunidad ? '<span onclick="consultarDetalleObjectosSF(' + "'" + elemento.idOportunidad + "','OP',"+elemento.numOportunidad + ')" class="link_table">' + elemento.numOportunidad + '</span>' : "";
            row[1] = elemento.nombreCliente ? elemento.nombreCliente : "NA";
            row[2] = elemento.eimAsignado ? elemento.eimAsignado : "NA";
            row[3] = elemento.fechaCierre ? elemento.fechaCierre : "NA";
            row[4] = "NA";
            row[5] = elemento.contadores.total;
            row[6] = elemento.contadores.implementados;
            row[7] = elemento.contadores.cancelados;
            row[8] = elemento.contadores.avance;
            row[9] = elemento.contadores.residencial;
            row[10] = elemento.contadores.empresarial;
            row[11] = '<input type="checkbox">';
            row[12] = '<input type="checkbox">';
            row[13] = '<div class="tooltip-btn"> <span onclick="mostrarListaCspOportunidad(' + "'" + elemento.numOportunidad + "'," + "'" + index + "'" + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><th><i class="icono_cons_bg fa fa-bars" aria-hidden="true"></i></th></span></div>';
            arrayRow.push(row);
        });
        tableOportunidad = $('#oportunidadTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });
        swal.close();
    }

    $scope.filtrarOportunidades = function(opcion) {
        $scope.listaFiltro = [];
        switch (opcion) {
            case 1:
                $scope.mostrarTablaOportunidades($scope.listaOportunidades);
                break;
            case 2:
                $scope.listaFiltro = $scope.listaOportunidades.filter(e => { return e.contadores.total !== 0 });
                $scope.mostrarTablaOportunidades($scope.listaFiltro);
                break;
            case 3:
                $scope.listaFiltro = $scope.listaOportunidades.filter(e => { return e.contadores.implementados !== 0 });
                $scope.mostrarTablaOportunidades($scope.listaFiltro);
                break;
            case 4:
                $scope.listaFiltro = $scope.listaOportunidades.filter(e => { return e.contadores.cancelados !== 0 });
                $scope.mostrarTablaOportunidades($scope.listaFiltro);
                break;
            
            default:
                break;
        }
    }

    $scope.detalleOportunidad = [];
    mostrarListaCspOportunidad = function(oportunidad, index) {
        $scope.objectOportunidad = $scope.listaOportunidades[index];
        $scope.params = {
            oportunidad: oportunidad
        }
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		oportunidadesService.consultarDetalleOportunidad($scope.params).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.detalleOportunidad) {
                            $scope.detalleOportunidad = response.data.result.detalleOportunidad;
                            $scope.contadorDetalleOportunidad = {};
                            $scope.mostrarTablaDetalleOportunidad($scope.detalleOportunidad);
                            $scope.showTable = false;
                        } else {
                            
                        }
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


	$scope.consultarSolicitudes = function() {
        // $scope.params = {
        //     numeroOportunidad: $scope.camposFiltro.oportunidad ? $scope.camposFiltro.oportunidad : "",
        //     nombreCliente: $scope.camposFiltro.nombreCliente ? $scope.camposFiltro.nombreCliente : "",
        //     fechaInicio: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').startOf('month').format('YYYY-MM-DD'),
        //     fechaFin: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').endOf('month').format('YYYY-MM-DD')
        // };
        // $scope.params = {
        //     numeroOportunidad: "",
        //     nombreCliente: "",
        //     fechaInicio: "",
        //     fechaFin: ""
        // };
		$scope.params = {}
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		oportunidadesService.consultarSolicitudTorreControl($scope.params).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {

						if (response.data.result.infoList) {
							$scope.tablaSolicitudArray = response.data.result.infoList;
							$scope.mostrarTablaSolicitudes($scope.tablaSolicitudArray);
						} else {
							swal.close();
						}
                        
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

	$scope.selectedTorreControl = {}
	$scope.selectedLiderTecnico = {}
	$scope.resultSolicituLiderTecnico = []

    $scope.mostrarTablaSolicitudes = function(array) {
        if (tableSolicitud) {
            tableSolicitud.destroy();
        }
        let arrayRow = [];

        console.log("crear tabla de lider")
		$scope.resultSolicituLiderTecnico = array;
         angular.forEach(array, function (elemento, index) {
            let row = [];
            row[0] = elemento.csp;
            row[1] = elemento.cotizacion;
            row[2] = elemento.numOportunidad;
			row[3] = elemento.cliente;
            row[4] = elemento.idEim;
            row[5] = '<div class="tooltip-btn"> <span onclick="consultaDetalleLider('+index+')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><th><i class="icono_cons_bg fa fa-bars" aria-hidden="true"></i></th></span></div>';
            arrayRow.push(row);
        });
        tableSolicitud = $('#solicitudTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });
        swal.close();
    }

    consultaDetalleLider = function(index) {
		console.log(index);
		$scope.selectedTorreControl = $scope.resultSolicituLiderTecnico[index]
		console.log($scope.selectedTorreControl)
        $("#modal-detalle-lider").modal('show');
    }

    $scope.asignarLider = function() {
		const params = {
			cspId: $scope.selectedTorreControl.idCsp ,
            listaCampos: {
				liderTecnico: $scope.selectedTorreControl.idLiderTecnico,
				torreControl: $scope.selectedTorreControl.idTorreControl
			}
        }
		oportunidadesService.actualizarEnImplementacion(params).then(function success(response){
			if(response.data !== undefined){
				if(response.data.respuesta){
					if(response.data.result){
						mensajeEnvio = 'Se actualizo el CSP correctamente.';
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio,MENSAJE_ACCION_EXITO, tituloAccion);
						toastr.success('Se actualizo el CSP correctamente.');

						swal.close();
					} else {
						swal.close();
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeErrorAler(response.data.resultDescripcion);
					}
				} else {
				swal.close();
				objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
				mostrarMensajeErrorAler(response.data.resultDescripcion);
			}
		}

		});
        $("#modal-detalle-lider").modal('hide');
    }

    $scope.contadorDetalleOportunidad = {};
    $scope.mostrarTablaDetalleOportunidad = function(array) {
        if (tableDetalleOportunidad) {
            tableDetalleOportunidad.destroy();
        }
        let arrayRow = [];
        $scope.contadorDetalleOportunidad.numCsp = 0;
        $scope.contadorDetalleOportunidad.enviadosInfra = 0;
        $scope.contadorDetalleOportunidad.recibidosInfra = 0;
        $scope.contadorDetalleOportunidad.implementados = 0;
        $scope.contadorDetalleOportunidad.calendarizados = 0;

        angular.forEach(array, function (elemento, index) {
            let row = [];
            row[0] = '<input type="checkbox">';
            row[1] = elemento.folioCsp ? '<span onclick="consultarDetalleObjectosSF(' + "'" + elemento.idCsp + "','CP',"+elemento.folioCsp + ')" class="link_table">' + elemento.folioCsp + '</span>' : "";
            row[2] = "NA";
            row[3] = "NA";
            row[4] = elemento.nombreCuentaFactura ? '<span onclick="consultarDetalleObjectosSF(' + "'" + elemento.idCuentaFactura + "','CF',"+ elemento.nombreCuentaFactura + ')" class="link_table">' + elemento.nombreCuentaFactura + '</span>' : "";
            row[5] = elemento.estatusCsp ? elemento.estatusCsp : "NA";
            row[6] = elemento.estatusOs ? elemento.estatusOs : "NA";
            row[7] = elemento.folioOs ? elemento.folioOs : "NA";
            row[8] = '<input type="checkbox">';
            row[9] = '<div class="tooltip-btn"> <span onclick="mostrarAgendamientoGenerico(' + "'" + index + "'" + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><th><i class="icono_cons_bg fa fa-calendar" aria-hidden="true"></i></th></span></div>';
            arrayRow.push(row);

            $scope.contadorDetalleOportunidad.numCsp++;
            // $scope.contadorGeneral.numCsp = $scope.contadorGeneral.numCsp + elemento.contadores.total;
            // $scope.contadorGeneral.numImplementadas = $scope.contadorGeneral.numImplementadas + elemento.contadores.implementados;
            // $scope.contadorGeneral.numCanceladas = $scope.contadorGeneral.numCanceladas + elemento.contadores.cancelados;
            // $scope.contadorGeneral.avance = ($scope.contadorGeneral.numCsp / 100) * $scope.contadorGeneral.numImplementadas;
        });
        tableDetalleOportunidad = $('#table_detalle_oportunidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });
        swal.close();
    }

    $scope.regresarPaginaPrincipal = function() {
        $scope.showTable = true;
    }

    $scope.limpiarCamposFiltro = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.camposFiltro.nombreCliente = "";
				break;
			case 2:
				$scope.camposFiltro.oportunidad = "";
				break;
			default:
				break;
		}
	}

    $scope.validacionGenerica = function () {

    }

    $scope.elementoCSP;
    mostrarAgendamientoGenerico = function(index) {
        $scope.listContactosAgendamiento = []
        $scope.infoFactibilidad = {};	
        $scope.elementoCSP = {};
        $scope.elementoCSP = $scope.detalleOportunidad[index];
        $scope.GEOGRAFIA_UNO_AGENDA_NOMBRE = null;
        $scope.GEOGRAFIA_DOS_AGENDA_NOMBRE = null;
        let paramsDetalleSitio={
            //cuenta:$scope.elementoCSP.cuentaFacturaSf.noCuenta
            cuenta: "0290004104"
        };
        mostrarAgendamiento(paramsDetalleSitio);
    }

    angular.element(document).ready(function () {

        tableDetalleOportunidad = $('#table_detalle_oportunidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });

        $('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: false
		});
        $('.datepicker').datepicker('update', new Date());

        
    });
	


	$scope.listadoConsultaOtsDisponibles = []
//Table Implentacion
$scope.consultarImplementacion = function(isSwal){
	iCluster = $("#iCluster").val();
	iRegion = $("#iRegion").val();
	iCsp = $("#iCsp").val();
	iFecha = $("#iFecha").val();
	iEstatusOT = $("#iEstatusOT").val();
	let params = {
		region: iRegion,
		csp: iCsp,
		fecha: iFecha,
		estatusot: iEstatusOT,
	}
	let arraRow = [];
	if (isSwal) {
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
	}



	if (tableimplementacion) {
		tableimplementacion.destroy();
	}
	oportunidadesService.consultarEnImplementacion(params).then(function success(response){
		if(response.data !== undefined){
			if(response.data.respuesta){
				if (response.data.result) {
					if (response.data.result.resultado) {
						$scope.implementacion = response.data.result.resultado;
						$.each(response.data.result.resultado, function (i, elemento){
							let row = [];
							row[0] = '<a id="mostrar-segundo-nivel-' + elemento.cot + '" class="dt-control" tag-position="' + elemento.cot + '" tag-hide="false"><i id="icono-implementados-'
								+ elemento.numOS + '" class="dt-control icono-implementados fas fa-angle-down" aria-hidden="true"></i></a>';
							row[1] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
							row[2] = elemento.cot ? elemento.cot : 'Sin informaci&oacute;n';
							row[3] = elemento.idBrm ? elemento.idBrm : 'Sin informaci&oacute;n';
							row[4] = elemento.cuentaFactura ? elemento.cuentaFactura : 'Sin informaci&oacute;n';
							row[5] = elemento.tipoCuadrilla ? elemento.tipoCuadrilla : 'Sin informaci&oacute;n';
							row[6] = elemento.numOS ? elemento.numOS : 'Sin informaci&oacute;n';
							row[7] = elemento.estatusOs ? elemento.estatusOs : 'Sin informaci&oacute;n';

							arraRow.push(row);
						})
					} else{
						toastr.error(response.data.resultDescripcion);
					}
				} else{
					toastr.warning('No se encontraron registros con el filtro usado');
				}
			} else{
				toastr.warning(response.data.resultDescripcion);
			}
		} else {
			toastr.error('Ha ocurrido un error al consultar las Implementaciones');
		}

		tableimplementacion = $('#tableimplementacion').DataTable({
			"paging": true,
			"searching": false,
			"lengthChange": false,
			"ordering": true,
			"pageLength": 10,
			"info": true,
			"scrollX": false,
			"data": arraRow,
			"autoWidth": false,
			"language": idioma_espanol_not_font,
			"aoColumnDefs": [
				{ "aTargets": [7], "bSortable": false }
			]
		});
		$scope.reloadEventsImplementacion()
		swal.close();

	})
	$('#iVertical').val('');
	$('#iCelula').val('');
	$('#iCliente').val('');
	$('#iTipoSitio').val('');
	$('#iCot').val('');
	$('#iEim').val('');
	$('#iCsp').val('');
			
}

$scope.reloadEventsImplementacion = function() {
	setTimeout(
		function () {
			
			console.log('termina carga #tableimplementacion')
			$('#tableimplementacion tbody').on('click', 'td.sorting_1', function (){
	
				console.log("click en al tabla");
				var tr = $(this).closest('tr');
				var row = tableimplementacion.row(tr); //mismo nombre que tabla
				let index = Number($(this).attr('tag-position'));
	
				//console.log(tr, row)
	
				if (row.child.isShown()) {
					row.child.hide();
				}else {
					var listaDetalleOs = [] ;
					console.log('Se ejecuto el else');
					//row.child(format(row.data())).show();
					osConsulta = row.data()[6];
					console.log(osConsulta);
	
					let params = {
						os: osConsulta,
					}
					genericService.localizaOrden(params).then(function success(response){
						if(response.data !== undefined){
							if(response.data.respuesta){
								if (response.data.result) {
									if (response.data.result.detalleOS) {
										listaDetalleOs = response.data.result.detalleOS;
										$scope.listadoConsultaOtsDisponibles = listaDetalleOs;
										row.child(format(listaDetalleOs)).show();
	
									}
								}
							}
						}
					})
	
				}
	
			});
		},
		2000);
}



	function format(d) {
		console.log(d);
		var html = "";
		for(var i=0; i<d.length; i++){
			html += `<tr>
			  <td>`+d[i].idOrden+`</td>
			  <td>`+d[i].descripcionEstado+`</td>
			  <td>`+d[i].descTipo+`</td>
			  <td>`+d[i].fechaCreacion+`</td>
			  <td>`+d[i].tecnico+`</td>
			  <td>`+d[i].nombreCliente+`</td>
			  <td>`+d[i].auxAsig+`</td>
			  <td>`+d[i].cluster+`</td>
			  <td>`+d[i].descripcionEstatus+`</td>
			  <td>`+d[i].fechaHoraAgenda+`</td>
			  <td>`+d[i].fechaHoraInicio+`</td>
			  <td><div class="tooltip-btn"> <span onclick="consultaImagenesOT(`+ d[i].idOrden +`, `+ d[i].claveCliente+`)" class="btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light"><i class="icono_cons_bg fa fa-picture-o" aria-hidden="true"></i></span></div></td>
			  <td><div class="tooltip-btn"> <span onclick="consultaDetalleOt(`+ d[i].idOrden +`)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><i class="icono_cons_bg fa fa-bars" aria-hidden="true"></i></span></div></td>
			</tr>`;


		}
		return (
			'<div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">'+
			'<table class="col-12">' +
			'<thead> '+
			'<tr><th>OT</th><th>Categoria</th><th>Subcategoria</th><th>Fecha de Creación OT</th><th>Tecnico Asignado</th><th>Solicitante</th><th>Auxiliar</th><th>Distrito</th><th>Estatus OT</th><th>Hora programada</th><th>Hora real llegada</th><th></th><th></th></tr>'	+
			'</thead>'+
			'<tbody id="myTables">'+
			html+
			'</tbody>'+
			'</table>'+
			'</div>'

		);
	}

	consultaDetalleOt = function (idOrden) {
		$scope.infoOtDetalle = {};
		$scope.infoDetalleOtPe = {};
		let otConsultaTemp = $scope.listadoConsultaOtsDisponibles.find((e) => e.idOrden == idOrden);
		$scope.datoOt = otConsultaTemp.idOrden
		is_consulta_info_trayectoria = false;
		$scope.$apply();
		$scope.consultaDetalleOtGeneric(otConsultaTemp);
	}

	$scope.consultaDetalleOtGeneric = function (ordenObject) {
		let params = {
			idOT: ordenObject.idOrden,
			idOt: ordenObject.idOrden
		}
		swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		consultaOTService.consultaInfoDetalle(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result.orden) {
						$scope.infoOtDetalle = response.data.result.orden
						is_consulta_info_ot = true;
						//$scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_CO_FLUJO_" + ordenObject.idFlujo).split(",")
						$("#modal-detalle-ot").modal({ backdrop: 'static', keyboard: false });
						$("#modal-detalle-ot").modal('show');
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
		if (!is_consulta_historico) {
			let params = {
				idOt: $scope.datoOt
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
								is_consulta_historico = true;
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
		if (!is_consulta_comentarios) {
			let params = {
				idOt: $scope.datoOt
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
								is_consulta_comentarios = true;
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

			/*
			consultaOTService.consultaComentarios(JSON.stringify(params)).then(function success(response) {
				response = arrayChat;
				if (response.data !== undefined) {
					// if (response.data.respuesta) {
					if (response.data.success) {
						if (response.data.result.result === '0') {
							var content_chat = "";
							$.each(response.data.result.Comentario, function (index, valor) {
								if (valor.Origen == "FFM APP") {
									content_chat += '' +
										'<div class="chat">' +
										'	<div class="chat-avatar">' +
										'		<a class="avatar">' +
										'			<i class="img-comentarios-chat android-mensaje fab fa-android"></i>' +
										'		</a>' +
										'	</div>' +
										'	<div class="chat-body">' +
										'		<div class="chat-body">' +
										'			<div class="chat-text">' +
										'				<p> ' + valor.Comentario + ' </p>' +
										'			</div>' +
										'		</div>' +
										'	</div>' +
										'</div>';
								} else {
									content_chat += '' +
										'<div class="chat chat-right">' +
										'	<div class="chat-body">' +
										'		<div class="chat-body">' +
										'			<div class="chat-text">' +
										'				<p> ' + valor.Comentario + ' </p>' +
										'			</div>' +
										'		</div>' +
										'	</div>' +
										'	<div class="chat-avatar">' +
										'		<a class="avatar">' +
										'			<i class="img-comentarios-chat web-mensaje fas fa-desktop"></i>' +
										'		</a>' +
										'	</div>' +
										'</div>';
								}
							});
							$('.contenedor_detalle #content-chat-ot').empty().append(content_chat);
							
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
			}).catch(err => handleError(err));*/
		}
	}

	$scope.consultaMaterialesOT = function () {
		if (!isConsultaMateriales) {
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			$scope.tecnicoConsultaMateriales = {}
			if (tableMaterialesDespacho) {
				tableMaterialesDespacho.destroy();
			}
			consultaOTService.consultaMaterialOt(JSON.stringify({ idOrden: $scope.datoOt })).then(function success(response) {
				$("#table-materiales-ot tbody").empty()
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.detalleGeneral != undefined) {
							if (response.data.result.detalleGeneral.detalleMateriales) {
								$scope.isTecnicoConsultaMateriales = true;
								$scope.tecnicoConsultaMateriales = response.data.result.detalleGeneral
								$scope.tecnicoConsultaMateriales.nombreCommpleto = $scope.tecnicoConsultaMateriales.nombre + ' ' + $scope.tecnicoConsultaMateriales.apellidoPaterno + ' ' + $scope.tecnicoConsultaMateriales.apellidoMaterno
								let tempArrayResult = angular.copy(response.data.result.detalleGeneral.detalleMateriales);
								angular.forEach(tempArrayResult, function (elem, index) {
									$("#table-materiales-ot tbody").append(`
										<tr>
											<td >${elem.sku && elem.sku !== '' ? elem.sku : 'Sin informaci&oacute;n'} </td>
											<td >${elem.descripcion && elem.descripcion !== '' ? elem.descripcion : 'Sin informaci&oacute;n'} </td>
											<td >${elem.tipo && elem.tipo !== '' ? elem.tipo : 'Sin informaci&oacute;n'} </td>
											<td >${elem.grupo && elem.grupo !== '' ? elem.grupo : 'Sin informaci&oacute;n'} </td>
											<td >${elem.lote && elem.lote !== '' ? elem.lote : 'Sin informaci&oacute;n'} </td>
											<td >${elem.numSerie && elem.numSerie !== '' ? elem.numSerie : 'Sin informaci&oacute;n'} </td>
											<td >${elem.familia && elem.familia !== '' ? elem.familia : 'Sin informaci&oacute;n'} </td>
											<td >${elem.docSap && elem.docSap !== '' ? elem.docSap : 'Sin informaci&oacute;n'} </td>
											<td >${transformarTextPrecio(elem.precio)} </td>
											<td >${elem.cantidad && elem.cantidad !== '' ? elem.cantidad : 'Sin informaci&oacute;n'} </td>
											<td >${transformarTextPrecio(elem.costo)} </td>
											<td >${elem.unidad && elem.unidad !== '' ? elem.unidad : 'Sin informaci&oacute;n'} </td>
											<td >${elem.comentariosSap && elem.comentariosSap !== '' ? elem.comentariosSap : 'Sin informaci&oacute;n'} </td>
										</tr>
									`)
								})
								$scope.inicializarTableMaterialesOt()
								swal.close()
							} else {
								$scope.inicializarTableMaterialesOt();
								mostrarMensajeInformativo("No se encontraron datos de materiales");
								swal.close()
							}
						} else {
							$scope.inicializarTableMaterialesOt();
							$scope.isTecnicoConsultaMateriales = false;
							mostrarMensajeInformativo("No se encontraron datos de materiales")
							swal.close()
						}
					} else {
						$scope.inicializarTableMaterialesOt();
						$scope.isTecnicoConsultaMateriales = false;
						mostrarMensajeInformativo(response.data.result.description);
						swal.close();
					}
					isConsultaMateriales = true
				} else {
					$scope.inicializarTableMaterialesOt();
					$scope.isTecnicoConsultaMateriales = false;
					mostrarMensajeErrorAlert('Ha ocurrido un error en la consulta de los datos');
					swal.close()
				}
			}).catch(err => handleError(err));
		}
	}

}]);