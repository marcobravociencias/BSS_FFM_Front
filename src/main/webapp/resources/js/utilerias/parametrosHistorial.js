/* ===================================================================================================== */
/* Este script se encarga de consumir un servicio rest y Crear una tabla con el historial de versiones del parametro */

function verHistorial ( idParametro, fapaNumero ){
	removerElemento("formParametros");
	var idParametro = inputGetValue ("idParametro");
	var idParametro = inputGetValue ("fapaNumero");
	
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{\"key\":\"PARAMETROS_DETALLES_GET\", \"datosGET\":\"#{id}\"}".replace("#{id}",idParametro);;
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
}
