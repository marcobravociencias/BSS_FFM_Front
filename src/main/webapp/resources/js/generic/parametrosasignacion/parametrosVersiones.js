

function parametroCargarVersiones (){
	var idParametro = urlGet("idParametro");
	var fapaNumero 	= urlGet("fapaNumero");
	var datosGet	= idParametro+"/"+fapaNumero;
	
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'PARAMETROS_VERSIONES_GET', 'datosGET':'"+datosGet+"'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var tableRest	= document.getElementById("rest_table");
	var tabla 		= crearTable("tableParametros");
	
	var tbody 		= crearTableBody();
	var thead 		= crearThead( thArray=["Modulo","Numero","Comentario","Valor 01","Valor 02","Valor 03",""], "th" );
	thead.setAttribute("id","thead_reporteOrdenes");
	tabla.appendChild(thead);
	tabla.setAttribute("id","tablaParametros");
	swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
	swal.showLoading();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse( this.responseText );
			var contador = 1;
			
			for ( x of respuesta ) {
				var form 				= crearForm("","GET");
				
				form.appendChild( crearHiddenInput ("action","rollback") );
				form.appendChild( crearHiddenInput ("idParametroAntiguo",urlGet("idParametro"),"") );
				form.appendChild( crearHiddenInput ("idParametroNuevo",x.fapa_ID,"") );
				
				if ( contador > 1 ){
					var button				= crearButton ("Rollback","Editar","btn btn-primary");
					form.appendChild(button);
				}
				else{
					form.appendChild(crearLabel("Activo"));
				}
				
				var trCiclo	= crearTrForm( thArray=[x.fapa_MODULO,x.fapa_NUMERO,x.fapa_COMENTARIO,x.fapa_VALOR_01,x.fapa_VALOR_02,x.fapa_VALOR_03, form], "td" );
				
				tbody.appendChild(trCiclo);
				
				contador ++;
			}
			
			swal.close();
		}
	}
		
	tabla.appendChild(tbody);
	tableRest.appendChild(tabla);
}