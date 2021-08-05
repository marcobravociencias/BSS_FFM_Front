
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<sec:authentication property="principal" var="userStore"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
<link href="${pageContext.request.contextPath}/resources/css/plantainterna/generic/navbar.css"  rel="stylesheet"/>
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
<jsp:include page="./modalFotoDespacho.jsp"></jsp:include>   

<header class="header-navbar-p">
    <div class="row container-fluid container-top-header">
        <div class="col-6">
            <img  src="${pageContext.request.contextPath}/resources/img/logotipos/residencial.png" height="27" alt="" loading="lazy" />        
        </div>
        <div class="col-6 d-flex justify-content-end">
            <div class="content-header">
                <c:url value="/logout" var="logoutUrl" />
                <form id="logout" action="${logoutUrl}" method="S" >
                  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                </form>
                <a class="logout-text-nav" href="javascript:document.getElementById('logout').submit()">Salir</a>
            </div>    
            <div class="content-header">
                <c:if test="${userStore.urlFoto != null &&  userStore.urlFoto != ''}">
                    <img  data-mdb-toggle="modal"
                          data-mdb-target="#modalFotoDespacho" class="img-despacho-navbar" src="${userStore.urlFoto}" height="37" alt="" loading="lazy" />        
                </c:if>
                <c:if test="${userStore.urlFoto == null ||  userStore.urlFoto == ''}">
                    <img  src="${pageContext.request.contextPath}/resources/img/iconsistema/usuario-header.png"    height="37" alt="" loading="lazy" />        
                </c:if>
               
            </div>
            
            <div class="content-header">
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
            
        </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-menu-generic">
        <div class="container-fluid container-fludi-navbar">
            <div class="collapse navbar-collapse container-menus-hader justify-content-center" id="navbarTogglerDemo02">
                <ul class="ul-elementos-nav navbar-nav me-auto mb-2 mb-lg-0">                   
                    <li id="li-despacho-navbar" class="nav-item ">
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
                    </li>
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
         
            </div>
        </div>
    </nav>
</header>