<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.mx.totalplay.ffm.cloudweb.utilerias.utils.*" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
      
        <link rel="icon" type="image/png" sizes="192x192"  href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">

        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/css/login/login.css"  rel="stylesheet" >
    </head>
	<body>
	
		<form  id="formulario-container"  class="login-form login style-form-login" autocomplete="off"  name='login' action="<c:url value='/loginPage' />" method='POST'>	

			<fieldset>
				<div class="content-fluid" id="content-login">
				    <div class="col-12 row style-col-row">
						<div class="col-6 container-texto-login">
							<div class="col-6 offset-3 content-info-login">
								<form id="form-in-te" class="form" name='login' action="<c:url value='/loginPage'  />" method='POST'>	
									<div class="form-outline mb-4">				
										<label class="label-form-login form-check-label " for="form2Example3">Usuario: </label>
										<input placeholder="Ingresa tu usuario:" type='text' class="input-form-login " name='username' id="user_user" value=''>
									</div>
									<div class="form-outline mb-4">
										<label class="label-form-login form-check-label" for="form2Example3">Contrase&ntilde;a </label>	
										<input placeholder="Ingresa tu contrase&ntilde;a" type='password' class="input-form-login " id="user_pswd" name='password' />			
									</div>						
									<button id="ingresar-btn-login" class="btn btn-primary btn-block mb-4" name="submit" type="submit" value="submit" >Ingresar</button>
									<input class="btn btn-primary btn-block mb-4" type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								</form>
								<c:if test="${not empty error}">
									<div class="alert alert-danger mensaje-alert" role="alert" data-mdb-color="danger">
										${error}
									</div>	
								</c:if>
								
								numero de visitas: ${ConstSystem.ocurrencia}
								
								<c:if test="${not empty message}">
									<div class="alert alert-success mensaje-alert" role="alert" data-mdb-color="success">
										${message}
									</div>
								</c:if>	
							</div>
							<br>
                        <c:set var="today" value="<%=new java.util.Date()%>" />
							<table class="" border="0" style="font-size:small">
				  <tr><th class="st">fecha:</th><td align="left"> <fmt:formatDate type="both" dateStyle="long" timeStyle="long" value="${today}" /> </td></tr>
                  <tr><th class="st">Java Version:</th><td align="left"><%= System.getProperty("java.version")%></td></tr>
                  <tr><th class="st">Java Home:</th><td align="left"><%= System.getProperty("java.home")%></td></tr>
                  <tr><th class="st">java.vendor:</th><td align="left"><%= System.getProperty("java.vendor")%></td></tr>
                  <tr><th class="st">java.vendor.url:</th><td align="left"><%= System.getProperty("java.vendor.url")%></td></tr>
                  <tr><th class="st">os.arch:</th><td align="left"><%= System.getProperty("os.arch")%></td></tr>
                  <tr><th class="st">os.name:</th><td align="left"><%= System.getProperty("os.name")%></td></tr>
                  <tr><th class="st">os.version:</th><td align="left"><%= System.getProperty("os.version")%></td></tr>
                  <tr><th class="st">user.dir:</th><td align="left"><%= System.getProperty("user.dir")%></td></tr>
                  <tr><th class="st">user.home:</th><td align="left"><%= System.getProperty("user.home")%></td></tr>
                  <tr><th class="st">user.name:</th><td align="left"><%= System.getProperty("user.name")%></td></tr>
                  <tr><th class="st">request.getRemoteAddr():</th><td align="left"><%=request.getRemoteAddr()%></td></tr>
                  <tr><th class="st">request.getRemoteHost():</th><td  align="left"><%=request.getRemoteHost()%>
                  <tr><th class="st">request.getContextPath():</th><td  align="left">${pageContext.servletContext.contextPath}
                  <tr><th class="st">request.getLocalAddr():</th><td  align="left"><%=request.getLocalAddr()%>
                  <tr><th class="st">request.getLocalName():</th><td  align="left"><%=request.getLocalName()%>
                  <tr><th class="st">request.getLocalPort():</th><td  align="left"><%=request.getLocalPort()%>
                  <tr><th class="st">request.getServletPath():</th><td  align="left"><%=request.getServletPath()%>
				  <tr><th class="st">Server Version:</th><td  align="left"><%=application.getServerInfo()%>
				  <tr><th class="st">Servlet Version:</th><td  align="left"><%= application.getMajorVersion() %>
				  <tr><th class="st"> JSP Version: </th><td  align="left"><%= JspFactory.getDefaultFactory().getEngineInfo().getSpecificationVersion() %>
				  	  <tr><th class="st"> JSP Version: </th><td  align="left"><%= JspFactory.getDefaultFactory().getEngineInfo() %>
                  <tr><th class="st">request.getHeader("x-forwarded-for"):</td><td  align="left"><%=(request.getHeader("x-forwarded-for")!=null)?request.getHeader("x-forwarded-for"):""%>
              </table>
			  ${SystemInfo.info}
						</div>
	
	        
					    
					    <div class="col-6 container-imagen-login">
						
					    	<img src="${pageContext.request.contextPath}/resources/img/login/logoLogin.png" class="logo-login"><br>
					    	<h6 class="texto_field_">Field Force Management</h6><br>
					    	<span class="texto_powered">Powered by<span class="style_texto_tp">&nbspTotalplay</span></span>
					    </div>
				    </div>
				</div>
			</fieldset>  
			<input type="hidden" class="pass"  id="colbandera"  name="colbandera"/>

		</form>



		<a style="display: none;" rel="nofollow" id="enlace" href="#" class="automatic">Enlace</a>

		<div class="cargando-container">
			<div class="lds-ring" aria-role="none">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</body>

	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-2.2.4.js" ></script>    
	<script>
		document.getElementById("user_user").value = "FFMBACK";
		document.getElementById("user_pswd").value = "accesoFFM";
		$(document).ready(function(){
			$("#ingresar-btn-login").click(function(){
				//$(this).attr('disabled','disabled')
				$(this).text('Ingresando ...')				
			})
		})
	</script>
	
</html>