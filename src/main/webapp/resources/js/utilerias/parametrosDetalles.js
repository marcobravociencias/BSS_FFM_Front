/* ===================================================================================================== */
/* Este script se encarga de consumir un servicio rest y dibujar un formulario con los datos de un parametros */ 

function verParametrosDetalles (){
	/*
	 * Esta funcion se encarga de consumir una api rest y construir un formulario con los datos recibidos en la respuesta
	 * 
	 */
	
	// removerElemento("tableParametros");
	var idParametro 	= urlGet("idParametro");
	var urlServicio 	= "req/parametrosAsignacion/consume/";
	var metodoServicio 	= "POST";
	var data 			= "{'key':'PARAMETROS_DATA_GET', 'datosGET':'"+idParametro+"'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var div				= document.getElementById("rest_table");
	var url				= "";
	var metodo			= "GET";
	var form 			= crearForm (url,metodo,"formParametros");
	var divContenedor	= document.createElement("div");
	divContenedor.setAttribute("id","div_detalles");
	
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse(this.responseText);
				
			for ( x of respuesta ) {
				var fapaNumero		= crearDivGroupInput ("Numero",		x.fapa_NUMERO,				"fapa_numero");		
				var fapaComentario	= crearDivGroupInput ("Comentario",	x.fapa_COMENTARIO,			"fapa_comentario");	
				var fapaFecha		= crearDivGroupInput ("Fecha",		x.fapa_FECHA_ACTUALIZACION,	"fapa_FECHA_ACTUALIZACION");
				var fapaValor01		= crearDivGroupTextArea ("Valor 01",	x.fapa_VALOR_01,			"fapa_valor01");
				var fapaValor02		= crearDivGroupTextArea ("Valor 02",	x.fapa_VALOR_02,			"fapa_valor02");
				var fapaValor03		= crearDivGroupTextArea ("Valor 03",	x.fapa_VALOR_03,			"fapa_valor03");
				
				divContenedor.appendChild(fapaNumero);
				divContenedor.appendChild(fapaComentario);
				divContenedor.appendChild(fapaFecha);
				divContenedor.appendChild(fapaValor01);
				divContenedor.appendChild(fapaValor02);
				divContenedor.appendChild(fapaValor03);
				
				setTitulo("Editar: "+x.fapa_COMENTARIO);
				
				var guardar 	= crearButton("Guardar Cambios","guardar","btn btn-primary");	
				var regresar 	= crearButton("Regresar","regresar","btn btn-primary");
				var rollback 	= crearButton("Hacer Rollback","rollback","btn btn-warning");
				var eliminar 	= crearButton("Eliminar","eliminar","btn btn-danger");	
				
				guardar.setAttribute("onclick","guardar();");
				regresar.setAttribute("onclick","regresar();");
				rollback.setAttribute("onclick","rollback();");
				eliminar.setAttribute("onclick","eliminar();");
				
				divContenedor.appendChild(guardar);
				divContenedor.appendChild(regresar);
				divContenedor.appendChild(rollback);
				divContenedor.appendChild(eliminar);
			}
		}
	}
	
	div.appendChild(divContenedor);	
}


function regresar(){
	/* Esta funcion se encarga de eliminar el formulario creado en verParametrosDetalles() y carga los elementos iniciales */
	
	echo("Regresar");
	window.location.href='parametrosAsignacion';
	
}

function guardar (){
	echo("Guardar");	
	
	parametrosGuardarCambios ();
}

function rollback (){
	echo("Rollback");	
	var action = 'action=versiones&';
	var idParametro = 'idParametro='+urlGet("idParametro")+'&';
	var fapaNumero = 'fapaNumero='+inputGetValue("fapa_numero");
	
	window.location.href='parametrosAsignacion?'+action+idParametro+fapaNumero;
}

function eliminar (){
	echo("Eliminar");
	
	parametrosEliminar ();
		
}





