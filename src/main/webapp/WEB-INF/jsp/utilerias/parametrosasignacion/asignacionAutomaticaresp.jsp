<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
   
    </head>
    <body id="idBody" >        

        <h5>Asignaci&oacute;n parametros</h5>
    </body>
  
	<script>
		var xhttp = new XMLHttpRequest();
		var body = document.getElementById("rest_form");
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var respuesta = JSON.parse(this.responseText);
				
				var form = document.getElementById("form");
				var select = document.getElementById("selector_modulo");
				var br = document.createElement("br");
	
				form.setAttribute("action","ParametrosPorModulo");
				form.setAttribute("method","GET");
				
				console.log(respuesta);
			
				for (x of respuesta) {
					var option = document.createElement("option");
					option.setAttribute("value",x.fapa_MODULO);
					var optionText= document.createTextNode(x.fapa_MODULO);
					
					option.appendChild(optionText);
					select.appendChild(option);
				}
				
				form.appendChild(select);
			}
			else{
				console.log("estatus "+this.status);
			}
		};
		
		// Endpoint de la API y método que se va a usar para llamar
		
		data = {
					url: 		"http://localhost:8201/admin/parametros/modulos",
					data:		"",
					method: 	"get",
					token: 		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZE9yaWdlbiI6bnVsbCwidXNlcl9uYW1lIjoiRkZNQkFDSyIsImlkVXN1YXJpbyI6MiwiaWRQdWVzdG8iOjcsImlkR2VvZ3JhZmlhIjoxLCJpZFByb3BpZXRhcmlvIjoxLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiaWF0IjoxNjM2NDE0ODM5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiLCJBRE1JTiJdLCJpZFVuaWRhZE5lZ29jaW8iOjF9.9bWpN9m6TZRf1WPfJqJpW449oLyk1BZokpYDYUUe0NcgY04m22uYGGoiC6gCAaVUbJHhV1lx4qxrsQP4IDm94Q"
				};
		
		
		xhttp.open("POST", "http://localhost:8202/admin/consume/", true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(JSON.stringify(data));
		
		console.log(xhttp);
	</script>
</html>


