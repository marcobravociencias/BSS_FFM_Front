<!DOCTYPE html>
<html lang="es" ng-app="misProyectosApp">

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

        <link href="${pageContext.request.contextPath}/resources/css/projectmanager/misProyectos/styleMisProyectos.css"  rel="stylesheet"/>
    </head>

    <body id="idBody" ng-controller="misProyectosController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="col-12" style="padding-left: 0px;">
            <div class="row">
                <div class="col-5 content-left-grafica">
                    <div class="row" style="height: 90px;">
                    </div>
                    <div class="row">
<!-- **********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS**********PROYECTOS-->
                        <div class="col-12" ng-repeat="proyecto in listaProyectosGrafica" ng-class="$index % 2 == 0 ? 'is-even-primer-nivel' : 'is-odd-primer-nivel'">
                            <div class="row" ng-click="mostrarPuntas(proyecto)">
                                <div class="col-12 menu-primer-nivel">
                                    <span ng-bind="proyecto.Nombre_cliente"></span>
                                </div>
                            </div>
                            <div class="row" ng-show="proyecto.Id_cuenta === idProyectoSelected">
<!-- **********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS-->
                                <div class="col-12" ng-repeat="punta in proyecto.Puntas | filter : serachPuntas" ng-class="$index % 2 == 0 ? 'is-even-segundo-nivel' : 'is-odd-segundo-nivel'">
                                    <div class="row" ng-click="mostrarPlanes(punta)">
                                        <div class="col-12 menu-segundo-nivel">
                                            <span ng-bind="punta.Nombre_sitio"></span>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="punta.Id_cuenta === idPuntaSelected">
<!-- **********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES-->
                                        <div class="col-12" ng-repeat="plan in punta.Planes" ng-class="$index % 2 == 0 ? 'is-even-tercer-nivel' : 'is-odd-tercer-nivel'">
                                            <div class="row" ng-click="consultarActividadesPMS(plan)">
                                                <div class="col-12 menu-tercer-nivel">
                                                    <span ng-bind="plan.Folio_CSP"></span>
                                                </div>
                                            </div>
                                            <div class="row" ng-show="plan.Id_csp === idPlanSelected">
<!-- **********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES-->
                                                <div class="col-12" ng-repeat="actividad in listaActividades" ng-class="$index % 2 == 0 ? 'is-even-cuarto-nivel' : 'is-odd-cuarto-nivel'">
                                                    <div class="row">
                                                        <div class="col-12 menu-cuarto-nivel">
                                                            <span ng-bind="actividad.Nombre_actividad"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<!-- ******************************************************************************************************************************************************************************************************************************** -->
                <div class="col-7" style="overflow-x: scroll;">
                    <div class="row" style="height: 90px;">
                        <div class="col-12">
                            <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                <div style="padding-left: 30px; padding-right: 30px;">
                                    <div class="row">
                                        <div class="text-center" ng-repeat="mes in lineaTiempo.calendarioMeses"
                                            ng-style="{width: mes.porcentaje + '%'}" style="font-weight: bold; white-space:nowrap;">
                                            <span class="meses" ng-bind="mes.mes"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                <div style="padding-left: 30px; padding-right: 30px;">
                                    <div class="row">
                                        <div ng-repeat="dia in lineaTiempo.calendarioDias" class="content-dia" ng-style="{width: lineaTiempo.porcentajeDia + '%'}">
                                            <span class="dias" ng-bind="dia.dia"></span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                <div style="padding-left: 30px; padding-right: 30px;">
                                    <div class="row">
                                        <div class="content-dia" ng-style="{width: lineaTiempo.diaActual+'%'}">
                                        </div>
                                        <div class="content-dia" ng-style="{width: 100-lineaTiempo.diaActual+'%'}">
                                            <!--span class="fechaActualDay" ng-bind="lineaTiempo.fechaActualFormat"></span-->
                                            <div id="diaActu" class="vl" style="height: 7em; margin-left: -.1em;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
<!-- ----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS----------PROYECTOS -->
                        <div class="col-12" ng-repeat="proyecto in listaProyectosGrafica" ng-class="$index % 2 == 0 ? 'is-even-primer-nivel' : 'is-odd-primer-nivel'">
                            <div class="row" ng-style="{width: widthCalendar + 'px'}" >
                                <div class="grafica-primer-nivel" ng-class="$index % 2 == 0 ? 'is-even-primer-nivel' : 'is-odd-primer-nivel'">
                                    <div class="row" style="margin-top: 1em;">
                                        <div class="vacio-grafica-primer-nivel" ng-style="{width: proyecto.porcentajeInicio+'%'}">
                                        </div>
                                        <div class="container-proyecto" ng-style="{'width': proyecto.porcentajeProyecto+'%', 'background': 'linear-gradient(to right, ' + proyecto.semaforo + ' ' + proyecto.porcentajeAvance +'%, #D0CFDB '+ proyecto.porcentajeAvance +'%)'}" >
                                            <!-- ng-style="{'width': proyecto.porcentajeProyecto+'%', 'background': 'linear-gradient(to right, black 20%, #D0CFDB 20%)'}" -->
                                            <div class="avance-primer-nivel" ng-style="{width: proyecto.porcentajeAvance+'%'}">
                                                <span class="fecha-inicio-primer-nivel" ng-bind="proyecto.fechaInicioFormat"></span>
                                                &nbsp;
                                            </div>
                                            <div class="resto-avance-primer-nivel"><!--ng-style="{width: 100-proyecto.porcentajeAvance+'%'}" -->
                                                <span class="porcentaje-primer-nivel" ng-bind="proyecto.porcentajeAvance+'%'"></span>
                                            </div>
                                        </div>
                                        <div class="vacio-grafica-primer-nivel" ng-style="{width: proyecto.porcentajeFIn+'%'}">
                                            <span class="fecha-fin-primer-nivel" ng-bind="proyecto.fechaFinFormat"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" ng-show="proyecto.Id_cuenta === idProyectoSelected">
