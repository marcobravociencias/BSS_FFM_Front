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
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/busqueda/styleMainBusqueda.css?v=${sessionScope.versionDepl}" rel="stylesheet">
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

        <link href="${pageContext.request.contextPath}/resources/css/projectmanager/misProyectos/styleMisProyectos.css?v=${sessionScope.versionDepl}"  rel="stylesheet"/>
    </head>

    <body id="idBody" ng-controller="misProyectosController" ng-click="cerrarDetallePro()">
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
                                    <div class="row">
                                        <div class="col-6">
                                            <span ng-bind="proyecto.Nombre_cliente"></span>
                                        </div>
                                        <div class="col-6">
                                            <i class="style_fa_angle" ng-class="proyecto.Id_cuenta === idProyectoSelected ? 'fa fa-angle-down' : 'fa fa-angle-right' "></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" ng-show="proyecto.Id_cuenta === idProyectoSelected">
<!-- **********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS**********PUNTAS-->
                                <div class="col-12" ng-repeat="punta in proyecto.Puntas | filter : serachPuntas" ng-class="$index % 2 == 0 ? 'is-even-segundo-nivel' : 'is-odd-segundo-nivel'">
                                    <div class="row" ng-click="mostrarPlanes(punta)">
                                        <div class="col-12 menu-segundo-nivel">
                                            <div class="row">
                                                <div class="col-6">
                                                    <span ng-bind="punta.Nombre_sitio"></span>
                                                </div>
                                                <div class="col-6">
                                                    <i class="style_fa_angle" ng-class="punta.Id_cuenta === idPuntaSelected ? 'fa fa-angle-down' : 'fa fa-angle-right' "></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="punta.Id_cuenta === idPuntaSelected">
<!-- **********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES**********PLANES-->
                                        <div class="col-12" ng-repeat="plan in punta.Planes" ng-class="$index % 2 == 0 ? 'is-even-tercer-nivel' : 'is-odd-tercer-nivel'">
                                            <div class="row" ng-click="consultarActividadesPMS(plan)">
                                                <div class="col-12 menu-tercer-nivel">
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <span class="text-content-plan" ng-bind="plan.Folio_CSP"></span><span class="text-content-estatus-plan" ng-bind="' / ' + plan.statusCsp"></span>
                                                        </div>
                                                        <div class="col-1">
                                                            <i class="style_fa_angle" ng-class="plan.Id_csp === idPlanSelected ? 'fa fa-angle-down' : 'fa fa-angle-right' "></i>
                                                        </div>
                                                        <div class="col-5">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <div style="z-index: 10;" ng-click="mostrarAccionesPunta(plan.Id_csp )">
                                                                        <img style="height: 16px;" src="${pageContext.request.contextPath}/resources/img/projectmanager/icon_empresarial.svg" alt="">
                                                                        <span>Pendiente</span>
                                                                    </div>
                                                                    <div  ng-if="plan.Id_csp === idContSitioSelectedOptions" class="tooltip-punta-acciones" >
                                                                        <div class="row">
                                                                            <div class="col-md-12" style="text-align: center;">
                                                                                <i ng-click="consultarComentarios(plan,'punta');$event.stopPropagation()" title="Consultar comentarios" class=" fa fa-commenting-o icon-actividad-acciones" style="cursor: pointer;"></i>
                                                                                <i class="fa fa-hdd-o icon-actividad-acciones" ng-click="consultarServicios(plan)" title="Consultar servicios" style="cursor: pointer;"></i>
                                                                                <i ng-click="direccionarArchivos(plan)" title="Mostrar archivos" class="fa fa-file-text-o  icon-actividad-acciones" style="cursor: pointer;"></i>
                                                                                <i ng-click="abrirModalLigarContactoCSP(plan,punta)" title="Ligar contacto al sitio" class=" fa fa-user icon-actividad-acciones" style="cursor: pointer;"></i>
                                                                                <i ng-click="consultarInformacionVendedor(plan.idVendedor, true)" ng-show="plan.idVendedor !== undefined" title="Consultar vendedor" class=" fa fa-user-circle icon-actividad-acciones" style="cursor: pointer;"></i>
                                                                                <!--i ng-click="validarCsp()" class="fa fa-random icon-actividad-acciones" style="cursor: pointer;"></i-->
                                                                                <a ng-if="plan.Id_OS && plan.Id_OS!==undefined" href="descargarActaAceptacion?params.idCotSitio={{plan.Id_OS}}" title="Descargar carta de aceptaci&oacute;n" class=" fa fa-cloud-download icon-actividad-acciones" style="cursor: pointer;"></a>
                                                                                <!--i ng-click="abrirModalReabrirPlaneacion(plan)" ng-show="plan.PlaneacionCerrada === 'true'" title="Reabrir planeaci&oacute;n" class=" fa fa-folder-open icon-actividad-acciones" style="cursor: pointer;"></i-->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div ng-if="plan.Tipo_cuadrilla.includes('Empresarial') && plan.Id_csp === idContSitioSelectedOptions" class="tooltip-punta-acciones-indic" >
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" ng-show="plan.Id_csp === idPlanSelected">
                                                <div class="col-12" style="background-color: white; height: 30px; line-height: 30px; padding-left: 60px;">
                                                    <div class="row">
                                                        <div class="col-5">
                                                            <span class="header-text-actividad">Actividades</span>
                                                        </div>
                                                        <div class="col-3" style="padding: 0;">
                                                            <span class="header-text-actividad">Responsable</span>
                                                        </div>
                                                        <div class="col-2" style="padding: 0;">
                                                            <span class="header-text-actividad">Entrega</span>
                                                        </div>
                                                        <div class="col-1" style="padding: 0;">
                                                            <span class="header-text-actividad">%</span>
                                                        </div>
                                                        <div class="col-1">
                                                            <i class="fa fa-eye"></i>
                                                        </div>
                                                    </div>
                                                </div>
