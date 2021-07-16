<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="busquedaApp">

<head>
    <meta charset="ISO-8859-1" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
    <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/css/plantainterna/busqueda/styleMainBusqueda.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
    <link  href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
</head>

<body ng-controller="busquedaController" class="body">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>

    <div class="container-fluid">

        <div class="row">
            <div class="col-2 column-text-busqueda">
                <input type="text" class="form-control form-control-sm input-filtro-busqueda" placeholder="Buscar sitio">
            </div>
            <div class="col-1 colunm-btn-busqueda">
                <button type="button" class="btn btn-sm btn-primary btn-consultar-busqueda waves-effect waves-light"><i class="fa fa-search"></i></button>
            </div>
        </div>

        <div class="row">
            <div ng-show="showSearch" class="col-first-parent col-2">
                <div ng-click="setCurrentTabInfo(1)" ng-class="{'activetitleinfo':mostrarCurrentInfo==1}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-oportunidad" src="./resources/img/plantainterna/iconossf/oportunidad.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">OPORTUNIDAD</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrOportunidad !== undefined ? resultBusqueda.arrOportunidad.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(2)" ng-class="{'activetitleinfo':mostrarCurrentInfo==2}" class="element-busqueda-title">
    
                    <div class="iconsf-container">
                        <img class="imgcuenta" src="./resources/img/plantainterna/iconossf/cuenta.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">CUENTAS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrCuentas !== undefined ? resultBusqueda.arrCuentas.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(3)" ng-class="{'activetitleinfo':mostrarCurrentInfo==3}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="imgcuentasfactura" src="./resources/img/plantainterna/iconossf/cuentafactura.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">CUENTAS FACTURA</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrCuentaFactura !== undefined ? resultBusqueda.arrCuentaFactura.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(4)" ng-class="{'activetitleinfo':mostrarCurrentInfo==4}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-cotizacion" src="./resources/img/plantainterna/iconossf/cotizacion.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">COTIZACION</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrCotizacion !== undefined ? resultBusqueda.arrCotizacion.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(5)" ng-class="{'activetitleinfo':mostrarCurrentInfo==5}" class="element-busqueda-title">
    
                    <div class="iconsf-container">
                        <img class="img-cotsitio" src="./resources/img/plantainterna/iconossf/cotsitio.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">COT SITIOS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrCotSitio !== undefined ? resultBusqueda.arrCotSitio.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(6)" ng-class="{'activetitleinfo':mostrarCurrentInfo==6}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-csp" src="./resources/img/plantainterna/iconossf/csp.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">COT SITIOS PLAN</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrCotSitioPlan !== undefined ? resultBusqueda.arrCotSitioPlan.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(7)" ng-class="{'activetitleinfo':mostrarCurrentInfo==7}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-os" src="./resources/img/plantainterna/iconossf/os.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">OS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrOs !== undefined ? resultBusqueda.arrOs.length : '0'}} registros</span>
                    </div>
                </div>
    
                <div ng-click="setCurrentTabInfo(8)" ng-class="{'activetitleinfo':mostrarCurrentInfo==8}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-tickets" src="./resources/img/plantainterna/iconossf/tickets.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">TICKETS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.arrTk !== undefined ? resultBusqueda.arrTk.length : '0'}} registros</span>
                    </div>
                </div>
            </div>
        </div>


    </div>

</body>
<!-- Scripts libraries -->
<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<!-- Fin -->
<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/busqueda/busquedaController.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/busqueda/busquedaService.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>

</html>