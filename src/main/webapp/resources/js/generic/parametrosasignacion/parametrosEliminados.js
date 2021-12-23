/* ===================================================================================================== */
/* Este script se encarga de administrar procesos para eliminar parametros  */ 

function parametroEliminados (){
	
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'PARAMETROS_INACTIVOS_GET', 'datosGET':''}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var tableRest	= document.getElementById("rest_table");
	var tabla 		= crearTable("tableParametros");
	
	var tbody 		= crearTableBody();
	var thead 		= crearThead( thArray=["ID","Modulo","Numero","Comentario","Valor 01","Valor 02","Valor 03",""], "th" );
	thead.setAttribute("id","thead_reporteOrdenes");
	tabla.appendChild(thead);
	tabla.setAttribute("id","tablaParametros");
	swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
	swal.showLoading();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse( this.responseText );
			
			for ( x of respuesta ) {
				var form 				= crearForm("","GET");
				
				form.appendChild( crearHiddenInput ("action","habilitar") );
				form.appendChild( crearHiddenInput ("idParametro",x.fapa_ID,"") );
				form.appendChild( crearButton ("Habilitar","Editar","btn btn-primary") );
				
				var trCiclo	= crearTrForm( thArray=[x.fapa_FECHA_ACTUALIZACION,x.fapa_MODULO,x.fapa_NUMERO,x.fapa_COMENTARIO,x.fapa_VALOR_01,x.fapa_VALOR_02,x.fapa_VALOR_03, form], "td" );
				
				tbody.appendChild(trCiclo);
				
				
			}
			
			swal.close();
		}
	}
		
	tabla.appendChild(tbody);
	tableRest.appendChild(tabla);
}

function eliminadosIr(){
	window.location.href='parametrosAsignacion?action=eliminados';
}