<!-- ----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS----------PUNTAS -->
                                <div class="col-12" ng-repeat="punta in proyecto.Puntas | filter : serachPuntas" ng-class="$index % 2 == 0 ? 'is-even-segundo-nivel' : 'is-odd-segundo-nivel'">
                                    <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                        <div style="padding-left: 30px; padding-right: 30px;" class="grafica-segundo-nivel" ng-class="$index % 2 == 0 ? 'is-even-segundo-nivel' : 'is-odd-segundo-nivel'">
                                            <div class="row" style="margin-top: .8em;">
                                                <div class="vacio-grafica" ng-style="{width: punta.porcentajeInicio+'%'}">
                                                </div>
                                                <div class="container-punta" ng-style="{width: punta.porcentajePunta+'%'}" style="background-color: #D0CFDB;" ng-style="{'width': punta.porcentajePunta+'%', 'background': 'linear-gradient(to right, ' + punta.semaforo + ' ' + punta.porcentajeAvance +'%, #D0CFDB '+ punta.porcentajeAvance +'%)'}">
                                                    <div class="avance-primer-nivel" ng-style="{width: punta.porcentajeAvance+'%'}">
                                                        <span class="fecha-inicio-primer-nivel" ng-bind="punta.fechaInicioFormat"></span>
                                                        &nbsp;
                                                    </div>
                                                    <div class="resto-avance-primer-nivel">
                                                        <span class="porcentaje-primer-nivel" ng-bind="punta.porcentajeAvance+'%'"></span>
                                                    </div>
                                                </div>
                                                <div class="vacio-grafica" ng-style="{width: punta.porcentajeFIn+'%'}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="punta.Id_cuenta === idPuntaSelected">
<!-- ----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES -->
                                        <div class="col-12" ng-repeat="plan in punta.Planes" ng-class="$index % 2 == 0 ? 'is-even-tercer-nivel' : 'is-odd-tercer-nivel'">
                                            <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                                <div style="padding-left: 30px; padding-right: 30px;" class="grafica-tercer-nivel" ng-style="{width: widthCalendar + 'px'}" ng-class="$index % 2 == 0 ? 'is-even-tercer-nivel' : 'is-odd-tercer-nivel'">
                                                    <div class="row" style="margin-top: .6em;" ng-show="plan.valor">
                                                        <div class="vacio-grafica" ng-style="{width: plan.porcentajeInicio+'%'}">
                                                        </div>
                                                        <div class="container-plan" ng-style="{width: plan.porcentajePlan+'%'}" style="background-color: #D0CFDB;">
                                                            2
                                                        </div>
                                                        <div class="vacio-grafica" ng-style="{width: plan.porcentajeFIn+'%'}">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" ng-show="plan.Id_csp === idPlanSelected">
<!-- ----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES -->
                                                <div class="col-12" ng-repeat="actividad in listaActividades" ng-class="$index % 2 == 0 ? 'is-even-cuarto-nivel' : 'is-odd-cuarto-nivel'">
                                                    <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                                        <div style="padding-left: 30px; padding-right: 30px;" class="grafica-cuarto-nivel" ng-class="$index % 2 == 0 ? 'is-even-cuarto-nivel' : 'is-odd-cuarto-nivel'">
                                                            <div class="row" style="margin-top: .4em;" ng-show="actividad.valor">
                                                                <div class="vacio-grafica" ng-style="{width: actividad.porcentajeInicio+'%'}">
                                                                </div>
                                                                <div class="container-actividad" ng-style="{width: actividad.porcentajeActividad+'%'}" style="background-color: #D0CFDB;">
                                                                    2
                                                                </div>
                                                                <div class="vacio-grafica" ng-style="{width: actividad.porcentajeFIn+'%'}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </body>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment-with-locales.js"></script>
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

    <script src="${pageContext.request.contextPath}/resources/js/projectmanager/misProyectos/misProyectosController.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/projectmanager/misProyectos/graficaController.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/projectmanager/misProyectos/misProyectosService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
</html>
