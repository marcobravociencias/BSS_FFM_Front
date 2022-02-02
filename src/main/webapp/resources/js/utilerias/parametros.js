/* ===================================================================================================== */
/* Este script se encarga de consumir un servicio rest y dibujar una tabla con los parametros de AA 	 */


function parametrosPantallInicial (){
	/* 
	 * Esta funcion se encarga de consumir una api rest y construir una tabla con los datos recibidos en la respuesta
	 * 
	 */
	 
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'PARAMETROS_GET'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var tableRest	= document.getElementById("rest_table");
	var tabla 		= crearTable("tableParametros");

	var tbody 		= crearTableBody();
	var thead 		= crearThead( thArray=["Modulo","Numero","Comentario",""], "th" );
	thead.setAttribute("id","thead_reporteOrdenes");
	tabla.appendChild(thead);
	tabla.setAttribute("id","tablaParametros");
	swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
	swal.showLoading();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse( this.responseText );
			
			if ( respuesta.length>0 ){
				for ( x of respuesta ) {
					var form 					= crearForm("","GET");
					var action					= crearHiddenInput ("action","editar");
					var inputParametroActual	= crearHiddenInput ("idParametro",x.fapa_ID,"");
					var button					= crearButton ("Editar","Editar","btn btn-primary");
						
					form.appendChild(action);
					form.appendChild(inputParametroActual);
					form.appendChild(button);
					
					var trCiclo	= crearTrForm( thArray=[x.fapa_MODULO,x.fapa_NUMERO,x.fapa_COMENTARIO,form], "td" );
					
					tbody.appendChild(trCiclo);
				}
			}
			
			swal.close();
		}
		
		
	}
		
	tabla.appendChild(tbody);
	tableRest.appendChild(tabla);
}