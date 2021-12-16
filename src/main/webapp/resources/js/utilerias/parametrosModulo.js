/* ===================================================================================================== */
/* Este script se encarga de consumir un servicio rest y dibujar un control para filtrar los parametos por modulo 	 */

function parametroCargarModulos (){
	/* 
	 * Esta funcion se encarga de consumir una api rest y construir un control select con una lista de modulos
	 */
	 
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'PARAMETROS_MODULOS_GET'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var div 	= document.getElementById("div_selector");
	var selector= document.getElementById("modulo_control");
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse( this.responseText );
			
			for ( x of respuesta ) {
				var option = document.createElement("option");
				option.setAttribute("value",x.fapa_MODULO);
				var optionText= document.createTextNode(x.fapa_MODULO);
				
				option.appendChild(optionText);
				selector.appendChild(option);
			}
			div.appendChild(selector);
		}
	}
}


document.getElementById("modulo_control").onchange = redirec;
function redirec (  ){
	/* 
	 * Esta funcion se encarga de redireccionar la pagina cuando el selector cambia de estado
	 */
	 
	console.log("Redireccionar ...");
	
	var value = document.getElementById("modulo_control").value;
	var url = "parametrosAsignacion?action=filtrar&modulo=";
	url = url.concat(value);
	
	window.location = url;
}