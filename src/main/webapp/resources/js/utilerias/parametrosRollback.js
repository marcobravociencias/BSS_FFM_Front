function parametrosRollback (){
	swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
	swal.showLoading();
	
	var idParametroAntiguo 	= urlGet("idParametroAntiguo");	
	var idParametroNuevo 	= urlGet("idParametroNuevo");
	var datosGet	= idParametroNuevo+"/"+idParametroAntiguo;
	
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'PARAMETROS_ROLLBACK_GET', 'datosGET':'"+datosGet+"'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var respuesta = JSON.parse(this.responseText);
			echo(respuesta);
			
			swal.close();
			

			if ( respuesta == -1 ){
				window.location.href="parametrosAsignacion?action=editar&idParametro="+idParametroAntiguo;
			}
			else{
				window.location.href="parametrosAsignacion?action=editar&idParametro="+respuesta;
			}
			
		}
	}
	
}