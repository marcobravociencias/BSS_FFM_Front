<html ng-app="gestionNoticiasApp">
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
        <!-- LIBRERIAS CSS -->
        <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16"	href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
        <!-- CSS INTERNAS -->
        <link href="${pageContext.request.contextPath}/resources/css/generic/gestionNoticias/mainGestionNoticias.css" rel="stylesheet">
	</head>
	<body id="idBody" ng-controller="gestionNoticiasController" >
    	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div id="container-noticias-pi" class="main-container row">
                <div class="container-visualiza-noticia col-4">
                    <div class="imagen-noticia-previsualizador">
                        <span class="text-title" ng-bind="saveObj.tituloPrincipal" ></span>
                        <span class="text-title" ng-bind="saveObj.tituloSecundario" ></span>

                    </div>
                </div>
                <div class="container-datos-crea-noticia col-8">
                    <div class="row">
                        <div class="col-6">
                            <div class="container-registro">
                                <div  ng-show="inhabilidarCamposRegistro" class="capa-inabilitable">
                                </div>
                                <form >
                                    <div class="form  row mb-4">
                                        <div class="col-12">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" ng-model="inhabilidarCamposRegistro" id="inhabilidarCamposRegistro" checked />
                                                <label class="form-check-label" for="inhabilidarCamposRegistro"> &iquest;Solo imagen? </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form>
                                   
                                    <div class="form row mb-4">
                                        <div class="col-12">
                                            <label class="form-label" for="form1Example1">T&iacute;tulo principal</label>
                                            <input ng-model="saveObj.tituloPrincipal" type="email" id="form1Example1" class="form-control form-control-sm" />
                                        </div>                                
                                    </div>                      
                                    <div class="form row mb-4">
                                        <div class="col-12">
                                            <label class="form-label" for="form1Example2">T&iacute;tulo secundario</label>
                                            <input type="text" ng-model="saveObj.tituloSecundario"  id="form1Example2" class="form-control form-control-sm" />
                                        </div>                                
                                    </div>
                                    <div class="form  row mb-4">
                                        <div class="col-12">
                                            <label class="form-label" for="customFile">Seleccionar imagen</label>
                                            <input type="file" class="form-control form-control-sm" id="customFile" />
                                        </div>                                 
                                    </div>
                                    
                                    <div class="form  row mb-4">
                                        <div class="col-12">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" ng-model="mostrarFechasDefinidas" id="flexSwitchCheckChecked" checked />
                                                <label class="form-check-label" for="flexSwitchCheckChecked"> &iquest;Es permanente? </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div ng-show="!mostrarFechasDefinidas" class="form row">
                                            <div class="col-6">
                                                <div class="form mb-4">
                                                    <label class="form-label" for="form1Example1">Fecha inicio</label>
                                                    <input type="email" id="form1Example1" class="form-control form-control-sm" />
                                                 </div>                                                           
                                            </div>
                                            <div class="col-6">
                                                <div class="form mb-4">
                                                    <label class="form-label" for="form1Example2">Fecha fin</label>
                                                    <input type="password" id="form1Example2" class="form-control form-control-sm" />
                                                 </div>
                                            </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block">Registrar noticia</button>
                                </form>   
                            </div>
                                                 
                        </div>
                        <div class="col-6">
                            <div id="jstre-content-geofrafia" class="jstre-content-geofrafia">
                                
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
	</body>
	<!-- LIBRERIAS JS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
    <!-- ARCHIVOS JS INTERNOS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionNoticias/gestionNoticiasController.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionNoticias/gestionNoticiasService.js" charset="UTF-8"></script>
</html>