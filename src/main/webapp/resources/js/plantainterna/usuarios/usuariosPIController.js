var app = angular.module('usuarioApp', []);
var detalleTable;

app.controller('usuarioController', ['$scope', 'usuarioPIService', '$filter', function ($scope, usuarioPIService, $filter) {
    $("#moduloUsuarios").addClass('active')
    console.log("UsuarioController");
    $scope.listaCompanias = [];
    $scope.listaPuestos = [];
    $scope.listaRegiones = [];
    $scope.listaCiudades = [];
    $scope.listaClasificacionUsuario = [];

    $scope.mostrarAccesos = true;
    $scope.mostrarTecnicos = true;

    $scope.listaCiudadNatal = [];
    $scope.ciudadNatal = {};


    $scope.consultarCompanias = function() {
        var params = new FormData();
        params.append("params.idPmFFM", "14922");
        usuarioPIService.consultarCompanias().then(function success(response) {
            console.log(response);

            //$scope.listaCompanias = response.data.result;
            //PENDIENTE
            $scope.listaCompanias = [{"id":"10","descripcion":"TOTALPLAY","isActivo":false},{"id":"37","descripcion":"TP EMPRESARIAL","isActivo":false},{"id":"11","descripcion":"777 CHD","isActivo":false},{"id":"23","descripcion":"ABOS","isActivo":false},{"id":"12","descripcion":"AMBERBLUE","isActivo":false},{"id":"81","descripcion":"BEATRIZ ALEJANDRA GARCIA DOMINGUEZ","isActivo":false},{"id":"85","descripcion":"BRAME","isActivo":false},{"id":"66","descripcion":"BRANCHBIT ","isActivo":false},{"id":"35","descripcion":"CABLING","isActivo":false},{"id":"97","descripcion":"CC INSTALL","isActivo":false},{"id":"74","descripcion":"CLIMATIZACIONES Y CONSTRUCCIONES DEL NORESTE SA DE CV","isActivo":false},{"id":"98","descripcion":"COINTER","isActivo":false},{"id":"59","descripcion":"CONDENSA","isActivo":false},{"id":"19","descripcion":"CONSICEL","isActivo":false},{"id":"69","descripcion":"CONSTRUCTORA ABOS","isActivo":false},{"id":"89","descripcion":"CONTELSAC S. DE R.L. DE C.V.","isActivo":false},{"id":"13","descripcion":"DIAN","isActivo":false},{"id":"65","descripcion":"DISA-INGENIERIA","isActivo":false},{"id":"24","descripcion":"DISARO","isActivo":false},{"id":"88","descripcion":"DL TELECOM","isActivo":false},{"id":"40","descripcion":"ENERWIRE","isActivo":false},{"id":"25","descripcion":"ESBA","isActivo":false},{"id":"16","descripcion":"ESTEVEZ","isActivo":false},{"id":"9","descripcion":"EXPERTCELL","isActivo":false},{"id":"67","descripcion":"FRANCO SOTO CO S.A. DE C.V","isActivo":false},{"id":"83","descripcion":"FUSION TELECOMUNICACIONES","isActivo":false},{"id":"36","descripcion":"Fco Javier Zepeda","isActivo":false},{"id":"80","descripcion":"GLOBARED SA DE CV","isActivo":false},{"id":"2","descripcion":"GOBEX","isActivo":false},{"id":"18","descripcion":"GUIPO","isActivo":false},{"id":"15","descripcion":"HIDALZAC","isActivo":false},{"id":"39","descripcion":"HYBRID","isActivo":false},{"id":"22","descripcion":"IEX","isActivo":false},{"id":"7","descripcion":"INCORET","isActivo":false},{"id":"26","descripcion":"INFRACOM","isActivo":false},{"id":"34","descripcion":"INSTAFIBRA","isActivo":false},{"id":"43","descripcion":"ISREDES","isActivo":false},{"id":"17","descripcion":"ITAI","isActivo":false},{"id":"8","descripcion":"JOCO","isActivo":false},{"id":"61","descripcion":"LCC","isActivo":false},{"id":"28","descripcion":"MAFTEC","isActivo":false},{"id":"70","descripcion":"MAHEVO","isActivo":false},{"id":"75","descripcion":"MD REDES","isActivo":false},{"id":"5","descripcion":"MEGON","isActivo":false},{"id":"64","descripcion":"MICROONDAS Y REDES DE COMUNICACION","isActivo":false},{"id":"29","descripcion":"MISTEL","isActivo":false},{"id":"82","descripcion":"NADS","isActivo":false},{"id":"14","descripcion":"OCEAN PACIFIC","isActivo":false},{"id":"91","descripcion":"PEDRO GOMEZ JUREZ","isActivo":false},{"id":"68","descripcion":"PEOPLE NETWORKS SOLUTIONS SA DE CV","isActivo":false},{"id":"100","descripcion":"PRESEA","isActivo":false},{"id":"30","descripcion":"PROTELVAN","isActivo":false},{"id":"6","descripcion":"QUALITY","isActivo":false},{"id":"102","descripcion":"RAFMX","isActivo":false},{"id":"4","descripcion":"RCE","isActivo":false},{"id":"63","descripcion":"RED COMERCIAL EMPRESARIAL","isActivo":false},{"id":"86","descripcion":"RETESA","isActivo":false},{"id":"87","descripcion":"RIVADESELLA","isActivo":false},{"id":"33","descripcion":"ROBERTO CARLOS","isActivo":false},{"id":"84","descripcion":"SANDRA QUINTERO OLIDEN","isActivo":false},{"id":"3","descripcion":"SARWAAT","isActivo":false},{"id":"79","descripcion":"SEMTEC","isActivo":false},{"id":"21","descripcion":"SILFAR","isActivo":false},{"id":"58","descripcion":"SOLUCIONIKA","isActivo":false},{"id":"31","descripcion":"TETSI","isActivo":false},{"id":"60","descripcion":"TORIZ TELECOM S.A. DE C.V.","isActivo":false},{"id":"32","descripcion":"TOTALCOMM","isActivo":false},{"id":"38","descripcion":"TV. CONSTRUCTORES LAMA","isActivo":false},{"id":"1","descripcion":"URQUIDI","isActivo":false}];

            $("#compania_select").empty();
            $("#compania_select_registro").empty();
            $("#compania_select_modificacion").empty();

            angular.forEach($scope.listaCompanias,(element,index) => {
                $("#compania_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");

                
                if(  element.id === '10' ||  element.id === '37'  ) { 
                    $("#compania_select_registro").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
                    $("#compania_select_modificacion").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
                }
                
            });

            $('#compania_select').selectpicker("refresh");
            $('#compania_select_registro').selectpicker("refresh");
            $('#compania_select_modificacion').selectpicker("refresh");

            

            //$scope.llenarCompaniasSelect($scope.listaCompanias);
            $scope.consultarPuestos();
            
        }.catch(err => handleError(err)));
    }
    $scope.consultarCompanias();


    $scope.consultarPuestos = function() {
        usuarioPIService.consultarPuestos().then(function success(response) {
            console.log(response);

            //$scope.listaPuestos = response.data.result;
            //PENDIENTE
            $scope.listaPuestos = [{"id":"1","descripcion":"DIRECTOR DE OPERACIONES EN CAMPO","isActivo":false},{"id":"2","descripcion":"GERENTE REGIONAL","isActivo":false},{"id":"3","descripcion":"GERENTE DE PLAZA","isActivo":false},{"id":"9","descripcion":"PROJECT MANAGER","isActivo":false},{"id":"8","descripcion":"AUXILIAR","isActivo":false},{"id":"5","descripcion":"DESPACHO","isActivo":false},{"id":"13","descripcion":"INVITADO","isActivo":false},{"id":"7","descripcion":"TECNICO","isActivo":false},{"id":"11","descripcion":"AUDITOR","isActivo":false}];
            $("#puesto_select").empty();
            $("#puesto_select_registro").empty();
            $("#puesto_select_modificacion").empty();
            angular.forEach($scope.listaPuestos,(element,index) => {
                $("#puesto_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
                $("#puesto_select_registro").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
                $("#puesto_select_modificacion").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
            });
            $('#puesto_select').selectpicker("refresh");
            $('#puesto_select_registro').selectpicker("refresh");
            $('#puesto_select_modificacion').selectpicker("refresh");

            $scope.consultarRegionesEstructura();
            
        }).catch(err => handleError(err));
    }
    //$scope.consultarPuestos();


    $scope.consultarRegionesEstructura = function() {
        usuarioPIService.consultarRegionesEstructura().then(function success(response) {
            console.log(response);

            //$scope.listaRegiones = response.data.result;
            //PENDIENTE
            $scope.listaRegiones = [{"id":"73","descripcion":"BAJIO","isActivo":false},{"id":"2","descripcion":"BCN","isActivo":false},{"id":"17","descripcion":"CHIHUAHUA","isActivo":false},{"id":"16","descripcion":"CULIACAN","isActivo":false},{"id":"591","descripcion":"MEGACENTRO","isActivo":false},{"id":"43","descripcion":"NORESTE","isActivo":false},{"id":"124","descripcion":"OCCIDENTE","isActivo":false},{"id":"1881","descripcion":"REGION COLOMBIA","isActivo":false},{"id":"15","descripcion":"SONORA","isActivo":false},{"id":"164","descripcion":"SUR","isActivo":false},{"id":"207","descripcion":"SURESTE","isActivo":false},{"id":"189","descripcion":"VERACRUZ","isActivo":false},{"id":"206","descripcion":"VILLAHERMOSA","isActivo":false}];
            $("#region_select").empty();
            angular.forEach($scope.listaRegiones,(element,index) => {
                $("#region_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
            });
            $('#region_select').selectpicker("refresh");
            
        }.catch(err => handleError(err)));
    }
    //$scope.consultarRegionesEstructura();


    $scope.consultarClasificacionUsuario = function() {
        usuarioPIService.consultarClasificacionUsuario().then(function success(response) {
            console.log(response);

            var idPropietario = "1";
            

            //$scope.listaClasificacionUsuario = response.data.result;
            //PENDIENTE
            $scope.listaClasificacionUsuario = [{"id":"1","descripcion":"PLANTA INTERNA","isActivo":false},{"id":"2","descripcion":"PLANTA EXTERNA","isActivo":false},{"id":"7","descripcion":"PBX ENLACE","isActivo":false},{"id":"8","descripcion":"PBX PANASONIC","isActivo":false},{"id":"9","descripcion":"PBX AVAYA","isActivo":false},{"id":"16","descripcion":"PLANTA INTERNA RESIDENCIAL","isActivo":false},{"id":"14","descripcion":"PE PI","isActivo":false},{"id":"15","descripcion":"CORTE INDIVIDUAL","isActivo":false},{"id":"19","descripcion":"INCIDENCIAS PI","isActivo":false},{"id":"21","descripcion":"PMO","isActivo":false},{"id":"17","descripcion":"INFRAESTRUCTURA","isActivo":false},{"id":"18","descripcion":"ARBOL TX","isActivo":false},{"id":"13","descripcion":"TP SOLUCIONES","isActivo":false},{"id":"20","descripcion":"TotalSec","isActivo":false}];
            $scope.listaClasificacionSesion = [];
            $scope.listaClasificacionSesionMod = [];
            angular.forEach($scope.listaClasificacionUsuario,(element,index) => {
                if(element.id === idPropietario) {
                    $scope.listaClasificacionSesion.push(element);
                    $scope.listaClasificacionSesionMod.push(element);
                }
            });
            
            
        }).catch(err => handleError(err)); 
    }
    $scope.consultarClasificacionUsuario();


    $scope.listaIntervenciones = [];
    $scope.consultarIntervencionesPorPropietario = function() {
        $scope.params = {};
        $scope.params.id_propietarios = "7";
        usuarioPIService.consultarIntervencionesPorPropietarios($scope.params).then(function success(response) {
            console.log(response);
            //$scope.listaIntervenciones = response.data.result;
            //PENDIENTE
            $scope.listaIntervenciones = [{"id":"30","descripcion":"PLANTA EXTERNA","idpadre":"14","isActivo":false},{"id":"30","descripcion":"PLANTA EXTERNA","idpadre":"2","isActivo":false},{"id":"48","descripcion":"INSTALACIÓN","idpadre":"1","isActivo":false},{"id":"48","descripcion":"INSTALACIÓN","idpadre":"13","isActivo":false},{"id":"55","descripcion":"SOPORTE","idpadre":"1","isActivo":false},{"id":"93","descripcion":"MANTENIMIENTO DE RED","idpadre":"2","isActivo":false},{"id":"95","descripcion":"INSTALACION TP SOLUCIONES","idpadre":"13","isActivo":false},{"id":"97","descripcion":"INSPECTOR DE RED","idpadre":"2","isActivo":false},{"id":"104","descripcion":"INSTALACION INTEGRADOR","idpadre":"9","isActivo":false},{"id":"104","descripcion":"INSTALACION INTEGRADOR","idpadre":"8","isActivo":false},{"id":"104","descripcion":"INSTALACION INTEGRADOR","idpadre":"7","isActivo":false},{"id":"104","descripcion":"INSTALACION INTEGRADOR","idpadre":"20","isActivo":false},{"id":"106","descripcion":"RENOVACION","idpadre":"13","isActivo":false},{"id":"106","descripcion":"RENOVACION","idpadre":"1","isActivo":false},{"id":"108","descripcion":"REUBICACION","idpadre":"13","isActivo":false},{"id":"112","descripcion":"SOPORTE DE MANTENIMIENTO","idpadre":"1","isActivo":false},{"id":"112","descripcion":"SOPORTE DE MANTENIMIENTO","idpadre":"15","isActivo":false},{"id":"113","descripcion":"AUDITORIA","idpadre":"13","isActivo":false},{"id":"119","descripcion":"CORTE MASIVO","idpadre":"14","isActivo":false},{"id":"119","descripcion":"CORTE MASIVO","idpadre":"2","isActivo":false},{"id":"120","descripcion":"INSTALACION","idpadre":"16","isActivo":false},{"id":"127","descripcion":"MANTENIMIENTO PREVENTIVO PI","idpadre":"14","isActivo":false},{"id":"127","descripcion":"MANTENIMIENTO PREVENTIVO PI","idpadre":"2","isActivo":false},{"id":"141","descripcion":"UNIVERSAL","idpadre":"1","isActivo":false},{"id":"153","descripcion":"PLANTA EXTERNA TX","idpadre":"2","isActivo":false},{"id":"154","descripcion":"CALL CENTER","idpadre":"2","isActivo":false},{"id":"154","descripcion":"CALL CENTER","idpadre":"14","isActivo":false},{"id":"155","descripcion":"RENOVACION INTEGRADOR","idpadre":"9","isActivo":false},{"id":"155","descripcion":"RENOVACION INTEGRADOR","idpadre":"8","isActivo":false},{"id":"155","descripcion":"RENOVACION INTEGRADOR","idpadre":"7","isActivo":false},{"id":"155","descripcion":"RENOVACION INTEGRADOR","idpadre":"20","isActivo":false},{"id":"163","descripcion":"IMPLEMENTACION","idpadre":"1","isActivo":false},{"id":"165","descripcion":"INFRAESTRUCTURA PMP","idpadre":"17","isActivo":false},{"id":"165","descripcion":"INFRAESTRUCTURA PMP","idpadre":"2","isActivo":false},{"id":"169","descripcion":"COBERTURA FUERA DE CLUSTER","idpadre":"2","isActivo":false},{"id":"169","descripcion":"COBERTURA FUERA DE CLUSTER","idpadre":"17","isActivo":false},{"id":"177","descripcion":"INFRAESTRUCTURA PTP","idpadre":"17","isActivo":false},{"id":"177","descripcion":"INFRAESTRUCTURA PTP","idpadre":"2","isActivo":false},{"id":"180","descripcion":"RED METRO","idpadre":"17","isActivo":false},{"id":"180","descripcion":"RED METRO","idpadre":"2","isActivo":false},{"id":"185","descripcion":"IMPLEMENTACION MICROONDA","idpadre":"17","isActivo":false},{"id":"185","descripcion":"IMPLEMENTACION MICROONDA","idpadre":"2","isActivo":false},{"id":"247","descripcion":"BACKBONE MW","idpadre":"2","isActivo":false},{"id":"247","descripcion":"BACKBONE MW","idpadre":"17","isActivo":false},{"id":"249","descripcion":"CARRIERS","idpadre":"2","isActivo":false},{"id":"249","descripcion":"CARRIERS","idpadre":"17","isActivo":false},{"id":"258","descripcion":"SOPORTES SERVICE DESK","idpadre":"1","isActivo":false},{"id":"259","descripcion":"POSTVENTA","idpadre":"1","isActivo":false},{"id":"260","descripcion":"APOYO A VENTAS","idpadre":"1","isActivo":false},{"id":"261","descripcion":"INSTALACION UN","idpadre":"1","isActivo":false},{"id":"262","descripcion":"SERVICIOS ADMINISTRADOS","idpadre":"1","isActivo":false},{"id":"263","descripcion":"INFRAESTRUCTURA","idpadre":"1","isActivo":false},{"id":"264","descripcion":"SOPORTE RESIDENCIAL","idpadre":"1","isActivo":false},{"id":"265","descripcion":"SOLUCION A LA MEDIDA","idpadre":"1","isActivo":false},{"id":"274","descripcion":"SITE OWNER","idpadre":"1","isActivo":false},{"id":"275","descripcion":"PLANTA EXTERNA OU","idpadre":"1","isActivo":false},{"id":"276","descripcion":"ADECUACIONES","idpadre":"1","isActivo":false},{"id":"277","descripcion":"PLAZA COMERCIAL","idpadre":"1","isActivo":false},{"id":"278","descripcion":"OTROS","idpadre":"1","isActivo":false}];


            angular.forEach($scope.listaIntervenciones,(element,index) => {
                element.select = '0';
            });
        }).catch(err => handleError(err));
    }
    $scope.consultarIntervencionesPorPropietario();


    $scope.arbolCiudades = [];
    $scope.consultarArbolesCiudades = function() {
        usuarioPIService.consultarArbolesCiudades().then(function success(response) {
            console.log(response);

            $scope.arbolCiudades = [{"id":"2","descripcion":"BCN","idpadre":"1","nivel":"1","isActivo":false},{"id":"15","descripcion":"SONORA","idpadre":"1","nivel":"1","isActivo":false},{"id":"16","descripcion":"CULIACAN","idpadre":"1","nivel":"1","isActivo":false},{"id":"17","descripcion":"CHIHUAHUA","idpadre":"1","nivel":"1","isActivo":false},{"id":"43","descripcion":"NORESTE","idpadre":"1","nivel":"1","isActivo":false},{"id":"73","descripcion":"BAJIO","idpadre":"1","nivel":"1","isActivo":false},{"id":"124","descripcion":"OCCIDENTE","idpadre":"1","nivel":"1","isActivo":false},{"id":"164","descripcion":"SUR","idpadre":"1","nivel":"1","isActivo":false},{"id":"189","descripcion":"VERACRUZ","idpadre":"1","nivel":"1","isActivo":false},{"id":"206","descripcion":"VILLAHERMOSA","idpadre":"1","nivel":"1","isActivo":false},{"id":"207","descripcion":"SURESTE","idpadre":"1","nivel":"1","isActivo":false},{"id":"591","descripcion":"MEGACENTRO","idpadre":"1","nivel":"1","isActivo":false},{"id":"1881","descripcion":"REGION COLOMBIA","idpadre":"1","nivel":"1","isActivo":false},{"id":"0","descripcion":"TOTALPLAY","idpadre":"-1","nivel":"2","isActivo":false},{"id":"1","descripcion":"TOTALPLAY EMPRESARIAL","idpadre":"","nivel":"2","isActivo":false},{"id":"3","descripcion":"TIJUANA","idpadre":"2","nivel":"2","isActivo":false},{"id":"18","descripcion":"CHIHUAHUA","idpadre":"17","nivel":"2","isActivo":false},{"id":"28","descripcion":"CIUDAD JUAREZ","idpadre":"17","nivel":"2","isActivo":false},{"id":"44","descripcion":"MONTERREY","idpadre":"43","nivel":"2","isActivo":false},{"id":"74","descripcion":"AGUASCALIENTES","idpadre":"73","nivel":"2","isActivo":false},{"id":"83","descripcion":"CELAYA","idpadre":"73","nivel":"2","isActivo":false},{"id":"92","descripcion":"LEON","idpadre":"73","nivel":"2","isActivo":false},{"id":"104","descripcion":"QUERETARO","idpadre":"73","nivel":"2","isActivo":false},{"id":"114","descripcion":"SAN LUIS POTOSI","idpadre":"73","nivel":"2","isActivo":false},{"id":"125","descripcion":"GUADALAJARA","idpadre":"124","nivel":"2","isActivo":false},{"id":"156","descripcion":"MORELIA","idpadre":"124","nivel":"2","isActivo":false},{"id":"165","descripcion":"CUERNAVACA","idpadre":"164","nivel":"2","isActivo":false},{"id":"175","descripcion":"PUEBLA","idpadre":"164","nivel":"2","isActivo":false},{"id":"190","descripcion":"VERACRUZ","idpadre":"189","nivel":"2","isActivo":false},{"id":"198","descripcion":"XALAPA","idpadre":"189","nivel":"2","isActivo":false},{"id":"208","descripcion":"CANCUN","idpadre":"207","nivel":"2","isActivo":false},{"id":"216","descripcion":"MERIDA","idpadre":"207","nivel":"2","isActivo":false},{"id":"394","descripcion":"CABO SAN LUCAS","idpadre":"2","nivel":"2","isActivo":false},{"id":"395","descripcion":"ENSENADA","idpadre":"2","nivel":"2","isActivo":false},{"id":"396","descripcion":"LA PAZ","idpadre":"2","nivel":"2","isActivo":false},{"id":"397","descripcion":"MEXICALI","idpadre":"2","nivel":"2","isActivo":false},{"id":"398","descripcion":"ROSARITO","idpadre":"2","nivel":"2","isActivo":false},{"id":"399","descripcion":"SAN JOSE DEL CABO","idpadre":"2","nivel":"2","isActivo":false},{"id":"400","descripcion":"TECATE","idpadre":"2","nivel":"2","isActivo":false},{"id":"401","descripcion":"CIUDAD OBREGON","idpadre":"15","nivel":"2","isActivo":false},{"id":"402","descripcion":"GUAYMAS","idpadre":"15","nivel":"2","isActivo":false},{"id":"403","descripcion":"HERMOSILLO","idpadre":"15","nivel":"2","isActivo":false},{"id":"404","descripcion":"NAVOJOA","idpadre":"15","nivel":"2","isActivo":false},{"id":"405","descripcion":"NOGALES","idpadre":"15","nivel":"2","isActivo":false},{"id":"406","descripcion":"PUERTO PEÑASCO","idpadre":"15","nivel":"2","isActivo":false},{"id":"407","descripcion":"SAN LUIS RIO COLORADO","idpadre":"15","nivel":"2","isActivo":false},{"id":"408","descripcion":"CULIACAN","idpadre":"16","nivel":"2","isActivo":false},{"id":"409","descripcion":"GUAMUCHIL","idpadre":"16","nivel":"2","isActivo":false},{"id":"410","descripcion":"GUASAVE","idpadre":"16","nivel":"2","isActivo":false},{"id":"411","descripcion":"LOS MOCHIS","idpadre":"16","nivel":"2","isActivo":false},{"id":"412","descripcion":"MAZATLAN","idpadre":"16","nivel":"2","isActivo":false},{"id":"414","descripcion":"CUAUHTEMOC","idpadre":"17","nivel":"2","isActivo":false},{"id":"415","descripcion":"DELICIAS","idpadre":"17","nivel":"2","isActivo":false},{"id":"416","descripcion":"DURANGO","idpadre":"17","nivel":"2","isActivo":false},{"id":"422","descripcion":"CIUDAD VICTORIA","idpadre":"43","nivel":"2","isActivo":false},{"id":"423","descripcion":"MATAMOROS","idpadre":"43","nivel":"2","isActivo":false},{"id":"424","descripcion":"MONCLOVA","idpadre":"43","nivel":"2","isActivo":false},{"id":"425","descripcion":"NUEVO LAREDO","idpadre":"43","nivel":"2","isActivo":false},{"id":"426","descripcion":"PIEDRAS NEGRAS","idpadre":"43","nivel":"2","isActivo":false},{"id":"427","descripcion":"REYNOSA","idpadre":"43","nivel":"2","isActivo":false},{"id":"429","descripcion":"SALTILLO","idpadre":"43","nivel":"2","isActivo":false},{"id":"430","descripcion":"TAMPICO","idpadre":"43","nivel":"2","isActivo":false},{"id":"431","descripcion":"TORREON","idpadre":"17","nivel":"2","isActivo":false},{"id":"432","descripcion":"CIUDAD VALLES","idpadre":"73","nivel":"2","isActivo":false},{"id":"433","descripcion":"FRESNILLO","idpadre":"73","nivel":"2","isActivo":false},{"id":"434","descripcion":"GUANAJUATO","idpadre":"73","nivel":"2","isActivo":false},{"id":"435","descripcion":"IRAPUATO","idpadre":"73","nivel":"2","isActivo":false},{"id":"436","descripcion":"MATEHUALA","idpadre":"73","nivel":"2","isActivo":false},{"id":"438","descripcion":"SALAMANCA","idpadre":"73","nivel":"2","isActivo":false},{"id":"439","descripcion":"SAN JUAN DEL RIO","idpadre":"73","nivel":"2","isActivo":false},{"id":"440","descripcion":"SAN MIGUEL ALLENDE","idpadre":"73","nivel":"2","isActivo":false},{"id":"441","descripcion":"SILAO","idpadre":"73","nivel":"2","isActivo":false},{"id":"444","descripcion":"ZACATECAS","idpadre":"73","nivel":"2","isActivo":false},{"id":"445","descripcion":"APATZINGAN","idpadre":"124","nivel":"2","isActivo":false},{"id":"450","descripcion":"CIUDAD GUZMAN","idpadre":"124","nivel":"2","isActivo":false},{"id":"451","descripcion":"COLIMA","idpadre":"124","nivel":"2","isActivo":false},{"id":"452","descripcion":"LA PIEDAD","idpadre":"124","nivel":"2","isActivo":false},{"id":"453","descripcion":"LAGOS DE MORENO","idpadre":"124","nivel":"2","isActivo":false},{"id":"454","descripcion":"LAZARO CARDENAS","idpadre":"124","nivel":"2","isActivo":false},{"id":"456","descripcion":"MANZANILLO","idpadre":"124","nivel":"2","isActivo":false},{"id":"459","descripcion":"PUERTO VALLARTA","idpadre":"124","nivel":"2","isActivo":false},{"id":"462","descripcion":"TEPIC","idpadre":"124","nivel":"2","isActivo":false},{"id":"464","descripcion":"URUAPAN","idpadre":"124","nivel":"2","isActivo":false},{"id":"465","descripcion":"ZAMORA","idpadre":"124","nivel":"2","isActivo":false},{"id":"466","descripcion":"ACAPULCO","idpadre":"164","nivel":"2","isActivo":false},{"id":"467","descripcion":"APIZACO","idpadre":"164","nivel":"2","isActivo":false},{"id":"468","descripcion":"ATLIXCO","idpadre":"164","nivel":"2","isActivo":false},{"id":"469","descripcion":"CHILPANCINGO","idpadre":"164","nivel":"2","isActivo":false},{"id":"471","descripcion":"CUAUTLA","idpadre":"164","nivel":"2","isActivo":false},{"id":"472","descripcion":"HUACHINANGO","idpadre":"164","nivel":"2","isActivo":false},{"id":"473","descripcion":"HUATULCO","idpadre":"164","nivel":"2","isActivo":false},{"id":"474","descripcion":"IGUALA","idpadre":"164","nivel":"2","isActivo":false},{"id":"475","descripcion":"IZUCAR DE MATAMOROS","idpadre":"164","nivel":"2","isActivo":false},{"id":"478","descripcion":"OAXACA","idpadre":"164","nivel":"2","isActivo":false},{"id":"479","descripcion":"SALINA CRUZ","idpadre":"164","nivel":"2","isActivo":false},{"id":"481","descripcion":"TAXCO","idpadre":"164","nivel":"2","isActivo":false},{"id":"482","descripcion":"TEHUACAN","idpadre":"164","nivel":"2","isActivo":false},{"id":"484","descripcion":"TEZIUTLAN","idpadre":"164","nivel":"2","isActivo":false},{"id":"485","descripcion":"TLAXCALA","idpadre":"164","nivel":"2","isActivo":false},{"id":"490","descripcion":"ZIHUATANEJO","idpadre":"164","nivel":"2","isActivo":false},{"id":"491","descripcion":"ACAYUCAN","idpadre":"189","nivel":"2","isActivo":false},{"id":"492","descripcion":"ALVARADO","idpadre":"189","nivel":"2","isActivo":false},{"id":"494","descripcion":"COATZACOALCOS","idpadre":"189","nivel":"2","isActivo":false},{"id":"495","descripcion":"CORDOBA","idpadre":"189","nivel":"2","isActivo":false},{"id":"496","descripcion":"COSAMALOAPAN","idpadre":"189","nivel":"2","isActivo":false},{"id":"497","descripcion":"MARTINEZ DE LA TORRE","idpadre":"189","nivel":"2","isActivo":false},{"id":"498","descripcion":"MINATITLAN","idpadre":"189","nivel":"2","isActivo":false},{"id":"500","descripcion":"ORIZABA","idpadre":"189","nivel":"2","isActivo":false},{"id":"501","descripcion":"PEROTE","idpadre":"189","nivel":"2","isActivo":false},{"id":"502","descripcion":"POZA RICA","idpadre":"189","nivel":"2","isActivo":false},{"id":"503","descripcion":"SAN ANDRES TUXTLA","idpadre":"189","nivel":"2","isActivo":false},{"id":"504","descripcion":"TIERRA BLANCA","idpadre":"189","nivel":"2","isActivo":false},{"id":"505","descripcion":"TUXPAN","idpadre":"189","nivel":"2","isActivo":false},{"id":"506","descripcion":"CIUDAD DEL CARMEN","idpadre":"206","nivel":"2","isActivo":false},{"id":"512","descripcion":"TAPACHULA","idpadre":"206","nivel":"2","isActivo":false},{"id":"514","descripcion":"TUXTLA GUTIERREZ","idpadre":"206","nivel":"2","isActivo":false},{"id":"515","descripcion":"VILLAHERMOSA","idpadre":"206","nivel":"2","isActivo":false},{"id":"517","descripcion":"CAMPECHE","idpadre":"207","nivel":"2","isActivo":false},{"id":"518","descripcion":"CHETUMAL","idpadre":"207","nivel":"2","isActivo":false},{"id":"519","descripcion":"COZUMEL","idpadre":"207","nivel":"2","isActivo":false},{"id":"520","descripcion":"ISLA MUJERES","idpadre":"207","nivel":"2","isActivo":false},{"id":"521","descripcion":"PLAYA DEL CARMEN","idpadre":"207","nivel":"2","isActivo":false},{"id":"525","descripcion":"JALMOLONGA","idpadre":"591","nivel":"2","isActivo":false},{"id":"528","descripcion":"VALLE DE BRAVO","idpadre":"591","nivel":"2","isActivo":false},{"id":"529","descripcion":"ATLACOMULCO","idpadre":"591","nivel":"2","isActivo":false},{"id":"532","descripcion":"APAN","idpadre":"591","nivel":"2","isActivo":false},{"id":"533","descripcion":"IXMIQUILPAN","idpadre":"591","nivel":"2","isActivo":false},{"id":"535","descripcion":"TIZAYUCA","idpadre":"591","nivel":"2","isActivo":false},{"id":"538","descripcion":"TULANCINGO","idpadre":"591","nivel":"2","isActivo":false},{"id":"541","descripcion":"PARRAL","idpadre":"17","nivel":"2","isActivo":false},{"id":"592","descripcion":"CIUDAD DE MEXICO","idpadre":"591","nivel":"2","isActivo":false},{"id":"593","descripcion":"TOLUCA","idpadre":"591","nivel":"2","isActivo":false},{"id":"594","descripcion":"PACHUCA","idpadre":"591","nivel":"2","isActivo":false},{"id":"783","descripcion":"CIUDAD MANTE","idpadre":"43","nivel":"2","isActivo":false},{"id":"795","descripcion":"SAN LUIS DE LA PAZ","idpadre":"73","nivel":"2","isActivo":false},{"id":"797","descripcion":"SABINA","idpadre":"43","nivel":"2","isActivo":false},{"id":"799","descripcion":"CIUDAD ACUÑA","idpadre":"43","nivel":"2","isActivo":false},{"id":"801","descripcion":"RAMOS ARIZPE","idpadre":"43","nivel":"2","isActivo":false},{"id":"807","descripcion":"BERRENDO","idpadre":"17","nivel":"2","isActivo":false},{"id":"809","descripcion":"CASAS GRANDES","idpadre":"17","nivel":"2","isActivo":false},{"id":"813","descripcion":"JOJUTLA","idpadre":"164","nivel":"2","isActivo":false},{"id":"820","descripcion":"SAN FRANCISCO DEL RINCON","idpadre":"73","nivel":"2","isActivo":false},{"id":"824","descripcion":"TEPEJI","idpadre":"591","nivel":"2","isActivo":false},{"id":"826","descripcion":"TULA","idpadre":"591","nivel":"2","isActivo":false},{"id":"829","descripcion":"SAN JUAN TEOTIHUACAN","idpadre":"591","nivel":"2","isActivo":false},{"id":"836","descripcion":"HUAJUAPAN DE LEON","idpadre":"164","nivel":"2","isActivo":false},{"id":"838","descripcion":"SAN MARTIN TEXMELUCAN","idpadre":"164","nivel":"2","isActivo":false},{"id":"841","descripcion":"TAXCO","idpadre":"164","nivel":"2","isActivo":false},{"id":"847","descripcion":"TENANGO","idpadre":"591","nivel":"2","isActivo":false},{"id":"849","descripcion":"MANINALCO","idpadre":"591","nivel":"2","isActivo":false},{"id":"853","descripcion":"SAN CRISTOBAL","idpadre":"206","nivel":"2","isActivo":false},{"id":"855","descripcion":"TUXTEPEC OAXACA","idpadre":"189","nivel":"2","isActivo":false},{"id":"861","descripcion":"BOCA DEL RIO","idpadre":"189","nivel":"2","isActivo":false},{"id":"865","descripcion":"LAS CHOAPAS","idpadre":"189","nivel":"2","isActivo":false},{"id":"871","descripcion":"NARANJOS","idpadre":"189","nivel":"2","isActivo":false},{"id":"1882","descripcion":"GIRARDOT","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1884","descripcion":"SAN GIL","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1886","descripcion":"DIUTAMA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1888","descripcion":"PALERMO","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1890","descripcion":"BOGOTA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1892","descripcion":"TOCANCIPA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1894","descripcion":"TUNJA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1896","descripcion":"FLORENCIA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1898","descripcion":"CAUCA_POPAYAN","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1900","descripcion":"VILLA DE LEYBA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1902","descripcion":"MANIZALES","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1904","descripcion":"YOPAL","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1906","descripcion":"CARTAGENA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1908","descripcion":"QUIBDO","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1910","descripcion":"FUGACATIVA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1912","descripcion":"MEDELLIN","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1914","descripcion":"ZIPAQUIRA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1916","descripcion":"MONTERIA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1918","descripcion":"CHINQUINQUIRA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1920","descripcion":"RIONEGRO","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1922","descripcion":"GRANADA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1924","descripcion":"PUERTO GAITAN","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1926","descripcion":"FUSAGASUCA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1928","descripcion":"PUERTO LOPEZ","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1930","descripcion":"MOCOA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1932","descripcion":"SOGAMOSO","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1934","descripcion":"SARAVENA","idpadre":"1881","nivel":"2","isActivo":false},{"id":"1938","descripcion":"PUERTO ESCONDIDO","idpadre":"164","nivel":"2","isActivo":false},{"id":"1941","descripcion":"COATEPEC","idpadre":"189","nivel":"2","isActivo":false},{"id":"1976","descripcion":"TULUM","idpadre":"207","nivel":"2","isActivo":false},{"id":"4","descripcion":"TIJUANA","idpadre":"3","nivel":"3","isActivo":false},{"id":"19","descripcion":"CHIHUAHUA","idpadre":"18","nivel":"3","isActivo":false},{"id":"29","descripcion":"CIUDAD JUAREZ","idpadre":"28","nivel":"3","isActivo":false},{"id":"75","descripcion":"AGUASCALIENTES","idpadre":"74","nivel":"3","isActivo":false},{"id":"84","descripcion":"CELAYA","idpadre":"83","nivel":"3","isActivo":false},{"id":"93","descripcion":"LEON","idpadre":"92","nivel":"3","isActivo":false},{"id":"105","descripcion":"QUERETARO","idpadre":"104","nivel":"3","isActivo":false},{"id":"115","descripcion":"SAN LUIS POTOSI","idpadre":"114","nivel":"3","isActivo":false},{"id":"157","descripcion":"MORELIA","idpadre":"156","nivel":"3","isActivo":false},{"id":"166","descripcion":"CUERNAVACA","idpadre":"165","nivel":"3","isActivo":false},{"id":"176","descripcion":"PUEBLA","idpadre":"175","nivel":"3","isActivo":false},{"id":"191","descripcion":"VERACRUZ","idpadre":"190","nivel":"3","isActivo":false},{"id":"199","descripcion":"XALAPA","idpadre":"198","nivel":"3","isActivo":false},{"id":"209","descripcion":"CANCUN","idpadre":"208","nivel":"3","isActivo":false},{"id":"217","descripcion":"MERIDA","idpadre":"216","nivel":"3","isActivo":false},{"id":"542","descripcion":"ENSENADA","idpadre":"395","nivel":"3","isActivo":false},{"id":"543","descripcion":"TECATE","idpadre":"400","nivel":"3","isActivo":false},{"id":"544","descripcion":"MEXICALI","idpadre":"397","nivel":"3","isActivo":false},{"id":"545","descripcion":"CABO SAN LUCAS","idpadre":"394","nivel":"3","isActivo":false},{"id":"546","descripcion":"SAN JOSE DEL CABO","idpadre":"399","nivel":"3","isActivo":false},{"id":"547","descripcion":"LA PAZ","idpadre":"396","nivel":"3","isActivo":false},{"id":"548","descripcion":"NOGALES","idpadre":"405","nivel":"3","isActivo":false},{"id":"549","descripcion":"GUAYMAS","idpadre":"402","nivel":"3","isActivo":false},{"id":"550","descripcion":"CIUDAD OBREGON","idpadre":"401","nivel":"3","isActivo":false},{"id":"551","descripcion":"NAVOJOA","idpadre":"404","nivel":"3","isActivo":false},{"id":"552","descripcion":"SAN LUIS RIO COLORADO","idpadre":"407","nivel":"3","isActivo":false},{"id":"553","descripcion":"PUERTO PEÑASCO","idpadre":"406","nivel":"3","isActivo":false},{"id":"554","descripcion":"CULIACAN","idpadre":"408","nivel":"3","isActivo":false},{"id":"555","descripcion":"LOS MOCHIS","idpadre":"411","nivel":"3","isActivo":false},{"id":"556","descripcion":"MAZATLAN","idpadre":"412","nivel":"3","isActivo":false},{"id":"557","descripcion":"GUAMUCHIL","idpadre":"409","nivel":"3","isActivo":false},{"id":"558","descripcion":"DURANGO","idpadre":"416","nivel":"3","isActivo":false},{"id":"559","descripcion":"PARRAL","idpadre":"541","nivel":"3","isActivo":false},{"id":"560","descripcion":"TORREON","idpadre":"431","nivel":"3","isActivo":false},{"id":"561","descripcion":"CIUDAD VICTORIA","idpadre":"422","nivel":"3","isActivo":false},{"id":"562","descripcion":"MATAMOROS","idpadre":"423","nivel":"3","isActivo":false},{"id":"563","descripcion":"MONCLOVA","idpadre":"424","nivel":"3","isActivo":false},{"id":"564","descripcion":"NUEVO LAREDO","idpadre":"425","nivel":"3","isActivo":false},{"id":"565","descripcion":"PIEDRAS NEGRAS","idpadre":"426","nivel":"3","isActivo":false},{"id":"566","descripcion":"REYNOSA","idpadre":"427","nivel":"3","isActivo":false},{"id":"568","descripcion":"SALTILLO","idpadre":"429","nivel":"3","isActivo":false},{"id":"569","descripcion":"TAMPICO","idpadre":"430","nivel":"3","isActivo":false},{"id":"570","descripcion":"IRAPUATO","idpadre":"435","nivel":"3","isActivo":false},{"id":"571","descripcion":"GUANAJUATO","idpadre":"434","nivel":"3","isActivo":false},{"id":"572","descripcion":"ZACATECAS","idpadre":"444","nivel":"3","isActivo":false},{"id":"573","descripcion":"COLIMA","idpadre":"451","nivel":"3","isActivo":false},{"id":"574","descripcion":"MANZANILLO","idpadre":"456","nivel":"3","isActivo":false},{"id":"575","descripcion":"PUERTO VALLARTA","idpadre":"459","nivel":"3","isActivo":false},{"id":"576","descripcion":"TEPIC","idpadre":"462","nivel":"3","isActivo":false},{"id":"577","descripcion":"ACAPULCO","idpadre":"466","nivel":"3","isActivo":false},{"id":"578","descripcion":"OAXACA","idpadre":"478","nivel":"3","isActivo":false},{"id":"579","descripcion":"SALINA CRUZ","idpadre":"479","nivel":"3","isActivo":false},{"id":"580","descripcion":"ZIHUATANEJO","idpadre":"490","nivel":"3","isActivo":false},{"id":"581","descripcion":"COATZACOALCOS","idpadre":"494","nivel":"3","isActivo":false},{"id":"582","descripcion":"ORIZABA","idpadre":"500","nivel":"3","isActivo":false},{"id":"583","descripcion":"POZA RICA","idpadre":"502","nivel":"3","isActivo":false},{"id":"584","descripcion":"CIUDAD DEL CARMEN","idpadre":"506","nivel":"3","isActivo":false},{"id":"586","descripcion":"TAPACHULA","idpadre":"512","nivel":"3","isActivo":false},{"id":"587","descripcion":"VILLAHERMOSA","idpadre":"515","nivel":"3","isActivo":false},{"id":"588","descripcion":"CAMPECHE","idpadre":"517","nivel":"3","isActivo":false},{"id":"589","descripcion":"CHETUMAL","idpadre":"518","nivel":"3","isActivo":false},{"id":"590","descripcion":"PLAYA DEL CARMEN","idpadre":"521","nivel":"3","isActivo":false},{"id":"595","descripcion":"NORTE","idpadre":"592","nivel":"3","isActivo":false},{"id":"596","descripcion":"SUR","idpadre":"592","nivel":"3","isActivo":false},{"id":"597","descripcion":"TOLUCA","idpadre":"593","nivel":"3","isActivo":false},{"id":"598","descripcion":"PACHUCA","idpadre":"594","nivel":"3","isActivo":false},{"id":"599","descripcion":"MONTERREY","idpadre":"44","nivel":"3","isActivo":false},{"id":"600","descripcion":"GUADALAJARA","idpadre":"125","nivel":"3","isActivo":false},{"id":"601","descripcion":"HERMOSILLO","idpadre":"403","nivel":"3","isActivo":false},{"id":"602","descripcion":"TUXTLA GUTIERREZ","idpadre":"514","nivel":"3","isActivo":false},{"id":"782","descripcion":"LAZARO CARDENAS","idpadre":"454","nivel":"3","isActivo":false},{"id":"784","descripcion":"CIUDAD MANTE","idpadre":"783","nivel":"3","isActivo":false},{"id":"785","descripcion":"COZUMEL","idpadre":"519","nivel":"3","isActivo":false},{"id":"786","descripcion":"CHILPANCINGO","idpadre":"469","nivel":"3","isActivo":false},{"id":"787","descripcion":"CIUDAD VALLES","idpadre":"432","nivel":"3","isActivo":false},{"id":"788","descripcion":"CIUDAD GUZMAN","idpadre":"450","nivel":"3","isActivo":false},{"id":"789","descripcion":"LA PIEDAD","idpadre":"452","nivel":"3","isActivo":false},{"id":"790","descripcion":"URUAPAN","idpadre":"464","nivel":"3","isActivo":false},{"id":"791","descripcion":"APATZINGAN","idpadre":"445","nivel":"3","isActivo":false},{"id":"792","descripcion":"ZAMORA","idpadre":"465","nivel":"3","isActivo":false},{"id":"793","descripcion":"SAN JUAN DEL RIO","idpadre":"439","nivel":"3","isActivo":false},{"id":"794","descripcion":"SAN MIGUEL ALLENDE","idpadre":"440","nivel":"3","isActivo":false},{"id":"796","descripcion":"SAN LUIS DE LA PAZ","idpadre":"795","nivel":"3","isActivo":false},{"id":"798","descripcion":"SABINA","idpadre":"797","nivel":"3","isActivo":false},{"id":"800","descripcion":"CIUDAD ACUÑA","idpadre":"799","nivel":"3","isActivo":false},{"id":"802","descripcion":"RAMOS ARIZPE","idpadre":"801","nivel":"3","isActivo":false},{"id":"803","descripcion":"TLAXCALA","idpadre":"485","nivel":"3","isActivo":false},{"id":"804","descripcion":"FRESNILLO","idpadre":"433","nivel":"3","isActivo":false},{"id":"805","descripcion":"ISLA MUJERES","idpadre":"520","nivel":"3","isActivo":false},{"id":"806","descripcion":"DELICIAS","idpadre":"415","nivel":"3","isActivo":false},{"id":"808","descripcion":"BERRENDO","idpadre":"807","nivel":"3","isActivo":false},{"id":"810","descripcion":"CASAS GRANDES","idpadre":"809","nivel":"3","isActivo":false},{"id":"811","descripcion":"TAXCO","idpadre":"481","nivel":"3","isActivo":false},{"id":"812","descripcion":"IGUALA","idpadre":"474","nivel":"3","isActivo":false},{"id":"814","descripcion":"JOJUTLA","idpadre":"813","nivel":"3","isActivo":false},{"id":"815","descripcion":"CUAUTLA","idpadre":"471","nivel":"3","isActivo":false},{"id":"816","descripcion":"GUASAVE","idpadre":"410","nivel":"3","isActivo":false},{"id":"817","descripcion":"SILAO","idpadre":"441","nivel":"3","isActivo":false},{"id":"818","descripcion":"SALAMANCA","idpadre":"438","nivel":"3","isActivo":false},{"id":"819","descripcion":"LAGOS DE MORENO","idpadre":"453","nivel":"3","isActivo":false},{"id":"821","descripcion":"SAN FRANCISCO DEL RINCON","idpadre":"820","nivel":"3","isActivo":false},{"id":"822","descripcion":"HUACHINANGO","idpadre":"472","nivel":"3","isActivo":false},{"id":"823","descripcion":"TULANCINGO","idpadre":"538","nivel":"3","isActivo":false},{"id":"825","descripcion":"TEPEJI","idpadre":"824","nivel":"3","isActivo":false},{"id":"827","descripcion":"TULA","idpadre":"826","nivel":"3","isActivo":false},{"id":"828","descripcion":"IXMIQUILPAN","idpadre":"533","nivel":"3","isActivo":false},{"id":"830","descripcion":"SAN JUAN TEOTIHUACAN","idpadre":"829","nivel":"3","isActivo":false},{"id":"831","descripcion":"APAN","idpadre":"532","nivel":"3","isActivo":false},{"id":"832","descripcion":"TIZAYUCA","idpadre":"535","nivel":"3","isActivo":false},{"id":"833","descripcion":"ATLIXCO","idpadre":"468","nivel":"3","isActivo":false},{"id":"834","descripcion":"IZUCAR DE MATAMOROS","idpadre":"475","nivel":"3","isActivo":false},{"id":"835","descripcion":"APIZACO","idpadre":"467","nivel":"3","isActivo":false},{"id":"837","descripcion":"HUAJUAPAN DE LEON","idpadre":"836","nivel":"3","isActivo":false},{"id":"839","descripcion":"SAN MARTIN TEXMELUCAN","idpadre":"838","nivel":"3","isActivo":false},{"id":"840","descripcion":"TEHUACAN","idpadre":"482","nivel":"3","isActivo":false},{"id":"842","descripcion":"TLAXCO","idpadre":"841","nivel":"3","isActivo":false},{"id":"843","descripcion":"HUATULCO","idpadre":"473","nivel":"3","isActivo":false},{"id":"844","descripcion":"MATEHUALA","idpadre":"436","nivel":"3","isActivo":false},{"id":"845","descripcion":"ROSARITO","idpadre":"398","nivel":"3","isActivo":false},{"id":"846","descripcion":"ATLACOMULCO","idpadre":"529","nivel":"3","isActivo":false},{"id":"848","descripcion":"TENANGO","idpadre":"847","nivel":"3","isActivo":false},{"id":"850","descripcion":"MANINALCO","idpadre":"849","nivel":"3","isActivo":false},{"id":"851","descripcion":"VALLE DE BRAVO","idpadre":"528","nivel":"3","isActivo":false},{"id":"852","descripcion":"JALMOLONGA","idpadre":"525","nivel":"3","isActivo":false},{"id":"854","descripcion":"SAN CRISTOBAL","idpadre":"853","nivel":"3","isActivo":false},{"id":"856","descripcion":"TUXTEPEC OAXACA","idpadre":"855","nivel":"3","isActivo":false},{"id":"857","descripcion":"TIERRA BLANCA","idpadre":"504","nivel":"3","isActivo":false},{"id":"858","descripcion":"ALVARADO","idpadre":"492","nivel":"3","isActivo":false},{"id":"859","descripcion":"SAN ANDRES TUXTLA","idpadre":"503","nivel":"3","isActivo":false},{"id":"860","descripcion":"COSAMALOAPAN","idpadre":"496","nivel":"3","isActivo":false},{"id":"862","descripcion":"BOCA DEL RIO","idpadre":"861","nivel":"3","isActivo":false},{"id":"863","descripcion":"MINATITLAN","idpadre":"498","nivel":"3","isActivo":false},{"id":"864","descripcion":"ACAYUCAN","idpadre":"491","nivel":"3","isActivo":false},{"id":"866","descripcion":"LAS CHOAPAS","idpadre":"865","nivel":"3","isActivo":false},{"id":"867","descripcion":"PEROTE","idpadre":"501","nivel":"3","isActivo":false},{"id":"868","descripcion":"TEZIUTLAN","idpadre":"484","nivel":"3","isActivo":false},{"id":"869","descripcion":"MARTINEZ DE LA TORRE","idpadre":"497","nivel":"3","isActivo":false},{"id":"870","descripcion":"TUXPAN","idpadre":"505","nivel":"3","isActivo":false},{"id":"872","descripcion":"NARANJOS","idpadre":"871","nivel":"3","isActivo":false},{"id":"873","descripcion":"CORDOBA","idpadre":"495","nivel":"3","isActivo":false},{"id":"1883","descripcion":"GIRARDOT","idpadre":"1882","nivel":"3","isActivo":false},{"id":"1885","descripcion":"SAN GIL","idpadre":"1884","nivel":"3","isActivo":false},{"id":"1887","descripcion":"DIUTAMA","idpadre":"1886","nivel":"3","isActivo":false},{"id":"1889","descripcion":"PALERMO","idpadre":"1888","nivel":"3","isActivo":false},{"id":"1891","descripcion":"BOGOTA","idpadre":"1890","nivel":"3","isActivo":false},{"id":"1893","descripcion":"TOCANCIPA","idpadre":"1892","nivel":"3","isActivo":false},{"id":"1895","descripcion":"TUNJA","idpadre":"1894","nivel":"3","isActivo":false},{"id":"1897","descripcion":"FLORENCIA","idpadre":"1896","nivel":"3","isActivo":false},{"id":"1899","descripcion":"CAUCA_POPAYAN","idpadre":"1898","nivel":"3","isActivo":false},{"id":"1901","descripcion":"VILLA DE LEYBA","idpadre":"1900","nivel":"3","isActivo":false},{"id":"1903","descripcion":"MANIZALES","idpadre":"1902","nivel":"3","isActivo":false},{"id":"1905","descripcion":"YOPAL","idpadre":"1904","nivel":"3","isActivo":false},{"id":"1907","descripcion":"CARTAGENA","idpadre":"1906","nivel":"3","isActivo":false},{"id":"1909","descripcion":"QUIBDO","idpadre":"1908","nivel":"3","isActivo":false},{"id":"1911","descripcion":"FUGACATIVA","idpadre":"1910","nivel":"3","isActivo":false},{"id":"1913","descripcion":"MEDELLIN","idpadre":"1912","nivel":"3","isActivo":false},{"id":"1915","descripcion":"ZIPAQUIRA","idpadre":"1914","nivel":"3","isActivo":false},{"id":"1917","descripcion":"MONTERIA","idpadre":"1916","nivel":"3","isActivo":false},{"id":"1919","descripcion":"CHINQUINQUIRA","idpadre":"1918","nivel":"3","isActivo":false},{"id":"1921","descripcion":"RIONEGRO","idpadre":"1920","nivel":"3","isActivo":false},{"id":"1923","descripcion":"GRANADA","idpadre":"1922","nivel":"3","isActivo":false},{"id":"1925","descripcion":"PUERTO GAITAN","idpadre":"1924","nivel":"3","isActivo":false},{"id":"1927","descripcion":"FUSAGASUCA","idpadre":"1926","nivel":"3","isActivo":false},{"id":"1929","descripcion":"PUERTO LOPEZ","idpadre":"1928","nivel":"3","isActivo":false},{"id":"1931","descripcion":"MOCOA","idpadre":"1930","nivel":"3","isActivo":false},{"id":"1933","descripcion":"SOGAMOSO","idpadre":"1932","nivel":"3","isActivo":false},{"id":"1935","descripcion":"SARAVENA","idpadre":"1934","nivel":"3","isActivo":false},{"id":"1939","descripcion":"PUERTO ESCONDIDO","idpadre":"1938","nivel":"3","isActivo":false},{"id":"1940","descripcion":"CUAUHTEMOC","idpadre":"414","nivel":"3","isActivo":false},{"id":"1942","descripcion":"COATEPEC","idpadre":"1941","nivel":"3","isActivo":false},{"id":"1977","descripcion":"TULUM","idpadre":"1976","nivel":"3","isActivo":false}];
            $scope.pintarArbol("tree_arbol_empresarial", false, ['checkbox'], true);
              $scope.pintarArbol("tree_arbol_empresarial_mod", false, ['checkbox'], true);
            $scope.deshabilitarArbolEmpresarial("tree_arbol_empresarial");
              $scope.deshabilitarArbolEmpresarial("tree_arbol_empresarial_mod");
            $("#tree_arbol_empresarial").on('changed.jstree', function (e, data) {
                $scope.llenarTablaArabol();
                $scope.$apply();
            });
              $("#tree_arbol_empresarial_mod").on('changed.jstree', function (e, data) {
                  $scope.llenarTablaArabol();
                  $scope.$apply();
              });
        }).catch(err => handleError(err));
    }
    $scope.consultarArbolesCiudades();



    $scope.listaTecnicosDisponibles = [];
    $scope.listaTecnicosAsignados = [];
    $scope.listaTecnicosAsignadosMod = [];
    $scope.consultarOperariosPorCiudad = function() {
        $scope.listaTecnicosDisponibles = [];
        $scope.listaTecnicosDisponiblesMod = [];
        $scope.params = {};
        usuarioPIService.consultarOperariosPorCiudad($scope.params).then(function success(response) {
            console.log(response);

            angular.forEach(response.data.result,function(tecnico,index){
                $scope.listaTecnicosDisponibles.push({id: tecnico.id, nombre: tecnico.descripcion, check: 0});
                  $scope.listaTecnicosDisponiblesMod.push({id: tecnico.id, nombre: tecnico.descripcion, check: 0});
            });

        }).catch(err => handleError(err));
    }
    $scope.consultarOperariosPorCiudad();

    $scope.llenarCompaniasSelect = function(lista) {

        angular.forEach(lista,(element,index) => {
            $("#compania_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");

        });
        $("#compania_select").selectpicker("refresh") ;


        /*
        $.each( companias_consultas_listado , function( index , elementoCatalogo ) {
			
			if( is_solo_internos ){
				if( elementoCatalogo.id === '10' || elementoCatalogo.id === '37'){
					$("#"+id_select+"").append("<option value='"+elementoCatalogo.id+"'>"+elementoCatalogo.descripcion+"</option>");            
				}
			}else{
				$("#"+id_select+"").append("<option value='"+elementoCatalogo.id+"'>"+elementoCatalogo.descripcion+"</option>");            
			}
		});		
	    $('#'+id_select+'').selectpicker("refresh") ;

		if (   is_solo_internos  ){		
			$("#numero_empleado_aut").hide({done:function(){
				$("#numero_empleado").show(200);
			},duration:200});			
		}
        */
    }

    $scope.showIntervencion = false;
    $scope.listaIntervencionesSelect = [];
    $scope.idPropietarioSelect = "";
    $scope.mostrarIntervenciones = function(propietario) {
        $scope.listaIntervencionesSelect = [];
        console.log(propietario);
        if ($scope.idPropietarioSelect === "") {
            angular.forEach($scope.listaIntervenciones,(element,index) => {
                if (element.idpadre === propietario.id) {
                    $scope.listaIntervencionesSelect.push(angular.copy(element));
                }
            });
            $scope.idPropietarioSelect = propietario.id;
        } else {
            if (propietario.id === $scope.idPropietarioSelect) {
                $scope.idPropietarioSelect = "";
            } else {
                angular.forEach($scope.listaIntervenciones,(element,index) => {
                    if (element.idpadre === propietario.id) {
                        $scope.listaIntervencionesSelect.push(angular.copy(element));
                    }
                });
                $scope.idPropietarioSelect = propietario.id;
            }
            
        }
    }

    $scope.seleccionarIntervencion = function(index) {
        if ($scope.listaIntervencionesSelect[index].select === '0') {
            $scope.listaIntervencionesSelect[index].select = '1';
        } else {
            $scope.listaIntervencionesSelect[index].select = '0';
        }
        $scope.consultarPrivilegiosRegistro();
    }

    $scope.consultarCiudadesEstructura = function() {
        $scope.params = {};
        $scope.params.id = $("#region_select").val();
        usuarioPIService.consultarCiudadesEstructura($scope.params).then(function success(response) {
            console.log(response);

            $scope.listaCiudades = response.data.result;
            $("#ciudad_select").empty();
            angular.forEach($scope.listaCiudades,(element,index) => {
                $("#ciudad_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
            });
            $('#ciudad_select').selectpicker("refresh");
            
        }).catch(err => handleError(err));
    }

    $scope.consultarUsuarios = function() {
        $scope.params = {};
        $scope.params.id_activo = "1";
        $scope.params.ids_ciudad = $("#ciudad_select").val();
        $scope.params.ids_companias = $("#compania_select").val();
        $scope.params.ids_tipo = $("#puesto_select").val();

        usuarioPIService.consultarUsuarios($scope.params).then(function success(response) {
            console.log(response);

            $scope.mostrarTablaUsuarios(response.data.result);
            
        }).catch(err => handleError(err));
    }

    $scope.privilegiosPrincipal = [];
    $scope.privilegiosDisponibles = [];
    $scope.privilegiosAsignados = [];
    $scope.consultarPrivilegiosRegistro = function() {
        $scope.privilegiosPrincipal = [];
        $scope.privilegiosDisponibles = [];
        $scope.privilegiosAsignados = [];
        $scope.params = {};
        $scope.params.genericId = [];
        angular.forEach($scope.listaIntervencionesSelect,function(value,index){
            if (value.select === "1") {
                $scope.params.genericId.push(value.id);
            }
        });
        
        if ($scope.params.genericId.length > 0) {
            $scope.params.puestos = "1";
            $scope.params.id_propietarios = "1";

            usuarioPIService.consultarPrivilegios($scope.params).then(function success(response) {
                console.log(response);
                
                angular.forEach(response.data.result,function(value,index){
                    console.log(value);
                    angular.forEach(value,function(privilegio,indexPrivilegio){
                        if (indexPrivilegio === 0) {
                            $scope.privilegiosPrincipal.push({id: privilegio.id, nombre: privilegio.descripcion, color: index+1, img: privilegio.img});
                        } else {
                            if (privilegio.precarga === "0") {
                                $scope.privilegiosDisponibles.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
                            } else {
                                $scope.privilegiosAsignados.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
                            }
                        }

                    });

                });
                
            }).catch(err => handleError(err));
        }
        
    }
    $scope.informacionRegistro = {};
    $scope.confirmacion = {};
    $scope.mostrarConfirmacionUsuario = function() {
        $scope.confirmacion = {};

        $scope.confirmacion.nombre = 
            $scope.informacionRegistro.nombre !== undefined && $scope.informacionRegistro.nombre !== "" &&
            $scope.informacionRegistro.apellidoPaterno !== undefined && $scope.informacionRegistro.apellidoPaterno !== "" &&
            $scope.informacionRegistro.apellidoMaterno !== undefined && $scope.informacionRegistro.apellidoMaterno !== "" ?
            $scope.informacionRegistro.nombre + ' ' + $scope.informacionRegistro.apellidoPaterno + ' ' + $scope.informacionRegistro.apellidoMaterno : "Sin asignar";
        $scope.confirmacion.usuario = $scope.informacionRegistro.numEmpleado !== undefined && $scope.informacionRegistro.numEmpleado !== "" ? $scope.informacionRegistro.numEmpleado : "Sin asignar";
        $scope.confirmacion.correo = $scope.informacionRegistro.correo !== undefined && $scope.informacionRegistro.correo !== "" ? $scope.informacionRegistro.correo : "Sin asignar";
        $scope.confirmacion.contrasena = $scope.informacionRegistro.contrasena !== undefined && $scope.informacionRegistro.contrasena !== "" ? $scope.informacionRegistro.contrasena : "Sin asignar";
        $scope.confirmacion.puesto = $("#puesto_select_registro option:selected").text();
        $scope.confirmacion.fechaIngreso = $scope.informacionRegistro.fechaIngreso !== undefined && $scope.informacionRegistro.fechaIngreso !== "" ? $scope.informacionRegistro.fechaIngreso : "Sin asignar";
    }

    $scope.checkDisponibilidad = function(index) {
        if ($scope.privilegiosDisponibles[index].check === 1) {
            $scope.privilegiosDisponibles[index].check = 0;
        } else {
            $scope.privilegiosDisponibles[index].check = 1;
        }
    }

    $scope.checkAsignado = function(index) {
        if ($scope.privilegiosAsignados[index].check === 1) {
            $scope.privilegiosAsignados[index].check = 0;
        } else {
            $scope.privilegiosAsignados[index].check = 1;
        }
    }

    $scope.asignarPrivilegios = function() {
        $scope.privilegiosDisponiblesResp = [];

        $scope.privilegiosAsignados.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.privilegiosDisponibles.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.privilegiosAsignados.push(angular.copy($scope.element));
            } else {
                $scope.privilegiosDisponiblesResp.push(angular.copy(elemento));
            }
        });
        $scope.allDisponible = false;
        $scope.allAsignado = false;
        $scope.privilegiosDisponibles = $scope.privilegiosDisponiblesResp;
    }

    $scope.removerPrivilegios = function() {
        $scope.listaAsig = [];
        $scope.privilegiosAsignadosResp = [];

        $scope.privilegiosDisponibles.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.privilegiosAsignados.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.privilegiosDisponibles.push(angular.copy($scope.element));
            } else {
                $scope.privilegiosAsignadosResp.push(angular.copy(elemento));
            }
        });
        $scope.allDisponible = false;
        $scope.allAsignado = false;
        $scope.privilegiosAsignados = $scope.privilegiosAsignadosResp;
    }

    $scope.allDisponible = false;
    $scope.selectAllDisponible = function() {
        if ($scope.allDisponible) {
            $scope.allDisponible = false;
            $scope.privilegiosDisponibles.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allDisponible = true;
            $scope.privilegiosDisponibles.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }

    $scope.allAsignado = false;
    $scope.selectAllAsignados = function() {
        if ($scope.allAsignado) {
            $scope.allAsignado = false;
            $scope.privilegiosAsignados.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allAsignado = true;
            $scope.privilegiosAsignados.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }

    $scope.checkTecnicoDisponible = function(element) {
        if ($scope.listaTecnicosDisponibles[$scope.listaTecnicosDisponibles.indexOf(element)].check === 1) {
            $scope.listaTecnicosDisponibles[$scope.listaTecnicosDisponibles.indexOf(element)].check = 0;
        } else {
            $scope.listaTecnicosDisponibles[$scope.listaTecnicosDisponibles.indexOf(element)].check = 1;
        }
    }

    $scope.checkTecnicoAsignado = function(element) {
        if ($scope.listaTecnicosAsignados[$scope.listaTecnicosAsignados.indexOf(element)].check === 1) {
            $scope.listaTecnicosAsignados[$scope.listaTecnicosAsignados.indexOf(element)].check = 0;
        } else {
            $scope.listaTecnicosAsignados[$scope.listaTecnicosAsignados.indexOf(element)].check = 1;
        }
    }

    $scope.asignarTecnicos = function() {
        $scope.tecnicosDisponiblesRes = [];

        $scope.listaTecnicosAsignados.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.listaTecnicosDisponibles.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.listaTecnicosAsignados.push(angular.copy($scope.element));
            } else {
                $scope.tecnicosDisponiblesRes.push(angular.copy(elemento));
            }
        });
        $scope.allTecnicosDisponibles = false;
        $scope.allTecnicosAsignados = false;
        $scope.listaTecnicosDisponibles = $scope.tecnicosDisponiblesRes;
    }

    $scope.removerTecnico = function() {
        $scope.tecnicosAsignadosRes = [];

        $scope.listaTecnicosDisponibles.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.listaTecnicosAsignados.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.listaTecnicosDisponibles.push(angular.copy($scope.element));
            } else {
                $scope.tecnicosAsignadosRes.push(angular.copy(elemento));
            }
        });
        $scope.allTecnicosDisponibles = false;
        $scope.allTecnicosAsignados = false;
        $scope.listaTecnicosAsignados = $scope.tecnicosAsignadosRes;
    }

    $scope.allTecnicosDisponibles = false;
    $scope.checkAllTecnicosDisponibles = function() {
        if ($scope.allTecnicosDisponibles) {
            $scope.allTecnicosDisponibles = false;
            $scope.listaTecnicosDisponibles.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allTecnicosDisponibles = true;
            $scope.listaTecnicosDisponibles.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }

    $scope.allTecnicosAsignados = false;
    $scope.checkAllTecnicosAsignados = function() {
        if ($scope.allTecnicosAsignados) {
            $scope.allTecnicosAsignados = false;
            $scope.listaTecnicosAsignados.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allTecnicosAsignados = true;
            $scope.listaTecnicosAsignados.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }

    

    $scope.mostrarTablaUsuarios = function(lista) {

        $scope.viewTableResumen = [];
        angular.forEach(lista,function(value,index){
            let  arra=[];
            arra[0] = value.numero_empleado ? value.numero_empleado : '';
            arra[1] = value.usuarioFFM ? value.usuarioFFM : '';
            arra[2] = value.nombre ? value.nombre : '';
            arra[3] = value.tipoOperario ? value.tipoOperario : '';
            arra[4] = value.ciudad ? value.ciudad : '';
            arra[5] = value.unidadNegocio ? value.unidadNegocio : '';
            arra[6] = '<div class="text-center"><button type="button" class="btn btn-informacion" onclick="mostrarModalEdicion(' + index + ')"><i class="fa fa-edit"></i></button></div>';
            arra[7] = '<div class="text-center"><button type="button" class="btn btn-informacion" onclick="mostrarModalEliminar(' + index + ')"><i class="fa fa-remove"></i></button></div>';

            $scope.viewTableResumen.push(arra);
        });
        detalleTable.destroy();
        detalleTable = $('#table-usuario-pi').DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "scrollCollapse": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "data": $scope.viewTableResumen,
            "columns": [{
                "title": "No. Empleado"
        
            }, {
                "title": "Usuario FFM"
        
            }, {
                "title": "Nombre"
        
            }, {
                "title": "Tipo Usuario"
        
            }, {
                "title": "Ciudad"
        
            }, {
                "title": "Unidad Negocio"
        
            }, {
                "title": "Editar"
        
            }, {
                "title": "Eliminar"
        
            }]
        });

    }

    $scope.pintarArbol = function(idArbol, isInstalador, plugins, deshabilitar) {

        var tree_data = [];
        var icon_check = '';
        $('#'+idArbol+'').jstree('destroy');

        angular.forEach($scope.arbolCiudades,(elem,index) => {
            if (elem.idpadre !== "-1") {
                switch (elem.nivel ){
                    case '0':
                        icon_check='fa fa-building';
                        break;
                    case '1':
                        icon_check='fa fa-globe';
                        break;
                    case '2':
                        icon_check='fa fa-crosshairs';
                        break;
                    case '3':
                        icon_check='fa fa-cubes';
                        break;
                    case '4':
                        icon_check='fa fa-cube';
                        break;					
                }
    
                if(isInstalador) {
                    if (elem.nivel <=2) {
                        tree_data.push({
                            id: elem.id,
                            parent: ((elem.idpadre=='nulo' || elem.idpadre=='NULO' || elem.idpadre=='' || elem.idpadre=='null' || elem.idpadre=="-1")?'#':elem.idpadre),
                            nivel:elem.nivel,
                            text: elem.descripcion,
                            icon: icon_check
                        });
                    }
                } else {
                    tree_data.push({
                        id: elem.id,
                        parent: ((elem.idpadre=='nulo' || elem.idpadre=='NULO' || elem.idpadre=='' || elem.idpadre=='null' || elem.idpadre=="-1")?'#':elem.idpadre),
                        nivel:elem.nivel,
                        text: elem.descripcion,
                        icon: icon_check		
                    });
                }
            }
            

        });

        $('#'+idArbol+'').bind('loaded.jstree', function(e, data) {	  
            if (deshabilitar) {
                $scope.deshabilitarArbolEmpresarial(idArbol);
            }
        }).jstree({ 
            core : {
                data : tree_data,
                themes: {
                      name: 'proton',
                      responsive: true
                },
                animation: 100
            },
            plugins : plugins 
        });

    }

    $scope.deshabilitarArbolEmpresarial = function(id_arbol){
        $("#"+id_arbol+"").jstree('open_all');
        $("#"+id_arbol+"").jstree("check_all");
        $("#"+id_arbol+" li").each( function() {
            $("#"+id_arbol+"").jstree().disable_node(this.id);
        });
    }

    $scope.llenarTablaArabol = function() {
        $scope.arbolTable = [];
        $scope.listaCiudadNatal = [];
        $scope.arbolSelect = $('#tree_arbol_empresarial').jstree("get_selected", true);
        angular.forEach($scope.arbolSelect,function(value,index){
            if(value.original.nivel === "2") {
                $scope.arbolTable.push({id: value.id, nombreCiudad: value.text, distritos: []});
                $scope.listaCiudadNatal.push({id: value.id, nombre: value.text});
            }
        })

        angular.forEach($scope.arbolSelect,function(distrito,index){
            if(distrito.original.nivel === "3") {
                angular.forEach($scope.arbolTable,function(value,index){
                    if (distrito.parent === value.id) {
                        value.distritos.push({id: distrito.id, nombreDistrito: distrito.text});
                    }
                });
            }
        })
    }

    $scope.llenarTablaArbolTecnico = function() {
        $scope.arbolTable = [];
        $scope.listaCiudadNatal = [];
        $scope.ciudadNatal = {};
        $scope.arbolSelect = $('#tree_arbol_empresarial').jstree("get_selected", true);
        angular.forEach($scope.arbolSelect,function(value,index){
            if(value.original.nivel === "2") {
                $scope.arbolTable.push({id: value.id, nombreCiudad: value.text, distritos: []});
            }
        })
    }


    $scope.mostrarDistritoRegistro = true;
    $(document).ready(function(){

        detalleTable = $("#table-usuario-pi").DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "scrollCollapse": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "columns": [{
                "title": "No. Empleado"
        
            }, {
                "title": "Usuario FFM"
        
            }, {
                "title": "Nombre"
        
            }, {
                "title": "Tipo Usuario"
        
            }, {
                "title": "Ciudad"
        
            }, {
                "title": "Unidad Negocio"
        
            }, {
                "title": "Editar"
        
            }, {
                "title": "Eliminar"
        
            }]
        });
        
        $("#compania_select").change(function() {
            $scope.consultarUsuarios();
        });

        $("#puesto_select").change(function() {
            $scope.consultarUsuarios();
        });

        $("#region_select").change(function() {
            $scope.consultarCiudadesEstructura();
            $scope.consultarUsuarios();
        });

        $("#ciudad_select").change(function() {
            $scope.consultarUsuarios();
        });

        mostarDetalleUsuario = function(index) {
            console.log(index);
        }

        mostrarModalEliminar = function(index) {
            console.log(index);
        }

        $("#puesto_select_registro").change(function(){
            console.log($("#puesto_select_registro").val());
            var idPuestoRegistro = $("#puesto_select_registro").val();
            $scope.arbolTable = [];
            $scope.listaCiudadNatal = [];
            $scope.ciudadNatal = {};
            if (["1","2","3","5","13"].includes(idPuestoRegistro)) {
                $scope.mostrarAccesos = true;
                $scope.mostrarTecnicos = true;
                $scope.mostrarDistritoRegistro = true;
                $scope.$apply();

                if (["1"].includes(idPuestoRegistro)) {
                    $scope.pintarArbol("tree_arbol_empresarial", false, ['checkbox'], true);
                } else {
                    $scope.pintarArbol("tree_arbol_empresarial", false, ['checkbox'], false);
                }

                $("#tree_arbol_empresarial").on('changed.jstree', function (e, data) {
                    $scope.llenarTablaArabol();
                    $scope.$apply();
                });
                
            } else if (["7"].includes(idPuestoRegistro)){
                $scope.mostrarAccesos = false;
                $scope.mostrarTecnicos = false;
                $scope.mostrarDistritoRegistro = false;
                $scope.$apply();

                $scope.pintarArbol("tree_arbol_empresarial", true, [], false);

                $("#tree_arbol_empresarial").on('changed.jstree', function (e, data) {
                    $scope.llenarTablaArbolTecnico();
                    $scope.$apply();
                });
            }
        });

        $('#fechaIngresoRegistro').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true
        });
        $('#fechaIngresoRegistro').datepicker('update',new Date());

    });


    //*********************EDICION****************** */

    mostrarModalEdicion = function() {
        $("#modalEdicionUsuario").modal('show');
    }

    $scope.listaIntervencionesSelectMod = [];
    $scope.idPropietarioSelectMod = "";
    $scope.mostrarIntervencionesMod = function(propietario) {
        $scope.listaIntervencionesSelectMod = [];
        console.log(propietario);
        if ($scope.idPropietarioSelectMod === "") {
            angular.forEach($scope.listaIntervenciones,(element,index) => {
                if (element.idpadre === propietario.id) {
                    $scope.listaIntervencionesSelectMod.push(angular.copy(element));
                }
            });
            $scope.idPropietarioSelectMod = propietario.id;
        } else {
            if (propietario.id === $scope.idPropietarioSelectMod) {
                $scope.idPropietarioSelectMod = "";
            } else {
                angular.forEach($scope.listaIntervenciones,(element,index) => {
                    if (element.idpadre === propietario.id) {
                        $scope.listaIntervencionesSelectMod.push(angular.copy(element));
                    }
                });
                $scope.idPropietarioSelectMod = propietario.id;
            }
            
        }
    }

    $scope.seleccionarIntervencionMod = function(index) {
        if ($scope.listaIntervencionesSelectMod[index].select === '0') {
            $scope.listaIntervencionesSelectMod[index].select = '1';
        } else {
            $scope.listaIntervencionesSelectMod[index].select = '0';
        }
        $scope.consultarPrivilegiosEdicion();
    }

    $scope.privilegiosPrincipalMod = [];
    $scope.privilegiosDisponiblesMod = [];
    $scope.privilegiosAsignadosMod = [];
    $scope.consultarPrivilegiosEdicion = function() {
        $scope.privilegiosPrincipalMod = [];
        $scope.privilegiosDisponiblesMod = [];
        $scope.privilegiosAsignadosMod = [];
        $scope.params = {};
        $scope.params.genericId = [];
        angular.forEach($scope.listaIntervencionesSelectMod,function(value,index){
            if (value.select === "1") {
                $scope.params.genericId.push(value.id);
            }
        });
        
        if ($scope.params.genericId.length > 0) {
            $scope.params.puestos = "1";
            $scope.params.id_propietarios = "1";

            usuarioPIService.consultarPrivilegios($scope.params).then(function success(response) {
                console.log(response);
                
                angular.forEach(response.data.result,function(value,index){
                    console.log(value);
                    angular.forEach(value,function(privilegio,indexPrivilegio){
                        if (indexPrivilegio === 0) {
                            $scope.privilegiosPrincipalMod.push({id: privilegio.id, nombre: privilegio.descripcion, color: index+1, img: privilegio.img});
                        } else {
                            if (privilegio.precarga === "0") {
                                $scope.privilegiosDisponiblesMod.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
                            } else {
                                $scope.privilegiosAsignadosMod.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
                            }
                        }

                    });

                });
                
            }).catch(err => handleError(err));
        }
        
    }

    $scope.informacionModificar = {};
    $scope.mostrarConfirmacionModificacion = function() {
        $scope.confirmacionMod = {};

        $scope.confirmacionMod.nombre = 
            $scope.informacionModificar.nombre !== undefined && $scope.informacionModificar.nombre !== "" &&
            $scope.informacionModificar.apellidoPaterno !== undefined && $scope.informacionModificar.apellidoPaterno !== "" &&
            $scope.informacionModificar.apellidoMaterno !== undefined && $scope.informacionModificar.apellidoMaterno !== "" ?
            $scope.informacionModificar.nombre + ' ' + $scope.informacionModificar.apellidoPaterno + ' ' + $scope.informacionModificar.apellidoMaterno : "Sin asignar";
        $scope.confirmacionMod.usuario = $scope.informacionModificar.numEmpleado !== undefined && $scope.informacionModificar.numEmpleado !== "" ? $scope.informacionModificar.numEmpleado : "Sin asignar";
        $scope.confirmacionMod.correo = $scope.informacionModificar.correo !== undefined && $scope.informacionModificar.correo !== "" ? $scope.informacionModificar.correo : "Sin asignar";
        $scope.confirmacionMod.contrasena = $scope.informacionModificar.contrasena !== undefined && $scope.informacionModificar.contrasena !== "" ? $scope.informacionModificar.contrasena : "Sin asignar";
        $scope.confirmacionMod.puesto = $("#puesto_select_modificacion option:selected").text();
        $scope.confirmacionMod.fechaIngreso = $scope.informacionModificar.fechaIngreso !== undefined && $scope.informacionModificar.fechaIngreso !== "" ? $scope.informacionModificar.fechaIngreso : "Sin asignar";
    }
    
    $scope.checkDisponibilidadMod = function(index) {
        if ($scope.privilegiosDisponiblesMod[index].check === 1) {
            $scope.privilegiosDisponiblesMod[index].check = 0;
        } else {
            $scope.privilegiosDisponiblesMod[index].check = 1;
        }
    }

    $scope.checkAsignadoMod = function(index) {
        if ($scope.privilegiosAsignadosMod[index].check === 1) {
            $scope.privilegiosAsignadosMod[index].check = 0;
        } else {
            $scope.privilegiosAsignadosMod[index].check = 1;
        }
    }

    $scope.asignarPrivilegiosMod = function() {
        $scope.privilegiosDisponiblesModResp = [];

        $scope.privilegiosAsignadosMod.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.privilegiosAsignadosMod.push(angular.copy($scope.element));
            } else {
                $scope.privilegiosDisponiblesModResp.push(angular.copy(elemento));
            }
        });
        $scope.allDisponibleMod = false;
        $scope.allAsignadoMod = false;
        $scope.privilegiosDisponiblesMod = $scope.privilegiosDisponiblesModResp;
    }

    $scope.removerPrivilegiosMod = function() {
        $scope.privilegiosAsignadosModResp = [];

        $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.privilegiosAsignadosMod.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.privilegiosDisponiblesMod.push(angular.copy($scope.element));
            } else {
                $scope.privilegiosAsignadosModResp.push(angular.copy(elemento));
            }
        });
        $scope.allDisponibleMod = false;
        $scope.allAsignadoMod = false;
        $scope.privilegiosAsignadosMod = $scope.privilegiosAsignadosModResp;
    }

    $scope.allDisponibleMod = false;
    $scope.selectAllDisponibleMod = function() {
        if ($scope.allDisponibleMod) {
            $scope.allDisponibleMod = false;
            $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allDisponibleMod = true;
            $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }

    $scope.allAsignadoMod = false;
    $scope.selectAllAsignadosMod = function() {
        if ($scope.allAsignadoMod) {
            $scope.allAsignadoMod = false;
            $scope.privilegiosAsignadosMod.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allAsignadoMod = true;
            $scope.privilegiosAsignadosMod.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }


    $scope.checkTecnicoDisponibleMod = function(element) {
        if ($scope.listaTecnicosDisponiblesMod[$scope.listaTecnicosDisponiblesMod.indexOf(element)].check === 1) {
            $scope.listaTecnicosDisponiblesMod[$scope.listaTecnicosDisponiblesMod.indexOf(element)].check = 0;
        } else {
            $scope.listaTecnicosDisponiblesMod[$scope.listaTecnicosDisponiblesMod.indexOf(element)].check = 1;
        }
    }

    $scope.checkTecnicoAsignadoMod = function(element) {
        if ($scope.listaTecnicosAsignadosMod[$scope.listaTecnicosAsignadosMod.indexOf(element)].check === 1) {
            $scope.listaTecnicosAsignadosMod[$scope.listaTecnicosAsignadosMod.indexOf(element)].check = 0;
        } else {
            $scope.listaTecnicosAsignadosMod[$scope.listaTecnicosAsignadosMod.indexOf(element)].check = 1;
        }
    }

    $scope.asignarTecnicosMod = function() {
        $scope.tecnicosDisponiblesResMod = [];

        $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.listaTecnicosAsignadosMod.push(angular.copy($scope.element));
            } else {
                $scope.tecnicosDisponiblesResMod.push(angular.copy(elemento));
            }
        });
        $scope.allTecnicosDisponiblesMod = false;
        $scope.allTecnicosAsignadosMod = false;
        $scope.listaTecnicosDisponiblesMod = $scope.tecnicosDisponiblesResMod;
    }

    $scope.removerTecnicoMod = function() {
        $scope.tecnicosAsignadosResMod = [];

        $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
            elemento.check = 0;
        });

        $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
            if (elemento.check === 1) {
                $scope.element = angular.copy(elemento);
                $scope.element.check = 0;
                $scope.listaTecnicosDisponiblesMod.push(angular.copy($scope.element));
            } else {
                $scope.tecnicosAsignadosResMod.push(angular.copy(elemento));
            }
        });
        $scope.allTecnicosDisponiblesMod = false;
        $scope.allTecnicosAsignadosMod = false;
        $scope.listaTecnicosAsignadosMod = $scope.tecnicosAsignadosResMod;
    }

    $scope.allTecnicosDisponiblesMod = false;
    $scope.checkAllTecnicosDisponiblesMod = function() {
        if ($scope.allTecnicosDisponiblesMod) {
            $scope.allTecnicosDisponiblesMod = false;
            $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allTecnicosDisponiblesMod = true;
            $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }

    $scope.allTecnicosAsignadosMod = false;
    $scope.checkAllTecnicosAsignadosMod = function() {
        if ($scope.allTecnicosAsignadosMod) {
            $scope.allTecnicosAsignadosMod = false;
            $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
                elemento.check = 0;
            });
        } else {
            $scope.allTecnicosAsignadosMod = true;
            $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
                elemento.check = 1;
            });
        }
    }

    $scope.modoficarInformacionUsuario = function() {
        if ($scope.allTecnicosDisponiblesMod) {
            $scope.params = {};
            $scope.params.id = "";
            $scope.params.nombre = "";
            $scope.params.descripcion = "";
            $scope.params.listaTecnicos = [];
            $scope.params.compania = "";
        }
    }

}]);