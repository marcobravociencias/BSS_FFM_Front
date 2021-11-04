<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.mx.totalplay.ffm.cloudweb.utilerias.utils.*" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>FFM Total play</title>
</head>
<body>
    <div class="container-fluid">
        <div class="COL-MD-6">
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
                  <tr><td colspan="2" align="center"><a href="${pageContext.request.contextPath}/descargaLogFile/ffmlog.log">    FFM_web.log</a></td></tr>
              
              </table>
              numero de visitas: ${ConstSystem.ocurrencia}             
			  ${SystemInfo.info}
        </div>
    </div>
</body>
<script src="${pageContext.request.contextPath}/resources/js/jquery/jquery.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/bootstrap/js/tether.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/bootstrap/media/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/bootstrap/media/js/dataTables.bootstrap4.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/bootstrap/alertify/alertify.js" type="text/javascript" ></script>
<script src="${pageContext.request.contextPath}/resources/js/help/help.js" type="text/javascript"></script>
</html>


