
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
<link href="${pageContext.request.contextPath}/resources/css/plantainterna/generic/navbar.css"  rel="stylesheet"/>
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>

<header class="header-navbar-p">
    <!-- Image and text -->
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
                <img  src="${pageContext.request.contextPath}/resources/img/iconsistema/usuario-header.png" height="37" alt="" loading="lazy" />        
            </div>
      
            <div class="content-header">
                <h5 class="header-nombre-usuario">Hector Santamaria - Analista despacho</h5>
                <h5 class="header-perfil-usuario">Planta Interna Bogota Colombia</h5>
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
                    
                    <!-- <li id="li-gestionusuarios-navbar" class="nav-item">
                        <i class="far fa-file icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar" href="usuariosplantainterna">Gesti&oacute;n de usuario</a>
                    </li> -->
                    <li id="li-consultaot-navbar" class="nav-item">
                        <i class="far fa-folder-open icon-navbar-izquierda"></i>
                        <a class="nav-link a-navlink-navbar" href="consultaOT">Consulta ot</a>
                    </li>
                    <li class="nav-item dropdown">
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
                        </li>
                </ul>
         
            </div>
        </div>
    </nav>
</header>