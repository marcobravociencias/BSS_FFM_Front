function parametrosActivar (){
	var idParametro 	= urlGet("idParametro");
	var urlServicio 	= "req/parametrosAsignacion/consume/";
	var metodoServicio 	= "POST";
	var data 			= "{'key':'PARAMETROS_ACTIVAR_GET', 'datosGET':'"+idParametro+"'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	swal({ html: '<strong>Procesando solicitud...</strong>', allowOutsideClick: false });
	swal.showLoading();
	
	xhttp.onreadystatechange = function() {
		
		if (this.status == 200 ) {
			setTimeout(function(){
				swal.close();
				window.location.href="parametrosAsignacion?action=editar&idParametro="+idParametro;
			},1500);
			
		}
	}
}