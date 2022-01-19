
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<sec:authentication property="principal" var="userStore"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
<link href="${pageContext.request.contextPath}/resources/css/plantainterna/generic/navbar.css"  rel="stylesheet"/>
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
<jsp:include page="./modalFotoDespacho.jsp"></jsp:include>   
<jsp:include page="./modalCambiaContrasenia.jsp"></jsp:include>   

<header class="header-navbar-p">           
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-menu-generic">
        <div class="container-fluid container-fludi-navbar">
            
            <div class="collapse navbar-collapse container-menus-hader justify-content-center" id="navbarTogglerDemo02">
                <div class="content-image">
                    <c:if test="${userStore.configuraciones['KEY_BANER'] != null &&  userStore.configuraciones['KEY_BANER'] != ''}">
                        <img class="image-totalplayheader" src="${pageContext.request.contextPath}/resources/img/navbar/${userStore.configuraciones['KEY_BANER']}" height="27" alt="" loading="lazy" />  
                    </c:if>
                    <c:if test="${userStore.configuraciones['KEY_BANER'] == null ||  userStore.configuraciones['KEY_BANER'] == ''}">
                        <img  class="image-totalplayheader" src="${pageContext.request.contextPath}/resources/img/logotipos/residencial.png" height="27" alt="" loading="lazy" />
                    </c:if>
                </div>             
                <ul class="ul-elementos-nav navbar-nav me-auto mb-2 mb-lg-0">                        
                    <c:forEach var="permi" items="${userStore.modulos}">
                        <c:if test="${permi.dentroNavbar}">
                            <li id="${permi.clave}" class="nav-item ">
                                <i class="${permi.icono} icon-navbar-izquierda"></i>
                                <a class="nav-link a-navlink-navbar"  href="${permi.clave}">${permi.descripcion}</a>
                            </li>   
                        </c:if>   
                    </c:forEach>
                    <c:if test="${userStore.banderaPintarOtros}">
                        <li id="nav-bar-otros-options" class="nav-item dropdown">
                            <a  class="nav-link dropdown-toggle"  href="#" id="otros-option-navbar" role="button" data-mdb-toggle="dropdown" aria-expanded="false" >
                                Otros 
                            </a>
                            <!-- Dropdown menu -->
                            <ul class="dropdown-menu"   aria-labelledby="navbarDropdown">
                                <c:forEach var="permi" items="${userStore.modulos}">
                                    <c:if test="${!permi.dentroNavbar}">
                                        <li id="${permi.clave}">
                                            <a class="dropdown-item" href="${permi.clave}">
                                                <i class="${permi.icono} icon-navbar-izquierda icon-otros-dropdown"></i>
                                                ${permi.descripcion}</a>
                                        </li>
                                    </c:if>  
                                </c:forEach>
                                <li id="cambiaContrasenia" data-mdb-toggle="modal"
                                data-mdb-target="#modalCambiaContraseniaLogin">
                                    <a class="dropdown-item">
                                        <i class="fas fa-key icon-navbar-izquierda icon-otros-dropdown"></i>
                                        Cambiar contrase&ntilde;a</a>
                                </li>
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

                <div class="content-header">
                    <div class="icon-wrapper icon-wrapper-alt-notifi rounded-circle back-groud-notifi">
                        <div class="icon-wrapper-bg bg-focus"></div>
                        <i class="fas fa-bell  icon-notificaciones-header-text"></i>    
                        <div class="badge badge-dot badge-dot-sm badge-danger"></div>              
                    </div>
                </div>
                <div class="content-header">                     
                    <div class="icon-wrapper icon-wrapper-alt-pais rounded-circle">
                        <div class="icon-wrapper-bg bg-focus"></div>                
                        <c:choose>
                            <c:when test="${fn:contains(userStore.propietario, 'MEXICO')}">
                                <img  class="img-despacho-pais language-icon flag flag-icon-background flag-icon-d" src="${pageContext.request.contextPath}/resources/img/navbar/mexico.png" loading="lazy" />                                
                            </c:when>
                            <c:otherwise>
                                <img  class="img-despacho-pais language-icon flag flag-icon-background flag-icon-d" src="${pageContext.request.contextPath}/resources/img/navbar/colombia.png" loading="lazy" />                                
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
                <div class="content-header content-header-border">
                    <c:if test="${userStore.urlFoto != null &&  userStore.urlFoto != '' && userStore.urlFoto != 'string'}">
                        <div class="icon-wrapper icon-wrapper-alt-user rounded-circle">
                            <img  data-mdb-toggle="modal"  data-mdb-target="#modalFotoDespacho" class="img-despacho-navbar img-user-profile-navbar" src="${userStore.urlFoto}" height="37" alt="" loading="lazy" />      
                            <div class="badge badge-dot badge-dot-sm badge-success"></div>              
                        </div>
                    </c:if>
                    <c:if test="${userStore.urlFoto == null ||  userStore.urlFoto == '' || userStore.urlFoto == 'string'}">
                       <div class="icon-wrapper icon-wrapper-alt-user rounded-circle back-groud-user">
                            <div class="icon-wrapper-bg bg-focus"></div>
                            <i class="fas fa-user-alt icon-notificaciones-header-text-user"></i>
                            <div class="badge badge-dot badge-dot-sm badge-success"></div>              
                        </div>
                    </c:if>               
                </div>
                <div class="content-header ">
                    <h5 class="header-nombre-usuario">
                        <sec:authentication property="principal.usuarioNombre" />
                        <sec:authentication property="principal.usuarioApellidoPaterno" />                    
                         - 
                        <sec:authentication property="principal.puesto" />
                    </h5>
                    <h5 class="header-perfil-usuario">  
                        <sec:authentication property="principal.propietario" />
                    </h5>
                </div>
                <div class="content-header content-header-border">
                    <a href="javascript:document.getElementById('logout').submit()" class="btn btn-primary button-salir">
                        <i class="fas fa-sign-out-alt"></i>
                    </a>
                    <c:url value="/logout" var="logoutUrl" />
                    <form id="logout" action="${logoutUrl}" method="S" >
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                    </form>
                </div>
            </div>
        </div>
    </nav>
</header>