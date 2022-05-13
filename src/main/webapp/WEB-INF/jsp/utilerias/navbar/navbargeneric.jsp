<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<sec:authentication property="principal" var="userStore" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet" />
<link
    href="${pageContext.request.contextPath}/resources/css/plantainterna/generic/navbar.css?v=${sessionScope.versionDepl}"
    rel="stylesheet" />
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
<jsp:include page="./modalFotoDespacho.jsp"></jsp:include>
<jsp:include page="./modalCambiaContrasenia.jsp"></jsp:include>

<header class="header-navbar-p">
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-menu-generic">
        <div class="container-fluid container-fludi-navbar">

            <div class="collapse navbar-collapse container-menus-hader justify-content-center" id="navbarTogglerDemo02">
                <div class="content-image">
                    <c:if
                        test="${userStore.configuraciones['KEY_BANER'] != null &&  userStore.configuraciones['KEY_BANER'] != ''}">
                        <img class="image-totalplayheader"
                            src="${pageContext.request.contextPath}/resources/img/navbar/${userStore.configuraciones['KEY_BANER']}"
                            height="27" alt="" loading="lazy" />
                    </c:if>
                    <c:if
                        test="${userStore.configuraciones['KEY_BANER'] == null ||  userStore.configuraciones['KEY_BANER'] == ''}">
                        <img class="image-totalplayheader"
                            src="${pageContext.request.contextPath}/resources/img/logotipos/residencial.png" height="27"
                            alt="" loading="lazy" />
                    </c:if>
                </div>
                <ul class="ul-elementos-nav navbar-nav me-auto mb-2 mb-lg-0">
                    <c:forEach var="permi" items="${userStore.modulos}">
                        <c:if test="${permi.dentroNavbar}">
                            <li id="${permi.clave}" class="nav-item ">
                                <i class="${permi.icono} icon-navbar-izquierda"></i>
                                <a class="nav-link a-navlink-navbar" href="${permi.clave}">${permi.descripcion}</a>
                            </li>
                        </c:if>
                    </c:forEach>
                    <c:if test="${userStore.banderaPintarOtros}">
                        <li id="nav-bar-otros-options" class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="otros-option-navbar" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                Otros
                            </a>
                            <!-- Dropdown menu -->
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <c:forEach var="permi" items="${userStore.modulos}">
                                    <c:if test="${!permi.dentroNavbar}">
                                        <li id="${permi.clave}">
                                            <a class="dropdown-item" href="${permi.clave}">
                                                <i class="${permi.icono} icon-navbar-izquierda icon-otros-dropdown"></i>
                                                ${permi.descripcion}</a>
                                        </li>
                                    </c:if>
                                </c:forEach>
                            </ul>
                        </li>
                    </c:if>

                    <!--li id="li-despacho-navbar" class="nav-item ">
                        <i class="fas fa-user-circle icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar"  href="despachoplantainterna">Despacho</a>
                    </li>
                    <li id="li-disponibilidad-navbar" class="nav-item">
                        <i class="fas fa-briefcase icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar" href="disponibilidad">Disponibilidad</a>
                    </li>
                    
                    <li id="li-consultaot-navbar" class="nav-item">
                        <i class="far fa-folder-open icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar" href="consultaOT">Consulta ot</a>
                    </li>
                    <li id="li-skills-navbar" class="nav-item">
                        <i class="fas fa-marker icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar" href="skillsAdm">Skills</a>
                    </li>
                    <li id="li-reporte-navbar" class="nav-item"> 
                        <i class="fa fa-bar-chart icon-navbar-izquierda"></i> 
                        <a class="nav-link a-navlink-navbar" href="reportesPI">Reportes</a> 
                    </li>
                    <li id="li-coordinador-navbar" class="nav-item">
                        <i class="fa fa-users icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar" href="coordInst">Coordinador Instalaciones</a>
                    </li>
                    <li id="li-vehiculos-navbar" class="nav-item">
                        <i class="fas fa-taxi icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar" href="controlVehicular">Veh&iacute;culos</a>
                    </li-->
                    <!--li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                                    class="fas fa-bars icon-navbar-izquierda"></i>
                                Otros
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="reportesPI">Reportes</a>
                                <a class="dropdown-item" href="skillsAdm">Skills</a>
                                <a class="dropdown-item" href="busqueda">Busqueda</a>
                                <a class="dropdown-item" href="controlVehicular">Control de Veh&iacute;culos</a>
                            </div>
                        </li-->
                </ul>
                <div class="content-mascota">
                    <svg xmlns="http://www.w3.org/2000/svg" id="monsterPlay" viewBox="0 0 949.28 1077.26" width="48"
                        class="monster" height="48">
                        <defs>
                            <style>
                                .cls-1 {
                                    fill: #afd359;
                                }

                                .cls-2 {
                                    fill: #d9025e;
                                }

                                .cls-3 {
                                    fill: #8bbd23;
                                }

                                .cls-4 {
                                    fill: #1bb0e0;
                                }

                                .cls-5 {
                                    fill: #fff;
                                }

                                .cls-6 {
                                    fill: #941e80;
                                }

                                .cls-7 {
                                    fill: #e5164c;
                                }

                                .cls-8 {
                                    fill: #9e4894;
                                }

                                .cls-9 {
                                    fill: #f9b700;
                                }

                                .cls-10 {
                                    fill: #1f2a43;
                                }

                                .cls-11 {
                                    fill: #ffd733;
                                }
                            </style>
                        </defs>
                        <g id="Capa_2" data-name="Capa 2">
                            <g id="Capa_1-2" data-name="Capa 1">
                                <path class="cls-2"
                                    d="M386.38,185.63,231.64,187c-14.45-59,26.41-137,57.08-172.87,56.43-66-10.44,117.55,97.66,171.48" />
                                <path class="cls-2"
                                    d="M712.15,282.6l144.12,98.33c33.2-50.91,46.26-142.52,41.29-189.47-9.14-86.39-65.76,107.84-185.41,91.14" />
                                <path class="cls-4"
                                    d="M275,159.26c-57.42.69-86.48,29.55-92,68.87a474.1,474.1,0,0,1,118.09-67.42A228.94,228.94,0,0,0,275,159.26Z" />
                                <path class="cls-4"
                                    d="M539.62,1003c30.41-19.57,34.77-60.21,31.77-85.4s-13.92-66.9-16-78.26c-1.37-6.08-2.29-15.59-2.9-26.29,47.28-16.51,217-63.78,211.56-107.76-2.38-19.44-27.31-9-37.1,1.5-11.24,12.09-27.63,43.67-42.39,35.4-11.43-6.4,32.82-35.89,18.12-43.2-12.86-6.4-39,31.66-45.81,32.07,7.87-.49-70.34,7.34-106,9.86,2.34-8.1,13-28.31,11.14-26.64,35.77-32.78,222.89-172.06,262.6-226.54,54.17-74.32,61.61-122.54-.15-158.06C722.1,270.85,424.93,173.71,301.08,160.71A474.1,474.1,0,0,0,183,228.13a109.33,109.33,0,0,0-.63,23.76c7.17,92.52,35.71,224.12,75.25,336.47,16.32,46.38,34.53,89.4,53.87,125.12-10.19,10.5-89,91.91-120.7,132.21-12.13,15.38-18.89,52.18,17.15,65.54,15.48,5.75,32.71-2.08,40.75-17,9.3,1.38,18.73-4.39,22.11-14.11,2.21-6.37,4.15-14.44-3.15-19.11,7.23-6,35.36-23.17,44.15-26.7a4.19,4.19,0,0,1,5.46,4.5c-2.14,11.34-13.91,50.84-16.33,78.19s1.1,65.84,31.44,85.53c-4.85,16.56-6.6,39.14-7.21,50.67a471.36,471.36,0,0,0,77.38,18.58c2-10.79,4.37-22.21,6.84-33.47,10.88,1.25,15,1.88,26.54,1.89s15.65-.57,26.54-1.78c2.83,13.13,5.57,26.46,7.63,38.78l4.56,0a477.27,477.27,0,0,0,91-8.71,117.29,117.29,0,0,0-18.7-7.44S546.29,1026.16,539.62,1003ZM640.86,458.86a71.78,71.78,0,1,1-71.64-71.93A71.89,71.89,0,0,1,640.86,458.86ZM469.79,251.43a71.78,71.78,0,1,1-71.93,71.64A71.86,71.86,0,0,1,469.79,251.43ZM278.92,443.9a71.79,71.79,0,1,1,71.64,71.92A71.87,71.87,0,0,1,278.92,443.9ZM439.55,661.29c-81.46-8.13-117.84-52.38-114.57-56,1.09-1.22,6.51,2.81,16.36,8.9,4.15-5.78,29-39.67,37.87-36.46,7.77,2.82,1.89,40.63-.73,55.47a238.18,238.18,0,0,0,75,16.83,199.88,199.88,0,0,0,74.87-9.36c.71-15.25,3.34-55,11.64-57.5,8.12-2.45,23.93,26.47,30.21,38.73,14.2-8.17,22.24-14.57,23.49-13.21C597,612.28,545.58,671.87,439.55,661.29Z" />
                                <path class="cls-5"
                                    d="M469.5,395a71.78,71.78,0,1,0-71.64-71.91A71.84,71.84,0,0,0,469.5,395Zm.23-118.42a46.48,46.48,0,0,1,19.1,4.16A24.16,24.16,0,0,0,471,286.06c-10.71,8.94-11.55,25.57-1.9,37.18S495.25,337,506,328.08a24.15,24.15,0,0,0,8.57-17.42,46.62,46.62,0,1,1-44.8-34.1Z" />
                                <path class="cls-5"
                                    d="M422.49,444.18a71.79,71.79,0,1,0-71.93,71.64A71.86,71.86,0,0,0,422.49,444.18Zm-118.43-.24a46.67,46.67,0,0,1,68.72-41A24.3,24.3,0,0,0,352.94,408c-10.71,8.92-11.55,25.56-1.88,37.17S377.24,459,388,450.05a24,24,0,0,0,8.39-15.65,46.64,46.64,0,1,1-92.28,9.54Z" />
                                <path class="cls-5"
                                    d="M497.3,458.58a71.78,71.78,0,1,0,71.92-71.65A71.87,71.87,0,0,0,497.3,458.58Zm71.87-46.51a46.33,46.33,0,0,1,20.61,4.9,24.23,24.23,0,0,0-19,5.22c-10.71,8.94-11.55,25.57-1.88,37.17s26.19,13.78,36.89,4.85a24.1,24.1,0,0,0,8.51-16.84,46.61,46.61,0,1,1-45.1-35.3Z" />
                                <path class="cls-6"
                                    d="M397.35,444.13a46.55,46.55,0,0,0-1-9.73A24,24,0,0,1,388,450.05c-10.71,8.93-27.23,6.75-36.89-4.84S342.23,417,352.94,408A24.3,24.3,0,0,1,372.78,403a46.64,46.64,0,1,0,24.57,41.18Z" />
                                <path class="cls-7"
                                    d="M469.55,369.86a46.52,46.52,0,0,0,45-59.2A24.15,24.15,0,0,1,506,328.08c-10.71,8.93-27.22,6.75-36.9-4.84S460.25,295,471,286.06a24.16,24.16,0,0,1,17.87-5.34,46.64,46.64,0,1,0-19.28,89.14Z" />
                                <path class="cls-8"
                                    d="M379.21,577.71c-8.86-3.21-33.72,30.68-37.87,36.46a244.06,244.06,0,0,0,37.14,19C381.1,618.34,387,580.53,379.21,577.71Z" />
                                <path class="cls-9"
                                    d="M540,583.15c-8.3,2.53-10.93,42.25-11.64,57.5a219.5,219.5,0,0,0,41.85-18.77C564,609.62,548.15,580.7,540,583.15Z" />
                                <path class="cls-10"
                                    d="M593.73,608.67c-1.25-1.36-9.29,5-23.49,13.21,1.67,3.26,2.67,5.35,2.67,5.35l-44.75,19.32s.06-2.26.23-5.9A199.88,199.88,0,0,1,453.52,650a238.18,238.18,0,0,1-75-16.83c-.65,3.65-1.1,5.92-1.1,5.92L340.74,615l.6-.83c-9.85-6.09-15.27-10.12-16.36-8.9-3.27,3.64,33.11,47.89,114.57,56C545.58,671.87,597,612.28,593.73,608.67Z" />
                                <path class="cls-10"
                                    d="M377.38,639.1s.45-2.27,1.1-5.92a244.06,244.06,0,0,1-37.14-19l-.6.83Z" />
                                <path class="cls-10"
                                    d="M572.91,627.23s-1-2.09-2.67-5.35a219.5,219.5,0,0,1-41.85,18.77c-.17,3.64-.23,5.9-.23,5.9Z" />
                                <path class="cls-3"
                                    d="M569,505.35a46.46,46.46,0,0,0,45.29-58,24.1,24.1,0,0,1-8.51,16.84c-10.7,8.93-27.23,6.76-36.89-4.85s-8.83-28.23,1.88-37.17a24.23,24.23,0,0,1,19-5.22A46.62,46.62,0,1,0,569,505.35Z" />
                                <path class="cls-11" d="M656.84,731l.06.07C657.56,731,657.58,731,656.84,731Z" />
                                <path class="cls-4"
                                    d="M684.53,742.16c-11.43-6.4,32.82-35.89,18.12-43.2-12.86-6.4-39,31.66-45.81,32.07.74,0,.72,0,.06.07C665.16,742.06,684.53,742.16,684.53,742.16Z" />
                            </g>
                        </g>
                    </svg>
                </div>

                <c:if test="${userStore.pais != null}">
                    <div class="content-header content-header-border">
                        <div class="icon-wrapper icon-wrapper-alt-pais rounded-circle">
                            <div class="icon-wrapper-bg bg-focus"></div>
                            <c:choose>
                                <c:when
                                    test="${userStore.pais.toLowerCase().contains('mexico') || userStore.pais.toLowerCase().contains('mx')  }">
                                    <img class="img-despacho-pais language-icon flag flag-icon-background flag-icon-d"
                                        src="${pageContext.request.contextPath}/resources/img/navbar/mexico.png"
                                        loading="lazy" />
                                </c:when>
                                <c:when
                                    test="${userStore.pais.toLowerCase().contains('colombia') || userStore.pais.toLowerCase().contains('col')  }">
                                    <img class="img-despacho-pais language-icon flag flag-icon-background flag-icon-d"
                                        src="${pageContext.request.contextPath}/resources/img/navbar/mexico.png"
                                        loading="lazy" />
                                </c:when>
                                <c:otherwise>
                                    <img class="img-despacho-pais language-icon flag flag-icon-background flag-icon-d"
                                        src="${pageContext.request.contextPath}/resources/img/navbar/mexico.png"
                                        loading="lazy" />
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </div>
                </c:if>

                <div class="content-header" id="user-info-login">
                    <div class="row dropdown-toggle" id="dropdownMenuLogin" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false" style="cursor: pointer;" onclick="cargarEstatusUs()">
                        <div class="col-3" style="padding-right: 0;padding-top: 0.5em;">
                            <c:if
                                test="${userStore.urlFoto != null &&  userStore.urlFoto != '' && userStore.urlFoto != 'string'}">
                                <div class="icon-wrapper icon-wrapper-alt-user rounded-circle ">
                                    <img class="img-despacho-navbar img-user-profile-navbar" src="${userStore.urlFoto}"
                                        height="37" alt="" loading="lazy" />
                                    <div class="badge badge-dot badge-dot-sm badge-success"></div>
                                </div>
                            </c:if>
                            <c:if
                                test="${userStore.urlFoto == null ||  userStore.urlFoto == '' || userStore.urlFoto == 'string'}">
                                <div class="icon-wrapper icon-wrapper-alt-user rounded-circle back-groud-user">
                                    <img class="img-despacho-navbar img-user-profile-navbar"
                                        src="./resources/img/plantainterna/despacho/tecnicootasignada.png" height="37"
                                        alt="" loading="lazy" />
                                    <div class="badge badge-dot badge-dot-sm badge-success"></div>
                                </div>
                            </c:if>
                        </div>
                        <div class="col-9" style="padding-right: 0; padding-top: 0.4em;">
                            <div class="nav-nombre-usuario-generic">
                                <span class="header-nombre-usuario">
                                    <sec:authentication property="principal.usuarioNombre" />
                                    <sec:authentication property="principal.usuarioApellidoPaterno" />
                                    -
                                    <sec:authentication property="principal.puesto" />
                                </span>
                                <h5 class="header-perfil-usuario">
                                    <sec:authentication property="principal.propietario" />
                                </h5>
                            </div>

                        </div>
                    </div>

                    <!--DROPDOWN-->
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-login-info"
                        aria-labelledby="dropdownMenuLogin">
                        <div class="dropdown-menu-header">
                            <input type="hidden" id="tipo1" value="${userStore.numEmpleado}">
                            <c:if
                                test="${userStore.urlFoto != null &&  userStore.urlFoto != '' && userStore.urlFoto != 'string'}">
                                <div class="dropdown-menu-header-inner" style="display: none;" id="content-in-img">
                                    <div class="menu-header-content text-left">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-3">
                                                    <c:if
                                                        test="${userStore.urlFoto != null &&  userStore.urlFoto != '' && userStore.urlFoto != 'string'}">
                                                        <img class="img-despacho-navbar img-user-profile-navbar"
                                                            src="${userStore.urlFoto}" height="40" alt=""
                                                            loading="lazy" />
                                                    </c:if>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">
                                                        <strong>
                                                            <sec:authentication property="principal.usuarioNombre" />
                                                            <sec:authentication
                                                                property="principal.usuarioApellidoPaterno" />
                                                            -
                                                            <sec:authentication property="principal.puesto" />
                                                        </strong>
                                                    </div>
                                                    <div class="widget-subheading opacity-8">
                                                        <sec:authentication property="principal.propietario" />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget-content-icon-size-out" onclick="inOutImg('out')">
                                        <i class="fas fa-expand-alt" title="Expandir foto"></i>
                                    </div>
                                </div>
                                <div class="dropdown-menu-header-inner-img" style="display: block;"
                                    id="content-out-img">
                                    <div class="menu-header-content text-left">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left">
                                                    <c:if
                                                        test="${userStore.urlFoto != null &&  userStore.urlFoto != '' && userStore.urlFoto != 'string'}">
                                                        <img class="img-despacho-navbar img-user-profile-navbar"
                                                            style="cursor: auto;" src="${userStore.urlFoto}" height="40"
                                                            alt="" loading="lazy" />
                                                    </c:if>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget-content-left-text">
                                        <div class="widget-heading">
                                            <strong>
                                                <sec:authentication property="principal.usuarioNombre" />
                                                <sec:authentication property="principal.usuarioApellidoPaterno" />
                                                -
                                                <sec:authentication property="principal.puesto" />
                                            </strong>
                                        </div>
                                        <div class="widget-subheading opacity-8">
                                            <sec:authentication property="principal.propietario" />
                                        </div>
                                        <div class="widget-content-icon-size-in" onclick="inOutImg('in')"
                                            title="Minimizar foto">
                                            <i class="fas fa-compress-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </c:if>
                            <c:if
                                test="${userStore.urlFoto == null ||  userStore.urlFoto == '' || userStore.urlFoto == 'string'}">
                                <div class="dropdown-menu-header-inner">
                                    <div class="menu-header-content text-left">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-3">
                                                    <img class="img-despacho-navbar img-user-profile-navbar"
                                                        src="./resources/img/plantainterna/despacho/tecnicootasignada.png"
                                                        height="40" alt="" loading="lazy" />
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">
                                                        <strong>
                                                            <sec:authentication property="principal.usuarioNombre" />
                                                            <sec:authentication
                                                                property="principal.usuarioApellidoPaterno" />
                                                            -
                                                            <sec:authentication property="principal.puesto" />
                                                        </strong>
                                                    </div>
                                                    <div class="widget-subheading opacity-8">
                                                        <sec:authentication property="principal.propietario" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </c:if>
                        </div>
                        <div class="dropdown-menu-info">
                            <div
                                class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                <div class="vertical-timeline-item vertical-timeline-element">
                                    <div><span class="vertical-timeline-element-icon bounce-in"></span>
                                        <div class="vertical-timeline-element-content bounce-in">
                                            <span class="timeline-title">
                                                <sec:authentication property="principal.geografia" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                <div class="vertical-timeline-item vertical-timeline-element">
                                    <div><span class="vertical-timeline-element-icon bounce-in"></span>
                                        <div class="vertical-timeline-element-content bounce-in">
                                            <span class="timeline-title">
                                                <sec:authentication property="principal.unidadNegocio" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                <div class="vertical-timeline-item vertical-timeline-element">
                                    <div><span class="vertical-timeline-element-icon bounce-in"></span>
                                        <div class="vertical-timeline-element-content bounce-in">
                                            <span class="timeline-title">
                                                <sec:authentication property="principal.numEmpleado" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                <div class="vertical-timeline-item vertical-timeline-element">
                                    <div><span class="vertical-timeline-element-icon bounce-in"></span>
                                        <div class="vertical-timeline-element-content bounce-in">
                                            <span class="timeline-title">
                                                <sec:authentication property="principal.correo" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                <div class="vertical-timeline-item vertical-timeline-element">
                                    <div><span class="vertical-timeline-element-icon bounce-in"></span>
                                        <div class="vertical-timeline-element-content bounce-in">
                                            <span class="timeline-title">
                                                <sec:authentication property="principal.celular" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
