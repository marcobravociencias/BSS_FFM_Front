<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html ng-app="skillsApp">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
      
       <link rel="icon" type="image/png" sizes="192x192"   href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.print.min.css" rel="stylesheet" media="print" />
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/scheduler.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"  rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"  rel="stylesheet" />     
 
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/fixedColumns.bootstrap.min.css" rel="stylesheet">
  
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
 
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/style.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/proton/style.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/loaders.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/skillsAdms/styleSkills.css?"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/skillsAdms/styleSkillsFeature.css?"  rel="stylesheet"/>

</head>
<body class="body" ng-controller="skillsController">
<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>

  
    <div class="container container-parent-skills">
        <div class="header-modulo">
            <h5 class="title-modulo">Administraci&oacute;n de Skills</h5>
            <h1 class="h6 subtitle-modulo">En este m&oacute;dulo podr&aacute;s realizar la gesti&oacute;n de tus t&eacute;cnicos asociados</h1>
        </div>
        <div class="row content-gestion-operarios">
            <div class="col-3">
              
                <div class="input-group input-group-sm content-seach-group  ">
                    <input type="text" class="form-control form-control-sm buscar-input-operario"  placeholder="Buscar geograf&iacute;a" ng-click="busqueda()">
                    <span class="search-icon-operario-busq fa fa-search" ></span>
                </div>
                <div class="container-treegeofria">
                    <div id="jstree-proton-3" class="proton-demo"></div>
                </div>
                <div class="content-noseleccion">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2"></i>
                    <b class="text-no-seleccion-geografia">No has seleccionado un elemento correcto</b>
                </div>        
            </div>
            <div class="col-4">
                <div class="input-group input-group-sm content-seach-group  ">
                    <input type="text" class="form-control form-control-sm buscar-input-operario" placeholder="Buscar OT" onkeyup="triggerOperarioKeyup(event);">
                    <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
                </div>

                <div class="tecnicos-container ">
                    <div ng-repeat="tecnico in tecnicosMostradas.result.detalleTecnicos track by $index " class="user-section">                      
                        <div ng-if="$index === 0" class=" valign-wrapper">
                           
                            <div class="col-12 pl-0">
                                <p class="text-todos-nombre">Seleccionar todos</p>
                            </div>
                            <div class="content-checkbox-operario">
                                <input class="form-check-input input-todos-checkbox" type="checkbox" id="inlineCheckbox1" value="option1" />
                            </div>
                        </div>
                        <div ng-if="$index !== 0" class=" valign-wrapper">
                            <div class="col-2 media-image online pr-0">
                                <img src="{{tecnico.urlFotoPerfil !=undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle z-depth-2 responsive-img">
                            </div>
                            <div class="col-10 pl-0">
                                <p class="text-tecnico-nombre">Gorge Fernandis</p>
                                <p class="text-adds-teccnico">Apple pie bonbon cheesecake tiramisu</p>
                            </div>
                            <div class="content-checkbox-operario">
                                <input class="form-check-input input-operario-checkbox" type="checkbox" id="inlineCheckbox1" value="option1" />
                            </div>
                        </div>
                    </div>
                  </div>
            </div>
            <div class="col-5">
                <div class="input-group input-group-sm content-seach-group  ">
                    <input type="text" class="form-control form-control-sm buscar-input-operario"  placeholder="Buscar skill" >
                    <span class="search-icon-operario-busq fa fa-search" ></span>
                </div>
                <div class="intervenciones-container">
                    <div ng-repeat="intervencion in listadoIntervenciones track by $index" class="row ">
                        <div class="col-9 intervencion-col">
                                <h5 class="text-intervencion-title" ng-bind="intervencion.descripcion"></h5>
                        </div>
                        <div class="col-3 intervencion-col">
                            <div class="form-check-sm form-check form-switch">
                                <input class="form-check-input form-check-input-sm" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    </div>

</body>
<!-- LIBRERIAS -->
   <!--  <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>-->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-2.2.4.js" ></script> 
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.fixedColumns.min.js"></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/underscore/underscore.js?" ></script>
     <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"  rel="stylesheet" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <!-- ARCHIVOS JS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/skillsController.js?"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/skillsService.js"></script>
     <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/jsonSkills.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
     <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
    </html>