<!-- **********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES**********ACTIVIDADES-->
                                                <div class="col-12" ng-repeat="actividad in listaActividades" ng-class="$index % 2 == 0 ? 'is-even-cuarto-nivel' : 'is-odd-cuarto-nivel'">
                                                    <div class="row">
                                                        <div class="col-12 menu-cuarto-nivel">
                                                            <div class="row">
                                                                <div class="col-5 crop-text-col">
                                                                    <span class="text-content-actividad" title="{{actividad.Nombre_actividad}}" ng-bind="actividad.Nombre_actividad"></span>
                                                                </div>
                                                                <div class="col-3 crop-text-col" style="padding: 0;">
                                                                    <span class="text-content-actividad" title="{{actividad.Nombre_responsable}}" ng-bind="actividad.Nombre_responsable"></span>
                                                                </div>
                                                                <div class="col-2 crop-text-col" style="padding: 0;">
                                                                    <span class="text-content-actividad" title="{{actividad.fechaFinFormatReal}}" ng-bind="actividad.Fecha_fin_real._i !== NaN ? actividad.fechaFinFormatReal : ''"></span>
                                                                </div>
                                                                <div class="col-1 crop-text-col" style="padding: 0;">
                                                                    <span class="text-content-actividad" ng-bind="actividad.Porcentaje + '%'"></span>
                                                                </div>
                                                                <div class="col-1" style="padding: 0;">


                                                                    <i class="fa fa-cog icono-herramientas" ng-click="mostrarAcciones(actividad)">
                                                                        <div class="tooltip-actividad-acciones" ng-if="actividad.Id_actividad === idActividad">
                                                                            <div class="row">
                                                                                <div class="col-md-12" style="text-align: center;">
                                                                                    <i class="fa fa-calendar-o icon-actividad-acciones" title="Agendar actividad" ng-show="actividad.Id_OT === undefined" ng-if="(( actividad.Tiene_Ot=='true' && actividad.Unidad_negocio !== '3' ) || actividad.Unidad_negocio ) && actividad.Unidad_negocio !='3'" ng-click="abrirAgendamientoActividad(actividad,punta,plan)" style="cursor: pointer;"></i>
                                                                                    <!--i class="fa fa-hdd-o fa-lg icon-actividad-acciones" ng-if="actividad.Tiene_Ot=='true'" ng-click="consultarServicios(actividad,plan)" style="cursor: pointer;"></i-->
                                                                                    <i class="fa fa-pencil fa-lg icon-actividad-acciones" title="Editar actividad" ng-click="abrirModalEditarActividad(plan,actividad);" style="cursor: pointer;"></i>
                                                                                    <i class="fa fa-file-text-o fa-lg icon-actividad-acciones" title="Consultar archivos" ng-click="direccionarArchivosActividad(plan,actividad)" style="cursor: pointer;"></i>
                                                                                    <i class="fa fa-commenting-o fa-lg icon-actividad-acciones" title="Consultar comentarios" ng-click="consultarComentarios(actividad,'actividad');" style="cursor: pointer;"></i>
                                                                                    <i ng-click="validarCsp(actividad)" title="Cambiar estatus" ng-show="actividad.Tiene_Ot ==='true' && actividad.Porcentaje < 100" ng-if="actividad.Unidad_negocio !='3' && ( (actividad.Unidad_negocio === '2')|| (actividad.Tiene_Ot ==='true' && plan.Unidad_negocio==='2')) || actividad.Unidad_negocio !='3' && ( (actividad.Unidad_negocio === '1') || (actividad.Tiene_Ot ==='true' && plan.Unidad_negocio==='1') )" class="fa fa-random fa-lg icon-actividad-acciones" style="cursor: pointer;"></i>
                                                                                    <i class="fa fa-trash-o fa-lg icon-actividad-acciones" title="eliminar actividad" ng-if="actividad.Se_puede_eliminar === 'true' && planSelected.PlaneacionCerrada === 'false'" ng-click="abrirModalEliminarActividad(actividad);" style="cursor: pointer;"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="tooltip-actividad-acciones-indic" ng-if="actividad.Id_actividad === idActividad">
                                                                        </div>
                                                                    </i>

                                                                    <i style="margin-left: 5px; cursor: pointer;">
                                                                        <img ng-click="mostrarAccionesPunta(plan.Id_cot_sitio )" style="height: 16px;" src="${pageContext.request.contextPath}/resources/img/projectmanager/icon_empresarial.svg" alt="">
                                                                        <div ng-if="actividad.Id_actividad === idActividadSelectOptions" class="tooltip-actividad-acciones-ug" >
                                                                            <div class="row">
                                                                                <div class="col-md-12" style="text-align: center;">
                                                                                    <i ng-click="consultarMaterialesEmpresarial(actividad)" class="fa fa-wrench icon-actividad-acciones"      style="cursor: pointer;"></i>
                                                                                    <i ng-click="consultarEvidenciaEmpresarial(actividad)" class="fa fa-picture-o fa-lg icon-actividad-acciones" style="cursor: pointer;"></i>
                                                                                    <i ng-click="consultarDetalleEmpresarial(actividad)" class="fa fa-list-ul fa-lg icon-actividad-acciones" style="cursor: pointer;"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div ng-if="actividad.Id_actividad === idActividadSelectOptions" class="tooltip-actividad-acciones-ug-indic" >
                                                                        </div>
                                                                    </i>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12" style="height: 40px; line-height: 40px; background-color: white; padding-left: 3em;">
                                                    <span>Anadir</span>
                                                </div>
                                                <div class="col-12" style="height: 40px; line-height: 40px; background-color: white; padding-left: 3em;">
                                                    <span>Finalizar planeacion</span>
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
                                            <div class="resto-avance-primer-nivel">
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
                                                <div class="vacio-grafica-segundo-nivel" ng-style="{width: punta.porcentajeInicio+'%'}">
                                                </div>
                                                <div class="container-punta" ng-style="{'width': punta.porcentajePunta+'%', 'background': 'linear-gradient(to right, ' + punta.semaforo + ' ' + punta.porcentajeAvance +'%, #D0CFDB '+ punta.porcentajeAvance +'%)'}">
                                                    <div class="avance-segundo-nivel" ng-style="{width: punta.porcentajeAvance+'%'}">
                                                        <span class="fecha-inicio-segundo-nivel" ng-bind="punta.fechaInicioFormat"></span>
                                                        &nbsp;
                                                    </div>
                                                    <div class="resto-avance-segundo-nivel">
                                                        <span class="porcentaje-segundo-nivel" ng-bind="punta.porcentajeAvance+'%'"></span>
                                                    </div>
                                                </div>
                                                <div class="vacio-grafica-segundo-nivel" ng-style="{width: punta.porcentajeFIn+'%'}">
                                                    <span class="fecha-fin-segundo-nivel" ng-bind="punta.fechaFinFormat"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" ng-show="punta.Id_cuenta === idPuntaSelected">
