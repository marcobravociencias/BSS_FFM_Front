function nuevoIr(){
	window.location.href='parametrosAsignacion?action=nuevo';
}

function nuevoParametro (){
	
	var div				= document.getElementById("rest_table");
	var url				= "";
	var metodo			= "GET";
	var form 			= crearForm (url,metodo,"formParametros");
	var divContenedor	= document.createElement("div");
	divContenedor.setAttribute("id","div_detalles");
	
	var fapaEmpresa		= parametroCargarSelectEmpresas ();
	var fapaUnidad		= parametroCargarSelectUnidades ();
	var fapaModulo		= crearDivGroupInputList("Modulo",				"",		"fapa_modulo",		"data_modulos");
	var fapaNumero		= crearDivGroupInput 	("Numero",				"",		"fapa_numero");		
	var fapaComentario	= crearDivGroupInput 	("Comentario",			"",		"fapa_comentario");	
	var fapaValor01		= crearDivGroupInput 	("Valor 01",			"",		"fapa_valor01");
	var fapaValor02		= crearDivGroupInput 	("Valor 02",			"",		"fapa_valor02");
	var fapaValor03		= crearDivGroupInput 	("Valor 03",			"",		"fapa_valor03");
	var guardar 		= crearButton("Guardar","guardar","btn btn-primary");
	
	guardar.setAttribute("onclick","crearNuevoParametro();");				
	
	divContenedor.appendChild(fapaEmpresa);
	divContenedor.appendChild(fapaUnidad);
	divContenedor.appendChild(fapaModulo);
	divContenedor.appendChild(fapaNumero);
	divContenedor.appendChild(fapaComentario);
	divContenedor.appendChild(fapaValor01);
	divContenedor.appendChild(fapaValor02);
	divContenedor.appendChild(fapaValor03);
	divContenedor.appendChild(guardar);
	
	div.appendChild(divContenedor);	
	
	
	parametroCargarDataListModulos ();
	
	var buttonHome	= document.getElementById("fapa_modulo");
	buttonHome.setAttribute("onChange","cargarNumero();");
}
function crearNuevoParametro (){
	parametro = {
		fcun_ID_NEGOCIO: 	inputGetValue("fcem_ID_EMPRESA"),
		fcem_ID_EMPRESA: 	inputGetValue("fcun_ID_NEGOCIO"),
		fapa_COMENTARIO: 	inputGetValue("fapa_comentario"),
		fapa_NUMERO: 		inputGetValue("fapa_numero"),
		fapa_MODULO: 		inputGetValue("fapa_modulo"),
		fapa_VALOR_01: 		inputGetValue("fapa_valor01"),
		fapa_VALOR_02: 		inputGetValue("fapa_valor02"),
		fapa_VALOR_03: 		inputGetValue("fapa_valor03")
	};
	parametro = JSON.stringify(parametro).toString().replaceAll("\"","'");
	
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{ 'key':'PARAMETROS_POST', 'datosPost':"+parametro+" }";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	swal({ html: '<strong>Procesando solicitud...</strong>', allowOutsideClick: false });
	swal.showLoading();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var respuesta = this.responseText;
			
			window.setTimeout(function(){
				swal.close();
				window.location.href="parametrosAsignacion?action=editar&idParametro="+respuesta;
			},1500);
			
		}
	}
}

function parametroCargarDataListModulos (){
	/* 
	 * Esta funcion se encarga de consumir una api rest y construir un control select con una lista de modulos
	 */
	 
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'PARAMETROS_MODULOS_GET'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var div 	= document.getElementById("div_selector");
	var datalist= document.createElement("datalist");
	datalist.setAttribute("id","data_modulos");
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse( this.responseText );
			
			for ( x of respuesta ) {
				var option = document.createElement("option");
				option.setAttribute("value",x.fapa_MODULO);
				var optionText= document.createTextNode(x.fapa_MODULO);
				
				option.appendChild(optionText);
				datalist.appendChild(option);
			}
			div.appendChild(datalist);
		}
	}
}

function parametroCargarSelectEmpresas (){
	/* 
	 * Esta funcion se encarga de consumir una api rest y construir un control select con una lista de modulos
	 */
	 
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'EMPRESAS_GET'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var div 	= crearDivGroup	("Empresa",	"");
	var select= document.createElement("select");
	select.setAttribute("id","fcem_ID_EMPRESA");
	
	var option = document.createElement("option");
	option.setAttribute("value",null);
	var optionText= document.createTextNode("");
				
	option.appendChild(optionText);
	select.appendChild(option);
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse( this.responseText );
			
			for ( x of respuesta ) {
				var option = document.createElement("option");
				option.setAttribute("value",x.fcem_ID);
				var optionText= document.createTextNode(x.fcem_NOMBRE);
				
				option.appendChild(optionText);
				select.appendChild(option);
			}
			div.appendChild(select);
		}
	}
	
	return div;
}


function parametroCargarSelectUnidades (){
	/* 
	 * Esta funcion se encarga de consumir una api rest y construir un control select con una lista de modulos
	 */
	 
	var urlServicio = "req/parametrosAsignacion/consume/";
	var metodoServicio = "POST";
	var data = "{'key':'UNIDADES_GET'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	
	var div 	= crearDivGroup	("Unidad",	"fcun_ID_NEGOCIO");
	var select= document.createElement("select");
	select.setAttribute("id","fcun_ID_NEGOCIO");
	
	var option = document.createElement("option");
	option.setAttribute("value",null);
	option.setAttribute("class","form-control form-coxntrol");
	var optionText= document.createTextNode("");
				
	option.appendChild(optionText);
	select.appendChild(option);
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && ( this.status == 200 || this.status == 202 )) {
			var respuesta = JSON.parse( this.responseText );
			
			for ( x of respuesta ) {
				var option = document.createElement("option");
				option.setAttribute("value",x.fcun_ID);
				option.setAttribute("class","form-control form-coxntrol");
				var optionText= document.createTextNode(x.fcun_NOMBRE);
				
				option.appendChild(optionText);
				select.appendChild(option);
			}
			div.appendChild(select);
		}
	}
	
	return div;
}

function cargarNumero (){
	var modulo 	= inputGetValue ("fapa_modulo");
	
	var urlServicio 	= "req/parametrosAsignacion/consume/";
	var metodoServicio 	= "POST";
	var data 			= "{'key':'PARAMETROS_MODULOS_MAX_GET', 'datosGET':'"+modulo+"'}";
	xhttp = consumirRest(urlServicio,metodoServicio,JSON.stringify(data));
	swal({ html: '<strong>Procesando solicitud...</strong>', allowOutsideClick: false });
	swal.showLoading();
	
	xhttp.onreadystatechange = function() {
		if (this.status == 200 ) {
			var respuesta = JSON.parse( this.responseText );
			
			var fapaNumero = document.getElementById("fapa_numero");
			fapaNumero.setAttribute("value",respuesta);
			
			swal.close();
			
			var fapaComentario = document.getElementById("fapa_comentario");
			fapaComentario.select();
		}
	}
}