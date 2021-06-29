<%@ page contentType="text/html;charset=windows-1252"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>FFM Total play</title>
</head>
<body>
    <div class="container-fluid">
        <div class="COL-MD-6">
              <table class="table table-responsive cont" border="0">
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
                  <tr><th class="st">request.getHeader("x-forwarded-for"):</td><td  align="left"><%=(request.getHeader("x-forwarded-for")!=null)?request.getHeader("x-forwarded-for"):""%>
                  <tr><td colspan="2" align="center"><a href="descargaLogFile/ffmlog.log">    FFM_web.log</a></td></tr>
              </table>
        </div>
    </div>
</body>
<script src="${pageContext.request.contextPath}/js/jquery/jquery.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/bootstrap/js/tether.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/bootstrap/media/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/bootstrap/media/js/dataTables.bootstrap4.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/bootstrap/alertify/alertify.js" type="text/javascript" ></script>
<script src="${pageContext.request.contextPath}/js/help/help.js" type="text/javascript"></script>
</html>


