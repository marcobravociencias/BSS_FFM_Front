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
    <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/alertify/css/alertify.min.css" rel="stylesheet">
</head>

<body id="idBody" ng-controller="busquedaController" class="body" style="display: none;">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>

    <div class="container-fluid container-busqueda">

        <div class="row">
            <div class="col-2 column-text-busqueda">
                <input type="text" class="form-control form-control-sm input-filtro-busqueda" placeholder="Buscar sitio" ng-model="searchSF" ng-enter="buscarGeneral()">
            </div>
            <div class="col-1 colunm-btn-busqueda">
                <button type="button" class="btn btn-sm btn-primary btn-consultar-busqueda waves-effect waves-light" ng-click="buscarGeneral()"><i class="fa fa-search"></i></button>
            </div>
        </div>

        <div class="row div-parent-home">
            <div ng-show="showSearch" class="col-first-parent col-2">
                <div ng-click="setCurrentTabInfo(1)" ng-class="{'activetitleinfo':mostrarCurrentInfo==1}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-oportunidad" src="./resources/img/plantainterna/iconossf/oportunidad.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">OPORTUNIDAD</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.oportunidades !== undefined ? resultBusqueda.oportunidades.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(2)" ng-class="{'activetitleinfo':mostrarCurrentInfo==2}" class="element-busqueda-title">
    
                    <div class="iconsf-container">
                        <img class="imgcuenta" src="./resources/img/plantainterna/iconossf/cuenta.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">CUENTAS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.cuentas !== undefined ? resultBusqueda.cuentas.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(3)" ng-class="{'activetitleinfo':mostrarCurrentInfo==3}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="imgcuentasfactura" src="./resources/img/plantainterna/iconossf/cuentafactura.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">CUENTAS FACTURA</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.cuentasFactura !== undefined ? resultBusqueda.cuentasFactura.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(4)" ng-class="{'activetitleinfo':mostrarCurrentInfo==4}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-cotizacion" src="./resources/img/plantainterna/iconossf/cotizacion.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">COTIZACION</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.cotizaciones !== undefined ? resultBusqueda.cotizaciones.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(5)" ng-class="{'activetitleinfo':mostrarCurrentInfo==5}" class="element-busqueda-title">
    
                    <div class="iconsf-container">
                        <img class="img-cotsitio" src="./resources/img/plantainterna/iconossf/cotsitio.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">COT SITIOS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.cotSitios !== undefined ? resultBusqueda.cotSitios.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(6)" ng-class="{'activetitleinfo':mostrarCurrentInfo==6}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-csp" src="./resources/img/plantainterna/iconossf/csp.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">COT SITIOS PLAN</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.cotSitiosPlan !== undefined ? resultBusqueda.cotSitiosPlan.length : '0'}} registros</span>
                    </div>
                </div>
                <div ng-click="setCurrentTabInfo(7)" ng-class="{'activetitleinfo':mostrarCurrentInfo==7}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-os" src="./resources/img/plantainterna/iconossf/os.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">OS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.ordenesServicio !== undefined ? resultBusqueda.ordenesServicio.length : '0'}} registros</span>
                    </div>
                </div>
    
                <div ng-click="setCurrentTabInfo(8)" ng-class="{'activetitleinfo':mostrarCurrentInfo==8}" class="element-busqueda-title">
                    <div class="iconsf-container">
                        <img class="img-tickets" src="./resources/img/plantainterna/iconossf/tickets.png" alt="">
                    </div>
                    <div class="textcontainer-header">
                        <span class="text-title-elementoh">TICKETS</span>
                        <span class="text-title-elementohcantidad">{{resultBusqueda.tickets !== undefined ? resultBusqueda.tickets.length : '0'}} registros</span>
                    </div>
                </div>
            </div>

            <div ng-show="showSearch" class="col-second-parent col-10">
                <div ng-if="mostrarCurrentInfo==1" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.oportunidades.length > 0">
                        <div class="header-col-table row">
                            <div class="col-3">
                                <span class="text-head-table">N&uacute;mero de oportunidad</span>
                            </div>
                            <div class="col-6">
                                <span class="text-head-table">Nombre</span>
                            </div>
                            <div class="col-3">
                                <span class="text-head-table">Etapa</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="oportunidad in resultBusqueda.oportunidades | limitTo: limitOportunidad  track by $index" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-3">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(oportunidad.id, oportunidad.keyObject)">
                                    <span class="text-table" ng-bind="oportunidad.numeroOportunidad"></span>
                                </a>
                            </div>
                            <div class="col-6">
                                <span class="text-table" ng-bind="oportunidad.nombre"></span>
                            </div>
                            <div class="col-3">
                                <span class="text-table" ng-bind="oportunidad.etapa"></span>
                            </div>
                        </div>
                        <div class="row" ng-show="resultBusqueda.oportunidades.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosOportunidad()">
                                    <span ng-show="limitOportunidad === 10">Mostrar mas...</span>
                                    <span ng-show="limitOportunidad !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ng-if="resultBusqueda.oportunidades.length==0 || !resultBusqueda.oportunidades" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>      
                <div ng-if="mostrarCurrentInfo==2" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.cuentas.length > 0">
                        <div class="header-col-table row">
                            <div class="col-6">
                                <span class="text-head-table">Nombre</span>
                            </div>
                            <div class="col-2">
                                <span class="text-head-table">Folio</span>
                            </div>
                            <div class="col-4">
                                <span class="text-head-table">Raz&oacute;n social</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="cuenta in resultBusqueda.cuentas | limitTo: limitCuentas  track by $index" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-6">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cuenta.id, cuenta.keyObject)">
                                    <span class="text-table" ng-bind="cuenta.nombre"></span>
                                </a>
                            </div>
                            <div class="col-2">
                                <span class="text-table" ng-bind="cuenta.folioCuenta"></span>
                            </div>
                            <div class="col-4">
                                <span class="text-table" ng-bind="cuenta.razonSocial"></span>
                            </div>
                        </div>
                        <div class="row" ng-show="resultBusqueda.cuentas.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosCuentas()">
                                    <span ng-show="limitCuentas === 10">Mostrar mas...</span>
                                    <span ng-show="limitCuentas !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ng-if="resultBusqueda.cuentas.length==0 || !resultBusqueda.cuentas" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>
                <div ng-if="mostrarCurrentInfo==3" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.cuentasFactura.length > 0">
                        <div class="header-col-table row">
                            <div class="col-3">
                                <span class="text-head-table">N&uacute;mero de cuenta factura</span>
                            </div>
                            <div class="col-5">
                                <span class="text-head-table">Nombre</span>
                            </div>
    
                            <div class="col-4">
                                <span class="text-head-table">Responsable</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="cuenta in resultBusqueda.cuentasFactura | limitTo: limitCuentaFactura  track by $index" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-3">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cuenta.id, cuenta.keyObject)">
                                    <span class="text-table" ng-bind="cuenta.numCuentaFactura"></span>
                                </a>
                            </div>
                            <div class="col-5">
                                <span class="text-table" ng-bind="cuenta.nombre"></span>
                            </div>
                            <div class="col-4">
                                <span class="text-table" ng-bind="cuenta.nombreResponsableComercial"></span>
                            </div>
                        </div>
                        <div class="row" ng-show="resultBusqueda.cuentasFactura.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosCuentaFactura()">
                                    <span ng-show="limitCuentaFactura === 10">Mostrar mas...</span>
                                    <span ng-show="limitCuentaFactura !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ng-if="resultBusqueda.cuentasFactura.length==0 || !resultBusqueda.cuentasFactura" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>
                <div ng-if="mostrarCurrentInfo==4" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.cotizaciones.length > 0">
                        <div class="header-col-table row">
                            <div class="col-4">
                                <span class="text-head-table">Nombre</span>
                            </div>
                            <div class="col-4">
                                <span class="text-head-table">Vigencia</span>
                            </div>
                            <div class="col-4">
                                <span class="text-head-table">Estatus</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="cotizacion in resultBusqueda.cotizaciones | limitTo: limitCotizacion  track by $index" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-4">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cotizacion.id, cotizacion.keyObject)">
                                    <span class="text-table" ng-bind="cotizacion.nombre"></span>
                                </a>
                            </div>
                            <div class="col-4">
                                <span class="text-table" ng-bind="cotizacion.vigenciaCotizacion"></span>
                            </div>
                            <div class="col-4">
                                <span class="text-table" ng-bind="cotizacion.estatus"></span>
                            </div>
                        </div>
                        <div class="row" ng-show="resultBusqueda.cotizaciones.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosCotizacion()">
                                    <span ng-show="limitCotizacion === 10">Mostrar mas...</span>
                                    <span ng-show="limitCotizacion !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ng-if="resultBusqueda.cotizaciones.length==0 || !resultBusqueda.cotizaciones" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>
                <div ng-if="mostrarCurrentInfo==5" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.cotSitios.length > 0">
                        <div class="header-col-table row">
                            <div class="col-2">
                                <span class="text-head-table">Nombre</span>
                            </div>
                            <div class="col-7">
                                <span class="text-head-table">Direcci&oacute;n</span>
                            </div>
                            <div class="col-3">
                                <span class="text-head-table">Plaza</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="cotSitio in resultBusqueda.cotSitios | limitTo: limitCotSitio  track by $index" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-2">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cotSitio.id, cotSitio.keyObject)">
                                    <span class="text-table" ng-bind="cotSitio.nombre"></span>
                                </a>
                            </div>
                            <div class="col-7">
                                <span class="text-table" ng-bind="cotSitio.direccionSitio"></span>
                            </div>
                            <div class="col-3">
                                <span class="text-table" ng-bind="cotSitio.plaza"></span>
                            </div>
                        </div>
                        <div class="row" ng-show="resultBusqueda.cotSitios.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosCotSitio()">
                                    <span ng-show="limitCotSitio === 10">Mostrar mas...</span>
                                    <span ng-show="limitCotSitio !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div ng-if="resultBusqueda.cotSitios.length==0 || !resultBusqueda.cotSitios" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>
                <div ng-if="mostrarCurrentInfo==6" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.cotSitiosPlan.length > 0">
                        <div class="header-col-table row">
                            <div class="col-3">
                                <span class="text-head-table">Nombre</span>
                            </div>
                            <div class="col-3">
                                <span class="text-head-table">Nombre plan</span>
                            </div>
                            <div class="col-2">
                                <span class="text-head-table">Acceso </span>
                            </div>
                            <div class="col-2">
                                <span class="text-head-table">OS</span>
                            </div>
                            <div class="col-2">
                                <span class="text-head-table">Acci&oacute;n</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="cotSitioPlan in resultBusqueda.cotSitiosPlan | limitTo: limitCotSitioPlan track by $index" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-3">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(cotSitioPlan.id, cotSitioPlan.keyObject)">
                                    <span class="text-table" ng-bind="cotSitioPlan.nombre"></span>
                                </a>
                            </div>
                            <div class="col-3">
                                <span class="text-table" ng-bind="cotSitioPlan.nombrePlan"></span>
                            </div>
                            <div class="col-2">
                                <span class="text-table" ng-bind="cotSitioPlan.accesoPrincipal"></span>
                            </div>
                            <div class="col-2">
                                <span class="text-table" ng-bind="cotSitioPlan.Folio_OS"></span>
                            </div>
                            <div class="col-2">
                                <a ng-if="cotSitioPlan.Folio_OS && cotSitioPlan.cuentaActiva ==='false'" href="" class="link-consultardetalle" ng-click="mostrarDetalleActivar(cotSitioPlan)">
                                    <span class='text-table-click'>Activar</span>
                                </a>
                                <a ng-if="cotSitioPlan.Folio_OS && cotSitioPlan.cuentaActiva ==='true'" href="" class="link-consultardetalle" ng-click="mostrarDetalleActivar(cotSitioPlan)">
                                    <span class='text-table-click'>Ver configuraci&oacute;n</span>
                                </a>
                                <!--span  class="noosactivar" ng-if="!cotSitioPlan.idCsp" >Postventa</span-->
                                
                            </div>
                        </div>
                        <div class="row" ng-show="resultBusqueda.cotSitiosPlan.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosCotSitioPlan()">
                                    <span ng-show="limitCotSitioPlan === 10">Mostrar mas...</span>
                                    <span ng-show="limitCotSitioPlan !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ng-if="resultBusqueda.cotSitiosPlan.length==0 || !resultBusqueda.cotSitiosPlan" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>
                <div ng-if="mostrarCurrentInfo==7" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.ordenesServicio.length > 0">
                        <div class="header-col-table row">
                            <div class="col-3">
                                <span class="text-head-table">Nombre</span>
                            </div>
                            <div class="col-3">
                                <span class="text-head-table">N&uacute;mero cuenta factura</span>
                            </div>
                            <div class="col-2">
                                <span class="text-head-table">Estatus</span>
                            </div>
                            <div class="col-2">
                                <span class="text-head-table">Acci&oacute;n</span>
                            </div>
                            <div class="col-2">
                                <span class="text-head-table">Carta</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="os in resultBusqueda.ordenesServicio | limitTo: limitOs track by $index" ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-3">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(os.id, os.keyObject); respaldarObjectoOs(os)">
                                    <span class="text-table" ng-bind="os.nombre"></span>
                                </a>
                            </div>
                            <div class="col-3">
                                <span class="text-table" ng-bind="os.numeroCuentaFactura"></span>
                            </div>
                            <div class="col-2">
                                <span class="text-table" ng-bind="os.estatus"></span>
                            </div>
                            <div class="col-2">
                                <!--a ng-if="os.idCsp && (os.cuentaActiva ==='false' || os.cuentaActiva ===undefined)" href="" class="link-consultardetalle">
                                    <span class="text-table-click">Activar</span>
                                </a-->
                                <a ng-if="os.idCsp && (os.cuentaActiva ==='false' || os.cuentaActiva ===undefined)" href="" class="link-consultardetalle" ng-click="mostrarDetalleActivarOs(os)">
                                    <span class="text-table-click">Activar</span>
                                </a>
                                <a ng-if="os.idCsp && os.cuentaActiva ==='true'" href="" class="link-consultardetalle" ng-click="mostrarDetalleActivarOs(os)">
                                    <span class="text-table-click">Ver configuraci&oacute;n</span>
                                </a>
    
                                <span  class="noosactivar" ng-if="!os.idCsp" >Postventa</span>
    
                            </div>
                            <div class="col-2">
                                <a ng-if="os.idOt" href="" class="link-consultardetalle">
                                    <span class="text-table-click">Descargar</span>
                                </a>
                            </div>
                            <!-- <div class="col-2">
                                <a ng-if="os.idOt" href="" class="link-consultardetalle" ng-click="consultaEvidencias(os.idOt, 'Validada')">
                                    <span class="text-table-click">Descargar</span>
                                </a>
                            </div> -->
                        </div>
                        <div class="row" ng-show="resultBusqueda.ordenesServicio.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosOs()">
                                    <span ng-show="limitOs === 10">Mostrar mas...</span>
                                    <span ng-show="limitOs !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ng-if="resultBusqueda.ordenesServicio.length==0 || !resultBusqueda.ordenesServicio" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>
                <div ng-if="mostrarCurrentInfo==8" class="contenedor-info-resumen">
                    <div class="col-12" ng-if="resultBusqueda.tickets.length > 0">
                        <div class="header-col-table row">
                            <div class="col-3">
                                <span class="text-head-table">N&uacute;mero</span>
                            </div>
                            <div class="col-6">
                                <span class="text-head-table">Nombre</span>
                            </div>
                            <div class="col-3">
                                <span class="text-head-table">Estatus</span>
                            </div>
                        </div>
                        <div class="row" ng-repeat="ticket in resultBusqueda.tickets | limitTo: limitTickets  track by $index"  ng-class="$index % 2 == 0 ? 'is-even-table' : 'is-odd-table'">
                            <div class="col-3">
                                <a href="" class="link-consultardetalle" ng-click="consultarDetalleObjectosSF(ticket.id, ticket.keyObject)">
                                    <span class="text-table" ng-bind="ticket.caseNumber"></span>
                                </a>
                            </div>
                            <div class="col-6">
                                <span class="text-table" ng-bind="ticket.nivel1"></span>
                            </div>
    
                            <div class="col-3">
                                <span class="text-table" ng-bind="ticket.status"></span>
                            </div>
                        </div>
                        <div class="row" ng-show="resultBusqueda.tickets.length > 10">
                            <div class="col-12">
                                <a class="style-link" href="" ng-click="mostrarMasMenosTickets()">
                                    <span ng-show="limitTickets === 10">Mostrar mas...</span>
                                    <span ng-show="limitTickets !== 10">Mostrar menos...</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ng-if="resultBusqueda.tickets.length==0 || !resultBusqueda.tickets" class="imagen-no-results text-center">
                        <img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
                        <br>
                        <span class="span-no-result">No se encontraron resultados</span>
                    </div>
                </div>
            </div>


           
            <jsp:include page="./content/detalleCuenta.jsp"></jsp:include>
            <jsp:include page="./content/detalleActivar.jsp"></jsp:include>
            <jsp:include page="./content/detalleCotizacion.jsp"></jsp:include>
            <jsp:include page="./content/detalleCotSitio.jsp"></jsp:include>
            <jsp:include page="./content/detalleCotSitioPlan.jsp"></jsp:include>
            <jsp:include page="./content/detalleCuentaFactura.jsp"></jsp:include>
            <jsp:include page="./content/detalleOportunidad.jsp"></jsp:include>
            <jsp:include page="./content/detalleOs.jsp"></jsp:include>
            <jsp:include page="./content/detalleTicket.jsp"></jsp:include>
        </div>


    </div>

    <jsp:include page="./modal/modalDetalleContacto.jsp"></jsp:include>
    <jsp:include page="./modal/modalDetalleServicio.jsp"></jsp:include>
    <jsp:include page="./modal/modalEvidenciaBusqueda.jsp"></jsp:include>
    <jsp:include page="./modal/modalImagenEvidenciaBusqueda.jsp"></jsp:include>
    <jsp:include page="./modal/modalProductos.jsp"></jsp:include>
    <jsp:include page="./modal/serviciosNoConfigurables.jsp"></jsp:include>
    
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
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<!-- Fin -->

<script src="${pageContext.request.contextPath}/resources/js/plantainterna/busqueda/busquedaController.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/busqueda/noticiasController.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/busqueda/busquedaService.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
<script	src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/directives.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/busqueda/activarController.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/busqueda/arrayEvidencia.js"></script>

</html>