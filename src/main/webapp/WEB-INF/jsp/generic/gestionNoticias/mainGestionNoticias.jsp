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
	<body id="idBody" style="display: none;" ng-class="{'is-hide-overflow':isHideOverflowNoticias}" ng-controller="gestionNoticiasController" >
    	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <jsp:include page="./modals/modal-geografia-crea.jsp"></jsp:include>
        <jsp:include page="./modals/modal-geografia-consulta.jsp"></jsp:include>
        <jsp:include page="./modals/modal-geografia-edita.jsp"></jsp:include>

        <div id="container-noticias-pi" class="main-container container">

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="crearnoticia-tab" data-toggle="tab" href="#crearnoticia" role="tab" aria-controls="crearnoticia" aria-selected="true">Crear noticia</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " id="consultanoticias-tab" data-toggle="tab" href="#consultanoticias" role="tab" aria-controls="consultanoticias" aria-selected="false">Consulta noticias</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane show active " id="crearnoticia" role="tabpanel"
                    aria-labelledby="crearnoticia-tab">
                    <jsp:include page="./crearContentNoticia.jsp"></jsp:include>
                </div>
                <div class="tab-pane fade " id="consultanoticias" role="tabpanel" aria-labelledby="consultanoticias-tab">
                    <jsp:include page="./consultaNoticias.jsp"></jsp:include>
                </div>
            </div>

            <jsp:include page="./edicionContentNoticia.jsp"></jsp:include>

            <div ng-click="cerrarGestionNotica()" id="image-viewer">
                <span  class=" close">&times;</span>
                <img class="modal-content-viewer" id="full-image">
            </div>
        </div>
 
	</body>
	<!-- LIBRERIAS JS -->
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
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
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionNoticias/gestionNoticiasController.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionNoticias/gestionNoticiasEdicionController.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionNoticias/gestionNoticiasService.js" charset="UTF-8"></script>
</html>