<!--                         <div class="dropdown-menu-opciones"> -->
<!--                         	<div class="col-8" style="padding-left: 0.7em;"> -->
<!-- 		                        <li class="nav-item dropdown form-control form-control-sm input-cambio-estatus-usuario" id="opcCambioEstatus"> -->
<!-- 		                            <a class="nav-link dropdown-toggle" href="#" id="" role="button" -->
<!-- 		                                data-mdb-toggle="dropdown" aria-expanded="false"> -->
<!-- 		                                <i class="fas fa-circle" style="color: #0cd040;"></i> -->
<!-- 		                                Activo -->
<!-- 		                            </a> -->
<!-- 		                            Dropdown menu -->
<!-- 		                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown"> -->
<!-- 		                                <li id="listaEstatusUsuarios"> -->
<!-- 		                                </li> -->
<!-- 		                            </ul> -->
<!-- 		                        </li> -->
<!-- 		                    </div> -->
<!--                         </div> -->
                        
                        <div class="col-md-12 contenedor-lista-estados-usuarios" ng-if="verCambioEstatusUsuario">
		                    <div class="dropdown">
		                    	<li class="nav-item dropdown form-control form-control-sm input-cambio-estatus-usuario" id="opcCambioEstatus">
			                        <a class="nav-link dropdown-toggle" href="#" id="" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
			                        	<i class="fas fa-circle" style="color: #0cd040;"></i>
	 		                                Activo
			                        </a>
									<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
										<li id="listaEstatusUsuarios">
			                            </li>
									</ul>
								</li>
		                    </div>
		                </div> 
                        
                        <div class="dropdown-menu-opciones">
                            <ul class="nav flex-column">
                                <li class="nav-item" data-mdb-toggle="modal"
                                    data-mdb-target="#modalCambiaContraseniaLogin">
                                    Cambiar contrase&ntilde;a</li>
                            </ul>
                        </div>
                        <div class="dropdown-divider"></div>
                        <div class="content-logout">
                            <a href="javascript:document.getElementById('logout').submit()"
                                class="btn btn-primary button-salir">
                                Cerrar sesi&oacute;n
                            </a>
                        </div>
                    </div>
                </div>
                <div class="content-header content-header-border"></div> 
                <div class="content-header ">
                    <a href="javascript:document.getElementById('logout').submit()"
                        class="btn btn-primary button-salir">
                        <i class="fas fa-sign-out-alt"></i>
                    </a>
                    <c:url value="/logout" var="logoutUrl" />
                    <form id="logout" action="${logoutUrl}" method="S">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />

                    </form>
                </div>
            </div>
        </div>
        <input type="hidden" id="prop-session" value="${userStore.idPuesto}_${userStore.idUsuario}"/>
    </nav>
</header>