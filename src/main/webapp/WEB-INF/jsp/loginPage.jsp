<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.dsfc.cloud.web.utilerias.utils.*" %>
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
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/css/plantainterna/generic/navbar.css?v=${sessionScope.versionDepl}"rel="stylesheet" />

    </head>
	<body>
	
		<form  id="formulario-container"  class="login-form login style-form-login" autocomplete="off"  name='login' action="<c:url value='/loginPage' />" method='POST'>	
			<fieldset>
				<div class="content-fluid" id="content-login">
				    <div class="col-12 row style-col-row">
						<div class="col-6 container-texto-login">
							<div class="content-info-login">
								<form id="form-in-te" class="form form-login-access" name='login' action="<c:url value='/loginPage'  />" method='POST'>	
									<img class="login-top-form" src="${pageContext.request.contextPath}/resources/img/navbar/SVGDespacho.svg" alt=""/>

									<div class="form-outline mb-4">				
										<label class="label-form-login form-check-label " for="form2Example3">Nombre </label>
										<input type='text' class="input-form-login " name='username' id="user_user" value=''>
									</div>
									<div class="form-outline mb-4">
										<label class="label-form-login form-check-label" for="form2Example3">Contrase&ntilde;a </label>	
										<input  type='password' class="input-form-login " id="user_pswd" name='password' />			
									</div>						
									<button id="ingresar-btn-login" class="btn btn-primary btn-block mb-4" name="submit" type="submit" value="submit" >Iniciar sesi&oacute;n</button>
									<input class="btn btn-primary btn-block mb-4" type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />

									<!--div class="form-outline content-recordarme">
										<input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"  />
										<label class="form-check-label label-recordarme" for="inlineCheckbox3">Recordarme</label>
									</div>
									<div class="divider-login"></div>
									<div class="form-outline content-text-contraolvidada ">
										<label class="label-olvidastecontra" for="inlineCheckbox3">&iquest;Olvidaste la contrase&ntilde;a?</label>
									</div-->
								</form>						
								<c:if test="${not empty error}">
									<div class="alert alert-danger mensaje-alert" role="alert" data-mdb-color="danger">
										${error}
									</div>	
								</c:if>
								
								
								<c:if test="${not empty message}">
									<div class="alert alert-success mensaje-alert" role="alert" data-mdb-color="success">
										${message}
									</div>
								</c:if>	
								<div class="alert alert-danger mensaje-alert" id="validateLogin" role="alert" data-mdb-color="danger" style="display: none;">
									Los campos usuario y contrase&ntilde;a son obligatorios
								</div>

							</div>
							
						</div>
		        					    
					    <div class="col-6 container-imagen-login">
							<img src="${pageContext.request.contextPath}/resources/img/login/logoDramleyAnimacion796-x-796.gif" class="img-background-dramley" alt="">
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
			$("#ingresar-btn-login").click(function(){
				//$(this).attr('disabled','disabled')
				if($("#user_user").val() == '' || $("#user_user").val() == undefined || $("#user_pswd").val() == '' || $("#user_pswd").val() == undefined){
					$("#validateLogin").css("display","block");
					return false;
				}else{
					$("#validateLogin").css("display","none");
					$(this).text('Ingresando ...')
					return true;
				}							
			})
		
	</script>
	
</html>