<!-- ----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES----------PLANES -->
                                        <div class="col-12" ng-repeat="plan in punta.Planes" ng-class="$index % 2 == 0 ? 'is-even-tercer-nivel' : 'is-odd-tercer-nivel'">
                                            <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                                <div style="padding-left: 30px; padding-right: 30px;" class="grafica-tercer-nivel" ng-style="{width: widthCalendar + 'px'}" ng-class="$index % 2 == 0 ? 'is-even-tercer-nivel' : 'is-odd-tercer-nivel'">
                                                    <div class="row" style="margin-top: .7em;" ng-show="plan.valor">
                                                        <div class="vacio-grafica-tercer-nivel" ng-style="{width: plan.porcentajeInicio+'%'}">
                                                        </div>
                                                        <div class="container-plan" ng-style="{'width': plan.porcentajePlan+'%', 'background': 'linear-gradient(to right, ' + plan.semaforo + ' ' + plan.porcentajeAvance +'%, #D0CFDB '+ plan.porcentajeAvance +'%)'}">
                                                            <div class="avance-tercer-nivel" ng-style="{width: plan.porcentajeAvance+'%'}">
                                                                <span class="fecha-inicio-tercer-nivel" ng-bind="punta.fechaInicioFormat"></span>
                                                                &nbsp;
                                                            </div>
                                                            <div class="resto-avance-tercer-nivel">
                                                                <span class="porcentaje-tercer-nivel" ng-bind="plan.porcentajeAvance+'%'"></span>
                                                            </div>
                                                        </div>
                                                        <div class="vacio-grafica-tercer-nivel" ng-style="{width: plan.porcentajeFIn+'%'}">
                                                            <span class="fecha-fin-tercer-nivel" ng-bind="plan.fechaFinFormat"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" ng-show="plan.Id_csp === idPlanSelected">
                                                <div class="col-12" style="background-color: white; height: 30px;">
                                                    <div class="row">
                                                        &nbsp;
                                                    </div>
                                                </div>
