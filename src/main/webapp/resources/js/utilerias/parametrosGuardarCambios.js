function parametrosGuardarCambios (){
	parametro = {
		fapa_ID: 			urlGet("idParametro"),
		fapa_COMENTARIO: 	inputGetValue("fapa_comentario"),
		fapa_NUMERO: 		inputGetValue("fapa_numero"),
		fapa_VALOR_01: 		btoa(inputGetValue("fapa_valor01")),
		fapa_VALOR_02: 		btoa(inputGetValue("fapa_valor02")),
		fapa_VALOR_03: 		btoa(inputGetValue("fapa_valor03"))
	};
	parametro = JSON.stringify(parametro).toString().replaceAll("\"","'");;
	
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'PARAMETROS_PATCH', 'datosPost':"+parametro+", 'datosGET':'"+urlGet("idParametro")+"'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var respuesta = this.responseText;
			
			window.location.href="parametrosAsignacion?action=editar&idParametro="+respuesta;
		}
	}
}