<!-- ----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES----------ACTIVIDADES -->
                                                <div class="col-12" ng-repeat="actividad in listaActividades" ng-class="$index % 2 == 0 ? 'is-even-cuarto-nivel' : 'is-odd-cuarto-nivel'">
                                                    <div class="row" ng-style="{width: widthCalendar + 'px'}">
                                                        <div style="padding-left: 30px; padding-right: 30px;" class="grafica-cuarto-nivel" ng-class="$index % 2 == 0 ? 'is-even-cuarto-nivel' : 'is-odd-cuarto-nivel'">
                                                            <div class="row" style="margin-top: .5em;" ng-show="actividad.valor">
                                                                <div class="vacio-grafica-cuarto-nivel" ng-style="{width: actividad.porcentajeInicioPlaneada+'%'}">
                                                                </div>
                                                                <div class="container-actividad" ng-style="{'width': actividad.porcentajeActividadPlaneada+'%', 'background': 'linear-gradient(to right, ' + plan.semaforo + ' ' + actividad.Porcentaje +'%, #D0CFDB '+ actividad.Porcentaje +'%)'}">
                                                                    <div class="avance-cuarto-nivel" ng-style="{width: actividad.Porcentaje+'%'}">
                                                                        <span class="fecha-inicio-cuarto-nivel" ng-bind="actividad.fechaInicioFormatPlaneada"></span>
                                                                        &nbsp;
                                                                    </div>
                                                                    <div class="resto-avance-cuarto-nivel">
                                                                        <span class="porcentaje-cuarto-nivel" ng-bind="actividad.Porcentaje+'%'"></span>
                                                                    </div>
                                                                </div>
                                                                <div class="vacio-grafica-cuarto-nivel" ng-style="{width: actividad.porcentajeFinPlaneada+'%'}">
                                                                    <span class="fecha-fin-cuarto-nivel" ng-bind="actividad.fechaFinFormatReal"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="height: 80px; line-height: 80px; background-color: white;">
                                                    &nbsp;
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

    <script src="${pageContext.request.contextPath}/resources/js/projectmanager/misProyectos/misProyectosController.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/projectmanager/misProyectos/graficaController.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/projectmanager/misProyectos/misProyectosService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
</html>
